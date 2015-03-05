var showButton = '<a href="#" class="btn-show-answer">顯示答案</a>';

$( ".question-hide" ).append( showButton );

$( ".btn-show-answer" ).click(function() {
    var div_ans = $(this).parent().find(".answer");

    div_ans.addClass("show");
    $(this).remove();
});
