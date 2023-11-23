import "../styles/AddPost.scss";
import { useOutletContext } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useOutletContext();

  function handleTitleChange(e) {
    setPost((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }
  function handleContentChange(e) {
    setPost((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  }
  return (
    <div className="edit-post-container">
      <input
        id="post_title"
        placeholder="TITLE"
        value={post.title}
        onChange={handleTitleChange}
      />
      <textarea
        id="post_content"
        value={post.content}
        onChange={handleContentChange}
        placeholder="-  -   -"
      />
    </div>
  );
}

export default EditPost;
