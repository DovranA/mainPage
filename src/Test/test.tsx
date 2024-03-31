import axios, { Axios } from 'axios'
import styles from './test.module.css'
import { useState } from 'react'

const Test = () => {
  const [progress, setProgress] = useState<number>(0)
  let source = axios.CancelToken.source()
  const controller = new AbortController()

  // const handleDownload = async (id: number) => {
  //   if (downStop) {
  //     console.log('Download stopped.')
  //     setTimeout(() => {
  //       downStop = false
  //     }, 150)
  //     return
  //   }
  //   try {
  //     const response = await fetch(
  //       `https://dev.tmbiz.info/api/videos/${id}/download`
  //     )
  //     if (!response?.body) return
  //     const contentLengh = response.headers.get('Content-Length')
  //     const totalLength =
  //       typeof contentLengh === 'string' && parseInt(contentLengh)
  //     console.log('totalLength', totalLength)
  //     const reader = response.body.getReader()
  //     const chunks = []
  //     let receivedLength = 0
  //     while (true) {
  //       const { done, value } = await reader.read()
  //       if (done) {
  //         console.log('done')
  //         axios
  //           .put(`https://dev.tmbiz.info/api/videos/${id}/downloadcount`)
  //           .then((res) => {
  //             console.log(res)
  //           })
  //           .catch((err) => {
  //             console.log(err)
  //           })
  //         setProgress(0)
  //         downStop = false
  //         break
  //       }
  //       chunks.push(value)
  //       receivedLength += value.length
  //       if (typeof totalLength === 'number') {
  //         const step = Math.round((receivedLength / totalLength) * 100)
  //         setProgress(step)
  //       }
  //     }
  //     const blob = new Blob(chunks)

  //     const url = URL.createObjectURL(blob)

  //     const a = document.createElement('a')
  //     a.href = url
  //     a.download = `tmbiz-${Date.now()}.mp4`
  //     const handleClick = () => {
  //       setTimeout(() => {
  //         URL.revokeObjectURL(url)
  //         a.removeEventListener('click', handleClick)
  //       }, 150)
  //     }
  //     a.addEventListener('click', handleClick, false)
  //     a.click()
  //     downStop = false
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const handleDownload = async (id: number) => {
    await axios
      .get(`https://dev.tmbiz.info/api/videos/${id}/download`, {
        cancelToken: source.token,
        signal: controller.signal,
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          console.log(progressEvent)
          if (progressEvent.total) {
            const precenntComplete =
              Math.round(progressEvent.loaded / progressEvent?.total) * 100
            console.log(precenntComplete + '%')
          }
        },
      })
      .then((res: any) => {
        console.log('done')
        console.log(res)
        const url = URL.createObjectURL(res.data)

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
  return (
    <div>
      <button
        onClick={() => {
          handleDownload(39468)
        }}
      >
        start
      </button>
      <button
        onClick={() => {
          source.cancel()
          controller.abort()
        }}
      >
        stop
      </button>
    </div>
  )
}

export default Test
