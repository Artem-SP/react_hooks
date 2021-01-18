import React from "react";

function sum(n) {
  console.log(n);
  return n + n;
}

function Post({ title, name, email, body }) {
  const [num, setNum] = React.useState();
  const [isGreen, setIsGreen] = React.useState(false);
  const countSum = React.useMemo(() => sum(num), [num]);

  return (
    <div className="article-content">
      <div className="article-title">
        <a href="/">{title}</a>
        <a href="/">{name}</a>
      </div>
      <p
        className="article-text"
        style={{ color: isGreen ? "green" : "red" }}
        onClick={() => setIsGreen(!isGreen)}
      >
        {body}
        {email}
      </p>
      {countSum}
      <button onClick={() => setNum(num + 1)}>+</button>
    </div>
  );
}
export default Post;
//export default React.memo(Post);
