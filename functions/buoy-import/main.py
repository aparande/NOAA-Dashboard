import os
from datetime import datetime
import psycopg2
from google.cloud import storage
import pandas as pd

def get_drift_ids(cursor):
  cursor.execute("SELECT id, name from buoys")
  drifts = cursor.fetchall()
  return { drift[1] : drift[0] for drift in drifts }

def get_drift_id(cursor, drift_name):
  cursor.execute("SELECT id from buoys WHERE name = %s", (drift_name,))
  drift_id = cursor.fetchone()
  print("Fetching Buoy")
  if drift_id is None:
    raise ValueError(f"Drift named {drift_name} does not exist")
  return drift_id[0]

def get_file(name):
  client = storage.Client()
  bucket = client.bucket("calsound-tmp-gps")
  blob = bucket.blob(name)
  blob.download_to_filename(f"/tmp/{name}")

def delete_file(name):
  client = storage.Client()
  bucket = client.bucket("calsound-tmp-gps")
  blob = bucket.blob(name)
  blob.delete()

def upload_gps(event, context):
  if "parsed" in event["name"]:
    return 0
  get_file(event["name"])

  conn = psycopg2.connect(
    dbname=os.getenv('PG_DB'), user=os.getenv('PG_USER'), password=os.getenv('PG_PASS'), 
    host=os.getenv('PG_HOST'), port=os.getenv('PG_PORT'), sslmode='verify-ca', 
    sslcert="certs/client-cert.crt", sslkey="certs/client-key.key", sslrootcert="certs/server-ca.crt"
  )
  cursor = conn.cursor()

  drifts = get_drift_ids(cursor)
  # Read and transform the data
  df = pd.read_csv(f"/tmp/{event['name']}")
  df[["longitude", "latitude", "spot_id", "reading_type"]] = df[["long", "lat", "spotID", "readingType"]]
  df["timestamp"] = pd.to_datetime(df["dateTime"])
  df = df[df["station"].isin(drifts.keys())]
  df["buoy_id"] = df["station"].replace(drifts)

  df = df[["timestamp", "longitude", "latitude", "spot_id", "reading_type", "buoy_id"]]
  df["created_at"] = datetime.now().isoformat()
  df["updated_at"] = datetime.now().isoformat()
  df.drop_duplicates(inplace=True)
  df.to_csv("/tmp/tmp.csv", index=False, header=False)

  # bucket = client.bucket("calsound-tmp-gps")
  # blob = bucket.blob(f"{event['name']}_parsed")
  # blob.upload_from_filename("/tmp/tmp.csv")
  # cursor.close()
  # conn.close()
  try:
    with open("/tmp/tmp.csv", "r") as csv:
      cursor.copy_from(csv, "GPSPoints", sep=",", columns=["timestamp", "longitude", "latitude", "spot_id", "reading_type", "buoy_id", "created_at", "updated_at"])
      bucket = client.bucket("calsound-tmp-gps")
      blob = bucket.blob(f"{event['name']}_parsed")
      blob.upload_from_filename("/tmp/tmp.csv")
  finally:
    conn.commit()
    cursor.close()
    conn.close()

  os.remove("/tmp/tmp.csv")
  delete_file(event["name"])
  return 0
