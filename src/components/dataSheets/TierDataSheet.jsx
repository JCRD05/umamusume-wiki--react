import { useState } from "react"

const TierDataSheet = ({data, className, isAdmin}) => {
    const [rowInEdition, setRowInEdition] = useState(null)
    const [rowToDelete, setRowToDelete] = useState(null)
    const [draft, setDraft] = useState({})

    const editTrainee = () => {}
    const deleteTrainee = () => {}

    const renderAdminButtons = (element) => {
        if(isAdmin === false) return null

        if(rowInEdition === element.id) {
            return(
                <div>
                    <button
                        onClick={editTrainee}>💾</button>
                    <button
                        onClick={() => setRowInEdition(null)}>❌</button>
                </div>
            )
        } else if(rowToDelete === element.id) {
            return(
                <div>
                    <button
                        onClick={deleteTrainee}>🗑️</button>
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
                                tier: element.tier
                            })
                        }}>✏️</button>
                    <button
                        onClick={() => setRowToDelete(element.id)}>🗑️</button>
                </div>
            )
        }
    }

    console.log(draft)
    console.log(rowInEdition, rowToDelete)
    
    return(
        data.map(element => 
            <tr key={element.name}>
                <td>
                    {
                        rowInEdition === element.id
                        ?
                            <input
                                placeholder="input a name" />
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
                                placeholder="Input a rarity"/>
                        : element.rarity

                    }
                </td>
                <td>
                    {
                        rowInEdition === element.id
                        ? 
                            <input/>
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