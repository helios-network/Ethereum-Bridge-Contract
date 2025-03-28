gen: solidity-wrappers

solidity-wrappers: 
	@docker build -t solidity-abigen -f DockerFile.abigen .
	@docker run --rm \
		-v $$(pwd):/project \
		-e CONTRACT_PATH="/project/contracts/CosmosToken.sol" \
		-e OUTPUT_DIR="/project/wrappers" \
		solidity-abigen

exportwrappers:
	cp -R wrappers/ ../hyperion/solidity/wrappers