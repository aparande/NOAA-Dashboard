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
        # Scrape the columns
        headers = list(map(parse_header, row))
        header = False
      else:
        row_dict = {headers[i]: pt for i, pt in enumerate(row)}
        data.append(row_dict)

    return data

def parse_header(header):
  """
  Convert column headers to more friendly names
  Most headers are metric_something
  """
  if header == "yyyy-mm-ddTHH:MM:SSZ":
    return "timestamp"
  else:
    return header.split("_")[-1]+ "Hz"

# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from a Triton LTSA Analysis Directory to Firestore")

parser.add_argument('directory', type=str, help="Directory to parse")
parser.add_argument('--creds', type=str, dest="creds", default="serviceAccountKey.json", help="Path to Firebase Credentials")
parser.add_argument('--skip-stats', type=str, nargs='+', dest="skip_stats", help="Stats to Skip")
parser.add_argument('--skip-metrics', type=str, nargs='+', dest="skip_metrics", help="Metrics to Skip")
parser.add_argument('--limit', type=int, default=-1, dest="limit", help="Maximum number of documents per metric to upload")

args = parser.parse_args()

# Check the data directory exists
if not os.path.isdir(args.directory):
  sys.exit(f"{args.directory} is not a directory")

drift_name = " ".join(args.directory.split("/")[-1].split("_")[:2])

# Get all file names in the directory
files = glob.glob(f"{args.directory}/*.csv")

json_data = dict()
for path in files:
  # Get the filename (truncate the extension))
  filename = path.split("/")[-1][:-4]
  metric, stat = filename.split("_")[4:6]
  if stat == "2min":
    stat = "raw"
  if metric not in args.skip_metrics and stat not in args.skip_stats:
    print(f"Found metric file: {metric}-{stat}")
    data = parse_csv(path)
    mapped_data = list(map(lambda x: datetime.strptime(x["timestamp"], "%Y-%m-%dT%H:%M:%S.000Z").timestamp(), data))
    print(f"Max: {max(mapped_data)}, Min: {min(mapped_data)}")

