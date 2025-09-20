import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CampaignTemplates = ({ onCreateFromTemplate }) => {
  const templates = [
    {
      id: 'festival-diwali',
      name: 'Diwali Special Offer',
      description: 'Festival greeting with discount offer',
      icon: 'Sparkles',
      color: 'bg-warning',
      category: 'Festival'
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      description: 'Announce new product with features',
      icon: 'Rocket',
      color: 'bg-primary',
      category: 'Product'
    },
    {
      id: 'seasonal-sale',
      name: 'Seasonal Sale',
      description: 'Limited time seasonal discount',
      icon: 'Tag',
      color: 'bg-success',
      category: 'Sale'
    },
    {
      id: 'customer-testimonial',
      name: 'Customer Review',
      description: 'Share customer testimonials',
      icon: 'Star',
      color: 'bg-accent',
      category: 'Social Proof'
    },
    {
      id: 'service-promotion',
      name: 'Service Highlight',
      description: 'Promote your services',
      icon: 'Briefcase',
      color: 'bg-secondary',
      category: 'Service'
    },
    {
      id: 'event-invitation',
      name: 'Event Invitation',
      description: 'Invite customers to events',
      icon: 'Calendar',
      color: 'bg-primary',
      category: 'Event'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Quick Start Templates</h3>
          <p className="text-sm text-muted-foreground">Create campaigns from pre-built templates</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconSize={16}
          className="hidden sm:flex"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <div
            key={template?.id}
            onClick={() => onCreateFromTemplate(template)}
            className="group cursor-pointer bg-muted/50 hover:bg-muted border border-border rounded-lg p-4 nav-transition"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 ${template?.color} rounded-lg group-hover:scale-110 nav-transition`}>
                <Icon name={template?.icon} size={20} color="white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-card-foreground group-hover:text-primary nav-transition">
                    {template?.name}
                  </h4>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                    {template?.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {template?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignTemplates;