import React from 'react';
import MainLayout from '../components/MainLayout';
import SimpleLayout from '../components/SimpleLayout';
import Index from '../pages/Index';
import Thesis from '../pages/Thesis';
import Kedei from '../pages/Kedei';

const routes = [
  { path: '/', action: () => <Index />, index: MainLayout },
  { path: '/thesis', action: () => <Thesis />, index: SimpleLayout },
  // This post is somewhat important for the community
  { path: '/blog/compiling-custom-raspberry-pi-kernel-with-kedei-35/', action: () => <Kedei />, index: SimpleLayout },
];

export default routes;
