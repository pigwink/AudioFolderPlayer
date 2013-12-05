/*
	Audio Folder Player
	by Freakk
	ffr3akk@gmail.com
	www.freakk.net
*/

jQuery(document).ready(function($) {

var index = 0;
var max_songs = $('#playlist').attr('value');
var mute = false;
var vol = .6; /* css #vol_bar width should also be set at 60% */
var vol_bak = 1;
var countdown = false;
var mins = 0;
var secs = 0;
var loaded = 0;
var duration = 0;
var posirion = 0;

$('#title').html($('#song'+(index+1)).attr('name'));
/* CONTROL FUNCTIONS */
var play = function(){
    $('#playlist audio').get(index).play();
	$('#play').hide();
	$('#pause').show();
	$('#title').html($('#song'+(index+1)).attr('name'));
};
var pause = function(){
    $('#playlist audio').get(index).pause();
	$('#pause').hide();
	$('#play').show();
};
var stop = function(){
    $('#playlist audio').get(index).pause();
	$('#playlist audio').get(index).currentTime = 0;
	$('#pause').hide();
	$('#play').show();
};
var next = function(){
	//stop current song
    $('#playlist audio').get(index).pause();
	$('#playlist audio').get(index).currentTime = 0;  
   index++;
   if(index >= max_songs) index = 0;
   $('#playlist audio').get(index).play();
   $('#play').hide();
   $('#pause').show();
   $('#title').html($('#song'+(index+1)).attr('name'));
};
var prev = function(){
	//stop current song
    $('#playlist audio').get(index).pause();
	$('#playlist audio').get(index).currentTime = 0;   
   index--;
   if(index < 0) index = max_songs-1;
   $('#playlist audio').get(index).play();
   $('#play').hide();
   $('#pause').show();
   $('#title').html($('#song'+(index+1)).attr('name'));
};

/* AUTOPLAY */
if( $('#player').attr('data-autoplay')=="1") play();

/* CONTROL BUTTONS */
$('#play').click(function()  { play(); });
$('#pause').click(function() { pause();});
$('#stop').click(function()  { stop(); });
$('#ffwd').click(function() {
    $('#playlist audio').get(index).currentTime += .5;
});
$('#fbwd').click(function() {
    $('#playlist audio').get(index).currentTime -= .5;
});
$('#next').click(function() { next(); });
$('#prev').click(function() { prev(); });
$('#timer').click(function() { 
	if(countdown) countdown=false;
	else countdown=true;
});

/* BIND PROCESS */
$("audio").bind('timeupdate', function(){
	duration = $('#playlist audio').get(index).duration;
	position = $('#playlist audio').get(index).currentTime;
	loaded = $('#playlist audio').get(index).buffered.end($('#playlist audio').get(index).buffered.length-1);
	if(position >= duration){ next(); };

	if(countdown==false){
		mins = parseInt(position / 60);
		secs = parseInt(position - mins * 60);
	} else {
		eta = duration - position;
		mins = parseInt( eta / 60);
		secs = parseInt( eta - mins * 60);
	}
	// double digit
	if(mins<10) mins = "0"+mins.toString();
	if(secs<10) secs = "0"+secs.toString();
	var widthOfBufferBar = Math.floor( 100 / duration * loaded);
    var widthOfProgressBar = Math.floor( 100 / duration * position);
    $('#progressbar').css({
        'width':widthOfProgressBar+'%'
    });
	$('#progressbar_buffer').css({
        'width':widthOfBufferBar+'%'
    });
	$('#timer').html( mins+":"+secs);
	$('#playlist audio').get(index).volume = vol;
});

/* PROGRESS BAR */
$('#progressbar_container').click(function(e) {
	var offset = $(this).offset(); 
	pos =(100*(e.clientX - offset.left)/($('#progressbar_container').width() ));
	$('#playlist audio').get(index).currentTime = $('#playlist audio').get(index).duration*pos/100;  
});

/* MUTE */
$('#vol_on').click(function() {
	$('#vol_off').show();
	$(this).hide();
	vol_bak = vol;
	vol = 0;
	mute = true;
});
$('#vol_off').click(function() {
	$('#vol_on').show();
	$(this).hide();
	vol=vol_bak;
	mute = false;
});
/* VOLUME CONTROL */
$('#vol_bar_container').click(function(e) {
	var offset = $(this).offset(); 
	pos = parseInt(100*(e.clientX - offset.left)/($('#vol_bar_container').width() ));
	width = $('#vol_bar_container').attr('width');
	$('#vol_bar').css({'width':pos+'%'});
	if(mute){ vol_bak = pos/100; }
	else {vol = pos/100 };
});

/* $(document).keypress(function(e) {
    if(e.which == 13) {
        alert("loaded "+parseInt(loaded)+"\nof "+parseInt(duration));
    }
}); */

});
	