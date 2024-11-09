import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './app.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <App />
      <Toaster closeButton />
    </>
  </StrictMode>
);
