import os
from datetime import datetime
import csv
import psycopg2
from google.cloud import storage

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
  return header.split("_")[-1]+ "Hz"

def write_tmpfile(drift_id, metric, stat, data, drift_name):
  with open('/tmp/tmp.csv', 'w') as tmpfile:
    writer = csv.writer(tmpfile)

    for _, row in enumerate(data):
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

def upload_data(drift_name, metric, stat, data):
  conn = psycopg2.connect(
    dbname=os.getenv('PG_DB'), user=os.getenv('PG_USER'), password=os.getenv('PG_PASS'), 
    host=os.getenv('PG_HOST'), port=os.getenv('PG_PORT'), sslmode='verify-ca', 
    sslcert="certs/client-cert.crt", sslkey="certs/client-key.key", sslrootcert="certs/server-ca.crt"
  )
  cursor = conn.cursor()

  drift_id = get_drift_id(cursor, drift_name)
  write_tmpfile(drift_id, metric, stat, data, drift_name)
  try:
#    client = storage.Client()
#    bucket = client.bucket("calsound-tmp-metrics")
#    blob = bucket.blob(f"{drift_name}_{metric}_{stat}-parsed.csv")
#    blob.upload_from_filename("/tmp/tmp.csv")
    with open("/tmp/tmp.csv", "r") as csv:
      cursor.copy_from(csv, "datapoints", sep=",", columns=["buoy_id", "metric", "statistic", "timestamp", "xlabel", "value", "created_at", "updated_at"])
  finally:
    conn.commit()
    cursor.close()
    conn.close()
    os.remove("/tmp/tmp.csv")

def get_file(name):
  client = storage.Client()
  bucket = client.bucket("calsound-tmp-metrics")
  blob = bucket.blob(name)
  blob.download_to_filename(f"/tmp/{name}")

def delete_file(name):
  client = storage.Client()
  bucket = client.bucket("calsound-tmp-metrics")
  blob = bucket.blob(name)
  blob.delete()

def upload_metric(event, context):
  if "parsed" in event["name"]:
    return 0
  get_file(event["name"])
  path = f"/tmp/{event['name']}"
  filename = path.split("/")[-1][:-4]
  drift_name, metric, stat = filename.split("_")
  if stat == "2min":
    stat = "median"
  print(f"Found metric file: {metric}-{stat}")
  data = parse_csv(path)
  upload_data(drift_name, metric, stat, data)
  delete_file(event['name'])

