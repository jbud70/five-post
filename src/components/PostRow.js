import React from 'react';
import styles from '../css/App.css';
import axios from 'axios';
import classNames from 'classnames';
import jquery from 'jquery';
import { connect } from 'react-redux';
import { selectPost, getPosts } from '../actions/index';
import { bindActionCreators } from 'redux';
import TitleEditor from './TitleEditor';
const noImage = require( '../img/no_image.png' );

class PostRow extends React.Component{
    constructor() {
        super();
        this.state = {
            isEditing: false,
            isDeleting: false
        };

        this.updatePostTitle = this.updatePostTitle.bind(this);
    }

    confirmDelete() {
        this.setState({isEditing: false});
        this.setState({isDeleting: true});
    }

    deletePost() {
        const deleteURL = WPSettings.root + "wp/v2/posts/" + this.props.postID;
        const config = {
            headers: {'X-WP-Nonce': WPSettings.nonce}
        };

        axios.delete( deleteURL, config )
        .then( () => { 
            this.props.getPosts();
        })
        .then( () => {
            this.setState({isDeleting: false});
        });
    }

    cancelDelete() {
        this.setState({isDeleting: false});
    }

    updatePostTitle() {
        this.setState({isDeleting: false});
        this.setState({isEditing: true});
    }
    
    cancelEdit() {
        this.setState({isEditing: false});
    }

    render() {
        let titleState = null;
        let editButtonState = null;
        let deleteButtonState = null;

        if(this.state.isEditing) {
            titleState = <TitleEditor titleText={this.props.title} 
                                      editorId={this.props.postID}
                                      postID={this.props.postID}
                                      closeEditor={() => this.cancelEdit()}
                                     />;
            editButtonState = <CancelEditButton onClick={() => this.cancelEdit()} />;
        } 
        else {
            titleState = <Title titleText={this.props.title} />;
            editButtonState = <EditButton onClick={this.updatePostTitle} />;  
        }

        if(this.state.isDeleting){
            deleteButtonState = <ConfirmDelete onClickYes={() => this.deletePost()}
                                               onClickNo={() => this.cancelDelete()} />;
        }
        else {
            deleteButtonState = <DeleteButton onClick={() => this.confirmDelete()} />;
        }

        return (
            <div className={styles.postRow} >
                <div>
                    <div className={styles.postImage}><img src={this.props.imgURL} /></div>
                    <div className={styles.postInfo} >
                        {titleState}
                        <div className={styles.postDate} ><em>{this.props.date}</em></div>
                        {editButtonState}
                        {deleteButtonState}
                    </div>
                    <div className={styles.rowNum}>{this.props.rowNum}</div>
                </div>
            </div>
        )
    }
}

// Helper Components
let Title = (props) => {
    return(
        <div className={styles.postRowTitle}>
            {props.titleText}
        </div>
    )
}

let EditButton = (props) => {
    return(
        <div>
            <button onClick={props.onClick} className={classNames(styles.button,styles.buttonEditTitle)} >Edit Title</button>
            <br/>
        </div>
    )
}

let CancelEditButton = (props) => {
    return(
        <div>
            <button onClick={props.onClick} className={styles.button} >Cancel Edit</button>
            <br/>
        </div>
    )
}

let DeleteButton = (props) => {
    return(
        <button onClick={props.onClick} className={classNames(styles.button,styles.buttonDelete)} >Delete Post</button>
    )
}

let ConfirmDelete = (props) => {
    return(
        <div>
            <div className={styles.confirmDeleteMessage}>Are You Sure?</div>
            <button className={classNames(styles.button,styles.buttonYes)} onClick={props.onClickYes} >Yes</button>
            <button className={styles.button} onClick={props.onClickNo} >No</button>
        </div>
    )
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPosts: getPosts }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostRow);