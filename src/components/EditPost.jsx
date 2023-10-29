import { useEffect, useState } from "react";
import "../styles/AddPost.scss";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext } from "react-router-dom";

function EditPost() {
  const [focusID, setFocusID] = useState(uuidv4());
  const [post, setPost] = useOutletContext();

  function handleKeyDown(e) {
    console.log(e.key);
    if (e.key === "Enter") {
      setPost((prev) => {
        const item = prev.content.filter((item) => item.id === e.target.id);
        const index = prev.content.indexOf(item[0]);
        const id = uuidv4();

        const arr = [
          ...prev.content.slice(0, index + 1),
          { id: id, tag: "p", content: "" },
          ...prev.content.slice(index + 1),
        ];
        setFocusID(id);
        return { ...prev, content: arr };
      });
    }
    if (e.key === "Backspace" && !e.target.value && e.target.id !== "default") {
      e.preventDefault();
      setPost((prev) => {
        const arr = prev.content.reduce((arr, item) => {
          if (item.id !== e.target.id) {
            return [...arr, item];
          } else {
            setFocusID(prev.content[prev.content.indexOf(item) - 1].id);
            return arr;
          }
        }, []);
        return { ...prev, content: arr };
      });
    }
  }

  function handleTitleChange(e) {
    setPost((prev) => ({
      ...prev,
      title: { ...prev.title, content: e.target.value },
    }));
  }
  function handleChange(e) {
    setPost((prev) => {
      const arr = prev.content.map((tuple) => {
        if (tuple.id === e.target.id) {
          return { ...tuple, content: e.target.value };
        } else {
          return tuple;
        }
      });
      return { ...prev, content: arr };
    });
  }
  useEffect(() => {
    const input = document.getElementById(focusID);
    if (input) input.focus();
  }, [focusID]);
  return (
    <div className="edit-post-container">
      <input
        id={post.title.id}
        placeholder="TITLE"
        value={post.title.content}
        className={post.title.tag}
        onChange={handleTitleChange}
      />
      {post.content.map((tuple) => (
        <input
          key={tuple.id}
          id={tuple.id}
          className={tuple.tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={tuple.content}
          placeholder="-  -   -"
        />
      ))}
    </div>
  );
}

export default EditPost;
