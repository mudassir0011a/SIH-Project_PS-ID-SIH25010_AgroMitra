import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  User,
  Settings,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  MapPin,
  Droplets,
  Home,
  Wheat
} from 'lucide-react-native';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const farmData = {
    name: 'Ravi Kumar',
    location: 'Pune, Maharashtra',
    farmSize: '5 acres',
    soilType: 'Black Cotton Soil',
    waterSource: 'Bore Well',
    crops: ['Wheat', 'Cotton', 'Onion'],
    phone: '+91 98765 43210',
  };

  const ProfileCard = () => (
    <View style={{
      backgroundColor: '#E8F5E8',
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: '#2E7D32',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#2E7D32',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
        }}>
          <User size={40} color="#FFFFFF" />
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 4,
          }}>
            {farmData.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <MapPin size={16} color="#666666" />
            <Text style={{
              fontSize: 16,
              color: '#666666',
              marginLeft: 4,
            }}>
              {farmData.location}
            </Text>
          </View>
          <Text style={{
            fontSize: 14,
            color: '#999999',
          }}>
            {farmData.phone}
          </Text>
        </View>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 8,
          }}
          onPress={() => router.push('/profile-setup')}
        >
          <Edit size={20} color="#2E7D32" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const FarmStatsCard = () => (
    <View style={{
      backgroundColor: '#F8F9FA',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 16,
      }}>
        Farm Details
      </Text>
      
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: '#E8F5E8',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Home size={20} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32' }}>
              Farm Size
            </Text>
            <Text style={{ fontSize: 14, color: '#666666' }}>
              {farmData.farmSize}
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: '#F0F8FF',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Home size={20} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32' }}>
              Soil Type
            </Text>
            <Text style={{ fontSize: 14, color: '#666666' }}>
              {farmData.soilType}
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: '#E3F2FD',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Droplets size={20} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32' }}>
              Water Source
            </Text>
            <Text style={{ fontSize: 14, color: '#666666' }}>
              {farmData.waterSource}
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: '#FFF8E1',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Wheat size={20} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32' }}>
              Crops Grown
            </Text>
            <Text style={{ fontSize: 14, color: '#666666' }}>
              {farmData.crops.join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const SettingsOption = ({ icon: IconComponent, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{
        width: 44,
        height: 44,
        backgroundColor: '#E8F5E8',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <IconComponent size={22} color="#2E7D32" />
      </View>
      
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#2E7D32',
          marginBottom: 2,
        }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{
            fontSize: 14,
            color: '#666666',
          }}>
            {subtitle}
          </Text>
        )}
      </View>
      
      {showArrow && <ChevronRight size={20} color="#999999" />}
    </TouchableOpacity>
  );

  const StatCard = ({ label, value, icon, color }) => (
    <View style={{
      backgroundColor: color,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 6,
    }}>
      <Text style={{
        fontSize: 32,
        marginBottom: 8,
      }}>
        {icon}
      </Text>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 4,
      }}>
        {value}
      </Text>
      <Text style={{
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
      }}>
        {label}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar style="dark" />

      {/* Fixed Header */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingTop: insets.top + 12,
        paddingBottom: 16,
        paddingHorizontal: 24,
        borderBottomWidth: showHeaderBorder ? 1 : 0,
        borderBottomColor: '#E5E7EB',
        zIndex: 1000,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#2E7D32',
          textAlign: 'center',
        }}>
          My Profile
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Profile Card */}
        <ProfileCard />

        {/* Quick Stats */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 16,
          }}>
            This Season Stats
          </Text>
          
          <View style={{ flexDirection: 'row', marginHorizontal: -6 }}>
            <StatCard
              label="Crops Planted"
              value="3"
              icon="🌱"
              color="#E8F5E8"
            />
            <StatCard
              label="Advisory Followed"
              value="12"
              icon="✅"
              color="#F0F8FF"
            />
            <StatCard
              label="Scans Done"
              value="8"
              icon="📷"
              color="#FFF8E1"
            />
          </View>
        </View>

        {/* Farm Details */}
        <FarmStatsCard />

        {/* Settings Options */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 16,
          }}>
            Settings
          </Text>

          <SettingsOption
            icon={Bell}
            title="Notifications"
            subtitle="Manage alerts and reminders"
            onPress={() => console.log('Notifications pressed')}
          />

          <SettingsOption
            icon={Globe}
            title="Language"
            subtitle="हिंदी - Hindi"
            onPress={() => console.log('Language pressed')}
          />

          <SettingsOption
            icon={Settings}
            title="App Settings"
            subtitle="Preferences and customization"
            onPress={() => console.log('Settings pressed')}
          />

          <SettingsOption
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help with farming questions"
            onPress={() => console.log('Help pressed')}
          />
        </View>

        {/* App Info */}
        <View style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 12,
          }}>
            About AgroMitra
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#666666',
            lineHeight: 20,
            marginBottom: 12,
          }}>
            Your smart farming assistant powered by AI. Get personalized crop advice, market prices, and expert guidance in your local language.
          </Text>
          
          <Text style={{
            fontSize: 12,
            color: '#999999',
          }}>
            Version 1.0.0 • Built with ❤️ for farmers
          </Text>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={{
            backgroundColor: '#FFEBEE',
            borderRadius: 16,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#FFCDD2',
          }}
          onPress={() => {
            // Handle logout
            console.log('Logout pressed');
          }}
        >
          <LogOut size={20} color="#F44336" />
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#F44336',
            marginLeft: 8,
          }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}