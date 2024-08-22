import React, { useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import { useAuthContext } from "../context/AuthContext";
import "./VideoCall.css"; // Import your CSS file for styling
import { MdCallEnd } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { useSocketContext } from "../context/SocketContext";

function VideoCall(props) {
  const { authUser } = useAuthContext();
  const { socket, incomingCall } = useSocketContext();
  const [peerId, setPeerId] = useState(null);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const callInstance = useRef(null);

  // Inside the VideoCall component

  useEffect(() => {
    const initializePeer = () => {
      const peer = new Peer(authUser._id);

      peer.on("open", (peerId) => {
        setPeerId(peerId);
        // Emit a 'callUser' event to the server
        socket.emit("callUser", {
          userToCall: props.receiverId,
          signalData: peerId,
          from: authUser._id,
          name: authUser.username,
        });
      });

      peer.on("call", (call) => {
        acceptCall(call);
      });

      peerInstance.current = peer;
    };

    initializePeer();

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, [authUser._id, props.receiverId, authUser.username, socket]);

  useEffect(() => {
    if (incomingCall) {
      callUser(incomingCall.signal);
    }
  }, [incomingCall]);

  const callUser = (remotePeerId) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        callInstance.current = call;

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
  };

  const acceptCall = (call) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        callInstance.current = call;
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
  };

  const endCall = () => {
    if (callInstance.current) {
      callInstance.current.close();
      if (currentUserVideoRef.current.srcObject) {
        const tracks = currentUserVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      currentUserVideoRef.current.srcObject = null;
      remoteVideoRef.current.srcObject = null;
      callInstance.current = null;
    }

    // Destroy the Peer instance
    if (peerInstance.current) {
      peerInstance.current.destroy();
      peerInstance.current = null;
    }
  };

  return (
    <div className="VideoCallComp">
      <div className="video-container">
        <video className="local-video" ref={currentUserVideoRef} autoPlay />
        <video className="remote-video" ref={remoteVideoRef} autoPlay />
      </div>
      <div className="footer" onClick={endCall}>
        <BsFillMicMuteFill size="1.5em" />
        <MdCallEnd color="red" size="2em" onClick={endCall} />
      </div>
    </div>
  );
}

export default VideoCall;
