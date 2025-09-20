import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metrics }) => {
  const formatIndianNumber = (num) => {
    return new Intl.NumberFormat('en-IN')?.format(num);
  };

  const getMetricIcon = (type) => {
    switch (type) {
      case 'views': return 'Eye';
      case 'clicks': return 'MousePointer';
      case 'shares': return 'Share2';
      case 'ctr': return 'Target';
      default: return 'BarChart3';
    }
  };

  const getMetricColor = (type) => {
    switch (type) {
      case 'views': return 'bg-blue-500';
      case 'clicks': return 'bg-green-500';
      case 'shares': return 'bg-purple-500';
      case 'ctr': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-xl p-6 hover:elevation-1 nav-transition">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${getMetricColor(metric?.type)} rounded-lg`}>
              <Icon name={getMetricIcon(metric?.type)} size={24} color="white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric?.change >= 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon name={metric?.change >= 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span>{Math.abs(metric?.change)}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-card-foreground">
              {metric?.type === 'ctr' ? `${metric?.value}%` : formatIndianNumber(metric?.value)}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{metric?.label}</p>
            <p className="text-xs text-muted-foreground">
              vs last period: {metric?.change >= 0 ? '+' : ''}{metric?.change}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;