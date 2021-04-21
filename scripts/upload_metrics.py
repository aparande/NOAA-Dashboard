import os
import json
import csv
import argparse
import sys
import glob
from datetime import datetime

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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

def get_drift_metric(db, drift_name, metric):
  query = db.collection("metrics").where("drift_name", "==", drift_name).where("metric_name", "==", metric).limit(1)
  return query.get()

def create_drift_metric(db, drift_name, metric):
  doc_ref = db.collection("metrics").document()
  doc_ref.set({
    "drift_name": drift_name,
    "metric_name": metric
  })
  return doc_ref

def upload_data(drift_name, metric, stat, data, db, start=-1, end=-1):
  metric_doc = get_drift_metric(db, drift_name, metric)
  if len(metric_doc) == 0:
    metric_doc_id = create_drift_metric(db, drift_name, metric).id
  else:
    metric_doc_id = metric_doc[0].id

  for i, row in enumerate(data):
    if i < start:
      continue
    if i > end:
      print(f"Finished uploading {metric}-{stat} for {drift_name}")
      return

    timestamp = row["timestamp"]
    date = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S.000Z")
    timestamp = date.timestamp()
    row["timestamp"] = timestamp

    for key in row:
      if key != "timestamp":
        row[key] = float(row[key])

    db.collection("metrics").document(metric_doc_id).collection(stat).document(str(timestamp)).set(row)

# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from a Triton LTSA Analysis Directory to Firestore")

parser.add_argument('directory', type=str, help="Directory to parse")
parser.add_argument('--creds', type=str, dest="creds", default="serviceAccountKey.json", help="Path to Firebase Credentials")
parser.add_argument('--skip-stats', type=str, nargs='+', dest="skip_stats", help="Stats to Skip")
parser.add_argument('--skip-metrics', type=str, nargs='+', dest="skip_metrics", help="Metrics to Skip")
parser.add_argument('--start', type=int, default=-1, dest="start", help="Row num to start metric upload")
parser.add_argument('--end', type=int, default=-1, dest="end", help="Row num to end metric upload")

args = parser.parse_args()

# Load Firebase Credentials
# Follow the instructions at https://firebase.google.com/docs/firestore/quickstart#python
# DO NOT COMMIT serviceAccountKey.json to git
cred = credentials.Certificate(args.creds)
firebase_admin.initialize_app(cred)

# Initialize Database Client
db = firestore.client()

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
    upload_data(drift_name, metric, stat, data, db, start=args.start, end=args.end)

