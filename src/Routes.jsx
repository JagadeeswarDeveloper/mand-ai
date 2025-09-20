import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import MainDashboard from './pages/main-dashboard';
import AIContentCreation from './pages/ai-content-creation';
import TemplateGallery from './pages/template-gallery';
import MultiChannelDelivery from './pages/multi-channel-delivery';
import CampaignManagement from './pages/campaign-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIContentCreation />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/ai-content-creation" element={<AIContentCreation />} />
        <Route path="/template-gallery" element={<TemplateGallery />} />
        <Route path="/multi-channel-delivery" element={<MultiChannelDelivery />} />
        <Route path="/campaign-management" element={<CampaignManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
