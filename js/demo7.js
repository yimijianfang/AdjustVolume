$(function(){
    (function () {
        var flag = false;
        var ctop;
        var volume = 50;
        var preY;
        setInterval(() => {
            if (volume > 0) {
                volume--;
                setVolume(volume);
            }
        }, 1000)

        function setVolume(volume) {
            $("#volume7").text(volume);
            $(".bar7").css('height', `${volume}%`)
        }

        function getEleCenter(elem) {
            return {
                left: Math.floor(elem.offset().left),
                top: Math.floor(elem.offset().top)
            }
        }
        $(".pointer7").on("mousedown", function (e) {
            flag = true;
            var {
                top
            } = getEleCenter($(".demo7"))
            ctop = top;
        });
        $("body").on("mouseup", function (e) {
            flag = false;
        });
        $("body").on("mousemove", function (e) {
            if (flag) {
                mY = e.pageY;
                var y = mY - ctop;
                if (y < -90) {
                    y = -90
                } else if (y > 0) {
                    y = 0;
                }
                if (preY < 0 && y == 0 && volume < 100) {
                    volume++;
                    setVolume(volume)
                }
                preY = y;
                y = y - 10;

                $(".container7").css({
                    top: `${y}px`
                })
            }
        });
    })()
})