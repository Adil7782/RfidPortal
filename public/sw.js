if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let r={};const c=e=>a(e,t),u={module:{uri:t},exports:r,require:c};s[t]=Promise.all(i.map((e=>u[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1289-3cf9348e58bc35cc.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/13b76428-5a68792917164904.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/164f4fb6-923c716148a2f877.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/170-4429cb76bc8a3caf.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/1838.20f56d2166206178.js",revision:"20f56d2166206178"},{url:"/_next/static/chunks/1846-882b006189ef8b48.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/1859-8a94bbc40cf5cbc5.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/1860-054369933ad1fbd8.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/1941.9db4ceff0eac50f0.js",revision:"9db4ceff0eac50f0"},{url:"/_next/static/chunks/2170a4aa-779f611c1e2eb96f.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/225-48878190869c9d72.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/2256-02751d951319f731.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/231-8e71271009336a5b.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/2400-3f8720a213623b35.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/2626716e-73bf811bf7818e31.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/2862-04b636b763106045.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/3231-09d1554773526246.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/3328-d181295992656b66.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/3975359d.83b45800821d2926.js",revision:"83b45800821d2926"},{url:"/_next/static/chunks/4086-43d62c8f46b228d8.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4151-51b0201cf98dc2ed.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4180-2613a9f88f5e915a.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4347-097576eb14a666b4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4505-58eeff6125a56cc1.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4531-e438c259c05fef7a.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4565-40af31ed198247a2.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4868-a7505598bd083c39.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/4890-dda8817157ee9a9a.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/5190-26d452e8e5e4d89d.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/5428-e6fd932f5f2ccb0f.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/6035-30a8ddb06190cfc8.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/6142-05697f3d1fcb9243.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/6300-869dc042b17a69e1.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/6592-79c16ac60957d5c2.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/679.e83251910bede9ab.js",revision:"e83251910bede9ab"},{url:"/_next/static/chunks/6939-6f41a46795e3c15c.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7054-8654ab9c0a487869.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7058-ef262600c0f59ff1.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7064611b-7c666a9d1291f7a4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7271-f57f15732a8182cf.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7683-6c8577f8d3ae52a6.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7842-a4a390315593f4f6.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/7898-faf73d482ca53b9f.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/8010.e0a358c7ad69a0b3.js",revision:"e0a358c7ad69a0b3"},{url:"/_next/static/chunks/8173-e73602a07f2e4a4d.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/8242-628b887ec8823516.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/8472-54d45c371d3901c1.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/904-f6df32d6934d2048.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/9242-fb06de1963839457.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/9565-765f0e9771d40bb9.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/9634-ed3005ac412473ae.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/ad2866b8-b2aba5370a0d21e8.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(auth)/layout-22426cf6bcf84c80.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(auth)/sign-in/page-973a1d8fefff86e8.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(auth)/sign-in/qr/page-5dbb8c34f884b15d.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(other-points)/track-garment-rfid/layout-456ffd366126b1e4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(other-points)/track-garment-rfid/page-f885e717156de49d.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(root)/page-5a3f74524bf8296f.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(tv-charts)/line-dhu/%5Bunit%5D/page-3a655902906adcd4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(tv-charts)/line-eff/%5Bunit%5D/page-50ffaf5d60e62704.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(tv-charts)/top-five-style/%5Bstyle%5D/page-298a002cf8635a18.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(tv-charts)/top-five/%5Bunit%5D/page-f0a060a455414e01.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/(tv-charts)/unit-targetActual/%5Bunit%5D/page-306b94febfc90965.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/_not-found/page-8121fd35db6a0074.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/line-all-defect/page-808773e546167e94.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/line-dhu/page-d05d09ab6d440f77.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/line-efficiency-data/page-a0160c222781198f.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/line-efficiency-graph/page-f6bd3af3a2fcdfcc.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/line-targetActual/page-ced32803909e8db6.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/sectional-dhu/page-7042d3a125b0d540.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/top-five-style/page-980f8787cb3562d9.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/unit-all-defect/page-7616b0e1cb934154.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(graphs)/unit-target-actual/page-82de4448416330e3.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(report)/line-end/page-8af7b92bcc42f467.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(report)/point-non-qc/page-8663eb6ec5881052.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/(report)/point-qc/page-dfd9612267bd5e92.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/analytics/all-defects/page-edd612a1468b7f9c.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/analytics/line-efficiency-report/page-cd1c18c54d0aa768.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/analytics/loading-7e0eacb7293fff66.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/analytics/page-b43c9b2569aa77c2.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/defect-chart/page-94dde36199218666.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/excel-test/page-6140642748e6dad2.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/layout-76dcb4aecd7869ef.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/line-eff-table/page-f59b0ffcad91b7f3.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/line-efficiency-resources/page-73f86a44b88ddbc6.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/loading-e0b0d6b57f590745.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/manage-defects/page-2bd534efbb040179.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/manage-users/loading-6f038c41d786ec5b.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/manage-users/page-a0e8360a1978da96.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/page-996883dc35b2afda.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/reports/day-end/page-e5169f16292bec4d.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/reports/loading-21b620526807edaf.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/set-qc-target/page-51018434df4860f0.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/target-actual/page-7cc9d46593751ea4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/admin/top-five/page-c8f24bd4e50253c8.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/layout-5e59d17fbd3a5f07.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/button-section-out/page-00130635f9d43994.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/button-section-qc/%5BobbSheetId%5D/page-4226b270b1071484.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/button-section-qc/page-43774c3977b0c216.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/cutting-store-in/page-b811d51a8a205627.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/cutting-store-out/page-c8507520284193c4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/drying-section-qc-after/%5BobbSheetId%5D/page-16efed0737ee8afe.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/drying-section-qc-after/page-cd3873203e2c9345.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/drying-section-qc-before/%5BobbSheetId%5D/page-ca5ee924835227fe.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/drying-section-qc-before/page-97cd52dee304f816.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/end-qc/%5BobbSheetId%5D/page-75ba72d3134e9678.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/end-qc/page-20f3d874e12801ed.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/finishing-line-in/page-abb4a7be0443787b.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/finishing-line-qc/%5Bline%5D/page-3a4eda8ff9ea27e2.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/finishing-line-qc/page-847c73086bfd7ad1.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/finishing-section-in/page-9a77148daafd647d.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/finishing-section-out/page-c854d84d16ac168b.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-back-in/%5BobbSheetId%5D/page-e58f39922e7724cc.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-back-in/page-efac8c2ba12aaa21.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/%5BobbSheetId%5D/page-aee2c252ff1f4ce9.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-back-qc/page-3aafaa83a21a3902.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-front-in/%5BobbSheetId%5D/page-49e03bea5dc57366.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-front-in/page-73d8a2e198e06117.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/%5BobbSheetId%5D/page-c00a30a36ffb98e4.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/gmt-production-front-qc/page-2f31b6672c683682.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/layout-d316fe84e1931d5a.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/packing-section-in/page-0bed57c418df5b04.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/product-assembly-qc/%5BobbSheetId%5D/page-e239e49dba6e96e9.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/product-assembly-qc/page-9d4e81abfdc33c37.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/product-assembly/%5BobbSheetId%5D/page-15186747c61abc15.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/product-assembly/page-f7b2fac22a99fa2a.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/washing-section-in/page-212feb5fd3991048.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/app/points/washing-section-out/page-4ddc1a6f69c71969.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/b2d98e07-7c864ae459b98fa7.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/bc98253f.9338023680b8fe36.js",revision:"9338023680b8fe36"},{url:"/_next/static/chunks/fd9d1056-b4d0727544bef608.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/ff804112-efddb85906035633.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/framework-56dfd39ab9a08705.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/main-3635bc5379b07f11.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/main-app-5d01c9327b916ffa.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a5991e3510c94bfd.js",revision:"y4y34RxrkNryvKAgu_OVs"},{url:"/_next/static/css/4ff8d7d0deb3a5e6.css",revision:"4ff8d7d0deb3a5e6"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/14a2557c68b21cd3-s.woff2",revision:"5aca1d659e6d10a5cb3b46d9f64074ca"},{url:"/_next/static/media/204a0a5e1cf12efb-s.woff2",revision:"be42593417fa02652b9ff4a81441c7f3"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/2c062342b1fab89d-s.p.woff2",revision:"90014cf16466d93af47ac74be725aa6a"},{url:"/_next/static/media/2cc74b96cdc9383d-s.p.woff2",revision:"aa46b18b06759d7ed576d7f31bb00f2a"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/59a78378d8ff98d4-s.woff2",revision:"ffbe88a6db0ea3c8ffb8bb5009aa7044"},{url:"/_next/static/media/5fb25f343c7550ca-s.woff2",revision:"b1ee7ba0b4c946e20d7859cddf2aa203"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6c9a125e97d835e1-s.woff2",revision:"889718d692d5bfc6019cbdfcb5cc106f"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7519ebedca413f1f-s.woff2",revision:"d204cdc7d6076b2cf96d85542064680b"},{url:"/_next/static/media/7c10e1e83b2e7f9a-s.woff2",revision:"1a443d0eb07414170301a2aadad432ed"},{url:"/_next/static/media/7c1535108079abc4-s.p.woff2",revision:"332a80cf65a428ba6f3a08ef6fbba970"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/7ede3623c9ddac57-s.woff2",revision:"352bd40859f4f3744377e2ad51836740"},{url:"/_next/static/media/8727a9eb9a9ed107-s.woff2",revision:"99cede87ba453043c2dcdea1fb9eec1b"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8a46cfca7977140b-s.p.woff2",revision:"bbe7ffba23d88db7110d165a621bcffc"},{url:"/_next/static/media/8f91baacbcce7392-s.p.woff2",revision:"be3f685101a4a347c3d77ff968436971"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a1386beebedccca4-s.woff2",revision:"d3aa06d13d3cf9c0558927051f3cb948"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/ae6a2fe692ea80aa-s.woff2",revision:"14cc59963a44a42ef70e69a4a236a7bd"},{url:"/_next/static/media/b8442747db2a9bad-s.woff2",revision:"bdb143282b9fa3a5da7f074b6f81e124"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/bd907a34e79d0cf5-s.woff2",revision:"3c95adff711e7150b3aade5a21070ca0"},{url:"/_next/static/media/c3bc380753a8436c-s.woff2",revision:"5a1b7c983a9dc0a87a2ff138e07ae822"},{url:"/_next/static/media/c99ef75952aca458-s.p.woff2",revision:"daa3e17afd40981909a5120927be978a"},{url:"/_next/static/media/cf1f69a0c8aed54d-s.p.woff2",revision:"591c48fae7732f35790aeda9bea56f01"},{url:"/_next/static/media/dec290caeb2cbe42-s.woff2",revision:"8e14723e4ea2e777978148284f186297"},{url:"/_next/static/media/decf5989f4e7f901-s.p.woff2",revision:"9b277f891343465c462f609a69889cec"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f0496e21808c976b-s.p.woff2",revision:"16a4a2fe967ec89f31c4824506653104"},{url:"/_next/static/media/f10b8e9d91f3edcb-s.woff2",revision:"63af7d5e18e585fad8d0220e5d551da1"},{url:"/_next/static/media/f54d3b402c212b9e-s.woff2",revision:"07771519abf754f445a139aedac251dc"},{url:"/_next/static/media/fe0777f1195381cb-s.woff2",revision:"f2a04185547c36abfa589651236a9849"},{url:"/_next/static/y4y34RxrkNryvKAgu_OVs/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/y4y34RxrkNryvKAgu_OVs/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/data/ProductionLine.json",revision:"b877284b0f86e188880a757272eabeeb"},{url:"/data/ScanningPoint.json",revision:"a440767ee3634466eb7c27018be0c920"},{url:"/data/User.json",revision:"087a14ff476b747290a255e7a597955b"},{url:"/eliot-logo.png",revision:"5d6b4d3506591272abab55320e8bc39e"},{url:"/icons/icon-128x128.png",revision:"9138fa13a8ca08f4cfacdc93d0abc2e0"},{url:"/icons/icon-144x144.png",revision:"5e9ccb8754fd2df0b9f3eba40a5f5d6c"},{url:"/icons/icon-152x152.png",revision:"ff4f29e2d0ab402a179a33bda2ba20b3"},{url:"/icons/icon-192x192.png",revision:"2bd2da57d9d6b93e4e7fca87c27d47ea"},{url:"/icons/icon-384x384.png",revision:"7c8778c9bb2d279567763e8bd6287d00"},{url:"/icons/icon-48x48.png",revision:"aa26ca5b74b3cebc10b67849f1c65e3f"},{url:"/icons/icon-512x512.png",revision:"1f1d90f324e0cf830a453d846d8ecd20"},{url:"/icons/icon-72x72.png",revision:"773bb08bf3f85e68873f656d348f7e3b"},{url:"/icons/user-profile.svg",revision:"60542eae9c907d7783d6e13082be9d32"},{url:"/images/image.png",revision:"8ed97e3b502760e4a22b7f5a6f4057dd"},{url:"/images/logo.png",revision:"580bf7267a4451e49248048ccc4ffbc4"},{url:"/images/logo.svg",revision:"2b0deac03f1184200bea01a707b61d41"},{url:"/images/logoo.png",revision:"5cfddf889c65cf90776581c5a0bd31b5"},{url:"/images/no-data-found.gif",revision:"65cad4f7c707de47af5ee637621dd4ed"},{url:"/images/og-image.png",revision:"fdea5a2c3e19e18430df6ea0b253825c"},{url:"/images/scanning-files.gif",revision:"77e1e7d30dcac75689c96b83f67b48ab"},{url:"/images/scanning-qr.gif",revision:"466dd46469dea9f5f168a6ece2eddda1"},{url:"/images/scanning-qr2.gif",revision:"5ee126b473da09c1479160fd9255ed0f"},{url:"/images/welcome.gif",revision:"4687a8fba2a99bfb0ace812bd9dcd7af"},{url:"/manifest.json",revision:"a93f9c8cb4e8b5cf88a698db7ffad05f"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/template.xlsx",revision:"21e43b837bc28d39c99f5a81732c54f2"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
