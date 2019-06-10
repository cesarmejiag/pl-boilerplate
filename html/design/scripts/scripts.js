define("script-2", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var sum = function (x, y) { return (x + y); };
    var mult = function (x, y) { return (x * y); };
    function greetings() {
        console.log('Hello World!');
    }
    exports.greetings = greetings;
});
define("scripts", ["require", "exports", "script-2"], function (require, exports, script_2_1) {
    "use strict";
    exports.__esModule = true;
    script_2_1.greetings();
});
