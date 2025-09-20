import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChannelSetupModal = ({ isOpen, onClose, channelId, channelName, onSetupComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    apiKey: '',
    accountId: '',
    phoneNumber: '',
    accessToken: ''
  });

  if (!isOpen) return null;

  const getSetupSteps = () => {
    const baseSteps = [
      { id: 1, title: 'Account Connection', description: 'Connect your account' },
      { id: 2, title: 'Configuration', description: 'Configure settings' },
      { id: 3, title: 'Verification', description: 'Verify connection' }
    ];

    return baseSteps;
  };

  const getChannelIcon = () => {
    const icons = {
      'WhatsApp': 'MessageCircle',
      'SMS': 'MessageSquare',
      'Facebook': 'Facebook',
      'Instagram': 'Instagram'
    };
    return icons?.[channelName] || 'Settings';
  };

  const getSetupInstructions = () => {
    const instructions = {
      'WhatsApp': {
        step1: 'Go to WhatsApp Business API dashboard and generate your API key',
        step2: 'Enter your WhatsApp Business phone number and configure webhook settings',
        step3: 'Send a test message to verify the connection'
      },
      'SMS': {
        step1: 'Sign up for SMS gateway service and obtain your API credentials',
        step2: 'Configure sender ID and message templates',
        step3: 'Send a test SMS to verify delivery'
      },
      'Facebook': {
        step1: 'Connect your Facebook Business account and generate access token',
        step2: 'Select Facebook pages and configure posting permissions',
        step3: 'Create a test post to verify connection'
      },
      'Instagram': {
        step1: 'Link your Instagram Business account through Facebook',
        step2: 'Configure Instagram posting settings and content formats',
        step3: 'Post a test story to verify integration'
      }
    };
    return instructions?.[channelName] || instructions?.['SMS'];
  };

  const instructions = getSetupInstructions();
  const steps = getSetupSteps();

  const handleInputChange = (field, value) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup
      onSetupComplete(channelId, setupData);
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-card-foreground mb-2">Step 1: Account Connection</h4>
              <p className="text-sm text-muted-foreground mb-3">{instructions?.step1}</p>
            </div>
            <Input
              label="API Key / Access Token"
              type="password"
              placeholder="Enter your API key or access token"
              value={setupData?.apiKey}
              onChange={(e) => handleInputChange('apiKey', e?.target?.value)}
              required
            />
            <Input
              label="Account ID"
              type="text"
              placeholder="Enter your account ID"
              value={setupData?.accountId}
              onChange={(e) => handleInputChange('accountId', e?.target?.value)}
              required
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-card-foreground mb-2">Step 2: Configuration</h4>
              <p className="text-sm text-muted-foreground mb-3">{instructions?.step2}</p>
            </div>
            {channelName === 'WhatsApp' || channelName === 'SMS' ? (
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your business phone number"
                value={setupData?.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                required
              />
            ) : (
              <Input
                label="Page/Account Name"
                type="text"
                placeholder="Enter your page or account name"
                value={setupData?.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                required
              />
            )}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm text-card-foreground">
                  <p className="font-medium mb-1">Configuration Tips:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Ensure your account has necessary permissions</li>
                    <li>• Use a verified business account for better delivery</li>
                    <li>• Keep your credentials secure and don't share them</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-card-foreground mb-2">Step 3: Verification</h4>
              <p className="text-sm text-muted-foreground mb-3">{instructions?.step3}</p>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-success rounded-full">
                  <Icon name="Check" size={16} color="white" />
                </div>
                <div>
                  <h4 className="font-medium text-success">Connection Successful!</h4>
                  <p className="text-sm text-card-foreground">
                    Your {channelName} account has been successfully connected and verified.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Account Status:</span>
                <span className="text-success font-medium">✓ Connected</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">API Status:</span>
                <span className="text-success font-medium">✓ Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Delivery Status:</span>
                <span className="text-success font-medium">✓ Ready</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name={getChannelIcon()} size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Setup {channelName}</h2>
              <p className="text-sm text-muted-foreground">Connect your {channelName} account</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step?.id 
                    ? 'bg-primary border-primary text-white' :'border-border text-muted-foreground'
                }`}>
                  {currentStep > step?.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-medium">{step?.id}</span>
                  )}
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step?.id ? 'bg-primary' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-card-foreground">{steps?.[currentStep - 1]?.title}</h3>
            <p className="text-sm text-muted-foreground">{steps?.[currentStep - 1]?.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevStep}
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          <Button
            variant="default"
            onClick={handleNextStep}
            disabled={currentStep === 1 && (!setupData?.apiKey || !setupData?.accountId)}
          >
            {currentStep === steps?.length ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelSetupModal;