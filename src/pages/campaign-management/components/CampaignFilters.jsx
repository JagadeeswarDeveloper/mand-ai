import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CampaignFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  onCreateCampaign 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'sent', label: 'Sent' },
    { value: 'completed', label: 'Completed' }
  ];

  const channelOptions = [
    { value: 'all', label: 'All Channels' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'sms', label: 'SMS' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'performance', label: 'Best Performance' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Campaign Management</h2>
          <p className="text-sm text-muted-foreground">Manage and track your marketing campaigns</p>
        </div>
        
        <Button
          variant="default"
          onClick={onCreateCampaign}
          iconName="Plus"
          iconPosition="left"
          iconSize={20}
          className="hidden sm:flex"
        >
          Create Campaign
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search campaigns..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="lg:col-span-1"
        />
        
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status"
        />
        
        <Select
          options={channelOptions}
          value={filters?.channel}
          onChange={(value) => handleFilterChange('channel', value)}
          placeholder="Filter by channel"
        />
        
        <Select
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => handleFilterChange('sort', value)}
          placeholder="Sort by"
        />
      </div>
      {/* Date Range and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Input
            type="date"
            label="From"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            className="w-auto"
          />
          <Input
            type="date"
            label="To"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            className="w-auto"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
          
          {/* Mobile Create Button */}
          <Button
            variant="default"
            size="sm"
            onClick={onCreateCampaign}
            iconName="Plus"
            iconSize={16}
            className="sm:hidden"
          >
            Create
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(filters?.search || filters?.status !== 'all' || filters?.channel !== 'all') && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters?.search && (
            <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs">
              Search: {filters?.search}
              <button 
                onClick={() => handleFilterChange('search', '')}
                className="ml-1 hover:text-error"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.status !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs">
              Status: {filters?.status}
              <button 
                onClick={() => handleFilterChange('status', 'all')}
                className="ml-1 hover:text-error"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.channel !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs">
              Channel: {filters?.channel}
              <button 
                onClick={() => handleFilterChange('channel', 'all')}
                className="ml-1 hover:text-error"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignFilters;