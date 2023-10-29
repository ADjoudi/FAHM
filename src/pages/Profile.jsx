import "../styles/Profile.scss";
import Header from "../components/Header";
import svg_bookmark from "../assets/bookmark.svg";
import svg_bookmark_filled from "../assets/bookmark-filled.svg";
import svg_archive from "../assets/archive.svg";
import svg_archive_filled from "../assets/archive-filled.svg";
import svg_comments from "../assets/comments.svg";
import svg_comments_filled from "../assets/comments-filled.svg";
import svg_logout from "../assets/logout.svg";

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Profile() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("posts");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fill = {
    posts: { empty: svg_archive, fill: svg_archive_filled },
    bookmarks: { empty: svg_bookmark, fill: svg_bookmark_filled },
    comments: { empty: svg_comments, fill: svg_comments_filled },
  };
  const links = [
    { id: "posts", title: "My Posts", image: svg_archive },
    { id: "bookmarks", title: "Bookmarks", image: svg_bookmark },
    { id: "comments", title: "Comments", image: svg_comments },
  ];

  function handleNavClick(e) {
    setPage(e.currentTarget.id);
    navigate(`/profile/${e.currentTarget.id}`);
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    setToken(null);
  }
  useEffect(() => {
    function getData() {
      const options = {
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
      };
      fetch("http://localhost:3000/users/user", options)
        .then((response) => response.json())
        .then((user) => {
          setUser(user);
          return fetch(
            `http://localhost:3000/users/${user.id}/${page}`,
            options
          );
        })
        .then((response) => response.json())
        .then((data) => setData(data[page]))
        .catch((error) => console.error(error));
    }
    if (!token) {
      console.log("redirecting,,,,,,,", token);
      navigate("/login");
    } else {
      getData();
    }
  }, [token, navigate, page]);
  return (
    <div className="profile-page">
      <Header user={user} />
      <div className="profile-header">
        <h1>{page.toUpperCase()}</h1>
        <div className="line"></div>
      </div>
      <div className="nav-container">
        <nav>
          {links.map((link, index) =>
            link.id === page ? (
              <div key={index} id={link.id} onClick={handleNavClick}>
                <img src={fill[link.id].fill} alt="" />
                <h3 style={{ fontWeight: 600 }}>{link.title}</h3>
              </div>
            ) : (
              <div key={index} id={link.id} onClick={handleNavClick}>
                <img src={link.image} alt="" />
                <h3>{link.title}</h3>
              </div>
            )
          )}
          <div id="logout" className="logout" onClick={handleLogOut}>
            <img src={svg_logout} alt="" />
            <h3>LOG OUT</h3>
          </div>
        </nav>
      </div>

      <Outlet context={data} />
    </div>
  );
}
export default Profile;
