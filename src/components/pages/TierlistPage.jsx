import { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from '../../services/db'
import Tierlist from '../Tierlist'

const TierlistPage = () => {
    const [traineeTiers, setTraineeTiers] = useState([])
    const [supportsTiers, setSupportsTiers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTierlist, setActiveTierlist] = useState('trainee')

    useEffect(() => {
        const controller = new AbortController()
        const getTrainees = dbService.getData('trainee-tierlist', { signal: controller.signal})
        const getSupports = dbService.getData('support-tierlist', { signal: controller.signal})

        Promise.all([getTrainees, getSupports])
            .then(returnedData => {
                setTraineeTiers(returnedData[0])
                setSupportsTiers(returnedData[1])
            })
            .catch(error => {
                if(!axios.isCancel(error)) {
                   console.error(error) 
                }
            })
            .finally(() => setIsLoading(false))

        return() => controller.abort()
    },[]) 

    return(
        <div>
            <section className="tierlist-container">
                <div className="info-column">
                    <div className="info-card">
                        <header className="label-box">
                            <span className="welcome-label">Optimist trainees!</span>
                        </header>
                        
                        <div className="description-text">
                            <p>Explore our Overall Tier List for Umamusume: Pretty Derby, ranking characters based on current meta performance, consistency, and career difficulty. See who dominates in different race types and formats and choose the strongest options to maximize your competitive success.</p>
                        </div>
                    </div>
                    
                    <img src="/assets/images/miscellaneous/oguricap-chibi.png" alt="" className="floating-chibi"></img>
                </div>

                <div className="tierlist-column">
                    <div className="tabs-container">
                        <div 
                            className={activeTierlist === 'trainee' ? 'tab-active' : 'tab'}
                            onClick={() => setActiveTierlist('trainee')}>Trainees</div>
                        <div 
                            className={activeTierlist === 'support' ? 'tab-active' : 'tab'}
                            onClick={() => setActiveTierlist('support')}>Support Cards</div>
                    </div>
                    <table className="tierlist-table">
                        <tbody className="tierlist-body">
                            {
                                isLoading
                                ? null
                                :
                                    activeTierlist === 'trainee' 
                                    ? <Tierlist tierlist={traineeTiers} className={activeTierlist}></Tierlist> 
                                    : <Tierlist tierlist={supportsTiers} className={activeTierlist}></Tierlist>
                            }
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    )
}

export default TierlistPage