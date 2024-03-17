import React from 'react';
import Logo1 from './Logo1.png';
import { Link } from 'react-router-dom';

function Logo({width='200px'}) {
  return (
    <div>
      <Link to='/'><img src={Logo1} alt="" width={width} className='rounded-lg' /></Link>
    </div>
  )
}

export default Logo;