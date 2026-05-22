import { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from '../../services/db'
import TierDataSheet from '../dataSheets/TierDataSheet'

const SupportPage = ({isAdmin}) => {
    const placeholderImage = '/assets/images/miscellaneous/placeholder.png'

    const [supports, setSupports] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [sortCriteria, setSortCriteria] = useState('Sort By: Default')
    const [isAdding, setIsAdding] = useState(false)
    const [newSupport, setNewSupport] =  useState({
        name: '',
        rarity: '',
        tier: '',
        image: placeholderImage
    })
    const [newImage, setNewImage] = useState(null)

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

    const renderAddSection = () => {
        return (
            <div>
                <form onSubmit={addSupport} className="data-form">
                    <input
                        className="form-input"
                        type='file'
                        accept="image/*"
                        onChange={handleNewSupportChange}/>
                    
                    <input
                        className="form-input"
                        type='text'
                        placeholder='Support name'
                        name='name'
                        value={newSupport.name}
                        onChange={handleNewSupportChange}/>

                    <input
                        className="form-input"
                        type='text'
                        placeholder='Support rarity'
                        name='rarity'
                        value={newSupport.rarity}
                        onChange={handleNewSupportChange} />

                    <input
                        className="form-input"
                        type='text'
                        placeholder='Support tier'
                        name='tier'
                        value={newSupport.tier}
                        onChange={handleNewSupportChange} />

                    <button
                        className="add-button"
                        type='submit'>Add</button>
                </form>
            </div>
        )
    }

    const handleNewSupportChange = (event) => {
        if(event.target.type === 'file') {
            setNewImage(event.target.files[0])
        } else {
            const { name, value} = event.target
            setNewSupport({
                ...newSupport,
                [name]: value
            })
        }
    }

    const addSupport = (event) => {
        event.preventDefault()

        if(newSupport.name == '' || newSupport.rarity == '' || newSupport.tier == '' ) {
            return window.alert('please fill out all the form fields')
        }

        
        if(!newImage) {
            return(
                dbService
                .addData('supports', newSupport)
                .then(returnedSupport => {
                    setSupports(supports.concat(returnedSupport))
                    setNewSupport({
                        name: '',
                        rarity: '',
                        tier: '',
                        image: placeholderImage
                    })
                })
                .catch(error => console.error(error))
            )
        }

        const imagePayload = new FormData()

        imagePayload.append('file', newImage)
        imagePayload.append('upload_preset', 'uma-wiki')
        imagePayload.append('folder', 'supports')
        
        axios.post('https://api.cloudinary.com/v1_1/dqzyrqr58/image/upload', imagePayload)
            .then(response => {
                const imageUrl = response.data.secure_url

                const trainee = {
                    ...newSupport,
                    image: imageUrl
                }

                dbService
                .addData('supports', trainee)
                .then(returnedSupport => {
                    setSupports(supports.concat(returnedSupport))
                    setNewSupport({
                        name: '',
                        rarity: '',
                        tier: '',
                        image: placeholderImage
                    })
                    setNewImage(null)
                })
                .catch(error => console.error(error))
            }
        )
    }

    const checkUpdateSupport = updatedSupport => {
        const newSupports = supports.map(support => support.id === updatedSupport.id ? updatedSupport : support)

        setSupports(newSupports)
    }

    const checkDeleteSupport = id => {
        const newSupports = supports.filter(support => support.id !== id)

        setSupports(newSupports)
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
                {
                    isAdmin
                    ? 
                        <button
                            onClick={() => setIsAdding(!isAdding)}>
                                {isAdding ? '❌' :'✚'}</button>
                    : null
                }

                {
                    isAdding ? renderAddSection() : null
                } 
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
                                isAdmin={isAdmin}
                                type={'supports'}
                                onEditSuccess={checkUpdateSupport}
                                onDeleteSuccess={checkDeleteSupport}></TierDataSheet>
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default SupportPage