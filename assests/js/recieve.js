
// // socket.on("offer", async (sender, offer) => {
// //     try {
// //         // Set the remote description from the offer
// //         console.log("recieved offer");
        
// //         await peerconnection.setRemoteDescription(offer);

// //         console.log("remote sdp type:",offer.type);
        
// //         console.log(peerconnection.setRemoteDescription);
// //         console.log("Remote Description (Receiver):", peerconnection.remoteDescription);

// //         // Create an answer and set it as the local description
// //         const answer = await  peerconnection.createAnswer();

// //         await peerconnection.setLocalDescription(answer);

// //         // console.log("ICE Candidates in Answerer:", peerconnection.localDescription.sdp);
// //         // Send the answer back to the offerer
        
// //         socket.emit('answer', sender, peerconnection.localDescription);
// //         console.log(peerconnection.getReceivers());        
// //         console.log(peerconnection.signalingState);
        
// //     } catch (error) {
// //         console.error("Error handling offer:", error);
// //     }
// // });

// // socket.on("answer", async (receiver, answer) => {
// //     try {
// //         // Set the remote description from the answer
// //         console.log("i am in answer")
// //         if (!peerconnection) {
// //             console.error("peerconnection is undefined");
// //             return;
// //         }

// //         await peerconnection.setRemoteDescription(answer);
// //         console.log("Remote Description (Sender - after receiving answer):", peerconnection.remoteDescription);
// //         // socket.emit()
// //     }catch (error){
// //         console.error("Error handling answer:", error);
// //     }
// // });



// // socket.on("ice-candidate", async (userid,candidate) => {
    
// //     // console.log("i am adding ice-candidate",candidate);

// //     await peerconnection.addIceCandidate(candidate)
        
// //         .catch(error => {
// //             console.error("Error adding ice candidate:", error);
// //         });

// // });


// socket.on("offer", async (sender, offer) => {
//     try {
//         // Set the remote description from the offer
//         console.log("recieved offer");
//         const peerconnection = new RTCPeerConnection(pcConfig);
//         await peerconnection.setRemoteDescription(offer);
//         console.log("remote sdp type:", offer.type);
//         console.log("Remote Description (Receiver):", peerconnection.remoteDescription);
//         // Create an answer and set it as the local description
//         const answer = await peerconnection.createAnswer();
//         await peerconnection.setLocalDescription(answer);
//         // Send the answer back to the offerer
//         socket.emit('answer', sender, peerconnection.localDescription);
//         console.log(peerconnection.getReceivers());        
//         console.log(peerconnection.signalingState);
//     } catch (error) {
//         console.error("Error handling offer:", error);
//     }
// });

// socket.on("answer", async (receiver, answer) => {
//     try {
//         // Set the remote description from the answer
//         console.log("i am in answer")
//         const peerconnection = peerconnections[receiver];
//         if (!peerconnection) {
//             console.error("peerconnection is undefined");
//             return;
//         }
//         await peerconnection.setRemoteDescription(answer);
//         console.log("Remote Description (Sender - after receiving answer):", peerconnection.remoteDescription);
//         // socket.emit()
//     } catch (error){
//         console.error("Error handling answer:", error);
//     }
// });

// socket.on("ice-candidate", async (userid, candidate) => {
//     const peerconnection = peerconnections[userid];
//     if (peerconnection) {
//         await peerconnection.addIceCandidate(candidate)
//         .catch(error => {
//             console.error("Error adding ice candidate:", error);
//         });
//     }
// });
