import {
  Raleway_100Thin,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light,
  Raleway_300Light_Italic,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black,
  Raleway_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/raleway";

import { Icon } from "@/components/ui/IconSymbol";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { ActivityIndicator, StatusBar, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#1E90FF",
            tabBarInactiveTintColor: "#888",
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderTopColor: "#eee",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
              headerShown: false, // Hide header if desired
            }}
          />
          <Tabs.Screen
            name="shop"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="shopify" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="category"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="list-alt" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="shopping-cart" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="+not-found"
            options={{
              href: null, // This hides it from the tab bar
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="flashsell"
            options={{
              href: null, // This hides it from the tab bar
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="shop/[id]"
            options={{
              href: null, // This hides it from the tab bar
              headerShown: false,
            }}
          />
        </Tabs>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}
