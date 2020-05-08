$(function(){
    (function () {
        var flag = false;
        roatate = 0;
        var preRotate = 0;
        var s = 0;
        var defaultVolume = 50;
        var centerleft = 40;
        var centertop = 16;
        var mouseDownleft;
        var mouseDowntop;

        function throttle(fun, wait = 100) {
            var flag = true;
            return function () {
                if (!flag) {
                    return '';
                }
                flag = false;
                fun();
                setTimeout(() => {
                    flag = true;
                }, wait)
            }
        }

        function getEleCenter(elem) {
            return {
                left: Math.floor(elem.offset().left + 40),
                top: Math.floor(elem.offset().top + 16)
            }
        }
        // 根据三条边的坐标获取夹角
        function getRotate(pointA, pointB, pointC) {
            var AB = {};
            var AC = {};
            AB.X = (pointB.X - pointA.X);
            AB.Y = (pointB.Y - pointA.Y);
            AC.X = (pointC.X - pointA.X);
            AC.Y = (pointC.Y - pointA.Y);
            var direct = (AB.X * AC.Y) - (AB.Y * AC.X);
            var lengthAB = Math.sqrt(Math.pow(pointA.X - pointB.X, 2) +
                    Math.pow(pointA.Y - pointB.Y, 2)),
                lengthAC = Math.sqrt(Math.pow(pointA.X - pointC.X, 2) +
                    Math.pow(pointA.Y - pointC.Y, 2)),
                lengthBC = Math.sqrt(Math.pow(pointB.X - pointC.X, 2) +
                    Math.pow(pointB.Y - pointC.Y, 2));
            var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
                (2 * lengthAB * lengthAC);
            var angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);
            if (direct > 0) {
                s -= angleA;
            } else {
                s += angleA;
            }
            $('.circle5').css({
                transform: `rotateZ(${s}deg)`
            })
            var circle = Math.floor(s / 360);
            circle = defaultVolume + circle
            if (circle > 100) {
                circle = 100;
                s -= 360
            }
            if (circle < 0) {
                circle = 0;
                s += 360
            }
            $("#volume5").text(circle);
            $('.bar5').css({
                height: `${circle}%`
            })
        }
        $(".handler5").on("mousedown", function (e) {
            var {
                left,
                top
            } = getEleCenter($('.circle5'))
            centerleft = left;
            centertop = top;
            mouseDownleft = e.pageX;
            mouseDowntop = e.pageY;
            flag = true;
        });
        $("body").on("mouseup", function (e) {
            flag = false;
        });
        $("body").on("mousemove", function (e) {
            if (flag) {
                mX = e.pageX;
                mY = e.pageY;
                var center = {
                    X: centerleft,
                    Y: centertop
                }
                var mouse = {
                    X: mX,
                    Y: mY
                }
                var preMouse = {
                    X: mouseDownleft,
                    Y: mouseDowntop
                };
                getRotate(center, mouse, preMouse)
                mouseDownleft = mX;
                mouseDowntop = mY
            }
        });
    })()
})