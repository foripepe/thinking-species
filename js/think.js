/**
 * Think JS
 *
 * @author Peter Forgacs
 * @version 0.1
 * @created 21-October-2014
 */

var myThink = (function(){
    var outputCallback;
    var emotionCallback;

    var myOutputs;
    var myEmotions;

    function myOutput(callback, outputNum) {
        outputCallback = callback;
        myOutputs = outputNum;
    }

    function myEmotion(callback, emotionNum) {
        emotionCallback = callback;
        myEmotions = emotionNum;
    }

    function feedback(myPainPleasures) {
        emotionCallback(myPainPleasures);
    }

    function input(mySenses) {
        outputCallback(mySenses);
    }

    return {
        myOutput: myOutput,
        myEmotion: myEmotion,
        feedback: feedback,
        input: input
    }

})();
