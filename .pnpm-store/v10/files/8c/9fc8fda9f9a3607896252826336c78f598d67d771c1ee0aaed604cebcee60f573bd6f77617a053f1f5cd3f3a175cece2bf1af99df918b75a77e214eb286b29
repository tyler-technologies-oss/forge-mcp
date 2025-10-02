import{isServer as s}from"lit-html/is-server.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class t{constructor(t,{target:i,config:h,callback:e,skipInitial:o}){this.t=new Set,this.o=!1,this.i=!1,this.h=t,null!==i&&this.t.add(i??t),this.l=h,this.o=o??this.o,this.callback=e,s||(window.ResizeObserver?(this.u=new ResizeObserver((s=>{this.handleChanges(s),this.h.requestUpdate()})),t.addController(this)):console.warn("ResizeController error: browser does not support ResizeObserver."))}handleChanges(s){this.value=this.callback?.(s,this.u)}hostConnected(){for(const s of this.t)this.observe(s)}hostDisconnected(){this.disconnect()}async hostUpdated(){!this.o&&this.i&&this.handleChanges([]),this.i=!1}observe(s){this.t.add(s),this.u.observe(s,this.l),this.i=!0,this.h.requestUpdate()}unobserve(s){this.t.delete(s),this.u.unobserve(s)}disconnect(){this.u.disconnect()}}export{t as ResizeController};
//# sourceMappingURL=resize-controller.js.map
