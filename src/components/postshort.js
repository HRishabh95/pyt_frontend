import "./Search.css";

const PostShort = ({ title, date }) => {
  return (
    <div className="post-body">
      <h3>{title}</h3>
      <p>{date}</p>
    </div>
  );
};
