var t0 = performance.now();

var url_split = window.location.href.split("/");

// if keyword enabled, navigate to category from shopfront
if (window.location.href.split(".")[0].split("/")[2] == "shop" && url_split.length == 4) {
	chrome.storage.sync.get({
		region: '',
		runnable: '',
		kw_enabled: '',
		category: ''
	}, 
	function(items) {
	    if (items.kw_enabled && items.runnable && items.region != "jp") {
	    	window.location.href = "https://shop.palaceskateboards.com/collections/" + items.category;
	    }
	});
}

// if keyword enabled, navigate to first matched item from category page
if (url_split[url_split.length-2] == "collections" && url_split.length == 5) {
	chrome.storage.sync.get({
		region: '',
		kw_enabled: '',
		keywords: ''
	},
	function(items) {
		if (items.kw_enabled && items.region != "jp") {
			var keywords = items.keywords.split(" ");
			foundItems = []

			var aTags = document.getElementsByTagName("h3");
			for (var i = 0; i < aTags.length; i++) {
				if (aTags[i].textContent.toLowerCase().includes(keywords[0].toLowerCase())) {
						foundItems.push(aTags[i]);
				}
			}

			for (word in keywords) {
				temp = []
				for (i in foundItems) {
					if (foundItems[i].textContent.toLowerCase().includes(keywords[word].toLowerCase())) {
						temp.push(foundItems[i])
					}
				}
				foundItems = temp;
			}
			// .click() does not trigger DOMContentLoaded here for some reason
			window.location.href = foundItems[0].parentElement.href;
		}
	});
}

// if on item page, select colour, size and navigate to checkout
// regex to verify 9 character alphanumeric string
if (url_split[url_split.length-2] == "products") { // && url_split.length == 7) {
	chrome.storage.sync.get({
		region: '',
		size: '',
		kw_enabled: '',
	}, 
	function(items) {
		// select size
		var opTags = document.getElementsByTagName("option");
		for (var i = 0; i < opTags.length; i++) {
			if (opTags[i].textContent.toLowerCase() == items.size.toLowerCase()) {
				document.getElementById("product-select").value = opTags[i].value;
			}
		}
	});

	// add to basket
	setTimeout(function(){document.getElementsByName("button")[0].click();}, 1500);

	// go to checkout
	setTimeout(function(){window.location.href = "https://shop.palaceskateboards.com/cart";}, 2000);
	chrome.storage.sync.set({runnable: false}, function() {});
}

// if on cart page, go to checkout
if (url_split[url_split.length-1] == "cart") {
	chrome.storage.sync.set({runnable: false}, function() {});
	document.getElementById("checkout").click();
}

// if on checkout page, autofill data
// if (/^([a-zA-Z0-9]{32})$/.test(url_split[url_split.length-1])) {
if (url_split[url_split.length-2] == "checkouts") {
  	chrome.storage.sync.get({
  		region: '',

    	firstname: '',
    	lastname: '',
    	email: '',
    	phone: '',
    	address: '',
    	city: '',
    	zip: '',
    	country: '',

    	card_no: '',
    	card_name: '',
    	expiry: '',
    	cvv: '',
    	autoco: ''
	  }, 
	  function(items) {
	  	document.getElementById("checkout_email").value = items.email;
	    document.getElementById('checkout_shipping_address_first_name').value = items.firstname;
	    document.getElementById('checkout_shipping_address_last_name').value = items.lastname;
	    document.getElementById("checkout_shipping_address_address1").value = items.address;
	    document.getElementById("checkout_shipping_address_city").value = items.city;
	    document.getElementById("checkout_shipping_address_country").value = items.country;
	    document.getElementById("checkout_shipping_address_zip").value = items.zip;
	    document.getElementById("checkout_shipping_address_phone").value = items.phone;
	    document.getElementsByName("button")[0].click();
	});
}

if (window.location.href.indexOf("step=shipping_method") != -1) {
	document.getElementsByName("button")[0].click();
}

if (window.location.href.indexOf("step=payment_method") != -1) {
	chrome.storage.sync.get({
    	card_no: '',
    	card_name: '',
    	expiry: '',
    	cvv: '',
		autoco: ''
	}, 
	function(items) {
		setTimeout(function() {
			document.getElementById("number").focus();
			document.getElementById("number").value = items.card_no;

			document.getElementById("name").focus();
			document.getElementById("name").value = items.card_name;

			document.getElementById("expiry").focus();
			document.getElementById("expiry").value = items.expiry;

			document.getElementById("verification_value").focus();
			document.getElementById("verification_value").value = items.cvv;
		}, 1000);

		if (items.autoco) {
			setTimeout(function(){document.getElementsByName("button")[0].click();}, 100);
		}
	});
}
console.log((performance.now() - t0).toFixed(2) + " ms");