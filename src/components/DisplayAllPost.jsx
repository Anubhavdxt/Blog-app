import React, { useState, useRef, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostComponent from "./PostComponent";
import ModifyPost from "./ModifyPost";
import "./Style.css";
import axios from "axios";

const DisplayAllPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");

  // Initialize useRef
  const getTitle = useRef();
  const getCategory = useRef();
  const getContent = useRef();

  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };

  const saveCategoryToState = (event) => {
    setCategory(event.target.value);
  };

  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await axios.get("./user-db.json");
      console.log(userData.data);
      userData.data.map((user) => {
        let id = user.posts[-1] + 1;
        user.posts.push({
          id: id,
          title: title,
          category: category,
          content: content,
        });
      });
    };
    getUserData();
  }, [title, category, content]);

  const toggleCreatePost = () => {
    setIsCreatePost(!isCreatePost);
  };
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };

  // EDIT POST
  const editPost = (id) => {
    setEditPostId(id);
    console.log(id);
    toggleModifyPostComponent();
  };

  // DELETE POST
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };

  // UPDATE POST
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        console.log([eachPost.id, editPostId]);
        return {
          ...eachPost,
          title: title || eachPost.title,
          category: category || eachPost.category,
          content: content || eachPost.content,
        };
      }
      console.log(eachPost);
      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };

  // SAVE POST
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, category, content, id }]);
    console.log(allPosts);
    setTitle("");
    setCategory("");
    setContent("");
    getTitle.current.value = "";
    getCategory.current.value = "";
    getContent.current.value = "";
    toggleCreatePost();
  };
  if (isCreatePost) {
    return (
      <>
        <CreatePost
          savePostTitleToState={savePostTitleToState}
          saveCategoryToState={saveCategoryToState}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          getCategory={getCategory}
          getContent={getContent}
          savePost={savePost}
          deletePost={deletePost}
        />
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });
    return (
      <ModifyPost
        title={post.title}
        category={post.category}
        content={post.content}
        updatePost={updatePost}
        savePostTitleToState={savePostTitleToState}
        saveCategoryToState={saveCategoryToState}
        savePostContentToState={savePostContentToState}
      />
    );
  }

  // NO POSTS IN THE DATABASE
  return (
    <>
      {!allPosts.length ? (
        <section className="no-post">
          <h1>No Post Found!</h1>
          <h3>There is nothing to see here.</h3>
          <br />
          <br />
          <section className="button-wrapper">
            <button onClick={toggleCreatePost} className="button">
              Create New
            </button>
          </section>
        </section>
      ) : (
        <div>
          <h1>All Posts</h1>
          <section className="all-post">
            {allPosts.map((eachPost) => {
              return (
                <PostComponent
                  id={eachPost.id}
                  key={eachPost.id}
                  title={eachPost.title}
                  category={eachPost.category}
                  content={eachPost.content}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              );
            })}
            <section className="button-wrapper">
              <button onClick={toggleCreatePost} className="button">
                Create New
              </button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
export default DisplayAllPosts;
