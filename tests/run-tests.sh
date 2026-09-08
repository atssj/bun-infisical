#!/bin/bash
# Test suite for bun-infisical Docker image

set -euo pipefail

echo "Running bun-infisical tests..."
echo "==============================="

# Test 1: Bun version check
echo "Test 1: Bun version"
if docker run --rm bun-infisical:latest bun --version; then
    echo "✓ Bun is working"
else
    echo "✗ Bun failed"
    exit 1
fi

# Test 2: Infisical version check
echo -e "\nTest 2: Infisical version"
if docker run --rm bun-infisical:latest infisical --version; then
    echo "✓ Infisical is working"
else
    echo "✗ Infisical failed"
    exit 1
fi

# Test 3: Bun execution
echo -e "\nTest 3: Bun execution"
if docker run --rm bun-infisical:latest bun --eval "console.log('Hello from Bun')"; then
    echo "✓ Bun execution works"
else
    echo "✗ Bun execution failed"
    exit 1
fi

echo -e "\n==============================="
echo "All tests passed!"
