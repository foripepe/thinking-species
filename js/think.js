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

    // Stores: synapse
    function synapseStructure() {
        this.firstInput = null;
        this.secondInput = null;
        this.firstOutput = null;
        this.secondOutput = null;
        this.goodFeedback = 0;
        this.badFeedback = 0;
        this.occurence = 0;
        this.startTime = null;
        this.completeTime = null;
    };

    // Stores: memory fragments
    var memoryFragments = [];
    var memoryFragmentTimer = 0;
    var memoryFragmentMax = 8;
    // Current memory fragment
    var memoryFragment = new synapseStructure();

    // Stores: memories
    var memories = [];

    // Feedback length in millisec
    var feedbackLength = 20 * 1000;

    /**
     * Booting.
     */
    function booting() {
        thinkingLoop();
    }
    booting();

    /**
     * Thinking loop.
     */
    function thinkingLoop() {
        setInterval(function () {
            thinkingProcess();
        }, thinkingLoopTime);
    }

    /**
     * Storing the input and generating the response.
     */
    function thinkingProcess() {
        // Create output.
        createOutput();

        // Store memoryFragment.
        storeMemoryFragment();

        // New memory fragment.
        memoryFragment = new synapseStructure();
    }

    /**
     * Store the memory fragment.
     */
    function storeMemoryFragment() {
        // Check if there was any similar event.

        // If yes, use it.


        // If not, store it.

        // Enrich data.
        memoryFragment.firstTime = Date.now();

        // Memorize it.
        memoryFragments.push( memoryFragment );
    }

    /**
     * Create output.
     */
    function createOutput() {
        // @TODO
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

    /**
     * Polyfill
     */
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    return {
        myOutput: myOutput,
        myEmotion: myEmotion,
        feedback: feedback,
        input: input
    }

})();
