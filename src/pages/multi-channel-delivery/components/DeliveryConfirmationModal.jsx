import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryConfirmationModal = ({ isOpen, onClose, onConfirm, deliveryData }) => {
  if (!isOpen) return null;

  const { selectedChannels, audienceData, schedulingData, totalCost, totalReach } = deliveryData;

  const getChannelIcon = (name) => {
    const icons = {
      'WhatsApp': 'MessageCircle',
      'SMS': 'MessageSquare',
      'Facebook': 'Facebook',
      'Instagram': 'Instagram'
    };
    return icons?.[name] || 'Send';
  };

  const formatScheduleTime = () => {
    if (schedulingData?.type === 'now') {
      return 'Immediately';
    }
    return `${schedulingData?.date} at ${schedulingData?.time} (IST)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Send" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Confirm Delivery</h2>
              <p className="text-sm text-muted-foreground">Review and confirm your campaign details</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Overview */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-card-foreground mb-3">Campaign Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Total Reach:</span>
                <div className="text-lg font-semibold text-card-foreground">{totalReach?.toLocaleString('en-IN')} contacts</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Total Cost:</span>
                <div className="text-lg font-semibold text-card-foreground">₹{totalCost?.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Channels:</span>
                <div className="text-lg font-semibold text-card-foreground">{selectedChannels?.length} platforms</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Delivery Time:</span>
                <div className="text-lg font-semibold text-card-foreground">{formatScheduleTime()}</div>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Content Preview</h3>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-card-foreground">
                "🎉 Special Diwali Offer! Get 30% off on all products. Limited time only. Shop now and celebrate with amazing deals! 
                Visit our store or call 9876543210. #DiwaliSale #SpecialOffer"
              </p>
            </div>
          </div>

          {/* Channel Details */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Delivery Channels</h3>
            <div className="space-y-3">
              {selectedChannels?.map((channel) => (
                <div key={channel?.id} className="flex items-center justify-between bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <Icon name={getChannelIcon(channel?.name)} size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-card-foreground">{channel?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Estimated reach: {channel?.estimatedReach?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-card-foreground">₹{channel?.cost?.toFixed(2)}</div>
                    <div className="text-xs text-success">✓ Connected</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Details */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Audience Details</h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Audience Type:</span>
                  <div className="font-medium text-card-foreground capitalize">
                    {audienceData?.type?.replace('_', ' ')}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Total Recipients:</span>
                  <div className="font-medium text-card-foreground">{audienceData?.count?.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-warning mb-1">Important Notice</h4>
                <ul className="text-sm text-card-foreground space-y-1">
                  <li>• Once sent, campaigns cannot be stopped or modified</li>
                  <li>• Delivery charges will be deducted from your account balance</li>
                  <li>• Ensure your content complies with platform guidelines</li>
                  <li>• Delivery reports will be available within 30 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Campaign will be processed immediately after confirmation
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={onConfirm}
              iconName="Send"
              iconPosition="left"
              iconSize={16}
            >
              Confirm & Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmationModal;