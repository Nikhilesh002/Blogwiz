import React,{useEffect,useState,Fragment} from 'react';
import { useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../axioswithtoken/axiosWithToken';
import {useForm} from 'react-hook-form';
// icons
import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { BiSend } from "react-icons/bi";
import { MdRestore } from "react-icons/md";

function Article() {

  const {state}=useLocation();
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer);
  let {register,handleSubmit,formState:{errors}}=useForm();
  let [comment,setComment]=useState(null);
  let navigate=useNavigate();
  let [articleEditStatus,setArticleEditStatus]=useState(false);
  let [currentArticle,setCurrentArticle]=useState(state);

  async function modifyArticle(editedArticleObj){
    // editedArticleObj will overwrite state and is stored in modifiedArticle
    let modifiedArticle={...state,...editedArticleObj};
    modifiedArticle.dateOfModification=new Date();
    // remove id as in mongoDB, its Object("id") but in client, its a string of digits
    // so dont send, send remaining, which replaces existing
    delete modifiedArticle._id;
    let res=await axiosWithToken.put(`${window.location.origin}/author-api/update-article`,modifiedArticle);
    if(res.data.message==="Article updated Successfully"){
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${modifiedArticle.articleId}`,{state:modifiedArticle});
    }
  }

  async function deleteArticle(){
    let res=await axiosWithToken.put(`${window.location.origin}/author-api/article/soft-delete/${currentArticle.articleId}`);
    if(res.data.message==="Article deleted Successfully"){
      setCurrentArticle({...currentArticle,status:false});
    }
  }

  async function restoreArticle(){
    let res=await axiosWithToken.put(`${window.location.origin}/author-api/article/restore/${currentArticle.articleId}`);
    if(res.data.message==="Article restored Successfully"){
      setCurrentArticle({...currentArticle,status:true});
    }
  }

  async function addComment(commentObj){
    commentObj.username=currentUser.username;
    let res=await axiosWithToken.post(`${window.location.origin}/user-api/comment/${currentArticle.articleId}`,commentObj);
    if(res.data.message==="Comment posted"){
      // TODO only 1 latest comment is appeared, change so all are visible
      setComment(commentObj);
    }
  }

  function enableEdit(){
    setArticleEditStatus(true);
  }

  //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let month = new Date(iso).getUTCMonth()+1; // months are 0 based
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${month}/${year}`;
  }

  return (
    <div className='bg-blue-200 px-3 py-4 min-w-48 min-h-96 w-full'>
      {
        articleEditStatus===false?(
          <div className="main">
            <div className="flex justify-between">
              <div className="">
                <p className='py-2 text-2xl font-mono font-semibold'>{state.title}</p>
                <div className="flex gap-4">
                  <p className='text-sm'><FcCalendar className='text-xl inline pe-1'/>Created on {ISOtoUTC(state.dateOfCreation)}</p>
                  <p className='text-sm'><FcClock className='text-xl inline pe-1'/>Modified on {ISOtoUTC(state.dateOfModification)}</p>
                </div>
              </div>
              <div className="">
                {
                  (currentUser.userType==="author") &&
                    <div className="flex gap-2">
                      <button onClick={enableEdit} className='border border-black rounded bg-orange-300 px-1 py-0.5'><CiEdit className='text-xl inline'/></button>
                      {
                        (currentArticle.status===true)?
                        (<button onClick={deleteArticle} className='border border-black rounded bg-red-400 px-1 py-0.5'><MdDelete className='text-xl inline'/></button>):
                        (<button onClick={restoreArticle} className='border border-black rounded bg-green-400 px-1 py-0.5'><MdRestore className='text-xl inline'/></button>)
                      }
                    </div>
                }
              </div>
            </div>
            <p className='py-4 pe-4' style={{ whiteSpace: "pre-line" }}>{state.content}</p>
            {/* comments */}
            <p className='text-2xl font-serif font-semibold'>Comments</p>
            <div className="">
              {/* write a comment, only by user*/}
              <div className="py-3">
                {
                  currentUser.userType==="user" && (
                    // TODO clear input tag after submission so use rest in 2 diff useForm
                    <form onSubmit={handleSubmit(addComment)}>
                      <input type="text" className='w-96 sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 py-1 ps-2 pe-1 text-md border-2 border-black rounded ' placeholder='Add a comment...'
                        {...register("comment",{required:true})}/>
                      <button type='submit' className='rounded px-1 py-0.5'>
                        <BiSend className='text-3xl inline'/></button>
                    </form>
                  )
                }
              </div>
              {/*existing */}
              {
                comment!==null &&
                <div className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-slate-100 m-1 px-2 py-1 text-lg rounded-lg">
                  <p className='w-full' style={{color: "dodgerblue",textTransform: "capitalize"}}><FcPortraitMode className='text-xl inline pe-1'/> {comment.username}</p>
                  <p className='w-full' style={{fontFamily: "fantasy",color: "lightseagreen"}}><FcComments className='text-xl inline pe-1'/>{comment.comment}</p>
                </div>
              }
              <div className="">
                {
                  state.comments.length===0?<p className=''>No Comments...</p>:(
                    state.comments.map((commentObj,ind)=>(
                      <div key={ind} className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-slate-100 m-1 px-2 py-1 text-lg rounded-lg">
                        <p className='w-full' style={{color: "dodgerblue",textTransform: "capitalize"}}><FcPortraitMode className='text-xl inline pe-1'/> {commentObj.username}</p>
                        <p className='w-full' style={{fontFamily: "fantasy",color: "lightseagreen"}}><FcComments className='text-xl inline pe-1'/>{commentObj.comment}</p>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          </div>
        ):(
          <div className="bg-blue-200 py-16 min-h-96">
            <div className='m-auto  w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12  rounded-lg shadow-2xl px-2 py-4 bg-white '>
              <form onSubmit={handleSubmit(modifyArticle)} className='px-5 py-2' >
                <h1 className='mb-3 text-3xl font-bold font-mono text-center'>Edit Article</h1>

                <div className="text-center font-sans">
                  {errors.title?.type === "required" && <p className='text-red-600'>*Username required</p>}
                  {errors.category?.type === "required" && <p className='text-red-600'>*Category required</p>}
                  {errors.content?.type === "required" && <p className='text-red-600'>*Content required</p>}
                </div>

                <div className="flex flex-col gap-5 my-5">
                  <input className='border-black border-2 rounded-md px-2 py-1 text-center text-lg'
                    type="text" name="title" id="title" placeholder='Title' defaultValue={state.title}
                    {...register("title",{required:true})}/>

                  {/* dropdown */}
                  <select name="category" id="category" className='border-2 border-black rounded-md px-3 py-1 '
                    {...register("category",{required:true})} defaultValue={state.category} >
                    <option value="" selected disabled>--Select Category--</option>
                    <option value="Programming">Programming</option>
                    <option value="Rocket Science">Rocket Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Scientists">Scientists</option>
                    <option value="Business">Business</option>
                  </select>

                  {/* content */}
                  <textarea name="content" id="content" cols="30" rows="8" defaultValue={state.content}
                    className='border-2 border-black px-1 py-1 rounded-lg font-serif ' placeholder='Type your Content'
                    {...register("content",{required:true})}></textarea>
                </div>

                <button type='submit' className='shadow-sm bg-green-400 hover:bg-green-500 font-medium rounded-lg px-3 py-1 block m-auto mt-4'>Save Article</button>
                {/*err!=="" && <p className='text-red-500 text-lg text-center'>{err}</p>*/}
              </form>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default Article;