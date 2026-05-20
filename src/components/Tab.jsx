const Tab = ({name, image, eventHandler}) => {
    return(
        <li
            className="navbar-element"
            onClick={() => eventHandler(name.toLowerCase())}>
            <img src={image} alt={name ? `${name} icon` : 'logo'} />
            {name}
        </li>
    )
}

export default Tab