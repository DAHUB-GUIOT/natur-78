
type ImpactIndicatorProps = {
  title: string;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
};

const ImpactIndicator = ({ title, value, trend }: ImpactIndicatorProps) => {
  const getColor = () => {
    if (trend === 'positive') return 'text-green-600';
    if (trend === 'negative') return 'text-red-600';
    return 'text-foreground';
  };
  
  return (
    <div className="text-center p-2">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className={`text-2xl font-bold ${getColor()}`}>{value}</p>
    </div>
  );
};

export const ImpactIndicators = () => {
  return (
    <div className="bg-secondary rounded-lg p-6 mb-6 shadow-sm border border-green-100">
      <h3 className="text-xl font-bold mb-4 text-green-700">Indicadores de Impacto</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ImpactIndicator title="Huella Ecológica" value="-32%" trend="positive" />
        <ImpactIndicator title="Regeneración" value="+15%" trend="positive" />
        <ImpactIndicator title="Economía Local" value="+78%" trend="positive" />
        <ImpactIndicator title="Participación Comunitaria" value="124" trend="neutral" />
      </div>
    </div>
  );
};
