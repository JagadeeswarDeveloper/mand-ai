import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartSuggestions = ({ suggestions, onImplementSuggestion }) => {
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'timing': return 'Clock';
      case 'content': return 'FileText';
      case 'channel': return 'Send';
      case 'audience': return 'Users';
      default: return 'Lightbulb';
    }
  };

  const getSuggestionColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error bg-error/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-success bg-success/5';
      default: return 'border-border bg-muted/5';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return { label: 'High Impact', color: 'text-error' };
      case 'medium': return { label: 'Medium Impact', color: 'text-warning' };
      case 'low': return { label: 'Low Impact', color: 'text-success' };
      default: return { label: 'Standard', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
            <Icon name="Lightbulb" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Smart Suggestions</h3>
            <p className="text-sm text-muted-foreground">AI-powered optimization recommendations</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} />
          <span>Updated daily</span>
        </div>
      </div>
      <div className="space-y-4">
        {suggestions?.map((suggestion, index) => {
          const priority = getPriorityLabel(suggestion?.priority);
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg p-4 ${getSuggestionColor(suggestion?.priority)} hover:elevation-1 nav-transition`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg mt-1">
                    <Icon name={getSuggestionIcon(suggestion?.type)} size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-card-foreground">{suggestion?.title}</h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-background ${priority?.color}`}>
                        {priority?.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {suggestion?.description}
                    </p>
                    
                    {suggestion?.metrics && (
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="TrendingUp" size={12} />
                          <span>Expected improvement: {suggestion?.metrics?.improvement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Target" size={12} />
                          <span>Confidence: {suggestion?.metrics?.confidence}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>Suggested on: {suggestion?.suggestedDate}</span>
                  </div>
                  {suggestion?.basedOn && (
                    <div className="flex items-center space-x-1">
                      <Icon name="BarChart3" size={12} />
                      <span>Based on: {suggestion?.basedOn}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onImplementSuggestion(suggestion, 'dismiss')}
                    className="text-xs"
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onImplementSuggestion(suggestion, 'implement')}
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={14}
                    className="text-xs"
                  >
                    Implement
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {suggestions?.length === 0 && (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Icon name="CheckCircle" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-medium text-card-foreground mb-2">All Optimized!</h4>
          <p className="text-sm text-muted-foreground">
            Your campaigns are performing well. New suggestions will appear as we analyze more data.
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartSuggestions;