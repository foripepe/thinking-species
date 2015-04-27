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

    // Collected input and output.
    collectedInput = null;
    collectedOutput = null;
    collectedFeedback = null;

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
        this.duration = null;
    };

    // Current memory fragment
    var memoryFragment = new synapseStructure();

    // Stores: memories
    var memories = [];

    // Stores: memory fragments
    var memoryFragments = [];
    // Stores: memory fragment parts storaged by this cycles
    var memoryFragmentMax = 8;

    // Feedback length in millisec
    var feedbackLength = 20 * 1000;


    var debugging = true;
    function consoleLog( output ) {
        if (debugging) {
            console.log( output );
        }
    }

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

        // Start new collection.
        collectedInput = null;
        collectedOutput = null;
    }

    /**
     * Store the memory fragment.
     */
    function storeMemoryFragment() {
        // Current memory with or without input.
        if (!collectedInput) {
            return;
        }

        consoleLog('Memorizing');

        // New memory fragment.
        memoryFragment = new synapseStructure();

        // Enrich data.
        memoryFragment.firstInput = collectedInput;
        memoryFragment.firstOutput = collectedOutput;
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
        collectedFeedback = myPainPleasures;
        //emotionCallback(myPainPleasures);
    }

    /**
     * Input event from environment.
     *
     * @param number mySenses
     */
    function input(mySenses) {
        collectedInput = mySenses;
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
