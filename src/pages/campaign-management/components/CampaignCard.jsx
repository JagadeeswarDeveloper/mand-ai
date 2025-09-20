import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CampaignCard = ({ campaign, onEdit, onDuplicate, onViewAnalytics, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'sent': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getChannelIcon = (channel) => {
    const icons = {
      whatsapp: 'MessageCircle',
      sms: 'MessageSquare',
      facebook: 'Facebook',
      instagram: 'Instagram'
    };
    return icons?.[channel] || 'Send';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:elevation-2 nav-transition">
      {/* Campaign Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              src={campaign?.thumbnail} 
              alt={campaign?.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-lg mb-1 truncate">
              {campaign?.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Created: {campaign?.createdDate}
            </p>
            
            {/* Status Badge */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign?.status)}`}>
              {campaign?.status?.charAt(0)?.toUpperCase() + campaign?.status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(campaign?.id)}
            iconName="Edit"
            iconSize={16}
            className="h-8 w-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDuplicate(campaign?.id)}
            iconName="Copy"
            iconSize={16}
            className="h-8 w-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(campaign?.id)}
            iconName="Trash2"
            iconSize={16}
            className="h-8 w-8 p-0 text-error hover:text-error"
          />
        </div>
      </div>
      {/* Campaign Details */}
      <div className="space-y-3">
        {/* Channels */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Channels:</span>
          <div className="flex items-center space-x-1">
            {campaign?.channels?.map((channel, index) => (
              <div key={index} className="flex items-center justify-center w-6 h-6 bg-muted rounded">
                <Icon name={getChannelIcon(channel)} size={14} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        {campaign?.metrics && (
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-semibold text-card-foreground">{campaign?.metrics?.views}</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-card-foreground">{campaign?.metrics?.clicks}</p>
              <p className="text-xs text-muted-foreground">Clicks</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-card-foreground">{campaign?.metrics?.ctr}%</p>
              <p className="text-xs text-muted-foreground">CTR</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewAnalytics(campaign?.id)}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Analytics
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(campaign?.id)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;