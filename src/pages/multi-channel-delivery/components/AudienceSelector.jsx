import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AudienceSelector = ({ onAudienceChange }) => {
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [customContacts, setCustomContacts] = useState('');
  const [selectedSegments, setSelectedSegments] = useState([]);

  const audienceOptions = [
    { value: 'all', label: 'All Contacts', description: 'Send to all your contacts' },
    { value: 'segments', label: 'Saved Segments', description: 'Choose from saved audience groups' },
    { value: 'custom', label: 'Custom List', description: 'Enter specific phone numbers' }
  ];

  const savedSegments = [
    { value: 'customers', label: 'Regular Customers', count: 1250 },
    { value: 'new_leads', label: 'New Leads', count: 340 },
    { value: 'vip_customers', label: 'VIP Customers', count: 89 },
    { value: 'festival_buyers', label: 'Festival Buyers', count: 567 }
  ];

  const mockStats = {
    totalContacts: 2246,
    activeContacts: 2100,
    lastUpdated: '19/09/2024'
  };

  const handleAudienceTypeChange = (type) => {
    setSelectedAudience(type);
    updateAudienceCount(type);
  };

  const updateAudienceCount = (type) => {
    let count = 0;
    if (type === 'all') {
      count = mockStats?.activeContacts;
    } else if (type === 'segments') {
      count = selectedSegments?.reduce((total, segmentId) => {
        const segment = savedSegments?.find(s => s?.value === segmentId);
        return total + (segment ? segment?.count : 0);
      }, 0);
    } else if (type === 'custom') {
      const numbers = customContacts?.split(',')?.filter(n => n?.trim()?.length > 0);
      count = numbers?.length;
    }
    
    onAudienceChange({
      type,
      count,
      segments: selectedSegments,
      customContacts: customContacts
    });
  };

  const handleSegmentChange = (segments) => {
    setSelectedSegments(segments);
    if (selectedAudience === 'segments') {
      updateAudienceCount('segments');
    }
  };

  const handleCustomContactsChange = (e) => {
    setCustomContacts(e?.target?.value);
    if (selectedAudience === 'custom') {
      updateAudienceCount('custom');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
          <Icon name="Users" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Select Audience</h3>
          <p className="text-sm text-muted-foreground">Choose who will receive your content</p>
        </div>
      </div>
      {/* Contact Stats */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-card-foreground">{mockStats?.totalContacts?.toLocaleString('en-IN')}</div>
            <div className="text-sm text-muted-foreground">Total Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{mockStats?.activeContacts?.toLocaleString('en-IN')}</div>
            <div className="text-sm text-muted-foreground">Active Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-card-foreground">{mockStats?.lastUpdated}</div>
            <div className="text-sm text-muted-foreground">Last Updated</div>
          </div>
        </div>
      </div>
      {/* Audience Type Selection */}
      <div className="space-y-4 mb-6">
        {audienceOptions?.map((option) => (
          <div
            key={option?.value}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              selectedAudience === option?.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleAudienceTypeChange(option?.value)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedAudience === option?.value ? 'border-primary bg-primary' : 'border-border'
              }`}>
                {selectedAudience === option?.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className="flex-1">
                <div className="font-medium text-card-foreground">{option?.label}</div>
                <div className="text-sm text-muted-foreground">{option?.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Conditional Content Based on Selection */}
      {selectedAudience === 'segments' && (
        <div className="space-y-4">
          <Select
            label="Choose Segments"
            description="Select one or more audience segments"
            multiple
            searchable
            options={savedSegments?.map(segment => ({
              value: segment?.value,
              label: `${segment?.label} (${segment?.count?.toLocaleString('en-IN')} contacts)`
            }))}
            value={selectedSegments}
            onChange={handleSegmentChange}
            placeholder="Select segments..."
          />
        </div>
      )}
      {selectedAudience === 'custom' && (
        <div className="space-y-4">
          <Input
            type="textarea"
            label="Phone Numbers"
            description="Enter phone numbers separated by commas (e.g., 9876543210, 9123456789)"
            placeholder="9876543210, 9123456789, 9555666777"
            value={customContacts}
            onChange={handleCustomContactsChange}
            rows={4}
          />
          <div className="text-sm text-muted-foreground">
            <Icon name="Info" size={16} className="inline mr-1" />
            Enter Indian mobile numbers without country code (+91)
          </div>
        </div>
      )}
      {/* Import Options */}
      <div className="border-t border-border pt-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
          >
            Import CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Contacts
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
          >
            Add New Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudienceSelector;