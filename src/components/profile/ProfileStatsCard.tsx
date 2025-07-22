
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileStatsCardProps {
  stats: Array<{ label: string; value: number }>;
  isPublicView?: boolean;
}

export const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({ stats, isPublicView = false }) => {
  const isMobile = useIsMobile();
  
  // Handle edge cases for better performance
  const statsToRender = stats?.length > 0 ? stats : [];
  const gridCols = Math.min(statsToRender.length, 3);
  
  if (statsToRender.length === 0) return null;
  
  return (
    <Card className="border-0 bg-gradient-to-br from-green-50/90 to-white/60 backdrop-blur-md shadow-sm overflow-hidden hover:shadow-md transition-all w-full">
      <CardContent className="p-0">
        <div className={`grid grid-cols-${gridCols > 0 ? gridCols : 1} divide-x divide-green-200`}>
          {statsToRender.map((stat, index) => (
            <div 
              key={index} 
              className="text-center py-3 md:py-4 px-2 md:px-3 transition-all hover:bg-green-100/60"
            >
              <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-green-800`}>{stat.value}</p>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-700 truncate`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
