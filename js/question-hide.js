var showButton = '<a href="#" class="btn-show-answer">顯示答案</a>';

$( ".question-hide" ).append( showButton );

$( ".btn-show-answer" ).click(function() {
    var div_ans = $(this).parent().find(".answer");

    div_ans.addClass("show");
    $(this).remove();

    // 傳送按下訊號給App
    if(uelearning.isAndroid()) {
        console.info('Android!!!');
    }

    // 防止按下按鈕後改變卷軸
    return false;
});
