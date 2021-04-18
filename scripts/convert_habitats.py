import os
import json
import csv
import argparse
import sys
import glob

def parse_csv(filename):
  with open(filename, 'r') as f:
    reader = csv.reader(f)
    header = True
    headers = []
    data = []
    for row in reader:
      if header:
        headers = row
        data = [[] for _ in row]
        header = False
      else:
        for i, pt in enumerate(row):
          data[i].append(pt)

    return {header: d for header, d in zip(headers, data)}

parser = argparse.ArgumentParser(description="Convert Sea Lion Density to JSON")

parser.add_argument('file', type=str, help="File to parse")
args = parser.parse_args()

SPECIES = ["Ba", "Bb", "Bm", "Bp", "Dc", "Dd", "Gg", "Lb", "Lo", "Mn", "Pd", "Sc", "Tt"]

data = parse_csv(args.file)
lats = data['mlat']
longs = data['mlon']

for species in SPECIES:
  species_data = list(zip(lats, longs, data[f"{species}.2018Avg.Dens"]))

  with open(f"{species}-habitat.json", "w") as out:
    json.dump(species_data, out)






