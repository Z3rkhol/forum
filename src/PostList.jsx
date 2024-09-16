import { useState } from 'react';
import PropTypes from 'prop-types';

const PostList = ({ posts, selectPost }) => {
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === 'desc') {
            return b.title.localeCompare(a.title);
        } else if (sortOrder === 'mostUpvoted') {
            return (b.votes || 0) - (a.votes || 0);
        } else if (sortOrder === 'mostDownvoted') {
            return (a.votes || 0) - (b.votes || 0);
        }
    });

    return (
        <div>
            <h2>Přehled příspěvků</h2>
            <div>
                <label>Možnost řazení: </label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="mostUpvoted">Most Upvoted</option>
                    <option value="mostDownvoted">Most Downvoted</option>
                </select>
            </div>
            <ul>
                {sortedPosts.map((post, index) => (
                    <li key={index} onClick={() => selectPost(post)}>
                        {post.title} by {post.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            comments: PropTypes.arrayOf(PropTypes.string).isRequired,
            votes: PropTypes.number,
        })
    ).isRequired,
    selectPost: PropTypes.func.isRequired,
};

export default PostList;