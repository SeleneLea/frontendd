#!/bin/bash
# Script de verificación para Smart Condominium Frontend

echo "🏢 Smart Condominium - Verificación del Sistema"
echo "=============================================="

# Verificar directorio
echo "📁 Directorio actual: $(pwd)"

# Verificar Node.js
echo "🟢 Node.js version: $(node --version)"
echo "🟢 NPM version: $(npm --version)"

# Verificar package.json
if [ -f "package.json" ]; then
    echo "✅ package.json encontrado"
    echo "📦 Proyecto: $(grep '"name"' package.json | cut -d'"' -f4)"
else
    echo "❌ package.json no encontrado"
fi

# Verificar dependencias
if [ -d "node_modules" ]; then
    echo "✅ node_modules encontrado"
else
    echo "❌ node_modules no encontrado - ejecutar npm install"
fi

# Verificar archivos principales
echo ""
echo "📋 Verificando archivos principales:"
[ -f "src/main.jsx" ] && echo "✅ src/main.jsx" || echo "❌ src/main.jsx"
[ -f "src/App.jsx" ] && echo "✅ src/App.jsx" || echo "❌ src/App.jsx"
[ -f "src/pages/Login/LoginPage.jsx" ] && echo "✅ LoginPage.jsx" || echo "❌ LoginPage.jsx"
[ -f "src/services/api.js" ] && echo "✅ api.js service" || echo "❌ api.js service"
[ -f "src/tests/apiIntegrationTests.js" ] && echo "✅ API Tests" || echo "❌ API Tests"

echo ""
echo "🧪 Para ejecutar tests:"
echo "1. Abrir navegador en: http://localhost:5173"
echo "2. Navegar a: http://localhost:5173/tests"
echo "3. O en consola del navegador: ejecutarTestsAPI()"

echo ""
echo "🚀 Estado: Sistema listo para testing"