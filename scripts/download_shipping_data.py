import os
import json
import csv
import argparse
import sys
import glob
from datetime import date, timedelta
import subprocess

parser = argparse.ArgumentParser(description="Download Shipping Data")

parser.add_argument('outdir', type=str, help="File to parse")
parser.add_argument('start', type=str, help="Start Date (YYYY-MM-DD)")
parser.add_argument('end', type=str, help="End Date (YYYY-MM-DD)")

args = parser.parse_args()

start = date.fromisoformat(args.start)
end = date.fromisoformat(args.end)
delta = (end - start).days

for i in range(delta + 1):
  day = start + timedelta(days=i)
  day_str = str(day).replace("-", "_")
  url = f"https://coast.noaa.gov/htdata/CMSP/AISDataHandler/2018/AIS_{day_str}.zip"

  subprocess.run(["curl", url, "--output", f"{args.outdir}/{day_str}.zip"])

