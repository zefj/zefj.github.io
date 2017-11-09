import React from 'react';
import MainLayout from '../components/MainLayout';
import PlainTextLayout from '../components/PlainTextLayout';
import Index from '../pages/Index';
import Thesis from '../pages/Thesis';
import Kedei from '../pages/Kedei';

const routes = [
  { path: '/', action: () => <Index />, index: MainLayout },
  { path: '/thesis', action: () => <Thesis />, index: PlainTextLayout },
  { path: '/blog/compiling-custom-raspberry-pi-kernel-with-kedei-35/', action: () => <Kedei />, index: PlainTextLayout }, // This post is pretty important for the community
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