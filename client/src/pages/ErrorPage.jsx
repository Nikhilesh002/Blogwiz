import React from 'react';
import {useRouteError} from 'react-router-dom';

function ErrorPage() {

  // let routingError=useRouteError();
  // console.log(routingError);
  // {routingError.status}-{routingError.data}

  return (
    <div className=' mt-10 text-center'>
      <h1 className='text-red-500 text-5xl'>404 Error</h1>
    </div>
  )
}

export default ErrorPage;