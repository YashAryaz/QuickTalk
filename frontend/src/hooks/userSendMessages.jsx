import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const userSendMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const sendImage = async (image) => {
		setLoading(true);
		try {
		  const formData = new FormData();
		  formData.append('image', image);
			console.log("formData",formData);
		  const res = await fetch(`/api/messages/send_image/${selectedConversation._id}`, {
			method: "POST",
			body: formData,
		  });
		  const data = await res.json();
		  if (data.error) throw new Error(data.error);
	
		  setMessages([...messages, data]);
		} catch (error) {
		  toast.error(error.message);
		} finally {
		  setLoading(false);
		}
	  };

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendImage,sendMessage, loading };
};
export default userSendMessages;