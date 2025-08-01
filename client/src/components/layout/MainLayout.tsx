import React, { useState } from 'react';
import { UnifiedHeader } from './UnifiedHeader';
import LoginForm from '../auth/LoginForm';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-[#222408] text-[#FCF8EE]">
      <UnifiedHeader showSearch={true} />
      
      <main className="pt-16">
        {children}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
};