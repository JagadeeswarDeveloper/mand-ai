import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

const VoiceNavigationTrigger = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  const voiceCommands = {
    'dashboard': '/main-dashboard',
    'home': '/main-dashboard',
    'create': '/ai-content-creation',
    'content': '/ai-content-creation',
    'deliver': '/multi-channel-delivery',
    'send': '/multi-channel-delivery',
    'campaigns': '/campaign-management',
    'manage': '/campaign-management',
    'analytics': '/analytics-dashboard',
    'reports': '/analytics-dashboard',
    'templates': '/template-gallery',
    'gallery': '/template-gallery'
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript?.toLowerCase()?.trim();
        
        // Check for navigation commands
        for (const [command, path] of Object.entries(voiceCommands)) {
          if (transcript?.includes(command)) {
            navigate(path);
            break;
          }
        }
        
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [navigate]);

  const handleVoiceCommand = () => {
    if (!isSupported || !recognition) return;
    
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant={isListening ? "default" : "secondary"}
        size="icon"
        onClick={handleVoiceCommand}
        className={`w-14 h-14 rounded-full elevation-2 spring-animation ${
          isListening ? 'voice-pulse' : ''
        }`}
        iconName="Mic"
        iconSize={24}
      />
      
      {isListening && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-2 elevation-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-sm text-popover-foreground font-medium">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceNavigationTrigger;