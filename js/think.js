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

    function myOutput(callback) {
        outputCallback = callback;
    }

    function myEmotion(callback) {
        emotionCallback = callback;
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
