import { Server } from 'socket.io'

let io
console.log('hlello---------')
const initializeSocket = (server) => {
  console.log('🔧 Initializing Socket.IO...')

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    }, 
  })

  // Store active rooms and users 
  const activeRooms = new Map()
  const userRooms = new Map()

  io.on('connection', (socket) => {
    console.log('socket---------------')
    console.log('✅ User connected:', socket.id)

    // Handle room creation
    socket.on('create-room', ({ roomName, userId, userName }) => {
      console.log(`📝 Creating room: ${roomName} by ${userName}`)

      if (activeRooms.has(roomName)) {
        socket.emit('room-exists', { message: 'Room already exists' })
        return
      }

      const room = {
        id: roomName,
        name: roomName,
        participants: [{ id: userId, name: userName, socketId: socket.id }],
        messages: [],
        createdAt: new Date(),
      }

      activeRooms.set(roomName, room)
      userRooms.set(socket.id, roomName)

      socket.join(roomName)
      socket.emit('room-created', room)

      // Broadcast updated room list to all users
      io.emit('rooms-updated', Array.from(activeRooms.values()))
      console.log(`✅ Room ${roomName} created successfully`)
    })

    // Handle joining a room
    socket.on('join-room', ({ roomName, userId, userName }) => {
      console.log(`🚪 ${userName} trying to join room: ${roomName}`)

      const room = activeRooms.get(roomName)

      if (!room) {
        socket.emit('room-not-found', { message: 'Room not found' })
        return
      }

      // Check if user is already in the room
      const existingUser = room.participants.find((p) => p.id === userId)
      if (existingUser) {
        // Update socket ID if user reconnected
        existingUser.socketId = socket.id
      } else {
        // Add new participant
        room.participants.push({
          id: userId,
          name: userName,
          socketId: socket.id,
        })
      }

      userRooms.set(socket.id, roomName)
      socket.join(roomName)

      // Send room data to the joining user
      socket.emit('joined-room', room)

      // Notify other users in the room
      socket
        .to(roomName)
        .emit('user-joined', { user: { id: userId, name: userName }, room })

      // Broadcast updated room list to all users
      io.emit('rooms-updated', Array.from(activeRooms.values()))
      console.log(`✅ ${userName} joined room ${roomName}`)
    })

    // Handle sending messages
    socket.on('send-message', ({ roomName, message, userId, userName }) => {
      console.log(`💬 Message from ${userName} in ${roomName}: ${message}`)

      const room = activeRooms.get(roomName)

      if (!room) {
        socket.emit('error', { message: 'Room not found' })
        return
      }

      const newMessage = {
        id: Date.now().toString(),
        text: message,
        userId,
        userName,
        timestamp: new Date(),
      }

      room.messages.push(newMessage)

      // Send message to all users in the room
      io.to(roomName).emit('new-message', newMessage)
      console.log(`✅ Message sent to room ${roomName}`)
    })

    // Handle leaving room
    socket.on('leave-room', ({ roomName, userId }) => {
      console.log(`🚪 User ${userId} leaving room ${roomName}`)

      const room = activeRooms.get(roomName)

      if (room) {
        // Remove user from participants
        room.participants = room.participants.filter((p) => p.id !== userId)

        // If room is empty, delete it
        if (room.participants.length === 0) {
          activeRooms.delete(roomName)
          console.log(`🗑️ Room ${roomName} deleted (empty)`)
        }

        socket.leave(roomName)
        userRooms.delete(socket.id)

        // Notify other users in the room
        socket.to(roomName).emit('user-left', { userId, room })

        // Broadcast updated room list to all users
        io.emit('rooms-updated', Array.from(activeRooms.values()))
      }
    })

    // Handle getting available rooms
    socket.on('get-rooms', () => {
      console.log('📋 Sending room list to client')
      socket.emit('rooms-list', Array.from(activeRooms.values()))
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id)

      const roomName = userRooms.get(socket.id)
      if (roomName) {
        const room = activeRooms.get(roomName)
        if (room) {
          // Remove user from participants
          room.participants = room.participants.filter(
            (p) => p.socketId !== socket.id
          )

          // If room is empty, delete it
          if (room.participants.length === 0) {
            activeRooms.delete(roomName)
            console.log(`🗑️ Room ${roomName} deleted (empty after disconnect)`)
          } else {
            // Notify other users in the room
            socket
              .to(roomName)
              .emit('user-disconnected', { socketId: socket.id, room })
          }

          // Broadcast updated room list to all users
          io.emit('rooms-updated', Array.from(activeRooms.values()))
        }
      }

      userRooms.delete(socket.id)
    })
  })

  console.log('✅ Socket.IO initialized successfully')
  return io
}

export { initializeSocket, io }
