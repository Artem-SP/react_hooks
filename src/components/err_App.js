import React, {
  useEffect,
  useRef,
  useContext,
  useReducer,
  useCallback
} from "react";
import Header from "./Header";
import PostList from "./PostList";
import Footer from "./Footer";
import ThemeContext from "../context";

function reducer(state, action) {
  switch (action.type) {
    case "fetch":
      return { ...state, posts: action.payload };

    case "posts":
      return { ...state, type: action.type };

    case "users":
      return { ...state, type: action.type };

    case "check":
      return { ...state, check: !state.check };

    case "recet":
      return init(action.payload);

    default:
      return state;
  }
}

function init(state) {
  console.log(state);
  return { ...state };
}

function App() {
  const ref = useRef(null);
  // const [posts, setPost] = useState([]);
  // const [check, setCheck] = useState(false);
  // const [type, setType] = useState("posts");

  const [data, dispatch] = useReducer(
    reducer,
    {
      posts: [],
      check: false,
      type: "posts"
    },
    init
  );

  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    console.log(data);
    // dispatch({
    //   type: "reset",
    //   payload: { posts: [], check: true, type: "posts" }
    // });
    setTimeout(() => {
      document.title = `Page ${data.type}`;
    }, 300);

    fetch(`https://jsonplaceholder.typicode.com/${data.type}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "fetch", payload: json });
      });

    return () => {
      document.title = "Page";
    };
  }, [data.type]);

  const change = () => {
    setTheme(theme === "light" ? "dark" : "light");
    dispatch({ type: "check" });
  };

  const handlerFocus = () => {
    ref.current.style.color = "red";
  };

  const setType = (type) => {
    dispatch({ type });
  };

  return (
    <div className={`app ${theme}`}>
      <div className="form">
        <input ref={ref} />
        <button onClick={handlerFocus}>Focus</button>
      </div>

      <Header changeType={setType} check={data.check} changeTheme={change} />
      <PostList posts={data.posts} />
      <Footer />
    </div>
  );
}

export default React.memo(App, () => true);
