Write-Host ""
Write-Host "==============================="
Write-Host " Building Sweety Ultimate..."
Write-Host "==============================="
Write-Host ""

npm run build

if($LASTEXITCODE -eq 0){
    Write-Host ""
    Write-Host "BUILD SUCCESSFUL" -ForegroundColor Green
}
else{
    Write-Host ""
    Write-Host "BUILD FAILED" -ForegroundColor Red
}
