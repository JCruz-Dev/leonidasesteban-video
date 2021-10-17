const play = document.getElementById('play');
const pause = document.getElementById('pause');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const video =  document.getElementById('video');
const videoRange = document.getElementById('video-range');
const videoDurationElement = document.getElementById('video-duration');
let videoProgressTime = document.getElementById('video-progress-time')

document.addEventListener('DOMContentLoaded', () => {
    pause.hidden =  true;
    backward.hidden = true;
    forward.hidden = true;
})
function formatTime(value){
    const videoSeconds = parseInt(value, 10);
    let minutes =  Math.floor(videoSeconds / 60);
    let seconds =  Math.floor(videoSeconds % 60);
    if(minutes < 10) {
        minutes =  `0${minutes}`
    }
    if(seconds < 10) {
        seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
}
function videoEnded(){
    if(video.ended){
        pause.hidden =  true;
        backward.hidden = true;
        forward.hidden = true;
        play.hidden = false
    }
}
video.addEventListener('loadedmetadata', () => {
    videoRange.max = Math.floor(video.duration);
    videoDurationElement.textContent = formatTime(video.duration)
})
video.addEventListener('timeupdate', () => {
    videoRange.value = Math.floor(video.currentTime)
    videoProgressTime.innerHTML = formatTime(Math.floor(video.currentTime))
    videoEnded()
})
videoRange.addEventListener('input', () => {
    video.currentTime = videoRange.value 
})
play.addEventListener('click', () => {
    pause.hidden = false
    play.hidden =  true
    backward.hidden = false
    forward.hidden = false
    video.play();
} )
pause.addEventListener('click', () => {
    play.hidden = false
    pause.hidden =  true
    backward.hidden = true
    forward.hidden = true
    video.pause();
} )
forward.addEventListener('click', () => {
    video.currentTime = video.currentTime + 10;
    videoEnded();
})
backward.addEventListener('click', () => {
    video.currentTime = video.currentTime - 10;
    videoEnded();
})