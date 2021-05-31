#!/usr/bin/env bash

API_HOSTNAME=$1
API_PORT=$2
WEB_PORT=$3

PORT=${WEB_PORT} API_HOST=http://${API_HOSTNAME}:${API_PORT}  npm start
