var UElearning = {
    View: function(data, layout_data) {
        var isEnableFinish = true;

        this.finishButton = layout_data.finishButton;

        this.minTime = data.minTime;
        this.minTimeForce = data.minTimeForce;
        this.isEnableFinish = function() {
            return isEnableFinish;
        }

        this.alertInfo = function() {
            alert('minTime: '+this.minTime+'\n'+
                  'minTimeForce: '+this.minTimeForce);
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
        };

        this.startAndroid = function() {
            this.start();
            var finishButton = this.finishButton;
            finishButton.onclick = function() {
                if(isEnableFinish) {
                    Android.pressFinishButton();
                }
            }
        };
    }
};
