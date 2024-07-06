import React from "react";
import Header from "../components/Header";
import "./VideoCallTemplate.css";
import VideoCall from "./VideoCall";
import { IoClose } from "react-icons/io5";
function VideoCallTemplate({ onClose, receiverId }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="Header">
            <Header />
          </div>
          <span className="close" onClick={onClose}>
            <IoClose />
          </span>
        </div>
        <VideoCall receiverId={receiverId} />
      </div>
    </div>
  );
}

export default VideoCallTemplate;
