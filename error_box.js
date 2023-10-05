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
		this.cb.show = function () { return true; };
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
 *         el   - a container element for an error message
 *                if null, then use element specified at constructor call
 */
error_box.prototype.show = function (emsg, opts)
{
	if (opts == null) {
		opts = {el: null};
	}
	if (opts.el == null)
		opts.el = this.el.cntr;

	if (opts.el.classList.contains(this.show_class))
		return;

	if (emsg != null)
		opts.el.innerHTML = emsg;
	opts.el.classList.add(this.show_class);

	return this.cb.show();
}

/*
 * Hide error message.
 * prms:
 *  opts - an object with options:
 *         el   - a container element with an error message
 *                if null, then use element specified at constructor call
 */
error_box.prototype.hide = function (opts)
{
	if (opts == null) {
		opts = {el: null};
	}
	if (opts.el == null)
		opts.el = this.el.cntr;

	if (!opts.el.classList.contains(this.show_class))
		return;

	opts.el.classList.remove(this.show_class);

	return this.cb.hide();
}
