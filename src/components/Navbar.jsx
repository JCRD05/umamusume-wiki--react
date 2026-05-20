import Tab from "./Tab"

const Navbar = ({eventHandler}) => {
    const carratIcon = '/assets/icons/UmamusumetaCarratIcon.png'
    const logo = '/assets/icons/Logo.png'

    return(
        <header>
            <nav className="navbar">
                <ul>
                    <Tab name={''} image={logo} eventHandler={eventHandler}></Tab>
                    <Tab name='Tierlist' image={carratIcon} eventHandler={eventHandler} ></Tab>
                    <Tab name='Banners' image={carratIcon} eventHandler={eventHandler} ></Tab>
                    <Tab name='Trainees' image={carratIcon} eventHandler={eventHandler} ></Tab>
                    <Tab name='Supports' image={carratIcon} eventHandler={eventHandler} ></Tab>
                    <Tab name='Skills' image={carratIcon} eventHandler={eventHandler} ></Tab>
                    <Tab name='Events' image={carratIcon} eventHandler={eventHandler} ></Tab>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar