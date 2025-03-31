import { IoMdPartlySunny } from "react-icons/io";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import styles from "./navbar.module.css";

export const Navbar = ({ fetchWeatherWithCurrentLocation}) => {
    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <nav>
                <div className={styles.logoContainer}>
                    <IoMdPartlySunny size={50} />
                    <span>WeatherNow</span>
                </div>
                <form className={styles.searchForm} onSubmit={submitHandler}>
                    <div className={styles.inputWrapper}>
                        <input type="text" placeholder="Search Locations" />
                        <button className={styles.searchBtn}>
                            <FaSearch size={20} />
                        </button>
                    </div>
                    <button className={styles.locationBtn} onClick={fetchWeatherWithCurrentLocation}>
                        <BiCurrentLocation size={30} />
                    </button>
                </form>
                <div className={styles.metricsContainer}>
                    <button>°C</button>
                    <span>/</span>
                    <button>°F</button>
                </div>
            </nav>
        </>
    )
}