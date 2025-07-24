
import React, { useState } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MarketplaceBanner } from '@/components/marketplace/MarketplaceBanner';
import { MarketplaceQuickAccess } from '@/components/marketplace/MarketplaceQuickAccess';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    tipo: [],
    region: [],
    impacto: []
  });

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prevFilters => {
      const categoryFilters = [...prevFilters[category as keyof typeof prevFilters]];
      
      if (categoryFilters.includes(value)) {
        return {
          ...prevFilters,
          [category]: categoryFilters.filter(filter => filter !== value) as string[]
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...categoryFilters, value]
        };
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({ tipo: [], region: [], impacto: [] });
  };

  return (
    <MainLayout>
      <div className="space-y-4 w-full">
        <MarketplaceBanner />
        <div className="px-4 md:px-6">
          <MarketplaceQuickAccess />
          
          <div className="relative max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Buscar productos, comunidades o regiones..." 
              className="pl-10 bg-card border-border text-foreground h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
            <aside className="lg:col-span-1">
              <MarketplaceFilters 
                activeFilters={activeFilters} 
                onFilterChange={handleFilterChange} 
                onClearFilters={handleClearFilters}
              />
            </aside>
            <main className="lg:col-span-3">
              <ProductGrid 
                searchQuery={searchQuery} 
                activeFilters={activeFilters} 
              />
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
