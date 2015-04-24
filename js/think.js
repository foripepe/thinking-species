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
    var outputVariations;
    var emotionVariations;

    // Thinking loop in millisec
    var thinkingLoopTime = 100;

    // Stores: memory fragments
    var memoryFragments = [];
    var memoryFragmentTimer = 0;
    var memoryFragmentMax = 8;
    // Current memory fragment
    var memoryFragment = null;

    // Stores: memories
    var memories = [];

    // Feedback length in millisec
    var feedbackLength = 20 * 1000;

    // Stores: synapse
    var synapseStructure = {
        originalInput: null,
        newInput: null,
        goodFeedback: 0,
        badFeedback: 0,
        occurence: 0,
        time: null
    };

    /**
     * Booting.
     */
    function booting() {
        thinkingLoop();
    }
    booting();

    /**
     * Generating the responses in a loop.
     */
    function thinkingLoop() {
        setInterval(function () {
            //console.warn('Thinking');
        }, thinkingLoopTime);
    }

    /**
     * Setup the output callback to environment.
     *
     * @param function callback
     * @param number outputNum
     */
    function myOutput(callback, outputNum) {
        outputCallback = callback;
        outputVariations = outputNum;
    }

    /**
     * Setup the emotion callback to environment.
     *
     * @param function callback
     * @param number emotionNum
     */
    function myEmotion(callback, emotionNum) {
        emotionCallback = callback;
        emotionVariations = emotionNum;
    }

    /**
     * Feedback (good-bad) from environment.
     *
     * @param number myPainPleasures
     */
    function feedback(myPainPleasures) {
        //emotionCallback(myPainPleasures);
    }

    /**
     * Input event from environment.
     *
     * @param number mySenses
     */
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
