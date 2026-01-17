"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Alert, Dimensions } from "react-native"
import type { StoryItem, ThumbnailLoadingState } from "../types/story-types"
import { safeVideoOperation } from "../utils/video-utils"

const { width } = Dimensions.get("window")

export const useStories = (story: StoryItem[]) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)
  const [isOpening, setIsOpening] = useState<boolean>(false)
  const [thumbnailsLoading, setThumbnailsLoading] = useState<ThumbnailLoadingState>({})

  const videoPlayersRef = useRef<{ [key: number]: any }>({})
  const flatListRef = useRef<any>(null)
  const mountedRef = useRef(true)

  // Initialize thumbnail loading states
  useEffect(() => {
    const initialLoadingState: ThumbnailLoadingState = {}
    story.forEach((_, index) => {
      initialLoadingState[index] = true
    })
    setThumbnailsLoading(initialLoadingState)
  }, [story])

  const handleThumbnailLoad = useCallback((index: number) => {
    setThumbnailsLoading((prev) => ({
      ...prev,
      [index]: false,
    }))
  }, [])

  const handleThumbnailError = useCallback((index: number) => {
    setThumbnailsLoading((prev) => ({
      ...prev,
      [index]: false,
    }))
  }, [])

  const cleanupPlayers = useCallback(() => {
    Object.values(videoPlayersRef.current).forEach((player) => {
      if (player) {
        safeVideoOperation(() => player.pause(), "Cleanup pause failed")

        if (player.timeline?.seek) {
          safeVideoOperation(() => player.timeline.seek(0), "Cleanup seek failed")
        }
      }
    })
  }, [])

  const openModal = useCallback(
    async (index: number) => {
      if (isOpening || modalVisible || !mountedRef.current) return

      setIsOpening(true)
      setIsModalLoading(true)

      try {
        setSelectedIndex(index)
        setModalVisible(true)

        setTimeout(() => {
          if (!mountedRef.current) return

          try {
            flatListRef.current?.scrollToIndex({
              index,
              animated: false,
              viewPosition: 0.5,
            })
          } catch (scrollError) {
            console.warn("Scroll to index error:", scrollError)
          }

          setTimeout(() => {
            if (mountedRef.current) {
              setIsModalLoading(false)
            }
          }, 500)
        }, 300)
      } catch (error) {
        console.error("Error opening modal:", error)
        Alert.alert("Error", "Failed to open story")
        setIsModalLoading(false)
      } finally {
        setTimeout(() => {
          if (mountedRef.current) {
            setIsOpening(false)
          }
        }, 800)
      }
    },
    [isOpening, modalVisible],
  )

  const closeModal = useCallback(() => {
    if (!mountedRef.current) return

    setModalVisible(false)
    setIsModalLoading(false)
    cleanupPlayers()
  }, [cleanupPlayers])

  const onMomentumScrollEnd = useCallback(
    (event: any) => {
      if (!mountedRef.current) return

      const contentOffsetX = event.nativeEvent.contentOffset.x
      const newIndex = Math.round(contentOffsetX / width)
      if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < story.length) {
        setSelectedIndex(newIndex)
      }
    },
    [selectedIndex, story.length],
  )

  const onPlayerReady = useCallback((index: number, playerInstance: any) => {
    if (mountedRef.current) {
      videoPlayersRef.current[index] = playerInstance
    }
  }, [])

  const onScrollToIndexFailed = useCallback(
    (info: any) => {
      console.warn("Scroll to index failed:", info)
      const safeIndex = Math.min(info.index, story.length - 1)
      setTimeout(() => {
        if (mountedRef.current) {
          try {
            flatListRef.current?.scrollToIndex({
              index: safeIndex,
              animated: false,
            })
          } catch (retryError) {
            console.warn("Retry scroll failed:", retryError)
          }
        }
      }, 100)
    },
    [story.length],
  )

  // Effect to manage player states
  useEffect(() => {
    if (!mountedRef.current) return

    if (modalVisible && story.length > 0) {
      Object.keys(videoPlayersRef.current).forEach((keyString) => {
        const key = Number.parseInt(keyString)
        const currentPlayer = videoPlayersRef.current[key]
        if (currentPlayer && key !== selectedIndex) {
          safeVideoOperation(() => currentPlayer.pause(), "Pause non-selected video failed")

          if (currentPlayer.timeline?.seek) {
            safeVideoOperation(() => currentPlayer.timeline.seek(0), "Seek non-selected video failed")
          }
        }
      })

      setTimeout(() => {
        if (!mountedRef.current) return

        const selectedPlayer = videoPlayersRef.current[selectedIndex]
        if (selectedPlayer) {
          safeVideoOperation(() => selectedPlayer.play(), "Play selected video failed")
        }
      }, 200)
    } else {
      cleanupPlayers()
    }
  }, [selectedIndex, modalVisible, story, cleanupPlayers])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
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
  }
}
