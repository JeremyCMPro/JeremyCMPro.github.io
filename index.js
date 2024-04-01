$(document).ready(function() {
    $('#switchButton').click(function(){
        $(this).find("#circleButton").toggleClass('light');
        $("body").toggleClass("light-mode")
    });
});