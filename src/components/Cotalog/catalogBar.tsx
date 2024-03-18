import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './catalogBar.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
const CatalogBar = () => {
  return (
    <div className={styles.catalogs}>
      <NavLink to={'/categories/sport'} className={styles.btn}>
        Sport <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'/categories/clouse'} className={styles.btn}>
        Egin-eshik <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
      <NavLink to={'#'} className={styles.btn}>
        test <MdOutlineArrowForwardIos />
      </NavLink>
    </div>
  )
}

export default CatalogBar
