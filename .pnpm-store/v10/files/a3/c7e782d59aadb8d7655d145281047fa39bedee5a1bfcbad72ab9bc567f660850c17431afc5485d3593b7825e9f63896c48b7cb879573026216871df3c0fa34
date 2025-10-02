import{isServer as s}from"lit-html/is-server.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class t{constructor(t,{config:i,callback:h,skipInitial:e}){this.o=!1,this.i=!1,this.h=t,this.l=i,this.o=e??this.o,this.callback=h,s||(window.PerformanceObserver?(this.u=new PerformanceObserver((s=>{this.handleChanges(s.getEntries(),s),this.h.requestUpdate()})),t.addController(this)):console.warn("PerformanceController error: browser does not support PerformanceObserver."))}handleChanges(s,t){this.value=this.callback?.(s,this.u,t)}hostConnected(){this.observe()}hostDisconnected(){this.disconnect()}async hostUpdated(){const s=this.u.takeRecords();(s.length||!this.o&&this.i)&&this.handleChanges(s),this.i=!1}flush(){const s=this.u.takeRecords();s.length&&(this.handleChanges(s),this.h.requestUpdate())}observe(){this.u.observe(this.l),this.i=!0,this.h.requestUpdate()}disconnect(){this.u.disconnect()}}export{t as PerformanceController};
//# sourceMappingURL=performance-controller.js.map
