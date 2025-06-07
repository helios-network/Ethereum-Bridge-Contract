gen: solidity-wrappers

solidity-wrappers: 
	@docker build --platform=linux/amd64 -t solidity-abigen -f DockerFile.abigen .
	@docker run --platform=linux/amd64 --rm \
		-v $$(pwd):/project \
		solidity-abigen

exportwrappers:
	cp -R wrappers/ ../hyperion/solidity/wrappers