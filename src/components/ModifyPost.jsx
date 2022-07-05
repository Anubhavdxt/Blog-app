import React from "react";

const ModifyPost = (props) => {
  return (
    <>
      <section className="create-post">
        <form>
          <h1>Modify Post</h1>
          <input
            type="text"
            defaultValue={props.title}
            onChange={props.savePostTitleToState}
            text
            placeholder="title"
            size="39"
          ></input>
          <input
            type="text"
            defaultValue={props.category}
            onChange={props.saveCategoryToState}
            text
            placeholder="category"
            size="39"
          ></input>
          <textarea
            defaultValue={props.content}
            placeholder="content"
            onChange={props.savePostContentToState}
            rows="8"
            cols="41"
          ></textarea>
          <section className="button-wrapper">
            <button className="button" onClick={props.updatePost}>
              Update Post
            </button>
          </section>
        </form>
      </section>
    </>
  );
};
export default ModifyPost;
