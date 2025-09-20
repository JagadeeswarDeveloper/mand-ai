import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const WelcomeBanner = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Content',
      description: 'AI-powered content generation',
      icon: 'Sparkles',
      path: '/ai-content-creation',
      color: 'bg-primary'
    },
    {
      title: 'Send Campaign',
      description: 'Multi-channel delivery',
      icon: 'Send',
      path: '/multi-channel-delivery',
      color: 'bg-secondary'
    },
    {
      title: 'View Analytics',
      description: 'Performance insights',
      icon: 'BarChart3',
      path: '/analytics-dashboard',
      color: 'bg-accent'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-8 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Welcome to Mand AI! 🚀
          </h1>
          <p className="text-lg opacity-90">
            Create powerful marketing campaigns with AI assistance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant="secondary"
              size="lg"
              onClick={() => handleActionClick(action?.path)}
              iconName={action?.icon}
              iconPosition="left"
              iconSize={20}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            >
              <div className="text-left">
                <div className="font-semibold">{action?.title}</div>
                <div className="text-xs opacity-80">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;