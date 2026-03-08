import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'path';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md', '.svx'],
  layout: {
    _: path.resolve('./src/routes/case-studies/_layout.svelte')
  },
  smartypants: true
};

const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build'
    }),
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
