import { useState } from "react";

import { IoMdPartlySunny } from "react-icons/io";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

import styles from "./navbar.module.css";

export const Navbar = ({ fetchWeatherWithCurrentLocation, searchWeatherFormSubmitHandler }) => {
    const [searchedLocation, setSearchedLocation] = useState({
        location: '',
    });

    const onChangeHandler = (e) => {
        setSearchedLocation((state) => ({ location: e.target.value }))

    };

    return (
        <>
            <nav>
                <div className={styles.logoContainer}>
                    <IoMdPartlySunny size={50} />
                    <span>WeatherNow</span>
                </div>
                <form className={styles.searchForm} onSubmit={(e) => searchWeatherFormSubmitHandler(e, searchedLocation)}>
                    <div className={styles.inputWrapper}>
                        <input type="text" placeholder="Search Locations" name="city" onChange={onChangeHandler} />
                        <button className={styles.searchBtn} type="submit">
                            <FaSearch size={20} />
                        </button>
                    </div>
                    <button className={styles.locationBtn} type="button" onClick={fetchWeatherWithCurrentLocation}>
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