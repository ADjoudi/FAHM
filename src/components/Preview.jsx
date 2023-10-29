import { useOutletContext } from "react-router-dom";
import "../styles/AddPost.scss";

export default function Preview() {
  const [post] = useOutletContext();
  function customTag(tuple) {
    const Tag = tuple.tag;
    return (
      <Tag key={tuple.id} id={tuple.id}>
        {tuple.content}
      </Tag>
    );
  }
  return (
    <div className="preview-container">
      <div className="title-container">{customTag(post.title)}</div>
      {post.content.map((tuple) => {
        return customTag(tuple);
      })}
    </div>
  );
}
