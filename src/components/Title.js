import React from 'react';
import styles from '../css/App.css';

class Title extends React.Component {
    render() {
        return(
            <div className={styles.postRowTitle}>
                {this.props.titleText}
            </div>
        )
    }
}

export default Title;