import { createRoot } from 'react-dom/client'
import { App } from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css'
import { Configure } from './pages/Configure.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { Review } from './pages/View.tsx';
import { AppV2 } from './pages/AppV2.tsx';
import { TableProvider } from './components/table/provider.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/configurar/:month/:year" element={<Configure />} />
        <Route path="/configurar/v2/:month/:year" element={<TableProvider><AppV2 /></TableProvider>} />
        <Route path="/revisar/:month/:year" element={<Review />} />
      </Routes>
    </BrowserRouter>

    <Toaster />
  </>,
)
