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
    var thinkingLoopTime = 1000;
    var thinkingLoopId = null;

    // Collected input and output.
    collectedInput = null;
    collectedOutput = null;
    collectedFeedback = 0;

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
    var fragmentLength = 20 * 10000;

    // Feedback length in millisec
    var feedbackLength = 20 * 10000;


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
        console.log(memories, memoryFragments);

        createOutput();

        storeFeedback();

        storeMemory();

        storeMemoryFragment();

        // Start new collection.
        collectedInput = null;
        collectedOutput = null;
        collectedFeedback = 0;
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

        compactMemoryFragments( memoryFragment );

        // Memorize it.
        memoryFragments.push( memoryFragment );
    }

    /**
     * Compacting memoryFragments.
     *
     * @param synapseStructure memoryFragment
     *
     * @return synapseStructure memoryFragment
     */
    function compactMemoryFragments( memoryFragment ) {
        var memory;

        for (var i = memoryFragments.length - 1; i >= 0; --i) {
            memory = memoryFragments[i];

            if (
                memoryFragment.firstInput === memory.firstInput &&
                memoryFragment.firstOutput === memory.firstOutput &&
                memoryFragment.secondInput === memory.secondInput &&
                memoryFragment.secondOutput === memory.secondOutput
            ) {

                memoryFragment.goodFeedback =+ memory.goodFeedback;
                memoryFragment.badFeedback =+ memory.badFeedback;
                memoryFragment.occurence =+ memory.occurence;

                memoryFragments.splice(i--, 1);

                break;
            }
        }

        return memoryFragment;
    }

    /**
     * Store the memory.
     */
    function storeMemory() {
        var memoryFragment;
        var memory;

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

            memory = new synapseStructure();

            memory.firstInput = memoryFragment.firstInput;
            memory.firstOutput = memoryFragment.firstOutput;
            memory.firstTime = memoryFragment.firstTime;

            memory.goodFeedback = memoryFragment.goodFeedback;
            memory.badFeedback = memoryFragment.badFeedback;
            memory.occurence = memoryFragment.occurence;

            memory.secondInput = collectedInput;
            memory.secondOutput = collectedOutput;
            memory.secondTime = timeNow;

            memory = compactMemories( memory );

            memories.push( memory );
        }
    }

    /**
     * Compacting memories.
     *
     * @param synapseStructure memoryFragment
     *
     * @return synapseStructure memoryFragment
     */
    function compactMemories( memoryFragment ) {
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

                memories.splice(i--, 1);

                break;
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
