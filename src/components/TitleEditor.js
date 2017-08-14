import React from 'react';
import jquery from 'jquery';
import styles from '../css/App.css';

class TitleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.savePostEdit = this.savePostEdit.bind(this);
    }

    savePostEdit(evt) {
        evt.preventDefault();
        const updateURL = WPSettings.root + "wp/v2/posts/" + this.props.postID;
        const th = this;

        // Had to swtich to jquery on this one, Axios was not working for POSTs
        jQuery.ajax({
            type: 'POST',
            url: updateURL,
            data: {
                'title': this.titleInput.value,
            },
            beforeSend: function( xhr ) {
                xhr.setRequestHeader('X-WP-Nonce', WPSettings.nonce);
              }
            }).done(function(response) {
                th.props.closeEditor();
                th.props.refreshList();
            })
            .fail(function(e) {
                console.log( e );
        });

        // TODO: Find out why this throws a 401
        /* 
        const config = {
            headers: {'X-WP-Nonce': WPSettings.nonce},
            data: {'title': titleEditor.value}
        };

        axios.post( updateURL, config )
        .catch(error => {
            console.log(error.message);
        })
        .then( () => { 
            this.refreshList();
        })
        .then( () => {
            this.setState({isEditing: false});
        });
        */
    }

    render() {
        return (
            <div className={styles.titleEditor} >
                <form onSubmit={this.savePostEdit} className={styles.inlineForm} >
                    <div className={styles.titleInput} >
                        <input id={"editID" + this.props.editorId} 
                            type="text" defaultValue={this.props.titleText}
                            ref={(input) => { this.titleInput = input; }}
                            size="40" />
                    </div>
                    <div className={styles.titleSubmit} >
                        <button type="submit">Save Title</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default TitleEditor;