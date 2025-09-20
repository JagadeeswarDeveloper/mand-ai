import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformPreviewTabs = ({ generatedContent }) => {
  const [activeTab, setActiveTab] = useState('whatsapp');

  const platforms = [
    { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-600' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'text-pink-600' }
  ];

  const formatContentForPlatform = (content, platform) => {
    if (!content) return '';
    
    switch (platform) {
      case 'whatsapp':
        return content;
      case 'facebook':
        return content + '\n\n#MarketMitra #SmallBusiness #DigitalMarketing';
      case 'instagram':
        return content + '\n\n#MarketMitra #SmallBusiness #DigitalMarketing #IndianBusiness #LocalBusiness';
      default:
        return content;
    }
  };

  const renderPlatformPreview = (platform) => {
    const formattedContent = formatContentForPlatform(generatedContent, platform);
    
    switch (platform) {
      case 'whatsapp':
        return (
          <div className="bg-green-50 rounded-lg p-4 max-w-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">MB</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">MarketMitra Business</div>
                <div className="text-xs text-gray-500">Today 2:30 PM</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{formattedContent}</p>
            </div>
          </div>
        );
        
      case 'facebook':
        return (
          <div className="bg-white border border-gray-200 rounded-lg max-w-md">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">MB</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">MarketMitra Business</div>
                  <div className="text-xs text-gray-500">2 hours ago • 🌍</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{formattedContent}</p>
            </div>
            <div className="border-t border-gray-100 px-4 py-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>👍 ❤️ 24 reactions</span>
                <span>5 comments • 12 shares</span>
              </div>
            </div>
          </div>
        );
        
      case 'instagram':
        return (
          <div className="bg-white border border-gray-200 rounded-lg max-w-sm">
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MB</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">marketmitra_business</div>
                </div>
                <Icon name="MoreHorizontal" size={16} className="text-gray-400" />
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Icon name="Image" size={48} className="text-gray-400" />
            </div>
            <div className="p-3">
              <div className="flex items-center space-x-4 mb-2">
                <Icon name="Heart" size={20} className="text-gray-700" />
                <Icon name="MessageCircle" size={20} className="text-gray-700" />
                <Icon name="Send" size={20} className="text-gray-700" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-gray-900">marketmitra_business</span>
                <span className="text-gray-800 ml-1 whitespace-pre-wrap">{formattedContent}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">2 HOURS AGO</div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!generatedContent) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="text-center py-8">
          <Icon name="Smartphone" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">Platform Preview</h3>
          <p className="text-sm text-muted-foreground">
            Generate content to see how it will appear on different platforms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Platform Preview</h2>
      {/* Platform Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {platforms?.map((platform) => (
          <button
            key={platform?.id}
            onClick={() => setActiveTab(platform?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === platform?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={platform?.icon} size={16} className={platform?.color} />
            <span>{platform?.name}</span>
          </button>
        ))}
      </div>
      {/* Platform Preview */}
      <div className="flex justify-center">
        {renderPlatformPreview(activeTab)}
      </div>
    </div>
  );
};

export default PlatformPreviewTabs;