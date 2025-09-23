import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomNav?: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  header,
  bottomNav,
  className = ""
}) => {
  return (
    <div className={`min-h-[100svh] flex flex-col ${className}`}>
      {/* Fixed Header - 3.5rem (h-14) */}
      {header && (
        <header className="fixed top-0 left-0 right-0 z-50 h-14">
          {header}
        </header>
      )}
      
      {/* Main Content - Reserve space for header and bottom nav */}
      <main 
        className={`flex-1 ${
          header ? 'pt-14' : 'pt-0'
        } ${
          bottomNav ? 'pb-16' : 'pb-0'
        }`}
        style={{ 
          // Ensure content doesn't get cut off by mobile browser chrome
          minHeight: bottomNav 
            ? 'calc(100svh - 3.5rem - 4rem)' 
            : header 
              ? 'calc(100svh - 3.5rem)' 
              : '100svh'
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      
      {/* Fixed Bottom Navigation - 4rem (h-16) */}
      {bottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 h-16">
          {bottomNav}
        </nav>
      )}
    </div>
  );
};

// Mobile-first skeleton components to reserve space
export const AppSkeleton: React.FC<{ 
  lines?: number; 
  className?: string;
  aspectRatio?: string;
}> = ({ 
  lines = 3, 
  className = "", 
  aspectRatio 
}) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {aspectRatio && (
      <div className={`bg-gray-300 rounded-lg ${aspectRatio}`}></div>
    )}
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i}
        className={`h-4 bg-gray-300 rounded ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

// Card wrapper with reserved space
export const AppCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  minHeight?: string;
}> = ({ 
  children, 
  className = "", 
  isLoading = false,
  minHeight = "min-h-32"
}) => (
  <div className={`${minHeight} ${className}`}>
    {isLoading ? (
      <AppSkeleton lines={3} aspectRatio="aspect-video" />
    ) : (
      children
    )}
  </div>
);