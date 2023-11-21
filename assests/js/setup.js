// const socket = io();

// console.log("hiii");

// const constraints = {
//     video: true,
//     audio: true
// }

// const localvideo = document.getElementById("localVideo");
// const remotevideo = document.getElementById("remoteVideo");

// // let localStream;


// let media = navigator.mediaDevices.getUserMedia(constraints);
// media.then((stream)=>{
//     localvideo.srcObject = stream;

//     socket.emit("join-room",roomid,10);

//     socket.on("user-connected",(userid)=>{

//         console.log("user-connected: " + userid);

//         socket.emit("hi",10);
//         localStream = stream;
//         for(const track of stream.getTracks()){
        
//             peerconnection.addTrack(track,stream)
//             console.log("ho rh hai");
    
//         }    
//         addPeer(userid,stream);
        


//     });

// });

// media.catch((err)=>{
//     console.log(err);

// })

// const peerconnections = {};
// var pcConfig = { 
//     iceServers: [
//       {
//         urls: "stun:stun.l.google.com:19302"
//       },
//     ]
//   };

// socket.on("connect", () => {
//     console.log("Connected to the signaling server.");
// });

// // console.log(stream);
// const peerconnection = new RTCPeerConnection(pcConfig);
// peerconnection.ontrack = (event) => {
//     console.log("Adding a remote stream for user: ");
//     remotevideo.srcObject = event.streams[0];

// };

// function addPeer(userid, stream) {
//     console.log("i am in peer");
//     console.log("media stream tracks", stream.getTracks());
    
//     // const senderpeerconnection = new RTC
    

//     peerconnection.onicecandidate = (event) => {
//         if (event.candidate) {
//             socket.emit('ice-candidate', userid, event.candidate);
//         }
//     };

//     socket.on("hi",(userid)=>{
//         console.log(userid);    
//     });
    
//     peerconnection.onnegotiationneeded = async () => {
//         try {

//             console.log("i am in onnegotiationnedd");
//             const offer = await peerconnection.createOffer();
            
//             await peerconnection.setLocalDescription(offer);
            
//             console.log("senders offer type: ",peerconnection.localDescription.type);
            
//             console.log("Local description(SEnder):",peerconnection.localDescription);
//             socket.emit("offer", userid, peerconnection.localDescription);

//             console.log(peerconnection.getReceivers());
//             console.log(peerconnection.signalingState);

//         } catch (error) {
//             console.error("Error creating offer:", error);
//         }
//     };

//     peerconnection.oniceconnectionstatechange = (event) => {
//         console.log("ICE connection state: " + peerconnection.iceConnectionState);
//     }

//     console.log(peerconnection.signalingState);
    
//     socket.on("error", (error) => {
//         console.log("Socket.io error:", error);
//     });
  
//     peerconnections[userid] = peerconnection;

//     console.log(peerconnection.signalingState);

// }
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  host: '/',
  port: '8000'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', roomid, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}