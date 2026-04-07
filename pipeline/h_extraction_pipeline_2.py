import os
import requests
import json
import numpy as np
import shutil
import base64
import re
from io import BytesIO
from PIL import Image
from datetime import datetime
import matplotlib.pyplot as plt
from inference_sdk import InferenceHTTPClient
from inference.core.env import WORKFLOWS_MAX_CONCURRENT_STEPS, MAX_ACTIVE_MODELS
from inference.core.managers.base import ModelManager
from inference.core.managers.decorators.fixed_size_cache import WithFixedSizeCache
from inference.core.registries.roboflow import RoboflowModelRegistry
from inference.models.utils import ROBOFLOW_MODEL_TYPES
from inference.core.workflows.execution_engine.core import ExecutionEngine
import warnings

warnings.filterwarnings("ignore")
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

def decode_base64_image(base64_string):
    image_data = base64.b64decode(base64_string)
    return Image.open(BytesIO(image_data))

url = "https://raw.githubusercontent.com/Hager205/graduation-Project/main/material_properties.json" 
response = requests.get(url)

if response.status_code == 200:
    material_data = response.json()
else:
    print(f"Failed to fetch the JSON file. Status code: {response.status_code}")
DEFAULT_DENSITY = 1.0  # g/cm^3
DEFAULT_HYDROGEN_RATIO = 0.15  # 15%

HYDROGEN_PRICE_PER_GRAM = 0.005  # $5 per kg
PAYOUT_RATIO = 0.6  # 60% paid to the customer

def get_material_properties(material_class):
    data = material_data.get(material_class.lower(), {})
    density = data.get("density", DEFAULT_DENSITY)
    hydrogen_ratio = data.get("hydrogen_ratio", DEFAULT_HYDROGEN_RATIO)
    return density, hydrogen_ratio

def predict(image_path):
    seg_client = InferenceHTTPClient(
        api_url="https://detect.roboflow.com",
        api_key="Sn1vSUk86V5QpQ25WfdA"
    )

    seg_result = seg_client.run_workflow(
        workspace_name="taco-9911u",
        workflow_id="custom-workflow",
        images={"image": image_path},
        use_cache=True
    )

    all_predictions_path = "all_predictions"
    os.makedirs(all_predictions_path, exist_ok=True)

    current_predictions_path = "current_predictions"
    if os.path.exists(current_predictions_path):
        shutil.rmtree(current_predictions_path)
    os.makedirs(current_predictions_path)

    for i, img in enumerate(seg_result[0]['dynamic_crop']):
        class_name = seg_result[0]['model_predictions']['predictions']['predictions'][i].get('class').lower()
        confidence = round(seg_result[0]['model_predictions']['predictions']['predictions'][i].get('confidence'), 2)
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
        image = decode_base64_image(img)
        filename = f"{timestamp}_{confidence}_{class_name}.png"
        plt.imsave(os.path.join(current_predictions_path, filename), np.array(image))
        plt.imsave(os.path.join(all_predictions_path, filename), np.array(image))

    model_registry = RoboflowModelRegistry(ROBOFLOW_MODEL_TYPES)
    model_manager = ModelManager(model_registry=model_registry)
    model_manager = WithFixedSizeCache(model_manager, max_size=MAX_ACTIVE_MODELS)

    workflow_init_parameters = {
        "workflows_core.model_manager": model_manager
    }

    results = {}

    for img_name in os.listdir(current_predictions_path):
        if not img_name.endswith('.png'):
            continue

        class_name_raw = re.search(r'_\d+\.\d+_(.*?)\.png$', img_name).group(1)
        img_id = re.search(r'(20[^_/]*)_', img_name).group(1)
        seg_confidence = float(re.search(r'_(\d+\.\d+)_', img_name).group(1))
        class_name = class_name_raw
        food_classification_confidence = None

        if class_name == 'food waste':
            food_class_client = InferenceHTTPClient(
                api_url="https://detect.roboflow.com",
                api_key="0YHBpNOGQLWKMICOfU27"
            )
            food_class_result = food_class_client.run_workflow(
                workspace_name="foodclass-mitcr",
                workflow_id="custom-workflow",
                images={"image": os.path.join(current_predictions_path, img_name)},
                use_cache=True
            )
            parsed_output = json.loads(food_class_result[0]['google_gemini']['output'])
            class_name = parsed_output['class_name']
            food_classification_confidence = parsed_output['confidence']

        class_placeholder = class_name.replace("other ", "")

        CUSTOM_WORKFLOW = {
            "version": "1.0",
            "inputs": [{"type": "WorkflowImage", "name": "image"}],
            "steps": [{
                "type": "roboflow_core/google_gemini@v1",
                "name": "google_gemini",
                "images": "$inputs.image",
                "model_version": "gemini-1.5-pro",
                "temperature": 0,
                "api_key": "AIzaSyAcXurtchOCo83IGSWeSF4ljz8N_HDqCJo",
                "task_type": "structured-answering",
                "output_structure": {
                    "object_description": f"Description for the {class_placeholder} shown in the image",
                    "estimated_dimensions_cm": f"Estimated dimensions for the {class_placeholder} shown in the image (in centimeters)",
                    "shape_assumption": f"Shape assumption for the {class_placeholder} shown in the image",
                    "volume_estimate_ml": f"Volume estimation for the {class_placeholder} shown in the image (a single number in milliliters)",
                    "assumptions": "Estimated dimensions based on nearby objects for scale",
                    "confidence_score": "Confidence score"
                }
            }],
            "outputs": [{"type": "JsonField", "name": "google_gemini", "selector": "$steps.google_gemini.*"}],
        }

        execution_engine = ExecutionEngine.init(
            workflow_definition=CUSTOM_WORKFLOW,
            init_parameters=workflow_init_parameters,
            max_concurrent_steps=WORKFLOWS_MAX_CONCURRENT_STEPS,
        )

        result = execution_engine.run(
            runtime_parameters={
                "image": [os.path.join(current_predictions_path, img_name)]
            }
        )
        output = json.loads(result[0]['google_gemini']['output'])
        pre_volume = output['volume_estimate_ml']
        volume_numbers = re.findall(r'\d+\.?\d*', str(pre_volume))
        volume_ml = float(np.mean(list(map(float, volume_numbers)))) if volume_numbers else 664  # fallback avg

        #Calculate weight and hydrogen
        density, hydrogen_ratio = get_material_properties(class_name)
        weight = volume_ml * density  
        hydrogen_grams = weight * hydrogen_ratio
        payment_usd = hydrogen_grams * HYDROGEN_PRICE_PER_GRAM * PAYOUT_RATIO

        results[img_id] = {
            "volume_ml": round(volume_ml, 2),
            "class": class_name,
            "segmentation_confidence": seg_confidence,
            "volume_est_confidence": output['confidence_score'],
            "weight_grams": round(weight, 2),
            "hydrogen_grams": round(hydrogen_grams, 4),
            "estimated_payment_usd": round(payment_usd, 4)
        }

        if food_classification_confidence is not None:
            results[img_id]['food_classification_confidence'] = food_classification_confidence

    return results
