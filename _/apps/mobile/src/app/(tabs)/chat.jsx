import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Camera,
  ChevronDown,
  Bot,
  User
} from 'lucide-react-native';
import {
  useAudioRecorder,
  useAudioRecorderState,
  requestRecordingPermissionsAsync,
  RecordingPresets,
} from 'expo-audio';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function Chat() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं AgroMitra हूं। आपकी खेती में कैसे मदद कर सकता हूं?",
      isUser: false,
      timestamp: new Date(),
      language: 'hi'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollViewRef = useRef(null);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  const languages = [
    { name: 'Hindi', code: 'hi' },
    { name: 'English', code: 'en' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Telugu', code: 'te' },
    { name: 'Gujarati', code: 'gu' },
    { name: 'Punjabi', code: 'pa' }
  ];

  useEffect(() => {
    (async () => {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        Alert.alert(
          'Permission Required',
          'Microphone access is needed for voice chat'
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "आपकी गेहूं की फसल के लिए, अभी सिंचाई का समय है। मिट्टी में नमी की जांच करें।",
        "कपास में कीट प्रकोप के लिए नीम का तेल स्प्रे करें। हर 10 दिन में दोहराएं।",
        "प्याज की कीमत आज 2,500 रुपये प्रति क्विंटल है। बेचने का अच्छा समय है।",
        "बारिश के मौसम में डेमपिंग ऑफ से बचने के लिए अच्छी जल निकासी सुनिश्चित करें।"
      ];

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date(),
        language: 'hi'
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recorder.stop();
      
      // Simulate voice processing
      setTimeout(() => {
        const voiceMessage = {
          id: Date.now(),
          text: "मेरी गेहूं की फसल में पीले पत्ते दिख रहे हैं, क्या करूं?",
          isUser: true,
          timestamp: new Date(),
          isVoice: true,
        };

        setMessages(prev => [...prev, voiceMessage]);

        // AI response
        setTimeout(() => {
          const aiResponse = {
            id: Date.now() + 1,
            text: "पीले पत्ते नाइट्रोजन की कमी या जल भराव के कारण हो सकते हैं। यूरिया 50 किलो प्रति एकड़ डालें और सिंचाई कम करें।",
            isUser: false,
            timestamp: new Date(),
            language: 'hi'
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 1500);
      }, 1000);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to process voice message');
    }
  };

  const speakMessage = (text) => {
    setIsSpeaking(true);
    // Simulate text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const MessageBubble = ({ message }) => (
    <View style={{
      flexDirection: 'row',
      marginBottom: 16,
      justifyContent: message.isUser ? 'flex-end' : 'flex-start',
    }}>
      {!message.isUser && (
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: '#2E7D32',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          <Bot size={20} color="#FFFFFF" />
        </View>
      )}
      
      <View style={{
        maxWidth: '75%',
        backgroundColor: message.isUser ? '#2E7D32' : '#F8F9FA',
        borderRadius: 20,
        padding: 16,
        borderTopLeftRadius: message.isUser ? 20 : 4,
        borderTopRightRadius: message.isUser ? 4 : 20,
      }}>
        <Text style={{
          fontSize: 16,
          color: message.isUser ? '#FFFFFF' : '#2E7D32',
          lineHeight: 22,
        }}>
          {message.text}
        </Text>
        
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
          <Text style={{
            fontSize: 12,
            color: message.isUser ? 'rgba(255,255,255,0.7)' : '#999999',
          }}>
            {formatTime(message.timestamp)}
            {message.isVoice && ' • Voice'}
          </Text>
          
          {!message.isUser && (
            <TouchableOpacity
              onPress={() => speakMessage(message.text)}
              style={{
                backgroundColor: 'rgba(46,125,50,0.1)',
                borderRadius: 12,
                padding: 4,
                marginLeft: 8,
              }}
            >
              {isSpeaking ? (
                <VolumeX size={16} color="#2E7D32" />
              ) : (
                <Volume2 size={16} color="#2E7D32" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {message.isUser && (
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: '#E8F5E8',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 12,
        }}>
          <User size={20} color="#2E7D32" />
        </View>
      )}
    </View>
  );

  const LanguageDropdown = () => (
    <View style={{ position: 'relative', marginBottom: 16 }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
      >
        <Text style={{ fontSize: 14, color: '#2E7D32', fontWeight: '600' }}>
          {selectedLanguage}
        </Text>
        <ChevronDown size={16} color="#2E7D32" />
      </TouchableOpacity>

      {showLanguageDropdown && (
        <View style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          zIndex: 1000,
        }}>
          {languages.map((language, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 12,
                borderBottomWidth: index < languages.length - 1 ? 1 : 0,
                borderBottomColor: '#F0F0F0',
              }}
              onPress={() => {
                setSelectedLanguage(language.name);
                setShowLanguageDropdown(false);
              }}
            >
              <Text style={{
                fontSize: 14,
                color: '#2E7D32',
                fontWeight: language.name === selectedLanguage ? '600' : '400',
              }}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={{
          backgroundColor: '#FFFFFF',
          paddingTop: insets.top + 12,
          paddingBottom: 16,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#2E7D32',
            textAlign: 'center',
            marginBottom: 8,
          }}>
            AI Assistant
          </Text>
          
          <LanguageDropdown />
          
          <Text style={{
            fontSize: 14,
            color: '#666666',
            textAlign: 'center',
          }}>
            Ask me anything about farming in your language
          </Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            padding: 24, 
            paddingBottom: 120 
          }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={{
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 12,
          }}>
            {/* Text Input */}
            <View style={{
              flex: 1,
              backgroundColor: '#F8F9FA',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
              maxHeight: 100,
            }}>
              <TextInput
                style={{
                  fontSize: 16,
                  color: '#2E7D32',
                  maxHeight: 76,
                }}
                placeholder="Type your message..."
                placeholderTextColor="#999999"
                value={inputText}
                onChangeText={setInputText}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Voice Button */}
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: isRecording ? '#F44336' : '#2E7D32',
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={isRecording ? stopRecording : startRecording}
              onLongPress={startRecording}
              onPressOut={stopRecording}
            >
              {isRecording ? (
                <MicOff size={24} color="#FFFFFF" />
              ) : (
                <Mic size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            {/* Send Button */}
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: inputText.trim() ? '#2E7D32' : '#E0E0E0',
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Send size={24} color={inputText.trim() ? '#FFFFFF' : '#999999'} />
            </TouchableOpacity>
          </View>

          {/* Voice Status */}
          {isRecording && (
            <View style={{
              backgroundColor: '#FFEBEE',
              borderRadius: 12,
              padding: 12,
              marginTop: 12,
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 14,
                color: '#F44336',
                fontWeight: '600',
              }}>
                🔴 Recording... Speak now
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#666666',
                marginTop: 4,
              }}>
                Release to send voice message
              </Text>
            </View>
          )}

          {/* Quick Actions */}
          <View style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 12,
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#E8F5E8',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={() => setInputText('मेरी फसल में कीट लगे हैं')}
            >
              <Text style={{ fontSize: 12, color: '#2E7D32', fontWeight: '600' }}>
                🐛 Pest problem
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#F0F8FF',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={() => setInputText('आज का मौसम कैसा है?')}
            >
              <Text style={{ fontSize: 12, color: '#2E7D32', fontWeight: '600' }}>
                🌤️ Weather
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#FFF8E1',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={() => setInputText('मंडी भाव क्या है?')}
            >
              <Text style={{ fontSize: 12, color: '#2E7D32', fontWeight: '600' }}>
                💰 Prices
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}