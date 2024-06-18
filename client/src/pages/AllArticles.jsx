import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosWithToken } from "../axioswithtoken/axiosWithToken";

function AllArticles() {
  let [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let { currentUser, loginUserStatus } = useSelector(
    (state) => state.userAuthorLoginReducer
  );

  async function getArticles() {
    const res = await axiosWithToken.get(
      `${window.location.origin}/user-api/articles`
    );
    setArticlesList(res.data.payload);
  }

  useEffect(() => {
    getArticles();
  }, []);

  function readArticleById(articleObj) {
    navigate(
      `/${currentUser.userType}-profile/article/${articleObj.articleId}`,
      { state: articleObj }
    );
  }

  return (
    <div className="bg-gray-300 min-h-96">
      {currentUser.userType === "author" ? (
        <h1 className="text-center text-xl font-bold font-sans text-teal-500 ">
          {currentUser.username}'s Articles
        </h1>
      ) : (
        <h1 className="text-center text-xl font-bold font-sans text-teal-500 ">
          All Articles
        </h1>
      )}
      {loginUserStatus ? (
        <div className="py-3 px-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {articlesList &&
            articlesList.map((x) => (
              <div
                className="max-w-96 h-60 text-center py-3 px-1 border-2 border-black rounded-md"
                key={x.articleId}
              >
                <div className="">
                  <h1 className="font-medium text-xl">{x.title}</h1>
                </div>
                <div className="">
                  <p className="font-normal text-lg">
                    {x.content.substring(0, 80) + "..."}
                  </p>
                  <button
                    className="bg-rose-400 rounded-md px-2 py-1 m-auto "
                    onClick={() => readArticleById(x)}
                  >
                    Read More
                  </button>
                </div>
                <div className="">
                  <p className="text-sm">
                    Last Updated on {x.dateOfModification}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <h1 className="text-center h-full ">Login to view Articles</h1>
      )}
    </div>
  );
}

export default AllArticles;
