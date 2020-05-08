$(function(){
    (function () {
        var flag = false;
        var centerleft = 0;
        var centertop = 0
        const G = 9.8;
        const RUB = G * 0.1;
        var speed = 0;
        var roatate = 0;
        var barLeft = 110;
        var barMaxWidth = Math.floor($(".per3").width());
        var barWidth = Math.floor($(".bar3").width() / 2);
        setInterval(function () {
            if (roatate != 0) {
                // 增加摩擦力
                var force = Math.cos(2 * Math.PI / 360 * (90 - roatate)) * G;
                if (Math.abs(force) > RUB) {
                    console.log('go')
                    speed += Math.floor(force - RUB);
                } else {
                    if (speed <= 0) {
                        speed = 0
                    } else {
                        speed -= Math.floor(RUB - force);
                    }
                }
            }
            barLeft += speed / 100
            if (barLeft <= -barWidth) {
                speed = 0;
                barLeft = -barWidth;
            } else if (barLeft >= barMaxWidth - barWidth) {
                speed = 0;
                barLeft = barMaxWidth - barWidth;
            }
            $("#volume3").text(Math.floor((barLeft + barWidth) / barMaxWidth * 100));
            $(".bar3").css({
                left: barLeft + 'px'
            })
        }, 10)

        function getEleCenter(elem) {
            return {
                left: Math.floor(elem.offset().left + (elem.width() / 2)),
                top: Math.floor(elem.offset().top + (elem.height() / 2))
            }
        }

        function calculateRotate(elem, mouseX, mouseY) {
            roatate = getTanDeg((mouseY - centertop) / (mouseX - centerleft))
            $('.demo3').css({
                transform: `rotateZ(${roatate}deg)`
            })
        }

        function getTanDeg(tan) {
            var result = Math.atan(tan) / (Math.PI / 180);
            result = Math.round(result);
            return result;
        }
        $(".demo3").on("mousedown", function (e) {
            var {
                left,
                top
            } = getEleCenter($(this))
            centerleft = left;
            centertop = top;
            flag = true;
        });
        $("body").on("mouseup", function (e) {
            flag = false;
        });
        $("body").on("mousemove", function (e) {
            if (flag) {
                mX = e.pageX;
                mY = e.pageY;
                if (mX > centerleft) {
                    calculateRotate($('.demo3'), mX, mY)
                }
            }
        });
    })()
})