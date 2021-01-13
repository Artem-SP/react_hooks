import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import PostList from "./PostList";
import Footer from "./Footer";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function App() {
  const ref = useRef(1);
  const [posts, setPost] = useState([]);
  const [theme, setTeme] = useState("light");
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("posts");

  const change = () => {
    setTeme(theme === "light" ? "dark" : "light");
    setCheck(!check);
  };

  useEffect(() => {
    setTimeout(() => {
      document.title = `Page ${type}`;
    }, 300);

    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
      });

    return () => {
      document.title = "Page";
    };
  }, [type]);

  const handlerFocus = () => {
    ref.current.style.color = "red";
  };

  return (
    <div className={`app ${theme}`}>
      <div className="form">
        <input ref={ref} />
        <button onClick={handlerFocus}>Focus</button>
      </div>

      <Header changeType={setType} check={check} changeTheme={change} />
      <PostList posts={posts} />
      <Footer />
    </div>
  );
}

export default App;
