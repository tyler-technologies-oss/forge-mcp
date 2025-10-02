/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { isServer } from 'lit-html/is-server.js';
/**
 * PerformanceController is a ReactiveController that integrates a
 * PerformanceObserver with a ReactiveControllerHost's reactive update
 * lifecycle. This is typically a ReactiveElement or LitElement.
 * PerformanceObserver can be used to report changes in various metrics about
 * browser and application performance, including marks and measures done with
 * the `performance` API.
 *
 * When a change is detected, the controller's given `callback` function is
 * used to process the result into a value which is stored on the controller.
 * The controller's `value` is usable during the host's update cycle.
 */
export class PerformanceController {
    constructor(host, { config, callback, skipInitial }) {
        this._skipInitial = false;
        /**
         * Flag used to help manage calling the `callback` when observe is called
         * in addition to when a mutation occurs. This is done to help setup initial
         * state and is performed async by requesting a host update and calling
         * `handleChanges` once by checking and then resetting this flag.
         */
        this._unobservedUpdate = false;
        this._host = host;
        this._config = config;
        this._skipInitial = skipInitial ?? this._skipInitial;
        this.callback = callback;
        if (isServer) {
            return;
        }
        // Check browser support.
        if (!window.PerformanceObserver) {
            console.warn(`PerformanceController error: browser does not support PerformanceObserver.`);
            return;
        }
        this._observer = new PerformanceObserver((entryList) => {
            this.handleChanges(entryList.getEntries(), entryList);
            this._host.requestUpdate();
        });
        host.addController(this);
    }
    /**
     * Process the observer's changes with the controller's `callback`
     * function to produce a result stored in the `value` property.
     */
    handleChanges(entries, entryList) {
        this.value = this.callback?.(entries, this._observer, entryList);
    }
    hostConnected() {
        this.observe();
    }
    hostDisconnected() {
        this.disconnect();
    }
    async hostUpdated() {
        // Eagerly deliver any changes that happened during update.
        // And handle initial state as a set of 0 changes. This helps setup initial
        // state and promotes UI = f(state) since ideally the callback does not
        // rely on changes.
        const pendingEntries = this._observer.takeRecords();
        if (pendingEntries.length ||
            (!this._skipInitial && this._unobservedUpdate)) {
            this.handleChanges(pendingEntries);
        }
        this._unobservedUpdate = false;
    }
    /**
     * Flush any pending observer updates.
     */
    flush() {
        const pendingEntries = this._observer.takeRecords();
        if (pendingEntries.length) {
            this.handleChanges(pendingEntries);
            this._host.requestUpdate();
        }
    }
    /**
     * Start observing. This is done automatically when the host connects.
     */
    observe() {
        this._observer.observe(this._config);
        this._unobservedUpdate = true;
        this._host.requestUpdate();
    }
    /**
     * Disconnects the observer. This is done automatically when the host
     * disconnects.
     */
    disconnect() {
        this._observer.disconnect();
    }
}
//# sourceMappingURL=performance-controller.js.map