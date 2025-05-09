import { IoRefreshOutline } from "react-icons/io5";

import styles from "./error-screen.module.css"
export const ErrorScreen = () => {

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <h2>Something went wrong...</h2>
                <p>Please try again later.</p>
                <button
                    onClick={refreshPage}
                >
                    <IoRefreshOutline size={20} />
                    Refresh Page
                </button>

            </div>
        </>
    )
}