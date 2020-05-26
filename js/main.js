$(document).ready(function(){
    var altura=$('.MenuI').offset().top;
    $(window).on('scroll', function(){
        if($(window).scrollTop()>altura){
            $('.MenuI').addClass('menu-fixed');
        }else{
            $('.MenuI').removeClass('menu-fixed');
        }
    });
});