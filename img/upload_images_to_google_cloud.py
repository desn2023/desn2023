import json
import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('json', type=str, default='imagedata.json')
args = parser.parse_args()

with open(args.json, 'r') as f:
    data = json.load(f)

for d in data:
    # get the image from the url
    os.system('wget -O "{}.{}" "{}"'.format(d['id'], d['xFileExt'], d['url']))

    # upload to google cloud
    os.system('gsutil cp "{}.{}" "gs://desn2023/"'.format(d['id'], d['xFileExt']))

    os.remove('{}.{}'.format(d['id'], d['xFileExt']))
