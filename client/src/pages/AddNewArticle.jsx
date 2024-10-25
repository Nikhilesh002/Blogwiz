import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPen, FaList, FaFileAlt } from "react-icons/fa";

export default function AddNewArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const token = localStorage.getItem("token");
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

    try {
      const res = await axiosWithToken.post(
        `${window.location.origin}/author-api/post-article`,
        article
      );
      if (res.data.message === "Article created Successfully") {
        navigate(`/author-profile/my-articles/${currentUser.username}`);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr("An error occurred while posting the article.");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Write an Article
          </h1>
          <form onSubmit={handleSubmit(postArticle)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                <FaPen className="inline-block mr-2" />
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Enter article title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                <FaList className="inline-block mr-2" />
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              >
                <option value="">--Select Category--</option>
                <option value="Programming">Programming</option>
                <option value="Rocket Science">Rocket Science</option>
                <option value="Biology">Biology</option>
                <option value="Physics">Physics</option>
                <option value="Scientists">Scientists</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                <FaFileAlt className="inline-block mr-2" />
                Content
              </label>
              <textarea
                id="content"
                rows={8}
                {...register("content", { required: "Content is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Type your content here"
              ></textarea>
              {errors.content && (
                <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Post Article
              </button>
            </div>
          </form>
          {err !== "" && (
            <p className="mt-2 text-sm text-red-600 text-center">{err}</p>
          )}
        </div>
      </div>
    </div>
  );
}