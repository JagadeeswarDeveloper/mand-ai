import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VoiceNavigationTrigger from '../../components/ui/VoiceNavigationTrigger';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChannelCard from './components/ChannelCard';
import SchedulingPanel from './components/SchedulingPanel';
import AudienceSelector from './components/AudienceSelector';
import DeliverySummary from './components/DeliverySummary';
import DeliveryConfirmationModal from './components/DeliveryConfirmationModal';
import ChannelSetupModal from './components/ChannelSetupModal';

const MultiChannelDelivery = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [audienceData, setAudienceData] = useState({ type: 'all', count: 0 });
  const [schedulingData, setSchedulingData] = useState({ type: 'now' });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [selectedChannelForSetup, setSelectedChannelForSetup] = useState(null);

  // Initialize mock channels data
  useEffect(() => {
    const mockChannels = [
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        connected: true,
        selected: true,
        contentPreview: `🎉 Special Diwali Offer! Get 30% off on all products. Limited time only. Shop now and celebrate with amazing deals! Visit our store or call 9876543210.`,
        estimatedReach: 1850,
        cost: 185.50
      },
      {
        id: 'sms',
        name: 'SMS',
        connected: true,
        selected: false,
        contentPreview: `Special Diwali Offer! Get 30% off on all products. Limited time only. Shop now! Call 9876543210. T&C apply.`,
        estimatedReach: 2100,
        cost: 210.00
      },
      {
        id: 'facebook',
        name: 'Facebook',
        connected: false,
        selected: false,
        contentPreview: `🎉 Special Diwali Offer! Get 30% off on all products. Limited time only. Shop now and celebrate with amazing deals!`,
        estimatedReach: 3200,
        cost: 150.00
      },
      {
        id: 'instagram',
        name: 'Instagram',
        connected: true,
        selected: false,
        contentPreview: `🎉 Special Diwali Offer! Get 30% off on all products. Limited time only. Shop now and celebrate with amazing deals!`,
        estimatedReach: 2800,
        cost: 175.00
      }
    ];
    setChannels(mockChannels);
    setAudienceData({ type: 'all', count: 2100 });
  }, []);

  const handleChannelToggle = (channelId) => {
    setChannels(prev => prev?.map(channel => 
      channel?.id === channelId 
        ? { ...channel, selected: !channel?.selected }
        : channel
    ));
  };

  const handleChannelSetup = (channelId) => {
    const channel = channels?.find(c => c?.id === channelId);
    setSelectedChannelForSetup(channel);
    setShowSetupModal(true);
  };

  const handleSetupComplete = (channelId, setupData) => {
    setChannels(prev => prev?.map(channel => 
      channel?.id === channelId 
        ? { ...channel, connected: true }
        : channel
    ));
    setShowSetupModal(false);
    setSelectedChannelForSetup(null);
  };

  const handleAudienceChange = (data) => {
    setAudienceData(data);
  };

  const handleScheduling = (data) => {
    setSchedulingData({ ...data, type: 'scheduled' });
    handleConfirmDelivery();
  };

  const handleSendNow = () => {
    setSchedulingData({ type: 'now' });
    handleConfirmDelivery();
  };

  const handleConfirmDelivery = () => {
    setShowConfirmationModal(true);
  };

  const handleFinalConfirmation = () => {
    // Simulate successful delivery
    setShowConfirmationModal(false);
    
    // Navigate to campaign management with success message
    navigate('/campaign-management', { 
      state: { 
        message: 'Campaign sent successfully!',
        type: 'success'
      }
    });
  };

  const handleSaveAsCampaign = () => {
    navigate('/campaign-management', { 
      state: { 
        message: 'Campaign saved as draft!',
        type: 'info'
      }
    });
  };

  const selectedChannels = channels?.filter(channel => channel?.selected && channel?.connected);
  const totalCost = selectedChannels?.reduce((sum, channel) => sum + channel?.cost, 0);
  const totalReach = Math.min(audienceData?.count, selectedChannels?.reduce((max, channel) => Math.max(max, channel?.estimatedReach), 0));

  const deliveryData = {
    selectedChannels,
    audienceData,
    schedulingData,
    totalCost,
    totalReach
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <VoiceNavigationTrigger />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/ai-content-creation')}
                iconName="ArrowLeft"
                iconSize={20}
              />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Multi-Channel Delivery</h1>
                <p className="text-muted-foreground">Distribute your content across multiple platforms</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Send" size={20} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Selected Channels</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mt-1">{selectedChannels?.length}</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-secondary" />
                  <span className="text-sm text-muted-foreground">Total Reach</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mt-1">{totalReach?.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="IndianRupee" size={20} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Total Cost</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mt-1">₹{totalCost?.toFixed(2)}</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <span className="text-sm text-muted-foreground">Est. CTR</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground mt-1">3.2%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Channel Selection */}
            <div className="xl:col-span-2 space-y-6">
              {/* Channel Cards */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Select Delivery Channels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {channels?.map((channel) => (
                    <ChannelCard
                      key={channel?.id}
                      channel={channel}
                      onToggle={handleChannelToggle}
                      onSetup={handleChannelSetup}
                    />
                  ))}
                </div>
              </div>

              {/* Audience Selection */}
              <AudienceSelector onAudienceChange={handleAudienceChange} />
            </div>

            {/* Right Column - Scheduling & Summary */}
            <div className="space-y-6">
              {/* Scheduling Panel */}
              <SchedulingPanel 
                onSchedule={handleScheduling}
                onSendNow={handleSendNow}
              />

              {/* Delivery Summary */}
              <DeliverySummary
                selectedChannels={selectedChannels}
                audienceData={audienceData}
                onConfirmDelivery={handleConfirmDelivery}
                onSaveAsCampaign={handleSaveAsCampaign}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/template-gallery')}
                iconName="Layout"
                iconPosition="left"
                iconSize={18}
              >
                Browse Templates
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/ai-content-creation')}
                iconName="Sparkles"
                iconPosition="left"
                iconSize={18}
              >
                Create New Content
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/campaign-management')}
                iconName="BarChart3"
                iconPosition="left"
                iconSize={18}
              >
                View Campaigns
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <DeliveryConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleFinalConfirmation}
        deliveryData={deliveryData}
      />
      <ChannelSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        channelId={selectedChannelForSetup?.id}
        channelName={selectedChannelForSetup?.name}
        onSetupComplete={handleSetupComplete}
      />
    </div>
  );
};

export default MultiChannelDelivery;