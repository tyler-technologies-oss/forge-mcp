/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { isServer } from 'lit-html/is-server.js';
/**
 * MutationController is a ReactiveController that integrates a MutationObserver
 * with a ReactiveControllerHost's reactive update lifecycle. This is typically
 * a ReactiveElement or LitElement. MutationObservers can be used to detect
 * arbitrary changes to DOM, including nodes being added and remove and
 * attributes changing.
 *
 * The controller can specify a `target` element to observe and the
 * configuration options to pass to the MutationObserver. The `observe`
 * method can be called to observe additional elements.
 *
 * When a change is detected, the controller's given `callback` function is
 * used to process the result into a value which is stored on the controller.
 * The controller's `value` is usable during the host's update cycle.
 */
export class MutationController {
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
        if (!window.MutationObserver) {
            console.warn(`MutationController error: browser does not support MutationObserver.`);
            return;
        }
        this._observer = new MutationObserver((records) => {
            this.handleChanges(records);
            this._host.requestUpdate();
        });
        host.addController(this);
    }
    /**
     * Process the observer's changes with the controller's `callback`
     * function to produce a result stored in the `value` property.
     */
    handleChanges(records) {
        this.value = this.callback?.(records, this._observer);
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
        // Eagerly deliver any changes that happened during update.
        // And handle initial state as a set of 0 changes. This helps setup initial
        // state and promotes UI = f(state) since ideally the callback does not
        // rely on changes.
        const pendingRecords = this._observer.takeRecords();
        if (pendingRecords.length ||
            (!this._skipInitial && this._unobservedUpdate)) {
            this.handleChanges(pendingRecords);
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
     * Disconnects the observer. This is done automatically when the host
     * disconnects.
     */
    disconnect() {
        this._observer.disconnect();
    }
}
//# sourceMappingURL=mutation-controller.js.map