#!/usr/bin/env bash

PASSWORD=$1
DB_HOSTNAME=$2
PORT=$3

DB=postgres://postgres:${PASSWORD}@${DB_HOSTNAME}/postgres PORT=${PORT} npm start
