import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Zap } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

interface SolarBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const SolarBreadcrumb: React.FC<SolarBreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`breadcrumb-nav ${className}`}
      aria-label="Navegación contextual"
    >
      <div className="flex items-center space-x-2 text-sm">
        {/* Energy indicator */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-yellow-400"
        >
          <Zap size={14} />
        </motion.div>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Breadcrumb Item */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              {item.icon && (
                <span className="text-white/60">
                  {item.icon}
                </span>
              )}
              
              {item.href && !item.current ? (
                <a
                  href={item.href}
                  className="breadcrumb-item hover:text-green-400 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <span className={item.current ? 'breadcrumb-current' : 'breadcrumb-item'}>
                  {item.label}
                </span>
              )}
            </motion.div>

            {/* Separator */}
            {index < items.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.05 }}
                className="breadcrumb-separator"
              >
                <ChevronRight size={14} />
              </motion.div>
            )}
          </React.Fragment>
        ))}

        {/* Solar energy trail */}
        <motion.div
          animate={{ 
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="ml-4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full blur-sm"
        />
      </div>
    </motion.nav>
  );
};

export default SolarBreadcrumb;