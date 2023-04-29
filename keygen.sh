#!/bin/bash

COUNTRY="AR"
STATE="Buenos Aires"
CITY="La Plata"
ORG="Teamworks"
UNIT="Teamworks Software Development"
CN="Kevin Coscarelli"
EMAIL="kevinsl1991@gmail.com"

openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes \
  -keyout keys/server.key -out keys/server.crt \
  -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORG/OU=$UNIT/CN=$CN/emailAddress=$EMAIL"

# Generate a new RSA key pair with a 2048-bit modulus.
# TODO: Change the password to something more secure
read -p "> Ingresa el passphrase para la key de JWT: " passphrase
openssl genpkey -algorithm RSA -out keys/jwt-private-key.pem -aes256 -pass pass:$passphrase -aes256

# Extract the public key from the private key
openssl rsa -in keys/jwt-private-key.pem -pubout -outform PEM -out keys/jwt-public-key.pem
openssl pkcs8 -in keys/jwt-private-key.pem -topk8 -out keys/jwt-private-pk8key.pem -nocrypt