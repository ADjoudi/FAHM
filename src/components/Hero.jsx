import "../styles/Hero.scss";
import Today from "../components/Today";

function Hero({ handlePostClick }) {
  const posts = [
    {
      _id: 1,
      title: "How to optimize your code reviews",
      author: "type id",
    },
    {
      _id: 2,
      title: "How to optimize your code reviews",
      author: "type id",
    },
    {
      _id: 3,
      title: "How to optimize your code reviews",
      author: "type id",
    },
    {
      _id: 4,
      title: "How to optimize your code reviews",
      author: "type id",
    },
    {
      _id: 5,
      title: "How to optimize your code reviews",
      author: "type id",
    },
  ];
  const topPost = posts[0];
  posts.shift();
  return (
    <>
      <header className="hero-title">
        <h1>ANTHOLOGY</h1>
        <div className="line"></div>
        <Today />
      </header>
      <div className="content">
        <div
          key={topPost._id}
          id={topPost._id}
          className="item"
          onClick={handlePostClick}
        >
          <div className="container"></div>
          <h4>{topPost.author}</h4>
          <h2>{topPost.title}</h2>
        </div>
        {posts.map((post) => (
          <div
            key={post._id}
            id={post._id}
            className="item"
            onClick={handlePostClick}
          >
            <div className="container"></div>
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
export default Hero;
