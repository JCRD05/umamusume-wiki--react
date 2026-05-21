import { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from '../../services/db'
import SkillDataSheet from '../dataSheets/SkillDataSheet'

const SkillPage = ({isAdmin}) => {
    const [skills, setSkills] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [sortCriteria, setSortCriteria] = useState('Sort By: Default')

    useEffect(() => {
        const controller = new AbortController

        dbService
            .getData('skills', { signal: controller.signal })
            .then(returnedSkills => setSkills(returnedSkills))
            .catch(error => {
                if(!axios.isCancel(error)) console.error(error)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const renderSkills = () => {
        const currentSkills = skills.filter(skill => skill.name.toLowerCase().includes(search.toLowerCase().trim()))
        
        if(sortCriteria === 'Sort By: Default') {
            return currentSkills
        } else if(sortCriteria === 'Sort By: Rarity') {
            const rarities = { 'Unique': 1, 'Rare': 2, 'Normal': 3,}
            return currentSkills.toSorted((a, b) => rarities[a.rarity] - rarities[b.rarity])
        } else if(sortCriteria == 'Sort By: Type') {
            const types = { 'Passive': 1, 'Recovery': 2, 'Speed': 3, 'Debuff': 4}
            return currentSkills.toSorted((a, b) => types[a.tier] - types[b.tier])
        } 
    }

    return(
        <div>
            <section className="page-header">
                <div className="title-ribbon skills">
                    <h1>Skills</h1>
                </div>
                
                <div className="table-controls">
                    <div className="search-bar">
                        <select 
                            className="sort-dropdown"
                            onChange={event => setSortCriteria(event.target.value)}>
                            <option>Sort By: Default</option>
                            <option>Sort By: Rarity</option>
                            <option>Sort By: Type</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder="Search Skills..." 
                            className="search-input"
                            onChange={event => setSearch(event.target.value)}/>
                        <button 
                            className="search-btn skills">Search 🔍</button>
                    </div>
                </div>
            </section>

            <section className="page-description">
                <p>Explore the complete list of Umamusume skills. Master the different types of active and passive abilities to gain the edge in every race.</p>
            </section>

            <section className="data-container skills">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Rarity</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody className="data-body">
                        {
                            isLoading
                            ? null
                            : <SkillDataSheet 
                                data={renderSkills()} 
                                isAdmin={isAdmin}></SkillDataSheet>
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default SkillPage