/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const domino = require('domino');
  const fs = require('fs');
  const path = require('path');
  const distFolder = join(process.cwd(), 'dist/apps/sample/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const template = fs.readFileSync(path.join('.', 'dist/apps/sample/browser', 'index.html')).toString();
  const window = domino.createWindow(template);

  // tslint:disable-next-line:no-string-literal
  global['window'] = window;
  // tslint:disable-next-line:no-string-literal
  global['document'] = window.document;

  // tslint:disable-next-line:no-string-literal
  global['navigator'] = window.navigator;

  server.use(compression());
  server.use(cookieparser());
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    inlineCriticalCss: false
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });


  return server;
}

function run() {
  dotenv.config();
  const port = process.env.PORT || process.env.CONTAINER_PORT_UI_SSR;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
