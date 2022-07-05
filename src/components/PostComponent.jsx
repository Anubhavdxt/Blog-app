import React from "react";

const PostComponent = ({
  title,
  category,
  content,
  editPost,
  id,
  deletePost,
}) => {
  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <p className="post-category"> {category}</p>
        <p className="post-content"> {content}</p>
        <button className="button" onClick={() => editPost(id)}>
          Edit
        </button>
        <button className="button" onClick={() => deletePost(id)}>
          Delete
        </button>
      </section>
    </>
  );
};
export default PostComponent;
