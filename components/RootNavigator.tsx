import React from "react";

import { Icon } from "@/components/ui/IconSymbol";
import { useGetMeQuery } from "@/redux/api/baseApi";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";

export default function RootNavigator() {
  const { data, isLoading } = useGetMeQuery(
    {},
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const isAuthenticated =
    data?.data?.role === "ADMIN" || data?.data?.role === "USER";

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <Tabs
        screenOptions={{
          tabBarStyle: { display: "none" },
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="(auth)"
          options={{
            href: null,
            headerShown: false, // Hide header if desired
          }}
        />
      </Tabs>
    );
  }

  return (
    <>
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
          name="(tabs)/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
            headerShown: false, // Hide header if desired
          }}
        />
        <Tabs.Screen
          name="(tabs)/shop"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopify" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(tabs)/category"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="list-alt" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(tabs)/cart"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="shopping-cart" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(tabs)/profile"
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
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="shop/[id]"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(auth)/index"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(auth)/login"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(auth)/signup"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        animated={true}
      />
    </>
  );
}
