import React from "react";

import { Icon } from "@/components/ui/IconSymbol";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StatusBar, View } from "react-native";
import ToastManager from "toastify-react-native";
import SearchHeader from "./SearchHeader";

export default function RootNavigator() {
  // const { data, isLoading } = useGetMeQuery(
  //   {},
  //   {
  //     pollingInterval: 30000,
  //     refetchOnMountOrArgChange: true,
  //     refetchOnReconnect: true,
  //   },
  // );

  // const isAuthenticated =
  //   data?.data?.role === "ADMIN" || data?.data?.role === "CUSTOMER";

  // if (!isAuthenticated) {
  //   return (
  //     <Tabs
  //       screenOptions={{
  //         tabBarStyle: { display: "none" },
  //         tabBarShowLabel: false,
  //         headerShown: false,
  //       }}
  //     >
  //       <Tabs.Screen
  //         name="(auth)"
  //         options={{
  //           href: null,
  //           headerShown: false, // Hide header if desired
  //         }}
  //       />
  //     </Tabs>
  //   );
  // }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Tabs
        screenOptions={{
          header: () => <SearchHeader />,
          headerShown: true,
          tabBarActiveTintColor: "#1E90FF",
          tabBarInactiveTintColor: "#888",
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 5,
            marginTop: 0,
            height: Platform.OS === "android" ? 40 : 80,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#eee",
          },
        }}
      >
        <Tabs.Screen
          name="(user)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/shop"
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopify" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/category"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="list-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/cart"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="shopping-cart" size={size} color={color} />
            ),
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
            href: null,
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
            // headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(user)/index"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(user)/login"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(user)/signup"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(user)/verify"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(tabs)/settings"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(admin)/dashboard"
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
      <ToastManager />
    </View>
  );
}
