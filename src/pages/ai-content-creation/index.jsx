import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import VoiceNavigationTrigger from '../../components/ui/VoiceNavigationTrigger';
import LanguageSelector from './components/LanguageSelector';
import VoiceInputArea from './components/VoiceInputArea';
import ContentTypeSelector from './components/ContentTypeSelector';
import AIGenerationPan from './components/AIGenerationPan';
import ContentPreviewEditor from './components/ContentPreviewEditor';
import PlatformPreviewTabs from './components/PlatformPreviewTabs';
import ContentOptimizationSuggestions from './components/ContentOptimizationSuggestions';
import ActionButtons from './components/ActionButtons';

const AIContentCreation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [textInput, setTextInput] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  const mockGeneratedContent = {
    'en': {
      'ad-copy': `🎉 GRAND OPENING SALE! 🎉\n\nGet 50% OFF on all items at our new store!\n\n✨ Fresh products daily\n✨ Best prices guaranteed\n✨ Free home delivery\n\nVisit us today at Shop No. 15, Market Street\nCall: +91 98765 43210\n\n#GrandOpening #Sale #BestDeals`,
      'social-post': `Excited to share our latest collection! 🛍️\n\nFrom traditional wear to modern fashion, we have something for everyone. Quality products at affordable prices.\n\nCome visit our store and experience the difference!\n\n📍 Location: Market Street, Delhi\n📞 Contact: +91 98765 43210\n\n#Fashion #Quality #AffordablePrices`,
      'product-desc': `Premium Cotton T-Shirt - Comfort Redefined\n\n🌟 Features:\n• 100% Pure Cotton Fabric\n• Breathable and Soft\n• Available in 5 Colors\n• Machine Washable\n• Perfect Fit Guaranteed\n\n💰 Price: ₹499 (MRP ₹799)\n\nOrder now for free home delivery!\nCall: +91 98765 43210`,
      'festival-greeting': `🪔 Happy Diwali! 🪔\n\nMay this festival of lights bring joy, prosperity, and happiness to your family!\n\n🎊 Special Diwali Offer:\n• 40% OFF on all items\n• Free gift wrapping\n• Special festive collection\n\nCelebrate with us!\nVisit our store today.\n\n#HappyDiwali #FestivalOffers #Celebration`
    },
    'hi': {
      'ad-copy': `🎉 भव्य उद्घाटन सेल! 🎉\n\nहमारे नए स्टोर पर सभी वस्तुओं पर 50% छूट!\n\n✨ रोज़ाना ताज़े उत्पाद\n✨ सबसे अच्छी कीमत की गारंटी\n✨ मुफ्त होम डिलीवरी\n\nआज ही आएं दुकान नं. 15, मार्केट स्ट्रीट\nकॉल करें: +91 98765 43210\n\n#भव्यउद्घाटन #सेल #बेस्टडील्स`,
      'social-post': `हमारे नवीनतम कलेक्शन को साझा करते हुए खुशी हो रही है! 🛍️\n\nपारंपरिक पहनावे से लेकर आधुनिक फैशन तक, हमारे पास सभी के लिए कुछ न कुछ है।\n\nहमारे स्टोर पर आएं और अंतर महसूस करें!\n\n📍 स्थान: मार्केट स्ट्रीट, दिल्ली\n📞 संपर्क: +91 98765 43210`,
      'product-desc': `प्रीमियम कॉटन टी-शर्ट - आराम की नई परिभाषा\n\n🌟 विशेषताएं:\n• 100% शुद्ध कॉटन फैब्रिक\n• सांस लेने योग्य और मुलायम\n• 5 रंगों में उपलब्ध\n• मशीन से धो सकते हैं\n• परफेक्ट फिट की गारंटी\n\n💰 कीमत: ₹499 (एमआरपी ₹799)\n\nमुफ्त होम डिलीवरी के लिए अभी ऑर्डर करें!`,
      'festival-greeting': `🪔 दीपावली की हार्दिक शुभकामनाएं! 🪔\n\nयह दीपों का त्योहार आपके परिवार में खुशी, समृद्धि और खुशहाली लाए!\n\n🎊 विशेष दीवाली ऑफर:\n• सभी वस्तुओं पर 40% छूट\n• मुफ्त गिफ्ट रैपिंग\n• विशेष त्योहारी कलेक्शन\n\nहमारे साथ मनाएं!\nआज ही हमारे स्टोर पर आएं।`
    }
  };

  const handleGenerate = async () => {
    if (!textInput?.trim() || !selectedType) return;

    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const content = mockGeneratedContent?.[selectedLanguage]?.[selectedType] || 
                    mockGeneratedContent?.['en']?.[selectedType] || 
                    `Generated ${selectedType} content based on: "${textInput}"`;
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleContentChange = (newContent) => {
    setGeneratedContent(newContent);
  };

  const handleSaveDraft = async () => {
    if (!generatedContent) return;

    setIsSaving(true);
    
    // Simulate save operation
    setTimeout(() => {
      // In a real app, you would save to backend/localStorage
      const drafts = JSON.parse(localStorage.getItem('contentDrafts') || '[]');
      const newDraft = {
        id: Date.now(),
        content: generatedContent,
        type: selectedType,
        language: selectedLanguage,
        createdAt: new Date()?.toISOString(),
        title: `${selectedType} - ${new Date()?.toLocaleDateString()}`
      };
      
      drafts?.unshift(newDraft);
      localStorage.setItem('contentDrafts', JSON.stringify(drafts?.slice(0, 10))); // Keep only 10 recent drafts
      
      setIsSaving(false);
      
      // Show success message (in a real app, you might use a toast notification)
      alert('Content saved as draft successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <VoiceNavigationTrigger />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Content Creation</h1>
            <p className="text-muted-foreground">
              Create professional marketing content with AI assistance in your preferred language
            </p>
          </div>

          {/* Language Selector */}
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input and Generation */}
            <div className="lg:col-span-2 space-y-6">
              <VoiceInputArea
                textInput={textInput}
                setTextInput={setTextInput}
                selectedLanguage={selectedLanguage}
                isGenerating={isGenerating}
              />

              <ContentTypeSelector
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                isGenerating={isGenerating}
              />

              <AIGenerationPan
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                onRegenerate={handleRegenerate}
                generatedContent={generatedContent}
                textInput={textInput}
                selectedType={selectedType}
                selectedLanguage={selectedLanguage}
              />

              <ContentPreviewEditor
                generatedContent={generatedContent}
                onContentChange={handleContentChange}
                selectedLanguage={selectedLanguage}
              />

              <PlatformPreviewTabs
                generatedContent={generatedContent}
              />
            </div>

            {/* Right Column - Suggestions and Actions */}
            <div className="space-y-6">
              <ContentOptimizationSuggestions
                generatedContent={generatedContent}
                selectedType={selectedType}
                selectedLanguage={selectedLanguage}
              />

              <ActionButtons
                generatedContent={generatedContent}
                onSaveDraft={handleSaveDraft}
                isSaving={isSaving}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIContentCreation;