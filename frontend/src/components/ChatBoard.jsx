import phone from '../assets/phone.svg';
import video from '../assets/videosvg.svg';
import search from '../assets/searchicon.svg';
import './ChatBoard.css';
import mic from '../assets/mic.svg';
import { useEffect, useState } from "react";
import { useRef } from "react";
import useConversation from "../zustand/useConversation";
import ListenMessages from "../hooks/ListenMessages";
import GetMessages from "../hooks/GetMessages";
import useSendMessages from "../hooks/userSendMessages";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import { MdPermMedia } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import VideoCallTemplate from "./VideoCallTemplate";
import callSound from "../assets/sounds/callSound.mp3";

function ChatBoard() {
  const [message, setMessage] = useState("");
  const { sendMessage, sendImage } = useSendMessages();
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [image, setImage] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const { incomingCall } = useSocketContext();
  const [showPreview, setShowPreview] = useState(false);
  // ... other code ...

  const handleVideoCall = () => {
    alert("Video call feature is still in progress");
    setShowVideoCall(true);
  };

  const closeVideoCall = () => {
    setShowVideoCall(false);
  };
  useEffect(() => {
    let ringtoneTimeout;

    const handleIncomingCall = async () => {
      // Play bell sound
      const sound = new Audio(callSound);
      sound.play();

      // Show confirmation window
      const isAccept = await new Promise((resolve) => {
        const confirmed = window.confirm(
          "Incoming call from " + incomingCall.name,
        );
        sound.pause(); // Pause the bell sound
        resolve(confirmed);
      });

      if (isAccept) {
        setShowVideoCall(true);

        // Stop ringtone after 15 seconds
        setTimeout(() => {
          sound.pause();
          sound.currentTime = 0; // Reset audio to the beginning for future playbacks
        }, 15000); // 15 seconds
      }
    };

    if (incomingCall) {
      handleIncomingCall();
    }

    // Clean up the timeout when the component unmounts or when incomingCall changes
    return () => {
      clearTimeout(ringtoneTimeout);
    };
  }, [incomingCall]);

  // useEffect(() => {
  // 	// cleanup function (unmounts)
  // 	return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);
  const handleFileChange = (e) => {
    setShowPreview(true);
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      await sendImage(image);
      setShowPreview(false);
      setImage(null);
    } else if (message) {
      await sendMessage(message);
      setMessage("");
    }
  };
  const { messages, loading } = GetMessages();
  ListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  return (
    <div className="ChatBoard">
      <div className="ChatBoard__header">
        <div className="ChatBoard__headerLeft">
          <img src={selectedConversation.profilePic} id="profile" alt="" />
          <div className="user-info">
            <div className="user-name">{selectedConversation.username}</div>
            <div className="user-status">
              {onlineUsers.includes(selectedConversation._id)
                ? "Online"
                : "Offline"}
            </div>
          </div>
        </div>
        <div className="ChatBoard__headerRight">
          <img src={video} id="video-svg" alt="" onClick={handleVideoCall} />
          <img src={phone} id="phone-svg" alt="" />
          <img src={search} id="search-svg" alt="" />
        </div>
      </div>
      <div className="ChatBoard__body">
        {showVideoCall && (
          <VideoCallTemplate
            onClose={closeVideoCall}
            receiverId={selectedConversation._id}
          />
        )}
        {messages.map(
          (message) =>
            (selectedConversation._id == message.senderId ||
              selectedConversation._id == message.receiverId) && (
              <div
                key={message._id}
                className={`message ${
                  message.senderId === authUser._id ? "sent" : "received"
                }`}
                ref={lastMessageRef}
              >
                {message.message.startsWith("/uploads/") && (
                  <img
                    id="sentimg"
                    src={`https://quicktalk-b0rb.onrender.com${message.message}`}
                    alt="Message Image"
                  />
                )}
                {!message.message.startsWith("/uploads/") && message.message}
                <div className="message-time">
                  {extractTime(message.updatedAt)}
                </div>
              </div>
            ),
        )}
      </div>
      {showPreview && (<div className="image-preview">
        <img className='imgPreview' src={URL.createObjectURL(image)} alt="Preview" />
      </div>)}
      <div className="ChatBoard__footer">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input">
          <MdPermMedia />
        </label>
        <input
          type="text"
          id="text-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type a message..."
        />
        <IoMdSend size="2em" onClick={handleSubmit} className="icon-send" />
        <img src={mic} alt="Microphone" id="mic-svg" />
      </div>
    </div>
  );
}

export default ChatBoard;
