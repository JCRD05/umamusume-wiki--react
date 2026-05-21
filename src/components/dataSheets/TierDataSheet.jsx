const TierDataSheet = ({data, className}) => {
    return(
        data.map(element => 
            <tr key={element.name}>
                <td>
                    <div className='cell-flex'>
                        <img 
                            className={`list-image ${className}`}
                            src={element.image} 
                            title={element.name}/>
                        <span className="list-name">{element.name}</span>
                    </div>
                </td>
                <td>{element.rarity}</td>
                <td>
                    <span className={`tier-badge ${element.tier.toLowerCase()}`}>{element.tier}</span>
                </td>
            </tr>
        )
    )
}

export default TierDataSheet