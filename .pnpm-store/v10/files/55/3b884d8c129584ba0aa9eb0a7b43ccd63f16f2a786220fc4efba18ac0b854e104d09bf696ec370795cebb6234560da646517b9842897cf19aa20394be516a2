/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { isServer } from 'lit-html/is-server.js';
/**
 * ResizeController is a ReactiveController that integrates a ResizeObserver
 * with a ReactiveControllerHost's reactive update lifecycle. This is typically
 * a ReactiveElement or LitElement. ResizeObservers can be used to detect
 * size changes to DOM elements.
 *
 * The controller can specify a `target` element to observe and the
 * configuration options to pass to the ResizeObserver. The `observe`
 * method can be called to observe additional elements.
 *
 * When a change is detected, the controller's given `callback` function is
 * used to process the result into a value which is stored on the controller.
 * The controller's `value` is usable during the host's update cycle.
 */
export class ResizeController {
    constructor(host, { target, config, callback, skipInitial }) {
        this._targets = new Set();
        this._skipInitial = false;
        /**
         * Flag used to help manage calling the `callback` when observe is called
         * in addition to when a mutation occurs. This is done to help setup initial
         * state and is performed async by requesting a host update and calling
         * `handleChanges` once by checking and then resetting this flag.
         */
        this._unobservedUpdate = false;
        this._host = host;
        // Target defaults to `host` unless explicitly `null`.
        if (target !== null) {
            this._targets.add(target ?? host);
        }
        this._config = config;
        this._skipInitial = skipInitial ?? this._skipInitial;
        this.callback = callback;
        if (isServer) {
            return;
        }
        // Check browser support.
        if (!window.ResizeObserver) {
            console.warn(`ResizeController error: browser does not support ResizeObserver.`);
            return;
        }
        this._observer = new ResizeObserver((entries) => {
            this.handleChanges(entries);
            this._host.requestUpdate();
        });
        host.addController(this);
    }
    /**
     * Process the observer's changes with the controller's `callback`
     * function to produce a result stored in the `value` property.
     */
    handleChanges(entries) {
        this.value = this.callback?.(entries, this._observer);
    }
    hostConnected() {
        for (const target of this._targets) {
            this.observe(target);
        }
    }
    hostDisconnected() {
        this.disconnect();
    }
    async hostUpdated() {
        // Handle initial state as a set of 0 changes. This helps setup initial
        // state and promotes UI = f(state) since ideally the callback does not
        // rely on changes.
        if (!this._skipInitial && this._unobservedUpdate) {
            this.handleChanges([]);
        }
        this._unobservedUpdate = false;
    }
    /**
     * Observe the target element. The controller's `target` is automatically
     * observed when the host connects.
     * @param target Element to observe
     */
    observe(target) {
        this._targets.add(target);
        this._observer.observe(target, this._config);
        this._unobservedUpdate = true;
        this._host.requestUpdate();
    }
    /**
     * Unobserve the target element.
     * @param target Element to unobserve
     */
    unobserve(target) {
        this._targets.delete(target);
        this._observer.unobserve(target);
    }
    /**
     * Disconnects the observer. This is done automatically when the host
     * disconnects.
     */
    disconnect() {
        this._observer.disconnect();
    }
}
//# sourceMappingURL=resize-controller.js.map