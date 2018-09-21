var randomButton = document.getElementById("random-button")
randomButton.addEventListener("click", updatePaletteColors);

var clearButton = document.getElementById("clear-button")
clearButton.addEventListener("click", clear);

function updatePaletteColors() {

    var color1 = document.getElementById("color1");
    color1.style.backgroundColor = generateRules();
    console.log(rgb2hex(color1.style.backgroundColor));

    var color2 = document.getElementById("color2");
    color2.style.backgroundColor = generateRules();
    console.log(rgb2hex(color2.style.backgroundColor));

    var color3 = document.getElementById("color3");
    color3.style.backgroundColor = generateRules();
    console.log(rgb2hex(color3.style.backgroundColor));

    var color4 = document.getElementById("color4");
    color4.style.backgroundColor = generateRules();
    console.log(rgb2hex(color4.style.backgroundColor));

    var color5 = document.getElementById("color5");
    color5.style.backgroundColor = generateRules();
    console.log(rgb2hex(color5.style.backgroundColor));

    // update css rules

    var color =  '.website-background{ color: '+rgb2hex(color1.style.backgroundColor).toUpperCase()+';}\n\n';
    var text =  '.element-text{ color: '+rgb2hex(color2.style.backgroundColor).toUpperCase()+';}\n\n';
    var border =  '.element-border{ color: '+rgb2hex(color3.style.backgroundColor).toUpperCase()+';}\n\n';
    var background = '.element-background{ background-color: '+rgb2hex(color4.style.backgroundColor).toUpperCase()+';}\n\n';
    var header = '.header{ header: '+rgb2hex(color5.style.backgroundColor).toUpperCase()+';}\n\n';

    document.getElementById('css-rules').value = '\n'+ color + text + border + background + header
}

function clear() {
    var color1 = document.getElementById("color1");
    color1.style.backgroundColor = "white";

    var color2 = document.getElementById("color2");
    color2.style.backgroundColor = "white";

    var color3 = document.getElementById("color3");
    color3.style.backgroundColor = "white";

    var color4 = document.getElementById("color4");
    color4.style.backgroundColor = "white";

    var color5 = document.getElementById("color5");
    color5.style.backgroundColor = "white";

    var color =  '.website-background{ color: #FFFFFF;}\n\n';
    var text =  '.element-text{ color: #FFFFFF;}\n\n';
    var border =  '.element-border{ color: #FFFFFF;}\n\n';
    var background = '.element-background{ background-color: #FFFFFF;}\n\n';
    var header = '.header{ header: #FFFFFF;}\n\n';

    document.getElementById('css-rules').value = '\n'+ color + text + border + background + header
}

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + convertToHex(rgb[1]) + convertToHex(rgb[2]) + convertToHex(rgb[3]);
}

function randomNumber(){
    return (Math.floor((Math.random() * 255) + 1)) / 255;
}

function generateRules(){
    let randomHsl = rgbToHsl(randomNumber(), randomNumber(), randomNumber());
    randomHsl[0] = (randomHsl[0] + 0.5) % 1;
    randomHsl[1] = (randomHsl[1] + 0.5) % 1;
    randomHsl[2] = (randomHsl[2] + 0.5) % 1;

    return 'hsl('+(randomHsl[0]*360)+','+(randomHsl[1]*100)+'%, '+(randomHsl[2]*100)+'%)';
}

function convertToHex(value){
    var hex = Number(value).toString(16);
    if (hex.length === 1) {
        hex = '0' + hex;
    }

    return hex;
}

function createRandomColor() {
    let red = randomNumber();
    let green = randomNumber();
    let blue = randomNumber();

    return '#' + convertToHex(red) + convertToHex(green) + convertToHex(blue);
}

//CODE from: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v){
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}
