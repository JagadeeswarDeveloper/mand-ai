import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentOptimizationSuggestions = ({ generatedContent, selectedType, selectedLanguage }) => {
  const getSuggestions = () => {
    if (!generatedContent) return [];

    const suggestions = [];
    const contentLength = generatedContent?.length;

    // Length-based suggestions
    if (contentLength < 50) {
      suggestions?.push({
        type: 'warning',
        icon: 'AlertTriangle',
        title: 'Content Too Short',
        description: 'Consider adding more details to make your content more engaging and informative.'
      });
    } else if (contentLength > 2000) {
      suggestions?.push({
        type: 'info',
        icon: 'Info',
        title: 'Long Content',
        description: 'Your content might be too long for some platforms. Consider creating a shorter version.'
      });
    }

    // Type-specific suggestions
    switch (selectedType) {
      case 'ad-copy':
        suggestions?.push({
          type: 'success',
          icon: 'Target',
          title: 'Call-to-Action',
          description: 'Make sure your ad includes a clear call-to-action like "Call Now", "Visit Today", or "Order Online".'
        });
        break;
      case 'social-post':
        suggestions?.push({
          type: 'info',
          icon: 'Hash',
          title: 'Hashtags',
          description: 'Add relevant hashtags to increase visibility. Consider local and business-specific tags.'
        });
        break;
      case 'product-desc':
        suggestions?.push({
          type: 'success',
          icon: 'Star',
          title: 'Key Features',
          description: 'Highlight unique selling points and benefits that set your product apart from competitors.'
        });
        break;
      case 'festival-greeting':
        suggestions?.push({
          type: 'info',
          icon: 'Sparkles',
          title: 'Festive Elements',
          description: 'Include traditional greetings and consider adding special offers or discounts.'
        });
        break;
    }

    // Language-specific suggestions
    if (selectedLanguage !== 'en') {
      suggestions?.push({
        type: 'info',
        icon: 'Globe',
        title: 'Local Appeal',
        description: 'Great choice using local language! This will resonate better with your target audience.'
      });
    }

    // Engagement suggestions
    suggestions?.push({
      type: 'success',
      icon: 'Users',
      title: 'Engagement Boost',
      description: 'Ask questions or encourage comments to increase engagement with your audience.'
    });

    return suggestions;
  };

  const suggestions = getSuggestions();

  const getIconColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      default: return 'bg-primary/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Optimization Suggestions</h2>
      </div>
      {suggestions?.length === 0 ? (
        <div className="text-center py-6">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">All Good!</h3>
          <p className="text-sm text-muted-foreground">
            Generate content to get personalized optimization suggestions.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions?.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getBgColor(suggestion?.type)} border-border`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={suggestion?.icon} 
                  size={20} 
                  className={`mt-0.5 ${getIconColor(suggestion?.type)}`} 
                />
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground text-sm mb-1">
                    {suggestion?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {generatedContent && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Content Quality Score:</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-border rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full" 
                  style={{ width: `${Math.min(85 + (suggestions?.length * 5), 100)}%` }}
                ></div>
              </div>
              <span className="font-medium text-success">
                {Math.min(85 + (suggestions?.length * 5), 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentOptimizationSuggestions;