//Wait for the DOM to load
$(window).load(function()
{
	var $bodyElement = $('body');

	if(InitialiseDomScripts())
	{
		console.log('Initialised Dom Scripts Successfully');
	}
	else
	{
		console.log('Failed to Initialise Dom Scripts');
	}

});


//Wait for the Videos to load To add Event listeners
$(document).ready(function()
{
	if(InitialiseDocReadyScripts())
	{
		console.log('Initialised Document Ready Scripts Successfully');
	}
	else
	{
		console.log('Failed to Initialise Document Ready Scripts');
	}
});



//Initialise Dom Scripts here
this.InitialiseDomScripts = function()
{
	AddDomReadyListeners();
	return true; //return true for Initialisation
}

this.InitialiseDocReadyScripts = function()
{
	AddDocReadyListeners();
	OnResize();

	return true;
}

this.AddDomReadyListeners = function()
{
	//Add a window listener, see when the window is resized
	$(window).resize(OnResize);
}

this.AddDocReadyListeners = function()
{
	//Add a listeners to videos to see when the meta data has loaded
	$('video').bind("loadeddata",function(_VideoEvent)
	{
		OnLoadedVideoData(_VideoEvent);
	});
}

this.OnLoadedVideoData = function(_VideoEvent)
{
	var loadedVideoElement = _VideoEvent.target;
	if($(loadedVideoElement).hasClass('StretchtoFit'))
	{
		ResizeVideo(loadedVideoElement);
	}

}

this.OnResize = function()
{
	//Loop through all of the videos that are marked as stretch to fit
	$('.StretchtoFit').each(function()
	{
		var CurrentChild = this;
		ResizeVideo(CurrentChild);
	});
}

this.ResizeVideo = function(_VideoElement)
{
	$VideoElement = $(_VideoElement); //Cache Jquery reference of this
	var iOriginalVideoHeight =  _VideoElement.videoHeight;
	var iCurrentVideoHeight = $VideoElement.height();
	var iVideoContainerHeight = $VideoElement.parent().height();
	var iCurrentScale = iOriginalVideoHeight/iCurrentVideoHeight;
	var iScaleY = (iVideoContainerHeight / iOriginalVideoHeight)*iCurrentScale;


	//Important to note: Set the origin to the top left corner (0% 0%), or else the position of the video goes astray
	 $VideoElement.css({
	 	"transform-origin": "0% 0%",
		"transform":"scaleY(" + iScaleY +")",
		"-ms-transform-origin" : "0% 0% ", /* IE 9 */
		"-ms-transform":"scaleY(" + iScaleY +")", /* IE 9 */
		"-moz-transform-origin" : "0% 0%", /* Firefox */
		"-moz-transform":"scaleY(" + iScaleY +")", /* Firefox */
		"-webkit-transform-origin": "0% 0%", /* Safari and Chrome */
		"-webkit-transform":"scaleY(" + iScaleY +")", /* Safari and Chrome */
		"-o-transform-origin":"0% 0%", /* Opera */
		"-o-transform":"scaleY(" + iScaleY +")" /* Opera */
	 }); 
}