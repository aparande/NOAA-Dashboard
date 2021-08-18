import os
import json
import csv
import argparse
import sys
import glob
import pandas as pd
import psycopg2
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path


def get_drift_ids(cursor):
  cursor.execute("SELECT id, name from buoys")
  drifts = cursor.fetchall()
  return { int(drift[1].split(' ')[1]) : drift[0] for drift in drifts }

load_dotenv(f"{Path(__file__).parents[1].absolute()}/.env")

# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from GPS tracks")
parser.add_argument('file', type=str, help="file to parse")

args = parser.parse_args()

# Check the data directory exists
if not os.path.isfile(args.file):
  sys.exit(f"{args.file} is not a file")

parent_dir = Path(__file__).parents[1].absolute()

# Create the Postgres Connection
conn = psycopg2.connect(
  dbname=os.getenv('PG_DB'), user=os.getenv('PG_USER'), password=os.getenv('PG_PASS'), 
  host=os.getenv('PG_HOST'), port=os.getenv('PG_PORT'), sslmode='verify-ca', 
  sslcert=f"{parent_dir}/certs/dev/client-cert.crt", sslkey=f"{parent_dir}/certs/dev/client-key.key", sslrootcert=f"{parent_dir}/certs/dev/server-ca.crt"
)
cursor = conn.cursor()
drifts = get_drift_ids(cursor)
# Read and transform the data
df = pd.read_csv(args.file)
df[["longitude", "latitude", "spot_id", "reading_type"]] = df[["long", "lat", "spotID", "readingType"]]
df["timestamp"] = pd.to_datetime(df["dateTime"])
df = df[df["station"].isin(drifts.keys())]
df["buoy_id"] = df["station"].replace(drifts)

df = df[["timestamp", "longitude", "latitude", "spot_id", "reading_type", "buoy_id"]]
df["created_at"] = datetime.now().isoformat()
df["updated_at"] = datetime.now().isoformat()
df.drop_duplicates(inplace=True)
print(df.head())
df.to_csv("tmp.csv", index=False, header=False)

try:
  with open("tmp.csv", "r") as csv:
    cursor.copy_from(csv, "GPSPoints", sep=",", columns=["timestamp", "longitude", "latitude", "spot_id", "reading_type", "buoy_id", "created_at", "updated_at"])
finally:
  conn.commit()
  cursor.close()
  conn.close()

os.remove("tmp.csv")
