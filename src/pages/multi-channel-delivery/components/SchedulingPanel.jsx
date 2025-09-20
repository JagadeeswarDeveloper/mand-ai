import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SchedulingPanel = ({ onSchedule, onSendNow }) => {
  const [scheduleType, setScheduleType] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [timezone] = useState('Asia/Kolkata');

  const handleSchedule = () => {
    if (scheduleType === 'now') {
      onSendNow();
    } else {
      onSchedule({
        date: scheduledDate,
        time: scheduledTime,
        timezone: timezone
      });
    }
  };

  const formatCurrentDateTime = () => {
    const now = new Date();
    const date = now?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const time = now?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return { date, time };
  };

  const currentDateTime = formatCurrentDateTime();

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
          <Icon name="Clock" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Schedule Delivery</h3>
          <p className="text-sm text-muted-foreground">Choose when to send your content</p>
        </div>
      </div>
      <div className="space-y-4">
        {/* Send Now Option */}
        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
          scheduleType === 'now' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        }`} onClick={() => setScheduleType('now')}>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              scheduleType === 'now' ? 'border-primary bg-primary' : 'border-border'
            }`}>
              {scheduleType === 'now' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={18} className="text-primary" />
                <span className="font-medium text-card-foreground">Send Immediately</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Content will be delivered right away to all selected channels
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Later Option */}
        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
          scheduleType === 'later' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        }`} onClick={() => setScheduleType('later')}>
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              scheduleType === 'later' ? 'border-primary bg-primary' : 'border-border'
            }`}>
              {scheduleType === 'later' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={18} className="text-primary" />
                <span className="font-medium text-card-foreground">Schedule for Later</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a specific date and time for delivery
              </p>
            </div>
          </div>
        </div>

        {/* Date Time Inputs */}
        {scheduleType === 'later' && (
          <div className="bg-muted rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Delivery Date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                required
              />
              <Input
                type="time"
                label="Delivery Time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e?.target?.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>Timezone: {timezone} (Indian Standard Time)</span>
            </div>
          </div>
        )}

        {/* Current Time Display */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Time (IST):</span>
            <span className="font-medium text-card-foreground">
              {currentDateTime?.date} at {currentDateTime?.time}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          fullWidth
          onClick={handleSchedule}
          iconName={scheduleType === 'now' ? 'Send' : 'Calendar'}
          iconPosition="left"
          iconSize={18}
          disabled={scheduleType === 'later' && (!scheduledDate || !scheduledTime)}
        >
          {scheduleType === 'now' ? 'Send Now' : 'Schedule Delivery'}
        </Button>
      </div>
    </div>
  );
};

export default SchedulingPanel;