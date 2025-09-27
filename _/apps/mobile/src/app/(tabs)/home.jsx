import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Wheat,
  IndianRupee
} from 'lucide-react-native';

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const WeatherCard = () => (
    <View style={{
      backgroundColor: '#F0F8FF',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: '#2E7D32',
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#2E7D32' }}>
          Today's Weather
        </Text>
        <Cloud size={24} color="#2E7D32" />
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'center' }}>
          <Thermometer size={20} color="#FF6B35" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 }}>
            28°C
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Temp</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <Droplets size={20} color="#1E90FF" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 }}>
            20%
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Rain</Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <Wind size={20} color="#87CEEB" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 }}>
            12 km/h
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Wind</Text>
        </View>
      </View>
    </View>
  );

  const DailyAdvisoryCard = () => (
    <View style={{
      backgroundColor: '#E8F5E8',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: '#2E7D32',
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#2E7D32' }}>
          Today's Advisory
        </Text>
        <CheckCircle size={24} color="#2E7D32" />
      </View>
      
      <Text style={{ fontSize: 16, color: '#2E7D32', lineHeight: 24, marginBottom: 16 }}>
        Water your wheat field today. Apply fertilizer after 2 days. Check for pest infestation in cotton crops.
      </Text>
      
      <TouchableOpacity
        style={{
          backgroundColor: '#2E7D32',
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 16,
          alignSelf: 'flex-start',
        }}
        onPress={() => router.push('/advisory-details')}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );

  const AlertCard = () => (
    <View style={{
      backgroundColor: '#FFF3E0',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: '#FF9800',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <AlertTriangle size={20} color="#FF9800" />
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#FF9800', marginLeft: 8 }}>
          Weather Alert
        </Text>
      </View>
      
      <Text style={{ fontSize: 14, color: '#666666', lineHeight: 20 }}>
        Heavy rain expected tomorrow. Avoid irrigation and cover your crops.
      </Text>
    </View>
  );

  const CropRecommendationCard = ({ crop, profit, water, icon }) => (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginRight: 16,
      width: 180,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 24, marginRight: 8 }}>{icon}</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32', flex: 1 }}>
          {crop}
        </Text>
      </View>
      
      <View style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <TrendingUp size={14} color="#4CAF50" />
          <Text style={{ fontSize: 12, color: '#666666', marginLeft: 4 }}>
            Profit: ₹{profit}/acre
          </Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Droplets size={14} color="#2196F3" />
          <Text style={{ fontSize: 12, color: '#666666', marginLeft: 4 }}>
            Water: {water}
          </Text>
        </View>
      </View>
    </View>
  );

  const MarketPriceCard = ({ crop, price, market, change }) => (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginRight: 16,
      width: 160,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32', marginBottom: 8 }}>
        {crop}
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <IndianRupee size={14} color="#2E7D32" />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E7D32', marginLeft: 2 }}>
          {price}
        </Text>
        <Text style={{ fontSize: 12, color: '#666666', marginLeft: 4 }}>
          /quintal
        </Text>
      </View>
      
      <Text style={{ fontSize: 12, color: '#666666', marginBottom: 4 }}>
        {market}
      </Text>
      
      <Text style={{ 
        fontSize: 12, 
        color: change.startsWith('+') ? '#4CAF50' : '#F44336',
        fontWeight: '600' 
      }}>
        {change}
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
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2E7D32' }}>
              Good Morning! 🌅
            </Text>
            <Text style={{ fontSize: 16, color: '#666666' }}>
              Ready for farming today?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#F0F8FF',
              borderRadius: 12,
              padding: 12,
            }}
            onPress={() => router.push('/notifications')}
          >
            <Bell size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Weather Card */}
        <WeatherCard />

        {/* Daily Advisory */}
        <DailyAdvisoryCard />

        {/* Alert */}
        <AlertCard />

        {/* Crop Recommendations Section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32' }}>
              Recommended Crops
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/crops-market')}>
              <Text style={{ fontSize: 14, color: '#2E7D32', fontWeight: '600' }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            <CropRecommendationCard 
              crop="Wheat" 
              profit="45,000" 
              water="Medium" 
              icon="🌾" 
            />
            <CropRecommendationCard 
              crop="Onion" 
              profit="60,000" 
              water="Low" 
              icon="🧅" 
            />
          </ScrollView>
        </View>

        {/* Market Prices Section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32' }}>
              Market Prices
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/crops-market')}>
              <Text style={{ fontSize: 14, color: '#2E7D32', fontWeight: '600' }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            <MarketPriceCard 
              crop="Wheat" 
              price="2,150" 
              market="Pune Mandi" 
              change="+₹50" 
            />
            <MarketPriceCard 
              crop="Cotton" 
              price="5,800" 
              market="Mumbai Market" 
              change="-₹100" 
            />
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 }}>
            Quick Actions
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#E8F5E8',
                borderRadius: 16,
                padding: 20,
                alignItems: 'center',
              }}
              onPress={() => router.push('/(tabs)/scan')}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>📷</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32', textAlign: 'center' }}>
                Scan Crop
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#F0F8FF',
                borderRadius: 16,
                padding: 20,
                alignItems: 'center',
              }}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>🗣️</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#2E7D32', textAlign: 'center' }}>
                Ask AI
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}