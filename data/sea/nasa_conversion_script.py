import json

# Function to parse a single data line
def parse_line(line):
    # Split the line into components based on whitespace
    parts = line.split()

    # Extract the relevant data
    year = float(parts[2])  # Year + fraction of year
    gmsl_variation = float(parts[5])  # GMSL variation without GIA

    # Return a dict representing this data point
    return {"year": year, "gmsl_variation": gmsl_variation}

# Path to your data file
file_path = 'GMSL_TPJAOS_5.1_199209_202307.txt'

# Processed data will be stored here
data = []

# Open the file and process each line
with open(file_path, 'r') as file:
    lines = file.readlines()

    # Skip the header; the range should skip all lines before the "Header_End" line
    data_lines = lines[lines.index('HDR Header_End---------------------------------------\n')+1:]

    for line in data_lines:
        # Skip any lines that don't look like data or are missing data (based on expected line format)
        if len(line.split()) < 13 or '99900.000' in line:
            continue

        # Parse the line and add the data point to our data
        data.append(parse_line(line))

# Convert the data to JSON
json_data = json.dumps(data, indent=4)

# Print out the JSON data
print(json_data)

# Optionally, write the JSON data to a file
with open('sea_level_data.json', 'w') as json_file:
    json_file.write(json_data)
