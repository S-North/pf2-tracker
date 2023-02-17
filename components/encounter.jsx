import { useEffect, useState } from "react"
import style from '../styles/Encounter.module.css'
import SelectMonster from "./SelectMonster"

export default function Encounter ({encounter, setEncounter}) {
    function addMonster (e) {
        e.preventDefault()
    }

    function addCombatant (e) {
        e.preventDefault()
        const combatant = {
            name: e.target.name.value,
            ac: e.target.ac.value,
            hp: e.target.hp.value
        }
        console.log(combatant)
        setEncounter({...encounter, combatants: [...encounter.combatants, combatant]})
    }
    
   
    return (
        <>
        <h2>{encounter.name}</h2>
        <button onClick={e => addMonster(e)}>Add Monster</button>
        
        <form onSubmit={e => addCombatant(e)}>
        {/* <form onSubmit={e => setCombatants([...combatants, e.target.value])}> */}
            <input type="text" id="name" placeholder="Name"/>
            <input type="number" name="" id="ac" placeholder="AC" />
            <input type="number" name="" id="hp" placeholder="HP" />
            <input type="submit" value="Add" />
        </form>
        {encounter?.combatants?.map(combatant => (
            <p key={combatant.name}>{combatant.name}</p>
        ))}
        
        </>
    )
}