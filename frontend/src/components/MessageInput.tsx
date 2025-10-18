import React, { useState } from 'react';
import { Paperclip, Mic, Send, LoaderCircle } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useSettingsStore } from '../store/settingsStore';

const MessageInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { addMessage, isLoading, setLoading } = useChatStore();
  const { apiKey } = useSettingsStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading || !apiKey) return;

    const userMessage = {
      id: Date.now().toString(),
      author: 'You' as const,
      text: inputValue,
    };
    addMessage(userMessage);
    const currentInput = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const tarsResponse = {
        id: Date.now().toString() + '-tars',
        author: 'TARS' as const,
        text: data.response || data.error || 'No response from TARS.',
      };
      addMessage(tarsResponse);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      const errorResponse = {
        id: Date.now().toString() + '-error',
        author: 'TARS' as const,
        text: "I seem to be having trouble connecting to my core. Please check the backend server.",
      };
      addMessage(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pb-4 flex-shrink-0">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-[#161b22] rounded-lg border border-gray-700 flex items-center p-2">
        <input
          type="text"
          placeholder={
            !apiKey ? "Please set your OpenAI API key in Settings" :
            isLoading ? "TARS is thinking..." : "Write a message..."
          }
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none px-2 disabled:opacity-50"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading || !apiKey}
        />
        <button type="button" className="text-gray-400 hover:text-white p-2 disabled:opacity-50" disabled={isLoading || !apiKey}>
          <Paperclip size={20} />
        </button>
        <button type="button" className="text-gray-400 hover:text-white p-2 disabled:opacity-50" disabled={isLoading || !apiKey}>
          <Mic size={20} />
        </button>
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-md ml-2 disabled:bg-gray-600" disabled={!inputValue.trim() || isLoading || !apiKey}>
          {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;