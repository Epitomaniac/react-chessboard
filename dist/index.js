'use strict';

var React = require('react');
var reactDom = require('react-dom');

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React$1 = React,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React$1 = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React$1["react-stack-bottom-frame"].bind(
	      React$1,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
const canUseDOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';

function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === '[object Window]' || // In Electron context the Window object serializes to [object global]
  elementString === '[object global]';
}

function isNode(node) {
  return 'nodeType' in node;
}

function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;

  if (!target) {
    return window;
  }

  if (isWindow(target)) {
    return target;
  }

  if (!isNode(target)) {
    return window;
  }

  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}

function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}

function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }

  return node instanceof getWindow(node).HTMLElement;
}

function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}

function getOwnerDocument(target) {
  if (!target) {
    return document;
  }

  if (isWindow(target)) {
    return target.document;
  }

  if (!isNode(target)) {
    return document;
  }

  if (isDocument(target)) {
    return target;
  }

  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }

  return document;
}

/**
 * A hook that resolves to useEffect on the server and useLayoutEffect on the client
 * @param callback {function} Callback function that is invoked when the dependencies of the hook change
 */

const useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;

function useEvent(handler) {
  const handlerRef = React.useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}

function useInterval() {
  const intervalRef = React.useRef(null);
  const set = React.useCallback((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = React.useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}

function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }

  const valueRef = React.useRef(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}

function useLazyMemo(callback, dependencies) {
  const valueRef = React.useRef();
  return React.useMemo(() => {
    const newValue = callback(valueRef.current);
    valueRef.current = newValue;
    return newValue;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [...dependencies]);
}

function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = React.useRef(null);
  const setNodeRef = React.useCallback(element => {
    if (element !== node.current) {
      onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
    }

    node.current = element;
  }, //eslint-disable-next-line
  []);
  return [node, setNodeRef];
}

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

let ids = {};
function useUniqueId(prefix, value) {
  return React.useMemo(() => {
    if (value) {
      return value;
    }

    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}

function createAdjustmentFn(modifier) {
  return function (object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }

    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);

      for (const [key, valueAdjustment] of entries) {
        const value = accumulator[key];

        if (value != null) {
          accumulator[key] = value + modifier * valueAdjustment;
        }
      }

      return accumulator;
    }, { ...object
    });
  };
}

const add = /*#__PURE__*/createAdjustmentFn(1);
const subtract = /*#__PURE__*/createAdjustmentFn(-1);

function hasViewportRelativeCoordinates(event) {
  return 'clientX' in event && 'clientY' in event;
}

function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }

  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}

function isTouchEvent(event) {
  if (!event) {
    return false;
  }

  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}

/**
 * Returns the normalized x and y coordinates for mouse and touch events.
 */

function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }

  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

  return null;
}

const CSS = /*#__PURE__*/Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }

  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }

  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }

      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(' ');
    }

  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }

  }
});

const SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }

  return element.querySelector(SELECTOR);
}

const hiddenStyles = {
  display: 'none'
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return React.createElement("div", {
    id: id,
    style: hiddenStyles
  }, value);
}

function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  // Hide element visually but keep it readable by screen readers
  const visuallyHidden = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(100%)',
    whiteSpace: 'nowrap'
  };
  return React.createElement("div", {
    id: id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}

function useAnnouncement() {
  const [announcement, setAnnouncement] = React.useState('');
  const announce = React.useCallback(value => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}

const DndMonitorContext = /*#__PURE__*/React.createContext(null);

function useDndMonitor(listener) {
  const registerListener = React.useContext(DndMonitorContext);
  React.useEffect(() => {
    if (!registerListener) {
      throw new Error('useDndMonitor must be used within a children of <DndContext>');
    }

    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}

function useDndMonitorProvider() {
  const [listeners] = React.useState(() => new Set());
  const registerListener = React.useCallback(listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = React.useCallback(_ref => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach(listener => {
      var _listener$type;

      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}

const defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
const defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },

  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;

    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }

    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },

  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;

    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }

    return "Draggable item " + active.id + " was dropped.";
  },

  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }

};

function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = useAnnouncement();
  const liveRegionId = useUniqueId("DndLiveRegion");
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  useDndMonitor(React.useMemo(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },

    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;

      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },

    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },

    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },

    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }

  }), [announce, announcements]));

  if (!mounted) {
    return null;
  }

  const markup = React.createElement(React.Fragment, null, React.createElement(HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), React.createElement(LiveRegion, {
    id: liveRegionId,
    announcement: announcement
  }));
  return container ? reactDom.createPortal(markup, container) : markup;
}

var Action;

(function (Action) {
  Action["DragStart"] = "dragStart";
  Action["DragMove"] = "dragMove";
  Action["DragEnd"] = "dragEnd";
  Action["DragCancel"] = "dragCancel";
  Action["DragOver"] = "dragOver";
  Action["RegisterDroppable"] = "registerDroppable";
  Action["SetDroppableDisabled"] = "setDroppableDisabled";
  Action["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));

function noop() {}

function useSensor(sensor, options) {
  return React.useMemo(() => ({
    sensor,
    options: options != null ? options : {}
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [sensor, options]);
}

function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }

  return React.useMemo(() => [...sensors].filter(sensor => sensor != null), // eslint-disable-next-line react-hooks/exhaustive-deps
  [...sensors]);
}

const defaultCoordinates = /*#__PURE__*/Object.freeze({
  x: 0,
  y: 0
});

/**
 * Returns the distance between two points
 */
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function getRelativeTransformOrigin(event, rect) {
  const eventCoordinates = getEventCoordinates(event);

  if (!eventCoordinates) {
    return '0 0';
  }

  const transformOrigin = {
    x: (eventCoordinates.x - rect.left) / rect.width * 100,
    y: (eventCoordinates.y - rect.top) / rect.height * 100
  };
  return transformOrigin.x + "% " + transformOrigin.y + "%";
}

/**
 * Sort collisions from smallest to greatest value
 */
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
/**
 * Sort collisions from greatest to smallest value
 */

function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
/**
 * Returns the coordinates of the corners of a given rectangle:
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */

function cornersOfRectangle(_ref5) {
  let {
    left,
    top,
    height,
    width
  } = _ref5;
  return [{
    x: left,
    y: top
  }, {
    x: left + width,
    y: top
  }, {
    x: left,
    y: top + height
  }, {
    x: left + width,
    y: top + height
  }];
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }

  const [firstCollision] = collisions;
  return firstCollision[property] ;
}

/**
 * Returns the intersecting rectangle area between two rectangles
 */

function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;

  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  } // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)


  return 0;
}
/**
 * Returns the rectangles that has the greatest intersection area with a given
 * rectangle in an array of rectangles.
 */

const rectIntersection = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);

      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }

  return collisions.sort(sortCollisionsDesc);
};

/**
 * Check if a given point is contained within a bounding rectangle
 */

function isPointWithinRect(point, rect) {
  const {
    top,
    left,
    bottom,
    right
  } = rect;
  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
}
/**
 * Returns the rectangles that the pointer is hovering over
 */


const pointerWithin = _ref => {
  let {
    droppableContainers,
    droppableRects,
    pointerCoordinates
  } = _ref;

  if (!pointerCoordinates) {
    return [];
  }

  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect && isPointWithinRect(pointerCoordinates, rect)) {
      /* There may be more than a single rectangle intersecting
       * with the pointer coordinates. In order to sort the
       * colliding rectangles, we measure the distance between
       * the pointer and the corners of the intersecting rectangle
       */
      const corners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner) => {
        return accumulator + distanceBetween(pointerCoordinates, corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

function adjustScale(transform, rect1, rect2) {
  return { ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}

function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}

function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }

    return adjustments.reduce((acc, adjustment) => ({ ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), { ...rect
    });
  };
}
const getAdjustedRect = /*#__PURE__*/createRectAdjustmentFn(1);

function parseTransform(transform) {
  if (transform.startsWith('matrix3d(')) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith('matrix(')) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }

  return null;
}

function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);

  if (!parsedTransform) {
    return rect;
  }

  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(' ') + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}

const defaultOptions = {
  ignoreTransform: false
};
/**
 * Returns the bounding client rect of an element relative to the viewport.
 */

function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }

  let rect = element.getBoundingClientRect();

  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = getWindow(element).getComputedStyle(element);

    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }

  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
/**
 * Returns the bounding client rect of an element relative to the viewport.
 *
 * @remarks
 * The ClientRect returned by this method does not take into account transforms
 * applied to the element it measures.
 *
 */

function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}

function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}

function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(node).getComputedStyle(node);
  }

  return computedStyle.position === 'fixed';
}

function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(element).getComputedStyle(element);
  }

  const overflowRegex = /(auto|scroll|overlay)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.some(property => {
    const value = computedStyle[property];
    return typeof value === 'string' ? overflowRegex.test(value) : false;
  });
}

function getScrollableAncestors(element, limit) {
  const scrollParents = [];

  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }

    if (!node) {
      return scrollParents;
    }

    if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }

    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents;
    }

    if (scrollParents.includes(node)) {
      return scrollParents;
    }

    const computedStyle = getWindow(element).getComputedStyle(node);

    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }

    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }

    return findScrollableAncestors(node.parentNode);
  }

  if (!element) {
    return scrollParents;
  }

  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}

function getScrollableElement(element) {
  if (!canUseDOM || !element) {
    return null;
  }

  if (isWindow(element)) {
    return element;
  }

  if (!isNode(element)) {
    return null;
  }

  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window;
  }

  if (isHTMLElement(element)) {
    return element;
  }

  return null;
}

function getScrollXCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollX;
  }

  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollY;
  }

  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}

var Direction;

(function (Direction) {
  Direction[Direction["Forward"] = 1] = "Forward";
  Direction[Direction["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));

function isDocumentScrollingElement(element) {
  if (!canUseDOM || !element) {
    return false;
  }

  return element === document.scrollingElement;
}

function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}

const defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;

  if (acceleration === void 0) {
    acceleration = 10;
  }

  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }

  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };

  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    // Scroll Up
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    // Scroll Down
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }

  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    // Scroll Right
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    // Scroll Left
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }

  return {
    direction,
    speed
  };
}

function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }

  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}

function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return add(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}

function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }

  if (!element) {
    return;
  }

  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);

  if (!firstScrollableAncestor) {
    return;
  }

  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: 'center',
      inline: 'center'
    });
  }
}

const properties = [['x', ['left', 'right'], getScrollXOffset], ['y', ['top', 'bottom'], getScrollYOffset]];
class Rect {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = { ...rect
    };
    this.width = rect.width;
    this.height = rect.height;

    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key of keys) {
        Object.defineProperty(this, key, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }

    Object.defineProperty(this, 'rect', {
      enumerable: false
    });
  }

}

class Listeners {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];

    this.removeAll = () => {
      this.listeners.forEach(listener => {
        var _this$target;

        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };

    this.target = target;
  }

  add(eventName, handler, options) {
    var _this$target2;

    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }

}

function getEventListenerTarget(target) {
  // If the `event.target` element is removed from the document events will still be targeted
  // at it, and hence won't always bubble up to the window or document anymore.
  // If there is any risk of an element being removed while it is being dragged,
  // the best practice is to attach the event listeners directly to the target.
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  const {
    EventTarget
  } = getWindow(target);
  return target instanceof EventTarget ? target : getOwnerDocument(target);
}

function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);

  if (typeof measurement === 'number') {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }

  if ('x' in measurement && 'y' in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }

  if ('x' in measurement) {
    return dx > measurement.x;
  }

  if ('y' in measurement) {
    return dy > measurement.y;
  }

  return false;
}

var EventName;

(function (EventName) {
  EventName["Click"] = "click";
  EventName["DragStart"] = "dragstart";
  EventName["Keydown"] = "keydown";
  EventName["ContextMenu"] = "contextmenu";
  EventName["Resize"] = "resize";
  EventName["SelectionChange"] = "selectionchange";
  EventName["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));

function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}

var KeyboardCode;

(function (KeyboardCode) {
  KeyboardCode["Space"] = "Space";
  KeyboardCode["Down"] = "ArrowDown";
  KeyboardCode["Right"] = "ArrowRight";
  KeyboardCode["Left"] = "ArrowLeft";
  KeyboardCode["Up"] = "ArrowUp";
  KeyboardCode["Esc"] = "Escape";
  KeyboardCode["Enter"] = "Enter";
  KeyboardCode["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));

const defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
const defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;

  switch (event.code) {
    case KeyboardCode.Right:
      return { ...currentCoordinates,
        x: currentCoordinates.x + 25
      };

    case KeyboardCode.Left:
      return { ...currentCoordinates,
        x: currentCoordinates.x - 25
      };

    case KeyboardCode.Down:
      return { ...currentCoordinates,
        y: currentCoordinates.y + 25
      };

    case KeyboardCode.Up:
      return { ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }

  return undefined;
};

class KeyboardSensor {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners(getOwnerDocument(target));
    this.windowListeners = new Listeners(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }

  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }

  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;

    if (node) {
      scrollIntoViewIfNeeded(node);
    }

    onStart(defaultCoordinates);
  }

  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = 'smooth'
      } = options;
      const {
        code
      } = event;

      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }

      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }

      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;

      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }

      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });

      if (newCoordinates) {
        const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;

        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;

          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;

            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }

            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }

            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;

            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }

            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }

            break;
          }
        }

        this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }

  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }

  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }

  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }

  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }

}
KeyboardSensor.activators = [{
  eventName: 'onKeyDown',
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;

    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;

      if (activator && event.target !== activator) {
        return false;
      }

      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }

    return false;
  }
}];

function isDistanceConstraint(constraint) {
  return Boolean(constraint && 'distance' in constraint);
}

function isDelayConstraint(constraint) {
  return Boolean(constraint && 'delay' in constraint);
}

class AbstractPointerSensor {
  constructor(props, events, listenerTarget) {
    var _getEventCoordinates;

    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }

    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events;
    this.document = getOwnerDocument(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners(getWindow(target));
    this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }

  attach() {
    const {
      events,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events.end.name, this.handleEnd);

    if (events.cancel) {
      this.listeners.add(events.cancel.name, this.handleCancel);
    }

    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);

    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }

      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }

      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }

    this.handleStart();
  }

  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll(); // Wait until the next event loop before removing document listeners
    // This is necessary because we listen for `click` and `selection` events on the document

    setTimeout(this.documentListeners.removeAll, 50);

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }

  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;

    if (initialCoordinates) {
      this.activated = true; // Stop propagation of click events once activation constraints are met

      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      }); // Remove any text selection from the document

      this.removeTextSelection(); // Prevent further text selection while dragging

      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }

  handleMove(event) {
    var _getEventCoordinates2;

    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;

    if (!initialCoordinates) {
      return;
    }

    const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = subtract(initialCoordinates, coordinates); // Constraint validation

    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }

        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }

      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }

      this.handlePending(activationConstraint, delta);
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    onMove(coordinates);
  }

  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();

    if (!this.activated) {
      onAbort(this.props.active);
    }

    onEnd();
  }

  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();

    if (!this.activated) {
      onAbort(this.props.active);
    }

    onCancel();
  }

  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }

  removeTextSelection() {
    var _this$document$getSel;

    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }

}

const events = {
  cancel: {
    name: 'pointercancel'
  },
  move: {
    name: 'pointermove'
  },
  end: {
    name: 'pointerup'
  }
};
class PointerSensor extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props; // Pointer events stop firing if the target is unmounted while dragging
    // Therefore we attach listeners to the owner document instead

    const listenerTarget = getOwnerDocument(event.target);
    super(props, events, listenerTarget);
  }

}
PointerSensor.activators = [{
  eventName: 'onPointerDown',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;

    if (!event.isPrimary || event.button !== 0) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

const events$1 = {
  move: {
    name: 'mousemove'
  },
  end: {
    name: 'mouseup'
  }
};
var MouseButton;

(function (MouseButton) {
  MouseButton[MouseButton["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));

class MouseSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, getOwnerDocument(props.event.target));
  }

}
MouseSensor.activators = [{
  eventName: 'onMouseDown',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;

    if (event.button === MouseButton.RightClick) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

const events$2 = {
  cancel: {
    name: 'touchcancel'
  },
  move: {
    name: 'touchmove'
  },
  end: {
    name: 'touchend'
  }
};
class TouchSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }

  static setup() {
    // Adding a non-capture and non-passive `touchmove` listener in order
    // to force `event.preventDefault()` calls to work in dynamically added
    // touchmove event handlers. This is required for iOS Safari.
    window.addEventListener(events$2.move.name, noop, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop);
    }; // We create a new handler because the teardown function of another sensor
    // could remove our event listener if we use a referentially equal listener.

    function noop() {}
  }

}
TouchSensor.activators = [{
  eventName: 'onTouchStart',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;

    if (touches.length > 1) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

var AutoScrollActivator;

(function (AutoScrollActivator) {
  AutoScrollActivator[AutoScrollActivator["Pointer"] = 0] = "Pointer";
  AutoScrollActivator[AutoScrollActivator["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));

var TraversalOrder;

(function (TraversalOrder) {
  TraversalOrder[TraversalOrder["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder[TraversalOrder["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));

function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
  const scrollSpeed = React.useRef({
    x: 0,
    y: 0
  });
  const scrollDirection = React.useRef({
    x: 0,
    y: 0
  });
  const rect = React.useMemo(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;

      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = React.useRef(null);
  const autoScroll = React.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = React.useMemo(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  React.useEffect(() => {
    if (!enabled || !scrollableAncestors.length || !rect) {
      clearAutoScrollInterval();
      return;
    }

    for (const scrollContainer of sortedScrollableAncestors) {
      if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
        continue;
      }

      const index = scrollableAncestors.indexOf(scrollContainer);
      const scrollContainerRect = scrollableAncestorRects[index];

      if (!scrollContainerRect) {
        continue;
      }

      const {
        direction,
        speed
      } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);

      for (const axis of ['x', 'y']) {
        if (!scrollIntent[axis][direction[axis]]) {
          speed[axis] = 0;
          direction[axis] = 0;
        }
      }

      if (speed.x > 0 || speed.y > 0) {
        clearAutoScrollInterval();
        scrollContainerRef.current = scrollContainer;
        setAutoScrollInterval(autoScroll, interval);
        scrollSpeed.current = speed;
        scrollDirection.current = direction;
        return;
      }
    }

    scrollSpeed.current = {
      x: 0,
      y: 0
    };
    scrollDirection.current = {
      x: 0,
      y: 0
    };
    clearAutoScrollInterval();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [acceleration, autoScroll, canScroll, clearAutoScrollInterval, enabled, interval, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(rect), // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(scrollIntent), setAutoScrollInterval, scrollableAncestors, sortedScrollableAncestors, scrollableAncestorRects, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(threshold)]);
}
const defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};

function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = usePrevious(delta);
  return useLazyMemo(previousIntent => {
    if (disabled || !previousDelta || !previousIntent) {
      // Reset scroll intent tracking when auto-scrolling is disabled
      return defaultScrollIntent;
    }

    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    }; // Keep track of the user intent to scroll in each direction for both axis

    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}

function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : undefined;
  const node = draggableNode ? draggableNode.node.current : null;
  return useLazyMemo(cachedNode => {
    var _ref;

    if (id == null) {
      return null;
    } // In some cases, the draggable node can unmount while dragging
    // This is the case for virtualized lists. In those situations,
    // we fall back to the last known value for that node.


    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}

function useCombineActivators(sensors, getSyntheticHandler) {
  return React.useMemo(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map(activator => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}

var MeasuringStrategy;

(function (MeasuringStrategy) {
  MeasuringStrategy[MeasuringStrategy["Always"] = 0] = "Always";
  MeasuringStrategy[MeasuringStrategy["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy[MeasuringStrategy["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));

var MeasuringFrequency;

(function (MeasuringFrequency) {
  MeasuringFrequency["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));

const defaultValue = /*#__PURE__*/new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = React.useState(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = React.useRef(containers);
  const disabled = isDisabled();
  const disabledRef = useLatestValue(disabled);
  const measureDroppableContainers = React.useCallback(function (ids) {
    if (ids === void 0) {
      ids = [];
    }

    if (disabledRef.current) {
      return;
    }

    setQueue(value => {
      if (value === null) {
        return ids;
      }

      return value.concat(ids.filter(id => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = React.useRef(null);
  const droppableRects = useLazyMemo(previousValue => {
    if (disabled && !dragging) {
      return defaultValue;
    }

    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = new Map();

      for (let container of containers) {
        if (!container) {
          continue;
        }

        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          // This container does not need to be re-measured
          map.set(container.id, container.rect.current);
          continue;
        }

        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;

        if (rect) {
          map.set(container.id, rect);
        }
      }

      return map;
    }

    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  React.useEffect(() => {
    containersRef.current = containers;
  }, [containers]);
  React.useEffect(() => {
    if (disabled) {
      return;
    }

    measureDroppableContainers();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [dragging, disabled]);
  React.useEffect(() => {
    if (queue && queue.length > 0) {
      setQueue(null);
    }
  }, //eslint-disable-next-line react-hooks/exhaustive-deps
  [JSON.stringify(queue)]);
  React.useEffect(() => {
    if (disabled || typeof frequency !== 'number' || timeoutId.current !== null) {
      return;
    }

    timeoutId.current = setTimeout(() => {
      measureDroppableContainers();
      timeoutId.current = null;
    }, frequency);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [frequency, disabled, measureDroppableContainers, ...dependencies]);
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };

  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;

      case MeasuringStrategy.BeforeDragging:
        return dragging;

      default:
        return !dragging;
    }
  }
}

function useInitialValue(value, computeFn) {
  return useLazyMemo(previousValue => {
    if (!value) {
      return null;
    }

    if (previousValue) {
      return previousValue;
    }

    return typeof computeFn === 'function' ? computeFn(value) : value;
  }, [computeFn, value]);
}

function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}

/**
 * Returns a new MutationObserver instance.
 * If `MutationObserver` is undefined in the execution environment, returns `undefined`.
 */

function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = useEvent(callback);
  const mutationObserver = React.useMemo(() => {
    if (disabled || typeof window === 'undefined' || typeof window.MutationObserver === 'undefined') {
      return undefined;
    }

    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  React.useEffect(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}

/**
 * Returns a new ResizeObserver instance bound to the `onResize` callback.
 * If `ResizeObserver` is undefined in the execution environment, returns `undefined`.
 */

function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = useEvent(callback);
  const resizeObserver = React.useMemo(() => {
    if (disabled || typeof window === 'undefined' || typeof window.ResizeObserver === 'undefined') {
      return undefined;
    }

    const {
      ResizeObserver
    } = window;
    return new ResizeObserver(handleResize);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [disabled]);
  React.useEffect(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}

function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}

function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }

  const [rect, setRect] = React.useState(null);

  function measureRect() {
    setRect(currentRect => {
      if (!element) {
        return null;
      }

      if (element.isConnected === false) {
        var _ref;

        // Fall back to last rect we measured if the element is
        // no longer connected to the DOM.
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }

      const newRect = measure(element);

      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }

      return newRect;
    });
  }

  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }

      for (const record of records) {
        const {
          type,
          target
        } = record;

        if (type === 'childList' && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }

  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  useIsomorphicLayoutEffect(() => {
    measureRect();

    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}

function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}

const defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = React.useRef(node);
  const ancestors = useLazyMemo(previousValue => {
    if (!node) {
      return defaultValue$1;
    }

    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }

    return getScrollableAncestors(node);
  }, [node]);
  React.useEffect(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}

function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = React.useState(null);
  const prevElements = React.useRef(elements); // To-do: Throttle the handleScroll callback

  const handleScroll = React.useCallback(event => {
    const scrollingElement = getScrollableElement(event.target);

    if (!scrollingElement) {
      return;
    }

    setScrollCoordinates(scrollCoordinates => {
      if (!scrollCoordinates) {
        return null;
      }

      scrollCoordinates.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates);
    });
  }, []);
  React.useEffect(() => {
    const previousElements = prevElements.current;

    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map(element => {
        const scrollableElement = getScrollableElement(element);

        if (scrollableElement) {
          scrollableElement.addEventListener('scroll', handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }

        return null;
      }).filter(entry => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }

    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };

    function cleanup(elements) {
      elements.forEach(element => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener('scroll', handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return React.useMemo(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }

    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}

function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }

  const initialScrollOffsets = React.useRef(null);
  React.useEffect(() => {
    initialScrollOffsets.current = null;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  dependencies);
  React.useEffect(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;

    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }

    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}

function useSensorSetup(sensors) {
  React.useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    const teardownFns = sensors.map(_ref => {
      let {
        sensor
      } = _ref;
      return sensor.setup == null ? void 0 : sensor.setup();
    });
    return () => {
      for (const teardown of teardownFns) {
        teardown == null ? void 0 : teardown();
      }
    };
  }, // TO-DO: Sensors length could theoretically change which would not be a valid dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  sensors.map(_ref2 => {
    let {
      sensor
    } = _ref2;
    return sensor;
  }));
}

function useSyntheticListeners(listeners, id) {
  return React.useMemo(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;

      acc[eventName] = event => {
        handler(event, id);
      };

      return acc;
    }, {});
  }, [listeners, id]);
}

function useWindowRect(element) {
  return React.useMemo(() => element ? getWindowClientRect(element) : null, [element]);
}

const defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }

  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
  const [rects, setRects] = React.useState(defaultValue$2);

  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }

      return elements.map(element => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }

  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  useIsomorphicLayoutEffect(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach(element => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}

function getMeasurableNode(node) {
  if (!node) {
    return null;
  }

  if (node.children.length > 1) {
    return node;
  }

  const firstChild = node.children[0];
  return isHTMLElement(firstChild) ? firstChild : node;
}

function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = React.useState(null);
  const handleResize = React.useCallback(entries => {
    for (const {
      target
    } of entries) {
      if (isHTMLElement(target)) {
        setRect(rect => {
          const newRect = measure(target);
          return rect ? { ...rect,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = React.useCallback(element => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();

    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }

    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = useNodeRef(handleNodeChange);
  return React.useMemo(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}

const defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
const defaultData = {
  current: {}
};
const defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};

class DroppableContainersMap extends Map {
  get(id) {
    var _super$get;

    return id != null ? (_super$get = super.get(id)) != null ? _super$get : undefined : undefined;
  }

  toArray() {
    return Array.from(this.values());
  }

  getEnabled() {
    return this.toArray().filter(_ref => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }

  getNodeFor(id) {
    var _this$get$node$curren, _this$get;

    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : undefined;
  }

}

const defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /*#__PURE__*/new Map(),
  droppableRects: /*#__PURE__*/new Map(),
  droppableContainers: /*#__PURE__*/new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
const defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ''
  },
  dispatch: noop,
  draggableNodes: /*#__PURE__*/new Map(),
  over: null,
  measureDroppableContainers: noop
};
const InternalContext = /*#__PURE__*/React.createContext(defaultInternalContext);
const PublicContext = /*#__PURE__*/React.createContext(defaultPublicContext);

function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return { ...state,
        draggable: { ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };

    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }

      return { ...state,
        draggable: { ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };

    case Action.DragEnd:
    case Action.DragCancel:
      return { ...state,
        draggable: { ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };

    case Action.RegisterDroppable:
      {
        const {
          element
        } = action;
        const {
          id
        } = element;
        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, element);
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    case Action.SetDroppableDisabled:
      {
        const {
          id,
          key,
          disabled
        } = action;
        const element = state.droppable.containers.get(id);

        if (!element || key !== element.key) {
          return state;
        }

        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, { ...element,
          disabled
        });
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    case Action.UnregisterDroppable:
      {
        const {
          id,
          key
        } = action;
        const element = state.droppable.containers.get(id);

        if (!element || key !== element.key) {
          return state;
        }

        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.delete(id);
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    default:
      {
        return state;
      }
  }
}

function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = React.useContext(InternalContext);
  const previousActivatorEvent = usePrevious(activatorEvent);
  const previousActiveId = usePrevious(active == null ? void 0 : active.id); // Restore keyboard focus on the activator node

  React.useEffect(() => {
    if (disabled) {
      return;
    }

    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!isKeyboardEvent(previousActivatorEvent)) {
        return;
      }

      if (document.activeElement === previousActivatorEvent.target) {
        // No need to restore focus
        return;
      }

      const draggableNode = draggableNodes.get(previousActiveId);

      if (!draggableNode) {
        return;
      }

      const {
        activatorNode,
        node
      } = draggableNode;

      if (!activatorNode.current && !node.current) {
        return;
      }

      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }

          const focusableNode = findFirstFocusableNode(element);

          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}

function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}

function useMeasuringConfiguration(config) {
  return React.useMemo(() => ({
    draggable: { ...defaultMeasuringConfiguration.draggable,
      ...(config == null ? void 0 : config.draggable)
    },
    droppable: { ...defaultMeasuringConfiguration.droppable,
      ...(config == null ? void 0 : config.droppable)
    },
    dragOverlay: { ...defaultMeasuringConfiguration.dragOverlay,
      ...(config == null ? void 0 : config.dragOverlay)
    }
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]);
}

function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = React.useRef(false);
  const {
    x,
    y
  } = typeof config === 'boolean' ? {
    x: config,
    y: config
  } : config;
  useIsomorphicLayoutEffect(() => {
    const disabled = !x && !y;

    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }

    if (initialized.current || !initialRect) {
      // Return early if layout shift scroll compensation was already attempted
      // or if there is no initialRect to compare to.
      return;
    } // Get the most up to date node ref for the active draggable


    const node = activeNode == null ? void 0 : activeNode.node.current;

    if (!node || node.isConnected === false) {
      // Return early if there is no attached node ref or if the node is
      // disconnected from the document.
      return;
    }

    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);

    if (!x) {
      rectDelta.x = 0;
    }

    if (!y) {
      rectDelta.y = 0;
    } // Only perform layout shift scroll compensation once


    initialized.current = true;

    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);

      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}

const ActiveDraggableContext = /*#__PURE__*/React.createContext({ ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;

(function (Status) {
  Status[Status["Uninitialized"] = 0] = "Uninitialized";
  Status[Status["Initializing"] = 1] = "Initializing";
  Status[Status["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));

const DndContext = /*#__PURE__*/React.memo(function DndContext(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;

  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = React.useReducer(reducer, undefined, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = React.useState(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = React.useRef({
    initial: null,
    translated: null
  });
  const active = React.useMemo(() => {
    var _node$data;

    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = React.useRef(null);
  const [activeSensor, setActiveSensor] = React.useState(null);
  const [activatorEvent, setActivatorEvent] = React.useState(null);
  const latestProps = useLatestValue(props, Object.values(props));
  const draggableDescribedById = useUniqueId("DndDescribedBy", id);
  const enabledDroppableContainers = React.useMemo(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = React.useMemo(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = React.useRef({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  }); // Use the rect of the drag overlay if it is mounted

  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect); // The delta between the previous and new position of the draggable node
  // is only relevant when there is no drag overlay

  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect); // Get the window rect of the dragging node

  const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null); // Get scrollable ancestors of the dragging node

  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors); // Apply modifiers

  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors); // Represents the scroll delta since dragging was initiated

  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets); // Represents the scroll delta since the last time the active node rect was measured

  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, 'id');
  const [over, setOver] = React.useState(null); // When there is no drag overlay used, we need to account for the
  // window scroll delta

  const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = React.useRef(null);
  const instantiateSensor = React.useCallback((event, _ref2) => {
    let {
      sensor: Sensor,
      options
    } = _ref2;

    if (activeRef.current == null) {
      return;
    }

    const activeNode = draggableNodes.get(activeRef.current);

    if (!activeNode) {
      return;
    }

    const activatorEvent = event.nativeEvent;
    const sensorInstance = new Sensor({
      active: activeRef.current,
      activeNode,
      event: activatorEvent,
      options,
      // Sensors need to be instantiated with refs for arguments that change over time
      // otherwise they are frozen in time with the stale arguments
      context: sensorContext,

      onAbort(id) {
        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragAbort
        } = latestProps.current;
        const event = {
          id
        };
        onDragAbort == null ? void 0 : onDragAbort(event);
        dispatchMonitorEvent({
          type: 'onDragAbort',
          event
        });
      },

      onPending(id, constraint, initialCoordinates, offset) {
        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragPending
        } = latestProps.current;
        const event = {
          id,
          constraint,
          initialCoordinates,
          offset
        };
        onDragPending == null ? void 0 : onDragPending(event);
        dispatchMonitorEvent({
          type: 'onDragPending',
          event
        });
      },

      onStart(initialCoordinates) {
        const id = activeRef.current;

        if (id == null) {
          return;
        }

        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragStart
        } = latestProps.current;
        const event = {
          activatorEvent,
          active: {
            id,
            data: draggableNode.data,
            rect: activeRects
          }
        };
        reactDom.unstable_batchedUpdates(() => {
          onDragStart == null ? void 0 : onDragStart(event);
          setStatus(Status.Initializing);
          dispatch({
            type: Action.DragStart,
            initialCoordinates,
            active: id
          });
          dispatchMonitorEvent({
            type: 'onDragStart',
            event
          });
          setActiveSensor(activeSensorRef.current);
          setActivatorEvent(activatorEvent);
        });
      },

      onMove(coordinates) {
        dispatch({
          type: Action.DragMove,
          coordinates
        });
      },

      onEnd: createHandler(Action.DragEnd),
      onCancel: createHandler(Action.DragCancel)
    });
    activeSensorRef.current = sensorInstance;

    function createHandler(type) {
      return async function handler() {
        const {
          active,
          collisions,
          over,
          scrollAdjustedTranslate
        } = sensorContext.current;
        let event = null;

        if (active && scrollAdjustedTranslate) {
          const {
            cancelDrop
          } = latestProps.current;
          event = {
            activatorEvent,
            active: active,
            collisions,
            delta: scrollAdjustedTranslate,
            over
          };

          if (type === Action.DragEnd && typeof cancelDrop === 'function') {
            const shouldCancel = await Promise.resolve(cancelDrop(event));

            if (shouldCancel) {
              type = Action.DragCancel;
            }
          }
        }

        activeRef.current = null;
        reactDom.unstable_batchedUpdates(() => {
          dispatch({
            type
          });
          setStatus(Status.Uninitialized);
          setOver(null);
          setActiveSensor(null);
          setActivatorEvent(null);
          activeSensorRef.current = null;
          const eventName = type === Action.DragEnd ? 'onDragEnd' : 'onDragCancel';

          if (event) {
            const handler = latestProps.current[eventName];
            handler == null ? void 0 : handler(event);
            dispatchMonitorEvent({
              type: eventName,
              event
            });
          }
        });
      };
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [draggableNodes]);
  const bindActivatorToSensorInstantiator = React.useCallback((handler, sensor) => {
    return (event, active) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active);

      if ( // Another sensor is already instantiating
      activeRef.current !== null || // No active draggable
      !activeDraggableNode || // Event has already been captured
      nativeEvent.dndKit || nativeEvent.defaultPrevented) {
        return;
      }

      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);

      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  useIsomorphicLayoutEffect(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  React.useEffect(() => {
    const {
      onDragMove
    } = latestProps.current;
    const {
      active,
      activatorEvent,
      collisions,
      over
    } = sensorContext.current;

    if (!active || !activatorEvent) {
      return;
    }

    const event = {
      active,
      activatorEvent,
      collisions,
      delta: {
        x: scrollAdjustedTranslate.x,
        y: scrollAdjustedTranslate.y
      },
      over
    };
    reactDom.unstable_batchedUpdates(() => {
      onDragMove == null ? void 0 : onDragMove(event);
      dispatchMonitorEvent({
        type: 'onDragMove',
        event
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]);
  React.useEffect(() => {
    const {
      active,
      activatorEvent,
      collisions,
      droppableContainers,
      scrollAdjustedTranslate
    } = sensorContext.current;

    if (!active || activeRef.current == null || !activatorEvent || !scrollAdjustedTranslate) {
      return;
    }

    const {
      onDragOver
    } = latestProps.current;
    const overContainer = droppableContainers.get(overId);
    const over = overContainer && overContainer.rect.current ? {
      id: overContainer.id,
      rect: overContainer.rect.current,
      data: overContainer.data,
      disabled: overContainer.disabled
    } : null;
    const event = {
      active,
      activatorEvent,
      collisions,
      delta: {
        x: scrollAdjustedTranslate.x,
        y: scrollAdjustedTranslate.y
      },
      over
    };
    reactDom.unstable_batchedUpdates(() => {
      setOver(over);
      onDragOver == null ? void 0 : onDragOver(event);
      dispatchMonitorEvent({
        type: 'onDragOver',
        event
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [overId]);
  useIsomorphicLayoutEffect(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({ ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = React.useMemo(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = React.useMemo(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return React.createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, React.createElement(InternalContext.Provider, {
    value: internalContext
  }, React.createElement(PublicContext.Provider, {
    value: publicContext
  }, React.createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), React.createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), React.createElement(Accessibility, { ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));

  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === 'object' ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;

    if (typeof autoScroll === 'object') {
      return { ...autoScroll,
        enabled
      };
    }

    return {
      enabled
    };
  }
});

const NullContext = /*#__PURE__*/React.createContext(null);
const defaultRole = 'button';
const ID_PREFIX = 'Draggable';
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key = useUniqueId(ID_PREFIX);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = React.useContext(InternalContext);
  const {
    role = defaultRole,
    roleDescription = 'draggable',
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = React.useContext(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = useNodeRef();
  const [activatorNode, setActivatorNodeRef] = useNodeRef();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = useLatestValue(data);
  useIsomorphicLayoutEffect(() => {
    draggableNodes.set(id, {
      id,
      key,
      node,
      activatorNode,
      data: dataRef
    });
    return () => {
      const node = draggableNodes.get(id);

      if (node && node.key === key) {
        draggableNodes.delete(id);
      }
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [draggableNodes, id]);
  const memoizedAttributes = React.useMemo(() => ({
    role,
    tabIndex,
    'aria-disabled': disabled,
    'aria-pressed': isDragging && role === defaultRole ? true : undefined,
    'aria-roledescription': roleDescription,
    'aria-describedby': ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? undefined : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}

function useDndContext() {
  return React.useContext(PublicContext);
}

const ID_PREFIX$1 = 'Droppable';
const defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key = useUniqueId(ID_PREFIX$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = React.useContext(InternalContext);
  const previous = React.useRef({
    disabled
  });
  const resizeObserverConnected = React.useRef(false);
  const rect = React.useRef(null);
  const callbackId = React.useRef(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = { ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = React.useCallback(() => {
    if (!resizeObserverConnected.current) {
      // ResizeObserver invokes the `handleResize` callback as soon as `observe` is called,
      // assuming the element is rendered and displayed.
      resizeObserverConnected.current = true;
      return;
    }

    if (callbackId.current != null) {
      clearTimeout(callbackId.current);
    }

    callbackId.current = setTimeout(() => {
      measureDroppableContainers(Array.isArray(ids.current) ? ids.current : [ids.current]);
      callbackId.current = null;
    }, resizeObserverTimeout);
  }, //eslint-disable-next-line react-hooks/exhaustive-deps
  [resizeObserverTimeout]);
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = React.useCallback((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }

    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }

    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
  const dataRef = useLatestValue(data);
  React.useEffect(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }

    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  React.useEffect(() => {
    dispatch({
      type: Action.RegisterDroppable,
      element: {
        id,
        key,
        disabled,
        node: nodeRef,
        rect,
        data: dataRef
      }
    });
    return () => dispatch({
      type: Action.UnregisterDroppable,
      key,
      id
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [id]);
  React.useEffect(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}

function AnimationManager(_ref) {
  let {
    animation,
    children
  } = _ref;
  const [clonedChildren, setClonedChildren] = React.useState(null);
  const [element, setElement] = React.useState(null);
  const previousChildren = usePrevious(children);

  if (!children && !clonedChildren && previousChildren) {
    setClonedChildren(previousChildren);
  }

  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return;
    }

    const key = clonedChildren == null ? void 0 : clonedChildren.key;
    const id = clonedChildren == null ? void 0 : clonedChildren.props.id;

    if (key == null || id == null) {
      setClonedChildren(null);
      return;
    }

    Promise.resolve(animation(id, element)).then(() => {
      setClonedChildren(null);
    });
  }, [animation, clonedChildren, element]);
  return React.createElement(React.Fragment, null, children, clonedChildren ? React.cloneElement(clonedChildren, {
    ref: setElement
  }) : null);
}

const defaultTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function NullifiedContextProvider(_ref) {
  let {
    children
  } = _ref;
  return React.createElement(InternalContext.Provider, {
    value: defaultInternalContext
  }, React.createElement(ActiveDraggableContext.Provider, {
    value: defaultTransform
  }, children));
}

const baseStyles = {
  position: 'fixed',
  touchAction: 'none'
};

const defaultTransition = activatorEvent => {
  const isKeyboardActivator = isKeyboardEvent(activatorEvent);
  return isKeyboardActivator ? 'transform 250ms ease' : undefined;
};

const PositionedOverlay = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    as,
    activatorEvent,
    adjustScale,
    children,
    className,
    rect,
    style,
    transform,
    transition = defaultTransition
  } = _ref;

  if (!rect) {
    return null;
  }

  const scaleAdjustedTransform = adjustScale ? transform : { ...transform,
    scaleX: 1,
    scaleY: 1
  };
  const styles = { ...baseStyles,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    transform: CSS.Transform.toString(scaleAdjustedTransform),
    transformOrigin: adjustScale && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : undefined,
    transition: typeof transition === 'function' ? transition(activatorEvent) : transition,
    ...style
  };
  return React.createElement(as, {
    className,
    style: styles,
    ref
  }, children);
});

const defaultDropAnimationSideEffects = options => _ref => {
  let {
    active,
    dragOverlay
  } = _ref;
  const originalStyles = {};
  const {
    styles,
    className
  } = options;

  if (styles != null && styles.active) {
    for (const [key, value] of Object.entries(styles.active)) {
      if (value === undefined) {
        continue;
      }

      originalStyles[key] = active.node.style.getPropertyValue(key);
      active.node.style.setProperty(key, value);
    }
  }

  if (styles != null && styles.dragOverlay) {
    for (const [key, value] of Object.entries(styles.dragOverlay)) {
      if (value === undefined) {
        continue;
      }

      dragOverlay.node.style.setProperty(key, value);
    }
  }

  if (className != null && className.active) {
    active.node.classList.add(className.active);
  }

  if (className != null && className.dragOverlay) {
    dragOverlay.node.classList.add(className.dragOverlay);
  }

  return function cleanup() {
    for (const [key, value] of Object.entries(originalStyles)) {
      active.node.style.setProperty(key, value);
    }

    if (className != null && className.active) {
      active.node.classList.remove(className.active);
    }
  };
};

const defaultKeyframeResolver = _ref2 => {
  let {
    transform: {
      initial,
      final
    }
  } = _ref2;
  return [{
    transform: CSS.Transform.toString(initial)
  }, {
    transform: CSS.Transform.toString(final)
  }];
};

const defaultDropAnimationConfiguration = {
  duration: 250,
  easing: 'ease',
  keyframes: defaultKeyframeResolver,
  sideEffects: /*#__PURE__*/defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0'
      }
    }
  })
};
function useDropAnimation(_ref3) {
  let {
    config,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  } = _ref3;
  return useEvent((id, node) => {
    if (config === null) {
      return;
    }

    const activeDraggable = draggableNodes.get(id);

    if (!activeDraggable) {
      return;
    }

    const activeNode = activeDraggable.node.current;

    if (!activeNode) {
      return;
    }

    const measurableNode = getMeasurableNode(node);

    if (!measurableNode) {
      return;
    }

    const {
      transform
    } = getWindow(node).getComputedStyle(node);
    const parsedTransform = parseTransform(transform);

    if (!parsedTransform) {
      return;
    }

    const animation = typeof config === 'function' ? config : createDefaultDropAnimation(config);
    scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
    return animation({
      active: {
        id,
        data: activeDraggable.data,
        node: activeNode,
        rect: measuringConfiguration.draggable.measure(activeNode)
      },
      draggableNodes,
      dragOverlay: {
        node,
        rect: measuringConfiguration.dragOverlay.measure(measurableNode)
      },
      droppableContainers,
      measuringConfiguration,
      transform: parsedTransform
    });
  });
}

function createDefaultDropAnimation(options) {
  const {
    duration,
    easing,
    sideEffects,
    keyframes
  } = { ...defaultDropAnimationConfiguration,
    ...options
  };
  return _ref4 => {
    let {
      active,
      dragOverlay,
      transform,
      ...rest
    } = _ref4;

    if (!duration) {
      // Do not animate if animation duration is zero.
      return;
    }

    const delta = {
      x: dragOverlay.rect.left - active.rect.left,
      y: dragOverlay.rect.top - active.rect.top
    };
    const scale = {
      scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
      scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
    };
    const finalTransform = {
      x: transform.x - delta.x,
      y: transform.y - delta.y,
      ...scale
    };
    const animationKeyframes = keyframes({ ...rest,
      active,
      dragOverlay,
      transform: {
        initial: transform,
        final: finalTransform
      }
    });
    const [firstKeyframe] = animationKeyframes;
    const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];

    if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) {
      // The start and end keyframes are the same, infer that there is no animation needed.
      return;
    }

    const cleanup = sideEffects == null ? void 0 : sideEffects({
      active,
      dragOverlay,
      ...rest
    });
    const animation = dragOverlay.node.animate(animationKeyframes, {
      duration,
      easing,
      fill: 'forwards'
    });
    return new Promise(resolve => {
      animation.onfinish = () => {
        cleanup == null ? void 0 : cleanup();
        resolve();
      };
    });
  };
}

let key = 0;
function useKey(id) {
  return React.useMemo(() => {
    if (id == null) {
      return;
    }

    key++;
    return key;
  }, [id]);
}

const DragOverlay = /*#__PURE__*/React.memo(_ref => {
  let {
    adjustScale = false,
    children,
    dropAnimation: dropAnimationConfig,
    style,
    transition,
    modifiers,
    wrapperElement = 'div',
    className,
    zIndex = 999
  } = _ref;
  const {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggableNodes,
    droppableContainers,
    dragOverlay,
    over,
    measuringConfiguration,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  } = useDndContext();
  const transform = React.useContext(ActiveDraggableContext);
  const key = useKey(active == null ? void 0 : active.id);
  const modifiedTransform = applyModifiers(modifiers, {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect: dragOverlay.rect,
    over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    transform,
    windowRect
  });
  const initialRect = useInitialValue(activeNodeRect);
  const dropAnimation = useDropAnimation({
    config: dropAnimationConfig,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  }); // We need to wait for the active node to be measured before connecting the drag overlay ref
  // otherwise collisions can be computed against a mispositioned drag overlay

  const ref = initialRect ? dragOverlay.setRef : undefined;
  return React.createElement(NullifiedContextProvider, null, React.createElement(AnimationManager, {
    animation: dropAnimation
  }, active && key ? React.createElement(PositionedOverlay, {
    key: key,
    id: active.id,
    ref: ref,
    as: wrapperElement,
    activatorEvent: activatorEvent,
    adjustScale: adjustScale,
    className: className,
    transition: transition,
    rect: initialRect,
    style: {
      zIndex,
      ...style
    },
    transform: modifiedTransform
  }, children) : null));
});

const snapCenterToCursor = _ref => {
  let {
    activatorEvent,
    draggingNodeRect,
    transform
  } = _ref;

  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left;
    const offsetY = activatorCoordinates.y - draggingNodeRect.top;
    return { ...transform,
      x: transform.x + offsetX - draggingNodeRect.width / 2,
      y: transform.y + offsetY - draggingNodeRect.height / 2
    };
  }

  return transform;
};

function generateBoard(boardOrientation) {
    const board = Array.from(Array(8), () => new Array(8));
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            board[row][column] = {
                squareId: `${columnIndexToChessColumn(column, boardOrientation)}${rowIndexToChessRow(row, boardOrientation)}`, // e.g. "a8" for row 0, column 0 in white orientation
                isLightSquare: (row + column) % 2 === 0,
            };
        }
    }
    return board;
}
function rowIndexToChessRow(row, boardOrientation) {
    return boardOrientation === 'white'
        ? (8 - row).toString()
        : (row + 1).toString();
}
function columnIndexToChessColumn(column, boardOrientation) {
    return boardOrientation === 'white'
        ? String.fromCharCode(97 + column)
        : String.fromCharCode(97 + 8 - column - 1);
}
function chessColumnToColumnIndex(column, boardOrientation) {
    return boardOrientation === 'white'
        ? column.charCodeAt(0) - 97
        : 8 - (column.charCodeAt(0) - 97) - 1;
}
function chessRowToRowIndex(row, boardOrientation) {
    return boardOrientation === 'white' ? 8 - Number(row) : Number(row) - 1;
}
function fenStringToPositionObject(fen) {
    const positionObject = {};
    const rows = fen.split(' ')?.[0]?.split('/');
    // rows start from top of the board (black rank) in white orientation, and bottom of the board (white rank) in black orientation
    for (let row = 0; row < rows.length; row++) {
        let column = 0;
        for (const char of rows[row]) {
            // if char is a letter, it is a piece
            if (isNaN(Number(char))) {
                // force orientation to flip fen string when black orientation used
                const position = `${columnIndexToChessColumn(column, 'white')}${rowIndexToChessRow(row, 'white')}`;
                // set piece at position (e.g. 0-0 for a8 on a normal board)
                positionObject[position] = {
                    pieceType: fenToPieceCode(char),
                };
                // increment column for next piece
                column++;
            }
            else {
                // if char is a number, it is empty squares, skip that many columns
                column += Number(char);
            }
        }
    }
    return positionObject;
}
/**
 * Convert fen piece code (e.g. p, N) to camel case notation (e.g. bP, wK).
 */
function fenToPieceCode(piece) {
    // lower case is black piece
    if (piece.toLowerCase() === piece) {
        return 'b' + piece.toUpperCase();
    }
    // upper case is white piece
    return 'w' + piece.toUpperCase();
}
// todo: if already in updates, find next candidate
/**
 * Return an object with the pieces that have moved from the old position to the new position.
 * The keys are the source square names (e.g. "e2") and the values are the new square positions (e.g. "e4"), indicating that the piece in square "e2" has moved to square "e4".
 */
function getPositionUpdates(oldPosition, newPosition, boardOrientation) {
    const updates = {};
    for (const newSquare in newPosition) {
        const candidateSquares = [];
        // the piece hasn't moved, so we don't need to do anything
        if (oldPosition[newSquare]?.pieceType === newPosition[newSquare].pieceType) {
            continue;
        }
        for (const oldSquare in oldPosition) {
            // if the piece type is the same, and the new square is not the old square, and the piece has moved, then we have found a candidate for the new position
            if (oldPosition[oldSquare].pieceType === newPosition[newSquare].pieceType &&
                oldSquare !== newSquare &&
                oldPosition[oldSquare].pieceType !== newPosition[oldSquare]?.pieceType) {
                candidateSquares.push(oldSquare);
            }
        }
        if (candidateSquares.length === 1) {
            // if there is only one candidate, we can just return it
            updates[candidateSquares?.[0]] = newSquare;
        }
        else {
            // if there are multiple candidates, we need to find the one that is correct to the best of our ability by standard chess rules
            for (const candidateSquare of candidateSquares) {
                // get the piece type of the candidate e.g. 'P', 'N', 'B', 'R', 'Q', 'K'
                const candidatePieceType = oldPosition[candidateSquare].pieceType[1];
                const columnDifference = Math.abs(chessColumnToColumnIndex(candidateSquare.match(/^[a-z]+/)?.[0] ?? '', boardOrientation) -
                    chessColumnToColumnIndex(newSquare.match(/^[a-z]+/)?.[0] ?? '', boardOrientation));
                const rowDifference = Math.abs(Number(candidateSquare.match(/\d+$/)?.[0] ?? '') -
                    Number(newSquare.match(/\d+$/)?.[0] ?? ''));
                const isOldSquareLight = (chessColumnToColumnIndex(candidateSquare.match(/^[a-z]+/)?.[0] ?? '', boardOrientation) +
                    Number(candidateSquare.match(/\d+$/)?.[0] ?? '')) %
                    2 ===
                    0;
                const isNewSquareLight = (chessColumnToColumnIndex(newSquare.match(/^[a-z]+/)?.[0] ?? '', boardOrientation) +
                    Number(newSquare.match(/\d+$/)?.[0] ?? '')) %
                    2 ===
                    0;
                // prioritise pawns on same file
                if (candidatePieceType === 'P') {
                    if (candidateSquare.match(/^[a-z]+/)?.[0] ===
                        newSquare.match(/^[a-z]+/)?.[0]) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
                // prioritise knights by euclidean distance
                if (candidatePieceType === 'N') {
                    if ((columnDifference === 2 && rowDifference === 1) ||
                        (columnDifference === 1 && rowDifference === 2)) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
                // prioritise bishops that have moved diagonally and are on the same color square
                if (candidatePieceType === 'B') {
                    if (columnDifference === rowDifference &&
                        isOldSquareLight === isNewSquareLight) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
                // prioritise rooks that have moved horizontally or vertically
                if (candidatePieceType === 'R') {
                    if (columnDifference === 0 || rowDifference === 0) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
                // prioritise queens that have moved diagonally, horizontally or vertically
                if (candidatePieceType === 'Q') {
                    if (columnDifference === 0 ||
                        rowDifference === 0 ||
                        columnDifference === rowDifference) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
                // prioritise kings that have moved one square in any direction
                if (candidatePieceType === 'K') {
                    if (columnDifference <= 1 && rowDifference <= 1) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
            }
            // if we still don't have a candidate, use the first candidate that has not been used yet
            if (!Object.values(updates).includes(newSquare) &&
                candidateSquares.length > 0) {
                for (const candidateSquare of candidateSquares) {
                    if (!Object.keys(updates).includes(candidateSquare)) {
                        updates[candidateSquare] = newSquare;
                        break;
                    }
                }
            }
        }
    }
    return updates;
}
/**
 * Retrieves the coordinates at the centre of the requested square, relative to the top left of the board (0, 0).
 */
function getRelativeCoords(boardOrientation, boardWidth, square) {
    const squareWidth = boardWidth / 8;
    const x = chessColumnToColumnIndex(square.match(/^[a-z]+/)?.[0] ?? '', boardOrientation) *
        squareWidth +
        squareWidth / 2;
    const y = chessRowToRowIndex(square.match(/\d+$/)?.[0] ?? '', boardOrientation) *
        squareWidth +
        squareWidth / 2;
    return { x, y };
}

const defaultPieces = {
    wP: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsx("path", { d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", style: {
                opacity: '1',
                fill: props?.fill ?? '#ffffff',
                fillOpacity: '1',
                fillRule: 'nonzero',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'miter',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            } }) })),
    wR: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                opacity: '1',
                fill: props?.fill ?? '#ffffff',
                fillOpacity: '1',
                fillRule: 'evenodd',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 34,14 L 31,17 L 14,17 L 11,14" }), jsxRuntimeExports.jsx("path", { d: "M 31,17 L 31,29.5 L 14,29.5 L 14,17", style: { strokeLinecap: 'butt', strokeLinejoin: 'miter' } }), jsxRuntimeExports.jsx("path", { d: "M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" }), jsxRuntimeExports.jsx("path", { d: "M 11,14 L 34,14", style: { fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' } })] }) })),
    wN: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                opacity: '1',
                fill: 'none',
                fillOpacity: '1',
                fillRule: 'evenodd',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18", style: { fill: props?.fill ?? '#ffffff', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10", style: { fill: props?.fill ?? '#ffffff', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z", style: { fill: '#000000', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z", transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)", style: { fill: '#000000', stroke: '#000000' } })] }) })),
    wB: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                opacity: '1',
                fill: 'none',
                fillRule: 'evenodd',
                fillOpacity: '1',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsxs("g", { style: {
                        fill: props?.fill ?? '#ffffff',
                        stroke: '#000000',
                        strokeLinecap: 'butt',
                    }, children: [jsxRuntimeExports.jsx("path", { d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" }), jsxRuntimeExports.jsx("path", { d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" }), jsxRuntimeExports.jsx("path", { d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" })] }), jsxRuntimeExports.jsx("path", { d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18", style: { fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' } })] }) })),
    wQ: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                fill: props?.fill ?? '#ffffff',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinejoin: 'round',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" }), jsxRuntimeExports.jsx("path", { d: "M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z" }), jsxRuntimeExports.jsx("path", { d: "M 11.5,30 C 15,29 30,29 33.5,30", style: { fill: 'none' } }), jsxRuntimeExports.jsx("path", { d: "M 12,33.5 C 18,32.5 27,32.5 33,33.5", style: { fill: 'none' } }), jsxRuntimeExports.jsx("circle", { cx: "6", cy: "12", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "14", cy: "9", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "22.5", cy: "8", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "31", cy: "9", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "39", cy: "12", r: "2" })] }) })),
    wK: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                fill: 'none',
                fillOpacity: '1',
                fillRule: 'evenodd',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 22.5,11.63 L 22.5,6", style: { fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' } }), jsxRuntimeExports.jsx("path", { d: "M 20,8 L 25,8", style: { fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' } }), jsxRuntimeExports.jsx("path", { d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25", style: {
                        fill: props?.fill ?? '#ffffff',
                        stroke: '#000000',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                    } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37", style: { fill: props?.fill ?? '#ffffff', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,30 C 18,27 27,27 32.5,30", style: { fill: 'none', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5", style: { fill: 'none', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,37 C 18,34 27,34 32.5,37", style: { fill: 'none', stroke: '#000000' } })] }) })),
    bP: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsx("path", { d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", style: {
                opacity: '1',
                fill: props?.fill ?? '#000000',
                fillOpacity: '1',
                fillRule: 'nonzero',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'miter',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            } }) })),
    bR: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                opacity: '1',
                fill: props?.fill ?? '#000000',
                fillOpacity: '1',
                fillRule: 'evenodd',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z ", style: { strokeLinecap: 'butt', strokeLinejoin: 'miter' } }), jsxRuntimeExports.jsx("path", { d: "M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z ", style: { strokeLinecap: 'butt' } }), jsxRuntimeExports.jsx("path", { d: "M 12,35.5 L 33,35.5 L 33,35.5", style: {
                        fill: 'none',
                        stroke: '#ffffff',
                        strokeWidth: '1',
                        strokeLinejoin: 'miter',
                    } }), jsxRuntimeExports.jsx("path", { d: "M 13,31.5 L 32,31.5", style: {
                        fill: 'none',
                        stroke: '#ffffff',
                        strokeWidth: '1',
                        strokeLinejoin: 'miter',
                    } }), jsxRuntimeExports.jsx("path", { d: "M 14,29.5 L 31,29.5", style: {
                        fill: 'none',
                        stroke: '#ffffff',
                        strokeWidth: '1',
                        strokeLinejoin: 'miter',
                    } }), jsxRuntimeExports.jsx("path", { d: "M 14,16.5 L 31,16.5", style: {
                        fill: 'none',
                        stroke: '#ffffff',
                        strokeWidth: '1',
                        strokeLinejoin: 'miter',
                    } }), jsxRuntimeExports.jsx("path", { d: "M 11,14 L 34,14", style: {
                        fill: 'none',
                        stroke: '#ffffff',
                        strokeWidth: '1',
                        strokeLinejoin: 'miter',
                    } })] }) })),
    bN: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                opacity: '1',
                fill: 'none',
                fillOpacity: '1',
                fillRule: 'evenodd',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18", style: { fill: props?.fill ?? '#000000', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10", style: { fill: props?.fill ?? '#000000', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z", style: { fill: '#ffffff', stroke: '#ffffff' } }), jsxRuntimeExports.jsx("path", { d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z", transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)", style: { fill: '#ffffff', stroke: '#ffffff' } }), jsxRuntimeExports.jsx("path", { d: "M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z ", style: { fill: '#ffffff', stroke: 'none' } })] }) })),
    bB: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                opacity: '1',
                fill: 'none',
                fillRule: 'evenodd',
                fillOpacity: '1',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsxs("g", { style: {
                        fill: props?.fill ?? '#000000',
                        stroke: '#000000',
                        strokeLinecap: 'butt',
                    }, children: [jsxRuntimeExports.jsx("path", { d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" }), jsxRuntimeExports.jsx("path", { d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" }), jsxRuntimeExports.jsx("path", { d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" })] }), jsxRuntimeExports.jsx("path", { d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18", style: { fill: 'none', stroke: '#ffffff', strokeLinejoin: 'miter' } })] }) })),
    bQ: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                fill: props?.fill ?? '#000000',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z", style: { strokeLinecap: 'butt', fill: props?.fill ?? '#000000' } }), jsxRuntimeExports.jsx("path", { d: "m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" }), jsxRuntimeExports.jsx("path", { d: "M 11.5,30 C 15,29 30,29 33.5,30" }), jsxRuntimeExports.jsx("path", { d: "m 12,33.5 c 6,-1 15,-1 21,0" }), jsxRuntimeExports.jsx("circle", { cx: "6", cy: "12", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "14", cy: "9", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "22.5", cy: "8", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "31", cy: "9", r: "2" }), jsxRuntimeExports.jsx("circle", { cx: "39", cy: "12", r: "2" }), jsxRuntimeExports.jsx("path", { d: "M 11,38.5 A 35,35 1 0 0 34,38.5", style: { fill: 'none', stroke: '#000000', strokeLinecap: 'butt' } }), jsxRuntimeExports.jsxs("g", { style: { fill: 'none', stroke: '#ffffff' }, children: [jsxRuntimeExports.jsx("path", { d: "M 11,29 A 35,35 1 0 1 34,29" }), jsxRuntimeExports.jsx("path", { d: "M 12.5,31.5 L 32.5,31.5" }), jsxRuntimeExports.jsx("path", { d: "M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" }), jsxRuntimeExports.jsx("path", { d: "M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" })] })] }) })),
    bK: (props) => (jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 45 45", width: "100%", height: "100%", style: props?.svgStyle, children: jsxRuntimeExports.jsxs("g", { style: {
                fill: 'none',
                fillOpacity: '1',
                fillRule: 'evenodd',
                stroke: '#000000',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeMiterlimit: '4',
                strokeDasharray: 'none',
                strokeOpacity: '1',
            }, children: [jsxRuntimeExports.jsx("path", { d: "M 22.5,11.63 L 22.5,6", style: { fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' }, id: "path6570" }), jsxRuntimeExports.jsx("path", { d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25", style: {
                        fill: props?.fill ?? '#000000',
                        fillOpacity: '1',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                    } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37", style: { fill: props?.fill ?? '#000000', stroke: '#000000' } }), jsxRuntimeExports.jsx("path", { d: "M 20,8 L 25,8", style: { fill: 'none', stroke: '#000000', strokeLinejoin: 'miter' } }), jsxRuntimeExports.jsx("path", { d: "M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5", style: { fill: 'none', stroke: '#ffffff' } }), jsxRuntimeExports.jsx("path", { d: "M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37", style: { fill: 'none', stroke: '#ffffff' } })] }) })),
};

function defaultBoardStyle() {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(8, 1fr)`,
        overflow: 'clip',
        overflowClipMargin: '14px',
        width: '100%',
        height: '100%',
        position: 'relative',
    };
}
const defaultSquareStyle = {
    aspectRatio: '1/1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
};
const defaultDarkSquareStyle = {
    backgroundColor: '#B58863',
};
const defaultLightSquareStyle = {
    backgroundColor: '#F0D9B5',
};
const defaultDropSquareStyle = {
    boxShadow: 'inset 0px 0px 0px 1px black',
};
const defaultDarkSquareNotationStyle = {
    color: '#ebe0cfff',
};
const defaultLightSquareNotationStyle = {
    color: '#a36c3fff',
};
const defaultAlphaNotationStyle = {
    fontSize: '13px',
    position: 'absolute',
    bottom: 1,
    left: 2,
    userSelect: 'none',
};
const defaultNumericNotationStyle = {
    fontSize: '13px',
    position: 'absolute',
    top: 2,
    right: 2,
    userSelect: 'none',
};
const defaultDraggingPieceStyle = {
    transform: 'scale(1.1)',
};
const defaultDraggingPieceGhostStyle = {
    opacity: 0.5,
};
const defaultArrowOptions = {
    primaryColor: '#ff0000', // color if no modifiers are held down when drawing an arrow
    secondaryColor: '#2f8335', // color if shift is held down when drawing an arrow
    tertiaryColor: '#0352fc', // color if control is held down when drawing an arrow
    engineColor: '#7500c9ff',
    arrowLengthReducerDenominator: 8, // the lower the denominator, the greater the arrow length reduction (e.g. 8 = 1/8 of a square width removed, 4 = 1/4 of a square width removed)
    sameTargetArrowLengthReducerDenominator: 4, // as above but for arrows targeting the same square (a greater reduction is used to avoid overlaps)
    arrowWidthDenominator: 5, // the lower the denominator, the greater the arrow width (e.g. 5 = 1/5 of a square width, 10 = 1/10 of a square width)
    activeArrowWidthMultiplier: 0.9, // the multiplier for the arrow width when it is being drawn
    opacity: 0.65, // opacity of arrow when not being drawn
    activeOpacity: 0.5, // opacity of arrow when it is being drawn
};
const defaultHighlightsOptions = {
    primaryColor: '#ff0000', // color if no modifiers are held down when drawing an arrow
    secondaryColor: '#2f8335', // color if shift is held down when drawing an arrow
    tertiaryColor: '#0352fc', // color if control is held down when drawing an arrow
};

const ChessboardContext = React.createContext(null);
const useChessboardContext = () => React.use(ChessboardContext);
function ChessboardProvider({ children, options, }) {
    const { 
    // id
    id = 'chessboard', 
    // pieces and position
    pieces = defaultPieces, positionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', promotionDialog = { type: 'none', promotionSquare: 'none' }, 
    // board dimensions and orientation
    boardOrientation = 'white', sideToMove = null, 
    // board and squares styles
    boardStyle = defaultBoardStyle(), squareStyle = defaultSquareStyle, squareStyles = {}, darkSquareStyle = defaultDarkSquareStyle, lightSquareStyle = defaultLightSquareStyle, dropSquareStyle = defaultDropSquareStyle, draggingPieceStyle = defaultDraggingPieceStyle, draggingPieceGhostStyle = defaultDraggingPieceGhostStyle, 
    // notation
    darkSquareNotationStyle = defaultDarkSquareNotationStyle, lightSquareNotationStyle = defaultLightSquareNotationStyle, alphaNotationStyle = defaultAlphaNotationStyle, numericNotationStyle = defaultNumericNotationStyle, showNotation = 'inside', 
    // animation
    animationDuration = 300, showAnimations = true, 
    // drag and drop
    allowDragging = true, dragActivationDistance = 0, 
    // arrows
    allowDrawingArrows = true, arrows = [], arrowOptions = defaultArrowOptions, 
    // highlights
    allowHighlights = true, highlights = [], highlightOptions = defaultHighlightsOptions, pieceHighlight = {}, pieceHighlightColor = '#005380', 
    // handlers
    onArrowsChange, onMouseOverSquare, onPieceClick, onPieceDrag, onPieceDrop, onSquareClick, onSquareRightClick, onPromotionPieceSelect, squareRenderer, } = options || {};
    // the piece currently being dragged
    const [draggingPiece, setDraggingPiece] = React.useState(null);
    // the current position of pieces on the chessboard
    const [currentPosition, setCurrentPosition] = React.useState(typeof positionFen === 'string'
        ? fenStringToPositionObject(positionFen)
        : positionFen);
    // calculated differences between current and incoming positions
    const [positionDifferences, setPositionDifferences] = React.useState({});
    // if the latest move was a manual drop
    const [manuallyDroppedPieceAndSquare, setManuallyDroppedPieceAndSquare] = React.useState(null);
    // arrows
    const [newArrowStartSquare, setNewArrowStartSquare] = React.useState(null);
    const [newArrowOverSquare, setNewArrowOverSquare] = React.useState(null);
    const [internalArrows, setInternalArrows] = React.useState([]);
    const [externalArrows, setExternalArrows] = React.useState([]);
    const [engineArrows, setEngineArrows] = React.useState([]);
    const [arrowDrawn, setArrowDrawn] = React.useState(false);
    // position we are animating to, if a new position comes in before the animation completes, we will use this to set the new position
    const [waitingForAnimationPosition, setWaitingForAnimationPosition] = React.useState(null);
    // the animation timeout whilst waiting for animation to complete
    const animationTimeoutRef = React.useRef(null);
    // if the position changes, we need to recreate the pieces array
    React.useEffect(() => {
        clearArrows();
        const newPosition = typeof positionFen === 'string'
            ? fenStringToPositionObject(positionFen)
            : positionFen;
        // if no animation, just set the position
        if (!showAnimations) {
            setCurrentPosition(newPosition);
            return;
        }
        const isPromotionOrUndo = (() => {
            const promotionPieces = ['Q', 'R', 'B', 'N'];
            // Track all changed squares
            const changedSquares = Object.keys({
                ...currentPosition,
                ...newPosition,
            }).filter((sq) => {
                const oldPiece = currentPosition[sq]?.pieceType;
                const newPiece = newPosition[sq]?.pieceType;
                return oldPiece !== newPiece;
            });
            // --- Detect promotion (including capture) ---
            if (changedSquares.length === 2) {
                const [sq1, sq2] = changedSquares;
                const new1 = newPosition[sq1];
                // Determine fromSq (emptied) and toSq (gained promoted piece)
                const fromSq = new1 ? sq2 : sq1;
                const toSq = new1 ? sq1 : sq2;
                const oldFrom = currentPosition[fromSq];
                const newTo = newPosition[toSq];
                if (oldFrom && newTo) {
                    const oldColor = oldFrom.pieceType[0];
                    const oldType = oldFrom.pieceType[1];
                    const newType = newTo.pieceType[1];
                    const toRank = parseInt(toSq[1], 10);
                    const isWhitePromo = oldColor === 'w' && oldType === 'P' && toRank === 8;
                    const isBlackPromo = oldColor === 'b' && oldType === 'P' && toRank === 1;
                    if ((isWhitePromo || isBlackPromo) &&
                        promotionPieces.includes(newType)) {
                        return true;
                    }
                }
            }
            // --- Detect undo of promotion ---
            const promotedDisappeared = Object.entries(currentPosition).filter(([sq, piece]) => {
                const newPiece = newPosition[sq];
                return (piece &&
                    promotionPieces.includes(piece.pieceType[1]) &&
                    (sq[1] === '8' || sq[1] === '1') &&
                    (!newPiece || newPiece.pieceType !== piece.pieceType));
            });
            const pawnAppeared = Object.entries(newPosition).filter(([sq, piece]) => {
                const oldPiece = currentPosition[sq];
                return (piece?.pieceType?.[1] === 'P' &&
                    (sq[1] === '7' || sq[1] === '2') &&
                    (!oldPiece || oldPiece.pieceType[1] !== 'P'));
            });
            if (promotedDisappeared.length === 1 && pawnAppeared.length === 1) {
                const [promoSq] = promotedDisappeared[0];
                const [pawnSq] = pawnAppeared[0];
                const promoFile = promoSq[0];
                const promoRank = Number(promoSq[1]);
                const pawnFile = pawnSq[0];
                const pawnRank = Number(pawnSq[1]);
                const sameOrAdjacentFile = Math.abs(promoFile.charCodeAt(0) - pawnFile.charCodeAt(0)) <= 1;
                if (sameOrAdjacentFile &&
                    ((promoRank === 8 && pawnRank === 7) ||
                        (promoRank === 1 && pawnRank === 2))) {
                    return true;
                }
            }
            return false;
        })();
        if (isPromotionOrUndo) {
            setCurrentPosition(newPosition);
            setWaitingForAnimationPosition(null);
            setPositionDifferences({});
            return;
        }
        // save copy of the waiting for animation position so we can use it later but clear it from state so we don't use it in the next animation
        const currentWaitingForAnimationPosition = waitingForAnimationPosition;
        // if we are waiting for an animation to complete from a previous move, set the saved position to immediately end the animation
        if (currentWaitingForAnimationPosition) {
            setCurrentPosition(currentWaitingForAnimationPosition);
            setWaitingForAnimationPosition(null);
        }
        // get list of position updates as pieces to potentially animate
        const positionUpdates = getPositionUpdates(currentWaitingForAnimationPosition ?? currentPosition, // use the saved position if it exists, otherwise use the current position
        newPosition, boardOrientation);
        const multiplePiecesMoved = Object.keys(positionUpdates).length > 1;
        // manually dropped piece caused multiple pieces to move (e.g. castling)
        if (manuallyDroppedPieceAndSquare && multiplePiecesMoved) {
            // create a new position with just the dropped piece moved
            const intermediatePosition = { ...currentPosition };
            delete intermediatePosition[manuallyDroppedPieceAndSquare.sourceSquare];
            intermediatePosition[manuallyDroppedPieceAndSquare.targetSquare] = {
                pieceType: manuallyDroppedPieceAndSquare.piece,
            };
            setCurrentPosition(intermediatePosition);
            // create position differences with only the other pieces' movements
            const otherPiecesUpdates = { ...positionUpdates };
            delete otherPiecesUpdates[manuallyDroppedPieceAndSquare.sourceSquare];
            setPositionDifferences(otherPiecesUpdates);
            // animate the other pieces' movements
            const newTimeout = setTimeout(() => {
                setCurrentPosition(newPosition);
                setPositionDifferences({});
                setManuallyDroppedPieceAndSquare(null);
            }, animationDuration);
            animationTimeoutRef.current = newTimeout;
            return;
        }
        // new position was a result of a manual drop
        if (manuallyDroppedPieceAndSquare) {
            // no animation needed, just set the position and reset the flag
            setCurrentPosition(newPosition);
            setManuallyDroppedPieceAndSquare(null);
            return;
        }
        // new position was a result of an external move
        setPositionDifferences(positionUpdates);
        setWaitingForAnimationPosition(newPosition);
        // start animation timeout
        const newTimeout = setTimeout(() => {
            setCurrentPosition(newPosition);
            setPositionDifferences({});
            setWaitingForAnimationPosition(null);
        }, animationDuration);
        // update the ref to the new timeout
        animationTimeoutRef.current = newTimeout;
        // clear timeout on unmount
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [positionFen]);
    // if the orientation changes, we need to recreate the pieces array
    React.useEffect(() => {
        setCurrentPosition(typeof positionFen === 'string'
            ? fenStringToPositionObject(positionFen)
            : positionFen);
    }, [boardOrientation]);
    // only redraw the board when the orientation changes
    const board = React.useMemo(() => generateBoard(boardOrientation), [boardOrientation]);
    // acts as an event listener for the chessboard's arrows prop
    React.useEffect(() => {
        const isValidArrow = (item) => {
            return (typeof item === 'object' &&
                item !== null &&
                typeof item.startSquare === 'string' &&
                typeof item.endSquare === 'string' &&
                ['primary', 'secondary', 'tertiary', 'engine'].includes(item.color));
        };
        if (!arrows.every(isValidArrow))
            return;
        const newEngine = arrows.filter((a) => a.color === 'engine');
        const newExternal = arrows.filter((a) => a.color !== 'engine');
        // Only update externalArrows if it actually changed
        if (JSON.stringify(newExternal) !== JSON.stringify(externalArrows)) {
            setExternalArrows(newExternal);
        }
        if (JSON.stringify(newEngine) !== JSON.stringify(engineArrows)) {
            setEngineArrows(newEngine);
        }
    }, [arrows]);
    React.useEffect(() => {
        onArrowsChange?.([...internalArrows, ...externalArrows]);
    }, [arrowDrawn]);
    function clearArrows() {
        setInternalArrows([]);
        setExternalArrows([]);
        setNewArrowStartSquare(null);
        setNewArrowOverSquare(null);
    }
    function clearArrowsWithCallback() {
        setInternalArrows([]);
        setExternalArrows([]);
        setNewArrowStartSquare(null);
        setNewArrowOverSquare(null);
        setArrowDrawn((prev) => !prev);
    }
    const drawArrow = React.useCallback((newArrowEndSquare, modifiers) => {
        if (!allowDrawingArrows) {
            return;
        }
        const allArrows = [...externalArrows, ...internalArrows];
        const arrowColor = modifiers?.shiftKey
            ? 'secondary'
            : modifiers?.ctrlKey
                ? 'tertiary'
                : 'primary';
        const arrowExists = allArrows.some((arrow) => arrow.startSquare === newArrowStartSquare &&
            arrow.endSquare === newArrowEndSquare &&
            arrow.color === arrowColor);
        const arrowExistsWithDifferentColor = allArrows.some((arrow) => arrow.startSquare === newArrowStartSquare &&
            arrow.endSquare === newArrowEndSquare &&
            arrow.color !== arrowColor);
        // if the arrow already exists, clear it
        if (arrowExists) {
            setInternalArrows((prev) => prev.filter((arrow) => !(arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare &&
                arrow.color === arrowColor)));
            setExternalArrows((prev) => prev.filter((arrow) => !(arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare &&
                arrow.color === arrowColor)));
            setNewArrowStartSquare(null);
            setNewArrowOverSquare(null);
            setArrowDrawn((prev) => !prev);
            return;
        }
        // if the arrow exists with a different color, overwrite it
        if (arrowExistsWithDifferentColor) {
            setInternalArrows((prev) => prev.filter((arrow) => !(arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare)));
            setExternalArrows((prev) => prev.filter((arrow) => !(arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare)));
        }
        // new arrow with different start and end square, add to internal arrows
        if (newArrowStartSquare && newArrowStartSquare !== newArrowEndSquare) {
            setInternalArrows((prevArrows) => [
                ...prevArrows,
                {
                    startSquare: newArrowStartSquare,
                    endSquare: newArrowEndSquare,
                    color: arrowColor,
                },
            ]);
        }
        setNewArrowStartSquare(null);
        setNewArrowOverSquare(null);
        setArrowDrawn((prev) => !prev);
    }, [
        allowDrawingArrows,
        externalArrows,
        internalArrows,
        arrowOptions.primaryColor,
        arrowOptions.secondaryColor,
        arrowOptions.tertiaryColor,
        newArrowStartSquare,
        newArrowOverSquare,
    ]);
    const setNewArrowOverSquareWithModifiers = React.useCallback((square, modifiers) => {
        const color = modifiers?.shiftKey
            ? arrowOptions.secondaryColor
            : modifiers?.ctrlKey
                ? arrowOptions.tertiaryColor
                : arrowOptions.primaryColor;
        setNewArrowOverSquare({ square, color });
    }, [arrowOptions]);
    const handleDragCancel = React.useCallback(() => {
        setDraggingPiece(null);
    }, []);
    const handleDragEnd = React.useCallback(function handleDragEnd(event) {
        if (!draggingPiece) {
            return;
        }
        const dropSquare = event.over?.id.toString();
        // dropped outside of droppable area (e.g. off board)
        if (!dropSquare) {
            onPieceDrop?.({
                piece: draggingPiece,
                sourceSquare: draggingPiece.position,
                targetSquare: null,
            });
            // set as manually dropped piece so that no animation is shown
            setManuallyDroppedPieceAndSquare({
                piece: draggingPiece.pieceType,
                sourceSquare: draggingPiece.position,
                targetSquare: '',
            });
            setDraggingPiece(null);
            return;
        }
        if (event.over) {
            const isDropValid = onPieceDrop?.({
                piece: draggingPiece,
                sourceSquare: draggingPiece.position,
                targetSquare: dropSquare,
            });
            // if the drop is valid, set the manually dropped piece and square
            if (isDropValid) {
                setManuallyDroppedPieceAndSquare({
                    piece: draggingPiece.pieceType,
                    sourceSquare: draggingPiece.position,
                    targetSquare: dropSquare,
                });
            }
            setDraggingPiece(null);
        }
    }, [draggingPiece]);
    const handleDragStart = React.useCallback(
    // active.id is the id of the piece being dragged
    function handleDragStart({ active }) {
        // the id is either the position of the piece on the board if it's on the board (e.g. "a1", "b2", etc.), or the type of the piece if it's a spare piece (e.g. "wP", "bN", etc.)
        const isSparePiece = active.data.current?.isSparePiece;
        onPieceDrag?.({
            isSparePiece,
            piece: isSparePiece
                ? {
                    pieceType: active.id,
                }
                : currentPosition[active.id],
            square: isSparePiece ? null : active.id,
        });
        setDraggingPiece({
            isSparePiece,
            position: active.id,
            pieceType: isSparePiece
                ? active.id
                : currentPosition[active.id].pieceType,
        });
        return;
    }, [currentPosition]);
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: dragActivationDistance,
        },
    }), useSensor(KeyboardSensor), useSensor(TouchSensor));
    // collision detection that first tries pointer-based detection and then falls back to rectangle intersection for keyboards
    function collisionDetection(args) {
        // first try pointer-based collision detection
        const pointerCollisions = pointerWithin(args);
        // if we found collisions with the pointer, return those
        if (pointerCollisions.length > 0) {
            return pointerCollisions;
        }
        // otherwise fall back to rectangle intersection
        return rectIntersection(args);
    }
    return (jsxRuntimeExports.jsx(ChessboardContext.Provider, { value: {
            // chessboard options
            id,
            positionFen,
            pieces,
            sideToMove,
            promotionDialog,
            boardOrientation,
            boardStyle,
            squareStyle,
            squareStyles,
            darkSquareStyle,
            lightSquareStyle,
            dropSquareStyle,
            draggingPieceStyle,
            draggingPieceGhostStyle,
            darkSquareNotationStyle,
            lightSquareNotationStyle,
            alphaNotationStyle,
            numericNotationStyle,
            showNotation,
            animationDuration,
            showAnimations,
            allowDragging,
            allowDrawingArrows,
            arrows,
            arrowOptions,
            allowHighlights,
            highlights,
            highlightOptions,
            pieceHighlight,
            pieceHighlightColor,
            onMouseOverSquare,
            onPieceClick,
            onSquareClick,
            onSquareRightClick,
            onPromotionPieceSelect,
            squareRenderer,
            // internal state
            board,
            isWrapped: true,
            draggingPiece,
            currentPosition,
            positionDifferences,
            newArrowStartSquare,
            newArrowOverSquare,
            setNewArrowStartSquare,
            setNewArrowOverSquare: setNewArrowOverSquareWithModifiers,
            internalArrows,
            externalArrows,
            engineArrows,
            drawArrow,
            clearArrowsWithCallback,
        }, children: jsxRuntimeExports.jsx(DndContext, { collisionDetection: collisionDetection, autoScroll: false, onDragStart: handleDragStart, onDragEnd: handleDragEnd, onDragCancel: handleDragCancel, sensors: sensors, children: children }) }));
}

function Arrows({ boardWidth, boardHeight }) {
    const { id, externalArrows, internalArrows, engineArrows, arrowOptions, boardOrientation, newArrowStartSquare, newArrowOverSquare, } = useChessboardContext();
    if (!boardWidth)
        return null;
    // ---------------------------------------------------------------------------
    // 1 · Work out whether the user is currently dragging/drawing an arrow
    // ---------------------------------------------------------------------------
    const currentlyDrawingArrow = newArrowStartSquare &&
        newArrowOverSquare &&
        newArrowStartSquare !== newArrowOverSquare.square
        ? {
            startSquare: newArrowStartSquare,
            endSquare: newArrowOverSquare.square,
            color: newArrowOverSquare.color,
        }
        : null;
    // ---------------------------------------------------------------------------
    // 2 · Merge and deduplicate, giving precedence to arrows with color “engine”
    // ---------------------------------------------------------------------------
    const combined = [...engineArrows, ...externalArrows, ...internalArrows];
    const byKey = new Map();
    for (const arrow of combined) {
        const key = `${arrow.startSquare}-${arrow.endSquare}`;
        const existing = byKey.get(key);
        if (arrow.color === 'engine' || !existing || existing.color !== 'engine') {
            byKey.set(key, arrow); // engine overwrites, others set if empty
        }
    }
    if (currentlyDrawingArrow) {
        byKey.set(`${currentlyDrawingArrow.startSquare}-${currentlyDrawingArrow.endSquare}`, {
            ...currentlyDrawingArrow,
            color: currentlyDrawingArrow.color,
        });
    }
    const arrowsToDraw = Array.from(byKey.values());
    // ---------------------------------------------------------------------------
    // 3 · Render
    // ---------------------------------------------------------------------------
    return (jsxRuntimeExports.jsx("svg", { width: boardWidth, height: boardHeight, style: {
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 20,
        }, children: arrowsToDraw.map((arrow, i) => {
            const from = getRelativeCoords(boardOrientation, boardWidth, arrow.startSquare);
            const to = getRelativeCoords(boardOrientation, boardWidth, arrow.endSquare);
            // --- shorten arrow so its tip is roughly centred in the target square
            const squareWidth = boardWidth / 8;
            let ARROW_LENGTH_REDUCER = squareWidth / arrowOptions.arrowLengthReducerDenominator;
            const isArrowActive = currentlyDrawingArrow &&
                arrow.startSquare === currentlyDrawingArrow.startSquare &&
                arrow.endSquare === currentlyDrawingArrow.endSquare;
            // if multiple arrows end on the same square (but are not the active one),
            // shorten them a bit more so they don’t overlap as badly
            if (arrowsToDraw.some((rest) => rest !== arrow && rest.endSquare === arrow.endSquare) &&
                !isArrowActive) {
                ARROW_LENGTH_REDUCER =
                    squareWidth / arrowOptions.sameTargetArrowLengthReducerDenominator;
            }
            // work out the shortened end‑point
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const r = Math.hypot(dx, dy);
            const end = {
                x: from.x + (dx * (r - ARROW_LENGTH_REDUCER)) / r,
                y: from.y + (dy * (r - ARROW_LENGTH_REDUCER)) / r,
            };
            // map the “logical” colour names to actual CSS colours
            const resolveColor = (c) => {
                switch (c) {
                    case 'primary':
                        return arrowOptions.primaryColor;
                    case 'secondary':
                        return arrowOptions.secondaryColor;
                    case 'tertiary':
                        return arrowOptions.tertiaryColor;
                    case 'engine':
                        return arrowOptions.engineColor;
                    default:
                        return c ?? arrowOptions.primaryColor;
                }
            };
            const stroke = resolveColor(arrow.color);
            return (jsxRuntimeExports.jsxs(React.Fragment, { children: [jsxRuntimeExports.jsx("marker", { id: `${id}-arrowhead-${i}-${arrow.startSquare}-${arrow.endSquare}`, markerWidth: "2", markerHeight: "2.5", refX: "1.25", refY: "1.25", orient: "auto", children: jsxRuntimeExports.jsx("polygon", { points: "0.3 0, 2 1.25, 0.3 2.5", fill: stroke }) }), jsxRuntimeExports.jsx("line", { x1: from.x, y1: from.y, x2: end.x, y2: end.y, opacity: isArrowActive
                            ? arrowOptions.activeOpacity
                            : arrowOptions.opacity, stroke: stroke, strokeWidth: isArrowActive
                            ? arrowOptions.activeArrowWidthMultiplier *
                                (squareWidth / arrowOptions.arrowWidthDenominator)
                            : squareWidth / arrowOptions.arrowWidthDenominator, markerEnd: `url(#${id}-arrowhead-${i}-${arrow.startSquare}-${arrow.endSquare})` })] }, `${id}-arrow-${arrow.startSquare}-${arrow.endSquare}${isArrowActive ? '-active' : ''}`));
        }) }));
}

function Highlights({ boardWidth, boardHeight }) {
    const { id, highlights, highlightOptions, boardOrientation } = useChessboardContext();
    const isValidHighlight = (item) => {
        return (typeof item === 'object' &&
            typeof item.square === 'string' &&
            ['primary', 'secondary', 'tertiary', 'engine'].includes(item.color));
    };
    if (!Array.isArray(highlights) || !highlights.every(isValidHighlight))
        return;
    if (!boardWidth || !boardHeight)
        return null;
    const squareSize = boardWidth / 8;
    const strokeWidth = Math.max(1, squareSize / 24);
    const padding = squareSize * 0.01;
    const radius = squareSize / 2 - strokeWidth / 2 - padding;
    const resolveColor = (c) => {
        switch (c) {
            case 'primary':
                return highlightOptions.primaryColor;
            case 'secondary':
                return highlightOptions.secondaryColor;
            case 'tertiary':
                return highlightOptions.tertiaryColor;
            default:
                return c ?? highlightOptions.primaryColor;
        }
    };
    function deduplicateBySquare(arr) {
        const map = new Map();
        for (const item of arr) {
            map.set(item.square, item); // Last occurrence wins
        }
        return Array.from(map.values());
    }
    return (jsxRuntimeExports.jsx("svg", { width: boardWidth, height: boardHeight, style: {
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 20,
            shapeRendering: 'geometricPrecision', // smoother edges
        }, children: deduplicateBySquare(highlights).map((h) => {
            const { x, y } = getRelativeCoords(boardOrientation, boardWidth, h.square);
            return (jsxRuntimeExports.jsx("circle", { cx: x, cy: y, r: radius, fill: "none", stroke: resolveColor(h.color), strokeWidth: strokeWidth, strokeOpacity: 0.9, vectorEffect: "non-scaling-stroke" // keeps stroke width crisp if scaled
             }, `${id}-highlight-${h.square}`));
        }) }));
}

function Draggable({ children, isMovable, isSparePiece = false, pieceType, position, }) {
    const { allowDragging } = useChessboardContext();
    const { setNodeRef, attributes, listeners } = useDraggable({
        id: position,
        data: {
            isSparePiece,
            pieceType,
        },
        disabled: !allowDragging || !isMovable,
    });
    return (jsxRuntimeExports.jsx("div", { ref: setNodeRef, ...attributes, ...listeners, children: children }));
}

function Droppable({ children, squareId }) {
    const { isOver, setNodeRef } = useDroppable({
        id: squareId,
    });
    return jsxRuntimeExports.jsx("div", { ref: setNodeRef, children: children({ isOver }) });
}

const Piece = React.memo(function Piece({ clone, isMovable, isSparePiece = false, position, pieceType, }) {
    const { id, allowDragging, animationDuration, boardOrientation, draggingPiece, draggingPieceStyle, draggingPieceGhostStyle, pieces, positionDifferences, onPieceClick, } = useChessboardContext();
    const [animationStyle, setAnimationStyle] = React.useState({});
    let cursorStyle = clone ? 'grabbing' : 'grab';
    if (!clone && (!allowDragging || !isMovable)) {
        cursorStyle = 'default';
    }
    React.useEffect(() => {
        if (positionDifferences[position]) {
            const sourceSquare = position;
            const targetSquare = positionDifferences[position];
            const squareWidth = document
                .querySelector(`#${id}-square-${sourceSquare}`)
                ?.getBoundingClientRect().width;
            if (!squareWidth) {
                throw new Error('Square width not found');
            }
            setAnimationStyle({
                transform: `translate(${(boardOrientation === 'black' ? -1 : 1) *
                    (targetSquare.charCodeAt(0) - sourceSquare.charCodeAt(0)) *
                    squareWidth}px, ${(boardOrientation === 'black' ? -1 : 1) *
                    (Number(sourceSquare[1]) - Number(targetSquare[1])) *
                    squareWidth}px)`,
                transition: `transform ${animationDuration}ms`,
                position: 'relative', // creates a new stacking context so the piece stays above squares during animation
                zIndex: 10,
            });
        }
        else {
            setAnimationStyle({});
        }
    }, [positionDifferences]);
    const PieceSvg = pieces[pieceType];
    return (jsxRuntimeExports.jsx("div", { tabIndex: -1, id: `${id}-piece-${pieceType}-${position}`, "data-piece": pieceType, style: {
            ...animationStyle,
            ...(clone
                ? { ...defaultDraggingPieceStyle, ...draggingPieceStyle }
                : {}),
            ...(!clone && draggingPiece?.position === position
                ? { ...defaultDraggingPieceGhostStyle, ...draggingPieceGhostStyle }
                : {}),
            width: '100%',
            height: '100%',
            cursor: cursorStyle,
            outline: 'none',
            touchAction: 'none', // prevent zooming and scrolling on touch devices
        }, onClick: () => onPieceClick?.({ isSparePiece, piece: { pieceType }, square: position }), children: jsxRuntimeExports.jsx(PieceSvg, {}) }));
});

const Square = React.memo(function Square({ children, hasMovablePiece, squareId, isDialogOpen, isLightSquare, isOver, }) {
    const { id, allowDrawingArrows, boardOrientation, currentPosition, squareStyle, squareStyles, darkSquareStyle, lightSquareStyle, dropSquareStyle, darkSquareNotationStyle, lightSquareNotationStyle, alphaNotationStyle, numericNotationStyle, showNotation, onMouseOverSquare, onSquareClick, onSquareRightClick, squareRenderer, newArrowStartSquare, newArrowOverSquare, clearArrowsWithCallback, setNewArrowStartSquare, setNewArrowOverSquare, drawArrow, pieceHighlight, pieceHighlightColor, } = useChessboardContext();
    const column = squareId.match(/^[a-z]+/)?.[0];
    const row = squareId.match(/\d+$/)?.[0];
    const isValidHighlight = (h) => {
        return typeof h.from === 'string';
    };
    const showPieceHighlight = isValidHighlight(pieceHighlight) &&
        (pieceHighlight.from === squareId || pieceHighlight.to === squareId);
    return (jsxRuntimeExports.jsxs("div", { id: `${id}-square-${squareId}`, style: {
            ...defaultSquareStyle,
            ...squareStyle,
            ...(isLightSquare
                ? { ...defaultLightSquareStyle, ...lightSquareStyle }
                : { ...defaultDarkSquareStyle, ...darkSquareStyle }),
            ...(isOver ? { ...defaultDropSquareStyle, ...dropSquareStyle } : {}),
        }, "data-column": column, "data-row": row, "data-square": squareId, onClick: (e) => {
            if (e.button === 0) {
                onSquareClick?.({
                    piece: currentPosition[squareId] ?? null,
                    square: squareId,
                });
            }
        }, onContextMenu: (e) => {
            e.preventDefault();
        }, onMouseDown: (e) => {
            if (e.button === 2 && allowDrawingArrows) {
                setNewArrowStartSquare(squareId);
            }
        }, onMouseUp: (e) => {
            if (e.button === 0 &&
                allowDrawingArrows &&
                !hasMovablePiece &&
                !isDialogOpen &&
                Object.keys(squareStyles).length === 0) {
                clearArrowsWithCallback();
            }
            if (e.button === 2) {
                e.preventDefault();
                onSquareRightClick?.({
                    piece: currentPosition[squareId] ?? null,
                    square: squareId,
                    isDrawingArrow: allowDrawingArrows && !!newArrowOverSquare,
                });
                if (newArrowStartSquare) {
                    drawArrow(squareId, {
                        shiftKey: e.shiftKey,
                        ctrlKey: e.ctrlKey,
                    });
                }
            }
        }, onMouseOver: (e) => {
            // right mouse button is held down and we are drawing an arrow
            if (e.buttons === 2 && newArrowStartSquare) {
                setNewArrowOverSquare(squareId, {
                    shiftKey: e.shiftKey,
                    ctrlKey: e.ctrlKey,
                });
            }
            onMouseOverSquare?.({
                piece: currentPosition[squareId] ?? null,
                square: squareId,
            });
        }, children: [showNotation ? (jsxRuntimeExports.jsxs("span", { style: isLightSquare
                    ? {
                        ...defaultLightSquareNotationStyle,
                        ...lightSquareNotationStyle,
                    }
                    : {
                        ...defaultDarkSquareNotationStyle,
                        ...darkSquareNotationStyle,
                    }, children: [row === (boardOrientation === 'white' ? '1' : '8') && (jsxRuntimeExports.jsx("span", { style: { ...defaultAlphaNotationStyle, ...alphaNotationStyle }, children: column })), column === (boardOrientation === 'white' ? 'h' : 'a') && (jsxRuntimeExports.jsx("span", { style: {
                            ...defaultNumericNotationStyle,
                            ...numericNotationStyle,
                        }, children: row }))] })) : null, squareRenderer?.({
                piece: currentPosition[squareId] ?? null,
                square: squareId,
                children,
            }) || (jsxRuntimeExports.jsxs("div", { style: {
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    ...squareStyles[squareId],
                }, children: [showPieceHighlight && (jsxRuntimeExports.jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `linear-gradient(${pieceHighlightColor}, ${pieceHighlightColor})`,
                            opacity: 0.5,
                            pointerEvents: 'none',
                            zIndex: 0,
                        } })), jsxRuntimeExports.jsx("div", { style: {
                            position: 'relative',
                            zIndex: 1,
                        }, children: children })] }))] }));
});

function PromotionDialog({ boardWidth, visible, setVisible }) {
    const { boardOrientation, positionFen, promotionDialog, pieces, onPromotionPieceSelect, } = useChessboardContext();
    const dialogRef = React.useRef(null);
    const [isHover, setIsHover] = React.useState(undefined);
    React.useEffect(() => {
        if (promotionDialog.type !== 'none')
            setVisible(true);
    }, [promotionDialog]);
    React.useEffect(() => {
        if (!visible)
            return; // nothing to do if hidden
        const handlePointerUp = (e) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target)) {
                e.stopPropagation(); // don’t let the click move a piece
                setVisible(false); // hide locally
            }
        };
        // capture phase so we run before board’s own handlers
        document.addEventListener('pointerup', handlePointerUp, true);
        return () => document.removeEventListener('pointerup', handlePointerUp, true);
    }, [visible]);
    if (!boardWidth || !visible || promotionDialog.type === 'none')
        return null;
    const promotePieceColor = (typeof positionFen === 'string' ? positionFen.split(' ')[1] : undefined) ??
        'w';
    const promotionOptions = [
        `${promotePieceColor}Q`,
        `${promotePieceColor}R`,
        `${promotePieceColor}N`,
        `${promotePieceColor}B`,
    ];
    // Determines if promotion is happening on the bottom rank
    const isBottomRank = (boardOrientation === 'white' &&
        promotionDialog?.promotionSquare?.[1] === '1') ||
        (boardOrientation === 'black' &&
            promotionDialog?.promotionSquare[1] === '8');
    const dialogStyles = {
        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            width: boardWidth, // so it overlays the board only
            height: boardWidth, // square overlay
            pointerEvents: 'auto',
        },
        modalContent: {
            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            gap: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'auto',
        },
        vertical: {
            transform: isBottomRank
                ? `translate(${-boardWidth / 16}px, ${+boardWidth / 16}px)`
                : `translate(${-boardWidth / 16}px, ${-boardWidth / 16}px)`,
        },
    };
    const dialogCoords = promotionDialog.type === 'vertical'
        ? getRelativeCoords(boardOrientation, boardWidth, promotionDialog.promotionSquare)
        : { x: 0, y: 0 };
    // Reversing the order in which piece icons appear for vertical dialog if promotion occurs on the bottom rank
    const orderedPromotionOptions = isBottomRank
        ? promotionOptions.reverse()
        : promotionOptions;
    const Piece = ({ option }) => {
        const PieceSvg = pieces[option]; // grab the component
        return jsxRuntimeExports.jsx(PieceSvg, {}); // render it
    };
    return promotionDialog.type === 'modal' ? (jsxRuntimeExports.jsx("div", { style: dialogStyles.modal, children: jsxRuntimeExports.jsx("div", { ref: dialogRef, style: dialogStyles.modalContent, children: orderedPromotionOptions.map((option) => (jsxRuntimeExports.jsx("div", { tabIndex: -1, onPointerDown: () => {
                    onPromotionPieceSelect?.(option);
                    setVisible(false);
                }, onPointerEnter: () => setIsHover(option), onPointerLeave: () => setIsHover(undefined), style: {
                    cursor: 'pointer',
                    touchAction: 'none',
                    borderRadius: '8px',
                    padding: '4px',
                    backgroundColor: isHover === option ? '#f0ad4e' : 'white',
                    transition: 'all 0.15s ease-in-out',
                }, children: jsxRuntimeExports.jsx("svg", { viewBox: "1 1 43 43", width: boardWidth / 8, height: boardWidth / 8, style: {
                        transition: 'transform 0.15s ease-in-out',
                        transform: isHover === option ? 'scale(1)' : 'scale(0.9)',
                    }, children: jsxRuntimeExports.jsx("g", { children: jsxRuntimeExports.jsx(Piece, { option: option }) }) }) }, option))) }) })) : promotionDialog.type === 'vertical' ? (jsxRuntimeExports.jsx("div", { style: dialogStyles.modal, children: jsxRuntimeExports.jsx("div", { ref: dialogRef, style: {
                position: 'absolute',
                top: isBottomRank ? undefined : `${dialogCoords?.y}px`,
                bottom: isBottomRank
                    ? `${boardWidth - dialogCoords?.y}px`
                    : undefined,
                left: `${dialogCoords?.x}px`,
                zIndex: 1000,
                width: boardWidth / 8,
                height: boardWidth / 2,
                boxSizing: 'border-box',
                border: '1px solid gray',
                ...dialogStyles.vertical,
            }, title: "Choose promotion piece", children: orderedPromotionOptions.map((option) => (jsxRuntimeExports.jsx("div", { tabIndex: -1, onClick: () => onPromotionPieceSelect?.(option), onPointerEnter: () => setIsHover(option), onPointerLeave: () => setIsHover(undefined), style: {
                    cursor: 'pointer',
                    touchAction: 'none',
                    backgroundColor: isHover === option ? 'orange' : '#cabfa6ff',
                    transition: 'all 0.1s ease-out',
                }, children: jsxRuntimeExports.jsx("svg", { viewBox: "1 1 43 43", width: boardWidth / 8, height: boardWidth / 8, style: {
                        display: 'block',
                        transition: 'all 0.1s ease-out',
                        transform: isHover === option ? 'scale(1)' : 'scale(0.85)',
                    }, children: jsxRuntimeExports.jsx("g", { children: jsxRuntimeExports.jsx(Piece, { option: option }) }) }) }, option))) }) })) : null;
}

function Board() {
    const { board, positionFen, sideToMove, boardStyle, currentPosition, draggingPiece, id, } = useChessboardContext();
    const boardRef = React.useRef(null);
    const [boardWidth, setBoardWidth] = React.useState(boardRef.current?.clientWidth);
    const [boardHeight, setBoardHeight] = React.useState(boardRef.current?.clientHeight);
    // the state that controls whether promotion dialog is open; it sits on the
    // parent component and is used by the square component in deciding to clear arrows
    const [visible, setVisible] = React.useState(false);
    // determine which side has the move; this is used to determined whether the rendered piece is legal to move
    const playerSide = sideToMove ??
        (typeof positionFen === 'string' ? positionFen.split(' ')[1] : undefined) ??
        'w';
    // if the board dimensions change, update the board width and height
    React.useEffect(() => {
        if (boardRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                setBoardWidth(boardRef.current?.clientWidth);
                setBoardHeight(boardRef.current?.clientHeight);
            });
            resizeObserver.observe(boardRef.current);
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [boardRef.current]);
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { id: `${id}-board`, ref: boardRef, style: { ...defaultBoardStyle(), ...boardStyle }, children: [board.map((row) => row.map((square) => {
                        const piece = currentPosition[square.squareId];
                        return (jsxRuntimeExports.jsx(Droppable, { squareId: square.squareId, children: ({ isOver }) => (jsxRuntimeExports.jsx(Square, { isOver: isOver, isDialogOpen: visible, ...square, hasMovablePiece: !!piece && piece.pieceType[0].toLowerCase() === playerSide, children: piece ? (jsxRuntimeExports.jsx(Draggable, { isMovable: sideToMove === 'both'
                                        ? true
                                        : piece.pieceType[0].toLowerCase() === playerSide, isSparePiece: false, position: square.squareId, pieceType: piece.pieceType, children: jsxRuntimeExports.jsx(Piece, { ...piece, position: square.squareId, isMovable: sideToMove === 'both'
                                            ? true
                                            : piece.pieceType[0].toLowerCase() === playerSide }) })) : null })) }, square.squareId));
                    })), jsxRuntimeExports.jsx(Arrows, { boardWidth: boardWidth, boardHeight: boardHeight }), jsxRuntimeExports.jsx(Highlights, { boardWidth: boardWidth, boardHeight: boardHeight }), jsxRuntimeExports.jsx(PromotionDialog, { boardWidth: boardWidth, visible: visible, setVisible: setVisible })] }), jsxRuntimeExports.jsx(DragOverlay, { dropAnimation: null, modifiers: [snapCenterToCursor], children: draggingPiece ? (jsxRuntimeExports.jsx(Piece, { clone: true, position: draggingPiece.position, pieceType: draggingPiece.pieceType })) : null })] }));
}

function Chessboard({ options }) {
    const { isWrapped } = useChessboardContext() ?? { isWrapped: false };
    // ensure arrowOptions is a fresh object if provided
    const stableOptions = React.useMemo(() => {
        if (!options)
            return undefined;
        return {
            ...options,
            arrowOptions: options.arrowOptions
                ? { ...options.arrowOptions }
                : undefined,
        };
    }, [options]);
    if (isWrapped) {
        return jsxRuntimeExports.jsx(Board, {});
    }
    return (jsxRuntimeExports.jsx(ChessboardProvider, { options: stableOptions, children: jsxRuntimeExports.jsx(Board, {}) }));
}

function SparePiece({ pieceType }) {
    return (jsxRuntimeExports.jsx(Draggable, { isSparePiece: true, position: pieceType, pieceType: pieceType, isMovable: true, children: jsxRuntimeExports.jsx(Piece, { isSparePiece: true, pieceType: pieceType, position: pieceType }) }));
}

exports.Chessboard = Chessboard;
exports.ChessboardProvider = ChessboardProvider;
exports.SparePiece = SparePiece;
exports.chessColumnToColumnIndex = chessColumnToColumnIndex;
exports.chessRowToRowIndex = chessRowToRowIndex;
exports.columnIndexToChessColumn = columnIndexToChessColumn;
exports.defaultAlphaNotationStyle = defaultAlphaNotationStyle;
exports.defaultArrowOptions = defaultArrowOptions;
exports.defaultBoardStyle = defaultBoardStyle;
exports.defaultDarkSquareNotationStyle = defaultDarkSquareNotationStyle;
exports.defaultDarkSquareStyle = defaultDarkSquareStyle;
exports.defaultDraggingPieceGhostStyle = defaultDraggingPieceGhostStyle;
exports.defaultDraggingPieceStyle = defaultDraggingPieceStyle;
exports.defaultDropSquareStyle = defaultDropSquareStyle;
exports.defaultHighlightsOptions = defaultHighlightsOptions;
exports.defaultLightSquareNotationStyle = defaultLightSquareNotationStyle;
exports.defaultLightSquareStyle = defaultLightSquareStyle;
exports.defaultNumericNotationStyle = defaultNumericNotationStyle;
exports.defaultPieces = defaultPieces;
exports.defaultSquareStyle = defaultSquareStyle;
exports.fenStringToPositionObject = fenStringToPositionObject;
exports.generateBoard = generateBoard;
exports.getPositionUpdates = getPositionUpdates;
exports.getRelativeCoords = getRelativeCoords;
exports.rowIndexToChessRow = rowIndexToChessRow;
exports.useChessboardContext = useChessboardContext;
