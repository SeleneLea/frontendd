# 🏢 Smart Condominium - Frontend Web React

Sistema de Gestión Inteligente de Condominios desarrollado con React + Vite + Material-UI, conectado a una API REST completa de Django.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Módulos y Funcionalidades](#-módulos-y-funcionalidades)
- [Configuración de Desarrollo](#-configuración-de-desarrollo)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Backend](#-api-backend)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Testing](#-testing)
- [Despliegue](#-despliegue)

## 🎯 Descripción del Proyecto

**Smart Condominium** es una aplicación web completa para la administración inteligente de condominios que incluye:

- 🔐 **Sistema de autenticación** con roles diferenciados
- 💰 **Gestión financiera** completa (gastos, pagos, multas, reportes)
- 🛡️ **Seguridad con IA** (reconocimiento facial, control vehicular)
- 🔧 **Mantenimiento** (tickets, asignaciones, seguimiento)
- 🏢 **Administración** (propiedades, residentes, áreas comunes)
- 📊 **Reportes y analítica** avanzada
- 📱 **Notificaciones** push en tiempo real

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

**Frontend:**
- ⚛️ React 19.1.1
- ⚡ Vite (Build tool)
- 🎨 Material-UI (@mui/material)
- 🌐 Axios (HTTP Client)
- 📱 React Icons
- 🎯 ESLint (Flat config)

**Backend:**
- 🐍 Django REST Framework
- 🔐 Token Authentication
- 📊 100+ endpoints
- 🤖 Funcionalidades IA integradas

### Flujo de Datos

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   React Frontend│ ←────────────→  │  Django Backend │
│   (Puerto 5173) │                 │   (Puerto 8000) │
└─────────────────┘                 └─────────────────┘
         │                                   │
         ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   Material-UI   │                 │   PostgreSQL    │
│   Components    │                 │   Database      │
└─────────────────┘                 └─────────────────┘
```

## 🧩 Módulos y Funcionalidades

### 1. 🏠 Dashboard Principal
- **Ruta:** `/dashboard`
- **Funcionalidades:**
  - Resumen financiero en tiempo real
  - Indicadores de seguridad
  - Notificaciones importantes
  - Métricas de ocupación de áreas comunes
  - Alertas de mantenimiento pendiente

### 2. 👥 Gestión de Usuarios
- **Ruta:** `/usuarios`
- **Sub-módulos:**
  - `/usuarios/residentes` - CRUD residentes
  - `/usuarios/personal` - Gestión de staff
  - `/usuarios/perfil` - Perfil personal
  - `/usuarios/reconocimiento` - Registro facial IA

### 3. 💰 Sistema Financiero
- **Ruta:** `/finanzas`
- **Sub-módulos:**
  - `/finanzas/gastos` - Administración de gastos
  - `/finanzas/pagos` - Registro de pagos
  - `/finanzas/multas` - Gestión de multas
  - `/finanzas/reportes` - Reportes financieros
  - `/finanzas/estado-cuenta` - Estados de cuenta
  - `/finanzas/reservas` - Pagos por reservas

### 4. 🛡️ Seguridad con IA
- **Ruta:** `/seguridad`
- **Sub-módulos:**
  - `/seguridad/control-acceso` - Control de ingreso/salida
  - `/seguridad/visitantes` - Gestión de visitantes
  - `/seguridad/vehiculos` - Control vehicular
  - `/seguridad/reconocimiento` - IA facial
  - `/seguridad/eventos` - Log de eventos
  - `/seguridad/dashboard` - Dashboard de seguridad

### 5. 🔧 Mantenimiento
- **Ruta:** `/mantenimiento`
- **Sub-módulos:**
  - `/mantenimiento/solicitudes` - Tickets de mantenimiento
  - `/mantenimiento/personal` - Personal técnico
  - `/mantenimiento/asignaciones` - Asignación de trabajos
  - `/mantenimiento/historial` - Historial de trabajos

### 6. 🏢 Áreas Comunes
- **Ruta:** `/areas-comunes`
- **Sub-módulos:**
  - `/areas-comunes/espacios` - Configuración de espacios
  - `/areas-comunes/reservas` - Sistema de reservas
  - `/areas-comunes/calendario` - Calendario de disponibilidad

### 7. 📢 Comunicación
- **Ruta:** `/comunicacion`
- **Sub-módulos:**
  - `/comunicacion/avisos` - Avisos generales
  - `/comunicacion/notificaciones` - Notificaciones push

### 8. 📊 Reportes y Analítica
- **Ruta:** `/reportes`
- **Sub-módulos:**
  - `/reportes/financieros` - Reportes financieros
  - `/reportes/seguridad` - Analítica de seguridad
  - `/reportes/ocupacion` - Uso de áreas comunes

### 9. ⚙️ Configuración
- **Ruta:** `/configuracion`
- **Sub-módulos:**
  - `/configuracion/condominio` - Datos del condominio
  - `/configuracion/usuarios` - Roles y permisos
  - `/configuracion/sistema` - Configuración general

## 🚀 Configuración de Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend Django ejecutándose en puerto 8000

### Instalación Rápida

```bash
# Clonar repositorio
git clone <url-repositorio>
cd frontendd

# Instalar dependencias
npm install

# Variables de entorno (opcional)
cp .env.example .env

# Iniciar desarrollo
npm run dev
```

### Dependencias Principales

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "@mui/material": "^7.3.3",
    "axios": "^1.12.2"
  },
  "devDependencies": {
    "vite": "^7.1.7",
    "@vitejs/plugin-react": "^5.0.3",
    "eslint": "^9.36.0"
  }
}
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 5173)
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

## 📁 Estructura del Proyecto

```
frontendd/
├── public/                 # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/            # Componentes básicos
│   │   ├── layout/        # Layouts (Header, Sidebar)
│   │   └── common/        # Componentes comunes
│   ├── pages/             # Páginas principales
│   │   ├── Login/         # ✅ Implementado
│   │   ├── Dashboard/     # 📋 Pendiente
│   │   ├── Usuarios/      # 📋 Pendiente
│   │   ├── Finanzas/      # 📋 Pendiente
│   │   ├── Seguridad/     # 📋 Pendiente
│   │   ├── Mantenimiento/ # 📋 Pendiente
│   │   ├── AreasComunes/  # 📋 Pendiente
│   │   ├── Comunicacion/  # 📋 Pendiente
│   │   ├── Reportes/      # 📋 Pendiente
│   │   └── Configuracion/ # 📋 Pendiente
│   ├── services/          # Servicios API
│   │   ├── api.js         # 📋 Pendiente - Cliente base
│   │   ├── authService.js # 📋 Pendiente - Autenticación
│   │   ├── finanzasService.js # 📋 Pendiente - Finanzas
│   │   ├── seguridadService.js # 📋 Pendiente - Seguridad
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── context/           # Context providers
│   ├── utils/             # Utilidades
│   ├── types/             # TypeScript types (futuro)
│   ├── assets/            # Imágenes, iconos
│   ├── App.jsx           # ✅ Componente principal
│   ├── main.jsx          # ✅ Punto de entrada
│   └── index.css         # ✅ Estilos globales
├── .github/
│   └── copilot-instructions.md # ✅ Instrucciones para IA
├── package.json          # ✅ Configuración del proyecto
├── vite.config.js        # ✅ Configuración Vite
├── eslint.config.js      # ✅ Configuración ESLint
└── README.md             # ✅ Documentación (este archivo)
```

## 🔌 API Backend

### Configuración de Conexión

```javascript
// Configuración base
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Headers para autenticación
const authHeaders = {
  'Authorization': `Token ${localStorage.getItem('authToken')}`,
  'Content-Type': 'application/json'
};
```

### Usuarios de Prueba

```javascript
// Credenciales verificadas
const testUsers = {
  admin: { username: 'admin', password: 'admin123', role: 'PROPIETARIO' },
  residente: { username: 'residente1', password: 'isaelOrtiz2', role: 'RESIDENTE' },
  seguridad: { username: 'seguridad1', password: 'guardia123', role: 'SEGURIDAD' },
  mantenimiento: { username: 'electricista1', password: 'electrico123', role: 'MANTENIMIENTO' }
};
```

### Endpoints Principales por Módulo

#### 🔐 Autenticación
```javascript
POST /api/login/                    // Login
GET  /api/usuarios/perfil/          // Perfil usuario
```

#### 💰 Finanzas
```javascript
GET  /api/finanzas/gastos/          // Lista gastos
GET  /api/finanzas/pagos/           // Lista pagos
GET  /api/finanzas/multas/          // Lista multas
GET  /api/finanzas/estado-de-cuenta/ // Estado cuenta
GET  /api/finanzas/reportes/resumen/ // Resumen financiero
```

#### 🛡️ Seguridad
```javascript
GET  /api/seguridad/visitantes/     // Lista visitantes
GET  /api/seguridad/visitas/        // Lista visitas
GET  /api/seguridad/vehiculos/      // Vehículos registrados
POST /api/seguridad/ia/verificar-rostro/ // IA: Verificar rostro
```

#### 🔧 Mantenimiento
```javascript
GET  /api/mantenimiento/solicitudes/ // Solicitudes
POST /api/mantenimiento/solicitudes/ // Crear solicitud
GET  /api/mantenimiento/personal/    // Personal técnico
```

## 🧑‍💻 Guía de Desarrollo

### Convenciones de Código

#### Componentes React
```javascript
// Patrón establecido
import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { FaIcon } from 'react-icons/fa';

const ComponentName = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async () => {
    setLoading(true);
    try {
      // Lógica del componente
    } catch (err) {
      setError('Mensaje de error en español');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="component-container">
      {/* JSX en español */}
    </Box>
  );
};

export default ComponentName;
```

#### Servicios API
```javascript
// Patrón de servicio
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const moduloService = {
  // Obtener lista
  getAll: async () => {
    const response = await axios.get(`${API_URL}/modulo/`, {
      headers: { 'Authorization': `Token ${localStorage.getItem('authToken')}` }
    });
    return response.data;
  },

  // Crear elemento
  create: async (data) => {
    const response = await axios.post(`${API_URL}/modulo/`, data, {
      headers: { 
        'Authorization': `Token ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
};
```

#### Estilos CSS
Mantener la estética actual con clases CSS personalizadas:
```css
/* Estilo establecido - conservar */
.login-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
```

### Roadmap de Desarrollo

#### 🔄 Fase 1: Infraestructura (1-2 semanas)
- [ ] Sistema de routing con React Router
- [ ] Context de autenticación global
- [ ] Layout principal con navegación
- [ ] Servicios API base configurados

#### 🏗️ Fase 2: Módulos Core (2-3 semanas)
- [ ] Dashboard principal con métricas
- [ ] Módulo de usuarios completo
- [ ] Sistema financiero básico
- [ ] Control de acceso y seguridad

#### 🚀 Fase 3: Funcionalidades Avanzadas (2-3 semanas)
- [ ] Integración IA (reconocimiento facial)
- [ ] Sistema de reportes
- [ ] Notificaciones en tiempo real
- [ ] Módulo de mantenimiento completo

#### 🎨 Fase 4: Optimización (1-2 semanas)
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Testing completo
- [ ] Documentación final

## 🧪 Testing

### Configuración de Tests

```bash
# Instalar dependencias de testing (pendiente)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Tests de Integración API

```javascript
// tests/api.test.js (pendiente)
describe('API Integration Tests', () => {
  test('should authenticate with valid credentials', async () => {
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' })
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
  });
});
```

### Tests de Componentes

```javascript
// tests/components/LoginPage.test.jsx (pendiente)
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../src/pages/Login/LoginPage';

test('should render login form', () => {
  render(<LoginPage />);
  expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
});
```

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev  # http://localhost:5173
```

### Producción
```bash
npm run build
npm run preview
```

### Variables de Entorno
```bash
# .env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_APP_NAME=Smart Condominium
```

## 📞 Soporte y Contribución

### Enlaces Importantes
- 📋 **Swagger API**: http://127.0.0.1:8000/api/schema/swagger-ui/
- 📖 **ReDoc**: http://127.0.0.1:8000/api/schema/redoc/
- 🤖 **Copilot Instructions**: `.github/copilot-instructions.md`

### Estado del Proyecto
- ✅ **Backend**: 100% operativo (100+ endpoints)
- ✅ **Autenticación**: Implementada y funcionando
- ✅ **Base Frontend**: Configurada con Material-UI
- 🔄 **Desarrollo**: En progreso - Módulos por implementar
- 📊 **Progreso**: ~15% completado

---

**🏢 Smart Condominium - Sistema de Gestión Inteligente**  
*Desarrollado con React + Vite + Material-UI*
