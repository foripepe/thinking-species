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
    var thinkingLoopId = null;

    // Collected input and output.
    collectedInput = null;
    collectedOutput = null;
    collectedFeedback = null;

    // Stores: synapse
    function synapseStructure() {
        this.firstInput = null;
        this.firstOutput = null;
        this.firstTime = null;

        this.secondInput = null;
        this.secondOutput = null;
        this.secondTime = null;

        this.goodFeedback = 0;
        this.badFeedback = 0;

        this.occurence = 1;
    };

    // Stores: memories
    var memories = [];

    // Stores: memory fragments
    var memoryFragments = [];

    // Fragment length is millisec
    var fragmentLength = 20 * 1000;

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
        thinkingLoopId = setInterval(function () {
            thinkingProcess();
        }, thinkingLoopTime);
    }

    /**
     * Storing the input and generating the response.
     */
    function thinkingProcess() {

        createOutput();

        storeFeedback();

        storeMemory();

        storeMemoryFragment();

        // Start new collection.
        collectedInput = null;
        collectedOutput = null;
        collectedFeedback = null;
    }

    /**
     * Store the memory fragment.
     */
    function storeMemoryFragment() {
        // New memory fragment.
        var memoryFragment = new synapseStructure();

        // Enrich data.
        memoryFragment.firstInput = collectedInput;
        memoryFragment.firstOutput = collectedOutput;
        memoryFragment.firstTime = Date.now();

        // Memorize it.
        memoryFragments.push( memoryFragment );
    }

    /**
     * Store the memory.
     */
    function storeMemory() {
        var memoryFragment;
        var timeNow = Date.now();
        var oldTime = timeNow - fragmentLength;

        for (var i = 0; i < memoryFragments.length; ++i) {
            memoryFragment = memoryFragments[i];

            // Remove old memory fragments.
            if (memoryFragment.firstTime < oldTime) {
                memoryFragments.splice(i--, 1);

                continue;
            }


            // Store memory.

            memoryFragment.secondInput = collectedInput;
            memoryFragment.secondOutput = collectedOutput;
            memoryFragment.secondTime = timeNow;

            memoryFragment = compactMemory( memoryFragment );

            memories.push( memoryFragment );
        }
    }

    /**
     * Store the feedback.
     *
     * @param synapseStructure memoryFragment
     *
     * @return synapseStructure memoryFragment
     */
    function compactMemory( memoryFragment ) {
        var memory;

        for (var i = memories.length - 1; i >= 0; --i) {
            memory = memories[i];

            if (
                memoryFragment.firstInput === memory.firstInput &&
                memoryFragment.firstOutput === memory.firstOutput &&
                memoryFragment.secondInput === memory.secondInput &&
                memoryFragment.secondOutput === memory.secondOutput
            ) {

                memoryFragment.goodFeedback =+ memory.goodFeedback;
                memoryFragment.badFeedback =+ memory.badFeedback;
                memoryFragment.occurence =+ memory.occurence;

                break;

                memory.splice(i--, 1);
            }
        }

        return memoryFragment;
    }

    /**
     * Store the feedback.
     */
    function storeFeedback() {
        var memory;
        var timeNow = Date.now();
        var oldTime = timeNow - fragmentLength;

        for (var i = memories.length - 1; i >= 0; --i) {
            memory = memories[i];

            if (memory.secondTime >= oldTime) {
                // Store feedback.
                if (collectedFeedback >= 0) {
                    memory.goodFeedback += collectedFeedback;
                }
                else {
                    memory.badFeedback += collectedFeedback;
                }
            }
            else {
                break;
            }
        }
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
