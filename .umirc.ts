import { defineConfig } from 'dumi';

import menus from './config/menus.js';

export default defineConfig({
  title: 'ii-admin-business',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  publicPath: '/ii-admin-business/',
  base: '/ii-admin-business',
  history: { type: 'hash' },
  mode: 'site',
  menus,
  styles: ['https://cdn.bootcdn.net/ajax/libs/antd/4.7.0/antd.min.css'],
  // scripts: ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.min.js'],
  // more config: https://d.umijs.org/config
});
