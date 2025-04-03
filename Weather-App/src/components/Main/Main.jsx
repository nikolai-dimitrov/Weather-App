import { Popup } from "../Popup/Popup";

import { AnimatePresence } from "motion/react";

import styles from "./main.module.css";
export const Main = ({ error, clearError, unit }) => {
    return (
        <>
            <section>
                <AnimatePresence>
                    {error && <Popup message={error} clearError={clearError} />}
                </AnimatePresence>
                <h1>Main section</h1>
            </section>
        </>
    )
}