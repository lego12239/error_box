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
	if (show_cb != undefined)
		this.cb.show = show_cb;
	if (hide_cb != undefined)
		this.cb.hide = hide_cb;
}

error_box.prototype.show = function (emsg)
{
	if (emsg != null)
		this.el.cntr.innerHTML = emsg;
	this.el.cntr.classList.add(this.show_class);

	if (this.cb.show != undefined)
		this.cb.show();
}

error_box.prototype.hide = function ()
{
	this.el.cntr.classList.remove(this.show_class);

	if (this.cb.hide != undefined)
		this.cb.hide();
}
