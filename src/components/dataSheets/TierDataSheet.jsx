import { useState } from "react"
import dbService from '../../services/db'

const TierDataSheet = ({data, className, isAdmin, type, onEditSuccess, onDeleteSuccess}) => {
    const [rowInEdition, setRowInEdition] = useState(null)
    const [rowToDelete, setRowToDelete] = useState(null)
    const [draft, setDraft] = useState({
        name: '',
        rarity: '',
        tier: '',
        image: ''
    })

    const renderAdminButtons = (element) => {
        if(isAdmin === false) return null

        if(rowInEdition === element.id) {
            return(
                <div>
                    <button
                        onClick={() => editTrainee(element.id)}>💾</button>
                    <button
                        onClick={() => setRowInEdition(null)}>❌</button>
                </div>
            )
        } else if(rowToDelete === element.id) {
            return(
                <div>
                    <button
                        onClick={() => deleteTrainee(element.id)}>🗑️</button>
                    <button
                        onClick={() => setRowToDelete(null)}>❌</button>
                </div>
            )
        } else {
            return(
                <div>
                    <button
                        onClick={() => {
                            setRowInEdition(element.id)
                            setDraft({
                                name: element.name,
                                rarity: element.rarity,
                                tier: element.tier,
                                image: element.image
                            })
                        }}>✏️</button>
                    <button
                        onClick={() => setRowToDelete(element.id)}>🗑️</button>
                </div>
            )
        }
    }

    const handleDraftChange = (event) => {
        const { name, value} = event.target

        setDraft({
            ...draft,
            [name]: value
        })
    }

    const editTrainee = (id) => {
        if(draft.name == '' || draft.rarity == '' || draft.tier == '' ) {
            return window.alert('please fill out all the form fields')
        }

        dbService
            .editData(draft, `${type}/${id}`)
            .then(() => {
                setDraft({
                    name: '',
                    rarity: '',
                    tier: ''
                })
                setRowInEdition(null)
                onEditSuccess({ id:id, ...draft})
            })
            .catch(error => console.error(error))
    }
    const deleteTrainee = (id) => {
        dbService
            .deleteData(`${type}/${id}`)
            .then(() => {
                onDeleteSuccess(id)
                setRowToDelete(null)
            })
            .catch(error => console.error(error))
    }

    console.log(draft)
    console.log(rowInEdition, rowToDelete)
    console.log(type)
    
    return(
        data.map(element => 
            <tr key={element.name}>
                <td>
                    {
                        rowInEdition === element.id
                        ?
                            <input
                                className="form-input"
                                type='text'
                                placeholder="input a name"
                                name='name'
                                value={draft.name}
                                onChange={handleDraftChange} />
                        :
                            <div className='cell-flex'>
                                <img 
                                    className={`list-image ${className}`}
                                    src={element.image} 
                                    title={element.name}/>
                                <span className="list-name">{element.name}</span>
                            </div>
                    }
                </td>
                <td>
                    {
                        rowInEdition === element.id 
                        ?
                            <input
                                className="form-input"
                                type='text'
                                placeholder="Input a rarity"
                                name='rarity'
                                value={draft.rarity}
                                onChange={handleDraftChange} />
                        : element.rarity

                    }
                </td>
                <td>
                    {
                        rowInEdition === element.id
                        ? 
                            <input
                                className="form-input"
                                type='text'
                                placeholder="Input a tier"
                                name='tier'
                                value={draft.tier}
                                onChange={handleDraftChange}/>
                        : <span className={`tier-badge ${element.tier.toLowerCase()}`}>{element.tier}</span>
                    }
                    {
                        renderAdminButtons(element)
                    }
                </td>
            </tr>
        )
    )
}

export default TierDataSheet