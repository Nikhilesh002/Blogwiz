import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddNewArticle() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  let navigate = useNavigate();
  let [err, setErr] = useState("");

  let token = localStorage.getItem("token");
  // create axios with token
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  async function postArticle(article) {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    console.log(article);
    // http post
    const res = await axiosWithToken.post(
      `${window.location.origin}/author-api/post-article`,
      article
    );
    console.log(res);
    if (res.data.message === "Article created Successfully") {
      navigate(`/author-profile/my-articles/${currentUser.username}`);
    } else {
      setErr(res.data.message);
    }
  }

  return (
    <div className="bg-gray-300 py-16 min-h-96">
      <div className="m-auto  w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12  rounded-lg shadow-2xl px-2 py-4 bg-white ">
        <form onSubmit={handleSubmit(postArticle)} className="px-5 py-2">
          <h1 className="mb-3 text-3xl font-bold font-mono text-center">
            Write an Article
          </h1>

          <div className="text-center font-sans">
            {errors.title?.type === "required" && (
              <p className="text-red-600">*Username required</p>
            )}
            {errors.category?.type === "required" && (
              <p className="text-red-600">*Category required</p>
            )}
            {errors.content?.type === "required" && (
              <p className="text-red-600">*Content required</p>
            )}
          </div>

          <div className="flex flex-col gap-5 my-5">
            <input
              className="border-black border-2 rounded-md px-2 py-1 text-center text-lg"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              {...register("title", { required: true })}
            />

            {/* dropdown */}
            <select
              name="category"
              id="category"
              className="border-2 border-black rounded-md px-3 py-1 "
              {...register("category", { required: true })}
            >
              <option value="" selected disabled>
                --Select Category--
              </option>
              <option value="Programming">Programming</option>
              <option value="Rocket Science">Rocket Science</option>
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
              <option value="Scientists">Scientists</option>
              <option value="Business">Business</option>
            </select>

            {/* content */}
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="8"
              className="border-2 border-black px-1 py-1 rounded-lg font-serif "
              placeholder="Type your Content"
              {...register("content", { required: true })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="shadow-sm bg-green-400 hover:bg-green-500 font-medium rounded-lg px-3 py-1 block m-auto mt-4"
          >
            Post Article
          </button>
          {err !== "" && (
            <p className="text-red-500 text-lg text-center">{err}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddNewArticle;
