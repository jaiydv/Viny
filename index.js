const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const {v4:uuid4} = require("uuid");
const http = require("http");


const port = 3001;

const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(server);


//setting of ejs
app.set('view engine','ejs');
app.set('views',path.join( __dirname,'views'));

// middleware
app.use(express.urlencoded());
app.use(express.static("./assests"))


app.get("/",function(req,res){  
    // res.render("home");    

    return res.redirect("/"+uuid4());

})

app.get("/:room",(req,res)=>{

    res.render('home',{

        roomid: req.params.room
    
    })

})

io.on("connection", (socket)=>{

    // socket.on("join-room",(roomid,userid)=>{
        
    //     console.log(roomid,userid);

    //     socket.join(roomid);
        
    //     // socket.emit("user-connected",userid);
        
    //     socket.to(roomid).emit("user-connected",userid);

    //     socket.on('offer',(userid,offer)=>{
      
    //         socket.broadcast.emit("offer",userid,offer);
    
    //     })
    //     socket.on("answer",(userid,answer)=>{
            
    //         socket.broadcast.emit("answer",userid,answer);
    
    //     })
    //     socket.on("ice-candidate",(userid,iceCandidate)=>{
            
    //         socket.broadcast.emit("ice-candidate",userid,iceCandidate);
    
    //     });

    //     socket.on("disconnect",()=>{

    //         socket.to(roomid).emit("user-disconnected",userid);
            
    //     })

    // })
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
    
        socket.on('disconnect', () => {
          socket.to(roomId).emit('user-disconnected', userId)
        })
      })

})

server.listen(3000,()=>{
    console.log("listening on 3000");
})

app.listen(port,function(err){

    if(err){
        console.log("err");
    }

    console.log("yup server is running");

})