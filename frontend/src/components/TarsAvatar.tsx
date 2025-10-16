import React from 'react';

const TarsAvatar = () => {
  return (
    <div className="my-8 flex items-center justify-center">
      <div className="w-24 h-32 border-2 border-cyan-400/50 bg-cyan-900/10 p-2 flex items-center justify-center shadow-[0_0_15px_rgba(57,186,230,0.4)]">
        <div className="w-full h-full border border-cyan-400/60 flex flex-col justify-between items-center py-4">
          <div className="w-3/4 h-0.5 bg-cyan-400/70"></div>
          <div className="w-1/2 h-0.5 bg-cyan-400/70"></div>
          <div className="w-3/4 h-0.5 bg-cyan-400/70"></div>
        </div>
      </div>
    </div>
  );
};

export default TarsAvatar;