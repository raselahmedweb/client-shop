import type React from "react"
import {
    ActivityIndicator,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import Animated, { LinearTransition } from "react-native-reanimated"
import { Icon } from "./ui/IconSymbol"

import { useStories } from "../hooks/use-stories"
import type { StoriesProps, StoryItem } from "../type/story-types"
import StoryThumbnail from "./story-thumbnail"
import VideoStoryItem from "./video-story-item"

const { width } = Dimensions.get("window")

const Stories: React.FC<StoriesProps> = ({ story, theme }) => {
  const {
    modalVisible,
    selectedIndex,
    isModalLoading,
    isOpening,
    thumbnailsLoading,
    flatListRef,
    openModal,
    closeModal,
    onMomentumScrollEnd,
    onPlayerReady,
    onScrollToIndexFailed,
    handleThumbnailLoad,
    handleThumbnailError,
  } = useStories(story)

  if (!story || story.length === 0) {
    return null
  }

  return (
    <View style={styles.storiesContainer}>
      <Text style={[styles.storiesTitle, { color: theme.text }]}>Stories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {story.map((item, index) => (
          <StoryThumbnail
            key={`story-${item.productId}-${index}`}
            item={item}
            index={index}
            isLoading={thumbnailsLoading[index]}
            isOpening={isOpening}
            onPress={openModal}
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
          />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal} statusBarTranslucent>
        <View style={styles.modalContainer}>
          {isModalLoading && (
            <View style={styles.modalLoadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.modalLoadingText}>Opening story...</Text>
            </View>
          )}

          <Animated.FlatList<StoryItem>
            ref={flatListRef}
            data={story}
            horizontal
            pagingEnabled
            itemLayoutAnimation={LinearTransition}
            initialScrollIndex={selectedIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item, index }) => (
              <VideoStoryItem
                item={item}
                index={index}
                isSelected={index === selectedIndex}
                onPlayerReady={onPlayerReady}
              />
            )}
            keyExtractor={(item, index) => `video-story-${item.productId}-${index}`}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollToIndexFailed={onScrollToIndexFailed}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />

          <TouchableOpacity onPress={closeModal} style={styles.closeButton} activeOpacity={0.8}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.indicatorContainer}>
            {story.map((_, index) => (
              <View
                key={`indicator-${index}`}
                style={[styles.indicator, index === selectedIndex && styles.indicatorActive]}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  storiesContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 15,
  },
  storiesTitle: {
    fontSize: 26,
    fontFamily: "Raleway_800ExtraBold",
    marginBottom: 5,
  },
  scrollContainer: {
    paddingHorizontal: 5,
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  modalLoadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 1000,
  },
  modalLoadingText: {
    color: "#fff",
    marginTop: 15,
    fontSize: 18,
    fontWeight: "500",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  indicatorContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  indicator: {
    width: 30,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1.5,
  },
  indicatorActive: {
    backgroundColor: "#fff",
  },
})

export default Stories
