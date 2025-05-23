/* error_box | error_box 0.1.0 | License - GNU LGPL 3 */
/*
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * https://github.com/lego12239/error_box.js
 */

function error_box(cntr_el, show_cb, hide_cb)
{
	this.el = {};
	this.cb = {show: null, hide: null};
	this.show_class = "show";

	this.el.cntr = cntr_el;
	if (show_cb != null)
		this.cb.show = show_cb.bind(this);
	else
		this.cb.show = function (emsg, opts) { return emsg; };
	if (hide_cb != null)
		this.cb.hide = hide_cb.bind(this);
	else
		this.cb.hide = function () { return true; };
}

/*
 * Show error message.
 * prms:
 *  emsg - an error message
 *  opts - an object with options:
 *         tag  - a message tag ("" by default)
 *         el   - a container element for an error message
 *                if null, then use element specified at constructor call
 *         is_append - if true, then append new emsg to existing one, instead
 *                     of replace it. (false by default)
 */
error_box.prototype.show = function (emsg, opts)
{
	var el_tag, el_msg;

	if (opts == null) {
		opts = {tag: "", el: null, is_append: false};
	}
	if (opts.el == null)
		opts.el = this.el.cntr;

	if (opts.tag.match(/'/)) {
		console.error(`tag shouldn't contain quote: ${opts.tag}!`);
		return;
	}

	if (emsg != null) {
		el_tag = opts.el.querySelector("div[data-etag='" + opts.tag + "']");
		if (el_tag == null) {
			el_tag = document.createElement("div");
			el_tag.dataset.etag = opts.tag;
			opts.el.append(el_tag);
		}
		el = document.createElement("div");
		el.innerHTML = emsg;
		if (!opts.is_append)
			el_tag.innerHTML = "";
		el_tag.append(el);

		this.cb.show(el, emsg, opts);
	}
	opts.el.classList.add(this.show_class);

	return true;
}

/*
 * Hide error message.
 * prms:
 *  opts - an object with options:
 *         tag  - a message tag ("" by default)
 *         el   - a container element with an error message
 *                if null, then use element specified at constructor call
 */
error_box.prototype.hide = function (opts)
{
	var el_tag;

	if (opts == null) {
		opts = {tag: null, el: null};
	}
	if (opts.el == null)
		opts.el = this.el.cntr;

	if (opts.tag != null) {
		el_tag = opts.el.querySelector("div[data-etag='" + opts.tag + "']");
		if (el_tag)
			el_tag.remove();
	} else {
		opts.el.innerHTML = "";
	}
	if (opts.el.children.length == 0)
		opts.el.classList.remove(this.show_class);

	return this.cb.hide(opts);
}
