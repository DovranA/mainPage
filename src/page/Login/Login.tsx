import { useState } from 'react'
import { useMain } from '../../MainContext'
import styles from './login.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { LuEye, LuKeyRound } from 'react-icons/lu'
import { LuEyeOff } from 'react-icons/lu'
import { RiErrorWarningLine } from 'react-icons/ri'
const Login = () => {
  const { state, dispatch } = useMain()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passVisible, setPassVisible] = useState(false)
  console.log(password)
  return state.profile ? (
    <div
      // onClick={() => dispatch({ type: 'setProfile', payload: false })}
      className={styles.modal}
    >
      <div
        className={styles.close}
        onClick={() => dispatch({ type: 'setProfile', payload: false })}
      ></div>
      <div
        className={styles.login}
        onClick={() => dispatch({ type: 'setProfile', payload: true })}
      >
        <div className={styles.header}>
          <FaUserCircle className={styles.userIcon} />
          <p>Programma dine agza bolan ulanyjylar girip bilyar</p>
        </div>
        <div className={styles.inp}>
          <FiUser className={styles.inpIcon} />
          <input
            type='text'
            placeholder='Ulanyjy ady ya-da telefon belgisi'
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />
          <LuEyeOff className={`${styles.inpIconHid} ${styles.inpIcon}`} />
        </div>
        <div className={styles.inp}>
          <LuKeyRound className={styles.inpIcon} />
          <input
            type={passVisible ? 'text' : 'password'}
            placeholder='Achar sozi'
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {passVisible ? (
            <LuEye
              className={styles.inpIcon}
              onClick={() => setPassVisible(!passVisible)}
            />
          ) : (
            <LuEyeOff
              className={styles.inpIcon}
              onClick={() => setPassVisible(!passVisible)}
            />
          )}
        </div>
        <div className={styles.option}>
          <span className={styles.checkBox}>
            <input type='checkbox' name='' id='' />
            Yatda sakla
          </span>
          <span>Acar sozuni unutdum</span>
        </div>
        <button className={styles.submit}>Ulgama gir</button>
        <span className={styles.attention}>
          <RiErrorWarningLine className={styles.warnIcon} />
          Agza bolmak uchin admina yuz tutun
        </span>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Login
