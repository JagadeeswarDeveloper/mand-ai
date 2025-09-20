import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock real-time notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'engagement',
      title: 'High Engagement Alert',
      message: 'Your WhatsApp campaign "Festival Sale" is performing 40% above average',
      timestamp: new Date(Date.now() - 300000),
      priority: 'high',
      actionable: true
    },
    {
      id: 2,
      type: 'trending',
      title: 'Trending Content',
      message: 'Product showcase posts are getting 2x more shares this week',
      timestamp: new Date(Date.now() - 900000),
      priority: 'medium',
      actionable: true
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Milestone Reached',
      message: 'Congratulations! You\'ve reached 10,000 total campaign views',
      timestamp: new Date(Date.now() - 1800000),
      priority: 'low',
      actionable: false
    },
    {
      id: 4,
      type: 'optimization',
      title: 'Optimization Opportunity',
      message: 'Instagram posts perform better when posted between 6-8 PM',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'medium',
      actionable: true
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    
    // Simulate new notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: 'engagement',
        title: 'New Engagement',
        message: `Campaign "${['Diwali Special', 'Weekend Offer', 'New Arrival']?.[Math.floor(Math.random() * 3)]}" received new interactions`,
        timestamp: new Date(),
        priority: 'low',
        actionable: false
      };
      
      setNotifications(prev => [newNotification, ...prev?.slice(0, 9)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'engagement': return 'Heart';
      case 'trending': return 'TrendingUp';
      case 'milestone': return 'Award';
      case 'optimization': return 'Lightbulb';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-border bg-muted/5';
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString('en-IN');
  };

  const handleNotificationAction = (notification) => {
    // Mock action handling
    console.log('Handling notification action:', notification);
  };

  const displayedNotifications = isExpanded ? notifications : notifications?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Bell" size={20} color="white" />
            </div>
            {notifications?.some(n => n?.priority === 'high') && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Live Insights</h3>
            <p className="text-sm text-muted-foreground">Real-time performance alerts</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {displayedNotifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`border-l-4 rounded-lg p-4 ${getNotificationColor(notification?.priority)} hover:elevation-1 nav-transition`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-background rounded-lg mt-1">
                  <Icon name={getNotificationIcon(notification?.type)} size={16} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-card-foreground text-sm">{notification?.title}</h4>
                    <div className={`w-2 h-2 rounded-full ${getPriorityDot(notification?.priority)}`} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {notification?.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification?.timestamp)}
                    </span>
                    {notification?.actionable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNotificationAction(notification)}
                        iconName="ArrowRight"
                        iconPosition="right"
                        iconSize={12}
                        className="text-xs h-6 px-2"
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {notifications?.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
            className="text-sm"
          >
            {isExpanded ? 'Show Less' : `Show ${notifications?.length - 3} More`}
          </Button>
        </div>
      )}
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="Bell" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-medium text-card-foreground mb-2">No New Alerts</h4>
          <p className="text-sm text-muted-foreground">
            We'll notify you when there are important updates about your campaigns.
          </p>
        </div>
      )}
    </div>
  );
};

export default RealTimeNotifications;