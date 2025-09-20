import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateGallerySection = () => {
  const navigate = useNavigate();

  const featuredTemplates = [
    {
      id: 1,
      title: "Diwali Festival Greetings",
      category: "Festival",
      thumbnail: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Beautiful Diwali wishes with traditional designs",
      usageCount: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: "Flash Sale Announcement",
      category: "Promotional",
      thumbnail: "https://images.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg",
      description: "Eye-catching sale promotion template",
      usageCount: 890,
      rating: 4.6
    },
    {
      id: 3,
      title: "New Product Launch",
      category: "Product",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
      description: "Professional product showcase design",
      usageCount: 670,
      rating: 4.7
    },
    {
      id: 4,
      title: "Customer Testimonial",
      category: "Social Proof",
      thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Build trust with customer reviews",
      usageCount: 540,
      rating: 4.5
    }
  ];

  const categories = [
    { name: "Festival", icon: "Sparkles", count: 25, color: "bg-primary" },
    { name: "Promotional", icon: "Tag", count: 18, color: "bg-secondary" },
    { name: "Product", icon: "Package", count: 22, color: "bg-accent" },
    { name: "Social Proof", icon: "Star", count: 12, color: "bg-success" }
  ];

  const handleTemplateClick = (templateId) => {
    navigate('/template-gallery');
  };

  const handleCategoryClick = (category) => {
    navigate('/template-gallery');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Template Gallery</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/template-gallery')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Browse All
        </Button>
      </div>
      {/* Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {categories?.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category?.name)}
            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={`flex items-center justify-center w-10 h-10 ${category?.color} rounded-lg`}>
              <Icon name={category?.icon} size={20} color="white" />
            </div>
            <div>
              <div className="font-medium text-card-foreground text-sm">{category?.name}</div>
              <div className="text-xs text-muted-foreground">{category?.count} templates</div>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredTemplates?.map((template) => (
          <div
            key={template?.id}
            onClick={() => handleTemplateClick(template?.id)}
            className="group cursor-pointer bg-muted/30 rounded-lg overflow-hidden hover:elevation-1 transition-all"
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={template?.thumbnail}
                alt={template?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {template?.category}
                </span>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">{template?.rating}</span>
                </div>
              </div>
              
              <h3 className="font-medium text-card-foreground text-sm mb-1 line-clamp-1">
                {template?.title}
              </h3>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {template?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {template?.usageCount?.toLocaleString('en-IN')} uses
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconSize={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Use
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Zap" size={24} className="text-primary" />
            <div>
              <div className="font-semibold text-card-foreground">Ready-to-use Templates</div>
              <div className="text-sm text-muted-foreground">Save time with pre-designed content</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-primary">77+</div>
              <div className="text-muted-foreground">Templates</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-secondary">15+</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-accent">5★</div>
              <div className="text-muted-foreground">Rated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallerySection;