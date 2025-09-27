import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2E7D32",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

      {/* Logo and Main Content */}
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        {/* Logo placeholder */}
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: "#FFFFFF",
            borderRadius: 60,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 60 }}>🌾</Text>
        </View>

        {/* App Name */}
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          AgroMitra
        </Text>

        {/* Tagline */}
        <Text
          style={{
            fontSize: 18,
            color: "#E8F5E8",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Your Smart Farming Assistant
        </Text>

        {/* Feature Points */}
        <View style={{ alignItems: "flex-start", marginHorizontal: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 8 }}>✅</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#FFFFFF",
                flex: 1,
              }}
            >
              Daily crop advice, mandi prices & weather alerts
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>🎙️</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#FFFFFF",
                flex: 1,
              }}
            >
              Chat with AI in your own language
            </Text>
          </View>
        </View>
      </View>

      {/* Loading indicator */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 40,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: 2,
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
            }}
          />
        </View>
      </View>
    </View>
  );
}
