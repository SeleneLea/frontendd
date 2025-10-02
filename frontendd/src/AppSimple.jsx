import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🏢 Smart Condominium - Test Simple</h1>
      <p>Si ves este mensaje, React está funcionando correctamente.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>🧪 Test Básico</h2>
        <button 
          onClick={() => alert('¡React funciona!')} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Hacer Clic para Test
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>📍 Si esto funciona, el problema está en el routing o en los componentes.</p>
        <p>🔧 Vamos a diagnosticar paso a paso.</p>
      </div>
    </div>
  );
}

export default App;