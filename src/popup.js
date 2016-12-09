 document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.set({runnable: false}, function() {});

    var link = document.getElementById('run');
    var optspage = document.getElementById("opts");

    // onClick's logic below:
    link.addEventListener('click', function() {
    	chrome.storage.sync.set({
    		runnable: true
    	},
    	function() {});
        chrome.tabs.executeScript(null, {file: "bot.js"});
    });
    
    optspage.addEventListener('click', function() {
    	chrome.tabs.create({url: "options.html"});
    });
});