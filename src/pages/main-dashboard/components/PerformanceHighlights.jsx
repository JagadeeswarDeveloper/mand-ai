import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceHighlights = () => {
  const navigate = useNavigate();

  const weeklyData = [
    { day: 'Mon', views: 450, clicks: 32, engagement: 7.1 },
    { day: 'Tue', views: 680, clicks: 48, engagement: 7.0 },
    { day: 'Wed', views: 520, clicks: 41, engagement: 7.9 },
    { day: 'Thu', views: 750, clicks: 67, engagement: 8.9 },
    { day: 'Fri', views: 890, clicks: 89, engagement: 10.0 },
    { day: 'Sat', views: 1200, clicks: 108, engagement: 9.0 },
    { day: 'Sun', views: 980, clicks: 95, engagement: 9.7 }
  ];

  const channelData = [
    { name: 'WhatsApp', value: 45, color: '#25D366' },
    { name: 'Facebook', value: 30, color: '#1877F2' },
    { name: 'Instagram', value: 20, color: '#E4405F' },
    { name: 'SMS', value: 5, color: '#FF6B35' }
  ];

  const totalViews = weeklyData?.reduce((sum, day) => sum + day?.views, 0);
  const totalClicks = weeklyData?.reduce((sum, day) => sum + day?.clicks, 0);
  const avgEngagement = (weeklyData?.reduce((sum, day) => sum + day?.engagement, 0) / weeklyData?.length)?.toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Performance Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Weekly Performance</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/analytics-dashboard')}
            iconName="TrendingUp"
            iconSize={16}
          >
            Details
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalViews?.toLocaleString('en-IN')}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{totalClicks}</div>
            <div className="text-sm text-muted-foreground">Total Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{avgEngagement}%</div>
            <div className="text-sm text-muted-foreground">Avg Engagement</div>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Bar dataKey="views" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Channel Distribution */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Channel Distribution</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/multi-channel-delivery')}
            iconName="Send"
            iconSize={16}
          >
            Manage
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-3">
            {channelData?.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: channel?.color }}
                  ></div>
                  <span className="text-sm font-medium text-card-foreground">
                    {channel?.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-card-foreground">
                  {channel?.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-card-foreground">Best Performing</span>
          </div>
          <p className="text-sm text-muted-foreground">
            WhatsApp campaigns show 45% higher engagement rates this week
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceHighlights;