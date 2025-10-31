import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SchoolManagement } from './components/SchoolManagement';
import { VendorManagement } from './components/VendorManagement';
import { UserManagement } from './components/UserManagement';
import { Analytics } from './components/Analytics';
import { Communication } from './components/Communication';
import { Settings } from './components/Settings';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
      <Router>
        <div className="flex h-screen bg-[#F9FAFB]">
          <Toaster position="top-right" />

          <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/schools" element={<SchoolManagement />} />
                <Route path="/vendors" element={<VendorManagement />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/support" element={<Communication />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
}