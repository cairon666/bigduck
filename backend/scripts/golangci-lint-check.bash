#!/bin/bash

if [ "$(golangci-lint --version 2>/dev/null)" != "" ]; then
  exit 0;
else
  printf "golangci-lint not found. install...\n"
  curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sudo sh -s -- -b $(go env GOPATH)/bin latest;
  exit 0;
fi