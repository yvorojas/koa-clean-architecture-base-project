#!/bin/sh
set -e

if [ -z "$CONSUL_HTTP_ADDR" ]; then
  echo "Consul http addr is missing"
  exit 1
fi

if [ -z "$CONSUL_HTTP_TOKEN" ]; then
  echo "Consul http Token is missing"
  exit 2
fi

if [ -z "$VAULT_TOKEN" ]; then
  echo "Vault token is missing"
  exit 3
fi

if [ -z "$VAULT_ADDR" ]; then
  echo "Vault address is missing"
  exit 4
fi

echo "Getting ecosystem from consul"
./consul-template -config /create-ecosystem.hcl -log-level err &

sleep 5s

echo "Getting cert from consul"
./consul-template -config /create-cert.hcl -log-level err &

sleep 5s

yarn start
echo "Finish Script"