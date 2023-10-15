const express = require('express');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');


const app = express();
const server = http.createServer(app);
app.use(express.static("./"));

// Crear el servidor HTTP
/*
const httpServer = http.createServer((req, res) => {
  // Lógica para manejar las solicitudes HTTP
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
*/

server.listen(3000); // Puedes usar cualquier puerto libre para el servidor HTTP

// Crear el servidor WebSocket
const wsServer = new WebSocket.Server({server});

// Manejar las conexiones WebSocket
wsServer.on('connection', (ws) => { //funcion anonima
  ws.on('message', (message) => {
    // Supongamos que el mensaje es una tarjeta de pregunta y respuesta en formato JSON
    try {
      const flashcard = JSON.parse(message);

      // Añadir la tarjeta a la lista de tarjetas o realizar alguna acción en función de su contenido
      // Por ejemplo, almacenarla en una base de datos o mostrarla en la interfaz de usuario.

      // Enviar una confirmación de que se ha recibido la tarjeta
      ws.send('Tarjeta de Flashcard recibida correctamente' , flashcard);
    } catch (error) {
      // Manejar errores si el mensaje no es válido JSON, por ejemplo.
      console.error('Error al procesar el mensaje:', error);
      ws.send('Error al procesar la tarjeta de Flashcard');
    }
  });
});

