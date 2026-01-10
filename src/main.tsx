import { createRoot } from 'react-dom/client'
import { App } from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css'
import { Configure } from './pages/Configure.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/configurar/:month/:year" element={<Configure />} />
    </Routes>
  </BrowserRouter>,
)
