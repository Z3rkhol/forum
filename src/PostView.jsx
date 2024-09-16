import { useState } from 'react';
import PropTypes from 'prop-types';
import './PostView.css';

const PostView = ({ post, goBack, upvotePost, downvotePost }) => {
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState('');

    const addComment = () => {
        const newComments = [...comments, comment];
        setComments(newComments);
        setComment('');
    };

    return (
        <div className="post-view">
            <div className="back-arrow" onClick={goBack}>&larr;</div>
            <h2>{post.title}</h2>
            <p>by {post.author}</p>
            <p>{post.content}</p>
            <div className="vote-buttons">
                <button onClick={upvotePost}>Upvote</button>
                <button onClick={downvotePost}>Downvote</button>
                <span className="vote-count">Votes: {post.votes || 0}</span>
            </div>
            <h3>Comments</h3>
            <ul>
                {comments.map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

PostView.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(PropTypes.string).isRequired,
        votes: PropTypes.number,
    }).isRequired,
    goBack: PropTypes.func.isRequired,
    upvotePost: PropTypes.func.isRequired,
    downvotePost: PropTypes.func.isRequired,
};

export default PostView;