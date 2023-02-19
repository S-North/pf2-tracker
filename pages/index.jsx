import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import monsterJSON from '../data/monsters.json'

import Header from '../components/Header'
import Encounters from '../components/Encounters'
import Encounter from '../components/Encounter'

export default function Home() {
  const [page, setPage] = useState('encounters')
  const [monsters, setMonsters] = useState([])
  const [encounter, setEncounter] = useState()
  const [encounters, setEncounters] = useState()

  // ON LOAD: Fetch ENCOUNTERS from local storage 
  useEffect(() => {
      if (localStorage.getItem('encounters')) {
        setEncounters(JSON.parse(localStorage.getItem('encounters')))
      }
      if (monsterJSON) {
        console.log(monsterJSON)
        const tempMonsters = []
        monsterJSON.forEach(monster => {
          tempMonsters.push({...monster, _id: uuidv4()})
        });
        setMonsters(tempMonsters)
      }
    
      return
    }, [])
  
  // When ENCOUNTERS change => update local storage
  useEffect(() => {
    if (encounters) localStorage.setItem('encounters', JSON.stringify(encounters))
  
    return
  }, [encounters])

  // When PAGE change => update local storage
  useEffect(() => {
    if (page) localStorage.setItem('page', JSON.stringify(page))
  
    return
  }, [page])

  // When current encounter changed => update the encounters
    useEffect(() => {
      if (encounters) setEncounters([...encounters.filter(e => e._id !== encounter._id), encounter])
  
      return
    }, [encounter])

  function selectEncounter (_id) {
    console.log(_id)
    if (!_id) return
    const encounter = encounters?.filter(enc => enc._id === _id)[0]
    console.log(encounter)
    if (encounter) {
      setEncounter(encounter)
      setPage('encounter')
    }
  }

  function addEncounter (encounter) {
    setEncounters([...encounters, encounter])
    const input = document.getElementById('newEncounterName')
    console.log(input)
    input.value = ''
    input.focus()
  }

  async function deleteEncounter (e, _id) {
    e.preventDefault()
    setEncounters([...encounters.filter(enc => enc._id !== _id)])
  }


  return (
    <>
      <Head>
        <title>Pathfinder Initiative Tracker</title>
        <meta name="description" content="Pathfinder Initiative Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header page={page} setPage={setPage} encounter={encounter} />
      <main>
        {page === 'encounters' && 
          <Encounters encounters={encounters} encounter={encounter} addEncounter={addEncounter} selectEncounter={selectEncounter} deleteEncounter={deleteEncounter}/>}
        {page === 'encounter' && 
          <Encounter encounter={encounter} setEncounter={setEncounter} monsters={monsters} />}
      </main>
    </>
  )
}
