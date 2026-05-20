const SkillDataSheet = ({data}) => {
    return(
        data.map(element => 
            <tr key={element.name}>
                <td>
                    <div className='cell-flex'>
                        <img 
                            className={'tier'}
                            src={element.image} 
                            title={element.name}/>
                        <div className="details">
                            <span className="name">{element.name}</span>
                            <span className="desc">{element.description}</span>
                        </div>
                    </div>
                </td>
                <td>{element.rarity}</td>
                <td>{element.type}</td>
            </tr>
        )
    )
}

export default SkillDataSheet