"use strict";(self.webpackChunk_pattern_lab_uikit_workshop=self.webpackChunk_pattern_lab_uikit_workshop||[]).push([[3],{153:function(e,t,n){n.r(t),n.d(t,{modalViewer:function(){return b}});var a=n(154),i=n(13),o=n(43),l=n.n(o),r=n(109),s=n.n(r),c=n(11),p=n(93),d=n(44),m=n.n(d);n(157),n(158),n(159),n(160),n(161),n(162),n(163),n(164),n(165),n(166),n(167),n(168),n(169),n(170);const g=m(),u={panels:[],count(){return this.panels.length},get(){return JSON.parse(JSON.stringify(u.panels))},add(e){for(let t=0;t<this.panels.length;++t)if(e.id===this.panels[t].id)return;this.panels.push(e)},remove(e){const t=this.panels;for(let n=t.length-1;n>=0;n--)if(t[n].id===e){const e=t[n];return t.splice(n,1),void(e.default&&t.length&&(t[0].default=!0))}}};i.Up.trigger("setupPanels"),function(){const e=void 0!==window.config.outputFileSuffixes&&void 0!==window.config.outputFileSuffixes.rawTemplate?window.config.outputFileSuffixes.rawTemplate:"",t=void 0!==window.config.outputFileSuffixes&&void 0!==window.config.outputFileSuffixes.markupOnly?window.config.outputFileSuffixes.markupOnly:".markup-only",n=Object.keys(g.languages);u.add({id:"pl-panel-pattern",name:window.config.patternExtension.toUpperCase(),default:!window.config.defaultPatternInfoPanelCode||window.config.defaultPatternInfoPanelCode===window.config.patternExtension,templateID:"pl-panel-template-code",httpRequest:!0,httpRequestReplace:e,httpRequestCompleted:!1,prismHighlight:!0,language:n[window.config.patternExtension],keyCombo:"ctrl+shift+u"}),u.add({id:"pl-panel-html",name:"HTML",default:window.config.defaultPatternInfoPanelCode&&"html"===window.config.defaultPatternInfoPanelCode,templateID:"pl-panel-template-code",httpRequest:!0,httpRequestReplace:t+".html",httpRequestCompleted:!1,prismHighlight:!0,language:"markup",keyCombo:"ctrl+shift+y"}),window.patternlab||(window.patternlab={}),window.patternlab.panels=u}();const f={addClickEvents(e,t){const n=e.querySelectorAll(".pl-js-tab-link");for(let a=0;a<n.length;++a)n[a].onclick=function(e){e.preventDefault();const t=this.getAttribute("data-patternpartial"),n=this.getAttribute("data-panelid");f.show(t,n)};return e},show(e,t){const n="pl-is-active-tab",a=document.querySelector(`#pl-${e}-${t}-panel`),i=a.closest(".pl-js-tabs"),o=i.querySelectorAll(".pl-js-tab-link"),l=i.querySelectorAll(".pl-js-tab-panel"),r=i.querySelector(`#pl-${e}-${t}-tab`);for(let s=0;s<o.length;++s)o[s].classList.remove(n);for(let s=0;s<l.length;++s)l[s].classList.remove(n);r.classList.add(n),a.classList.add(n)}};var h=n(16);new(n.n(h)())(".pl-js-code-copy-btn").on("success",(function(e){const t=document.querySelectorAll(".pl-js-code-copy-btn");for(let n=0;n<t.length;n++)t[n].querySelector(".pl-c-code-copy-btn__icon-text").innerText="Copy";e.trigger.classList.add("is-copied"),e.trigger.querySelector(".pl-c-code-copy-btn__icon-text").textContent="Copied",setTimeout((()=>{e.trigger.classList.remove("is-copied"),e.trigger.querySelector(".pl-c-code-copy-btn__icon-text").textContent="Copy",e.clearSelection(),e.trigger.blur()}),2e3)}));var w=n(76);const v=new(n.n(w)())({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0,"break-lines":100,indent:2,"remove-initial-line-feed":!0,"tabs-to-spaces":2,"spaces-to-tabs":2}),y={targetOrigin:"file:"===window.location.protocol?"*":window.location.protocol+"//"+window.location.host,initCopy:!1,initMoveTo:0,checkPanels(e,t,n,a){let i=0;for(let o=0;o<e.length;++o)void 0!==e[o].content&&i++;i===u.count()&&y.renderPanels(e,t,n,a)},gatherPanels(e,t,n){let a,o,r,d;i.Up.addListener("checkPanels",y.checkPanels);const m=u.get();for(let u=0;u<m.length;++u){const f=m[u];if(void 0===f.name&&(f.name=e.patternEngineName||e.patternExtension,f.language=e.patternExtension),void 0===f.httpRequestReplace&&(f.httpRequestReplace=""),""===f.httpRequestReplace&&(f.httpRequestReplace=f.httpRequestReplace+"."+e.patternExtension),void 0!==f.templateID&&f.templateID)if(void 0!==f.httpRequest&&f.httpRequest){const a=i.I.getFileName(e.patternPartial,!1),o=new XMLHttpRequest;o.onload=function(e,a,o,l){return function(){let l=this.responseText;l.startsWith("<!DOCTYPE html>")&&(l=""),d="HTML"===a[e].name?s()(l,{ocd:!0}):l;const r=g.highlight(d,g.languages[a[e].name.toLowerCase()]||g.languages.markup),m=(e,t)=>c.dy`
                  <pre
                    class="language-markup"
                  ><code id="pl-code-fill-${t}" class="language-${t}">${(0,p.A)(e)}</code></pre>
                `,u=document.createDocumentFragment(),f=document.createDocumentFragment();(0,c.sY)(m(r,"html"),u),(0,c.sY)(m(d,"html"),f),u.children?a[e].content=u.children[0].outerHTML:f.children?a[e].content=f.children[0].outerHTML:a[e].content='<pre class="language-markup"><code id="pl-code-fill-html" class="language-html">'+d.replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</code></pre>",i.Up.trigger("checkPanels",[a,o,t,n])}}(u,m,e),o.open("GET",a+f.httpRequestReplace+"?"+(new Date).getTime(),!0),o.send()}else{a=document.getElementById(f.templateID),o=l().compile(a.innerHTML),r=o(e);const s=v.normalize(r);s.replace(/[\r\n]+/g,"\n\n");const c=g.highlight(s,g.languages.html);m[u].content=c,i.Up.trigger("checkPanels",[m,e,t,n])}}},renderPanels(e,t,n,a){const o=t;let r,s,c,p,d;const m=o.patternPartial;o.panels=e,n||0!==o.patternDesc.length||(o.patternDesc=""),o.patternNameCaps=o.patternName.toUpperCase();const g=document.createElement("div");g.innerHTML=o.patternMarkup,c=1,o.annotations=[],delete o.patternMarkup;for(let i=0;i<window.comments.comments.length;++i)d=window.comments.comments[i],p=g.querySelectorAll(d.el),p.length>0&&(s={displayNumber:c,el:d.el,title:d.title,comment:d.comment},o.annotations.push(s),c++);if(o.annotations.length>0){const e=JSON.stringify({event:"patternLab.annotationsHighlightShow",annotations:o.annotations});document.querySelector(".pl-js-iframe").contentWindow.postMessage(e,y.targetOrigin)}if(o.lineage.length>0)for(let i=0;i<o.lineage.length;++i)i<o.lineage.length-1&&(o.lineage[i].hasComma=!0);if(o.lineageR.length>0)for(let i=0;i<o.lineageR.length;++i)i<o.lineageR.length-1&&(o.lineageR[i].hasComma=!0);o.patternDescExists=o.patternDesc.length>0||void 0!==o.patternDescAdditions&&o.patternDescAdditions.length>0,o.lineageExists=0!==o.lineage.length,o.lineageRExists=0!==o.lineageR.length,o.patternStateExists=o.patternState.length>0,o.annotationExists=o.annotations.length>0,o.descBlockExists=o.patternDescExists||o.lineageExists||o.lineageRExists||o.patternStateExists||o.annotationExists,o.isPatternView=!1===n;const u=document.querySelector(".pl-js-panel-template-base");r=l().compile(u.innerHTML)(o);const h=document.createElement("div");h.className="pl-c-pattern-info",h.innerHTML=r,r=h,r=f.addClickEvents(r,m);for(let i=0;i<e.length;++i){const t=e[i],n="#pl-"+m+"-"+t.id+"-tab",a="#pl-"+m+"-"+t.id+"-panel";null!==r.querySelector(n)&&t.default&&(r.querySelector(n).classList.add("pl-is-active-tab"),r.querySelector(a).classList.add("pl-is-active-tab"))}i.Up.trigger("insertPanels",[r,m,n,a])}};var E=n(10),S=n(171);const b={delayCheckingModalViewer:!1,iframeElement:document.querySelector(".pl-js-iframe"),iframeCustomElement:document.querySelector("pl-iframe"),active:!1,switchText:!0,template:"info",patternData:{},targetOrigin:"file:"===window.location.protocol?"*":window.location.protocol+"//"+window.location.host,onReady(){window.addEventListener("message",b.receiveIframeMessage,!1),i.Up.addListener("insertPanels",b.insert),b.__storeUnsubscribe=E.h.subscribe((()=>b._stateChanged(E.h.getState()))),b._stateChanged(E.h.getState());const e=i.I.getRequestVars();void 0===e.view||"code"!==e.view&&"c"!==e.view&&"annotations"!==e.view&&"a"!==e.view||E.h.dispatch((0,S.aw)(!0))},toggle(){b.active?E.h.dispatch((0,S.aw)(!1)):E.h.dispatch((0,S.aw)(!0))},open(){if(b.queryPattern(),b.patternData&&b.patternData.annotations&&b.patternData.annotations.length>0){const e=JSON.stringify({event:"patternLab.annotationsHighlightShow",annotations:b.patternData.annotations});b.iframeElement.contentWindow?b.iframeElement.contentWindow.postMessage(e,b.targetOrigin):(b.iframeElement=document.querySelector(".pl-js-iframe"),b.iframeElement.contentWindow?b.open():console.log("modelViewer open cannot find the iframeElement..."))}},close(){const e=JSON.stringify({event:"patternLab.patternModalClose"});if(b.iframeElement)if(b.iframeElement.contentWindow){b.iframeElement.contentWindow.postMessage(e,b.targetOrigin);const t=JSON.stringify({event:"patternLab.annotationsHighlightHide"});b.iframeElement.contentWindow.postMessage(t,b.targetOrigin)}else b.iframeElement=document.querySelector(".pl-js-iframe"),b.iframeElement.contentWindow?b.close():console.log("modelViewer close cannot find the iframeElement...")},insert(e,t,n,a){if(n){const a=JSON.stringify({event:"patternLab.patternModalInsert",patternPartial:t,modalContent:e.outerHTML});b.iframeElement.contentWindow?b.iframeElement.contentWindow.postMessage(a,b.targetOrigin):(b.iframeElement=document.querySelector(".pl-js-iframe"),b.iframeElement.contentWindow?b.insert(e,t,n):console.log("modelViewer insert cannot find the iframeElement..."))}else{const t=document.querySelector(".pl-js-drawer-content");if(null!==t.firstChild)for(;null!==t.firstChild;)t.removeChild(t.firstChild);t.appendChild(e),b.addClickEvents(t)}},addClickEvents(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:document).querySelectorAll(".pl-js-lineage-link").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-patternpartial");t&&b.iframeCustomElement&&(e.preventDefault(),b.iframeCustomElement.navigateTo(t))}))}))},refresh(e,t,n){b.patternData=e,y.gatherPanels(e,t,n)},slide(e){b.toggle()},slideToAnnotation(e){const t=document.querySelectorAll(".pl-js-annotations li");for(let a=0;a<t.length;++a)t[a].classList.remove("pl-is-active");const n=document.querySelector(".pl-js-pattern-info");for(let i=0;i<t.length;++i)i+1===e&&(t[i].classList.add("pl-is-active"),(0,a.X5)(n,{top:t[i].offsetTop-14,behavior:"smooth"}).then((function(){})))},queryPattern(e){const t=JSON.stringify({event:"patternLab.patternQuery",switchText:e});b.iframeElement?b.iframeElement.contentWindow?b.iframeElement.contentWindow.postMessage(t,b.targetOrigin):(b.iframeElement=document.querySelector(".pl-js-iframe"),b.iframeElement.contentWindow?b.queryPattern(e):console.log("queryPattern cannot find the iframeElement...")):(b.iframeElement=document.querySelector(".pl-js-iframe"),b.iframeElement.contentWindow&&b.iframeElement.contentWindow.postMessage(t,b.targetOrigin))},receiveIframeMessage(e){const t=(0,i.Kz)(e);void 0!==t.event&&"patternLab.pageLoad"===t.event?(b.delayCheckingModalViewer&&b._handleInitialModalViewerState(),0===t.patternpartial.indexOf("viewall-")||0===t.patternpartial.indexOf("all")?E.h.dispatch((0,S.wB)(!0)):E.h.dispatch((0,S.wB)(!1)),!1===b.active&&void 0!==t.patternpartial&&0===t.patternpartial.indexOf("viewall-")&&void 0!==window.config.defaultShowPatternInfo&&window.config.defaultShowPatternInfo?b.queryPattern(!1):!0===b.active&&b.queryPattern()):void 0!==t.event&&"patternLab.patternQueryInfo"===t.event?b.panelRendered&&b.previouslyRenderedPattern===t.patternData.patternPartial||b.refresh(t.patternData,t.iframePassback,t.switchText):void 0!==t.event&&"patternLab.annotationNumberClicked"===t.event&&b.slideToAnnotation(t.displayNumber)},_handleInitialModalViewerState(){b.iframeElement||(b.iframeElement=document.querySelector(".pl-js-iframe")),b.iframeElement?(b.delayCheckingModalViewer=!1,b.active?b.open():b.close()):b.delayCheckingModalViewer=!0},_stateChanged(e){b.active!==e.app.drawerOpened&&(b.active=e.app.drawerOpened,b.iframeElement&&b._handleInitialModalViewerState())}};b.onReady()}}]);