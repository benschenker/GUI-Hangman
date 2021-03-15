(function(){
    'use strict';
    //add comment here
    /////////////////////////////////////////////////
    // Variable declaration
    /////////////////////////////////////////////////
    var toArray, contains, forEachLetter, cornifyOnce, cornifyTimes, includeCornify
        ;
    /////////////////////////////////////////////////
    // Variable initialzation
    /////////////////////////////////////////////////
    toArray = function(obj) {
        return Array.prototype.slice.call(obj);
    };
    contains = function(array, value) {
        return array.indexOf(value) != -1;
    };
    forEachLetter = function(str, fn) {
        var letters, mappedLetters
            ;
        letters = toArray(str);
        mappedLetters = letters.map(fn);
        return mappedLetters.join('');
    };
    includeCornify = function() {
    	var cornifyScript, files
    		;
    	cornifyScript=document.getElementById('__cornify_nodes');
    	files=[
    		'cornify/cornify.js',
    		'cornify/cornify_run.js'
    		];
    	if(!cornifyScript) {
    		cornifyScript=document.createElement('div');
    		cornifyScript.id='__cornify_nodes';
    		document.querySelector('body').appendChild(cornifyScript);
    		files.map(function(file){
    		    var includeCornifyScript;
    			includeCornifyScript=document.createElement('script');
    			includeCornifyScript.src=file;
    			cornifyScript.appendChild(includeCornifyScript);
    		});
    	}
    };
    cornifyOnce = function(){
        var tryAddCornify;
        tryAddCornify = function() {
            if(window.cornify_add) {
                window.cornify_add();
                return;
            }
            setTimeout(tryAddCornify, 500);
        };
        includeCornify();
        tryAddCornify();
    };
    cornifyTimes = function(times) {
        cornifyOnce();
        for(var counter = 0; counter < times; counter += 1) {
            cornifyOnce();
        }
    };
    /////////////////////////////////////////////////
    // Export variables
    /////////////////////////////////////////////////
    window.hangman = {};
    window.hangman.util = {
        forEachLetter: forEachLetter,
        contains: contains,
        cornifyTimes: cornifyTimes,
    };
}).call();
