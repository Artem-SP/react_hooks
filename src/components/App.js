import React, { useState, useEffect } from "react";
import Header from "./Header";
import PostList from "./PostList";
import Footer from "./Footer";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function App() {
  const [posts, setPost] = useState([]);
  const [theme, setTeme] = useState("light");
  const [check, setCheck] = useState(false);

  const change = () => {
    setTeme(theme === "light" ? "dark" : "light");
    setCheck(!check);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
      });
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Header check={check} changeTheme={change} />
      <PostList posts={posts} />
      <Footer />
    </div>
  );
}

export default App;
