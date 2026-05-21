import { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from '../../services/db'
import TierDataSheet from '../dataSheets/TierDataSheet'

const SupportPage = ({isAdmin}) => {
    const [supports, setSupports] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [sortCriteria, setSortCriteria] = useState('Sort By: Default')

    useEffect(() => {
        const controller = new AbortController

        dbService
            .getData('supports', { signal: controller.signal })
            .then(returnedSupports => setSupports(returnedSupports))
            .catch(error => {
                if(!axios.isCancel(error)) console.error(error)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const renderSupports = () => {
        const currentSupports = supports.filter(support => support.name.toLowerCase().includes(search.toLowerCase().trim()))
        
        if(sortCriteria === 'Sort By: Default') {
            return currentSupports
        } else if(sortCriteria === 'Sort By: Rarity') {
            const rarities = { 'SSR': 1, 'SR': 2, 'R': 3}
            return currentSupports.toSorted((a, b) => rarities[a.rarity] - rarities[b.rarity])
        } else if(sortCriteria == 'Sort By: Tier') {
            const tiers = { 'SS': 1, 'S': 2, 'A': 3, 'B': 4, 'C': 5}
            return currentSupports.toSorted((a, b) => tiers[a.tier] - tiers[b.tier])
        } 
    }

    return(
        <div>
            <section className="page-header">
                <div className="title-ribbon supports">
                    <h1>Support Cards</h1>
                </div>
                
                <div className="table-controls">
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
                            placeholder="Search Support Cards..."
                            onChange={event => setSearch(event.target.value)}/>
                        <button 
                            className="search-btn supports">Search 🔍</button>
                    </div>
                </div>
            </section>

            <section className="page-description">
                <p>Browse through the complete database of Support Cards for Umamusume: Pretty Derby. Filter by type, rarity, and tier to find the perfect supplements for your training sessions and maximize your strategy.</p>
            </section>

            <section className="data-container supports">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Support Card</th>
                            <th>Rarity</th>
                            <th>Tier</th>
                        </tr>
                    </thead>
                    <tbody className="data-body">
                        {
                            isLoading
                            ? null
                            : <TierDataSheet 
                                data={renderSupports()} 
                                className={'support'} 
                                isAdmin={isAdmin}></TierDataSheet>
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default SupportPage