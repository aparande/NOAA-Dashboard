import os
import json
import csv
import argparse
import sys
import glob
from datetime import datetime

def parse_csv(filename):
  with open(filename, 'r') as f:
    reader = csv.reader(f)
    header = True
    headers = []
    data = []
    for row in reader:
      if header:
        headers = row
        header = False
      else:
        row_dict = {headers[i]: pt for i, pt in enumerate(row)}

        date = datetime.strptime(row_dict["dateTime"], "%Y-%m-%d %H:%M:%S")
        timestamp = date.timestamp()
        row_dict["timestamp"] = timestamp
        row_dict["longitude"] = float(row_dict["long"])
        row_dict["latitude"] = float(row_dict["lat"])
        row_dict["drift_num"] = int(row_dict["Drift"])
        row_dict["nClicks"] = int(row_dict["nClicks"])

        del row_dict["dateTime"]
        del row_dict["long"]
        del row_dict["lat"]
        del row_dict["Drift"]

        data.append(row_dict)

    return data

parser = argparse.ArgumentParser(description="Convert Detections to JSON")

parser.add_argument('file', type=str, help="File to parse")
args = parser.parse_args()

data = parse_csv(args.file)

with open(f"detections.json", "w") as out:
  json.dump(data, out)






