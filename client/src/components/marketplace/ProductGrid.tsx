
import React from 'react';
import { ProductCard } from './ProductCard';
import { marketplaceProducts } from '@/data/marketplaceProducts';
import { Search } from 'lucide-react';

interface ProductGridProps {
  searchQuery: string;
  activeFilters: {
    tipo: string[];
    region: string[];
    impacto: string[];
  };
}

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery, activeFilters }) => {
  const filteredProducts = marketplaceProducts.filter(product => {
    // Filter by search query
    if (searchQuery && !product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.region.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.comunidad.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tipo
    if (activeFilters.tipo.length > 0 && !activeFilters.tipo.includes(product.tipo)) {
      return false;
    }
    
    // Filter by region
    if (activeFilters.region.length > 0 && !activeFilters.region.includes(product.region)) {
      return false;
    }
    
    // Filter by impacto
    if (activeFilters.impacto.length > 0 && 
        !product.impactos.some(impacto => activeFilters.impacto.includes(impacto))) {
      return false;
    }
    
    return true;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border border-dashed border-green-200 rounded-lg bg-green-50/50 px-4">
        <Search className="h-12 w-12 text-green-300 mb-4" />
        <h3 className="text-xl font-medium text-foreground mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground max-w-md">
          Intenta ajustar tus filtros o busca con otros términos para encontrar productos que se ajusten a tus criterios.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-4">
        Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
