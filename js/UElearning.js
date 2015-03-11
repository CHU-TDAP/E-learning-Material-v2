var UElearning = {
    View: function(data, layout_data) {
        var isEnableFinish = true;

        this.finishButton = layout_data.finishButton;

        this.minTime = data.minTime;
        this.minTimeForce = data.minTimeForce;
        this.isEnableFinish = function() {
            return isEnableFinish;
        };
        var isAndroid = false;

        // --------------------------------------------------------------------

        this.alertInfo = function() {
            alert('minTime: ' + this.minTime + '\n' +
                  'minTimeForce: ' + this.minTimeForce);
        };

        this.start = function() {
            var startTime = Date.now();
            var nowTime = Date.now();
            var elapsedTime = 0;
            var minTime = this.minTime;
            var minTimeForce = this.minTimeForce;
            var remainderHold = minTime;

            var finishButton = this.finishButton;
            var finishButtonText = this.finishButton.text;
            var finishButtonHref = this.finishButton.href;

            var myTimer = setInterval(function () {timerFunc()}, 500);
            function timerFunc() {
                nowTime = Date.now();
                elapsedTime = parseInt((nowTime - startTime)/1000);
                remainderHold = minTime - elapsedTime;

                if(remainderHold > 0) {
                    if(minTimeForce) {
                        isEnableFinish = false;
                        if(!finishButton.classList.contains('disable')) {
                            finishButton.classList.add('disable');
                        }
                        finishButton.href = '#';
                    }
                    finishButton.text = finishButtonText + ' ('+ remainderHold +')';

                }
                else {
                    isEnableFinish = true;
                    if(finishButton.classList.contains('disable')) {
                        finishButton.classList.remove('disable');
                    }
                    finishButton.href = finishButtonHref;
                    finishButton.text = finishButtonText;
                }
            }

            finishButton.onclick = function() {
                if(isEnableFinish) {
                    if(isAndroid) {
                        Android.pressFinishButton();
                    }
                }
            }
        };

        this.setAndroid = function() {
            isAndroid = true;
        }
    },

    // ========================================================================

    Question: function(data, layout_data) {
        this.maxTime = data.maxTime;
        this.maxTimeForce = data.maxTimeForce;

        this.question_section = layout_data.question_section;
        this.answer_option = layout_data.answer_option;

        var topicId = 0;
        var maxTopicTotal = this.question_section.length;
        var isAndroid = false;

        // --------------------------------------------------------------------

        this.alertInfo = function() {
            alert('maxTime: '+this.maxTime+'\n'+
                  'maxTimeForce: '+this.maxTimeForce+'\n'+
                  'maxTopicTotal: '+maxTopicTotal+'\n'+
                  'topicId: '+topicId);
        };

        this.toTopic = function() {

            // 隨機抽一個題目
            topicId = Math.floor((Math.random() * maxTopicTotal) + 1);
            this.toTopicById(topicId);
        };

        this.toTopicById = function(id) {
            topicId = id;

            var question_section = this.question_section;
            for (var i = 0; i < maxTopicTotal; i++) {

                // 若是當前題目
                if(i+1 == topicId) {
                    if(question_section[i].classList.contains('hide')) {
                        question_section[i].classList.remove('hide');
                    }
                }
                else {
                    if(!question_section[i].classList.contains('hide')) {
                        question_section[i].classList.add('hide');
                    }
                }
            }
        };

        this.defineButton = function() {
            var question_section = this.question_section;

            var option_button = $(question_section[topicId-1])
                .find('.answer-area .option-button');

            option_button.click(function() {
                // 取得按鈕所在索引
                var atIndex = $(option_button).index(this)+1;

                // 判斷選擇的答案是否正確
                if(this.dataset.is_corrent == 'true') {
                    $('#correctModal').foundation('reveal', 'open');
                    if(isAndroid) {
                        Android.answerCorrect(topicId, atIndex);
                    }
                }
                else {
                    $('#errorModal').foundation('reveal', 'open');
                    if(isAndroid) {
                        Android.answerError(topicId, atIndex);
                    }
                }

            });
        };

        this.createDialog = function() {
            var correctDialog = '<div id="correctModal" class="reveal-modal" data-reveal data-options="close_on_background_click: false;"><h2>回答正確！</h2><p>恭喜你回答正確</p><a href="#" id="correctModal-okbtn" class="button success">繼續學習</a></div>';
            var errorDialog = '<div id="errorModal" class="reveal-modal" data-reveal data-options="close_on_background_click: false;"><h2>回答錯誤！</h2><p>再回去看一次吧！</p><a href="#" id="errorModal-okbtn" class="button">回去重新看看</a></div>';
            $("body").append(correctDialog);
            $("body").append(errorDialog);

            $("#correctModal-okbtn").click(function() {
                if(isAndroid) {
                    Android.learnFinish();
                }
                else {
                    window.location.href = '../index.html';
                }
            });

            $("#errorModal-okbtn").click(function() {
                if(isAndroid) {
                    Android.goBack();
                    var historyTotal = history.length;
                    history.go(-historyTotal+1);
                }
                else {
                    window.history.go(-2);
                }
            });
        };

        this.start = function() {
            this.toTopic();
            this.defineButton();
            this.createDialog();
        };

        this.setAndroid = function() {
            isAndroid = true;
        };
    }
};
