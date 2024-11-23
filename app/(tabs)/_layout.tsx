import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppProvider } from "@/components/context";

export default function TabLayout() {
  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "yellowgreen",
          headerStyle: { backgroundColor: "#25292e" },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          tabBarStyle: { backgroundColor: "#202020" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={24}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: "User",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person-sharp" : "person-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="addPost"
          options={{
            title: "New Post",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "add-circle-sharp" : "add-circle-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="feed"
          options={{
            title: "Feed",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "fast-food-sharp" : "fast-food-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="myFeed"
          options={{
            title: "My Feed",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "list-sharp" : "list-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
    </AppProvider>
  );
}
