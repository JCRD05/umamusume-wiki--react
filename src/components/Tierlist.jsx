const Tierlist = ({tierlist, className}) => {
    return(
        tierlist.map(element => 
            <tr key={element.tier}>
                <td className={`tier-${element.tier.toLowerCase()}`}>{element.tier}</td>
                <td className='tier-members'>
                    {element.members.map(member => 
                        <img 
                            key={member.name}
                            className={`${className}-image`} 
                            src={member.image} 
                            alt={member.name}>
                        </img>)}
                </td>
            </tr>
        )
    )
}

export default Tierlist