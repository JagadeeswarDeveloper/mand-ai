import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChannelCard = ({ channel, onToggle, onSetup }) => {
  const getChannelIcon = (name) => {
    const icons = {
      'WhatsApp': 'MessageCircle',
      'SMS': 'MessageSquare',
      'Facebook': 'Facebook',
      'Instagram': 'Instagram'
    };
    return icons?.[name] || 'Send';
  };

  const getChannelColor = (name) => {
    const colors = {
      'WhatsApp': 'bg-green-500',
      'SMS': 'bg-blue-500',
      'Facebook': 'bg-blue-600',
      'Instagram': 'bg-pink-500'
    };
    return colors?.[name] || 'bg-gray-500';
  };

  return (
    <div className={`bg-card border-2 rounded-xl p-6 transition-all duration-200 ${
      channel?.selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 ${getChannelColor(channel?.name)} rounded-lg`}>
            <Icon name={getChannelIcon(channel?.name)} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{channel?.name}</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${channel?.connected ? 'bg-success' : 'bg-error'}`}></div>
              <span className={`text-sm ${channel?.connected ? 'text-success' : 'text-error'}`}>
                {channel?.connected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {channel?.connected && (
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={channel?.selected}
                onChange={() => onToggle(channel?.id)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                channel?.selected ? 'bg-primary border-primary' : 'border-border'
              }`}>
                {channel?.selected && <Icon name="Check" size={14} color="white" />}
              </div>
            </label>
          )}
        </div>
      </div>
      {channel?.connected ? (
        <div className="space-y-3">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-2">Content Preview:</p>
            <p className="text-sm text-card-foreground line-clamp-2">{channel?.contentPreview}</p>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-muted-foreground">Estimated Reach: </span>
              <span className="font-medium text-card-foreground">{channel?.estimatedReach?.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Cost: </span>
              <span className="font-medium text-card-foreground">₹{channel?.cost?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-3">Connect your {channel?.name} account to start delivering content</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetup(channel?.id)}
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
          >
            Setup {channel?.name}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChannelCard;