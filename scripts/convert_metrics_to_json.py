import os
import json
import csv
import argparse
import sys
import glob

def convert_file(path):
  # Get the filename (truncate the extension))
  filename = path.split("/")[-1][:-4]
  metric, stat = filename.split("_")[4:6]
  print(f"Found metric file: {metric}-{stat}")

  return metric, stat, parse_csv(path)

def parse_csv(filename):
  with open(filename, 'r') as f:
    reader = csv.reader(f)
    header = True
    headers = []
    data = []
    for row in reader:
      if header:
        headers = map(parse_header, row)
        data = [[] for _ in row]
        header = False
      else:
        for i, pt in enumerate(row):
          data[i].append(pt)

    return {header: d for header, d in zip(headers, data)}

def parse_header(header):
  if header == "yyyy-mm-ddTHH:MM:SSZ":
    return "timestamp"
  else:
    return header.split("_")[-1]

parser = argparse.ArgumentParser(description="Convert a Triton LTSA Analysis Directory to a JSON blob")

parser.add_argument('directory', type=str, help="Directory to parse")
args = parser.parse_args()

if not os.path.isdir(args.directory):
  sys.exit(f"{args.directory} is not a directory")

files = glob.glob(f"{args.directory}/*.csv")

json_data = dict()
for path in files:
  metric, stat, data = convert_file(path)
  if metric in json_data:
    json_data[metric][stat] = data
  else:
    json_data[metric] = {stat: data}

path_comps = args.directory.split("/")
output_name = path_comps[-1]
output_dir = ""
if len(path_comps) > 1:
  output_dir = "/".join(path_comps[:-1]) + "/"

with open(f"{output_dir}{output_name}.json", "w") as f:
  json.dump(json_data, f)

