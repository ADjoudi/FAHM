import "../styles/Posts.scss";
import open from "../assets/open.svg";

function Posts({ posts, handlePostClick }) {
  return (
    <div className="posts">
      <h1>LATEST</h1>
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            id={post._id}
            className="tuple"
            onClick={handlePostClick}
          >
            <h3>{post.title}</h3>
            <img src={open} alt="->" />
          </div>
        ))}
      <div className="line"></div>
    </div>
  );
}
export default Posts;
