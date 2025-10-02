import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index-clean.css' //<-- el estilo limpio de la pagina
import AppComplete from './AppComplete.jsx' // App completa con todas las funcionalidades

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppComplete />
  </StrictMode>,
)
