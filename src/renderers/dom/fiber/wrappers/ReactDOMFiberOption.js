/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDOMFiberOption
 * @flow
 */

'use strict';

var React = require('react');

if (__DEV__) {
  var warning = require('fbjs/lib/warning');
}

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  // We can silently skip them because invalid DOM nesting warning
  // catches these cases in Fiber.
  React.Children.forEach(children, function(child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */
var ReactDOMOption = {
  validateProps: function(element: Element, props: Object) {
    // TODO (yungsters): Remove support for `selected` in <option>.
    if (__DEV__) {
      warning(
        props.selected == null,
        'Use the `defaultValue` or `value` props on <select> instead of ' +
          'setting `selected` on <option>.',
      );
    }
  },

  postMountWrapper: function(element: Element, props: Object) {
    // value="" should make a value attribute (#6219)
    if (props.value != null) {
      element.setAttribute('value', props.value);
    }
  },

  getHostProps: function(element: Element, props: Object) {
    var hostProps = Object.assign({children: undefined}, props);

    var content = flattenChildren(props.children);

    if (content) {
      hostProps.children = content;
    }

    return hostProps;
  },
};

module.exports = ReactDOMOption;
