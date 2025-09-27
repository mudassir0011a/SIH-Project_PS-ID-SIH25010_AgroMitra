import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronDown, ArrowLeft } from 'lucide-react-native';

export default function Login() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Gujarati', 'Punjabi'];

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      router.replace('/profile-setup');
    }
  };

  const LanguageDropdown = () => (
    <View style={{ position: 'relative', marginBottom: 24 }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 16,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 2,
          borderColor: '#2E7D32',
        }}
        onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginRight: 12 }}>🌐</Text>
          <Text style={{ fontSize: 18, color: '#2E7D32', fontWeight: '600' }}>
            {selectedLanguage}
          </Text>
        </View>
        <ChevronDown size={24} color="#2E7D32" />
      </TouchableOpacity>

      {showLanguageDropdown && (
        <View style={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
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
                padding: 16,
                borderBottomWidth: index < languages.length - 1 ? 1 : 0,
                borderBottomColor: '#F0F0F0',
              }}
              onPress={() => {
                setSelectedLanguage(language);
                setShowLanguageDropdown(false);
              }}
            >
              <Text style={{
                fontSize: 16,
                color: '#2E7D32',
                fontWeight: language === selectedLanguage ? '600' : '400',
              }}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      <StatusBar style="dark" />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 48 }}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: '#2E7D32',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <Text style={{ fontSize: 40 }}>🌾</Text>
          </View>

          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Welcome to AgroMitra
          </Text>

          <Text style={{
            fontSize: 16,
            color: '#666666',
            textAlign: 'center',
            lineHeight: 24,
          }}>
            Get personalized farming advice and market insights
          </Text>
        </View>

        {/* Language Selection */}
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#2E7D32',
          marginBottom: 12,
        }}>
          Select Language / भाषा चुनें
        </Text>
        <LanguageDropdown />

        {/* Phone Number Input */}
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#2E7D32',
          marginBottom: 12,
        }}>
          Mobile Number / मोबाइल नंबर
        </Text>

        <View style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          borderWidth: 2,
          borderColor: showOtp ? '#E0E0E0' : '#2E7D32',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              fontSize: 18,
              color: '#2E7D32',
              fontWeight: '600',
              marginRight: 12,
            }}>
              +91
            </Text>
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                color: '#2E7D32',
                fontWeight: '600',
              }}
              placeholder="Enter 10-digit number"
              placeholderTextColor="#999999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              maxLength={10}
              editable={!showOtp}
            />
          </View>
        </View>

        {/* OTP Input */}
        {showOtp && (
          <>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#2E7D32',
              marginBottom: 12,
            }}>
              Enter OTP / OTP दर्ज करें
            </Text>

            <View style={{
              backgroundColor: '#F8F9FA',
              borderRadius: 16,
              padding: 16,
              marginBottom: 24,
              borderWidth: 2,
              borderColor: '#2E7D32',
            }}>
              <TextInput
                style={{
                  fontSize: 20,
                  color: '#2E7D32',
                  fontWeight: '600',
                  textAlign: 'center',
                  letterSpacing: 8,
                }}
                placeholder="000000"
                placeholderTextColor="#999999"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                padding: 12,
                alignItems: 'center',
                marginBottom: 24,
              }}
              onPress={() => console.log('Resend OTP')}
            >
              <Text style={{
                fontSize: 16,
                color: '#2E7D32',
                fontWeight: '600',
              }}>
                Resend OTP / OTP फिर से भेजें
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#2E7D32',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            marginTop: 12,
            shadowColor: '#2E7D32',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={showOtp ? handleVerifyOtp : handleSendOtp}
        >
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'bold',
          }}>
            {showOtp ? 'Verify & Continue / सत्यापित करें' : 'Send OTP / OTP भेजें'}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={{
          fontSize: 14,
          color: '#666666',
          textAlign: 'center',
          marginTop: 24,
          lineHeight: 20,
        }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </View>
  );
}