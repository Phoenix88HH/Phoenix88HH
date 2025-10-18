import { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import StatusBar from './components/StatusBar';
import TarsAvatar from './components/TarsAvatar';
import SettingsPanel from './components/SettingsPanel';
import { useSettingsStore } from './store/settingsStore';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { apiKey } = useSettingsStore();

  // On app load, try to sync the stored API key with the backend
  useEffect(() => {
    const syncKeyWithBackend = async () => {
      if (apiKey) {
        console.log("[TARS] Found API key in local storage. Syncing with backend...");
        try {
          await fetch('http://localhost:8000/api/config/set-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey }),
          });
        } catch (error) {
          console.error("[TARS] Failed to sync API key with backend on startup.", error);
        }
      }
    };
    syncKeyWithBackend();
  }, [apiKey]); // Reruns if the key changes in another tab, for example.

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0e14] text-[#e6edf3] font-sans">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <main className="flex-1 flex flex-col items-center p-4 overflow-y-auto">
        <TarsAvatar />
        <ChatArea />
      </main>
      <MessageInput />
      <StatusBar />
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  )
}

export default App