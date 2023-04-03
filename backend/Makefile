start:
	go run main.go server
lint-download:
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sudo sh -s -- -b $(go env GOPATH)/bin v1.52.2
lint:
	golangci-lint run ./...
gci:
	gci -w ./
test:
	go test ./...