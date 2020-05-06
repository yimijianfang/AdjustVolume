$(function(){
    function getIndex(){
        var url = location.href;
        /index(.*)\.html/.test(url);
        return Number(RegExp.$1) || 1;
    }
    var currentIndex = getIndex();
    var preIndex = currentIndex-1;
    preIndex = preIndex>1?preIndex:'';
    var nextIndex = currentIndex+1;
    var preButton = "<div class='button-pre'></div>";
    var nextButton = "<div class='button-next'></div>";
    if(currentIndex==1){
        preButton = ''
    }
    if(currentIndex==6){
        nextButton = ''
    }
    $box = $(".card-right")
    $box.append(preButton).append(nextButton);
    $(".button-pre").click(function(){
        location.href = location.origin + `/index${preIndex}.html`
    })
    $(".button-next").click(function () {
        location.href = location.origin + `/index${nextIndex}.html`
    })
})