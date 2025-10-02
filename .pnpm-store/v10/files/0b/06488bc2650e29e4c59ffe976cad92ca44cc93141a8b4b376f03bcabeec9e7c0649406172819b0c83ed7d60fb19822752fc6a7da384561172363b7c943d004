import { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element/reactive-controller.js';
/**
 * The callback function for a MutationController.
 */
export type MutationValueCallback<T = unknown> = (...args: Parameters<MutationCallback>) => T;
/**
 * The config options for a MutationController.
 */
export interface MutationControllerConfig<T = unknown> {
    /**
     * Configuration object for the MutationObserver.
     */
    config: MutationObserverInit;
    /**
     * The element to observe. In addition to configuring the target here,
     * the `observe` method can be called to observe additional targets. When not
     * specified, the target defaults to the `host`. If set to `null`, no target
     * is automatically observed. Only the configured target will be re-observed
     * if the host connects again after unobserving via disconnection.
     */
    target?: Element | null;
    /**
     * The callback used to process detected changes into a value stored
     * in the controller's `value` property.
     */
    callback?: MutationValueCallback<T>;
    /**
     * By default the `callback` is called without changes when a target is
     * observed. This is done to help manage initial state, but this
     * setup step can be skipped by setting this to true.
     */
    skipInitial?: boolean;
}
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
export declare class MutationController<T = unknown> implements ReactiveController {
    private _host;
    private _targets;
    private _config;
    private _observer;
    private _skipInitial;
    /**
     * Flag used to help manage calling the `callback` when observe is called
     * in addition to when a mutation occurs. This is done to help setup initial
     * state and is performed async by requesting a host update and calling
     * `handleChanges` once by checking and then resetting this flag.
     */
    private _unobservedUpdate;
    /**
     * The result of processing the observer's changes via the `callback`
     * function.
     */
    value?: T;
    /**
     * Function that returns a value processed from the observer's changes.
     * The result is stored in the `value` property.
     */
    callback?: MutationValueCallback<T>;
    constructor(host: ReactiveControllerHost & Element, { target, config, callback, skipInitial }: MutationControllerConfig<T>);
    /**
     * Process the observer's changes with the controller's `callback`
     * function to produce a result stored in the `value` property.
     */
    protected handleChanges(records: MutationRecord[]): void;
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdated(): Promise<void>;
    /**
     * Observe the target element. The controller's `target` is automatically
     * observed when the host connects.
     * @param target Element to observe
     */
    observe(target: Element): void;
    /**
     * Disconnects the observer. This is done automatically when the host
     * disconnects.
     */
    protected disconnect(): void;
}
//# sourceMappingURL=mutation-controller.d.ts.map