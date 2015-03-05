var UElearning = {
    View: function(data, layout_data) {
        this.finishButton = layout_data.finishButton;

        this.minTime = data.minTime;
        this.minTimeForce = data.minTimeForce;

        this.alertInfo = function() {
            alert('minTime: '+this.minTime+'\n'+
                  'minTimeForce: '+this.minTimeForce);
        };

        this.startAndroid = function() {
            var startTime = Date.now();
            var nowTime = Date.now();
            var elapsedTime = 0;
            var minTime = this.minTime;
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
                    if(!finishButton.classList.contains('disable')) {
                        finishButton.classList.add('disable');
                    }
                    finishButton.href = '#';
                    finishButton.text = finishButtonText + ' ('+ remainderHold +')';
                }
                else {
                    if(finishButton.classList.contains('disable')) {
                        finishButton.classList.remove('disable');
                    }
                    finishButton.href = finishButtonHref;
                    finishButton.text = finishButtonText;
                }
            }
        };
    }
};
