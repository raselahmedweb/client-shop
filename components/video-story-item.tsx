"use client"

import { useVideoPlayer, VideoView } from "expo-video"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { VideoStoryItemProps } from "../type/story-types"
import { safeVideoOperation } from "../utils/video-utils"
import { Icon } from "./ui/IconSymbol"

const { width, height } = Dimensions.get("window")

const VideoStoryItem: React.FC<VideoStoryItemProps> = React.memo(({ item, index, isSelected, onPlayerReady }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const playerReadyRef = useRef(false)
  const mountedRef = useRef(true)

  const player = useVideoPlayer(item.video, (playerInstance) => {
    if (!mountedRef.current) return

    try {
      playerInstance.loop = true
      playerReadyRef.current = true

      // Set up player event listeners for buffering states
      if (playerInstance.addListener) {
        playerInstance.addListener("playbackStatusUpdate", (status: any) => {
          if (mountedRef.current) {
            setIsBuffering(status.isBuffering || false)
          }
        })
      }

      setIsLoading(false)
      setHasError(false)
      onPlayerReady(index, playerInstance)

      if (isSelected) {
        setTimeout(() => {
          if (mountedRef.current && playerInstance) {
            setIsBuffering(true)
            safeVideoOperation(() => {
              const result = playerInstance.play()
              setTimeout(() => {
                if (mountedRef.current) {
                  setIsBuffering(false)
                }
              }, 1000)
              return result
            }, "Initial play failed")
          }
        }, 100)
      }
    } catch (error) {
      console.error("Video player setup error:", error)
      if (mountedRef.current) {
        setHasError(true)
        setIsLoading(false)
        setIsBuffering(false)
      }
    }
  })

  // Effect to control playback based on `isSelected` prop
  useEffect(() => {
    if (!mountedRef.current || !player || !playerReadyRef.current || hasError) {
      return
    }

    if (isSelected) {
      setIsBuffering(true)
      safeVideoOperation(() => {
        const result = player.play()
        setTimeout(() => {
          if (mountedRef.current) {
            setIsBuffering(false)
          }
        }, 800)
        return result
      }, "Play operation failed")
    } else {
      setIsBuffering(false)
      safeVideoOperation(() => player.pause(), "Pause operation failed")

      if (player.timeline?.seek) {
        safeVideoOperation(() => player.timeline.seek(0), "Seek operation failed")
      }
    }
  }, [isSelected, player, hasError])

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
      if (player && playerReadyRef.current) {
        safeVideoOperation(() => player.pause(), "Cleanup pause failed")
      }
    }
  }, [player])

  const handleRetry = useCallback(() => {
    setHasError(false)
    setIsLoading(true)
  }, [])

  if (hasError) {
    return (
      <View style={styles.fullscreenContainer}>
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={48} color="#ff6b6b" />
          <Text style={styles.errorText}>Failed to load video</Text>
          <Text style={styles.errorSubtext}>{item.title}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.fullscreenContainer}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading video...</Text>
        </View>
      )}

      {player && !isLoading && (
        <>
          <VideoView style={styles.videoPlayer} player={player} allowsFullscreen allowsPictureInPicture />

          {isBuffering && (
            <View style={styles.bufferingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.bufferingText}>Buffering...</Text>
            </View>
          )}
        </>
      )}

      <View style={styles.metaContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
            <Icon name="favorite-border" size={24} color="#ff6b6b" />
            <Text style={styles.likeCount}>{item.totalLike}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
            <Icon name="share" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})

VideoStoryItem.displayName = "VideoStoryItem"

const styles = StyleSheet.create({
  fullscreenContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  videoPlayer: {
    width: width,
    height: height * 0.7,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  bufferingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    zIndex: 200,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 8,
  },
  bufferingText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  errorContainer: {
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  errorSubtext: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 15,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  metaContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  likeCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  shareButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 20,
  },
})

export default VideoStoryItem
