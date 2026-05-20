const DataSheet = ({data, className}) => {
    return(
        data.map(element => 
            <tr key={element.name}>
                <td>
                    <div className='cell-flex'>
                        <img 
                            className={className}
                            src={element.image} 
                            title={element.name}/>
                        <span className={`${className}-trainee`}>{element.name}</span>
                    </div>
                </td>
                <td>{element.rarity}</td>
                <td>
                    <span className={`tier-badge-${element.tier.toLowerCase()}`}>{element.tier}</span>
                </td>
            </tr>
        )
    )
}

export default DataSheet