$(function(){
     (function () {
         function setVolume(volume) {
             $("#volume6").text(volume);
         }

         function showError() {
             $("#alert6").show()
         }

         function hideError() {
             $("#alert6").hide()
         }
         const PI =
             '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706';
         $("#number6").on('input', function () {
             var number = $(this).val()
             if (PI.indexOf(number) == 0) {
                 setVolume(number.length)
                 hideError();
             } else {
                 setVolume(0);
                 showError();
             }
         })
     })()
})