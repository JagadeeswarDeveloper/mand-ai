import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VoiceNavigationTrigger from '../../components/ui/VoiceNavigationTrigger';
import CategoryFilter from './components/CategoryFilter';
import SearchAndFilters from './components/SearchAndFilters';
import FeaturedTemplates from './components/FeaturedTemplates';
import TemplateCard from './components/TemplateCard';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import CulturalCalendar from './components/CulturalCalendar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Mock data for categories
  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3x3', count: 156 },
    { id: 'festival', name: 'Festival Greetings', icon: 'PartyPopper', count: 45 },
    { id: 'promotion', name: 'Promotions', icon: 'Tag', count: 38 },
    { id: 'product', name: 'Product Showcase', icon: 'Package', count: 29 },
    { id: 'service', name: 'Service Announcements', icon: 'Briefcase', count: 22 },
    { id: 'seasonal', name: 'Seasonal', icon: 'Calendar', count: 22 }
  ];

  // Mock data for featured templates
  const featuredTemplates = [
    {
      id: 'f1',
      title: 'Diwali Special Offer',
      description: 'Celebrate the festival of lights with exclusive discounts',
      preview: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop',
      category: 'Festival',
      rating: 4.9,
      downloads: '2.3K',
      languages: ['Hindi', 'English', 'Hinglish'],
      sampleContent: {
        title: '🪔 Diwali Special - 50% Off! 🪔',
        description: `Light up your home with our exclusive Diwali collection!\n\n✨ 50% off on all items\n🎁 Free gift wrapping\n🚚 Free home delivery\n\nOffer valid till 15th November. Don't miss out!`,cta: 'Shop Now'
      },
      customizationOptions: ['Business name', 'Logo placement', 'Contact details', 'Custom offers']
    },
    {
      id: 'f2',title: 'New Product Launch',description: 'Announce your latest products with style',preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',category: 'Product',
      rating: 4.8,
      downloads: '1.8K',
      languages: ['English', 'Hindi', 'Tamil'],
      sampleContent: {
        title: '🚀 Introducing Our Latest Innovation! 🚀',description: `We're excited to announce the launch of our newest product that will revolutionize your daily routine.\n\n🌟 Advanced features\n💯 Premium quality\n🎯 Affordable pricing\n\nBe among the first to experience the difference!`,
        cta: 'Learn More'
      },
      customizationOptions: ['Product images', 'Feature highlights', 'Pricing details', 'Launch date']
    },
    {
      id: 'f3',
      title: 'Weekend Sale Banner',
      description: 'Drive weekend traffic with attractive sale banners',
      preview: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop',
      category: 'Promotion',
      rating: 4.7,
      downloads: '3.1K',
      languages: ['English', 'Hinglish', 'Bengali'],
      sampleContent: {
        title: '🔥 Weekend Mega Sale! 🔥',
        description: `This weekend only - Unbeatable prices on everything!\n\n💥 Up to 70% off\n⏰ Limited time offer\n🛍️ All categories included\n\nSaturday & Sunday only. Hurry up!`,
        cta: 'Shop Now'
      },
      customizationOptions: ['Discount percentage', 'Sale duration', 'Product categories', 'Store timings']
    }
  ];

  // Mock data for templates
  const allTemplates = [
    {
      id: 't1',
      title: 'Holi Color Festival Celebration',
      description: 'Vibrant Holi greeting template with traditional elements',
      preview: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
      category: 'Festival',
      rating: 4.8,
      downloads: '1.2K',
      lastUpdated: '2 days ago',
      languages: ['Hindi', 'English', 'Hinglish', 'Bengali'],
      isNew: true,
      isFavorite: false,
      industry: 'retail',
      sampleContent: {
        title: '🌈 Happy Holi! 🌈',
        description: `May your life be filled with colors of joy, happiness, and love this Holi!\n\n🎨 Special Holi offers available\n🎁 Colorful gifts for everyone\n🍬 Traditional sweets & snacks\n\nCelebrate with us and make this Holi memorable!`,
        cta: 'Celebrate With Us'
      },
      customizationOptions: ['Business name', 'Logo placement', 'Contact details', 'Custom greetings']
    },
    {
      id: 't2',
      title: 'Restaurant Menu Special',
      description: 'Showcase your special dishes and offers',
      preview: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: 'Product',
      rating: 4.6,
      downloads: '890',
      lastUpdated: '1 week ago',
      languages: ['English', 'Hindi', 'Tamil'],
      isNew: false,
      isFavorite: false,
      industry: 'food',
      sampleContent: {
        title: '🍽️ Chef\'s Special Menu 🍽️',
        description: `Indulge in our carefully crafted special dishes made with the finest ingredients.\n\n👨‍🍳 Chef's recommendations\n🌶️ Authentic flavors\n💰 Special pricing\n\nBook your table now and treat your taste buds!`,cta: 'Order Now'
      },
      customizationOptions: ['Menu items', 'Pricing', 'Restaurant details', 'Special offers']
    },
    {
      id: 't3',title: 'Healthcare Service Announcement',description: 'Professional healthcare service promotion',preview: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',category: 'Service',
      rating: 4.9,
      downloads: '756',lastUpdated: '3 days ago',
      languages: ['English', 'Hindi', 'Telugu'],
      isNew: false,
      isFavorite: false,
      industry: 'healthcare',
      sampleContent: {
        title: '🏥 Your Health, Our Priority 🏥',
        description: `Comprehensive healthcare services with experienced professionals and modern facilities.\n\n👩‍⚕️ Expert doctors\n🔬 Advanced diagnostics\n📞 24/7 emergency care\n\nSchedule your appointment today for better health tomorrow.`,
        cta: 'Book Appointment'
      },
      customizationOptions: ['Doctor names', 'Services offered', 'Contact information', 'Appointment booking']
    },
    {
      id: 't4',title: 'Eid Mubarak Greetings',description: 'Beautiful Eid celebration template with Islamic motifs',preview: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',category: 'Festival',
      rating: 4.7,
      downloads: '1.5K',lastUpdated: '1 week ago',
      languages: ['English', 'Hindi', 'Hinglish'],
      isNew: false,
      isFavorite: false,
      industry: 'retail',
      sampleContent: {
        title: '🌙 Eid Mubarak! 🌙',
        description: `May this blessed occasion bring peace, happiness, and prosperity to your life.\n\n🕌 Special Eid collection\n🎁 Festive offers available\n👗 Traditional & modern wear\n\nCelebrate this joyous occasion with our exclusive range!`,
        cta: 'Shop Collection'
      },
      customizationOptions: ['Greeting message', 'Business details', 'Special offers', 'Cultural elements']
    },
    {
      id: 't5',title: 'Beauty Salon Services',description: 'Elegant beauty and wellness service promotion',preview: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',category: 'Service',
      rating: 4.5,
      downloads: '623',lastUpdated: '5 days ago',
      languages: ['English', 'Hindi'],
      isNew: true,
      isFavorite: false,
      industry: 'beauty',
      sampleContent: {
        title: '💄 Transform Your Look 💄',description: `Professional beauty services to enhance your natural beauty with expert care.\n\n✨ Skincare treatments\n💇‍♀️ Hair styling\n💅 Nail art\n🧖‍♀️ Bridal packages\n\nBook your appointment and let us pamper you!`,cta: 'Book Now'
      },
      customizationOptions: ['Service menu', 'Pricing packages', 'Stylist information', 'Before/after photos']
    },
    {
      id: 't6',title: 'Christmas Sale Promotion',description: 'Festive Christmas sale template with holiday spirit',preview: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',category: 'Seasonal',
      rating: 4.8,
      downloads: '2.1K',lastUpdated: '2 weeks ago',
      languages: ['English', 'Hinglish'],
      isNew: false,
      isFavorite: false,
      industry: 'retail',
      sampleContent: {
        title: '🎄 Christmas Mega Sale! 🎄',
        description: `Celebrate the season of giving with our special Christmas offers!\n\n🎁 Up to 60% off on gifts\n🎅 Free gift wrapping\n❄️ Winter collection available\n🚚 Express delivery\n\nMake this Christmas special for your loved ones!`,
        cta: 'Shop Gifts'
      },
      customizationOptions: ['Sale percentage', 'Product categories', 'Delivery options', 'Gift services']
    }
  ];

  // Mock data for upcoming cultural events
  const upcomingEvents = [
    {
      id: 'e1',
      name: 'Karva Chauth',
      date: 'November 1, 2024',
      icon: 'Moon',
      templateCount: 12
    },
    {
      id: 'e2',
      name: 'Diwali',
      date: 'November 12, 2024',
      icon: 'Sparkles',
      templateCount: 28
    },
    {
      id: 'e3',
      name: 'Bhai Dooj',
      date: 'November 15, 2024',
      icon: 'Heart',
      templateCount: 8
    },
    {
      id: 'e4',
      name: 'Guru Nanak Jayanti',
      date: 'November 27, 2024',
      icon: 'Star',
      templateCount: 15
    }
  ];

  // Filter templates based on active filters
  const filteredTemplates = allTemplates?.filter(template => {
    const matchesCategory = activeCategory === 'all' || template?.category?.toLowerCase() === activeCategory;
    const matchesSearch = template?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || template?.industry === industryFilter;
    const matchesLanguage = languageFilter === 'all' || 
                           template?.languages?.some(lang => lang?.toLowerCase() === languageFilter);
    
    return matchesCategory && matchesSearch && matchesIndustry && matchesLanguage;
  });

  // Sort templates
  const sortedTemplates = [...filteredTemplates]?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      case 'rating':
        return b?.rating - a?.rating;
      case 'downloads':
        return parseInt(b?.downloads?.replace(/[^\d]/g, '')) - parseInt(a?.downloads?.replace(/[^\d]/g, ''));
      default: // popular
        return parseInt(b?.downloads?.replace(/[^\d]/g, '')) - parseInt(a?.downloads?.replace(/[^\d]/g, ''));
    }
  });

  const handleUseTemplate = (template) => {
    // Navigate to content creation with template data
    navigate('/ai-content-creation', { state: { selectedTemplate: template } });
  };

  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleFavoriteToggle = (templateId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites?.has(templateId)) {
      newFavorites?.delete(templateId);
    } else {
      newFavorites?.add(templateId);
    }
    setFavorites(newFavorites);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setIndustryFilter('all');
    setLanguageFilter('all');
    setActiveCategory('all');
  };

  const handleEventClick = (event) => {
    // Filter templates by event/festival
    setActiveCategory('festival');
    setSearchQuery(event?.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Template Gallery</h1>
                <p className="text-muted-foreground mt-2">
                  Choose from professionally designed templates for your marketing campaigns
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => navigate('/ai-content-creation')}
                iconName="Plus"
                iconPosition="left"
                iconSize={18}
              >
                Create Custom
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              
              <CulturalCalendar
                upcomingEvents={upcomingEvents}
                onEventClick={handleEventClick}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                industryFilter={industryFilter}
                onIndustryChange={setIndustryFilter}
                languageFilter={languageFilter}
                onLanguageChange={setLanguageFilter}
                onClearFilters={handleClearFilters}
              />

              {/* Featured Templates */}
              {activeCategory === 'all' && searchQuery === '' && (
                <FeaturedTemplates
                  templates={featuredTemplates}
                  onUseTemplate={handleUseTemplate}
                />
              )}

              {/* Templates Grid */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {activeCategory === 'all' ? 'All Templates' : 
                     categories?.find(cat => cat?.id === activeCategory)?.name || 'Templates'}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {sortedTemplates?.length} templates found
                  </span>
                </div>

                {sortedTemplates?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedTemplates?.map((template) => (
                      <TemplateCard
                        key={template?.id}
                        template={{
                          ...template,
                          isFavorite: favorites?.has(template?.id)
                        }}
                        onUseTemplate={handleUseTemplate}
                        onPreview={handlePreviewTemplate}
                        onFavorite={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or browse different categories
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      iconName="RotateCcw"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onUseTemplate={handleUseTemplate}
      />
      <VoiceNavigationTrigger />
    </div>
  );
};

export default TemplateGallery;