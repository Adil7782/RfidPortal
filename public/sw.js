if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const f=e=>a(e,t),r={module:{uri:t},exports:n,require:f};s[t]=Promise.all(c.map((e=>r[e]||f(e)))).then((e=>(i(...e),n)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/13b76428-5a68792917164904.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/1454-9e74d786460ea801.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/1710-0b2dc1e1d2b76d87.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/1818-52b48035fd0640f0.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/1941.2e9edb5ca6c186cb.js",revision:"2e9edb5ca6c186cb"},{url:"/_next/static/chunks/1976-7dcd49cf94816f47.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/231-3a74986eb5616470.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/2626716e-b496a3b36b79551a.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/3975359d.642595f6e3c6cbe9.js",revision:"642595f6e3c6cbe9"},{url:"/_next/static/chunks/4000-df54e08e4db089d0.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/4066-09fa07b53ffefdd4.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/4143-ae892832c13a485d.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/4959-53e8342f500d7f99.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/5190-ff570400eb2f9e4d.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/522-2281387d6873e185.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/5427-65611c24a1d24d9d.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/6433-3059d8c2695a989e.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/8010.d8e3a044a5223299.js",revision:"d8e3a044a5223299"},{url:"/_next/static/chunks/8142-22e0f56ac91b94e8.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/8173-89633f800335789d.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/8704-8dcd21702df7f4d7.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/9630-13173e7eace5a2f4.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/(auth)/layout-f850d809d0a87cad.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/(auth)/sign-in/page-e46baafe3fca78c1.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/(root)/page-123716d87d081447.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/_not-found/page-c671ca2661d7c195.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/admin/layout-2fe79b50c7da4998.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/admin/page-6e1901af232cb127.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/layout-a917b049dcd4fb40.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/button-section-out/page-baf7b207263f5f88.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/button-section-qc/page-89386c4b7cff1697.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/cutting-store-in/page-224197140804e9b0.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/cutting-store-out/page-252f0b335bce0e68.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/drying-section-qc/page-c446c4a91501f187.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/finishing-line-in/page-080c155b4731a130.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/finishing-line-qc/page-16ca4f1a888c2be4.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/finishing-section-in/page-e5ccce269e5fa2c0.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/finishing-section-out/page-0a3ab596f700d67c.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/gmt-production-back-in/page-8ce3ba51a33e3223.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/page-7da0d698429f5e66.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/gmt-production-front-in/page-02bba344a726a1ce.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/page-c7f2481755c8cb3c.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/layout-815568289aa965c4.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/packing-section-in/page-aada91a98e17e3c1.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/product-assembly-qc/page-3b151a7a7f2a6317.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/product-assembly/page-53aa7a37e9f7b17d.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/washing-section-in/page-1b16bff9ccd0d02a.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/washing-section-out/page-14457c118284c005.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/app/points/wetting-section-qc/page-81cbe5997a38c8c2.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/fd9d1056-89c0f99a3d186efc.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/main-67f04fa47d9e0e37.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/main-app-5d01c9327b916ffa.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a3b08a5e5bb3c9ad.js",revision:"lfMgbPgYcS7BedStkurks"},{url:"/_next/static/css/a15c4f9cecc82543.css",revision:"a15c4f9cecc82543"},{url:"/_next/static/lfMgbPgYcS7BedStkurks/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/lfMgbPgYcS7BedStkurks/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/2641bfa8d355064d-s.woff2",revision:"c926b29b44328ae02bf34eeea4b61b7c"},{url:"/_next/static/media/2c062342b1fab89d-s.p.woff2",revision:"90014cf16466d93af47ac74be725aa6a"},{url:"/_next/static/media/2cc74b96cdc9383d-s.p.woff2",revision:"aa46b18b06759d7ed576d7f31bb00f2a"},{url:"/_next/static/media/2e7d59395f7802aa-s.woff2",revision:"0e6b404664ba0686b6aba8757610841e"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3d88ad18e9ebd0fb-s.woff2",revision:"8443fdbcc18980c41dd6560646464afd"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4b2c76e277457ca7-s.woff2",revision:"c05376a46b7554ff728d15ef9a796103"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/53f74bc14e929f80-s.woff2",revision:"6e877ca75d6894f7c8da48686c1b4cba"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7361da631c442576-s.woff2",revision:"af8fbe23c25ebc16d2d6418a9240ec56"},{url:"/_next/static/media/7c1535108079abc4-s.p.woff2",revision:"332a80cf65a428ba6f3a08ef6fbba970"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8a46cfca7977140b-s.p.woff2",revision:"bbe7ffba23d88db7110d165a621bcffc"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/8f91baacbcce7392-s.p.woff2",revision:"be3f685101a4a347c3d77ff968436971"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c393c397a049ab95-s.woff2",revision:"c18e6a21d67dcb103794e696d71cd0c9"},{url:"/_next/static/media/c99ef75952aca458-s.p.woff2",revision:"daa3e17afd40981909a5120927be978a"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/cf1f69a0c8aed54d-s.p.woff2",revision:"591c48fae7732f35790aeda9bea56f01"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/d8a0c67dc31f196e-s.woff2",revision:"7895fdec0e2f11727c9305ade33e7e49"},{url:"/_next/static/media/decf5989f4e7f901-s.p.woff2",revision:"9b277f891343465c462f609a69889cec"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/e4f1ac6216f8d8cb-s.woff2",revision:"28bf8762089663e67c617ff8d0bc372f"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/f0496e21808c976b-s.p.woff2",revision:"16a4a2fe967ec89f31c4824506653104"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/data/ProductionLine.json",revision:"b877284b0f86e188880a757272eabeeb"},{url:"/data/ScanningPoint.json",revision:"a440767ee3634466eb7c27018be0c920"},{url:"/data/User.json",revision:"087a14ff476b747290a255e7a597955b"},{url:"/icons/icon-128x128.png",revision:"9138fa13a8ca08f4cfacdc93d0abc2e0"},{url:"/icons/icon-144x144.png",revision:"5e9ccb8754fd2df0b9f3eba40a5f5d6c"},{url:"/icons/icon-152x152.png",revision:"ff4f29e2d0ab402a179a33bda2ba20b3"},{url:"/icons/icon-192x192.png",revision:"2bd2da57d9d6b93e4e7fca87c27d47ea"},{url:"/icons/icon-384x384.png",revision:"7c8778c9bb2d279567763e8bd6287d00"},{url:"/icons/icon-48x48.png",revision:"aa26ca5b74b3cebc10b67849f1c65e3f"},{url:"/icons/icon-512x512.png",revision:"1f1d90f324e0cf830a453d846d8ecd20"},{url:"/icons/icon-72x72.png",revision:"773bb08bf3f85e68873f656d348f7e3b"},{url:"/icons/user-profile.svg",revision:"60542eae9c907d7783d6e13082be9d32"},{url:"/images/logo.svg",revision:"2b0deac03f1184200bea01a707b61d41"},{url:"/images/no-data-found.gif",revision:"65cad4f7c707de47af5ee637621dd4ed"},{url:"/images/og-image.png",revision:"fdea5a2c3e19e18430df6ea0b253825c"},{url:"/images/scanning-files.gif",revision:"77e1e7d30dcac75689c96b83f67b48ab"},{url:"/images/scanning-qr.gif",revision:"466dd46469dea9f5f168a6ece2eddda1"},{url:"/manifest.json",revision:"a93f9c8cb4e8b5cf88a698db7ffad05f"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
