import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ onDateRangeChange, currentRange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const presetRanges = [
    { label: 'Last 7 Days', value: 'week', days: 7 },
    { label: 'Last 30 Days', value: 'month', days: 30 },
    { label: 'Last 90 Days', value: 'quarter', days: 90 },
    { label: 'Custom Range', value: 'custom', days: null }
  ];

  const formatDateForInput = (date) => {
    return date?.toISOString()?.split('T')?.[0];
  };

  const formatDateDisplay = (date) => {
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handlePresetSelect = (preset) => {
    if (preset?.value === 'custom') {
      setIsCustomOpen(true);
      return;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate?.setDate(endDate?.getDate() - preset?.days);

    onDateRangeChange({
      startDate,
      endDate,
      label: preset?.label,
      type: preset?.value
    });
    setIsCustomOpen(false);
  };

  const handleCustomApply = () => {
    if (!customStartDate || !customEndDate) return;

    const startDate = new Date(customStartDate);
    const endDate = new Date(customEndDate);

    if (startDate > endDate) {
      alert('Start date cannot be after end date');
      return;
    }

    onDateRangeChange({
      startDate,
      endDate,
      label: `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`,
      type: 'custom'
    });
    setIsCustomOpen(false);
  };

  const getCurrentDateRange = () => {
    if (currentRange && currentRange?.startDate && currentRange?.endDate) {
      return `${formatDateDisplay(currentRange?.startDate)} - ${formatDateDisplay(currentRange?.endDate)}`;
    }
    return 'Last 30 Days';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
          <div>
            <h3 className="font-medium text-card-foreground">Date Range</h3>
            <p className="text-sm text-muted-foreground">{getCurrentDateRange()}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {presetRanges?.map((preset) => (
            <Button
              key={preset?.value}
              variant={currentRange?.type === preset?.value ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetSelect(preset)}
              className="text-xs"
            >
              {preset?.label}
            </Button>
          ))}
        </div>
      </div>
      {isCustomOpen && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                max={formatDateForInput(new Date())}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                max={formatDateForInput(new Date())}
                min={customStartDate}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCustomApply}
              disabled={!customStartDate || !customEndDate}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;