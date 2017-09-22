import React from 'react';
import MainLayout from '../components/MainLayout';
import Index from '../pages/Index';
import Thesis from '../pages/Thesis';
import Post from '../components/Post';

const routes = [
  { path: '/', action: () => <Index />, index: MainLayout },
  { path: '/thesis', action: () => <Thesis />, index: MainLayout },
  { path: '/blog/compiling-custom-raspberry-pi-kernel-with-kedei-35/', action: () => <Post /> }, // This post is pretty important for the community
  { path: '/error', action: () => <p>Not found</p>}
  // async example
  // { path: '/error', action: () => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(<p>test</p>);
  //     }, 2000);
  //   });
  // }}
];

export default routes;