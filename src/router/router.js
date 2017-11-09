import toRegex from 'path-to-regexp';
import React from 'react';

function matchURI(path, uri) {
  const keys = [];
  const pattern = toRegex(path, keys); // TODO: Use caching
  const match = pattern.exec(uri);
  
  if (!match) return null;

  const params = Object.create(null);
  
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] =
      match[i] !== undefined ? match[i] : undefined;
  }
  
  return params;
}

const resolve = (routes, context) => {
  return new Promise(resolve => {
    for (const route of routes) {
      const uri = context.error ? '/error' : context.pathname;
      const params = matchURI(route.path, uri);
  
      if (!params) continue;
    
      var result;
      if (route.index) {
        const IndexComponent = route.index;
        result = <IndexComponent>{ route.action({ ...context, params }) }</IndexComponent>
      } else {
        result = route.action({ ...context, params })
      }
      if (result) resolve(result);
    }

    const error = new Error('Not found');
    error.status = 404;
    throw error;
  });
}

export default { resolve };