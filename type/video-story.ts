export interface VideoStoryItemProps {
  item: {
    id: string
    video: string
    title?: string
    thumbnail?: string
  }
  index: number
  isSelected: boolean
  onPlayerReady?: () => void
}

export interface VideoPlayerInstance {
  loop: boolean
  play: () => Promise<void>
  pause: () => void
  currentTime: number
  duration: number
  addEventListener: (event: string, callback: () => void) => void
  removeEventListener: (event: string, callback: () => void) => void
}
