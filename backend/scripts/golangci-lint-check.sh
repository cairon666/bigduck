#!/bin/sh

if [ "$(golangci-lint --version 2>/dev/null)" != "" ]; then
  echo 'golangci-lint is found!';
else\
  echo 'start golangci-lint install';
  curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sudo sh -s -- -b $(go env GOPATH)/bin latest;
fi