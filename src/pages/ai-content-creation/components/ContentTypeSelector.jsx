import React from 'react';

import Icon from '../../../components/AppIcon';

const ContentTypeSelector = ({ selectedType, onTypeChange, isGenerating }) => {
  const contentTypes = [
    {
      id: 'ad-copy',
      label: 'Ad Copy',
      icon: 'Megaphone',
      description: 'Promotional advertisements',
      color: 'bg-primary'
    },
    {
      id: 'social-post',
      label: 'Social Media Post',
      icon: 'Share2',
      description: 'Social media content',
      color: 'bg-secondary'
    },
    {
      id: 'product-desc',
      label: 'Product Description',
      icon: 'Package',
      description: 'Product details & features',
      color: 'bg-accent'
    },
    {
      id: 'festival-greeting',
      label: 'Festival Greeting',
      icon: 'Sparkles',
      description: 'Festive wishes & offers',
      color: 'bg-success'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Content Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeChange(type?.id)}
            disabled={isGenerating}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            } ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 ${type?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={type?.icon} size={24} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-card-foreground text-sm">{type?.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{type?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeSelector;