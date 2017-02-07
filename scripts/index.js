//Hello there. If you are reading this, please give me money.

//declarations!
const noteValues = {
	"--": -1,
	"C": 0,
	"C#/Db": 1,
	"D": 2,
	"D#/Eb": 3,
	"E": 4,
	"F": 5,
	"F#/Gb": 6,
	"G": 7,
	"G#/Ab": 8,
	"A": 9,
	"A#/Bb": 10,
	"B": 11
};


/**********
	Youtube Video controls
	            **********/
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


/**********
	Pitch Shifter Controls
	            **********/

function __log(e, data) {
	var toAppend = "\n" + e + " " + (data || '');
	$('#log').append(toAppend);
}

var audio_context;
var recorder;

function startUserMedia(stream) {
	var input = audio_context.createMediaStreamSource(stream);
	__log('Media stream created.');
	recorder = new Recorder(input);
	__log('Recorder initialized.');
}

/**********
	The rest of it
	            **********/
function createTranspositionChart(noteValues) {
	// pulling the "data" from the const obj, declared at the top
	var notes = Object.keys(noteValues);	//pulls just the keys from the obj
	notes = notes.slice(1);   //cutting off the first index of the array (which is --)
	//console.log(notes);     // this should output:
	//["C","C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
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

function calcSemitone(origKey, desKey) {
	// var origKey = noteValues[$('#origKey option:selected')]; 
	// var desKey = noteValues[$('#desKey option:selected')];
	if (origKey === "-1" || desKey === "-1") {
		$('#calcError').show();
		$('#calcResult').val("");
	} else {
		console.log("calcSemitone origKey: " + origKey);
		console.log("calcSemitone desKey: " + desKey);
		$('#calcError').hide();
		var res = desKey - origKey;
		if (res < -6)
			res += 12;
		else if (res > 6)
			res -= 12;
		$('#calcResult').val(res);
	}
}

//for populating the dropdowns of the calculator
function populateDropdowns() {
	var options = $('<option>--</option>			\
					<option>C</option>				\
					<option>C#/Eb</option>			\
					<option>D</option>				\
					<option>D#/Eb</option>			\
					<option>E</option>				\
					<option>F</option>				\
					<option>F#/Gb</option>			\
					<option>G</option>				\
					<option>G#/Ab</option>			\
					<option>A</option>				\
					<option>A#/Bb</option>			\
					<option>B</option>');
	$('#origKey').closest('select').append(options.clone());
	$('#desKey').closest('select').append(options.clone());
}

$(function() { //document.ready
	
	//this doesn't work
	$('#calculatorButton').on('click', function() {
		var orig = $('#origKey option:selected');
		console.log('onclick orig: ' + orig);
		var des = $('#desKey option:selected');
		console.log('onclick des: ' + des);
		calcSemitone(noteValues[orig], noteValues[des]);
	});

	createTranspositionChart(noteValues);	//noteValues is declared at the top
	showHideChart();
	populateDropdowns();
	$('#calcError').hide();
});
