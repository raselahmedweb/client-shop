"use client"

import type { VideoStoryItemProps } from "@/type/video-story"
import { useState } from "react"
import VideoStoryItem from "./video-story-item"

interface VideoStoryListProps {
  stories: VideoStoryItemProps["item"][]
}

export default function VideoStoryList({ stories }: VideoStoryListProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePlayerReady = (index: number) => {
    console.log(`Player ${index} is ready`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className={`aspect-video cursor-pointer transition-transform hover:scale-105 ${
            selectedIndex === index ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => setSelectedIndex(index)}
        >
          <VideoStoryItem
            item={story}
            index={index}
            isSelected={selectedIndex === index}
            onPlayerReady={() => handlePlayerReady(index)}
          />
        </div>
      ))}
    </div>
  )
}
