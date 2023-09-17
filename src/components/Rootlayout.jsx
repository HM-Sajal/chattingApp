import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Rootlayout = () => {
  return (
    <>
        <Sidebar/>
        <Outlet/>
    </>
  )
}

export default Rootlayout