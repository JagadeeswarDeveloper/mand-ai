import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TemplatePreviewModal = ({ template, isOpen, onClose, onUseTemplate }) => {
  if (!isOpen || !template) return null;

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: 'bg-green-500' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'bg-pink-500' },
    { id: 'sms', name: 'SMS', icon: 'MessageSquare', color: 'bg-gray-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">{template?.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{template?.category} Template</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Preview Section */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Template Preview */}
              <div className="bg-muted rounded-xl p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Template Preview</h3>
                <div className="bg-white rounded-lg p-6 border border-border">
                  <Image
                    src={template?.preview}
                    alt={template?.title}
                    className="w-full rounded-lg mb-4"
                  />
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-gray-900">{template?.sampleContent?.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{template?.sampleContent?.description}</p>
                    {template?.sampleContent?.cta && (
                      <div className="pt-2">
                        <span className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                          {template?.sampleContent?.cta}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Channel Previews */}
              <div className="bg-muted rounded-xl p-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Channel Previews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {channels?.map((channel) => (
                    <div key={channel?.id} className="bg-white rounded-lg p-4 border border-border">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-6 h-6 ${channel?.color} rounded flex items-center justify-center`}>
                          <Icon name={channel?.icon} size={14} color="white" />
                        </div>
                        <span className="font-medium text-card-foreground">{channel?.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Optimized format for {channel?.name} delivery
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="w-full lg:w-80 bg-muted/50 p-6 border-l border-border overflow-y-auto">
            <div className="space-y-6">
              {/* Template Info */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Template Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm font-medium">{template?.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Downloads</span>
                    <span className="text-sm font-medium">{template?.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">{template?.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Supported Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {template?.languages?.map((lang, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Customization</h3>
                <div className="space-y-2">
                  {template?.customizationOptions?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-muted-foreground">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => onUseTemplate(template)}
                  iconName="Sparkles"
                  iconPosition="left"
                  iconSize={18}
                  className="w-full"
                >
                  Use This Template
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Heart"
                  iconPosition="left"
                  iconSize={18}
                  className="w-full"
                >
                  Add to Favorites
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;