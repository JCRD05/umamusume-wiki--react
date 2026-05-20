const Tab = ({name, image, eventHandler}) => {
    return(
        <div>
            <li 
                className={'navbar-element'} 
                onClick={() => eventHandler(name.toLowerCase())}>
                <img src={image}></img>
                {name}</li>
        </div>
    )
}

export default Tab