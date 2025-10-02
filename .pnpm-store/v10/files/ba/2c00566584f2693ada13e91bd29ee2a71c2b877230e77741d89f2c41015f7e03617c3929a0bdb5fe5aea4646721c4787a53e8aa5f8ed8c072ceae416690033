import{isServer as t}from"lit-html/is-server.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s{constructor(s,{target:i,config:h,callback:o,skipInitial:e}){this.t=new Set,this.o=!1,this.i=!1,this.h=s,null!==i&&this.t.add(i??s),this.l=h,this.o=e??this.o,this.callback=o,t||(window.MutationObserver?(this.u=new MutationObserver((t=>{this.handleChanges(t),this.h.requestUpdate()})),s.addController(this)):console.warn("MutationController error: browser does not support MutationObserver."))}handleChanges(t){this.value=this.callback?.(t,this.u)}hostConnected(){for(const t of this.t)this.observe(t)}hostDisconnected(){this.disconnect()}async hostUpdated(){const t=this.u.takeRecords();(t.length||!this.o&&this.i)&&this.handleChanges(t),this.i=!1}observe(t){this.t.add(t),this.u.observe(t,this.l),this.i=!0,this.h.requestUpdate()}disconnect(){this.u.disconnect()}}export{s as MutationController};
//# sourceMappingURL=mutation-controller.js.map
