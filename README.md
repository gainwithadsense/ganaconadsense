# Backend para AdSenseDesdeCero

Este es un backend simple en Node.js + Express para manejar los formularios de contacto y el panel de administración.

## 🚀 Cómo ejecutar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el servidor
```bash
npm start
# o
node server.js
```

### 3. Acceder a la aplicación
- **Sitio web**: http://localhost:3000
- **Panel admin**: http://localhost:3000/login.html
- **API de mensajes**: http://localhost:3000/api/messages

## 📁 Estructura del proyecto

- `server.js` - Servidor principal
- `messages.json` - Almacenamiento de mensajes (se crea automáticamente)
- `package.json` - Dependencias
- Archivos HTML/CSS/JS - Frontend

## 🔧 API Endpoints

### POST /api/contact
Envía un mensaje de contacto.
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "subject": "Consulta",
  "message": "Hola, tengo una duda..."
}
```

### GET /api/messages
Obtiene todos los mensajes (requiere autenticación admin).

### PUT /api/messages/:id/read
Marca un mensaje como leído.

### DELETE /api/messages/:id
Elimina un mensaje específico.

### DELETE /api/messages
Elimina todos los mensajes.

## 🔐 Autenticación

- **Usuario**: `admin`
- **Contraseña**: `admin123`
- Los mensajes se almacenan en `messages.json`

## 📊 Características

- ✅ Servidor de archivos estáticos
- ✅ API REST para mensajes
- ✅ Almacenamiento en JSON
- ✅ CORS habilitado
- ✅ Validación básica
- ✅ Panel de administración funcional

## 🚀 Despliegue en producción

Para producción, necesitarás:
1. Un servidor con Node.js
2. Una base de datos real (PostgreSQL, MongoDB)
3. Variables de entorno para configuración
4. HTTPS habilitado

¡El backend está listo para desarrollo local!