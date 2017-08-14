import React from 'react';
import styles from '../css/App.css';
const mainLogo = require( '../img/fp_logo.png' );

class Header extends React.Component{
    render() {
        return(
            <div id={styles.header} >
                <h1>Five Post </h1>
            </div>
        )
    }
}

export default Header;