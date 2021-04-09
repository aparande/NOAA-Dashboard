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

# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from detections")
parser.add_argument('file', type=str, help="file to parse")
parser.add_argument('--limit', type=int, default=-1, dest="limit", help="Maximum number of documents to upload")
parser.add_argument('--creds', type=str, dest="creds", default="serviceAccountKey.json", help="Path to Firebase Credentials")

args = parser.parse_args()

# Load Firebase Credentials
# Follow the instructions at https://firebase.google.com/docs/firestore/quickstart#python
# DO NOT COMMIT serviceAccountKey.json to git
cred = credentials.Certificate(args.creds)
firebase_admin.initialize_app(cred)

# Initialize Database Client
db = firestore.client()

# Check the data directory exists
if not os.path.isfile(args.file):
  sys.exit(f"{args.file} is not a directory")

with open(args.file, 'r') as f:
  reader = csv.reader(f)
  header = True
  headers = ["timestamp", "latitude", "longitude", "species", "nClicks", "drift_num"]
  data = []
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
      row_dict["nClicks"] = int(row_dict["nClicks"])

      if args.limit != -1 and i >= args.limit:
        break

      doc_name = "-".join([str(timestamp), str(row_dict["drift_num"]), row_dict["species"]])
      db.collection("detections").document(doc_name).set(row_dict)
      i += 1

