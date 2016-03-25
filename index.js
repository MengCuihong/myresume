/**
 * Created by del on 2016/3/24.
 */
/**
 * Created by shan on 3/17/16.
 */
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
/*�豸�Ŀ���*/
var winH = document.documentElement.clientHeight;
/*�豸�ĸ߶�*/
var audio_btn = document.querySelector("#audio_btn");
var bell = document.querySelector('#bell');
var desW = 640;
/*��Ƹ��*/
var desH = 1008;
/*��Ƹ��/

 /*�豸�Ŀ����豸�ĸ�< ��Ƹ������Ƹ�� ���ո������� ->����Ƹ�ĸ���С���豸�ĸ�*/
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";    //main��Ȼ�����ˣ����ǿ��߲��仹��640 960
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
})


audio_btn.addEventListener("click", function () {
    if (audio_btn.getAttribute("class") === "rotate") {
        this.className = "off";
        bell.pause();
    } else {

        this.className = "rotate";
        bell.play();
    }
});

function start(e) {
    this.touchStart = e.changedTouches[0].pageY;
}

function move(e) {
    e.preventDefault();
    this.flag = true;
    var touchMove = e.changedTouches[0].pageY;
    var pos = touchMove - this.touchStart;
    var index = this.index;//��ǰ��һ�ŵ�����
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] != index) {
            arguments[0].style.display = "none"
        }
        arguments[0].firstElementChild.id = "";
    })
    if (pos > 0) {/*�»�*/
        //�����һ�ŵ������������������жϣ���ǰ��һ���ǵ�һ�ţ���һ�ž������һ��
        this.prevsIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH + pos;

    } else if (pos < 0) {/*�ϻ�*/
        //�����һ�ŵ����� �����ж� ��ǰ�����һ�� ��һ�ž��ǵ�һ��
        this.prevsIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + pos;
    }

    oLis[index].style.webkitTransform = "translate(0," + pos + "px)";//���ŵ�ֵ�ǰ����ƶ��ľ��룯�豸�ĸ߶��������������
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].className = "zIndex";//�㼶��������
}

function end(e) {
    if (this.flag) {
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a" + (this.index + 1)
        }, false)
    }
}


document.addEventListener("touchmove", function (e) {
    //console.log(e.target.id);    ��ֹģ�������touchmove��ʧ �Լ�����һ����ֹ��ʧ
}, false)
