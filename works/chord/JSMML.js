/*
 * JSMML
 * Author: Yuichi Tateno
 * http://rails2u.com/
 *
 * Modified by Logue
 * http://logue.be/
 *
 * The MIT Licence.
 */
var JSMML = (function() {
	return function(swfurl) {
		if (typeof(dojo) == 'object'){
			this.mmlPlayer = dojo.byId(JSMML.mmlID);
		}else{
			this.mmlPlayer = document.getElementById(JSMML.mmlID);
		}
		this.initialize.call(this);
	}
})();

JSMML.meta = {
	"@prefix": "<http://purl.org/net/ns/doas#>",
	"@about": "<JSMML.js>", a: ":JavaScript",
	 title: "FLMML for JavaScript",
	 created: "2007-10-06", release: {revision: "1.2.3", created: "2010-06-15"},
	 contributor: {name: "Yuichi Tateno", homepage: "<http://rails2u.com/>"},
	 author: {name: "Logue", homepage: "<http://logue.be/>"},
	 license: "<http://www.opensource.org/licenses/mit-license.php>",
	 dependencies: 'JSMML.swf, dojo, jQuery, SWFObjects'
};

JSMML.VESION = JSMML.meta.release.revision;
JSMML.setSWFVersion = function(v) { JSMML.SWF_VERSION = v };
JSMML.SWF_VERSION = 'JSMML is not loaded, yet.';
JSMML.toString = function() {
	return 'JSMML VERSION: ' + JSMML.VESION + ', SWF_VERSION: ' + JSMML.SWF_VERSION;
};

JSMML.swfurl = 'JSMML.swf';
JSMML.mmlID = 'jsmml';
JSMML.containerID = JSMML.mmlID+'_container';
JSMML.onLoad = function() {};
JSMML.loaded = false;
JSMML.instances = {};
JSMML.notRunning = 'JSMML is not running!<br />Please execute this in HTTP protocol.'

JSMML.init = function(swfurl) {
	var JSMML_params = {
		swfLiveConnect:true,
		bgcolor:'#FFFFFF',
		quality:'high',
		allowScriptAccess:'always',
		style:'display:inline;'
	};
	var swfname = (swfurl ? swfurl : JSMML.swfurl) + '?' + (new Date()).getTime();
	
	if (! document.getElementById(JSMML.containerID)) {
		if (typeof(jQuery) == 'function'){
			$('body').append('<div id="'+JSMML.containerID+'"></div>');
		}else{
			var div = document.createElement('div');
			div.id = JSMML.containerID;
			document.body.appendChild(div);
		}
	}

	if (!document.location.protocol.match(/http/i)){
		if(typeof(jQuery) == 'function'){
			jQuery('#'+JSMML.containerID).html(JSMML.notRunning);
		}else if(typeof(dojo) == 'object'){
			dojo.byId(JSMML.containerID).innerHTML = JSMML.notRunning
		}else{
			document.getElementById(JSMML.containerID).innerHTML = JSMML.notRunning;
		}
	}else if(typeof(dojo) == 'object'){
		JSMML.mmlPlayer = new dojox.embed.Flash({
			id: JSMML.mmlID,
			expressInstall:true,
			path:swfname,
			width:1,
			height:1,
			params:JSMML_params
		},JSMML.containerID);
	}else{
		try{
			// init
			swfobject.embedSWF(
				swfname,
				JSMML.containerID,
				1,
				1,
				'10.0.0',
				'expressInstall.swf',
				'', 
				JSMML_params,
				{id:JSMML.mmlID}
			);
		}catch(e){};
	}
}

// call from swf
JSMML.initASFinish = function() {
	JSMML.loaded = true;
	JSMML.onLoad();
}

JSMML.eventInit = function() {
	JSMML.init();
}

JSMML.prototype = {
	initialize: function() {
		this.onFinish = function() {};
		this.pauseNow = false;
	},
	uNum: function() {
		if (!this._uNum) {
			this._uNum = this.mmlPlayer._create();
			JSMML.instances[this._uNum] = this;
		}
		return this._uNum;
	},
	play: function(_mml) {
		if (!_mml && this.pauseNow) {
			this.mmlPlayer._play(this.uNum());
		} else {
			if (_mml) this.score = _mml;
			this.mmlPlayer._play(this.uNum(), this.score);
		}
		this.pauseNow = false;
	},
	stop: function() {
		this.mmlPlayer._stop(this.uNum());
	},
	pause: function() {
		this.pauseNow = true;
		this.mmlPlayer._pause(this.uNum());
	},
	destroy: function() {
		this.mmlPlayer._destroy(this.uNum());
		delete JSMML.instances[this.uNum()];
	},

	/* Add */
	isPlaying: function(){
		return this.mmlPlayer._isPlaying(this.uNum());
	},
	isPaused: function(){
		return this.mmlPlayer._isPaused(this.uNum());
	},
	setMasterVolume: function(volume){
		return this.mmlPlayer._setMasterVolume(this.uNum(),volume);
	},
	getWarnings: function(){
		return this.mmlPlayer._getWarnings(this.uNum());
	},
	getTotalMSec: function(){
		return this.mmlPlayer._getTotalMSec(this.uNum());
	},
	getTotalTimeStr: function(){
		return this.mmlPlayer._getTotalTimeStr(this.uNum());
	},
	getNowMSec: function(){
		return this.mmlPlayer._getNowMSec(this.uNum());
	},
	getNowTimeStr: function(){
		return this.mmlPlayer._getNowTimeStr(this.uNum());
	}
};

if (typeof(dojo) == 'object'){
	dojo.provide('JSMML');
	dojo.require('dojox.embed.Flash');
	dojo.addOnLoad(JSMML.eventInit);
}else{
	if(typeof(swfobject) == 'undefined'){
		var tag = document.createElement("script");
		tag.type = 'text/javascript';
		tag.async = 'async';
		tag.defer = 'defer';
		tag.src = 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(tag);
	}

	if (typeof(jQuery) == 'function'){
		jQuery(document).ready(JSMML.eventInit);
	}else{
		/*
		* FastInit
		* http://tetlaw.id.au/view/javascript/fastinit
		* Andrew Tetlaw
		*/
		var FastInit={onload:function(){if(FastInit.done){return}FastInit.done=true;for(var a=0,b=FastInit.f.length;a<b;a++){FastInit.f[a]()}},addOnLoad:function(){var c=arguments;for(var b=0,d=c.length;b<d;b++){if(typeof c[b]==="function"){if(FastInit.done){c[b]()}else{FastInit.f.push(c[b])}}}},listen:function(){if(/WebKit|khtml/i.test(navigator.userAgent)){FastInit.timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(FastInit.timer);delete FastInit.timer;FastInit.onload()}},10)}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",FastInit.onload,false)}else{if(!FastInit.iew32){if(window.addEventListener){window.addEventListener("load",FastInit.onload,false)}else{if(window.attachEvent){return window.attachEvent("onload",FastInit.onload)}}}}}},f:[],done:false,timer:null,iew32:false};
		/*@cc_on @*/
		/*@if (@_win32)
		FastInit.iew32 = true;
		document.write('<script id="__ie_onload" defer src="' + ((location.protocol == 'https:') ? '//0' : 'javascript:void(0)') + '"><\/script>');
		document.getElementById('__ie_onload').onreadystatechange = function(){if (this.readyState == 'complete') { FastInit.onload(); }};
		/*@end @*/
		FastInit.listen();
		FastInit.addOnLoad(JSMML.eventInit);
	}
}