import Header from './components/Header';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import StatusBar from './components/StatusBar';
import TarsAvatar from './components/TarsAvatar';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0e14] text-[#e6edf3] font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        <TarsAvatar />
        <ChatArea />
      </main>
      <MessageInput />
      <StatusBar />
    </div>
  )
}

export default App