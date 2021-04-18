import os
import json
import csv
import argparse
import sys
import glob
from datetime import datetime

# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from GPS tracks")
parser.add_argument('file', type=str, help="file to parse")

args = parser.parse_args()

# Check the data directory exists
if not os.path.isfile(args.file):
  sys.exit(f"{args.file} is not a directory")

with open(args.file, 'r') as f:
  reader = csv.reader(f)
  header = True
  headers = ["timestamp", "spot_id", "latitude", "longitude", "drift_num"]

  data = dict()
  i = 0
  for row in reader: 
    if header:
      header = False
    else:
      row_dict = {headers[i]: pt for i, pt in enumerate(row)}

      date = datetime.strptime(row_dict["timestamp"], "%Y-%m-%d %H:%M:%S")
      timestamp = date.timestamp()
      row_dict["timestamp"] = timestamp
      row_dict["longitude"] = float(row_dict["longitude"])
      row_dict["latitude"] = float(row_dict["latitude"])
      row_dict["drift_num"] = int(row_dict["drift_num"])
      drift_num = row_dict["drift_num"]

      if drift_num in data:
        data[drift_num].append(row_dict)
      else:
        data[drift_num] = [row_dict]

for num in data:
  data[num] = sorted(data[num], key=lambda x: x["timestamp"])

with open ("traces.json", 'w') as f:
  json.dump(data, f)
