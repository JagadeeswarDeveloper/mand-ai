import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PerformanceSummary = ({ campaigns }) => {
  // Calculate summary metrics
  const totalCampaigns = campaigns?.length;
  const activeCampaigns = campaigns?.filter(c => c?.status === 'sent' || c?.status === 'scheduled')?.length;
  const totalViews = campaigns?.reduce((sum, c) => sum + (c?.metrics?.views || 0), 0);
  const totalClicks = campaigns?.reduce((sum, c) => sum + (c?.metrics?.clicks || 0), 0);
  const avgCTR = totalViews > 0 ? ((totalClicks / totalViews) * 100)?.toFixed(1) : 0;

  // Performance data for charts
  const performanceData = [
    { name: 'Views', value: totalViews, color: '#1E40AF' },
    { name: 'Clicks', value: totalClicks, color: '#059669' },
    { name: 'Shares', value: Math.floor(totalClicks * 0.3), color: '#F59E0B' }
  ];

  const channelData = [
    { name: 'WhatsApp', campaigns: campaigns?.filter(c => c?.channels?.includes('whatsapp'))?.length, color: '#10B981' },
    { name: 'SMS', campaigns: campaigns?.filter(c => c?.channels?.includes('sms'))?.length, color: '#3B82F6' },
    { name: 'Facebook', campaigns: campaigns?.filter(c => c?.channels?.includes('facebook'))?.length, color: '#8B5CF6' },
    { name: 'Instagram', campaigns: campaigns?.filter(c => c?.channels?.includes('instagram'))?.length, color: '#EC4899' }
  ];

  const topPerformers = campaigns?.filter(c => c?.metrics)?.sort((a, b) => (b?.metrics?.ctr || 0) - (a?.metrics?.ctr || 0))?.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{totalCampaigns}</p>
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="Play" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{activeCampaigns}</p>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Eye" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{totalViews?.toLocaleString('en-IN')}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Icon name="MousePointer" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{avgCTR}%</p>
              <p className="text-sm text-muted-foreground">Avg CTR</p>
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Performance Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Channel Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="campaigns"
                >
                  {channelData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {channelData?.map((channel, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel?.color }}></div>
                <span className="text-sm text-muted-foreground">{channel?.name}: {channel?.campaigns}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Performers */}
      {topPerformers?.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Top Performing Campaigns</h3>
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          
          <div className="space-y-3">
            {topPerformers?.map((campaign, index) => (
              <div key={campaign?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{campaign?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign?.metrics?.views} views • {campaign?.metrics?.clicks} clicks
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-success">{campaign?.metrics?.ctr}%</p>
                  <p className="text-xs text-muted-foreground">CTR</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceSummary;