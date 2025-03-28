#!/bin/bash

CONTRACT_DIR=${CONTRACT_DIR:-"/project/contracts"}
OUTPUT_DIR=${OUTPUT_DIR:-"/project/wrappers"}
PKG_NAME=${PKG_NAME:-"wrappers"}
TYPE_NAME=${TYPE_NAME:-"hyperion"}

cd "$CONTRACT_DIR" || { echo "- Contract directory not found!"; exit 1; }

shopt -s nullglob

mkdir /project/wrappers

for CONTRACT_FILE in *.sol; do
    echo "- Processing contract file: ${CONTRACT_FILE}"

    SOLIDITY_CONTRACT_NAME=$(grep -oP 'contract\s+\K\w+' "$CONTRACT_FILE" | head -n1)

    if [[ -z "$SOLIDITY_CONTRACT_NAME" ]]; then
        echo "- No contract found in ${CONTRACT_FILE}!"
        continue
    fi

    echo "- Contract name detected: ${SOLIDITY_CONTRACT_NAME}"

    echo "- Compiling contract ${CONTRACT_FILE} with solc..."

    COMBINED_JSON_FILE="${OUTPUT_DIR}/${SOLIDITY_CONTRACT_NAME}_combined.json"

    solc --optimize --via-ir --combined-json abi,bin "$CONTRACT_FILE" > "$COMBINED_JSON_FILE"

    if [[ ! -f "$COMBINED_JSON_FILE" ]]; then
        echo "- Combined JSON not generated for ${SOLIDITY_CONTRACT_NAME}!"
        continue
    fi

    CONTRACT_OUTPUT_DIR="${OUTPUT_DIR}/${SOLIDITY_CONTRACT_NAME}.sol"
    mkdir -p "$CONTRACT_OUTPUT_DIR"

    echo "- Generating Go wrapper via abigen..."

    abigen --combined-json="$COMBINED_JSON_FILE" \
           --pkg="$PKG_NAME" \
           --type="$TYPE_NAME" \
           --out="${CONTRACT_OUTPUT_DIR}/wrapper.go"

    echo "- Wrapper generated at: ${CONTRACT_OUTPUT_DIR}/wrapper.go"

    rm -f ${OUTPUT_DIR}/*_combined.json
    echo "- Temporary combined JSON files cleaned up."
done
