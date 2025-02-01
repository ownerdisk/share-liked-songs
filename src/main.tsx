import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { Footer, Toast } from './components';

import { HashRouter, Routes, Route } from "react-router";
import { GeneratePlaylistPage, ViewPlalistPage, AuthorizePage, HelpPage } from "./pages";
import ProtectedRoute from './router/ProtectedRoute';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Toast />
      <main className="h-full flex flex-col items-center justify-center overflow-auto">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<GeneratePlaylistPage />} />
            <Route path="view" element={<ViewPlalistPage />} />
          </Route>
          <Route path="authorize" element={<AuthorizePage />} />
          <Route path="help" element={<HelpPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  </StrictMode>,
)
