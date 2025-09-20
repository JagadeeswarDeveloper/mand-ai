import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create AI Content',
      description: 'Generate marketing content with AI assistance',
      icon: 'Sparkles',
      path: '/ai-content-creation',
      color: 'bg-primary',
      textColor: 'text-primary-foreground'
    },
    {
      title: 'Browse Templates',
      description: 'Choose from ready-made marketing templates',
      icon: 'Layout',
      path: '/template-gallery',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground'
    },
    {
      title: 'Multi-Channel Delivery',
      description: 'Send campaigns across multiple platforms',
      icon: 'Send',
      path: '/multi-channel-delivery',
      color: 'bg-accent',
      textColor: 'text-accent-foreground'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {quickActions?.map((action, index) => (
        <div
          key={index}
          onClick={() => handleActionClick(action?.path)}
          className="group cursor-pointer bg-card border border-border rounded-xl p-6 hover:elevation-2 nav-transition"
        >
          <div className="flex items-start space-x-4">
            <div className={`flex items-center justify-center w-12 h-12 ${action?.color} rounded-lg group-hover:scale-110 nav-transition`}>
              <Icon name={action?.icon} size={24} color="white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary nav-transition">
                {action?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {action?.description}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Icon 
                name="ArrowRight" 
                size={20} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 nav-transition" 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardQuickActions;