$(document).ready(function() {
	// 1- Get trending photos when html has finished loading
	var xhrTrending =
		'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&tag=59b72bd8344c42ec8faea4fd13e6318d&limit=49';
	var xhrSearch = '';

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

	// 2- Search what user inputs
	$('.giphy_search').submit(function(e) {
		e.preventDefault();
		/* Act on the event */
		$('#col_0, #col_1, #col_2, #col_3').empty();
		if ($('input').val() != '') {
			xhrSearch =
				'http://api.giphy.com/v1/gifs/search?q=' +
				encodeURI($('input').val()) +
				'&api_key=dc6zaTOxFJmzC&tag=59b72bd8344c42ec8faea4fd13e6318d&limit=49';
			$.getJSON(xhrSearch, displayPhotos);
		} else {
			$.getJSON(xhrTrending, displayPhotos);
		}
		return false;
	});

	// 3- When user clicks see more button, load more photos...
	$('.see_more').click(function() {
		/* Act on the event */
		if ($('input').val() == '') {
			// User still in trending page
			$.getJSON(xhrTrending, displayPhotos);
		} else {
			// User has searched for something
			$.getJSON(xhrSearch, displayPhotos);
		}
	});
});
