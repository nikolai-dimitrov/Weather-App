import { Popup } from "../Popup/Popup";

import styles from "./main.module.css";
export const Main = ({ error, clearError }) => {
    return (
        <>
            <section>
                {error && <Popup message={error} clearError={clearError} />}
                <h1>Main section</h1>
            </section>
        </>
    )
}