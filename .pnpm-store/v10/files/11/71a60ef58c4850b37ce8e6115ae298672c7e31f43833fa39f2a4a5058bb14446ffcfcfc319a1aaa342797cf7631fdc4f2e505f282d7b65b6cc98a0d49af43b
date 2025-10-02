/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { isServer } from 'lit-html/is-server.js';
/**
 * IntersectionController is a ReactiveController that integrates an
 * IntersectionObserver with a ReactiveControllerHost's reactive update
 * lifecycle. This is typically a ReactiveElement or LitElement.
 * IntersectionObservers can be used to detect when a target element
 * "intersects" is visible inside of) another element or the viewport by
 * default, where intersect means "visible inside of."
 *
 * The controller can specify a `target` element to observe and the
 * configuration options to pass to the IntersectionObserver. The `observe`
 * method can be called to observe additional elements.
 *
 * When a change is detected, the controller's given `callback` function is
 * used to process the result into a value which is stored on the controller.
 * The controller's `value` is usable during the host's update cycle.
 */
export class IntersectionController {
    constructor(host, { target, config, callback, skipInitial }) {
        this._targets = new Set();
        this._skipInitial = false;
        /**
         * Flag used to help manage calling the `callback` when observe is called
         * and `skipInitial` is set to true. Note that unlike the other observers
         * IntersectionObserver *does* report its initial state (e.g. whether or not
         * there is an intersection). This flag is used to avoid handling this
         * state if `skipInitial` is true.
         */
        this._unobservedUpdate = false;
        this._host = host;
        // Target defaults to `host` unless explicitly `null`.
        if (target !== null) {
            this._targets.add(target ?? host);
        }
        this._skipInitial = skipInitial ?? this._skipInitial;
        this.callback = callback;
        if (isServer) {
            return;
        }
        // Check browser support.
        if (!window.IntersectionObserver) {
            console.warn(`IntersectionController error: browser does not support IntersectionObserver.`);
            return;
        }
        this._observer = new IntersectionObserver((entries) => {
            const unobservedUpdate = this._unobservedUpdate;
            this._unobservedUpdate = false;
            if (this._skipInitial && unobservedUpdate) {
                return;
            }
            this.handleChanges(entries);
            this._host.requestUpdate();
        }, config);
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
        // Eagerly deliver any changes that happened during update.
        const pendingRecords = this._observer.takeRecords();
        if (pendingRecords.length) {
            this.handleChanges(pendingRecords);
        }
    }
    /**
     * Observe the target element. The controller's `target` is automatically
     * observed when the host connects.
     * @param target Element to observe
     */
    observe(target) {
        this._targets.add(target);
        // Note, this will always trigger the callback since the initial
        // intersection state is reported.
        this._observer.observe(target);
        this._unobservedUpdate = true;
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
//# sourceMappingURL=intersection-controller.js.map