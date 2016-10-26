window.onresize=resize;
window.onload = function () {
    resize();
    $("#music").trigger("click");
};
var left=0;
function resize(){
    var fontSize=document.body.offsetWidth/16+"px";
    document.getElementsByTagName("html")[0].style.fontSize=fontSize;

    left=(document.body.offsetWidth-document.body.offsetHeight*375/667)/2+"px";
    $(".page-inner").css({"right":left,"left":left});
}
var id=document.getElementById("wrapper");
touches(id,"swipetop",swipeUp);
touches(id,"swipedown",swipeDown);
 function touches(obj,direction,fun){  
    //obj:ID对象  
    //direction:swipeleft,swiperight,swipetop,swipedown,singleTap,touchstart,touchmove,touchend  
    //          划左，    划右，     划上，   划下，    点击，    开始触摸， 触摸移动， 触摸结束  
    //fun:回调函数  
    var defaults = {x: 5,y: 5,ox:0,oy:0,nx:0,ny:0};  
    direction=direction.toLowerCase();  
    //配置：划的范围在5X5像素内当点击处理  
    obj.addEventListener("touchstart",function() {  
        defaults.ox = event.targetTouches[0].pageX;  
        defaults.oy = event.targetTouches[0].pageY;  
        defaults.nx = defaults.ox;  
        defaults.ny = defaults.oy;  
        if(direction.indexOf("touchstart")!=-1)fun();  
    }, false);  
    obj.addEventListener("touchmove",function() {  
        event.preventDefault();  
        defaults.nx = event.targetTouches[0].pageX;  
        defaults.ny = event.targetTouches[0].pageY;  
        if(direction.indexOf("touchmove")!=-1)fun();  
    }, false);  
    obj.addEventListener("touchend",function() {  
        var changeY = defaults.oy - defaults.ny;  
        var changeX = defaults.ox - defaults.nx;  
        if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>defaults.y){  
            //左右事件  
            if(changeX > 0) {  
                if(direction.indexOf("swipeleft")!=-1)fun();  
            }else{  
                if(direction.indexOf("swiperight")!=-1)fun();  
            }  
        }else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>defaults.x){  
            //上下事件  
            if(changeY > 0) {  
                if(direction.indexOf("swipetop")!=-1)fun();  
            }else{  
                if(direction.indexOf("swipedown")!=-1)fun();  
            }  
        }else{  
            //点击事件  
            if(direction.indexOf("singleTap")!=-1)fun();  
        }  
        if(direction.indexOf("touchend")!=-1)fun();  
    }, false);  
}  
function swipeUp(){
    isChange=true;
    var currentPage=$(".current")[0];
    var pageIndex=1*$(currentPage).attr("id").split("-")[1];
    if(pageIndex==5){
        pageIndex=0;
        $("#slide-progress .current").removeClass("current");
        $("#slide-progress li").first().addClass("current");
    }else{
        ++pageIndex;
        $("#slide-progress .current").removeClass("current").next().addClass("current");
    }
    var nextPage=$("#page-"+(pageIndex));
    $("#page-list .current").addClass("pt-page-moveOutUp");
    nextPage.addClass("pt-page-moveInDown").addClass("pt-page-onTop").addClass("current");
    setTimeout(function(){
        $(currentPage).removeClass("current").removeClass("pt-page-moveOutUp");
        nextPage.removeClass("pt-page-moveInDown").removeClass("pt-page-onTop");
        isChange=false;
        initialize(pageIndex);
    },800);
}
function swipeDown(){
    isChange=true;
    var currentPage=$(".current")[0];
    var pageIndex=1*$(currentPage).attr("id").split("-")[1];
    if(pageIndex==0){
        pageIndex=5;
        $("#slide-progress .current").removeClass("current");
        $("#slide-progress li").last().addClass("current");
    }else{
        --pageIndex;
        $("#slide-progress .current").removeClass("current").prev().addClass("current");
    }
    var nextPage=$("#page-"+(pageIndex));
    $("#page-list .current").addClass("pt-page-moveOutDown");
    nextPage.addClass("pt-page-moveInUp").addClass("pt-page-onTop").addClass("current");
    setTimeout(function(){
        $(currentPage).removeClass("current").removeClass("pt-page-moveOutDown");
        nextPage.removeClass("pt-page-moveInUp").removeClass("pt-page-onTop");
        isChange=false;
        initialize(pageIndex);
    },800);
}
$(function () {
    initialize(0);
    var audio = document.getElementById("music-audio");
    $("#music").on("click",function(){
        $(this).toggleClass("stopped");
        if (audio.paused) {
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
            return;
        }
        audio.pause();
    });
    $("#page-6-3").on("click","img",function(){
        var _this=$(this);
        _this.addClass("clickA");
        setTimeout(function(){
            _this.removeClass("clickA");
        },1000);
         var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            location.href = "https://itunes.apple.com/us/app/797you-xi/id1107228247?l=zh&ls=1&mt=8";
            _czc.push(["_trackEvent", "IOS下载按钮", "微场景", "", "", "IOS"]);
        } else {
            location.href = "https://update.game797.com/m/android/game797qp.apk";
            _czc.push(["_trackEvent", "Android下载按钮", "微场景", "", "", "android"]);
        }
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $("body").append('<div class="mask"></div>');
            $(".wx_open").show();
        }
    });
    $("#know").on("click", function () {
        $(".wx_open").hide();
        $(".mask").remove();
    })
    $("#page-6-4").on('click', "a", function (e) {
        var p = {
            url: location.href,
            showcount: '0',/*是否显示分享总数,显示：'1'，不显示：'0' */
            desc: '797游戏手机新版上线 参与即可抽大奖 快来试试吧！',/*默认分享理由(可选)*/
            summary: '797游戏手机新版上线 参与即可抽大奖 快来试试吧！', //分享摘要(可选)
            title: '797游戏手机新版上线 参与即可抽大奖 快来试试吧！',/*分享标题(可选)*/
            site: '797游戏手机新版上线 参与即可抽大奖 快来试试吧！',/*分享来源 如：腾讯网(可选)*/
            style: '201',
            pics:'http://www.game797.com/Images/DownLoad/game.png',
            width: 113,
            height: 39
        };

        var s = [];
        for (var i in p) {
            s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var type = $(this).attr("id"), item = "";
        switch (type) {
            case "wb":
                item = "http://v.t.sina.com.cn/share/share.php?" + s.join('&');
                window.open(item);
                break;
            case "qqwb":
                item = "http://share.v.t.qq.com/index.php?c=share&a=index&" + s.join('&');
                window.open(item);
                break;
            case "renren":
                item = "http://widget.renren.com/dialog/share?" + s.join('&');
                window.open(item);
                break;
            case "qzone":
                item = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&');
                window.open(item);
                break;
            case "qq":
                item = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
                window.open(item);
                break;
            case "wx":
                $(".shareTopRight").show();
                setTimeout(function () {
                    $(".shareTopRight").hide();
                }, 3000);
                break;
            default:
                item = "http://www.game797.com";
                window.open(item);
                break;

        }
    });

});

function initialize(id){
    var liHtml=['<div class="page-inner" style="left:'+left+';right:'+left+'">'+
                         '<div id="page-1-1">'+
                              '<img src="img/page2_02.png" style="width:75%;">'+
                         '</div>'+
                          '<div id="page-1-2" class="position">'+
                              '<img src="img/page2_04.png" style="width:31.25%;margin-left:25%;display:block;">'+
                        ' </div>'+
                          ' <div id="page-1-3" class="position">'+
                              ' <img src="img/page2_05.png" style="width:31.25%;margin-left:25%;display:block;">'+
                        '  </div>'+
                          ' <div id="page-1-4" class="position">'+
                          '     <img src="img/page2_06.png" style="width:46.25%;margin-left:25%;display:block;">'+
                        '  </div>'+
                         '  <div id="page-1-5" class="position">'+
                          '     <img src="img/page2_07.png" style="width:54.6875%;margin-left:25%;display:block;">'+
                        '  </div>'+
                          ' <div id="page-1-6" class="position">'+
                           '    <img src="img/page2_08.png" style="width:31.25%;margin-left:25%;display:block;">'+
                        '  </div>'+
                        '  <div id="page-1-7" class="position">'+
                         '      <img src="img/page2_01.png" style="width:11.875%;margin-left:7%;">'+
                         ' </div>'+
                         '  <div id="page-1-8" class="position">'+
                         '      <img src="img/page2_01.png" style="width:11.875%;margin-left:34%;-webkit-transform:rotate(-60deg) scale(1.1);transform:rotate(-60deg) scale(1.1);">'+
                         ' </div>'+
                         '  <div id="page-1-9" class="position">'+
                         '      <img src="img/page2_01.png" style="width:11.875%;margin-right:13%;">'+
                         ' </div>'+
                        '  <div id="page-1-10" class="position">'+
                          '     <img src="img/page2_03.png" style="width:26.40625%;">'+
                        '  </div>'+
                         '  <div id="page-1-11" class="position">'+
                              ' <img src="img/page2_03.png" style="width:26.40625%;margin-left:8%;-webkit-transform:rotate(-30deg) scale(0.5);transform:rotate(-30deg) scale(0.5);">'+
                        '  </div>'+
                         '  <div id="page-1-12" class="position">'+
                              ' <img src="img/page2_03.png" style="width:26.40625%;margin-right:2%;-webkit-transform:rotate(-30deg) scale(0.7);transform:rotate(-30deg) scale(0.7);">'+
                        '  </div>'+
                   '  </div>','<div class="page-inner" style="left:'+left+';right:'+left+'">'+
                          '<div id="page-2-1" class="position">'+
                              '<img src="img/page3-01.png" style="width:67.8125%;">'+
                        ' </div>'+
                         '<div id="page-2-2" class="position">'+
                             ' <img src="img/page3-02.png" style="width:83.28125%;">'+
                        ' </div>'+
                        ' <div id="page-2-3" class="position">'+
                            '  <span id="click_point"></span>'+
                            '  <img src="img/page3-10.png" id="hand"  style="width:27.5%;position:absolute;left:27%;top:35%;">'+
                            '  <img src="img/page3-11.png" style="width:71.40625%;display:block;margin:0 auto;">'+
                        ' </div>'+
                        ' <div id="page-2-4" class="position">'+
                              '<img src="img/page3-03.png" style="width:35%;margin-right:5%;">'+
                        ' </div>'+
                         ' <div id="page-2-5" class="position">'+
                              '<img src="img/page3-04.png" style="width:24.21875%;">'+
                        ' </div>'+
                         ' <div id="page-2-6" class="position">'+
                             ' <img src="img/page3-05.png" style="width:30.15625%;margin-left:5%;">'+
                        ' </div>'+
                         ' <div id="page-2-7" class="position">'+
                             ' <img src="img/page3-06.png" style="width:32.65625%;margin-left:30%;">'+
                        ' </div>'+
                          '<div id="page-2-8" class="position">'+
                              '<img src="img/page3-07.png" style="width:32.65625%;margin-left:52%;">'+
                        ' </div>'+
                         ' <div id="page-2-9" class="position">'+
                             ' <img src="img/page3-08.png" style="width:35.9375%;margin-left:55%;">'+
                        ' </div>'+
                         ' <div id="page-2-10" class="position">'+
                             ' <img src="img/page3-09.png" style="width:45.78125%;margin-left:5%;">'+
                        ' </div>'+
                   ' </div>','<div class="page-inner" style="left:'+left+';right:'+left+'">'+
                          '<div id="page-4-1" class="position">'+
                              '<img src="img/page4-01.png" style="width:100%;">'+
                              '<img src="img/page1_01.png" style="width:50%;position:absolute;top:25%;right:13%;">'+
                              '<img src="img/page4-02.png" style="width:37.65625%;position:absolute;top:54%;right:18%;">'+
                              '<img src="img/page4-03.png" id="page-4-word" style="width:91.5625%;position:absolute;bottom:-7%;left:6%;">'+
                         '</div>'+
                          '<div id="page-4-2" class="position">'+
                             ' <img src="img/page4-04.png" id="page-4-21" style="width: 89.6875%; margin: 0 auto; display: block;">'+
                             ' <img src="img/page4-05.png" id="page-4-22"  style="width: 89.6875%; margin: 0 auto; display: block;">'+
                             ' <img src="img/page4-06.png" id="page-4-23"  style="width: 29.6875%; margin-left: 5%;margin-top:10px; display: inline-block;">'+
                             ' <img src="img/page4-07.png" id="page-4-24"  style="width: 29.6875%; margin-left: -2px; margin-top: 10px; display: inline-block; ">'+
                              '<img src="img/page4-08.png" style="width: 29.6875%; margin-top: 10px; margin-right: 5%; float: right; display: inline-block; ">'+
                         '</div>'+
                    '</div>','<div style="background:url(img/page5-06.png) center center repeat-y;position:absolute;top:0;left:0;right:0;bottom: 0;">'+
                        '<div class="page-inner"  style="left:'+left+';right:'+left+'">'+
                          '<div id="page-5-1" class="position">'+
                              '<img src="img/page5-01.png" style="width:86.25%">'+
                          '</div>'+
                          '<div id="page-5-2" class="position">'+
                              '<img src="img/page5-02.png" style="width:100%">'+
                         ' </div>'+
                          '<div id="page-5-3" class="position">'+
                              '<img src="img/page5-03.png" style="width:100%">'+
                         ' </div>'+
                          '<div id="page-5-4" class="position">'+
                              '<img src="img/page5-04.png" style="width:100%">'+
                          '</div>'+
                         ' <div id="page-5-5" class="position">'+
                             ' <img src="img/page5-05.png" style="width:100%">'+
                         ' </div>'+
                     ' </div>'+
                   ' </div>',' <div class="page-inner"  style="left:'+left+';right:'+left+'">'+
                        ' <div id="page-6-1" class="position">'+
                            ' <img src="img/page1_01.png" style="width:75%;">'+
                        ' </div>'+
                         ' <div id="page-6-2" class="position">'+
                            ' <img src="img/gzhewm.jpg" style="width:45%;">'+
                            ' <p>关注797微信公众号</p>'+
                        ' </div>'+
                         ' <div id="page-6-3" class="position">'+
                             ' <img src="img/page6-01.png" style="width:60%; -webkit-transform: scale3d(1,1,1); transform:  scale3d(1,1,1);">'+
                        ' </div>'+
                       '  <div id="page-6-4" class="position">'+
                             ' <img src="img/page6-02.png" style="width:91.875%;">'+
                             ' <a id="wx"></a>'+
                             ' <a id="wb"></a>'+
                             ' <a id="qq"></a>'+
                        ' </div>'+
                    ' </div>'];
    var preid=id==0?5:(id-1),nexid=id==5?0:(id+1);
    if(!$("#page-"+preid).hasClass("had")){
        $("#page-"+preid).html(liHtml[preid-1]).addClass("had");
    }
    if(!$("#page-"+nexid).hasClass("had")){
        $("#page-"+nexid).html(liHtml[nexid-1]).addClass("had");
    }

}
