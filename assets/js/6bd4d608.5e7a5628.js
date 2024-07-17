"use strict";(self.webpackChunk_flexi_bench_docs_site=self.webpackChunk_flexi_bench_docs_site||[]).push([[6929],{3639:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>r,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var i=t(2540),a=t(3023);const s={id:"simple-command",title:"simple-command",hide_title:!0},r="simple-command",o={id:"examples/simple-command",title:"simple-command",description:"",source:"@site/docs/examples/simple-command.md",sourceDirName:"examples",slug:"/examples/simple-command",permalink:"/flexi-bench/examples/simple-command",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"simple-command",title:"simple-command",hide_title:!0},sidebar:"tutorialSidebar",previous:{title:"Runner API",permalink:"/flexi-bench/examples/runner-api"}},m={},c=[];function l(e){const n={code:"code",h1:"h1",pre:"pre",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"simple-command",children:"simple-command"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="simple-command" showLineNumbers',children:"import { Benchmark, Suite, Variation } from '../src';\n\n(async () => {\n  const results = await new Suite('Simple Command Example')\n    .addBenchmark(\n      new Benchmark('CLI Flag Variance', {\n        iterations: 2,\n        action: 'sleep',\n      }).withVariations(Variation.FromCliArgs([['.1', '.01']])),\n    )\n    .addBenchmark(\n      new Benchmark('Environment Variable Variance', {\n        iterations: 2,\n        action: 'sleep $SLEEP_DURATION',\n      }).withVariations(\n        Variation.FromEnvironmentVariables([['SLEEP_DURATION', ['.1', '.01']]]),\n      ),\n    )\n    .run();\n})();\n\n"})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},3023:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var i=t(3696);const a={},s=i.createContext(a);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);