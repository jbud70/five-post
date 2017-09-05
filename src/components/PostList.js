import React from 'react';
import PostRow from './PostRow';
import styles from '../css/App.css';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { bindActionCreators } from 'redux';
const noImage = require( '../img/no_image.png' );
const loader = require( '../img/loader3.svg' );

class PostList extends React.Component{
    componentDidMount() {
        this.props.fetchPosts();
    }
    
    render() {
        if (this.props.hasErrored) {
            return <p>An error has occured fetching the posts.</p>;
        }

        if (this.props.isLoading) {
            return (
                <div id={styles.loader}>
                    <img src={loader} />
                </div>
            );
        }

        let postList = this.props.posts.map((post, index) => 
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
                <div>
                    {postList}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) =>
{
    return {
        posts: state.posts,
        hasErrored: state.postsHasErrored,
        isLoading: state.postsIsFetching
    };
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);