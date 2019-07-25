/* global require */
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Picker = require('../../../node_modules/vanilla-picker');

require('./bootstrap');

window.Dropzone = require('../../../node_modules/dropzone/dist/dropzone');
window.keymap = 'default';



let frames;
let currentFrame = 0;

window.drawIcon = function(framebuffer) {
	let r = 0, p = 0;
	frames[currentFrame].forEach(function(pixel) {
		if (p > 7) {
			r++;
			p = 0;
		}
		if (r > 7) {
			console.warn('Image too big!');
		}
		framebuffer[r][p].style.backgroundColor = pixel.replace('0x', '#');
		p++;
	});
};

window.framesToContent = function() {
	let content = 'icon = (';
	frames.forEach(function(frame){
		content += '[';
		frame.forEach(function(pixel) {
			content += window.pixelToHexA(pixel);
		});
		content += ']';
	});
	content += ', ' + frames.length + ')';
	console.log(content);
};

window.pixelToHexA = function(rgba) {
	let sep = rgba.indexOf(',') > -1 ? ',' : ' ';
	rgba = rgba.substr(5).split(')')[0].split(sep);
	if (rgba.indexOf('/') > -1)
		rgba.splice(3,1);
	for (let R in rgba) {
		let r = rgba[R];
		if (r.indexOf('%') > -1) {
			let p = r.substr(0,r.length - 1) / 100;

			if (R < 3) {
				rgba[R] = Math.round(p * 255);
			} else {
				rgba[R] = p;
			}
		}
	}
	let r = (+rgba[0]).toString(16),
		g = (+rgba[1]).toString(16),
		b = (+rgba[2]).toString(16),
		a = Math.round(+rgba[3] * 255).toString(16);

	if (r.length === 1)
		r = '0' + r;
	if (g.length === 1)
		g = '0' + g;
	if (b.length === 1)
		b = '0' + b;
	if (a.length === 1)
		a = '0' + a;
	return '0x' + r + g + b + a;
};

window.onload = function() {
	if (document.getElementById('content')) {
		window.CodeMirror = require([
			'../../../node_modules/codemirror/lib/codemirror',
			'../../../node_modules/codemirror/mode/python/python',
			'../../../node_modules/codemirror/addon/dialog/dialog.js',
			'../../../node_modules/codemirror/addon/search/searchcursor.js',
			'../../../node_modules/codemirror/keymap/vim.js',
			'../../../node_modules/codemirror/keymap/sublime.js',
			'../../../node_modules/codemirror/keymap/emacs.js'
		], function (CodeMirror) {
			CodeMirror.fromTextArea(document.getElementById('content'), {
				lineNumbers: true,
				mode: 'python',
				showCursorWhenSelecting: true,
				indentWithTabs: true,
				keyMap: window.keymap,
			});
		});
		// Enable navigation prompt
		window.onbeforeunload = function() {
			return true;
		};
		document.getElementById('content_form').addEventListener('submit', function() {
			window.onbeforeunload = null;
		});
	}
	if (document.getElementById('content-readonly')) {
		window.CodeMirror = require(['../../../node_modules/codemirror/lib/codemirror',
			'../../../node_modules/codemirror/mode/python/python'], function (CodeMirror) {
			CodeMirror.fromTextArea(document.getElementById('content-readonly'), {
				lineNumbers: true,
				mode: 'python',
				readOnly: true
			});
		});
	}
	if (document.getElementById('pixels')) {
		let icon;
		let readOnly = true;
		if (document.getElementById('content')) {
			icon = document.getElementById('content');
			readOnly = false;
		} else {
			icon = document.getElementById('content-readonly');
		}
		let data = icon.innerHTML.trim();
		if (data.startsWith('icon = ')) {
			data = data.replace('icon = (', '');
			data = data.replace(')','');
			let numFrames = parseInt(data.match(/[0-9]+?$/)[0]);
			data = data.replace(', '+numFrames, '');
			if (numFrames > 0) {
				frames = data.split('],');
				frames.forEach(function (frame, index) {
					frame = frame.trim();
					frame = frame.replace('[', '');
					frame = frame.replace(']', '');
					frame = frame.trim();
					frame = frame.split(',');
					frame.forEach(function (pixel, index) {
						frame[index] = pixel.trim();
					});
					frames[index] = frame;
				});
				console.log(frames);
				if (frames.length !== numFrames) {
					console.warn('Data corrupted!');
				} else {
					const framebuffer = [];
					for (let r = 0; r < 8; r++) {
						framebuffer[r] = [];
						for (let p = 0; p < 8; p++) {
							framebuffer[r][p] = document.getElementById('row'+r+'pixel'+p);
							if (!readOnly) {
								framebuffer[r][p].onclick = function() {
									this.style.backgroundColor = document.getElementById('colour').style.backgroundColor;
									let pos = this.id.match(/[0-9]+?/g);
									let r = pos[0];
									let p = pos[1];
									frames[currentFrame][r][p] = this.style.backgroundColor;
									window.framesToContent();
								};
							}
						}
					}
					window.drawIcon(framebuffer);
				}
				if (!readOnly) {
					const parentBasic = document.getElementById('colour'),
						popupBasic = new window.Picker.default(parentBasic);
					popupBasic.onChange = function(color) {
						parentBasic.style.backgroundColor = color.rgbaString;
					};
				}
			}
		}
	}
};