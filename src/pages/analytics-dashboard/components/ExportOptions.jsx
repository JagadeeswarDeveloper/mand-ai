import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportOptions = ({ onExport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const exportOptions = [
    {
      type: 'pdf',
      label: 'PDF Report',
      description: 'Complete analytics report with charts and insights',
      icon: 'FileText',
      color: 'bg-red-500'
    },
    {
      type: 'csv',
      label: 'CSV Data',
      description: 'Raw data export for external analysis',
      icon: 'Download',
      color: 'bg-green-500'
    },
    {
      type: 'excel',
      label: 'Excel Workbook',
      description: 'Formatted spreadsheet with multiple sheets',
      icon: 'FileSpreadsheet',
      color: 'bg-blue-500'
    }
  ];

  const handleExport = async (type) => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock file download
      const fileName = `analytics-report-${new Date()?.toISOString()?.split('T')?.[0]}.${type}`;
      
      // Create mock download
      const element = document.createElement('a');
      element?.setAttribute('href', 'data:text/plain;charset=utf-8,Mock Analytics Data Export');
      element?.setAttribute('download', fileName);
      element.style.display = 'none';
      document.body?.appendChild(element);
      element?.click();
      document.body?.removeChild(element);
      
      onExport?.(type, fileName);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg">
          <Icon name="Download" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Export Data</h3>
          <p className="text-sm text-muted-foreground">Download analytics reports and raw data</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions?.map((option) => (
          <div
            key={option?.type}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 nav-transition cursor-pointer"
            onClick={() => handleExport(option?.type)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`flex items-center justify-center w-10 h-10 ${option?.color} rounded-lg`}>
                <Icon name={option?.icon} size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{option?.label}</h4>
              </div>
              {isExporting && exportType === option?.type && (
                <div className="animate-spin">
                  <Icon name="Loader2" size={16} className="text-primary" />
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {option?.description}
            </p>
            
            <Button
              variant="outline"
              size="sm"
              fullWidth
              disabled={isExporting}
              loading={isExporting && exportType === option?.type}
              iconName={isExporting && exportType === option?.type ? "Loader2" : "Download"}
              iconPosition="left"
              iconSize={16}
              className="text-xs"
            >
              {isExporting && exportType === option?.type ? 'Exporting...' : `Export ${option?.type?.toUpperCase()}`}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Export Information:</p>
            <ul className="space-y-1 text-xs">
              <li>• Reports include data from selected date range</li>
              <li>• PDF reports contain visual charts and insights</li>
              <li>• CSV/Excel files include raw numerical data</li>
              <li>• All exports are generated in real-time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;