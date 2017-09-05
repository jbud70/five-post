import React from 'react';
import PostRow from './PostRow';
import styles from '../css/App.css';
import { connect } from 'react-redux';
import { getPosts } from '../actions/index';
import { bindActionCreators } from 'redux';
const noImage = require( '../img/no_image.png' );
const loader = require( '../img/loader3.svg' );

class PostList extends React.Component{
    componentDidMount() {
        this.props.getPosts();
    }
    
    render() {
        let posts = this.props.allPosts.map((post, index) => 
        {
            // Generate Image URL
            let image_url = "";

            if(post._embedded['wp:featuredmedia'])
            {
                image_url = post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
            }
            else
            {
                image_url = noImage;
            }
            
            return (
                <PostRow key={index} 
                         imgURL={image_url} 
                         title={post.title.rendered} 
                         date={post.date}
                         postID={post.id}
                         rowNum={index + 1} />
            )
        });
        
        return (           
            <div>
                <div id={styles.loader}><img src={loader} /></div>
                <div>
                    {posts}
                </div>
            </div>
        )
    }
}

let mapStateToProps = ({ allPosts }) =>
{
    return { allPosts };
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPosts: getPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);