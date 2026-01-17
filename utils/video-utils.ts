// Helper function to safely call video player methods
export const safeVideoOperation = (operation: () => any, errorMessage = "Video operation failed") => {
  try {
    const result = operation()
    // If result is a Promise, handle it
    if (result && typeof result.catch === "function") {
      result.catch((error: any) => {
        console.warn(`${errorMessage}:`, error)
      })
    }
    return result
  } catch (error) {
    console.warn(`${errorMessage}:`, error)
    return null
  }
}
