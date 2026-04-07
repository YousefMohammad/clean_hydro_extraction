from inference_sdk import InferenceHTTPClient
import base64
from io import BytesIO
from PIL import Image
import matplotlib.pyplot as plt

client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="Sn1vSUk86V5QpQ25WfdA"
)   

result = client.run_workflow(
    workspace_name="taco-9911u",
    workflow_id="custom-workflow",
    images={
        "image": "./original_2.jpg"
    },
    use_cache=True # cache workflow definition for 15 minutes
)
result = result[0]

if 'predictions' in result['model_predictions'].keys():
    for prediction in result['model_predictions']['predictions']['predictions']:
        print(f"Class: {prediction.get('class')}")
        print(f"Confidence: {prediction.get('confidence')}")
        print(f" Class ID: {prediction.get('class_id')}")
        print("-" * 20)
else:
    print("No predictions in the result.")
    print(result.keys())

print(result)



def decode_base64_image(base64_string):
    image_data = base64.b64decode(base64_string)
    return Image.open(BytesIO(image_data))

fig, axes = plt.subplots(1, len(result['dynamic_crop']), figsize=(10, 5))

for i, img in enumerate(result['dynamic_crop']):
    image = decode_base64_image(img)

    axes[i].imshow(image)
    axes[i].axis('off')  # Turn off the axes
    axes[i].set_title(f"Image {i+1}")

plt.tight_layout()
plt.show()