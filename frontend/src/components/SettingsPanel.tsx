import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { apiKey, setApiKey } = useSettingsStore();
  const [localApiKey, setLocalApiKey] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'saving' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  useEffect(() => {
    if (isOpen) {
      setLocalApiKey(apiKey);
      setStatus({ type: 'idle', message: '' });
    }
  }, [isOpen, apiKey]);

  if (!isOpen) {
    return null;
  }

  const handleSave = async () => {
    setStatus({ type: 'saving', message: 'Verifying key...' });
    try {
      const response = await fetch('http://localhost:8000/api/config/set-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: localApiKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid API Key');
      }

      setApiKey(localApiKey);
      setStatus({ type: 'success', message: 'API Key saved and verified!' });
    } catch (error) {
      setStatus({ type: 'error', message: (error as Error).message });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              className="w-full bg-[#0a0e14] border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="sk-..."
            />
          </div>

          <div className="flex items-center justify-end h-8">
            {status.type === 'success' && <div className="flex items-center text-green-400 text-sm mr-4"><CheckCircle size={16} className="mr-1" />{status.message}</div>}
            {status.type === 'error' && <div className="flex items-center text-red-400 text-sm mr-4"><AlertTriangle size={16} className="mr-1" />{status.message}</div>}
            <button
              onClick={handleSave}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-600"
              disabled={status.type === 'saving'}
            >
              {status.type === 'saving' ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;