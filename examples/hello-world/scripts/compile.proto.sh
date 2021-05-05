#!/bin/bash

# See https://github.com/improbable-eng/ts-protoc-gen

# Path to this plugin
PROTOC_GEN_TS_PROTO_PATH="../../node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated"

protoc --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PROTO_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="${OUT_DIR}" \
    $(ls proto/*)
