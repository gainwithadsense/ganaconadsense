const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// Inicializar archivo de mensajes si no existe
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

// Función para leer mensajes
function readMessages() {
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo mensajes:', error);
    return [];
  }
}

// Función para guardar mensajes
function saveMessages(messages) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error guardando mensajes:', error);
  }
}

// Endpoint para enviar mensaje de contacto
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos' });
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || '',
      message,
      timestamp: new Date().toISOString(),
      read: false
    };

    const messages = readMessages();
    messages.push(newMessage);
    saveMessages(messages);

    console.log('Nuevo mensaje recibido:', newMessage.name);
    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error procesando mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener mensajes (solo para admin)
app.get('/api/messages', (req, res) => {
  try {
    const messages = readMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para marcar mensaje como leído
app.put('/api/messages/:id/read', (req, res) => {
  try {
    const messages = readMessages();
    const messageIndex = messages.findIndex(msg => msg.id === req.params.id);

    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    messages[messageIndex].read = true;
    saveMessages(messages);

    res.json({ success: true });
  } catch (error) {
    console.error('Error marcando mensaje como leído:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para eliminar mensaje
app.delete('/api/messages/:id', (req, res) => {
  try {
    const messages = readMessages();
    const filteredMessages = messages.filter(msg => msg.id !== req.params.id);

    if (filteredMessages.length === messages.length) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    saveMessages(filteredMessages);
    res.json({ success: true });
  } catch (error) {
    console.error('Error eliminando mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para limpiar todos los mensajes
app.delete('/api/messages', (req, res) => {
  try {
    saveMessages([]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error limpiando mensajes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta por defecto - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Archivos estáticos servidos desde: ${__dirname}`);
  console.log(`💾 Mensajes guardados en: ${MESSAGES_FILE}`);
});