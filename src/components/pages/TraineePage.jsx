import { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from '../../services/db'
import TierDataSheet from '../dataSheets/TierDataSheet'

const TraineePage = ({isAdmin}) => {
    const [trainees, setTrainees] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [sortCriteria, setSortCriteria] = useState('Sort By: Default')

    useEffect(() => {
        const controller = new AbortController

        dbService
            .getData('trainee', { signal: controller.signal })
            .then(returnedTrainees => setTrainees(returnedTrainees))
            .catch(error => {
                if(!axios.isCancel(error)) console.error(error)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const renderTrainees = () => {
        const currentTrainees = trainees.filter(trainee => trainee.name.toLowerCase().includes(search.toLowerCase().trim()))
        
        if(sortCriteria === 'Sort By: Default') {
            return currentTrainees
        } else if(sortCriteria === 'Sort By: Rarity') {
            const rarities = { '★': 1, '★★': 2, '★★★': 3}
            return currentTrainees.toSorted((a, b) => rarities[b.rarity] - rarities[a.rarity])
        } else if(sortCriteria == 'Sort By: Tier') {
            const tiers = { 'SS': 1, 'S': 2, 'A': 3, 'B': 4};
            return currentTrainees.toSorted((a, b) => tiers[a.tier] - tiers[b.tier])
        } 
    }

    return(
        <div>
            <section className="page-header">
                <div className="title-ribbon trainee">
                    <h1>Trainees</h1>
                </div>
                <div className="search-group">
                    <select 
                        className="sort-dropdown"
                        onChange={event => setSortCriteria(event.target.value)}>
                        <option>Sort By: Default</option>
                        <option>Sort By: Rarity</option>
                        <option>Sort By: Tier</option>
                    </select>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search Trainee..."
                        onChange={event => setSearch(event.target.value)}/>
                    <button 
                        className="search-btn trainee">Search 🔍</button>
                </div>
            </section>

            <section className="page-description">
                <p>Explore the complete roster of playable Uma Musume. View. Sort by rarity or even competitive viability depending on your needs.</p>
            </section>

            <section className="data-container trainee">
                {
                    isAdmin
                    ? <button>✚</button>
                    : null
                } 
                <table className="data-table">
                    <thead className="data-head">
                        <tr>
                            <th>Trainee</th>
                            <th>Rarity</th>
                            <th>Tier</th>
                        </tr>
                    </thead>
                    <tbody className="data-body">
                        {
                            isLoading
                            ? null
                            : <TierDataSheet 
                                data={renderTrainees()} 
                                className={'trainee'}
                                isAdmin={isAdmin}></TierDataSheet>
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default TraineePage