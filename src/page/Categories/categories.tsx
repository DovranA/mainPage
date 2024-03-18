import React from 'react'
import styles from './categories.module.css'
import CatalogBar from '../../components/Cotalog/catalogBar'
import { Outlet } from 'react-router-dom'
const Categories = () => {
  return (
    <div className={styles.categories}>
      <CatalogBar />
      <Outlet />
    </div>
  )
}

export default Categories
