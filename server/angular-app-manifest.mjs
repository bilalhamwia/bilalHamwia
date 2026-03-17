
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'bilalHamwia',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-CYDQC6W5.js"
    ],
    "route": "/bilalHamwia"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 21233, hash: 'c1d1e94292028ff13658f014b1a21e41e4219bdba68c0926d3a34274b9d6c8c7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 19593, hash: '21a6f613dd81f204f2dcdb75b61906a92f98530eec33812b1a9bcc89e489794a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-FBT7LDCT.css': {size: 26624, hash: 'nW+AF1MzTsc', text: () => import('./assets-chunks/styles-FBT7LDCT_css.mjs').then(m => m.default)}
  },
};
