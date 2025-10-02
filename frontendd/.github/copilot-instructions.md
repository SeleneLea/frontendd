# Copilot Instructions - Smart Condominium Frontend

## Project Overview
This is a React + Vite frontend for "Smart Condominium" - a comprehensive intelligent condominium management system. The application connects to a complete Django REST API backend with 100+ endpoints covering security, finances, maintenance, and administration.

## Architecture & File Organization

### Core Structure
- **Entry Point**: `src/main.jsx` renders the root App component
- **App Component**: `src/App.jsx` - Currently serves LoginPage (routing expansion planned)
- **Pages**: Organized in `src/pages/[PageName]/[PageName].jsx` pattern
- **Components**: Empty `src/components/` directory (ready for shared components)
- **Styling**: Mixed approach - Material-UI components + custom CSS in `src/index.css`

### Planned Module Structure (Based on Backend API)
```
src/pages/
├── auth/              # Login/Authentication
├── dashboard/         # Main dashboard with stats
├── usuarios/          # User management (residents, staff)
├── finanzas/          # Financial module (payments, expenses, reports)
├── seguridad/         # Security with AI (cameras, access control, visitors)
├── mantenimiento/     # Maintenance (tickets, assignments)
├── areas-comunes/     # Common areas management
├── comunicacion/      # Communications (notices, messaging)
└── reportes/          # Reports and analytics
```

### Page Structure Pattern
Follow the established pattern in `src/pages/Login/LoginPage.jsx`:
- Use functional components with React hooks
- Import Material-UI components: `{ Box, Button, Card, TextField, Typography, CircularProgress }`
- Import icons from `react-icons/fa`
- Handle loading states and error display
- Use async/await for API calls with axios

## Development Workflow

### Essential Commands
```bash
npm run dev          # Start development server (Vite)
npm run build        # Production build
npm run lint         # ESLint with custom rules
npm run preview      # Preview production build
```

### Backend Integration
- **API Base URL**: `http://127.0.0.1:8000/api` (Django REST API)
- **Authentication**: Token-based authentication at `/api/login/`
- **Expected Response**: `{ "token": "abc123..." }`
- **Error Handling**: Check for 401 status for auth errors
- **CORS**: Already configured for React development ports

## Complete API Modules & Endpoints

### 🏠 Dashboard Module
- `GET /api/` - API welcome/status
- Core metrics and summary data for main dashboard

### 👥 Users Module
```
GET    /api/usuarios/residentes/           # List residents
GET    /api/usuarios/perfil/               # User profile
POST   /api/usuarios/registro/             # Register new user
POST   /api/usuarios/reconocimiento/registrar-rostro/  # AI: Register face
POST   /api/usuarios/setup/crear-primer-admin/         # Create first admin
```

### 💰 Finance Module (Complete Financial System)
```
# Expenses
GET    /api/finanzas/gastos/               # List expenses
POST   /api/finanzas/gastos/               # Create expense
POST   /api/finanzas/gastos/crear_mensual/ # Create monthly expenses
POST   /api/finanzas/gastos/pagar_en_lote/ # Bulk payment

# Payments
GET    /api/finanzas/pagos/                # List payments
POST   /api/finanzas/pagos/                # Create payment
GET    /api/finanzas/pagos/{id}/comprobante/ # Payment receipt

# Fines
GET    /api/finanzas/multas/               # List fines
POST   /api/finanzas/multas/               # Create fine
POST   /api/finanzas/multas/pagar_en_lote/ # Bulk fine payment

# Income/Expenses
GET    /api/finanzas/ingresos/             # Income tracking
GET    /api/finanzas/egresos/              # Expense tracking

# Common Area Reservations
GET    /api/finanzas/reservas/             # List reservations
POST   /api/finanzas/reservas/             # Create reservation
POST   /api/finanzas/reservas/{id}/pagar/  # Pay for reservation

# Reports
GET    /api/finanzas/estado-de-cuenta/     # Account statement
GET    /api/finanzas/reportes/resumen/     # Financial summary
GET    /api/finanzas/reportes/financiero/  # Financial report
POST   /api/finanzas/expensas/generar/     # Generate expenses
```

### 🛡️ Security Module (AI-Enhanced)
```
# Visitors
GET    /api/seguridad/visitantes/          # List visitors
GET    /api/seguridad/visitas/             # List visits
GET    /api/seguridad/visitas-abiertas/    # Open/ongoing visits

# Vehicle Control
GET    /api/seguridad/vehiculos/           # Registered vehicles
POST   /api/seguridad/control-acceso-vehicular/    # Vehicle access control
POST   /api/seguridad/control-salida-vehicular/    # Vehicle exit control

# AI Features
POST   /api/seguridad/ia/verificar-rostro/ # AI: Face recognition
POST   /api/seguridad/ia/control-vehicular/ # AI: Vehicle control

# Security Events
GET    /api/seguridad/eventos/             # Security events
GET    /api/seguridad/detecciones/         # AI detections

# Dashboard & Reports
GET    /api/seguridad/dashboard/resumen/   # Security summary
GET    /api/seguridad/export/visitas.csv   # Export visits data
```

### 🔧 Maintenance Module
```
GET    /api/mantenimiento/solicitudes/     # Maintenance requests
POST   /api/mantenimiento/solicitudes/     # Create request
POST   /api/mantenimiento/solicitudes/{id}/asignar/       # Assign request
POST   /api/mantenimiento/solicitudes/{id}/cambiar_estado/ # Change status

GET    /api/mantenimiento/personal/        # Maintenance staff
POST   /api/mantenimiento/personal/        # Add staff member
```

### 🏢 Condominium Module
```
GET    /api/condominio/propiedades/        # Properties
GET    /api/condominio/avisos/             # Notices/announcements
GET    /api/condominio/areas-comunes/      # Common areas
GET    /api/condominio/reglas/             # Condominium rules
```

### 📱 Notifications Module
```
POST   /api/notificaciones/registrar-dispositivo/ # Register FCM device
POST   /api/notificaciones/demo/           # Send demo notification
POST   /api/dispositivos/registrar/        # Register device
```

### 📊 Audit Module
```
GET    /api/auditoria/bitacora/            # Audit log
GET    /api/auditoria/bitacora/{id}/       # Audit entry detail
```

## Code Conventions

### ESLint Configuration
- Uses flat config format (`eslint.config.js`)
- Custom rule: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]`
- Ignores `dist/` directory
- Configured for React Hooks and React Refresh

### Styling Approach
- **Primary**: Material-UI component styling with `sx` prop
- **Global**: Custom CSS classes in `src/index.css` (note: wrapped in `<style>` tags)
- **Theme**: Gradient background (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- **Layout**: Centered login card with shadow effects

### Component Patterns
- Use Spanish comments: `// Por ahora, solo mostraremos la página de login`
- State management with `useState` hooks
- Form handling with controlled components
- Loading states with Material-UI `CircularProgress`
- Error display with `Typography` color="error"

### API Integration
- Use axios for HTTP requests
- Include Authorization header: `Authorization: Token <token>`
- Store tokens in localStorage (commented pattern exists)
- Handle network errors with user-friendly messages
- Console.log successful responses for debugging

### Authentication Flow
```javascript
// Login request
const response = await axios.post(`${API_URL}/api/login/`, {
  username,
  password,
});

// Store token
localStorage.setItem('authToken', response.data.token);

// Use in subsequent requests
headers: {
  'Authorization': `Token ${localStorage.getItem('authToken')}`
}
```

## User Roles & Permissions
- **PROPIETARIO** (Admin): Full system access
- **RESIDENTE**: Personal finances, reservations, requests
- **SEGURIDAD**: Security module, access control, visitors
- **MANTENIMIENTO**: Maintenance requests by specialty

## Test Users Available
```
admin / admin123           # Full access admin
residente1 / isaelOrtiz2   # Resident with data
seguridad1 / guardia123    # Security personnel
electricista1 / electrico123 # Electrical maintenance
```

## Key Dependencies
- **React 19.1.1** with latest patterns
- **Material-UI**: For UI components and styling
- **axios**: For API communication
- **react-icons/fa**: For FontAwesome icons
- **Vite**: Build tool with React plugin

## Important Notes
- Project uses ES modules (`"type": "module"`)
- Spanish language used in UI text and comments
- No routing implemented yet (App.jsx shows only LoginPage)
- Token storage logic exists but is commented out
- Components and assets directories are currently empty
- Backend provides 100+ endpoints across 9 main modules

## Next Development Areas
When expanding this codebase:
1. Implement React Router for navigation between modules
2. Create reusable components in `src/components/`
3. Add proper state management (Context/Redux) for user session
4. Implement complete authentication context with role-based access
5. Create service layer for each backend module
6. Add dashboard with financial and security summaries
7. Implement all 9 main modules (usuarios, finanzas, seguridad, etc.)
8. Add responsive design for mobile and tablet
9. Integrate AI features (face recognition, smart analytics)
10. Create comprehensive testing suite