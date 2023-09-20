import React from 'react'
import classes from './NavigationButton.module.css'

const NavigationButton = (props) => {
    return(
        <button className={classes.navBut}>
                {props.children}
        </button>
    )
}
export default NavigationButton;