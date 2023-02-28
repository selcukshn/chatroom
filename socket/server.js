const socket = require("socket.io")
const express = require("express")
const http = require("http")
const app = express()

const server = http.createServer(app)
const PORT = process.env.PORT || 9999

const webSocket = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"]
    }
})

server.listen(PORT, () => {
    console.log(`listening PORT:${PORT} `);
    webSocket.on('connection', (socket) => {
        const roomName = 'ChatRoom';
        console.log("Bağlantı yapıldı =>", socket.id);

        socket.on('ROOM_CREATED', (data) => {
            socket.emit('ROOM_CREATE', data)
        })

        socket.on('ROOM_JOINED', data => {
            var joinedRoomId = null;
            if (socket.rooms.size > 1) {
                for (const room of socket.rooms) {
                    if (room.substr(0, roomName.length) === roomName) {
                        joinedRoomId = room.substr(roomName.length, 1)
                        socket.leave(roomName + joinedRoomId)
                        console.log(`${socket.id} leaved => ${roomName + joinedRoomId}`);
                    }
                }
            }
            console.log(`${socket.id} joined => ${roomName + data}`);
            socket.join(roomName + data)

        })
        socket.on('ROOM_LEAVED', data => {
            socket.leave(roomName + data)
            console.log(`${socket.id} leaved => ${roomName + data}`);
        })


        socket.on('MESSAGE_SENDED', (data) => {
            socket.to(roomName + data.roomId).emit('MESSAGE_RECEIVE', data)
        })
        socket.on("disconnecting", () => {
            if (socket.rooms.size > 1) {
                for (const room of socket.rooms) {
                    if (room.substr(0, roomName.length) === roomName) {
                        joinedRoomId = room.substr(roomName.length, 1)
                        socket.leave(roomName + joinedRoomId)
                        console.log(`${socket.id} leaved => ${roomName + joinedRoomId}`);
                    }
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('Bağlantı kesildi =>', socket.id);
        })
    })

})