import React from 'react';
import { useChatStore, Message } from '../store/chatStore';
import MarkdownRenderer from './MarkdownRenderer';

const ChatMessage = ({ author, children }) => {
  const isTars = author === 'TARS';
  return (
    <div className={`flex my-2 ${isTars ? 'justify-start' : 'justify-end'}`}>
      <div className={`px-4 py-2 rounded-lg max-w-3xl shadow ${isTars ? 'bg-gray-800' : 'bg-cyan-800/50'}`}>
        <p className="font-bold text-sm mb-1 text-cyan-400">{author}</p>
        <div className="text-white">
          <MarkdownRenderer content={children} />
        </div>
      </div>
    </div>
  );
};

const ChatArea = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="w-full max-w-4xl px-4 flex-1 overflow-y-auto">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} author={msg.author}>
          {msg.text}
        </ChatMessage>
      ))}
    </div>
  );
};

export default ChatArea;