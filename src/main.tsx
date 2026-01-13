import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from './components/ui/sonner.tsx';
import { AppPage } from './pages/app-page.tsx'
import { ConfigurePage } from './pages/configure-page.tsx';
import { TableProvider } from './components/table/provider.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter basename="/bulletin">
      <Routes>
        <Route path="/" element={<AppPage />} />
        <Route
          path="/configurar/:month/:year"
          element={
            <TableProvider>
              <ConfigurePage />
            </TableProvider>
          }
        />

      </Routes>
    </BrowserRouter>

    <Toaster />
  </>,
)
