if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>i(e,c),d={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1024-08f3bef68c2f1b47.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/1110-8413036db6323887.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/13b76428-5a68792917164904.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/1846-686b24005c0ed2bc.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/1859-f53018bf649a3e5b.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/1941.2e9edb5ca6c186cb.js",revision:"2e9edb5ca6c186cb"},{url:"/_next/static/chunks/2071-2e14d3dee16534e7.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/2170a4aa-5fbd044853750a37.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/231-aab70b2f22e99513.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/2400-9221e3d9a06a8754.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/2626716e-b496a3b36b79551a.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/2836-cd25a979eda9b2fb.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/3146-8c7e19bc87cb264e.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/3408-f11d01eca74deaf0.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/3975359d.def7cbc1dd494990.js",revision:"def7cbc1dd494990"},{url:"/_next/static/chunks/3998-9eef5c2395af0d47.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/4367-aa6b5df39ce1ad08.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/4440-03f1263dc8a286f3.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/4531-22e0cde88f569340.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/477-bf19c62aa6161635.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/4868-54961ce9006eb59a.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/5190-d8f2742d480d33e0.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/5273-96e9ab285be48749.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/5333-18b73e6e7e991215.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/5380-85e735c26023ef65.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/5428-9f6f51c25d0d53ac.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/629-51c9a347a03ab764.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/6300-869dc042b17a69e1.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/6592-21949d25e527a6a8.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/6939-864e20df0427bd74.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/7064611b-7c666a9d1291f7a4.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/7221-6707a40fa4fa15be.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/7238-99330d044b53fe6e.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/8010.d8e3a044a5223299.js",revision:"d8e3a044a5223299"},{url:"/_next/static/chunks/8115-d6533c9e5e169500.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/8116-a3083afb64c2019c.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/8173-5c7915090ea352bb.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/8472-a03d9db93d874eb8.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/8565-2bd5603089372095.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/904-f661c94e70209bb3.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/9242-e6134690bc594874.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/9634-18e40af4c4fd0c7c.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/9689-595ed3c665484d93.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(auth)/layout-a72bcc618a6bd8af.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(auth)/sign-in/page-a45689d4ad124733.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(auth)/sign-in/qr/page-9888675bf678ccb6.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(root)/page-97a23b20f2d44053.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(tv-charts)/line-dhu/%5Bunit%5D/page-5a734a850290bb9c.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(tv-charts)/line-eff/%5Bunit%5D/page-3efd7c206ec7fd3d.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(tv-charts)/top-five/%5Bunit%5D/page-24bf13b197cd8e00.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/(tv-charts)/unit-targetActual/%5Bunit%5D/page-cfdf5930a38b6a01.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/_not-found/page-a798221fdadb5662.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/line-all-defect/page-374f5b89e74b76ac.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/line-dhu/page-729c8579e4cf64ae.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/line-efficiency-data/page-f7c449076fd39635.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/line-efficiency-graph/page-80857e45f5bb9795.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/line-targetActual/page-b55c31f99d8a5dca.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/sectional-dhu/page-e9e163c605628c76.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/unit-all-defect/page-90a9babcbc17e17e.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/(graphs)/unit-target-actual/page-cdff25ba2aa3933f.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/analytics/all-defects/page-73aa71e8b901cde6.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/analytics/line-efficiency-report/page-e5b42a7aaee826ef.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/analytics/loading-869bf0f74b872de7.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/analytics/page-c63166598f0460d2.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/defect-chart/page-fdb4104d5e0236a1.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/excel-test/page-d6218e8989e75403.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/layout-372de81a7a6b6d2f.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/line-eff-table/page-7e49e1639ad43de2.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/line-efficiency-resources/page-53bb4311532cbad7.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/loading-130d5d22dcbd63c5.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/manage-users/loading-afdb0f34ce1fe0ae.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/manage-users/page-d738d8f0fb040d2c.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/page-f44715068b6d17d3.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/reports/day-end/page-010d0b3496b1a7c7.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/reports/loading-cd1c4fe55ab0c4d0.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/target-actual/page-167c26f87ab2fb17.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/top-five/page-43c69dcba2182c94.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/admin/track-garment-rfid/page-71ac528c253f536d.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/layout-e7bd27739e9fa978.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/button-section-out/page-a3d1769c8cc18f47.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/button-section-qc/%5BobbSheetId%5D/page-e75b73202ca3cfa7.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/button-section-qc/page-60803f77d1985e1a.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/cutting-store-in/page-e99d81f1ee545003.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/cutting-store-out/page-ca33ac5ed151a9f8.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/drying-section-qc/%5BobbSheetId%5D/page-4aab932b8e10586c.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/drying-section-qc/page-649052e5577e64e0.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/end-qc/%5BobbSheetId%5D/page-e4d9cede252555fe.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/end-qc/page-b50a3147720d78eb.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/finishing-line-in/page-213bb455200f3bf4.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/finishing-line-qc/page-ce44e796b1b777df.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/finishing-section-in/page-3902b40c06132b31.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/finishing-section-out/page-b95197313a3d92ed.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/gmt-production-back-in/page-33d4a5b2913d4e70.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/%5BobbSheetId%5D/page-25a43173554fac88.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/page-ddecebfc84b78297.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/gmt-production-front-in/page-4043d1ac521e9477.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/%5BobbSheetId%5D/page-3d5932d793fe87ac.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/page-880de77ba6add303.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/layout-11e8cbced040150a.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/packing-section-in/page-4d39de45d86b880f.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/product-assembly-qc/%5BobbSheetId%5D/page-7a34505345a3fda3.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/product-assembly-qc/page-fbe1e1622a340114.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/product-assembly/%5BobbSheetId%5D/page-7c43adf70540adb8.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/product-assembly/page-bcf49b30b4e71edd.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/sample-point/page-e412be80eaf1baa5.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/washing-section-in/page-449d11e285deae6d.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/washing-section-out/page-df98396713802a09.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/wetting-section-qc/%5BobbSheetId%5D/page-afeda5bda78f6328.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/app/points/wetting-section-qc/page-391da97f8844b42b.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/b2d98e07-7c864ae459b98fa7.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/fd9d1056-243bd5c67dd7f6c9.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/ff804112-0045e840d777fa74.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/framework-56dfd39ab9a08705.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/main-929b7a5c50e64ce6.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/main-app-62162ac96a0c3adc.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-838c27795e60a250.js",revision:"iVSFMYALgNKOMsm0TEkPl"},{url:"/_next/static/css/fab065faa955ae69.css",revision:"fab065faa955ae69"},{url:"/_next/static/iVSFMYALgNKOMsm0TEkPl/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/iVSFMYALgNKOMsm0TEkPl/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/2641bfa8d355064d-s.woff2",revision:"c926b29b44328ae02bf34eeea4b61b7c"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/2c062342b1fab89d-s.p.woff2",revision:"90014cf16466d93af47ac74be725aa6a"},{url:"/_next/static/media/2cc74b96cdc9383d-s.p.woff2",revision:"aa46b18b06759d7ed576d7f31bb00f2a"},{url:"/_next/static/media/2e7d59395f7802aa-s.woff2",revision:"0e6b404664ba0686b6aba8757610841e"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/3d88ad18e9ebd0fb-s.woff2",revision:"8443fdbcc18980c41dd6560646464afd"},{url:"/_next/static/media/3f9466fc53690ba7-s.woff2",revision:"173212bc7f69965527b29df7419d615c"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4b2c76e277457ca7-s.woff2",revision:"c05376a46b7554ff728d15ef9a796103"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/53f74bc14e929f80-s.woff2",revision:"6e877ca75d6894f7c8da48686c1b4cba"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7361da631c442576-s.woff2",revision:"af8fbe23c25ebc16d2d6418a9240ec56"},{url:"/_next/static/media/7c1535108079abc4-s.p.woff2",revision:"332a80cf65a428ba6f3a08ef6fbba970"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8a46cfca7977140b-s.p.woff2",revision:"bbe7ffba23d88db7110d165a621bcffc"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/8f91baacbcce7392-s.p.woff2",revision:"be3f685101a4a347c3d77ff968436971"},{url:"/_next/static/media/94575ae3783e7c88-s.woff2",revision:"a56bc9adab4ad49a6e6d19f72ac23bc0"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c393c397a049ab95-s.woff2",revision:"c18e6a21d67dcb103794e696d71cd0c9"},{url:"/_next/static/media/c99ef75952aca458-s.p.woff2",revision:"daa3e17afd40981909a5120927be978a"},{url:"/_next/static/media/cf1f69a0c8aed54d-s.p.woff2",revision:"591c48fae7732f35790aeda9bea56f01"},{url:"/_next/static/media/d8a0c67dc31f196e-s.woff2",revision:"7895fdec0e2f11727c9305ade33e7e49"},{url:"/_next/static/media/decf5989f4e7f901-s.p.woff2",revision:"9b277f891343465c462f609a69889cec"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/dfa2ccbeca9e77a8-s.woff2",revision:"4d88c8f550833714f8721257780b9000"},{url:"/_next/static/media/e4f1ac6216f8d8cb-s.woff2",revision:"28bf8762089663e67c617ff8d0bc372f"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f0496e21808c976b-s.p.woff2",revision:"16a4a2fe967ec89f31c4824506653104"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/data/ProductionLine.json",revision:"b877284b0f86e188880a757272eabeeb"},{url:"/data/ScanningPoint.json",revision:"a440767ee3634466eb7c27018be0c920"},{url:"/data/User.json",revision:"087a14ff476b747290a255e7a597955b"},{url:"/eliot-logo.png",revision:"5d6b4d3506591272abab55320e8bc39e"},{url:"/icons/icon-128x128.png",revision:"9138fa13a8ca08f4cfacdc93d0abc2e0"},{url:"/icons/icon-144x144.png",revision:"5e9ccb8754fd2df0b9f3eba40a5f5d6c"},{url:"/icons/icon-152x152.png",revision:"ff4f29e2d0ab402a179a33bda2ba20b3"},{url:"/icons/icon-192x192.png",revision:"2bd2da57d9d6b93e4e7fca87c27d47ea"},{url:"/icons/icon-384x384.png",revision:"7c8778c9bb2d279567763e8bd6287d00"},{url:"/icons/icon-48x48.png",revision:"aa26ca5b74b3cebc10b67849f1c65e3f"},{url:"/icons/icon-512x512.png",revision:"1f1d90f324e0cf830a453d846d8ecd20"},{url:"/icons/icon-72x72.png",revision:"773bb08bf3f85e68873f656d348f7e3b"},{url:"/icons/user-profile.svg",revision:"2676d8aae1aa6a56c3c8753cd73d1bef"},{url:"/images/image.png",revision:"8ed97e3b502760e4a22b7f5a6f4057dd"},{url:"/images/logo.png",revision:"580bf7267a4451e49248048ccc4ffbc4"},{url:"/images/logo.svg",revision:"07c1f4beaa8c3066c7ee380179e109c1"},{url:"/images/logoo.png",revision:"5cfddf889c65cf90776581c5a0bd31b5"},{url:"/images/no-data-found.gif",revision:"65cad4f7c707de47af5ee637621dd4ed"},{url:"/images/og-image.png",revision:"fdea5a2c3e19e18430df6ea0b253825c"},{url:"/images/scanning-files.gif",revision:"77e1e7d30dcac75689c96b83f67b48ab"},{url:"/images/scanning-qr.gif",revision:"466dd46469dea9f5f168a6ece2eddda1"},{url:"/images/scanning-qr2.gif",revision:"5ee126b473da09c1479160fd9255ed0f"},{url:"/images/welcome.gif",revision:"4687a8fba2a99bfb0ace812bd9dcd7af"},{url:"/manifest.json",revision:"a93f9c8cb4e8b5cf88a698db7ffad05f"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/template.xlsx",revision:"21e43b837bc28d39c99f5a81732c54f2"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
