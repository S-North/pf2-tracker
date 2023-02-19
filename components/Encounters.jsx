import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/Encounters.module.css'


export default function Encounters ({ encounters, encounter, addEncounter, selectEncounter, editEncounter, deleteEncounter }) {
    
    return (
        <>
        <div className={styles.header}>
            <h2>Encounters</h2>

            <form onSubmit={e => {
                e.preventDefault(); 
                addEncounter({_id: uuidv4(), name: e.target.newEncounterName.value, combatants: [], state: 'active', created: new Date})
                }}>
                <input type="text" name="" id="newEncounterName" placeholder='encounter name'/>
                <input type="submit" value="New Encounter" />
            </form>
        </div>
  
        <div className={styles.encounters}>
            {Array.isArray(encounters) && encounters?.sort((a,b) => {return a.created < b.created}).map((encounter, index) => (
            <div key={encounter._id} className={styles.encounter}>
                <button onClick={e => deleteEncounter(e, encounter._id)}>Delete</button>
                <p className='link' onClick={() => selectEncounter(encounter._id)} key={encounter._id}>
                {encounter.name}
                </p>
            </div>
            ))}
        </div>
        </>
    )
}