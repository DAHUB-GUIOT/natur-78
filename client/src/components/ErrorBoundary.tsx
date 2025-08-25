import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Error boundary caught an error - handled gracefully
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Error de la Aplicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/70">
                Se ha producido un error inesperado. La aplicación se está recuperando automáticamente.
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recargar Página
                </Button>
                <Button 
                  onClick={() => this.setState({ hasError: false })}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;