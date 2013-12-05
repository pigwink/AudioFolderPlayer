<!DOCTYPE html>     
<html>     
    <head>      
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="audio_player.css">
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>  
	<link rel="stylesheet" href="fonts/font-awesome-4.0.3/css/font-awesome.min.css">
</head>     

<body>     

<div id="player">
	<div id="playlist" value="3">
		<?php
			/* READ MP3 FILES FROM FOLDER */
			$songs = array();
			$i=0;
			foreach (glob("songs/*.mp3") as $filename) {
			$i++;
			$filename_cut = substr ( $filename , strlen("songs/"));
			$noext = substr ( $filename_cut , 0, -4);
				echo('
				<audio id="song'.$i.'" src="songs/'.$filename_cut.'" name="'.$noext.'" type="audio/mpeg"></audio>
				');
			}
		?>
	</div> <!-- /#playlist -->
	<div id="display">
		<div id="timer" class="display_text">00:00</div>
		<div id="title" class="display_text">- - - - - - - - - -</div>
		<div id="vol_container" class="display_text">
			<div id="vol_on" class="vol_icon"><i class="fa fa-volume-up"></i></div>
			<div id="vol_off" class="vol_icon"><i class="fa fa-volume-off"></i></div>
			<div id="vol_bar_container">
				<div id="vol_bar"></div>
			</div>
		</div><!-- /#vol_container -->
	</div> <!-- /#display -->
	<div id	="progressbar_container"><div id="progressbar_buffer"></div><div id="progressbar"></div></div>
	<div id="controls">
		<div class="ctrl_btn" id="prev"><i class="fa fa-fast-backward"></i></div>
		<div class="ctrl_btn" id="fbwd"><i class="fa fa-backward"></i></div>
		<div class="ctrl_btn" id="play"><i class="fa fa-play"></i></div>
		<div class="ctrl_btn" id="pause" style="display:none;"><i class="fa fa-pause"></i></div>
		<div class="ctrl_btn" id="stop"><i class="fa fa-stop"></i></div>
		<div class="ctrl_btn" id="ffwd"><i class="fa fa-forward"></i></div>
		<div class="ctrl_btn" id="next"><i class="fa fa-fast-forward"></i></div>
		<span class="stretch"></span>
	</div><!-- /#controls --> 
</div> <!-- /#player -->

<script language="javascript" type="text/javascript" src="audio_player.js"></script>	 
</body>    
</html> 