import styles from '../styles/Header.module.css'
import { useEffect } from 'react'

export default function Header ({ page, setPage, encounter }) {

    useEffect(() => {
        if (localStorage.getItem('page')) {
            setPage(JSON.parse(localStorage.getItem('page')))
       } else setPage('encounters')
     
       return
     }, [])

    return (
        <header className={styles.header}>
          <h1>Pathfinder Initiative Tracker</h1>
          <ul>
            {encounter && <li 
                className={page === 'encounter' ? styles.linkCurrent : styles.link} 
                id={page === 'encounters' && 'current'}
                onClick={() => setPage('encounter')}>
                Current Encounter
            </li>}

            <li 
                className={page === 'encounters' ? styles.linkCurrent : styles.link} 
                id={page === 'encounters' && 'current'}
                onClick={() => setPage('encounters')}>
                Encounters
            </li>
            
            <li 
                className={page === 'characters' ? styles.linkCurrent : styles.link} 
                id={page === 'characters' && 'current'}
                onClick={() => setPage('characters')}>
                Characters
            </li>
          </ul>
        </header>
    )
}