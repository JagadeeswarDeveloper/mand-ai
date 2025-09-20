import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCampaigns, onBulkAction, onClearSelection }) => {
  const [bulkAction, setBulkAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    { value: 'delete', label: 'Delete Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' },
    { value: 'schedule', label: 'Schedule Selected' },
    { value: 'pause', label: 'Pause Selected' },
    { value: 'resume', label: 'Resume Selected' }
  ];

  const handleBulkAction = () => {
    if (bulkAction && selectedCampaigns?.length > 0) {
      onBulkAction(bulkAction, selectedCampaigns);
      setBulkAction('');
    }
  };

  if (selectedCampaigns?.length === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <Icon name="Check" size={16} color="white" />
          </div>
          <div>
            <p className="font-medium text-primary">
              {selectedCampaigns?.length} campaign{selectedCampaigns?.length > 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-primary/80">
              Choose an action to apply to selected campaigns
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Select
            options={bulkActionOptions}
            value={bulkAction}
            onChange={setBulkAction}
            placeholder="Select action"
            className="min-w-48"
          />
          
          <Button
            variant="default"
            size="sm"
            onClick={handleBulkAction}
            disabled={!bulkAction}
            iconName="Play"
            iconPosition="left"
            iconSize={16}
          >
            Apply
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconSize={16}
            className="p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BulkActions;