import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import VoiceNavigationTrigger from '../../components/ui/VoiceNavigationTrigger';
import WelcomeBanner from './components/WelcomeBanner';
import RecentActivityFeed from './components/RecentActivityFeed';
import CampaignManagementCards from './components/CampaignManagementCards';
import PerformanceHighlights from './components/PerformanceHighlights';
import VoiceInputSection from './components/VoiceInputSection';
import TemplateGallerySection from './components/TemplateGallerySection';

const MainDashboard = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Dashboard - MarketMitra';
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    // Language preference would be used for content localization
    console.log('Current language:', savedLanguage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Banner with Quick Actions */}
          <WelcomeBanner />
          
          {/* Performance Highlights */}
          <PerformanceHighlights />
          
          {/* Recent Activity Feed */}
          <RecentActivityFeed />
          
          {/* Campaign Management Cards */}
          <CampaignManagementCards />
          
          {/* Voice Input Section */}
          <VoiceInputSection />
          
          {/* Template Gallery Section */}
          <TemplateGallerySection />
        </div>
      </main>
      
      {/* Voice Navigation Trigger */}
      <VoiceNavigationTrigger />
    </div>
  );
};

export default MainDashboard;