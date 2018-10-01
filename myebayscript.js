var divs = document.querySelectorAll('.sresult, .s-item');
var globaldata = [];



function hideListing() {
	//Need to add functionality for ads and .sresult type searches
	//Need to stop it from highlighting on double click
	listingId = getListingId(this.parentElement);
	console.log(this);
	if(globaldata.includes(listingId)){

		showContents(this.parentElement);
		removeFromGlobal(listingId);
	}else{

		hideContents(this.parentElement);
		globaldata.push(listingId);
	}
	chrome.storage.sync.set({'blocked': globaldata});
}

function removeFromGlobal(id){
	var index = globaldata.indexOf(id);
	globaldata.splice(index, 1);
}

function hideContents(element){
	element.children[0].classList.replace("cbb", "cbb-pressed");
	if(element.hasAttribute("listingid")){
		console.log(element + " " + element.children);
		for(i = 1; i < element.children.length;i++){
			element.children[i].style.display = "none";
		}
	}else{
		element.lastElementChild.style.display = "none";

	}

}
	
function showContents(element){
	element.children[0].classList.replace("cbb-pressed", "cbb");
	if(element.hasAttribute("listingid")){
		console.log(element + " " + element.children);
		for(i = 1; i < element.children.length;i++){
			element.children[i].style.display = "";
		}
	}else{
		element.lastElementChild.style.display = "";

	}
}

function getIdFromURL(url){
	
	var a = 1 + url.lastIndexOf("/");
	var b = url.lastIndexOf("?");
	var id = url.slice(a, a+12);

	return id;
}

function getListingId(element){
	if(element.hasAttribute("listingid")){
		return element.getAttribute("listingid");
	}else{
		return getIdFromURL(element.querySelector("a").href);
	}
}

function updatePage(data){
	globaldata = data.blocked;

	for (var i = 0; i < divs.length; i++){

		//Making the button to add
		var newHideButton = document.createElement("button-div");
		newHideButton.className = "cbb";
		newHideButton.addEventListener("click", hideListing, false);

		//Inserting it before all divs[i]
		divs[i].insertBefore(newHideButton, divs[i].childNodes[0]);


		if(globaldata.includes(getListingId(divs[i]))){
			hideContents(divs[i]);
		}
	}
}


//var test = 8496;
chrome.storage.sync.get(null, function(data) {updatePage(data)});
//chrome.storage.sync.set({'values': test}, updatePage(data));


