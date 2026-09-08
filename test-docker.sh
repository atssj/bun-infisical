#!/bin/bash

echo "Testing Docker image: bun-infisical:latest"
echo "=========================================="

# Test 1: Bun version
echo "Test 1: Bun version check"
if docker run --rm bun-infisical:latest bun --version; then
    echo "✓ Bun is working"
else
    echo "✗ Bun failed"
    exit 1
fi

# Test 2: Infisical version
echo -e "\nTest 2: Infisical version check"
if docker run --rm bun-infisical:latest infisical --version; then
    echo "✓ Infisical is working"
else
    echo "✗ Infisical failed"
    exit 1
fi

# Test 3: Bun basic execution
echo -e "\nTest 3: Bun basic execution"
if docker run --rm bun-infisical:latest bun --eval "console.log('Bun execution test passed')"; then
    echo "✓ Bun can execute code"
else
    echo "✗ Bun execution failed"
    exit 1
fi

# Test 4: Infisical help
echo -e "\nTest 4: Infisical help command"
if docker run --rm bun-infisical:latest infisical --help; then
    echo "✓ Infisical help works"
else
    echo "✗ Infisical help failed"
    exit 1
fi

echo -e "\n=========================================="
echo "All tests passed! ✓"
