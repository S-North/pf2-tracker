import { v4 as uuidv4 } from "uuid"
import { useEffect, useState, useRef } from "react"
import style from '../styles/Encounter.module.css'
import SelectMonster from "./SelectMonster"

export default function Encounter ({encounter, setEncounter, monsters}) {
    const pageSize = useRef()
    const [search, setsearch] = useState('')
    useEffect(() => {
        pageSize.current = document.getElementById('page').getBoundingClientRect()
        console.log(pageSize.current)
      return
    }, [])

    const filteredMonsters = () => {
        if (search === '') return monsters
        else return monsters.filter(monster => monster.name.toLowerCase().includes(search.toLowerCase()))
    }

    function addMonster (e, monster) {
        e.preventDefault()
        setEncounter({
            ...encounter, 
            combatants: [
                ...encounter.combatants, 
                {
                    ...monster, 
                    _id: uuidv4(), 
                    type: 'monster', 
                    init: 0, hp_current: monster.hp}]})
    }

    function addCombatant (e) {
        e.preventDefault()
        const combatant = {
            name: e.target.name.value,
            ac: parseInt(e.target.ac.value),
            hp: parseInt(e.target.hp.value),
            hp_current: parseInt(e.target.hp.value),
            _id: uuidv4(),
            type: 'pc',
            init: 0
        }
        console.log(combatant)
        setEncounter({...encounter, combatants: [...encounter.combatants, combatant]})
    }

    function removeCombatant (e, _id) {
        setEncounter({...encounter, combatants: [...encounter.combatants.filter(c => c._id !== _id)]})
    }
    
   
    return (
        <div id="page" style={{height: '100%'}}>
            <details className={style.monsterSidebar} style={{maxHeight: pageSize.current}}>
                <summary>Monsters</summary>
                <input type="text" placeholder="search" value={search} onChange={e => setsearch(e.target.value)}/>
                <div className={style.monsterList}>
                    {filteredMonsters()?.map((monster, index) => (
                        <div className={style.monsterRow} key={monster._id}>
                            <input type="button" value="add" onClick={e => addMonster(e, monster)}/>
                            <p>{monster.name}</p>
                        </div>
                    ))}
                </div>
            </details>
            
            <div className={style.header}>
                <h2>{encounter.name}</h2>
                {/* <button onClick={e => addMonster(e)}>Add Monster</button> */}

            </div>
            
            <form onSubmit={e => addCombatant(e)}>
            {/* <form onSubmit={e => setCombatants([...combatants, e.target.value])}> */}
                <input type="text" id="name" placeholder="Name" required/>
                <input type="number" name="" id="ac" placeholder="AC" required />
                <input type="number" name="" id="hp" placeholder="HP" required />
                <input type="submit" value="Add" />
            </form>

            <div className={style.combatantRow}>
                <p>Init</p>
                <p>Name</p>
                <p>AC</p>
                <p>HP</p>
            </div>
            <div className={style.combatantList}>
                {encounter?.combatants?.sort((a,b) => a.init < b.init)?.map(combatant => (
                    <div key={combatant._id} className={style.combatantRow}>
                        <input 
                            className={style.inputInit}
                            style={combatant.type === 'monster' ? {backgroundColor: 'coral'} : {backgroundColor: 'lightgreen'}}
                            type="number" 
                            name="" 
                            id="" 
                            value={combatant.init} 
                            onChange={e => setEncounter(
                                {
                                    ...encounter, 
                                    combatants: [
                                        ...encounter.combatants.filter(c => c._id !== combatant._id), 
                                        {...combatant, init: parseInt(e.target.value)}
                                        ]})} />
                        <p >{combatant.name}</p>
                        <input type="number" name="" id="" value={combatant.ac} onChange={e => setEncounter(
                            {
                                ...encounter, 
                                combatants: [
                                    ...encounter.combatants.filter(c => c._id !== combatant._id), 
                                    {...combatant, ac: parseInt(e.target.value)}
                                    ]})}/>
                        <input type="number" name="" id="" value={combatant.hp_current} onChange={e => setEncounter(
                            {
                                ...encounter, 
                                combatants: [
                                    ...encounter.combatants.filter(c => c._id !== combatant._id), 
                                    {...combatant, hp_current: parseInt(e.target.value)}
                                    ]})}/>
                        <input type="button" value="delete" onClick={e => removeCombatant(e, combatant._id)} />
                    </div>
                ))}
            </div>
            
        </div>
    )
}