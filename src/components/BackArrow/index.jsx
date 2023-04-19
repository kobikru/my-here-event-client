import { HiArrowNarrowLeft } from 'react-icons/hi';
import styles from "./style.module.css";
import { useNavigate } from 'react-router-dom';


export default function BackArrow({ color }) {

    const navigate = useNavigate()

    const handleNavigate = () => {
        const currentLocation = window.location.pathname;
        if (currentLocation === '/registeretion') {
            navigate('/login')
        } else {
            navigate(-1)
        }
    }
    return (
        <div className={styles.arrowBack} onClick={handleNavigate} style={{ color: color, position:'absolute', top: '40px', right: '230px' }}><HiArrowNarrowLeft className={styles.icon}/></div>
    )
}


