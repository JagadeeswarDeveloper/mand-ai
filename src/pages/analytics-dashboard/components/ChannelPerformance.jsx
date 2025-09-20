import React from 'react';
import Icon from '../../../components/AppIcon';

const ChannelPerformance = ({ channels }) => {
  const formatIndianNumber = (num) => {
    return new Intl.NumberFormat('en-IN')?.format(num);
  };

  const getChannelIcon = (channel) => {
    switch (channel?.toLowerCase()) {
      case 'whatsapp': return 'MessageCircle';
      case 'sms': return 'MessageSquare';
      case 'facebook': return 'Facebook';
      case 'instagram': return 'Instagram';
      default: return 'Send';
    }
  };

  const getChannelColor = (channel) => {
    switch (channel?.toLowerCase()) {
      case 'whatsapp': return 'bg-green-500';
      case 'sms': return 'bg-blue-500';
      case 'facebook': return 'bg-blue-600';
      case 'instagram': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceLevel = (ctr) => {
    if (ctr >= 5) return { label: 'Excellent', color: 'text-success' };
    if (ctr >= 3) return { label: 'Good', color: 'text-warning' };
    return { label: 'Needs Improvement', color: 'text-error' };
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Channel Performance</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Last 30 days</span>
        </div>
      </div>
      <div className="space-y-4">
        {channels?.map((channel, index) => {
          const performance = getPerformanceLevel(channel?.ctr);
          const maxEngagement = Math.max(...channels?.map(c => c?.engagement));
          const engagementPercentage = (channel?.engagement / maxEngagement) * 100;

          return (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 nav-transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 ${getChannelColor(channel?.name)} rounded-lg`}>
                    <Icon name={getChannelIcon(channel?.name)} size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-card-foreground">{channel?.name}</h4>
                    <p className={`text-sm font-medium ${performance?.color}`}>
                      {performance?.label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">{channel?.ctr}%</p>
                  <p className="text-xs text-muted-foreground">CTR</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-sm font-semibold text-card-foreground">
                    {formatIndianNumber(channel?.sent)}
                  </p>
                  <p className="text-xs text-muted-foreground">Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-card-foreground">
                    {formatIndianNumber(channel?.delivered)}
                  </p>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-card-foreground">
                    {formatIndianNumber(channel?.engagement)}
                  </p>
                  <p className="text-xs text-muted-foreground">Engaged</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Engagement Rate</span>
                  <span>{((channel?.engagement / channel?.delivered) * 100)?.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getChannelColor(channel?.name)}`}
                    style={{ width: `${engagementPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelPerformance;