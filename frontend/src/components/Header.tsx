import React from 'react';
import { Menu, Mic, Settings, Folder, MessageSquare } from 'lucide-react';

type HeaderProps = {
  onSettingsClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="bg-[#12161d] h-12 flex items-center justify-between px-4 border-b border-gray-700 shadow-md flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-cyan-400 tracking-wider">TARS</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white">
          <Mic size={20} />
        </button>
        <button onClick={onSettingsClick} className="text-gray-400 hover:text-white">
          <Settings size={20} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Folder size={20} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <MessageSquare size={20} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {/* Window controls will be handled by Electron, but we can have placeholders if needed */}
      </div>
    </header>
  );
};

export default Header;