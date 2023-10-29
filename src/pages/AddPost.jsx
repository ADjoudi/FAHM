import "../styles/AddPost.scss";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddPost() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("edit");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [post, setPost] = useState({
    title: { id: "post_title", tag: "h1", content: "" },
    content: [{ id: "default", tag: "p", content: "" }],
  });
  const navigate = useNavigate();
  const tabs = [
    { id: "edit", title: "Edit" },
    { id: "preview", title: "Preview" },
  ];
  function handleTabClick(e) {
    setTab(e.currentTarget.id);
    navigate(`/${user.id}/add-post/${e.currentTarget.id}`);
  }
  async function savePost(e) {
    const newPost = {
      title: post.title.content,
      content: post.content,
      author: user.id,
      comments: [],
      published: false,
    };
    console.log(newPost);
    if (e.target.id === "publish") newPost.published = true;

    try {
      const response = await fetch(
        `http://localhost:3000/users/${user.id}/posts`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "omit", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(newPost), // body data type must match "Content-Type" header
        }
      );
      if (!response.ok) {
        console.log(await response.json());
        throw new Error(`HTTP error: with status ${response.status}`);
      }
      navigate(`/profile`);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
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
          setToken(null);
          navigate("/login");
        }
        const user = await response.json();
        setUser(user);
      } catch (err) {
        throw new Error(err);
      }
    }
    if (token) getUser();
  }, [token, navigate]);
  return (
    <div className="add-post-page">
      <Header user={user} />
      <div className="edit-header">
        <div className="tabs">
          {tabs.map((link, index) =>
            link.id === tab ? (
              <div
                className="tab"
                key={index}
                id={link.id}
                onClick={handleTabClick}
              >
                <h3 style={{ fontWeight: 600 }}>{link.title}</h3>
                <div className="line"></div>
              </div>
            ) : (
              <div
                className="tab"
                key={index}
                id={link.id}
                onClick={handleTabClick}
              >
                <h3>{link.title}</h3>
                <div className="line" style={{ opacity: 0 }}></div>
              </div>
            )
          )}
        </div>
        <div className="actions">
          <div id="save" onClick={savePost}>
            Save
          </div>
          <div id="publish" onClick={savePost}>
            Publish
          </div>
        </div>
      </div>
      <Outlet context={[post, setPost]} />
    </div>
  );
}
