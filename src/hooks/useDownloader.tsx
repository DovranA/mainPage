import axios from 'axios'
import { useEffect, useState } from 'react'

const useDownloader = () => {
  const [url, setUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  let source = axios.CancelToken.source()
  const controller = new AbortController()
  const addDownload = (newUrl: string) => setUrl(newUrl)
  const handleDownload = async () => {
    await axios
      .get(url, {
        signal: controller.signal,
        cancelToken: source.token,
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          console.log(progressEvent)
          if (progressEvent.progress) {
            const precenntComplete = Math.round(progressEvent.progress * 100)
            console.log(precenntComplete + '%')
            setProgress(precenntComplete)
          }
        },
      })
      .then((res: any) => {
        console.log('done')
        setProgress(0)
        const url = URL.createObjectURL(res)

        const a = document.createElement('a')
        a.href = url
        a.download = `tmbiz-${Date.now()}.mp4`
        const handleClick = () => {
          setTimeout(() => {
            URL.revokeObjectURL(url)
            a.removeEventListener('click', handleClick)
          }, 150)
        }
        a.addEventListener('click', handleClick, false)
        a.click()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    handleDownload()
    return () => {
      source.cancel()
      controller.abort()
    }
  }, [url])
  return { addDownload, progress, source, controller }
}

export default useDownloader
