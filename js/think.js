/**
 * Think JS
 *
 * @author Peter Forgacs
 * @version 0.1
 * @created 21-October-2014
 */

var myThink = (function(){
    // Callbacks to interface
    var outputCallback;
    var emotionCallback;

    // Mapping response for values
    var myOutputs;
    var myEmotions;

    // Thinking loop in millisec
    var thinkingLoopTime = 100;

    // Stores: inputs
    var listenerIntervals = [];
    var listenerIntervalTimer = 0;
    var listenerIntervalMax = 8;

    var feedbackLength = 8;

    // Stores:
    var memories = [];
    var synapseStructure = {
        originalInput: null,
        newInput: null,
        getFeedback: null,
        occurence: 0,
    };

    function booting() {
        thinkingLoop();
    }
    booting();

    function thinkingLoop() {
        setInterval(function () {
            //console.warn('Thinking');
        }, thinkingLoopTime);
    }

    function myOutput(callback, outputNum) {
        outputCallback = callback;
        myOutputs = outputNum;
    }

    function myEmotion(callback, emotionNum) {
        emotionCallback = callback;
        myEmotions = emotionNum;
    }

    function feedback(myPainPleasures) {
        //emotionCallback(myPainPleasures);
    }

    function input(mySenses) {
        //outputCallback(mySenses);
    }

    return {
        myOutput: myOutput,
        myEmotion: myEmotion,
        feedback: feedback,
        input: input
    }

})();
