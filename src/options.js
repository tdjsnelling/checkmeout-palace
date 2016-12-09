// Saves options to chrome.storage
function save_options() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
  var state = document.getElementById("state").value;
  var country = document.getElementById("country").value;

  var card_no = document.getElementById("card_no").value;
  var card_name = document.getElementById("card_name").value;
  var expiry = document.getElementById("expiry").value;
  var cvv = document.getElementById("cvv").value;
  var size = document.getElementById("size").value;
  var autoco = document.getElementById("autoco").checked;
  
  var kw_enabled = document.getElementById("kw_enabled").checked;
  var category = document.getElementById("category").value;
  var keywords = document.getElementById("keywords").value;
  var colour = document.getElementById("colour").value;
  //var tc_accepted = document.getElementById("tc_accepted").checked;

  chrome.storage.sync.set({
	name: name,
	email: email,
	phone: phone,
	address: address,
	city: city,
	zip: zip,
	state: state,
	country: country,

	card_no: card_no,
	card_name: card_name,
	expiry: expiry,
	cvv: cvv,
	size: size,
	autoco: autoco,

	kw_enabled: kw_enabled,
	category: category,
	keywords: keywords,
	colour: colour,
	//tc_accepted: tc_accepted
  }, 
  function() {
	// Update status to let user know options were saved.
	var status = document.getElementById('status');
	status.textContent = 'Options saved.';
	setTimeout(function() {
	  status.textContent = '';
	}, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
	name: '',
	email: '',
	phone: '',
	address: '',
	city: '',
	zip: '',
	state: '',
	country: '',

	card_no: '',
	card_name: '',
	expiry: '',
	cvv: '',
	size: '',
	autoco: '',

	kw_enabled: '',
	category: '',
	keywords: '',
	colour: '',
	//tc_accepted: ''
  }, 
  function(items) {
	document.getElementById('name').value = items.name;
	document.getElementById("email").value = items.email;
	document.getElementById("phone").value = items.phone;
	document.getElementById("address").value = items.address;
	document.getElementById("city").value = items.city;
	document.getElementById("zip").value = items.zip;
	document.getElementById("state").value = items.state;
	document.getElementById("country").value = items.country;

	document.getElementById("card_no").value = items.card_no;
	document.getElementById("card_name").value = items.card_name;
	document.getElementById("expiry").value = items.expiry;
	document.getElementById("cvv").value = items.cvv;
	document.getElementById("size").value = items.size;
	document.getElementById("autoco").checked = items.autoco;

	document.getElementById("kw_enabled").checked = items.kw_enabled;
	document.getElementById("category").value = items.category;
	document.getElementById("keywords").value = items.keywords;
	document.getElementById("colour").value = items.colour;
	//document.getElementById("tc_accepted").checked = items.tc_accepted;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);