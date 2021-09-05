const express = require("express")
const route = express.Router()

const {pendingRequest,checkRequest,validtyRequest,checkRequestSecurity,pastlistSecurity} = require("../Business_Layer/index")

const auth = require("../middleWares/auth")
// const data = require("./tempData.json")
// const notificationConnection = (socket) => {

//     console.log(`Socket ${socket.id} has connected`);


//     socket.on("join-room", (room, cb) => {
//         socket.join(room)
//         cb(`Joined ${room}`)
//     })

//     socket.on("send-notification", (room, message) => {
//         socket.join(room)
//         if (room != "") {
//             data.presentOrder.push(room)
//             if(data[room]==undefined) data[room]=[]
//             if (message == "1")
//                 data[room].push(data[1])
//             else if (message == "2")
//                 data[room].push(data[2])
//             else if (message == "3")
//                 data[room].push(data[3])

//             // socket.to(room).emit("receive-notification", { message, room })
//         }
//     })

//     socket.on("send-validity", (room, message) => {
//         console.log(room, message)
//         if (room != "") {
//             socket.to(room).emit("receive-validity", { message, room })
//         }
//     })

//     socket.on("check-notification", (room) => {
//         message = checkPresntOrderList(room)
//         socket.to(room).emit("receive-notification", { message, room })
//     })
// }

// function checkPresntOrderList(room) {
//     if (data.presentOrder.includes(room)) return data[room]
// }

// module.exports = notificationConnection


route.post("/api/packageRequest",pendingRequest)
route.post("/api/validRequest",auth,validtyRequest)
route.post("/api/pastListUpdate",pastlistSecurity)
route.get("/api/checkRequest",auth,checkRequest)
route.get("/api/checkRequestSecurity",checkRequestSecurity)




module.exports = route