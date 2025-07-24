
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FundraiserSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: {
    categoria: string[];
    departamento: string[];
    ciudad: string[];
    estado: string[];
  };
  setActiveFilters: (filters: any) => void;
}

export function FundraiserSearch({
  searchQuery,
  setSearchQuery,
  activeFilters,
  setActiveFilters,
}: FundraiserSearchProps) {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar campañas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-[#212415] border-[#F5F5F2]/10"
      />
      
      <div className="flex flex-wrap gap-4">
        <Select
          onValueChange={(value) =>
            setActiveFilters({ ...activeFilters, categoria: [value] })
          }
        >
          <SelectTrigger className="w-[200px] bg-[#212415] border-[#F5F5F2]/10">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservacion">Conservación</SelectItem>
            <SelectItem value="cultura">Cultura</SelectItem>
            <SelectItem value="educacion">Educación</SelectItem>
            <SelectItem value="reforestacion">Reforestación</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setActiveFilters({ ...activeFilters, estado: [value] })
          }
        >
          <SelectTrigger className="w-[200px] bg-[#212415] border-[#F5F5F2]/10">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="activa">Activa</SelectItem>
            <SelectItem value="finalizada">Finalizada</SelectItem>
            <SelectItem value="proxima">Próximamente</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={() => {
            setActiveFilters({
              categoria: [],
              departamento: [],
              ciudad: [],
              estado: [],
            });
            setSearchQuery("");
          }}
          className="border-[#F5F5F2]/10 hover:bg-[#F5F5F2]/5 text-black"
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
