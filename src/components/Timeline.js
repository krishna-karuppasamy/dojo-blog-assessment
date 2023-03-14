import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import blogsPostActionGenerator from "../redux/actions/BlogsPostActions";
import ReactPlaceholder from "react-placeholder";
import axios from "axios";
import Headers from "./Header";

export function Timeline({ userName }) {
  const dispatch = useDispatch();
  const state = useSelector((statee) => statee.blogPost);
  const [userApiStatus, setUserApiStatus] = useState("loading");
  const [blogPosts, setBlogPosts] = useState();
  const [myBlogs, setMyBlogs] = useState(false);

  let blogPost = [
    {
      id: 0,
      username: "krishna",
      content: "Hi All, Good Morning..!",
      image: "image1.png",
      likes: 4,
      comments: [
        {
          name: "Comment1",
          comment: "Happy Morning",
        },
        {
          name: "Comment2",
          comment: "Good Morning",
        },
      ],
    },
  ];

  useEffect(() => {
    //dispatch(BlogsPostAction("create_blog", Math.random(10)));
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => {
        for (let index = 0; index < user.length; index++) {
          let tempBlog = {
            id: 0,
            username: "",
            content: "",
            image: "",
            likes: 4,
            mail: "",
            comments: [
              {
                name: "",
                comment: "",
              },
              {
                name: "",
                comment: "",
              },
            ],
          };
          tempBlog.username = user[index].name;
          tempBlog.mail = user[index].email;
          tempBlog.id = user[index].id;
          blogPost.push(tempBlog);
        }

        //console.log("Blogs " + JSON.stringify(blogPost));
      });

    // let photo = awit ("https://jsonplaceholder.typicode.com/photos");
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((photos) => {
        //setUserApiStatus(true);
        //console.log('Photossss--> ' + JSON.stringify(blogPost));
      });

    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        let temp = JSON.parse(JSON.stringify(response.data));

        //setUserApiStatus(true);
        console.log("Blog data length " + blogPost.length);
        for (let index = 0; index < blogPost.length; index++) {
          const element = blogPost[index];
          element.image = temp[index].url;
          element.content = temp[index].title;
        }
        // console.log("Data " + JSON.stringify(blogPost));
      });

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((comments) => {
        //console.log(comments);

        setTimeout(() => {
          let commentIndex = 0;
          for (let index = 0; index < blogPost.length; index++) {
            const element = blogPost[index];
            if (commentIndex === 0) {
              commentIndex++;
            } else {
              commentIndex--;
            }
            element.comments[commentIndex].name = comments[index].email;
            element.comments[commentIndex].comment = comments[index].body;
            element.likes = Math.floor(Math.random() * (1000 - 10 + 1) + 10);
          }
          setBlogPosts(blogPost);
          setUserApiStatus("success");
          //console.log('Actions ' + JSON.stringify(BlogsPostAction('load_resource', blogPosts)));
          //console.log("comments " + JSON.stringify(blogPost));
          dispatch(blogsPostActionGenerator("load_resource", blogPost));
        }, 2000);
      });
  }, []);

  function likeThePost(e) {
    console.log("Like " + e.target.value);
    dispatch(blogsPostActionGenerator("update_blog", e.target.value));
  }

  function postNewBlog(e) {
    e.preventDefault();
    console.log("Post new blog " + e.target.textarea.value);
    dispatch(blogsPostActionGenerator("create_blog", e.target.textarea.value));
    e.target.textarea.value = "";
  }

  function postTheComment(e) {
    e.preventDefault();
    console.log(e.target.btnBlogId.value);
    let comment = e.target.postComment.value;
    e.target.postComment.value = "";

    dispatch(
      blogsPostActionGenerator("update_comment", [
        e.target.btnBlogId.value,
        comment,
      ])
    );
  }

  function showMyBlogs(e) {
    //console.log(state.data);
    state.data.filter((name)=>name.username=='Krishna').map((posts) => {
      console.log(posts);
    
    });
    setUserApiStatus("myBlogs");
  }

  function showTimeline(e){
    setUserApiStatus("success");
  }

  switch (userApiStatus) {
    case "success": {
      return (
        <div>
         
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Welcome {userName}
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/timeline"
                  >
                    {" "}
                    Timeline
                  </a>
                  <a className="nav-link" href="#" onClick={showMyBlogs}>
                    My Blogs
                  </a>
                  <a className="nav-link" href="#">
                    Notification
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col">
                <form onSubmit={postNewBlog}>
                  <div className="mb-3">
                    <label className="form-label">
                      Post your blog today..!
                    </label>
                    <textarea
                      className="form-control"
                      id="textarea"
                      rows="3"
                    ></textarea>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
          {state.data.map((posts) => {
            return (
              <div key={posts.id}>
                <div className="container">
                  <div className="row">
                    <div className="ms-1 mt-3">
                      <h5>{posts.username}</h5>
                      <p>{posts.content}</p>
                      <img src={posts.image} alt={posts.id} width="500px" />
                    </div>
                    <div className="row">
                      <div className="col-3 mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={likeThePost}
                          value={posts.id}
                        >
                          Like
                        </button>
                        <button className="btn btn-success">
                          {posts.likes + "+"}
                        </button>
                      </div>
                    </div>

                    <label className="sr-only mt-1" for="inlineFormInputGroup">
                      Comments
                    </label>

                    {posts.comments
                      .filter((a) => a.name)
                      .map((cmt) => {
                        return (
                          <div>
                            <div className="col-auto" key={posts.id}>
                              <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                  <div className="input-group-text">
                                    {cmt.name}
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inlineFormInputGroup"
                                  placeholder={cmt.comment}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div>
                      <form onSubmit={postTheComment}>
                        <div className="col-auto">
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text">You</div>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="postComment"
                              placeholder="Type here"
                            />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              value={posts.id}
                              id="btnBlogId"
                            >
                              {" "}
                              Post
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    case "loading": {
      return (
        <div className="mt-3">
          <ReactPlaceholder
            type="media"
            rows={5}
            ready={userApiStatus === true}
          ></ReactPlaceholder>
        </div>
      );
    }
    default: {
      return (
        <div>
          <div className="container">
            <button onClick={showTimeline}> &larr; Back</button> 
          </div>
          {state.data.filter((name)=>name.username=='Krishna').map((posts) => {
            return (
              <div key={posts.id}>
                <div className="container">
                  <div className="row">
                    <div className="ms-1 mt-3">
                      <h5>{posts.username}</h5>
                      <p>{posts.content}</p>
                      <img src={posts.image} alt={posts.id} width="500px" />
                    </div>
                    <div className="row">
                      <div className="col-3 mt-3">
                        <button
                          className="btn btn-primary"
                          onClick={likeThePost}
                          value={posts.id}
                        >
                          Like
                        </button>
                        <button className="btn btn-success">
                          {posts.likes + "+"}
                        </button>
                      </div>
                    </div>

                    <label className="sr-only mt-1" for="inlineFormInputGroup">
                      Comments
                    </label>

                    {posts.comments
                      .filter((a) => a.name)
                      .map((cmt) => {
                        return (
                          <div>
                            <div className="col-auto" key={posts.id}>
                              <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                  <div className="input-group-text">
                                    {cmt.name}
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inlineFormInputGroup"
                                  placeholder={cmt.comment}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div>
                      <form onSubmit={postTheComment}>
                        <div className="col-auto">
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text">You</div>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="postComment"
                              placeholder="Type here"
                            />
                            <button
                              type="submit"
                              className="btn btn-primary"
                              value={posts.id}
                              id="btnBlogId"
                            >
                              {" "}
                              Post
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Timeline;
