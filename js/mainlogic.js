/**
 * Thinking Species
 *
 * @author Peter Forgacs
 * @version 0.1
 * @created 21-October-2014
 */

var mainlogic = (function(){

    // Main states.
    var mainStates = {'loading': 0, 'teaching': 1};
    var mainState = mainStates.loading;

    // Window size and aspect.
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var xBiggerY = (windowHalfX > windowHalfY);

    /**
     * Booting.
     */
    function booting() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        initializeMenu();

        mainState = mainStates.playing;

    }

    /**
     * Initialize menu.
     */
    function initializeMenu() {
        addMenuItem({
            id: 'output',
            x: 0,
            y: 20,
            width: 200,
            height: 200,
            pic: imageObj['output-lie'].src,
            onrelease: function () {
                console.warn('output');
            }
        });
        addMenuItem({
            id: 'emotion',
            x: 220,
            y: 95,
            width: 50,
            height: 50,
            pic: imageObj['emotions-neutral'].src,
            onrelease: function () {
                console.warn('emotion');
            }
        });
        addMenuItem({
            id: 'feedback-good',
            x: 340,
            y: 55,
            width: 50,
            height: 50,
            pic: imageObj['feedbacks-good'].src,
            onrelease: function () {
                console.warn('feedbacks-good');
            }
        });
        addMenuItem({
            id: 'feedback-bad',
            x: 340,
            y: 135,
            width: 50,
            height: 50,
            pic: imageObj['feedbacks-bad'].src,
            onrelease: function () {
                console.warn('feedbacks-bad');
            }
        });

        for (var i = 0; i < 7; i++) {
            (function(pos){
                addMenuItem({
                    id: 'button' + pos,
                    x: 60 * pos,
                    y: 250,
                    width: 25,
                    height: 25,
                    pic: imageObj['input-' + pos].src,
                    onrelease: function () {
                        console.warn('input', pos);
                    }
                });
            })(i);
        }
    }

    /**
     * Create menu elements.
     *
     * @param Object menuObject
            id: Id of element,
            x: X position,
            y: Y position,
            width: Width,
            height: Height,
            pic: Source of button picture,
            onpress: On press function (mouse and touch),
            onout: On out function (mouse and touch),
            onrelease: On release function (mouse and touch)
     */
    function addMenuItem(menuObject) {
        // Remove previous one, if there is any.
        var element = document.getElementById( menuObject.id );
        if (element) {
            document.getElementById( menuObject.id ).remove();
        }

        var thisOpacity = 0.9;

        var menuContainer = document.createElement('img');
        menuContainer.id = menuObject.id;
        //menuContainer.style.visibility = menuObject.visibility;
        //menuContainer.style.display = menuObject.display;
        menuContainer.style.position = 'absolute';
        menuContainer.style.backgroundColor = 'white';
        menuContainer.style.opacity = thisOpacity;
        menuContainer.style.borderRadius = "5px";
        menuContainer.style.padding = "5px 5px";
        menuContainer.style.left = menuObject.x + 'px';
        menuContainer.style.top = menuObject.y + 'px';
        menuContainer.style.width = menuObject.width + "px";
        menuContainer.style.height = menuObject.height + "px";
        menuContainer.style.color = 'black';

        menuContainer.src = menuObject.pic;

        var menuContainerMouseUp = function () {
            menuObject.onrelease();

            // Animate.
            var opacityDirection = 0.1;
            var animMenu = function () {
                // Bright effect.
                setTimeout(function () {
                    if (parseFloat(menuContainer.style.opacity) >= 1) {
                        opacityDirection = -opacityDirection;
                    }
                    menuContainer.style.opacity = parseFloat(menuContainer.style.opacity) + opacityDirection;

                    if (parseFloat(menuContainer.style.opacity) > thisOpacity) {
                        animMenu();
                    }
                }, 20);
            }
            animMenu();
        };
        menuContainer.addEventListener( 'mouseup', menuContainerMouseUp, false );
        menuContainer.addEventListener( 'touchend', menuContainerMouseUp, false );

        document.body.appendChild(menuContainer);
    }


    // Writing out some basic texts.
    var writeTextContainer;
    /**
     * Write text.
     *
     * @param String text
     */
    function writeText(text) {
        if (!writeTextContainer) {
            writeTextContainer = document.createElement('div');
            writeTextContainer.id = 'gameinfo';
            writeTextContainer.style.position = 'absolute';
            writeTextContainer.style.backgroundColor = 'black';
            writeTextContainer.style.opacity = 0.7;
            writeTextContainer.style.borderRadius = "5px";
            writeTextContainer.style.padding = "5px 20px";
            writeTextContainer.style.left = (windowHalfX / 2) + 'px';
            writeTextContainer.style.top = (windowHalfY / 2) + 'px';
            //writeTextContainer.style.width = (window.innerWidth * 0.2) + "px";
            //writeTextContainer.style.minWidth = '10px';
            writeTextContainer.style.color = 'yellow';
            writeTextContainer.style.fontFamily = 'Arial, San Serif';
            writeTextContainer.style.fontWeight = 'bold';
            writeTextContainer.style.fontSize = (window.innerHeight * 0.033) + "px";

            document.body.appendChild(writeTextContainer);
        }

        writeTextContainer.innerHTML = text;
    }
    /**
     * Remove text.
     */
    function clearText() {
        if (!writeTextContainer) {
            return;
        }

        document.body.removeChild(writeTextContainer);
    }

    /**
     * Preloader.
     */
    function preloadResources() {
        document.body.style.margin = 0;
        document.body.style.overflow = 'hidden';

        var text = 'Loading, please wait.';
        var textEnding = '';
        writeText(text);

        // Preloader anymation.
        animateText();
        function animateText() {
            setTimeout(
                function () {
                    if (textEnding.length < 2) {
                        textEnding += '.';
                    }
                    else {
                        textEnding = '';
                    }
                    writeText(text + textEnding);

                    if (mainState == mainStates.loading) {
                        animateText();
                    }
                    else {
                        clearText();
                    }
                },
                200
            );
        }

        // Preload all the images.
        imageObj = [];
        imageObj['output-back'] = new Image();
        imageObj['output-back'].src = 'pics/output/back.png';
        imageObj['output-eat'] = new Image();
        imageObj['output-eat'].src = 'pics/output/eat.png';
        imageObj['output-empty'] = new Image();
        imageObj['output-empty'].src = 'pics/output/empty.png';
        imageObj['output-lie'] = new Image();
        imageObj['output-lie'].src = 'pics/output/lie.png';
        imageObj['output-pee'] = new Image();
        imageObj['output-pee'].src = 'pics/output/pee.png';
        imageObj['output-sit'] = new Image();
        imageObj['output-sit'].src = 'pics/output/sit.png';
        imageObj['output-stand'] = new Image();
        imageObj['output-stand'].src = 'pics/output/stand.png';

        imageObj['input-0'] = new Image();
        imageObj['input-0'].src = 'pics/input/blue.jpg';
        imageObj['input-1'] = new Image();
        imageObj['input-1'].src = 'pics/input/gray.png';
        imageObj['input-2'] = new Image();
        imageObj['input-2'].src = 'pics/input/green.jpg';
        imageObj['input-3'] = new Image();
        imageObj['input-3'].src = 'pics/input/orange.jpg';
        imageObj['input-4'] = new Image();
        imageObj['input-4'].src = 'pics/input/red.jpg';
        imageObj['input-5'] = new Image();
        imageObj['input-5'].src = 'pics/input/white.jpg';
        imageObj['input-6'] = new Image();
        imageObj['input-6'].src = 'pics/input/yellow.jpg';

        imageObj['emotions-afraid'] = new Image();
        imageObj['emotions-afraid'].src = 'pics/emotions/afraid.png';
        imageObj['emotions-angry'] = new Image();
        imageObj['emotions-angry'].src = 'pics/emotions/angry.png';
        imageObj['emotions-cry'] = new Image();
        imageObj['emotions-cry'].src = 'pics/emotions/cry.png';
        imageObj['emotions-happy'] = new Image();
        imageObj['emotions-happy'].src = 'pics/emotions/happy.png';
        imageObj['emotions-laugh'] = new Image();
        imageObj['emotions-laugh'].src = 'pics/emotions/laugh.png';
        imageObj['emotions-neutral'] = new Image();
        imageObj['emotions-neutral'].src = 'pics/emotions/neutral.png';
        imageObj['emotions-sad'] = new Image();
        imageObj['emotions-sad'].src = 'pics/emotions/sad.png';
        imageObj['emotions-suprised'] = new Image();
        imageObj['emotions-suprised'].src = 'pics/emotions/suprised.png';

        imageObj['feedbacks-bad'] = new Image();
        imageObj['feedbacks-bad'].src = 'pics/feedbacks/bad.png';
        imageObj['feedbacks-good'] = new Image();
        imageObj['feedbacks-good'].src = 'pics/feedbacks/good.png';

        imageObj['background'] = new Image();
        imageObj['background'].src = 'pics/galaxysmall.jpg';
    }
    preloadResources();

    window.addEventListener('load', booting, false);
})();
