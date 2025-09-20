import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languageOptions = [
    { value: 'en', label: 'English', description: 'English' },
    { value: 'hi', label: 'हिंदी', description: 'Hindi' },
    { value: 'ta', label: 'தமிழ்', description: 'Tamil' },
    { value: 'te', label: 'తెలుగు', description: 'Telugu' },
    { value: 'bn', label: 'বাংলা', description: 'Bengali' },
    { value: 'hinglish', label: 'Hinglish', description: 'Hindi + English' }
  ];

  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="flex items-center space-x-2">
        <Icon name="Globe" size={20} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Language:</span>
      </div>
      <div className="min-w-[140px]">
        <Select
          options={languageOptions}
          value={selectedLanguage}
          onChange={onLanguageChange}
          placeholder="Select language"
        />
      </div>
    </div>
  );
};

export default LanguageSelector;