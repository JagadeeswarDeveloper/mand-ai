import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VoiceNavigationTrigger from '../../components/ui/VoiceNavigationTrigger';
import CampaignFilters from './components/CampaignFilters';
import CampaignCard from './components/CampaignCard';
import BulkActions from './components/BulkActions';
import CampaignTemplates from './components/CampaignTemplates';
import PerformanceSummary from './components/PerformanceSummary';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { Checkbox } from '../../components/ui/Checkbox';

const CampaignManagement = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('list'); // 'list', 'performance'
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    channel: 'all',
    sort: 'newest',
    dateFrom: '',
    dateTo: ''
  });

  // Mock campaign data
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Diwali Special Discount - 50% Off',
      createdDate: '15/10/2024',
      status: 'sent',
      channels: ['whatsapp', 'facebook', 'instagram'],
      thumbnail: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400',
      metrics: {
        views: 2450,
        clicks: 186,
        shares: 45,
        ctr: 7.6
      },
      content: `🪔 Diwali Special Offer! 🪔\n\nCelebrate the festival of lights with amazing discounts!\n\n✨ 50% OFF on all products\n✨ Free home delivery\n✨ Valid till 31st October\n\nShop now and spread the joy!`
    },
    {
      id: 2,
      name: 'New Product Launch - Smart Watch',
      createdDate: '12/10/2024',
      status: 'scheduled',
      channels: ['whatsapp', 'sms'],
      thumbnail: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
      metrics: null,
      content: `🚀 Introducing Our Latest Smart Watch! 🚀\n\n⌚ Advanced health monitoring\n⌚ 7-day battery life\n⌚ Water resistant\n⌚ Starting at ₹4,999\n\nPre-order now and get 20% early bird discount!`
    },
    {
      id: 3,
      name: 'Customer Testimonial - Rajesh Kumar',
      createdDate: '10/10/2024',
      status: 'completed',
      channels: ['facebook', 'instagram'],
      thumbnail: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      metrics: {
        views: 1820,
        clicks: 94,
        shares: 28,
        ctr: 5.2
      },
      content: `⭐ Customer Love Story ⭐\n\n"Amazing service and quality products! I've been shopping here for 2 years and never disappointed."\n\n- Rajesh Kumar, Mumbai\n\n🙏 Thank you for trusting us!\n\n#CustomerFirst #QualityService`
    },
    {
      id: 4,
      name: 'Weekend Sale - Electronics',
      createdDate: '08/10/2024',
      status: 'draft',
      channels: ['whatsapp'],
      thumbnail: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      metrics: null,
      content: `📱 Weekend Electronics Sale! 📱\n\nUp to 40% OFF on:\n• Smartphones\n• Laptops\n• Headphones\n• Smart TVs\n\nThis weekend only!\nVisit our store or shop online.`
    },
    {
      id: 5,
      name: 'Festival Greeting - Karva Chauth',
      createdDate: '05/10/2024',
      status: 'sent',
      channels: ['whatsapp', 'sms', 'facebook'],
      thumbnail: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400',
      metrics: {
        views: 3200,
        clicks: 128,
        shares: 85,
        ctr: 4.0
      },
      content: `🌙 Happy Karva Chauth! 🌙\n\nWishing all the beautiful wives a blessed Karva Chauth!\n\nMay your love story continue to shine like the moon.\n\n💕 Special jewelry collection available\n💕 Traditional designs\n💕 Free gift wrapping\n\nWith love and best wishes! ✨`
    },
    {
      id: 6,
      name: 'Service Promotion - Home Cleaning',
      createdDate: '03/10/2024',
      status: 'completed',
      channels: ['whatsapp', 'sms'],
      thumbnail: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
      metrics: {
        views: 1650,
        clicks: 112,
        shares: 15,
        ctr: 6.8
      },
      content: `🏠 Professional Home Cleaning Services 🏠\n\n✅ Deep cleaning specialists\n✅ Trained & verified staff\n✅ Eco-friendly products\n✅ Same day service available\n\nBook now: Call 9876543210\n\nFirst time customers get 30% OFF!`
    }
  ]);

  // Filter campaigns based on current filters
  const filteredCampaigns = campaigns?.filter(campaign => {
    const matchesSearch = campaign?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                         campaign?.content?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    const matchesStatus = filters?.status === 'all' || campaign?.status === filters?.status;
    const matchesChannel = filters?.channel === 'all' || campaign?.channels?.includes(filters?.channel);
    
    return matchesSearch && matchesStatus && matchesChannel;
  })?.sort((a, b) => {
    switch (filters?.sort) {
      case 'oldest':
        return new Date(a.createdDate.split('/').reverse().join('-')) - new Date(b.createdDate.split('/').reverse().join('-'));
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'performance':
        return (b?.metrics?.ctr || 0) - (a?.metrics?.ctr || 0);
      default: // newest
        return new Date(b.createdDate.split('/').reverse().join('-')) - new Date(a.createdDate.split('/').reverse().join('-'));
    }
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      channel: 'all',
      sort: 'newest',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleCreateCampaign = () => {
    navigate('/ai-content-creation');
  };

  const handleCreateFromTemplate = (template) => {
    navigate('/ai-content-creation', { state: { template } });
  };

  const handleEditCampaign = (campaignId) => {
    navigate('/ai-content-creation', { state: { editCampaignId: campaignId } });
  };

  const handleDuplicateCampaign = (campaignId) => {
    const campaign = campaigns?.find(c => c?.id === campaignId);
    if (campaign) {
      navigate('/ai-content-creation', { state: { duplicateFrom: campaign } });
    }
  };

  const handleViewAnalytics = (campaignId) => {
    navigate('/analytics-dashboard', { state: { campaignId } });
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      // In a real app, this would make an API call
      console.log('Deleting campaign:', campaignId);
    }
  };

  const handleCampaignSelect = (campaignId, isSelected) => {
    if (isSelected) {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    } else {
      setSelectedCampaigns(selectedCampaigns?.filter(id => id !== campaignId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedCampaigns(filteredCampaigns?.map(c => c?.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleBulkAction = (action, campaignIds) => {
    console.log('Bulk action:', action, 'on campaigns:', campaignIds);
    // In a real app, this would make API calls
    setSelectedCampaigns([]);
  };

  const handleClearSelection = () => {
    setSelectedCampaigns([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <VoiceNavigationTrigger />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <CampaignFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            onCreateCampaign={handleCreateCampaign}
          />

          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={currentView === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('list')}
                iconName="List"
                iconPosition="left"
                iconSize={16}
              >
                Campaigns
              </Button>
              <Button
                variant={currentView === 'performance' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('performance')}
                iconName="BarChart3"
                iconPosition="left"
                iconSize={16}
              >
                Performance
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{filteredCampaigns?.length} campaigns found</span>
            </div>
          </div>

          {currentView === 'list' ? (
            <>
              {/* Quick Start Templates */}
              <CampaignTemplates onCreateFromTemplate={handleCreateFromTemplate} />

              {/* Bulk Actions */}
              <BulkActions
                selectedCampaigns={selectedCampaigns}
                onBulkAction={handleBulkAction}
                onClearSelection={handleClearSelection}
              />

              {/* Campaign List */}
              {filteredCampaigns?.length > 0 ? (
                <div className="space-y-4">
                  {/* Select All */}
                  <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-xl">
                    <Checkbox
                      checked={selectedCampaigns?.length === filteredCampaigns?.length && filteredCampaigns?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      Select all campaigns
                    </span>
                  </div>

                  {/* Campaign Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCampaigns?.map((campaign) => (
                      <div key={campaign?.id} className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Checkbox
                            checked={selectedCampaigns?.includes(campaign?.id)}
                            onChange={(e) => handleCampaignSelect(campaign?.id, e?.target?.checked)}
                            className="bg-background/80 backdrop-blur-sm"
                          />
                        </div>
                        <CampaignCard
                          campaign={campaign}
                          onEdit={handleEditCampaign}
                          onDuplicate={handleDuplicateCampaign}
                          onViewAnalytics={handleViewAnalytics}
                          onDelete={handleDeleteCampaign}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No campaigns found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or create a new campaign
                  </p>
                  <Button
                    variant="default"
                    onClick={handleCreateCampaign}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={20}
                  >
                    Create Your First Campaign
                  </Button>
                </div>
              )}
            </>
          ) : (
            <PerformanceSummary campaigns={campaigns} />
          )}
        </div>
      </main>
    </div>
  );
};

export default CampaignManagement;