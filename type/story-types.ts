export interface StoryItem {
  productId: number
  title: string
  description: string
  video: string
  thumbnail: string
  totalLike: number
}

export interface StoriesProps {
  story: StoryItem[]
  theme: {
    text: string
  }
}

export interface VideoStoryItemProps {
  item: StoryItem
  index: number
  isSelected: boolean
  onPlayerReady: (index: number, playerInstance: any) => void
}

export interface ThumbnailLoadingState {
  [key: number]: boolean
}
