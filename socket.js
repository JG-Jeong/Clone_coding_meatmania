const SocketIO = require("socket.io");
// const createAdapter = require('socket.io-redis');
const server = require("./app");
const io = SocketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})

//연결이 됐을때
io.on("connection", (socket) => {
    console.log("Connected to Browser ✅" + socket)
    
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    
    
    
    
    
    
    
    
})