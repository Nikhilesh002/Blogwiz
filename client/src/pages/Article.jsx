import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosWithToken } from "../axioswithtoken/axiosWithToken";
import { BiSend } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FcCalendar, FcClock, FcComments, FcPortraitMode } from "react-icons/fc";
import { MdDelete, MdRestore } from "react-icons/md";

export default function Article() {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();
  const [articleEditStatus, setArticleEditStatus] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(state);

  async function modifyArticle(editedArticleObj) {
    const modifiedArticle = { ...state, ...editedArticleObj, dateOfModification: new Date() };
    delete modifiedArticle._id;
    const res = await axiosWithToken.put(
      `${window.location.origin}/author-api/update-article`,
      modifiedArticle
    );
    if (res.data.message === "Article updated Successfully") {
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${modifiedArticle.articleId}`, {
        state: modifiedArticle,
      });
    }
  }

  async function deleteArticle() {
    const res = await axiosWithToken.put(
      `${window.location.origin}/author-api/article/soft-delete/${currentArticle.articleId}`
    );
    if (res.data.message === "Article deleted Successfully") {
      setCurrentArticle({ ...currentArticle, status: false });
    }
  }

  async function restoreArticle() {
    const res = await axiosWithToken.put(
      `${window.location.origin}/author-api/article/restore/${currentArticle.articleId}`
    );
    if (res.data.message === "Article restored Successfully") {
      setCurrentArticle({ ...currentArticle, status: true });
    }
  }

  async function addComment(commentObj) {
    commentObj.username = currentUser.username;
    const res = await axiosWithToken.post(
      `${window.location.origin}/user-api/comment/${currentArticle.articleId}`,
      commentObj
    );
    if (res.data.message === "Comment posted") {
      setComment(commentObj);
    }
  }

  function ISOtoUTC(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('en-GB');
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {!articleEditStatus ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{state.title}</h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <p><FcCalendar className="inline mr-1" /> Created on {ISOtoUTC(state.dateOfCreation)}</p>
                <p><FcClock className="inline mr-1" /> Modified on {ISOtoUTC(state.dateOfModification)}</p>
              </div>
            </div>
            {currentUser.userType === "author" && (
              <div className="flex gap-2">
                <button
                  onClick={() => setArticleEditStatus(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  <CiEdit className="inline mr-1" /> Edit
                </button>
                {currentArticle.status ? (
                  <button
                    onClick={deleteArticle}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    <MdDelete className="inline mr-1" /> Delete
                  </button>
                ) : (
                  <button
                    onClick={restoreArticle}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                  >
                    <MdRestore className="inline mr-1" /> Restore
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="whitespace-pre-line mb-8">{state.content}</p>
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {currentUser.userType === "user" && (
              <form onSubmit={handleSubmit(addComment)} className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow border rounded-l px-3 py-2"
                    placeholder="Add a comment..."
                    {...register("comment", { required: true })}
                  />
                  <button type="submit" className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600 transition duration-200">
                    <BiSend className="inline" />
                  </button>
                </div>
                {errors.comment && <p className="text-red-500 mt-1">Comment is required</p>}
              </form>
            )}
            <div className="space-y-4">
              {comment && (
                <CommentItem username={comment.username} comment={comment.comment} />
              )}
              {state.comments && state.comments.length === 0 ? (
                <p className="text-gray-500">No comments yet</p>
              ) : (
                state.comments.map((commentObj, ind) => (
                  <CommentItem key={ind} username={commentObj.username} comment={commentObj.comment} />
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit(modifyArticle)}>
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Article</h2>
            <div className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Title"
                defaultValue={state.title}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              
              <select
                className="w-full border rounded px-3 py-2"
                {...register("category", { required: "Category is required" })}
                defaultValue={state.category}
              >
                <option value="" disabled>--Select Category--</option>
                <option value="Programming">Programming</option>
                <option value="Rocket Science">Rocket Science</option>
                <option value="Biology">Biology</option>
                <option value="Physics">Physics</option>
                <option value="Scientists">Scientists</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
              
              <textarea
                className="w-full border rounded px-3 py-2"
                rows="8"
                placeholder="Type your Content"
                defaultValue={state.content}
                {...register("content", { required: "Content is required" })}
              ></textarea>
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white rounded px-3 py-2 mt-6 hover:bg-green-600 transition duration-200"
            >
              Save Article
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function CommentItem({ username, comment }) {
  return (
    <div className="bg-gray-50 rounded p-3">
      <p className="font-semibold text-blue-600 capitalize">
        <FcPortraitMode className="inline mr-1" /> {username}
      </p>
      <p className="mt-1 text-gray-700">
        <FcComments className="inline mr-1" /> {comment}
      </p>
    </div>
  );
}