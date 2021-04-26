import os
import json
import csv
import argparse
import sys
import glob
from datetime import datetime
import pandas as pd

# Set up command line arguments
parser = argparse.ArgumentParser(description="Upload data from GPS tracks")
parser.add_argument('file', type=str, help="file to parse")

args = parser.parse_args()

# Check the data directory exists
if not os.path.isfile(args.file):
  sys.exit(f"{args.file} is not a file")

df = pd.read_csv(args.file)
df[["longitude", "latitude", "drift_num"]] = df[["long", "lat", "station"]]
df["timestamp"] = (pd.to_datetime(df["dateTime"]) - datetime(1970, 1, 1)).dt.total_seconds()

df = df[["timestamp", "longitude", "latitude", "spotID", "readingType", "drift_num"]]
df.drop_duplicates(inplace=True)
df = df.set_index("drift_num")
df = df.apply(dict, axis=1)
df.groupby(df.index).apply(list).to_json("traces.json")

