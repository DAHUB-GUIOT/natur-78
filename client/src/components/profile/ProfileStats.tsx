
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export interface Stat {
  label: string;
  value: number;
}

export interface ProfileStatsProps {
  stats: Stat[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <Card className="border border-green-100 bg-white/80 backdrop-blur-sm shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-800">Estadísticas</h3>
          <Activity className="h-5 w-5 text-green-600" />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
              <span className="text-2xl font-bold text-green-700">{stat.value}</span>
              <span className="text-xs text-green-600 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
