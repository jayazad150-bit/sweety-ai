param(
    [Parameter(Mandatory)]
    [string]$File
)

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

$backupDir = ".\upgrade\backups\$timestamp"

New-Item -ItemType Directory -Force $backupDir | Out-Null

Copy-Item $File $backupDir -Force

Write-Host ""
Write-Host "Backup created:"
Write-Host "$backupDir"
