import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosWithToken } from "../axioswithtoken/axiosWithToken";
import { FaUserEdit, FaClock } from "react-icons/fa";

export default function AuthorArticles() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);

  async function getArticles() {
    try {
      const res = await axiosWithToken.get(
        `${window.location.origin}/author-api/articles/${currentUser.username}`
      );
      setArticlesList(res.data.payload);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  function readArticleById(articleObj) {
    navigate(`/author-profile/article/${articleObj.articleId}`, {
      state: articleObj,
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        <FaUserEdit className="inline-block mr-2 mb-1" />
        {currentUser.username}'s Articles
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articlesList && articlesList.map((article) => (
          <div
            key={article.articleId}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-200"
          >
            <div className="p-6">
              <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.content}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <FaClock className="w-4 h-4 mr-1" />
                <span>
                  Last updated on{" "}
                  {new Date(article.dateOfModification).toLocaleDateString()}
                </span>
              </div>
              <button
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
                onClick={() => readArticleById(article)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}