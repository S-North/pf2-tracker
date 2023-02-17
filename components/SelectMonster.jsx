import monsterJson from '../data/monsters.json'
import { useEffect, useState } from "react"
import style from '../styles/Encounter.module.css'

export default function SelectMonster () {
    const [monsters, setMonsters] = useState(monsterJson)
    const [level, setlevel] = useState({min: 0, max: 30})
    const [selectedMonster, setSelectedMonster] = useState()
    const sortedMonsters = monsters?.sort((a,b) => a.name > b.name) || []
    console.log(sortedMonsters)
    const filteredMonsters = sortedMonsters?.filter(monster => monster.level >= level.min && monster.level <= level.max)

    return (
        <>
        <label>Min Level {level.min}
        <input 
            type="range" 
            min="1" 
            max={level.max} 
            value={level.min} 
            onChange={e => setlevel({...level, min: e.target.value})} />
        </label>
        <label>Max Level: {level.max}
        <input 
            type="range" 
            min={level.min} 
            max="100" 
            value={level.max} 
            onChange={e => setlevel({...level, max: e.target.value})} />
        </label>
        <select onChange={e => setSelectedMonster(monsters.filter(monster => monster.name === e.target.value)[0])}>
            {filteredMonsters?.map((monster, index) => (
                <option key={index}>{monster.name}</option>
            ))}
        </select>
        {selectedMonster &&
        <div className={style.statblock}>
            <h3>{selectedMonster.name}</h3>
            <em>Level: {selectedMonster.level}</em>
            <p>HP: {selectedMonster.hp}</p>
            <p>AC: {selectedMonster.ac}</p>
            <p>Speed: {selectedMonster.speed.ground}</p>
            <p>{selectedMonster.description}</p>
        </div>}
        </>
    )
}