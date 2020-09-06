import React from 'react';
import IndexLayout from '../components/IndexLayout';
import PostLayout from '../components/PostLayout';
import Thesis from '../pages/Thesis';
import Kedei from '../pages/Kedei';
import { Resume } from '../pages/Resume/Resume';

const routes = [
  { path: '/', action: () => <IndexLayout /> },
  { path: '/thesis', action: () => <Thesis />, index: PostLayout },
  { path: '/resume', action: () => <Resume /> },
  // This post is somewhat important for the community
  { path: '/blog/compiling-custom-raspberry-pi-kernel-with-kedei-35/', action: () => <Kedei />, index: PostLayout },
];

export default routes;
