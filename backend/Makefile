proto:
# create pb dir
	mkdir -p ./pkg/pb;
# userService
	protoc --go_out=pkg/pb --go_opt=paths=source_relative \
 		--go-grpc_out=pkg/pb --go-grpc_opt=paths=source_relative,require_unimplemented_servers=false \
 		--proto_path ./proto \
 		./proto/*.proto;
# types
	protoc --go_out=pkg/pb --go_opt=paths=source_relative \
				--go-grpc_out=pkg/pb --go-grpc_opt=paths=source_relative,require_unimplemented_servers=false \
				--proto_path ./proto \
				./proto/types/*.proto;
start:
	go run main.go server
lint-download:
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sudo sh -s -- -b $(go env GOPATH)/bin v1.52.2
lint:
	golangci-lint run ./...