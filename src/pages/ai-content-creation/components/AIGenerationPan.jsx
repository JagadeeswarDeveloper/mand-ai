import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIGenerationPanel = ({ 
  isGenerating, 
  onGenerate, 
  onRegenerate, 
  generatedContent, 
  textInput, 
  selectedType,
  selectedLanguage 
}) => {
  const canGenerate = textInput?.trim()?.length > 0 && selectedType && !isGenerating;

  const getTypeLabel = (type) => {
    const labels = {
      'ad-copy': 'Advertisement Copy',
      'social-post': 'Social Media Post',
      'product-desc': 'Product Description',
      'festival-greeting': 'Festival Greeting'
    };
    return labels?.[type] || 'Content';
  };

  const getLanguageLabel = (lang) => {
    const labels = {
      'en': 'English',
      'hi': 'Hindi',
      'ta': 'Tamil',
      'te': 'Telugu',
      'bn': 'Bengali',
      'hinglish': 'Hinglish'
    };
    return labels?.[lang] || 'English';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">AI Content Generation</h2>
        {generatedContent && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={isGenerating}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Regenerate
          </Button>
        )}
      </div>

      {selectedType && (
        <div className="flex items-center space-x-4 mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Type:</span>
            <span className="text-sm text-muted-foreground">{getTypeLabel(selectedType)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Language:</span>
            <span className="text-sm text-muted-foreground">{getLanguageLabel(selectedLanguage)}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          onClick={onGenerate}
          disabled={!canGenerate}
          loading={isGenerating}
          iconName="Sparkles"
          iconPosition="left"
          iconSize={20}
          fullWidth
        >
          {isGenerating ? 'Generating Content...' : 'Generate AI Content'}
        </Button>

        {isGenerating && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-foreground">AI is creating your content...</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This may take a few seconds. Please wait...
            </p>
          </div>
        )}

        {!canGenerate && !isGenerating && (
          <div className="text-center py-4">
            <Icon name="Info" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Please enter your content idea and select a content type to generate AI content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGenerationPanel;