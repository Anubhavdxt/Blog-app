import React from "react";

const CreatePost = (props) => {
  return (
    <>
      <section className="create-post">
        <form onSubmit={props.savePost}>
          <h1>Create New Post</h1>
          <input
            type="text"
            onChange={props.savePostTitleToState}
            placeholder="Title"
            size="39"
            required
            ref={props.getTitle}
          ></input>
          <input
            type="text"
            onChange={props.saveCategoryToState}
            placeholder="Category"
            size="39"
            required
            ref={props.getCategory}
          ></input>
          <textarea
            onChange={props.savePostContentToState}
            placeholder="Content"
            rows="8"
            cols="41"
            required
            ref={props.getContent}
          ></textarea>
          <section className="button-wrapper">
            <button className="button">Save Post</button>
          </section>
        </form>
      </section>
    </>
  );
};
export default CreatePost;
