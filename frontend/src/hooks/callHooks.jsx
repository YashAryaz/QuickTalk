import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

export function useSendCall(receiverId, peerId, socket) {
  const { authUser } = useAuthContext();
  const peerInstance = useRef(null);

  useEffect(() => {
    if (peerId) {
      const peer = new Peer(peerId);

      peer.on("open", () => {
        // Emit a 'callUser' event to the server
        socket.emit("callUser", {
          userToCall: receiverId,
          signalData: peerId,
          from: authUser._id,
        });
      });

      peerInstance.current = peer;

      return () => {
        if (peerInstance.current) {
          peerInstance.current.destroy();
        }
      };
    }
  }, [authUser._id, receiverId, peerId, socket]);
}

export function useReceiveCall(callHandler) {
  const { incomingCall } = useSocketContext();

  useEffect(() => {
    if (incomingCall) {
      callHandler(incomingCall.signal);
    }
  }, [incomingCall, callHandler]);
}
