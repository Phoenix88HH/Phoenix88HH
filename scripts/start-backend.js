const { spawn } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';
const venvPath = path.join('backend', 'venv');
const executable = isWindows ? 'uvicorn.exe' : 'uvicorn';
const uvicornPath = isWindows
  ? path.join(venvPath, 'Scripts', executable)
  : path.join(venvPath, 'bin', executable);

console.log(`[TARS] Attempting to start backend server using: ${uvicornPath}`);

const backend = spawn(
  uvicornPath,
  ['backend.main:app', '--reload', '--port', '8000'],
  { stdio: 'inherit' } // Pipe output to parent process
);

backend.on('error', (err) => {
  console.error('[TARS] Failed to start backend server:', err);
  console.error('[TARS] Please ensure the backend virtual environment is set up correctly.');
});

backend.on('close', (code) => {
  console.log(`[TARS] Backend server process exited with code ${code}`);
});