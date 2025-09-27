import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Droplets, 
  Calendar,
  MapPin,
  IndianRupee,
  Award,
  Clock
} from 'lucide-react-native';

export default function CropsMarket() {
  const insets = useSafeAreaInsets();
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');
  const [searchQuery, setSearchQuery] = useState('');

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const CropCard = ({ crop, profit, water, yield: cropYield, season, icon, difficulty }) => (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 32, marginRight: 12 }}>{icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 4 }}>
            {crop}
          </Text>
          <Text style={{ fontSize: 14, color: '#666666' }}>
            {season} Season • {difficulty}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <TrendingUp size={20} color="#4CAF50" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 }}>
            ₹{profit}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Profit/acre</Text>
        </View>
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Droplets size={20} color="#2196F3" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 }}>
            {water}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Water need</Text>
        </View>
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Award size={20} color="#FF9800" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E7D32', marginTop: 4 }}>
            {cropYield}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Yield/acre</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#2E7D32',
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
          Get Detailed Guide
        </Text>
      </TouchableOpacity>
    </View>
  );

  const MarketCard = ({ crop, price, market, distance, change, lastUpdated }) => (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E7D32', marginBottom: 4 }}>
            {crop}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <MapPin size={14} color="#666666" />
            <Text style={{ fontSize: 14, color: '#666666', marginLeft: 4 }}>
              {market} • {distance}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock size={14} color="#666666" />
            <Text style={{ fontSize: 12, color: '#666666', marginLeft: 4 }}>
              Updated: {lastUpdated}
            </Text>
          </View>
        </View>
        
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <IndianRupee size={18} color="#2E7D32" />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginLeft: 2 }}>
              {price}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#666666', marginBottom: 4 }}>
            per quintal
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: change.startsWith('+') ? '#4CAF50' : '#F44336',
            fontWeight: '600' 
          }}>
            {change}
          </Text>
        </View>
      </View>
    </View>
  );

  const SchemeCard = ({ title, description, eligibility, subsidy, deadline }) => (
    <View style={{
      backgroundColor: '#FFF8E1',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderLeftWidth: 4,
      borderLeftColor: '#FF9800',
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E7D32', marginBottom: 8 }}>
        {title}
      </Text>
      
      <Text style={{ fontSize: 14, color: '#666666', lineHeight: 20, marginBottom: 12 }}>
        {description}
      </Text>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#2E7D32', marginBottom: 4 }}>
          Eligibility: {eligibility}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#FF9800', marginBottom: 4 }}>
          Subsidy: {subsidy}
        </Text>
        <Text style={{ fontSize: 12, color: '#666666' }}>
          Deadline: {deadline}
        </Text>
      </View>
      
      <TouchableOpacity
        style={{
          backgroundColor: '#FF9800',
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 16,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
          Apply Now
        </Text>
      </TouchableOpacity>
    </View>
  );

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: isActive ? '#2E7D32' : '#F5F5F5',
        marginRight: 12,
      }}
      onPress={onPress}
    >
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: isActive ? '#FFFFFF' : '#666666',
      }}>
        {title}
      </Text>
    </TouchableOpacity>
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
          marginBottom: 16,
        }}>
          Crops & Market
        </Text>

        {/* Search Bar */}
        <View style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 16,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <Search size={20} color="#666666" />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: '#2E7D32',
              marginLeft: 12,
            }}
            placeholder="Search crops, markets..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Filter size={20} color="#2E7D32" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          <TabButton
            title="Crop Recommendations"
            isActive={activeTab === 'recommendations'}
            onPress={() => setActiveTab('recommendations')}
          />
          <TabButton
            title="Market Prices"
            isActive={activeTab === 'prices'}
            onPress={() => setActiveTab('prices')}
          />
          <TabButton
            title="Government Schemes"
            isActive={activeTab === 'schemes'}
            onPress={() => setActiveTab('schemes')}
          />
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {activeTab === 'recommendations' && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 }}>
              Best Crops for Your Farm
            </Text>
            
            <CropCard
              crop="Wheat"
              profit="45,000"
              water="Medium"
              yield="40 Q"
              season="Rabi"
              icon="🌾"
              difficulty="Easy"
            />
            
            <CropCard
              crop="Onion"
              profit="60,000"
              water="Low"
              yield="250 Q"
              season="Kharif"
              icon="🧅"
              difficulty="Medium"
            />
            
            <CropCard
              crop="Cotton"
              profit="75,000"
              water="High"
              yield="15 Q"
              season="Kharif"
              icon="🌿"
              difficulty="Hard"
            />
          </>
        )}

        {activeTab === 'prices' && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 }}>
              Live Market Prices
            </Text>
            
            <MarketCard
              crop="Wheat"
              price="2,150"
              market="Pune APMC"
              distance="12 km"
              change="+₹50"
              lastUpdated="2 hours ago"
            />
            
            <MarketCard
              crop="Cotton"
              price="5,800"
              market="Mumbai Cotton Exchange"
              distance="45 km"
              change="-₹100"
              lastUpdated="1 hour ago"
            />
            
            <MarketCard
              crop="Onion"
              price="1,200"
              market="Nashik Mandi"
              distance="78 km"
              change="+₹200"
              lastUpdated="3 hours ago"
            />
            
            <MarketCard
              crop="Sugarcane"
              price="3,500"
              market="Local Sugar Mill"
              distance="8 km"
              change="₹0"
              lastUpdated="6 hours ago"
            />
          </>
        )}

        {activeTab === 'schemes' && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginBottom: 16 }}>
              Government Schemes & Subsidies
            </Text>
            
            <SchemeCard
              title="PM-KISAN Samman Nidhi"
              description="Direct income support to all farmer families across the country. ₹6,000 per year in three equal installments."
              eligibility="All landholding farmers"
              subsidy="₹6,000/year"
              deadline="Open throughout year"
            />
            
            <SchemeCard
              title="Pradhan Mantri Fasal Bima Yojana"
              description="Crop insurance scheme providing financial support to farmers in case of crop failure due to natural calamities."
              eligibility="All farmers growing notified crops"
              subsidy="Premium subsidy up to 90%"
              deadline="Before sowing season"
            />
            
            <SchemeCard
              title="Soil Health Card Scheme"
              description="Free soil testing and recommendations for appropriate dosage of nutrients for improving soil health and crop productivity."
              eligibility="All farmers"
              subsidy="Free soil testing"
              deadline="Ongoing"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}