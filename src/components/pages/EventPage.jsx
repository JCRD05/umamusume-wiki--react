const EventPage = () => {
    return (
        <section className="events-page-container">
            <div className="status-ribbon">Current events!</div>

            <div className="event-title-badge">
                "The Promised Hour: Silks & Three Riddles" is here!
            </div>

            <figure className="event-banner"></figure>

            <article className="event-details">
                <p>
                    In this story event, you can complete Careers to collect Event Points, 
                    which will earn you a variety of rewards, 
                    including copies of an event-exclusive SSR Support Card. 
                    As you progress through the event, you will also unlock episodes of an exclusive 
                    story to enjoy.
                </p>

                <section className="event-rewards">
                    <h3 className="section-label">Event rewards</h3>

                    <ul className="rewards-list">
                        <li>
                            <span>SSR Support Card [Day I Dreamed Of] Rice Shower.</span>
                            <span>400,000 points</span>
                        </li>

                        <li>
                            <span>Rainbow Crystal Shard x3</span>
                            <span>920,000 points</span>
                        </li>

                        <li>
                            <span>1500 Carats</span>
                            <span>1,000,000 points</span>
                        </li>
                    </ul>
                </section>

                <section className="reward-analysis">
                    <div className="analysis-text">
                        <h4>Is Rice Shower (Day I Dreamed Of) any good?</h4>
                        <p>As a Wit card, this card isn't the best option unless you have no other options or are just starting out. 
                            Shatterproof is not a very good skill and it only has 5% race bonus, making this a harder fit in Trackblazer decks. 
                            It also has low specialty priority, but is somewhat offset by its 10% Training Effectiveness from the perk.
                        </p>
                        <p>
                           It's still worth fully uncapping it to maximize the bonus points even if you don't level up and use it.
                        </p>
                    </div>
                    <div className="analysis-card-img">
                        Aqui va la imagen peche
                    </div>
                </section>


                <section className="event-bonuses">
                    <h3 className="section-label">Event bonuses</h3>

                    <div className="bonus-content">
                        <h5>
                            Remember to uncap your support cards!
                        </h5>
                        <p>
                            Instead of having to equip Support Cards that provide bonuses, players will instead automatically receive event bonuses, even if the bonus Support Cards are not equipped. The value of the bonuses you get is based on the maximum uncap level of the Support Cards that you own.                        </p>
                    </div>
                </section>
            </article>
        </section>
    )
}

export default EventPage