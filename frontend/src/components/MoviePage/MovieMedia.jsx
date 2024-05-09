import React from 'react'
import { Alert, Button, FloatingLabel, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap';

import styles from '../../styles/MovieMedia.module.css';

const MovieMedia = ({movie}) => {

  return (
    <>
        <div className={styles['movie-media-menu']}>
            <div className={styles['media-scroller']}>
                <Tabs id={styles['tab-bar2']}>
                    <Tab eventKey="Posters" title="Posters">
                        <ol className={styles['media']}>
                            {movie.posters.slice(0,20)?.map((poster) => (
                                <li key={poster} className={styles['poster-card']}>
                                        <img
                                        src={poster}
                                        className={styles['poster-image']}
                                    />
                                </li>
                            ))}
                        </ol>
                        (All Posters link)
                    </Tab>
                    <Tab eventKey="Backdrops" title="Backdrops">
                        <ol className={styles['media']}>
                            {movie.backdrops.slice(0,20)?.map((backdrop) => (
                                <li key={backdrop} className={styles['backdrop-card']}>
                                        <img
                                        src={backdrop}
                                        className={styles['backdrop-image']}
                                    />
                                </li>
                            ))}
                        </ol>
                        (All Backdrops link)
                    </Tab>
                    <Tab eventKey="Logos" title="Logos">
                        <ol className={styles['media']}>
                            {movie.logos.slice(0,20)?.map((logo) => (
                                <li key={logo} className={styles['logo-card']}>
                                        <img
                                        src={logo}
                                        className={styles['logo-image']}
                                    />
                                </li>
                            ))}
                        </ol>
                        (All Logos link)
                    </Tab>
                    <Tab eventKey="Videos" title="Videos">
                            
                    </Tab>
                </Tabs>
            </div>
        </div>
    </>
  )
}

export default MovieMedia