# 🧪 Guía de Testing - Smart Condominium

## 📋 Verificación de Integración con Backend

Este documento describe cómo verificar que todas las funcionalidades del frontend estén correctamente conectadas con el backend API.

## 🚀 Métodos de Testing Disponibles

### 1. 🌐 Interfaz Web de Tests
- **URL:** http://localhost:5173/tests
- **Descripción:** Interfaz gráfica para ejecutar todos los tests
- **Funcionalidades:**
  - Ejecutar todos los tests de una vez
  - Tests individuales por módulo
  - Reporte visual de resultados
  - Barra de progreso en tiempo real

### 2. 💻 Consola del Navegador
- **Comando principal:** `ejecutarTestsAPI()`
- **Tests individuales:** `testModulo('finanzas')`
- **Módulos disponibles:** finanzas, seguridad, mantenimiento, usuarios

### 3. 🔑 Verificación Manual de Login
- **URL:** http://localhost:5173/login
- **Credenciales de prueba incluidas en la interfaz**
- **Redirección automática a tests tras login exitoso**

## 🧪 Tests Implementados

### 🔐 Autenticación (5 tests)
```javascript
✅ Login Admin
✅ Obtener Perfil Admin  
✅ Login Residente
✅ Login Seguridad
✅ Login Mantenimiento
```

### 💰 Finanzas (5 tests)
```javascript
✅ Obtener Gastos
✅ Obtener Pagos
✅ Obtener Estado de Cuenta
✅ Obtener Resumen Financiero
✅ Obtener Multas
```

### 🛡️ Seguridad (5 tests)
```javascript
✅ Obtener Visitantes
✅ Obtener Visitas
✅ Obtener Visitas Abiertas
✅ Obtener Vehículos
✅ Dashboard Seguridad - Resumen
```

### 🔧 Mantenimiento (3 tests)
```javascript
✅ Obtener Solicitudes
✅ Obtener Personal
✅ Obtener Estadísticas Mantenimiento
```

### 👥 Usuarios (2 tests)
```javascript
✅ Obtener Residentes
✅ Obtener Perfil Usuario
```

## 📊 Interpretación de Resultados

### ✅ Tasa de Éxito > 80%
- **Estado:** Sistema funcionando correctamente
- **Acción:** Continuar con el desarrollo

### ⚠️ Tasa de Éxito 50-80%
- **Estado:** Sistema parcialmente funcional
- **Acción:** Revisar endpoints que fallan, verificar backend

### ❌ Tasa de Éxito < 50%
- **Estado:** Problemas críticos
- **Acción:** Verificar conexión con backend, revisar configuración

## 🔧 Prerrequisitos para Testing

### Backend Django
```bash
# Verificar que el backend esté corriendo
http://127.0.0.1:8000/api/

# Documentación Swagger disponible
http://127.0.0.1:8000/api/schema/swagger-ui/
```

### Frontend React
```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Acceder a la aplicación
http://localhost:5173
```

## 🎯 Flujo de Verificación Recomendado

### 1. Verificación Básica (2 minutos)
```bash
1. Abrir http://localhost:5173/login
2. Probar login con: admin / admin123
3. Verificar redirección a tests
4. Hacer clic en "Ejecutar Todos los Tests"
```

### 2. Verificación Completa (5 minutos)
```bash
1. Ejecutar tests completos
2. Revisar tasa de éxito
3. Verificar tests individuales por módulo
4. Probar login con diferentes roles
5. Verificar funcionamiento de cada servicio
```

### 3. Verificación Avanzada (10 minutos)
```bash
1. Tests desde consola del navegador
2. Verificar respuestas detalladas de API
3. Probar diferentes filtros y parámetros
4. Verificar manejo de errores
5. Comprobar autenticación por roles
```

## 🐛 Troubleshooting

### Error: "Failed to fetch"
```bash
Causa: Backend no está ejecutándose
Solución: python manage.py runserver
```

### Error: "401 Unauthorized"
```bash
Causa: Token inválido o expirado
Solución: Hacer logout y login nuevamente
```

### Error: "Network Error"
```bash
Causa: CORS o URL incorrecta
Solución: Verificar configuración CORS en backend
```

### Error: "404 Not Found"
```bash
Causa: Endpoint no existe
Solución: Verificar documentación Swagger
```

## 📝 Logs y Debugging

### Console Logs Útiles
```javascript
// Ver requests/responses
console.log('API Request:', config);
console.log('API Response:', response.data);

// Verificar token
console.log('Auth Token:', localStorage.getItem('authToken'));

// Debug servicios
console.log('Service Result:', result);
```

### Network Tab del Navegador
- Verificar códigos de estado HTTP
- Revisar headers de autenticación
- Comprobar payloads de request/response

## 🎉 Ejemplo de Resultado Exitoso

```
📊 === REPORTE FINAL ===
Total de tests: 20
✅ Exitosos: 19
❌ Fallidos: 1
⏱️ Tiempo total: 3421ms
🎯 Tasa de éxito: 95.0%

✅ Sistema funcionando correctamente - Tasa de éxito: 95.0%
```

## 🔮 Próximos Pasos

### Después de Verificación Exitosa:
1. **Implementar Dashboard Principal**
2. **Crear módulos de navegación**
3. **Desarrollar componentes específicos**
4. **Agregar tests de componentes React**
5. **Implementar tests E2E con Cypress**

### Tests Adicionales a Implementar:
1. **Tests de Componentes** (React Testing Library)
2. **Tests de Integración** (Cypress/Playwright)
3. **Tests de Performance** (Lighthouse)
4. **Tests de Accesibilidad** (axe-core)

---

**✅ Sistema de testing completo implementado y funcionando**
**🎯 Ready para desarrollo de funcionalidades**