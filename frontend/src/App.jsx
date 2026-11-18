import { useState } from 'react';

// ==========================================
// 📌 REGLA DE ORO DE REACT:
// //Siempre que quieras que un cambio en tus datos se refleje visualmente
// en la pantalla de forma automática, obligatoriamente tienes que usar useState
// siempre la estructura va ser ( const [nombreDeLaVariable, funcionModificadora] = useState(valorInicial);)
// ==========================================

function App() {
  const [mensajes, setMensajes] = useState([
    { remitente: 'ia', texto: '¡Hola! Escribe algo y simularé que estoy pensando.' }
  ]);

  const [textoInput, setTextoInput] = useState('');
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!textoInput.trim()) return;

    const mensajeUsuario = { remitente: 'usuario', texto: textoInput };

    // ==========================================
    // 📌 TRUCO PRO DE REACT (prevMensajes):
    // Usar (prevMensajes) => [...] dentro de setMensajes 
    // nos garantiza que usamos la lista más fresca y actualizada, 
    // evitando errores si hay varias actualizaciones seguidas.
    // ==========================================
    setMensajes((prevMensajes) => [...prevMensajes, mensajeUsuario]);

    setTextoInput('');
    setEstaEscribiendo(true);

    // Simulamos que la IA tarda 1.5 segundos en responder
    setTimeout(() => {
      const mensajeIa = { remitente: 'ia', texto: `Respuesta simulada de la IA para: "${mensajeUsuario.texto}"` };

      setMensajes((prevMensajes) => [...prevMensajes, mensajeIa]);
      setEstaEscribiendo(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', fontFamily: 'Arial' }}>
      <h2>Mi Mini Chat (Paso 4 - IA Pensando)</h2>

      {/* Contenedor del chat */}
      <div style={{ border: '1px solid #ccc', height: '250px', padding: '10px', overflowY: 'auto', marginBottom: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
        {mensajes.map((msg, index) => (
          <div
            key={index}
            style={{ textAlign: msg.remitente === 'usuario' ? 'right' : 'left', margin: '8px 0' }}
          >
            <span style={{
              background: msg.remitente === 'usuario' ? '#dbeafe' : '#e2f8f0',
              padding: '6px 10px',
              borderRadius: '8px',
              display: 'inline-block',
              maxWidth: '80%'
            }}>
              <b>{msg.remitente === 'usuario' ? '👤 Tú: ' : '🤖 IA: '}</b>
              {msg.texto}
            </span>
          </div>
        ))}

        {estaEscribiendo && (
          <p style={{ color: '#666', fontStyle: 'italic', fontSize: '14px' }}>
            🤖 La IA está escribiendo...
          </p>
        )}
      </div>

      {/* Formulario */}
      <form onSubmit={manejarEnvio} style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={textoInput}
          onChange={(e) => setTextoInput(e.target.value)}
          placeholder="Escribe algo..."
          style={{ flex: 1, padding: '8px' }}
          disabled={estaEscribiendo}
        />
        <button
          type="submit"
          disabled={estaEscribiendo}
          style={{ padding: '8px 12px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', opacity: estaEscribiendo ? 0.6 : 1 }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;