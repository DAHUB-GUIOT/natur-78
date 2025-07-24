
import { Search, Calendar, GraduationCap, ShoppingCart } from "lucide-react";
import { QuickAccessCard, QuickAccessCardProps } from "./QuickAccessCard";

const quickAccessItems: QuickAccessCardProps[] = [
  {
    title: "Explora",
    description: "Descubre experiencias sostenibles",
    icon: Search,
    bgColor: "bg-green-600/10",
    iconColor: "text-green-600"
  },
  {
    title: "Agenda",
    description: "Eventos y actividades",
    icon: Calendar,
    bgColor: "bg-green-600/10",
    iconColor: "text-green-600"
  },
  {
    title: "Educación",
    description: "Aprende sobre turismo regenerativo",
    icon: GraduationCap,
    bgColor: "bg-green-600/10",
    iconColor: "text-green-600"
  },
  {
    title: "Marketplace",
    description: "Experiencias certificadas",
    icon: ShoppingCart,
    bgColor: "bg-green-600/10",
    iconColor: "text-green-600"
  }
];

export const QuickAccessGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {quickAccessItems.map((item) => (
        <QuickAccessCard key={item.title} {...item} />
      ))}
    </div>
  );
};
