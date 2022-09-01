## to do

- create and set userDetails state, context provider.

## LYRICS

-

## songs

- napster
- go thru pages using offset, limit, totalcount
  https://support.smartbear.com/qacomplete/docs/developer/api/rest/api/reference/paging.html
  The max limit supported is 200. If an invalid limit , a negative limit or a limit higher than 200 is passed, a 400 error will be returned

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

https://stackoverflow.com/questions/39149846/why-am-i-seeing-a-404-not-found-error-failed-to-load-favicon-ico-when-not-usin

## design of audio player

https://blog.shahednasser.com/how-to-style-an-audio-element/
https://stackoverflow.com/questions/4126708/is-it-possible-to-style-html5-audio-tag

## icons

search
https://cdn-icons-png.flaticon.com/512/61/61088.png

##

https://stackoverflow.com/questions/69870116/how-can-i-keep-song-playing-in-reactjs-even-if-i-go-to-another-pageof-same-webs

## drop down

https://www.w3schools.com/css/css_dropdowns.asp
!!!!! do such that they click anywhere can close menu

## search input w icon

https://www.w3schools.com/css/css_form.asp

## local storage

https://blog.logrocket.com/using-localstorage-react-hooks/

## update state immediately

https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately

## react toastify

replace error alert
https://www.npmjs.com/package/react-toastify

## react component transition

https://blog.openreplay.com/how-to-add-animations-with-react-transition-group

## duration, get playback, change seconds to ##:##

## audio player
slider - https://www.w3schools.com/jsref/dom_obj_range.asp
design icons - https://stackoverflow.com/questions/56636280/how-to-style-react-icons
https://github.com/react-icons/react-icons
everything - https://www.youtube.com/watch?v=sqpg1qzJCGQ 
- skip to next song...

## extra ft 
- music video of the day? youtube api

## issues
1) ASK: how to check if url gives 404 error, wanna remove from the search result
2) why in fetching search results, the console.log object is inaccurate
3)   // updating progressBar everytime current time of audio changes
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration); //get rid of decimals (round down)
    setDuration(seconds);
    progressBar.current.max = seconds; //states that the max of progress bar is .. seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

4) do i rlly need playlist state?
5) change buttons to just pics...
7) play/pause button between in page and in player && when a song is playing and that same song is pressed
on a page, it wont restart, just continue. but the array is changed
8) can tgo too fast, need to load


## future possible implementations
- if (nowPlaying?.array?.[nowPlaying.index]?.url === audioPlayer.current.currentSrc)..
if next/prev song is same/duplicate will need to skip twice....
- search based on diff categories (dropdown choice)


## solved issues
1) https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro

2) https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

3) https://bobbyhadz.com/blog/react-clear-input-after-submit 
4) shuffle: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj 