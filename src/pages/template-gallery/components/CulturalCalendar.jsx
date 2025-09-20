import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CulturalCalendar = ({ upcomingEvents, onEventClick }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Upcoming Festivals</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {upcomingEvents?.map((event) => (
          <div
            key={event?.id}
            onClick={() => onEventClick(event)}
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted nav-transition cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={event?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-card-foreground group-hover:text-primary nav-transition">
                  {event?.name}
                </h4>
                <p className="text-sm text-muted-foreground">{event?.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {event?.templateCount} templates
              </span>
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary nav-transition" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulturalCalendar;