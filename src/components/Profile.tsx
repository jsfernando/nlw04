import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/jsfernando.png" alt="JSFernando"/>
            <div>
                <strong>Fernando J Silva</strong>
                {/* todo arquivo que é colocado na pasta public ...é só usaro caminho do arquivo */}
                <p>
                    <img src="icons/level.svg" alt="Level"/> 
                    Level { level }
                </p>
            </div>
        </div>
    )
}