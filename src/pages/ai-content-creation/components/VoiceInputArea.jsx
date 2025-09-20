import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';


const VoiceInputArea = ({ textInput, setTextInput, selectedLanguage, isGenerating }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const languageMap = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'bn': 'bn-IN',
    'hinglish': 'en-IN'
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = languageMap?.[selectedLanguage] || 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event?.resultIndex; i < event?.results?.length; i++) {
          if (event?.results?.[i]?.isFinal) {
            finalTranscript += event?.results?.[i]?.[0]?.transcript;
          }
        }
        if (finalTranscript) {
          setTextInput(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [selectedLanguage, setTextInput]);

  const handleVoiceToggle = () => {
    if (!isSupported || !recognition || isGenerating) return;
    
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Content Input</h2>
        {isSupported && (
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={handleVoiceToggle}
            disabled={isGenerating}
            iconName="Mic"
            iconPosition="left"
            iconSize={18}
            className={isListening ? 'voice-pulse' : ''}
          >
            {isListening ? 'Stop Recording' : 'Voice Input'}
          </Button>
        )}
      </div>
      <div className="relative">
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e?.target?.value)}
          placeholder={`Type your content idea or use voice input... (${selectedLanguage === 'hi' ? 'अपना विचार यहाँ लिखें' : selectedLanguage === 'ta' ? 'உங்கள் யோசனையை இங்கே எழுதுங்கள்' : 'Type your content idea here'})`}
          className="w-full h-32 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-input text-foreground placeholder:text-muted-foreground"
          disabled={isGenerating}
        />
        
        {isListening && (
          <div className="absolute top-2 right-2 flex items-center space-x-2 bg-error/10 text-error px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Recording...</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          {textInput?.length} characters
        </span>
        {!isSupported && (
          <span className="text-xs text-warning">Voice input not supported in this browser</span>
        )}
      </div>
    </div>
  );
};

export default VoiceInputArea;