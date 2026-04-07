import h_extraction_pipeline as h_pipe
import json

def result_of(file_path):
    result = h_pipe.predict(file_path)
    
    if result is None:
        return None
    
    ENERGY_KWH_PER_KG_H2 = 35
    COST_PER_GRAM_H2_USD = 0.0045

    total_expected_mass = 0
    total_energy = 0
    total_cost = 0
    total_objects = 0

    for info in result['objects_info'].values():
        info['expected_mass'] = info['volume_ml'] * info['density'] * info['fill_ratio'] * .8
        info['total_extracted_hydrogen'] = round(info['expected_mass'] * info['hydrogen_ratio'], 2)
        info['total_extracted_hydrogen_in_kg'] = round(info['total_extracted_hydrogen'] / 1000, 3)
        total_expected_mass += info['expected_mass']
        total_energy += round(info['total_extracted_hydrogen_in_kg'] * ENERGY_KWH_PER_KG_H2, 2)
        total_cost += round(info['total_extracted_hydrogen'] * COST_PER_GRAM_H2_USD, 2)
        total_objects += 1

    result['summary'] = {
        'total_objects': total_objects,
        'total_expected_mass': total_expected_mass,
        'total_energy': total_energy,
        'total_cost': total_cost
    }

    # # Write result to results.json
    # with open('results.json', 'w') as f:
    #     json.dump(result, f, indent=4)

    return result



