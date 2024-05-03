import React from 'react'
import { Alert, Button, FloatingLabel, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap';
import styles from '../../styles/CastCrew.module.css';


const CastCrew = ({movie}) => {
    const defaultPic = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

    
  return (
    <>
        <section className={styles['movie-cast-and-crew-container']}>
            <div className={styles['movie-cast-and-crew']}>
                <div className={styles['movie-person-scroller']}>
                    <Tabs id={styles['tab-bar']}>
                        <Tab eventKey="Cast" title="Cast">
                    {/* list in her going through each person */}
                    <ol className={styles['people']}>
                        {movie.people.cast/*.slice(0,10)*/?.map((person, index) => (
                            <li key={`${person.actorId}-${index}`} className={styles['person-card']}>
                                    <img
                                    src={person.actorPicture === 'https://image.tmdb.org/t/p/originalnull' ? defaultPic : person.actorPicture}
                                    alt={person.actorName}
                                    className={styles['person-image']}
                                />
                                <div className={styles['person-info']}>
                                    <p className={styles['person-name']}> {`${person.actorName}`} </p>
                                    <p className={styles['person-role']}> {`${person.role[0]}`} </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    </Tab>
                    <Tab eventKey="Crew" title="Crew">
                    <ol className={styles['people']}>
                        {movie.people.director.concat(movie.people.screenplay)?.map((person, index) => (
                            <li key={`${person.directorId || person.screenplayId}-${index}`} className={styles['person-card']}>
                                <img
                                    src={
                                        person.directorPicture === 'https://image.tmdb.org/t/p/originalnull' || person.screenplayPicture === 'https://image.tmdb.org/t/p/originalnull'
                                        ? defaultPic
                                        : person.directorPicture || person.screenplayPicture
                                    }
                                    alt={
                                        person.directorName === 'https://image.tmdb.org/t/p/originalnull' || person.screenplayName === 'https://image.tmdb.org/t/p/originalnull'
                                        ? 'Default Name'
                                        : person.directorName || person.screenplayName
                                    }
                                    className={styles["person-image"]}
                                />
                                <div className={styles['person-info']}>
                                    <p className={styles['person-name']}> {`${person.directorName || person.screenplayName}`} </p>
                                    <p className={styles['person-role']}> {`${person.role[0]}`} </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    </Tab>
                    </Tabs>
                </div>
            </div>
        </section>
    </>
  )
}

export default CastCrew