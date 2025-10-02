# Navegue siempre al directorio correcto antes de ejecutar comandos
Set-Location "C:\github\frontendd\frontendd"

# Mostrar directorio actual
Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (Test-Path "package.json") {
    $packageInfo = Get-Content "package.json" | ConvertFrom-Json
    Write-Host "📦 Proyecto: $($packageInfo.name)" -ForegroundColor Green
    Write-Host "🚀 Ejecutando servidor de desarrollo..." -ForegroundColor Yellow
    npm run dev
} else {
    Write-Host "❌ Error: No se encontró package.json en este directorio" -ForegroundColor Red
    Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Red
}