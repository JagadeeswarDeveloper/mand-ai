import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ generatedContent, onSaveDraft, isSaving }) => {
  const navigate = useNavigate();

  const handleProceedToDelivery = () => {
    if (generatedContent) {
      // In a real app, you would pass the content to the delivery page
      navigate('/multi-channel-delivery', { 
        state: { content: generatedContent } 
      });
    }
  };

  const handleSaveDraft = () => {
    if (generatedContent && onSaveDraft) {
      onSaveDraft();
    }
  };

  const hasContent = generatedContent && generatedContent?.trim()?.length > 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Actions</h2>
      
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          onClick={handleProceedToDelivery}
          disabled={!hasContent}
          iconName="Send"
          iconPosition="left"
          iconSize={20}
          fullWidth
        >
          Proceed to Delivery
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleSaveDraft}
          disabled={!hasContent}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          iconSize={20}
          fullWidth
        >
          {isSaving ? 'Saving...' : 'Save as Draft'}
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate('/template-gallery')}
          iconName="Layout"
          iconPosition="left"
          iconSize={20}
          fullWidth
        >
          Browse Templates
        </Button>
      </div>

      {!hasContent && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Generate content to enable actions
            </span>
          </div>
        </div>
      )}

      {hasContent && (
        <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">
              Content ready for delivery!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;