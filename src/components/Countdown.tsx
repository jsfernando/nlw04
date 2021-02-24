import { useState, useEffect } from 'react'; // useEffect é um hook
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);

    const minutes =  Math.floor(time/60); // floor arredonda pra baixo
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){
        setActive(true); //mudando o estado quando o botão for clicado
    }

    // Os hooks(funcao) serve para disparar/executar efeitos colaterais 
        // (quando algo mudar ou quando algo acontecer) quero disparar algo
    // 2 parâmetros
    // 1- o que Eu quero executar e sempre será um função arrow function
    // 2- quando que Eu quero executar
    useEffect( ()=> {
        if(active && time > 0){
            setTimeout( ()=> {
                setTime(time -1);
            }, 1000)
        }
    }, [active, time]) // quero executar uma função ...sempre que o valor de active mudar...

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}>
                Iniciar um ciclo
            </button>
        </div>
    )
}