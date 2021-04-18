import os
import json
import csv
import argparse
import sys
import glob

parser = argparse.ArgumentParser(description="Convert Sea Lion Density to JSON")

parser.add_argument('file', type=str, help="File to parse")
args = parser.parse_args()

with open(args.file, 'r') as f:
  lines = f.readlines()

data = []
for line in lines:
  vals = line.replace("\n", "").split(" ")

  if vals[2] != "nan":
    data.append({ "longitude": float(vals[0]), "latitude": float(vals[1]), "val":float(vals[2])})

with open("sea-lion-habitat.json", "w") as out:
  json.dump(data, out)

