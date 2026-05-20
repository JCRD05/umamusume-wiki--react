const MainPage = () => {
    return(
        <div>
            <section className="welcome-card">
        
            <div className="character-container">
                <img src="assets/images/miscellaneous/bourbon.png" alt="Umamusume Character" className="hero-character"></img>
            </div>

            <div className="content-container">
                <header className="welcome-header">
                    <span className="welcome-label">Welcome!</span>
                </header>
                
                <article className="welcome-text">
                    <p>Welcome to our Umamusume: Pretty Derby dedicated page! Here you will find the best builds, updated meta-analysis, training guides, support card recommendations, and competitive strategies to help you win more races!</p>
                </article>
            </div>
            </section>
        </div>
    )
}

export default MainPage