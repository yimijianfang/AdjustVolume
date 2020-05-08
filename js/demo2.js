$(function(){
    (function () {
        var flag = false;
        function calculateDistance(elem, mouseX, mouseY) {
            return Math.floor(mouseX - (elem.offset().left), 2);
        }

        function updateIcon(distance) {
            var per = distance / $(".demo2").width()
            var $el = $("#demo2-icon").removeClass();
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
            $target.css({
                width: distance + 'px'
            });
        }
        $(".demo2").on("mousedown", function (e) {
            flag = true;
        });
        $("body").on("mouseup", function (e) {
            flag = false;
        });
        $(".demo2").on("click", function (e) {
            updateDistance(e, $('.per2'))
        });
        $("body").on("mousemove", function (e) {
            if (flag) {
                updateDistance(e, $('.per2'))
            }
        });
    })()
})