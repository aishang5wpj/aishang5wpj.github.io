document.addEventListener('DOMContentLoaded', function() {
    //给播放按钮添加点击事件
    document.getElementById("play").onclick = function() {
        var isPaused = document.getElementById("bgm").paused;
        if (isPaused) {
            play();
        } else {
            pause();
        }
    };
    document.getElementById("songImgContainer").onclick = function() {
        document.getElementById("radio").style.visibility = "hidden";
        document.getElementById("lyric").style.visibility = "visible";
    };
    document.getElementById("lyric").onclick = function() {
        document.getElementById("radio").style.visibility = "visible";
        document.getElementById("lyric").style.visibility = "hidden";
    }
    //--创建页面监听，等待微信端页面加载完毕 触发音频播放
    document.addEventListener("WeixinJSBridgeReady", function() {
        play();
    });
    //开始播放
    play();
});
//--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
document.addEventListener('touchstart', function() {
    play();
}, { capture: true, once: true });

var rot = 0;
var timer;

//开始播放时，改变图标以及开始旋转封面
function play() {
    var audio = document.getElementById('bgm');
    if (!audio.paused) {
        return;
    }
    audio.play();
    timer = setInterval(function() {
        document.getElementById("songImg").style.transform = "rotatez(" + rot + "deg)";
        rot += 0.5;
    }, 50)
    document.getElementById("play").src = "images/pause.svg";
}

//暂停播放时，改变图标以及停止旋转封面
function pause() {
    var audio = document.getElementById('bgm');
    if (audio.paused) {
        return;
    }
    audio.pause();
    clearInterval(timer);
    document.getElementById("play").src = "images/play.svg";
}