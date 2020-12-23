let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

dir="music/";
playlist = ["Krabby Step","Baby Shark - V.A","positions - Ariana Grande","I Need Your Love - Madilyn Bailey, Jake Coco","Cartoon - On & On"];
title = ["Krabby Step","Baby Shark","positions","I Need Your Love","Cartoon - On & On"];
artists = ["Swae Lee, Tyga, Lil Mosey","V.A","Ariana Grande","Madilyn Bailey","Daniel Levi"];
poster = ["cover1.jpg","Baby-Shark.jpg","220px-Positions_(single).png","12116a37b3f91f9a2e158966de3fe5dd.jpg","0.813761102576299.png"];

ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext = ".ogg";
}

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

playlist_index = 0;

audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(){ seeking = false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

function fetchMusicDetails(){
    $("#playpausebtn img").attr("src", "pause-red.png");
    $("#bgImage").attr("src",poster[playlist_index]);
    $("#images").attr("src",poster[playlist_index]);

    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
}

function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src", "pause-red.png");
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src", "play-red.png");
    }
}
function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}
function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
}
function mute(){
    if(audio.muted){
        audio.muted = false;
        $("#mutebtn img").attr("src","speaker.png");
    }else{
        audio.muted = true;
        $("#mutebtn img").attr("src","mute.png");
    }
}
function seek(event){
    if(audio.duration == 0){
        null
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetleft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}
function setvolume(){
    audio.volume = volumeslider.value / 100;
}
function seektimeupdate(){
    if(audio.duration){
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.currentTime / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0" + cursecs}
        if(dursecs < 10){ dursecs = "0" + dursecs}
        if(curmins < 10){ curmins = "0" + curmins}
        if(dursecs < 10){ dursecs = "0" + dursecs}
        curtimetext.innerHTML = curmins+":"+curmins;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML = "00"+":"+"00";
        durtimetext.innerHTML = "00"+":"+"00";
    }
}
function switchTrack(){
    if(playlist_index == (playlist.length - 1)){
        playlist_index = 0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}
function getRandomNumber(min,max){
    let step1 = max-min+1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function random(){
    let 
}