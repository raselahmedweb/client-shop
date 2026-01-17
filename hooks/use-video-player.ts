"use client"

import type { VideoPlayerInstance } from "@/types/video-story"
import { useEffect, useRef, useState } from "react"

export function useVideoPlayer(videoSrc: string, onPlayerReady?: (player: VideoPlayerInstance) => void) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const playerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = playerRef.current
    if (!video) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => {
      setIsLoading(false)
      setHasError(false)
      if (onPlayerReady) {
        onPlayerReady(video as VideoPlayerInstance)
      }
    }
    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [videoSrc, onPlayerReady])

  return {
    playerRef,
    isLoading,
    hasError,
    setIsLoading,
    setHasError,
  }
}
