/*Form Listener*/
var form = document.getElementById('myForm');
form.addEventListener('submit', saveBookmark);

function saveBookmark(e){
	e.preventDefault();
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	var bookmark = {
		name : siteName,
		url : siteUrl
	}

	if(!validate(siteName, siteUrl)){
		return false;
	}

	if(localStorage.getItem('bookmarks')===null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		clear();
		getBookmarks();

	}
	else{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		clear();
		getBookmarks();
	}
}

function getBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	if(bookmarks){
		var bookmarkResults = document.getElementById('bookmarkResults');

		bookmarkResults.innerHTML = "";

		for(var i=0; i<bookmarks.length;i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
			bookmarkResults.innerHTML+= '<div class="well">'+
										'<h3>'+name+'</hr>'+
										'	<a class="btn btn-default" target="_blank" href="'+url+'">VISIT</a>'+
										'	<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">DELETE</a>'+
										'</div>';
		}
	}
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0; i<bookmarks.length;i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	getBookmarks();
}

function clear(){
	document.getElementById('siteName').value = "";
	document.getElementById('siteUrl').value = "";
}

function validate(siteName, siteUrl){

	if(!siteName || !siteUrl){
		alert('Please fill the form');
		return false;
	}

	var exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var pattern = new RegExp(exp);

	if(!siteUrl.match(pattern)){
		alert('Please enter a valid URL');
		return false;
	}

	return true;

}