import styles from './login.module.css'
const Login = () => {
  const isLogin = true

  if (!isLogin) {
    return null
  } else {
    return <div className={styles.modal}>Login</div>
  }
}

export default Login
