import React from 'react';

import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            iconSize={18}
            className="justify-start"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{category?.name}</span>
              <span className="text-xs opacity-70">{category?.count} templates</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;