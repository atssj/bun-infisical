# Test script for bun-infisical Docker image

Write-Host "Testing Docker image: bun-infisical:latest" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test 1: Bun version
Write-Host "`nTest 1: Bun version check" -ForegroundColor Yellow
$result = docker run --rm bun-infisical:latest bun --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Bun is working" -ForegroundColor Green
} else {
    Write-Host "✗ Bun failed" -ForegroundColor Red
    exit 1
}

# Test 2: Infisical version
Write-Host "`nTest 2: Infisical version check" -ForegroundColor Yellow
$result = docker run --rm bun-infisical:latest infisical --version
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Infisical is working" -ForegroundColor Green
} else {
    Write-Host "✗ Infisical failed" -ForegroundColor Red
    exit 1
}

# Test 3: Bun basic execution
Write-Host "`nTest 3: Bun basic execution" -ForegroundColor Yellow
$result = docker run --rm bun-infisical:latest bun --eval "console.log('Bun execution test passed')"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Bun can execute code" -ForegroundColor Green
} else {
    Write-Host "✗ Bun execution failed" -ForegroundColor Red
    exit 1
}

# Test 4: Infisical help
Write-Host "`nTest 4: Infisical help command" -ForegroundColor Yellow
$result = docker run --rm bun-infisical:latest infisical --help
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Infisical help works" -ForegroundColor Green
} else {
    Write-Host "✗ Infisical help failed" -ForegroundColor Red
    exit 1
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "All tests passed! ✓" -ForegroundColor Green
