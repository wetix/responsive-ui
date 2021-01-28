
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function xlink_attr(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* components/accordion/src/Accordion.svelte generated by Svelte v3.32.0 */

    const { Object: Object_1 } = globals;
    const file = "components/accordion/src/Accordion.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    const get_tab_slot_changes = dirty => ({});
    const get_tab_slot_context = ctx => ({ index: /*i*/ ctx[10] });

    // (29:10) {:else}
    function create_else_block(ctx) {
    	let t_value = /*item*/ ctx[8].content + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 2 && t_value !== (t_value = /*item*/ ctx[8].content + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(29:10) {:else}",
    		ctx
    	});

    	return block;
    }

    // (27:10) {#if typeof item.content === "function"}
    function create_if_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*item*/ ctx[8].content;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*item*/ ctx[8].content)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(27:10) {#if typeof item.content === \\\"function\\\"}",
    		ctx
    	});

    	return block;
    }

    // (26:35)            
    function fallback_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (typeof /*item*/ ctx[8].content === "function") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(26:35)            ",
    		ctx
    	});

    	return block;
    }

    // (14:2) {#each items as item, i}
    function create_each_block(ctx) {
    	let div1;
    	let input;
    	let input_id_value;
    	let input_checked_value;
    	let input_disabled_value;
    	let t0;
    	let label;
    	let t1_value = /*item*/ ctx[8].title + "";
    	let t1;
    	let t2;
    	let div0;
    	let t3;
    	let current;

    	let input_levels = [
    		{
    			id: input_id_value = "" + (/*id*/ ctx[4] + "-" + /*i*/ ctx[10])
    		},
    		/*props*/ ctx[3],
    		{
    			checked: input_checked_value = /*item*/ ctx[8].collapsed === false ? true : false
    		},
    		{
    			disabled: input_disabled_value = /*item*/ ctx[8].disabled
    		}
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const tab_slot_template = /*#slots*/ ctx[7].tab;
    	const tab_slot = create_slot(tab_slot_template, ctx, /*$$scope*/ ctx[6], get_tab_slot_context);
    	const tab_slot_or_fallback = tab_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			t1 = text(t1_value);
    			t2 = space();
    			div0 = element("div");
    			if (tab_slot_or_fallback) tab_slot_or_fallback.c();
    			t3 = space();
    			set_attributes(input, input_data);
    			toggle_class(input, "svelte-2mzigu", true);
    			add_location(input, file, 15, 6, 473);
    			attr_dev(label, "class", "responsive-ui-accordion__tab-label svelte-2mzigu");
    			attr_dev(label, "for", "" + (/*id*/ ctx[4] + "-" + /*i*/ ctx[10]));
    			add_location(label, file, 21, 6, 627);
    			attr_dev(div0, "class", "responsive-ui-accordion__tab-content svelte-2mzigu");
    			add_location(div0, file, 24, 6, 735);
    			attr_dev(div1, "class", "responsive-ui-accordion__tab svelte-2mzigu");
    			add_location(div1, file, 14, 4, 424);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input);
    			append_dev(div1, t0);
    			append_dev(div1, label);
    			append_dev(label, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			if (tab_slot_or_fallback) {
    				tab_slot_or_fallback.m(div0, null);
    			}

    			append_dev(div1, t3);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				{ id: input_id_value },
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				(!current || dirty & /*items*/ 2 && input_checked_value !== (input_checked_value = /*item*/ ctx[8].collapsed === false ? true : false)) && { checked: input_checked_value },
    				(!current || dirty & /*items*/ 2 && input_disabled_value !== (input_disabled_value = /*item*/ ctx[8].disabled)) && { disabled: input_disabled_value }
    			]));

    			toggle_class(input, "svelte-2mzigu", true);
    			if ((!current || dirty & /*items*/ 2) && t1_value !== (t1_value = /*item*/ ctx[8].title + "")) set_data_dev(t1, t1_value);

    			if (tab_slot) {
    				if (tab_slot.p && dirty & /*$$scope*/ 64) {
    					update_slot(tab_slot, tab_slot_template, ctx, /*$$scope*/ ctx[6], dirty, get_tab_slot_changes, get_tab_slot_context);
    				}
    			} else {
    				if (tab_slot_or_fallback && tab_slot_or_fallback.p && dirty & /*items*/ 2) {
    					tab_slot_or_fallback.p(ctx, dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (tab_slot_or_fallback) tab_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(14:2) {#each items as item, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", div_class_value = "responsive-ui-accordion " + /*className*/ ctx[0] + " svelte-2mzigu");
    			attr_dev(div, "style", /*style*/ ctx[2]);
    			add_location(div, file, 12, 0, 335);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*items, $$scope, id, props*/ 90) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = "responsive-ui-accordion " + /*className*/ ctx[0] + " svelte-2mzigu")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(div, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Accordion", slots, ['tab']);
    	
    	let { class: className = "" } = $$props;
    	let { items = [] } = $$props;
    	let { multiple = false } = $$props;
    	let { style = "" } = $$props;
    	const id = `accordion-${Math.floor(Math.random() * Date.now())}`;
    	let props = { type: "checkbox" };
    	if (!multiple) props = Object.assign(props, { type: "radio", name: id });
    	const writable_props = ["class", "items", "multiple", "style"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Accordion> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("multiple" in $$props) $$invalidate(5, multiple = $$props.multiple);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		items,
    		multiple,
    		style,
    		id,
    		props
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("multiple" in $$props) $$invalidate(5, multiple = $$props.multiple);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("props" in $$props) $$invalidate(3, props = $$props.props);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, items, style, props, id, multiple, $$scope, slots];
    }

    class Accordion extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			class: 0,
    			items: 1,
    			multiple: 5,
    			style: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Accordion",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get class() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/bottom-bar/src/BottomBar.svelte generated by Svelte v3.32.0 */

    const file$1 = "components/bottom-bar/src/BottomBar.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let div1_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "responsive-ui-bottom-bar__wrapper svelte-10frm21");
    			add_location(div0, file$1, 6, 2, 164);
    			attr_dev(div1, "class", div1_class_value = "responsive-ui-bottom-bar " + /*className*/ ctx[0] + " svelte-10frm21");
    			attr_dev(div1, "style", /*style*/ ctx[1]);
    			add_location(div1, file$1, 5, 0, 103);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*className*/ 1 && div1_class_value !== (div1_class_value = "responsive-ui-bottom-bar " + /*className*/ ctx[0] + " svelte-10frm21")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*style*/ 2) {
    				attr_dev(div1, "style", /*style*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("BottomBar", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { style = "" } = $$props;
    	const writable_props = ["class", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BottomBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("style" in $$props) $$invalidate(1, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ className, style });

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("style" in $$props) $$invalidate(1, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, style, $$scope, slots];
    }

    class BottomBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { class: 0, style: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BottomBar",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get class() {
    		throw new Error("<BottomBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<BottomBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<BottomBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<BottomBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/button/src/Button.svelte generated by Svelte v3.32.0 */

    const file$2 = "components/button/src/Button.svelte";

    // (23:8) {title}
    function fallback_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*title*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(23:8) {title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let button;
    	let button_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(button, "class", button_class_value = "responsive-ui-button " + /*className*/ ctx[1] + " svelte-gobocx");
    			attr_dev(button, "name", /*name*/ ctx[3]);
    			attr_dev(button, "type", /*type*/ ctx[4]);
    			button.disabled = /*disabled*/ ctx[6];
    			attr_dev(button, "form", /*form*/ ctx[7]);
    			attr_dev(button, "style", /*style*/ ctx[8]);
    			toggle_class(button, "responsive-ui-button--outline", /*outline*/ ctx[5]);
    			add_location(button, file$2, 12, 0, 278);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			/*button_binding*/ ctx[12](button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[11], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 512) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[9], dirty, null, null);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*title*/ 4) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (!current || dirty & /*className*/ 2 && button_class_value !== (button_class_value = "responsive-ui-button " + /*className*/ ctx[1] + " svelte-gobocx")) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (!current || dirty & /*name*/ 8) {
    				attr_dev(button, "name", /*name*/ ctx[3]);
    			}

    			if (!current || dirty & /*type*/ 16) {
    				attr_dev(button, "type", /*type*/ ctx[4]);
    			}

    			if (!current || dirty & /*disabled*/ 64) {
    				prop_dev(button, "disabled", /*disabled*/ ctx[6]);
    			}

    			if (!current || dirty & /*form*/ 128) {
    				attr_dev(button, "form", /*form*/ ctx[7]);
    			}

    			if (!current || dirty & /*style*/ 256) {
    				attr_dev(button, "style", /*style*/ ctx[8]);
    			}

    			if (dirty & /*className, outline*/ 34) {
    				toggle_class(button, "responsive-ui-button--outline", /*outline*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*button_binding*/ ctx[12](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { ref = null } = $$props;
    	let { title = "" } = $$props;
    	let { name = "" } = $$props;
    	let { type = "button" } = $$props;
    	let { outline = false } = $$props;
    	let { disabled = false } = $$props;
    	let { form = "" } = $$props;
    	let { style = "" } = $$props;

    	const writable_props = [
    		"class",
    		"ref",
    		"title",
    		"name",
    		"type",
    		"outline",
    		"disabled",
    		"form",
    		"style"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("type" in $$props) $$invalidate(4, type = $$props.type);
    		if ("outline" in $$props) $$invalidate(5, outline = $$props.outline);
    		if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
    		if ("form" in $$props) $$invalidate(7, form = $$props.form);
    		if ("style" in $$props) $$invalidate(8, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(9, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		ref,
    		title,
    		name,
    		type,
    		outline,
    		disabled,
    		form,
    		style
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("type" in $$props) $$invalidate(4, type = $$props.type);
    		if ("outline" in $$props) $$invalidate(5, outline = $$props.outline);
    		if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
    		if ("form" in $$props) $$invalidate(7, form = $$props.form);
    		if ("style" in $$props) $$invalidate(8, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ref,
    		className,
    		title,
    		name,
    		type,
    		outline,
    		disabled,
    		form,
    		style,
    		$$scope,
    		slots,
    		click_handler,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			class: 1,
    			ref: 0,
    			title: 2,
    			name: 3,
    			type: 4,
    			outline: 5,
    			disabled: 6,
    			form: 7,
    			style: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get form() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set form(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

    /* components/icon/src/Icon.svelte generated by Svelte v3.32.0 */

    const file$3 = "components/icon/src/Icon.svelte";

    // (99:27) 
    function create_if_block_5(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M1.119 16.841a1.118 1.118 0 01-1.111-1.127c0-.619.492-1.111\n      1.111-1.111h13.475V1.127A1.133 1.133 0 0115.722 0c.619 0 1.111.508 1.111\n      1.127v13.476h13.475c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127\n      1.127H16.833v13.476c0 .619-.492 1.127-1.111 1.127a1.131 1.131 0\n      01-1.127-1.127V16.841H1.119z");
    			attr_dev(path, "fill", /*stroke*/ ctx[0]);
    			add_location(path, file$3, 108, 6, 3510);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "x", "0");
    			attr_dev(svg, "y", "0");
    			attr_dev(svg, "width", "100%");
    			attr_dev(svg, "height", "100%");
    			attr_dev(svg, "viewBox", "0 0 31.444 31.444");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1ijgepv");
    			add_location(svg, file$3, 99, 4, 3313);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stroke*/ 1) {
    				attr_dev(path, "fill", /*stroke*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(99:27) ",
    		ctx
    	});

    	return block;
    }

    // (82:28) 
    function create_if_block_4(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M1.111 16.832A1.117 1.117 0 010 15.706c0-.619.492-1.111\n    1.111-1.111H30.3c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127\n    1.127H1.111z");
    			attr_dev(path, "fill", /*stroke*/ ctx[0]);
    			add_location(path, file$3, 91, 6, 3080);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "x", "0");
    			attr_dev(svg, "y", "0");
    			attr_dev(svg, "width", "100%");
    			attr_dev(svg, "height", "100%");
    			attr_dev(svg, "viewBox", "0 0 31.427 31.427");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1ijgepv");
    			add_location(svg, file$3, 82, 4, 2883);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stroke*/ 1) {
    				attr_dev(path, "fill", /*stroke*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(82:28) ",
    		ctx
    	});

    	return block;
    }

    // (61:35) 
    function create_if_block_3(ctx) {
    	let svg;
    	let g;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			attr_dev(path, "d", "M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874\n         l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191\n         c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z");
    			add_location(path, file$3, 74, 8, 2477);
    			add_location(g, file$3, 73, 6, 2465);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "stroke", /*stroke*/ ctx[0]);
    			attr_dev(svg, "width", "100%");
    			attr_dev(svg, "height", "100%");
    			attr_dev(svg, "viewBox", "0 0 792.033 792.033");
    			set_style(svg, "enable-background", "new 0 0 792.033 792.033");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1ijgepv");
    			add_location(svg, file$3, 61, 4, 2141);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stroke*/ 1) {
    				attr_dev(svg, "stroke", /*stroke*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(61:35) ",
    		ctx
    	});

    	return block;
    }

    // (45:28) 
    function create_if_block_2(ctx) {
    	let svg;
    	let g;
    	let circle0;
    	let circle1;
    	let circle2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			circle0 = svg_element("circle");
    			circle1 = svg_element("circle");
    			circle2 = svg_element("circle");
    			attr_dev(circle0, "cx", "42.667");
    			attr_dev(circle0, "cy", "213.333");
    			attr_dev(circle0, "r", "42.667");
    			add_location(circle0, file$3, 55, 8, 1924);
    			attr_dev(circle1, "cx", "213.333");
    			attr_dev(circle1, "cy", "213.333");
    			attr_dev(circle1, "r", "42.667");
    			add_location(circle1, file$3, 56, 8, 1979);
    			attr_dev(circle2, "cx", "384");
    			attr_dev(circle2, "cy", "213.333");
    			attr_dev(circle2, "r", "42.667");
    			add_location(circle2, file$3, 57, 8, 2035);
    			add_location(g, file$3, 54, 6, 1912);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "width", "100%");
    			attr_dev(svg, "height", "100%");
    			attr_dev(svg, "viewBox", "0 0 426.667 426.667");
    			set_style(svg, "enable-background", "new 0 0 426.667 426.667");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1ijgepv");
    			add_location(svg, file$3, 45, 4, 1631);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, circle0);
    			append_dev(g, circle1);
    			append_dev(g, circle2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(45:28) ",
    		ctx
    	});

    	return block;
    }

    // (26:30) 
    function create_if_block_1(ctx) {
    	let svg;
    	let line0;
    	let line1;
    	let line2;
    	let line3;
    	let line4;
    	let line5;
    	let line6;
    	let line7;
    	let line8;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			line2 = svg_element("line");
    			line3 = svg_element("line");
    			line4 = svg_element("line");
    			line5 = svg_element("line");
    			line6 = svg_element("line");
    			line7 = svg_element("line");
    			line8 = svg_element("line");
    			attr_dev(line0, "x1", "4");
    			attr_dev(line0, "y1", "21");
    			attr_dev(line0, "x2", "4");
    			attr_dev(line0, "y2", "14");
    			add_location(line0, file$3, 34, 7, 1183);
    			attr_dev(line1, "x1", "4");
    			attr_dev(line1, "y1", "10");
    			attr_dev(line1, "x2", "4");
    			attr_dev(line1, "y2", "3");
    			add_location(line1, file$3, 35, 6, 1228);
    			attr_dev(line2, "x1", "12");
    			attr_dev(line2, "y1", "21");
    			attr_dev(line2, "x2", "12");
    			attr_dev(line2, "y2", "12");
    			add_location(line2, file$3, 36, 6, 1272);
    			attr_dev(line3, "x1", "12");
    			attr_dev(line3, "y1", "8");
    			attr_dev(line3, "x2", "12");
    			attr_dev(line3, "y2", "3");
    			add_location(line3, file$3, 37, 6, 1319);
    			attr_dev(line4, "x1", "20");
    			attr_dev(line4, "y1", "21");
    			attr_dev(line4, "x2", "20");
    			attr_dev(line4, "y2", "16");
    			add_location(line4, file$3, 38, 6, 1364);
    			attr_dev(line5, "x1", "20");
    			attr_dev(line5, "y1", "12");
    			attr_dev(line5, "x2", "20");
    			attr_dev(line5, "y2", "3");
    			add_location(line5, file$3, 39, 6, 1411);
    			attr_dev(line6, "x1", "1");
    			attr_dev(line6, "y1", "14");
    			attr_dev(line6, "x2", "7");
    			attr_dev(line6, "y2", "14");
    			add_location(line6, file$3, 40, 6, 1457);
    			attr_dev(line7, "x1", "9");
    			attr_dev(line7, "y1", "8");
    			attr_dev(line7, "x2", "15");
    			attr_dev(line7, "y2", "8");
    			add_location(line7, file$3, 41, 6, 1502);
    			attr_dev(line8, "x1", "17");
    			attr_dev(line8, "y1", "16");
    			attr_dev(line8, "x2", "23");
    			attr_dev(line8, "y2", "16");
    			add_location(line8, file$3, 42, 6, 1546);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", /*stroke*/ ctx[0]);
    			attr_dev(svg, "stroke-width", "2");
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			attr_dev(svg, "class", "svelte-1ijgepv");
    			add_location(svg, file$3, 26, 4, 989);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, line0);
    			append_dev(svg, line1);
    			append_dev(svg, line2);
    			append_dev(svg, line3);
    			append_dev(svg, line4);
    			append_dev(svg, line5);
    			append_dev(svg, line6);
    			append_dev(svg, line7);
    			append_dev(svg, line8);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stroke*/ 1) {
    				attr_dev(svg, "stroke", /*stroke*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(26:30) ",
    		ctx
    	});

    	return block;
    }

    // (7:2) {#if type === "x"}
    function create_if_block$1(ctx) {
    	let svg;
    	let g;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			attr_dev(path, "d", "M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42\n     c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42\n     c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132\n     c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42\n     c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z");
    			add_location(path, file$3, 16, 8, 424);
    			add_location(g, file$3, 15, 6, 412);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "viewBox", "0 0 408 408");
    			set_style(svg, "enable-background", "new 0 0 408 408");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-1ijgepv");
    			add_location(svg, file$3, 7, 4, 178);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(7:2) {#if type === \\\"x\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let span;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[1] === "x") return create_if_block$1;
    		if (/*type*/ ctx[1] === "filter") return create_if_block_1;
    		if (/*type*/ ctx[1] === "more") return create_if_block_2;
    		if (/*type*/ ctx[1] === "right-arrow") return create_if_block_3;
    		if (/*type*/ ctx[1] == "minus") return create_if_block_4;
    		if (/*type*/ ctx[1] == "plus") return create_if_block_5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (if_block) if_block.c();
    			attr_dev(span, "class", "responsive-ui-icon svelte-1ijgepv");
    			attr_dev(span, "style", /*style*/ ctx[2]);
    			add_location(span, file$3, 5, 0, 102);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			if (if_block) if_block.m(span, null);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(span, null);
    				}
    			}

    			if (dirty & /*style*/ 4) {
    				attr_dev(span, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);

    			if (if_block) {
    				if_block.d();
    			}

    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Icon", slots, []);
    	let { stroke = "#000" } = $$props;
    	let { type = "" } = $$props;
    	let { style = "" } = $$props;
    	const writable_props = ["stroke", "type", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Icon> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("stroke" in $$props) $$invalidate(0, stroke = $$props.stroke);
    		if ("type" in $$props) $$invalidate(1, type = $$props.type);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    	};

    	$$self.$capture_state = () => ({ stroke, type, style });

    	$$self.$inject_state = $$props => {
    		if ("stroke" in $$props) $$invalidate(0, stroke = $$props.stroke);
    		if ("type" in $$props) $$invalidate(1, type = $$props.type);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [stroke, type, style, click_handler];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { stroke: 0, type: 1, style: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get stroke() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stroke(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/bottom-modal/src/BottomModal.svelte generated by Svelte v3.32.0 */
    const file$4 = "components/bottom-modal/src/BottomModal.svelte";

    // (66:2) {#if closable}
    function create_if_block$2(ctx) {
    	let span;
    	let icon;
    	let current;
    	let mounted;
    	let dispose;
    	icon = new Icon({ props: { type: "x" }, $$inline: true });

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(icon.$$.fragment);
    			attr_dev(span, "class", "responsive-ui-modal__close svelte-r5k81z");
    			add_location(span, file$4, 66, 4, 1519);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(icon, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span, "click", /*click_handler_1*/ ctx[9], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(icon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(66:2) {#if closable}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div0;
    	let div0_style_value;
    	let t0;
    	let div1;
    	let t1;
    	let div1_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*closable*/ ctx[1] && create_if_block$2(ctx);
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "responsive-ui-modal__overlay svelte-r5k81z");
    			attr_dev(div0, "style", div0_style_value = `opacity:${1 - /*$tween*/ ctx[3]};visibility:${1 - /*$tween*/ ctx[3] <= 0 ? "hidden" : "visible"}`);
    			add_location(div0, file$4, 52, 0, 1141);
    			attr_dev(div1, "class", "responsive-ui-modal svelte-r5k81z");
    			attr_dev(div1, "style", div1_style_value = `transform:translateY(${/*$tween*/ ctx[3] * 100}%);visibility:${1 - /*$tween*/ ctx[3] <= 0 ? "hidden" : "visible"};${/*style*/ ctx[2]}`);
    			add_location(div1, file$4, 59, 0, 1340);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					div0,
    					"click",
    					function () {
    						if (is_function(/*closable*/ ctx[1]
    						? /*click_handler*/ ctx[8]
    						: undefined)) (/*closable*/ ctx[1]
    						? /*click_handler*/ ctx[8]
    						: undefined).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (!current || dirty & /*$tween*/ 8 && div0_style_value !== (div0_style_value = `opacity:${1 - /*$tween*/ ctx[3]};visibility:${1 - /*$tween*/ ctx[3] <= 0 ? "hidden" : "visible"}`)) {
    				attr_dev(div0, "style", div0_style_value);
    			}

    			if (/*closable*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*closable*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 64) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*$tween, style*/ 12 && div1_style_value !== (div1_style_value = `transform:translateY(${/*$tween*/ ctx[3] * 100}%);visibility:${1 - /*$tween*/ ctx[3] <= 0 ? "hidden" : "visible"};${/*style*/ ctx[2]}`)) {
    				attr_dev(div1, "style", div1_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }
    const queue = [];

    // remove window scroll when all gone
    let scrollY = 0;

    const toggleOpen = (i, open) => {
    	queue[i] = open;

    	if (queue.some(v => v === true)) {
    		scrollY = window.scrollY;
    		document.body.setAttribute("style", `position:fixed;top:-${scrollY}px`);
    	} else {
    		document.body.setAttribute("style", "");
    		window.scrollTo(0, scrollY);
    	}
    };

    const pushQueue = open => {
    	queue.push(open);
    	return queue.length - 1;
    };

    const popQueue = i => {
    	if (i >= queue.length) return;
    	queue.splice(i, 1);
    };

    function instance$4($$self, $$props, $$invalidate) {
    	let $tween;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("BottomModal", slots, ['default']);
    	let { open = false } = $$props;
    	let { closable = true } = $$props;
    	let { style = "" } = $$props;
    	const tween = tweened(1, { duration: 200 });
    	validate_store(tween, "tween");
    	component_subscribe($$self, tween, value => $$invalidate(3, $tween = value));
    	let index = 0;

    	onMount(() => {
    		$$invalidate(5, index = pushQueue(open));

    		return () => {
    			popQueue(index);
    		};
    	});

    	const writable_props = ["open", "closable", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BottomModal> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, open = false);
    	const click_handler_1 = () => $$invalidate(0, open = false);

    	$$self.$$set = $$props => {
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("closable" in $$props) $$invalidate(1, closable = $$props.closable);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		queue,
    		scrollY,
    		toggleOpen,
    		pushQueue,
    		popQueue,
    		onMount,
    		tweened,
    		Icon,
    		open,
    		closable,
    		style,
    		tween,
    		index,
    		$tween
    	});

    	$$self.$inject_state = $$props => {
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("closable" in $$props) $$invalidate(1, closable = $$props.closable);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("index" in $$props) $$invalidate(5, index = $$props.index);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*open, index*/ 33) {
    			 if (open) {
    				toggleOpen(index, open);
    				tween.set(0);
    			} else {
    				toggleOpen(index, open);
    				tween.set(1);
    			}
    		}
    	};

    	return [
    		open,
    		closable,
    		style,
    		$tween,
    		tween,
    		index,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1
    	];
    }

    class BottomModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { open: 0, closable: 1, style: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BottomModal",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get open() {
    		throw new Error("<BottomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<BottomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closable() {
    		throw new Error("<BottomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closable(value) {
    		throw new Error("<BottomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<BottomModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<BottomModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/tab/src/Tab.svelte generated by Svelte v3.32.0 */
    const file$5 = "components/tab/src/Tab.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    const get_default_slot_changes = dirty => ({ selected: dirty & /*selected*/ 1 });
    const get_default_slot_context = ctx => ({ selected: /*selected*/ ctx[0] });

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[19] = i;
    	return child_ctx;
    }

    // (30:4) {#each items as item, i}
    function create_each_block_1(ctx) {
    	let span;
    	let t0_value = /*item*/ ctx[15].title + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[10](/*i*/ ctx[19], ...args);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(span, "class", "responsive-ui-tab__item svelte-hdhd08");
    			toggle_class(span, "responsive-ui-tab__item--selected", /*selected*/ ctx[0] == /*i*/ ctx[19]);
    			add_location(span, file$5, 30, 6, 617);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*items*/ 2 && t0_value !== (t0_value = /*item*/ ctx[15].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*selected*/ 1) {
    				toggle_class(span, "responsive-ui-tab__item--selected", /*selected*/ ctx[0] == /*i*/ ctx[19]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(30:4) {#each items as item, i}",
    		ctx
    	});

    	return block;
    }

    // (48:0) {:else}
    function create_else_block$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 2) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(48:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (46:0) {#if hasSlots}
    function create_if_block$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, selected*/ 257) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[8], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(46:0) {#if hasSlots}",
    		ctx
    	});

    	return block;
    }

    // (50:4) {#if item && item.component}
    function create_if_block_1$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*item*/ ctx[15].component;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*item*/ ctx[15].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(50:4) {#if item && item.component}",
    		ctx
    	});

    	return block;
    }

    // (49:2) {#each items as item}
    function create_each_block$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*item*/ ctx[15] && /*item*/ ctx[15].component && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*item*/ ctx[15] && /*item*/ ctx[15].component) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*items*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(49:2) {#each items as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let nav;
    	let t0;
    	let div0;
    	let div0_style_value;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	let each_value_1 = /*items*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const if_block_creators = [create_if_block$3, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*hasSlots*/ ctx[6]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			nav = element("nav");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(nav, "class", "svelte-hdhd08");
    			add_location(nav, file$5, 28, 2, 560);
    			attr_dev(div0, "class", "responsive-ui-tab__ink-bar svelte-hdhd08");
    			attr_dev(div0, "style", div0_style_value = `left:${/*left*/ ctx[4]}px;width:${/*width*/ ctx[5]}px`);
    			add_location(div0, file$5, 39, 2, 834);
    			attr_dev(div1, "class", "responsive-ui-tab svelte-hdhd08");
    			attr_dev(div1, "style", /*style*/ ctx[2]);
    			add_location(div1, file$5, 27, 0, 518);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, nav);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(nav, null);
    			}

    			/*nav_binding*/ ctx[11](nav);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			insert_dev(target, t1, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*selected, onChange, items*/ 131) {
    				each_value_1 = /*items*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(nav, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (!current || dirty & /*left, width*/ 48 && div0_style_value !== (div0_style_value = `left:${/*left*/ ctx[4]}px;width:${/*width*/ ctx[5]}px`)) {
    				attr_dev(div0, "style", div0_style_value);
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(div1, "style", /*style*/ ctx[2]);
    			}

    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			/*nav_binding*/ ctx[11](null);
    			if (detaching) detach_dev(t1);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Tab", slots, ['default']);
    	const $$slots = compute_slots(slots);
    	
    	let { items = [] } = $$props;
    	let { selected = 0 } = $$props;
    	let { style = "" } = $$props;
    	const hasSlots = !!$$slots.default;
    	let tab;
    	let childNodes;
    	let left = 0;
    	let width = 0;

    	const setWidth = () => {
    		childNodes = tab.childNodes;
    		const el = childNodes[selected];
    		$$invalidate(4, left = el.offsetLeft);
    		$$invalidate(5, width = el.offsetWidth);
    	};

    	onMount(() => {
    		setTimeout(
    			() => {
    				setWidth();
    			},
    			0
    		);
    	});

    	const onChange = (_, i) => {
    		$$invalidate(0, selected = i);
    		setWidth();
    	};

    	const writable_props = ["items", "selected", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tab> was created with unknown prop '${key}'`);
    	});

    	const click_handler = (i, e) => onChange(e, i);

    	function nav_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			tab = $$value;
    			$$invalidate(3, tab);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("selected" in $$props) $$invalidate(0, selected = $$props.selected);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		items,
    		selected,
    		style,
    		hasSlots,
    		tab,
    		childNodes,
    		left,
    		width,
    		setWidth,
    		onChange
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("selected" in $$props) $$invalidate(0, selected = $$props.selected);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("tab" in $$props) $$invalidate(3, tab = $$props.tab);
    		if ("childNodes" in $$props) childNodes = $$props.childNodes;
    		if ("left" in $$props) $$invalidate(4, left = $$props.left);
    		if ("width" in $$props) $$invalidate(5, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		selected,
    		items,
    		style,
    		tab,
    		left,
    		width,
    		hasSlots,
    		onChange,
    		$$scope,
    		slots,
    		click_handler,
    		nav_binding
    	];
    }

    class Tab extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { items: 1, selected: 0, style: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tab",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get items() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/bottom-sheet/src/Option.svelte generated by Svelte v3.32.0 */
    const file$6 = "components/bottom-sheet/src/Option.svelte";

    // (23:2) {#if icon}
    function create_if_block$4(ctx) {
    	let span;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block_1$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (typeof /*icon*/ ctx[2] === "string") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if_block.c();
    			attr_dev(span, "class", "responsive-ui-option__icon svelte-1diiqeb");
    			add_location(span, file$6, 23, 4, 600);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			if_blocks[current_block_type_index].m(span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(span, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(23:2) {#if icon}",
    		ctx
    	});

    	return block;
    }

    // (27:6) {:else}
    function create_else_block$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(27:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (25:6) {#if typeof icon === "string"}
    function create_if_block_1$2(ctx) {
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: { type: /*icon*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty & /*icon*/ 4) icon_1_changes.type = /*icon*/ ctx[2];
    			icon_1.$set(icon_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(25:6) {#if typeof icon === \\\"string\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let t0;
    	let span;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*icon*/ ctx[2] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			span = element("span");
    			t1 = text(/*title*/ ctx[1]);
    			attr_dev(span, "class", "responsive-ui-option__title svelte-1diiqeb");
    			toggle_class(span, "responsive-ui-option__title--nowrap", /*nowrap*/ ctx[3]);
    			add_location(span, file$6, 31, 2, 797);
    			attr_dev(div, "class", "responsive-ui-option svelte-1diiqeb");
    			toggle_class(div, "responsive-ui-option--checked", /*checked*/ ctx[0]);
    			toggle_class(div, "responsive-ui-option--disabled", /*disabled*/ ctx[4]);
    			add_location(div, file$6, 16, 0, 403);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(span, t1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"click",
    					function () {
    						if (is_function(/*disabled*/ ctx[4] ? undefined : /*onClick*/ ctx[5])) (/*disabled*/ ctx[4] ? undefined : /*onClick*/ ctx[5]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (/*icon*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*icon*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);

    			if (dirty & /*nowrap*/ 8) {
    				toggle_class(span, "responsive-ui-option__title--nowrap", /*nowrap*/ ctx[3]);
    			}

    			if (dirty & /*checked*/ 1) {
    				toggle_class(div, "responsive-ui-option--checked", /*checked*/ ctx[0]);
    			}

    			if (dirty & /*disabled*/ 16) {
    				toggle_class(div, "responsive-ui-option--disabled", /*disabled*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Option", slots, []);
    	
    	const dispatch = createEventDispatcher();
    	let { title = "" } = $$props;
    	let { icon } = $$props;
    	let { value = "" } = $$props;
    	let { nowrap = false } = $$props;
    	let { disabled = false } = $$props;
    	let { checked = false } = $$props;

    	const onClick = () => {
    		$$invalidate(0, checked = !checked);
    		dispatch("change", { checked, value });
    	};

    	const writable_props = ["title", "icon", "value", "nowrap", "disabled", "checked"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Option> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("title" in $$props) $$invalidate(1, title = $$props.title);
    		if ("icon" in $$props) $$invalidate(2, icon = $$props.icon);
    		if ("value" in $$props) $$invalidate(6, value = $$props.value);
    		if ("nowrap" in $$props) $$invalidate(3, nowrap = $$props.nowrap);
    		if ("disabled" in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Icon,
    		dispatch,
    		title,
    		icon,
    		value,
    		nowrap,
    		disabled,
    		checked,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(1, title = $$props.title);
    		if ("icon" in $$props) $$invalidate(2, icon = $$props.icon);
    		if ("value" in $$props) $$invalidate(6, value = $$props.value);
    		if ("nowrap" in $$props) $$invalidate(3, nowrap = $$props.nowrap);
    		if ("disabled" in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [checked, title, icon, nowrap, disabled, onClick, value];
    }

    class Option extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			title: 1,
    			icon: 2,
    			value: 6,
    			nowrap: 3,
    			disabled: 4,
    			checked: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Option",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*icon*/ ctx[2] === undefined && !("icon" in props)) {
    			console.warn("<Option> was created without expected prop 'icon'");
    		}
    	}

    	get title() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nowrap() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nowrap(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/bottom-sheet/src/BottomSheet.svelte generated by Svelte v3.32.0 */

    const { Map: Map_1 } = globals;
    const file$7 = "components/bottom-sheet/src/BottomSheet.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (64:8) {#each items[selected].options || [] as opt (opt.value)}
    function create_each_block$2(key_1, ctx) {
    	let first;
    	let option;
    	let current;

    	const option_spread_levels = [
    		/*opt*/ ctx[13],
    		{
    			checked: /*items*/ ctx[0][/*selected*/ ctx[2]].selected?.has(/*opt*/ ctx[13].value)
    		}
    	];

    	let option_props = {};

    	for (let i = 0; i < option_spread_levels.length; i += 1) {
    		option_props = assign(option_props, option_spread_levels[i]);
    	}

    	option = new Option({ props: option_props, $$inline: true });
    	option.$on("change", /*onOptionChange*/ ctx[6]);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(option.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(option, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			const option_changes = (dirty & /*items, selected*/ 5)
    			? get_spread_update(option_spread_levels, [
    					get_spread_object(/*opt*/ ctx[13]),
    					{
    						checked: /*items*/ ctx[0][/*selected*/ ctx[2]].selected?.has(/*opt*/ ctx[13].value)
    					}
    				])
    			: {};

    			option.$set(option_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(option.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(option.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(option, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(64:8) {#each items[selected].options || [] as opt (opt.value)}",
    		ctx
    	});

    	return block;
    }

    // (59:4) <Tab {items} bind:selected>
    function create_default_slot_2(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map_1();
    	let div_style_value;
    	let current;
    	let each_value = /*items*/ ctx[0][/*selected*/ ctx[2]].options || [];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*opt*/ ctx[13].value;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "responsive-ui-bottom-sheet__body svelte-1vt0bnp");
    			attr_dev(div, "style", div_style_value = `height:${/*height*/ ctx[5] - 150}px`);
    			add_location(div, file$7, 59, 6, 1673);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items, selected, onOptionChange*/ 69) {
    				each_value = /*items*/ ctx[0][/*selected*/ ctx[2]].options || [];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
    				check_outros();
    			}

    			if (!current || dirty & /*height*/ 32 && div_style_value !== (div_style_value = `height:${/*height*/ ctx[5] - 150}px`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(59:4) <Tab {items} bind:selected>",
    		ctx
    	});

    	return block;
    }

    // (75:4) <Button {disabled} on:click={onFilter}>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("FILTER");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(75:4) <Button {disabled} on:click={onFilter}>",
    		ctx
    	});

    	return block;
    }

    // (52:0) <BottomModal bind:open {closable}>
    function create_default_slot(ctx) {
    	let div;
    	let header;
    	let span;
    	let t1;
    	let tab;
    	let updating_selected;
    	let div_style_value;
    	let t2;
    	let footer;
    	let button;
    	let current;
    	let mounted;
    	let dispose;

    	function tab_selected_binding(value) {
    		/*tab_selected_binding*/ ctx[9].call(null, value);
    	}

    	let tab_props = {
    		items: /*items*/ ctx[0],
    		$$slots: { default: [create_default_slot_2] },
    		$$scope: { ctx }
    	};

    	if (/*selected*/ ctx[2] !== void 0) {
    		tab_props.selected = /*selected*/ ctx[2];
    	}

    	tab = new Tab({ props: tab_props, $$inline: true });
    	binding_callbacks.push(() => bind(tab, "selected", tab_selected_binding));

    	button = new Button({
    			props: {
    				disabled: /*disabled*/ ctx[3],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*onFilter*/ ctx[8]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			header = element("header");
    			span = element("span");
    			span.textContent = "Reset";
    			t1 = space();
    			create_component(tab.$$.fragment);
    			t2 = space();
    			footer = element("footer");
    			create_component(button.$$.fragment);
    			attr_dev(span, "class", "responsive-ui-bottom-sheet__reset svelte-1vt0bnp");
    			add_location(span, file$7, 54, 6, 1525);
    			attr_dev(header, "class", "responsive-ui-bottom-sheet__header svelte-1vt0bnp");
    			add_location(header, file$7, 53, 4, 1467);
    			attr_dev(div, "class", "responsive-ui-bottom-sheet svelte-1vt0bnp");
    			attr_dev(div, "style", div_style_value = `height:${/*height*/ ctx[5]}px;`);
    			add_location(div, file$7, 52, 2, 1392);
    			attr_dev(footer, "class", "responsive-ui-bottom-sheet__footer svelte-1vt0bnp");
    			add_location(footer, file$7, 73, 2, 2048);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, header);
    			append_dev(header, span);
    			append_dev(div, t1);
    			mount_component(tab, div, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, footer, anchor);
    			mount_component(button, footer, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span, "click", /*onReset*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const tab_changes = {};
    			if (dirty & /*items*/ 1) tab_changes.items = /*items*/ ctx[0];

    			if (dirty & /*$$scope, height, items, selected*/ 65573) {
    				tab_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_selected && dirty & /*selected*/ 4) {
    				updating_selected = true;
    				tab_changes.selected = /*selected*/ ctx[2];
    				add_flush_callback(() => updating_selected = false);
    			}

    			tab.$set(tab_changes);

    			if (!current || dirty & /*height*/ 32 && div_style_value !== (div_style_value = `height:${/*height*/ ctx[5]}px;`)) {
    				attr_dev(div, "style", div_style_value);
    			}

    			const button_changes = {};
    			if (dirty & /*disabled*/ 8) button_changes.disabled = /*disabled*/ ctx[3];

    			if (dirty & /*$$scope*/ 65536) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(tab);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(footer);
    			destroy_component(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(52:0) <BottomModal bind:open {closable}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let bottommodal;
    	let updating_open;
    	let current;

    	function bottommodal_open_binding(value) {
    		/*bottommodal_open_binding*/ ctx[10].call(null, value);
    	}

    	let bottommodal_props = {
    		closable: /*closable*/ ctx[4],
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*open*/ ctx[1] !== void 0) {
    		bottommodal_props.open = /*open*/ ctx[1];
    	}

    	bottommodal = new BottomModal({ props: bottommodal_props, $$inline: true });
    	binding_callbacks.push(() => bind(bottommodal, "open", bottommodal_open_binding));

    	const block = {
    		c: function create() {
    			create_component(bottommodal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(bottommodal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const bottommodal_changes = {};
    			if (dirty & /*closable*/ 16) bottommodal_changes.closable = /*closable*/ ctx[4];

    			if (dirty & /*$$scope, disabled, height, items, selected*/ 65581) {
    				bottommodal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open && dirty & /*open*/ 2) {
    				updating_open = true;
    				bottommodal_changes.open = /*open*/ ctx[1];
    				add_flush_callback(() => updating_open = false);
    			}

    			bottommodal.$set(bottommodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bottommodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bottommodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bottommodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let height;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("BottomSheet", slots, []);
    	
    	const dispatch = createEventDispatcher();
    	let { items = [] } = $$props;
    	let { open = false } = $$props;
    	let { selected = 0 } = $$props;
    	let { disabled = false } = $$props;
    	let { closable = true } = $$props;

    	items = items.map(v => {
    		if (v.selected) return v;
    		v.selected = new Map();
    		return v;
    	});

    	const onOptionChange = ({ detail }) => {
    		var _a, _b;
    		const { checked, value } = detail;

    		if (checked) (_a = items[selected].selected) === null || _a === void 0
    		? void 0
    		: _a.set(value, true); else (_b = items[selected].selected) === null || _b === void 0
    		? void 0
    		: _b.delete(value);

    		dispatch("change", {
    			selected,
    			value: items[selected].selected
    		});
    	};

    	const closeModal = () => {
    		setTimeout(
    			() => {
    				$$invalidate(1, open = false);
    			},
    			150
    		);
    	};

    	const onReset = () => {
    		for (let i = 0; i < items.length; i++) {
    			$$invalidate(0, items[i].selected = new Map(), items);
    		}

    		dispatch("reset");
    		closeModal();
    	};

    	const onFilter = () => {
    		dispatch("filter", { value: items.map(v => v.selected) });
    		closeModal();
    	};

    	const writable_props = ["items", "open", "selected", "disabled", "closable"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BottomSheet> was created with unknown prop '${key}'`);
    	});

    	function tab_selected_binding(value) {
    		selected = value;
    		$$invalidate(2, selected);
    	}

    	function bottommodal_open_binding(value) {
    		open = value;
    		$$invalidate(1, open);
    	}

    	$$self.$$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("open" in $$props) $$invalidate(1, open = $$props.open);
    		if ("selected" in $$props) $$invalidate(2, selected = $$props.selected);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("closable" in $$props) $$invalidate(4, closable = $$props.closable);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Button,
    		BottomModal,
    		Tab,
    		Option,
    		dispatch,
    		items,
    		open,
    		selected,
    		disabled,
    		closable,
    		onOptionChange,
    		closeModal,
    		onReset,
    		onFilter,
    		height
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("open" in $$props) $$invalidate(1, open = $$props.open);
    		if ("selected" in $$props) $$invalidate(2, selected = $$props.selected);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("closable" in $$props) $$invalidate(4, closable = $$props.closable);
    		if ("height" in $$props) $$invalidate(5, height = $$props.height);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	 $$invalidate(5, height = window.innerHeight * 0.8);

    	return [
    		items,
    		open,
    		selected,
    		disabled,
    		closable,
    		height,
    		onOptionChange,
    		onReset,
    		onFilter,
    		tab_selected_binding,
    		bottommodal_open_binding
    	];
    }

    class BottomSheet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			items: 0,
    			open: 1,
    			selected: 2,
    			disabled: 3,
    			closable: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BottomSheet",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get items() {
    		throw new Error("<BottomSheet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<BottomSheet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<BottomSheet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<BottomSheet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<BottomSheet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<BottomSheet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<BottomSheet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<BottomSheet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closable() {
    		throw new Error("<BottomSheet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closable(value) {
    		throw new Error("<BottomSheet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity }) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    /* components/date-picker/src/Calendar.svelte generated by Svelte v3.32.0 */
    const file$8 = "components/date-picker/src/Calendar.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[24] = list[i];
    	return child_ctx;
    }

    // (152:0) {#if visible}
    function create_if_block$5(ctx) {
    	let div7;
    	let div6;
    	let div5;
    	let div3;
    	let div0;
    	let button0;
    	let svg0;
    	let path0;
    	let t0;
    	let div1;
    	let t1_value = /*MONTH_NAMES*/ ctx[7][/*month*/ ctx[4]] + "";
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let div2;
    	let button1;
    	let svg1;
    	let path1;
    	let t5;
    	let div4;
    	let table;
    	let thead;
    	let tr;
    	let t6;
    	let tbody;
    	let div7_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_2 = /*DAYS*/ ctx[8];
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value = /*availableDays*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div5 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			t3 = text(/*year*/ ctx[5]);
    			t4 = space();
    			div2 = element("div");
    			button1 = element("button");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t5 = space();
    			div4 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t6 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(path0, "stroke-linecap", "round");
    			attr_dev(path0, "stroke-linejoin", "round");
    			attr_dev(path0, "stroke-width", "2");
    			attr_dev(path0, "d", "M15 19l-7-7 7-7");
    			add_location(path0, file$8, 163, 16, 5157);
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "stroke", "currentColor");
    			attr_dev(svg0, "class", "svelte-ymt203");
    			add_location(svg0, file$8, 162, 14, 5081);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "svelte-ymt203");
    			add_location(button0, file$8, 161, 12, 5007);
    			attr_dev(div0, "class", "responsive-ui-date__buttons responsive-ui-date__buttons-prev svelte-ymt203");
    			add_location(div0, file$8, 159, 10, 4908);
    			attr_dev(div1, "class", "responsive-ui-date__month-year svelte-ymt203");
    			add_location(div1, file$8, 171, 10, 5392);
    			attr_dev(path1, "stroke-linecap", "round");
    			attr_dev(path1, "stroke-linejoin", "round");
    			attr_dev(path1, "stroke-width", "2");
    			attr_dev(path1, "d", "M9 5l7 7-7 7");
    			add_location(path1, file$8, 179, 16, 5765);
    			attr_dev(svg1, "fill", "none");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "stroke", "currentColor");
    			attr_dev(svg1, "class", "svelte-ymt203");
    			add_location(svg1, file$8, 178, 14, 5689);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "svelte-ymt203");
    			add_location(button1, file$8, 177, 12, 5615);
    			attr_dev(div2, "class", "responsive-ui-date__buttons responsive-ui-date__buttons-next svelte-ymt203");
    			add_location(div2, file$8, 175, 10, 5516);
    			attr_dev(div3, "class", "responsive-ui-date__header svelte-ymt203");
    			add_location(div3, file$8, 158, 8, 4857);
    			add_location(tr, file$8, 192, 14, 6102);
    			add_location(thead, file$8, 191, 12, 6080);
    			add_location(tbody, file$8, 198, 12, 6285);
    			add_location(table, file$8, 190, 10, 6060);
    			attr_dev(div4, "class", "responsive-ui-date__body");
    			add_location(div4, file$8, 189, 8, 6011);
    			attr_dev(div5, "class", "responsive-ui-date__panel svelte-ymt203");
    			add_location(div5, file$8, 157, 6, 4809);
    			attr_dev(div6, "class", "responsive-ui-date__panels svelte-ymt203");
    			add_location(div6, file$8, 156, 4, 4762);
    			attr_dev(div7, "class", "responsive-ui-date__container svelte-ymt203");
    			attr_dev(div7, "style", /*style*/ ctx[2]);
    			add_location(div7, file$8, 152, 2, 4658);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, div0);
    			append_dev(div0, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div1, t1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, button1);
    			append_dev(button1, svg1);
    			append_dev(svg1, path1);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr, null);
    			}

    			append_dev(table, t6);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", stop_propagation(/*prevMonth*/ ctx[10]), false, false, true),
    					listen_dev(button1, "click", stop_propagation(/*nextMonth*/ ctx[9]), false, false, true),
    					listen_dev(tbody, "click", stop_propagation(/*onSelectDate*/ ctx[11]), false, false, true)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*month*/ 16) && t1_value !== (t1_value = /*MONTH_NAMES*/ ctx[7][/*month*/ ctx[4]] + "")) set_data_dev(t1, t1_value);
    			if (!current || dirty & /*year*/ 32) set_data_dev(t3, /*year*/ ctx[5]);

    			if (dirty & /*DAYS*/ 256) {
    				each_value_2 = /*DAYS*/ ctx[8];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*availableDays, year, String, month, isSelectedDay, hoveredDate*/ 115) {
    				each_value = /*availableDays*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(div7, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div7_transition) div7_transition = create_bidirectional_transition(div7, fade, { duration: 150 }, true);
    				div7_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div7_transition) div7_transition = create_bidirectional_transition(div7, fade, { duration: 150 }, false);
    			div7_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			if (detaching && div7_transition) div7_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(152:0) {#if visible}",
    		ctx
    	});

    	return block;
    }

    // (194:16) {#each DAYS as day}
    function create_each_block_2(ctx) {
    	let th;
    	let t_value = /*day*/ ctx[24] + "";
    	let t;

    	const block = {
    		c: function create() {
    			th = element("th");
    			t = text(t_value);
    			attr_dev(th, "class", "responsive-ui-date__day svelte-ymt203");
    			add_location(th, file$8, 194, 18, 6161);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(194:16) {#each DAYS as day}",
    		ctx
    	});

    	return block;
    }

    // (202:18) {#each dateRow as date}
    function create_each_block_1$1(ctx) {
    	let td;
    	let span;
    	let t_value = /*date*/ ctx[21] + "";
    	let t;
    	let td_data_date_value;
    	let mounted;
    	let dispose;

    	function mouseenter_handler() {
    		return /*mouseenter_handler*/ ctx[13](/*date*/ ctx[21]);
    	}

    	const block = {
    		c: function create() {
    			td = element("td");
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "svelte-ymt203");
    			add_location(span, file$8, 212, 22, 7049);
    			attr_dev(td, "class", "responsive-ui-date__date svelte-ymt203");
    			attr_dev(td, "data-date", td_data_date_value = `${/*year*/ ctx[5]}-${String(/*month*/ ctx[4] + 1).padStart(2, "0")}-${String(/*date*/ ctx[21]).padStart(2, "0")}`);
    			toggle_class(td, "responsive-ui-date__date-selected", /*isSelectedDay*/ ctx[6](`${/*year*/ ctx[5]}-${/*month*/ ctx[4] + 1}-${/*date*/ ctx[21]}`));
    			add_location(td, file$8, 202, 20, 6490);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, span);
    			append_dev(span, t);

    			if (!mounted) {
    				dispose = [
    					listen_dev(td, "mouseenter", mouseenter_handler, false, false, false),
    					listen_dev(td, "mouseleave", /*mouseleave_handler*/ ctx[14], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*availableDays*/ 1 && t_value !== (t_value = /*date*/ ctx[21] + "")) set_data_dev(t, t_value);

    			if (dirty & /*year, month, availableDays*/ 49 && td_data_date_value !== (td_data_date_value = `${/*year*/ ctx[5]}-${String(/*month*/ ctx[4] + 1).padStart(2, "0")}-${String(/*date*/ ctx[21]).padStart(2, "0")}`)) {
    				attr_dev(td, "data-date", td_data_date_value);
    			}

    			if (dirty & /*isSelectedDay, year, month, availableDays*/ 113) {
    				toggle_class(td, "responsive-ui-date__date-selected", /*isSelectedDay*/ ctx[6](`${/*year*/ ctx[5]}-${/*month*/ ctx[4] + 1}-${/*date*/ ctx[21]}`));
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(202:18) {#each dateRow as date}",
    		ctx
    	});

    	return block;
    }

    // (200:14) {#each availableDays as dateRow}
    function create_each_block$3(ctx) {
    	let tr;
    	let t;
    	let each_value_1 = /*dateRow*/ ctx[18];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			set_style(tr, "margin-bottom", "6px");
    			add_location(tr, file$8, 200, 16, 6396);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			append_dev(tr, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*year, String, month, availableDays, isSelectedDay, hoveredDate*/ 115) {
    				each_value_1 = /*dateRow*/ ctx[18];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(200:14) {#each availableDays as dateRow}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*visible*/ ctx[3] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*visible*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*visible*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let isSelectedDay;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Calendar", slots, []);
    	const dispatch = createEventDispatcher();
    	let { style = "" } = $$props;
    	let { value = "" } = $$props;
    	let { visible = false } = $$props;
    	let { availableDays = [] } = $$props;
    	let { hoveredDate = "" } = $$props;
    	let today = value ? new Date(value) : new Date();
    	let month = today.getMonth();
    	let year = today.getFullYear();

    	const MONTH_NAMES = [
    		"January",
    		"February",
    		"March",
    		"April",
    		"May",
    		"June",
    		"July",
    		"August",
    		"September",
    		"October",
    		"November",
    		"December"
    	];

    	const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

    	const nextMonth = () => {
    		if ($$invalidate(4, ++month) > 11) {
    			$$invalidate(5, year++, year);
    			$$invalidate(4, month = 0);
    		}

    		getNoOfDays();
    	};

    	const prevMonth = () => {
    		if ($$invalidate(4, --month) < 0) {
    			$$invalidate(5, year--, year);
    			$$invalidate(4, month = 11);
    		}

    		getNoOfDays();
    	};

    	const getNoOfDays = () => {
    		const daysInMonth = new Date(year, month + 1, 0).getDate();

    		// find where to start calendar day of week
    		const dayOfWeek = new Date(year, month).getDay();

    		const blankDaysArray = [];

    		for (let i = 1; i <= dayOfWeek - 1; i++) {
    			// blankDaysArray.push(i);
    			blankDaysArray.push("");
    		}

    		const daysArray = [];

    		for (let i = 1; i <= daysInMonth; i++) {
    			daysArray.push(i);
    		}

    		// blankDays = blankDaysArray;
    		// availableDays = daysArray;
    		const days = [...blankDaysArray, ...daysArray];

    		$$invalidate(0, availableDays = days.reduce(
    			(arr, item, idx) => {
    				const cIdx = Math.floor(idx / 7);

    				if (!arr[cIdx]) {
    					arr[cIdx] = [];
    				}

    				arr[cIdx].push(item);
    				return arr;
    			},
    			[]
    		));
    	};

    	const onSelectDate = e => {
    		
    	}; // const date = getNodeAttribute(e, "data-date");
    	// console.log(date);
    	// if (date) {
    	//   value = date;

    	//   dispatch("change", value);
    	// }
    	getNoOfDays();

    	const writable_props = ["style", "value", "visible", "availableDays", "hoveredDate"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Calendar> was created with unknown prop '${key}'`);
    	});

    	const mouseenter_handler = date => {
    		$$invalidate(1, hoveredDate = `${year}-${month + 1}-${date}`);
    	};

    	const mouseleave_handler = () => {
    		$$invalidate(1, hoveredDate = "");
    	};

    	$$self.$$set = $$props => {
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("value" in $$props) $$invalidate(12, value = $$props.value);
    		if ("visible" in $$props) $$invalidate(3, visible = $$props.visible);
    		if ("availableDays" in $$props) $$invalidate(0, availableDays = $$props.availableDays);
    		if ("hoveredDate" in $$props) $$invalidate(1, hoveredDate = $$props.hoveredDate);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		fade,
    		dispatch,
    		style,
    		value,
    		visible,
    		availableDays,
    		hoveredDate,
    		today,
    		month,
    		year,
    		MONTH_NAMES,
    		DAYS,
    		nextMonth,
    		prevMonth,
    		getNoOfDays,
    		onSelectDate,
    		isSelectedDay
    	});

    	$$self.$inject_state = $$props => {
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("value" in $$props) $$invalidate(12, value = $$props.value);
    		if ("visible" in $$props) $$invalidate(3, visible = $$props.visible);
    		if ("availableDays" in $$props) $$invalidate(0, availableDays = $$props.availableDays);
    		if ("hoveredDate" in $$props) $$invalidate(1, hoveredDate = $$props.hoveredDate);
    		if ("today" in $$props) today = $$props.today;
    		if ("month" in $$props) $$invalidate(4, month = $$props.month);
    		if ("year" in $$props) $$invalidate(5, year = $$props.year);
    		if ("isSelectedDay" in $$props) $$invalidate(6, isSelectedDay = $$props.isSelectedDay);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 4096) {
    			 $$invalidate(6, isSelectedDay = (date, type) => {
    				if (type === "end") {
    					return value[1] === date;
    				}

    				if (type === "start") {
    					return value[0] === date;
    				}

    				return false;
    			});
    		}
    	};

    	return [
    		availableDays,
    		hoveredDate,
    		style,
    		visible,
    		month,
    		year,
    		isSelectedDay,
    		MONTH_NAMES,
    		DAYS,
    		nextMonth,
    		prevMonth,
    		onSelectDate,
    		value,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class Calendar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			style: 2,
    			value: 12,
    			visible: 3,
    			availableDays: 0,
    			hoveredDate: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Calendar",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get style() {
    		return this.$$.ctx[2];
    	}

    	set style(style) {
    		this.$set({ style });
    		flush();
    	}

    	get value() {
    		return this.$$.ctx[12];
    	}

    	set value(value) {
    		this.$set({ value });
    		flush();
    	}

    	get visible() {
    		return this.$$.ctx[3];
    	}

    	set visible(visible) {
    		this.$set({ visible });
    		flush();
    	}

    	get availableDays() {
    		return this.$$.ctx[0];
    	}

    	set availableDays(availableDays) {
    		this.$set({ availableDays });
    		flush();
    	}

    	get hoveredDate() {
    		return this.$$.ctx[1];
    	}

    	set hoveredDate(hoveredDate) {
    		this.$set({ hoveredDate });
    		flush();
    	}
    }

    /* components/date-picker/src/DatePicker.svelte generated by Svelte v3.32.0 */

    const { console: console_1 } = globals;
    const file$9 = "components/date-picker/src/DatePicker.svelte";

    function create_fragment$9(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			input = element("input");
    			attr_dev(input, "type", "date");
    			attr_dev(input, "name", /*name*/ ctx[1]);
    			input.disabled = /*disabled*/ ctx[3];
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[4]);
    			input.readOnly = /*readonly*/ ctx[2];
    			input.value = /*value*/ ctx[0];
    			attr_dev(input, "class", "svelte-1ucj77x");
    			add_location(input, file$9, 130, 6, 4291);
    			attr_dev(div0, "class", "responsive-ui-date__input svelte-1ucj77x");
    			add_location(div0, file$9, 116, 4, 3734);
    			attr_dev(div1, "class", "responsive-ui-date__wrapper svelte-1ucj77x");
    			add_location(div1, file$9, 115, 2, 3688);
    			attr_dev(div2, "class", "responsive-ui-date svelte-1ucj77x");
    			add_location(div2, file$9, 114, 0, 3606);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			/*div2_binding*/ ctx[9](div2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*change_handler*/ ctx[7], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[8], false, false, false),
    					listen_dev(div2, "click", /*handleToggle*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 2) {
    				attr_dev(input, "name", /*name*/ ctx[1]);
    			}

    			if (dirty & /*disabled*/ 8) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (dirty & /*placeholder*/ 16) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[4]);
    			}

    			if (dirty & /*readonly*/ 4) {
    				prop_dev(input, "readOnly", /*readonly*/ ctx[2]);
    			}

    			if (dirty & /*value*/ 1) {
    				prop_dev(input, "value", /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			/*div2_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }
    const queue$1 = [];

    window.addEventListener("click", e => {
    	console.log(queue$1);
    });

    function getAbsoluteBoundingRect(el) {
    	var doc = document,
    		win = window,
    		body = doc.body,
    		// pageXOffset and pageYOffset work everywhere except IE <9.
    		offsetX = win.pageXOffset !== undefined
    		? win.pageXOffset
    		: (doc.documentElement || body.parentNode || body).scrollLeft,
    		offsetY = win.pageYOffset !== undefined
    		? win.pageYOffset
    		: (doc.documentElement || body.parentNode || body).scrollTop,
    		rect = el.getBoundingClientRect();

    	let target;
    	console.log(rect);

    	if (el !== body) {
    		var parent = el.parentNode;

    		// The element's rect will be affected by the scroll positions of
    		// *all* of its scrollable parents, not just the window, so we have
    		// to walk up the tree and collect every scroll offset. Good times.
    		while (parent !== body) {
    			console.log(parent, parent.scrollTop, window.getComputedStyle(parent).getPropertyValue("position"));
    			const position = window.getComputedStyle(parent).getPropertyValue("position");
    			offsetX += parent.scrollLeft;
    			offsetY += parent.scrollTop;

    			if (!target && position !== "relative") {
    				console.log("parent rect =>", parent.getBoundingClientRect());
    				target = parent;
    			} // break;

    			parent = parent.parentNode;
    		}
    	}

    	return {
    		target,
    		bottom: rect.bottom + offsetY,
    		height: rect.height,
    		left: rect.left + offsetX,
    		right: rect.right + offsetX,
    		top: rect.top + offsetY,
    		width: rect.width
    	};
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("DatePicker", slots, []);
    	
    	const today = new Date();
    	let { name = "" } = $$props;
    	let { readonly = false } = $$props;
    	let { disabled = false } = $$props;
    	let { value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}` } = $$props;
    	let { placeholder = "" } = $$props;
    	let datepicker;
    	let calendar;

    	onMount(() => {
    		queue$1.push([datepicker]);
    	});

    	const handleToggle = e => {
    		const rect = e.currentTarget.getBoundingClientRect();
    		const { top, bottom } = getAbsoluteBoundingRect(e.currentTarget);

    		if (!calendar) {
    			calendar = new Calendar({ target: document.body, props: { value } });

    			calendar.$on("change", ({ detail }) => {
    				$$invalidate(0, value = detail);

    				setTimeout(
    					() => {
    						calendar.$set({ visible: false });
    					},
    					200
    				);
    			});
    		}

    		calendar.$set({
    			style: `top:${bottom + 10}px;left:${rect.left}px;`,
    			visible: !calendar.visible,
    			value
    		});
    	};

    	onDestroy(() => {
    		calendar && calendar.$destroy();
    	});

    	const writable_props = ["name", "readonly", "disabled", "value", "placeholder"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<DatePicker> was created with unknown prop '${key}'`);
    	});

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			datepicker = $$value;
    			$$invalidate(5, datepicker);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("readonly" in $$props) $$invalidate(2, readonly = $$props.readonly);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("placeholder" in $$props) $$invalidate(4, placeholder = $$props.placeholder);
    	};

    	$$self.$capture_state = () => ({
    		queue: queue$1,
    		onMount,
    		onDestroy,
    		Calendar,
    		today,
    		name,
    		readonly,
    		disabled,
    		value,
    		placeholder,
    		datepicker,
    		calendar,
    		getAbsoluteBoundingRect,
    		handleToggle
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("readonly" in $$props) $$invalidate(2, readonly = $$props.readonly);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("placeholder" in $$props) $$invalidate(4, placeholder = $$props.placeholder);
    		if ("datepicker" in $$props) $$invalidate(5, datepicker = $$props.datepicker);
    		if ("calendar" in $$props) calendar = $$props.calendar;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		name,
    		readonly,
    		disabled,
    		placeholder,
    		datepicker,
    		handleToggle,
    		change_handler,
    		blur_handler,
    		div2_binding
    	];
    }

    class DatePicker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			name: 1,
    			readonly: 2,
    			disabled: 3,
    			value: 0,
    			placeholder: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DatePicker",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get name() {
    		throw new Error("<DatePicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<DatePicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<DatePicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<DatePicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<DatePicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<DatePicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<DatePicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<DatePicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<DatePicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<DatePicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/header/src/Header.svelte generated by Svelte v3.32.0 */

    const file$a = "components/header/src/Header.svelte";

    function create_fragment$a(ctx) {
    	let header;
    	let span;
    	let t0;
    	let t1;
    	let header_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			header = element("header");
    			span = element("span");
    			t0 = text(/*title*/ ctx[1]);
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "responsive-ui-header__title svelte-ja9y1l");
    			add_location(span, file$a, 7, 2, 186);
    			attr_dev(header, "class", header_class_value = "responsive-ui-header " + /*className*/ ctx[0] + " svelte-ja9y1l");
    			attr_dev(header, "style", /*style*/ ctx[2]);
    			add_location(header, file$a, 6, 0, 126);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, span);
    			append_dev(span, t0);
    			append_dev(header, t1);

    			if (default_slot) {
    				default_slot.m(header, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*className*/ 1 && header_class_value !== (header_class_value = "responsive-ui-header " + /*className*/ ctx[0] + " svelte-ja9y1l")) {
    				attr_dev(header, "class", header_class_value);
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(header, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Header", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { title = "" } = $$props;
    	let { style = "" } = $$props;
    	const writable_props = ["class", "title", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("title" in $$props) $$invalidate(1, title = $$props.title);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ className, title, style });

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("title" in $$props) $$invalidate(1, title = $$props.title);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, title, style, $$scope, slots];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { class: 0, title: 1, style: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get class() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/dock/src/Dock.svelte generated by Svelte v3.32.0 */
    const file$b = "components/dock/src/Dock.svelte";

    // (11:0) {#if open}
    function create_if_block$6(ctx) {
    	let div;
    	let div_intro;
    	let div_outro;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "responsive-ui-dock__overlay svelte-8oswqc");
    			add_location(div, file$b, 11, 2, 270);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"click",
    					function () {
    						if (is_function(/*closable*/ ctx[2]
    						? /*click_handler*/ ctx[8]
    						: undefined)) (/*closable*/ ctx[2]
    						? /*click_handler*/ ctx[8]
    						: undefined).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				if (!div_intro) div_intro = create_in_transition(div, fade, {});
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_outro) div_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(11:0) {#if open}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let t;
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	let if_block = /*open*/ ctx[0] && create_if_block$6(ctx);
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "responsive-ui-dock responsive-ui-dock--" + /*placement*/ ctx[4] + " " + /*className*/ ctx[1] + " svelte-8oswqc");
    			attr_dev(div, "style", div_style_value = `width:${/*width*/ ctx[3]};${/*style*/ ctx[5]}`);
    			toggle_class(div, "responsive-ui-dock--close", !/*open*/ ctx[0]);
    			add_location(div, file$b, 18, 0, 410);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*open*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*open*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 64) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*placement, className*/ 18 && div_class_value !== (div_class_value = "responsive-ui-dock responsive-ui-dock--" + /*placement*/ ctx[4] + " " + /*className*/ ctx[1] + " svelte-8oswqc")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*width, style*/ 40 && div_style_value !== (div_style_value = `width:${/*width*/ ctx[3]};${/*style*/ ctx[5]}`)) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (dirty & /*placement, className, open*/ 19) {
    				toggle_class(div, "responsive-ui-dock--close", !/*open*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Dock", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { open = false } = $$props;
    	let { closable = true } = $$props;
    	let { width = "280px" } = $$props;
    	let { placement = "left" } = $$props;
    	let { style = "" } = $$props;
    	const writable_props = ["class", "open", "closable", "width", "placement", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Dock> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, open = !open);

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("closable" in $$props) $$invalidate(2, closable = $$props.closable);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("placement" in $$props) $$invalidate(4, placement = $$props.placement);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		className,
    		open,
    		closable,
    		width,
    		placement,
    		style
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("open" in $$props) $$invalidate(0, open = $$props.open);
    		if ("closable" in $$props) $$invalidate(2, closable = $$props.closable);
    		if ("width" in $$props) $$invalidate(3, width = $$props.width);
    		if ("placement" in $$props) $$invalidate(4, placement = $$props.placement);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		open,
    		className,
    		closable,
    		width,
    		placement,
    		style,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class Dock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			class: 1,
    			open: 0,
    			closable: 2,
    			width: 3,
    			placement: 4,
    			style: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dock",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get class() {
    		throw new Error("<Dock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Dock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<Dock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Dock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closable() {
    		throw new Error("<Dock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closable(value) {
    		throw new Error("<Dock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Dock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Dock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placement() {
    		throw new Error("<Dock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placement(value) {
    		throw new Error("<Dock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Dock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Dock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var u=function(n){return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n)},o=function(n,t){return n===t[0]},a=function(n,t){var e=parseFloat(t[0]);return (isNaN(n)?n.length:parseFloat(n))>=e},c=function(n,t){var e=parseInt(t[0],10);switch(!0){case"string"==typeof n:return n.length>=e;default:return n.toString().length>=e}},l=function(n,t){var e=parseFloat(t[0]),r=isNaN(n)?n.length:parseFloat(n);return !!isNaN(r)||r<=e},s=function(n,t){return a(n,t[0])&&l(n,t[1])},f=function(n){return /^\d+$/.test(n)},v=function(n){return null!=n&&("string"==typeof n?n.replace(/\s/g,"").length>0:Array.isArray(n)?n.length>0:!n.hasOwnProperty("keys")||Object.keys(n).length>0)},d=function(n){return /(https?|ftp|git|svn):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(n)},p=function(n,t){return t.includes(n)};Object.freeze({__proto__:null,email:u,equal:o,minlen:c,min:a,max:l,between:s,numeric:f,required:v,url:d,any:p});var x=function(n,t){for(var e=n.currentTarget,r=void 0===e?document.body:e,i=n.target;i!=r;){if(i&&i.hasAttribute(t))return i.getAttribute(t);i=i.parentNode;}return null};

    /* components/menu/src/Menu.svelte generated by Svelte v3.32.0 */
    const file$c = "components/menu/src/Menu.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (33:6) {:else}
    function create_else_block$3(ctx) {
    	let a;
    	let div;
    	let t0_value = /*item*/ ctx[5].title + "";
    	let t0;
    	let t1;
    	let a_href_value;
    	let if_block = /*level*/ ctx[2].length === 0 && /*item*/ ctx[5].submenus && create_if_block_2$1(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "responsive-ui-menu__label");
    			add_location(div, file$c, 34, 10, 1104);
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[5].href);
    			attr_dev(a, "class", "responsive-ui-menu__title svelte-1u4la5i");
    			add_location(a, file$c, 33, 8, 1039);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div);
    			append_dev(div, t0);
    			append_dev(a, t1);
    			if (if_block) if_block.m(a, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 2 && t0_value !== (t0_value = /*item*/ ctx[5].title + "")) set_data_dev(t0, t0_value);

    			if (/*level*/ ctx[2].length === 0 && /*item*/ ctx[5].submenus) {
    				if (if_block) ; else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(a, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*items*/ 2 && a_href_value !== (a_href_value = /*item*/ ctx[5].href)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(33:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (29:6) {#if item.disabled}
    function create_if_block_1$3(ctx) {
    	let div1;
    	let div0;
    	let t_value = /*item*/ ctx[5].title + "";
    	let t;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = text(t_value);
    			attr_dev(div0, "class", "responsive-ui-menu__label");
    			add_location(div0, file$c, 30, 10, 944);
    			attr_dev(div1, "class", "responsive-ui-menu__title svelte-1u4la5i");
    			add_location(div1, file$c, 29, 8, 894);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 2 && t_value !== (t_value = /*item*/ ctx[5].title + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(29:6) {#if item.disabled}",
    		ctx
    	});

    	return block;
    }

    // (36:10) {#if level.length === 0 && item.submenus}
    function create_if_block_2$1(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M6 6L14 10L6 14V6Z");
    			attr_dev(path, "fill", "currentColor");
    			add_location(path, file$c, 38, 14, 1367);
    			attr_dev(svg, "class", "responsive-ui-menu__control svelte-1u4la5i");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			add_location(svg, file$c, 37, 12, 1291);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(36:10) {#if level.length === 0 && item.submenus}",
    		ctx
    	});

    	return block;
    }

    // (44:6) {#if item.submenus && item.collapsed}
    function create_if_block$7(ctx) {
    	let menu;
    	let current;

    	menu = new Menu({
    			props: {
    				class: "responsive-ui-menu__submenu",
    				level: [.../*level*/ ctx[2], /*i*/ ctx[7]],
    				items: /*item*/ ctx[5].submenus
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(menu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(menu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const menu_changes = {};
    			if (dirty & /*level*/ 4) menu_changes.level = [.../*level*/ ctx[2], /*i*/ ctx[7]];
    			if (dirty & /*items*/ 2) menu_changes.items = /*item*/ ctx[5].submenus;
    			menu.$set(menu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(44:6) {#if item.submenus && item.collapsed}",
    		ctx
    	});

    	return block;
    }

    // (21:2) {#each items as item, i}
    function create_each_block$4(ctx) {
    	let li;
    	let t0;
    	let t1;
    	let li_data_item_value;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*item*/ ctx[5].disabled) return create_if_block_1$3;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*item*/ ctx[5].submenus && /*item*/ ctx[5].collapsed && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			attr_dev(li, "class", "responsive-ui-menu__item svelte-1u4la5i");
    			attr_dev(li, "data-item", li_data_item_value = JSON.stringify([.../*level*/ ctx[2], /*item*/ ctx[5]]));
    			toggle_class(li, "responsive-ui-menu__item--disabled", /*item*/ ctx[5].disabled);
    			toggle_class(li, "responsive-ui-menu__item--collapsed", !/*item*/ ctx[5].collapsed);
    			toggle_class(li, "responsive-ui-menu__item--active", /*item*/ ctx[5].isActive);
    			add_location(li, file$c, 21, 4, 570);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if_block0.m(li, null);
    			append_dev(li, t0);
    			if (if_block1) if_block1.m(li, null);
    			append_dev(li, t1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(li, t0);
    				}
    			}

    			if (/*item*/ ctx[5].submenus && /*item*/ ctx[5].collapsed) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*items*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$7(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(li, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*level, items*/ 6 && li_data_item_value !== (li_data_item_value = JSON.stringify([.../*level*/ ctx[2], /*item*/ ctx[5]]))) {
    				attr_dev(li, "data-item", li_data_item_value);
    			}

    			if (dirty & /*items*/ 2) {
    				toggle_class(li, "responsive-ui-menu__item--disabled", /*item*/ ctx[5].disabled);
    			}

    			if (dirty & /*items*/ 2) {
    				toggle_class(li, "responsive-ui-menu__item--collapsed", !/*item*/ ctx[5].collapsed);
    			}

    			if (dirty & /*items*/ 2) {
    				toggle_class(li, "responsive-ui-menu__item--active", /*item*/ ctx[5].isActive);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(21:2) {#each items as item, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let ul;
    	let ul_class_value;
    	let ul_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", ul_class_value = "" + (null_to_empty(`responsive-ui-menu ${/*className*/ ctx[0]}`) + " svelte-1u4la5i"));
    			add_location(ul, file$c, 15, 0, 440);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(ul, "click", /*handleSelectMenu*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*JSON, level, items*/ 6) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*className*/ 1 && ul_class_value !== (ul_class_value = "" + (null_to_empty(`responsive-ui-menu ${/*className*/ ctx[0]}`) + " svelte-1u4la5i"))) {
    				attr_dev(ul, "class", ul_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			add_render_callback(() => {
    				if (!ul_transition) ul_transition = create_bidirectional_transition(ul, slide, {}, true);
    				ul_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			if (!ul_transition) ul_transition = create_bidirectional_transition(ul, slide, {}, false);
    			ul_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			if (detaching && ul_transition) ul_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Menu", slots, []);
    	
    	let { class: className = "" } = $$props;
    	const dispatch = createEventDispatcher();
    	let { items = [] } = $$props;
    	let { level = [] } = $$props;

    	const handleSelectMenu = e => {
    		const data = JSON.parse(x(e, "data-item"));
    		dispatch("change", data);
    	};

    	const writable_props = ["class", "items", "level"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("level" in $$props) $$invalidate(2, level = $$props.level);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		slide,
    		getNodeAttribute: x,
    		className,
    		dispatch,
    		items,
    		level,
    		handleSelectMenu
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("level" in $$props) $$invalidate(2, level = $$props.level);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, items, level, handleSelectMenu];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { class: 0, items: 1, level: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get class() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get level() {
    		throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set level(value) {
    		throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/dropdown/src/Dropdown.svelte generated by Svelte v3.32.0 */

    const file$d = "components/dropdown/src/Dropdown.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i];
    	child_ctx[25] = i;
    	return child_ctx;
    }

    // (98:8) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let t0_value = (/*item*/ ctx[23].title || "") + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "responsive-ui-dropdown__item svelte-bmpsuc");
    			toggle_class(div, "responsive-ui-dropdown__item--disabled", /*item*/ ctx[23].disabled);
    			add_location(div, file$d, 98, 10, 3055);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"click",
    					function () {
    						if (is_function(/*item*/ ctx[23].onClick
    						? /*item*/ ctx[23].onClick
    						: click_handler)) (/*item*/ ctx[23].onClick
    						? /*item*/ ctx[23].onClick
    						: click_handler).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*items*/ 2 && t0_value !== (t0_value = (/*item*/ ctx[23].title || "") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*items*/ 2) {
    				toggle_class(div, "responsive-ui-dropdown__item--disabled", /*item*/ ctx[23].disabled);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(98:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (90:28) 
    function create_if_block_1$4(ctx) {
    	let a;
    	let t0_value = (/*item*/ ctx[23].title || "") + "";
    	let t0;
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "responsive-ui-dropdown__item svelte-bmpsuc");
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[23].href);
    			toggle_class(a, "responsive-ui-dropdown__item--disabled", /*item*/ ctx[23].disabled);
    			add_location(a, file$d, 90, 10, 2817);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 2 && t0_value !== (t0_value = (/*item*/ ctx[23].title || "") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*items*/ 2 && a_href_value !== (a_href_value = /*item*/ ctx[23].href)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*items*/ 2) {
    				toggle_class(a, "responsive-ui-dropdown__item--disabled", /*item*/ ctx[23].disabled);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(90:28) ",
    		ctx
    	});

    	return block;
    }

    // (88:8) {#if item.divider}
    function create_if_block$8(ctx) {
    	let hr;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			attr_dev(hr, "class", "responsive-ui-dropdown__divider svelte-bmpsuc");
    			add_location(hr, file$d, 88, 10, 2731);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(88:8) {#if item.divider}",
    		ctx
    	});

    	return block;
    }

    // (87:6) {#each items as item, i}
    function create_each_block$5(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*item*/ ctx[23].divider) return create_if_block$8;
    		if (/*item*/ ctx[23].href) return create_if_block_1$4;
    		return create_else_block$4;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(87:6) {#each items as item, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div3;
    	let div0;
    	let t;
    	let div2;
    	let div1;
    	let div1_resize_listener;
    	let div2_style_value;
    	let div3_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "responsive-ui-dropdown__activator");
    			add_location(div0, file$d, 66, 2, 2054);
    			set_style(div1, "padding", "10px 0");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[16].call(div1));
    			add_location(div1, file$d, 85, 4, 2616);
    			attr_dev(div2, "class", "responsive-ui-dropdown__list svelte-bmpsuc");

    			attr_dev(div2, "style", div2_style_value = `height:${/*show*/ ctx[6] ? /*clientHeight*/ ctx[5] : 0}px; max-height: ${/*maxHeight*/ ctx[7]};${/*trigger*/ ctx[2] === "context"
			? `top:${/*y*/ ctx[4]}px;left:${/*x*/ ctx[3]}px;`
			: ""}`);

    			toggle_class(div2, "responsive-ui-dropdown__contextmenu", /*trigger*/ ctx[2] === "contextmenu");
    			add_location(div2, file$d, 75, 2, 2293);
    			attr_dev(div3, "class", div3_class_value = "responsive-ui-dropdown " + /*className*/ ctx[0] + " svelte-bmpsuc");
    			add_location(div3, file$d, 52, 0, 1777);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div3, t);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[16].bind(div1));
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						div0,
    						"click",
    						function () {
    							if (is_function(/*trigger*/ ctx[2] === "click"
    							? /*eventHandler*/ ctx[8]
    							: undefined)) (/*trigger*/ ctx[2] === "click"
    							? /*eventHandler*/ ctx[8]
    							: undefined).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div0,
    						"contextmenu",
    						prevent_default(function () {
    							if (is_function(/*trigger*/ ctx[2] === "context"
    							? /*onContextMenu*/ ctx[9]
    							: undefined)) (/*trigger*/ ctx[2] === "context"
    							? /*onContextMenu*/ ctx[9]
    							: undefined).apply(this, arguments);
    						}),
    						false,
    						true,
    						false
    					),
    					listen_dev(div2, "click", /*click_handler_1*/ ctx[17], false, false, false),
    					listen_dev(div3, "click", /*onClickOutside*/ ctx[10], false, false, false),
    					listen_dev(
    						div3,
    						"mouseenter",
    						function () {
    							if (is_function(/*trigger*/ ctx[2] === "hover"
    							? /*mouseenter_handler*/ ctx[18]
    							: undefined)) (/*trigger*/ ctx[2] === "hover"
    							? /*mouseenter_handler*/ ctx[18]
    							: undefined).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						div3,
    						"mouseleave",
    						function () {
    							if (is_function(/*trigger*/ ctx[2] === "hover"
    							? /*mouseleave_handler*/ ctx[19]
    							: undefined)) (/*trigger*/ ctx[2] === "hover"
    							? /*mouseleave_handler*/ ctx[19]
    							: undefined).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 16384) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], dirty, null, null);
    				}
    			}

    			if (dirty & /*items*/ 2) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*show, clientHeight, trigger, y, x*/ 124 && div2_style_value !== (div2_style_value = `height:${/*show*/ ctx[6] ? /*clientHeight*/ ctx[5] : 0}px; max-height: ${/*maxHeight*/ ctx[7]};${/*trigger*/ ctx[2] === "context"
			? `top:${/*y*/ ctx[4]}px;left:${/*x*/ ctx[3]}px;`
			: ""}`)) {
    				attr_dev(div2, "style", div2_style_value);
    			}

    			if (dirty & /*trigger*/ 4) {
    				toggle_class(div2, "responsive-ui-dropdown__contextmenu", /*trigger*/ ctx[2] === "contextmenu");
    			}

    			if (!current || dirty & /*className*/ 1 && div3_class_value !== (div3_class_value = "responsive-ui-dropdown " + /*className*/ ctx[0] + " svelte-bmpsuc")) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    			destroy_each(each_blocks, detaching);
    			div1_resize_listener();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const click_handler = () => {
    	
    };

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Dropdown", slots, ['default']);

    	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    		function adopt(value) {
    			return value instanceof P
    			? value
    			: new P(function (resolve) {
    						resolve(value);
    					});
    		}

    		return new (P || (P = Promise))(function (resolve, reject) {
    				function fulfilled(value) {
    					try {
    						step(generator.next(value));
    					} catch(e) {
    						reject(e);
    					}
    				}

    				function rejected(value) {
    					try {
    						step(generator["throw"](value));
    					} catch(e) {
    						reject(e);
    					}
    				}

    				function step(result) {
    					result.done
    					? resolve(result.value)
    					: adopt(result.value).then(fulfilled, rejected);
    				}

    				step((generator = generator.apply(thisArg, _arguments || [])).next());
    			});
    	};

    	
    	let { class: className = "" } = $$props;
    	let { items = [] } = $$props;
    	let { value = [] } = $$props;
    	let { disabled = false } = $$props;
    	let { trigger = "click" } = $$props;
    	let { maxDisplayItem = 5 } = $$props;
    	let x = 0;
    	let y = 0;

    	// ((inner padding + (font-size * line height)) * maxDisplayItem) + outer padding
    	const maxHeight = maxDisplayItem <= 0
    	? "100%"
    	: `${(10 + 14 * 1.5) * maxDisplayItem + 20}px`;

    	let input;
    	let show = false;
    	let clientHeight;
    	let menuList;

    	const eventHandler = () => {
    		$$invalidate(6, show = !show);
    	};

    	const onContextMenu = e => __awaiter(void 0, void 0, void 0, function* () {
    		if (show) {
    			$$invalidate(6, show = false);
    			yield new Promise(res => setTimeout(res, 100));
    		}

    		$$invalidate(3, x = e.clientX);
    		$$invalidate(4, y = e.clientY);
    		$$invalidate(6, show = true);
    	});

    	const onClickOutside = () => {
    		if (trigger === "context") {
    			$$invalidate(6, show = false);
    		}
    	};

    	const writable_props = ["class", "items", "value", "disabled", "trigger", "maxDisplayItem"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Dropdown> was created with unknown prop '${key}'`);
    	});

    	function div1_elementresize_handler() {
    		clientHeight = this.clientHeight;
    		$$invalidate(5, clientHeight);
    	}

    	const click_handler_1 = () => {
    		$$invalidate(6, show = !show);
    	};

    	const mouseenter_handler = () => {
    		$$invalidate(6, show = true);
    	};

    	const mouseleave_handler = () => {
    		$$invalidate(6, show = false);
    	};

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("value" in $$props) $$invalidate(11, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(12, disabled = $$props.disabled);
    		if ("trigger" in $$props) $$invalidate(2, trigger = $$props.trigger);
    		if ("maxDisplayItem" in $$props) $$invalidate(13, maxDisplayItem = $$props.maxDisplayItem);
    		if ("$$scope" in $$props) $$invalidate(14, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		__awaiter,
    		className,
    		items,
    		value,
    		disabled,
    		trigger,
    		maxDisplayItem,
    		x,
    		y,
    		maxHeight,
    		input,
    		show,
    		clientHeight,
    		menuList,
    		eventHandler,
    		onContextMenu,
    		onClickOutside
    	});

    	$$self.$inject_state = $$props => {
    		if ("__awaiter" in $$props) __awaiter = $$props.__awaiter;
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("items" in $$props) $$invalidate(1, items = $$props.items);
    		if ("value" in $$props) $$invalidate(11, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(12, disabled = $$props.disabled);
    		if ("trigger" in $$props) $$invalidate(2, trigger = $$props.trigger);
    		if ("maxDisplayItem" in $$props) $$invalidate(13, maxDisplayItem = $$props.maxDisplayItem);
    		if ("x" in $$props) $$invalidate(3, x = $$props.x);
    		if ("y" in $$props) $$invalidate(4, y = $$props.y);
    		if ("input" in $$props) input = $$props.input;
    		if ("show" in $$props) $$invalidate(6, show = $$props.show);
    		if ("clientHeight" in $$props) $$invalidate(5, clientHeight = $$props.clientHeight);
    		if ("menuList" in $$props) $$invalidate(22, menuList = $$props.menuList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*x, y, clientHeight*/ 56) {
    			 (() => {
    				if (!menuList) return;
    				const rect = menuList.getBoundingClientRect();
    				$$invalidate(3, x = Math.min(window.innerWidth - rect.width, x));
    				if (y > window.innerHeight - rect.height) $$invalidate(4, y -= clientHeight);
    			})();
    		}
    	};

    	return [
    		className,
    		items,
    		trigger,
    		x,
    		y,
    		clientHeight,
    		show,
    		maxHeight,
    		eventHandler,
    		onContextMenu,
    		onClickOutside,
    		value,
    		disabled,
    		maxDisplayItem,
    		$$scope,
    		slots,
    		div1_elementresize_handler,
    		click_handler_1,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class Dropdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			class: 0,
    			items: 1,
    			value: 11,
    			disabled: 12,
    			trigger: 2,
    			maxDisplayItem: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropdown",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get class() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get trigger() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trigger(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxDisplayItem() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxDisplayItem(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/label/src/Label.svelte generated by Svelte v3.32.0 */

    const file$e = "components/label/src/Label.svelte";

    function create_fragment$e(ctx) {
    	let label;
    	let t0;
    	let label_class_value;
    	let t1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			label = element("label");
    			t0 = text(/*title*/ ctx[2]);
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(label, "class", label_class_value = "responsive-ui-label " + /*className*/ ctx[1] + " svelte-x14kt3");
    			attr_dev(label, "for", /*forName*/ ctx[0]);
    			attr_dev(label, "form", /*form*/ ctx[3]);
    			attr_dev(label, "style", /*style*/ ctx[4]);
    			add_location(label, file$e, 9, 0, 193);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, t0);
    			insert_dev(target, t1, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 4) set_data_dev(t0, /*title*/ ctx[2]);

    			if (!current || dirty & /*className*/ 2 && label_class_value !== (label_class_value = "responsive-ui-label " + /*className*/ ctx[1] + " svelte-x14kt3")) {
    				attr_dev(label, "class", label_class_value);
    			}

    			if (!current || dirty & /*forName*/ 1) {
    				attr_dev(label, "for", /*forName*/ ctx[0]);
    			}

    			if (!current || dirty & /*form*/ 8) {
    				attr_dev(label, "form", /*form*/ ctx[3]);
    			}

    			if (!current || dirty & /*style*/ 16) {
    				attr_dev(label, "style", /*style*/ ctx[4]);
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (detaching) detach_dev(t1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Label", slots, ['default']);
    	let { for: forName = "" } = $$props;
    	let { class: className = "" } = $$props;
    	let { title = "" } = $$props;
    	let { form = "" } = $$props;
    	let { style = "" } = $$props;
    	const writable_props = ["for", "class", "title", "form", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Label> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("for" in $$props) $$invalidate(0, forName = $$props.for);
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    		if ("form" in $$props) $$invalidate(3, form = $$props.form);
    		if ("style" in $$props) $$invalidate(4, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ forName, className, title, form, style });

    	$$self.$inject_state = $$props => {
    		if ("forName" in $$props) $$invalidate(0, forName = $$props.forName);
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    		if ("form" in $$props) $$invalidate(3, form = $$props.form);
    		if ("style" in $$props) $$invalidate(4, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [forName, className, title, form, style, $$scope, slots];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			for: 0,
    			class: 1,
    			title: 2,
    			form: 3,
    			style: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get for() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set for(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get form() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set form(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/loader/src/Loader.svelte generated by Svelte v3.32.0 */
    const file$f = "components/loader/src/Loader.svelte";

    // (12:0) {:else}
    function create_else_block$5(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "responsive-ui-loader__spinner responsive-ui-loader__spinner--" + /*size*/ ctx[1] + " svelte-5dy7kh");
    			add_location(div, file$f, 12, 2, 321);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*size*/ 2 && div_class_value !== (div_class_value = "responsive-ui-loader__spinner responsive-ui-loader__spinner--" + /*size*/ ctx[1] + " svelte-5dy7kh")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(12:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if fit === "viewport"}
    function create_if_block$9(ctx) {
    	let div1;
    	let div0;
    	let div0_class_value;
    	let div1_intro;
    	let div1_outro;
    	let current;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", div0_class_value = "responsive-ui-loader__spinner responsive-ui-loader__spinner--" + /*size*/ ctx[1] + " svelte-5dy7kh");
    			add_location(div0, file$f, 7, 4, 208);
    			attr_dev(div1, "class", "responsive-ui-loader svelte-5dy7kh");
    			add_location(div1, file$f, 6, 2, 152);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*size*/ 2 && div0_class_value !== (div0_class_value = "responsive-ui-loader__spinner responsive-ui-loader__spinner--" + /*size*/ ctx[1] + " svelte-5dy7kh")) {
    				attr_dev(div0, "class", div0_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);
    				if (!div1_intro) div1_intro = create_in_transition(div1, fade, {});
    				div1_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fade, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching && div1_outro) div1_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(6:0) {#if fit === \\\"viewport\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$9, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*fit*/ ctx[0] === "viewport") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Loader", slots, []);
    	let { fit = "none" } = $$props;
    	let { size = "default" } = $$props;
    	const writable_props = ["fit", "size"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Loader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("fit" in $$props) $$invalidate(0, fit = $$props.fit);
    		if ("size" in $$props) $$invalidate(1, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({ fade, fit, size });

    	$$self.$inject_state = $$props => {
    		if ("fit" in $$props) $$invalidate(0, fit = $$props.fit);
    		if ("size" in $$props) $$invalidate(1, size = $$props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [fit, size];
    }

    class Loader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { fit: 0, size: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Loader",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get fit() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fit(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const identity$1 = x => x;

    function bounceOut(t) {
        const a = 4.0 / 11.0;
        const b = 8.0 / 11.0;
        const c = 9.0 / 10.0;
        const ca = 4356.0 / 361.0;
        const cb = 35442.0 / 1805.0;
        const cc = 16061.0 / 1805.0;
        const t2 = t * t;
        return t < a
            ? 7.5625 * t2
            : t < b
                ? 9.075 * t2 - 9.9 * t + 3.4
                : t < c
                    ? ca * t2 - cb * t + cc
                    : 10.8 * t * t - 20.52 * t + 10.72;
    }
    function bounceInOut(t) {
        return t < 0.5
            ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
            : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
    }

    var slideY = function (_, _a) {
        var _b = _a.duration, duration = _b === void 0 ? 200 : _b, _c = _a.direction, direction = _c === void 0 ? "up" : _c, _d = _a.easing, easing = _d === void 0 ? identity$1 : _d;
        return {
            duration: duration,
            easing: easing,
            css: function (t) {
                var ratio = 100 - t * 100;
                if (direction === "down")
                    ratio *= -1;
                return "transform: translateY(" + ratio + "%);";
            }
        };
    };
    var zoom = function (_, _a) {
        var _b = _a.duration, duration = _b === void 0 ? 200 : _b, _c = _a.easing, easing = _c === void 0 ? bounceInOut : _c;
        return {
            duration: duration,
            easing: easing,
            css: function (t) {
                return "transform: scale(" + t + "); opacity: " + t + ";";
            }
        };
    };

    /* components/snackbar/src/Snackbar.svelte generated by Svelte v3.32.0 */
    const file$g = "components/snackbar/src/Snackbar.svelte";

    // (18:0) {#if show}
    function create_if_block$a(ctx) {
    	let div;
    	let t;
    	let span;
    	let icon;
    	let div_class_value;
    	let div_intro;
    	let div_outro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	const default_slot_or_fallback = default_slot || fallback_block$2(ctx);

    	icon = new Icon({
    			props: { type: "x", stroke: "#fff" },
    			$$inline: true
    		});

    	icon.$on("click", /*onClose*/ ctx[5]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t = space();
    			span = element("span");
    			create_component(icon.$$.fragment);
    			attr_dev(span, "class", "responsive-ui-snackbar__close svelte-bidtz");
    			add_location(span, file$g, 25, 4, 678);
    			attr_dev(div, "class", div_class_value = "responsive-ui-snackbar responsive-ui-snackbar--" + /*variant*/ ctx[3] + " " + /*className*/ ctx[1] + " svelte-bidtz");
    			toggle_class(div, "responsive-ui-snackbar--rounded", /*rounded*/ ctx[4]);
    			add_location(div, file$g, 18, 2, 481);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(div, null);
    			}

    			append_dev(div, t);
    			append_dev(div, span);
    			mount_component(icon, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 64) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*text*/ 4) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (!current || dirty & /*variant, className*/ 10 && div_class_value !== (div_class_value = "responsive-ui-snackbar responsive-ui-snackbar--" + /*variant*/ ctx[3] + " " + /*className*/ ctx[1] + " svelte-bidtz")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*variant, className, rounded*/ 26) {
    				toggle_class(div, "responsive-ui-snackbar--rounded", /*rounded*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			transition_in(icon.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				if (!div_intro) div_intro = create_in_transition(div, slideY, {});
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			transition_out(icon.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fade, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			destroy_component(icon);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(18:0) {#if show}",
    		ctx
    	});

    	return block;
    }

    // (25:10) {text}
    function fallback_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*text*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*text*/ 4) set_data_dev(t, /*text*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(25:10) {text}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*show*/ ctx[0] && create_if_block$a(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*show*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Snackbar", slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { class: className = "" } = $$props;
    	let { text = "" } = $$props;
    	let { variant = "default" } = $$props;
    	let { rounded = true } = $$props;
    	let { show = true } = $$props;

    	const onClose = () => {
    		$$invalidate(0, show = false);
    		dispatch("close");
    	};

    	const writable_props = ["class", "text", "variant", "rounded", "show"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Snackbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("text" in $$props) $$invalidate(2, text = $$props.text);
    		if ("variant" in $$props) $$invalidate(3, variant = $$props.variant);
    		if ("rounded" in $$props) $$invalidate(4, rounded = $$props.rounded);
    		if ("show" in $$props) $$invalidate(0, show = $$props.show);
    		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		fade,
    		slideY,
    		Icon,
    		dispatch,
    		className,
    		text,
    		variant,
    		rounded,
    		show,
    		onClose
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("text" in $$props) $$invalidate(2, text = $$props.text);
    		if ("variant" in $$props) $$invalidate(3, variant = $$props.variant);
    		if ("rounded" in $$props) $$invalidate(4, rounded = $$props.rounded);
    		if ("show" in $$props) $$invalidate(0, show = $$props.show);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [show, className, text, variant, rounded, onClose, $$scope, slots];
    }

    class Snackbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			class: 1,
    			text: 2,
    			variant: 3,
    			rounded: 4,
    			show: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Snackbar",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get class() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rounded() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rounded(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get show() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const queue$2 = [];
    const show = (props) => {
        const { timeout = 3000 } = props;
        props = Object.assign({ rounded: true }, props);
        const component = new Snackbar({
            target: document.body,
            props,
            intro: true,
        });
        const pos = queue$2.length;
        const onClose = () => {
            setTimeout(async () => {
                const arr = queue$2.splice(pos, 1);
                if (arr.length > 0) {
                    arr[0].$set({ show: false });
                    await tick();
                    setTimeout(() => {
                        arr[0].$destroy();
                    }, 50);
                }
            }, timeout);
        };
        if (timeout > 0) {
            onClose();
        }
        queue$2.push(component);
        return {
            close() {
                onClose();
            },
        };
    };

    var Snackbar$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': Snackbar,
        show: show
    });

    /* components/row/src/Row.svelte generated by Svelte v3.32.0 */

    const file$h = "components/row/src/Row.svelte";

    function create_fragment$h(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "responsive-ui-row " + /*className*/ ctx[0] + " svelte-oef0g1");
    			attr_dev(div, "style", /*cssStyle*/ ctx[1]);
    			add_location(div, file$h, 16, 0, 430);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 64) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = "responsive-ui-row " + /*className*/ ctx[0] + " svelte-oef0g1")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*cssStyle*/ 2) {
    				attr_dev(div, "style", /*cssStyle*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Row", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { direction = "" } = $$props;
    	let { alignItems = "" } = $$props;
    	let { justifyContent = "" } = $$props;
    	let { style = "" } = $$props;
    	let cssStyle = "";
    	if (direction) cssStyle += `flex-direction:${direction}`;
    	if (alignItems) cssStyle += `align-items:${alignItems}`;
    	if (justifyContent) cssStyle += `justify-content:${justifyContent}`;
    	cssStyle += `;${style}`;
    	const writable_props = ["class", "direction", "alignItems", "justifyContent", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("direction" in $$props) $$invalidate(2, direction = $$props.direction);
    		if ("alignItems" in $$props) $$invalidate(3, alignItems = $$props.alignItems);
    		if ("justifyContent" in $$props) $$invalidate(4, justifyContent = $$props.justifyContent);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		direction,
    		alignItems,
    		justifyContent,
    		style,
    		cssStyle
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("direction" in $$props) $$invalidate(2, direction = $$props.direction);
    		if ("alignItems" in $$props) $$invalidate(3, alignItems = $$props.alignItems);
    		if ("justifyContent" in $$props) $$invalidate(4, justifyContent = $$props.justifyContent);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    		if ("cssStyle" in $$props) $$invalidate(1, cssStyle = $$props.cssStyle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		className,
    		cssStyle,
    		direction,
    		alignItems,
    		justifyContent,
    		style,
    		$$scope,
    		slots
    	];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			class: 0,
    			direction: 2,
    			alignItems: 3,
    			justifyContent: 4,
    			style: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get class() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alignItems() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alignItems(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get justifyContent() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set justifyContent(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var colorName = {
    	"aliceblue": [240, 248, 255],
    	"antiquewhite": [250, 235, 215],
    	"aqua": [0, 255, 255],
    	"aquamarine": [127, 255, 212],
    	"azure": [240, 255, 255],
    	"beige": [245, 245, 220],
    	"bisque": [255, 228, 196],
    	"black": [0, 0, 0],
    	"blanchedalmond": [255, 235, 205],
    	"blue": [0, 0, 255],
    	"blueviolet": [138, 43, 226],
    	"brown": [165, 42, 42],
    	"burlywood": [222, 184, 135],
    	"cadetblue": [95, 158, 160],
    	"chartreuse": [127, 255, 0],
    	"chocolate": [210, 105, 30],
    	"coral": [255, 127, 80],
    	"cornflowerblue": [100, 149, 237],
    	"cornsilk": [255, 248, 220],
    	"crimson": [220, 20, 60],
    	"cyan": [0, 255, 255],
    	"darkblue": [0, 0, 139],
    	"darkcyan": [0, 139, 139],
    	"darkgoldenrod": [184, 134, 11],
    	"darkgray": [169, 169, 169],
    	"darkgreen": [0, 100, 0],
    	"darkgrey": [169, 169, 169],
    	"darkkhaki": [189, 183, 107],
    	"darkmagenta": [139, 0, 139],
    	"darkolivegreen": [85, 107, 47],
    	"darkorange": [255, 140, 0],
    	"darkorchid": [153, 50, 204],
    	"darkred": [139, 0, 0],
    	"darksalmon": [233, 150, 122],
    	"darkseagreen": [143, 188, 143],
    	"darkslateblue": [72, 61, 139],
    	"darkslategray": [47, 79, 79],
    	"darkslategrey": [47, 79, 79],
    	"darkturquoise": [0, 206, 209],
    	"darkviolet": [148, 0, 211],
    	"deeppink": [255, 20, 147],
    	"deepskyblue": [0, 191, 255],
    	"dimgray": [105, 105, 105],
    	"dimgrey": [105, 105, 105],
    	"dodgerblue": [30, 144, 255],
    	"firebrick": [178, 34, 34],
    	"floralwhite": [255, 250, 240],
    	"forestgreen": [34, 139, 34],
    	"fuchsia": [255, 0, 255],
    	"gainsboro": [220, 220, 220],
    	"ghostwhite": [248, 248, 255],
    	"gold": [255, 215, 0],
    	"goldenrod": [218, 165, 32],
    	"gray": [128, 128, 128],
    	"green": [0, 128, 0],
    	"greenyellow": [173, 255, 47],
    	"grey": [128, 128, 128],
    	"honeydew": [240, 255, 240],
    	"hotpink": [255, 105, 180],
    	"indianred": [205, 92, 92],
    	"indigo": [75, 0, 130],
    	"ivory": [255, 255, 240],
    	"khaki": [240, 230, 140],
    	"lavender": [230, 230, 250],
    	"lavenderblush": [255, 240, 245],
    	"lawngreen": [124, 252, 0],
    	"lemonchiffon": [255, 250, 205],
    	"lightblue": [173, 216, 230],
    	"lightcoral": [240, 128, 128],
    	"lightcyan": [224, 255, 255],
    	"lightgoldenrodyellow": [250, 250, 210],
    	"lightgray": [211, 211, 211],
    	"lightgreen": [144, 238, 144],
    	"lightgrey": [211, 211, 211],
    	"lightpink": [255, 182, 193],
    	"lightsalmon": [255, 160, 122],
    	"lightseagreen": [32, 178, 170],
    	"lightskyblue": [135, 206, 250],
    	"lightslategray": [119, 136, 153],
    	"lightslategrey": [119, 136, 153],
    	"lightsteelblue": [176, 196, 222],
    	"lightyellow": [255, 255, 224],
    	"lime": [0, 255, 0],
    	"limegreen": [50, 205, 50],
    	"linen": [250, 240, 230],
    	"magenta": [255, 0, 255],
    	"maroon": [128, 0, 0],
    	"mediumaquamarine": [102, 205, 170],
    	"mediumblue": [0, 0, 205],
    	"mediumorchid": [186, 85, 211],
    	"mediumpurple": [147, 112, 219],
    	"mediumseagreen": [60, 179, 113],
    	"mediumslateblue": [123, 104, 238],
    	"mediumspringgreen": [0, 250, 154],
    	"mediumturquoise": [72, 209, 204],
    	"mediumvioletred": [199, 21, 133],
    	"midnightblue": [25, 25, 112],
    	"mintcream": [245, 255, 250],
    	"mistyrose": [255, 228, 225],
    	"moccasin": [255, 228, 181],
    	"navajowhite": [255, 222, 173],
    	"navy": [0, 0, 128],
    	"oldlace": [253, 245, 230],
    	"olive": [128, 128, 0],
    	"olivedrab": [107, 142, 35],
    	"orange": [255, 165, 0],
    	"orangered": [255, 69, 0],
    	"orchid": [218, 112, 214],
    	"palegoldenrod": [238, 232, 170],
    	"palegreen": [152, 251, 152],
    	"paleturquoise": [175, 238, 238],
    	"palevioletred": [219, 112, 147],
    	"papayawhip": [255, 239, 213],
    	"peachpuff": [255, 218, 185],
    	"peru": [205, 133, 63],
    	"pink": [255, 192, 203],
    	"plum": [221, 160, 221],
    	"powderblue": [176, 224, 230],
    	"purple": [128, 0, 128],
    	"rebeccapurple": [102, 51, 153],
    	"red": [255, 0, 0],
    	"rosybrown": [188, 143, 143],
    	"royalblue": [65, 105, 225],
    	"saddlebrown": [139, 69, 19],
    	"salmon": [250, 128, 114],
    	"sandybrown": [244, 164, 96],
    	"seagreen": [46, 139, 87],
    	"seashell": [255, 245, 238],
    	"sienna": [160, 82, 45],
    	"silver": [192, 192, 192],
    	"skyblue": [135, 206, 235],
    	"slateblue": [106, 90, 205],
    	"slategray": [112, 128, 144],
    	"slategrey": [112, 128, 144],
    	"snow": [255, 250, 250],
    	"springgreen": [0, 255, 127],
    	"steelblue": [70, 130, 180],
    	"tan": [210, 180, 140],
    	"teal": [0, 128, 128],
    	"thistle": [216, 191, 216],
    	"tomato": [255, 99, 71],
    	"turquoise": [64, 224, 208],
    	"violet": [238, 130, 238],
    	"wheat": [245, 222, 179],
    	"white": [255, 255, 255],
    	"whitesmoke": [245, 245, 245],
    	"yellow": [255, 255, 0],
    	"yellowgreen": [154, 205, 50]
    };

    /* MIT license */

    /* eslint-disable no-mixed-operators */


    // NOTE: conversions should only return primitive values (i.e. arrays, or
    //       values that give correct `typeof` results).
    //       do not use box values types (i.e. Number(), String(), etc.)

    const reverseKeywords = {};
    for (const key of Object.keys(colorName)) {
    	reverseKeywords[colorName[key]] = key;
    }

    const convert = {
    	rgb: {channels: 3, labels: 'rgb'},
    	hsl: {channels: 3, labels: 'hsl'},
    	hsv: {channels: 3, labels: 'hsv'},
    	hwb: {channels: 3, labels: 'hwb'},
    	cmyk: {channels: 4, labels: 'cmyk'},
    	xyz: {channels: 3, labels: 'xyz'},
    	lab: {channels: 3, labels: 'lab'},
    	lch: {channels: 3, labels: 'lch'},
    	hex: {channels: 1, labels: ['hex']},
    	keyword: {channels: 1, labels: ['keyword']},
    	ansi16: {channels: 1, labels: ['ansi16']},
    	ansi256: {channels: 1, labels: ['ansi256']},
    	hcg: {channels: 3, labels: ['h', 'c', 'g']},
    	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
    	gray: {channels: 1, labels: ['gray']}
    };

    var conversions = convert;

    // Hide .channels and .labels properties
    for (const model of Object.keys(convert)) {
    	if (!('channels' in convert[model])) {
    		throw new Error('missing channels property: ' + model);
    	}

    	if (!('labels' in convert[model])) {
    		throw new Error('missing channel labels property: ' + model);
    	}

    	if (convert[model].labels.length !== convert[model].channels) {
    		throw new Error('channel and label counts mismatch: ' + model);
    	}

    	const {channels, labels} = convert[model];
    	delete convert[model].channels;
    	delete convert[model].labels;
    	Object.defineProperty(convert[model], 'channels', {value: channels});
    	Object.defineProperty(convert[model], 'labels', {value: labels});
    }

    convert.rgb.hsl = function (rgb) {
    	const r = rgb[0] / 255;
    	const g = rgb[1] / 255;
    	const b = rgb[2] / 255;
    	const min = Math.min(r, g, b);
    	const max = Math.max(r, g, b);
    	const delta = max - min;
    	let h;
    	let s;

    	if (max === min) {
    		h = 0;
    	} else if (r === max) {
    		h = (g - b) / delta;
    	} else if (g === max) {
    		h = 2 + (b - r) / delta;
    	} else if (b === max) {
    		h = 4 + (r - g) / delta;
    	}

    	h = Math.min(h * 60, 360);

    	if (h < 0) {
    		h += 360;
    	}

    	const l = (min + max) / 2;

    	if (max === min) {
    		s = 0;
    	} else if (l <= 0.5) {
    		s = delta / (max + min);
    	} else {
    		s = delta / (2 - max - min);
    	}

    	return [h, s * 100, l * 100];
    };

    convert.rgb.hsv = function (rgb) {
    	let rdif;
    	let gdif;
    	let bdif;
    	let h;
    	let s;

    	const r = rgb[0] / 255;
    	const g = rgb[1] / 255;
    	const b = rgb[2] / 255;
    	const v = Math.max(r, g, b);
    	const diff = v - Math.min(r, g, b);
    	const diffc = function (c) {
    		return (v - c) / 6 / diff + 1 / 2;
    	};

    	if (diff === 0) {
    		h = 0;
    		s = 0;
    	} else {
    		s = diff / v;
    		rdif = diffc(r);
    		gdif = diffc(g);
    		bdif = diffc(b);

    		if (r === v) {
    			h = bdif - gdif;
    		} else if (g === v) {
    			h = (1 / 3) + rdif - bdif;
    		} else if (b === v) {
    			h = (2 / 3) + gdif - rdif;
    		}

    		if (h < 0) {
    			h += 1;
    		} else if (h > 1) {
    			h -= 1;
    		}
    	}

    	return [
    		h * 360,
    		s * 100,
    		v * 100
    	];
    };

    convert.rgb.hwb = function (rgb) {
    	const r = rgb[0];
    	const g = rgb[1];
    	let b = rgb[2];
    	const h = convert.rgb.hsl(rgb)[0];
    	const w = 1 / 255 * Math.min(r, Math.min(g, b));

    	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

    	return [h, w * 100, b * 100];
    };

    convert.rgb.cmyk = function (rgb) {
    	const r = rgb[0] / 255;
    	const g = rgb[1] / 255;
    	const b = rgb[2] / 255;

    	const k = Math.min(1 - r, 1 - g, 1 - b);
    	const c = (1 - r - k) / (1 - k) || 0;
    	const m = (1 - g - k) / (1 - k) || 0;
    	const y = (1 - b - k) / (1 - k) || 0;

    	return [c * 100, m * 100, y * 100, k * 100];
    };

    function comparativeDistance(x, y) {
    	/*
    		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
    	*/
    	return (
    		((x[0] - y[0]) ** 2) +
    		((x[1] - y[1]) ** 2) +
    		((x[2] - y[2]) ** 2)
    	);
    }

    convert.rgb.keyword = function (rgb) {
    	const reversed = reverseKeywords[rgb];
    	if (reversed) {
    		return reversed;
    	}

    	let currentClosestDistance = Infinity;
    	let currentClosestKeyword;

    	for (const keyword of Object.keys(colorName)) {
    		const value = colorName[keyword];

    		// Compute comparative distance
    		const distance = comparativeDistance(rgb, value);

    		// Check if its less, if so set as closest
    		if (distance < currentClosestDistance) {
    			currentClosestDistance = distance;
    			currentClosestKeyword = keyword;
    		}
    	}

    	return currentClosestKeyword;
    };

    convert.keyword.rgb = function (keyword) {
    	return colorName[keyword];
    };

    convert.rgb.xyz = function (rgb) {
    	let r = rgb[0] / 255;
    	let g = rgb[1] / 255;
    	let b = rgb[2] / 255;

    	// Assume sRGB
    	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
    	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
    	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

    	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
    	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

    	return [x * 100, y * 100, z * 100];
    };

    convert.rgb.lab = function (rgb) {
    	const xyz = convert.rgb.xyz(rgb);
    	let x = xyz[0];
    	let y = xyz[1];
    	let z = xyz[2];

    	x /= 95.047;
    	y /= 100;
    	z /= 108.883;

    	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
    	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
    	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

    	const l = (116 * y) - 16;
    	const a = 500 * (x - y);
    	const b = 200 * (y - z);

    	return [l, a, b];
    };

    convert.hsl.rgb = function (hsl) {
    	const h = hsl[0] / 360;
    	const s = hsl[1] / 100;
    	const l = hsl[2] / 100;
    	let t2;
    	let t3;
    	let val;

    	if (s === 0) {
    		val = l * 255;
    		return [val, val, val];
    	}

    	if (l < 0.5) {
    		t2 = l * (1 + s);
    	} else {
    		t2 = l + s - l * s;
    	}

    	const t1 = 2 * l - t2;

    	const rgb = [0, 0, 0];
    	for (let i = 0; i < 3; i++) {
    		t3 = h + 1 / 3 * -(i - 1);
    		if (t3 < 0) {
    			t3++;
    		}

    		if (t3 > 1) {
    			t3--;
    		}

    		if (6 * t3 < 1) {
    			val = t1 + (t2 - t1) * 6 * t3;
    		} else if (2 * t3 < 1) {
    			val = t2;
    		} else if (3 * t3 < 2) {
    			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    		} else {
    			val = t1;
    		}

    		rgb[i] = val * 255;
    	}

    	return rgb;
    };

    convert.hsl.hsv = function (hsl) {
    	const h = hsl[0];
    	let s = hsl[1] / 100;
    	let l = hsl[2] / 100;
    	let smin = s;
    	const lmin = Math.max(l, 0.01);

    	l *= 2;
    	s *= (l <= 1) ? l : 2 - l;
    	smin *= lmin <= 1 ? lmin : 2 - lmin;
    	const v = (l + s) / 2;
    	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

    	return [h, sv * 100, v * 100];
    };

    convert.hsv.rgb = function (hsv) {
    	const h = hsv[0] / 60;
    	const s = hsv[1] / 100;
    	let v = hsv[2] / 100;
    	const hi = Math.floor(h) % 6;

    	const f = h - Math.floor(h);
    	const p = 255 * v * (1 - s);
    	const q = 255 * v * (1 - (s * f));
    	const t = 255 * v * (1 - (s * (1 - f)));
    	v *= 255;

    	switch (hi) {
    		case 0:
    			return [v, t, p];
    		case 1:
    			return [q, v, p];
    		case 2:
    			return [p, v, t];
    		case 3:
    			return [p, q, v];
    		case 4:
    			return [t, p, v];
    		case 5:
    			return [v, p, q];
    	}
    };

    convert.hsv.hsl = function (hsv) {
    	const h = hsv[0];
    	const s = hsv[1] / 100;
    	const v = hsv[2] / 100;
    	const vmin = Math.max(v, 0.01);
    	let sl;
    	let l;

    	l = (2 - s) * v;
    	const lmin = (2 - s) * vmin;
    	sl = s * vmin;
    	sl /= (lmin <= 1) ? lmin : 2 - lmin;
    	sl = sl || 0;
    	l /= 2;

    	return [h, sl * 100, l * 100];
    };

    // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
    convert.hwb.rgb = function (hwb) {
    	const h = hwb[0] / 360;
    	let wh = hwb[1] / 100;
    	let bl = hwb[2] / 100;
    	const ratio = wh + bl;
    	let f;

    	// Wh + bl cant be > 1
    	if (ratio > 1) {
    		wh /= ratio;
    		bl /= ratio;
    	}

    	const i = Math.floor(6 * h);
    	const v = 1 - bl;
    	f = 6 * h - i;

    	if ((i & 0x01) !== 0) {
    		f = 1 - f;
    	}

    	const n = wh + f * (v - wh); // Linear interpolation

    	let r;
    	let g;
    	let b;
    	/* eslint-disable max-statements-per-line,no-multi-spaces */
    	switch (i) {
    		default:
    		case 6:
    		case 0: r = v;  g = n;  b = wh; break;
    		case 1: r = n;  g = v;  b = wh; break;
    		case 2: r = wh; g = v;  b = n; break;
    		case 3: r = wh; g = n;  b = v; break;
    		case 4: r = n;  g = wh; b = v; break;
    		case 5: r = v;  g = wh; b = n; break;
    	}
    	/* eslint-enable max-statements-per-line,no-multi-spaces */

    	return [r * 255, g * 255, b * 255];
    };

    convert.cmyk.rgb = function (cmyk) {
    	const c = cmyk[0] / 100;
    	const m = cmyk[1] / 100;
    	const y = cmyk[2] / 100;
    	const k = cmyk[3] / 100;

    	const r = 1 - Math.min(1, c * (1 - k) + k);
    	const g = 1 - Math.min(1, m * (1 - k) + k);
    	const b = 1 - Math.min(1, y * (1 - k) + k);

    	return [r * 255, g * 255, b * 255];
    };

    convert.xyz.rgb = function (xyz) {
    	const x = xyz[0] / 100;
    	const y = xyz[1] / 100;
    	const z = xyz[2] / 100;
    	let r;
    	let g;
    	let b;

    	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
    	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
    	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

    	// Assume sRGB
    	r = r > 0.0031308
    		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
    		: r * 12.92;

    	g = g > 0.0031308
    		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
    		: g * 12.92;

    	b = b > 0.0031308
    		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
    		: b * 12.92;

    	r = Math.min(Math.max(0, r), 1);
    	g = Math.min(Math.max(0, g), 1);
    	b = Math.min(Math.max(0, b), 1);

    	return [r * 255, g * 255, b * 255];
    };

    convert.xyz.lab = function (xyz) {
    	let x = xyz[0];
    	let y = xyz[1];
    	let z = xyz[2];

    	x /= 95.047;
    	y /= 100;
    	z /= 108.883;

    	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
    	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
    	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

    	const l = (116 * y) - 16;
    	const a = 500 * (x - y);
    	const b = 200 * (y - z);

    	return [l, a, b];
    };

    convert.lab.xyz = function (lab) {
    	const l = lab[0];
    	const a = lab[1];
    	const b = lab[2];
    	let x;
    	let y;
    	let z;

    	y = (l + 16) / 116;
    	x = a / 500 + y;
    	z = y - b / 200;

    	const y2 = y ** 3;
    	const x2 = x ** 3;
    	const z2 = z ** 3;
    	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

    	x *= 95.047;
    	y *= 100;
    	z *= 108.883;

    	return [x, y, z];
    };

    convert.lab.lch = function (lab) {
    	const l = lab[0];
    	const a = lab[1];
    	const b = lab[2];
    	let h;

    	const hr = Math.atan2(b, a);
    	h = hr * 360 / 2 / Math.PI;

    	if (h < 0) {
    		h += 360;
    	}

    	const c = Math.sqrt(a * a + b * b);

    	return [l, c, h];
    };

    convert.lch.lab = function (lch) {
    	const l = lch[0];
    	const c = lch[1];
    	const h = lch[2];

    	const hr = h / 360 * 2 * Math.PI;
    	const a = c * Math.cos(hr);
    	const b = c * Math.sin(hr);

    	return [l, a, b];
    };

    convert.rgb.ansi16 = function (args, saturation = null) {
    	const [r, g, b] = args;
    	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

    	value = Math.round(value / 50);

    	if (value === 0) {
    		return 30;
    	}

    	let ansi = 30
    		+ ((Math.round(b / 255) << 2)
    		| (Math.round(g / 255) << 1)
    		| Math.round(r / 255));

    	if (value === 2) {
    		ansi += 60;
    	}

    	return ansi;
    };

    convert.hsv.ansi16 = function (args) {
    	// Optimization here; we already know the value and don't need to get
    	// it converted for us.
    	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };

    convert.rgb.ansi256 = function (args) {
    	const r = args[0];
    	const g = args[1];
    	const b = args[2];

    	// We use the extended greyscale palette here, with the exception of
    	// black and white. normal palette only has 4 greyscale shades.
    	if (r === g && g === b) {
    		if (r < 8) {
    			return 16;
    		}

    		if (r > 248) {
    			return 231;
    		}

    		return Math.round(((r - 8) / 247) * 24) + 232;
    	}

    	const ansi = 16
    		+ (36 * Math.round(r / 255 * 5))
    		+ (6 * Math.round(g / 255 * 5))
    		+ Math.round(b / 255 * 5);

    	return ansi;
    };

    convert.ansi16.rgb = function (args) {
    	let color = args % 10;

    	// Handle greyscale
    	if (color === 0 || color === 7) {
    		if (args > 50) {
    			color += 3.5;
    		}

    		color = color / 10.5 * 255;

    		return [color, color, color];
    	}

    	const mult = (~~(args > 50) + 1) * 0.5;
    	const r = ((color & 1) * mult) * 255;
    	const g = (((color >> 1) & 1) * mult) * 255;
    	const b = (((color >> 2) & 1) * mult) * 255;

    	return [r, g, b];
    };

    convert.ansi256.rgb = function (args) {
    	// Handle greyscale
    	if (args >= 232) {
    		const c = (args - 232) * 10 + 8;
    		return [c, c, c];
    	}

    	args -= 16;

    	let rem;
    	const r = Math.floor(args / 36) / 5 * 255;
    	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    	const b = (rem % 6) / 5 * 255;

    	return [r, g, b];
    };

    convert.rgb.hex = function (args) {
    	const integer = ((Math.round(args[0]) & 0xFF) << 16)
    		+ ((Math.round(args[1]) & 0xFF) << 8)
    		+ (Math.round(args[2]) & 0xFF);

    	const string = integer.toString(16).toUpperCase();
    	return '000000'.substring(string.length) + string;
    };

    convert.hex.rgb = function (args) {
    	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    	if (!match) {
    		return [0, 0, 0];
    	}

    	let colorString = match[0];

    	if (match[0].length === 3) {
    		colorString = colorString.split('').map(char => {
    			return char + char;
    		}).join('');
    	}

    	const integer = parseInt(colorString, 16);
    	const r = (integer >> 16) & 0xFF;
    	const g = (integer >> 8) & 0xFF;
    	const b = integer & 0xFF;

    	return [r, g, b];
    };

    convert.rgb.hcg = function (rgb) {
    	const r = rgb[0] / 255;
    	const g = rgb[1] / 255;
    	const b = rgb[2] / 255;
    	const max = Math.max(Math.max(r, g), b);
    	const min = Math.min(Math.min(r, g), b);
    	const chroma = (max - min);
    	let grayscale;
    	let hue;

    	if (chroma < 1) {
    		grayscale = min / (1 - chroma);
    	} else {
    		grayscale = 0;
    	}

    	if (chroma <= 0) {
    		hue = 0;
    	} else
    	if (max === r) {
    		hue = ((g - b) / chroma) % 6;
    	} else
    	if (max === g) {
    		hue = 2 + (b - r) / chroma;
    	} else {
    		hue = 4 + (r - g) / chroma;
    	}

    	hue /= 6;
    	hue %= 1;

    	return [hue * 360, chroma * 100, grayscale * 100];
    };

    convert.hsl.hcg = function (hsl) {
    	const s = hsl[1] / 100;
    	const l = hsl[2] / 100;

    	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

    	let f = 0;
    	if (c < 1.0) {
    		f = (l - 0.5 * c) / (1.0 - c);
    	}

    	return [hsl[0], c * 100, f * 100];
    };

    convert.hsv.hcg = function (hsv) {
    	const s = hsv[1] / 100;
    	const v = hsv[2] / 100;

    	const c = s * v;
    	let f = 0;

    	if (c < 1.0) {
    		f = (v - c) / (1 - c);
    	}

    	return [hsv[0], c * 100, f * 100];
    };

    convert.hcg.rgb = function (hcg) {
    	const h = hcg[0] / 360;
    	const c = hcg[1] / 100;
    	const g = hcg[2] / 100;

    	if (c === 0.0) {
    		return [g * 255, g * 255, g * 255];
    	}

    	const pure = [0, 0, 0];
    	const hi = (h % 1) * 6;
    	const v = hi % 1;
    	const w = 1 - v;
    	let mg = 0;

    	/* eslint-disable max-statements-per-line */
    	switch (Math.floor(hi)) {
    		case 0:
    			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
    		case 1:
    			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
    		case 2:
    			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
    		case 3:
    			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
    		case 4:
    			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
    		default:
    			pure[0] = 1; pure[1] = 0; pure[2] = w;
    	}
    	/* eslint-enable max-statements-per-line */

    	mg = (1.0 - c) * g;

    	return [
    		(c * pure[0] + mg) * 255,
    		(c * pure[1] + mg) * 255,
    		(c * pure[2] + mg) * 255
    	];
    };

    convert.hcg.hsv = function (hcg) {
    	const c = hcg[1] / 100;
    	const g = hcg[2] / 100;

    	const v = c + g * (1.0 - c);
    	let f = 0;

    	if (v > 0.0) {
    		f = c / v;
    	}

    	return [hcg[0], f * 100, v * 100];
    };

    convert.hcg.hsl = function (hcg) {
    	const c = hcg[1] / 100;
    	const g = hcg[2] / 100;

    	const l = g * (1.0 - c) + 0.5 * c;
    	let s = 0;

    	if (l > 0.0 && l < 0.5) {
    		s = c / (2 * l);
    	} else
    	if (l >= 0.5 && l < 1.0) {
    		s = c / (2 * (1 - l));
    	}

    	return [hcg[0], s * 100, l * 100];
    };

    convert.hcg.hwb = function (hcg) {
    	const c = hcg[1] / 100;
    	const g = hcg[2] / 100;
    	const v = c + g * (1.0 - c);
    	return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };

    convert.hwb.hcg = function (hwb) {
    	const w = hwb[1] / 100;
    	const b = hwb[2] / 100;
    	const v = 1 - b;
    	const c = v - w;
    	let g = 0;

    	if (c < 1) {
    		g = (v - c) / (1 - c);
    	}

    	return [hwb[0], c * 100, g * 100];
    };

    convert.apple.rgb = function (apple) {
    	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
    };

    convert.rgb.apple = function (rgb) {
    	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
    };

    convert.gray.rgb = function (args) {
    	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };

    convert.gray.hsl = function (args) {
    	return [0, 0, args[0]];
    };

    convert.gray.hsv = convert.gray.hsl;

    convert.gray.hwb = function (gray) {
    	return [0, 100, gray[0]];
    };

    convert.gray.cmyk = function (gray) {
    	return [0, 0, 0, gray[0]];
    };

    convert.gray.lab = function (gray) {
    	return [gray[0], 0, 0];
    };

    convert.gray.hex = function (gray) {
    	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
    	const integer = (val << 16) + (val << 8) + val;

    	const string = integer.toString(16).toUpperCase();
    	return '000000'.substring(string.length) + string;
    };

    convert.rgb.gray = function (rgb) {
    	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    	return [val / 255 * 100];
    };

    /*
    	This function routes a model to all other models.

    	all functions that are routed have a property `.conversion` attached
    	to the returned synthetic function. This property is an array
    	of strings, each with the steps in between the 'from' and 'to'
    	color models (inclusive).

    	conversions that are not possible simply are not included.
    */

    function buildGraph() {
    	const graph = {};
    	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
    	const models = Object.keys(conversions);

    	for (let len = models.length, i = 0; i < len; i++) {
    		graph[models[i]] = {
    			// http://jsperf.com/1-vs-infinity
    			// micro-opt, but this is simple.
    			distance: -1,
    			parent: null
    		};
    	}

    	return graph;
    }

    // https://en.wikipedia.org/wiki/Breadth-first_search
    function deriveBFS(fromModel) {
    	const graph = buildGraph();
    	const queue = [fromModel]; // Unshift -> queue -> pop

    	graph[fromModel].distance = 0;

    	while (queue.length) {
    		const current = queue.pop();
    		const adjacents = Object.keys(conversions[current]);

    		for (let len = adjacents.length, i = 0; i < len; i++) {
    			const adjacent = adjacents[i];
    			const node = graph[adjacent];

    			if (node.distance === -1) {
    				node.distance = graph[current].distance + 1;
    				node.parent = current;
    				queue.unshift(adjacent);
    			}
    		}
    	}

    	return graph;
    }

    function link(from, to) {
    	return function (args) {
    		return to(from(args));
    	};
    }

    function wrapConversion(toModel, graph) {
    	const path = [graph[toModel].parent, toModel];
    	let fn = conversions[graph[toModel].parent][toModel];

    	let cur = graph[toModel].parent;
    	while (graph[cur].parent) {
    		path.unshift(graph[cur].parent);
    		fn = link(conversions[graph[cur].parent][cur], fn);
    		cur = graph[cur].parent;
    	}

    	fn.conversion = path;
    	return fn;
    }

    var route = function (fromModel) {
    	const graph = deriveBFS(fromModel);
    	const conversion = {};

    	const models = Object.keys(graph);
    	for (let len = models.length, i = 0; i < len; i++) {
    		const toModel = models[i];
    		const node = graph[toModel];

    		if (node.parent === null) {
    			// No possible conversion, or this node is the source model.
    			continue;
    		}

    		conversion[toModel] = wrapConversion(toModel, graph);
    	}

    	return conversion;
    };

    const convert$1 = {};

    const models = Object.keys(conversions);

    function wrapRaw(fn) {
    	const wrappedFn = function (...args) {
    		const arg0 = args[0];
    		if (arg0 === undefined || arg0 === null) {
    			return arg0;
    		}

    		if (arg0.length > 1) {
    			args = arg0;
    		}

    		return fn(args);
    	};

    	// Preserve .conversion property if there is one
    	if ('conversion' in fn) {
    		wrappedFn.conversion = fn.conversion;
    	}

    	return wrappedFn;
    }

    function wrapRounded(fn) {
    	const wrappedFn = function (...args) {
    		const arg0 = args[0];

    		if (arg0 === undefined || arg0 === null) {
    			return arg0;
    		}

    		if (arg0.length > 1) {
    			args = arg0;
    		}

    		const result = fn(args);

    		// We're assuming the result is an array here.
    		// see notice in conversions.js; don't use box types
    		// in conversion functions.
    		if (typeof result === 'object') {
    			for (let len = result.length, i = 0; i < len; i++) {
    				result[i] = Math.round(result[i]);
    			}
    		}

    		return result;
    	};

    	// Preserve .conversion property if there is one
    	if ('conversion' in fn) {
    		wrappedFn.conversion = fn.conversion;
    	}

    	return wrappedFn;
    }

    models.forEach(fromModel => {
    	convert$1[fromModel] = {};

    	Object.defineProperty(convert$1[fromModel], 'channels', {value: conversions[fromModel].channels});
    	Object.defineProperty(convert$1[fromModel], 'labels', {value: conversions[fromModel].labels});

    	const routes = route(fromModel);
    	const routeModels = Object.keys(routes);

    	routeModels.forEach(toModel => {
    		const fn = routes[toModel];

    		convert$1[fromModel][toModel] = wrapRounded(fn);
    		convert$1[fromModel][toModel].raw = wrapRaw(fn);
    	});
    });

    var colorConvert = convert$1;

    var ansiStyles = createCommonjsModule(function (module) {

    const wrapAnsi16 = (fn, offset) => (...args) => {
    	const code = fn(...args);
    	return `\u001B[${code + offset}m`;
    };

    const wrapAnsi256 = (fn, offset) => (...args) => {
    	const code = fn(...args);
    	return `\u001B[${38 + offset};5;${code}m`;
    };

    const wrapAnsi16m = (fn, offset) => (...args) => {
    	const rgb = fn(...args);
    	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };

    const ansi2ansi = n => n;
    const rgb2rgb = (r, g, b) => [r, g, b];

    const setLazyProperty = (object, property, get) => {
    	Object.defineProperty(object, property, {
    		get: () => {
    			const value = get();

    			Object.defineProperty(object, property, {
    				value,
    				enumerable: true,
    				configurable: true
    			});

    			return value;
    		},
    		enumerable: true,
    		configurable: true
    	});
    };

    /** @type {typeof import('color-convert')} */
    let colorConvert$1;
    const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    	if (colorConvert$1 === undefined) {
    		colorConvert$1 = colorConvert;
    	}

    	const offset = isBackground ? 10 : 0;
    	const styles = {};

    	for (const [sourceSpace, suite] of Object.entries(colorConvert$1)) {
    		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
    		if (sourceSpace === targetSpace) {
    			styles[name] = wrap(identity, offset);
    		} else if (typeof suite === 'object') {
    			styles[name] = wrap(suite[targetSpace], offset);
    		}
    	}

    	return styles;
    };

    function assembleStyles() {
    	const codes = new Map();
    	const styles = {
    		modifier: {
    			reset: [0, 0],
    			// 21 isn't widely supported and 22 does the same thing
    			bold: [1, 22],
    			dim: [2, 22],
    			italic: [3, 23],
    			underline: [4, 24],
    			inverse: [7, 27],
    			hidden: [8, 28],
    			strikethrough: [9, 29]
    		},
    		color: {
    			black: [30, 39],
    			red: [31, 39],
    			green: [32, 39],
    			yellow: [33, 39],
    			blue: [34, 39],
    			magenta: [35, 39],
    			cyan: [36, 39],
    			white: [37, 39],

    			// Bright color
    			blackBright: [90, 39],
    			redBright: [91, 39],
    			greenBright: [92, 39],
    			yellowBright: [93, 39],
    			blueBright: [94, 39],
    			magentaBright: [95, 39],
    			cyanBright: [96, 39],
    			whiteBright: [97, 39]
    		},
    		bgColor: {
    			bgBlack: [40, 49],
    			bgRed: [41, 49],
    			bgGreen: [42, 49],
    			bgYellow: [43, 49],
    			bgBlue: [44, 49],
    			bgMagenta: [45, 49],
    			bgCyan: [46, 49],
    			bgWhite: [47, 49],

    			// Bright color
    			bgBlackBright: [100, 49],
    			bgRedBright: [101, 49],
    			bgGreenBright: [102, 49],
    			bgYellowBright: [103, 49],
    			bgBlueBright: [104, 49],
    			bgMagentaBright: [105, 49],
    			bgCyanBright: [106, 49],
    			bgWhiteBright: [107, 49]
    		}
    	};

    	// Alias bright black as gray (and grey)
    	styles.color.gray = styles.color.blackBright;
    	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    	styles.color.grey = styles.color.blackBright;
    	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

    	for (const [groupName, group] of Object.entries(styles)) {
    		for (const [styleName, style] of Object.entries(group)) {
    			styles[styleName] = {
    				open: `\u001B[${style[0]}m`,
    				close: `\u001B[${style[1]}m`
    			};

    			group[styleName] = styles[styleName];

    			codes.set(style[0], style[1]);
    		}

    		Object.defineProperty(styles, groupName, {
    			value: group,
    			enumerable: false
    		});
    	}

    	Object.defineProperty(styles, 'codes', {
    		value: codes,
    		enumerable: false
    	});

    	styles.color.close = '\u001B[39m';
    	styles.bgColor.close = '\u001B[49m';

    	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
    	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
    	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
    	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
    	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
    	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

    	return styles;
    }

    // Make the export immutable
    Object.defineProperty(module, 'exports', {
    	enumerable: true,
    	get: assembleStyles
    });
    });

    var browser = {
    	stdout: false,
    	stderr: false
    };

    const stringReplaceAll = (string, substring, replacer) => {
    	let index = string.indexOf(substring);
    	if (index === -1) {
    		return string;
    	}

    	const substringLength = substring.length;
    	let endIndex = 0;
    	let returnValue = '';
    	do {
    		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
    		endIndex = index + substringLength;
    		index = string.indexOf(substring, endIndex);
    	} while (index !== -1);

    	returnValue += string.substr(endIndex);
    	return returnValue;
    };

    const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
    	let endIndex = 0;
    	let returnValue = '';
    	do {
    		const gotCR = string[index - 1] === '\r';
    		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
    		endIndex = index + 1;
    		index = string.indexOf('\n', endIndex);
    	} while (index !== -1);

    	returnValue += string.substr(endIndex);
    	return returnValue;
    };

    var util = {
    	stringReplaceAll,
    	stringEncaseCRLFWithFirstIndex
    };

    const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

    const ESCAPES = new Map([
    	['n', '\n'],
    	['r', '\r'],
    	['t', '\t'],
    	['b', '\b'],
    	['f', '\f'],
    	['v', '\v'],
    	['0', '\0'],
    	['\\', '\\'],
    	['e', '\u001B'],
    	['a', '\u0007']
    ]);

    function unescape(c) {
    	const u = c[0] === 'u';
    	const bracket = c[1] === '{';

    	if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
    		return String.fromCharCode(parseInt(c.slice(1), 16));
    	}

    	if (u && bracket) {
    		return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
    	}

    	return ESCAPES.get(c) || c;
    }

    function parseArguments(name, arguments_) {
    	const results = [];
    	const chunks = arguments_.trim().split(/\s*,\s*/g);
    	let matches;

    	for (const chunk of chunks) {
    		const number = Number(chunk);
    		if (!Number.isNaN(number)) {
    			results.push(number);
    		} else if ((matches = chunk.match(STRING_REGEX))) {
    			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
    		} else {
    			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
    		}
    	}

    	return results;
    }

    function parseStyle(style) {
    	STYLE_REGEX.lastIndex = 0;

    	const results = [];
    	let matches;

    	while ((matches = STYLE_REGEX.exec(style)) !== null) {
    		const name = matches[1];

    		if (matches[2]) {
    			const args = parseArguments(name, matches[2]);
    			results.push([name].concat(args));
    		} else {
    			results.push([name]);
    		}
    	}

    	return results;
    }

    function buildStyle(chalk, styles) {
    	const enabled = {};

    	for (const layer of styles) {
    		for (const style of layer.styles) {
    			enabled[style[0]] = layer.inverse ? null : style.slice(1);
    		}
    	}

    	let current = chalk;
    	for (const [styleName, styles] of Object.entries(enabled)) {
    		if (!Array.isArray(styles)) {
    			continue;
    		}

    		if (!(styleName in current)) {
    			throw new Error(`Unknown Chalk style: ${styleName}`);
    		}

    		current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
    	}

    	return current;
    }

    var templates = (chalk, temporary) => {
    	const styles = [];
    	const chunks = [];
    	let chunk = [];

    	// eslint-disable-next-line max-params
    	temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
    		if (escapeCharacter) {
    			chunk.push(unescape(escapeCharacter));
    		} else if (style) {
    			const string = chunk.join('');
    			chunk = [];
    			chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
    			styles.push({inverse, styles: parseStyle(style)});
    		} else if (close) {
    			if (styles.length === 0) {
    				throw new Error('Found extraneous } in Chalk template literal');
    			}

    			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
    			chunk = [];
    			styles.pop();
    		} else {
    			chunk.push(character);
    		}
    	});

    	chunks.push(chunk.join(''));

    	if (styles.length > 0) {
    		const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
    		throw new Error(errMessage);
    	}

    	return chunks.join('');
    };

    const {stdout: stdoutColor, stderr: stderrColor} = browser;
    const {
    	stringReplaceAll: stringReplaceAll$1,
    	stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
    } = util;

    const {isArray} = Array;

    // `supportsColor.level` → `ansiStyles.color[name]` mapping
    const levelMapping = [
    	'ansi',
    	'ansi',
    	'ansi256',
    	'ansi16m'
    ];

    const styles = Object.create(null);

    const applyOptions = (object, options = {}) => {
    	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    		throw new Error('The `level` option should be an integer from 0 to 3');
    	}

    	// Detect level if not set manually
    	const colorLevel = stdoutColor ? stdoutColor.level : 0;
    	object.level = options.level === undefined ? colorLevel : options.level;
    };

    class ChalkClass {
    	constructor(options) {
    		// eslint-disable-next-line no-constructor-return
    		return chalkFactory(options);
    	}
    }

    const chalkFactory = options => {
    	const chalk = {};
    	applyOptions(chalk, options);

    	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

    	Object.setPrototypeOf(chalk, Chalk.prototype);
    	Object.setPrototypeOf(chalk.template, chalk);

    	chalk.template.constructor = () => {
    		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
    	};

    	chalk.template.Instance = ChalkClass;

    	return chalk.template;
    };

    function Chalk(options) {
    	return chalkFactory(options);
    }

    for (const [styleName, style] of Object.entries(ansiStyles)) {
    	styles[styleName] = {
    		get() {
    			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
    			Object.defineProperty(this, styleName, {value: builder});
    			return builder;
    		}
    	};
    }

    styles.visible = {
    	get() {
    		const builder = createBuilder(this, this._styler, true);
    		Object.defineProperty(this, 'visible', {value: builder});
    		return builder;
    	}
    };

    const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

    for (const model of usedModels) {
    	styles[model] = {
    		get() {
    			const {level} = this;
    			return function (...arguments_) {
    				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
    				return createBuilder(this, styler, this._isEmpty);
    			};
    		}
    	};
    }

    for (const model of usedModels) {
    	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
    	styles[bgModel] = {
    		get() {
    			const {level} = this;
    			return function (...arguments_) {
    				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
    				return createBuilder(this, styler, this._isEmpty);
    			};
    		}
    	};
    }

    const proto = Object.defineProperties(() => {}, {
    	...styles,
    	level: {
    		enumerable: true,
    		get() {
    			return this._generator.level;
    		},
    		set(level) {
    			this._generator.level = level;
    		}
    	}
    });

    const createStyler = (open, close, parent) => {
    	let openAll;
    	let closeAll;
    	if (parent === undefined) {
    		openAll = open;
    		closeAll = close;
    	} else {
    		openAll = parent.openAll + open;
    		closeAll = close + parent.closeAll;
    	}

    	return {
    		open,
    		close,
    		openAll,
    		closeAll,
    		parent
    	};
    };

    const createBuilder = (self, _styler, _isEmpty) => {
    	const builder = (...arguments_) => {
    		if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
    			// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
    			return applyStyle(builder, chalkTag(builder, ...arguments_));
    		}

    		// Single argument is hot path, implicit coercion is faster than anything
    		// eslint-disable-next-line no-implicit-coercion
    		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
    	};

    	// We alter the prototype because we must return a function, but there is
    	// no way to create a function with a different prototype
    	Object.setPrototypeOf(builder, proto);

    	builder._generator = self;
    	builder._styler = _styler;
    	builder._isEmpty = _isEmpty;

    	return builder;
    };

    const applyStyle = (self, string) => {
    	if (self.level <= 0 || !string) {
    		return self._isEmpty ? '' : string;
    	}

    	let styler = self._styler;

    	if (styler === undefined) {
    		return string;
    	}

    	const {openAll, closeAll} = styler;
    	if (string.indexOf('\u001B') !== -1) {
    		while (styler !== undefined) {
    			// Replace any instances already present with a re-opening code
    			// otherwise only the part of the string until said closing code
    			// will be colored, and the rest will simply be 'plain'.
    			string = stringReplaceAll$1(string, styler.close, styler.open);

    			styler = styler.parent;
    		}
    	}

    	// We can move both next actions out of loop, because remaining actions in loop won't have
    	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
    	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
    	const lfIndex = string.indexOf('\n');
    	if (lfIndex !== -1) {
    		string = stringEncaseCRLFWithFirstIndex$1(string, closeAll, openAll, lfIndex);
    	}

    	return openAll + string + closeAll;
    };

    let template;
    const chalkTag = (chalk, ...strings) => {
    	const [firstString] = strings;

    	if (!isArray(firstString) || !isArray(firstString.raw)) {
    		// If chalk() was called by itself or with a string,
    		// return the string itself as a string.
    		return strings.join(' ');
    	}

    	const arguments_ = strings.slice(1);
    	const parts = [firstString.raw[0]];

    	for (let i = 1; i < firstString.length; i++) {
    		parts.push(
    			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
    			String(firstString.raw[i])
    		);
    	}

    	if (template === undefined) {
    		template = templates;
    	}

    	return template(chalk, parts.join(''));
    };

    Object.defineProperties(Chalk.prototype, styles);

    const chalk = Chalk(); // eslint-disable-line new-cap
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
    chalk.stderr.supportsColor = stderrColor;

    var source = chalk;

    /* components/column/src/Column.svelte generated by Svelte v3.32.0 */

    const { Object: Object_1$1 } = globals;
    const file$i = "components/column/src/Column.svelte";

    function create_fragment$i(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(`responsive-ui-column--${/*justify*/ ctx[1]} ${/*cls*/ ctx[3]} ${/*className*/ ctx[0]}`) + " svelte-1y6hl32"));
    			attr_dev(div, "style", /*style*/ ctx[2]);
    			add_location(div, file$i, 15, 0, 374);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*justify, cls, className*/ 11 && div_class_value !== (div_class_value = "" + (null_to_empty(`responsive-ui-column--${/*justify*/ ctx[1]} ${/*cls*/ ctx[3]} ${/*className*/ ctx[0]}`) + " svelte-1y6hl32"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(div, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Column", slots, ['default']);
    	
    	let { class: className = "" } = $$props;
    	let { span = 24 } = $$props;
    	let { justify = "center" } = $$props;
    	let { style = "" } = $$props;
    	let cls = `responsive-ui-column--${span}`;

    	if (isNaN(Number(span))) {
    		cls = Object.entries(span).map(([k, v]) => `responsive-ui-column--${k}-${v}`).join(" ");
    	}

    	const writable_props = ["class", "span", "justify", "style"];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Column> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("span" in $$props) $$invalidate(4, span = $$props.span);
    		if ("justify" in $$props) $$invalidate(1, justify = $$props.justify);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		keyword: source.keyword,
    		className,
    		span,
    		justify,
    		style,
    		cls
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("span" in $$props) $$invalidate(4, span = $$props.span);
    		if ("justify" in $$props) $$invalidate(1, justify = $$props.justify);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("cls" in $$props) $$invalidate(3, cls = $$props.cls);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, justify, style, cls, span, $$scope, slots];
    }

    class Column extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { class: 0, span: 4, justify: 1, style: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Column",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get class() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get span() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set span(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get justify() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set justify(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Column>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Column>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/search/src/Search.svelte generated by Svelte v3.32.0 */
    const file$j = "components/search/src/Search.svelte";
    const get_default_slot_changes$1 = dirty => ({ state: dirty & /*state*/ 256 });
    const get_default_slot_context$1 = ctx => ({ state: /*state*/ ctx[8] });

    // (57:0) {#if state}
    function create_if_block$b(ctx) {
    	let div1;
    	let loader;
    	let t0;
    	let div0;
    	let current;
    	loader = new Loader({ props: { size: "small" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(loader.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "Searching...";
    			attr_dev(div0, "class", "responsive-ui-search__state-text svelte-8w8h5p");
    			add_location(div0, file$j, 59, 4, 1293);
    			attr_dev(div1, "class", "responsive-ui-search__state svelte-8w8h5p");
    			add_location(div1, file$j, 57, 2, 1219);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(loader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(loader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(57:0) {#if state}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let input;
    	let input_class_value;
    	let t0;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*state*/ ctx[8] && create_if_block$b(ctx);
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			input = element("input");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(input, "class", input_class_value = "responsive-ui-search " + /*className*/ ctx[2] + " svelte-8w8h5p");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "name", /*name*/ ctx[3]);
    			input.disabled = /*disabled*/ ctx[4];
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[7]);
    			attr_dev(input, "size", /*size*/ ctx[5]);
    			input.value = /*value*/ ctx[1];
    			attr_dev(input, "spellcheck", /*spellcheck*/ ctx[6]);
    			add_location(input, file$j, 41, 0, 984);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			/*input_binding*/ ctx[15](input);
    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_handler*/ ctx[14], false, false, false),
    					listen_dev(input, "input", /*handleClear*/ ctx[9], false, false, false),
    					listen_dev(input, "keyup", /*handleKeyup*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*className*/ 4 && input_class_value !== (input_class_value = "responsive-ui-search " + /*className*/ ctx[2] + " svelte-8w8h5p")) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (!current || dirty & /*name*/ 8) {
    				attr_dev(input, "name", /*name*/ ctx[3]);
    			}

    			if (!current || dirty & /*disabled*/ 16) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[4]);
    			}

    			if (!current || dirty & /*placeholder*/ 128) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[7]);
    			}

    			if (!current || dirty & /*size*/ 32) {
    				attr_dev(input, "size", /*size*/ ctx[5]);
    			}

    			if (!current || dirty & /*value*/ 2) {
    				prop_dev(input, "value", /*value*/ ctx[1]);
    			}

    			if (!current || dirty & /*spellcheck*/ 64) {
    				attr_dev(input, "spellcheck", /*spellcheck*/ ctx[6]);
    			}

    			if (/*state*/ ctx[8]) {
    				if (if_block) {
    					if (dirty & /*state*/ 256) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, state*/ 4352) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[12], dirty, get_default_slot_changes$1, get_default_slot_context$1);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[15](null);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Search", slots, ['default']);
    	
    	const dispatch = createEventDispatcher();
    	let { class: className = "" } = $$props;
    	let { ref = null } = $$props;
    	let { name = "" } = $$props;
    	let { value = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { size = 100 } = $$props;
    	let { debounceTimer = 1000 } = $$props;
    	let { spellcheck = false } = $$props;
    	let { placeholder = "" } = $$props;
    	let state;
    	let timer;

    	const handleClear = e => {
    		const v = e.currentTarget.value;
    		if (v === "") dispatch("clear");
    	};

    	const handleKeyup = e => {
    		const v = e.target.value;
    		const key = e.key || e.keyCode;
    		$$invalidate(1, value = v);
    		$$invalidate(8, state = "loading");
    		let timeout = debounceTimer;

    		// when user click enter
    		if (key === "Enter" || key === 13) {
    			timeout = 0;
    		}

    		if (timer) {
    			clearTimeout(timer);
    		}

    		timer = setTimeout(
    			() => {
    				dispatch("search", v);
    				$$invalidate(8, state = null);
    			},
    			timeout
    		);
    	};

    	const writable_props = [
    		"class",
    		"ref",
    		"name",
    		"value",
    		"disabled",
    		"size",
    		"debounceTimer",
    		"spellcheck",
    		"placeholder"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Search> was created with unknown prop '${key}'`);
    	});

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(2, className = $$props.class);
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ("size" in $$props) $$invalidate(5, size = $$props.size);
    		if ("debounceTimer" in $$props) $$invalidate(11, debounceTimer = $$props.debounceTimer);
    		if ("spellcheck" in $$props) $$invalidate(6, spellcheck = $$props.spellcheck);
    		if ("placeholder" in $$props) $$invalidate(7, placeholder = $$props.placeholder);
    		if ("$$scope" in $$props) $$invalidate(12, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Loader,
    		dispatch,
    		className,
    		ref,
    		name,
    		value,
    		disabled,
    		size,
    		debounceTimer,
    		spellcheck,
    		placeholder,
    		state,
    		timer,
    		handleClear,
    		handleKeyup
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(2, className = $$props.className);
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(4, disabled = $$props.disabled);
    		if ("size" in $$props) $$invalidate(5, size = $$props.size);
    		if ("debounceTimer" in $$props) $$invalidate(11, debounceTimer = $$props.debounceTimer);
    		if ("spellcheck" in $$props) $$invalidate(6, spellcheck = $$props.spellcheck);
    		if ("placeholder" in $$props) $$invalidate(7, placeholder = $$props.placeholder);
    		if ("state" in $$props) $$invalidate(8, state = $$props.state);
    		if ("timer" in $$props) timer = $$props.timer;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ref,
    		value,
    		className,
    		name,
    		disabled,
    		size,
    		spellcheck,
    		placeholder,
    		state,
    		handleClear,
    		handleKeyup,
    		debounceTimer,
    		$$scope,
    		slots,
    		input_handler,
    		input_binding
    	];
    }

    class Search extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
    			class: 2,
    			ref: 0,
    			name: 3,
    			value: 1,
    			disabled: 4,
    			size: 5,
    			debounceTimer: 11,
    			spellcheck: 6,
    			placeholder: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Search",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get class() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get debounceTimer() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set debounceTimer(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get spellcheck() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spellcheck(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Search>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Search>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/table/src/Table.svelte generated by Svelte v3.32.0 */

    const file$k = "components/table/src/Table.svelte";
    const get_empty_slot_changes = dirty => ({});
    const get_empty_slot_context = ctx => ({});

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    const get_row_slot_changes = dirty => ({
    	index: dirty & /*items*/ 8,
    	item: dirty & /*items*/ 8
    });

    const get_row_slot_context = ctx => ({
    	index: /*i*/ ctx[13],
    	item: /*item*/ ctx[11]
    });

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (35:8) {#each columns as column}
    function create_each_block_2$1(ctx) {
    	let th;
    	let t0_value = (/*column*/ ctx[14].title || "") + "";
    	let t0;
    	let t1;
    	let th_class_value;
    	let th_width_value;

    	const block = {
    		c: function create() {
    			th = element("th");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(th, "class", th_class_value = "responsive-ui-table__column--align-" + (/*column*/ ctx[14].align || "left") + " svelte-u5gq94");
    			attr_dev(th, "width", th_width_value = /*column*/ ctx[14].width);
    			add_location(th, file$k, 35, 10, 893);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t0);
    			append_dev(th, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*columns*/ 4 && t0_value !== (t0_value = (/*column*/ ctx[14].title || "") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*columns*/ 4 && th_class_value !== (th_class_value = "responsive-ui-table__column--align-" + (/*column*/ ctx[14].align || "left") + " svelte-u5gq94")) {
    				attr_dev(th, "class", th_class_value);
    			}

    			if (dirty & /*columns*/ 4 && th_width_value !== (th_width_value = /*column*/ ctx[14].width)) {
    				attr_dev(th, "width", th_width_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(35:8) {#each columns as column}",
    		ctx
    	});

    	return block;
    }

    // (46:6) {#if items}
    function create_if_block$c(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$5, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*items*/ ctx[3].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(46:6) {#if items}",
    		ctx
    	});

    	return block;
    }

    // (66:8) {:else}
    function create_else_block_1(ctx) {
    	let current;
    	const empty_slot_template = /*#slots*/ ctx[10].empty;
    	const empty_slot = create_slot(empty_slot_template, ctx, /*$$scope*/ ctx[9], get_empty_slot_context);
    	const empty_slot_or_fallback = empty_slot || fallback_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (empty_slot_or_fallback) empty_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (empty_slot_or_fallback) {
    				empty_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (empty_slot) {
    				if (empty_slot.p && dirty & /*$$scope*/ 512) {
    					update_slot(empty_slot, empty_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_empty_slot_changes, get_empty_slot_context);
    				}
    			} else {
    				if (empty_slot_or_fallback && empty_slot_or_fallback.p && dirty & /*columns*/ 4) {
    					empty_slot_or_fallback.p(ctx, dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(empty_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(empty_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (empty_slot_or_fallback) empty_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(66:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (47:8) {#if items.length > 0}
    function create_if_block_1$5(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*items*/ ctx[3];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*item*/ ctx[11][/*key*/ ctx[1]] || /*i*/ ctx[13];
    	validate_each_keys(ctx, each_value, get_each_context$6, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$6(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$6(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*columns, getComponent, items, getValue, $$scope, key*/ 910) {
    				each_value = /*items*/ ctx[3];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$6, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$6, each_1_anchor, get_each_context$6);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(47:8) {#if items.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (67:29)              
    function fallback_block_1(ctx) {
    	let tr;
    	let td;
    	let svg;
    	let defs;
    	let linearGradient;
    	let stop0;
    	let stop1;
    	let path0;
    	let g2;
    	let path1;
    	let path2;
    	let path3;
    	let g1;
    	let path4;
    	let g0;
    	let mask;
    	let use0;
    	let use1;
    	let path5;
    	let path6;
    	let path7;
    	let ellipse;
    	let path8;
    	let path9;
    	let path10;
    	let path11;
    	let t0;
    	let p;
    	let td_colspan_value;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td = element("td");
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			path0 = svg_element("path");
    			g2 = svg_element("g");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			g1 = svg_element("g");
    			path4 = svg_element("path");
    			g0 = svg_element("g");
    			mask = svg_element("mask");
    			use0 = svg_element("use");
    			use1 = svg_element("use");
    			path5 = svg_element("path");
    			path6 = svg_element("path");
    			path7 = svg_element("path");
    			ellipse = svg_element("ellipse");
    			path8 = svg_element("path");
    			path9 = svg_element("path");
    			path10 = svg_element("path");
    			path11 = svg_element("path");
    			t0 = space();
    			p = element("p");
    			p.textContent = "NO RECORD.";
    			attr_dev(stop0, "offset", "0%");
    			attr_dev(stop0, "stop-color", "#95ABC2");
    			add_location(stop0, file$k, 87, 22, 2588);
    			attr_dev(stop1, "offset", "100%");
    			attr_dev(stop1, "stop-color", "#FFF");
    			add_location(stop1, file$k, 88, 22, 2652);
    			attr_dev(linearGradient, "id", "a");
    			attr_dev(linearGradient, "x1", "50%");
    			attr_dev(linearGradient, "x2", "40.143%");
    			attr_dev(linearGradient, "y1", "13.071%");
    			attr_dev(linearGradient, "y2", "67.741%");
    			add_location(linearGradient, file$k, 80, 20, 2363);
    			attr_dev(path0, "id", "b");
    			attr_dev(path0, "d", "M8.1 0h3.545v3.507a8.1 8.1 0 01-8.1 8.1H0V8.1A8.1 8.1 0 018.1 0z");
    			add_location(path0, file$k, 90, 20, 2751);
    			add_location(defs, file$k, 79, 18, 2336);
    			attr_dev(path1, "fill", "#8E99A3");
    			attr_dev(path1, "d", "M76.255 67l69 18.893V152l-69-29.62z");
    			add_location(path1, file$k, 96, 20, 3000);
    			attr_dev(path2, "fill", "#A0AAB5");
    			attr_dev(path2, "d", "M75.255 67l-56 15.663V152l56-30.011z");
    			add_location(path2, file$k, 100, 20, 3148);
    			attr_dev(path3, "stroke", "url(#a)");
    			attr_dev(path3, "stroke-dasharray", "6 7");
    			attr_dev(path3, "stroke-width", "3");
    			attr_dev(path3, "d", "M55.208 150.381c-15.635-4.569-43.091-4.16-53.403-30.863-9.45-24.473\n        25.41-48.026 35.164-37.714 6.911 7.307-1.947 17.845-14.24 16.66C8.893\n        97.133.714 84.78 3.442 71.493c5.412-26.358 47.019-43.796 48.773-45.01");
    			attr_dev(path3, "transform", "translate(57.255 -3)");
    			add_location(path3, file$k, 104, 20, 3297);
    			attr_dev(path4, "fill", "#CED8E5");
    			attr_dev(path4, "d", "M17.325\n          17.953c-.262-6.607-1.269-10.785-3.021-12.535-2.629-2.624-6.894-2.62-9.527.008a6.717\n          6.717 0 00-.007 9.511c1.752 1.75 5.937 2.755 12.555 3.016zm4.613\n          3.967c.262 6.608 1.269 10.786 3.021 12.535 2.629 2.625 6.894 2.621\n          9.527-.007a6.717 6.717 0\n          00.007-9.511c-1.752-1.75-5.937-2.755-12.555-3.017z");
    			attr_dev(path4, "opacity", ".4");
    			add_location(path4, file$k, 114, 22, 3833);
    			xlink_attr(use0, "xlink:href", "#b");
    			add_location(use0, file$k, 126, 26, 4457);
    			attr_dev(mask, "id", "c");
    			attr_dev(mask, "fill", "#fff");
    			add_location(mask, file$k, 125, 24, 4405);
    			attr_dev(use1, "fill", "#A8B7C5");
    			xlink_attr(use1, "xlink:href", "#b");
    			add_location(use1, file$k, 128, 24, 4537);
    			attr_dev(path5, "fill", "#DDE5F2");
    			attr_dev(path5, "d", "M2.447.605l1.837.001.011 13.451-1.837-.001z");
    			attr_dev(path5, "mask", "url(#c)");
    			attr_dev(path5, "transform", "rotate(-45 3.37 7.33)");
    			add_location(path5, file$k, 129, 24, 4600);
    			attr_dev(path6, "fill", "#DDE5F2");
    			attr_dev(path6, "d", "M1.639.174l1.3-1.298 9.519 9.503-1.3 1.298z");
    			attr_dev(path6, "mask", "url(#c)");
    			add_location(path6, file$k, 135, 24, 4873);
    			attr_dev(g0, "transform", "translate(14.096 13.503)");
    			add_location(g0, file$k, 124, 22, 4340);
    			attr_dev(path7, "stroke", "#8696C5");
    			attr_dev(path7, "stroke-width", ".9");
    			attr_dev(path7, "d", "M31.994 10.595l4.473-1.063m-6.312-.77l1.721-4.42");
    			add_location(path7, file$k, 141, 22, 5111);
    			attr_dev(ellipse, "cx", "27.58");
    			attr_dev(ellipse, "cy", "12.281");
    			attr_dev(ellipse, "fill", "#8B9AA8");
    			attr_dev(ellipse, "rx", "4.903");
    			attr_dev(ellipse, "ry", "4.887");
    			add_location(ellipse, file$k, 146, 22, 5324);
    			attr_dev(g1, "transform", "translate(96.417 -3)");
    			add_location(g1, file$k, 113, 20, 3774);
    			attr_dev(path8, "fill", "#DAE2EC");
    			attr_dev(path8, "d", "M19.255 83l69 21.848V182l-69-29.661z");
    			add_location(path8, file$k, 154, 20, 5583);
    			attr_dev(path9, "fill", "#C5D0D9");
    			attr_dev(path9, "d", "M145.255 86l-58 18.905V182l58-29.64z");
    			add_location(path9, file$k, 158, 20, 5732);
    			attr_dev(path10, "fill", "#DAE2EC");
    			attr_dev(path10, "d", "M144.849 85l22.406 29.751L107.792 138l-20.537-34.173z");
    			add_location(path10, file$k, 162, 20, 5881);
    			attr_dev(path11, "fill", "#C5D0D9");
    			attr_dev(path11, "d", "M19.578 82L.255 112.013 68.357 138l19.898-34.185z");
    			add_location(path11, file$k, 166, 20, 6047);
    			attr_dev(g2, "fill", "none");
    			attr_dev(g2, "fill-rule", "evenodd");
    			add_location(g2, file$k, 95, 18, 2944);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "width", "65px");
    			attr_dev(svg, "height", "85px");
    			attr_dev(svg, "viewBox", "0 0 168 182");
    			add_location(svg, file$k, 72, 16, 2078);
    			add_location(p, file$k, 172, 16, 6251);
    			attr_dev(td, "colspan", td_colspan_value = /*columns*/ ctx[2].length);
    			attr_dev(td, "class", "responsive-ui-table__column--empty responsive-ui-table__column--align-center svelte-u5gq94");
    			add_location(td, file$k, 68, 14, 1900);
    			attr_dev(tr, "class", "svelte-u5gq94");
    			add_location(tr, file$k, 67, 12, 1881);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td);
    			append_dev(td, svg);
    			append_dev(svg, defs);
    			append_dev(defs, linearGradient);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    			append_dev(defs, path0);
    			append_dev(svg, g2);
    			append_dev(g2, path1);
    			append_dev(g2, path2);
    			append_dev(g2, path3);
    			append_dev(g2, g1);
    			append_dev(g1, path4);
    			append_dev(g1, g0);
    			append_dev(g0, mask);
    			append_dev(mask, use0);
    			append_dev(g0, use1);
    			append_dev(g0, path5);
    			append_dev(g0, path6);
    			append_dev(g1, path7);
    			append_dev(g1, ellipse);
    			append_dev(g2, path8);
    			append_dev(g2, path9);
    			append_dev(g2, path10);
    			append_dev(g2, path11);
    			append_dev(td, t0);
    			append_dev(td, p);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*columns*/ 4 && td_colspan_value !== (td_colspan_value = /*columns*/ ctx[2].length)) {
    				attr_dev(td, "colspan", td_colspan_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(67:29)              ",
    		ctx
    	});

    	return block;
    }

    // (58:20) {:else}
    function create_else_block$6(ctx) {
    	let div;
    	let t_value = /*getValue*/ ctx[7](/*column*/ ctx[14], /*item*/ ctx[11]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			add_location(div, file$k, 58, 22, 1655);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*columns, items*/ 12 && t_value !== (t_value = /*getValue*/ ctx[7](/*column*/ ctx[14], /*item*/ ctx[11]) + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(58:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (56:20) {#if column.component}
    function create_if_block_2$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*getComponent*/ ctx[8](/*column*/ ctx[14], /*item*/ ctx[11]);

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*getComponent*/ ctx[8](/*column*/ ctx[14], /*item*/ ctx[11]))) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(56:20) {#if column.component}",
    		ctx
    	});

    	return block;
    }

    // (51:16) {#each columns as column}
    function create_each_block_1$2(ctx) {
    	let td;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let td_class_value;
    	let current;
    	const if_block_creators = [create_if_block_2$2, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*column*/ ctx[14].component) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			td = element("td");
    			if_block.c();
    			t = space();
    			attr_dev(td, "class", td_class_value = "responsive-ui-table__column--align-" + (/*column*/ ctx[14].align || "left") + " svelte-u5gq94");
    			add_location(td, file$k, 51, 18, 1351);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			if_blocks[current_block_type_index].m(td, null);
    			append_dev(td, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(td, t);
    			}

    			if (!current || dirty & /*columns*/ 4 && td_class_value !== (td_class_value = "responsive-ui-table__column--align-" + (/*column*/ ctx[14].align || "left") + " svelte-u5gq94")) {
    				attr_dev(td, "class", td_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(51:16) {#each columns as column}",
    		ctx
    	});

    	return block;
    }

    // (49:46)                
    function fallback_block$3(ctx) {
    	let tr;
    	let t;
    	let current;
    	let each_value_1 = /*columns*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			tr = element("tr");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(tr, "class", "svelte-u5gq94");
    			add_location(tr, file$k, 49, 14, 1286);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*columns, getComponent, items, getValue*/ 396) {
    				each_value_1 = /*columns*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tr, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$3.name,
    		type: "fallback",
    		source: "(49:46)                ",
    		ctx
    	});

    	return block;
    }

    // (48:10) {#each items as item, i (item[key] || i)}
    function create_each_block$6(key_2, ctx) {
    	let first;
    	let current;
    	const row_slot_template = /*#slots*/ ctx[10].row;
    	const row_slot = create_slot(row_slot_template, ctx, /*$$scope*/ ctx[9], get_row_slot_context);
    	const row_slot_or_fallback = row_slot || fallback_block$3(ctx);

    	const block = {
    		key: key_2,
    		first: null,
    		c: function create() {
    			first = empty();
    			if (row_slot_or_fallback) row_slot_or_fallback.c();
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);

    			if (row_slot_or_fallback) {
    				row_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (row_slot) {
    				if (row_slot.p && dirty & /*$$scope, items*/ 520) {
    					update_slot(row_slot, row_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_row_slot_changes, get_row_slot_context);
    				}
    			} else {
    				if (row_slot_or_fallback && row_slot_or_fallback.p && dirty & /*columns, items*/ 12) {
    					row_slot_or_fallback.p(ctx, dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if (row_slot_or_fallback) row_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(48:10) {#each items as item, i (item[key] || i)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let div;
    	let table;
    	let thead;
    	let tr;
    	let t;
    	let tbody;
    	let div_class_value;
    	let current;
    	let each_value_2 = /*columns*/ ctx[2];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	let if_block = /*items*/ ctx[3] && create_if_block$c(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			tbody = element("tbody");
    			if (if_block) if_block.c();
    			attr_dev(tr, "class", "svelte-u5gq94");
    			add_location(tr, file$k, 33, 6, 844);
    			attr_dev(thead, "class", "svelte-u5gq94");
    			add_location(thead, file$k, 32, 4, 830);
    			attr_dev(tbody, "class", "svelte-u5gq94");
    			add_location(tbody, file$k, 44, 4, 1116);
    			attr_dev(table, "style", /*style*/ ctx[6]);
    			attr_dev(table, "class", "svelte-u5gq94");
    			toggle_class(table, "responsive-ui-table__striped", /*striped*/ ctx[4]);
    			add_location(table, file$k, 31, 2, 765);
    			attr_dev(div, "class", div_class_value = "responsive-ui-table " + /*className*/ ctx[0] + " svelte-u5gq94");
    			toggle_class(div, "responsive-ui-table__bordered", /*bordered*/ ctx[5]);
    			add_location(div, file$k, 27, 0, 665);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tr, null);
    			}

    			append_dev(table, t);
    			append_dev(table, tbody);
    			if (if_block) if_block.m(tbody, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*columns*/ 4) {
    				each_value_2 = /*columns*/ ctx[2];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			if (/*items*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*items*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$c(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(tbody, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*style*/ 64) {
    				attr_dev(table, "style", /*style*/ ctx[6]);
    			}

    			if (dirty & /*striped*/ 16) {
    				toggle_class(table, "responsive-ui-table__striped", /*striped*/ ctx[4]);
    			}

    			if (!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = "responsive-ui-table " + /*className*/ ctx[0] + " svelte-u5gq94")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*className, bordered*/ 33) {
    				toggle_class(div, "responsive-ui-table__bordered", /*bordered*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Table", slots, ['row','empty']);
    	
    	
    	let { class: className = "" } = $$props;
    	let { key = "id" } = $$props;
    	let { columns = [] } = $$props;
    	let { items = null } = $$props;
    	let { striped = false } = $$props;
    	let { bordered = true } = $$props;
    	let { style = "" } = $$props;

    	const getValue = (column, item) => {
    		const { key, value = v => v } = column;

    		if (key) {
    			return value(key.split(".").reduce((acc, cur) => cur in acc ? acc[cur] : "", item), item);
    		}

    		return value(item);
    	};

    	const getComponent = (column, item) => {
    		const { component } = column;
    		if (typeof component === "function") return component(item);
    		return component;
    	};

    	const writable_props = ["class", "key", "columns", "items", "striped", "bordered", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("key" in $$props) $$invalidate(1, key = $$props.key);
    		if ("columns" in $$props) $$invalidate(2, columns = $$props.columns);
    		if ("items" in $$props) $$invalidate(3, items = $$props.items);
    		if ("striped" in $$props) $$invalidate(4, striped = $$props.striped);
    		if ("bordered" in $$props) $$invalidate(5, bordered = $$props.bordered);
    		if ("style" in $$props) $$invalidate(6, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(9, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		key,
    		columns,
    		items,
    		striped,
    		bordered,
    		style,
    		getValue,
    		getComponent
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("key" in $$props) $$invalidate(1, key = $$props.key);
    		if ("columns" in $$props) $$invalidate(2, columns = $$props.columns);
    		if ("items" in $$props) $$invalidate(3, items = $$props.items);
    		if ("striped" in $$props) $$invalidate(4, striped = $$props.striped);
    		if ("bordered" in $$props) $$invalidate(5, bordered = $$props.bordered);
    		if ("style" in $$props) $$invalidate(6, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		className,
    		key,
    		columns,
    		items,
    		striped,
    		bordered,
    		style,
    		getValue,
    		getComponent,
    		$$scope,
    		slots
    	];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {
    			class: 0,
    			key: 1,
    			columns: 2,
    			items: 3,
    			striped: 4,
    			bordered: 5,
    			style: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get class() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get columns() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set columns(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get striped() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set striped(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bordered() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bordered(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/tooltip/src/Tooltip.svelte generated by Svelte v3.32.0 */
    const file$l = "components/tooltip/src/Tooltip.svelte";

    function create_fragment$l(ctx) {
    	let span0;
    	let t0;
    	let span1;
    	let t1;
    	let span1_class_value;
    	let span1_resize_listener;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			span1 = element("span");
    			t1 = text(/*placeholder*/ ctx[1]);
    			add_location(span0, file$l, 43, 0, 1307);
    			attr_dev(span1, "class", span1_class_value = "responsive-ui-tooltip " + /*className*/ ctx[0] + " svelte-1cjonki");
    			attr_dev(span1, "style", /*style*/ ctx[2]);
    			add_render_callback(() => /*span1_elementresize_handler*/ ctx[9].call(span1));
    			add_location(span1, file$l, 45, 0, 1342);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);

    			if (default_slot) {
    				default_slot.m(span0, null);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t1);
    			span1_resize_listener = add_resize_listener(span1, /*span1_elementresize_handler*/ ctx[9].bind(span1));
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*mounted*/ ctx[4].call(null, span0));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*placeholder*/ 2) set_data_dev(t1, /*placeholder*/ ctx[1]);

    			if (!current || dirty & /*className*/ 1 && span1_class_value !== (span1_class_value = "responsive-ui-tooltip " + /*className*/ ctx[0] + " svelte-1cjonki")) {
    				attr_dev(span1, "class", span1_class_value);
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(span1, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span1);
    			span1_resize_listener();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Tooltip", slots, ['default']);
    	
    	let { class: className = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { trigger = ["mouseenter", "click"] } = $$props;
    	let { show = false } = $$props;
    	let style = "";
    	let clientHeight = 0;
    	const callbacks = [];

    	const mounted = node => {
    		const children = node.children;
    		let child;
    		let len = children.length;

    		for (let i = 0; i < len; i++) {
    			child = children[i];

    			trigger.forEach(evt => {
    				const cb = e => {
    					if (evt === "click" && show) {
    						$$invalidate(5, show = false);
    						$$invalidate(2, style = "");
    						return;
    					}

    					const rect = e.currentTarget.getBoundingClientRect();
    					const rect1 = document.body.getBoundingClientRect();
    					const x = rect.x - rect1.x;
    					const y = rect.y - rect1.y - clientHeight - 15;
    					$$invalidate(5, show = true);
    					$$invalidate(2, style = `top:${y}px;left:${x}px;visibility:visible;`);
    				};

    				child.addEventListener(evt, cb);
    				callbacks.push([child, evt, cb]);
    			});
    		}

    		node.replaceWith(...children);
    	};

    	onDestroy(() => {
    		callbacks.forEach(([child, evt, cb]) => {
    			child.removeEventListener(evt, cb);
    		});
    	});

    	const writable_props = ["class", "placeholder", "trigger", "show"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tooltip> was created with unknown prop '${key}'`);
    	});

    	function span1_elementresize_handler() {
    		clientHeight = this.clientHeight;
    		$$invalidate(3, clientHeight);
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("placeholder" in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ("trigger" in $$props) $$invalidate(6, trigger = $$props.trigger);
    		if ("show" in $$props) $$invalidate(5, show = $$props.show);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		className,
    		placeholder,
    		trigger,
    		show,
    		style,
    		clientHeight,
    		callbacks,
    		mounted
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("placeholder" in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ("trigger" in $$props) $$invalidate(6, trigger = $$props.trigger);
    		if ("show" in $$props) $$invalidate(5, show = $$props.show);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("clientHeight" in $$props) $$invalidate(3, clientHeight = $$props.clientHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		className,
    		placeholder,
    		style,
    		clientHeight,
    		mounted,
    		show,
    		trigger,
    		$$scope,
    		slots,
    		span1_elementresize_handler
    	];
    }

    class Tooltip extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
    			class: 0,
    			placeholder: 1,
    			trigger: 6,
    			show: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tooltip",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get class() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get trigger() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trigger(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get show() {
    		throw new Error("<Tooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Tooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/tag/src/Tag.svelte generated by Svelte v3.32.0 */
    const file$m = "components/tag/src/Tag.svelte";

    // (14:8) {value}
    function fallback_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*value*/ ctx[3]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*value*/ 8) set_data_dev(t, /*value*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$4.name,
    		type: "fallback",
    		source: "(14:8) {value}",
    		ctx
    	});

    	return block;
    }

    // (15:2) {#if closable}
    function create_if_block$d(ctx) {
    	let span;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "✕";
    			attr_dev(span, "class", "responsive-ui-tag__close svelte-cyzdbw");
    			add_location(span, file$m, 15, 4, 415);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", /*onClick*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(15:2) {#if closable}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let span;
    	let t;
    	let span_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	const default_slot_or_fallback = default_slot || fallback_block$4(ctx);
    	let if_block = /*closable*/ ctx[1] && create_if_block$d(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(span, "class", span_class_value = "responsive-ui-tag responsive-ui-tag--" + /*color*/ ctx[2] + " " + /*className*/ ctx[0] + " svelte-cyzdbw");
    			add_location(span, file$m, 12, 0, 299);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(span, null);
    			}

    			append_dev(span, t);
    			if (if_block) if_block.m(span, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*value*/ 8) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (/*closable*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$d(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (!current || dirty & /*color, className*/ 5 && span_class_value !== (span_class_value = "responsive-ui-tag responsive-ui-tag--" + /*color*/ ctx[2] + " " + /*className*/ ctx[0] + " svelte-cyzdbw")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Tag", slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { class: className = "" } = $$props;
    	let { closable = false } = $$props;
    	let { color = "blue" } = $$props;
    	let { value = "" } = $$props;

    	const onClick = () => {
    		dispatch("close");
    	};

    	const writable_props = ["class", "closable", "color", "value"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tag> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("closable" in $$props) $$invalidate(1, closable = $$props.closable);
    		if ("color" in $$props) $$invalidate(2, color = $$props.color);
    		if ("value" in $$props) $$invalidate(3, value = $$props.value);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		className,
    		closable,
    		color,
    		value,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("closable" in $$props) $$invalidate(1, closable = $$props.closable);
    		if ("color" in $$props) $$invalidate(2, color = $$props.color);
    		if ("value" in $$props) $$invalidate(3, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, closable, color, value, onClick, $$scope, slots];
    }

    class Tag extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {
    			class: 0,
    			closable: 1,
    			color: 2,
    			value: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tag",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get class() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closable() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closable(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Tag>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Tag>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/textarea/src/Textarea.svelte generated by Svelte v3.32.0 */

    const file$n = "components/textarea/src/Textarea.svelte";

    function create_fragment$n(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "class", "responsive-ui-textarea svelte-hfcee");
    			attr_dev(textarea, "name", /*name*/ ctx[2]);
    			attr_dev(textarea, "form", /*form*/ ctx[3]);
    			attr_dev(textarea, "rows", /*rows*/ ctx[8]);
    			attr_dev(textarea, "cols", /*cols*/ ctx[7]);
    			textarea.disabled = /*disabled*/ ctx[5];
    			attr_dev(textarea, "placeholder", /*placeholder*/ ctx[6]);
    			textarea.value = /*value*/ ctx[1];
    			textarea.readOnly = /*readonly*/ ctx[4];
    			attr_dev(textarea, "maxlength", /*maxlength*/ ctx[9]);
    			add_location(textarea, file$n, 20, 0, 486);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			/*textarea_binding*/ ctx[15](textarea);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "blur", /*blur_handler*/ ctx[12], false, false, false),
    					listen_dev(textarea, "change", /*change_handler*/ ctx[13], false, false, false),
    					listen_dev(textarea, "change", /*onChange*/ ctx[10], false, false, false),
    					listen_dev(textarea, "input", /*input_handler*/ ctx[14], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 4) {
    				attr_dev(textarea, "name", /*name*/ ctx[2]);
    			}

    			if (dirty & /*form*/ 8) {
    				attr_dev(textarea, "form", /*form*/ ctx[3]);
    			}

    			if (dirty & /*rows*/ 256) {
    				attr_dev(textarea, "rows", /*rows*/ ctx[8]);
    			}

    			if (dirty & /*cols*/ 128) {
    				attr_dev(textarea, "cols", /*cols*/ ctx[7]);
    			}

    			if (dirty & /*disabled*/ 32) {
    				prop_dev(textarea, "disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty & /*placeholder*/ 64) {
    				attr_dev(textarea, "placeholder", /*placeholder*/ ctx[6]);
    			}

    			if (dirty & /*value*/ 2) {
    				prop_dev(textarea, "value", /*value*/ ctx[1]);
    			}

    			if (dirty & /*readonly*/ 16) {
    				prop_dev(textarea, "readOnly", /*readonly*/ ctx[4]);
    			}

    			if (dirty & /*maxlength*/ 512) {
    				attr_dev(textarea, "maxlength", /*maxlength*/ ctx[9]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Textarea", slots, []);
    	let { ref = null } = $$props;
    	let { name = "" } = $$props;
    	let { form = "" } = $$props;
    	let { readonly = false } = $$props;
    	let { disabled = false } = $$props;
    	let { placeholder = "" } = $$props;
    	let { cols = 80 } = $$props;
    	let { rows = 4 } = $$props;
    	let { maxlength = 100 } = $$props;
    	let { value = "" } = $$props;
    	let { autoResize = true } = $$props;

    	const onChange = e => {
    		$$invalidate(1, value = e.target.value);

    		if (autoResize && ref) {
    			$$invalidate(0, ref.style.height = "auto", ref);
    			$$invalidate(0, ref.style.height = ref.scrollHeight + "px", ref);
    		}
    	};

    	const writable_props = [
    		"ref",
    		"name",
    		"form",
    		"readonly",
    		"disabled",
    		"placeholder",
    		"cols",
    		"rows",
    		"maxlength",
    		"value",
    		"autoResize"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Textarea> was created with unknown prop '${key}'`);
    	});

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    		if ("form" in $$props) $$invalidate(3, form = $$props.form);
    		if ("readonly" in $$props) $$invalidate(4, readonly = $$props.readonly);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ("placeholder" in $$props) $$invalidate(6, placeholder = $$props.placeholder);
    		if ("cols" in $$props) $$invalidate(7, cols = $$props.cols);
    		if ("rows" in $$props) $$invalidate(8, rows = $$props.rows);
    		if ("maxlength" in $$props) $$invalidate(9, maxlength = $$props.maxlength);
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("autoResize" in $$props) $$invalidate(11, autoResize = $$props.autoResize);
    	};

    	$$self.$capture_state = () => ({
    		ref,
    		name,
    		form,
    		readonly,
    		disabled,
    		placeholder,
    		cols,
    		rows,
    		maxlength,
    		value,
    		autoResize,
    		onChange
    	});

    	$$self.$inject_state = $$props => {
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    		if ("form" in $$props) $$invalidate(3, form = $$props.form);
    		if ("readonly" in $$props) $$invalidate(4, readonly = $$props.readonly);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ("placeholder" in $$props) $$invalidate(6, placeholder = $$props.placeholder);
    		if ("cols" in $$props) $$invalidate(7, cols = $$props.cols);
    		if ("rows" in $$props) $$invalidate(8, rows = $$props.rows);
    		if ("maxlength" in $$props) $$invalidate(9, maxlength = $$props.maxlength);
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("autoResize" in $$props) $$invalidate(11, autoResize = $$props.autoResize);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ref,
    		value,
    		name,
    		form,
    		readonly,
    		disabled,
    		placeholder,
    		cols,
    		rows,
    		maxlength,
    		onChange,
    		autoResize,
    		blur_handler,
    		change_handler,
    		input_handler,
    		textarea_binding
    	];
    }

    class Textarea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {
    			ref: 0,
    			name: 2,
    			form: 3,
    			readonly: 4,
    			disabled: 5,
    			placeholder: 6,
    			cols: 7,
    			rows: 8,
    			maxlength: 9,
    			value: 1,
    			autoResize: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Textarea",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get ref() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get form() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set form(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cols() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cols(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rows() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rows(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxlength() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxlength(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoResize() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoResize(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/upload/src/Upload.svelte generated by Svelte v3.32.0 */

    const { Object: Object_1$2 } = globals;
    const file_1 = "components/upload/src/Upload.svelte";
    const get_default_slot_changes$2 = dirty => ({ loading: dirty & /*loading*/ 64 });
    const get_default_slot_context$2 = ctx => ({ loading: /*loading*/ ctx[6] });

    // (83:18)      
    function fallback_block$5(ctx) {
    	let svg;
    	let g2;
    	let g1;
    	let g0;
    	let path0;
    	let path1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g2 = svg_element("g");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M426.635,188.224C402.969,93.946,307.358,36.704,213.08,60.37C139.404,78.865,85.907,142.542,80.395,218.303\n\t\t\t\tC28.082,226.93-7.333,276.331,1.294,328.644c7.669,46.507,47.967,80.566,95.101,80.379h80v-32h-80c-35.346,0-64-28.654-64-64\n\t\t\t\tc0-35.346,28.654-64,64-64c8.837,0,16-7.163,16-16c-0.08-79.529,64.327-144.065,143.856-144.144\n\t\t\t\tc68.844-0.069,128.107,48.601,141.424,116.144c1.315,6.744,6.788,11.896,13.6,12.8c43.742,6.229,74.151,46.738,67.923,90.479\n\t\t\t\tc-5.593,39.278-39.129,68.523-78.803,68.721h-64v32h64c61.856-0.187,111.848-50.483,111.66-112.339\n\t\t\t\tC511.899,245.194,476.655,200.443,426.635,188.224z");
    			add_location(path0, file_1, 98, 12, 2727);
    			attr_dev(path1, "d", "M245.035,253.664l-64,64l22.56,22.56l36.8-36.64v153.44h32v-153.44l36.64,36.64l22.56-22.56l-64-64\n\t\t\t\tC261.354,247.46,251.276,247.46,245.035,253.664z");
    			add_location(path1, file_1, 106, 12, 3384);
    			add_location(g0, file_1, 97, 10, 2711);
    			add_location(g1, file_1, 96, 8, 2697);
    			add_location(g2, file_1, 95, 6, 2685);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "width", "24px");
    			attr_dev(svg, "height", "24px");
    			attr_dev(svg, "viewBox", "0 0 512.056 512.056");
    			set_style(svg, "enable-background", "new 0 0 512.056 512.056");
    			attr_dev(svg, "xml:space", "preserve");
    			add_location(svg, file_1, 83, 4, 2371);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g2);
    			append_dev(g2, g1);
    			append_dev(g1, g0);
    			append_dev(g0, path0);
    			append_dev(g0, path1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$5.name,
    		type: "fallback",
    		source: "(83:18)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let span;
    	let t;
    	let input;
    	let span_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], get_default_slot_context$2);
    	const default_slot_or_fallback = default_slot || fallback_block$5(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t = space();
    			input = element("input");
    			attr_dev(input, "type", "file");
    			attr_dev(input, "name", /*name*/ ctx[2]);
    			input.multiple = /*multiple*/ ctx[4];
    			attr_dev(input, "accept", /*accept*/ ctx[3]);
    			attr_dev(input, "tabindex", "-1");
    			attr_dev(input, "class", "svelte-83w90p");
    			add_location(input, file_1, 115, 2, 3633);
    			attr_dev(span, "class", span_class_value = "responsive-ui-upload " + /*className*/ ctx[1] + " svelte-83w90p");
    			attr_dev(span, "style", /*style*/ ctx[5]);
    			add_location(span, file_1, 76, 0, 2235);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(span, null);
    			}

    			append_dev(span, t);
    			append_dev(span, input);
    			/*input_binding*/ ctx[16](input);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[17]),
    					listen_dev(input, "change", /*onChange*/ ctx[8], false, false, false),
    					listen_dev(span, "change", /*change_handler*/ ctx[15], false, false, false),
    					listen_dev(span, "click", /*click_handler*/ ctx[18], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, loading*/ 8256) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[13], dirty, get_default_slot_changes$2, get_default_slot_context$2);
    				}
    			}

    			if (!current || dirty & /*name*/ 4) {
    				attr_dev(input, "name", /*name*/ ctx[2]);
    			}

    			if (!current || dirty & /*multiple*/ 16) {
    				prop_dev(input, "multiple", /*multiple*/ ctx[4]);
    			}

    			if (!current || dirty & /*accept*/ 8) {
    				attr_dev(input, "accept", /*accept*/ ctx[3]);
    			}

    			if (!current || dirty & /*className*/ 2 && span_class_value !== (span_class_value = "responsive-ui-upload " + /*className*/ ctx[1] + " svelte-83w90p")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (!current || dirty & /*style*/ 32) {
    				attr_dev(span, "style", /*style*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*input_binding*/ ctx[16](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Upload", slots, ['default']);
    	const dispatch = createEventDispatcher();
    	let { class: className = "" } = $$props;
    	let { name = "file" } = $$props;
    	let { url = "" } = $$props;
    	let { headers = {} } = $$props;
    	let { accept = "image/*" } = $$props;
    	let { withCredentials = true } = $$props;
    	let { directory = false } = $$props;
    	let { multiple = false } = $$props;
    	let { value = "" } = $$props;
    	let { style = "" } = $$props;
    	let loading = false;
    	let file;

    	onMount(() => {
    		if (file && directory) {
    			file.setAttribute("webkitdirectory", "true");
    			file.setAttribute("mozdirectory", "true");
    		}
    	});

    	const onChange = e => {
    		const { files } = e.target;
    		$$invalidate(6, loading = true);
    		const formData = new FormData();
    		const xhr = new XMLHttpRequest();
    		xhr.open("POST", url, true);
    		xhr.withCredentials = withCredentials;

    		Object.entries(headers).forEach(([k, v]) => {
    			xhr.setRequestHeader(k, v);
    		});

    		xhr.addEventListener("loadstart", e => {
    			dispatch("progress", e);
    		});

    		xhr.addEventListener("error", e => {
    			dispatch("error", e);
    		});

    		xhr.addEventListener("readystatechange", () => {
    			if (xhr.readyState === 4) {
    				let response = xhr.responseXML;
    				const contentType = xhr.getResponseHeader("Content-Type") || "";

    				try {
    					if (xhr.status != 204 && (/json/i).test(contentType)) response = JSON.parse(xhr.responseText);

    					if (xhr.status >= 200 && xhr.status <= 299) {
    						dispatch("success", { response, xhr });
    					} else if (xhr.status >= 400) {
    						dispatch("error", xhr);
    					}
    				} catch(e) {
    					dispatch("error", xhr);
    				} finally {
    					$$invalidate(6, loading = false);
    				}
    			}
    		});

    		if (files) {
    			if (multiple) {
    				for (let i = 0; i < files.length; i++) {
    					formData.append(`${name}[]`, files[i]);
    				}
    			} else {
    				formData.append(name, files[0]);
    			}
    		}

    		xhr.send(formData);
    	};

    	const writable_props = [
    		"class",
    		"name",
    		"url",
    		"headers",
    		"accept",
    		"withCredentials",
    		"directory",
    		"multiple",
    		"value",
    		"style"
    	];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Upload> was created with unknown prop '${key}'`);
    	});

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			file = $$value;
    			$$invalidate(7, file);
    		});
    	}

    	function input_change_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	const click_handler = () => file && file.click();

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    		if ("url" in $$props) $$invalidate(9, url = $$props.url);
    		if ("headers" in $$props) $$invalidate(10, headers = $$props.headers);
    		if ("accept" in $$props) $$invalidate(3, accept = $$props.accept);
    		if ("withCredentials" in $$props) $$invalidate(11, withCredentials = $$props.withCredentials);
    		if ("directory" in $$props) $$invalidate(12, directory = $$props.directory);
    		if ("multiple" in $$props) $$invalidate(4, multiple = $$props.multiple);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(13, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		dispatch,
    		className,
    		name,
    		url,
    		headers,
    		accept,
    		withCredentials,
    		directory,
    		multiple,
    		value,
    		style,
    		loading,
    		file,
    		onChange
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    		if ("url" in $$props) $$invalidate(9, url = $$props.url);
    		if ("headers" in $$props) $$invalidate(10, headers = $$props.headers);
    		if ("accept" in $$props) $$invalidate(3, accept = $$props.accept);
    		if ("withCredentials" in $$props) $$invalidate(11, withCredentials = $$props.withCredentials);
    		if ("directory" in $$props) $$invalidate(12, directory = $$props.directory);
    		if ("multiple" in $$props) $$invalidate(4, multiple = $$props.multiple);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    		if ("loading" in $$props) $$invalidate(6, loading = $$props.loading);
    		if ("file" in $$props) $$invalidate(7, file = $$props.file);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		className,
    		name,
    		accept,
    		multiple,
    		style,
    		loading,
    		file,
    		onChange,
    		url,
    		headers,
    		withCredentials,
    		directory,
    		$$scope,
    		slots,
    		change_handler,
    		input_binding,
    		input_change_handler,
    		click_handler
    	];
    }

    class Upload extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {
    			class: 1,
    			name: 2,
    			url: 9,
    			headers: 10,
    			accept: 3,
    			withCredentials: 11,
    			directory: 12,
    			multiple: 4,
    			value: 0,
    			style: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Upload",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get class() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get headers() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set headers(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get accept() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set accept(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withCredentials() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withCredentials(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get directory() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set directory(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Upload>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Upload>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/stepper/src/Stepper.svelte generated by Svelte v3.32.0 */
    const file$o = "components/stepper/src/Stepper.svelte";

    // (53:6) {#if current < items.length && items[current].description}
    function create_if_block$e(ctx) {
    	let t_value = /*items*/ ctx[2][/*current*/ ctx[1]].description + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items, current*/ 6 && t_value !== (t_value = /*items*/ ctx[2][/*current*/ ctx[1]].description + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(53:6) {#if current < items.length && items[current].description}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div5;
    	let div0;
    	let span;
    	let t0_value = `${/*percent*/ ctx[3].toFixed()}%` + "";
    	let t0;
    	let t1;
    	let svg;
    	let g1;
    	let g0;
    	let circle_1;
    	let path;
    	let t2;
    	let div4;
    	let div1;

    	let t3_value = (/*current*/ ctx[1] < /*items*/ ctx[2].length
    	? /*items*/ ctx[2][/*current*/ ctx[1]].title
    	: "Completed") + "";

    	let t3;
    	let t4;
    	let div2;
    	let t5;
    	let div3;

    	let t6_value = (/*current*/ ctx[1] < /*items*/ ctx[2].length - 1
    	? `Next: ${/*items*/ ctx[2][/*current*/ ctx[1] + 1].title}`
    	: "") + "";

    	let t6;
    	let div5_class_value;
    	let if_block = /*current*/ ctx[1] < /*items*/ ctx[2].length && /*items*/ ctx[2][/*current*/ ctx[1]].description && create_if_block$e(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			svg = svg_element("svg");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			circle_1 = svg_element("circle");
    			path = svg_element("path");
    			t2 = space();
    			div4 = element("div");
    			div1 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div2 = element("div");
    			if (if_block) if_block.c();
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			attr_dev(span, "class", "responsive-ui-stepper__percent svelte-1fbxmu4");
    			add_location(span, file$o, 16, 4, 459);
    			attr_dev(circle_1, "stroke", "#949494");
    			attr_dev(circle_1, "stroke-width", "5");
    			attr_dev(circle_1, "fill-rule", "nonzero");
    			attr_dev(circle_1, "cx", "70");
    			attr_dev(circle_1, "cy", "70");
    			attr_dev(circle_1, "r", "50");
    			add_location(circle_1, file$o, 27, 10, 889);
    			attr_dev(path, "d", "M70,120 C97.6142375,120 120,97.6142375 120,70 C120,42.3857625 97.6142375,20 70,20 C42.3857625,20 20,42.3857625 20,70 C20,97.6142375 42.3857625,120 70,120 Z");
    			attr_dev(path, "stroke", "#00ff00");
    			attr_dev(path, "stroke-width", "5");
    			attr_dev(path, "stroke-dasharray", /*circle*/ ctx[4]);
    			attr_dev(path, "fill-rule", "nonzero");
    			attr_dev(path, "transform", "translate(70.000000, 70.000000) rotate(-125.000000) translate(-70.000000, -70.000000)");
    			attr_dev(path, "class", "svelte-1fbxmu4");
    			add_location(path, file$o, 35, 10, 1069);
    			attr_dev(g0, "transform", "translate(-17.000000, -17.000000)");
    			add_location(g0, file$o, 26, 8, 829);
    			attr_dev(g1, "stroke", "none");
    			attr_dev(g1, "stroke-width", "1");
    			attr_dev(g1, "fill", "none");
    			attr_dev(g1, "fill-rule", "evenodd");
    			add_location(g1, file$o, 25, 6, 754);
    			attr_dev(svg, "class", "responsive-ui-stepper__progress-circle svelte-1fbxmu4");
    			attr_dev(svg, "viewBox", "0 0 106 106");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			add_location(svg, file$o, 18, 4, 546);
    			attr_dev(div0, "class", "responsive-ui-stepper__progress svelte-1fbxmu4");
    			add_location(div0, file$o, 15, 2, 409);
    			attr_dev(div1, "class", "responsive-ui-stepper__header-current svelte-1fbxmu4");
    			add_location(div1, file$o, 48, 4, 1592);
    			add_location(div2, file$o, 51, 4, 1727);
    			attr_dev(div3, "class", "responsive-ui-stepper__header-next svelte-1fbxmu4");
    			add_location(div3, file$o, 56, 4, 1862);
    			attr_dev(div4, "class", "responsive-ui-stepper__header");
    			add_location(div4, file$o, 47, 2, 1544);
    			attr_dev(div5, "class", div5_class_value = "responsive-ui-stepper " + /*className*/ ctx[0] + " svelte-1fbxmu4");
    			add_location(div5, file$o, 14, 0, 359);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, span);
    			append_dev(span, t0);
    			append_dev(div0, t1);
    			append_dev(div0, svg);
    			append_dev(svg, g1);
    			append_dev(g1, g0);
    			append_dev(g0, circle_1);
    			append_dev(g0, path);
    			append_dev(div5, t2);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, t3);
    			append_dev(div4, t4);
    			append_dev(div4, div2);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, t6);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*percent*/ 8 && t0_value !== (t0_value = `${/*percent*/ ctx[3].toFixed()}%` + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*circle*/ 16) {
    				attr_dev(path, "stroke-dasharray", /*circle*/ ctx[4]);
    			}

    			if (dirty & /*current, items*/ 6 && t3_value !== (t3_value = (/*current*/ ctx[1] < /*items*/ ctx[2].length
    			? /*items*/ ctx[2][/*current*/ ctx[1]].title
    			: "Completed") + "")) set_data_dev(t3, t3_value);

    			if (/*current*/ ctx[1] < /*items*/ ctx[2].length && /*items*/ ctx[2][/*current*/ ctx[1]].description) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$e(ctx);
    					if_block.c();
    					if_block.m(div2, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*current, items*/ 6 && t6_value !== (t6_value = (/*current*/ ctx[1] < /*items*/ ctx[2].length - 1
    			? `Next: ${/*items*/ ctx[2][/*current*/ ctx[1] + 1].title}`
    			: "") + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*className*/ 1 && div5_class_value !== (div5_class_value = "responsive-ui-stepper " + /*className*/ ctx[0] + " svelte-1fbxmu4")) {
    				attr_dev(div5, "class", div5_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let percent;
    	let circle;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Stepper", slots, []);
    	
    	const dispatch = createEventDispatcher();
    	let { class: className = "" } = $$props;
    	let { current = 0 } = $$props;
    	let { items = [] } = $$props;
    	const writable_props = ["class", "current", "items"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Stepper> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("current" in $$props) $$invalidate(1, current = $$props.current);
    		if ("items" in $$props) $$invalidate(2, items = $$props.items);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		className,
    		current,
    		items,
    		percent,
    		circle
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("current" in $$props) $$invalidate(1, current = $$props.current);
    		if ("items" in $$props) $$invalidate(2, items = $$props.items);
    		if ("percent" in $$props) $$invalidate(3, percent = $$props.percent);
    		if ("circle" in $$props) $$invalidate(4, circle = $$props.circle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*current, items*/ 6) {
    			 $$invalidate(3, percent = current / items.length * 100);
    		}

    		if ($$self.$$.dirty & /*percent*/ 8) {
    			 $$invalidate(4, circle = percent / 100 * 100 * Math.PI + ",9999");
    		}

    		if ($$self.$$.dirty & /*current*/ 2) {
    			 {
    				dispatch("change", current);
    			}
    		}
    	};

    	return [className, current, items, percent, circle];
    }

    class Stepper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { class: 0, current: 1, items: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stepper",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get class() {
    		throw new Error("<Stepper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Stepper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get current() {
    		throw new Error("<Stepper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set current(value) {
    		throw new Error("<Stepper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Stepper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Stepper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ComponentDetail.svelte generated by Svelte v3.32.0 */

    const { console: console_1$1 } = globals;
    const file$p = "src/components/ComponentDetail.svelte";

    // (20:2) {#if !hide}
    function create_if_block$f(ctx) {
    	let div1;
    	let div0;
    	let t;

    	const block_1 = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = text(/*hint*/ ctx[0]);
    			attr_dev(div0, "class", "component-name svelte-p538ii");
    			add_location(div0, file$p, 21, 6, 633);
    			attr_dev(div1, "class", "bounding-box svelte-p538ii");
    			add_location(div1, file$p, 20, 4, 600);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*hint*/ 1) set_data_dev(t, /*hint*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(20:2) {#if !hide}",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$q(ctx) {
    	let div;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let if_block = !/*hide*/ ctx[1] && create_if_block$f(ctx);

    	const block_1 = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "slot svelte-p538ii");
    			attr_dev(div, "style", /*cssStyle*/ ctx[2]);
    			add_location(div, file$p, 17, 0, 523);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t);
    			if (if_block) if_block.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*mounted*/ ctx[3].call(null, div));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}

    			if (!/*hide*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$f(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ComponentDetail", slots, ['default']);
    	let { block = false } = $$props;
    	let { hint = "unknown" } = $$props;
    	let cssStyle = `position:relative;display:${block ? "block" : "inline-block"}`;
    	let hide = true;

    	const mounted = node => {
    		window.getComputedStyle(node.firstElementChild);
    		console.log();

    		// cssStyle = `position:${style.getPropertyValue("position")}`;
    		node.addEventListener("mouseenter", e => {
    			$$invalidate(1, hide = false);
    		});

    		node.addEventListener("mouseleave", e => {
    			$$invalidate(1, hide = true);
    		});
    	};

    	const writable_props = ["block", "hint"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<ComponentDetail> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("block" in $$props) $$invalidate(4, block = $$props.block);
    		if ("hint" in $$props) $$invalidate(0, hint = $$props.hint);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ block, hint, cssStyle, hide, mounted });

    	$$self.$inject_state = $$props => {
    		if ("block" in $$props) $$invalidate(4, block = $$props.block);
    		if ("hint" in $$props) $$invalidate(0, hint = $$props.hint);
    		if ("cssStyle" in $$props) $$invalidate(2, cssStyle = $$props.cssStyle);
    		if ("hide" in $$props) $$invalidate(1, hide = $$props.hide);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [hint, hide, cssStyle, mounted, block, $$scope, slots];
    }

    class ComponentDetail extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, { block: 4, hint: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ComponentDetail",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get block() {
    		throw new Error("<ComponentDetail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<ComponentDetail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hint() {
    		throw new Error("<ComponentDetail>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hint(value) {
    		throw new Error("<ComponentDetail>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/switch/src/Switch.svelte generated by Svelte v3.32.0 */

    const file$q = "components/switch/src/Switch.svelte";

    function create_fragment$r(ctx) {
    	let span;
    	let input;
    	let t0;
    	let b0;
    	let t1;
    	let b1;
    	let span_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			span = element("span");
    			input = element("input");
    			t0 = space();
    			b0 = element("b");
    			t1 = space();
    			b1 = element("b");
    			attr_dev(input, "type", "checkbox");
    			input.disabled = /*disabled*/ ctx[2];
    			attr_dev(input, "class", "svelte-jn2sb");
    			add_location(input, file$q, 10, 2, 240);
    			attr_dev(b0, "class", "responsive-ui-switch__toggle svelte-jn2sb");
    			add_location(b0, file$q, 11, 2, 302);
    			attr_dev(b1, "class", "responsive-ui-switch__track svelte-jn2sb");
    			add_location(b1, file$q, 12, 2, 347);
    			attr_dev(span, "class", span_class_value = "responsive-ui-switch " + /*className*/ ctx[1] + " svelte-jn2sb");
    			toggle_class(span, "responsive-ui-switch--disabled", /*disabled*/ ctx[2]);
    			add_location(span, file$q, 6, 0, 137);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, input);
    			input.checked = /*checked*/ ctx[0];
    			append_dev(span, t0);
    			append_dev(span, b0);
    			append_dev(span, t1);
    			append_dev(span, b1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[4]),
    					listen_dev(input, "change", /*change_handler*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*disabled*/ 4) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[2]);
    			}

    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (dirty & /*className*/ 2 && span_class_value !== (span_class_value = "responsive-ui-switch " + /*className*/ ctx[1] + " svelte-jn2sb")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*className, disabled*/ 6) {
    				toggle_class(span, "responsive-ui-switch--disabled", /*disabled*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Switch", slots, []);
    	let { class: className = "" } = $$props;
    	let { checked = false } = $$props;
    	let { disabled = false } = $$props;
    	const writable_props = ["class", "checked", "disabled"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Switch> was created with unknown prop '${key}'`);
    	});

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({ className, checked, disabled });

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [checked, className, disabled, change_handler, input_change_handler];
    }

    class Switch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, { class: 1, checked: 0, disabled: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Switch",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get class() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/card/src/Card.svelte generated by Svelte v3.32.0 */

    const file$r = "components/card/src/Card.svelte";

    function create_fragment$s(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "responsive-ui-card " + /*className*/ ctx[0] + " svelte-1t6jx7v");
    			toggle_class(div, "responsive-ui-card--compact", /*compact*/ ctx[1]);
    			add_location(div, file$r, 5, 0, 108);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = "responsive-ui-card " + /*className*/ ctx[0] + " svelte-1t6jx7v")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*className, compact*/ 3) {
    				toggle_class(div, "responsive-ui-card--compact", /*compact*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Card", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { compact = false } = $$props;
    	const writable_props = ["class", "compact"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("compact" in $$props) $$invalidate(1, compact = $$props.compact);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ className, compact });

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("compact" in $$props) $$invalidate(1, compact = $$props.compact);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, compact, $$scope, slots, click_handler];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { class: 0, compact: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get class() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get compact() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set compact(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/input/src/Input.svelte generated by Svelte v3.32.0 */
    const file$s = "components/input/src/Input.svelte";

    function create_fragment$t(ctx) {
    	let input;
    	let input_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "class", input_class_value = "responsive-ui-input " + /*className*/ ctx[2] + " svelte-1huq1z9");
    			attr_dev(input, "style", /*style*/ ctx[12]);
    			attr_dev(input, "name", /*name*/ ctx[3]);
    			attr_dev(input, "type", /*type*/ ctx[4]);
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[6]);
    			input.readOnly = /*readonly*/ ctx[8];
    			attr_dev(input, "maxlength", /*maxlength*/ ctx[9]);
    			attr_dev(input, "size", /*size*/ ctx[10]);
    			input.disabled = /*disabled*/ ctx[7];
    			input.value = /*value*/ ctx[1];
    			input.required = /*required*/ ctx[11];
    			toggle_class(input, "responsive-ui-input--bordered", /*bordered*/ ctx[5]);
    			add_location(input, file$s, 27, 0, 705);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			/*input_binding*/ ctx[16](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "keyup", /*handleKeyup*/ ctx[13], false, false, false),
    					listen_dev(input, "input", /*input_handler*/ ctx[14], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[15], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*className*/ 4 && input_class_value !== (input_class_value = "responsive-ui-input " + /*className*/ ctx[2] + " svelte-1huq1z9")) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (dirty & /*style*/ 4096) {
    				attr_dev(input, "style", /*style*/ ctx[12]);
    			}

    			if (dirty & /*name*/ 8) {
    				attr_dev(input, "name", /*name*/ ctx[3]);
    			}

    			if (dirty & /*type*/ 16) {
    				attr_dev(input, "type", /*type*/ ctx[4]);
    			}

    			if (dirty & /*placeholder*/ 64) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[6]);
    			}

    			if (dirty & /*readonly*/ 256) {
    				prop_dev(input, "readOnly", /*readonly*/ ctx[8]);
    			}

    			if (dirty & /*maxlength*/ 512) {
    				attr_dev(input, "maxlength", /*maxlength*/ ctx[9]);
    			}

    			if (dirty & /*size*/ 1024) {
    				attr_dev(input, "size", /*size*/ ctx[10]);
    			}

    			if (dirty & /*disabled*/ 128) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[7]);
    			}

    			if (dirty & /*value*/ 2 && input.value !== /*value*/ ctx[1]) {
    				prop_dev(input, "value", /*value*/ ctx[1]);
    			}

    			if (dirty & /*required*/ 2048) {
    				prop_dev(input, "required", /*required*/ ctx[11]);
    			}

    			if (dirty & /*className, bordered*/ 36) {
    				toggle_class(input, "responsive-ui-input--bordered", /*bordered*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[16](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Input", slots, []);
    	const dispatch = createEventDispatcher();
    	let { class: className = "" } = $$props;
    	let { ref = null } = $$props;
    	let { name = "" } = $$props;
    	let { type = "text" } = $$props;
    	let { bordered = true } = $$props;
    	let { placeholder = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { readonly = false } = $$props;
    	let { maxlength = 100 } = $$props;
    	let { size = 100 } = $$props;
    	let { required = false } = $$props;
    	let { value = "" } = $$props;
    	let { style = "" } = $$props;

    	const handleKeyup = e => {
    		const v = e.target.value;
    		const key = e.key || e.keyCode;
    		$$invalidate(1, value = v);

    		// when user click enter
    		if (key === "Enter" || key === 13) {
    			dispatch("enter", value);
    		}
    	};

    	const writable_props = [
    		"class",
    		"ref",
    		"name",
    		"type",
    		"bordered",
    		"placeholder",
    		"disabled",
    		"readonly",
    		"maxlength",
    		"size",
    		"required",
    		"value",
    		"style"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Input> was created with unknown prop '${key}'`);
    	});

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(2, className = $$props.class);
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("type" in $$props) $$invalidate(4, type = $$props.type);
    		if ("bordered" in $$props) $$invalidate(5, bordered = $$props.bordered);
    		if ("placeholder" in $$props) $$invalidate(6, placeholder = $$props.placeholder);
    		if ("disabled" in $$props) $$invalidate(7, disabled = $$props.disabled);
    		if ("readonly" in $$props) $$invalidate(8, readonly = $$props.readonly);
    		if ("maxlength" in $$props) $$invalidate(9, maxlength = $$props.maxlength);
    		if ("size" in $$props) $$invalidate(10, size = $$props.size);
    		if ("required" in $$props) $$invalidate(11, required = $$props.required);
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("style" in $$props) $$invalidate(12, style = $$props.style);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		className,
    		ref,
    		name,
    		type,
    		bordered,
    		placeholder,
    		disabled,
    		readonly,
    		maxlength,
    		size,
    		required,
    		value,
    		style,
    		handleKeyup
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(2, className = $$props.className);
    		if ("ref" in $$props) $$invalidate(0, ref = $$props.ref);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("type" in $$props) $$invalidate(4, type = $$props.type);
    		if ("bordered" in $$props) $$invalidate(5, bordered = $$props.bordered);
    		if ("placeholder" in $$props) $$invalidate(6, placeholder = $$props.placeholder);
    		if ("disabled" in $$props) $$invalidate(7, disabled = $$props.disabled);
    		if ("readonly" in $$props) $$invalidate(8, readonly = $$props.readonly);
    		if ("maxlength" in $$props) $$invalidate(9, maxlength = $$props.maxlength);
    		if ("size" in $$props) $$invalidate(10, size = $$props.size);
    		if ("required" in $$props) $$invalidate(11, required = $$props.required);
    		if ("value" in $$props) $$invalidate(1, value = $$props.value);
    		if ("style" in $$props) $$invalidate(12, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ref,
    		value,
    		className,
    		name,
    		type,
    		bordered,
    		placeholder,
    		disabled,
    		readonly,
    		maxlength,
    		size,
    		required,
    		style,
    		handleKeyup,
    		input_handler,
    		change_handler,
    		input_binding
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {
    			class: 2,
    			ref: 0,
    			name: 3,
    			type: 4,
    			bordered: 5,
    			placeholder: 6,
    			disabled: 7,
    			readonly: 8,
    			maxlength: 9,
    			size: 10,
    			required: 11,
    			value: 1,
    			style: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get class() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bordered() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bordered(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maxlength() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxlength(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/input-number/src/InputNumber.svelte generated by Svelte v3.32.0 */

    const file$t = "components/input-number/src/InputNumber.svelte";

    function create_fragment$u(ctx) {
    	let input;
    	let input_class_value;
    	let input_value_value;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			class: input_class_value = "responsive-ui-input-number " + /*className*/ ctx[2]
    		},
    		{
    			value: input_value_value = /*format*/ ctx[7](/*value*/ ctx[1])
    		},
    		{ name: /*name*/ ctx[3] },
    		{ type: "text" },
    		{ pattern: "\\d*" },
    		{ placeholder: /*placeholder*/ ctx[6] },
    		{ disabled: /*disabled*/ ctx[5] },
    		{ readOnly: /*readonly*/ ctx[4] },
    		/*$$restProps*/ ctx[9]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			toggle_class(input, "svelte-8mj4b2", true);
    			add_location(input, file$t, 29, 0, 686);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.value = input_data.value;
    			/*input_binding*/ ctx[17](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*onBlur*/ ctx[8], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[14], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[15], false, false, false),
    					listen_dev(input, "input", /*input_handler*/ ctx[16], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*className*/ 4 && input_class_value !== (input_class_value = "responsive-ui-input-number " + /*className*/ ctx[2]) && { class: input_class_value },
    				dirty & /*format, value*/ 130 && input_value_value !== (input_value_value = /*format*/ ctx[7](/*value*/ ctx[1])) && input.value !== input_value_value && { value: input_value_value },
    				dirty & /*name*/ 8 && { name: /*name*/ ctx[3] },
    				{ type: "text" },
    				{ pattern: "\\d*" },
    				dirty & /*placeholder*/ 64 && { placeholder: /*placeholder*/ ctx[6] },
    				dirty & /*disabled*/ 32 && { disabled: /*disabled*/ ctx[5] },
    				dirty & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			if ("value" in input_data) {
    				input.value = input_data.value;
    			}

    			toggle_class(input, "svelte-8mj4b2", true);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[17](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"class","ref","name","precision","min","max","readonly","disabled","placeholder","parser","format","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("InputNumber", slots, []);
    	let { class: className = "" } = $$props;
    	let { ref = null } = $$props;
    	let { name = "" } = $$props;
    	let { precision = 2 } = $$props;
    	let { min = 0 } = $$props;
    	let { max = 100 } = $$props;
    	let { readonly = false } = $$props;
    	let { disabled = false } = $$props;
    	let { placeholder = "" } = $$props;
    	let { parser = v => parseFloat(v) } = $$props;
    	let { format = v => v.toPrecision(precision) } = $$props;
    	let { value = 0 } = $$props;

    	const onBlur = e => {
    		const v = e.currentTarget.value.trim();

    		if (v === "") {
    			$$invalidate(0, ref.value = "", ref);
    			return;
    		}

    		let num = parser(v);
    		if (num < min) num = min; else if (num > max) num = max;
    		$$invalidate(1, value = num);
    		$$invalidate(0, ref.value = format(num), ref);
    	};

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ("ref" in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ("name" in $$new_props) $$invalidate(3, name = $$new_props.name);
    		if ("precision" in $$new_props) $$invalidate(10, precision = $$new_props.precision);
    		if ("min" in $$new_props) $$invalidate(11, min = $$new_props.min);
    		if ("max" in $$new_props) $$invalidate(12, max = $$new_props.max);
    		if ("readonly" in $$new_props) $$invalidate(4, readonly = $$new_props.readonly);
    		if ("disabled" in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ("placeholder" in $$new_props) $$invalidate(6, placeholder = $$new_props.placeholder);
    		if ("parser" in $$new_props) $$invalidate(13, parser = $$new_props.parser);
    		if ("format" in $$new_props) $$invalidate(7, format = $$new_props.format);
    		if ("value" in $$new_props) $$invalidate(1, value = $$new_props.value);
    	};

    	$$self.$capture_state = () => ({
    		className,
    		ref,
    		name,
    		precision,
    		min,
    		max,
    		readonly,
    		disabled,
    		placeholder,
    		parser,
    		format,
    		value,
    		onBlur
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    		if ("ref" in $$props) $$invalidate(0, ref = $$new_props.ref);
    		if ("name" in $$props) $$invalidate(3, name = $$new_props.name);
    		if ("precision" in $$props) $$invalidate(10, precision = $$new_props.precision);
    		if ("min" in $$props) $$invalidate(11, min = $$new_props.min);
    		if ("max" in $$props) $$invalidate(12, max = $$new_props.max);
    		if ("readonly" in $$props) $$invalidate(4, readonly = $$new_props.readonly);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ("placeholder" in $$props) $$invalidate(6, placeholder = $$new_props.placeholder);
    		if ("parser" in $$props) $$invalidate(13, parser = $$new_props.parser);
    		if ("format" in $$props) $$invalidate(7, format = $$new_props.format);
    		if ("value" in $$props) $$invalidate(1, value = $$new_props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		ref,
    		value,
    		className,
    		name,
    		readonly,
    		disabled,
    		placeholder,
    		format,
    		onBlur,
    		$$restProps,
    		precision,
    		min,
    		max,
    		parser,
    		blur_handler,
    		change_handler,
    		input_handler,
    		input_binding
    	];
    }

    class InputNumber extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {
    			class: 2,
    			ref: 0,
    			name: 3,
    			precision: 10,
    			min: 11,
    			max: 12,
    			readonly: 4,
    			disabled: 5,
    			placeholder: 6,
    			parser: 13,
    			format: 7,
    			value: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InputNumber",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get class() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get precision() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set precision(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get parser() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set parser(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get format() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set format(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<InputNumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<InputNumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/poster/src/Poster.svelte generated by Svelte v3.32.0 */

    const file$u = "components/poster/src/Poster.svelte";

    function create_fragment$v(ctx) {
    	let div1;
    	let div0;
    	let div0_style_value;
    	let div1_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "class", "responsive-ui-poster__overlay svelte-mehq20");
    			attr_dev(div0, "style", div0_style_value = `opacity:${/*opacity*/ ctx[6]};`);
    			add_location(div0, file$u, 30, 2, 686);
    			attr_dev(div1, "class", "responsive-ui-poster svelte-mehq20");
    			attr_dev(div1, "style", div1_style_value = `background-image:url(${/*src*/ ctx[2]});width:${/*width*/ ctx[0]};height:${/*height*/ ctx[1]};${/*style*/ ctx[5]}`);
    			toggle_class(div1, "responsive-ui-poster--shadow", /*shadow*/ ctx[3]);
    			toggle_class(div1, "responsive-ui-poster--rounded", /*rounded*/ ctx[4]);
    			add_location(div1, file$u, 23, 0, 459);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*opacity*/ 64 && div0_style_value !== (div0_style_value = `opacity:${/*opacity*/ ctx[6]};`)) {
    				attr_dev(div0, "style", div0_style_value);
    			}

    			if (dirty & /*src, width, height, style*/ 39 && div1_style_value !== (div1_style_value = `background-image:url(${/*src*/ ctx[2]});width:${/*width*/ ctx[0]};height:${/*height*/ ctx[1]};${/*style*/ ctx[5]}`)) {
    				attr_dev(div1, "style", div1_style_value);
    			}

    			if (dirty & /*shadow*/ 8) {
    				toggle_class(div1, "responsive-ui-poster--shadow", /*shadow*/ ctx[3]);
    			}

    			if (dirty & /*rounded*/ 16) {
    				toggle_class(div1, "responsive-ui-poster--rounded", /*rounded*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Poster", slots, []);
    	let { src = "" } = $$props;
    	let { width = "110px" } = $$props;
    	let { height = "150px" } = $$props;
    	let { shadow = true } = $$props;
    	let { rounded = true } = $$props;
    	let { size = "middle" } = $$props;
    	let { style = "" } = $$props;
    	let opacity = 1;
    	const img = new Image();

    	img.onload = () => {
    		$$invalidate(6, opacity = 0);
    	};

    	if (size === "small") {
    		width = "80px";
    		height = "115px";
    	} else if (size === "extra-small") {
    		width = "70px";
    		height = "100px";
    	}

    	const writable_props = ["src", "width", "height", "shadow", "rounded", "size", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Poster> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("src" in $$props) $$invalidate(2, src = $$props.src);
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    		if ("height" in $$props) $$invalidate(1, height = $$props.height);
    		if ("shadow" in $$props) $$invalidate(3, shadow = $$props.shadow);
    		if ("rounded" in $$props) $$invalidate(4, rounded = $$props.rounded);
    		if ("size" in $$props) $$invalidate(7, size = $$props.size);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    	};

    	$$self.$capture_state = () => ({
    		src,
    		width,
    		height,
    		shadow,
    		rounded,
    		size,
    		style,
    		opacity,
    		img
    	});

    	$$self.$inject_state = $$props => {
    		if ("src" in $$props) $$invalidate(2, src = $$props.src);
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    		if ("height" in $$props) $$invalidate(1, height = $$props.height);
    		if ("shadow" in $$props) $$invalidate(3, shadow = $$props.shadow);
    		if ("rounded" in $$props) $$invalidate(4, rounded = $$props.rounded);
    		if ("size" in $$props) $$invalidate(7, size = $$props.size);
    		if ("style" in $$props) $$invalidate(5, style = $$props.style);
    		if ("opacity" in $$props) $$invalidate(6, opacity = $$props.opacity);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*src*/ 4) {
    			 img.src = src;
    		}
    	};

    	return [width, height, src, shadow, rounded, style, opacity, size, click_handler];
    }

    class Poster extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {
    			src: 2,
    			width: 0,
    			height: 1,
    			shadow: 3,
    			rounded: 4,
    			size: 7,
    			style: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Poster",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get src() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shadow() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shadow(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rounded() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rounded(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Poster>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Poster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/responsive/src/Responsive.svelte generated by Svelte v3.32.0 */

    const { Object: Object_1$3 } = globals;

    const get_default_slot_changes$3 = dirty => ({
    	aspectRatio: dirty & /*$store$*/ 1,
    	orientation: dirty & /*$store$*/ 1
    });

    const get_default_slot_context$3 = ctx => ({
    	aspectRatio: /*$store$*/ ctx[0].aspectRatio,
    	orientation: /*$store$*/ ctx[0].orientation
    });

    function create_fragment$w(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], get_default_slot_context$3);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, $store$*/ 5) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, get_default_slot_changes$3, get_default_slot_context$3);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }



    const queue$3 = [];

    if (window.screen.orientation) {
    	window.screen.orientation.addEventListener("change", () => {
    		queue$3.forEach(store => {
    			store.update(v => Object.assign(v, { orientation: screen.orientation.type }));
    		});
    	});
    }

    // landscape and portrait
    window.addEventListener("resize", () => {
    	const { width, height } = screen;

    	queue$3.forEach(store => {
    		store.update(v => Object.assign(v, {
    			aspectRatio: width / height,
    			width,
    			height
    		}));
    	});
    });

    const createStore = () => {
    	const { width, height } = screen;

    	const store$ = writable({
    		orientation: screen.orientation.type,
    		aspectRatio: width / height
    	});

    	queue$3.push(store$);
    	return store$;
    };

    function instance$w($$self, $$props, $$invalidate) {
    	let $store$;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Responsive", slots, ['default']);
    	const store$ = createStore();
    	validate_store(store$, "store$");
    	component_subscribe($$self, store$, value => $$invalidate(0, $store$ = value));
    	const writable_props = [];

    	Object_1$3.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Responsive> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		writable,
    		queue: queue$3,
    		createStore,
    		store$,
    		$store$
    	});

    	return [$store$, store$, $$scope, slots];
    }

    class Responsive extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Responsive",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    /* components/ellipsis/src/Ellipsis.svelte generated by Svelte v3.32.0 */

    const file$v = "components/ellipsis/src/Ellipsis.svelte";

    // (8:8) {text}
    function fallback_block$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*text*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$6.name,
    		type: "fallback",
    		source: "(8:8) {text}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let p;
    	let p_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	const default_slot_or_fallback = default_slot || fallback_block$6(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(p, "class", p_class_value = "responsive-ui-ellipsis " + /*className*/ ctx[0] + " svelte-1yuypcz");
    			attr_dev(p, "style", /*style*/ ctx[2]);
    			add_location(p, file$v, 6, 0, 125);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(p, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(p, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*text*/ 2) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (!current || dirty & /*className*/ 1 && p_class_value !== (p_class_value = "responsive-ui-ellipsis " + /*className*/ ctx[0] + " svelte-1yuypcz")) {
    				attr_dev(p, "class", p_class_value);
    			}

    			if (!current || dirty & /*style*/ 4) {
    				attr_dev(p, "style", /*style*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Ellipsis", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { text = "" } = $$props;
    	let { style = "" } = $$props;
    	const writable_props = ["class", "text", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Ellipsis> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ className, text, style });

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, text, style, $$scope, slots, click_handler];
    }

    class Ellipsis extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, { class: 0, text: 1, style: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ellipsis",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get class() {
    		throw new Error("<Ellipsis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Ellipsis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Ellipsis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Ellipsis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Ellipsis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Ellipsis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/link/src/Link.svelte generated by Svelte v3.32.0 */

    const file$w = "components/link/src/Link.svelte";

    function create_fragment$y(ctx) {
    	let a;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "class", "responsive-ui-link svelte-h64lec");
    			attr_dev(a, "title", /*title*/ ctx[0]);
    			attr_dev(a, "href", /*href*/ ctx[1]);
    			add_location(a, file$w, 11, 0, 280);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*title*/ 1) {
    				attr_dev(a, "title", /*title*/ ctx[0]);
    			}

    			if (!current || dirty & /*href*/ 2) {
    				attr_dev(a, "href", /*href*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Link", slots, ['default']);
    	let { title = "" } = $$props;
    	let { href = "" } = $$props;
    	const writable_props = ["title", "href"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Link> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("href" in $$props) $$invalidate(1, href = $$props.href);
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ title, href });

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    		if ("href" in $$props) $$invalidate(1, href = $$props.href);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, href, $$scope, slots];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, { title: 0, href: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get title() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/select/src/MultipleSelect.svelte generated by Svelte v3.32.0 */
    const file$x = "components/select/src/MultipleSelect.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	child_ctx[20] = i;
    	return child_ctx;
    }

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (57:6) {#each items as item}
    function create_each_block_1$3(ctx) {
    	let span2;
    	let span0;
    	let t0_value = /*item*/ ctx[18].title + "";
    	let t0;
    	let t1;
    	let span1;
    	let svg;
    	let g;
    	let path;
    	let span1_data_value_value;
    	let span2_intro;
    	let span2_outro;
    	let current;

    	const block = {
    		c: function create() {
    			span2 = element("span");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			add_location(span0, file$x, 58, 10, 1666);
    			attr_dev(path, "d", "M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717\n        L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859\n        c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287\n        l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285\n        L284.286,256.002z");
    			add_location(path, file$x, 74, 16, 2196);
    			add_location(g, file$x, 73, 14, 2176);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "viewBox", "0 0 512.001 512.001");
    			set_style(svg, "enable-background", "new 0 0 512.001 512.001");
    			attr_dev(svg, "xml:space", "preserve");
    			attr_dev(svg, "class", "svelte-16jkoyz");
    			add_location(svg, file$x, 63, 12, 1821);
    			attr_dev(span1, "class", "responsive-ui-select__close-icon svelte-16jkoyz");
    			attr_dev(span1, "data-value", span1_data_value_value = /*item*/ ctx[18].value);
    			add_location(span1, file$x, 59, 10, 1702);
    			attr_dev(span2, "class", "responsive-ui-select__tag svelte-16jkoyz");
    			add_location(span2, file$x, 57, 8, 1598);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span2, anchor);
    			append_dev(span2, span0);
    			append_dev(span0, t0);
    			append_dev(span2, t1);
    			append_dev(span2, span1);
    			append_dev(span1, svg);
    			append_dev(svg, g);
    			append_dev(g, path);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*items*/ 32) && t0_value !== (t0_value = /*item*/ ctx[18].title + "")) set_data_dev(t0, t0_value);

    			if (!current || dirty & /*items*/ 32 && span1_data_value_value !== (span1_data_value_value = /*item*/ ctx[18].value)) {
    				attr_dev(span1, "data-value", span1_data_value_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (span2_outro) span2_outro.end(1);
    				if (!span2_intro) span2_intro = create_in_transition(span2, zoom, {});
    				span2_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (span2_intro) span2_intro.invalidate();
    			span2_outro = create_out_transition(span2, zoom, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span2);
    			if (detaching && span2_outro) span2_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(57:6) {#each items as item}",
    		ctx
    	});

    	return block;
    }

    // (103:6) {#each options as item, i}
    function create_each_block$7(ctx) {
    	let div;
    	let t0_value = (/*item*/ ctx[18].title || "") + "";
    	let t0;
    	let t1;
    	let div_data_option_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "responsive-ui-select__option svelte-16jkoyz");
    			attr_dev(div, "data-option", div_data_option_value = JSON.stringify([/*i*/ ctx[20], /*item*/ ctx[18]]));
    			toggle_class(div, "responsive-ui-select__option--disabled", /*item*/ ctx[18].disabled);
    			add_location(div, file$x, 103, 8, 3256);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options*/ 1 && t0_value !== (t0_value = (/*item*/ ctx[18].title || "") + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*options*/ 1 && div_data_option_value !== (div_data_option_value = JSON.stringify([/*i*/ ctx[20], /*item*/ ctx[18]]))) {
    				attr_dev(div, "data-option", div_data_option_value);
    			}

    			if (dirty & /*options*/ 1) {
    				toggle_class(div, "responsive-ui-select__option--disabled", /*item*/ ctx[18].disabled);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(103:6) {#each options as item, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let div3;
    	let div0;
    	let input0;
    	let input0_value_value;
    	let t0;
    	let span;
    	let t1;
    	let input1;
    	let t2;
    	let div2;
    	let div1;
    	let div1_resize_listener;
    	let div2_style_value;
    	let div3_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*items*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*options*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			span = element("span");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t1 = space();
    			input1 = element("input");
    			t2 = space();
    			div2 = element("div");
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(input0, "name", /*name*/ ctx[2]);
    			attr_dev(input0, "type", "hidden");
    			input0.value = input0_value_value = /*items*/ ctx[5].reduce(func, "");
    			add_location(input0, file$x, 47, 4, 1322);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "autocomplete", "off");
    			input1.disabled = /*disabled*/ ctx[3];
    			input1.readOnly = /*readonly*/ ctx[4];
    			attr_dev(input1, "class", "svelte-16jkoyz");
    			add_location(input1, file$x, 86, 6, 2843);
    			attr_dev(span, "class", "responsive-ui-select__tags svelte-16jkoyz");
    			add_location(span, file$x, 55, 4, 1500);
    			attr_dev(div0, "class", "responsive-ui-select-input svelte-16jkoyz");
    			add_location(div0, file$x, 46, 2, 1258);
    			set_style(div1, "padding", "10px 0");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[17].call(div1));
    			add_location(div1, file$x, 101, 4, 3168);
    			attr_dev(div2, "class", "responsive-ui-select__dropdown svelte-16jkoyz");
    			attr_dev(div2, "style", div2_style_value = `height:${/*show*/ ctx[7] ? /*clientHeight*/ ctx[8] : 0}px; max-height: ${/*maxHeight*/ ctx[9]}px;`);
    			add_location(div2, file$x, 96, 2, 3009);
    			attr_dev(div3, "class", div3_class_value = "responsive-ui-select--multiple " + /*className*/ ctx[1] + " svelte-16jkoyz");
    			add_location(div3, file$x, 45, 0, 1199);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div0, input0);
    			append_dev(div0, t0);
    			append_dev(div0, span);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(span, null);
    			}

    			append_dev(span, t1);
    			append_dev(span, input1);
    			/*input1_binding*/ ctx[16](input1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[17].bind(div1));
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input1, "blur", /*blur_handler*/ ctx[15], false, false, false),
    					listen_dev(span, "click", /*onRemove*/ ctx[12], false, false, false),
    					listen_dev(div0, "click", /*onClick*/ ctx[11], false, false, false),
    					listen_dev(div2, "click", /*onSelect*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 4) {
    				attr_dev(input0, "name", /*name*/ ctx[2]);
    			}

    			if (!current || dirty & /*items*/ 32 && input0_value_value !== (input0_value_value = /*items*/ ctx[5].reduce(func, ""))) {
    				prop_dev(input0, "value", input0_value_value);
    			}

    			if (dirty & /*items*/ 32) {
    				each_value_1 = /*items*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1$3(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(span, t1);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*disabled*/ 8) {
    				prop_dev(input1, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (!current || dirty & /*readonly*/ 16) {
    				prop_dev(input1, "readOnly", /*readonly*/ ctx[4]);
    			}

    			if (dirty & /*JSON, options*/ 1) {
    				each_value = /*options*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*show, clientHeight*/ 384 && div2_style_value !== (div2_style_value = `height:${/*show*/ ctx[7] ? /*clientHeight*/ ctx[8] : 0}px; max-height: ${/*maxHeight*/ ctx[9]}px;`)) {
    				attr_dev(div2, "style", div2_style_value);
    			}

    			if (!current || dirty & /*className*/ 2 && div3_class_value !== (div3_class_value = "responsive-ui-select--multiple " + /*className*/ ctx[1] + " svelte-16jkoyz")) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks_1, detaching);
    			/*input1_binding*/ ctx[16](null);
    			destroy_each(each_blocks, detaching);
    			div1_resize_listener();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = (acc, { value }, i) => {
    	if (i > 0) acc += ",";
    	return acc += value;
    };

    function instance$z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MultipleSelect", slots, []);
    	
    	let { class: className = "" } = $$props;
    	let { name = "" } = $$props;
    	let { options = [] } = $$props;
    	let { size = 10 } = $$props;
    	let { value = [] } = $$props;
    	let { disabled = false } = $$props;
    	let { readonly = false } = $$props;
    	const maxHeight = 25 + size * 20;
    	let items = [];
    	let input;
    	let show = false;
    	let clientHeight = 0;

    	const onSelect = e => {
    		const data = x(e, "data-option");

    		if (data) {
    			const [index, item] = JSON.parse(data);
    			const pos = items.findIndex(v => v.value === item.value);

    			if (pos > -1) {
    				// options[index].selected = false;
    				$$invalidate(5, items = items.filter(v => v.value !== item.value));
    			} else {
    				// options[index].selected = true;
    				$$invalidate(5, items = [...items, item]);
    			}

    			$$invalidate(0, options = [...options]);
    			input && input.focus();
    		}
    	};

    	const onClick = () => {
    		$$invalidate(7, show = !show);
    	};

    	const onRemove = e => {
    		const value = x(e, "data-value");

    		if (value) {
    			e.stopPropagation();
    			$$invalidate(5, items = items.filter(v => v.value !== value));
    		}
    	};

    	const writable_props = ["class", "name", "options", "size", "value", "disabled", "readonly"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MultipleSelect> was created with unknown prop '${key}'`);
    	});

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function input1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			input = $$value;
    			$$invalidate(6, input);
    		});
    	}

    	function div1_elementresize_handler() {
    		clientHeight = this.clientHeight;
    		$$invalidate(8, clientHeight);
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(1, className = $$props.class);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    		if ("options" in $$props) $$invalidate(0, options = $$props.options);
    		if ("size" in $$props) $$invalidate(13, size = $$props.size);
    		if ("value" in $$props) $$invalidate(14, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("readonly" in $$props) $$invalidate(4, readonly = $$props.readonly);
    	};

    	$$self.$capture_state = () => ({
    		zoom,
    		getNodeAttribute: x,
    		className,
    		name,
    		options,
    		size,
    		value,
    		disabled,
    		readonly,
    		maxHeight,
    		items,
    		input,
    		show,
    		clientHeight,
    		onSelect,
    		onClick,
    		onRemove
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(1, className = $$props.className);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    		if ("options" in $$props) $$invalidate(0, options = $$props.options);
    		if ("size" in $$props) $$invalidate(13, size = $$props.size);
    		if ("value" in $$props) $$invalidate(14, value = $$props.value);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("readonly" in $$props) $$invalidate(4, readonly = $$props.readonly);
    		if ("items" in $$props) $$invalidate(5, items = $$props.items);
    		if ("input" in $$props) $$invalidate(6, input = $$props.input);
    		if ("show" in $$props) $$invalidate(7, show = $$props.show);
    		if ("clientHeight" in $$props) $$invalidate(8, clientHeight = $$props.clientHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		options,
    		className,
    		name,
    		disabled,
    		readonly,
    		items,
    		input,
    		show,
    		clientHeight,
    		maxHeight,
    		onSelect,
    		onClick,
    		onRemove,
    		size,
    		value,
    		blur_handler,
    		input1_binding,
    		div1_elementresize_handler
    	];
    }

    class MultipleSelect extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {
    			class: 1,
    			name: 2,
    			options: 0,
    			size: 13,
    			value: 14,
    			disabled: 3,
    			readonly: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MultipleSelect",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get class() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<MultipleSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<MultipleSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/select/src/Select.svelte generated by Svelte v3.32.0 */
    const file$y = "components/select/src/Select.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (19:0) {:else}
    function create_else_block$7(ctx) {
    	let select;
    	let select_class_value;
    	let mounted;
    	let dispose;
    	let each_value = /*options*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(select, "class", select_class_value = "responsive-ui-select " + /*className*/ ctx[1] + " svelte-1dzclgi");
    			attr_dev(select, "name", /*name*/ ctx[2]);
    			attr_dev(select, "size", /*size*/ ctx[0]);
    			attr_dev(select, "readonly", /*readonly*/ ctx[6]);
    			select.disabled = /*disabled*/ ctx[5];
    			add_location(select, file$y, 19, 2, 470);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*change_handler_1*/ ctx[9], false, false, false),
    					listen_dev(select, "blur", /*blur_handler_1*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options, value*/ 136) {
    				each_value = /*options*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*className*/ 2 && select_class_value !== (select_class_value = "responsive-ui-select " + /*className*/ ctx[1] + " svelte-1dzclgi")) {
    				attr_dev(select, "class", select_class_value);
    			}

    			if (dirty & /*name*/ 4) {
    				attr_dev(select, "name", /*name*/ ctx[2]);
    			}

    			if (dirty & /*size*/ 1) {
    				attr_dev(select, "size", /*size*/ ctx[0]);
    			}

    			if (dirty & /*readonly*/ 64) {
    				attr_dev(select, "readonly", /*readonly*/ ctx[6]);
    			}

    			if (dirty & /*disabled*/ 32) {
    				prop_dev(select, "disabled", /*disabled*/ ctx[5]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(19:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (17:0) {#if multiple}
    function create_if_block$g(ctx) {
    	let select;
    	let current;
    	const select_spread_levels = [/*$$props*/ ctx[8], { size: /*size*/ ctx[0] }, { class: /*className*/ ctx[1] }];
    	let select_props = {};

    	for (let i = 0; i < select_spread_levels.length; i += 1) {
    		select_props = assign(select_props, select_spread_levels[i]);
    	}

    	select = new MultipleSelect({ props: select_props, $$inline: true });
    	select.$on("change", /*change_handler*/ ctx[11]);
    	select.$on("blur", /*blur_handler*/ ctx[12]);

    	const block = {
    		c: function create() {
    			create_component(select.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(select, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const select_changes = (dirty & /*$$props, size, className*/ 259)
    			? get_spread_update(select_spread_levels, [
    					dirty & /*$$props*/ 256 && get_spread_object(/*$$props*/ ctx[8]),
    					dirty & /*size*/ 1 && { size: /*size*/ ctx[0] },
    					dirty & /*className*/ 2 && { class: /*className*/ ctx[1] }
    				])
    			: {};

    			select.$set(select_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(select.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(select.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(select, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$g.name,
    		type: "if",
    		source: "(17:0) {#if multiple}",
    		ctx
    	});

    	return block;
    }

    // (29:4) {#each options as option}
    function create_each_block$8(ctx) {
    	let option;
    	let t_value = /*option*/ ctx[13].title + "";
    	let t;
    	let option_value_value;
    	let option_selected_value;
    	let option_disabled_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*option*/ ctx[13].value;
    			option.value = option.__value;
    			option.selected = option_selected_value = /*option*/ ctx[13].value === /*value*/ ctx[3];
    			option.disabled = option_disabled_value = /*option*/ ctx[13].disabled;
    			add_location(option, file$y, 29, 6, 641);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options*/ 128 && t_value !== (t_value = /*option*/ ctx[13].title + "")) set_data_dev(t, t_value);

    			if (dirty & /*options*/ 128 && option_value_value !== (option_value_value = /*option*/ ctx[13].value)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}

    			if (dirty & /*options, value*/ 136 && option_selected_value !== (option_selected_value = /*option*/ ctx[13].value === /*value*/ ctx[3])) {
    				prop_dev(option, "selected", option_selected_value);
    			}

    			if (dirty & /*options*/ 128 && option_disabled_value !== (option_disabled_value = /*option*/ ctx[13].disabled)) {
    				prop_dev(option, "disabled", option_disabled_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(29:4) {#each options as option}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$A(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$g, create_else_block$7];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*multiple*/ ctx[4]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Select", slots, []);
    	
    	let { class: className = "" } = $$props;
    	let { name = "" } = $$props;
    	let { value = "" } = $$props;
    	let { size = 1 } = $$props;
    	let { multiple = false } = $$props;
    	let { disabled = false } = $$props;
    	let { readonly = false } = $$props;
    	let { options = [] } = $$props;

    	// if not multiple, enforce it to size 1
    	if (!multiple) size = 1;

    	function change_handler_1(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    		if ("name" in $$new_props) $$invalidate(2, name = $$new_props.name);
    		if ("value" in $$new_props) $$invalidate(3, value = $$new_props.value);
    		if ("size" in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ("multiple" in $$new_props) $$invalidate(4, multiple = $$new_props.multiple);
    		if ("disabled" in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ("readonly" in $$new_props) $$invalidate(6, readonly = $$new_props.readonly);
    		if ("options" in $$new_props) $$invalidate(7, options = $$new_props.options);
    	};

    	$$self.$capture_state = () => ({
    		Select: MultipleSelect,
    		className,
    		name,
    		value,
    		size,
    		multiple,
    		disabled,
    		readonly,
    		options
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(8, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    		if ("name" in $$props) $$invalidate(2, name = $$new_props.name);
    		if ("value" in $$props) $$invalidate(3, value = $$new_props.value);
    		if ("size" in $$props) $$invalidate(0, size = $$new_props.size);
    		if ("multiple" in $$props) $$invalidate(4, multiple = $$new_props.multiple);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ("readonly" in $$props) $$invalidate(6, readonly = $$new_props.readonly);
    		if ("options" in $$props) $$invalidate(7, options = $$new_props.options);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);

    	return [
    		size,
    		className,
    		name,
    		value,
    		multiple,
    		disabled,
    		readonly,
    		options,
    		$$props,
    		change_handler_1,
    		blur_handler_1,
    		change_handler,
    		blur_handler
    	];
    }

    class Select_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {
    			class: 1,
    			name: 2,
    			value: 3,
    			size: 0,
    			multiple: 4,
    			disabled: 5,
    			readonly: 6,
    			options: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Select_1",
    			options,
    			id: create_fragment$A.name
    		});
    	}

    	get class() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Online.svelte generated by Svelte v3.32.0 */

    const file$z = "src/components/Online.svelte";

    function create_fragment$B(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", "circle svelte-1vm43wa");
    			toggle_class(span, "online", /*online*/ ctx[0]);
    			add_location(span, file$z, 16, 0, 287);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*online*/ 1) {
    				toggle_class(span, "online", /*online*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Online", slots, []);
    	let { online = false } = $$props;
    	console.log("Props =>", $$props);

    	$$self.$$set = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("online" in $$new_props) $$invalidate(0, online = $$new_props.online);
    	};

    	$$self.$capture_state = () => ({ online });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
    		if ("online" in $$props) $$invalidate(0, online = $$new_props.online);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [online];
    }

    class Online extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, { online: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Online",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get online() {
    		throw new Error("<Online>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set online(value) {
    		throw new Error("<Online>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Logo.svelte generated by Svelte v3.32.0 */

    const file$A = "src/components/Logo.svelte";

    function create_fragment$C(ctx) {
    	let span;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			img = element("img");
    			if (img.src !== (img_src_value = "https://cdn.worldvectorlogo.com/logos/flutter-logo.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "no image.");
    			attr_dev(img, "class", "svelte-1xrcov");
    			add_location(img, file$A, 1, 3, 22);
    			attr_dev(span, "class", "logo svelte-1xrcov");
    			add_location(span, file$A, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, img);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Logo", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Logo> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment$C.name
    		});
    	}
    }

    /* components/show-more/src/ShowMore.svelte generated by Svelte v3.32.0 */
    const file$B = "components/show-more/src/ShowMore.svelte";
    const get_trigger_slot_changes = dirty => ({});
    const get_trigger_slot_context = ctx => ({});

    // (26:8)      
    function fallback_block_1$1(ctx) {
    	let p;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(/*text*/ ctx[1]);
    			attr_dev(p, "class", "svelte-iq0hii");
    			add_location(p, file$B, 26, 4, 672);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1$1.name,
    		type: "fallback",
    		source: "(26:8)      ",
    		ctx
    	});

    	return block;
    }

    // (30:0) {#if isExtensible}
    function create_if_block$h(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const trigger_slot_template = /*#slots*/ ctx[11].trigger;
    	const trigger_slot = create_slot(trigger_slot_template, ctx, /*$$scope*/ ctx[10], get_trigger_slot_context);
    	const trigger_slot_or_fallback = trigger_slot || fallback_block$7(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (trigger_slot_or_fallback) trigger_slot_or_fallback.c();
    			attr_dev(div, "class", "responsive-ui-show-more__trigger svelte-iq0hii");
    			add_location(div, file$B, 30, 2, 724);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (trigger_slot_or_fallback) {
    				trigger_slot_or_fallback.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*handleClick*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (trigger_slot) {
    				if (trigger_slot.p && dirty & /*$$scope*/ 1024) {
    					update_slot(trigger_slot, trigger_slot_template, ctx, /*$$scope*/ ctx[10], dirty, get_trigger_slot_changes, get_trigger_slot_context);
    				}
    			} else {
    				if (trigger_slot_or_fallback && trigger_slot_or_fallback.p && dirty & /*isExpanded*/ 32) {
    					trigger_slot_or_fallback.p(ctx, dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(trigger_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(trigger_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (trigger_slot_or_fallback) trigger_slot_or_fallback.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$h.name,
    		type: "if",
    		source: "(30:0) {#if isExtensible}",
    		ctx
    	});

    	return block;
    }

    // (32:25) {isExpanded ? "- Less" : "+ More"}
    function fallback_block$7(ctx) {
    	let t_value = (/*isExpanded*/ ctx[5] ? "- Less" : "+ More") + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*isExpanded*/ 32 && t_value !== (t_value = (/*isExpanded*/ ctx[5] ? "- Less" : "+ More") + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$7.name,
    		type: "fallback",
    		source: "(32:25) {isExpanded ? \\\"- Less\\\" : \\\"+ More\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$D(ctx) {
    	let div;
    	let div_class_value;
    	let div_style_value;
    	let div_resize_listener;
    	let t;
    	let if_block_anchor;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	const default_slot_or_fallback = default_slot || fallback_block_1$1(ctx);
    	let if_block = /*isExtensible*/ ctx[6] && create_if_block$h(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(div, "class", div_class_value = "responsive-ui-show-more " + /*className*/ ctx[0] + " svelte-iq0hii");
    			attr_dev(div, "style", div_style_value = `height:${/*updatedHeight*/ ctx[3]}px;${/*style*/ ctx[2]}`);
    			add_render_callback(() => /*div_elementresize_handler*/ ctx[12].call(div));
    			add_location(div, file$B, 20, 0, 539);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(div, null);
    			}

    			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[12].bind(div));
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1024) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[10], dirty, null, null);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*text*/ 2) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = "responsive-ui-show-more " + /*className*/ ctx[0] + " svelte-iq0hii")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*updatedHeight, style*/ 12 && div_style_value !== (div_style_value = `height:${/*updatedHeight*/ ctx[3]}px;${/*style*/ ctx[2]}`)) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (/*isExtensible*/ ctx[6]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isExtensible*/ 64) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$h(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			div_resize_listener();
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let isExpanded;
    	let isExtensible;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ShowMore", slots, ['default','trigger']);
    	let { class: className = "" } = $$props;
    	let { text = "" } = $$props;
    	let { threshold = 100 } = $$props;
    	let { style = "" } = $$props;
    	let updatedHeight = "auto";
    	let height = 0;
    	let clientHeight = 0;

    	const handleClick = () => {
    		$$invalidate(3, updatedHeight = updatedHeight !== height ? height : threshold);
    	};

    	onMount(() => {
    		$$invalidate(9, height = clientHeight);
    		$$invalidate(3, updatedHeight = threshold > height ? height : threshold);
    	});

    	const writable_props = ["class", "text", "threshold", "style"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ShowMore> was created with unknown prop '${key}'`);
    	});

    	function div_elementresize_handler() {
    		clientHeight = this.clientHeight;
    		$$invalidate(4, clientHeight);
    	}

    	$$self.$$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, className = $$props.class);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("threshold" in $$props) $$invalidate(8, threshold = $$props.threshold);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("$$scope" in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		className,
    		text,
    		threshold,
    		style,
    		updatedHeight,
    		height,
    		clientHeight,
    		handleClick,
    		isExpanded,
    		isExtensible
    	});

    	$$self.$inject_state = $$props => {
    		if ("className" in $$props) $$invalidate(0, className = $$props.className);
    		if ("text" in $$props) $$invalidate(1, text = $$props.text);
    		if ("threshold" in $$props) $$invalidate(8, threshold = $$props.threshold);
    		if ("style" in $$props) $$invalidate(2, style = $$props.style);
    		if ("updatedHeight" in $$props) $$invalidate(3, updatedHeight = $$props.updatedHeight);
    		if ("height" in $$props) $$invalidate(9, height = $$props.height);
    		if ("clientHeight" in $$props) $$invalidate(4, clientHeight = $$props.clientHeight);
    		if ("isExpanded" in $$props) $$invalidate(5, isExpanded = $$props.isExpanded);
    		if ("isExtensible" in $$props) $$invalidate(6, isExtensible = $$props.isExtensible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*updatedHeight, height*/ 520) {
    			 $$invalidate(5, isExpanded = updatedHeight === height);
    		}

    		if ($$self.$$.dirty & /*threshold, height*/ 768) {
    			 $$invalidate(6, isExtensible = threshold < height);
    		}
    	};

    	return [
    		className,
    		text,
    		style,
    		updatedHeight,
    		clientHeight,
    		isExpanded,
    		isExtensible,
    		handleClick,
    		threshold,
    		height,
    		$$scope,
    		slots,
    		div_elementresize_handler
    	];
    }

    class ShowMore extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$D, create_fragment$D, safe_not_equal, {
    			class: 0,
    			text: 1,
    			threshold: 8,
    			style: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ShowMore",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get class() {
    		throw new Error("<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get threshold() {
    		throw new Error("<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set threshold(value) {
    		throw new Error("<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<ShowMore>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<ShowMore>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/checkbox/src/Checkbox.svelte generated by Svelte v3.32.0 */

    const file$C = "components/checkbox/src/Checkbox.svelte";

    function create_fragment$E(ctx) {
    	let label;
    	let span;
    	let input;
    	let t0;
    	let svg;
    	let polyline;
    	let t1;
    	let caption;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			label = element("label");
    			span = element("span");
    			input = element("input");
    			t0 = space();
    			svg = svg_element("svg");
    			polyline = svg_element("polyline");
    			t1 = space();
    			caption = element("caption");
    			if (default_slot) default_slot.c();
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "name", /*name*/ ctx[1]);
    			input.disabled = /*disabled*/ ctx[3];
    			input.__value = /*value*/ ctx[2];
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-vjazf6");
    			add_location(input, file$C, 89, 4, 1998);
    			attr_dev(polyline, "points", "5 10.75 8.5 14.25 16 6");
    			add_location(polyline, file$C, 98, 6, 2178);
    			attr_dev(svg, "viewBox", "0 0 21 21");
    			attr_dev(svg, "class", "svelte-vjazf6");
    			add_location(svg, file$C, 97, 4, 2146);
    			attr_dev(span, "class", "responsive-ui-checkbox svelte-vjazf6");
    			add_location(span, file$C, 88, 2, 1956);
    			attr_dev(caption, "class", "svelte-vjazf6");
    			add_location(caption, file$C, 101, 2, 2246);
    			attr_dev(label, "class", "bounce svelte-vjazf6");
    			toggle_class(label, "disabled", /*disabled*/ ctx[3]);
    			add_location(label, file$C, 87, 0, 1916);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, span);
    			append_dev(span, input);
    			input.checked = /*checked*/ ctx[0];
    			append_dev(span, t0);
    			append_dev(span, svg);
    			append_dev(svg, polyline);
    			append_dev(label, t1);
    			append_dev(label, caption);

    			if (default_slot) {
    				default_slot.m(caption, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*change_handler*/ ctx[9], false, false, false),
    					listen_dev(input, "change", /*handleOnChange*/ ctx[4], false, false, false),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[10])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 2) {
    				attr_dev(input, "name", /*name*/ ctx[1]);
    			}

    			if (!current || dirty & /*disabled*/ 8) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (!current || dirty & /*value*/ 4) {
    				prop_dev(input, "__value", /*value*/ ctx[2]);
    				input.value = input.__value;
    			}

    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 128) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}

    			if (dirty & /*disabled*/ 8) {
    				toggle_class(label, "disabled", /*disabled*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Checkbox", slots, ['default']);
    	let id = 0;
    	let { name = "" } = $$props;
    	let { value = "" } = $$props;
    	let { group = [] } = $$props;
    	let { disabled = false } = $$props;
    	let { checked = false } = $$props;

    	let { onChange = _ => {
    		
    	} } = $$props;

    	const updateChekbox = group => {
    		$$invalidate(0, checked = group.indexOf(value) >= 0);
    	};

    	const updateGroup = checked => {
    		const index = group.indexOf(value);

    		if (checked) {
    			if (index < 0) {
    				group.push(value);
    				$$invalidate(5, group);
    			}
    		} else {
    			if (index >= 0) {
    				group.splice(index, 1);
    				$$invalidate(5, group);
    			}
    		}
    	};

    	const handleOnChange = e => {
    		onChange(e.target.checked);
    	};

    	const writable_props = ["name", "value", "group", "disabled", "checked", "onChange"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Checkbox> was created with unknown prop '${key}'`);
    	});

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("value" in $$props) $$invalidate(2, value = $$props.value);
    		if ("group" in $$props) $$invalidate(5, group = $$props.group);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("onChange" in $$props) $$invalidate(6, onChange = $$props.onChange);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		id,
    		name,
    		value,
    		group,
    		disabled,
    		checked,
    		onChange,
    		updateChekbox,
    		updateGroup,
    		handleOnChange
    	});

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) id = $$props.id;
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("value" in $$props) $$invalidate(2, value = $$props.value);
    		if ("group" in $$props) $$invalidate(5, group = $$props.group);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
    		if ("onChange" in $$props) $$invalidate(6, onChange = $$props.onChange);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*group*/ 32) {
    			 updateChekbox(group);
    		}

    		if ($$self.$$.dirty & /*checked*/ 1) {
    			 updateGroup(checked);
    		}
    	};

    	return [
    		checked,
    		name,
    		value,
    		disabled,
    		handleOnChange,
    		group,
    		onChange,
    		$$scope,
    		slots,
    		change_handler,
    		input_change_handler
    	];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$E, create_fragment$E, safe_not_equal, {
    			name: 1,
    			value: 2,
    			group: 5,
    			disabled: 3,
    			checked: 0,
    			onChange: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$E.name
    		});
    	}

    	get name() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onChange() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onChange(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* components/quantity/src/Quantity.svelte generated by Svelte v3.32.0 */
    const file$D = "components/quantity/src/Quantity.svelte";

    function create_fragment$F(ctx) {
    	let div;
    	let span0;
    	let icon0;
    	let t0;
    	let span1;
    	let t1;
    	let t2;
    	let span2;
    	let icon1;
    	let current;
    	let mounted;
    	let dispose;

    	icon0 = new Icon({
    			props: {
    				type: "minus",
    				stroke: /*value*/ ctx[0] > /*min*/ ctx[1]
    				? "#505050"
    				: "#ababab"
    			},
    			$$inline: true
    		});

    	icon1 = new Icon({
    			props: {
    				type: "plus",
    				stroke: /*value*/ ctx[0] < /*max*/ ctx[2]
    				? "#505050"
    				: "#ababab"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			create_component(icon0.$$.fragment);
    			t0 = space();
    			span1 = element("span");
    			t1 = text(/*value*/ ctx[0]);
    			t2 = space();
    			span2 = element("span");
    			create_component(icon1.$$.fragment);
    			add_location(span0, file$D, 34, 2, 762);
    			attr_dev(span1, "class", "responsive-ui-quantity__count svelte-1rdiz49");
    			add_location(span1, file$D, 37, 2, 899);
    			add_location(span2, file$D, 38, 2, 960);
    			attr_dev(div, "class", "responsive-ui-quantity svelte-1rdiz49");
    			toggle_class(div, "responsive-ui-quantity--disabled", /*disabled*/ ctx[3]);
    			add_location(div, file$D, 30, 0, 668);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			mount_component(icon0, span0, null);
    			append_dev(div, t0);
    			append_dev(div, span1);
    			append_dev(span1, t1);
    			append_dev(div, t2);
    			append_dev(div, span2);
    			mount_component(icon1, span2, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						span0,
    						"click",
    						function () {
    							if (is_function(!/*disabled*/ ctx[3]
    							? /*onDecrement*/ ctx[4]
    							: undefined)) (!/*disabled*/ ctx[3]
    							? /*onDecrement*/ ctx[4]
    							: undefined).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						span2,
    						"click",
    						function () {
    							if (is_function(!/*disabled*/ ctx[3]
    							? /*onIncrement*/ ctx[5]
    							: undefined)) (!/*disabled*/ ctx[3]
    							? /*onIncrement*/ ctx[5]
    							: undefined).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			const icon0_changes = {};

    			if (dirty & /*value, min*/ 3) icon0_changes.stroke = /*value*/ ctx[0] > /*min*/ ctx[1]
    			? "#505050"
    			: "#ababab";

    			icon0.$set(icon0_changes);
    			if (!current || dirty & /*value*/ 1) set_data_dev(t1, /*value*/ ctx[0]);
    			const icon1_changes = {};

    			if (dirty & /*value, max*/ 5) icon1_changes.stroke = /*value*/ ctx[0] < /*max*/ ctx[2]
    			? "#505050"
    			: "#ababab";

    			icon1.$set(icon1_changes);

    			if (dirty & /*disabled*/ 8) {
    				toggle_class(div, "responsive-ui-quantity--disabled", /*disabled*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(icon0);
    			destroy_component(icon1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$F($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Quantity", slots, []);
    	const dispatch = createEventDispatcher();
    	let { min = 0 } = $$props;
    	let { max = 10 } = $$props;
    	let { value = 0 } = $$props;
    	let { step = 1 } = $$props;
    	let { disabled = false } = $$props;

    	const onDecrement = () => {
    		if (value > min) {
    			const ratio = -step;
    			$$invalidate(0, value += ratio);
    			dispatch("change", { value, step: ratio });
    		}
    	};

    	const onIncrement = () => {
    		if (value < max) {
    			const ratio = +step;
    			$$invalidate(0, value += ratio);
    			dispatch("change", { value, step: ratio });
    		}
    	};

    	const writable_props = ["min", "max", "value", "step", "disabled"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Quantity> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("min" in $$props) $$invalidate(1, min = $$props.min);
    		if ("max" in $$props) $$invalidate(2, max = $$props.max);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("step" in $$props) $$invalidate(6, step = $$props.step);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		createEventDispatcher,
    		dispatch,
    		min,
    		max,
    		value,
    		step,
    		disabled,
    		onDecrement,
    		onIncrement
    	});

    	$$self.$inject_state = $$props => {
    		if ("min" in $$props) $$invalidate(1, min = $$props.min);
    		if ("max" in $$props) $$invalidate(2, max = $$props.max);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("step" in $$props) $$invalidate(6, step = $$props.step);
    		if ("disabled" in $$props) $$invalidate(3, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, min, max, disabled, onDecrement, onIncrement, step];
    }

    class Quantity extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$F, create_fragment$F, safe_not_equal, {
    			min: 1,
    			max: 2,
    			value: 0,
    			step: 6,
    			disabled: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quantity",
    			options,
    			id: create_fragment$F.name
    		});
    	}

    	get min() {
    		throw new Error("<Quantity>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Quantity>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Quantity>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Quantity>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Quantity>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Quantity>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<Quantity>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Quantity>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Quantity>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Quantity>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.0 */

    const { Object: Object_1$4, console: console_1$2 } = globals;
    const file$E = "src/App.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[36] = list[i];
    	child_ctx[38] = i;
    	return child_ctx;
    }

    function get_each_context_1$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[40] = list[i];
    	return child_ctx;
    }

    // (349:2) <ComponentDetail hint="../components/header" block={true}>
    function create_default_slot_47(ctx) {
    	let header;
    	let current;

    	header = new Header({
    			props: { title: "Responsive UI" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_47.name,
    		type: "slot",
    		source: "(349:2) <ComponentDetail hint=\\\"../components/header\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (353:2) <ComponentDetail hint="../components/label">
    function create_default_slot_46(ctx) {
    	let label;
    	let current;
    	label = new Label({ props: { title: "Text" }, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_46.name,
    		type: "slot",
    		source: "(353:2) <ComponentDetail hint=\\\"../components/label\\\">",
    		ctx
    	});

    	return block;
    }

    // (356:2) <ComponentDetail hint="../components/input">
    function create_default_slot_45(ctx) {
    	let input;
    	let current;

    	input = new Input({
    			props: {
    				style: "width: 240px;",
    				placeholder: "Enter your text..."
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_45.name,
    		type: "slot",
    		source: "(356:2) <ComponentDetail hint=\\\"../components/input\\\">",
    		ctx
    	});

    	return block;
    }

    // (359:2) <ComponentDetail hint="../components/input-number">
    function create_default_slot_44(ctx) {
    	let inputnumber;
    	let current;

    	inputnumber = new InputNumber({
    			props: { min: 0, format: func$1 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inputnumber.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(inputnumber, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inputnumber.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inputnumber.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inputnumber, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_44.name,
    		type: "slot",
    		source: "(359:2) <ComponentDetail hint=\\\"../components/input-number\\\">",
    		ctx
    	});

    	return block;
    }

    // (378:6) <div slot="tab" let:index>
    function create_tab_slot(ctx) {
    	let div;
    	let t_value = /*index*/ ctx[43] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "slot", "tab");
    			add_location(div, file$E, 377, 6, 11532);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[1] & /*index*/ 4096 && t_value !== (t_value = /*index*/ ctx[43] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_tab_slot.name,
    		type: "slot",
    		source: "(378:6) <div slot=\\\"tab\\\" let:index>",
    		ctx
    	});

    	return block;
    }

    // (374:2) <ComponentDetail hint="../components/accordion" block={true}>
    function create_default_slot_42(ctx) {
    	let accordion0;
    	let t0;
    	let accordion1;
    	let t1;
    	let accordion2;
    	let current;

    	accordion0 = new Accordion({
    			props: {
    				items: /*accordionItems*/ ctx[15],
    				multiple: true
    			},
    			$$inline: true
    		});

    	accordion1 = new Accordion({
    			props: { items: /*accordionItems*/ ctx[15] },
    			$$inline: true
    		});

    	accordion2 = new Accordion({
    			props: {
    				items: /*accordionItems*/ ctx[15],
    				$$slots: {
    					tab: [
    						create_tab_slot,
    						({ index }) => ({ 43: index }),
    						({ index }) => [0, index ? 4096 : 0]
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(accordion0.$$.fragment);
    			t0 = space();
    			create_component(accordion1.$$.fragment);
    			t1 = space();
    			create_component(accordion2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(accordion0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(accordion1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(accordion2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const accordion2_changes = {};

    			if (dirty[1] & /*$$scope, index*/ 12288) {
    				accordion2_changes.$$scope = { dirty, ctx };
    			}

    			accordion2.$set(accordion2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(accordion0.$$.fragment, local);
    			transition_in(accordion1.$$.fragment, local);
    			transition_in(accordion2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(accordion0.$$.fragment, local);
    			transition_out(accordion1.$$.fragment, local);
    			transition_out(accordion2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(accordion0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(accordion1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(accordion2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_42.name,
    		type: "slot",
    		source: "(374:2) <ComponentDetail hint=\\\"../components/accordion\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (381:2) <ComponentDetail hint="../components/stepper" block={true}>
    function create_default_slot_41(ctx) {
    	let stepper;
    	let current;

    	stepper = new Stepper({
    			props: {
    				current: /*step*/ ctx[4],
    				items: [
    					{
    						title: "Step 1",
    						description: "testing .asdasd"
    					},
    					{ title: "Step 2" }
    				]
    			},
    			$$inline: true
    		});

    	stepper.$on("change", /*change_handler*/ ctx[22]);

    	const block = {
    		c: function create() {
    			create_component(stepper.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(stepper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const stepper_changes = {};
    			if (dirty[0] & /*step*/ 16) stepper_changes.current = /*step*/ ctx[4];
    			stepper.$set(stepper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stepper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stepper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stepper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_41.name,
    		type: "slot",
    		source: "(381:2) <ComponentDetail hint=\\\"../components/stepper\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (398:2) <ComponentDetail hint="../components/select">
    function create_default_slot_40(ctx) {
    	let select0;
    	let t;
    	let select1;
    	let current;

    	select0 = new Select_1({
    			props: {
    				value: "c",
    				options: [
    					{ title: "Option A", value: "a" },
    					{ title: "Option B", value: "b" },
    					{ title: "Option C", value: "c" },
    					{ title: "Option D", value: "d" }
    				]
    			},
    			$$inline: true
    		});

    	select0.$on("change", /*onChange*/ ctx[19]);

    	select1 = new Select_1({
    			props: {
    				multiple: true,
    				size: 5,
    				options: [
    					{ title: "CC", value: "cc" },
    					{
    						title: "Option A",
    						value: "a",
    						disabled: true
    					},
    					{ title: "Z", value: "z" },
    					{ title: "Option B", value: "b" },
    					{ title: "Option C", value: "c" },
    					{ title: "Option D", value: "d" },
    					{ title: "Option E", value: "e" },
    					{ title: "Option F", value: "f" },
    					{ title: "Option G", value: "g" }
    				]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(select0.$$.fragment);
    			t = space();
    			create_component(select1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(select0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(select1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(select0.$$.fragment, local);
    			transition_in(select1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(select0.$$.fragment, local);
    			transition_out(select1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(select0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(select1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_40.name,
    		type: "slot",
    		source: "(398:2) <ComponentDetail hint=\\\"../components/select\\\">",
    		ctx
    	});

    	return block;
    }

    // (426:2) <ComponentDetail hint="../components/loader">
    function create_default_slot_39(ctx) {
    	let loader;
    	let current;
    	loader = new Loader({ props: { size: "small" }, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(loader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(loader, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(loader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_39.name,
    		type: "slot",
    		source: "(426:2) <ComponentDetail hint=\\\"../components/loader\\\">",
    		ctx
    	});

    	return block;
    }

    // (430:2) <ComponentDetail hint="../components/textarea" block={true}>
    function create_default_slot_38(ctx) {
    	let textarea;
    	let current;

    	textarea = new Textarea({
    			props: { placeholder: "Key in your input here..." },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(textarea.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textarea, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textarea, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_38.name,
    		type: "slot",
    		source: "(430:2) <ComponentDetail hint=\\\"../components/textarea\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (433:2) <ComponentDetail hint="../components/tab" block={true}>
    function create_default_slot_37(ctx) {
    	let tab;
    	let current;

    	tab = new Tab({
    			props: { items: /*tabItems*/ ctx[16], selected: 1 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tab.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tab, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tab, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_37.name,
    		type: "slot",
    		source: "(433:2) <ComponentDetail hint=\\\"../components/tab\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (436:2) <ComponentDetail hint="../components/poster">
    function create_default_slot_36(ctx) {
    	let poster;
    	let current;

    	poster = new Poster({
    			props: {
    				src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAn1BMVEX/PAD///+2LAD/OQD/KwD/NQD/LQD/JgD/MgD//vz/7+n/+vb/8+7/PgD/6eL/9vL/q5f/3NH/x7j/i3H/mID/4tn/0MT/wLH/vKz/TiD/fF3/n4n/r5z/clL/s6D/5dz/1sv/pZH/k3r/y77/g2f/Yz//VSn/Rg3/WjH/d1j/akX/m4b/f2P/XjX/eFz/ZkL/hm7/TSX/Txj/VSL/aEKFS6ACAAALy0lEQVR4nO2d6XbiOBBGndFqDASzEwJh30KaJD3v/2xjIOkh+JMlO0iQPrp/5pyeACokV5VqI/jnbyfweDwej8fj8Xg8Ho/H4/F4PB6Px+PxeDw/AEIYYzIh+Q8h117NpWGS8srbfLBtJGwH88Uy+Qf2t4hJpAgGzU5cCu/+EJZa9f6vpeDs2qv7Nol4lWa7fAeJ4tpc0B+9k4QGjRGW7pPS44rKnyokoavhfbZ8B+LXgP9EGYl464R68Y4b2Wf82uvNjWRDU/n2lCfiZykdRhtRDvn2VNc/SefQRTunfHvqS3nthRvCRD/vBh4pz8S1125CokFbheTb06W3/zRK8lhYvoRW78ZPKhHr6ncETE7q5qbthiSd78mXEA7otcVQwuismIY54/VWRaSrIiYC0bjJg1rYRCDWtydiYiLii8mXsLo1jSpJzWjhUTVu1+vtuKrb7nLvpuwiEQMDE1HqTDYVLg7wyq7RyXxNfEshDhl09fJ1BgGV/6+aMEnJppuxlcObceCI2GpvueGwQsGeMEqeFfGNhIcbeRT5Yqrdv/pSKI4c4Xys2seocgvnlIlnrYmo/lLJd0B90arfwDkVv/UmYkg0p43RpuKlv659TiXTm4inl8wNPEI3+EmuXtdiEKo3EVHfLOIrFyX4+uY1XRsTEzFamLrQ7B3q1PvrSUjEg1rNf25gI8d9nfWgxrraJvI3AxNRybU6uUGxx9J1JGSiqTURpa2BhvkCfUbvM7uGOqULTSYiYRjkX5lAdnHk/jJMlNbrf6rzvBt4eOcAnNNw5dqxYYH2CQzHBSOCHH13fcfHVK60NnC0KnywGHjz2K2u4Tudigkn3wjpygl4w6XLY0rXug2cBvqvnBBVmQIhwLXZOnTd+INGvtJMr2EkXa5WFYqfLgrC5V132lQONPnAYUWrFRhvxvdhVG7PYCaNzdPv2nJ2h2KL7GewutNuIBGbP8cwhvkJAY6pK2VKGHb/Pwhreg0jl6fOevgCXkCBO+/KIopMOxjrTQQRr1+d9TLQkvI1/d6vbjYx05MJm/prIF2mnDKgQ8jv9LuPnVhE9pIhYFt/i2C0mVZT0RsIv6X/zI0ypep4jIGJIHQOX99Inz+aftqdBKRkQylgV19dIOUQv3aY3nuaTpCPnEioivmWBrlMxPm3kz5/4LDEDiSkqphal2s3kC/VWeFaeu1Awif7EpKlYgsn2g1kopER8q+/8HMrCk6pA6eGj/ECZ1olR3vZWeGw+vgivhwDmr5A2T+l0ONP2OoEZPTZoLKt1WAnhYky7Rq2rUsoZ3BlDY2AhO4MC4fux8tPGcky/b871u0hjBBp03uSKUwEojz+SG4wcAMd2paQBGhNT9luDBGDTEc9LePRb0AXROuRGhRauLubZzqifFnPJd+e0SL50gQ42L9sX/LhIc08OQVqS/eEE8F64N/fbd+eGDBoUVZ4yCRijKlLcIOJbD+GbAOW0lWrGSbGeYqfv1J6Sv+bdbdUonSCcgsJ3XyzNDFFzfb1kAK3UullGNWd5GRjW9EAR/GuifU3EQ/5TIQJ5cB6mAYsegE/lC/1ScX81K3bexBDhAUEhE+MNEyYUw9ZD3mzXfpDp+hrldri4Op03Fhv5vPN4HVcB0oTUrJeNsQG6U9F2o1qvNB4smCUH3orGZOcyp6u4+uIdac0YNv0p07SigZazT9E3Xdx3p62b0rs6xUTfuQvCbo6gUdDZPihYVdR1ka4bGpkdBBnQ1G2NZBQHauI5xntTLyS3ZxhfwthmH2QkpBUVEsMm9n5DELnGdvoIlSKnsP0HiolnC61moJJ5QmPeg6SMkiXghoXCVdYNsiY7l2hsUJCJxkLZA+B04Zurncd02Y70YcClpy0ByOfBgTjQSCgujEvqlGIaN3p3kMqaUWA6pTOC0XCx1yd9gI6DNB5ujg87V+VwJ+x3Rd/MzER+T6GQg/HSfqXAk2H8tNyc3KcNSYCQCootGPfZ0vg4BGB124Z1I/bGBqYCPByFHeOnChTYC6q0BAT8Tbp1rvPqyJle8lhQbdLF+VChIDjg47p/m8lpYUnQLAFuDk6yf8KoAOsfLAAMZ7Ihb1AwbbQhkcMXT/rAe8Ap4OK54MkFUJR1Aaj648utCn0yHaFvlsuG512uzvjUEcyUBkYu5AQpmY0uScIk58Z0/AZTWshQbrDARVOXRycxs/dHkjE5uQwtFEYFBmMYoclJ6ic7u7uId8unmdM2+DlKDHjpB2BvaAYZ5SnGRlkTJ/TIiLvwk1Vm4Cx0BzNyChjGqaXTt7S3oX9LP4eRWFi6d1sFwmdoCd5lv6CQNVH24WEyoqh8srkCNF3HPsFFweavqo56UZACbYjoT4Qw1T1RijnAmq+Wg4kROXlf+hm98AmJkKZoUB1e+ndfnKgS7Prn6vbjBldPMhIZ/RB7eVVJCSLLAETRvNUUuL4Qi4mWW2YoMYCpGMdSJiVkvggngXn18LkqrjMmCaQMAVOEegHsP8ckneTlGa5M1vwY/ZsnzwTctWYZtfUlEE8m/TSSntkXUIUp4FET/XxZLserGeT2lQ/u2QHTh/K0dmPKPLik8kyqFeQekK3mK7tPURR/W9TesBmFEUun21rGqW9/gbKJmFUqvtgvZymaI2akqeNKmOKrhbh3PINmCwvN93quOK+OhyOXIuS9VIMVIEwLV6aN+qpVSMMeVm/WkhgK0rqFhENUWaTMIqXItfusiCHpkNlJX8J8N0+5Z21XBjzth+mUVQlE7HVDv44R2UiPqGoFrlkv04/rWjCQ5RMBrmmBCeWWzNHgsNycvvpNZL+0I8mHUJXOY7qk64DDJ9RVQroggKiBo/POwETC1MZx1KzUkWXsf2mLgJaR0/Ce0QsxwZqNdaOGmIB7uAEFXQXBpnDL42fhLJf3WwhI32TsErAsv2JbciPOncUGSWDjA68aU9r0fhSUf1uvYgdSwiq2sDF9XMX9KOGCJ0ptLKDLYSnFFS1gVD1ka5+jkRGAxGI+18cpGnSoWryphgoZ9Ik/Krc/6qTaPd7+oNBVZuEMdEa026gKhx+IP04WAB15gE3g4NO6NZCa8sYh+O9PsjoPLokwGsDTaskNU4uetZXRYld1ljJqv1OkuMqQFUb+G75Wa10+00/R0JkO7ZOcr8Bvj2hShNxWq59/2pgIjQ9prou44uBAlGw60lM/hzUjn4aXdYYggOP7gYLAZOPu8d5r/YU3YWluomJmGlul3V3I8zI0mzoSnDonugt3gK9huHpSTVnTF3+chAH+k5ZPKAcU3YCg5P1vu5gseLGgnDQ8VH6xs/CKSbVnOLIEH6CHsTic1MZfdTGPvqup12iSHtYrIaUCH2TcOT+5ztg212nyEGSFX2TcFt/Gbk4uE4h/0R4vYlIXIXJVX7TChZf5i4ZNGkSbmdGjO2Bh7fEuUwWo/om4bImYmwRNMsw36NIX/TD6TWFOVbBw03MC0wZrWk30CAcYBM0/Hb/rRstioidfo7EWB8OsIoEXZZ7Rkx/hzOZI6GPGFsHpoX2Z2unnRW11cbEo/xNUpeHqQq/wpqqs+CAkYnQR4xdgCfCH7ZxLVSFFdLARNwb9dG6ALUGfRBvGThmjAYNvYbpXlnDnEB6GS5XtTb/0tC1b/Ca1/RJqWT/b2QD98jsUd7VbmPBjj9WJdii0TUZNGQQMXaK0P9gQLkVj+KWYYK/tbi5X46FxSBFMYkYu4dfboRQO6Nw6IoQeaEfcIzwQPYbgOAZkXnpyNvSMKcQ3B6Ui9syESkIyqPlonbFa6AZAo9rNaT1cqtP4AlU/zssKqLmz/iBeEZyDJc9pX39a6AhhA5yFybm/I2yq8No7gmet2wiILTXySNjfN1AUyEIfemayth6yDWN52ZgdFkzeR7bA/3w/VuFcLGuZ/9SbvXx/WdYCCVMVB6GLXxc7+Pahv8AC6+DMCoX69r06bRo6L5V7w96/Gc+fgjCOKWy8vvf9fZ1u/73d0XS01+o/msghB35Rprf4/F4PB6Px+PxeDwej8fj8Xg8Ho/H4/E45D8qo6+rhFuv0QAAAABJRU5ErkJggg=="
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(poster.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(poster, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(poster.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(poster.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(poster, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_36.name,
    		type: "slot",
    		source: "(436:2) <ComponentDetail hint=\\\"../components/poster\\\">",
    		ctx
    	});

    	return block;
    }

    // (444:6) <Link>
    function create_default_slot_35(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Lorem Ipsum");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_35.name,
    		type: "slot",
    		source: "(444:6) <Link>",
    		ctx
    	});

    	return block;
    }

    // (442:4) <Ellipsis>
    function create_default_slot_34(ctx) {
    	let t0;
    	let link;
    	let t1;
    	let current;

    	link = new Link({
    			props: {
    				$$slots: { default: [create_default_slot_35] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = text("Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n      ");
    			create_component(link.$$.fragment);
    			t1 = text("\n      has been the industry's standard dummy text ever since the 1500s, when an unknown\n      printer took a galley of type and scrambled it to make a type specimen book.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			mount_component(link, target, anchor);
    			insert_dev(target, t1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			destroy_component(link, detaching);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_34.name,
    		type: "slot",
    		source: "(442:4) <Ellipsis>",
    		ctx
    	});

    	return block;
    }

    // (441:2) <ComponentDetail hint="../components/ellipsis" block={true}>
    function create_default_slot_33(ctx) {
    	let ellipsis;
    	let current;

    	ellipsis = new Ellipsis({
    			props: {
    				$$slots: { default: [create_default_slot_34] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(ellipsis.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ellipsis, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const ellipsis_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				ellipsis_changes.$$scope = { dirty, ctx };
    			}

    			ellipsis.$set(ellipsis_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ellipsis.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ellipsis.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ellipsis, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_33.name,
    		type: "slot",
    		source: "(441:2) <ComponentDetail hint=\\\"../components/ellipsis\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (450:4) <ShowMore>
    function create_default_slot_32(ctx) {
    	let p;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It\n        has roots in a piece of classical Latin literature from 45 BC, making it\n        over 2000 years old. Richard McClintock, a Latin professor at\n        Hampden-Sydney College in Virginia, looked up one of the more obscure\n        Latin words, consectetur, from a Lorem Ipsum passage, and going through\n        the cites of the word in classical literature, discovered the\n        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33\n        of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by\n        Cicero, written in 45 BC. This book is a treatise on the theory of\n        ethics, very popular during the Renaissance. The first line of Lorem\n        Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section\n        1.10.32.";
    			t1 = text("\n      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below\n      for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum\n      et Malorum\" by Cicero are also reproduced in their exact original form, accompanied\n      by English versions from the 1914 translation by H. Rackham.");
    			add_location(p, file$E, 450, 6, 18321);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_32.name,
    		type: "slot",
    		source: "(450:4) <ShowMore>",
    		ctx
    	});

    	return block;
    }

    // (449:2) <ComponentDetail hint="../components/show-more" block={true}>
    function create_default_slot_31(ctx) {
    	let showmore;
    	let current;

    	showmore = new ShowMore({
    			props: {
    				$$slots: { default: [create_default_slot_32] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(showmore.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(showmore, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const showmore_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				showmore_changes.$$scope = { dirty, ctx };
    			}

    			showmore.$set(showmore_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(showmore.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(showmore.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(showmore, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_31.name,
    		type: "slot",
    		source: "(449:2) <ComponentDetail hint=\\\"../components/show-more\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (473:4) <Card>
    function create_default_slot_30(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Content here");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_30.name,
    		type: "slot",
    		source: "(473:4) <Card>",
    		ctx
    	});

    	return block;
    }

    // (472:2) <ComponentDetail hint="../components/card">
    function create_default_slot_29(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				$$slots: { default: [create_default_slot_30] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_29.name,
    		type: "slot",
    		source: "(472:2) <ComponentDetail hint=\\\"../components/card\\\">",
    		ctx
    	});

    	return block;
    }

    // (481:4) {:else}
    function create_else_block$8(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*datas*/ ctx[10];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*datas*/ 1024) {
    				each_value_1 = /*datas*/ ctx[10];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(481:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (477:4) {#if aspectRatio > 1}
    function create_if_block$i(ctx) {
    	let componentdetail;
    	let current;

    	componentdetail = new ComponentDetail({
    			props: {
    				hint: "../components/table",
    				block: true,
    				$$slots: { default: [create_default_slot_27] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(componentdetail.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(componentdetail, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const componentdetail_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail.$set(componentdetail_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentdetail.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentdetail.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(componentdetail, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$i.name,
    		type: "if",
    		source: "(477:4) {#if aspectRatio > 1}",
    		ctx
    	});

    	return block;
    }

    // (483:8) <Card>
    function create_default_slot_28(ctx) {
    	let div0;
    	let t0;
    	let t1_value = /*data*/ ctx[40].name + "";
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let t4_value = /*data*/ ctx[40].created + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text("Name : ");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			t3 = text("Created : ");
    			t4 = text(t4_value);
    			t5 = space();
    			add_location(div0, file$E, 483, 10, 19915);
    			add_location(div1, file$E, 484, 10, 19955);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    			insert_dev(target, t5, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_28.name,
    		type: "slot",
    		source: "(483:8) <Card>",
    		ctx
    	});

    	return block;
    }

    // (482:6) {#each datas as data}
    function create_each_block_1$4(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				$$slots: { default: [create_default_slot_28] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$4.name,
    		type: "each",
    		source: "(482:6) {#each datas as data}",
    		ctx
    	});

    	return block;
    }

    // (478:6) <ComponentDetail hint="../components/table" block={true}>
    function create_default_slot_27(ctx) {
    	let table;
    	let current;

    	table = new Table({
    			props: {
    				key: "key",
    				columns: /*columns*/ ctx[9],
    				items: /*datas*/ ctx[10]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_27.name,
    		type: "slot",
    		source: "(478:6) <ComponentDetail hint=\\\"../components/table\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (476:2) <Responsive let:aspectRatio>
    function create_default_slot_26(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$i, create_else_block$8];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*aspectRatio*/ ctx[39] > 1) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_26.name,
    		type: "slot",
    		source: "(476:2) <Responsive let:aspectRatio>",
    		ctx
    	});

    	return block;
    }

    // (491:2) <ComponentDetail hint="../components/tag">
    function create_default_slot_25(ctx) {
    	let tag0;
    	let t0;
    	let tag1;
    	let t1;
    	let tag2;
    	let t2;
    	let tag3;
    	let t3;
    	let tag4;
    	let t4;
    	let tag5;
    	let current;

    	tag0 = new Tag({
    			props: { value: "Blue", closable: true },
    			$$inline: true
    		});

    	tag1 = new Tag({
    			props: { color: "red", value: "Red" },
    			$$inline: true
    		});

    	tag2 = new Tag({
    			props: { color: "yellow", value: "Yellow" },
    			$$inline: true
    		});

    	tag3 = new Tag({
    			props: { color: "orange", value: "Orange" },
    			$$inline: true
    		});

    	tag4 = new Tag({
    			props: { color: "green", value: "Green" },
    			$$inline: true
    		});

    	tag5 = new Tag({
    			props: { color: "grey", value: "Grey" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tag0.$$.fragment);
    			t0 = space();
    			create_component(tag1.$$.fragment);
    			t1 = space();
    			create_component(tag2.$$.fragment);
    			t2 = space();
    			create_component(tag3.$$.fragment);
    			t3 = space();
    			create_component(tag4.$$.fragment);
    			t4 = space();
    			create_component(tag5.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tag0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(tag1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(tag2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(tag3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(tag4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(tag5, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tag0.$$.fragment, local);
    			transition_in(tag1.$$.fragment, local);
    			transition_in(tag2.$$.fragment, local);
    			transition_in(tag3.$$.fragment, local);
    			transition_in(tag4.$$.fragment, local);
    			transition_in(tag5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tag0.$$.fragment, local);
    			transition_out(tag1.$$.fragment, local);
    			transition_out(tag2.$$.fragment, local);
    			transition_out(tag3.$$.fragment, local);
    			transition_out(tag4.$$.fragment, local);
    			transition_out(tag5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tag0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(tag1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(tag2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(tag3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(tag4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(tag5, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_25.name,
    		type: "slot",
    		source: "(491:2) <ComponentDetail hint=\\\"../components/tag\\\">",
    		ctx
    	});

    	return block;
    }

    // (506:4) {#each items as item, i}
    function create_each_block$9(ctx) {
    	let div;
    	let t0_value = /*i*/ ctx[38] + 1 + "";
    	let t0;
    	let t1;
    	let t2_value = /*item*/ ctx[36] + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text(". ");
    			t2 = text(t2_value);
    			add_location(div, file$E, 506, 6, 20554);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*items*/ 8 && t2_value !== (t2_value = /*item*/ ctx[36] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(506:4) {#each items as item, i}",
    		ctx
    	});

    	return block;
    }

    // (500:2) <ComponentDetail hint="../components/search" block={true}>
    function create_default_slot_24(ctx) {
    	let search;
    	let t;
    	let each_1_anchor;
    	let current;

    	search = new Search({
    			props: {
    				placeholder: "Enter your keyword here to search..."
    			},
    			$$inline: true
    		});

    	search.$on("search", /*onSearch*/ ctx[12]);
    	let each_value = /*items*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			create_component(search.$$.fragment);
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(search, target, anchor);
    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*items*/ 8) {
    				each_value = /*items*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(search.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(search.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(search, detaching);
    			if (detaching) detach_dev(t);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_24.name,
    		type: "slot",
    		source: "(500:2) <ComponentDetail hint=\\\"../components/search\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (513:4) <Button>
    function create_default_slot_23(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Click Trigger Dropdown");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_23.name,
    		type: "slot",
    		source: "(513:4) <Button>",
    		ctx
    	});

    	return block;
    }

    // (512:2) <Dropdown trigger="click" items={options}>
    function create_default_slot_22(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_23] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_22.name,
    		type: "slot",
    		source: "(512:2) <Dropdown trigger=\\\"click\\\" items={options}>",
    		ctx
    	});

    	return block;
    }

    // (516:4) <Button>
    function create_default_slot_21(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Hover Trigger Dropdown");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21.name,
    		type: "slot",
    		source: "(516:4) <Button>",
    		ctx
    	});

    	return block;
    }

    // (515:2) <Dropdown trigger="hover" items={options}>
    function create_default_slot_20(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_21] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20.name,
    		type: "slot",
    		source: "(515:2) <Dropdown trigger=\\\"hover\\\" items={options}>",
    		ctx
    	});

    	return block;
    }

    // (518:2) <Dropdown trigger="context" items={options}>
    function create_default_slot_19(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Context Trigger Dropdown";
    			set_style(div, "width", "300px");
    			set_style(div, "height", "200px");
    			set_style(div, "background", "#e5e7eb");
    			add_location(div, file$E, 518, 4, 20940);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19.name,
    		type: "slot",
    		source: "(518:2) <Dropdown trigger=\\\"context\\\" items={options}>",
    		ctx
    	});

    	return block;
    }

    // (526:6) <Column span={{ sm: 6, xs: 10 }}>
    function create_default_slot_18(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Upload");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(526:6) <Column span={{ sm: 6, xs: 10 }}>",
    		ctx
    	});

    	return block;
    }

    // (527:6) <Column span={{ sm: 18 }}>
    function create_default_slot_17(ctx) {
    	let upload;
    	let current;

    	upload = new Upload({
    			props: {
    				name: "image",
    				url: /*uploadUrl*/ ctx[8],
    				withCredentials: false
    			},
    			$$inline: true
    		});

    	upload.$on("success", /*uploadSuccessful*/ ctx[11]);

    	const block = {
    		c: function create() {
    			create_component(upload.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(upload, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(upload.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(upload.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(upload, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(527:6) <Column span={{ sm: 18 }}>",
    		ctx
    	});

    	return block;
    }

    // (525:4) <Row>
    function create_default_slot_16(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				span: { sm: 6, xs: 10 },
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				span: { sm: 18 },
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(525:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (537:6) <Column span={{ sm: 6, xs: 10 }}>
    function create_default_slot_15(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Date Picker");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(537:6) <Column span={{ sm: 6, xs: 10 }}>",
    		ctx
    	});

    	return block;
    }

    // (538:6) <Column span={{ sm: 18 }}>
    function create_default_slot_14(ctx) {
    	let datepicker;
    	let current;
    	datepicker = new DatePicker({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(datepicker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(datepicker, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(datepicker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(datepicker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(datepicker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(538:6) <Column span={{ sm: 18 }}>",
    		ctx
    	});

    	return block;
    }

    // (536:4) <Row alignItems="center">
    function create_default_slot_13(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				span: { sm: 6, xs: 10 },
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				span: { sm: 18 },
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(536:4) <Row alignItems=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (543:6) <Column span={{ sm: 6, xs: 10 }}>
    function create_default_slot_12(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Disabled Button");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(543:6) <Column span={{ sm: 6, xs: 10 }}>",
    		ctx
    	});

    	return block;
    }

    // (544:6) <Column span={{ sm: 18 }}>
    function create_default_slot_11(ctx) {
    	let switch_1;
    	let updating_checked;
    	let current;

    	function switch_1_checked_binding(value) {
    		/*switch_1_checked_binding*/ ctx[27].call(null, value);
    	}

    	let switch_1_props = {};

    	if (/*disabledButton*/ ctx[0] !== void 0) {
    		switch_1_props.checked = /*disabledButton*/ ctx[0];
    	}

    	switch_1 = new Switch({ props: switch_1_props, $$inline: true });
    	binding_callbacks.push(() => bind(switch_1, "checked", switch_1_checked_binding));

    	const block = {
    		c: function create() {
    			create_component(switch_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(switch_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_1_changes = {};

    			if (!updating_checked && dirty[0] & /*disabledButton*/ 1) {
    				updating_checked = true;
    				switch_1_changes.checked = /*disabledButton*/ ctx[0];
    				add_flush_callback(() => updating_checked = false);
    			}

    			switch_1.$set(switch_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(switch_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(switch_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(switch_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(544:6) <Column span={{ sm: 18 }}>",
    		ctx
    	});

    	return block;
    }

    // (542:4) <Row>
    function create_default_slot_10(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: {
    				span: { sm: 6, xs: 10 },
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				span: { sm: 18 },
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				column0_changes.$$scope = { dirty, ctx };
    			}

    			column0.$set(column0_changes);
    			const column1_changes = {};

    			if (dirty[0] & /*disabledButton*/ 1 | dirty[1] & /*$$scope*/ 8192) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(542:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (550:6) <Column span={12}>
    function create_default_slot_9(ctx) {
    	let checkbox;
    	let current;
    	checkbox = new Checkbox({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(checkbox.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkbox, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkbox, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(550:6) <Column span={12}>",
    		ctx
    	});

    	return block;
    }

    // (548:4) <Row>
    function create_default_slot_8(ctx) {
    	let column0;
    	let t;
    	let column1;
    	let current;

    	column0 = new Column({
    			props: { span: { sm: 6, xs: 10 } },
    			$$inline: true
    		});

    	column1 = new Column({
    			props: {
    				span: 12,
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(column0.$$.fragment);
    			t = space();
    			create_component(column1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(column0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(column1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const column1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				column1_changes.$$scope = { dirty, ctx };
    			}

    			column1.$set(column1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(column0.$$.fragment, local);
    			transition_in(column1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(column0.$$.fragment, local);
    			transition_out(column1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(column0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(column1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(548:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (524:2) <Card>
    function create_default_slot_7(ctx) {
    	let row0;
    	let t0;
    	let row1;
    	let t1;
    	let row2;
    	let t2;
    	let row3;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				alignItems: "center",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row2 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row3 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t0 = space();
    			create_component(row1.$$.fragment);
    			t1 = space();
    			create_component(row2.$$.fragment);
    			t2 = space();
    			create_component(row3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(row1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(row3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    			const row2_changes = {};

    			if (dirty[0] & /*disabledButton*/ 1 | dirty[1] & /*$$scope*/ 8192) {
    				row2_changes.$$scope = { dirty, ctx };
    			}

    			row2.$set(row2_changes);
    			const row3_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				row3_changes.$$scope = { dirty, ctx };
    			}

    			row3.$set(row3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(row2.$$.fragment, local);
    			transition_in(row3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(row2.$$.fragment, local);
    			transition_out(row3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(row1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(row2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(row3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(524:2) <Card>",
    		ctx
    	});

    	return block;
    }

    // (556:2) <Label title="Number">
    function create_default_slot_6(ctx) {
    	let inputnumber;
    	let current;

    	inputnumber = new InputNumber({
    			props: { format: func_1 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(inputnumber.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(inputnumber, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inputnumber.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inputnumber.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inputnumber, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(556:2) <Label title=\\\"Number\\\">",
    		ctx
    	});

    	return block;
    }

    // (564:2) <Tooltip placeholder="Testing here">
    function create_default_slot_5(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "testing here";
    			add_location(p, file$E, 564, 4, 22058);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(564:2) <Tooltip placeholder=\\\"Testing here\\\">",
    		ctx
    	});

    	return block;
    }

    // (567:2) <Tooltip     placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.   Lorem Ipsum has been the industry's standard dummy text ever since the   1500s, when an unknown printer took a galley of type and scrambled it to   make a type specimen book."   >
    function create_default_slot_4(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n      Lorem Ipsum has been the industry's standard dummy text ever since the\n      1500s, when an unknown printer took a galley of type and scrambled it to\n      make a type specimen book. It has survived not only five centuries, but\n      also the leap into electronic typesetting, remaining essentially\n      unchanged. It was popularised in the 1960s with the release of Letraset\n      sheets containing Lorem Ipsum passages, and more recently with desktop\n      publishing software like Aldus PageMaker including versions of Lorem\n      Ipsum.";
    			add_location(p, file$E, 572, 4, 22380);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(567:2) <Tooltip     placeholder=\\\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.   Lorem Ipsum has been the industry's standard dummy text ever since the   1500s, when an unknown printer took a galley of type and scrambled it to   make a type specimen book.\\\"   >",
    		ctx
    	});

    	return block;
    }

    // (594:6) <Button disabled={disabledButton} on:click={showNotification("default")}>
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("CONFIRM");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(594:6) <Button disabled={disabledButton} on:click={showNotification(\\\"default\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (593:4) <ComponentDetail hint="../components/button" block={true}>
    function create_default_slot_2$1(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				disabled: /*disabledButton*/ ctx[0],
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*showNotification*/ ctx[13]("default"));

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};
    			if (dirty[0] & /*disabledButton*/ 1) button_changes.disabled = /*disabledButton*/ ctx[0];

    			if (dirty[1] & /*$$scope*/ 8192) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(593:4) <ComponentDetail hint=\\\"../components/button\\\" block={true}>",
    		ctx
    	});

    	return block;
    }

    // (592:2) <BottomBar>
    function create_default_slot_1$1(ctx) {
    	let componentdetail;
    	let current;

    	componentdetail = new ComponentDetail({
    			props: {
    				hint: "../components/button",
    				block: true,
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(componentdetail.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(componentdetail, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const componentdetail_changes = {};

    			if (dirty[0] & /*disabledButton*/ 1 | dirty[1] & /*$$scope*/ 8192) {
    				componentdetail_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail.$set(componentdetail_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentdetail.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentdetail.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(componentdetail, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(592:2) <BottomBar>",
    		ctx
    	});

    	return block;
    }

    // (603:0) <BottomModal bind:open={showModal} closable={true}>
    function create_default_slot$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "padding", "30px 15px");
    			add_location(div, file$E, 603, 2, 23629);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(603:0) <BottomModal bind:open={showModal} closable={true}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$G(ctx) {
    	let main;
    	let componentdetail0;
    	let t0;
    	let componentdetail1;
    	let t1;
    	let componentdetail2;
    	let t2;
    	let componentdetail3;
    	let t3;
    	let dock0;
    	let updating_open;
    	let t4;
    	let dock1;
    	let updating_open_1;
    	let t5;
    	let componentdetail4;
    	let t6;
    	let componentdetail5;
    	let t7;
    	let div;
    	let button0;
    	let t8;
    	let button0_disabled_value;
    	let t9;
    	let button1;
    	let t10;
    	let button1_disabled_value;
    	let t11;
    	let button2;
    	let t13;
    	let button3;
    	let t15;
    	let componentdetail6;
    	let t16;
    	let componentdetail7;
    	let t17;
    	let componentdetail8;
    	let t18;
    	let componentdetail9;
    	let t19;
    	let componentdetail10;
    	let t20;
    	let componentdetail11;
    	let t21;
    	let componentdetail12;
    	let t22;
    	let componentdetail13;
    	let t23;
    	let responsive;
    	let t24;
    	let componentdetail14;
    	let t25;
    	let componentdetail15;
    	let t26;
    	let menu;
    	let t27;
    	let quantity;
    	let t28;
    	let dropdown0;
    	let t29;
    	let dropdown1;
    	let t30;
    	let dropdown2;
    	let t31;
    	let card;
    	let t32;
    	let label;
    	let t33;
    	let icon0;
    	let t34;
    	let icon1;
    	let t35;
    	let icon2;
    	let t36;
    	let icon3;
    	let t37;
    	let tooltip0;
    	let t38;
    	let tooltip1;
    	let t39;
    	let bottombar;
    	let t40;
    	let bottommodal;
    	let updating_open_2;
    	let t41;
    	let bottomsheet;
    	let updating_open_3;
    	let current;
    	let mounted;
    	let dispose;

    	componentdetail0 = new ComponentDetail({
    			props: {
    				hint: "../components/header",
    				block: true,
    				$$slots: { default: [create_default_slot_47] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail1 = new ComponentDetail({
    			props: {
    				hint: "../components/label",
    				$$slots: { default: [create_default_slot_46] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail2 = new ComponentDetail({
    			props: {
    				hint: "../components/input",
    				$$slots: { default: [create_default_slot_45] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail3 = new ComponentDetail({
    			props: {
    				hint: "../components/input-number",
    				$$slots: { default: [create_default_slot_44] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function dock0_open_binding(value) {
    		/*dock0_open_binding*/ ctx[20].call(null, value);
    	}

    	let dock0_props = { placement: "right" };

    	if (/*openRightDock*/ ctx[7] !== void 0) {
    		dock0_props.open = /*openRightDock*/ ctx[7];
    	}

    	dock0 = new Dock({ props: dock0_props, $$inline: true });
    	binding_callbacks.push(() => bind(dock0, "open", dock0_open_binding));

    	function dock1_open_binding(value) {
    		/*dock1_open_binding*/ ctx[21].call(null, value);
    	}

    	let dock1_props = {};

    	if (/*openLeftDock*/ ctx[6] !== void 0) {
    		dock1_props.open = /*openLeftDock*/ ctx[6];
    	}

    	dock1 = new Dock({ props: dock1_props, $$inline: true });
    	binding_callbacks.push(() => bind(dock1, "open", dock1_open_binding));

    	componentdetail4 = new ComponentDetail({
    			props: {
    				hint: "../components/accordion",
    				block: true,
    				$$slots: { default: [create_default_slot_42] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail5 = new ComponentDetail({
    			props: {
    				hint: "../components/stepper",
    				block: true,
    				$$slots: { default: [create_default_slot_41] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail6 = new ComponentDetail({
    			props: {
    				hint: "../components/select",
    				$$slots: { default: [create_default_slot_40] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail7 = new ComponentDetail({
    			props: {
    				hint: "../components/loader",
    				$$slots: { default: [create_default_slot_39] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail8 = new ComponentDetail({
    			props: {
    				hint: "../components/textarea",
    				block: true,
    				$$slots: { default: [create_default_slot_38] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail9 = new ComponentDetail({
    			props: {
    				hint: "../components/tab",
    				block: true,
    				$$slots: { default: [create_default_slot_37] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail10 = new ComponentDetail({
    			props: {
    				hint: "../components/poster",
    				$$slots: { default: [create_default_slot_36] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail11 = new ComponentDetail({
    			props: {
    				hint: "../components/ellipsis",
    				block: true,
    				$$slots: { default: [create_default_slot_33] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail12 = new ComponentDetail({
    			props: {
    				hint: "../components/show-more",
    				block: true,
    				$$slots: { default: [create_default_slot_31] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail13 = new ComponentDetail({
    			props: {
    				hint: "../components/card",
    				$$slots: { default: [create_default_slot_29] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	responsive = new Responsive({
    			props: {
    				$$slots: {
    					default: [
    						create_default_slot_26,
    						({ aspectRatio }) => ({ 39: aspectRatio }),
    						({ aspectRatio }) => [0, aspectRatio ? 256 : 0]
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail14 = new ComponentDetail({
    			props: {
    				hint: "../components/tag",
    				$$slots: { default: [create_default_slot_25] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	componentdetail15 = new ComponentDetail({
    			props: {
    				hint: "../components/search",
    				block: true,
    				$$slots: { default: [create_default_slot_24] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	menu = new Menu({
    			props: { items: /*menus*/ ctx[5] },
    			$$inline: true
    		});

    	menu.$on("change", /*handleSelectMenu*/ ctx[17]);
    	quantity = new Quantity({ $$inline: true });

    	dropdown0 = new Dropdown({
    			props: {
    				trigger: "click",
    				items: /*options*/ ctx[14],
    				$$slots: { default: [create_default_slot_22] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdown1 = new Dropdown({
    			props: {
    				trigger: "hover",
    				items: /*options*/ ctx[14],
    				$$slots: { default: [create_default_slot_20] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	dropdown2 = new Dropdown({
    			props: {
    				trigger: "context",
    				items: /*options*/ ctx[14],
    				$$slots: { default: [create_default_slot_19] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	card = new Card({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	label = new Label({
    			props: {
    				title: "Number",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	icon0 = new Icon({ props: { type: "more" }, $$inline: true });

    	icon1 = new Icon({
    			props: { type: "right-arrow" },
    			$$inline: true
    		});

    	icon2 = new Icon({ props: { type: "x" }, $$inline: true });

    	icon3 = new Icon({
    			props: { type: "filter" },
    			$$inline: true
    		});

    	tooltip0 = new Tooltip({
    			props: {
    				placeholder: "Testing here",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	tooltip1 = new Tooltip({
    			props: {
    				placeholder: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n  Lorem Ipsum has been the industry's standard dummy text ever since the\n  1500s, when an unknown printer took a galley of type and scrambled it to\n  make a type specimen book.",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bottombar = new BottomBar({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function bottommodal_open_binding(value) {
    		/*bottommodal_open_binding*/ ctx[28].call(null, value);
    	}

    	let bottommodal_props = {
    		closable: true,
    		$$slots: { default: [create_default_slot$1] },
    		$$scope: { ctx }
    	};

    	if (/*showModal*/ ctx[1] !== void 0) {
    		bottommodal_props.open = /*showModal*/ ctx[1];
    	}

    	bottommodal = new BottomModal({ props: bottommodal_props, $$inline: true });
    	binding_callbacks.push(() => bind(bottommodal, "open", bottommodal_open_binding));

    	function bottomsheet_open_binding(value) {
    		/*bottomsheet_open_binding*/ ctx[29].call(null, value);
    	}

    	let bottomsheet_props = { items: /*tabItems*/ ctx[16] };

    	if (/*showBottomSheet*/ ctx[2] !== void 0) {
    		bottomsheet_props.open = /*showBottomSheet*/ ctx[2];
    	}

    	bottomsheet = new BottomSheet({ props: bottomsheet_props, $$inline: true });
    	binding_callbacks.push(() => bind(bottomsheet, "open", bottomsheet_open_binding));
    	bottomsheet.$on("filter", /*onConfirm*/ ctx[18]);
    	bottomsheet.$on("change", console.log);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(componentdetail0.$$.fragment);
    			t0 = text("\n  testing\n  ");
    			create_component(componentdetail1.$$.fragment);
    			t1 = space();
    			create_component(componentdetail2.$$.fragment);
    			t2 = space();
    			create_component(componentdetail3.$$.fragment);
    			t3 = space();
    			create_component(dock0.$$.fragment);
    			t4 = space();
    			create_component(dock1.$$.fragment);
    			t5 = space();
    			create_component(componentdetail4.$$.fragment);
    			t6 = space();
    			create_component(componentdetail5.$$.fragment);
    			t7 = space();
    			div = element("div");
    			button0 = element("button");
    			t8 = text("previous");
    			t9 = space();
    			button1 = element("button");
    			t10 = text("next");
    			t11 = space();
    			button2 = element("button");
    			button2.textContent = "open left dock";
    			t13 = space();
    			button3 = element("button");
    			button3.textContent = "open right dock";
    			t15 = space();
    			create_component(componentdetail6.$$.fragment);
    			t16 = space();
    			create_component(componentdetail7.$$.fragment);
    			t17 = space();
    			create_component(componentdetail8.$$.fragment);
    			t18 = space();
    			create_component(componentdetail9.$$.fragment);
    			t19 = space();
    			create_component(componentdetail10.$$.fragment);
    			t20 = space();
    			create_component(componentdetail11.$$.fragment);
    			t21 = space();
    			create_component(componentdetail12.$$.fragment);
    			t22 = space();
    			create_component(componentdetail13.$$.fragment);
    			t23 = space();
    			create_component(responsive.$$.fragment);
    			t24 = space();
    			create_component(componentdetail14.$$.fragment);
    			t25 = space();
    			create_component(componentdetail15.$$.fragment);
    			t26 = space();
    			create_component(menu.$$.fragment);
    			t27 = space();
    			create_component(quantity.$$.fragment);
    			t28 = space();
    			create_component(dropdown0.$$.fragment);
    			t29 = space();
    			create_component(dropdown1.$$.fragment);
    			t30 = space();
    			create_component(dropdown2.$$.fragment);
    			t31 = space();
    			create_component(card.$$.fragment);
    			t32 = space();
    			create_component(label.$$.fragment);
    			t33 = space();
    			create_component(icon0.$$.fragment);
    			t34 = space();
    			create_component(icon1.$$.fragment);
    			t35 = space();
    			create_component(icon2.$$.fragment);
    			t36 = space();
    			create_component(icon3.$$.fragment);
    			t37 = space();
    			create_component(tooltip0.$$.fragment);
    			t38 = space();
    			create_component(tooltip1.$$.fragment);
    			t39 = space();
    			create_component(bottombar.$$.fragment);
    			t40 = space();
    			create_component(bottommodal.$$.fragment);
    			t41 = space();
    			create_component(bottomsheet.$$.fragment);
    			button0.disabled = button0_disabled_value = /*step*/ ctx[4] <= 0;
    			add_location(button0, file$E, 391, 4, 11907);
    			button1.disabled = button1_disabled_value = /*step*/ ctx[4] > 1;
    			add_location(button1, file$E, 392, 4, 11987);
    			add_location(button2, file$E, 393, 4, 12062);
    			add_location(button3, file$E, 394, 4, 12137);
    			add_location(div, file$E, 390, 2, 11897);
    			attr_dev(main, "class", "svelte-1idmiga");
    			add_location(main, file$E, 347, 0, 10486);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(componentdetail0, main, null);
    			append_dev(main, t0);
    			mount_component(componentdetail1, main, null);
    			append_dev(main, t1);
    			mount_component(componentdetail2, main, null);
    			append_dev(main, t2);
    			mount_component(componentdetail3, main, null);
    			append_dev(main, t3);
    			mount_component(dock0, main, null);
    			append_dev(main, t4);
    			mount_component(dock1, main, null);
    			append_dev(main, t5);
    			mount_component(componentdetail4, main, null);
    			append_dev(main, t6);
    			mount_component(componentdetail5, main, null);
    			append_dev(main, t7);
    			append_dev(main, div);
    			append_dev(div, button0);
    			append_dev(button0, t8);
    			append_dev(div, t9);
    			append_dev(div, button1);
    			append_dev(button1, t10);
    			append_dev(div, t11);
    			append_dev(div, button2);
    			append_dev(div, t13);
    			append_dev(div, button3);
    			append_dev(main, t15);
    			mount_component(componentdetail6, main, null);
    			append_dev(main, t16);
    			mount_component(componentdetail7, main, null);
    			append_dev(main, t17);
    			mount_component(componentdetail8, main, null);
    			append_dev(main, t18);
    			mount_component(componentdetail9, main, null);
    			append_dev(main, t19);
    			mount_component(componentdetail10, main, null);
    			append_dev(main, t20);
    			mount_component(componentdetail11, main, null);
    			append_dev(main, t21);
    			mount_component(componentdetail12, main, null);
    			append_dev(main, t22);
    			mount_component(componentdetail13, main, null);
    			append_dev(main, t23);
    			mount_component(responsive, main, null);
    			append_dev(main, t24);
    			mount_component(componentdetail14, main, null);
    			append_dev(main, t25);
    			mount_component(componentdetail15, main, null);
    			append_dev(main, t26);
    			mount_component(menu, main, null);
    			append_dev(main, t27);
    			mount_component(quantity, main, null);
    			append_dev(main, t28);
    			mount_component(dropdown0, main, null);
    			append_dev(main, t29);
    			mount_component(dropdown1, main, null);
    			append_dev(main, t30);
    			mount_component(dropdown2, main, null);
    			append_dev(main, t31);
    			mount_component(card, main, null);
    			append_dev(main, t32);
    			mount_component(label, main, null);
    			append_dev(main, t33);
    			mount_component(icon0, main, null);
    			append_dev(main, t34);
    			mount_component(icon1, main, null);
    			append_dev(main, t35);
    			mount_component(icon2, main, null);
    			append_dev(main, t36);
    			mount_component(icon3, main, null);
    			append_dev(main, t37);
    			mount_component(tooltip0, main, null);
    			append_dev(main, t38);
    			mount_component(tooltip1, main, null);
    			append_dev(main, t39);
    			mount_component(bottombar, main, null);
    			insert_dev(target, t40, anchor);
    			mount_component(bottommodal, target, anchor);
    			insert_dev(target, t41, anchor);
    			mount_component(bottomsheet, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[23], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[24], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[25], false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[26], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const componentdetail0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail0_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail0.$set(componentdetail0_changes);
    			const componentdetail1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail1_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail1.$set(componentdetail1_changes);
    			const componentdetail2_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail2_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail2.$set(componentdetail2_changes);
    			const componentdetail3_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail3_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail3.$set(componentdetail3_changes);
    			const dock0_changes = {};

    			if (!updating_open && dirty[0] & /*openRightDock*/ 128) {
    				updating_open = true;
    				dock0_changes.open = /*openRightDock*/ ctx[7];
    				add_flush_callback(() => updating_open = false);
    			}

    			dock0.$set(dock0_changes);
    			const dock1_changes = {};

    			if (!updating_open_1 && dirty[0] & /*openLeftDock*/ 64) {
    				updating_open_1 = true;
    				dock1_changes.open = /*openLeftDock*/ ctx[6];
    				add_flush_callback(() => updating_open_1 = false);
    			}

    			dock1.$set(dock1_changes);
    			const componentdetail4_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail4_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail4.$set(componentdetail4_changes);
    			const componentdetail5_changes = {};

    			if (dirty[0] & /*step*/ 16 | dirty[1] & /*$$scope*/ 8192) {
    				componentdetail5_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail5.$set(componentdetail5_changes);

    			if (!current || dirty[0] & /*step*/ 16 && button0_disabled_value !== (button0_disabled_value = /*step*/ ctx[4] <= 0)) {
    				prop_dev(button0, "disabled", button0_disabled_value);
    			}

    			if (!current || dirty[0] & /*step*/ 16 && button1_disabled_value !== (button1_disabled_value = /*step*/ ctx[4] > 1)) {
    				prop_dev(button1, "disabled", button1_disabled_value);
    			}

    			const componentdetail6_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail6_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail6.$set(componentdetail6_changes);
    			const componentdetail7_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail7_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail7.$set(componentdetail7_changes);
    			const componentdetail8_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail8_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail8.$set(componentdetail8_changes);
    			const componentdetail9_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail9_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail9.$set(componentdetail9_changes);
    			const componentdetail10_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail10_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail10.$set(componentdetail10_changes);
    			const componentdetail11_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail11_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail11.$set(componentdetail11_changes);
    			const componentdetail12_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail12_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail12.$set(componentdetail12_changes);
    			const componentdetail13_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail13_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail13.$set(componentdetail13_changes);
    			const responsive_changes = {};

    			if (dirty[1] & /*$$scope, aspectRatio*/ 8448) {
    				responsive_changes.$$scope = { dirty, ctx };
    			}

    			responsive.$set(responsive_changes);
    			const componentdetail14_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				componentdetail14_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail14.$set(componentdetail14_changes);
    			const componentdetail15_changes = {};

    			if (dirty[0] & /*items*/ 8 | dirty[1] & /*$$scope*/ 8192) {
    				componentdetail15_changes.$$scope = { dirty, ctx };
    			}

    			componentdetail15.$set(componentdetail15_changes);
    			const menu_changes = {};
    			if (dirty[0] & /*menus*/ 32) menu_changes.items = /*menus*/ ctx[5];
    			menu.$set(menu_changes);
    			const dropdown0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				dropdown0_changes.$$scope = { dirty, ctx };
    			}

    			dropdown0.$set(dropdown0_changes);
    			const dropdown1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				dropdown1_changes.$$scope = { dirty, ctx };
    			}

    			dropdown1.$set(dropdown1_changes);
    			const dropdown2_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				dropdown2_changes.$$scope = { dirty, ctx };
    			}

    			dropdown2.$set(dropdown2_changes);
    			const card_changes = {};

    			if (dirty[0] & /*disabledButton*/ 1 | dirty[1] & /*$$scope*/ 8192) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const tooltip0_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				tooltip0_changes.$$scope = { dirty, ctx };
    			}

    			tooltip0.$set(tooltip0_changes);
    			const tooltip1_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				tooltip1_changes.$$scope = { dirty, ctx };
    			}

    			tooltip1.$set(tooltip1_changes);
    			const bottombar_changes = {};

    			if (dirty[0] & /*disabledButton*/ 1 | dirty[1] & /*$$scope*/ 8192) {
    				bottombar_changes.$$scope = { dirty, ctx };
    			}

    			bottombar.$set(bottombar_changes);
    			const bottommodal_changes = {};

    			if (dirty[1] & /*$$scope*/ 8192) {
    				bottommodal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_open_2 && dirty[0] & /*showModal*/ 2) {
    				updating_open_2 = true;
    				bottommodal_changes.open = /*showModal*/ ctx[1];
    				add_flush_callback(() => updating_open_2 = false);
    			}

    			bottommodal.$set(bottommodal_changes);
    			const bottomsheet_changes = {};

    			if (!updating_open_3 && dirty[0] & /*showBottomSheet*/ 4) {
    				updating_open_3 = true;
    				bottomsheet_changes.open = /*showBottomSheet*/ ctx[2];
    				add_flush_callback(() => updating_open_3 = false);
    			}

    			bottomsheet.$set(bottomsheet_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(componentdetail0.$$.fragment, local);
    			transition_in(componentdetail1.$$.fragment, local);
    			transition_in(componentdetail2.$$.fragment, local);
    			transition_in(componentdetail3.$$.fragment, local);
    			transition_in(dock0.$$.fragment, local);
    			transition_in(dock1.$$.fragment, local);
    			transition_in(componentdetail4.$$.fragment, local);
    			transition_in(componentdetail5.$$.fragment, local);
    			transition_in(componentdetail6.$$.fragment, local);
    			transition_in(componentdetail7.$$.fragment, local);
    			transition_in(componentdetail8.$$.fragment, local);
    			transition_in(componentdetail9.$$.fragment, local);
    			transition_in(componentdetail10.$$.fragment, local);
    			transition_in(componentdetail11.$$.fragment, local);
    			transition_in(componentdetail12.$$.fragment, local);
    			transition_in(componentdetail13.$$.fragment, local);
    			transition_in(responsive.$$.fragment, local);
    			transition_in(componentdetail14.$$.fragment, local);
    			transition_in(componentdetail15.$$.fragment, local);
    			transition_in(menu.$$.fragment, local);
    			transition_in(quantity.$$.fragment, local);
    			transition_in(dropdown0.$$.fragment, local);
    			transition_in(dropdown1.$$.fragment, local);
    			transition_in(dropdown2.$$.fragment, local);
    			transition_in(card.$$.fragment, local);
    			transition_in(label.$$.fragment, local);
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			transition_in(icon2.$$.fragment, local);
    			transition_in(icon3.$$.fragment, local);
    			transition_in(tooltip0.$$.fragment, local);
    			transition_in(tooltip1.$$.fragment, local);
    			transition_in(bottombar.$$.fragment, local);
    			transition_in(bottommodal.$$.fragment, local);
    			transition_in(bottomsheet.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(componentdetail0.$$.fragment, local);
    			transition_out(componentdetail1.$$.fragment, local);
    			transition_out(componentdetail2.$$.fragment, local);
    			transition_out(componentdetail3.$$.fragment, local);
    			transition_out(dock0.$$.fragment, local);
    			transition_out(dock1.$$.fragment, local);
    			transition_out(componentdetail4.$$.fragment, local);
    			transition_out(componentdetail5.$$.fragment, local);
    			transition_out(componentdetail6.$$.fragment, local);
    			transition_out(componentdetail7.$$.fragment, local);
    			transition_out(componentdetail8.$$.fragment, local);
    			transition_out(componentdetail9.$$.fragment, local);
    			transition_out(componentdetail10.$$.fragment, local);
    			transition_out(componentdetail11.$$.fragment, local);
    			transition_out(componentdetail12.$$.fragment, local);
    			transition_out(componentdetail13.$$.fragment, local);
    			transition_out(responsive.$$.fragment, local);
    			transition_out(componentdetail14.$$.fragment, local);
    			transition_out(componentdetail15.$$.fragment, local);
    			transition_out(menu.$$.fragment, local);
    			transition_out(quantity.$$.fragment, local);
    			transition_out(dropdown0.$$.fragment, local);
    			transition_out(dropdown1.$$.fragment, local);
    			transition_out(dropdown2.$$.fragment, local);
    			transition_out(card.$$.fragment, local);
    			transition_out(label.$$.fragment, local);
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			transition_out(icon2.$$.fragment, local);
    			transition_out(icon3.$$.fragment, local);
    			transition_out(tooltip0.$$.fragment, local);
    			transition_out(tooltip1.$$.fragment, local);
    			transition_out(bottombar.$$.fragment, local);
    			transition_out(bottommodal.$$.fragment, local);
    			transition_out(bottomsheet.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(componentdetail0);
    			destroy_component(componentdetail1);
    			destroy_component(componentdetail2);
    			destroy_component(componentdetail3);
    			destroy_component(dock0);
    			destroy_component(dock1);
    			destroy_component(componentdetail4);
    			destroy_component(componentdetail5);
    			destroy_component(componentdetail6);
    			destroy_component(componentdetail7);
    			destroy_component(componentdetail8);
    			destroy_component(componentdetail9);
    			destroy_component(componentdetail10);
    			destroy_component(componentdetail11);
    			destroy_component(componentdetail12);
    			destroy_component(componentdetail13);
    			destroy_component(responsive);
    			destroy_component(componentdetail14);
    			destroy_component(componentdetail15);
    			destroy_component(menu);
    			destroy_component(quantity);
    			destroy_component(dropdown0);
    			destroy_component(dropdown1);
    			destroy_component(dropdown2);
    			destroy_component(card);
    			destroy_component(label);
    			destroy_component(icon0);
    			destroy_component(icon1);
    			destroy_component(icon2);
    			destroy_component(icon3);
    			destroy_component(tooltip0);
    			destroy_component(tooltip1);
    			destroy_component(bottombar);
    			if (detaching) detach_dev(t40);
    			destroy_component(bottommodal, detaching);
    			if (detaching) detach_dev(t41);
    			destroy_component(bottomsheet, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$G.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$1 = v => `${v}%`;
    const func_1 = v => `${v}%`;

    function instance$G($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	

    	// import InfiniteScroll from "../components/infinite-scroll/src/InfiniteScroll.svelte";
    	// import FloatingActionButton from "../components/fab/src/FloatingActionButton.svelte";
    	console.log(Snackbar$1);

    	let loading = true;

    	setTimeout(
    		() => {
    			
    		},
    		1500
    	); // loading = false;
    	// loading = false;

    	const wrapComponent = (Component, props = {}, events = {}) => {
    		return function (opts) {
    			opts.props || (opts.props = {});
    			Object.assign(opts.props, props);
    			const comp = new Component(opts);

    			Object.entries(events).every(([event, cb]) => {
    				comp.$on(event, cb);
    			});

    			return comp;
    		};
    	};

    	const displayMessage = () => {
    		
    	}; // message.open();

    	const uploadUrl = `https://api.imgbb.com/1/upload?expiration=600&key=1ee88e36c9774d863a1d133669f3f4d6`;

    	const columns = [
    		{ title: "Name", key: "name" },
    		{
    			title: "Email",
    			key: "email",
    			value: v => v ? v : "-"
    		},
    		{
    			title: "Amount",
    			align: "right",
    			value: ({ amount }) => `RM ${(amount || 0).toFixed(2)}`
    		},
    		{
    			title: "Offline",
    			align: "center",
    			component: ({ online }) => wrapComponent(Online, { online })
    		},
    		{
    			title: "Age",
    			align: "center",
    			key: "age"
    		},
    		{ title: "Created", key: "created" }
    	];

    	const datas = [
    		{
    			key: "1",
    			name: "John Doe",
    			age: 19,
    			online: false,
    			amount: 10.5,
    			created: "2020 Jan 01"
    		},
    		{
    			key: "2",
    			name: "Willie",
    			email: "willie@hotmail.com",
    			age: 24,
    			online: false,
    			amount: 3.38,
    			created: "2020 Feb 27"
    		},
    		{
    			key: "3",
    			name: "The Joker",
    			age: 16,
    			online: true,
    			amount: 1020.6,
    			created: "2006 Oct 1"
    		},
    		{
    			key: "4",
    			name: "Batman",
    			age: 30,
    			online: false,
    			amount: 1.445,
    			created: "2006 Oct 1"
    		},
    		{
    			key: "5",
    			name: "The Joker",
    			age: 16,
    			online: true,
    			amount: 45.78,
    			created: "2006 Oct 1"
    		}
    	];

    	const uploadSuccessful = ({ detail }) => {
    		console.log(detail.response);
    		console.log(detail);
    	};

    	let disabledButton = false;
    	let showModal = false;
    	let showBottomSheet = false;
    	const defaultItems = ["John Doe", "Testing", "tester", "unittest"];
    	let items = defaultItems.slice();

    	const onSearch = ({ detail }) => {
    		const regexp = new RegExp(detail, "i");
    		$$invalidate(3, items = defaultItems.filter(v => regexp.test(v)));
    		console.log(detail);
    	};

    	const showNotification = variant => () => {
    		show({ text: "testing" });
    	}; // success({
    	//   title: "Apple can get away with this because they’re well, Apple.",
    	//   description:
    	//     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    	//   duration: 0,

    	//   placement: "top-right",
    	// });
    	// const items = [
    	//   { title: "Dashboard", icon: "stat" },
    	//   { title: "Reporting", icon: "receipt" },
    	//   {
    	//     title: "Long title here, lorem ipsum etc....",
    	//     href: "https://www.google.com",
    	//     align: "center",
    	//   },
    	//   {
    	//     title: "Long title here, lorem ipsum etc....",
    	//     submenus: [{ title: "C.B" }, { title: "C.C" }],
    	//   },
    	// ];
    	const options = [
    		{
    			title: "CC",
    			value: "cc",
    			onClick: () => {
    				console.log("clicked!!!!");
    			}
    		},
    		{
    			title: "Option A",
    			value: "a",
    			disabled: true
    		},
    		{ title: "Z", value: "z" },
    		{ divider: true },
    		{
    			title: "Option B",
    			value: "b",
    			href: "#B"
    		},
    		{ title: "Option C", value: "c" },
    		{ title: "Option D", value: "d" },
    		{ title: "Option E", value: "e" },
    		{ title: "Option F", value: "f" },
    		{ title: "Option G", value: "g" }
    	];

    	let step = 0;

    	const uploadProps = {
    		name: "image",
    		url: "https://api.imgur.com/3/upload",
    		method: "post",
    		headers: {
    			Authorization: "Client-ID a70383e65634c6d"
    		}
    	};

    	const accordionItems = [
    		{
    			title: "Title 1",
    			collapsed: false,
    			content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!"
    		},
    		{
    			title: "Title 2",
    			disabled: true,
    			content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. B, in!"
    		},
    		{
    			title: "Component",
    			content: wrapComponent(Online, { online: false })
    		}
    	];

    	const tabItems = [
    		{
    			title: "Item A",
    			options: [
    				{
    					title: "Item A - First Option",
    					icon: wrapComponent(Logo, {}),
    					value: "a1"
    				},
    				{
    					title: "Item A - Second Option",
    					value: "a2",
    					disabled: true
    				},
    				{
    					title: "Item A - Third Option",
    					icon: wrapComponent(Logo, {}),
    					value: "a3"
    				},
    				{
    					title: "Item A - Fi  asjdosad;laksd;kas; sadasdfthaaaaaaà230129839218hsajkhdkasjd Option",
    					value: "a13",
    					nowrap: true
    				},
    				{
    					title: "Item A - Fourth Option",
    					value: "a4"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a5"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a6"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a7"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a8"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a9"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a10"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a11"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a12"
    				},
    				{
    					title: "Item A - Fifth Option",
    					value: "a14"
    				}
    			]
    		},
    		{
    			title: "Item B",
    			options: [
    				{
    					title: "Item B - First Option",
    					icon: wrapComponent(Logo, {}),
    					value: "b1"
    				},
    				{
    					title: "Item B - Second Option",
    					value: "b2"
    				},
    				{
    					title: "Item B - Third Option",
    					value: "b3"
    				}
    			]
    		},
    		{
    			title: "Item C",
    			options: [
    				{
    					title: "Item C - First Option",
    					value: "c1"
    				},
    				{
    					title: "Item C - Ten Option",
    					value: "c10"
    				}
    			]
    		}
    	];

    	const menus = [
    		{ title: "Item 1", href: "#item1" },
    		{ title: "Item 2", href: "#item2" },
    		{
    			title: "Item Submenu",
    			submenus: [
    				{ title: "Submenu 1", href: "#submenu1" },
    				{
    					title: "Submenu disabled",
    					href: "#submenu-disabled",
    					disabled: true
    				}
    			],
    			collapsed: false
    		}
    	];

    	const handleSelectMenu = ({ detail }) => {
    		var _a;

    		if (detail && detail.length > 0) {
    			$$invalidate(
    				5,
    				menus[detail[detail.length - 1]].collapsed = !((_a = menus[detail[detail.length - 1]]) === null || _a === void 0
    				? void 0
    				: _a.collapsed) || false,
    				menus
    			);
    		}
    	};

    	const onConfirm = ({ detail }) => {
    		console.log(detail);
    	};

    	const onClick = e => {
    		console.log("clicked", e);
    	};

    	const onChange = () => {
    		
    	}; // console.log((<HTMLSelectElement>e.currentTarget).value);

    	let openLeftDock = false;
    	let openRightDock = false;
    	const writable_props = [];

    	Object_1$4.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function dock0_open_binding(value) {
    		openRightDock = value;
    		$$invalidate(7, openRightDock);
    	}

    	function dock1_open_binding(value) {
    		openLeftDock = value;
    		$$invalidate(6, openLeftDock);
    	}

    	const change_handler = e => console.log(e.detail);
    	const click_handler = () => $$invalidate(4, step -= 1);
    	const click_handler_1 = () => $$invalidate(4, step += 1);
    	const click_handler_2 = () => $$invalidate(6, openLeftDock = true);
    	const click_handler_3 = () => $$invalidate(7, openRightDock = true);

    	function switch_1_checked_binding(value) {
    		disabledButton = value;
    		$$invalidate(0, disabledButton);
    	}

    	function bottommodal_open_binding(value) {
    		showModal = value;
    		$$invalidate(1, showModal);
    	}

    	function bottomsheet_open_binding(value) {
    		showBottomSheet = value;
    		$$invalidate(2, showBottomSheet);
    	}

    	$$self.$capture_state = () => ({
    		Accordion,
    		BottomBar,
    		BottomSheet,
    		Button,
    		DatePicker,
    		Header,
    		Dock,
    		Menu,
    		Dropdown,
    		Icon,
    		Label,
    		Loader,
    		Snackbar: Snackbar$1,
    		Row,
    		Column,
    		Search,
    		Table,
    		Tooltip,
    		Tag,
    		Textarea,
    		Upload,
    		Stepper,
    		ComponentDetail,
    		Switch,
    		Card,
    		Input,
    		InputNumber,
    		Poster,
    		Responsive,
    		Ellipsis,
    		Link,
    		Select: Select_1,
    		Online,
    		Logo,
    		BottomModal,
    		Tab,
    		ShowMore,
    		Checkbox,
    		Quantity,
    		loading,
    		wrapComponent,
    		displayMessage,
    		uploadUrl,
    		columns,
    		datas,
    		uploadSuccessful,
    		disabledButton,
    		showModal,
    		showBottomSheet,
    		defaultItems,
    		items,
    		onSearch,
    		showNotification,
    		options,
    		step,
    		uploadProps,
    		accordionItems,
    		tabItems,
    		menus,
    		handleSelectMenu,
    		onConfirm,
    		onClick,
    		onChange,
    		openLeftDock,
    		openRightDock
    	});

    	$$self.$inject_state = $$props => {
    		if ("loading" in $$props) loading = $$props.loading;
    		if ("disabledButton" in $$props) $$invalidate(0, disabledButton = $$props.disabledButton);
    		if ("showModal" in $$props) $$invalidate(1, showModal = $$props.showModal);
    		if ("showBottomSheet" in $$props) $$invalidate(2, showBottomSheet = $$props.showBottomSheet);
    		if ("items" in $$props) $$invalidate(3, items = $$props.items);
    		if ("step" in $$props) $$invalidate(4, step = $$props.step);
    		if ("openLeftDock" in $$props) $$invalidate(6, openLeftDock = $$props.openLeftDock);
    		if ("openRightDock" in $$props) $$invalidate(7, openRightDock = $$props.openRightDock);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		disabledButton,
    		showModal,
    		showBottomSheet,
    		items,
    		step,
    		menus,
    		openLeftDock,
    		openRightDock,
    		uploadUrl,
    		columns,
    		datas,
    		uploadSuccessful,
    		onSearch,
    		showNotification,
    		options,
    		accordionItems,
    		tabItems,
    		handleSelectMenu,
    		onConfirm,
    		onChange,
    		dock0_open_binding,
    		dock1_open_binding,
    		change_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		switch_1_checked_binding,
    		bottommodal_open_binding,
    		bottomsheet_open_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$G, create_fragment$G, safe_not_equal, {}, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$G.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        name: "world",
      },
    });

    if (undefined) {
      undefined.accept();
      undefined.dispose(() => {
        app.$destroy();
      });
    }

    return app;

}());
//# sourceMappingURL=main.js.map
