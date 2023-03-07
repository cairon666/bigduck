#generate:
#	sudo docker run -v ${shell pwd}:/defs namely/protoc-all -o gen/proto -d proto -l go
run:
	go run main.go server;
lint:
	golangci-lint run --verbose