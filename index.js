//--创建页面监听，等待微信端页面加载完毕 触发音频播放
document.addEventListener('DOMContentLoaded', function() {
    play();
});
document.addEventListener("WeixinJSBridgeReady", function() {
    play();
});
//--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
document.addEventListener('touchstart', function() {
    play();
}, { capture: true, once: true });

var rot = 0;
var timer;
window.onload = function() {
    //开始播放时，改变图标以及开始旋转封面
    document.getElementById('bgm').onplaying = function() {
        timer = setInterval(function() {
            document.getElementById("songImg").style.transform = "rotatez(" + rot + "deg)";
            rot += 0.5;
        }, 50)
        document.getElementById("play").src = "images/pause.svg";
    }
    //暂停播放时，改变图标以及停止旋转封面
    document.getElementById('bgm').onpause = function() {
        clearInterval(timer);
        document.getElementById("play").src = "images/play.svg";
    }
    //给播放按钮添加点击事件
    document.getElementById("play").onclick = function() {
        var isPaused = document.getElementById("bgm").paused;
        if (!isPaused) {
            pause();
        } else {
            play();
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
};

function play() {
    var audio = document.getElementById('bgm');
    if (!audio.paused) {
        return;
    }
    audio.play();
}

function pause() {
    var audio = document.getElementById('bgm');
    if (audio.paused) {
        return;
    }
    audio.pause();
}