import styles from './maintenance-screen.module.scss'
import Button from "../buttons/Button";
import { useEffect , useState } from "react";
import { ArrowDownIcon } from "../../icons";

export default function MaintenanceScreen () {
    const [isVisible, setIsVisible] = useState(false)

    let currentScreen = 'Possible screen 1'
    const screensData = ['Possible screen 1', 'Possible screen 2', 'Possible screen 3']
    const someFetch = () => {}
    const someFetch1 = () => {}
    const someFetch2 = () => {}

    useEffect(() => {
        someFetch1()
    }, [])

    const handleChoice = (e) => {
        someFetch()

        setIsVisible(prevVisibility => !prevVisibility)
    }

    return (
        <div className={styles.maintenanceScreen}>
            <div className={styles.maintenanceScreen__body}>
                <div className={styles.maintenanceScreen__content}>
                    <div className={styles.maintenanceScreen__title}>
                        Current maintenance screen:
                    </div>
                    <div className={styles.currentScreen} onClick={() => setIsVisible(prevVisibility => !prevVisibility)}>
                        <span className={styles.currentScreen__text}>{ currentScreen }</span>
                        <ArrowDownIcon className={styles.currentScreen__icon} isOpen={isVisible}/>
                    </div>
                    <div className={styles.dropDown + ' ' + (isVisible ? styles.dropDown__visible : styles.dropDown__hidden)}>
                        <div className={styles.dropDown__body}>
                            { screensData.map(screen => (<span onClick={handleChoice} className={styles.innerScreen}>{screen}</span>)) }
                        </div>
                    </div>
                </div>
                <Button className={styles.maintenanceScreen__button} onClick={() => {someFetch2()}} text={'Update JIRA Status'}/>
            </div>
        </div>
    )
}