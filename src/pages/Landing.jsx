import "../styles/Landing.scss";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts", {
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
        const posts = await response.json();
        setPosts(posts);
      } catch (err) {
        throw new Error(err);
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

    getPosts();

    if (!token) return;
    getUser();
    return () => {
      setToken(null);
    };
  }, [token]);

  function handlePostClick(e) {
    navigate(`/post/${e.currentTarget.id}`);
  }
  return (
    <div className="landing">
      <Header user={user} />
      <Hero handlePostClick={handlePostClick} />
      <Posts posts={posts} handlePostClick={handlePostClick} />
    </div>
  );
}

export default Landing;
