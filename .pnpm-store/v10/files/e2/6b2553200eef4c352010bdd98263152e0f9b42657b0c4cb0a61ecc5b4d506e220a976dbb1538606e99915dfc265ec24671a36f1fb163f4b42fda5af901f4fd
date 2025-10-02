import{isServer as t}from"lit-html/is-server.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s{constructor(s,{target:i,config:h,callback:e,skipInitial:o}){this.t=new Set,this.o=!1,this.i=!1,this.h=s,null!==i&&this.t.add(i??s),this.o=o??this.o,this.callback=e,t||(window.IntersectionObserver?(this.u=new IntersectionObserver((t=>{const s=this.i;this.i=!1,this.o&&s||(this.handleChanges(t),this.h.requestUpdate())}),h),s.addController(this)):console.warn("IntersectionController error: browser does not support IntersectionObserver."))}handleChanges(t){this.value=this.callback?.(t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){const t=this.u.takeRecords();t.length&&this.handleChanges(t)}observe(t){this.t.add(t),this.u.observe(t),this.i=!0}unobserve(t){this.t.delete(t),this.u.unobserve(t)}disconnect(){this.u.disconnect()}}export{s as IntersectionController};
//# sourceMappingURL=intersection-controller.js.map
