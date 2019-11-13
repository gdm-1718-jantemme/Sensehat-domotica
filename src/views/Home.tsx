import React, { useState, useEffect } from 'react'

// Style
import styles from '../css/home.module.css'
// Custom components
import SensorCard from '../components/SensorCard'
import LightsCard from '../components/LightsCard'
import PlugsCard from '../components/PlugsCard'
import DoorsCard from '../components/DoorsCard'
import Card from '../components/Card'

// DB
import db from '../db/db'

const Home = () => {
    const [alarm, setAlarm] = useState("rgb(145, 56, 56)");
    const [alarmRunning, setAlarmRunning] = useState(false);
    const [alarmToggler, setAlarmToggler] = useState(false);


    useEffect(() => {
        runAlarmProcess(alarmRunning, alarmToggler, setAlarmToggler)
        pushAlarmToDb(alarmRunning)
    }, [alarmRunning])

    useEffect(() => {
        runAlarmProcess(alarmRunning, alarmToggler, setAlarmToggler)
    }, [alarmToggler])

    return(
        <div className={styles.container}>
            <div className={styles.groupContainerBig}>
                <h1>Sensors</h1>
                <div className={styles.seperator}/>
                <div className={styles.cardsCluster}>
                    <SensorCard sensorValue={10.02} name={"Humidity"} unit={'%'} maxValue={100} />
                    <SensorCard sensorValue={32.42} name={"Temperature"} unit={'°'} maxValue={50} />
                </div>
            </div>
            <div className={styles.groupContainerSmall}>
                <h1>Lights</h1>
                <div className={styles.seperator}/>
                <LightsCard alarm={alarmToggler}/>
            </div>
            <div className={styles.groupContainerSmall}>
                <h1>Wall Outlets</h1>
                <div className={styles.seperator}/>
                <PlugsCard/>
            </div>
            <div className={styles.groupContainerSmall}>
                <h1>Door Locks</h1>
                <div className={styles.seperator}/>
                <DoorsCard alarm={alarmToggler}/>
            </div>
            <div className={styles.groupContainerSmall}>
                <h1>Intuder Alarm</h1>
                <div className={styles.seperator}/>
                <Card>
                    <div onClick={() => toggleAlarm(alarm, setAlarm, setAlarmRunning)} className={styles.button} style={{backgroundColor: alarm}}>
                        ALARM
                    </div>
                </Card>
            </div>
            
        </div>
        
    )
}

const runAlarmProcess = (alarmRunning: boolean, alarmToggler: boolean, setAlarmToggler: any) => {
    if(alarmRunning) {
        setTimeout(function() {
            setAlarmToggler(!alarmToggler)
            playAudio()
        }, 1400)
    }
}

const playAudio = () => {
    let audio = new Audio();
    audio.src = "alarm.mp3";
    audio.load();
    audio.play()
    
}

const toggleAlarm = (alarm: string, setAlarm: any, setAlarmRunning: any) => {
    if(alarm === "rgb(145, 56, 56)") {
        setAlarm("rgb(255, 47, 47)")
        setAlarmRunning(true)
    }
    else {
        setAlarm("rgb(145, 56, 56)")
        setAlarmRunning(false)
    }        
}

const pushAlarmToDb = (alarmRunning: boolean) => {
    db.collection("domotica").doc("alarm").update({
        alarmRunning: alarmRunning
    });
}

export default Home;
