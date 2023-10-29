import "../styles/Comments.scss";
import Today from "../components/Today";
import { useOutletContext } from "react-router-dom";

export default function Comments() {
  const data = useOutletContext();
  return (
    <div className="profile-content comments-container">
      <Today />
      {data.map((comment) => (
        <div key={comment._id} className="post-container">
          <div className="post-content">
            <h3>{comment.author.first_name}</h3>
            {/* {TODO:: add correct date} */}
            <h4>{new Date().toLocaleString()}</h4>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
