if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>a(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/FoR6DnLqOsvTzVJ3-JqRF/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/FoR6DnLqOsvTzVJ3-JqRF/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1110-8413036db6323887.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/13b76428-5a68792917164904.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/1859-f53018bf649a3e5b.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/1941.2e9edb5ca6c186cb.js",revision:"2e9edb5ca6c186cb"},{url:"/_next/static/chunks/2170a4aa-5fbd044853750a37.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/231-aab70b2f22e99513.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/2626716e-b496a3b36b79551a.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/2836-cd25a979eda9b2fb.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/3146-d0a174098a6b8b6b.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/3251-3f05163ba423cc2a.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/3420-c33617b45b814fc1.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/3975359d.def7cbc1dd494990.js",revision:"def7cbc1dd494990"},{url:"/_next/static/chunks/4079-dc1164b70964ff05.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/4367-aa6b5df39ce1ad08.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/4440-03f1263dc8a286f3.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/4531-22e0cde88f569340.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/477-bf19c62aa6161635.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/4868-54961ce9006eb59a.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/5190-d8f2742d480d33e0.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/5273-96e9ab285be48749.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/5428-9f6f51c25d0d53ac.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/6066-f4c2fdfbd8d32d2c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/6300-869dc042b17a69e1.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/6569-103d0a817835ac87.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/6592-21949d25e527a6a8.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/7064611b-7c666a9d1291f7a4.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/7271-88209f6422b519ac.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/7392-77f111a1e93eaee6.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/7842-645a5c59f9f74a5b.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/7898-9a0b460b86a9b79d.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/8010.d8e3a044a5223299.js",revision:"d8e3a044a5223299"},{url:"/_next/static/chunks/8115-d6533c9e5e169500.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/8116-a3083afb64c2019c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/8173-5c7915090ea352bb.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/8472-a03d9db93d874eb8.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/8565-94e3ffafcd2ae8aa.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/904-b8ceb645ed2c1714.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/9242-e6134690bc594874.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/(auth)/layout-22426cf6bcf84c80.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/(auth)/sign-in/page-1be757d1b24c461c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/(auth)/sign-in/qr/page-d78da3dd63eac20c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/(root)/page-9011c3e390e23382.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/_not-found/page-a798221fdadb5662.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/(graphs)/line-targetActual/page-a279a7f803ad8602.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/analytics/all-defects/page-b62c352108d1eb59.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/analytics/line-efficiency-report/page-53f207689246e689.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/analytics/loading-9a24732aecd5e12d.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/analytics/page-a357571f2a04ae9c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/defect-chart/page-86b6db4e17d964a5.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/excel-test/page-06ce5161ef66a1c9.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/layout-aac14e1f5ffacb78.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/line-eff-table/page-a0c247cc68189366.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/line-efficiency-resources/page-6ca24010e579db57.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/loading-faca6bde2a32e161.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/manage-users/loading-3dde27d7517df994.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/manage-users/page-a4e46476069d933e.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/page-996883dc35b2afda.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/reports/day-end/page-d783ee48452463e4.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/reports/loading-0489fd573cc92203.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/target-actual/page-de5f9073660813d3.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/admin/top-five/page-83021bd8e82f5d54.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/layout-6103cfcc4146b382.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/button-section-out/page-4cdf81fc472ec683.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/button-section-qc/%5BobbSheetId%5D/page-ea35b72f1780477a.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/button-section-qc/page-d3af883784dcf101.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/cutting-store-in/page-f015e347ac766576.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/cutting-store-out/page-2b4ce3b8e104b66a.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/drying-section-qc/page-72fb20335aac7c0b.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/end-qc/%5BobbSheetId%5D/page-20ac194bf254c043.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/end-qc/page-f9d70af2f4d8fcf6.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/finishing-line-in/page-67740d972b0d5f79.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/finishing-line-qc/page-fae91a3d63c46618.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/finishing-section-in/page-56236505650488a6.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/finishing-section-out/page-2efe8f5329992d78.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/gmt-production-back-in/page-d4d276c91247d6fb.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/%5BobbSheetId%5D/page-811eb83235ce0179.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/page-c5ac5d51abc0690a.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/gmt-production-front-in/page-cbe2598597abcb87.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/%5BobbSheetId%5D/page-7475855c9245bf43.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/page-c691726f771e6396.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/layout-c85d6b0eb05e533c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/packing-section-in/page-6b6a38f4e4fb66e7.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/product-assembly-qc/%5BobbSheetId%5D/page-e5d10eae608354aa.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/product-assembly-qc/page-48128195e482d02d.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/product-assembly/%5BobbSheetId%5D/page-72280909830a63af.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/product-assembly/page-c065eb045e7ba975.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/sample-point/page-34f950a4c898513b.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/washing-section-in/page-d120858f23d79630.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/washing-section-out/page-88c4bc6c0c9a71b3.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/app/points/wetting-section-qc/page-03a13c7ac585733e.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/b2d98e07-7c864ae459b98fa7.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/fd9d1056-243bd5c67dd7f6c9.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/ff804112-0045e840d777fa74.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/framework-56dfd39ab9a08705.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/main-3bee7aa0c25bce7c.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/main-app-5d01c9327b916ffa.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-838c27795e60a250.js",revision:"FoR6DnLqOsvTzVJ3-JqRF"},{url:"/_next/static/css/2301133ff1851301.css",revision:"2301133ff1851301"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/2641bfa8d355064d-s.woff2",revision:"c926b29b44328ae02bf34eeea4b61b7c"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/2c062342b1fab89d-s.p.woff2",revision:"90014cf16466d93af47ac74be725aa6a"},{url:"/_next/static/media/2cc74b96cdc9383d-s.p.woff2",revision:"aa46b18b06759d7ed576d7f31bb00f2a"},{url:"/_next/static/media/2e7d59395f7802aa-s.woff2",revision:"0e6b404664ba0686b6aba8757610841e"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3d88ad18e9ebd0fb-s.woff2",revision:"8443fdbcc18980c41dd6560646464afd"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4b2c76e277457ca7-s.woff2",revision:"c05376a46b7554ff728d15ef9a796103"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/53f74bc14e929f80-s.woff2",revision:"6e877ca75d6894f7c8da48686c1b4cba"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7361da631c442576-s.woff2",revision:"af8fbe23c25ebc16d2d6418a9240ec56"},{url:"/_next/static/media/7c1535108079abc4-s.p.woff2",revision:"332a80cf65a428ba6f3a08ef6fbba970"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8a46cfca7977140b-s.p.woff2",revision:"bbe7ffba23d88db7110d165a621bcffc"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/8f91baacbcce7392-s.p.woff2",revision:"be3f685101a4a347c3d77ff968436971"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c393c397a049ab95-s.woff2",revision:"c18e6a21d67dcb103794e696d71cd0c9"},{url:"/_next/static/media/c99ef75952aca458-s.p.woff2",revision:"daa3e17afd40981909a5120927be978a"},{url:"/_next/static/media/cf1f69a0c8aed54d-s.p.woff2",revision:"591c48fae7732f35790aeda9bea56f01"},{url:"/_next/static/media/d8a0c67dc31f196e-s.woff2",revision:"7895fdec0e2f11727c9305ade33e7e49"},{url:"/_next/static/media/decf5989f4e7f901-s.p.woff2",revision:"9b277f891343465c462f609a69889cec"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/e4f1ac6216f8d8cb-s.woff2",revision:"28bf8762089663e67c617ff8d0bc372f"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f0496e21808c976b-s.p.woff2",revision:"16a4a2fe967ec89f31c4824506653104"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/data/ProductionLine.json",revision:"b877284b0f86e188880a757272eabeeb"},{url:"/data/ScanningPoint.json",revision:"a440767ee3634466eb7c27018be0c920"},{url:"/data/User.json",revision:"087a14ff476b747290a255e7a597955b"},{url:"/icons/icon-128x128.png",revision:"9138fa13a8ca08f4cfacdc93d0abc2e0"},{url:"/icons/icon-144x144.png",revision:"5e9ccb8754fd2df0b9f3eba40a5f5d6c"},{url:"/icons/icon-152x152.png",revision:"ff4f29e2d0ab402a179a33bda2ba20b3"},{url:"/icons/icon-192x192.png",revision:"2bd2da57d9d6b93e4e7fca87c27d47ea"},{url:"/icons/icon-384x384.png",revision:"7c8778c9bb2d279567763e8bd6287d00"},{url:"/icons/icon-48x48.png",revision:"aa26ca5b74b3cebc10b67849f1c65e3f"},{url:"/icons/icon-512x512.png",revision:"1f1d90f324e0cf830a453d846d8ecd20"},{url:"/icons/icon-72x72.png",revision:"773bb08bf3f85e68873f656d348f7e3b"},{url:"/icons/user-profile.svg",revision:"60542eae9c907d7783d6e13082be9d32"},{url:"/images/logo.png",revision:"580bf7267a4451e49248048ccc4ffbc4"},{url:"/images/logo.svg",revision:"2b0deac03f1184200bea01a707b61d41"},{url:"/images/no-data-found.gif",revision:"65cad4f7c707de47af5ee637621dd4ed"},{url:"/images/og-image.png",revision:"fdea5a2c3e19e18430df6ea0b253825c"},{url:"/images/scanning-files.gif",revision:"77e1e7d30dcac75689c96b83f67b48ab"},{url:"/images/scanning-qr.gif",revision:"466dd46469dea9f5f168a6ece2eddda1"},{url:"/images/welcome.gif",revision:"4687a8fba2a99bfb0ace812bd9dcd7af"},{url:"/manifest.json",revision:"a93f9c8cb4e8b5cf88a698db7ffad05f"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/template.xlsx",revision:"21e43b837bc28d39c99f5a81732c54f2"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
