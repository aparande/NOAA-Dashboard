import os
import json
import csv
import argparse
import sys
import glob
from datetime import datetime
from multiprocessing import Pool
from tqdm import tqdm
import pandas as pd

def parse_csv(args):
  filename, agg, lat_res, lon_res = args
  df = pd.read_csv(filename)
  df = df[["BaseDateTime", "LAT", "LON"]]
  df = df[(df["LAT"] >= 32) & (df["LAT"] <= 42) & (df["LON"] >= -129) & (df["LON"] <= -117)]
  df["timestamp"] = (pd.to_datetime(df["BaseDateTime"]) - datetime(1970, 1, 1)).dt.total_seconds()

  df["timestamp"] = df["timestamp"] // agg * agg
  df["latitude"] = df["LAT"] // lat_res * lat_res 
  df["longitude"] =  df["LON"] // lon_res * lon_res
  df = df[["timestamp", "latitude", "longitude"]]
  return df.groupby(df.columns.tolist(), as_index=False).size()

# Set up command line arguments
parser = argparse.ArgumentParser(description="Convert AIS data")
parser.add_argument('directory', type=str, help="directory to parse")
parser.add_argument('--agg', type=int, default=60 * 60 * 24 * 30, help="Width of aggregation in seconds")
parser.add_argument('--lat-res', type=int, default=0.1, help="Decimal place of latitude")
parser.add_argument('--lon-res', type=int, default=0.1, help="Decicaml place of longitude")

args = parser.parse_args()

# Check the data directory exists
if not os.path.isdir(args.directory):
  sys.exit(f"{args.directory} is not a directory")

# Get all file names in the directory
files = glob.glob(f"{args.directory}/*.csv")

pool_args = [(filename, args.agg, args.lat_res, args.lon_res) for filename in files]
p = Pool()

dfs = p.map(parse_csv, pool_args)
data = pd.concat(dfs)

data = data.groupby(["timestamp", "latitude", "longitude"], as_index=False).sum()
data = data.set_index("timestamp")
data = data.apply(dict, axis=1)
data.groupby(data.index).apply(list).to_json("ship_density.json")

