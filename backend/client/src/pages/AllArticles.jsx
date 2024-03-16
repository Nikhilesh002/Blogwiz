import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {axiosWithToken} from '../axioswithtoken/axiosWithToken';
import { useNavigate,Outlet,redirect } from 'react-router-dom';

function AllArticles() {
  let [articlesList,setArticlesList]=useState([]);
  let navigate=useNavigate();
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer);

  async function getArticles(){
    const res=await axiosWithToken.get('http://localhost:4000/user-api/articles');
    setArticlesList(res.data.payload);
  }

  useEffect(()=>{
    getArticles();
  },[]);

  function readArticleById(articleObj){
    navigate(`/${currentUser.userType}-profile/article/${articleObj.articleId}`,{state:articleObj});
  }

  //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let month = new Date(iso).getUTCMonth()+1; // months are 0 based
    let year = new Date(iso).getUTCFullYear();
    console.log(`${date}/${month}/${year}`);
    return `${date}/${month}/${year}`;
  }

  return (
    <div className="bg-blue-200 min-h-96">
      {
        currentUser.userType==="author"?
        <h1 className='text-center text-xl font-bold font-sans text-teal-500 '>{currentUser.username}'s Articles</h1>
        :<h1 className='text-center text-xl font-bold font-sans text-teal-500 '>All Articles</h1>
      }
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
                <p className='text-sm'>Last Updated on {ISOtoUTC(x.dateOfModification)}</p>
              </div>
            </div>)
          )
        }
      </div>
    </div>
  )
}

export default AllArticles;