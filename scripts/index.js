
	//downloads the necessary libraries to embed a youtube video.
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	//creates the player
	var player;
    function onYouTubeIframeAPIReady() {
    	// player = new YT.Player('player', {
    	// 	height: '390',
    	// 	width: '640',
    	// 	videoId: 'M7lc1UVf-VE',
    	// 	events: {
    	// 		'onReady': onPlayerReady,
    	// 		'onStateChange': onPlayerStateChange
    	// 	}
    	// });
    }

	//The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		event.target.playVideo();
	}

	function loadVideo() {
		var vidURL = $('#linkbox').val();
		loadVideobyUrl(vidURL);
	}

	function loadVideobyUrl(vidURL) {
		var vidURL = vidURL + "?version=3";
		player = new YT.player('player', {
			height: '390',
			width: '640',
			events: {
				'onReady' : pauseVideo
			}
		});
		
	}

    function pauseVideo(){
    	player.pauseVideo();
    }

	function createTranspositionChart() {
		var notes = ["C","C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
		var start = 24;
		var retVal  = "<table id=\"chart\">";
		while (start !== -1) {
			
			//first column
			retVal += "<tr><td><b>";
			var firstCol = start - 12;
			if (firstCol > 0)
				retVal += "+";
			retVal += firstCol + "</b></td>";

			//all the following columns
			for (var i = 0; i < notes.length; i++) {
				retVal += "<td>";
				retVal += notes[(i + start) % notes.length];
				retVal += "</td>";
			}

			retVal += "</tr>";
			start--;
		}
		retVal += "</table>";
		$('#transpositionChart').html(retVal);
	}

	function showHideChart() {
		$('#transpositionChart').toggle();
	}

	function calcSemitone() {
		var origKey = $('#origKey option:selected').val(); 
		var desKey = $('#desKey option:selected').val();
		if (origKey === "-1" || desKey === "-1") {
			$('#calcError').show();
			$('#calcResult').val("");
		} else {
			$('#calcError').hide();
			var res = desKey - origKey;
			if (res < -6)
				res += 12;
			else if (res > 6)
				res -= 12;
			$('#calcResult').val(res);
		}
	}


	$(function() { //document.ready
		createTranspositionChart();
		showHideChart();
		$('#calcError').hide();
	});
