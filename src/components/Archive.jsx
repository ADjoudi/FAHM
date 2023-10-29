import "../styles/Archive.scss";
import Today from "../components/Today";
import { useOutletContext } from "react-router-dom";
import svg_comments from "../assets/comments.svg";

export default function Archive() {
  const data = useOutletContext();
  return (
    <div className="profile-content posts-container">
      <Today />
      {data.map((post) => (
        <div key={post._id} className="post-container">
          <div className="impressions">
            {post.published ? (
              <>
                <img src={svg_comments} alt="" />
                <h3>{post.comments.length}</h3>
              </>
            ) : (
              <h2>UNPUBLISHED</h2>
            )}
          </div>
          <div className="post-content">
            <h3>{post.title}</h3>
            {/* {TODO:: add correct date} */}
            <h4>{new Date().toLocaleString()}</h4>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
