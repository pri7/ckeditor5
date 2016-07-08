/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Element from './element.js';

/**
 * Containers are elements which define document structure. They define boundaries for
 * {@link engine.view.AttributeElement attributes}. They are mostly use for block elements like `<p>` or `<div>`.
 *
 * Editing engine does not define fixed HTML DTD. This is why the type of the {@link engine.view.Element} need to
 * be defined by the feature developer.
 *
 * Creating an element you should use `ContainerElement` class or {@link engine.view.AttributeElement}. This is
 * important to define the type of the element because of two reasons:
 *
 * Firstly, {@link engine.view.DomConverter} needs the information what is an editable block to convert elements to
 * DOM properly. {@link engine.view.DomConverter} will ensure that `ContainerElement` is editable and it is possible
 * to put caret inside it, even if the container is empty.
 *
 * Secondly, {@link engine.view.writer view writer} uses this information.
 * Nodes {@link engine.view.writer.breakAt breaking} and {@link engine.view.writer.mergeAt merging}
 * is performed only in a bounds of a container nodes.
 *
 * For instance if `<p>` is an container and `<b>` is attribute:
 *
 *		<p><b>fo^o</b></p>
 *
 * {@link engine.view.writer.breakAt breakAt} will create:
 *
 *		<p><b>fo</b><b>o</b></p>
 *
 * There might be a need to mark `<span>` element as a container node, for example in situation when it will be a
 * container of an inline widget:
 *
 *		<span color="red">foobar</span>		// attribute
 *		<span data-widget>foobar</span>		// container
 *
 * @memberOf engine.view
 * @extends engine.view.Element
 */
export default class ContainerElement extends Element {
	/**
	 * Creates a container element.
	 *
	 * @see engine.view.Element
	 */
	constructor( name, attrs, children ) {
		super( name, attrs, children );
	}

	/**
	 * Returns block {@link engine.view.filler filler} offset or `null` if block filler is not needed.
	 *
	 * @returns {Number|null} Block filler offset or `null` if block filler is not needed.
	 */
	getFillerOffset() {
		return this.getChildCount() === 0 ? 0 : null;
	}
}
