import { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from '../../services/db'
import BannerDataSheet from '../dataSheets/BannerDataSheet'

const BannerPage = () => {
    const [banners, setBanners] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()

        dbService
            .getData('banner', { signal: controller.signal})
            .then(returnedBanners => {
                setBanners(returnedBanners)
            })
            .catch(error => {
                if(!axios.isCancel(error)) {
                    console.error(error)
                }
            })
            .finally(() => setIsLoading(false))
    }, [])
    
    return(
        <div>
            <section className="page-header">
                <div className="title-ribbon">
                    <h1>Upcoming Banners</h1>
                </div>
            </section>

            <section className="page-description">
                <p>Stay ahead of the game with our schedule of upcoming banners for the global server. Plan out by previewing future Trainees and Support Cards arriving soon to the stable.</p>
            </section>

            <section className="data-table-container">
                <table className="banners-table">
                    <thead>
                        <tr>
                            <th>Banner</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody className="data-body">
                        {
                            isLoading
                            ? null
                            : <BannerDataSheet data={banners}></BannerDataSheet>
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default BannerPage