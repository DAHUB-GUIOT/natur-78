import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  BarChart3,
  Users,
  Building2,
  Map,
  ShieldCheck,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCcw,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Calendar,
  ChevronRight,
  Home,
  LogOut,
  Settings,
  UserCheck,
  UserX,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  // Check if user is admin
  useEffect(() => {
    if (currentUser && currentUser?.user?.role !== 'admin') {
      window.location.href = '/';
    }
  }, [currentUser]);

  // Fetch platform statistics
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['/api/admin/stats'],
    retry: false,
  });

  // Fetch users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['/api/admin/users'],
    retry: false,
  });

  // Fetch experiences
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ['/api/admin/experiences'],
    retry: false,
  });

  // Fetch admin logs
  const { data: adminLogs = [], isLoading: logsLoading } = useQuery({
    queryKey: ['/api/admin/logs'],
    retry: false,
  });

  // Mutations
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: number; role: string }) => {
      return apiRequest(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      toast({ title: "Rol actualizado exitosamente" });
    },
    onError: () => {
      toast({ title: "Error al actualizar rol", variant: "destructive" });
    },
  });

  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: number; isActive: boolean }) => {
      return apiRequest(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      toast({ title: "Estado de usuario actualizado" });
    },
    onError: () => {
      toast({ title: "Error al actualizar estado", variant: "destructive" });
    },
  });

  const updateExperienceStatus = useMutation({
    mutationFn: async ({ experienceId, status }: { experienceId: number; status: string }) => {
      return apiRequest(`/api/admin/experiences/${experienceId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/experiences'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      toast({ title: "Estado de experiencia actualizado" });
    },
    onError: () => {
      toast({ title: "Error al actualizar estado", variant: "destructive" });
    },
  });

  const deleteExperience = useMutation({
    mutationFn: async (experienceId: number) => {
      return apiRequest(`/api/admin/experiences/${experienceId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/experiences'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      toast({ title: "Experiencia eliminada" });
    },
    onError: () => {
      toast({ title: "Error al eliminar experiencia", variant: "destructive" });
    },
  });

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredExperiences = experiences.filter((exp: any) => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || exp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-gasoek text-gray-900">PANEL DE CONTROL</h2>
        <Button 
          onClick={() => refetchStats()} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Actualizar
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalUsers || 0}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{stats?.newUsersToday || 0} hoy
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Empresas Activas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalCompanies || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.activeCompanies || 0} verificadas
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Experiencias</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalExperiences || 0}
                </p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {stats?.pendingApprovals || 0} pendientes
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Map className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats?.totalRevenue || '0'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.totalBookings || 0} reservas
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adminLogs.slice(0, 5).map((log: any) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  {log.action.includes('approve') && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {log.action.includes('reject') && <XCircle className="w-4 h-4 text-red-600" />}
                  {log.action.includes('delete') && <Trash2 className="w-4 h-4 text-red-600" />}
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-gray-500">
                      {log.targetType} ID: {log.targetId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Por: Admin #{log.adminId}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-gasoek text-gray-900">GESTIÓN DE USUARIOS</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filtrar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="viajero">Viajero</SelectItem>
              <SelectItem value="empresa">Empresa</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.firstName} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select 
                      value={user.role} 
                      onValueChange={(value) => updateUserRole.mutate({ userId: user.id, role: value })}
                      disabled={user.id === currentUser?.user?.id}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viajero">Viajero</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => updateUserStatus.mutate({ 
                            userId: user.id, 
                            isActive: !user.isActive 
                          })}
                          disabled={user.id === currentUser?.user?.id}
                        >
                          {user.isActive ? (
                            <>
                              <UserX className="w-4 h-4 mr-2" />
                              Desactivar
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activar
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderExperiences = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-gasoek text-gray-900">GESTIÓN DE EXPERIENCIAS</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar experiencias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filtrar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="aprobado">Aprobado</SelectItem>
              <SelectItem value="rechazado">Rechazado</SelectItem>
              <SelectItem value="archivado">Archivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredExperiences.map((experience: any) => (
          <Card key={experience.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{experience.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {experience.description?.slice(0, 100)}...
                    </p>
                  </div>
                  <Badge 
                    variant={
                      experience.status === 'aprobado' ? 'default' :
                      experience.status === 'pendiente' ? 'secondary' :
                      experience.status === 'rechazado' ? 'destructive' :
                      'outline'
                    }
                  >
                    {experience.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Categoría</p>
                    <p className="font-medium">{experience.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Precio</p>
                    <p className="font-medium">${experience.adultPricePvp || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duración</p>
                    <p className="font-medium">{experience.duration || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Usuario</p>
                    <p className="font-medium">ID: {experience.userId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {experience.status === 'pendiente' && (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => updateExperienceStatus.mutate({
                          experienceId: experience.id,
                          status: 'aprobado'
                        })}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => updateExperienceStatus.mutate({
                          experienceId: experience.id,
                          status: 'rechazado'
                        })}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rechazar
                      </Button>
                    </>
                  )}
                  {experience.status === 'aprobado' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => updateExperienceStatus.mutate({
                        experienceId: experience.id,
                        status: 'archivado'
                      })}
                    >
                      Archivar
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/experiencia/${experience.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          if (confirm('¿Estás seguro de eliminar esta experiencia?')) {
                            deleteExperience.mutate(experience.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Registro de Actividades</h2>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminLogs.map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <p className="text-sm">{new Date(log.createdAt).toLocaleString()}</p>
                  </TableCell>
                  <TableCell>Admin #{log.adminId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.action.includes('approve') && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {log.action.includes('reject') && <XCircle className="w-4 h-4 text-red-600" />}
                      {log.action.includes('delete') && <Trash2 className="w-4 h-4 text-red-600" />}
                      <span className="text-sm font-medium">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {log.targetType} #{log.targetId}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {log.details && (
                      <p className="text-sm text-gray-500">
                        {JSON.stringify(log.details)}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  if (!currentUser || currentUser.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <ShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Acceso Restringido</h2>
            <p className="text-gray-600 mb-4">
              No tienes permisos para acceder al panel de administración.
            </p>
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-700">
                Admin: {currentUser.user.email}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Inicio
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  apiRequest('/api/auth/logout', { method: 'POST' }).then(() => {
                    window.location.href = '/';
                  });
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="experiences">
              <Map className="w-4 h-4 mr-2" />
              Experiencias
            </TabsTrigger>
            <TabsTrigger value="logs">
              <FileText className="w-4 h-4 mr-2" />
              Registros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="users">
            {renderUsers()}
          </TabsContent>

          <TabsContent value="experiences">
            {renderExperiences()}
          </TabsContent>

          <TabsContent value="logs">
            {renderLogs()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;