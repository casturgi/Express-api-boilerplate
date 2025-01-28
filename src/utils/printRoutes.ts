import { IRouter, IRoute, RequestHandler } from 'express-serve-static-core';
import { Express } from 'express';

interface Route {
  path: string;
  methods: string;
}

interface Layer {
  route?: {
    path: string;
    methods: { [key: string]: boolean };
  } & IRoute;
  regexp: RegExp;
  name?: string;
  handle: RequestHandler | IRouter;
  stack?: Layer[];  // Add stack property for router layers
}

function printRoutes(): void {
  const routes: Route[] = [];
  
  function print(path: string, layer: Layer): void {
    if (layer.route?.methods) {
      const methods = Object.keys(layer.route.methods)
        .filter(method => layer?.route?.methods[method])
        .map(method => method.toUpperCase());
      
      routes.push({
        path: path + layer.route.path,
        methods: methods.join(', ')
      });
    } else if (layer.name === 'router' && 'stack' in layer.handle) {
      (layer.handle as unknown as { stack: Layer[] }).stack.forEach((stackItem: Layer) => {
        print(
          path + (layer.regexp.source === "^\\/?(?=\\/|$)" ? '' : layer.regexp.source.replace(/\\\//g, '/').replace(/\^|\$/g, '')),
          stackItem
        );
      });
    }
  }

  const app = require('../app').default as Express;
  (app as unknown as { _router: { stack: Layer[] } })._router.stack.forEach((layer: Layer) => {
    print('', layer);
  });

  console.log('\nApplication Routes:');
  console.log('==================\n');
  
  routes.forEach(route => {
    console.log(`${route.methods.padEnd(8)} ${route.path}`);
  });
  
  console.log('\nTotal routes:', routes.length);
}

if (require.main === module) {
  printRoutes();
}

export default printRoutes; 