if(!self.define){let e,a={};const t=(t,s)=>(t=new URL(t+".js",s).href,a[t]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=a,document.head.appendChild(e)}else e=t,importScripts(t),a()})).then((()=>{let e=a[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let c={};const r=e=>t(e,n),f={module:{uri:n},exports:c,require:r};a[n]=Promise.all(s.map((e=>f[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/QVykK2wltGvIZPaCw9tr6/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/QVykK2wltGvIZPaCw9tr6/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1133-2f5f72b7a2efb0c5.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/13b76428-5a68792917164904.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/1808-f33b9f5c881124c1.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/1859-f53018bf649a3e5b.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/1941.2e9edb5ca6c186cb.js",revision:"2e9edb5ca6c186cb"},{url:"/_next/static/chunks/1961-a946bb1ff1362caf.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/1976-cae2d05eb0ec2349.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2071-e5a37e39995404fa.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2170a4aa-cc5df5d27dab13ff.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2225-bea1f96ca3c064d2.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/231-aab70b2f22e99513.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2329-de6dc04e96016495.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2382-aa233b23b6503cde.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2626716e-b496a3b36b79551a.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/2836-2e0a6bfe4278b5a3.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/3975359d.e3af2a187047fc9d.js",revision:"e3af2a187047fc9d"},{url:"/_next/static/chunks/477-c8b330d36e62f9fa.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/4794-393cd07177666e46.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/5190-d8f2742d480d33e0.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/5273-96e9ab285be48749.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/5333-d7de35b99e34d0a2.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/5428-9f6f51c25d0d53ac.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/5681-4ad4c5d2bc226a0f.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/6300-869dc042b17a69e1.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/6592-21949d25e527a6a8.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/7064611b-7c666a9d1291f7a4.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/7392-9464df2a2afe1778.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/7658-f3007c796437fe2a.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/8010.d8e3a044a5223299.js",revision:"d8e3a044a5223299"},{url:"/_next/static/chunks/8173-5c7915090ea352bb.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/8350-84edf1d52b1e6e16.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/8438-474533b66998dd9c.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/8472-a03d9db93d874eb8.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/9062-a711e7b08f79985c.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/9689-4661cf43945c77f4.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/(auth)/layout-33123c511542552f.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/(auth)/sign-in/page-66287878954c0435.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/(root)/page-36184a877c0418e9.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/_not-found/page-a798221fdadb5662.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/analytics/loading-273e7c8e77c2aef3.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/analytics/page-3700194036819d45.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/graphs/page-e8ba30764547f513.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/layout-adeb30195f6e4f95.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/loading-443772f6d926d628.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/manage-users/loading-2a162be32653ffe2.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/manage-users/page-8e4d9433dfd9eeb9.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/page-206f40048b2ff769.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/reports/day-end/page-02ebd8c9f29d51c3.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/admin/reports/loading-9fea07798cb9cee7.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/layout-f0de0a8dc7561bb7.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/button-section-out/page-0a24a1e5cc683dde.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/button-section-qc/%5BobbSheetId%5D/page-c32f10b97f6fbead.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/button-section-qc/page-8028321dc9334a39.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/cutting-store-in/page-85a648b19a229ee4.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/cutting-store-out/page-07dd3f3a68b5566e.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/drying-section-qc/page-ea30f10f7c5b1138.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/finishing-line-in/page-dce49bf6b2dbaddc.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/finishing-line-qc/page-e8275344420c3af8.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/finishing-section-in/page-912b8ed84bb21e6a.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/finishing-section-out/page-15f16fab996f1228.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/gmt-production-back-in/page-e71e3fe0dd3f9a69.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/%5BobbSheetId%5D/page-f16939f22ea2e731.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/page-ac679fb0f5e993a9.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/gmt-production-front-in/page-ad19af217a062b52.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/%5BobbSheetId%5D/page-658822be45ce57f7.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/page-4f97e694468ab1fc.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/layout-970e32e26150d33b.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/packing-section-in/page-87ab22684cf49cb2.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/product-assembly-qc/%5BobbSheetId%5D/page-776c675411256df4.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/product-assembly-qc/page-7331f4290cf31890.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/product-assembly/%5BobbSheetId%5D/page-e701e7207529e54c.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/product-assembly/page-2ebb21d4203e4e04.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/sample-point/page-12fbe5899511331a.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/washing-section-in/page-836d9d5aa2bec87c.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/washing-section-out/page-d000f293071669b3.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/app/points/wetting-section-qc/page-aea7cc9e7a5e2805.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/b2d98e07-5c8804966166ef18.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/fd9d1056-243bd5c67dd7f6c9.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/ff804112-0045e840d777fa74.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/framework-56dfd39ab9a08705.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/main-5099184d891cb924.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/main-app-62162ac96a0c3adc.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-0c53f48d89f3a742.js",revision:"QVykK2wltGvIZPaCw9tr6"},{url:"/_next/static/css/d3983ff9b2cd0c36.css",revision:"d3983ff9b2cd0c36"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/2641bfa8d355064d-s.woff2",revision:"c926b29b44328ae02bf34eeea4b61b7c"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/2c062342b1fab89d-s.p.woff2",revision:"90014cf16466d93af47ac74be725aa6a"},{url:"/_next/static/media/2cc74b96cdc9383d-s.p.woff2",revision:"aa46b18b06759d7ed576d7f31bb00f2a"},{url:"/_next/static/media/2e7d59395f7802aa-s.woff2",revision:"0e6b404664ba0686b6aba8757610841e"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3d88ad18e9ebd0fb-s.woff2",revision:"8443fdbcc18980c41dd6560646464afd"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4b2c76e277457ca7-s.woff2",revision:"c05376a46b7554ff728d15ef9a796103"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/53f74bc14e929f80-s.woff2",revision:"6e877ca75d6894f7c8da48686c1b4cba"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7361da631c442576-s.woff2",revision:"af8fbe23c25ebc16d2d6418a9240ec56"},{url:"/_next/static/media/7c1535108079abc4-s.p.woff2",revision:"332a80cf65a428ba6f3a08ef6fbba970"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8a46cfca7977140b-s.p.woff2",revision:"bbe7ffba23d88db7110d165a621bcffc"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/8f91baacbcce7392-s.p.woff2",revision:"be3f685101a4a347c3d77ff968436971"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c393c397a049ab95-s.woff2",revision:"c18e6a21d67dcb103794e696d71cd0c9"},{url:"/_next/static/media/c99ef75952aca458-s.p.woff2",revision:"daa3e17afd40981909a5120927be978a"},{url:"/_next/static/media/cf1f69a0c8aed54d-s.p.woff2",revision:"591c48fae7732f35790aeda9bea56f01"},{url:"/_next/static/media/d8a0c67dc31f196e-s.woff2",revision:"7895fdec0e2f11727c9305ade33e7e49"},{url:"/_next/static/media/decf5989f4e7f901-s.p.woff2",revision:"9b277f891343465c462f609a69889cec"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/e4f1ac6216f8d8cb-s.woff2",revision:"28bf8762089663e67c617ff8d0bc372f"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f0496e21808c976b-s.p.woff2",revision:"16a4a2fe967ec89f31c4824506653104"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/data/ProductionLine.json",revision:"b877284b0f86e188880a757272eabeeb"},{url:"/data/ScanningPoint.json",revision:"a440767ee3634466eb7c27018be0c920"},{url:"/data/User.json",revision:"087a14ff476b747290a255e7a597955b"},{url:"/icons/icon-128x128.png",revision:"9138fa13a8ca08f4cfacdc93d0abc2e0"},{url:"/icons/icon-144x144.png",revision:"5e9ccb8754fd2df0b9f3eba40a5f5d6c"},{url:"/icons/icon-152x152.png",revision:"ff4f29e2d0ab402a179a33bda2ba20b3"},{url:"/icons/icon-192x192.png",revision:"2bd2da57d9d6b93e4e7fca87c27d47ea"},{url:"/icons/icon-384x384.png",revision:"7c8778c9bb2d279567763e8bd6287d00"},{url:"/icons/icon-48x48.png",revision:"aa26ca5b74b3cebc10b67849f1c65e3f"},{url:"/icons/icon-512x512.png",revision:"1f1d90f324e0cf830a453d846d8ecd20"},{url:"/icons/icon-72x72.png",revision:"773bb08bf3f85e68873f656d348f7e3b"},{url:"/icons/user-profile.svg",revision:"2676d8aae1aa6a56c3c8753cd73d1bef"},{url:"/images/logo.svg",revision:"07c1f4beaa8c3066c7ee380179e109c1"},{url:"/images/no-data-found.gif",revision:"65cad4f7c707de47af5ee637621dd4ed"},{url:"/images/og-image.png",revision:"fdea5a2c3e19e18430df6ea0b253825c"},{url:"/images/scanning-files.gif",revision:"77e1e7d30dcac75689c96b83f67b48ab"},{url:"/images/scanning-qr.gif",revision:"466dd46469dea9f5f168a6ece2eddda1"},{url:"/images/welcome.gif",revision:"4687a8fba2a99bfb0ace812bd9dcd7af"},{url:"/manifest.json",revision:"a93f9c8cb4e8b5cf88a698db7ffad05f"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:t})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&t&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:t})=>"1"===e.headers.get("RSC")&&t&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
