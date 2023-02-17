import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Encounter from '../components/encounter'

export default function Home() {
  const [encounters, setEncounters] = useState()
  const [encounter, setEncounter] = useState(1)

  useEffect(() => {
     if (localStorage.getItem('encounters')) {
      setEncounters(JSON.parse(localStorage.getItem('encounters')))
    }
  
    return
  }, [])

  useEffect(() => {
    if (encounters) localStorage.setItem('encounters', JSON.stringify(encounters))
  
    return
  }, [encounters])

  useEffect(() => {
    if (encounters) setEncounters([...encounters.filter(e => e._id !== encounter._id), encounter])
  
    return
  }, [encounter])
  

  async function deleteEncounter (e, encounter) {
    e.preventDefault()
    setEncounters([...encounters.filter(enc => enc._id !== encounter._id)])
  }

  
  return (
    <>
      <Head>
        <title>Pathfinder Initiative Tracker</title>
        <meta name="description" content="Pathfinder Initiative Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Pathfinder Initiative Tracker</h1>
          <ul>
            <li>Characters</li>
            <li>Encounters</li>
            <li>Monsters</li>
          </ul>
        </header>
        <form onSubmit={e => {
          e.preventDefault(); 
          setEncounters([...encounters, {_id: uuidv4(), name: e.target.name.value, combatants: [], state: 'active', created: new Date}])
          }}>
          <input type="text" name="" id="name" placeholder='encounter name'/>
          <input type="submit" value="Add Encounter" />
        </form>

        {Array.isArray(encounters) && encounters?.sort((a,b) => {return a.created < b.created}).map((encounter, index) => (
          <p className={styles.link} onClick={() => setEncounter(encounter)} key={encounter._id}>
            <button onClick={e => deleteEncounter(e, encounter)}>Delete</button>
            {encounter.name}
          </p>
        ))}

        <Encounter encounter={encounter} setEncounter={setEncounter}></Encounter>

        
      </main>
    </>
  )
}
