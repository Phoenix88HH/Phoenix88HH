import React from 'react';

const ChatMessage = ({ author, children }) => {
  const isTars = author === 'TARS';
  return (
    <div className={`flex my-2 ${isTars ? 'justify-start' : 'justify-end'}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xl ${isTars ? 'bg-gray-700' : 'bg-cyan-600'}`}>
        <p className="font-bold text-sm mb-1">{author}</p>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
};

const ChatArea = () => {
  return (
    <div className="w-full max-w-4xl px-4 flex-1">
      <ChatMessage author="You">
        <p>Explain this function to me.</p>
      </ChatMessage>
      <ChatMessage author="TARS">
        <p>Analyzing... The function appears to calculate the factorial of a given number using recursion.</p>
      </ChatMessage>
    </div>
  );
};

export default ChatArea;