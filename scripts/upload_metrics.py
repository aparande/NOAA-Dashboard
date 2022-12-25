import os
import json
import csv
import argparse
import sys
import glob
from datetime import datetime
import psycopg2
from dotenv import load_dotenv
from pathlib import Path

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

def write_tmpfile(drift_id, metric, stat, data, start=-1, end=-1):
  with open('tmp.csv', 'w') as tmpfile:
    writer = csv.writer(tmpfile)

    for i, row in enumerate(data):
      if i < start:
        continue
      if end != -1 and i >= end:
        print(f"Finished uploading {metric}-{stat} for {drift_name}")
        return

      for key in row:
        if key != "timestamp":
          row[key] = float(row[key])
          writer.writerow([drift_id, metric, stat, row['timestamp'], key, row[key], datetime.now().isoformat(), datetime.now().isoformat()])

    print(f"Reached end of file for {metric}-{stat} for {drift_name}")

def get_drift_id(cursor, drift_name):
  cursor.execute("SELECT id from buoys WHERE name = %s", (drift_name,))
  drift_id = cursor.fetchone()
  print("Fetching Buoy")
  if drift_id is None:
    cursor.execute("INSERT INTO buoys (name, created_at, updated_at) VALUES (%s, NOW(), NOW()) RETURNING id", (drift_name,))
    drift_id = cursor.fetchone()
    print("Created Buoy in table")
  return drift_id[0]

def upload_data(drift_name, metric, stat, data, start=-1, end=-1):
  parent_dir = Path(__file__).parents[1].absolute()

  if os.getenv("NODE_ENV") == "local":
    conn = psycopg2.connect(
      dbname=os.getenv('PG_DB'), user=os.getenv('PG_USER'), password=os.getenv('PG_PASS'), 
      host=os.getenv('PG_HOST'), port=os.getenv('PG_PORT') 
    )
  else:
    conn = psycopg2.connect(
      dbname=os.getenv('PG_DB'), user=os.getenv('PG_USER'), password=os.getenv('PG_PASS'), 
      host=os.getenv('PG_HOST'), port=os.getenv('PG_PORT'), sslmode='verify-ca', 
      sslcert=f"{parent_dir}/certs/dev/client-cert.crt", sslkey=f"{parent_dir}/certs/dev/client-key.key", sslrootcert=f"{parent_dir}/certs/dev/server-ca.crt"
    )
  cursor = conn.cursor()

  drift_id = get_drift_id(cursor, drift_name)
  write_tmpfile(drift_id, metric, stat, data, start=start, end=end)
  try:
    with open("tmp.csv", "r") as csv:
      cursor.copy_from(csv, "datapoints", sep=",", columns=["buoy_id", "metric", "statistic", "timestamp", "xlabel", "value", "created_at", "updated_at"])
  finally:
    conn.commit()
    cursor.close()
    conn.close()
    os.remove("tmp.csv")

load_dotenv(f"{Path(__file__).parents[1].absolute()}/.env")
# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from a Triton LTSA Analysis Directory to CloudSQL")

parser.add_argument('directory', type=str, help="Directory to parse")
parser.add_argument('--skip-stats', type=str, nargs='+', dest="skip_stats", help="Stats to Skip")
parser.add_argument('--skip-metrics', type=str, nargs='+', dest="skip_metrics", help="Metrics to Skip")
parser.add_argument('--start', type=int, default=-1, dest="start", help="Row num to start metric upload (Inclusive)")
parser.add_argument('--end', type=int, default=-1, dest="end", help="Row num to end metric upload (Exclusive)")

args = parser.parse_args()

# Check the data directory exists
if not os.path.isdir(args.directory):
  sys.exit(f"{args.directory} is not a directory")
print(f"Loading data in {args.directory}")
if args.directory[-1] == "/":
  args.directory = args.directory[:-1]
drift_name = " ".join(args.directory.split("/")[-1].split("_")[:2])
print(f"Uploading data for {drift_name}")
if drift_name is None or drift_name == "":
  print("Stopping because didn't capture correct drift name")
  sys.exit()

# Get all file names in the directory
files = glob.glob(f"{args.directory}/*.csv")

json_data = dict()
for path in files:
  # Get the filename (truncate the extension))
  filename = path.split("/")[-1][:-4]
  metric, stat = filename.split("_")[4:6]
  if stat == "2min":
    stat = "median"
  if metric not in args.skip_metrics and stat not in args.skip_stats:
    print(f"Found metric file: {metric}-{stat}")
    data = parse_csv(path)
    upload_data(drift_name, metric, stat, data, start=args.start, end=args.end)

