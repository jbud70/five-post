import React from 'react';
import Header from './Header';
import PostList from './PostList';
import styles from '../css/App.css';

class App extends React.Component {
	render() {
		return (
			<div id={styles.appContainer} >
				<Header />
				<PostList />
			</div>
		);
	}
}

export default App;