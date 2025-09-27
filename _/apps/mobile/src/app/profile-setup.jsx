import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronDown, MapPin, Droplets, Wheat, Home } from 'lucide-react-native';

export default function ProfileSetup() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Form state
  const [farmSize, setFarmSize] = useState(1);
  const [selectedSoilType, setSelectedSoilType] = useState('');
  const [selectedWaterSource, setSelectedWaterSource] = useState('');
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [location, setLocation] = useState('');
  const [farmerName, setFarmerName] = useState('');
  
  // Dropdown states
  const [showSoilDropdown, setShowSoilDropdown] = useState(false);
  const [showWaterDropdown, setShowWaterDropdown] = useState(false);

  const soilTypes = [
    'Clay Soil', 'Sandy Soil', 'Loamy Soil', 'Silty Soil', 
    'Black Cotton Soil', 'Red Soil', 'Alluvial Soil'
  ];

  const waterSources = [
    'Bore Well', 'Canal', 'River', 'Pond', 'Rain Water', 
    'Tube Well', 'Government Supply'
  ];

  const cropOptions = [
    'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Bajra', 
    'Jowar', 'Groundnut', 'Soybean', 'Onion', 'Potato', 'Tomato'
  ];

  const handleCropToggle = (crop) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter(c => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleComplete = () => {
    // Navigate to main app
    router.replace('/(tabs)/home');
  };

  const SizeSlider = () => (
    <View style={{ marginBottom: 24 }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 12,
      }}>
        Farm Size (Acres) / खेत का आकार
      </Text>
      
      <View style={{
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#2E7D32',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <Text style={{ fontSize: 16, color: '#666666' }}>0.5</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2E7D32' }}>
            {farmSize} Acres
          </Text>
          <Text style={{ fontSize: 16, color: '#666666' }}>50+</Text>
        </View>
        
        {/* Simple slider representation */}
        <View style={{
          height: 8,
          backgroundColor: '#E0E0E0',
          borderRadius: 4,
          position: 'relative',
        }}>
          <View style={{
            height: 8,
            backgroundColor: '#2E7D32',
            borderRadius: 4,
            width: `${(farmSize / 50) * 100}%`,
          }} />
        </View>
        
        {/* Quick size buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
          {[1, 2, 5, 10, 25].map((size) => (
            <TouchableOpacity
              key={size}
              style={{
                backgroundColor: farmSize === size ? '#2E7D32' : '#FFFFFF',
                borderWidth: 2,
                borderColor: '#2E7D32',
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
              onPress={() => setFarmSize(size)}
            >
              <Text style={{
                color: farmSize === size ? '#FFFFFF' : '#2E7D32',
                fontWeight: '600',
              }}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const DropdownField = ({ 
    title, value, options, onSelect, isOpen, onToggle, icon: IconComponent 
  }) => (
    <View style={{ position: 'relative', marginBottom: 24 }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 12,
      }}>
        {title}
      </Text>
      
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
        onPress={onToggle}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconComponent size={20} color="#2E7D32" style={{ marginRight: 12 }} />
          <Text style={{
            fontSize: 16,
            color: value ? '#2E7D32' : '#999999',
            fontWeight: value ? '600' : '400',
          }}>
            {value || 'Select option'}
          </Text>
        </View>
        <ChevronDown size={24} color="#2E7D32" />
      </TouchableOpacity>

      {isOpen && (
        <View style={{
          position: 'absolute',
          top: 80,
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
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 16,
                borderBottomWidth: index < options.length - 1 ? 1 : 0,
                borderBottomColor: '#F0F0F0',
              }}
              onPress={() => {
                onSelect(option);
                onToggle();
              }}
            >
              <Text style={{
                fontSize: 16,
                color: '#2E7D32',
                fontWeight: option === value ? '600' : '400',
              }}>
                {option}
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
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Setup Your Farm Profile
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#666666',
            textAlign: 'center',
            lineHeight: 24,
          }}>
            Help us provide personalized farming advice
          </Text>
        </View>

        {/* Farmer Name */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#2E7D32',
            marginBottom: 12,
          }}>
            Your Name / आपका नाम
          </Text>
          <View style={{
            backgroundColor: '#F8F9FA',
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            borderColor: '#2E7D32',
          }}>
            <TextInput
              style={{
                fontSize: 16,
                color: '#2E7D32',
                fontWeight: '600',
              }}
              placeholder="Enter your name"
              placeholderTextColor="#999999"
              value={farmerName}
              onChangeText={setFarmerName}
            />
          </View>
        </View>

        {/* Farm Size Slider */}
        <SizeSlider />

        {/* Soil Type */}
        <DropdownField
          title="Soil Type / मिट्टी का प्रकार"
          value={selectedSoilType}
          options={soilTypes}
          onSelect={setSelectedSoilType}
          isOpen={showSoilDropdown}
          onToggle={() => setShowSoilDropdown(!showSoilDropdown)}
          icon={Home}
        />

        {/* Water Source */}
        <DropdownField
          title="Water Source / पानी का स्रोत"
          value={selectedWaterSource}
          options={waterSources}
          onSelect={setSelectedWaterSource}
          isOpen={showWaterDropdown}
          onToggle={() => setShowWaterDropdown(!showWaterDropdown)}
          icon={Droplets}
        />

        {/* Location */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#2E7D32',
            marginBottom: 12,
          }}>
            Location / स्थान
          </Text>
          <View style={{
            backgroundColor: '#F8F9FA',
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            borderColor: '#2E7D32',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <MapPin size={20} color="#2E7D32" style={{ marginRight: 12 }} />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: '#2E7D32',
                fontWeight: '600',
              }}
              placeholder="Enter your village/city"
              placeholderTextColor="#999999"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Crop Selection */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#2E7D32',
            marginBottom: 12,
          }}>
            Crops You Grow / आप जो फसलें उगाते हैं
          </Text>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            {cropOptions.map((crop) => (
              <TouchableOpacity
                key={crop}
                style={{
                  backgroundColor: selectedCrops.includes(crop) ? '#2E7D32' : '#FFFFFF',
                  borderWidth: 2,
                  borderColor: '#2E7D32',
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                }}
                onPress={() => handleCropToggle(crop)}
              >
                <Text style={{
                  color: selectedCrops.includes(crop) ? '#FFFFFF' : '#2E7D32',
                  fontWeight: '600',
                  fontSize: 14,
                }}>
                  {crop}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#2E7D32',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            marginBottom: 24,
            shadowColor: '#2E7D32',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={handleComplete}
        >
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'bold',
          }}>
            Complete Setup / सेटअप पूरा करें
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}