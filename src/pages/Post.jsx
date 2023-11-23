import "../styles/Post.scss";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Post() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [post, setPost] = useState();
  const [user, setUser] = useState(null);
  const { post_id } = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${post_id}`, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "omit", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        if (!response.ok) {
          throw new Error(`HTTP error: with status ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setPost(data.post);
      } catch (err) {
        console.error(err);
      }
    }
    async function getUser() {
      try {
        const response = await fetch("http://localhost:3000/users/user", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "omit", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        if (!response.ok) {
          throw new Error(`HTTP error: with status ${response.status}`);
        }
        const user = await response.json();
        setUser(user);
      } catch (err) {
        throw new Error(err);
      }
    }
    getPost();
    if (!token) return;
    getUser();
    return () => {
      setToken(null);
    };
  }, [post_id, token]);

  return (
    <div className="post-page">
      <Header user={user} />
      {post ? (
        <>
          <div className="post-header">
            <h3>
              <Link to="/">Home</Link> /
            </h3>
            <h1>{post.title}</h1>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="line"></div>
          <section className="comments-container">
            <header>
              <h3>COMMENTS</h3>
              <select>
                <option>Latest</option>
              </select>
            </header>
            <div className="comments"></div>
          </section>
        </>
      ) : (
        <>
          <div className="post-header">
            <h3>
              <Link to="/">Home</Link> /
            </h3>
            <h1>Post Not Found</h1>
          </div>
        </>
      )}
    </div>
  );
}
export default Post;
