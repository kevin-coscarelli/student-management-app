#!/bin/bash

COUNTRY="AR"
STATE="Buenos Aires"
CITY="La Plata"
ORG="Teamworks"
UNIT="Teamworks Software Development"
CN="Kevin Coscarelli"
EMAIL="kevinsl1991@gmail.com"

openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes \
  -keyout server.key -out server.crt \
  -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORG/OU=$UNIT/CN=$CN/emailAddress=$EMAIL"
