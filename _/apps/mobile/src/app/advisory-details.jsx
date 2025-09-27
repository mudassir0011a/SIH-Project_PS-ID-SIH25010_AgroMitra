import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft,
  CheckCircle,
  Circle,
  Download,
  Share,
  Calendar,
  Droplets,
  Thermometer,
  Bug,
  Leaf,
  Clock
} from 'lucide-react-native';

export default function AdvisoryDetails() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState([]);

  const advisoryData = {
    date: 'December 15, 2024',
    weather: {
      temperature: '28°C',
      humidity: '65%',
      rainfall: '20%',
      wind: '12 km/h'
    },
    tasks: [
      {
        id: 1,
        title: 'Irrigation',
        description: 'Water your wheat field early morning. Check soil moisture 2-3 inches deep before irrigation.',
        time: 'Morning (6-8 AM)',
        priority: 'high',
        category: 'irrigation',
        icon: '💧'
      },
      {
        id: 2,
        title: 'Fertilizer Application',
        description: 'Apply Urea fertilizer (50 kg per acre) to wheat crop. Mix with soil after application.',
        time: 'After 2 days',
        priority: 'medium',
        category: 'fertilizer',
        icon: '🌱'
      },
      {
        id: 3,
        title: 'Pest Inspection',
        description: 'Check cotton plants for bollworm infestation. Look for holes in leaves and bolls.',
        time: 'Evening (5-6 PM)',
        priority: 'high',
        category: 'pest',
        icon: '🔍'
      },
      {
        id: 4,
        title: 'Weed Management',
        description: 'Remove weeds from onion field manually or use selective herbicide.',
        time: 'Anytime',
        priority: 'low',
        category: 'maintenance',
        icon: '🌿'
      }
    ],
    tips: [
      'Apply fertilizer only when soil is moist for better absorption',
      'Avoid irrigation during peak sunlight hours (11 AM - 3 PM)',
      'Keep farm tools clean to prevent disease spread',
      'Monitor weather forecast for next 7 days before major activities'
    ],
    nextAdvisory: 'December 18, 2024'
  };

  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#2E7D32';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return '#FFEBEE';
      case 'medium': return '#FFF8E1';
      case 'low': return '#E8F5E8';
      default: return '#F8F9FA';
    }
  };

  const WeatherCard = () => (
    <View style={{
      backgroundColor: '#F0F8FF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: '#2196F3',
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 16,
      }}>
        Today's Weather Conditions
      </Text>
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <View style={{ alignItems: 'center', minWidth: 60 }}>
          <Thermometer size={20} color="#FF6B35" />
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginTop: 4,
          }}>
            {advisoryData.weather.temperature}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Temp</Text>
        </View>
        
        <View style={{ alignItems: 'center', minWidth: 60 }}>
          <Droplets size={20} color="#1E90FF" />
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginTop: 4,
          }}>
            {advisoryData.weather.humidity}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Humidity</Text>
        </View>
        
        <View style={{ alignItems: 'center', minWidth: 60 }}>
          <Text style={{ fontSize: 20 }}>🌧️</Text>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginTop: 4,
          }}>
            {advisoryData.weather.rainfall}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Rain</Text>
        </View>
        
        <View style={{ alignItems: 'center', minWidth: 60 }}>
          <Text style={{ fontSize: 20 }}>💨</Text>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginTop: 4,
          }}>
            {advisoryData.weather.wind}
          </Text>
          <Text style={{ fontSize: 12, color: '#666666' }}>Wind</Text>
        </View>
      </View>
    </View>
  );

  const TaskCard = ({ task }) => {
    const isCompleted = completedTasks.includes(task.id);
    
    return (
      <TouchableOpacity
        style={{
          backgroundColor: isCompleted ? '#E8F5E8' : '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: isCompleted ? '#4CAF50' : '#F0F0F0',
          opacity: isCompleted ? 0.8 : 1,
        }}
        onPress={() => toggleTaskCompletion(task.id)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{
            width: 44,
            height: 44,
            backgroundColor: isCompleted ? '#4CAF50' : '#F8F9FA',
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            {isCompleted ? (
              <CheckCircle size={24} color="#FFFFFF" />
            ) : (
              <Text style={{ fontSize: 20 }}>{task.icon}</Text>
            )}
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2E7D32',
                textDecorationLine: isCompleted ? 'line-through' : 'none',
              }}>
                {task.title}
              </Text>
              
              <View style={{
                backgroundColor: getPriorityBadgeColor(task.priority),
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: getPriorityColor(task.priority),
                  textTransform: 'uppercase',
                }}>
                  {task.priority}
                </Text>
              </View>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#666666',
              lineHeight: 20,
              marginBottom: 8,
            }}>
              {task.description}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Clock size={14} color="#999999" />
              <Text style={{
                fontSize: 12,
                color: '#999999',
                marginLeft: 4,
              }}>
                {task.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const completedCount = completedTasks.length;
  const totalTasks = advisoryData.tasks.length;
  const progressPercentage = (completedCount / totalTasks) * 100;

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#2E7D32" />
          </TouchableOpacity>
          
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E7D32',
          }}>
            Today's Advisory
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#E8F5E8',
                borderRadius: 8,
                padding: 8,
              }}
            >
              <Share size={18} color="#2E7D32" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#F0F8FF',
                borderRadius: 8,
                padding: 8,
              }}
            >
              <Download size={18} color="#2E7D32" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Calendar size={16} color="#666666" />
          <Text style={{
            fontSize: 14,
            color: '#666666',
            marginLeft: 4,
          }}>
            {advisoryData.date}
          </Text>
        </View>
        
        {/* Progress Bar */}
        <View style={{
          backgroundColor: '#F0F0F0',
          borderRadius: 8,
          height: 8,
          marginBottom: 8,
        }}>
          <View style={{
            backgroundColor: '#4CAF50',
            borderRadius: 8,
            height: 8,
            width: `${progressPercentage}%`,
          }} />
        </View>
        
        <Text style={{
          fontSize: 12,
          color: '#666666',
        }}>
          {completedCount} of {totalTasks} tasks completed
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          padding: 24,
          paddingBottom: 24 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Weather Card */}
        <WeatherCard />

        {/* Tasks Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 16,
          }}>
            Today's Tasks
          </Text>
          
          {advisoryData.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        {/* Tips Section */}
        <View style={{
          backgroundColor: '#FFF8E1',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: '#FF9800',
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 16,
          }}>
            💡 Pro Tips
          </Text>
          
          {advisoryData.tips.map((tip, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: index < advisoryData.tips.length - 1 ? 12 : 0,
            }}>
              <Text style={{
                fontSize: 16,
                color: '#FF9800',
                marginRight: 8,
                marginTop: 2,
              }}>
                •
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#666666',
                lineHeight: 20,
                flex: 1,
              }}>
                {tip}
              </Text>
            </View>
          ))}
        </View>

        {/* Next Advisory */}
        <View style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#2E7D32',
            marginBottom: 4,
          }}>
            Next Advisory
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666666',
          }}>
            {advisoryData.nextAdvisory}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}