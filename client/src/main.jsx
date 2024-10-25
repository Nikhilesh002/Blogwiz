import React,{ lazy,Suspense } from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SignIn from './pages/SignIn.jsx';
//import SignUp from './pages/SignUp.jsx';
//import Article from './pages/Article.jsx';
//import AddNewArticle from './pages/AddNewArticle.jsx';
import AllArticles from './pages/AllArticles.jsx';
import AuthorProfile from './pages/AuthorProfile.jsx';
import AuthorArticles from './pages/AuthorArticles.jsx';
import Home from './pages/Home.jsx';

// lazy loading or dynamic import
const AddNewArticle=lazy(()=>import('./pages/AddNewArticle.jsx'));
const SignUp=lazy(()=>import('./pages/SignUp.jsx'));
const Article=lazy(()=>import('./pages/Article.jsx'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename=''>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='' element={<Home/>} />
          <Route path='signup' element={<Suspense fallback='Loading...'><SignUp/></Suspense>} />
          <Route path='signin' element={<SignIn/>} />

          <Route path='author-profile' element={<AuthorProfile/>}>
            <Route path='' element={<AuthorArticles/>} />
            <Route path='my-articles/:authorName' element={<AuthorArticles/>} />
            <Route path='write-article' element={<Suspense fallback='Loading...'><AddNewArticle/></Suspense>} />
            <Route path='article/:articleId' element={<Suspense fallback='Loading...'><Article/></Suspense>} />
          </Route>

          <Route path='user-profile' element={<AllArticles/>}>
            <Route path='article/:articleId' element={<Suspense fallback='Loading...'><Article/></Suspense>} />
          </Route>

          <Route path='adminprofile' element={<AuthorProfile/>}>
            <Route path='userslist' element={<ErrorPage/>} />
            <Route path='authorslist' element={<ErrorPage/>} />
            <Route path='allarticles' element={<AllArticles/>} />
            <Route path='article' element={<Article/>} />
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
