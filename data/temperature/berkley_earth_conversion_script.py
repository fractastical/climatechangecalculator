import json

def convert_to_json(file_path):
    # Container for the data
    data_list = []
    
    # Open the text file
    with open(file_path, 'r') as file:
        lines = file.readlines()
        
        for line in lines:
            # Skip lines that are comments or empty
            if line.startswith('%') or line.strip() == '':
                continue
            
            # Split the data and strip any excess whitespace
            parts = [x.strip() for x in line.split()]
            
            # Check if line contains enough data
            if len(parts) >= 3:  # Adjust this if you need more fields
                year = int(parts[0])
                month = int(parts[1])
                anomaly = float(parts[2])  # This is the monthly anomaly
                
                # Append data to the list
                data_list.append({
                    'year': year,
                    'month': month,
                    'anomaly': anomaly
                })

    # Convert the list to JSON
    json_data = json.dumps(data_list, indent=4)
    
    # Save to a JSON file or return the data, here we're returning the data
    return json_data


# Replace 'path/to/your/file.txt' with the actual path to your text file
file_path = 'berkley_earth_Land_and_Ocean_complete.txt'

# Get the JSON data
json_data = convert_to_json(file_path)

# If you want to print the data to the console
print(json_data)

# Or if you want to save it to a file
with open('berkley_earth_Land_and_Ocean_complete.json', 'w') as json_file:
    json_file.write(json_data)
