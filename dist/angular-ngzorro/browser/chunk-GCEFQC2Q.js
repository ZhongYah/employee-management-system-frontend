import{B as y,N as z,O as M,P as S,ia as D}from"./chunk-AIVDDSZ3.js";import"./chunk-F5FUQEAI.js";import{Fb as f,Gb as m,Ib as _,Jb as d,Kb as i,Lb as a,Mb as C,Nb as v,Ob as x,Yb as s,db as r,fc as u,gc as h,nc as T,qa as g,vb as c,xb as p}from"./chunk-R6OUPR6T.js";import"./chunk-CWTPBX7D.js";function E(e,t){if(e&1&&(i(0,"li"),C(1,"nz-badge",3),a()),e&2){let n=t.$implicit;r(),p("nzStatus",n.type)("nzText",n.content)}}function O(e,t){if(e&1&&_(0,E,2,2,"li",null,m),e&2){let n=s(2);d(n.listDataMap.eight)}}function B(e,t){if(e&1&&(i(0,"li"),C(1,"nz-badge",3),a()),e&2){let n=t.$implicit;r(),p("nzStatus",n.type)("nzText",n.content)}}function P(e,t){if(e&1&&_(0,B,2,2,"li",null,m),e&2){let n=s(2);d(n.listDataMap.ten)}}function b(e,t){if(e&1&&(i(0,"li"),C(1,"nz-badge",3),a()),e&2){let n=t.$implicit;r(),p("nzStatus",n.type)("nzText",n.content)}}function F(e,t){if(e&1&&_(0,b,2,2,"li",null,m),e&2){let n=s(2);d(n.listDataMap.eleven)}}function I(e,t){if(e&1&&(i(0,"ul",2),c(1,O,2,0)(2,P,2,0)(3,F,2,0),a()),e&2){let n,o=t.$implicit;r(),f(1,(n=o.getDate())===8?1:n===10?2:n===11?3:-1)}}function N(e,t){e&1&&(i(0,"div",4)(1,"section"),u(2),a(),i(3,"span"),u(4,"Backlog number"),a()()),e&2&&(r(2),h(t))}function $(e,t){if(e&1&&(v(0),c(1,N,5,1,"div",4),x()),e&2){let n,o=t.$implicit,l=s();r(),f(1,(n=l.getMonthData(o))?1:-1,n)}}var w=(()=>{let t=class t{getMonthData(o){return o.getMonth()===8?1394:null}constructor(){this.listDataMap={eight:[{type:"warning",content:"This is warning event."},{type:"success",content:"This is usual event."}],ten:[{type:"warning",content:"This is warning event."},{type:"success",content:"This is usual event."},{type:"error",content:"This is error event."}],eleven:[{type:"warning",content:"This is warning event"},{type:"success",content:"This is very long usual event........"},{type:"error",content:"This is error event 1."},{type:"error",content:"This is error event 2."},{type:"error",content:"This is error event 3."},{type:"error",content:"This is error event 4."}]}}ngOnInit(){}};t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=g({type:t,selectors:[["app-calendar"]],standalone:!0,features:[T],decls:5,vars:0,consts:[["class","events",4,"nzDateCell"],[4,"nzMonthCell"],[1,"events"],[3,"nzStatus","nzText"],[1,"notes-month"]],template:function(l,k){l&1&&(i(0,"p"),u(1,"\u884C\u4E8B\u66C6"),a(),i(2,"nz-calendar"),c(3,I,4,1,"ul",0)(4,$,2,1,"ng-container",1),a())},dependencies:[D,y,S,z,M],styles:[".events[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}.events[_ngcontent-%COMP%]   .ant-badge-status[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;width:100%;text-overflow:ellipsis;font-size:12px}.notes-month[_ngcontent-%COMP%]{text-align:center;font-size:28px}.notes-month[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{font-size:28px}"]});let e=t;return e})();var G=[{path:"",component:w}];export{G as CALENDAR_ROUTES};