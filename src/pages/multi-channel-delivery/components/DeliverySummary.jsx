import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliverySummary = ({ selectedChannels, audienceData, onConfirmDelivery, onSaveAsCampaign }) => {
  const calculateTotalCost = () => {
    return selectedChannels?.reduce((total, channel) => total + channel?.cost, 0);
  };

  const calculateTotalReach = () => {
    if (audienceData?.type === 'all') {
      return audienceData?.count;
    }
    return Math.min(audienceData?.count, selectedChannels?.reduce((max, channel) => Math.max(max, channel?.estimatedReach), 0));
  };

  const getChannelIcon = (name) => {
    const icons = {
      'WhatsApp': 'MessageCircle',
      'SMS': 'MessageSquare',
      'Facebook': 'Facebook',
      'Instagram': 'Instagram'
    };
    return icons?.[name] || 'Send';
  };

  const totalCost = calculateTotalCost();
  const totalReach = calculateTotalReach();
  const costPerContact = totalReach > 0 ? totalCost / totalReach : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
          <Icon name="BarChart3" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Delivery Summary</h3>
          <p className="text-sm text-muted-foreground">Review your campaign details</p>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-card-foreground">{totalReach?.toLocaleString('en-IN')}</div>
          <div className="text-sm text-muted-foreground">Total Reach</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-card-foreground">₹{totalCost?.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Total Cost</div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-card-foreground">₹{costPerContact?.toFixed(3)}</div>
          <div className="text-sm text-muted-foreground">Cost per Contact</div>
        </div>
      </div>
      {/* Selected Channels */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-card-foreground">Selected Channels ({selectedChannels?.length})</h4>
        <div className="space-y-3">
          {selectedChannels?.map((channel) => (
            <div key={channel?.id} className="flex items-center justify-between bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <Icon name={getChannelIcon(channel?.name)} size={20} className="text-primary" />
                <div>
                  <div className="font-medium text-card-foreground">{channel?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Reach: {channel?.estimatedReach?.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-card-foreground">₹{channel?.cost?.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  ₹{(channel?.cost / channel?.estimatedReach)?.toFixed(3)}/contact
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Audience Summary */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h4 className="font-medium text-card-foreground mb-2">Audience Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Audience Type:</span>
            <span className="text-card-foreground capitalize">{audienceData?.type?.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Recipients:</span>
            <span className="text-card-foreground">{audienceData?.count?.toLocaleString('en-IN')}</span>
          </div>
          {audienceData?.type === 'segments' && audienceData?.segments?.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Segments:</span>
              <span className="text-card-foreground">{audienceData?.segments?.length} selected</span>
            </div>
          )}
        </div>
      </div>
      {/* Delivery Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Campaign Readiness</span>
          <span className="text-sm text-success">100% Ready</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-success h-2 rounded-full w-full transition-all duration-500"></div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={onConfirmDelivery}
          iconName="Send"
          iconPosition="left"
          iconSize={18}
          disabled={selectedChannels?.length === 0 || audienceData?.count === 0}
        >
          Confirm & Send Campaign
        </Button>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onSaveAsCampaign}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save as Draft
          </Button>
          <Button
            variant="ghost"
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            Preview Content
          </Button>
        </div>
      </div>
      {/* Cost Breakdown */}
      <div className="border-t border-border pt-4 mt-6">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-card-foreground">
            <span>Cost Breakdown</span>
            <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {selectedChannels?.map((channel) => (
              <div key={channel?.id} className="flex justify-between">
                <span className="text-muted-foreground">{channel?.name}:</span>
                <span className="text-card-foreground">₹{channel?.cost?.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-medium">
              <span className="text-card-foreground">Total:</span>
              <span className="text-card-foreground">₹{totalCost?.toFixed(2)}</span>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default DeliverySummary;