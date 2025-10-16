import React from 'react';
import { Power, Bot, Volume2, Smile } from 'lucide-react';

const StatusBar = () => {
  return (
    <footer className="bg-[#12161d] h-8 flex items-center justify-between px-4 text-xs text-gray-400 border-t border-gray-700 flex-shrink-0">
      <div className="flex items-center gap-2">
        <Power size={14} className="text-green-500" />
        <span>Ready</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Bot size={14} />
          <span>Claude 4</span>
        </div>
        <div className="flex items-center gap-1">
          <Volume2 size={14} />
          <span>Voice ON</span>
        </div>
        <div className="flex items-center gap-1">
          <Smile size={14} />
          <span>85%</span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;