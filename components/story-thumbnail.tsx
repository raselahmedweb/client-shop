import type React from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import type { StoryItem } from "../type/story-types"
import { Icon } from "./ui/IconSymbol"

interface StoryThumbnailProps {
  item: StoryItem
  index: number
  isLoading: boolean
  isOpening: boolean
  onPress: (index: number) => void
  onLoad: (index: number) => void
  onError: (index: number) => void
}

const StoryThumbnail: React.FC<StoryThumbnailProps> = ({
  item,
  index,
  isLoading,
  isOpening,
  onPress,
  onLoad,
  onError,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={[styles.storyThumbnail, (isOpening || isLoading) && styles.storyThumbnailDisabled]}
      activeOpacity={0.8}
      disabled={isOpening}
    >
      {isLoading && (
        <View style={styles.thumbnailLoadingContainer}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      <Image
        source={{ uri: item.thumbnail }}
        style={styles.storyImage}
        resizeMode="cover"
        onLoad={() => onLoad(index)}
        onError={() => onError(index)}
      />

      {isOpening && (
        <View style={styles.openingSpinnerContainer}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      <View style={styles.playOverlay}>
        <Icon name="play-arrow" color="#fff" size={28} />
      </View>

      <View style={styles.titleOverlay}>
        <Text style={styles.thumbnailTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  storyThumbnail: {
    width: 120,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  storyThumbnailDisabled: {
    opacity: 0.7,
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailLoadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    zIndex: 10,
  },
  openingSpinnerContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 15,
    padding: 5,
    zIndex: 20,
  },
  playOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  titleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
  },
  thumbnailTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
})

export default StoryThumbnail
