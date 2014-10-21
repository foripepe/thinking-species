/**
 * Thinking Species
 *
 * @author Peter Forgacs
 * @version 0.1
 * @created 21-October-2014
 */

var mainlogic = (function(){

    // Main states.
    var mainStates = {'loading': 0, 'playing': 1, 'movepage': 2, 'solve': 3, 'shuffle': 4, 'movehistory' : 5};
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
            id: 'buttonblue',
            x: 0,
            y: 250,
            width: 25,
            height: 25,
            pic: imageObj['blue'].src,
            onrelease: function () {
                console.warn(1);
            }
        });
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

        var thisOpacity = 0.7;

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
        imageObj['back'] = new Image();
        imageObj['back'].src = 'pics/back.png';
        imageObj['eat'] = new Image();
        imageObj['eat'].src = 'pics/eat.png';
        imageObj['empty'] = new Image();
        imageObj['empty'].src = 'pics/empty.png';
        imageObj['lie'] = new Image();
        imageObj['lie'].src = 'pics/lie.png';
        imageObj['pee'] = new Image();
        imageObj['pee'].src = 'pics/pee.png';
        imageObj['sit'] = new Image();
        imageObj['sit'].src = 'pics/sit.png';
        imageObj['stand'] = new Image();
        imageObj['stand'].src = 'pics/stand.png';

        imageObj['blue'] = new Image();
        imageObj['blue'].src = 'pics/blue.jpg';
        imageObj['gray'] = new Image();
        imageObj['gray'].src = 'pics/gray.png';
        imageObj['green'] = new Image();
        imageObj['green'].src = 'pics/green.jpg';
        imageObj['orange'] = new Image();
        imageObj['orange'].src = 'pics/orange.jpg';
        imageObj['red'] = new Image();
        imageObj['red'].src = 'pics/red.jpg';
        imageObj['white'] = new Image();
        imageObj['white'].src = 'pics/white.jpg';
        imageObj['yellow'] = new Image();
        imageObj['yellow'].src = 'pics/yellow.jpg';

        imageObj['background'] = new Image();
        imageObj['background'].src = 'pics/galaxysmall.jpg';
    }
    preloadResources();

    window.addEventListener('load', booting, false);
})();
