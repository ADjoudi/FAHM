import { useOutletContext } from "react-router-dom";
import "../styles/AddPost.scss";

export default function Preview() {
  const [post] = useOutletContext();
  const article = post.content;
  const regex = /<*<*.+<*<*/gim;
  console.log(article.match(regex));

  return (
    <div className="preview-container">
      <div className="title-container">
        <h1>{post.title}</h1>
        
      </div>
    </div>
  );
}
