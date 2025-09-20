import React from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  industryFilter, 
  onIndustryChange,
  languageFilter,
  onLanguageChange,
  onClearFilters 
}) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloaded' }
  ];

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'retail', label: 'Retail & Shopping' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'services', label: 'Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'real-estate', label: 'Real Estate' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'hinglish', label: 'Hinglish' }
  ];

  const hasActiveFilters = industryFilter !== 'all' || languageFilter !== 'all' || searchQuery?.length > 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-full sm:w-48"
          />
          
          <Select
            options={industryOptions}
            value={industryFilter}
            onChange={onIndustryChange}
            placeholder="Industry"
            className="w-full sm:w-48"
          />
          
          <Select
            options={languageOptions}
            value={languageFilter}
            onChange={onLanguageChange}
            placeholder="Language"
            className="w-full sm:w-48"
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;