import React from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

const MessageInput = () => {
  return (
    <div className="px-4 pb-4 flex-shrink-0">
      <div className="w-full max-w-4xl mx-auto bg-[#161b22] rounded-lg border border-gray-700 flex items-center p-2">
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none px-2"
        />
        <button className="text-gray-400 hover:text-white p-2">
          <Paperclip size={20} />
        </button>
        <button className="text-gray-400 hover:text-white p-2">
          <Mic size={20} />
        </button>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-md ml-2">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;