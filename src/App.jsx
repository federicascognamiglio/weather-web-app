import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MasterLayout from './layouts/MasterLayout';

// Pages
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout */}
          <Route element={<MasterLayout />}>
            {/* Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
