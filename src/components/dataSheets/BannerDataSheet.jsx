const BannerDataSheet = ({data}) => 
    data.map(element => 
        <tr key={`${element.trainees}-${element.supports}`}>
            <td>
                <div className="cell-flex">
                    <img src={element.image} className="banner-image" title={element.name}></img>
                    <div className="names-group">
                        <span className="name">{element.trainees}</span>
                        <span className="name">{element.supports}</span>
                    </div>
                </div>
            </td>
            <td>{element.availability}</td>
        </tr>
    )

export default BannerDataSheet