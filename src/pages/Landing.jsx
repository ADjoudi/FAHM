import "../styles/Landing.scss";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Posts from "../components/Posts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
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
    getUser();
    return () => {
      setToken(null);
    };
  }, [token]);

  function handlePostClick(e) {
    navigate(`/post/${e.target.id}`);
  }
  return (
    <div className="landing">
      <Header user={user} />
      <Hero handlePostClick={handlePostClick} />
      <Posts posts={user} handlePostClick={handlePostClick} />
    </div>
  );
}

export default Landing;
