
import h_extraction_pipeline as h_pipe
import json

file_id = "1f8qu-GT_D7rDSgBYAp-VmiEbf9x6dv84"

# https://drive.google.com/file/d/1ZqAVD683pGBHk5H5iD8D3Wtl_Sv6NmOw/view?usp=sharing

result = h_pipe.predict(f"https://drive.google.com/uc?id={file_id}")


for objet, info in result['objects_info'].items():
    info['expected_mass'] = info['volume_ml'] * info['density']
    info['total_extracted_hydrogen'] = round(info['expected_mass'] * info['hydrogen_ratio'],2) #info['expected_mass'] * info['hydrogen_ratio']
    info['total_extracted_hydrogen_in_kg'] = round(info['total_extracted_hydrogen'] / 1000, 2)


number_of_objects = len(result['objects_info'].keys())


total_hydrogen, total_expected_mass, total_objects = 0, 0, 0


for obects, info in result['objects_info'].items():
    total_hydrogen += info['total_extracted_hydrogen']
    total_expected_mass += info['expected_mass']
    total_objects += 1


total_energy, energy_kWh_per_kg_H2, total_cost, cost_per_gram_H2_usd = 0, 60, 0, 0.0072



for obects, info in result['objects_info'].items():
    total_energy += round(info['total_extracted_hydrogen_in_kg'] * energy_kWh_per_kg_H2,2)
    total_cost += round(info['total_extracted_hydrogen'] * cost_per_gram_H2_usd,1)


result['summary_information'] = {}


result['summary_information'] = {
    'number_of_objects': number_of_objects,
    'total_hydrogen': total_hydrogen,
    'total_expected_mass': total_expected_mass,
    'total_objects': total_objects,
    'total_energy': total_energy,
    'total_cost_in_usd': total_cost 
}


json.dump(result,open('result_with_summary_info.json','w'))





