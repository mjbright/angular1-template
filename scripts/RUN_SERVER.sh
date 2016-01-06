#!/bin/bash

DB_FILE=SERVER_DB.json

[ ! -f $DB_FILE ] && die "No such file as '$DB_FILE'"

#json-server --watch Week4_Exercise1_db.json
#/c/Users/mjbright/AppData/Roaming/npm/json-server --watch Week4_Exercise1_db.json

#/c/Users/mjbright/AppData/Roaming/npm/json-server --watch Week4_Exercise1_db.json ‐‐static dist ‐‐port 3100

set -x
/c/Users/mjbright/AppData/Roaming/npm/json-server --watch $DB_FILE ‐‐static dist
#--port 3100
set +x

#./node_modules/browser‐sync/bin/browser‐sync.js start \
#  ‐‐files=dist/**/* \
#  ‐‐proxy localhost:3100








