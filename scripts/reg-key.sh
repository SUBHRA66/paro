#!/usr/bin/env bash

source ./utils.sh

set -e

CONFIG_DIR="$HOME/paro/services/common/keys"

# 1. Check if OpenSSL is installed
if ! command -v openssl >/dev/null 2>&1; then
    info "OpenSSL not found. Installing..."

    sudo apt update
    sudo apt install -y openssl
else
    info "OpenSSL is already installed."
fi

# 2. Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# 3. Generate RSA private key
info "Generating private key..."

openssl genpkey \
    -algorithm RSA \
    -out "$CONFIG_DIR/private.pem" \
    -pkeyopt rsa_keygen_bits:2048

# 4. Generate public key
info "Generating public key..."

openssl pkey \
    -in "$CONFIG_DIR/private.pem" \
    -pubout \
    -out "$CONFIG_DIR/public.pem"

# 5. Protect the private key
chmod 600 "$CONFIG_DIR/private.pem"

info 
info "Keys generated successfully:"
info "  Private: $CONFIG_DIR/private.pem"
info "  Public:  $CONFIG_DIR/public.pem"
