import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TemplateCard = ({ template, onUseTemplate, onPreview, onFavorite }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:elevation-2 nav-transition group">
      {/* Template Preview */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={template?.preview}
          alt={template?.title}
          className="w-full h-full object-cover group-hover:scale-105 nav-transition"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 nav-transition" />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 nav-transition">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onFavorite(template?.id)}
            iconName={template?.isFavorite ? "Heart" : "Heart"}
            iconSize={16}
            className="w-8 h-8 bg-white/90 hover:bg-white"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onPreview(template)}
            iconName="Eye"
            iconSize={16}
            className="w-8 h-8 bg-white/90 hover:bg-white"
          />
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            {template?.category}
          </span>
        </div>

        {/* Language Support */}
        <div className="absolute bottom-3 left-3 flex space-x-1">
          {template?.languages?.slice(0, 3)?.map((lang, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 text-gray-800"
            >
              {lang}
            </span>
          ))}
          {template?.languages?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 text-gray-800">
              +{template?.languages?.length - 3}
            </span>
          )}
        </div>
      </div>
      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2">
            {template?.title}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm">{template?.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {template?.description}
        </p>

        {/* Template Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>{template?.downloads}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{template?.lastUpdated}</span>
            </div>
          </div>
          
          {template?.isNew && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
              New
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          size="sm"
          onClick={() => onUseTemplate(template)}
          iconName="Sparkles"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          Use Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;