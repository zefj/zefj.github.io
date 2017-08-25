import React from 'react';
import Index from '../components/Index';
import Post from '../components/Post';

const routes = [
  { path: '/', action: () => <Index /> },
  { path: '/post', action: () => <Post /> },
];

export default routes;