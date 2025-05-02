import { useState, useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

import { IoMdPartlySunny } from "react-icons/io";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

import styles from "./navbar.module.css";

export const Navbar = () => {
    const { geoLocationBtnClickHandler, searchFormSubmitHandler, disableLocationBtn, changeUnits } = useContext(WeatherContext);
    const [searchedLocation, setSearchedLocation] = useState({
        location: '',
    });

    const onChangeHandler = (e) => {
        setSearchedLocation((state) => ({ location: e.target.value }))

    };

    const clearInput = () => {
        setSearchedLocation((state) => ({ location: '' }))
    }

    return (
        <>
            <nav>
                <div className={styles.logoContainer}>
                    <IoMdPartlySunny size={50} />
                    <span>WeatherNow</span>
                </div>
                <form className={styles.searchForm} onSubmit={(e) => searchFormSubmitHandler(e, searchedLocation, clearInput)}>
                    <div className={styles.inputWrapper}>
                        <input type="text" placeholder="Search Locations" name="city" onChange={onChangeHandler} value={searchedLocation.location} />
                        <button className={styles.searchBtn} type="submit">
                            <FaSearch size={20} />
                        </button>
                    </div>
                    <button
                        type="button"
                        className={styles.locationBtn}
                        onClick={geoLocationBtnClickHandler}
                        disabled={disableLocationBtn}
                    >
                        <BiCurrentLocation size={30}
                        />
                    </button>
                </form>
                <div className={styles.metricsContainer}>
                    <button onClick={() => changeUnits("C")}>°C</button>
                    <span>/</span>
                    <button onClick={() => changeUnits("F")}>°F</button>
                </div>
            </nav>
        </>
    )
}