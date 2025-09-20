import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FeaturedTemplates = ({ templates, onUseTemplate }) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Featured Templates</h2>
          <p className="text-muted-foreground mt-1">Trending templates for this season</p>
        </div>
        <Icon name="Star" size={24} className="text-warning" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:elevation-2 nav-transition group"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={template?.preview}
                alt={template?.title}
                className="w-full h-full object-cover group-hover:scale-105 nav-transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Featured Badge */}
              <div className="absolute top-3 left-3">
                <div className="flex items-center space-x-1 bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
                  <Icon name="Star" size={12} />
                  <span>Featured</span>
                </div>
              </div>

              {/* Template Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">{template?.title}</h3>
                <p className="text-sm opacity-90 mb-3">{template?.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{template?.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} />
                      <span>{template?.rating}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onUseTemplate(template)}
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={14}
                    className="opacity-0 group-hover:opacity-100 nav-transition"
                  >
                    Use Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTemplates;