$(function(){
    (function () {
        var stime;
        const MAXTIME = 1 * 1000; //最长持续1S，时间到后自动发射
        const MAXDEGREE = 45;
        var rotate = 0;
        var timer = null
        var $bar = $(".bar4")
        var perWidth = $(".per4").width()
        var flag = false;
        var defaultIcon = 2;
        $("#volumnIcon4").on("mousedown", function () {
            flag = true
            $bar.css({
                left: '-30px',
                top: '-10px'
            }).hide()
            stime = +new Date();
            let period = 10; //周期100ms
            timer = setInterval(function () {
                rotate -= period / MAXTIME * MAXDEGREE;
                $("#volumnIcon4").css({
                    'transform': `rotateZ(${rotate}deg)`
                })
                var left = Math.abs(rotate / MAXDEGREE) * perWidth
                $(".target4").css({
                    'left': `${left}px`
                })
                // 喇叭动画
                var d = (defaultIcon++) % 3 + 1;
                $(".target4").css({
                    'left': `${left}px`
                })
                $("#volumnIcon4").removeClass().addClass(`icon-volume-${d}`)
                if (+new Date() - stime >= MAXTIME) {
                    launch()
                }
            }, period)
        })
        $("#volumnIcon4").on("mouseup", launch)

        function launch() {
            if (flag) {
                flag = false;
                $(".bar4").show()
                $("#volumnIcon4").css({
                    'transform': `rotateZ(0deg)`
                }).removeClass().addClass('icon-volume-2')
                new Parabola(document.querySelector('.bar4'), document.querySelector('.target4'), {
                    endScale: '1',
                    curvature: '0.003',
                    complete: function () {
                        $("#volume4").text(Math.floor(Math.abs(rotate / MAXDEGREE) * 100));
                        rotate = 0;
                    }
                }).init();
                timer && clearInterval(timer)
            }
        }
    })()
})