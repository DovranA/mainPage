import axios, { CancelTokenSource } from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import styles from './palyer.module.css'
import { IoClose } from 'react-icons/io5'
interface Props {
  controller: AbortController
  source: CancelTokenSource
  progress: number
}
const Downloader = () => {
  return <></>
}

export default Downloader
