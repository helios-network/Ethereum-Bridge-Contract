#!/bin/bash

CONTRACT_DIR=${CONTRACT_DIR:-"/project/contracts"}
OUTPUT_DIR=${OUTPUT_DIR:-"/project/wrappers"}
PKG_NAME=${PKG_NAME:-"wrappers"}

cd "$CONTRACT_DIR" || { echo "- Contract directory not found!"; exit 1; }
mkdir -p "$OUTPUT_DIR"
shopt -s nullglob

apt-get install -y jq

for CONTRACT_FILE in *.sol; do
    echo "- Processing contract file: ${CONTRACT_FILE}"

    CONTRACT_OUTPUT_DIR="${OUTPUT_DIR}/${CONTRACT_FILE}"
    mkdir -p "$CONTRACT_OUTPUT_DIR"

    # Crée l'entrée JSON standard pour solc
    SOLC_INPUT=$(jq -n \
    --arg filename "$CONTRACT_FILE" \
    --arg content "$(cat "$CONTRACT_FILE")" \
    '{
        language: "Solidity",
        sources: {
        ($filename): { content: $content }
        },
        settings: {
        optimizer: { enabled: true, runs: 1000000 },
        metadata: { useLiteralContent: true },
        evmVersion: "paris",
        outputSelection: {
            "*": {
            "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode"
            ]
            }
        }
        }
    }')


    COMPILED_JSON="${CONTRACT_OUTPUT_DIR}/compiled.json"

    echo "$SOLC_INPUT" | solc --standard-json > "$COMPILED_JSON"

    # Liste tous les contrats extraits
    CONTRACT_NAMES=$(jq -r ".contracts[\"$CONTRACT_FILE\"] | keys[]" "$COMPILED_JSON")

    for CONTRACT_NAME in $CONTRACT_NAMES; do
        echo "- Generating Go wrapper for contract: $CONTRACT_NAME"

        ABI=$(jq -r ".contracts[\"$CONTRACT_FILE\"][\"$CONTRACT_NAME\"].abi" "$COMPILED_JSON")
        BIN=$(jq -r ".contracts[\"$CONTRACT_FILE\"][\"$CONTRACT_NAME\"].evm.bytecode.object" "$COMPILED_JSON")

        # Skip if ABI or BIN is empty
        if [[ "$ABI" == "null" || "$BIN" == "null" || -z "$BIN" ]]; then
            echo "  ⛔ ABI or BIN missing for $CONTRACT_NAME, skipping..."
            continue
        fi

        echo "$ABI" > "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.abi"
        echo "$BIN" > "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.bin"

        abigen \
            --abi "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.abi" \
            --bin "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.bin" \
            --pkg "$PKG_NAME" \
            --type "$CONTRACT_NAME" \
            --out "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.go"

        rm -rf "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.abi"
        rm -rf "${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.bin"

        echo "  ✅ Wrapper generated: ${CONTRACT_OUTPUT_DIR}/${CONTRACT_NAME}.go"
    done

    rm -rf "${CONTRACT_OUTPUT_DIR}/wrapper.go"

    echo "- Done with file: $CONTRACT_FILE"
done
