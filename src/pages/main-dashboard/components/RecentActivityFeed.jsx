import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const navigate = useNavigate();

  const recentCampaigns = [
    {
      id: 1,
      title: "Diwali Special Offer - 50% Off",
      thumbnail: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "sent",
      channels: ["whatsapp", "facebook", "instagram"],
      metrics: { views: 1250, clicks: 89, ctr: "7.1%" },
      createdAt: "2025-09-19T14:30:00Z"
    },
    {
      id: 2,
      title: "New Product Launch - Handmade Jewelry",
      thumbnail: "https://images.pixabay.com/photo/2017/11/11/15/58/jewelry-2939191_960_720.jpg",
      status: "scheduled",
      channels: ["whatsapp", "sms"],
      scheduledFor: "2025-09-21T10:00:00Z",
      createdAt: "2025-09-19T11:15:00Z"
    },
    {
      id: 3,
      title: "Weekend Sale - Electronics",
      thumbnail: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80",
      status: "draft",
      channels: ["facebook", "instagram"],
      createdAt: "2025-09-19T09:45:00Z"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-success text-success-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return 'MessageCircle';
      case 'facebook': return 'Facebook';
      case 'instagram': return 'Instagram';
      case 'sms': return 'MessageSquare';
      default: return 'Send';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Recent Activity</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/campaign-management')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {recentCampaigns?.map((campaign) => (
          <div
            key={campaign?.id}
            className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => navigate('/campaign-management')}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={campaign?.thumbnail}
                  alt={campaign?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-card-foreground truncate pr-2">
                  {campaign?.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign?.status)}`}>
                  {campaign?.status?.charAt(0)?.toUpperCase() + campaign?.status?.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                {campaign?.channels?.map((channel, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Icon name={getChannelIcon(channel)} size={16} className="text-muted-foreground" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
                <div>
                  {campaign?.status === 'sent' && campaign?.metrics && (
                    <span>
                      {campaign?.metrics?.views?.toLocaleString('en-IN')} views • {campaign?.metrics?.clicks} clicks • {campaign?.metrics?.ctr} CTR
                    </span>
                  )}
                  {campaign?.status === 'scheduled' && (
                    <span>Scheduled for {formatDate(campaign?.scheduledFor)}</span>
                  )}
                  {campaign?.status === 'draft' && (
                    <span>Draft created</span>
                  )}
                </div>
                <span>{formatDate(campaign?.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;