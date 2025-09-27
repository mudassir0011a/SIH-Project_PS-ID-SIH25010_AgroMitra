import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { 
  Camera, 
  RotateCcw, 
  Zap, 
  ZapOff,
  CheckCircle,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Scan() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}>
        <Text style={{ fontSize: 18, color: '#2E7D32', textAlign: 'center' }}>
          Loading camera...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}>
        <View style={{
          width: 100,
          height: 100,
          backgroundColor: '#E8F5E8',
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
          <Camera size={50} color="#2E7D32" />
        </View>
        
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#2E7D32',
          textAlign: 'center',
          marginBottom: 16,
        }}>
          Camera Permission Required
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: '#666666',
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 32,
        }}>
          We need access to your camera to scan and analyze your crops for diseases and health insights.
        </Text>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#2E7D32',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            width: '100%',
          }}
          onPress={requestPermission}
        >
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'bold',
          }}>
            Grant Camera Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      // Simulate AI analysis
      setTimeout(() => {
        const isHealthy = Math.random() > 0.3; // 70% chance of being healthy
        setScanResult({
          isHealthy,
          cropType: 'Wheat',
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          disease: isHealthy ? null : 'Leaf Rust',
          recommendation: isHealthy 
            ? 'Your crop looks healthy! Continue current care routine.'
            : 'Apply fungicide spray. Ensure proper drainage and avoid overhead watering.',
          imageUri: photo.uri,
        });
        setIsCapturing(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to take picture:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
      setIsCapturing(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  const resetScan = () => {
    setScanResult(null);
  };

  if (scanResult) {
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
            <TouchableOpacity onPress={resetScan}>
              <ArrowLeft size={24} color="#2E7D32" />
            </TouchableOpacity>
            
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#2E7D32',
            }}>
              Scan Results
            </Text>
            
            <View style={{ width: 24 }} />
          </View>
        </View>

        {/* Results */}
        <View style={{ flex: 1, padding: 24 }}>
          {/* Status Card */}
          <View style={{
            backgroundColor: scanResult.isHealthy ? '#E8F5E8' : '#FFEBEE',
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: scanResult.isHealthy ? '#4CAF50' : '#F44336',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              {scanResult.isHealthy ? (
                <CheckCircle size={32} color="#4CAF50" />
              ) : (
                <AlertTriangle size={32} color="#F44336" />
              )}
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: scanResult.isHealthy ? '#2E7D32' : '#C62828',
                  marginBottom: 4,
                }}>
                  {scanResult.isHealthy ? 'Healthy Crop!' : 'Issue Detected'}
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#666666',
                }}>
                  Confidence: {scanResult.confidence}%
                </Text>
              </View>
            </View>
          </View>

          {/* Crop Information */}
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
              Crop Analysis
            </Text>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
              <Text style={{ fontSize: 16, color: '#666666' }}>
                Crop Type:
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#2E7D32',
              }}>
                {scanResult.cropType}
              </Text>
            </View>
            
            {scanResult.disease && (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
                <Text style={{ fontSize: 16, color: '#666666' }}>
                  Disease:
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#F44336',
                }}>
                  {scanResult.disease}
                </Text>
              </View>
            )}
          </View>

          {/* Recommendations */}
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
              marginBottom: 12,
            }}>
              Recommendations
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#666666',
              lineHeight: 24,
            }}>
              {scanResult.recommendation}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#2E7D32',
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
              }}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
              }}>
                Ask AI Expert
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#F8F9FA',
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#2E7D32',
              }}
              onPress={resetScan}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#2E7D32',
              }}>
                Scan Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        flash={flash}
        ref={cameraRef}
      >
        {/* Header */}
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingTop: insets.top + 12,
          paddingBottom: 16,
          paddingHorizontal: 24,
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'center',
          }}>
            Crop Scanner
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#FFFFFF',
            textAlign: 'center',
            marginTop: 4,
            opacity: 0.8,
          }}>
            Point camera at crop leaves
          </Text>
        </View>

        {/* Scanning Overlay */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}>
          <View style={{
            width: 240,
            height: 240,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            borderRadius: 20,
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              textAlign: 'center',
              opacity: 0.8,
            }}>
              Position crop within frame
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingBottom: insets.bottom + 24,
          paddingTop: 24,
          paddingHorizontal: 24,
        }}>
          {/* Top Controls */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 40,
                padding: 16,
              }}
              onPress={toggleFlash}
            >
              {flash === 'off' ? (
                <ZapOff size={24} color="#FFFFFF" />
              ) : (
                <Zap size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 40,
                padding: 16,
              }}
              onPress={toggleCameraFacing}
            >
              <RotateCcw size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Capture Button */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: isCapturing ? '#666666' : '#2E7D32',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 4,
                borderColor: '#FFFFFF',
              }}
              onPress={takePicture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <Text style={{
                  fontSize: 12,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                  Analyzing...
                </Text>
              ) : (
                <Camera size={32} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              marginTop: 12,
              textAlign: 'center',
            }}>
              {isCapturing ? 'Analyzing crop...' : 'Tap to scan'}
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}