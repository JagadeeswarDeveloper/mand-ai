import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignManagementCards = () => {
  const navigate = useNavigate();

  const activeCampaigns = [
    {
      id: 1,
      title: "Festival Season Sale",
      type: "Promotional",
      channels: ["whatsapp", "facebook", "instagram", "sms"],
      status: "active",
      reach: 2500,
      engagement: "12.5%",
      budget: "₹5,000",
      endDate: "2025-09-25"
    },
    {
      id: 2,
      title: "New Collection Launch",
      type: "Product Launch",
      channels: ["instagram", "facebook"],
      status: "scheduled",
      reach: 0,
      engagement: "0%",
      budget: "₹3,500",
      startDate: "2025-09-22"
    },
    {
      id: 3,
      title: "Customer Testimonials",
      type: "Brand Building",
      channels: ["whatsapp", "facebook"],
      status: "draft",
      reach: 0,
      engagement: "0%",
      budget: "₹2,000",
      lastEdited: "2025-09-19"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
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

  const handleEditCampaign = (campaignId, e) => {
    e?.stopPropagation();
    navigate('/campaign-management');
  };

  const handleDuplicateCampaign = (campaignId, e) => {
    e?.stopPropagation();
    navigate('/ai-content-creation');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Active Campaigns</h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate('/ai-content-creation')}
          iconName="Plus"
          iconPosition="left"
        >
          New Campaign
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {activeCampaigns?.map((campaign) => (
          <div
            key={campaign?.id}
            className="bg-muted/30 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => navigate('/campaign-management')}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground truncate mb-1">
                  {campaign?.title}
                </h3>
                <p className="text-sm text-muted-foreground">{campaign?.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign?.status)}`}>
                {campaign?.status?.charAt(0)?.toUpperCase() + campaign?.status?.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Channels:</span>
              {campaign?.channels?.map((channel, index) => (
                <div key={index} className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded">
                  <Icon name={getChannelIcon(channel)} size={14} className="text-primary" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Reach:</span>
                <div className="font-medium text-card-foreground">
                  {campaign?.reach?.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Engagement:</span>
                <div className="font-medium text-card-foreground">{campaign?.engagement}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <div className="font-medium text-card-foreground">{campaign?.budget}</div>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {campaign?.status === 'active' ? 'Ends:' : 
                   campaign?.status === 'scheduled' ? 'Starts:' : 'Edited:'}
                </span>
                <div className="font-medium text-card-foreground text-xs">
                  {campaign?.endDate || campaign?.startDate || campaign?.lastEdited}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handleEditCampaign(campaign?.id, e)}
                iconName="Edit"
                iconPosition="left"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDuplicateCampaign(campaign?.id, e)}
                iconName="Copy"
                iconPosition="left"
                className="flex-1"
              >
                Duplicate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignManagementCards;