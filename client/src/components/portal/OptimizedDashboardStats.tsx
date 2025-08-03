import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Star, Calendar, Globe, Heart, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        {change && (
          <p className="text-xs text-green-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

interface OptimizedDashboardStatsProps {
  user?: any;
}

const OptimizedDashboardStats: React.FC<OptimizedDashboardStatsProps> = ({ user }) => {
  const stats = [
    {
      title: "Experiencias Activas",
      value: 3,
      change: "+12% este mes",
      icon: <Star className="w-4 h-4 text-white" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Visualizaciones",
      value: "1.2K",
      change: "+18% esta semana",
      icon: <Globe className="w-4 h-4 text-white" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Contactos Nuevos",
      value: 8,
      change: "+25% este mes",
      icon: <Users className="w-4 h-4 text-white" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Calificación Promedio",
      value: "4.8",
      change: "Excelente",
      icon: <Heart className="w-4 h-4 text-white" />,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const achievements = [
    { title: "Perfil Verificado", icon: <Award className="w-4 h-4" />, color: "text-green-400" },
    { title: "Top Proveedor", icon: <Star className="w-4 h-4" />, color: "text-yellow-400" },
    { title: "Sostenibilidad", icon: <Heart className="w-4 h-4" />, color: "text-green-400" }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-unbounded font-light flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Objetivos del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Publicar 2 experiencias nuevas</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-sm text-green-400">1/2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Alcanzar 50 contactos</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <span className="text-sm text-blue-400">40/50</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Mantener calificación +4.5</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  ✓ Completado
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-unbounded font-light flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Logros Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {achievements.map((achievement, index) => (
                <Badge 
                  key={achievement.title}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/15 transition-colors"
                >
                  <span className={achievement.color}>{achievement.icon}</span>
                  <span className="ml-2">{achievement.title}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OptimizedDashboardStats;