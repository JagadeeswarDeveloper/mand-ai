import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInputSection = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  const voiceCommands = {
    'create content': '/ai-content-creation',
    'make content': '/ai-content-creation',
    'generate content': '/ai-content-creation',
    'send campaign': '/multi-channel-delivery',
    'deliver campaign': '/multi-channel-delivery',
    'view analytics': '/analytics-dashboard',
    'show analytics': '/analytics-dashboard',
    'open templates': '/template-gallery',
    'browse templates': '/template-gallery',
    'manage campaigns': '/campaign-management'
  };

  const supportedLanguages = [
    { code: 'en-IN', name: 'English (India)', flag: '🇮🇳' },
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te-IN', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn-IN', name: 'বাংলা', flag: '🇮🇳' }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event?.resultIndex; i < event?.results?.length; i++) {
          const transcript = event?.results?.[i]?.[0]?.transcript;
          if (event?.results?.[i]?.isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          const command = finalTranscript?.toLowerCase()?.trim();
          
          // Check for navigation commands
          for (const [voiceCommand, path] of Object.entries(voiceCommands)) {
            if (command?.includes(voiceCommand)) {
              setTimeout(() => navigate(path), 1000);
              break;
            }
          }
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
        setTranscript('');
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

  if (!isSupported) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="text-center">
          <Icon name="MicOff" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Voice Input Not Supported</h3>
          <p className="text-muted-foreground">
            Your browser doesn't support voice recognition. Please use a modern browser like Chrome or Edge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Voice Commands
        </h3>
        
        <div className="flex flex-col items-center gap-4 mb-6">
          <Button
            variant={isListening ? "default" : "outline"}
            size="lg"
            onClick={handleVoiceCommand}
            iconName="Mic"
            iconPosition="left"
            iconSize={24}
            className={`w-48 h-16 text-lg ${isListening ? 'voice-pulse' : ''}`}
          >
            {isListening ? 'Listening...' : 'Tap to Speak'}
          </Button>

          {transcript && (
            <div className="bg-muted/30 rounded-lg p-4 max-w-md">
              <p className="text-sm text-muted-foreground mb-1">You said:</p>
              <p className="font-medium text-card-foreground">"{transcript}"</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm font-medium text-card-foreground mb-1">"Create Content"</p>
            <p className="text-xs text-muted-foreground">Opens AI content creation</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm font-medium text-card-foreground mb-1">"Send Campaign"</p>
            <p className="text-xs text-muted-foreground">Opens multi-channel delivery</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm font-medium text-card-foreground mb-1">"View Analytics"</p>
            <p className="text-xs text-muted-foreground">Opens analytics dashboard</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-sm text-muted-foreground">Supported languages:</span>
          {supportedLanguages?.map((lang, index) => (
            <span key={index} className="text-sm bg-muted/30 px-2 py-1 rounded">
              {lang?.flag} {lang?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceInputSection;