import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft,
  Bell,
  Droplets,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react-native';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'weather',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected tomorrow. Avoid irrigation and cover your crops.',
      time: '2 hours ago',
      isRead: false,
      priority: 'high',
      icon: '🌧️'
    },
    {
      id: 2,
      type: 'irrigation',
      title: 'Irrigation Reminder',
      message: 'Time to water your wheat field. Check soil moisture before irrigation.',
      time: '4 hours ago',
      isRead: false,
      priority: 'medium',
      icon: '💧'
    },
    {
      id: 3,
      type: 'pest',
      title: 'Pest Alert',
      message: 'Cotton bollworm activity detected in your area. Consider protective measures.',
      time: '1 day ago',
      isRead: true,
      priority: 'high',
      icon: '🐛'
    },
    {
      id: 4,
      type: 'fertilizer',
      title: 'Fertilizer Schedule',
      message: 'Apply urea fertilizer to your onion crop. Recommended dosage: 50kg per acre.',
      time: '1 day ago',
      isRead: true,
      priority: 'medium',
      icon: '🌱'
    },
    {
      id: 5,
      type: 'market',
      title: 'Price Update',
      message: 'Wheat prices increased to ₹2,150 per quintal at Pune APMC.',
      time: '2 days ago',
      isRead: true,
      priority: 'low',
      icon: '💰'
    },
    {
      id: 6,
      type: 'advisory',
      title: 'Weekly Advisory',
      message: 'New farming advisory available for this week. Check recommendations.',
      time: '3 days ago',
      isRead: true,
      priority: 'low',
      icon: '📋'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FFEBEE';
      case 'medium': return '#FFF8E1';
      case 'low': return '#F0F8FF';
      default: return '#F8F9FA';
    }
  };

  const getPriorityBorderColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#2196F3';
      default: return '#E0E0E0';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'weather': return AlertTriangle;
      case 'irrigation': return Droplets;
      case 'pest': return AlertTriangle;
      case 'fertilizer': return Calendar;
      case 'market': return Bell;
      case 'advisory': return CheckCircle;
      default: return Bell;
    }
  };

  const NotificationCard = ({ notification }) => {
    const IconComponent = getTypeIcon(notification.type);
    
    return (
      <TouchableOpacity
        style={{
          backgroundColor: notification.isRead ? '#FFFFFF' : getPriorityColor(notification.priority),
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
          borderLeftWidth: 4,
          borderLeftColor: getPriorityBorderColor(notification.priority),
          borderWidth: 1,
          borderColor: notification.isRead ? '#F0F0F0' : getPriorityBorderColor(notification.priority),
        }}
        onPress={() => markAsRead(notification.id)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{
            width: 44,
            height: 44,
            backgroundColor: '#E8F5E8',
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Text style={{ fontSize: 20 }}>{notification.icon}</Text>
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#2E7D32',
                flex: 1,
              }}>
                {notification.title}
              </Text>
              
              {!notification.isRead && (
                <View style={{
                  width: 8,
                  height: 8,
                  backgroundColor: getPriorityBorderColor(notification.priority),
                  borderRadius: 4,
                  marginLeft: 8,
                }} />
              )}
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#666666',
              lineHeight: 20,
              marginBottom: 8,
            }}>
              {notification.message}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={14} color="#999999" />
                <Text style={{
                  fontSize: 12,
                  color: '#999999',
                  marginLeft: 4,
                }}>
                  {notification.time}
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={() => deleteNotification(notification.id)}
                style={{
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  borderRadius: 12,
                  padding: 6,
                }}
              >
                <Trash2 size={16} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#2E7D32" />
          </TouchableOpacity>
          
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#2E7D32',
            }}>
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text style={{
                fontSize: 14,
                color: '#666666',
              }}>
                {unreadCount} unread
              </Text>
            )}
          </View>
          
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={{
                fontSize: 14,
                color: '#2E7D32',
                fontWeight: '600',
              }}>
                Mark all read
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          padding: 24,
          paddingBottom: 24 
        }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 80,
          }}>
            <View style={{
              width: 80,
              height: 80,
              backgroundColor: '#E8F5E8',
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              <Bell size={40} color="#2E7D32" />
            </View>
            
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#2E7D32',
              textAlign: 'center',
              marginBottom: 12,
            }}>
              No Notifications
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#666666',
              textAlign: 'center',
              lineHeight: 22,
            }}>
              You're all caught up! We'll notify you about important farming updates.
            </Text>
          </View>
        ) : (
          <>
            {unreadCount > 0 && (
              <>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#2E7D32',
                  marginBottom: 16,
                }}>
                  New ({unreadCount})
                </Text>
                
                {notifications
                  .filter(n => !n.isRead)
                  .map(notification => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))
                }
              </>
            )}
            
            {notifications.some(n => n.isRead) && (
              <>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#2E7D32',
                  marginBottom: 16,
                  marginTop: unreadCount > 0 ? 24 : 0,
                }}>
                  Earlier
                </Text>
                
                {notifications
                  .filter(n => n.isRead)
                  .map(notification => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))
                }
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}