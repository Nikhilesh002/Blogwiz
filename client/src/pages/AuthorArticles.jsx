import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {axiosWithToken} from '../axioswithtoken/axiosWithToken';
import { useNavigate,Outlet,redirect } from 'react-router-dom';

function AuthorArticles() {
  let [articlesList,setArticlesList]=useState([]);
  let navigate=useNavigate();
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer);

  async function getArticles(){
    const res=await axiosWithToken.get(`${window.location.origin}/author-api/articles/${currentUser.username}`);
    setArticlesList(res.data.payload);
  }

  useEffect(()=>{
    getArticles();
  },[]);

  function readArticleById(articleObj){
    navigate(`/author-profile/article/${articleObj.articleId}`,{state:articleObj});
  }

  return (
    <div className="bg-blue-200 min-h-96">
      <h1 className='text-center text-xl font-bold font-sans text-teal-500 '>{currentUser.username}'s Articles</h1>
      <div className='py-3 px-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
      {
        articlesList.map(x=>(
          <div className="max-w-96 h-60 text-center py-3 px-1 border-2 border-black rounded-md" key={x.articleId}>
            <div className="">
              <h1 className='font-medium text-xl'>{x.title}</h1>
            </div>
            <div className="">
              <p className='font-normal text-lg'>{x.content.substring(0,80)+"..."}</p>
              <button className='bg-rose-400 rounded-md px-2 py-1 m-auto ' onClick={()=>readArticleById(x)} >Read More</button>
            </div>
            <div className="">
              <p className='text-sm'>Last Updated on {x.dateOfModification}</p>
            </div>
          </div>)
        )
      }
    </div>
    </div>
  )
}

export default AuthorArticles;