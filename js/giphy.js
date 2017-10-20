$(document).ready(function() {
	// ajax request steps -> $.get("url", callback function)
	const apikey = 'bbj3km0ZEM6Ed9udFgpjnzIao3hYtkCy';
	let xhrTrending = `http://api.giphy.com/v1/gifs/trending?api_key=${apikey}`;
	let searchTerm = '';
	let buttonText = '';
	let offset = 0;
	// sample url = http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

	function displayPhotos(data) {
		var divID = '';
		$.each(data.data, function(i, photo) {
			var photoHTML = "<div class='tile is-child'>";
			photoHTML += '<a href="' + photo.url + '" class="image" target="_blank">';
			photoHTML += '<img src="' + photo.images.fixed_width.url + '"></a>';
			photoHTML += '</div>';
			switch (i % 4) {
				case 0:
					divID = '#col_0';
					break;
				case 1:
					divID = '#col_1';
					break;
				case 2:
					divID = '#col_2';
					break;
				case 3:
					divID = '#col_3';
					break;
			}
			$(divID).append(photoHTML);
		});
	}

	$.getJSON(xhrTrending, displayPhotos);

	function xhrSearchTerm(searchTerm) {
		return `http://api.giphy.com/v1/gifs/search?q=${searchTerm.toLowerCase()}&api_key=${apikey}`;
	}
	function clearCache() {
		offset = 0;
		$('#col_0, #col_1, #col_2, #col_3').empty();
	}

	// get photos from search results
	$('.giphy_search').submit(function(event) {
		event.preventDefault();
		clearCache();
		// get the text of the input tag
		searchTerm = $('.input').val();
		if (searchTerm != '') {
			// make ajax request
			$.get(xhrSearchTerm(searchTerm), displayPhotos);
		} else {
			$.getJSON(xhrTrending, displayPhotos);
		}
		return false;
	});

	// load more gifs
	$('.see_more').on('click', function(event) {
		event.preventDefault();
		let xhrTempSearchTerm = '';
		searchTerm != ''
			? (xhrTempSearchTerm = `${xhrSearchTerm(
					searchTerm
				)}&offset=${(offset += 1)}`)
			: (xhrTempSearchTerm = `${xhrTrending}&offset=${(offset += 1)}`);
		$.get(xhrTempSearchTerm, displayPhotos);
	});
});
