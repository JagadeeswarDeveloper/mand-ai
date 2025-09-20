import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContentPreviewEditor = ({ generatedContent, onContentChange, selectedLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(generatedContent);

  const handleSaveEdit = () => {
    onContentChange(editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(generatedContent);
    setIsEditing(false);
  };

  const getCharacterCount = () => {
    return editedContent ? editedContent?.length : 0;
  };

  const getPlatformLimits = () => {
    return {
      whatsapp: { limit: 4096, name: 'WhatsApp' },
      facebook: { limit: 63206, name: 'Facebook' },
      instagram: { limit: 2200, name: 'Instagram' },
      twitter: { limit: 280, name: 'Twitter' }
    };
  };

  if (!generatedContent) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No Content Generated Yet</h3>
          <p className="text-sm text-muted-foreground">
            Generate AI content to see the preview and editing options here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Content Preview & Editor</h2>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit3"
              iconPosition="left"
              iconSize={16}
            >
              Edit
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
                iconName="X"
                iconSize={16}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveEdit}
                iconName="Check"
                iconSize={16}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {isEditing ? (
          <div className="relative">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e?.target?.value)}
              className="w-full h-40 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground"
              placeholder="Edit your content here..."
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
              {getCharacterCount()} characters
            </div>
          </div>
        ) : (
          <div className="bg-muted/50 rounded-lg p-4 min-h-[120px]">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {generatedContent}
            </div>
          </div>
        )}

        {/* Character count and platform limits */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Platform Character Limits</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(getPlatformLimits())?.map(([platform, platformData]) => {
              const { limit, name } = platformData;
              const currentCount = getCharacterCount();
              const isWithinLimit = currentCount <= limit;
              
              return (
                <div key={platform} className="text-center">
                  <div className={`text-xs font-medium ${isWithinLimit ? 'text-success' : 'text-error'}`}>
                    {name}
                  </div>
                  <div className={`text-xs ${isWithinLimit ? 'text-muted-foreground' : 'text-error'}`}>
                    {currentCount}/{limit}
                  </div>
                  <div className="w-full bg-border rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full ${isWithinLimit ? 'bg-success' : 'bg-error'}`}
                      style={{ width: `${Math.min((currentCount / limit) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreviewEditor;