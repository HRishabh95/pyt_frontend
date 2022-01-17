import "../Search.css";

const PostShort = ({ title, score }) => {
  return (
    <div className="post-body">
        <h1>{score}</h1>
      <h3>{title}</h3>
    </div>
  );
};

export default PostShort;
