import { useParams } from 'react-router-dom'
import styles from './categorie.module.css'
const Categorie = () => {
  const categorie = useParams
  console.log(categorie)
  return <div className={styles.categorie}>test</div>
}

export default Categorie
