import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://backend-4-p3xw.onrender.com');

const Chat = ({ appointmentId, sender, recipient }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch chat history when component mounts and join room
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`https://backend-4-p3xw.onrender.com/api/chat/${appointmentId}`);
        setMessages(response.data); // Assume response.data is an array of messages
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
    socket.emit('joinRoom', appointmentId); // Join the specific room for this appointment

    // Listen for incoming messages
    socket.on('message', (msg) => {
      if (msg.appointmentId === appointmentId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
        scrollToBottom();
      }
    });

    // Clean up the event listener and leave room on component unmount
    return () => {
      socket.emit('leaveRoom', appointmentId); // Optional: Leave room on unmount
      socket.off('message');
    };
  }, [appointmentId]);

  // Scroll to the bottom of the message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (message.trim()) {
      const msg = {
        appointmentId,
        sender,
        recipient,
        message
      };
      socket.emit('sendMessage', msg); // Emit the message with details
      setMessage('');
      scrollToBottom();
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="border p-4 mb-4 h-64 overflow-y-scroll">
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.sender}: </strong>{msg.message}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2">
        Send
      </button>
    </div>
  );
};

export default Chat;
