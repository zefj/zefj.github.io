import React from 'react';
import Index from '../components/Index';
import Post from '../components/Post';

const routes = [
  { path: '/', action: () => <Index /> },
  {
    path: '/projects',
    action: () => <p>proj</p>,
    index: Index
  },
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