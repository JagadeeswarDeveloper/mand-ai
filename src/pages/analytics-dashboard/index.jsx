import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VoiceNavigationTrigger from '../../components/ui/VoiceNavigationTrigger';
import MetricsOverview from './components/MetricsOverview';
import PerformanceChart from './components/PerformanceChart';
import ChannelPerformance from './components/ChannelPerformance';
import DateRangeSelector from './components/DateRangeSelector';
import SmartSuggestions from './components/SmartSuggestions';
import ExportOptions from './components/ExportOptions';
import RealTimeNotifications from './components/RealTimeNotifications';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [currentDateRange, setCurrentDateRange] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('views');

  // Mock analytics data
  const metricsData = [
    {
      type: 'views',
      label: 'Total Views',
      value: 245680,
      change: 12.5
    },
    {
      type: 'clicks',
      label: 'Total Clicks',
      value: 18450,
      change: 8.3
    },
    {
      type: 'shares',
      label: 'Total Shares',
      value: 3240,
      change: -2.1
    },
    {
      type: 'ctr',
      label: 'Click-Through Rate',
      value: 7.5,
      change: 15.2
    }
  ];

  const chartData = [
    { date: '01/09', value: 12500 },
    { date: '02/09', value: 15200 },
    { date: '03/09', value: 18900 },
    { date: '04/09', value: 16800 },
    { date: '05/09', value: 22100 },
    { date: '06/09', value: 19500 },
    { date: '07/09', value: 24300 },
    { date: '08/09', value: 21800 },
    { date: '09/09', value: 26500 },
    { date: '10/09', value: 23200 },
    { date: '11/09', value: 28900 },
    { date: '12/09', value: 25600 },
    { date: '13/09', value: 31200 },
    { date: '14/09', value: 28800 },
    { date: '15/09', value: 33500 },
    { date: '16/09', value: 30200 },
    { date: '17/09', value: 35800 },
    { date: '18/09', value: 32500 },
    { date: '19/09', value: 38200 },
    { date: '20/09', value: 35900 }
  ];

  const channelData = [
    {
      name: 'WhatsApp',
      sent: 45000,
      delivered: 43200,
      engagement: 12800,
      ctr: 8.2
    },
    {
      name: 'SMS',
      sent: 32000,
      delivered: 31500,
      engagement: 8900,
      ctr: 6.8
    },
    {
      name: 'Facebook',
      sent: 28000,
      delivered: 26800,
      engagement: 7200,
      ctr: 5.9
    },
    {
      name: 'Instagram',
      sent: 22000,
      delivered: 21200,
      engagement: 6800,
      ctr: 7.4
    }
  ];

  const smartSuggestions = [
    {
      type: 'timing',
      title: 'Optimize Posting Time',
      description: 'Your WhatsApp campaigns perform 35% better when sent between 7-9 PM. Consider scheduling future campaigns during this window.',
      priority: 'high',
      metrics: {
        improvement: '+35% engagement',
        confidence: 92
      },
      suggestedDate: '19/09/2025',
      basedOn: 'Last 30 days data'
    },
    {
      type: 'content',
      title: 'Content Format Recommendation',
      description: 'Image-based posts with short text descriptions are generating 28% more shares than text-only content.',
      priority: 'medium',
      metrics: {
        improvement: '+28% shares',
        confidence: 87
      },
      suggestedDate: '18/09/2025',
      basedOn: 'Content analysis'
    },
    {
      type: 'channel',
      title: 'Channel Optimization',
      description: 'Instagram Stories are showing higher engagement rates. Consider allocating more budget to this format.',
      priority: 'medium',
      metrics: {
        improvement: '+22% CTR',
        confidence: 78
      },
      suggestedDate: '17/09/2025',
      basedOn: 'Channel comparison'
    }
  ];

  useEffect(() => {
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate?.setDate(endDate?.getDate() - 30);
    
    setCurrentDateRange({
      startDate,
      endDate,
      label: 'Last 30 Days',
      type: 'month'
    });
  }, []);

  const handleDateRangeChange = (range) => {
    setCurrentDateRange(range);
    // In a real app, this would trigger data refetch
    console.log('Date range changed:', range);
  };

  const handleImplementSuggestion = (suggestion, action) => {
    if (action === 'implement') {
      // Navigate to relevant page based on suggestion type
      switch (suggestion?.type) {
        case 'timing': navigate('/campaign-management');
          break;
        case 'content': navigate('/ai-content-creation');
          break;
        case 'channel': navigate('/multi-channel-delivery');
          break;
        default:
          navigate('/main-dashboard');
      }
    } else {
      console.log('Suggestion dismissed:', suggestion);
    }
  };

  const handleExport = (type, fileName) => {
    console.log(`Exported ${type} file: ${fileName}`);
    // Show success message or notification
  };

  const getChartColor = (metric) => {
    switch (metric) {
      case 'views': return '#1E40AF';
      case 'clicks': return '#059669';
      case 'shares': return '#7C3AED';
      case 'ctr': return '#F59E0B';
      default: return '#1E40AF';
    }
  };

  const getChartTitle = (metric) => {
    switch (metric) {
      case 'views': return 'Views Over Time';
      case 'clicks': return 'Clicks Over Time';
      case 'shares': return 'Shares Over Time';
      case 'ctr': return 'Click-Through Rate Over Time';
      default: return 'Performance Over Time';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into your marketing campaign performance
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/campaign-management')}
                iconName="BarChart3"
                iconPosition="left"
                iconSize={18}
              >
                View Campaigns
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/ai-content-creation')}
                iconName="Plus"
                iconPosition="left"
                iconSize={18}
              >
                Create Campaign
              </Button>
            </div>
          </div>

          {/* Date Range Selector */}
          <DateRangeSelector 
            onDateRangeChange={handleDateRangeChange}
            currentRange={currentDateRange}
          />

          {/* Metrics Overview */}
          <MetricsOverview metrics={metricsData} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Performance Chart - Takes 2 columns */}
            <div className="xl:col-span-2">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Performance Trends</h3>
                  <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                    {metricsData?.map((metric) => (
                      <button
                        key={metric?.type}
                        onClick={() => setSelectedMetric(metric?.type)}
                        className={`px-3 py-1 text-xs font-medium rounded-md nav-transition ${
                          selectedMetric === metric?.type
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {metric?.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <PerformanceChart
                data={chartData}
                chartType="line"
                title={getChartTitle(selectedMetric)}
                color={getChartColor(selectedMetric)}
              />
            </div>

            {/* Real-time Notifications */}
            <div>
              <RealTimeNotifications />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Channel Performance */}
            <ChannelPerformance channels={channelData} />
            
            {/* Smart Suggestions */}
            <SmartSuggestions 
              suggestions={smartSuggestions}
              onImplementSuggestion={handleImplementSuggestion}
            />
          </div>

          {/* Export Options */}
          <ExportOptions onExport={handleExport} />

          {/* Goal Setting Section */}
          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-success rounded-lg">
                  <Icon name="Target" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Monthly Goals</h3>
                  <p className="text-sm text-muted-foreground">Track your progress towards monthly targets</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Views Goal', current: 245680, target: 300000, unit: '' },
                { label: 'Clicks Goal', current: 18450, target: 25000, unit: '' },
                { label: 'CTR Goal', current: 7.5, target: 10, unit: '%' },
                { label: 'Engagement Goal', current: 35400, target: 50000, unit: '' }
              ]?.map((goal, index) => {
                const progress = (goal?.current / goal?.target) * 100;
                const formatNumber = (num) => goal?.unit === '%' ? num : new Intl.NumberFormat('en-IN')?.format(num);
                
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-card-foreground">{goal?.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full nav-transition"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatNumber(goal?.current)}{goal?.unit}</span>
                      <span>{formatNumber(goal?.target)}{goal?.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <VoiceNavigationTrigger />
    </div>
  );
};

export default AnalyticsDashboard;