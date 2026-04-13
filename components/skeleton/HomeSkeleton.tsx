import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");

const HomeSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={10}>
      <View style={{ padding: 16 }}>
        {/* Search Bar */}
        <View style={styles.searchBar} />

        {/* Banner */}
        <View style={styles.banner} />

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>

        {/* Categories Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTitle} />
          <View style={styles.seeAll} />
        </View>

        {/* Categories Grid */}
        <View style={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.imageGrid} />
              <View style={styles.textRow}>
                <View style={styles.textLine} />
                <View style={styles.badge} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  searchBar: {
    height: 45,
    borderRadius: 25,
    marginBottom: 16,
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  headerTitle: {
    width: 120,
    height: 20,
    borderRadius: 6,
  },
  seeAll: {
    width: 60,
    height: 20,
    borderRadius: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
  imageGrid: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textLine: {
    width: "60%",
    height: 14,
    borderRadius: 6,
  },
  badge: {
    width: 30,
    height: 20,
    borderRadius: 10,
  },
});
