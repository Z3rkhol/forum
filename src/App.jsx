import { useState, useEffect } from 'react';
import PostList from './PostList';
import CreatePost from './CreatePost';
import PostView from './PostView';
import './App.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [userVotes, setUserVotes] = useState({});

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const storedVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
        setPosts(storedPosts);
        setUserVotes(storedVotes);
    }, []);

    const addPost = (post) => {
        const newPosts = [...posts, post];
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
    };

    const selectPost = (post) => {
        setSelectedPost(post);
    };

    const goBack = () => {
        setSelectedPost(null);
    };

    const hasVoted = (postId) => {
        return userVotes[postId];
    };

    const upvotePost = (index) => {
        const postId = posts[index].id;
        if (hasVoted(postId)) return;

        const newPosts = [...posts];
        newPosts[index].votes = (newPosts[index].votes || 0) + 1;
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));

        const newUserVotes = { ...userVotes, [postId]: true };
        setUserVotes(newUserVotes);
        localStorage.setItem('userVotes', JSON.stringify(newUserVotes));
    };

    const downvotePost = (index) => {
        const postId = posts[index].id;
        if (hasVoted(postId)) return;

        const newPosts = [...posts];
        newPosts[index].votes = (newPosts[index].votes || 0) - 1;
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));

        const newUserVotes = { ...userVotes, [postId]: true };
        setUserVotes(newUserVotes);
        localStorage.setItem('userVotes', JSON.stringify(newUserVotes));
    };

    return (
        <div>
            <h1>Forum</h1>
            {selectedPost ? (
                <PostView
                    post={selectedPost}
                    goBack={goBack}
                    upvotePost={() => upvotePost(posts.indexOf(selectedPost))}
                    downvotePost={() => downvotePost(posts.indexOf(selectedPost))}
                />
            ) : (
                <div className="main-container">
                    <CreatePost addPost={addPost} />
                    <div className="divider"></div>
                    <PostList posts={posts} selectPost={selectPost} />
                </div>
            )}
        </div>
    );
};

export default App;