$(function(){
    (function () {
        var flag = false;
        function calculateDistance(elem, mouseX, mouseY) {
            return Math.floor((elem.offset().top - mouseY + elem.height()), 2);
        }
        function updateIcon(distance) {
            var per = distance / $(".demo1").height()
            var $el = $("#demo1-icon").removeClass();
            if (per >= 0.7) {
                $el.addClass('icon-volume-3');
            } else if (per >= 0.3) {
                $el.addClass('icon-volume-2');
            } else if (per > 0) {
                $el.addClass('icon-volume-1');
            } else {
                $el.addClass('icon-volume-none');
            }
        }
        function updateDistance(e, $target) {
            mX = e.pageX;
            mY = e.pageY;
            distance = calculateDistance($target, mX, mY);
            updateIcon(distance)
            $target.css({ height: distance + 'px' });
        }
        $(".demo1").on("mousedown", function (e) {
            flag = true;
        });
        $("body").on("mouseup", function (e) {
            flag = false;
        });
        $(".demo1").on("click", function (e) {
            console.log('click')
            updateDistance(e, $('.per1'))
        });
        $("body").on("mousemove", function (e) {
            if (flag) {
                updateDistance(e, $('.per1'))
            }
        });
    })();
})