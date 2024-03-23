import React, { useState, useRef } from 'react'

function VideoDownload() {
  const [progress, setProgress] = useState(0)
  const downloadRef = useRef(null)

  const handleDownload = async () => {
    const downloadUrl = '/path/to/your/video.mp4'
    const response = await fetch(downloadUrl)

    if (!response.ok) {
      throw new Error('Failed to fetch video')
    }

    const blob = await response.blob()
    const totalSize = blob.size // Get total size if possible

    downloadRef.current.src = URL.createObjectURL(blob)
    downloadRef.current.onload = () => {
      setProgress(100) // Assuming complete download onload
    }

    downloadRef.current.onprogress = (event) => {
      if (totalSize) {
        const downloaded = event.loaded
        const progress = Math.round((downloaded / totalSize) * 100)
        setProgress(progress)
      } else {
        // Handle case where total size is unavailable
        console.log('Download progress unavailable')
      }
    }
  }
}
