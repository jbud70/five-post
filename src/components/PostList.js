import React from 'react';
import PostRow from './PostRow';
import styles from '../css/App.css';
import axios from 'axios';
const noImage = require( '../img/no_image.png' );
const loader = require( '../img/loader3.svg' );

class PostList extends React.Component{
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPostList();
    }

    getPostList() {
        const dataURL = WPSettings.root + "wp/v2/posts/?per_page=5&_embed";
        const th = this;
        const loader = document.getElementById(styles.loader);
        
        loader.style.display = 'block';

        axios.get(dataURL)
        .then((response) => {
            th.setState({
                posts: response.data
            });
            loader.style.display = 'none';
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        let posts = this.state.posts.map((post, index) => 
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
                         handleGetPostList={this.getPostList.bind(this)}
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

export default PostList;