﻿var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        /**
        * Kiwi - Animation - Tweens
        * @module Animation
        * @submodule Tweens
        * @main Tweens
        */
        (function (Tweens) {
            /**
            * Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
            * https://github.com/sole/tween.js
            *
            * @class Manager
            *
            * @author     sole / http://soledadpenades.com
            * @author     mrdoob / http://mrdoob.com
            * @author     Robert Eisele / http://www.xarg.org
            * @author     Philippe / http://philippe.elsass.me
            * @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
            * @author     Paul Lewis / http://www.aerotwist.com/
            * @author     lechecacharro
            * @author     Josh Faul / http://jocafa.com/
            * @author     egraether / http://egraether.com/
            *
            */
            var Manager = (function () {
                /**
                *
                * @constructor
                * @param {Kiwi.Game} game
                * @return {Kiwi.Tweens.Manager}
                **/
                function Manager(game) {
                    this._game = game;
                    this._tweens = [];
                }
                Manager.prototype.objType = function () {
                    return "Manager";
                };

                /**
                *
                * @method getAll
                **/
                Manager.prototype.getAll = function () {
                    return this._tweens;
                };

                /**
                *
                * @method removeAll
                **/
                Manager.prototype.removeAll = function () {
                    this._tweens.length = 0;
                };

                /**
                *
                * @method create
                * @param {Any} object
                * @return {Kiwi.Tween}
                **/
                Manager.prototype.create = function (object) {
                    return new Kiwi.Animation.Tween(object, this._game);
                };

                /**
                *
                * @method add
                * @param {Kiwi.Tween} tween
                **/
                Manager.prototype.add = function (tween) {
                    tween.setParent(this._game);

                    this._tweens.push(tween);

                    return tween;
                };

                /**
                *
                * @method remove
                * @param {Kiwi.Tween} tween
                **/
                Manager.prototype.remove = function (tween) {
                    var i = this._tweens.indexOf(tween);

                    if (i !== -1) {
                        this._tweens.splice(i, 1);
                    }
                };

                /**
                *
                * @method update
                **/
                Manager.prototype.update = function () {
                    if (this._tweens.length === 0) {
                        return false;
                    }

                    //  See if we can merge the length into the while block
                    var i = 0;
                    var numTweens = this._tweens.length;

                    while (i < numTweens) {
                        if (this._tweens[i].update(this._game.time.now())) {
                            i++;
                        } else {
                            this._tweens.splice(i, 1);
                            numTweens--;
                        }
                    }

                    return true;
                };
                return Manager;
            })();
            Tweens.Manager = Manager;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Back
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Back = (function () {
                    function Back() {
                    }
                    Back.prototype.objType = function () {
                        return "Back";
                    };

                    Back.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        var s = 1.70158;
                        return k * k * ((s + 1) * k - s);
                    };

                    Back.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        var s = 1.70158;
                        return --k * k * ((s + 1) * k + s) + 1;
                    };

                    Back.InOut = /**
                    * InOut
                    * @method
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        var s = 1.70158 * 1.525;
                        if ((k *= 2) < 1)
                            return 0.5 * (k * k * ((s + 1) * k - s));
                        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
                    };
                    return Back;
                })();
                Easing.Back = Back;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Bounce
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Bounce = (function () {
                    function Bounce() {
                    }
                    Bounce.prototype.objType = function () {
                        return "Bounce";
                    };

                    Bounce.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return 1 - Kiwi.Animation.Tweens.Easing.Bounce.Out(1 - k);
                    };

                    Bounce.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if (k < (1 / 2.75)) {
                            return 7.5625 * k * k;
                        } else if (k < (2 / 2.75)) {
                            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                        } else if (k < (2.5 / 2.75)) {
                            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                        } else {
                            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                        }
                    };

                    Bounce.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if (k < 0.5)
                            return Kiwi.Animation.Tweens.Easing.Bounce.In(k * 2) * 0.5;
                        return Kiwi.Animation.Tweens.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                    };
                    return Bounce;
                })();
                Easing.Bounce = Bounce;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Circular
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Circular = (function () {
                    function Circular() {
                    }
                    Circular.prototype.objType = function () {
                        return "Circular";
                    };

                    Circular.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return 1 - Math.sqrt(1 - k * k);
                    };

                    Circular.Out = /**
                    * Out
                    * @method
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return Math.sqrt(1 - (--k * k));
                    };

                    Circular.InOut = /**
                    * InOut
                    * @method
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if ((k *= 2) < 1)
                            return -0.5 * (Math.sqrt(1 - k * k) - 1);
                        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
                    };
                    return Circular;
                })();
                Easing.Circular = Circular;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Cubic
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Cubic = (function () {
                    function Cubic() {
                    }
                    Cubic.prototype.objType = function () {
                        return "Cubic";
                    };

                    Cubic.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k * k * k;
                    };

                    Cubic.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return --k * k * k + 1;
                    };

                    Cubic.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k * k;
                        return 0.5 * ((k -= 2) * k * k + 2);
                    };
                    return Cubic;
                })();
                Easing.Cubic = Cubic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Elastic
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Elastic = (function () {
                    function Elastic() {
                    }
                    Elastic.prototype.objType = function () {
                        return "Elastic";
                    };

                    Elastic.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        var s, a = 0.1, p = 0.4;
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else
                            s = p * Math.asin(1 / a) / (2 * Math.PI);
                        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                    };

                    Elastic.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        var s, a = 0.1, p = 0.4;
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else
                            s = p * Math.asin(1 / a) / (2 * Math.PI);
                        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
                    };

                    Elastic.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        var s, a = 0.1, p = 0.4;
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if (!a || a < 1) {
                            a = 1;
                            s = p / 4;
                        } else
                            s = p * Math.asin(1 / a) / (2 * Math.PI);
                        if ((k *= 2) < 1)
                            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
                    };
                    return Elastic;
                })();
                Easing.Elastic = Elastic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Exponential
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Exponential = (function () {
                    function Exponential() {
                    }
                    Exponential.prototype.objType = function () {
                        return "Exponential";
                    };

                    Exponential.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k === 0 ? 0 : Math.pow(1024, k - 1);
                    };

                    Exponential.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
                    };

                    Exponential.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if (k === 0)
                            return 0;
                        if (k === 1)
                            return 1;
                        if ((k *= 2) < 1)
                            return 0.5 * Math.pow(1024, k - 1);
                        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
                    };
                    return Exponential;
                })();
                Easing.Exponential = Exponential;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Linear
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Linear = (function () {
                    function Linear() {
                    }
                    Linear.prototype.objType = function () {
                        return "Linear";
                    };

                    Linear.None = /**
                    *
                    * @method None
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k;
                    };
                    return Linear;
                })();
                Easing.Linear = Linear;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Quadratic
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Quadratic = (function () {
                    function Quadratic() {
                    }
                    Quadratic.prototype.objType = function () {
                        return "Quadratic";
                    };

                    Quadratic.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k * k;
                    };

                    Quadratic.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k * (2 - k);
                    };

                    Quadratic.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k;
                        return -0.5 * (--k * (k - 2) - 1);
                    };
                    return Quadratic;
                })();
                Easing.Quadratic = Quadratic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Quartic
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Quartic = (function () {
                    function Quartic() {
                    }
                    Quartic.prototype.objType = function () {
                        return "Quartic";
                    };

                    Quartic.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k * k * k * k;
                    };

                    Quartic.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return 1 - (--k * k * k * k);
                    };

                    Quartic.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k * k * k;
                        return -0.5 * ((k -= 2) * k * k * k - 2);
                    };
                    return Quartic;
                })();
                Easing.Quartic = Quartic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Quintic
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Quintic = (function () {
                    function Quintic() {
                    }
                    Quintic.prototype.objType = function () {
                        return "Quintic";
                    };

                    Quintic.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return k * k * k * k * k;
                    };

                    Quintic.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return --k * k * k * k * k + 1;
                    };

                    Quintic.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        if ((k *= 2) < 1)
                            return 0.5 * k * k * k * k * k;
                        return 0.5 * ((k -= 2) * k * k * k * k + 2);
                    };
                    return Quintic;
                })();
                Easing.Quintic = Quintic;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Animation) {
        (function (Tweens) {
            /// <reference path="../Manager.ts" />
            /**
            *	Kiwi - Tween - Easing - Sinusoidal
            *
            *	@desc 		Based heavily on tween.js by sole (https://github.com/sole/tween.js)
            *
            *	@version 	1.0 - 11th January 2013
            *
            *	@author 	Richard Davey, TypeScript conversion and Kiwi integration. See Kiwi.Tweens for the full tween.js author list
            *
            *	@url 		http://www.kiwijs.org
            *
            *	@todo
            */
            (function (Easing) {
                var Sinusoidal = (function () {
                    function Sinusoidal() {
                    }
                    Sinusoidal.prototype.objType = function () {
                        return "Sinusoidal";
                    };

                    Sinusoidal.In = /**
                    *
                    * @method In
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return 1 - Math.cos(k * Math.PI / 2);
                    };

                    Sinusoidal.Out = /**
                    *
                    * @method Out
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return Math.sin(k * Math.PI / 2);
                    };

                    Sinusoidal.InOut = /**
                    *
                    * @method InOut
                    * @param {Any} k
                    * @static
                    **/
                    function (k) {
                        return 0.5 * (1 - Math.cos(Math.PI * k));
                    };
                    return Sinusoidal;
                })();
                Easing.Sinusoidal = Sinusoidal;
            })(Tweens.Easing || (Tweens.Easing = {}));
            var Easing = Tweens.Easing;
        })(Animation.Tweens || (Animation.Tweens = {}));
        var Tweens = Animation.Tweens;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Animation - Tweens
    * @module Animation
    * @submodule Tweens
    *
    */
    (function (Animation) {
        /**
        * Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
        * https://github.com/sole/tween.js
        *
        * @class Tween
        *
        * @author     sole / http://soledadpenades.com
        * @author     mrdoob / http://mrdoob.com
        * @author     Robert Eisele / http://www.xarg.org
        * @author     Philippe / http://philippe.elsass.me
        * @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
        * @author     Paul Lewis / http://www.aerotwist.com/
        * @author     lechecacharro
        * @author     Josh Faul / http://jocafa.com/
        * @author     egraether / http://egraether.com/
        *
        */
        var Tween = (function () {
            /**
            *
            * @constructor
            * @param {Any} object
            * @param {Kiwi.Game} game
            * @return {Kiwi.Tween}
            */
            function Tween(object, game) {
                if (typeof game === "undefined") { game = null; }
                /**
                * The game that this tween belongs to.
                * @property _game
                * @type Kiwi.Game
                * @private
                */
                this._game = null;
                /**
                *
                * @property _manager
                * @type Kiwi.Tweens.Manager
                * @private
                */
                this._manager = null;
                /**
                *
                * @property _object
                * @type Any
                * @private
                */
                this._object = null;
                /**
                *
                * @property _valuesStart
                * @type
                * @private
                */
                this._valuesStart = {};
                /**
                *
                * @property _valuesEnd
                * @type
                * @private
                */
                this._valuesEnd = {};
                /**
                *
                * @property _duration
                * @type Number
                * @private
                */
                this._duration = 1000;
                /**
                *
                * @property _delayTime
                * @type Number
                * @private
                */
                this._delayTime = 0;
                /**
                *
                * @property _startTime
                * @type
                * @private
                */
                this._startTime = null;
                /**
                *
                * @property _easingFunction
                * @type Kiwi.Tweens.Easing.Linear.None
                * @private
                */
                this._easingFunction = Kiwi.Animation.Tweens.Easing.Linear.None;
                /**
                *
                * @property _interpolationFunction
                * @type Kiwi.Utils.Interpolation.Linear
                * @private
                */
                this._interpolationFunction = Kiwi.Utils.GameMath.linearInterpolation;
                /**
                *
                * @property _chainedTweens
                * @type Array
                * @private
                */
                this._chainedTweens = [];
                /**
                *
                * @property _onStartCallback
                * @type
                * @private
                */
                this._onStartCallback = null;
                this._onStartContext = null;
                /**
                *
                * @property _onStartCallbackFired
                * @type
                * @private
                */
                this._onStartCallbackFired = false;
                /**
                *
                * @property _onUpdateCallback
                * @type
                * @private
                */
                this._onUpdateCallback = null;
                this._onUpdateContext = null;
                /**
                *
                * @property _onCompleteCallback
                * @type
                * @private
                */
                this._onCompleteCallback = null;
                this._onCompleteCalled = false;
                this.isRunning = false;
                this._object = object;

                if (game !== null) {
                    this._game = game;
                    this._manager = this._game.tweens;
                }

                this.isRunning = false;
            }
            Tween.prototype.objType = function () {
                return "Tween";
            };

            /**
            *
            * @method to
            * @param {Any} properties
            * @param {Number} duration
            * @param {Any} ease
            * @param {Boolean} autoStart
            */
            Tween.prototype.to = function (properties, duration, ease, autoStart) {
                if (typeof duration === "undefined") { duration = 1000; }
                if (typeof ease === "undefined") { ease = null; }
                if (typeof autoStart === "undefined") { autoStart = false; }
                this._duration = duration;

                //  If properties isn't an object this will fail, sanity check it here somehow?
                this._valuesEnd = properties;

                if (ease !== null) {
                    this._easingFunction = ease;
                }

                if (autoStart === true) {
                    return this.start();
                } else {
                    return this;
                }
            };

            /**
            *
            * @method start
            */
            Tween.prototype.start = function () {
                if (this._game === null || this._object === null) {
                    return;
                }

                this.isRunning = true;

                this._manager.add(this);

                this._onStartCallbackFired = false;

                this._startTime = this._game.time.now() + this._delayTime;

                for (var property in this._valuesEnd) {
                    if (this._object[property] === null || !(property in this._object)) {
                        continue;
                    }

                    if (this._valuesEnd[property] instanceof Array) {
                        if (this._valuesEnd[property].length === 0) {
                            continue;
                        }

                        // create a local copy of the Array with the start value at the front
                        this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
                    }

                    if (typeof this._object[property] === 'function') {
                        this._valuesStart[property] = this._object[property]();
                    } else {
                        this._valuesStart[property] = this._object[property];
                    }
                }

                return this;
            };

            /**
            *
            * @method stop
            */
            Tween.prototype.stop = function () {
                if (this._manager !== null) {
                    this._manager.remove(this);
                }

                this.isRunning = false;

                return this;
            };

            /**
            *
            * @method setParent
            * @param {Kiwi.Game} value
            */
            Tween.prototype.setParent = function (value) {
                this._game = value;
                this._manager = this._game.tweens;
            };

            /**
            *
            * @method delay
            * @param {Any} amount
            */
            Tween.prototype.delay = function (amount) {
                this._delayTime = amount;
                return this;
            };

            /**
            *
            * @method easing
            * @param {Any} easing
            */
            Tween.prototype.easing = function (easing) {
                this._easingFunction = easing;
                return this;
            };

            /**
            *
            * @method interpolation
            * @param {Any} interpolation
            */
            Tween.prototype.interpolation = function (interpolation) {
                this._interpolationFunction = interpolation;

                return this;
            };

            /**
            *
            * @method chain
            * @param {Kiwi.Tween} tween
            */
            Tween.prototype.chain = function (tween) {
                this._chainedTweens.push(tween);
                return this;
            };

            /**
            *
            * @method onStart
            * @param {Any} callback
            */
            Tween.prototype.onStart = function (callback, context) {
                this._onStartCallback = callback;
                this._onStartContext = context;
                return this;
            };

            /**
            *
            * @method onUpdate
            * @param {Any} callback
            */
            Tween.prototype.onUpdate = function (callback, context) {
                this._onUpdateCallback = callback;
                this._onUpdateContext = context;
                return this;
            };

            /**
            *
            * @method onComplete
            * @param {Any} callback
            */
            Tween.prototype.onComplete = function (callback, context) {
                this._onCompleteCallback = callback;
                this._onCompleteContext = context;

                return this;
            };

            /**
            *
            * @method update
            * @param {Any} time
            */
            Tween.prototype.update = function (time) {
                if (time < this._startTime) {
                    return true;
                }

                if (this._onStartCallbackFired === false) {
                    if (this._onStartCallback !== null) {
                        this._onStartCallback.call(this._onStartContext, this._object);
                    }

                    this._onStartCallbackFired = true;
                }

                var elapsed = (time - this._startTime) / this._duration;
                elapsed = elapsed > 1 ? 1 : elapsed;

                var value = this._easingFunction(elapsed);

                for (var property in this._valuesStart) {
                    var start = this._valuesStart[property];
                    var end = this._valuesEnd[property];

                    if (end instanceof Array) {
                        this._object[property] = this._interpolationFunction(end, value);
                    } else {
                        if (typeof this._object[property] === 'function') {
                            this._object[property](start + (end - start) * value);
                        } else {
                            this._object[property] = start + (end - start) * value;
                        }
                    }
                }

                if (this._onUpdateCallback !== null) {
                    this._onUpdateCallback.call(this._onUpdateContext, this._object, value);
                }

                if (elapsed == 1) {
                    this.isRunning = false;

                    if (this._onCompleteCallback !== null && this._onCompleteCalled == false) {
                        this._onCompleteCalled = true;
                        this._onCompleteCallback.call(this._onCompleteContext, this._object);
                    }

                    for (var i = 0; i < this._chainedTweens.length; i++) {
                        this._chainedTweens[i].start();
                    }

                    return false;
                }

                return true;
            };
            return Tween;
        })();
        Animation.Tween = Tween;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * My method description.  Like other pieces of your comment blocks,
    * this can span multiple lines.
    *
    * @class Camera
    *
    */
    var Camera = (function () {
        /**
        *
        * @constructor
        * @param {Kiwi.Game} game
        * @param {Number} id
        * @param {String} name
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @return {Kiwi.Camera}
        **/
        function Camera(game, id, name, x, y, width, height) {
            /**
            * if true then the camera will be resized to fit the stage when the stage is resized
            */
            this.fitToStage = true;
            this._game = game;
            this.id = id;
            this.name = name;

            //size could autoresize to fit stage
            this.width = width;
            this.height = height;
            this.transform = new Kiwi.Geom.Transform(x, y);
            this.transform.rotPointX = x + width / 2;
            this.transform.rotPointY = y + height / 2;

            this._game.stage.onResize.add(this._updatedStageSize, this);
            this._game.stage.onResize.add(this._updatedSize, this);
        }
        /**
        * The type of Kiwi.Object this is.
        * @method objType
        * @return {String}
        */
        Camera.prototype.objType = function () {
            return "Camera";
        };

        /**
        *
        * @method _updatedStageSize
        * @param {Number} width
        * @param {Number} height
        **/
        Camera.prototype._updatedStageSize = function (width, height) {
            this.width = width;
            this.height = height;
        };

        /**
        *
        * @method _updatedStageSize
        * @param {Number} width
        * @param {Number} height
        **/
        Camera.prototype._updatedSize = function (width, height) {
            /* this._game.stage.domLayersMask.style.width = width + "px";
            this._game.stage.domLayersMask.style.height = height + "px";
            this._resizeCompositeCanvas();
            for (var i = 0; i < this._game.layers.layers.length; i++) {
            var layer: Kiwi.Layer = this._game.layers.layers[i];
            layer.domContainer.style.width = width + "px";
            layer.domContainer.style.height = height + "px";
            
            
            }
            */
        };

        /**
        * Toggles the visible state of this Camera
        * @method visible
        * @param {Boolean} value
        * @return {Boolean}
        **/
        Camera.prototype.visible = function (value) {
            if (typeof value === "undefined") { value = null; }
            return this._visible;
        };

        /**
        * A value used by components to control if the camera needs re-rendering
        * @method dirty
        * @param {Boolean} value
        * @return {Boolean}
        */
        Camera.prototype.dirty = function (value) {
            if (typeof value === "undefined") { value = null; }
            if (value !== null) {
                this._dirty = value;
            }

            return this._dirty;
        };

        Camera.prototype.update = function () {
            //this.components.update();
        };

        Camera.prototype.render = function () {
            this._game.renderer.render(this);
        };
        return Camera;
    })();
    Kiwi.Camera = Camera;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * [REQUIRES DESCRIPTION]
    * @class CameraManager
    */
    var CameraManager = (function () {
        /**
        * [REQUIRES DESCRIPTION]
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.CameraManager}
        */
        function CameraManager(game) {
            this._game = game;
            this._cameras = [];
            this._nextCameraID = 0;
        }
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        */
        CameraManager.prototype.objType = function () {
            return "CameraManager";
        };

        /**
        * Initializes the CameraManager, creates a new camera and assigns it to the defaultCamera
        * @method boot
        */
        CameraManager.prototype.boot = function () {
            this.create("defaultCamera", 0, 0, this._game.stage.width, this._game.stage.height);
            this.defaultCamera = this._cameras[0];
        };

        /**
        * Creates a new Camera and adds it to the collection of cameras.
        * @param {String} name. The name of the new camera.
        * @param {Number} x. The x position of the new camera.
        * @param {Number} y. The y position of the new camera.
        * @param {Number} width. The width of the new camera.
        * @param {Number} height. The height of the new camera.
        * @return {Kiwi.Camera} The new camera object.
        */
        CameraManager.prototype.create = function (name, x, y, width, height) {
            var newCamera = new Kiwi.Camera(this._game, this._nextCameraID++, name, x, y, width, height);

            //newCamera.parent = state;
            this._cameras.push(newCamera);

            return newCamera;
        };

        /**
        * Removes the given camera, if it is present in the camera managers camera collection.
        * @method remove
        * @param {Kiwi.Camera} camera
        * @return {Boolean} True if the camera was removed, false otherwise.
        */
        CameraManager.prototype.remove = function (camera) {
            var i = this._cameras.indexOf(camera);

            if (i !== -1) {
                //  Send Layer a killed call
                this._cameras.splice(i, 1);
                return true;
            }

            return false;
        };

        /**
        * Calls update on all the cameras.
        * @method update
        */
        CameraManager.prototype.update = function () {
            if (this._cameras.length === 0) {
                return false;
            }

            for (var i = 0; i < this._cameras.length; i++) {
                this._cameras[i].update();
            }
        };

        /**
        * Calls the render method on all the cameras
        * @method render
        */
        CameraManager.prototype.render = function () {
            if (this._cameras.length === 0) {
                return false;
            }

            for (var i = 0; i < this._cameras.length; i++) {
                //render each layer
                //this._game.layers.render(this._cameras[i]);
                this._cameras[i].render();
            }
        };

        /**
        * Removes all cameras in the camera Manager except the default camera. Does nothing if in multi camera mode.
        * @method removeAll - note should not remove default
        */
        CameraManager.prototype.removeAll = function () {
            this._cameras.length = 0;
        };
        return CameraManager;
    })();
    Kiwi.CameraManager = CameraManager;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * The component base class.
    *
    * @class Component
    */
    var Component = (function () {
        /**
        * [REQUIRES DESCRIPTION]
        * @constructor
        * @param {string} componentName - The name of this component.
        * @return {Kiwi.Component}
        */
        function Component(owner, name) {
            /**
            * An active Component is one that has its update method called by its parent.
            * @property active
            * @type Boolean
            **/
            this.active = true;
            /**
            * The state of this component. DEPRECATED so we can use signals instead, but left in case is needed elsewhere
            * @property dirty
            * @type boolean
            **/
            this.dirty = false;
            this.owner = owner;
            this.game = this.owner.game;
            this.name = name;
            this.active = true;
        }
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        */
        Component.prototype.objType = function () {
            return "Component";
        };

        /**
        * Components can preUpdate, that is update before the parent updates
        * @method preUpdate
        */
        Component.prototype.preUpdate = function () {
        };

        /**
        * If the component is being added to a State rather than a Game Object then over-ride its update method to perform required tasks.
        * @method update
        */
        Component.prototype.update = function () {
        };

        /**
        * Components can postUpdate, that is run an update after the parent has updated
        * @method postUpdate
        */
        Component.prototype.postUpdate = function () {
        };

        /**
        * Destroys this component
        * @method destroy
        */
        Component.prototype.destroy = function () {
            this.active = false;
            delete this.game;
            delete this.owner;

            this.name = '';
        };
        return Component;
    })();
    Kiwi.Component = Component;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    *
    * [REQUIRES DESCRIPTION]
    * @class ComponentManager
    *
    */
    var ComponentManager = (function () {
        /**
        * [REQUIRES DESCRIPTION]
        * @constructor
        * @param {number} type
        * @param {any} owner
        * @return {Kiwi.ComponentManager}
        */
        function ComponentManager(type, owner) {
            this._components = {};

            this._type = type;
            this._owner = owner;
        }
        /**
        * Returns the type of this object
        * @method objType
        * @return {string} The type of this object
        */
        ComponentManager.prototype.objType = function () {
            return "ComponentManager";
        };

        /**
        * Returns true if this contains the component given, false otherwise.
        * @method hasComponent
        * @param {String} the name of the component
        * @return {Boolean} True if this component manager contains the given component, false otherwise.
        **/
        ComponentManager.prototype.hasComponent = function (value) {
            if (this._components[value]) {
                return true;
            }

            return false;
        };

        /**
        * Returns true if this contains the component given and the component is active, false otherwise.
        * @method hasActiveComponent
        * @param {String} The name of the component.
        * @return {Boolean} true if this manager contains the component and it is active, false otherwise.
        **/
        ComponentManager.prototype.hasActiveComponent = function (value) {
            if (this._components[value] && this._components[value].active === true) {
                return true;
            }

            return false;
        };

        /**
        * Get an existing component that has been added to the layer by its name
        * @method getComponent
        * @param {String} name - The component name
        * @return {Kiwi.Component} The component, if found, otherwise null
        **/
        ComponentManager.prototype.getComponent = function (value) {
            if (this._components[value]) {
                return this._components[value];
            }

            return null;
        };

        /**
        * Adds a Component to the manager.
        * @method addComponent
        * @param {Kiwi.Component} component - The component to add
        * @return {Kiwi.Component} The component that was added
        **/
        ComponentManager.prototype.add = function (component) {
            this._components[component.name] = component;

            return component;
        };

        /**
        * [REQUIRES DESCRIPTION]
        * [ZACH QUESTION]
        * Adds a Component to the manager.
        * @method addBatch
        * @param {}
        **/
        ComponentManager.prototype.addBatch = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
            for (var i = 0; i < paramsArr.length; i++) {
                this.add(paramsArr[i]);
            }
        };

        /**
        * Removes a component
        * @method removeComponent
        * @param {Kiwi.Component} component - The component to be removed
        * @param {Boolean} destroy - Set to true (default) to call destroy on the component before removing it
        * @return {Boolean} true if the component was removed successfully
        **/
        ComponentManager.prototype.removeComponent = function (component, destroy) {
            if (typeof destroy === "undefined") { destroy = true; }
            var name = component.name;

            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }

                delete this._components[name];

                return true;
            }

            return false;
        };

        /**
        * Removes a component based on its name
        * @method removeComponentByName
        * @param {String} name - The name of the component to be removed
        * @param {Boolean} destroy - Set to true (default) to call destroy on the component before removing it
        * @return {Boolean} true if the component was removed successfully
        **/
        ComponentManager.prototype.removeComponentByName = function (name, destroy) {
            if (typeof destroy === "undefined") { destroy = true; }
            if (this._components[name]) {
                if (destroy) {
                    this._components[name].destroy();
                }

                delete this._components[name];

                return true;
            }

            return false;
        };

        /*
        * Removes all of the components from the component manager.
        * @method removeAll
        * @param {Boolean} destroy - if true will destroy all components
        */
        ComponentManager.prototype.removeAll = function (destroy) {
            if (typeof destroy === "undefined") { destroy = true; }
            for (var key in this._components) {
                this.removeComponent(this._components[key], destroy);
            }
        };

        /**
        * Calls preUpdate on all active Components
        * @method preUpdate
        */
        ComponentManager.prototype.preUpdate = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].preUpdate();
                }
            }
        };

        /**
        * Calls update on all active Components
        * @method update
        */
        ComponentManager.prototype.update = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].update();
                }
            }
        };

        /**
        * Calls postUpdate on all active Components
        * @method postUpdate
        */
        ComponentManager.prototype.postUpdate = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].postUpdate();
                }
            }
        };

        /**
        * Calls preRender on all active Components
        * @method preRender
        */
        ComponentManager.prototype.preRender = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].preRender();
                }
            }
        };

        /**
        * Renders all active Components
        * @method render
        */
        ComponentManager.prototype.render = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].render();
                }
            }
        };

        /**
        * Calls postRender on all active Components
        * @method postRender
        */
        ComponentManager.prototype.postRender = function () {
            for (var name in this._components) {
                if (this._components[name].active) {
                    this._components[name].postRender();
                }
            }
        };
        return ComponentManager;
    })();
    Kiwi.ComponentManager = ComponentManager;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * Serves as a container for game objects.
    * Each Entity has a unique ID (UID) which is automatically generated upon instantiation.
    *
    * @class Entity
    *
    */
    var Entity = (function () {
        /**
        *
        * @constructor
        * @param {Kiwi.State} state
        * @param {Number} x
        * @param {Number} y
        * @return {Kiwi.Entity}
        */
        function Entity(state, x, y) {
            /*
            * The group that this entity belongs to. If added onto the state then this is the state.
            * @property _parent
            * @type Kiwi.Group
            * @private
            */
            this._parent = null;
            /*
            * The actual alpha of this entity.
            * @property _alpha
            * @type Number
            * @private
            */
            this._alpha = 1;
            /*
            * A boolean that indicates weither or not this entity is visible or not. Note that is does not get set to false if the alpha is 0.
            * @property _visible
            * @type bool
            * @private
            */
            this._visible = true;
            /*
            * The width of the entity in pixels.
            * @property width
            * @type number
            */
            this.width = 0;
            /*
            * The height of the entity in pixels.
            * @property height
            * @type number
            */
            this.height = 0;
            /*
            * Used as a reference to a single Cell in the atlas that is to be rendered.
            * E.g. If you had a spritesheet with 3 frames/cells and you wanted the second frame to be displayed you would change this value to 1
            * @property cellIndex
            * @type number
            */
            this.cellIndex = 0;
            /**
            * A name for this Entity. This is not checked for uniqueness within the Game, but is very useful for debugging
            * @property name
            * @type string
            */
            this.name = '';
            /**
            * If an Entity no longer exists it is cleared for garbage collection or pool re-allocation
            * @property exists
            * @type Boolean
            * @private
            **/
            this._clock = null;
            //  Properties
            this.state = state;
            this.game = state.game;
            this.id = this.game.rnd.uuid();
            this.state.addToTrackingList(this);
            this._clock = this.game.time.clock;

            this._exists = true;
            this._active = true;
            this._willRender = true;
            this.components = new Kiwi.ComponentManager(Kiwi.ENTITY, this);
            this.transform = new Kiwi.Geom.Transform();
            this.transform.x = x;
            this.transform.y = y;
        }

        Object.defineProperty(Entity.prototype, "parent", {
            get: /*
            * [REQUIRES DESCRIPTION]
            * Returns the group that this entity belongs to.
            * @type Kiwi.Group
            * @return {Kiwi.Group}
            */
            function () {
                return this._parent;
            },
            set: /*
            * Set's the parent of this entity. Note that this also sets the transforms parent of this entity to be the passed groups transform.
            * @type Kiwi.Group
            * @param {Kiwi.Group} val
            */
            function (val) {
                this.transform.parent = (val !== null) ? val.transform : null;
                this._parent = val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "x", {
            get: /*
            * X coordinate of this Entity. This is just aliased to the transform property.
            * property x
            * @type Number
            */
            function () {
                return this.transform.x;
            },
            set: function (value) {
                this.transform.x = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "y", {
            get: /*
            * Y coordinate of this Entity. This is just aliased to the transform property.
            * @property y
            * @type Number
            */
            function () {
                return this.transform.y;
            },
            set: function (value) {
                this.transform.y = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "scaleX", {
            get: /*
            * Scale X of this Entity. This is just aliased to the transform property.
            * @property scaleX
            * @type Number
            */
            function () {
                return this.transform.scaleX;
            },
            set: function (value) {
                this.transform.scaleX = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "scaleY", {
            get: /*
            * Scale Y coordinate of this Entity. This is just aliased to the transform property.
            * @property scaleY
            * @type Number
            */
            function () {
                return this.transform.scaleY;
            },
            set: function (value) {
                this.transform.scaleY = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Entity.prototype, "rotation", {
            get: /*
            * Rotation of this Entity. This is just aliased to the transform property.
            * @property rotation
            * @type Number
            */
            function () {
                return this.transform.rotation;
            },
            set: function (value) {
                this.transform.rotation = value;
            },
            enumerable: true,
            configurable: true
        });

        /*
        * Returns the type of child that this is.
        * @type Number
        * @return {Number} returns the type of child that the entity is
        */
        Entity.prototype.childType = function () {
            return Kiwi.ENTITY;
        };


        Object.defineProperty(Entity.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: /*
            * Alpha of this entity. A number between 0 (invisible) and 1 (completely visible).
            * @property alpha
            * @type Number
            */
            function (value) {
                if (value <= 0)
                    value = 0;
                if (value > 1)
                    value = 1;
                this._alpha = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "visiblity", {
            get: function () {
                return this._visible;
            },
            set: /*
            * Set the visiblity of this entity. True or False.
            * @property visibility
            * @type bool
            */
            function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "exists", {
            get: function () {
                return this._exists;
            },
            set: /**
            * Toggles the existence of this Entity. An Entity that no longer exists can be garbage collected or re-allocated in a pool
            * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
            * @property exists
            * @type Boolean
            **/
            function (value) {
                this._exists = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: /**
            * Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
            * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
            * @property active
            * @type Boolean
            **/
            function (value) {
                this._active = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "willRender", {
            get: function () {
                return this._willRender;
            },
            set: /**
            * Toggles if this Entity will be rendered by a canvas layer. Use the visibile component for DOM layers.
            * @property willRender
            * @type Boolean
            **/
            function (value) {
                this._willRender = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "inputEnabled", {
            get: function () {
                return this._inputEnabled;
            },
            set: /**
            * Controls if this Entity is input enabled or not (i.e. responds to touch/mouse events)
            * This method should be over-ridden to handle specific game object implementations.
            * @property inputEnabled
            * @type Boolean
            **/
            function (value) {
                this._inputEnabled = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "clock", {
            get: function () {
                return this._clock;
            },
            set: /**
            * The Clock used to update this all of this Entities components (defaults to the Game MasterClock)
            * @property clock
            * @type Boolean
            **/
            function (value) {
                this._clock = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Entity.prototype, "dirty", {
            get: function () {
                return this._dirty;
            },
            set: /**
            * A value used by components to control if the Entity needs re-rendering
            * @property dirty
            * @type Boolean
            */
            function (value) {
                this._dirty = value;
            },
            enumerable: true,
            configurable: true
        });

        //  Both of these methods can and often should be over-ridden by classes extending Entity to handle specific implementations
        /*
        * The type of this object.
        * @method objType
        * @return {String} The type of the object
        */
        Entity.prototype.objType = function () {
            return "Entity";
        };

        /**
        * This isn't called until the Entity has been added to a Group or a State
        * @method update
        */
        Entity.prototype.update = function () {
        };

        /**
        * This isn't called until the Entity has been added to a layer.
        * This functionality is handled by the sub classes.
        * @method render
        * @param {Kiwi.Camera} camera
        */
        Entity.prototype.render = function (camera) {
        };

        /**
        * Used to completely destroy this objects all objects inside of it. Used to make set it up for garbage collection.
        * @method destroy
        */
        Entity.prototype.destroy = function () {
            this.state.removeFromTrackingList(this);
            this._exists = false;
            this._active = false;
            this._willRender = false;
            delete this._parent;
            delete this.transform;
            delete this._clock;
            delete this.state;
            delete this.game;
            delete this.atlas;

            if (this.components)
                this.components.removeAll(true);
            delete this.components;
        };
        return Entity;
    })();
    Kiwi.Entity = Entity;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * My method description.  Like other pieces of your comment blocks,
    * this can span multiple lines.
    *
    * @class Game
    *
    */
    var Game = (function () {
        /**
        * [REQUIRES DESCRIPTION]
        * @constructor
        * @param {String} domParent
        * @param {String} name
        * @param {Any} state
        * @param {Object} options
        * @return {Kiwi.Game}
        */
        function Game(domParent, name, state, options) {
            if (typeof domParent === "undefined") { domParent = ''; }
            if (typeof name === "undefined") { name = 'KiwiGame'; }
            if (typeof state === "undefined") { state = null; }
            var _this = this;
            /**
            * [REQUIRES DESCRIPTION]
            * @property _dom
            * @type Kiwi.DOM.Bootstrap
            * @private
            */
            this._startup = null;
            /**
            * The audio manager that handles all of the audio in game. Inside you can globally mute the audio, create new sounds, e.t.c.
            * @property audio
            * @type Kiwi.Audio.AudioManager
            */
            this.audio = null;
            /**
            * Used to get the coordinates of any DOM element on the game.
            * @property browser
            * @type Kiwi.Dom.Browser
            */
            this.browser = null;
            /**
            * The global file store for this game. This handles the storage and access of information loaded, as well as tags that maybe set for them individual files.
            * @property fileStore
            * @type Kiwi.Files.FileStore
            */
            this.fileStore = null;
            /**
            * Handles any user input with the game. These could via the users keyboard, mouse or touch events.
            * @property input
            * @type Kiwi.Input.Manager
            */
            this.input = null;
            /**
            * Manages the cameras the are on the stage. This is still to be implemented.
            * @property cameras
            * @type Kiwi.CameraManager
            */
            this.cameras = null;
            /**
            * Loads files from outside sources and checks to see that they have loaded correctly or not.
            * @property loader
            * @type Kiwi.Loader
            */
            this.loader = null;
            /**
            * The Request Animation Frame that is being used for the update and render loops.
            * @property raf
            * @type Kiwi.Utils.RequestAnimationFrame
            */
            this.raf = null;
            /**
            * The ONLY stage that is being used for this game.
            * @property stage
            * @type Kiwi.Stage
            */
            this.stage = null;
            /**
            * Manages all of the states that exist for this game. Via the manager you can create new states, switch states and do various other tasks.
            * @property states
            * @type Kiwi.StateManager
            */
            this.states = null;
            /**
            * Holds a reference to the clocks that are being used and has a MASTER clock that is being used for the game.
            * @property time
            * @type Kiwi.Time.Manager
            */
            this.time = null;
            /**
            * The tween manager holds a reference to all of the tweens that are created and currently being used.
            * @property tweens
            * @type Kiwi.Tweens.Manager
            */
            this.tweens = null;
            /**
            * A Random Data Generator. This is useful for create unique ids and random information.
            * @property rnd
            * @type Kiwi.Utils.RandomDataGenerator
            */
            this.rnd = null;
            /**
            * The framerate at which the game will update at.
            * @property _framerate
            * @type Number
            */
            this._frameRate = 60;
            /**
            * The interval between frames.
            * @property _interval
            * @type Number
            * @private
            */
            this._interval = 1000 / 60;
            /**
            * The current interval between frames.
            * @property _delta
            * @type number
            */
            this._delta = 0;
            //set options
            options = options || {};
            this._debugOption = options.debug || Kiwi.DEBUG_ON;
            this._deviceTargetOption = options.deviceTarget || Kiwi.TARGET_BROWSER;
            this._renderOption = options.renderer || Kiwi.RENDERER_CANVAS;

            this.id = Kiwi.GameManager.register(this);

            this._startup = new Kiwi.System.Bootstrap();

            this.audio = new Kiwi.Sound.AudioManager(this);
            this.browser = new Kiwi.System.Browser(this);

            this.fileStore = new Kiwi.Files.FileStore(this);
            this.input = new Kiwi.Input.Manager(this);

            this.stage = new Kiwi.Stage(this, name);

            if (this._renderOption === Kiwi.RENDERER_CANVAS) {
                this.renderer = new Kiwi.Renderers.CanvasRenderer(this);
            } else {
                this.renderer = new Kiwi.Renderers.GLRenderer(this);
            }

            this.cameras = new Kiwi.CameraManager(this);
            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.huds = new Kiwi.HUD.HUDManager(this);
            }
            this.loader = new Kiwi.Files.Loader(this);

            this.states = new Kiwi.StateManager(this);
            this.rnd = new Kiwi.Utils.RandomDataGenerator([Date.now.toString()]);
            this.time = new Kiwi.Time.Manager(this);
            this.tweens = new Kiwi.Animation.Tweens.Manager(this);

            if (state !== null) {
                if (this.states.addState(state, true) === false) {
                    throw Error("Invalid State passed to Kiwi.Game");
                }
            }

            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                //  Wait for the DOM
                this._startup.boot(domParent, function () {
                    return _this.start();
                });
            } else {
                this.start();
            }
        }
        Object.defineProperty(Game.prototype, "renderOption", {
            get: /**
            * Returns the render mode of the game. This is READ ONLY and is decided once the game gets initialised.
            * @property renderOption
            * @type number
            */
            function () {
                return this._renderOption;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Game.prototype, "deviceTargetOption", {
            get: /**
            * Returns the device target option for the game. This is READ ONLY and is decided once the game gets initialised.
            * @property deviceTargetOption
            * @type number
            */
            function () {
                return this._deviceTargetOption;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Game.prototype, "debugOption", {
            get: /**
            * Returns the debug option. This is READ ONLY and is decided once the game gets initialised.
            * @property debugOption
            * @type number
            */
            function () {
                return this._debugOption;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * The type of object that the game is.
        * @method objType
        * @return {String} The type of object
        */
        Game.prototype.objType = function () {
            return "Game";
        };

        Object.defineProperty(Game.prototype, "frameRate", {
            get: /**
            * Returns the current frameRate that the update/render loops are running at. Note that this may  ot be a  accurate representation.
            * @property frameRate
            * @return string
            */
            function () {
                return this._frameRate;
            },
            set: function (value) {
                if (value > 60)
                    value = 60;

                if (value >= 0) {
                    this._frameRate = value;
                    this._interval = 1000 / this._frameRate;
                }
            },
            enumerable: true,
            configurable: true
        });

        /**
        * The start method gets executed when the game is ready to be booted, and handles the start-up of the managers.
        * Once the managers have started up the start loop will then begin to create the game loop.
        * @method start
        */
        Game.prototype.start = function () {
            var _this = this;
            if (Kiwi.DEVICE === null) {
                Kiwi.DEVICE = new Kiwi.System.Device();
            }

            this.browser.boot();
            this.stage.boot(this._startup);
            this.renderer.boot();
            this.cameras.boot();
            if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.huds.boot();
            }
            this.time.boot();
            this.audio.boot();
            this.input.boot();

            this.fileStore.boot();
            this.loader.boot();
            this.states.boot();

            this._lastTime = Date.now();

            this.raf = new Kiwi.Utils.RequestAnimationFrame(function () {
                return _this.loop();
            });
            this.raf.start();
        };

        /**
        * The loop that the whole game is using.
        * @method loop
        */
        Game.prototype.loop = function () {
            this._delta = this.raf.currentTime - this._lastTime;

            if (this._delta > this._interval) {
                this.time.update();
                this.audio.update();
                this.input.update();
                this.tweens.update();
                this.cameras.update();
                if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this.huds.update();
                }
                this.states.update();

                this.cameras.render();
                if (this.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this.huds.render();
                }
                this.states.postRender();

                this._lastTime = this.raf.currentTime - (this._delta % this._interval);
            }
        };
        return Game;
    })();
    Kiwi.Game = Game;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    *[REQUIRES DESCRIPTION]
    *
    * @class Group
    *
    */
    var Group = (function () {
        /*
        * [REQUIRES DESCRIPTION]
        * @constructor
        * @param {Kiwi.State} state
        * @param {String} name
        * @return {Kiwi.Group}
        */
        function Group(state, name) {
            if (typeof name === "undefined") { name = ''; }
            /**
            * A name for this Group. This is not checked for uniqueness within the Game, but is very useful for debugging
            * @property name
            * @type string
            */
            this.name = '';
            /*
            * The parent group of this group.
            * @property _parent
            * @type Kiwi.IChild
            * @private
            */
            this._parent = null;
            /**
            * The game this Group belongs to
            * @property game
            * @type Game
            */
            this.game = null;
            /**
            * The State that this Group belongs to
            * @property state
            * @type Kiwi.State
            **/
            this.state = null;
            /*
            * An indication of weither or not this group is 'dirty' and thus needs to be re-rendered or not.
            * @property _dirty
            * @type bool
            * @private
            */
            this._dirty = true;
            if (state !== null) {
                this.state = state;
                this.game = this.state.game;
                this.id = this.game.rnd.uuid();
                this.state.addToTrackingList(this);
            }

            //  Properties
            this.name = name;
            this.components = new Kiwi.ComponentManager(Kiwi.GROUP, this);

            this._exists = true;
            this._active = true;
            this._willRender = true;

            this.transform = new Kiwi.Geom.Transform();

            this.members = [];

            //  Signals
            this._willRender = true;
        }
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        */
        Group.prototype.objType = function () {
            return 'Group';
        };

        /*
        * Represents the type of child that this is. Note: A 'CHILD' is any object that extends from ICHILD.
        * @method childType
        * @return number
        */
        Group.prototype.childType = function () {
            return Kiwi.GROUP;
        };

        Object.defineProperty(Group.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: /*
            * Set's the parent of this entity. Note that this also sets the transforms parent of this entity to be the passed groups transform.
            * @property parent
            * @type Kiwi.Group
            */
            function (val) {
                //check to see if the parent is not an descendor
                //if (this.containsDescendant(val) === false) {
                this.transform.parent = (val !== null) ? val.transform : null;
                this._parent = val;
                //}
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Group.prototype, "x", {
            get: /*
            * The X coordinate of this group. This is just aliased to the transform property.
            * @property x
            * @type Number
            */
            function () {
                return this.transform.x;
            },
            set: function (value) {
                this.transform.x = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Group.prototype, "y", {
            get: /*
            * The Y coordinate of this group. This is just aliased to the transform property.
            * @property
            * @type Number
            */
            function () {
                return this.transform.y;
            },
            set: function (value) {
                this.transform.y = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Group.prototype, "scaleX", {
            get: /*
            * The Scale X of this group. This is just aliased to the transform property.
            * @property scaleX
            * @type Number
            */
            function () {
                return this.transform.scaleX;
            },
            set: function (value) {
                this.transform.scaleX = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Group.prototype, "scaleY", {
            get: /*
            * The Scale Y coordinate of this group. This is just aliased to the transform property.
            * @property scaleY
            * @type Number
            */
            function () {
                return this.transform.scaleY;
            },
            set: function (value) {
                this.transform.scaleY = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Group.prototype, "rotation", {
            get: /*
            * The rotation of this group. This is just aliased to the transform property.
            * @property rotation
            * @type Number
            */
            function () {
                return this.transform.rotation;
            },
            set: function (value) {
                this.transform.rotation = value;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the total number of children in this Group. Doesn't distinguish between alive and dead children.
        * @method numChildren
        * @return {Number} The number of children in this Group
        */
        Group.prototype.numChildren = function () {
            return this.members.length;
        };

        Object.defineProperty(Group.prototype, "dirty", {
            get: function () {
                return this._dirty;
            },
            set: /**
            * Sets all children of the Group to be dirty.
            * @property dirty
            * @type Boolean
            */
            function (value) {
                if (value !== undefined) {
                    this._dirty = value;

                    for (var i = 0; i < this.members.length; i++) {
                        this.members[i].dirty = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Checks if the given entity is in this group
        * @method contains
        * @param {Kiwi.IChild} The entity to be checked.
        * @return {bool} true if entity exists in group.
        **/
        Group.prototype.contains = function (child) {
            return (this.members.indexOf(child) === -1) ? false : true;
        };

        /*
        * Checks to see if the given IChild is contained in this group as a descendant
        * @method containsDescendant
        * @param {Kiwi.IChild} child
        * @return {bool}
        */
        Group.prototype.containsDescendant = function (child) {
            for (var i = 0; i < this.members.length; i++) {
                console.log(i);
                var curMember = this.members[i];
                if (curMember.id == child.id || curMember.childType() == Kiwi.Group && curMember.containsDesendant(child)) {
                    return true;
                }
            }
            return false;
        };

        /**
        * Checks to see if one child is an ansector of another child.
        * @method containsAncestor
        * @param {Kiwi.IChild} descendant
        * @param {Kiwi.Group} ancestor
        * @return {bool}
        **/
        Group.prototype.containsAncestor = function (descendant, ancestor) {
            if (descendant.parent === null || descendant.parent === undefined) {
                return false;
            }
            if (descendant.parent == ancestor)
                return true;
            return descendant.parent.containsAncestor(descendant.parent, ancestor);
        };

        /**
        * Adds an Entity to this Group. The Entity must not already be in this Group.
        * @method addChild
        * @param {Kiwi.Entity} The child to be added.
        * @return {Kiwi.Entity} The child.
        **/
        Group.prototype.addChild = function (child) {
            if (child.childType() === Kiwi.STATE || child == this)
                return;

            if (child.parent !== null)
                child.parent.removeChild(child);

            //check to see if the child is already part of a group.
            this.members.push(child);
            child.parent = this;

            return child;
        };

        /**
        * Adds an Entity to this Group in the specific location. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildAt
        * @param {Kiwi.Entity} The child to be added.
        * @param {Number} The index the child will be set at.
        * @return {Kiwi.Entity} The child.
        */
        Group.prototype.addChildAt = function (child, index) {
            if (child.childType() === Kiwi.STATE || child == this)
                return;

            if (child.parent !== null)
                child.parent.removeChild(child);

            this.members.splice(index, 0, child);
            child.parent = this;

            return child;
        };

        /**
        * Adds an Entity to this Group before another child. The Entity must not already be in this Group and it must be supported by the Group.
        * @method addChildBefore
        * @param {Kiwi.Entity} The child to be added.
        * @param {Kiwi.Entity} The child before which the child will be added.
        * @return {Kiwi.Entity} The child.
        */
        Group.prototype.addChildBefore = function (child, beforeChild) {
            if (child.transform.parent !== this.transform && beforeChild.transform.parent === this.transform) {
                var index = this.getChildIndex(beforeChild);

                this.members.splice(index, 0, child);
            }

            return child;
        };

        /**
        * Adds an Entity to this Group after another child. The Entity must not already be in this Group and it must be supported by the Group..
        * @method addChildAfter
        * @param {Kiwi.Entity} The child to be added.
        * @param {Kiwi.Entity} The child after which the child will be added.
        * @return {Kiwi.Entity} The child.
        */
        Group.prototype.addChildAfter = function (child, beforeChild) {
            if (child.transform.parent !== this.transform && beforeChild.transform.parent === this.transform) {
                var index = this.getChildIndex(beforeChild) + 1;

                this.members.splice(index, 0, child);
            }

            return child;
        };

        /**
        * Get the child at a specific position in this Group by its index.
        * @method getChildAt
        * @param {Number} The index of the child
        * @return {Kiwi.Entity} The child, if found or null if not.
        */
        Group.prototype.getChildAt = function (index) {
            if (this.members[index]) {
                return this.members[index];
            } else {
                return null;
            }
        };

        /**
        * Get a child from this Group by its name.
        * @method getChildByName
        * @param {String} The name of the child
        * @return {Kiwi.Entity} The child, if found or null if not.
        */
        Group.prototype.getChildByName = function (name) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].name === name) {
                    return this.members[i];
                }
            }

            return null;
        };

        /**
        * Get a child from this Group by its UUID.
        * @method getChildByID
        * @param {String} The ID of the child.
        * @return {Kiwi.Entity} The child, if found or null if not.
        */
        Group.prototype.getChildByID = function (id) {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].id === id) {
                    return this.members[i];
                }
            }

            return null;
        };

        /**
        * Returns the index position of the Entity or -1 if not found.
        * @method getChildIndex
        * @param {Kiwi.Entity} The child.
        * @return {Number} The index of the child or -1 if not found.
        */
        Group.prototype.getChildIndex = function (child) {
            return this.members.indexOf(child);
        };

        /**
        * Removes an Entity from this Group if it is a child of it.
        * @method removeChild
        * @param {Kiwi.Entity} The child to be removed.
        * @param {Bool} If the entity that gets removed should be destroyed as well.s
        * @return {Kiwi.Entity} The child.
        **/
        Group.prototype.removeChild = function (child, destroy) {
            if (typeof destroy === "undefined") { destroy = false; }
            if (child.parent === this) {
                var index = this.getChildIndex(child);

                if (index > -1) {
                    this.members.splice(index, 1);
                    child.parent = null;

                    if (destroy) {
                        child.destroy();
                    }
                }
            }

            return child;
        };

        /**
        * Removes the Entity from this Group at the given position.
        * @method removeChildAt
        * @param {Number} The index of the child to be removed.
        * @return {Kiwi.Entity} The child, or null.
        */
        Group.prototype.removeChildAt = function (index) {
            if (this.members[index]) {
                var child = this.members[index];

                return this.removeChild(child);
            } else {
                return null;
            }
        };

        /**
        * Removes all Entities from this Group within the given range.
        * @method removeChildren
        * @param {Number} The begining index.
        * @param {Number} The last index of the range.
        * @param {Number} If the children should be destroyed as well.
        * @return {Number} The number of removed entities.
        */
        Group.prototype.removeChildren = function (begin, end, destroy) {
            if (typeof begin === "undefined") { begin = 0; }
            if (typeof end === "undefined") { end = 0x7fffffff; }
            if (typeof destroy === "undefined") { destroy = false; }
            end -= begin;

            var removed = this.members.splice(begin, end);

            for (var i = 0; i < removed.length; i++) {
                removed[i].parent = null;

                if (destroy) {
                    removed[i].destroy();
                }
            }

            return removed.length;
        };

        /**
        * Sets a new position of an existing Entity within the Group.
        * @method setChildIndex
        * @param {Kiwi.Entity} The child in this Group to change.
        * @param {Number} The index for the child to be set at.
        * @return {Boolean} true if the Entity was moved to the new position, otherwise false.
        */
        Group.prototype.setChildIndex = function (child, index) {
            if (child.parent !== this || this.getChildIndex(child) === index) {
                return false;
            }

            this.removeChild(child);
            this.addChildAt(child, index);

            return true;
        };

        /**
        * Swaps the position of two existing Entities that are a direct child of this group.
        * @method swapChildren
        * @param {Kiwi.Entity} The first child in this Group to swap.
        * @param {Kiwi.Entity} The second child in this Group to swap.
        * @return {Boolean} true if the Entities were swapped successfully, otherwise false.
        */
        Group.prototype.swapChildren = function (child1, child2) {
            if (child1.parent !== this || child2.parent !== this) {
                return false;
            }

            var index1 = this.getChildIndex(child1);
            var index2 = this.getChildIndex(child2);

            if (index1 !== -1 && index2 !== -1 && index1 !== index2) {
                this.members[index1] = child2;
                this.members[index2] = child1;

                return true;
            }

            return false;
        };

        /**
        * Swaps the position of two existing Entities within the Group based on their index.
        * @method swapChildrenAt
        * @param {Number} The position of the first Entity in this Group to swap.
        * @param {Number} The position of the second Entity in this Group to swap.
        * @return {Boolean} true if the Entities were swapped successfully, otherwise false.
        */
        Group.prototype.swapChildrenAt = function (index1, index2) {
            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);

            if (child1 !== null && child2 !== null) {
                if (child1 == child2 || child1.parent !== this || child2.parent !== this) {
                    return false;
                }

                this.members[index1] = child2;
                this.members[index2] = child1;

                return true;
            }

            return false;
        };

        /**
        * Replaces a child Entity in this Group with a new one.
        * @method replaceChild
        * @param {Kiwi.Entity} The Entity in this Group to be removed.
        * @param {Kiwi.Entity} The new Entity to insert into this Group at the old Entities position.
        * @return {Boolean} true if the Entities were replaced successfully, otherwise false.
        */
        Group.prototype.replaceChild = function (oldChild, newChild) {
            if (oldChild === newChild)
                return false;

            // get the index of the existing child
            var index = this.getChildIndex(oldChild);

            if (index > -1) {
                if (newChild.parent) {
                    newChild.parent.removeChild(newChild);
                }

                this.removeChildAt(index);

                this.addChildAt(newChild, index);
                newChild.parent = null;

                return true;
            }

            return false;
        };

        /**
        * Loops through each member in the group and run a method on for each one.
        * @method forEach
        * @param {any} context
        * @param {any} callback
        */
        Group.prototype.forEach = function (context, callback) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    return callback.apply(context, [child].concat(params));
                });
            }
        };

        /**
        * Loop through each member of the groups that is alive.
        * @method forEachAlive
        * @param {any} context
        * @param {any} callbacks
        */
        Group.prototype.forEachAlive = function (context, callback) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    if (child.exists)
                        callback.apply(context, [child].concat(params));
                });
            }
        };

        /**
        * Sets a property on every member. If componentName is null the property is set on the entity itself, otherwise it is set on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method setAll
        * @param {string} The name of the component to set the property on - set to null to set a property on the entity.
        * @param {string} The name of the property to set.
        * @param {any} The value to set the property to.
        * @return {Kiwi.Group} this group.
        */
        Group.prototype.setAll = function (componentName, property, value) {
            if (componentName === null) {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][property] = value;
                }
            } else {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][componentName][property] = value;
                }
            }
        };

        /**
        * Calls a function on every member. If componentName is null the function is called on the entity itself, otherwise it is called on the named component. Uses runtime string property lookups. Not optimal for large groups if speed is an issue.
        * @method callAll
        * @param {string} The name of the component to call the function on - set to null to call a function on the entity.
        * @param {string} The name of the function to call.
        * @param {Array} An array of arguments to pas to the function.
        * @return {Kiwi.Group} this group.
        */
        Group.prototype.callAll = function (componentName, functionName, args) {
            if (componentName === null) {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][functionName].apply(this.members[i], args);
                }
            } else {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i][componentName][functionName].apply(this.members[i][componentName], args);
                }
            }
        };

        /**
        * The update loop for this group.
        * @method update
        */
        Group.prototype.update = function () {
            var _this = this;
            this.components.preUpdate();

            this.components.update();
            if (this.members.length > 0) {
                this.members.forEach(function (child) {
                    return _this.processUpdate(child);
                });
            }

            this.components.postUpdate();
        };

        /**
        * Calls the update method on an alive child
        * @method processUpdate
        * @param {Kiwi.Entity}
        */
        Group.prototype.processUpdate = function (child) {
            if (child.active === true) {
                child.update();
            }
        };


        Object.defineProperty(Group.prototype, "exists", {
            get: function () {
                return this._exists;
            },
            set: /**
            * Toggles the exitence of this Group. An Entity that no longer exists can be garbage collected or re-allocated in a pool
            * This method should be over-ridden to handle specific canvas/webgl implementations.
            * @property exists
            * @type Boolean
            **/
            function (value) {
                this._exists = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Group.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: /**
            * Toggles the active state of this Entity. An Entity that is active has its update method called by its parent.
            * This method should be over-ridden to handle specific dom/canvas/webgl implementations.
            * @property active
            * @type Boolean
            **/
            function (value) {
                this._active = value;
            },
            enumerable: true,
            configurable: true
        });

        /*
        * The render method that is required by the IChild.
        * This method never gets called as the render is only worried about rendering entities.
        * @method render
        * @param {Kiwi.Camera}
        */
        Group.prototype.render = function (camera) {
        };

        /**
        * Removes the first Entity from this Group marked as 'alive'
        * @method removeFirstAlive
        * @param {Bool} destroy
        * @return {Kiwi.Entity} The Entity that was removed from this Group if alive, otherwise null
        */
        Group.prototype.removeFirstAlive = function (destroy) {
            if (typeof destroy === "undefined") { destroy = false; }
            return this.removeChild(this.getFirstAlive(), destroy);
        };

        /**
        * Returns the first Entity from this Group marked as 'alive' or null if no members are alive
        * @method getFirstAlive
        * @return {Kiwi.IChild}
        */
        Group.prototype.getFirstAlive = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === true) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        };

        /**
        * Returns the first member of the Group which is not 'alive', returns null if all members are alive.
        * @method getFirstDead
        * @return {Kiwi.IChild}
        */
        Group.prototype.getFirstDead = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === false) {
                    return this.members[i];
                    break;
                }
            }

            return null;
        };

        /**
        * Returns the number of member which are marked as 'alive'
        * @method countLiving
        * @return {Number}
        */
        Group.prototype.countLiving = function () {
            var total = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === true) {
                    total++;
                }
            }

            return total;
        };

        /**
        * Returns the number of member which are not marked as 'alive'
        * @method countDead
        * @return {Number}
        */
        Group.prototype.countDead = function () {
            var total = 0;

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].exists === false) {
                    total++;
                }
            }

            return total;
        };

        /**
        * Returns a member at random from the group.
        *
        * @param {Number}	StartIndex	Optional offset off the front of the array. Default value is 0, or the beginning of the array.
        * @param {Number}	Length		Optional restriction on the number of values you want to randomly select from.
        *
        * @return {Kiwi.IChild}	A child from the members list.
        */
        Group.prototype.getRandom = function (start, length) {
            if (typeof start === "undefined") { start = 0; }
            if (typeof length === "undefined") { length = 0; }
            if (this.members.length === 0) {
                return null;
            }

            if (length === 0) {
                length = this.members.length;
            }

            if (start < 0 || start > length) {
                start = 0;
            }

            var rnd = start + (Math.random() * (start + length));

            if (rnd > this.members.length) {
                return this.members[this.members.length - 1];
            } else {
                return this.members[rnd];
            }
        };

        /**
        * Clear all children from this Group
        * @method clear
        */
        Group.prototype.clear = function () {
            this.members.length = 0;
        };


        Object.defineProperty(Group.prototype, "willRender", {
            get: function () {
                return this._willRender;
            },
            set: /**
            * Toggles the visible state of this Entity. visible(false) are stopped from rendering.
            * This method should be over-ridden to handle specific canvas/webgl implementations.
            * @method visible
            * @param {Boolean} value
            * @return {Boolean}
            **/
            function (value) {
                this._willRender = value;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Removes all children and destroys the Group
        * @method destroy
        * @param {Boolean} destroyChildren
        **/
        Group.prototype.destroy = function (destroyChildren) {
            if (typeof destroyChildren === "undefined") { destroyChildren = true; }
            if (destroyChildren == true) {
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i].destroy();
                }
            } else {
                this.removeChildren();
            }

            this.state.removeFromTrackingList(this);
            this._exists = false;
            this._active = false;
            this._willRender = false;
            delete this.transform;
            if (this.components)
                this.components.removeAll();
            delete this.components;
            delete this.name;
            delete this.members;
            delete this.game;
            delete this.state;
        };
        return Group;
    })();
    Kiwi.Group = Group;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Kiwi;
(function (Kiwi) {
    /**
    *
    *
    * @class State
    *
    */
    var State = (function (_super) {
        __extends(State, _super);
        /**
        *
        * @constructor
        * @param {String} name
        * @return {State} Kiwi.State
        */
        function State(name) {
            _super.call(this, null, name);
            /**
            * A reference to the Kiwi.Game that this State belongs to
            * @property game
            * @type Kiwi.Game
            **/
            this.game = null;

            this.config = new Kiwi.StateConfig(this, name);
            this.components = new Kiwi.ComponentManager(Kiwi.STATE, this);
            this.transform.parent = null;
            this._trackingList = [];
        }
        /*
        * Returns the type of object this state is.
        * @method objType
        * @return String
        */
        State.prototype.objType = function () {
            return "State";
        };

        /*
        * Returns the type of child this is.
        * @method childType
        * @return Number
        */
        State.prototype.childType = function () {
            return Kiwi.STATE;
        };

        /**
        *
        * @method boot
        **/
        State.prototype.boot = function () {
            this.textureLibrary = new Kiwi.Textures.TextureLibrary(this.game);
            this.textures = this.textureLibrary.textures;
            this.audioLibrary = new Kiwi.Sound.AudioLibrary(this.game);
            this.audio = this.audioLibrary.audio;
            this.dataLibrary = new Kiwi.Files.DataLibrary(this.game);
            this.data = this.dataLibrary.data;
        };

        //  Default methods that should be over-ridden
        /**
        *
        * @method init
        **/
        State.prototype.init = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
        };

        /**
        *
        * @method preload
        **/
        State.prototype.preload = function () {
        };

        /**
        *
        * @method loadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {Kiwi.Files} file
        **/
        State.prototype.loadProgress = function (percent, bytesLoaded, file) {
        };

        /**
        *
        * @method loadComplete
        **/
        State.prototype.loadComplete = function () {
        };

        /**
        *
        * @method update
        **/
        State.prototype.loadUpdate = function () {
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].active === true) {
                    this.members[i].update();
                }
            }
        };

        /**
        * @method create
        **/
        State.prototype.create = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
        };

        /**
        * Calls preUpdate on all the components
        * @method preUpdate
        **/
        State.prototype.preUpdate = function () {
            this.components.preUpdate();
        };

        /**
        * Calls update on all the components, entities and groups added to this State
        * @method update
        **/
        State.prototype.update = function () {
            this.components.update();

            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].active === true) {
                    this.members[i].update();
                }
            }
        };

        /**
        * Calls postUpdate on all the components
        * @method postUpdate
        **/
        State.prototype.postUpdate = function () {
            this.components.postUpdate();
        };

        /**
        * Called after all of the layers have rendered themselves, useful for debugging
        * @method postRender
        **/
        State.prototype.postRender = function () {
        };

        /**
        *
        * @method setType
        * @param {Number} value
        **/
        State.prototype.setType = function (value) {
            if (this.config.isInitialised === false) {
                this.config.type = value;
            }
        };

        /**
        * Adds a new image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addImage
        * @param {String} key
        * @param {String} url
        * @param {Boolean} storeAsGlobal
        * @param {Number} width
        * @param {Number} height
        * @param {Number} offsetX
        * @param {Number} offsetY
        */
        State.prototype.addImage = function (key, url, storeAsGlobal, width, height, offsetX, offsetY) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addImage(key, url, width, height, offsetX, offsetY, storeAsGlobal);
        };

        /**
        * Adds a new spritesheet image file that is be loaded when the state gets up to the loading all of the assets.
        *
        * @method addSpriteSheet
        * @param {String} key
        * @param {String} url
        * @param {Number} frameWidth
        * @param {Number} frameHeight
        * @param {Boolean} storeAsGlobal
        * @param {Number} numCells
        * @param {Number} rows
        * @param {Number} cols
        * @param {Number} sheetOffsetX
        * @param {Number} cellOffsetX
        * @param {Number} cellOffsetY
        */
        State.prototype.addSpriteSheet = function (key, url, frameWidth, frameHeight, storeAsGlobal, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addSpriteSheet(key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal);
        };

        /*
        * Adds a new texture atlas that is to be loaded when the states gets up to the stage of loading the assets.
        *
        * @method addTextureAtlas
        * @param {String} key
        * @param {String} imageURL
        * @param {String} jsonID
        * @param {String} jsonURL
        * @param {boolean} storeAsGlobal
        */
        State.prototype.addTextureAtlas = function (key, imageURL, jsonID, jsonURL, storeAsGlobal) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addTextureAtlas(key, imageURL, jsonID, jsonURL, storeAsGlobal);
        };

        /*
        * Adds a json file that is to be loaded when the state gets up to the stage of loading the assets.
        *
        * @method addJSON
        * @param {string} key
        * @param {string} url
        * @param {bool} storeAsGlobal
        */
        State.prototype.addJSON = function (key, url, storeAsGlobal) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addJSON(key, url, storeAsGlobal);
        };

        /*
        * Adds a new audio file that is to be loaded when the state gets up to the stage of loading the assets.
        *
        * @method addAudio
        * @param {string} key
        * @param {string} url
        * @param {boolean} storeAsGlobal
        */
        State.prototype.addAudio = function (key, url, storeAsGlobal) {
            if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
            this.game.loader.addAudio(key, url, storeAsGlobal);
        };

        /*
        * Adds a new IChild to the tracking list. This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method addIChild
        * @param {Kiwi.IChild} child
        */
        State.prototype.addToTrackingList = function (child) {
            if (this._trackingList.indexOf(child) !== -1)
                return;

            //add to the list
            this._trackingList.push(child);
        };

        /*
        * Removes a IChild from the tracking list. This is an INTERNAL Kiwi method and DEVS shouldn't really need to worry about it.
        * @method removeFromTrackingList
        * @param {Kiwi.IChild} child
        */
        State.prototype.removeFromTrackingList = function (child) {
            //check to see that it is in the tracking list.
            var n = this._trackingList.indexOf(child);
            if (n > -1) {
                this._trackingList.splice(n, 1);
            }
        };

        /*
        * Destroys all of IChilds that are not currently on stage. All IChilds that currently don't have this STATE as an ancestor.
        * Returns the number of IChilds removed.
        * @method destroyUnused
        * @return {Number}
        */
        State.prototype.destroyUnused = function () {
            var d = 0;
            for (var i = 0; i < this._trackingList.length; i++) {
                if (this.containsAncestor(this._trackingList[i], this) === false) {
                    this._trackingList[i].destroy();
                    this._trackingList.splice(i, 1);
                    i--;
                    d++;
                }
            }

            return d;
        };

        /**
        * Destroys all of the IChild's on the start.
        * @method destroy
        **/
        State.prototype.destroy = function (deleteAll) {
            if (typeof deleteAll === "undefined") { deleteAll = true; }
            for (var i = 0; i < this._trackingList.length; i++) {
                this._trackingList[i].destroy();
            }
            this._trackingList = [];

            for (var i = 0; i < this.members.length; i++) {
                this._destroyChildren(this.members[i]);
            }
        };

        /*
        * Recursively goes through a child given and runs the destroy method on all that are passed.
        * @method _destroyChildren
        * @param {Kiwi.IChild} child
        */
        State.prototype._destroyChildren = function (child) {
            if (child.childType() == Kiwi.GROUP) {
                for (var i = 0; i < child.members.length; i++) {
                    this._destroyChildren(child.members[i]);
                }
            }
            child.destroy();
        };
        return State;
    })(Kiwi.Group);
    Kiwi.State = State;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * A TypeScript conversion of JS Signals by Miller Medeiros.
    * Released under the MIT license
    * http://millermedeiros.github.com/js-signals/
    *
    * @class Signal
    *
    * @author Miller Medeiros, JS Signals
    */
    var Signal = (function () {
        function Signal() {
            /**
            *
            * @property _bindings
            * @type Array
            * @private
            */
            this._bindings = [];
            /**
            *
            * @property _prevParams
            * @type Any
            * @private
            */
            this._prevParams = null;
            /**
            * If Signal should keep record of previously dispatched parameters and
            * automatically execute listener during `add()`/`addOnce()` if Signal was
            * already dispatched before.
            * @property memorize
            * @type boolean
            */
            this.memorize = false;
            /**
            * [REQUIRES DESCRIPTION]
            * @type boolean
            * @private
            */
            this._shouldPropagate = true;
            /**
            * If Signal is active and should broadcast events.
            * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
            * @property active
            * @type boolean
            */
            this.active = true;
        }
        /**
        * Returns the type of this object
        * @method objType
        * @return {String} The type of this object
        */
        Signal.prototype.objType = function () {
            return "Signal";
        };

        /**
        * [REQUIRES DESCRIPTION]
        * @method validateListener
        * @param {Any} listener
        * @param {Any} fnName
        */
        Signal.prototype.validateListener = function (listener, fnName) {
            if (typeof listener !== 'function') {
                throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
            }
        };

        /**
        * [REQUIRES DESCRIPTION]
        * @param {Function} listener
        * @param {boolean} isOnce
        * @param {Object} [listenerContext]
        * @param {Number} [priority]
        * @return {SignalBinding}
        * @private
        */
        Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];

                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            } else {
                binding = new Kiwi.SignalBinding(this, listener, isOnce, listenerContext, priority);

                this._addBinding(binding);
            }

            if (this.memorize && this._prevParams) {
                binding.execute(this._prevParams);
            }

            return binding;
        };

        /**
        *
        * @method _addBinding
        * @param {SignalBinding} binding
        * @private
        */
        Signal.prototype._addBinding = function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;

            do {
                --n;
            } while(this._bindings[n] && binding.priority <= this._bindings[n].priority);

            this._bindings.splice(n + 1, 0, binding);
        };

        /**
        * [REQUIRES DESCRIPTION]
        * @method _indexOfListener
        * @param {Function} listener
        * @param {any} context
        * @return {number}
        * @private
        */
        Signal.prototype._indexOfListener = function (listener, context) {
            var n = this._bindings.length;
            var cur;

            while (n--) {
                cur = this._bindings[n];

                if (cur.getListener() === listener && cur.context === context) {
                    return n;
                }
            }

            return -1;
        };

        /**
        * Check if listener was attached to Signal.
        * @param {Function} listener
        * @param {Object} [context]
        * @return {boolean} if Signal has the specified listener.
        */
        Signal.prototype.has = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            return this._indexOfListener(listener, context) !== -1;
        };

        /**
        * Add a listener to the signal.
        * @param {Function} listener Signal handler function.
        * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {SignalBinding} An Object representing the binding between the Signal and listener.
        */
        Signal.prototype.add = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this.validateListener(listener, 'add');

            return this._registerListener(listener, false, listenerContext, priority);
        };

        /**
        * Add listener to the signal that should be removed after first execution (will be executed only once).
        * @param {Function} listener Signal handler function.
        * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {SignalBinding} An Object representing the binding between the Signal and listener.
        */
        Signal.prototype.addOnce = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this.validateListener(listener, 'addOnce');

            return this._registerListener(listener, true, listenerContext, priority);
        };

        /**
        * Remove a single listener from the dispatch queue.
        * @param {Function} listener Handler function that should be removed.
        * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
        * @return {Function} Listener handler function.
        */
        Signal.prototype.remove = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            this.validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);

            if (i !== -1) {
                this._bindings[i]._destroy();
                this._bindings.splice(i, 1);
            }

            return listener;
        };

        /**
        * Remove all listeners from the Signal.
        * @method removeAll
        */
        Signal.prototype.removeAll = function () {
            var n = this._bindings.length;

            while (n--) {
                this._bindings[n]._destroy();
            }

            this._bindings.length = 0;
        };

        /**
        * [REQUIRES DESCRIPTION]
        * @method getNumListeners
        * @return {number} Number of listeners attached to the Signal.
        */
        Signal.prototype.getNumListeners = function () {
            return this._bindings.length;
        };

        /**
        * [REQUIRES DESCRIPTION]
        * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
        * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
        * @see Signal.prototype.disable
        * @method halt
        */
        Signal.prototype.halt = function () {
            this._shouldPropagate = false;
        };

        /**
        * Dispatch/Broadcast Signal to all listeners added to the queue.
        * @method dispatch
        * @param {...*} [params] Parameters that should be passed to each handler.
        */
        Signal.prototype.dispatch = function () {
            var paramsArr = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                paramsArr[_i] = arguments[_i + 0];
            }
            if (!this.active) {
                return;
            }

            var n = this._bindings.length;
            var bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (!n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(0);

            this._shouldPropagate = true;

            do {
                n--;
            } while(bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        };

        /**
        * [REQUIRES DESCRIPTION]
        * Forget memorized arguments.
        * @method forget
        * @see Signal.memorize
        */
        Signal.prototype.forget = function () {
            this._prevParams = null;
        };

        /**
        * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
        * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
        * @method dispose
        */
        Signal.prototype.dispose = function () {
            this.removeAll();

            delete this._bindings;
            delete this._prevParams;
        };

        /**
        * @method toString
        * @return {string} String representation of the object.
        */
        Signal.prototype.toString = function () {
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        };
        Signal.VERSION = '1.0.0';
        return Signal;
    })();
    Kiwi.Signal = Signal;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * An object that represents a binding between a Signal and a listener function.
    * Released under the MIT license
    * http://millermedeiros.github.com/js-signals/
    *
    * @class SignalBinding
    *
    * @author Miller Medeiros, JS Signals
    *
    */
    var SignalBinding = (function () {
        /**
        * Object that represents a binding between a Signal and a listener function.
        * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
        * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
        * @author Miller Medeiros
        * @constructor
        * @internal
        * @name SignalBinding
        * @param {Signal} signal Reference to Signal object that listener is currently bound to.
        * @param {Function} listener Handler function bound to the signal.
        * @param {boolean} isOnce If binding should be executed just once.
        * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param {Number} [priority] The priority level of the event listener. (default = 0).
        */
        function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            /**
            * If binding is active and should be executed.
            * @type boolean
            */
            this.active = true;
            /**
            * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
            * @type Array|null
            */
            this.params = null;
            this._listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority || 0;
        }
        SignalBinding.prototype.objType = function () {
            return "SignalBinding";
        };

        /**
        * Call listener passing arbitrary parameters.
        * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
        * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
        * @return {*} Value returned by the listener.
        */
        SignalBinding.prototype.execute = function (paramsArr) {
            var handlerReturn;
            var params;

            if (this.active && !!this._listener) {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;

                handlerReturn = this._listener.apply(this.context, params);

                if (this._isOnce) {
                    this.detach();
                }
            }

            return handlerReturn;
        };

        /**
        * Detach binding from signal.
        * - alias to: mySignal.remove(myBinding.getListener());
        * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
        */
        SignalBinding.prototype.detach = function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        };

        /**
        * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
        */
        SignalBinding.prototype.isBound = function () {
            return (!!this._signal && !!this._listener);
        };

        /**
        * @return {boolean} If SignalBinding will only be executed once.
        */
        SignalBinding.prototype.isOnce = function () {
            return this._isOnce;
        };

        /**
        * @return {Function} Handler function bound to the signal.
        */
        SignalBinding.prototype.getListener = function () {
            return this._listener;
        };

        /**
        * @return {Signal} Signal that listener is currently bound to.
        */
        SignalBinding.prototype.getSignal = function () {
            return this._signal;
        };

        /**
        * Delete instance properties
        * @private
        */
        SignalBinding.prototype._destroy = function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        };

        /**
        * @return {string} String representation of the object.
        */
        SignalBinding.prototype.toString = function () {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        };
        return SignalBinding;
    })();
    Kiwi.SignalBinding = SignalBinding;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * A game contains one single Stage which controls the size of the game, frame rate, position, e.t.c.
    *
    * @class Stage
    *
    */
    var Stage = (function () {
        /**
        *
        * @constructor
        * @param {Kiwi.Game} game
        * @param {String} name
        * @return {Stage} Kiwi.Stage
        */
        function Stage(game, name) {
            /**
            * A point which determines the offset of this Stage
            * @property offset
            * @type Kiwi.Geom.Point
            */
            this.offset = new Kiwi.Geom.Point();
            /**
            * The parent div in which the layers and input live
            * @property container
            * @type HTMLDivElement
            */
            this.container = null;
            this._game = game;

            this.name = name;

            this.domReady = false;

            //  Properties
            this._alpha = 1;

            this._x = 0;
            this._y = 0;

            this._width = 800;
            this._height = 600;
            this.color = 'white';

            this.onResize = new Kiwi.Signal();
        }
        /**
        * Returns the type of this object.
        * @method objType
        * @return string
        */
        Stage.prototype.objType = function () {
            return "Stage";
        };

        Object.defineProperty(Stage.prototype, "alpha", {
            get: /*
            * Get the current alpha of the stage. 0 = invisible, 1 = fully visible.
            * @type number
            */
            function () {
                return this._alpha;
            },
            set: /*
            * Set the alpha of the stage. A number between 0 (invisible) and 1 (fully visible).
            * @type number
            */
            function (value) {
                this.container.style.opacity = String(Kiwi.Utils.GameMath.clamp(value, 1, 0));

                this._alpha = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "x", {
            get: /*
            * Get the X coordinate of the stage. This number should be the same as the stages left property.
            * @type number
            */
            function () {
                return this._x;
            },
            set: /*
            * Set the X coordinate of the stage. When setting the X coordinate it modifies the left style on the stage.
            * @type number
            */
            function (value) {
                this.container.style.left = String(value + 'px');
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "y", {
            get: /*
            * Get the Y coordinate of the stage. This number should be the same as the stages top property.
            * @type number
            */
            function () {
                return this._y;
            },
            set: /*
            * Set the Y coordinate of the stage. When setting the X coordinate it modifies the top style on the stage.
            * @type number
            */
            function (value) {
                this.container.style.top = String(value + 'px');
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "width", {
            get: /*
            * The width of the stage.
            * @type number
            */
            function () {
                return this._width;
            },
            set: /*
            * Set the width of the stage.
            * @type number
            */
            function (value) {
                this.container.style.width = String(value + 'px');
                this.canvas.width = value;

                this._width = value;
                this.onResize.dispatch(this._width, this._height);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "height", {
            get: /*
            * Returns the height of the stage
            * @type number
            */
            function () {
                return this._height;
            },
            set: /*
            * Sets the height of the stage .
            * @type number
            */
            function (value) {
                this.container.style.height = String(value + 'px');
                this.canvas.height = value;

                this._height = value;
                this.onResize.dispatch(this._width, this._height);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Stage.prototype, "color", {
            get: /**
            * Get the background color of the stage.
            * @type string
            */
            function () {
                return this._color;
            },
            set: /*
            * Sets the background color of the canvas.
            * @type string
            */
            function (val) {
                this._color = val;
            },
            enumerable: true,
            configurable: true
        });


        /**
        * The DOM is ready, so if we have things to do we can set them now
        * @method boot
        * @param {HTMLElement} container
        */
        Stage.prototype.boot = function (dom) {
            this.domReady = true;

            this.container = dom.container;
            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.offset = this._game.browser.getOffsetPoint(this.container);
                this._x = this.offset.x;
                this._y = this.offset.y;
                this._width = parseInt(this.container.style.width);
                this._height = parseInt(this.container.style.height);
            }

            this._createCompositeCanvas();
            if (this._game.debugOption === Kiwi.DEBUG_ON) {
                this._createDebugCanvas();
            }
        };

        /**
        * TO DO
        */
        Stage.prototype._createCompositeCanvas = function () {
            this.canvas = document.createElement("canvas");
            this.canvas.id = this._game.id + "compositeCanvas";
            this.canvas.style.position = "absolute";
            this.canvas.width = this.width;
            this.canvas.height = this.height;

            if (this._game.renderOption === Kiwi.RENDERER_CANVAS) {
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = '#fff';
                this.gl = null;
            } else if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
                this.gl = this.canvas.getContext("webgl");
                this.gl.clearColor(1, 1, .95, .7);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                this.ctx = null;
            }

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.canvas);
            } else {
                document.body.appendChild(this.canvas);
            }
        };

        /**
        * TO DO
        */
        Stage.prototype._createDebugCanvas = function () {
            if (this._game.deviceTargetOption === Kiwi.TARGET_COCOON) {
                //debug canvas not supported in cocoon, creating canvas and context anyway.
            }
            this.debugCanvas = document.createElement("canvas");
            this.debugCanvas.id = this._game.id + "debugCanvas";
            this.debugCanvas.style.position = "absolute";
            this.debugCanvas.style.display = "none";
            this.debugCanvas.width = this.width;
            this.debugCanvas.height = this.height;
            this.dctx = this.debugCanvas.getContext("2d");
            this.clearDebugCanvas();

            if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.debugCanvas);
            }
        };

        Stage.prototype.clearDebugCanvas = function (color) {
            this.dctx.fillStyle = color || "rgba(255,0,0,.2)";
            this.dctx.clearRect(0, 0, this.width, this.height);
            this.dctx.fillRect(0, 0, this.width, this.height);
        };

        Stage.prototype.toggleDebugCanvas = function () {
            this.debugCanvas.style.display = (this.debugCanvas.style.display === "none") ? "block" : "none";
        };
        return Stage;
    })();
    Kiwi.Stage = Stage;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Components
    * @module Kiwi
    * @submodule Components
    * @main Components
    */
    (function (Components) {
        /**
        *
        * @class Animation
        * @extends Component
        */
        var Animation = (function (_super) {
            __extends(Animation, _super);
            /**
            *
            * @constructor
            * @param {Kiwi.Entity} entity
            * @return {Kiwi.Components.Animation}
            */
            function Animation(entity) {
                _super.call(this, entity, 'Animation');
                /**
                * A reference to the animation that is currently being played.
                * @property _currentAnimation
                * @type Kiwi.Animation
                * @default null
                * @private
                */
                this.currentAnimation = null;
                /**
                * Indicates weither or not this animation is currently playing or not.
                * @property _isPlaying
                * @type boolean
                * @default false
                * @private
                */
                this._isPlaying = false;

                //get the entity and the animation.
                this.entity = entity;
                this._atlas = this.entity.atlas;
                this._animations = {};

                for (var i = 0; i < this._atlas.sequences.length; i++) {
                    this.createFromSequence(this._atlas.sequences[i], false);
                }

                if (this._animations['default']) {
                    this.currentAnimation = this._animations['default'];
                    //otherwise create one.
                } else {
                    var defaultCells = [];
                    for (var i = 0; i < this._atlas.cells.length; i++) {
                        defaultCells.push(i);
                    }
                    this.currentAnimation = this.add('default', defaultCells, 0.1, true, false);
                }
            }
            Object.defineProperty(Animation.prototype, "isPlaying", {
                get: /**
                * Returns a boolean indicating weither or not the current animation is playing.
                * @type boolean
                * @public
                */
                function () {
                    return this._isPlaying;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * The type of object that this is.
            * @method objType
            * @type string
            * @public
            */
            Animation.prototype.objType = function () {
                return "Animation";
            };

            /**
            * Creates a new sequence that can then be used to play. Returns that animation that was created.
            *
            * @method add
            * @param {string} name
            * @param {number[]} cells - An array that contains a reference to the cells that are to be played in the animation.
            * @param {number} speed
            * @param {boolean} loop
            * @param {boolean} play - If once created the animation should play right away.
            * @return {Kiwi.Animation }
            * @public
            */
            Animation.prototype.add = function (name, cells, speed, loop, play) {
                if (typeof loop === "undefined") { loop = false; }
                if (typeof play === "undefined") { play = false; }
                var newSequence = new Kiwi.Animation.Sequence(name, cells, speed, loop);
                this._atlas.sequences.push(newSequence);

                return this.createFromSequence(newSequence, play);
            };

            /**
            * Creates a new animation based of a sequence. Returns that animation that was created.
            *
            * @method createFromSequence
            * @param {Kiwi.Sequence} sequence
            * @param {boolean} play - If the animation should play once it has been created
            * @return {Kiwi.Animation}
            * @public
            */
            Animation.prototype.createFromSequence = function (sequence, play) {
                if (typeof play === "undefined") { play = false; }
                this._animations[sequence.name] = new Kiwi.Animation.Anim(sequence.name, sequence, this.entity.clock);

                if (play)
                    this.play(sequence.name);

                return this._animations[sequence.name];
            };

            /**
            * Plays either the current animation or the name of the animation that you pass.
            *
            * @method play
            * @param {string} name - defaults to the current animation
            * @public
            */
            Animation.prototype.play = function (name) {
                if (typeof name === "undefined") { name = this.currentAnimation.name; }
                return this._play(name);
            };

            /**
            * Play an animation at a particular frameIndex.
            *
            * @method playAt
            * @param {Number} index
            * @param {String} name - defaults to the current animation
            * @public
            */
            Animation.prototype.playAt = function (index, name) {
                if (typeof name === "undefined") { name = this.currentAnimation.name; }
                return this._play(name, index);
            };

            /**
            *  An internal method used to actually play the animation.
            *
            * @method _play
            * @param {number} index
            * @param {string} name
            * @private
            */
            Animation.prototype._play = function (name, index) {
                if (typeof index === "undefined") { index = null; }
                this._isPlaying = true;
                this._setCurrentAnimation(name);

                if (index !== null)
                    this.currentAnimation.playAt(index);
else
                    this.currentAnimation.play();

                this._setCellIndex();

                return this.currentAnimation;
            };

            /**
            * Stops the current animation from playing.
            *
            * @method stop
            * @public
            */
            Animation.prototype.stop = function () {
                if (this.isPlaying === true) {
                    this.currentAnimation.stop();
                }
                this._isPlaying = false;
            };

            /**
            * Pauses the current animation.
            * @method pause
            * @public
            */
            Animation.prototype.pause = function () {
                this.currentAnimation.pause();
                this._isPlaying = false;
            };

            /**
            * Resumes the current animation. The animation should have already been paused.
            * @method resume
            * @public
            */
            Animation.prototype.resume = function () {
                this.currentAnimation.resume();
                this._isPlaying = true;
            };

            /**
            * Switches to animation that you pass.
            * You can say weither to play the animation when it has switched otherwise it just goes off what is currently happening
            *
            * @method switchTo
            * @param {string} name
            * @param {boolean} play
            * @public
            */
            Animation.prototype.switchTo = function (val, play) {
                if (typeof play === "undefined") { play = null; }
                switch (typeof val) {
                    case "string":
                        if (this.currentAnimation.name !== val) {
                            this._setCurrentAnimation(val);
                        }
                        break;
                    case "number":
                        this.currentAnimation.frameIndex = val;
                        break;
                }

                if (play || play === null && this.isPlaying)
                    this.play();
                if (play == false && this.isPlaying)
                    this.stop();

                this._setCellIndex();
            };

            /**
            * Makes the current animation go to the next frame. If the animation is at the end of the sequence it then goes back to the start.
            * @method nextFrame
            * @public
            */
            Animation.prototype.nextFrame = function () {
                this.currentAnimation.nextFrame();
                this._setCellIndex();
            };

            /**
            * Makes the current animation go to the prev frame. If the animation is at the start, the animation will go the end of the sequence.
            * @method prevFrame
            * @public
            */
            Animation.prototype.prevFrame = function () {
                this.currentAnimation.prevFrame();
                this._setCellIndex();
            };

            /**
            * Internal method that sets the current animation to the animation passed.
            *
            * @method _setCurrentAnimation
            * @param {string} name
            * @private
            */
            Animation.prototype._setCurrentAnimation = function (name) {
                if (this.currentAnimation !== null)
                    this.currentAnimation.stop();
                if (this._animations[name]) {
                    this.currentAnimation = this._animations[name];
                }
            };

            /**
            * The update loop, it only updates the currentAnimation and only if it is playing.
            * @method update
            * @public
            */
            Animation.prototype.update = function () {
                if (this.currentAnimation && this.isPlaying) {
                    if (this.currentAnimation.update()) {
                        this._setCellIndex();
                    }
                }
            };

            Object.defineProperty(Animation.prototype, "currentCell", {
                get: /**
                * Gets the current cell that the current animation is up to.
                * @type number
                * @public
                */
                function () {
                    return this.currentAnimation.currentCell;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Animation.prototype, "frameIndex", {
                get: /**
                * Gets the current frame index that the current animation is up to.
                * @type number
                * @public
                */
                function () {
                    return this.currentAnimation.frameIndex;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Animation.prototype, "length", {
                get: /**
                * Returns the length of the current animation that is playing.
                * @type number
                * @public
                */
                function () {
                    return this.currentAnimation.length;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Get a animation that is on the animation component.
            *
            * @method getAnimation
            * @param {string} name
            * @return {Kiwi.Animation}
            * @public
            */
            Animation.prototype.getAnimation = function (name) {
                return this._animations[name];
            };

            /**
            * An internal method that is used to set the cell index of the entity. This is how the animation changes.
            * @method _setCellIndex
            * @public
            */
            Animation.prototype._setCellIndex = function () {
                this.entity.cellIndex = this.currentCell;
            };

            Object.defineProperty(Animation.prototype, "toString", {
                get: /**
                * Returns a string representation of this object.
                * @method toString
                * @return {string} A string representation of this object.
                * @public
                */
                function () {
                    return '[{Animation (x=' + this.active + ')}]';
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Destroys the animation component and runs the destroy on all of the anims that it has.
            * @method destroy
            * @public
            */
            Animation.prototype.destroy = function () {
                this._isPlaying = false;
                _super.prototype.destroy.call(this);

                for (var key in this._animations) {
                    this._animations[key].destroy();
                    delete this._animations[key];
                }
                delete this._animations;
                delete this.currentAnimation;
                delete this._atlas;
            };
            return Animation;
        })(Kiwi.Component);
        Components.Animation = Animation;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Components
    * @module Kiwi
    * @submodule Components
    *
    */
    (function (Components) {
        /**
        *
        *
        * @class Box
        * @extends Component
        */
        var Box = (function (_super) {
            __extends(Box, _super);
            /**
            *
            * @constructor
            * @param {Kiwi.Entity} parent - The entity that this box belongs to.
            * @param {Number} x - Its position on the x axis
            * @param {Number} y - Its position on the y axis
            * @param {Number} width - The width of the box.
            * @param {Number} height - The height of the box.
            * @return {Kiwi.Components.Box}
            */
            function Box(parent, x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                _super.call(this, parent, 'Box');

                this.entity = parent;
                this.dirty = true;

                this._rawBounds = new Kiwi.Geom.Rectangle(x, y, width, height);
                this._rawCenter = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
                this._rawHitbox = new Kiwi.Geom.Rectangle();

                this._hitboxOffset = new Kiwi.Geom.Point();

                this.hitbox = new Kiwi.Geom.Rectangle(0, 0, width, height);
            }
            /**
            * The type of object that this is.
            * @method objType
            * @return {string}
            * @public
            */
            Box.prototype.objType = function () {
                return "Box";
            };

            Object.defineProperty(Box.prototype, "rawHitbox", {
                get: /**
                * Returns the raw hitbox rectangle for the developer to use.
                * 'Raw' means where it would be without rotation or scaling.
                * @type Kiwi.Geom.Rectangle
                * @public
                */
                function () {
                    if (this.dirty) {
                        this._rawHitbox.x = this._rawBounds.x + this._hitboxOffset.x;
                        this._rawHitbox.y = this._rawBounds.y + this._hitboxOffset.y;
                    }

                    return this._rawHitbox;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "hitbox", {
                get: /**
                * Returns the 'normal' or transformed hitbox for the entity. This is its box after rotation/e.t.c.
                * @type Kiwi.Geom.Rectangle
                * @public
                */
                function () {
                    if (this.dirty) {
                        this._transformedHitbox = this._rotateHitbox(this.rawHitbox.clone());
                    }

                    return this._transformedHitbox;
                },
                set: /**
                * Sets the hitbox based of a rectangle that you specify.
                * @type Kiwi.Geom.Rectangle
                * @public
                */
                function (value) {
                    this._hitboxOffset.x = value.x;
                    this._hitboxOffset.y = value.y;

                    this._rawHitbox = value;

                    this._rawHitbox.x += this._rawBounds.x;
                    this._rawHitbox.y += this._rawBounds.y;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Box.prototype, "rawBounds", {
                get: /**
                * Returns the 'raw' bounds for this entity.
                * @type Kiwi.Geom.Rectangle
                * @public
                */
                function () {
                    if (this.dirty) {
                        this._rawBounds.x = this.entity.x;
                        this._rawBounds.y = this.entity.y;
                        this._rawBounds.width = this.entity.width;
                        this._rawBounds.height = this.entity.height;
                    }
                    return this._rawBounds;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "rawCenter", {
                get: /**
                * Returns the raw center point of the box.
                * @type Kiwi.Geom.Point
                * @public
                */
                function () {
                    if (this.dirty) {
                        this._rawCenter.x = this.rawBounds.x + this.rawBounds.width / 2, this._rawCenter.y = this.rawBounds.y + this.rawBounds.height / 2;
                    }
                    return this._rawCenter;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "center", {
                get: /**
                * Returns the center point for the box after it has been transformed.
                * @type Kiwi.Geom.Point
                * @public
                */
                function () {
                    if (this.dirty) {
                        var t = this.entity.transform;
                        var m = t.getConcatenatedMatrix();
                        m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);
                        this._transformedCenter = m.transformPoint(new Kiwi.Geom.Point(this.entity.width / 2 - t.rotPointX, this.entity.height / 2 - t.rotPointY));
                    }
                    return this._transformedCenter;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Box.prototype, "bounds", {
                get: /**
                * Returns the 'transformed' or 'normal' bounds for this box.
                * @type Kiwi.Geom.Rectangle
                * @public
                */
                function () {
                    if (this.dirty) {
                        this._transformedBounds = this.rawBounds.clone();
                        this._transformedBounds = this._rotateRect(this.rawBounds.clone());
                    }
                    return this._transformedBounds;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Private internal method only. Used to rotate a rectangle but a set about.
            * @method _rotateRect
            * @param {Kiwi.Geom.Rectangle} rect
            * @return {Kiwi.Geom.Rectangle}
            * @private
            */
            Box.prototype._rotateRect = function (rect) {
                var out = new Kiwi.Geom.Rectangle();
                var t = this.entity.transform;
                var m = t.getConcatenatedMatrix();
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);

                out = this.extents(m.transformPoint({ x: -t.rotPointX, y: -t.rotPointY }), m.transformPoint({ x: -t.rotPointX + rect.width, y: -t.rotPointY }), m.transformPoint({ x: -t.rotPointX + rect.width, y: -t.rotPointY + rect.height }), m.transformPoint({ x: -t.rotPointX, y: -t.rotPointY + rect.height }));
                return out;
            };

            /**
            * Rotates the hitbox by an set amount.
            * @method _rotateHitbox
            * @param {Kiwi.Geom.Rectangle}
            * @return {Kiwi.Geom.Rectangle}
            * @private
            */
            Box.prototype._rotateHitbox = function (rect) {
                var out = new Kiwi.Geom.Rectangle();
                var t = this.entity.transform;
                var m = t.getConcatenatedMatrix();
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);

                out = this.extents(m.transformPoint({ x: -t.rotPointX + this._hitboxOffset.x, y: -t.rotPointY + this._hitboxOffset.y }), m.transformPoint({ x: -t.rotPointX + rect.width + this._hitboxOffset.x, y: -t.rotPointY + this._hitboxOffset.y }), m.transformPoint({ x: -t.rotPointX + rect.width + this._hitboxOffset.x, y: -t.rotPointY + rect.height + this._hitboxOffset.y }), m.transformPoint({ x: -t.rotPointX + this._hitboxOffset.x, y: -t.rotPointY + rect.height + this._hitboxOffset.y }));

                return out;
            };

            /**
            * Draws the various bounds on a context that is passed. Useful for debugging.
            * @method draw
            * @param {CanvasRenderingContext2D} ctx
            * @public
            */
            Box.prototype.draw = function (ctx) {
                var t = this.entity.transform;
                ctx.strokeStyle = "red";

                ctx.strokeRect(this.rawBounds.x, this.rawBounds.y, this.rawBounds.width, this.rawBounds.height);
                ctx.fillRect(this.rawCenter.x - 1, this.rawCenter.y - 1, 3, 3);
                ctx.strokeRect(t.x + t.rotPointX - 3, t.y + t.rotPointY - 3, 7, 7);
                ctx.strokeStyle = "blue";
                ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
                ctx.strokeStyle = "green";
                ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
                ctx.strokeStyle = "white";
                ctx.strokeRect(this.rawHitbox.x, this.rawHitbox.y, this.rawHitbox.width, this.rawHitbox.height);
            };

            /*
            * ?????
            *
            */
            Box.prototype.extents = function (topLeftPoint, topRightPoint, bottomRightPoint, bottomLeftPoint) {
                var left = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
                var right = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
                var top = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
                var bottom = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);

                return new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);
            };

            /**
            * Destroys this component and all of the links it may have to other objects.
            * @method destroy
            * @public
            */
            Box.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this.entity;
            };
            return Box;
        })(Kiwi.Component);
        Components.Box = Box;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Components
    * @module Kiwi
    * @submodule Components
    *
    */
    (function (Components) {
        /**
        *
        *
        * @class Input
        * @extends Component
        */
        var Input = (function (_super) {
            __extends(Input, _super);
            /**
            *
            * @constructor
            * @param {Kiwi.IChild} owner - The IChild that owns this Input.
            * @param {Kiwi.Components.Box} box - The box that is to be used for the event firing.
            * @return {Kiwi.Components.Input}
            */
            function Input(owner, box, enabled) {
                _super.call(this, owner, 'Input');
                /**
                * A reference to the pointer that is currently 'dragging' this IChild.
                * If not dragging then this is null.
                * @property _isDragging
                * @type Kiwi.Input.Pointer
                * @default null
                * @private
                */
                this._isDragging = null;
                /**
                * Indicates if dragging is currently enabled.
                * @property _dragEnabled
                * @type boolean
                * @default false
                * @private
                */
                this._dragEnabled = false;
                /**
                * If when dragging, the IChild should snap to the center of the pointer it is being dragged by.
                * @property _dragSnapToCenter
                * @type boolean
                * @default false
                * @private
                */
                this._dragSnapToCenter = false;
                /**
                * Temporary property that gets updated everyframe with the pointer that is currently 'down' on this entity.
                * @property _nowDown
                * @type Kiwi.Input.Pointer
                * @default null
                * @private
                */
                this._nowDown = null;
                /**
                * Temporary property that gets updated everyframe with the pointer that was just 'released' from being down on this entity
                * @property _nowUp
                * @type Kiwi.Input.Pointer
                * @default null
                * @private
                */
                this._nowUp = null;
                /**
                * Temporary property of the pointer that is now within the bounds of the entity
                * @property _nowEntered
                * @type Kiwi.Input.Pointer
                * @default null
                * @private
                */
                this._nowEntered = null;
                /**
                * Temporary property of the pointer that just left the bounds of the entity.
                * @property _nowLeft
                * @type Kiwi.Input.Pointer
                * @default null
                * @private
                */
                this._nowLeft = null;
                /**
                * Temporary property of the pointer that just started draggging the entity.
                * @property _nowDragging
                * @type Kiwi.Input.Pointer
                * @default null
                * @private
                */
                this._nowDragging = null;

                //  Signals
                this._onEntered = new Kiwi.Signal();
                this._onLeft = new Kiwi.Signal();
                this._onDown = new Kiwi.Signal();
                this._onUp = new Kiwi.Signal();
                this._onDragStarted = new Kiwi.Signal();
                this._onDragStopped = new Kiwi.Signal();

                //  Properties
                this._box = box;

                this._distance = new Kiwi.Geom.Point();

                this._withinBounds = null;
                this._outsideBounds = true;

                this._isUp = true;
                this._isDown = null;
                this._isDragging = null;
                this._justEntered = false;
                this._tempDragDisabled = false;
                this.enabled = enabled;
            }
            /**
            * The type of object this input is.
            * @method objType
            * @return string
            * @public
            */
            Input.prototype.objType = function () {
                return "Input";
            };

            Object.defineProperty(Input.prototype, "onEntered", {
                get: /**
                * Returns the onEntered Signal, that fires events when a pointer enters the hitbox of a entity.
                * Note: Accessing this signal enables the input.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onEntered;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onLeft", {
                get: /**
                * Returns the onLeft Signal, that fires events when a pointer leaves the hitbox of a entity.
                * Note: Accessing this signal enables the input.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onLeft;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onDown", {
                get: /**
                * Returns the onDown Signal, that fires events when a pointer is pressed within the bounds of the signal.
                * Note: Accessing this signal enables the input.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onUp", {
                get: /**
                * Returns the onUp Signal, that fires events when a pointer is released either within the bounds or was pressed initially within the bounds..
                * Note: Accessing this signal enables the input.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    if (this.enabled == false)
                        this.enabled = true;
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onDragStarted", {
                get: /**
                * Returns the onDragStarted Signal.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    return this._onDragStarted;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onDragStopped", {
                get: /**
                * Returns the onDragStopped Signal.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    return this._onDragStopped;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onRelease", {
                get: /**
                * A alias for the on release signal.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    return this.onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "onPress", {
                get: /**
                * A alias for the on press signal.
                * @type Kiwi.Signal
                * @public
                */
                function () {
                    return this.onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "enabled", {
                get: /**
                * Get if the input is enabled or not.
                * @type boolean
                * @public
                */
                function () {
                    return this._enabled;
                },
                set: /**
                * Set if the input should be enabled or not.
                * @type boolean
                * @public
                */
                function (val) {
                    this._enabled = val;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Input.prototype, "isDown", {
                get: /**
                * Used to see if a pointer is currently on this input. Returns a boolean indicating either true or false
                * @type boolean
                * @public
                */
                function () {
                    return (this._isDown !== null);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "isUp", {
                get: /**
                * Used to see if no pointer is on this input (so it is up).
                * @type boolean
                * @public
                */
                function () {
                    return this._isUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "withinBounds", {
                get: /**
                * Check to see if any pointer is within the bounds of this input.
                * @type boolean
                * @public
                */
                function () {
                    return (this._withinBounds !== null);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "outsideBounds", {
                get: /**
                * See if no pointers are within the bounds of this entity.
                * @type boolean
                * @public
                */
                function () {
                    return this._outsideBounds;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "isDragging", {
                get: /**
                * Returns a boolean indicating if this is currently dragging something.
                * @type boolean
                * @public
                */
                function () {
                    return (this._isDragging !== null);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Input.prototype, "dragDistance", {
                get: /**
                * Returns the drag distance. See _dragDistance for more information.
                * @type number
                * @public
                */
                function () {
                    return this._dragDistance;
                },
                set: /**
                * Sets the drag distance. See _dragDistance for more information.
                * @type number
                * @public
                */
                function (val) {
                    this._dragDistance = val;
                },
                enumerable: true,
                configurable: true
            });


            /**
            * Enables the dragging of this entity.
            * @method enableDrag
            * @param {boolean} snapToCenter
            * @param {number} distance
            * @public
            */
            Input.prototype.enableDrag = function (snapToCenter, distance) {
                if (typeof snapToCenter === "undefined") { snapToCenter = false; }
                if (typeof distance === "undefined") { distance = 1; }
                if (this.enabled == false)
                    this.enabled = true;
                this._dragEnabled = true;
                this._dragSnapToCenter = snapToCenter;
                this._dragDistance = distance;
                this._isDragging = null;
            };

            /**
            * Disables the dragging of this entity.
            * @method disableDrag
            * @public
            */
            Input.prototype.disableDrag = function () {
                this._dragEnabled = false;
                this._isDragging = null;
            };

            /**
            * The update loop for the input. Note that is only runs if the input is enabled.
            * @method update
            * @protected
            */
            Input.prototype.update = function () {
                if (this.enabled === false || !this.game || this.owner.active === false || this.owner.willRender === false) {
                    return;
                }

                //reset the temporary properties
                this._nowDown = null;
                this._nowUp = null;
                this._nowEntered = null;
                this._nowLeft = null;
                this._nowDragging = null;

                if (Kiwi.DEVICE.touch) {
                    this._updateTouch();
                } else {
                    this._updateMouse();
                }

                if (this.isDragging) {
                    if (this._dragSnapToCenter === false) {
                        this.owner.transform.x = Kiwi.Utils.GameMath.snapTo((this._isDragging.x - this._distance.x), this._dragDistance);
                        this.owner.transform.y = Kiwi.Utils.GameMath.snapTo((this._isDragging.y - this._distance.y), this._dragDistance);
                    } else {
                        this.owner.transform.x = Kiwi.Utils.GameMath.snapTo((this._isDragging.x - this._box.hitbox.width / 2), this._dragDistance);
                        this.owner.transform.y = Kiwi.Utils.GameMath.snapTo((this._isDragging.y - this._box.hitbox.height / 2), this._dragDistance);
                    }
                }
            };

            /**
            * The update loop that gets executed when the game is using the touch manager.
            * @method _updateTouch
            * @private
            */
            Input.prototype._updateTouch = function () {
                for (var i = 0; i < this.game.input.touch.fingers.length; i++) {
                    if (this.game.input.touch.fingers[i].active === true) {
                        this._evaluateTouchPointer(this.game.input.touch.fingers[i]);
                    } else if (this.isDown === true && this._isDown.id === this.game.input.touch.fingers[i].id) {
                        this._nowUp = this.game.input.touch.fingers[i];
                    } else if (this.isDown === false && this._nowUp === null && this.withinBounds === true && this._withinBounds.id === this.game.input.touch.fingers[i].id) {
                        this._nowUp = this.game.input.touch.fingers[i];
                    }
                }

                if (this._nowEntered !== null && this.withinBounds === false) {
                    this._withinBounds = this._nowEntered;
                    this._outsideBounds = false;
                    this._onEntered.dispatch(this.owner, this._nowEntered);
                }

                if (this._nowLeft !== null && this.withinBounds === true) {
                    this._withinBounds = null;
                    this._outsideBounds = true;
                    this._onLeft.dispatch(this.owner, this._nowLeft);
                }

                if (this._nowDown !== null && this.isDown === false) {
                    this._onDown.dispatch(this.owner, this._nowDown);
                    this._isDown = this._nowDown;
                    this._isUp = false;
                    this._withinBounds = this._nowDown;
                    this._outsideBounds = false;
                }

                if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                    this._onDragStarted.dispatch(this.owner, this._nowDragging);
                    this._isDragging = this._nowDragging;
                }

                if (this._nowUp !== null) {
                    this._onUp.dispatch(this.owner, this._nowUp);
                    this._isDown = null;
                    this._isUp = true;
                    this._withinBounds = null;
                    this._outsideBounds = true;

                    if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                        this._isDragging = null;
                        this._onDragStopped.dispatch(this.owner, this._nowUp);
                    }
                }
            };

            /**
            * A private method for checking to see if a touch pointer should activate any events.
            * @method _evaluateTouchPointer
            * @param {Kiwi.Input.Finger} pointer
            * @private
            */
            Input.prototype._evaluateTouchPointer = function (pointer) {
                if (this.isDown === false || this._isDown.id === pointer.id) {
                    if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.hitbox).result) {
                        if (this.isDown === true && this._isDown.id === pointer.id || this.isDown === false && pointer.duration > 1) {
                            this._nowEntered = pointer;
                        }

                        if (this.isDown === false && pointer.frameDuration < 2) {
                            this._nowDown = pointer;
                        }

                        if (this._dragEnabled && this.isDragging == false && this.isDown == true) {
                            this._distance.x = pointer.x - this._box.hitbox.left;
                            this._distance.y = pointer.y - this._box.hitbox.top;
                            this._nowDragging = pointer;
                        }
                    } else {
                        if (this.isDown === true) {
                            this._nowLeft = pointer;
                        } else if (this.withinBounds === true && this._withinBounds.id == pointer.id) {
                            this._nowLeft = pointer;
                        }
                    }
                }
            };

            /**
            * The update loop that runs when the mouse manager is the method for interacting with the screen.
            * @method _updateMouse
            * @private
            */
            Input.prototype._updateMouse = function () {
                this._evaluateMousePointer(this.game.input.mouse.cursor);

                if (this._nowLeft !== null) {
                    this._onLeft.dispatch(this.owner, this._nowLeft);
                }

                if (this._nowEntered !== null) {
                    this._onEntered.dispatch(this.owner, this._nowEntered);
                }

                if (this._nowDown !== null && this.isDown === false) {
                    this._onDown.dispatch(this.owner, this._nowDown);
                    this._isDown = this._nowDown;
                    this._isUp = false;
                }

                if (this._dragEnabled == true && this.isDragging === false && this._nowDragging !== null) {
                    this._onDragStarted.dispatch(this.owner, this._nowDragging);
                    this._isDragging = this._nowDragging;
                }

                if (this.isDown === true && this._nowUp !== null && this._isDown.id === this._nowUp.id) {
                    this._onUp.dispatch(this.owner, this._nowUp);

                    if (this.isDragging === true && this._isDragging.id == this._nowUp.id) {
                        this._isDragging = null;
                        this._onDragStopped.dispatch(this.owner, this._nowUp);
                    }

                    this._isDown = null;
                    this._isUp = true;
                }
            };

            /**
            * Evaluates where and what the mouse cursor is doing in relation to this box. Needs a little bit more love.
            * @method _evaluateMousePointer
            * @param {Kiwi.Input.MouseCursor} pointer
            * @private
            */
            Input.prototype._evaluateMousePointer = function (pointer) {
                if (Kiwi.Geom.Intersect.circleToRectangle(pointer.circle, this._box.hitbox).result) {
                    if (this._dragEnabled && this.isDragging === false) {
                        this._distance.x = pointer.x - this._box.hitbox.left;
                        this._distance.y = pointer.y - this._box.hitbox.top;
                    }

                    if (this.withinBounds === false) {
                        this._nowEntered = pointer;
                        this._withinBounds = pointer;
                        this._outsideBounds = false;
                        this._justEntered = true;
                    }
                } else {
                    if (this.withinBounds === true && this.isDragging === false) {
                        this._nowLeft = pointer;
                        this._withinBounds = null;
                        this._outsideBounds = true;
                    }
                }

                if (pointer.isDown === true) {
                    if (this._justEntered) {
                        this._isDown = pointer;
                        this._isUp = false;
                        this._tempDragDisabled = true;
                    }

                    if (this.withinBounds === true && this.isDown === false && this._nowDown === null) {
                        this._nowDown = pointer;
                    }

                    if (this._dragEnabled === true && this.isDragging == false && this._tempDragDisabled === false) {
                        if (this.isDown == true) {
                            this._nowDragging = pointer;
                        }
                    }
                } else {
                    if (this._tempDragDisabled === true)
                        this._tempDragDisabled = false;

                    if (this.isDown === true) {
                        this._nowUp = pointer;
                    }
                }

                if (this._justEntered)
                    this._justEntered = false;
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} A string representation of this object.
            * @publics
            */
            Input.prototype.toString = function () {
                return '[{Input (x=' + this.withinBounds + ')}]';
            };

            /**
            * Destroys the input.
            * @method destory
            * @public
            */
            Input.prototype.destroy = function () {
                _super.prototype.destroy.call(this);

                this.enabled = false;
                delete this._box;
                delete this._isDown;
                delete this._isUp;
                delete this._isDragging;
                delete this._dragEnabled;
                if (this._onDown)
                    this._onDown.dispose();
                delete this._onDown;
                if (this._onDragStarted)
                    this._onDragStarted.dispose();
                delete this._onDragStarted;
                if (this._onUp)
                    this._onUp.dispose();
                delete this._onUp;
                if (this._onLeft)
                    this._onLeft.dispose();
                delete this._onLeft;
                if (this._onEntered)
                    this._onEntered.dispose();
                delete this._onEntered;
                if (this._onDragStopped)
                    this._onDragStopped.dispose();
                delete this._onDragStopped;
                delete this._dragDistance;
            };
            return Input;
        })(Kiwi.Component);
        Components.Input = Input;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Components
    * @module Kiwi
    * @submodule Components
    *
    */
    (function (Components) {
        /**
        *
        *
        * @class Sound
        *
        */
        var Sound = (function (_super) {
            __extends(Sound, _super);
            /*
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @return Kiwi.Components.Sound
            */
            function Sound(parent) {
                _super.call(this, parent, 'Sound');

                this._audio = [];
            }
            /*
            * Creates a new audio segment with the name given.
            *
            * @method addSound
            * @param {string} name
            * @param {string} key
            * @param {number} volume
            * @param {bool} loop
            * @return {Kiwi.Sound.Audio}
            */
            Sound.prototype.addSound = function (name, key, volume, loop) {
                if (this._validate(name) == true)
                    return;

                var audio = this.game.audio.add(key, volume, loop);
                this._audio[name] = audio;

                return audio;
            };

            /*
            * Removes the audio sementment with the name you have given.
            *
            * @method removeSound
            * @param {string} name
            */
            Sound.prototype.removeSound = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].stop();
                this._audio[name].destroy();
                delete this._audio[name];
            };

            /*
            * Returns the audio for the sound that you pass...
            *
            * @method getSound
            * @param {string} name
            * @return {Kiwi.Sound.Audio}
            */
            Sound.prototype.getSound = function (name) {
                if (this._validate(name) == false)
                    return;

                return this._audio[name];
            };

            /*
            * This method is used to check to see if an audio segment with the name you specify is on this component.
            *
            * @method _validate
            * @param {string} name
            * @return {bool}
            */
            Sound.prototype._validate = function (name) {
                if (this._audio[name] === undefined) {
                    return false;
                } else {
                    return true;
                }
            };

            /*
            * Plays the audio that you specify.
            *
            * @method play
            * @param {string} name
            */
            Sound.prototype.play = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].play();
            };

            /*
            * Stops the audio that you specify.
            *
            * @method play
            * @param {string} name
            */
            Sound.prototype.stop = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].stop();
            };

            /*
            * Pauses the audio that you specify.
            *
            * @method play
            * @param {string} name
            */
            Sound.prototype.pause = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].pause();
            };

            /*
            * Resumes the audio that you specify. Used after you pause.
            *
            * @method play
            * @param {string} name
            */
            Sound.prototype.resume = function (name) {
                if (this._validate(name) == false)
                    return;

                this._audio[name].resume();
            };

            Sound.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                for (var key in this._audio) {
                    this._audio[key].stop();
                    this._audio[key].destroy();
                    delete this._audio[key];
                }
                delete this._audio;
            };
            return Sound;
        })(Kiwi.Component);
        Components.Sound = Sound;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Components
    * @module Kiwi
    * @submodule Components
    *
    */
    (function (Components) {
        /**
        * Ported from Flixel, most functions operation identically to the original flixel functions, though some
        * have been split into multiple functions. Generally where functions originally accepted
        * either groups or gameobjects within the same argument, the ported functions one or the other.
        * http://www.flixel.org/
        * http://www.adamatomic.com/
        *
        * @class ArcadePhysics
        *
        * @author Adam 'Atomic' Saltsman, Flixel
        *
        */
        var ArcadePhysics = (function (_super) {
            __extends(ArcadePhysics, _super);
            /**
            *
            * @constructor
            * @param {Kiwi.Entity} entity
            * @return {Kiwi.Components.ArcadePhysics}
            */
            function ArcadePhysics(entity) {
                _super.call(this, entity, 'ArcadePhysics');
                /**
                * A function that is to execute when this object overlaps with another.
                * @private
                */
                this._callbackFunction = null;
                /**
                * The context that the callback method should have when it executes.
                * @private
                */
                this._callbackContext = null;

                this._parent = entity;
                this.transform = this._parent.transform;
                this.width = this._parent.width;
                this.height = this._parent.height;

                this.last = new Kiwi.Geom.Point(this.transform.x, this.transform.y);
                this.mass = 1.0;
                this.elasticity = 0.0;

                this.immovable = false;
                this.moves = true;

                this.touching = ArcadePhysics.NONE;
                this.wasTouching = ArcadePhysics.NONE;
                this.allowCollisions = ArcadePhysics.ANY;

                this.velocity = new Kiwi.Geom.Point();
                this.acceleration = new Kiwi.Geom.Point();
                this.drag = new Kiwi.Geom.Point();
                this.maxVelocity = new Kiwi.Geom.Point(10000, 10000);

                this.angle = 0;
                this.angularVelocity = 0;
                this.angularAcceleration = 0;
                this.angularDrag = 0;
                this.maxAngular = 10000;
            }
            /**
            * The type of object that this is.
            *
            * @method objType
            * @return {string}
            */
            ArcadePhysics.prototype.objType = function () {
                return "ArcadePhysics";
            };

            /**
            * Whether the object collides or not.  For more control over what directions
            * the object will collide from, use collision constants (like LEFT, FLOOR, etc)
            * to set the value of allowCollisions directly.
            * @method solid
            * @param {bool} value
            * @return bool
            */
            ArcadePhysics.prototype.solid = function (value) {
                if (value !== undefined) {
                    if (value)
                        this.allowCollisions = ArcadePhysics.ANY;
else
                        this.allowCollisions = ArcadePhysics.NONE;
                }

                return (this.allowCollisions & ArcadePhysics.ANY) > ArcadePhysics.NONE;
            };

            ArcadePhysics.collide = ////////Static functions/////////
            /*
            * A Static method to check to see if two objects collide or not. Returns a boolean indicating weither they overlaped or not.
            *
            * @method collide
            * @param {Kiwi.GameObjects.Entity} gameObject1
            * @param {Kiwi.GameObjects.Entity} gameObject2
            * @param {bool} seperate
            * @return {bool}
            */
            function (gameObject1, gameObject2, seperate) {
                if (typeof seperate === "undefined") { seperate = true; }
                return ArcadePhysics.overlaps(gameObject1, gameObject2, seperate);
            };

            ArcadePhysics.collideGroup = /*
            * A Static method to check to see if a single entity collides with a group of entities. Returns a boolean indicating weither they overlaped or not.
            *
            * @method collideGroup
            * @param {Kiwi.GameObjects.Entity} gameObject1
            * @param {Any} group
            * @param {bool} seperate
            * @return {bool}
            */
            function (gameObject, group, seperate) {
                if (typeof seperate === "undefined") { seperate = true; }
                return ArcadePhysics.overlapsObjectGroup(gameObject, group, seperate);
            };

            ArcadePhysics.collideGroupGroup = /*
            * A Static method to check to see if a group of entities overlap with another group of entities. Returns a boolean indicating weither they overlaped or not.
            *
            * @method collideGroupGroup
            * @param {Kiwi.GameObjects.Entity} gameObject1
            * @param {Any} group
            * @param {bool} seperate
            * @return {bool}
            */
            function (group1, group2, seperate) {
                if (typeof seperate === "undefined") { seperate = true; }
                return ArcadePhysics.overlapsGroupGroup(group1, group2, seperate);
            };

            ArcadePhysics.overlaps = /*
            * A Static method to that checks to see if two objects overlap. Returns a boolean indicating weither they did or not.
            *
            * @method overlaps
            * @param {Kiwi.GameObjects.Entity} gameObject1
            * @param {Kiwi.GameObjects.Entity} gameObject2
            * @param {bool} separate
            * @return {bool}
            */
            function (gameObject1, gameObject2, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                //Flixel uses quadtree here
                //object vs object
                var obj1Physics = gameObject1.components.getComponent("ArcadePhysics");

                return obj1Physics.overlaps(gameObject2, separateObjects);
            };

            ArcadePhysics.overlapsObjectGroup = /*
            * A Static method to that checks to see if a single object overlaps with a group of entities. Returns a boolean indicating weither they did or not.
            *
            * @method overlaps
            * @param {Kiwi.GameObjects.Entity} gameObject1
            * @param {Any} group
            * @param {bool} separate - If they overlap should the seperate or not
            * @return {bool}
            */
            function (gameObject, group, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var objPhysics = gameObject.components.getComponent("ArcadePhysics");
                return objPhysics.overlapsGroup(group, separateObjects);
            };

            ArcadePhysics.overlapsGroupGroup = /*
            * A Static method that checks to see if any objects in a group overlap with objects in another group.
            *
            * @method overlaps
            * @param {Any} gameObject1
            * @param {Any} gameObject2
            * @param {bool} separate - If they overlap should the seperate or not
            * @return {bool}
            */
            function (group1, group2, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = true; }
                var result = false;

                if (group1.childType !== undefined && group1.childType() === Kiwi.GROUP) {
                    //if group1 is a type of group...
                    var members = group1.members;
                    var i = 0;

                    while (i < group1.members.length) {
                        if (members[i].childType() == Kiwi.GROUP) {
                            if (ArcadePhysics.overlapsGroupGroup(members[i++], group2, separateObjects))
                                result = true;
                        } else {
                            if (ArcadePhysics.overlapsObjectGroup(members[i++], group2, separateObjects))
                                result = true;
                        }
                    }
                } else if (Object.prototype.toString.call(group1) == '[object Array]') {
                    for (var i = 0; i < group1.length; i++) {
                        if (group1[i].childType !== undefined && group1[i].childType() === Kiwi.ENTITY) {
                            if (ArcadePhysics.overlapsObjectGroup(group1[i], group2, separateObjects))
                                result = true;
                        }
                    }
                }

                return result;
            };

            ArcadePhysics.separate = /*
            * A static method for seperating two objects. Both objects need to have physics, position and size components in order for this to work.
            *
            * @method seperate
            * @param {Kiwi.Entity} object1
            * @param {Kiwi.Entity} object2
            * @return {bool}
            */
            function (object1, object2) {
                var separatedX = this.separateX(object1, object2);
                var separatedY = this.separateY(object1, object2);
                return separatedX || separatedY;
            };

            ArcadePhysics.separateX = /**
            * The X-axis component of the object separation process.
            *
            * @param	{Kiwi.Entity} object1
            * @param	{Kiwi.Entity} object2
            *
            * @return	Whether the objects in fact touched and were separated along the X axis.
            */
            function (object1, object2) {
                var phys1 = object1.components._components["ArcadePhysics"];
                var phys2 = object2.components._components["ArcadePhysics"];

                //can't separate two immovable objects
                var obj1immovable = phys1.immovable;
                var obj2immovable = phys2.immovable;
                if (obj1immovable && obj2immovable)
                    return false;

                //First, get the two object deltas
                var overlap = 0;
                var obj1delta = phys1.transform.x - phys1.last.x;
                var obj2delta = phys2.transform.x - phys2.last.x;

                if (obj1delta != obj2delta) {
                    //Check if the X hulls actually overlap
                    var obj1deltaAbs = (obj1delta > 0) ? obj1delta : -obj1delta;
                    var obj2deltaAbs = (obj2delta > 0) ? obj2delta : -obj2delta;

                    //where they were before
                    var obj1rect = new Kiwi.Geom.Rectangle(phys1.transform.x - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y, phys1.width + ((obj1delta > 0) ? obj1delta : -obj1delta), phys1.height);
                    var obj2rect = new Kiwi.Geom.Rectangle(phys2.transform.x - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y, phys2.width + ((obj2delta > 0) ? obj2delta : -obj2delta), phys2.height);
                    if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                        var maxOverlap = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                        if (obj1delta > obj2delta) {
                            overlap = phys1.transform.x + phys1.width - phys2.transform.x;
                            if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(phys2.allowCollisions & ArcadePhysics.LEFT)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.RIGHT;
                                phys2.touching |= ArcadePhysics.LEFT;
                            }
                        } else if (obj1delta < obj2delta) {
                            overlap = phys1.transform.x - phys2.width - phys2.transform.x;
                            if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.LEFT) || !(phys2.allowCollisions & ArcadePhysics.RIGHT)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.LEFT;
                                phys2.touching |= ArcadePhysics.RIGHT;
                            }
                        }
                    }
                }

                if (overlap != 0) {
                    var obj1v = phys1.velocity.x;
                    var obj2v = phys2.velocity.x;

                    if (!obj1immovable && !obj2immovable) {
                        overlap *= 0.5;
                        phys1.transform.x = phys1.transform.x - overlap;
                        phys2.transform.x = phys2.transform.x + overlap;

                        var obj1velocity = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                        var obj2velocity = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                        var average = (obj1velocity + obj2velocity) * 0.5;
                        obj1velocity -= average;
                        obj2velocity -= average;
                        phys1.velocity.x = average + obj1velocity * phys1.elasticity;
                        phys2.velocity.x = average + obj2velocity * phys2.elasticity;
                    } else if (!obj1immovable) {
                        phys1.transform.x = phys1.transform.x - overlap;
                        phys1.velocity.x = obj2v - obj1v * phys1.elasticity;
                    } else if (!obj2immovable) {
                        phys2.transform.x = phys2.transform.x + overlap;
                        phys2.velocity.x = obj1v - obj2v * phys2.elasticity;
                    }
                    return true;
                } else
                    return false;
            };

            ArcadePhysics.separateY = /**
            * The Y-axis component of the object separation process.
            *
            * @param	{Kiwi.Entity} object1
            * @param	{Kiwi.Entity} object2
            *
            * @return	Whether the objects in fact touched and were separated along the Y axis.
            */
            function (object1, object2) {
                var phys1 = object1.components._components["ArcadePhysics"];
                var phys2 = object2.components._components["ArcadePhysics"];

                //can't separate two immovable objects
                var obj1immovable = phys1.immovable;
                var obj2immovable = phys2.immovable;
                if (obj1immovable && obj2immovable)
                    return false;

                //removed tilemaps
                //First, get the two object deltas
                var overlap = 0;

                var obj1delta = phys1.transform.y - phys1.last.y;

                var obj2delta = phys2.transform.y - phys2.last.y;
                if (obj1delta != obj2delta) {
                    //Check if the Y hulls actually overlap
                    var obj1deltaAbs = (obj1delta > 0) ? obj1delta : -obj1delta;
                    var obj2deltaAbs = (obj2delta > 0) ? obj2delta : -obj2delta;
                    var obj1rect = new Kiwi.Geom.Rectangle(phys1.transform.x, phys1.transform.y - ((obj1delta > 0) ? obj1delta : 0), phys1.width, phys1.height + obj1deltaAbs);
                    var obj2rect = new Kiwi.Geom.Rectangle(phys2.transform.x, phys2.transform.y - ((obj2delta > 0) ? obj2delta : 0), phys2.width, phys2.height + obj2deltaAbs);
                    if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                        var maxOverlap = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                        if (obj1delta > obj2delta) {
                            overlap = phys1.transform.y + phys1.height - phys2.transform.y;
                            if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(phys2.allowCollisions & ArcadePhysics.UP)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.DOWN;
                                phys2.touching |= ArcadePhysics.UP;
                            }
                        } else if (obj1delta < obj2delta) {
                            overlap = phys1.transform.y - phys2.height - phys2.transform.y;
                            if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.UP) || !(phys2.allowCollisions & ArcadePhysics.DOWN)) {
                                overlap = 0;
                            } else {
                                phys1.touching |= ArcadePhysics.UP;
                                phys2.touching |= ArcadePhysics.DOWN;
                            }
                        }
                    }
                }

                if (overlap != 0) {
                    var obj1v = phys1.velocity.y;
                    var obj2v = phys2.velocity.y;

                    if (!obj1immovable && !obj2immovable) {
                        overlap *= 0.5;
                        phys1.transform.y = phys1.transform.y - overlap;
                        phys2.transform.y = phys2.transform.y + overlap;

                        var obj1velocity = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                        var obj2velocity = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                        var average = (obj1velocity + obj2velocity) * 0.5;
                        obj1velocity -= average;
                        obj2velocity -= average;
                        phys1.velocity.y = average + obj1velocity * phys1.elasticity;
                        phys2.velocity.y = average + obj2velocity * phys2.elasticity;
                    } else if (!obj1immovable) {
                        phys1.transform.y = phys1.transform.y - overlap;
                        phys1.velocity.y = obj2v - obj1v * phys1.elasticity;

                        if (object2.active && phys2.moves && (obj1delta > obj2delta))
                            phys1.transform.x = phys1.transform.x + object2.transform.x - phys2.last.x;
                    } else if (!obj2immovable) {
                        phys2.transform.y = phys2.transform.y + overlap;
                        phys2.velocity.y = obj1v - obj2v * phys2.elasticity;

                        if (object1.active && phys1.moves && (obj1delta < obj2delta))
                            phys2.transform.x = phys2.transform.x + object1.transform.x - phys1.last.x;
                    }
                    return true;
                } else
                    return false;
            };

            ArcadePhysics.computeVelocity = /**
            * CURRENTLY UNTESTED...
            */
            function (velocity, acceleration, drag, max) {
                if (typeof acceleration === "undefined") { acceleration = 0; }
                if (typeof drag === "undefined") { drag = 0; }
                if (typeof max === "undefined") { max = 10000; }
                /*
                if (acceleration != 0)
                velocity += acceleration * ArcadePhysics.updateInterval;
                else if (drag != 0) {
                drag = drag * ArcadePhysics.updateInterval;
                if (velocity - drag > 0)
                velocity = velocity - drag;
                else if (velocity + drag < 0)
                velocity += drag;
                else
                velocity = 0;
                }
                if ((velocity != 0) && (max != 10000)) {
                if (velocity > max)
                velocity = max;
                else if (velocity < -max)
                velocity = -max;
                }
                return velocity;*/
            };

            ////////Instance Functions/////////
            /**
            * A method to check to see if the parent of this physics component overlaps with another Kiwi.Entity.
            *
            * @method overlaps
            * @param { Kiwi.Entity } gameObject
            * @param { bool } seperateObjects
            * @return { bool }
            */
            ArcadePhysics.prototype.overlaps = function (gameObject, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = false; }
                var objTransform = gameObject.transform;

                var result = (objTransform.x + gameObject.width > this.transform.x) && (objTransform.x < this.transform.x + this.width) && (objTransform.y + gameObject.height > this.transform.y) && (objTransform.y < this.transform.y + this.height);

                if (result && separateObjects) {
                    ArcadePhysics.separate(this._parent, gameObject);
                }

                if (result && this._callbackFunction !== null && this._callbackContext !== null) {
                    this._callbackFunction.call(this._callbackContext, this._parent, gameObject);
                }

                return result;
            };

            /**
            * A method to check to see if the parent of this physics component overlaps with another group of objects
            *
            * @method overlaps
            * @param { Kiwi.Group } gameObject
            * @param { bool } seperateObjects
            * @return { bool }
            */
            ArcadePhysics.prototype.overlapsGroup = function (group, separateObjects) {
                if (typeof separateObjects === "undefined") { separateObjects = false; }
                //if the group is a Kiwi.Group
                var results = false;

                if (group.childType !== undefined && group.childType() === Kiwi.GROUP) {
                    for (var i = 0; i < group.members.length; i++) {
                        if (group.members[i].childType() === Kiwi.GROUP) {
                            //recursively check overlap
                            this.overlapsGroup(group.members[i], separateObjects);
                        } else {
                            if (this.overlaps(group.members[i], separateObjects)) {
                                if (this._callbackContext !== null && this._callbackFunction !== null)
                                    this._callbackFunction.call(this._callbackContext, this._parent, group.members[i]);
                                results = true;
                            }
                        }
                    }
                } else if (Object.prototype.toString.call(group) == '[object Array]') {
                    for (var i = 0; i < group.length; i++) {
                        if (group[i].childType !== undefined && group[i].childType() === Kiwi.ENTITY) {
                            if (this.overlaps(group[i], separateObjects)) {
                                this._callbackFunction.call(this._callbackContext, this._parent, group[i]);
                                results = true;
                            }
                        }
                    }
                }

                return results;
            };

            /**
            * Updates the motion...
            * UNTESTED.
            */
            ArcadePhysics.prototype.updateMotion = function () {
                /*
                var delta: number;
                var velocityDelta: number;
                
                
                velocityDelta = (ArcadePhysics.computeVelocity(this.angularVelocity, this.angularAcceleration, this.angularDrag, this.maxAngular) - this.angularVelocity) / 2;
                this.angularVelocity += velocityDelta;
                this.angle += this.angularVelocity * ArcadePhysics.updateInterval;
                this.angularVelocity += velocityDelta;
                
                velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.x, this.acceleration.x, this.drag.x, this.maxVelocity.x) - this.velocity.x) / 2;
                this.velocity.x += velocityDelta;
                delta = this.velocity.x * ArcadePhysics.updateInterval;
                this.velocity.x += velocityDelta;
                this.transform.x = this.transform.x + delta;
                
                velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.y, this.acceleration.y, this.drag.y, this.maxVelocity.y) - this.velocity.y) / 2;
                this.velocity.y += velocityDelta;
                delta = this.velocity.y * ArcadePhysics.updateInterval;
                this.velocity.y += velocityDelta;
                this.transform.y = this.transform.y + delta;
                */
            };

            /**
            * Sets up a callback function that will run when this object overlaps with another.
            *
            * @method setCallback
            * @param {function} callbackFunction
            * @param {any} callbackContext
            */
            ArcadePhysics.prototype.setCallback = function (callbackFunction, callbackContext) {
                this._callbackFunction = callbackFunction;
                this._callbackContext = callbackContext;
            };

            /**
            * Returns the parent of this entity. Mainly used for executing callbacks.
            *
            * @method parent
            * @return {Kiwi.Entity}
            */
            ArcadePhysics.prototype.parent = function () {
                return this._parent;
            };

            /**
            * The Update loop of the physics component
            */
            ArcadePhysics.prototype.update = function () {
                //Flixel preupdate
                this.last.x = this.transform.x;
                this.last.y = this.transform.y;

                //update width/height. Needs to find better spot
                this.width = this._parent.width;
                this.height = this._parent.height;

                if (this.moves)
                    this.updateMotion();

                this.wasTouching = this.touching;
                this.touching = ArcadePhysics.NONE;
            };

            ArcadePhysics.prototype.destroy = function () {
                _super.prototype.destroy.call(this);

                delete this.transform;
                delete this._parent;
                delete this._callbackContext;
                delete this._callbackFunction;
            };
            ArcadePhysics.LEFT = 0x0001;

            ArcadePhysics.RIGHT = 0x0010;

            ArcadePhysics.UP = 0x0100;

            ArcadePhysics.DOWN = 0x1000;

            ArcadePhysics.NONE = 0;

            ArcadePhysics.CEILING = ArcadePhysics.UP;

            ArcadePhysics.FLOOR = ArcadePhysics.DOWN;

            ArcadePhysics.WALL = ArcadePhysics.LEFT | ArcadePhysics.RIGHT;

            ArcadePhysics.ANY = ArcadePhysics.LEFT | ArcadePhysics.RIGHT | ArcadePhysics.UP | ArcadePhysics.DOWN;

            ArcadePhysics.OVERLAP_BIAS = 4;
            return ArcadePhysics;
        })(Kiwi.Component);
        Components.ArcadePhysics = ArcadePhysics;
    })(Kiwi.Components || (Kiwi.Components = {}));
    var Components = Kiwi.Components;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Files
    * @module Kiwi
    * @submodule Files
    *
    */
    (function (Files) {
        /**
        *
        * @class Loader
        *
        */
        var Loader = (function () {
            /**
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @return {Loader} This Object
            */
            function Loader(game) {
                /**
                * If a real byte value calculation will be made prior to the load (much smoother progress bar but costs HEAD calls x total file count)
                * @property _calculateBytes
                * @type Boolean
                * @private
                */
                this._calculateBytes = true;
                /**
                * Total number of files to be loaded
                * @property _fileTotal
                * @type Number
                * @private
                */
                this._fileTotal = 0;
                /**
                * The most recently loaded file (out of the total)
                * @property _currentFile
                * @type Number
                * @private
                */
                this._currentFile = 0;
                /**
                * Total file size (in bytes) of all files to be loaded - only set if calculateBytes is true
                * @property _bytesTotal
                * @type Number
                * @private
                */
                this._bytesTotal = 0;
                /**
                * Total number of bytes loaded so far (out of _bytesTotal)
                * @property _bytesLoaded
                * @type Number
                * @private
                */
                this._bytesLoaded = 0;
                /**
                * Total number of bytes loaded from last completed file
                * @property _bytesCurrent
                * @type Number
                * @private
                */
                this._bytesCurrent = 0;
                /**
                * When using the tag loader we don't have a byte total, just a X of files total - this holds the percentage each file from that total is worth
                * @property _fileChunk
                * @type Number
                * @private
                */
                this._fileChunk = 0;
                /**
                * The total % of the current queue that has been loaded
                * @property _percentLoaded
                * @type Number
                * @private
                */
                this._percentLoaded = 0;
                /**
                * Everything in the queue loaded?
                * @property _complete
                * @type Boolean
                * @private
                */
                this._complete = false;
                this._game = game;
            }
            Loader.prototype.objType = function () {
                return "Loader";
            };

            //  DOM is ready
            /**
            *
            * @method boot
            */
            Loader.prototype.boot = function () {
                this._fileList = [];
                this._loadList = [];
            };

            /**
            *
            * @method init
            * @param {Any} [progress]
            * @param {Any} [complete]
            * @param {Boolean} calculateBytes
            */
            Loader.prototype.init = function (progress, complete, calculateBytes) {
                if (typeof progress === "undefined") { progress = null; }
                if (typeof complete === "undefined") { complete = null; }
                if (typeof calculateBytes === "undefined") { calculateBytes = false; }
                this._fileList.length = 0;
                this._loadList.length = 0;

                this._calculateBytes = calculateBytes;
                this._complete = false;

                if (progress !== null) {
                    this._onProgressCallback = progress;
                }

                if (complete !== null) {
                    this._onCompleteCallback = complete;
                }
            };

            /**
            *
            * @method addImage
            * @param {String} key
            * @param {String} url
            */
            Loader.prototype.addImage = function (key, url, width, height, offsetX, offsetY, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.IMAGE, url, key, true, storeAsGlobal);
                file.metadata = { width: width, height: height, offsetX: offsetX, offsetY: offsetY };

                this._fileList.push(file);
            };

            /**
            *
            * @method addSpriteSheet
            * @param {String} key
            * @param {String} url
            * @param {number} frameWidth
            * @param {number} frameHeight
            
            */
            Loader.prototype.addSpriteSheet = function (key, url, frameWidth, frameHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.SPRITE_SHEET, url, key, true, storeAsGlobal);

                file.metadata = { frameWidth: frameWidth, frameHeight: frameHeight, numCells: numCells, rows: rows, cols: cols, sheetOffsetX: sheetOffsetX, sheetOffsetY: sheetOffsetY, cellOffsetX: cellOffsetX, cellOffsetY: cellOffsetY };

                this._fileList.push(file);
            };

            /// ***
            Loader.prototype.addTextureAtlas = function (key, imageURL, jsonID, jsonURL, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                var imageFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXTURE_ATLAS, imageURL, key, true, storeAsGlobal);
                var jsonFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, jsonURL, jsonID, true, storeAsGlobal);

                imageFile.metadata = { jsonID: jsonID };
                jsonFile.metadata = { imageID: key };

                this._fileList.push(imageFile, jsonFile);
            };

            /**
            *
            * @method addAudio
            * @param {String} key
            * @param {String} url
            
            */
            Loader.prototype.addAudio = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.AUDIO, url, key, true, storeAsGlobal));
            };

            /**
            *
            * @method addJSON
            * @param {String} key
            * @param {String} url
            
            */
            Loader.prototype.addJSON = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, url, key, true, storeAsGlobal));
            };

            /**
            *
            * @method addXML
            * @param {String} key
            * @param {String} url
            */
            Loader.prototype.addXML = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.XML, url, key, true, storeAsGlobal));
            };

            /**
            *
            * @method addBinaryFile
            * @param {String} key
            * @param {String} url
            */
            Loader.prototype.addBinaryFile = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.BINARY_DATA, url, key, true, storeAsGlobal));
            };

            /**
            *
            * @method addTextFile
            * @param {String} key
            * @param {String} url
            */
            Loader.prototype.addTextFile = function (key, url, storeAsGlobal) {
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXT_DATA, url, key, true, storeAsGlobal));
            };

            /**
            *
            * @method startLoad
            */
            Loader.prototype.startLoad = function () {
                if (this._fileList.length === 0) {
                    this._onCompleteCallback();
                } else {
                    this._onProgressCallback(0, 0, null);

                    this._fileTotal = this._fileList.length;
                    this._bytesLoaded = 0;
                    this._bytesTotal = 0;
                    this._bytesCurrent = 0;
                    this._currentFile = 0;
                    this._fileChunk = 0;
                    this._percentLoaded = 0;

                    if (this._calculateBytes === true) {
                        this.getNextFileSize();
                    } else {
                        this._fileChunk = Math.floor(100 / this._fileTotal);
                        this._loadList = this._fileList;

                        this.nextFile();
                    }
                }
            };

            /**
            *
            * @method getNextFileSize
            */
            Loader.prototype.getNextFileSize = function () {
                var _this = this;
                if (this._fileList.length === 0) {
                    var tempFile = this._fileList.shift();

                    tempFile.getFileDetails(function (file) {
                        return _this.addToBytesTotal(file);
                    });
                } else {
                    this.nextFile();
                }
            };

            /**
            *
            * @method addToBytesTotal
            * @param {Kiwi.Files} file
            */
            Loader.prototype.addToBytesTotal = function (file) {
                this._bytesTotal += file.fileSize;

                this._loadList.push(file);

                this.getNextFileSize();
            };

            /**
            *
            * @method nextFile
            */
            Loader.prototype.nextFile = function () {
                var _this = this;
                this._currentFile++;

                var tempFile = this._loadList.shift();

                tempFile.load(function (f) {
                    return _this.fileLoadComplete(f);
                }, function (f) {
                    return _this.fileLoadProgress(f);
                });
            };

            /**
            *
            * @method fileLoadProgress
            * @param {Kiwi.Files} file
            */
            Loader.prototype.fileLoadProgress = function (file) {
                if (this._calculateBytes === true) {
                    this._bytesCurrent = file.bytesLoaded;

                    if (this._onProgressCallback) {
                        //  Send: the percentage complete (overall), the bytes total (overall) and the file currently being loaded
                        this._onProgressCallback(this.getPercentLoaded(), this.getBytesLoaded(), file);
                    }
                }
            };

            /**
            *
            * @method fileLoadComplete
            * @param {Kiwi.Files} file
            */
            Loader.prototype.fileLoadComplete = function (file) {
                if (this._calculateBytes === true) {
                    this._bytesLoaded += file.bytesTotal;
                    this._bytesCurrent = 0;

                    if (this._onProgressCallback) {
                        //  Send: the percentage complete (overall), the bytes total (overall) and the file currently being loaded
                        this._onProgressCallback(this.getPercentLoaded(), this._bytesLoaded, file);
                    }
                } else {
                    if (this._onProgressCallback) {
                        //  Send: the percentage complete (overall)
                        this._onProgressCallback(this.getPercentLoaded(), 0, file);
                    }
                }

                if (this._loadList.length === 0) {
                    //  All files loaded
                    this._complete = true;

                    if (this._onCompleteCallback) {
                        this._onCompleteCallback();
                    }
                } else {
                    this.nextFile();
                }
            };

            /**
            *
            * @method getBytesLoaded
            * @return {Number}
            */
            Loader.prototype.getBytesLoaded = function () {
                return this._bytesLoaded + this._bytesCurrent;
            };

            /**
            *
            * @method getPercentLoaded
            * @return {Number}
            */
            Loader.prototype.getPercentLoaded = function () {
                if (this._calculateBytes === true) {
                    return Math.round((this.getBytesLoaded() / this._bytesTotal) * 100);
                } else {
                    return Math.round((this._currentFile / this._fileTotal) * 100);
                }
            };

            /**
            * If true (and xhr/blob is available) the loader will get the bytes total of each file in the queue to give a much more accurate progress report during load
            If false the loader will use the file number as the progress value, i.e. if there are 4 files in the queue progress will get called 4 times (25, 50, 75, 100)
            * @method calculateBytes
            * @param {Boolean} value
            * @return {Boolean}
            */
            Loader.prototype.calculateBytes = function (value) {
                if (value) {
                    this._calculateBytes = value;
                }

                return this._calculateBytes;
            };

            /**
            *
            * @method complete
            * @return {Boolean}
            */
            Loader.prototype.complete = function () {
                return this._complete;
            };
            return Loader;
        })();
        Files.Loader = Loader;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Files
    * @module Kiwi
    * @submodule Files
    * @main Files
    */
    (function (Files) {
        /**
        *
        *
        * @class DataLibrary
        *
        */
        var DataLibrary = (function () {
            /*
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @return {Kiwi.Files.DataLibrary}
            */
            function DataLibrary(game) {
                this._game = game;
                this.data = {};
            }
            DataLibrary.prototype.objType = function () {
                return "DataLibrary";
            };

            /*
            * Resets the Data Library
            * @method clear
            */
            DataLibrary.prototype.clear = function () {
                for (var prop in this.data) {
                    delete this.data[prop];
                }
            };

            /*
            * Adds a new audio file to the audio library.
            * @method add
            * @param {Kiwi.File} imageFile
            */
            DataLibrary.prototype.add = function (dataFile) {
                switch (dataFile.dataType) {
                    case Kiwi.Files.File.JSON:
                    case Kiwi.Files.File.XML:
                    case Kiwi.Files.File.BINARY_DATA:
                    case Kiwi.Files.File.TEXT_DATA:
                        this.data[dataFile.key] = dataFile;
                        break;

                    default:
                        break;
                }
            };
            return DataLibrary;
        })();
        Files.DataLibrary = DataLibrary;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Files
    * @module Kiwi
    * @submodule Files
    *
    */
    (function (Files) {
        /**
        * Handles the loading of external data files via a tag loader or xhr + arraybuffer, and optionally saves to the file store.
        *
        * @class File
        *
        */
        var File = (function () {
            /*
            *
            * @constructor
            * @param {String} dataType
            * @param {String} path
            * @param {Boolean} saveToFileStore
            * @return {Kiwi.Files}
            */
            function File(game, dataType, path, name, saveToFileStore, storeAsGlobal) {
                if (typeof name === "undefined") { name = ''; }
                if (typeof saveToFileStore === "undefined") { saveToFileStore = true; }
                if (typeof storeAsGlobal === "undefined") { storeAsGlobal = true; }
                /**
                * @property _saveToFileStore
                * @type Boolean
                * @private
                */
                this._saveToFileStore = true;
                /**
                * @property _useTagLoader
                * @type Boolean
                * @private
                */
                this._useTagLoader = true;
                /**
                * @property fileSize
                * @type Number
                */
                this.fileSize = 0;
                /**
                * @property status
                * @type Number
                */
                this.status = 0;
                /**
                * @property statusText
                * @type String
                */
                this.statusText = '';
                /**
                * @property ETag
                * @type String
                */
                this.ETag = '';
                /**
                * @property lastModified
                * @type String
                */
                this.lastModified = '';
                /**
                * @property totalSize
                * @type Number
                */
                this.totalSize = 0;
                /**
                * @property bytesLoaded
                * @type Number
                */
                this.bytesLoaded = 0;
                /**
                * @property bytesTotal
                * @type Number
                */
                this.bytesTotal = 0;
                /**
                * @property readyState
                * @type Number
                */
                this.readyState = 0;
                /**
                * @property timeOutDelay
                * @type Number
                */
                this.timeOutDelay = 2000;
                /**
                * @property hasTimedOut
                * @type Boolean
                */
                this.hasTimedOut = false;
                /**
                * @property timedOut
                * @type Number
                */
                this.timedOut = 0;
                //  Time the load started
                /**
                * @property timeStarted
                * @type Number
                */
                this.timeStarted = 0;
                //  Time the load finished (if successful)
                /**
                * @property timeFinished
                * @type Number
                */
                this.timeFinished = 0;
                //  How long the load took (in ms)
                /**
                * @property duration
                * @type Number
                */
                this.duration = 0;
                /**
                * @property hasError
                * @type Boolean
                */
                this.hasError = false;
                /**
                * @property success
                * @type Boolean
                */
                this.success = false;
                /**
                * @property attemptCounter
                * @type Number
                */
                this.attemptCounter = 0;
                /**
                * @property maxLoadAttempts
                * @type Number
                */
                this.maxLoadAttempts = 2;
                /**
                * @property onCompleteCallback
                * @type Any
                */
                this.onCompleteCallback = null;
                /**
                * @property onProgressCallback
                * @type Any
                */
                this.onProgressCallback = null;
                /**
                * @property lastProgress
                * @type Number
                */
                this.lastProgress = 0;
                /**
                * @property percentLoaded
                * @type Number
                */
                this.percentLoaded = 0;
                this._game = game;

                this.dataType = dataType;

                this.fileURL = path;

                if (path.lastIndexOf('/') > -1) {
                    this.fileName = path.substr(path.lastIndexOf('/') + 1);
                    this.filePath = path.substr(0, path.lastIndexOf('/') + 1);
                } else {
                    this.filePath = '';
                    this.fileName = path;
                }

                //  Not safe if there is a query string after the file extension
                this.fileExtension = path.substr(path.lastIndexOf('.') + 1).toLowerCase();

                if (Kiwi.DEVICE.blob) {
                    this._useTagLoader = true;
                } else {
                    this._useTagLoader = true;
                }

                if (this.dataType === Kiwi.Files.File.AUDIO) {
                    if (this._game.audio.usingAudioTag === true) {
                        this._useTagLoader = true;
                    } else {
                        this._useTagLoader = false;
                    }
                }

                if (this.dataType === Kiwi.Files.File.JSON) {
                    this._useTagLoader = false;
                }

                this._saveToFileStore = saveToFileStore;
                this._fileStore = this._game.fileStore;

                if (this._game.states.current && !storeAsGlobal) {
                    this.ownerState = this._game.states.current;
                } else {
                    this.ownerState = null;
                }

                if (this.key === '') {
                    this.key = this.fileName;
                } else {
                    this.key = name;
                }
            }
            /**
            * Returns the type of this object
            */
            File.prototype.objType = function () {
                return "File";
            };

            File.prototype.addTag = function (tag) {
                if (this._tags.indexOf(tag) == -1) {
                    this._tags.push(tag);
                }
            };

            File.prototype.removeTag = function (tag) {
                var index = this._tags.indexOf(tag);
                if (index != -1) {
                    this._tags.splice(index, 1);
                }
            };

            File.prototype.hasTag = function (tag) {
                if (this._tags.indexOf(tag) == -1) {
                    return false;
                }
                return true;
            };

            Object.defineProperty(File.prototype, "isTexture", {
                get: function () {
                    if (this.dataType === File.IMAGE || this.dataType === File.SPRITE_SHEET || this.dataType === File.TEXTURE_ATLAS) {
                        return true;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(File.prototype, "isAudio", {
                get: function () {
                    if (this.dataType === File.AUDIO) {
                        return true;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(File.prototype, "isData", {
                get: function () {
                    if (this.dataType === File.XML || this.dataType === File.JSON || this.dataType === File.TEXT_DATA || this.dataType === File.BINARY_DATA) {
                        return true;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * @method load
            * @param {Any} [onCompleteCallback]
            * @param {Any} [onProgressCallback]
            * @param {Number} maxLoadAttempts
            * @param {Number} timeout
            */
            File.prototype.load = function (onCompleteCallback, onProgressCallback, customFileStore, maxLoadAttempts, timeout) {
                if (typeof onCompleteCallback === "undefined") { onCompleteCallback = null; }
                if (typeof onProgressCallback === "undefined") { onProgressCallback = null; }
                if (typeof customFileStore === "undefined") { customFileStore = null; }
                if (typeof maxLoadAttempts === "undefined") { maxLoadAttempts = 1; }
                if (typeof timeout === "undefined") { timeout = 2000; }
                this.onCompleteCallback = onCompleteCallback;
                this.onProgressCallback = onProgressCallback;
                this.maxLoadAttempts = maxLoadAttempts;
                this.timeOutDelay = timeout;

                if (customFileStore !== null) {
                    this._fileStore = customFileStore;
                    this._saveToFileStore = true;
                }

                this.start();

                if (this._useTagLoader === true) {
                    this.tagLoader();
                } else {
                    this.xhrLoader();
                }
            };

            /**
            * @method start
            */
            File.prototype.start = function () {
                this.timeStarted = Date.now();
                this.lastProgress = Date.now();
                this.percentLoaded = 0;
            };

            /**
            * @method stop
            */
            File.prototype.stop = function () {
                this.percentLoaded = 100;
                this.timeFinished = Date.now();
                this.duration = this.timeFinished - this.timeStarted;
            };

            /**
            * @method tagLoader
            */
            File.prototype.tagLoader = function () {
                var _this = this;
                if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS) {
                    this.data = new Image();
                    this.data.src = this.fileURL;
                    this.data.onload = function (event) {
                        return _this.tagLoaderOnLoad(event);
                    };
                    this.data.onerror = function (event) {
                        return _this.tagLoaderOnError(event);
                    };
                    this.data.onreadystatechange = function (event) {
                        return _this.tagLoaderOnReadyStateChange(event);
                    };
                } else if (this.dataType === Kiwi.Files.File.AUDIO) {
                    //if device == iOS.... do awesome stuff....
                    this.data = new Audio();
                    this.data.src = this.fileURL;
                    this.data.preload = 'auto';
                    this.data.onerror = function (event) {
                        return _this.tagLoaderOnError(event);
                    };
                    this.data.addEventListener('canplaythrough', function () {
                        return _this.tagLoaderOnLoad(null);
                    }, false);
                    this.data.onload = function (event) {
                        return _this.tagLoaderOnLoad(event);
                    };
                    this.data.load();
                    this.data.volume = 0;
                    this.data.play();
                }
            };

            /**
            * @method tagLoaderOnReadyStateChange
            * @param {Any} event
            */
            File.prototype.tagLoaderOnReadyStateChange = function (event) {
            };

            /**
            * @method tagLoaderOnError
            * @param {Any}
            */
            File.prototype.tagLoaderOnError = function (event) {
                this.hasError = true;
                this.error = event;

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            File.prototype.tagLoaderProgressThrough = function (event) {
                this.stop();

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            /**
            * @method tagLoaderOnLoad
            * @param {Any}
            */
            File.prototype.tagLoaderOnLoad = function (event) {
                var _this = this;
                if (this.percentLoaded !== 100) {
                    this.stop();

                    if (this.dataType === Kiwi.Files.File.AUDIO) {
                        this.data.removeEventListener('canplaythrough', function () {
                            return _this.tagLoaderOnLoad(null);
                        });
                        this.data.pause();
                        this.data.currentTime = 0;
                        this.data.volume = 1;
                    }

                    if (this._saveToFileStore === true) {
                        this._fileStore.addFile(this.key, this);
                    }

                    if (this.onCompleteCallback) {
                        this.onCompleteCallback(this);
                    }
                }
            };

            /**
            * @method xhrLoader
            */
            File.prototype.xhrLoader = function () {
                var _this = this;
                this._xhr = new XMLHttpRequest();
                this._xhr.open('GET', this.fileURL, true);
                this._xhr.timeout = this.timeOutDelay;
                this._xhr.responseType = 'arraybuffer';

                this._xhr.onloadstart = function (event) {
                    return _this.xhrOnLoadStart(event);
                };
                this._xhr.onload = function (event) {
                    return _this.xhrOnLoad(event);
                };
                this._xhr.onprogress = function (event) {
                    return _this.xhrOnProgress(event);
                };
                this._xhr.ontimeout = function (event) {
                    return _this.xhrOnTimeout(event);
                };
                this._xhr.onabort = function (event) {
                    return _this.xhrOnAbort(event);
                };
                this._xhr.onreadystatechange = function (event) {
                    return _this.xhrOnReadyStateChange(event);
                };

                this._xhr.send();
            };

            /**
            * @method xhrOnReadyStateChange
            * @param {Any}
            */
            File.prototype.xhrOnReadyStateChange = function (event) {
                this.readyState = event.target.readyState;

                if (this.readyState === 4) {
                    this.xhrOnLoad(event);
                }
            };

            /**
            * @method xhrOnLoadStart
            * @param {Any}
            */
            File.prototype.xhrOnLoadStart = function (event) {
                this.timeStarted = event.timeStamp;
                this.lastProgress = event.timeStamp;
            };

            /**
            * @method xhrOnAbort
            * @param {Any}
            */
            File.prototype.xhrOnAbort = function (event) {
            };

            /**
            * @method xhrOnError
            * @param {Any}
            */
            File.prototype.xhrOnError = function (event) {
            };

            /**
            * @method xhrOnTimeout
            * @param {Any}
            */
            File.prototype.xhrOnTimeout = function (event) {
            };

            /**
            * @method xhrOnProgress
            * @param {Any}
            */
            File.prototype.xhrOnProgress = function (event) {
                this.bytesLoaded = parseInt(event.loaded);
                this.bytesTotal = parseInt(event.totalSize);
                this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

                if (this.onProgressCallback) {
                    this.onProgressCallback(this);
                }
            };

            /**
            * Once the file has finished downloading (or pulled from the browser cache) this onload event fires.
            * @method xhrOnLoad
            * @param {event} The XHR event
            **/
            File.prototype.xhrOnLoad = function (event) {
                if (this.timeFinished > 0) {
                    return;
                }

                this.stop();

                this.status = this._xhr.status;
                this.statusText = this._xhr.statusText;

                if (this._xhr.status === 200) {
                    this.success = true;
                    this.hasError = false;
                    this.fileType = this._xhr.getResponseHeader('Content-Type');
                    this.bytesTotal = parseInt(this._xhr.getResponseHeader('Content-Length'));
                    this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                    this.ETag = this._xhr.getResponseHeader('ETag');
                    this.buffer = this._xhr.response;

                    if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS) {
                        this.createBlob();
                    } else {
                        if (this.dataType === Kiwi.Files.File.JSON) {
                            this.data = String.fromCharCode.apply(null, new Uint8Array(this._xhr.response));
                            this.parseComplete();
                        }

                        if (this.dataType === Kiwi.Files.File.AUDIO) {
                            if (this._game.audio.usingWebAudio) {
                                this.data = {
                                    raw: this._xhr.response,
                                    decoded: false,
                                    buffer: null
                                };

                                //decode that audio
                                var that = this;
                                this._game.audio.context.decodeAudioData(this.data.raw, function (buffer) {
                                    if (buffer) {
                                        that.data.buffer = buffer;
                                        that.data.decoded = true;
                                        that.parseComplete();
                                    }
                                });
                            }
                        }
                    }
                } else {
                    this.success = false;
                    this.hasError = true;
                    this.parseComplete();
                }
            };

            /**
            * @method createBlob
            */
            File.prototype.createBlob = function () {
                var _this = this;
                this.data = document.createElement('img');
                this.data.onload = function () {
                    return _this.revoke();
                };

                var imageType = '';

                if (this.fileExtension === 'jpg' || this.fileExtension === 'jpeg') {
                    imageType = 'image/jpeg';
                } else if (this.fileExtension === 'png') {
                    imageType = 'image/png';
                } else if (this.fileExtension === 'gif') {
                    imageType = 'image/gif';
                }

                //  Until they fix the TypeScript lib.d we have to use window array access
                //  Need to find a way to tell if this suports constuctor values like below, otherwise it just errors Chrome < 20 etc
                //if (typeof window['Blob'] !== 'undefined')
                //{
                var blob = new window['Blob']([this.buffer], { type: imageType });

                if (window['URL']) {
                    this.data.src = window['URL'].createObjectURL(blob);
                } else if (window['webkitURL']) {
                    this.data.src = window['webkitURL'].createObjectURL(blob);
                }
            };

            //var appendABViewSupported;
            //	    private isAppendABViewSupported() {
            //		if (typeof appendABViewSupported == "undefined") {
            //			var blobBuilder;
            //			blobBuilder = new BlobBuilder();
            //			blobBuilder.append(getDataHelper(0).view);
            //			appendABViewSupported = blobBuilder.getBlob().size == 0;
            //		}
            //		return appendABViewSupported;
            //	}
            /**
            * @method revoke
            */
            File.prototype.revoke = function () {
                if (window['URL']) {
                    window['URL'].revokeObjectURL(this.data.src);
                } else if (window['webkitURL']) {
                    window['webkitURL'].revokeObjectURL(this.data.src);
                }

                this.parseComplete();
            };

            /**
            * @method parseComplete
            */
            File.prototype.parseComplete = function () {
                if (this._saveToFileStore === true) {
                    this._fileStore.addFile(this.key, this);
                }

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            /**
            * Get information about the given file
            * @method getFileDetails
            * @param {function} The callback to send this FileInfo object to
            **/
            File.prototype.getFileDetails = function (callback, maxLoadAttempts, timeout) {
                if (typeof callback === "undefined") { callback = null; }
                if (typeof maxLoadAttempts === "undefined") { maxLoadAttempts = 1; }
                if (typeof timeout === "undefined") { timeout = 2000; }
                this.onCompleteCallback = callback;
                this.maxLoadAttempts = maxLoadAttempts;
                this.timeOutDelay = timeout;

                this.sendXHRHeadRequest();
            };

            /**
            *
            * @method sendXHRHeadRequest
            */
            File.prototype.sendXHRHeadRequest = function () {
                var _this = this;
                this.attemptCounter++;

                this._xhr = new XMLHttpRequest();
                this._xhr.open('HEAD', this.fileURL, false);
                this._xhr.onload = function (event) {
                    return _this.getXHRResponseHeaders(event);
                };
                this._xhr.ontimeout = function (event) {
                    return _this.xhrHeadOnTimeout(event);
                };
                this._xhr.onerror = function (event) {
                    return _this.xhrHeadOnError(event);
                };
                this._xhr.timeout = this.timeOutDelay;
                this._xhr.send();
            };

            /**
            *
            * @method xhrHeadOnTimeout
            */
            File.prototype.xhrHeadOnTimeout = function (event) {
                this.hasTimedOut = true;
                this.timedOut = Date.now();

                if (this.attemptCounter >= this.maxLoadAttempts) {
                    this.hasError = true;
                    this.error = event;

                    if (this.onCompleteCallback) {
                        this.onCompleteCallback.call(this);
                    }
                } else {
                    this.sendXHRHeadRequest();
                }
            };

            /**
            *
            * @method xhrHeadOnError
            * @parm {Any} event
            */
            File.prototype.xhrHeadOnError = function (event) {
                this.hasError = true;
                this.error = event;
                this.status = this._xhr.status;
                this.statusText = this._xhr.statusText;

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            /**
            * Process the response headers received
            * @method getResponseHeaders
            * @param {event} The XHR event
            * @param {function} The callback to send this FileInfo object to
            * @return {Kiwi.Loaders.FileInfo} This FileInfo object containing the results of the response
            **/
            File.prototype.getXHRResponseHeaders = function (event) {
                this.status = this._xhr.status;
                this.statusText = this._xhr.statusText;

                if (this._xhr.status === 200) {
                    this.fileType = this._xhr.getResponseHeader('Content-Type');
                    this.fileSize = parseInt(this._xhr.getResponseHeader('Content-Length'));
                    this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                    this.ETag = this._xhr.getResponseHeader('ETag');
                }

                if (this.onCompleteCallback) {
                    this.onCompleteCallback(this);
                }
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            File.prototype.toString = function () {
                return "[{File (fileURL=" + this.fileURL + " fileName=" + this.fileName + " dataType=" + this.dataType + " fileSize=" + this.fileSize + " success=" + this.success + " status=" + this.status + ")}]";
            };
            File.IMAGE = 0;

            File.SPRITE_SHEET = 1;

            File.TEXTURE_ATLAS = 2;

            File.AUDIO = 3;

            File.JSON = 4;

            File.XML = 5;

            File.BINARY_DATA = 6;

            File.TEXT_DATA = 7;
            return File;
        })();
        Files.File = File;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Files
    * @module Kiwi
    * @submodule Files
    *
    */
    (function (Files) {
        /**
        *
        *
        * @class FileStore
        *
        */
        var FileStore = (function () {
            /**
            *
            * @constructor
            * @return {Kiwi.FilesStore}
            */
            function FileStore(game) {
                /**
                *
                * @property _size
                * @type Number
                * @private
                */
                this._size = 0;
                this._game = game;
                this._files = {};
            }
            FileStore.prototype.objType = function () {
                return "FileStore";
            };

            FileStore.prototype.boot = function () {
            };

            /**
            *
            * @method getFile
            * @param {Sting} key
            * @return {Kiwi.Files}
            */
            FileStore.prototype.getFile = function (key) {
                return this._files[key];
            };

            FileStore.prototype.getFilesByTag = function (tag) {
                var obj = {};
                for (var file in this._files) {
                    if (this._files[file].hasTag(tag)) {
                        obj[file] = this._files[file];
                    }
                }
                return obj;
            };

            FileStore.prototype.removeFilesByTag = function (tag) {
                var obj = {};
                for (var file in this._files) {
                    if (this._files[file].hasTag(tag)) {
                        this.removeFile(file);
                    }
                }
                return obj;
            };

            Object.defineProperty(FileStore.prototype, "keys", {
                get: function () {
                    var keys = new Array();
                    for (var key in this._files) {
                        keys.push(key);
                    }

                    return keys;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets
            * @method size
            * @return {Number}
            */
            FileStore.prototype.size = function () {
                return this._size;
            };

            /**
            * @method add
            * @param {String} key
            * @param {File} value
            */
            FileStore.prototype.addFile = function (key, value) {
                if (!this._files[key]) {
                    this._files[key] = value;
                    this._size++;
                    return true;
                }

                return false;
            };

            /**
            * @method exists
            * @param {Sting} key
            * @return Boolean
            */
            FileStore.prototype.exists = function (key) {
                if (this._files[key]) {
                    return true;
                } else {
                    return false;
                }
            };

            FileStore.prototype.removeStateFiles = function (state) {
                for (var file in this._files) {
                    if (this._files[file].ownerState === state) {
                        this.removeFile(file);
                    }
                }
            };

            /**
            * @method remove
            * @param {String} key
            */
            FileStore.prototype.removeFile = function (key) {
                if (this._files[key]) {
                    this._files[key] = null;
                    delete this._files[key];
                    return true;
                }

                return false;
            };
            return FileStore;
        })();
        Files.FileStore = FileStore;
    })(Kiwi.Files || (Kiwi.Files = {}));
    var Files = Kiwi.Files;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    *
    * @class StateConfig
    *
    */
    var StateConfig = (function () {
        /**
        *
        * @constructor
        * @param {Kiwi.State} parent
        * @return {StateConfig} This Object
        */
        function StateConfig(parent, name) {
            /**
            * The name of the State, must be unique within your game.
            * @property name
            * @type String
            * @private
            */
            this.name = '';
            /**
            *
            * @property isPersistent
            * @type Boolean
            * @private
            **/
            this.isPersistent = false;
            /**
            *
            * @property isCreated
            * @type Boolean
            * @private
            **/
            this.isCreated = false;
            /**
            *
            * @property isInitialised
            * @type Boolean
            * @private
            **/
            this.isInitialised = false;
            /**
            *
            * @property isReady
            * @type Boolean
            * @private
            **/
            this.isReady = false;
            /**
            *
            * @property hasInit
            * @type Boolean
            * @private
            **/
            this.hasInit = false;
            /**
            *
            * @property hasPreloader
            * @type Boolean
            * @private
            **/
            this.hasPreloader = false;
            /**
            *
            * @property hasLoadProgress
            * @type Boolean
            * @private
            **/
            this.hasLoadProgress = false;
            /**
            *
            * @property hasLoadComplete
            * @type Boolean
            * @private
            **/
            this.hasLoadComplete = false;
            /**
            *
            * @property hasLoadUpdate
            * @type Boolean
            * @private
            **/
            this.hasLoadUpdate = false;
            /**
            *
            * @property hasCreate
            * @type Boolean
            * @private
            **/
            this.hasCreate = false;
            /**
            *
            * @property hasOnEnter
            * @type Boolean
            * @private
            **/
            this.hasOnEnter = false;
            /**
            *
            * @property hasUpdate
            * @type Boolean
            * @private
            **/
            this.hasUpdate = false;
            /**
            *
            * @property hasRender
            * @type Boolean
            * @private
            **/
            this.hasRender = false;
            /**
            *
            * @property hasOnExit
            * @type Boolean
            * @private
            **/
            this.hasOnExit = false;
            /**
            *
            * @property hasShutDown
            * @type Boolean
            * @private
            **/
            this.hasShutDown = false;
            /**
            *
            * @property hasDestroy
            * @type Boolean
            * @private
            **/
            this.hasDestroy = false;
            /**
            *
            * @property runCount
            * @type Number
            * @private
            **/
            this.runCount = 0;
            /**
            *
            * @property type
            * @type Number
            * @private
            **/
            this.type = 0;
            this._state = parent;
            this.name = name;

            this.populate();
        }
        StateConfig.prototype.objType = function () {
            return "StateConfig";
        };

        /**
        *  Builds up a StateManager Object on the State itself (called KiwiSMData).
        *  This is used to save time when doing function loops.
        *  Add Persistent State support? So it's called all the time, regardless of which state is current.
        *
        * @method buildStateConfig
        * @param {String} key
        * @param {Boolean} persistent
        */
        StateConfig.prototype.populate = function () {
            if (typeof this._state['init'] === 'function') {
                this.hasInit = true;
            }

            if (typeof this._state['preload'] === 'function') {
                this.hasPreloader = true;
            }

            if (typeof this._state['loadProgress'] === 'function') {
                this.hasLoadProgress = true;
            }

            if (typeof this._state['loadComplete'] === 'function') {
                this.hasLoadComplete = true;
            }

            if (typeof this._state['loadUpdate'] === 'function') {
                this.hasLoadUpdate = true;
            }

            if (typeof this._state['create'] === 'function') {
                this.hasCreate = true;
            }

            if (typeof this._state['onEnter'] === 'function') {
                this.hasOnEnter = true;
            }

            if (typeof this._state['update'] === 'function') {
                this.hasUpdate = true;
            }

            if (typeof this._state['render'] === 'function') {
                this.hasRender = true;
            }

            if (typeof this._state['onExit'] === 'function') {
                this.hasOnExit = true;
            }

            if (typeof this._state['shutdown'] === 'function') {
                this.hasShutDown = true;
            }

            if (typeof this._state['destroy'] === 'function') {
                this.hasDestroy = true;
            }

            if (this.hasInit === false && this.hasCreate === false) {
                //  If there are no init or create functions, then we consider the state already initialised
                this.isInitialised = true;
                this.isCreated = true;
                this.isReady = true;
            }
        };
        return StateConfig;
    })();
    Kiwi.StateConfig = StateConfig;
})(Kiwi || (Kiwi = {}));
/**
* Module - Kiwi (Core)
* @module Kiwi
*
*/
var Kiwi;
(function (Kiwi) {
    /**
    * Handles the starting, parsing, looping and swapping of game states.
    *
    * @class StateManager
    *
    */
    var StateManager = (function () {
        /**
        *
        * @constructor
        * @param {Kiwi.Game} game
        * @return {StateMananger} This Object
        */
        function StateManager(game) {
            /**
            * The current State
            * @property current
            * @type Kiwi.State
            **/
            this.current = null;
            this._game = game;

            this._states = [];
        }
        /*
        * The type of object this is.
        * @method objType
        * @return string
        */
        StateManager.prototype.objType = function () {
            return "StateManager";
        };

        /**
        * Checks to see if a key exists. Internal use only.
        * @method checkKeyExists
        * @param {String} key
        * @return {Boolean}
        **/
        StateManager.prototype.checkKeyExists = function (key) {
            for (var i = 0; i < this._states.length; i++) {
                if (this._states[i].config.name === key) {
                    return true;
                }
            }

            return false;
        };

        /**
        * Checks to see if the state passed is valid or not.
        * @method checkValidState
        * @param {Kiwi.State} state
        * @return {Boolean}
        **/
        StateManager.prototype.checkValidState = function (state) {
            if (!state['game'] || !state['config']) {
                return false;
            }

            return true;
        };

        /**
        * Adds the given State to the StateManager.
        * The State must have a unique key set on it, or it will fail to be added to the manager.
        * Returns true if added successfully, otherwise false (can happen if State is already in the StateManager)
        *
        * @method addState
        * @param {Any} state The Kiwi.State instance to add
        * @param {Boolean} switchTo If set to true automatically switch to the given state after adding it
        * @return {Boolean} true if the State was added successfully, otherwise false
        */
        StateManager.prototype.addState = function (state, switchTo) {
            if (typeof switchTo === "undefined") { switchTo = false; }
            var tempState;

            if (typeof state === 'function') {
                tempState = new state();
            } else if (typeof state === 'string') {
                tempState = window[state];
            } else {
                tempState = state;
            }

            if (tempState.config.name && this.checkKeyExists(tempState.config.name) === true) {
                return false;
            }

            tempState.game = this._game;

            if (this.checkValidState(tempState) === false) {
                return false;
            } else {
                this._states.push(tempState);

                if (switchTo === true) {
                    this.setCurrentState(tempState.config.name);
                }

                return true;
            }
        };

        /**
        * The DOM is ready, so if we have a current state pending we can init it now
        * @method boot
        */
        StateManager.prototype.boot = function () {
            if (this.current !== null) {
                this.current.boot();
            }

            if (this.current !== null && this.current.config.isInitialised === false) {
                if (this.current.config.hasInit === true) {
                    this.current.init();
                }

                this.current.config.isInitialised = true;

                this.checkPreload();
            }
        };

        /**
        *
        * @method setCurrentState
        * @param {String} key
        * @return {Boolean}
        **/
        StateManager.prototype.setCurrentState = function (key) {
            if (this.current !== null && this.current.config.name === key) {
                return false;
            }

            if (this.current !== null) {
                //  Yes, so notify it that it's about to be shut down
                //  If there is a shutdown function then we call it, passing it a callback.
                //  The State is then responsible for hitting the callback when it is ready.
                //  TODO: Transition support - both state updates need to be called at the same time.
                this._game.input.reset();
                this.current.destroy();
            }

            if (this.checkKeyExists(key) === true) {
                this.current = this.getState(key);

                if (this._game.stage.domReady === true) {
                    if (this.current.config.isInitialised === false) {
                        this.current.boot();

                        if (this.current.config.hasInit === true) {
                            if (this.current.config.initParams) {
                                this.current.init.apply(this.current, this.current.config.initParams);
                            } else {
                                this.current.init.call(this.current);
                            }
                        }

                        this.current.config.isInitialised = true;
                    }

                    this.checkPreload();
                }

                return true;
            } else {
                return false;
            }
        };

        /**
        *  Swaps the current state.
        *  If the state has already been loaded (via addState) then you can just pass the key.
        *  Otherwise you can pass the state object as well and it will load it then swap to it.
        *
        * @method switchState
        * @param {String} key
        * @param {Any} [state]
        * @param {Boolean} skipAdd if set to true it will skip the adding of the state and just set it as current
        * @return {Boolean}
        */
        StateManager.prototype.switchState = function (key, state, initParams, createParams) {
            if (typeof state === "undefined") { state = null; }
            if (typeof initParams === "undefined") { initParams = null; }
            if (typeof createParams === "undefined") { createParams = null; }
            if (this.current !== null && this.current.config.isReady === false) {
                return false;
            }

            if (this.checkKeyExists(key) === false && state !== null) {
                if (this.addState(state, false) === false) {
                    //  Error adding the state
                    return false;
                }
            }

            if (initParams !== null || createParams !== null) {
                var newState = this.getState(key);

                newState.config.initParams = [];

                for (var initParameter in initParams) {
                    newState.config.initParams.push(initParams[initParameter]);
                }

                newState.config.createParams = [];

                for (var createParameter in createParams) {
                    newState.config.createParams.push(createParams[createParameter]);
                }
            }

            return this.setCurrentState(key);
        };

        /**
        *
        * @method getState
        * @param {String} key
        * @return {Kiwi.State}
        **/
        StateManager.prototype.getState = function (key) {
            for (var i = 0; i < this._states.length; i++) {
                if (this._states[i].config.name === key) {
                    return this._states[i];
                }
            }

            return null;
        };

        /**
        *
        * @method checkPreload
        * @private
        */
        StateManager.prototype.checkPreload = function () {
            var _this = this;
            if (this.current.config.hasPreloader === true) {
                this._game.loader.init(function (percent, bytes, file) {
                    return _this.onLoadProgress(percent, bytes, file);
                }, function () {
                    return _this.onLoadComplete();
                });
                this.current.preload();
                this._game.loader.startLoad();
            } else {
                if (this.current.config.hasCreate === true && this.current.config.isCreated === false) {
                    this.current.config.isCreated = true;

                    if (this.current.config.createParams) {
                        this.current.create.apply(this.current, this.current.config.createParams);
                    } else {
                        this.current.create.call(this.current);
                    }
                }

                this.current.config.isReady = true;
            }
        };

        /**
        *
        * @method onLoadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {Kiwi.Filess} file
        * @private
        */
        StateManager.prototype.onLoadProgress = function (percent, bytesLoaded, file) {
            if (this.current.config.hasLoadProgress === true) {
                this.current.loadProgress(percent, bytesLoaded, file);
            }
        };

        /**
        *
        * @method onLoadComplete
        * @private
        */
        StateManager.prototype.onLoadComplete = function () {
            if (this.current.config.hasLoadComplete === true) {
                this.current.loadComplete();
            }

            this.rebuildLibraries();

            this.current.config.isReady = true;

            if (this.current.config.hasCreate === true) {
                this.current.config.isCreated = true;
                if (this.current.config.createParams) {
                    this.current.create.apply(this.current, this.current.config.createParams);
                } else {
                    this.current.create.call(this.current);
                }
            }
        };

        /*
        * Rebuilds the texture, audio and data libraries that are on the current state. Thus updating what files the user has access to.
        * @method rebuildLibraries
        */
        StateManager.prototype.rebuildLibraries = function () {
            this.current.textureLibrary.clear();
            this.current.audioLibrary.clear();
            this.current.dataLibrary.clear();

            var fileStoreKeys = this._game.fileStore.keys;

            for (var i = 0; i < fileStoreKeys.length; i++) {
                var file = this._game.fileStore.getFile(fileStoreKeys[i]);
                if (file.isTexture) {
                    this.current.textureLibrary.add(file);
                } else if (file.isAudio) {
                    this.current.audioLibrary.add(file);
                } else if (file.isData) {
                    this.current.dataLibrary.add(file);
                }
            }
        };

        /**
        * Update Loop
        * @method update
        */
        StateManager.prototype.update = function () {
            if (this.current !== null) {
                if (this.current.config.isReady === true) {
                    this.current.preUpdate();
                    this.current.update();
                    this.current.postUpdate();
                } else {
                    this.current.loadUpdate();
                }
            }
        };

        /**
        * postRender - called after all of the Layers have been rendered
        * @method postRender
        */
        StateManager.prototype.postRender = function () {
            if (this.current !== null) {
                if (this.current.config.isReady === true) {
                    this.current.postRender();
                }
            }
        };
        return StateManager;
    })();
    Kiwi.StateManager = StateManager;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - GameObjects
    * @module Kiwi
    * @submodule GameObjects
    * @main GameObjects
    */
    (function (GameObjects) {
        /**
        *
        *
        * @class Sprite
        * @extends Entity
        */
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            /**
            *
            * @constructor
            * @param {Kiwi.State} state - The state that this sprite belongs to
            * @param {Kiwi.Textures.TextureAtlas} atlas - The texture you want to apply to this entity
            * @param {Number} x
            * @param {Number} y
            * @param {Boolean} enableInput - If the input component should be enabled or not.
            * @return {Sprite}
            */
            function Sprite(state, atlas, x, y, enableInput) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof enableInput === "undefined") { enableInput = false; }
                _super.call(this, state, x, y);

                // Set the texture
                this.name = atlas.name;
                this.atlas = atlas;
                this.cellIndex = this.atlas.cellIndex;

                //may need to add an optional other cell frame index here
                this.width = atlas.cells[0].w;
                this.height = atlas.cells[0].h;
                this.transform.rotPointX = this.width / 2;
                this.transform.rotPointY = this.height / 2;

                //Create the components needed
                this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));
                this.input = this.components.add(new Kiwi.Components.Input(this, this.box, enableInput));

                if (this.atlas.type === Kiwi.Textures.TextureAtlas.SINGLE_IMAGE) {
                    this.animation = null;
                    this._isAnimated = false;
                } else {
                    this.animation = this.components.add(new Kiwi.Components.Animation(this));
                    this._isAnimated = true;
                }
            }
            /**
            * Returns the type of object that this is.
            * @method objType
            * @return {string}
            * @public
            */
            Sprite.prototype.objType = function () {
                return "Sprite";
            };

            /**
            * Called by the State to which this Game Object is added
            * @method update
            * @public
            */
            Sprite.prototype.update = function () {
                _super.prototype.update.call(this);

                if (this._isAnimated) {
                    this.animation.update();
                    this.width = this.atlas.cells[this.cellIndex].w;
                    this.height = this.atlas.cells[this.cellIndex].h;

                    this.box.rawHitbox.width = this.width;
                    this.box.rawHitbox.height = this.height;
                }

                this.input.update();
            };

            /**
            * Called by the Layer to which this Game Object is attached
            * @method render
            * @param {Kiwi.Camara} camera
            * @public
            */
            Sprite.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.alpha > 0 && this.visiblity) {
                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    //get entity/view matrix
                    var t = this.transform;
                    var m = t.getConcatenatedMatrix();

                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                    //ctx.fillStyle = "green";
                    //ctx.fillRect(-2, -2, 5, 5);
                    var cell = this.atlas.cells[this.cellIndex];
                    ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                    ctx.restore();
                }
            };
            return Sprite;
        })(Kiwi.Entity);
        GameObjects.Sprite = Sprite;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - GameObjects
    * @module Kiwi
    * @submodule GameObjects
    *
    */
    (function (GameObjects) {
        /**
        * A light weight game object for displaying static images (such as backgrounds) that would have little or no interaction with other game objects.
        *
        * @class StaticImage
        * @extends Entity
        */
        var StaticImage = (function (_super) {
            __extends(StaticImage, _super);
            /**
            *
            * @constructor
            * @param {Kiwi.State} state - The state that this static image belongs to
            * @param {Kiwi.Textures.TextureAtlas} atlas - The texture atlas to use as the image.
            * @param {Number} x - Its coordinates on the x axis
            * @param {Number} y - The coordinates on the y axis
            * @return {StaticImage}
            */
            function StaticImage(state, atlas, x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                _super.call(this, state, x, y);

                //Set coordinates and texture
                this.atlas = atlas;
                this.cellIndex = this.atlas.cellIndex;
                this.width = atlas.cells[0].w;
                this.height = atlas.cells[0].h;
                this.transform.rotPointX = this.width / 2;
                this.transform.rotPointY = this.height / 2;

                this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));
            }
            /**
            * Returns the type of object that this is.
            * @method objType
            * @return {string}
            * @public
            */
            StaticImage.prototype.objType = function () {
                return "Sprite";
            };

            /**
            * Called by the Layer to which this Game Object is attached
            * @method render
            * @param {Kiwi.Camara} camera
            * @public
            */
            StaticImage.prototype.render = function (camera) {
                _super.prototype.render.call(this, camera);

                if (this.alpha > 0 && this.visiblity) {
                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    //get entity/view matrix
                    var t = this.transform;
                    var m = t.getConcatenatedMatrix();

                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);

                    //ctx.fillStyle = "green";
                    //ctx.fillRect(-2, -2, 5, 5);
                    var cell = this.atlas.cells[this.cellIndex];
                    ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h, -t.rotPointX, -t.rotPointY, cell.w, cell.h);
                    ctx.restore();
                }
            };
            return StaticImage;
        })(Kiwi.Entity);
        GameObjects.StaticImage = StaticImage;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - GameObjects
    * @module Kiwi
    * @submodule GameObjects
    *
    */
    (function (GameObjects) {
        /**
        *
        *
        * @class Textfield
        * @extends Entity
        */
        var Textfield = (function (_super) {
            __extends(Textfield, _super);
            /**
            *
            * @constructor
            * @param {String} text
            * @param {Number} x - The new x coordinate from the Position component
            * @param {Number} y - The new y coordinate from the Position component
            * @param {String} color - The color of the pixel in 0xAARRGGBB format. Default is 0xFF000000 (black).
            * @param {Number} size - Yes we know pixels don't really have a size, but on large monitors you need to pump them up a bit!
            * @param {String} weight
            * @param {String} fontFamily
            * @return {Kiwi.GameObjects.Textfield} This Game Object.
            */
            function Textfield(state, text, x, y, color, size, weight, fontFamily) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof color === "undefined") { color = '#000000'; }
                if (typeof size === "undefined") { size = 32; }
                if (typeof weight === "undefined") { weight = 'normal'; }
                if (typeof fontFamily === "undefined") { fontFamily = 'sans-serif'; }
                _super.call(this, state, x, y);

                this._text = text;
                this._fontWeight = weight;
                this._fontSize = size;
                this._fontColor = color;
                this._fontFamily = fontFamily;
                this._textAlign = 'left';
                this._baseline = 'top';

                this.dirty = true;
            }
            /**
            * Returns the type of object that this is
            * @method objType
            * @return {string}
            * @public
            */
            Textfield.prototype.objType = function () {
                return "Textfield";
            };


            Object.defineProperty(Textfield.prototype, "text", {
                get: /**
                * Get the text that is to appear. If there are multiple lines this will return the first line of text.
                * @type string
                * @public
                */
                function () {
                    return this._text;
                },
                set: /**
                * Sets the text that is to appear.
                * @method setText
                * @param {string} value
                * @public
                */
                function (value) {
                    this._text = value;
                    this.dirty = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "color", {
                get: /**
                * Returns the color of the text.
                * @type string
                * @public
                */
                function () {
                    return this._fontColor;
                },
                set: /**
                * Allows the setting of the font colour.
                * @type string
                * @public
                */
                function (val) {
                    this._fontColor = val;
                    this.dirty = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "fontWeight", {
                get: /**
                * Returns the weight of that will be used when rendering the font.
                * @type string
                * @public
                */
                function () {
                    return this._fontWeight;
                },
                set: /**
                * Sets the weight of the font.
                * @type string
                * @public
                */
                function (val) {
                    this._fontWeight = val;
                    this.dirty = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "fontSize", {
                get: /**
                * Returns the size of the font that is being used.
                * @type number
                * @public
                */
                function () {
                    return this._fontSize;
                },
                set: /**
                * Sets the size of the the font that is being used.
                * @type number
                * @public
                */
                function (val) {
                    this._fontSize = val;
                    this.dirty = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "fontFamily", {
                get: /**
                * Returns the font family that is being used.
                * @type string
                * @public
                */
                function () {
                    return this._fontFamily;
                },
                set: /**
                * Allows the modification of the font family.
                * @type string
                * @public
                */
                function (val) {
                    this._fontFamily = val;
                    this.dirty = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Textfield.prototype, "textAlign", {
                get: /**
                * Returns a string containing the text alignment for this textfield.
                * @type string
                * @public
                */
                function () {
                    return this._textAlign;
                },
                set: /**
                * Changes the alignment of the text. You can either use the static TEXT_ALIGN constants or pass a string.
                * @type string
                * @public
                */
                function (val) {
                    this._textAlign = val;
                    this.dirty = true;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * This method is used to render the text to a off-screen canvas, which is then saved as a HTMLImageElement.
            * This is so that the canvas doesn't render it every frame as it can be costly.
            *
            * @method _renderText
            */
            Textfield.prototype._renderText = function () {
                //create the canvas
                this._tempCanvas = document.createElement('canvas');
                var ctxTemp = this._tempCanvas.getContext('2d');

                //get/set the width
                ctxTemp.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
                var _measurements = ctxTemp.measureText(this._text);
                this._tempCanvas.width = _measurements.width;
                this._tempCanvas.height = this._fontSize * 1.3;

                //reapply the styles....cause it unapplies after a measurement...?!?
                ctxTemp.font = this._fontWeight + ' ' + this._fontSize + 'px ' + this._fontFamily;
                ctxTemp.fillStyle = this._fontColor;
                ctxTemp.textBaseline = this._baseline;

                //add text
                ctxTemp.fillText(this._text, 0.5, 0.5);

                //create the image
                this._textImage = new Image(this._tempCanvas.width, this._tempCanvas.height);
                this._textImage.src = this._tempCanvas.toDataURL("image/png");

                this.dirty = false;
            };

            /**
            * Called by the Layer to which this Game Object is attached
            * @method render
            * @param {Kiwi.Camera}
            */
            Textfield.prototype.render = function (camera) {
                if (this.alpha > 0 && this.visiblity) {
                    if (this.dirty) {
                        this._renderText();
                    }

                    //render on stage
                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    var t = this.transform;

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    //align the text
                    var x = 0;
                    switch (this._textAlign) {
                        case Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT:
                            x = 0;
                            break;
                        case Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER:
                            x = this._textImage.width / 2;
                            break;
                        case Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT:
                            x = this._textImage.width;
                            break;
                    }

                    //add the alignment to the transformation
                    t.x -= x;
                    var m = t.getConcatenatedMatrix();

                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX, m.ty + t.rotPointY);
                    ctx.drawImage(this._textImage, 0, 0, this._textImage.width, this._textImage.height, -t.rotPointX, -t.rotPointY, this._textImage.width, this._textImage.height);

                    //remove it again.
                    t.x += x;

                    ctx.restore();
                }
            };
            Textfield.TEXT_ALIGN_CENTER = 'center';

            Textfield.TEXT_ALIGN_RIGHT = 'right';

            Textfield.TEXT_ALIGN_LEFT = 'left';
            return Textfield;
        })(Kiwi.Entity);
        GameObjects.Textfield = Textfield;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var Tile = (function (_super) {
                __extends(Tile, _super);
                /*
                *
                * @constructor
                * @param {Kiwi.GameObjects.TileMapLayer} tileLayer
                * @param {Kiwi.GameObjects.TileType} tileType
                * @param {number} width
                * @param {number} height
                * @param {number} x
                * @param {number} y
                */
                function Tile(state, tileLayer, tileType, width, height, x, y) {
                    _super.call(this, state, x, y);

                    this.tileLayer = tileLayer;

                    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this));
                    this.tileUpdate(tileType);
                }
                Tile.prototype.objType = function () {
                    return "Tile";
                };

                /*
                * This method handles the updating of the type of tile this tile is.
                *
                * @method tileUpdate
                * @param {Kiwi.GameObjects.TileType} tileType
                */
                Tile.prototype.tileUpdate = function (tileType) {
                    this.tileType = tileType;
                    this.physics.mass = this.tileType.mass;
                    this.physics.allowCollisions = this.tileType.allowCollisions;
                    this.physics.immovable = this.tileType.immovable;
                };
                return Tile;
            })(Kiwi.Entity);
            Tilemap.Tile = Tile;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var TileType = (function () {
                /*
                *
                * @constructor
                * @param {Kiwi.Game}
                * @param {Kiwi.GameObjects.TileMap} tilemap
                * @param {number} index
                * @param {number} width
                * @param {number} height
                */
                function TileType(game, tilemap, index, width, height) {
                    /*
                    * The mass of the tile.
                    */
                    this.mass = 1.0;
                    this._game = game;
                    this.tilemap = tilemap;
                    this.index = index;

                    this.width = width;
                    this.height = height;

                    this.allowCollisions = Kiwi.Components.ArcadePhysics.NONE;
                    this.seperate = false;
                    this.immovable = true;
                }
                /**
                * Clean up memory.
                */
                TileType.prototype.destroy = function () {
                    this.tilemap = null;
                };

                /**
                * Returns a string representation of this object.
                * @method toString
                * @return {string} a string representation of the object.
                **/
                TileType.prototype.toString = function () {
                    return "[{TileType (index=" + this.index + " collisions=" + this.allowCollisions + " width=" + this.width + " height=" + this.height + ")}]";
                };
                return TileType;
            })();
            Tilemap.TileType = TileType;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var TileMap = (function (_super) {
                __extends(TileMap, _super);
                function TileMap(state) {
                    _super.call(this, state, 0, 0);
                    /*
                    * Tilemap collision callback method
                    * @type {function}
                    */
                    this._collisionCallback = null;
                }
                /*
                * Creates a tile map from some information you already have.
                *
                * @method createFromData
                * @param {any} tileMapData
                * @param {Kiwi.Textures.TextureAtlas}
                * @param {Kiwi.Game} game
                * @param {number} format
                */
                TileMap.prototype.createFromData = function (tileMapData, atlas, game, format) {
                    var data;

                    this._atlas = atlas;
                    this.tiles = [];
                    this.layers = [];

                    this._game = game;

                    this.mapFormat = format;

                    if (typeof tileMapData === "string") {
                        data = data.trim();
                        data = JSON.parse(tileMapData);
                        this.parseTiledJSON(data);
                    } else {
                        this.parseTiledJSON(tileMapData);
                    }
                };

                /*
                * Creates the tilemap from the file store.
                *
                * @method createFromFileStore
                * @param {string} tileMapDataKey - The key of the data file.
                * @param {Kiwi.Textures.TextureAtlas} atlas
                */
                TileMap.prototype.createFromFileStore = function (tileMapDataKey, atlas, game, format) {
                    if (this._game.fileStore.exists(tileMapDataKey) == false) {
                        return;
                    }

                    //save the data information
                    this._tileMapDataKey = tileMapDataKey;
                    this._atlas = atlas;

                    //create the tiles
                    this.tiles = [];
                    this.layers = [];

                    //save the game
                    this._game = game;

                    //save the format
                    this.mapFormat = format;

                    switch (format) {
                        case TileMap.FORMAT_TILED_JSON:
                            var obj = JSON.parse(this._game.fileStore.getFile(tileMapDataKey).data);
                            this.parseTiledJSON(obj);
                            break;
                    }
                };

                /*
                * The type of object that it is.
                */
                TileMap.prototype.objType = function () {
                    return "TileMap";
                };

                /*
                * The render loop. Should not be called I think
                */
                TileMap.prototype.render = function (camera) {
                    for (var i = 0; i < this.layers.length; i++) {
                        this.layers[i].render(camera);
                    }
                };

                /*
                * Creates the tilemap based of some json data that gets parsed.
                *
                * @method parseTiledJSON
                * @param {any} data
                */
                TileMap.prototype.parseTiledJSON = function (data) {
                    var mapObj = data;

                    for (var i = 0; i < mapObj.layers.length; i++) {
                        var layer = new Tilemap.TileMapLayer(this.state, this._game, this, this._atlas, mapObj.layers[i].name, mapObj.tilewidth, mapObj.tileheight);

                        layer.transform.setPosition(mapObj.layers[i].x, mapObj.layers[i].y);
                        layer.alpha = parseInt(mapObj.layers[i].opacity);
                        layer.visiblity = mapObj.layers[i].visible;
                        layer.tileMargin = mapObj.tilesets[0].margin;
                        layer.tileSpacing = mapObj.tilesets[0].spacing;
                        layer.name = mapObj.tilesets[0].name;
                        layer.game = this.game;

                        var c = 0;
                        var row;

                        var tileQuantity = layer.parseTileOffsets();
                        this.generateTiles(layer, tileQuantity);

                        for (var t = 0; t < mapObj.layers[i].data.length; t++) {
                            if (c == 0) {
                                row = [];
                            }

                            row.push(this.tiles[parseInt(mapObj.layers[i].data[t])]);
                            c++;

                            if (c == mapObj.layers[i].width) {
                                layer.addRow(row);
                                c = 0;
                            }
                        }

                        this.currentLayer = layer;

                        this.layers.push(layer);
                    }
                };

                /*
                * This method generates a number of tile objects based on the quantity passed. These tiles are based of the current layer.
                *
                * @method generateTiles
                * @param {number} qty - number of tiles
                */
                TileMap.prototype.generateTiles = function (layer, qty) {
                    for (var i = 0; i < qty; i++) {
                        this.tiles.push(new Tilemap.TileType(this._game, this, i, layer.tileWidth, layer.tileHeight));
                    }
                };

                /*
                * Gets the currentLayers width in pixels
                * @method widthInPixels
                * @returns {number}
                */
                TileMap.prototype.widthInPixels = function () {
                    return this.currentLayer.widthInPixels;
                };

                /*
                * Gets the currentLayers height in pixels
                * @method heightInPixels
                * @returns {number}
                */
                TileMap.prototype.heightInPixels = function () {
                    return this.currentLayer.heightInPixels;
                };

                //  Tile Management
                /*
                * Gets a tiletype by a index provided.
                *
                * @method getTileByIndex
                * @param {number} value
                * @return {Tile}
                */
                TileMap.prototype.getTileTypeByIndex = function (value) {
                    if (this.tiles[value]) {
                        return this.tiles[value];
                    }

                    return null;
                };

                /*
                * Gets a single tile either off the tile layer passed otherwise off the currentLayer if no layer number passed.
                *
                * @method getTile
                * @param {number} x
                * @param {number} y
                * @param {number} layer
                * @return {Kiwi.GameObjects.Tile}
                */
                TileMap.prototype.getTile = function (x, y, layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTile(x, y);
                        ;
                    } else {
                        return this.layers[layer].getTile(x, y);
                        ;
                    }
                };

                /*
                * Gets an array of tiles that consist of
                *
                * @method getTilesByType
                * @param {number} index
                * @param {number} layer
                * @return {Array}
                */
                TileMap.prototype.getTilesByType = function (index, layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTilesByIndex(index);
                    } else {
                        return this.layers[layer].getTilesByIndex(index);
                    }
                };

                /*
                * Gets a tile based on the passed X and Y.
                * Caution! If the tilemap has moved make sure you put that into account.
                *
                * @method getTileFromWorldXY
                * @param {number} x
                * @param {number} y
                * @param {number} layer
                * @return {Kiwi.GameObjects.Tile}
                */
                TileMap.prototype.getTileFromWorldXY = function (x, y, layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTileFromWorldXY(x, y);
                    } else {
                        return this.layers[layer].getTileFromWorldXY(x, y);
                    }
                };

                /*
                * Gets a tile based on the mouse's current X and Y coordinates.
                *
                * @method getTileFromInputXY
                * @param {number} layer
                * @return {Kiwi.GameObjects.Tile}
                */
                TileMap.prototype.getTileFromInputXY = function (layer) {
                    if (layer === undefined) {
                        return this.currentLayer.getTileFromWorldXY(this._game.input.mouse.x - this.currentLayer.x, this._game.input.mouse.y - this.currentLayer.y);
                    } else {
                        return this.layers[layer].getTileFromWorldXY(this._game.input.mouse.x - this.layers[layer].x, this._game.input.mouse.y - this.layers[layer].transform.y);
                    }
                };

                /*
                * Checks to see if an entity overlaps with any colliable tiles on the current layer. Returns the tiles that it overlaps with.
                *
                * @method getTileOverlaps
                * @param {Kiwi.Entity} object
                * @returns {Array}
                */
                TileMap.prototype.getTileOverlaps = function (object) {
                    return this.currentLayer.getTileOverlaps(object);
                };

                /*
                * Adds/Reassign's a tile on the point in the map you specify.
                *
                * @method putTile
                * @param {number} x
                * @param {number} y
                * @param {number} index
                * @param {number} layer
                */
                TileMap.prototype.putTile = function (x, y, index, layer) {
                    if (layer === undefined) {
                        var usedLayer = this.currentLayer;
                    } else {
                        var usedLayer = this.layers[layer];
                    }

                    usedLayer.putTile(x, y, this.tiles[index]);
                };

                //collision stuff
                /*
                * Set the callback to be called when the tilemap collides.
                *
                * @method setCollisionCallback
                * @param {function} Callback function
                * @param {object} Callback will be called with this context
                */
                TileMap.prototype.setCollisionCallback = function (callback, context) {
                    this._collisionCallback = callback;
                    this._collisionCallbackContext = context;
                };

                /*
                * Sets the collision of a range of tiletypes.
                *
                * @method setCollisionRange
                * @params {number} start
                * @params {number} end
                * @params {number} collision
                * @params {bool} seperate
                */
                TileMap.prototype.setCollisionRange = function (start, end, collision, seperate) {
                    if (typeof collision === "undefined") { collision = Kiwi.Components.ArcadePhysics.ANY; }
                    if (typeof seperate === "undefined") { seperate = true; }
                    for (var i = start; i <= end; i++) {
                        this.setCollisionByIndex(i, collision, seperate);
                    }
                };

                /*
                * Sets the collision of a single tiletype by the index.
                *
                * @method setCollisionIndex
                * @params {number} index
                * @params {number} collision
                * @params {bool} seperate
                */
                TileMap.prototype.setCollisionByIndex = function (index, collision, seperate) {
                    if (typeof collision === "undefined") { collision = Kiwi.Components.ArcadePhysics.ANY; }
                    if (typeof seperate === "undefined") { seperate = true; }
                    this.tiles[index].seperate = seperate;
                    this.tiles[index].allowCollisions = collision;

                    var tiles = this.currentLayer.getTilesByIndex(index);
                    for (var t = 0; t < tiles.length; t++) {
                        tiles[t].physics.seperate = seperate;
                        tiles[t].physics.allowCollisions = collision;
                    }
                };

                /*
                * Checks to see if a single object is colliding with any colliable tiles.
                *
                * @method collideSingle
                * @param {Kiwi.Entity}
                * @return {boolean}
                */
                TileMap.prototype.collideSingle = function (object) {
                    if (object.exists === false || !object.components.hasComponent('ArcadePhysics'))
                        return false;

                    var tiles = this.currentLayer.getTileOverlaps(object);

                    if (tiles !== undefined) {
                        for (var i = 0; i < tiles.length; i++) {
                            if (object.components.getComponent('ArcadePhysics').overlaps(tiles[i], tiles[i].tileType.seperate)) {
                                if (this._collisionCallback !== null) {
                                    this._collisionCallback.call(this._collisionCallbackContext, object, tiles[i]);
                                }
                            }
                        }
                        return true;
                    }
                    return false;
                };

                /*
                * Tests to see if a group of entities are colliding with any tiles.
                *
                * @method collideGroup
                * @param {Kiwi.Group}
                */
                TileMap.prototype.collideGroup = function (group) {
                    for (var i = 0; i < group.members.length; i++) {
                        //this.collideSingle(group.members[i]);
                    }
                };

                /*
                * Destroys everything.
                *
                * @method destroy
                */
                TileMap.prototype.destroy = function () {
                    this.tiles = null;
                    for (var i = 0; i < this.layers.length; i++) {
                        this.layers[i].destroy();
                    }
                    this.layers = null;
                    this._tileMapDataKey = null;

                    this._atlas = null;
                };
                TileMap.FORMAT_CSV = 0;
                TileMap.FORMAT_TILED_JSON = 1;
                return TileMap;
            })(Kiwi.Entity);
            Tilemap.TileMap = TileMap;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (GameObjects) {
        (function (Tilemap) {
            var TileMapLayer = (function (_super) {
                __extends(TileMapLayer, _super);
                /*
                *
                * @constructor
                * @param {Kiwi.Game} game
                * @param {Kiwi.GameObjects.TileMap} parent
                * @param {Kiwi.Textures.TextureAtlas} atlas
                * @param {number} mapFormat
                * @param {string} name
                * @param {number} tileWidth
                * @param {number} tileHeight
                */
                function TileMapLayer(state, game, parent, atlas, name, tileWidth, tileHeight) {
                    _super.call(this, state, 0, 0);
                    /*
                    * The starting tile that needs to be rendered
                    */
                    this._startX = 0;
                    this._startY = 0;
                    /*
                    * Number of tiles that needs to be rendered
                    */
                    this._maxX = 0;
                    this._maxY = 0;
                    /*
                    * Used while rendering as a reference to the coordinates the current tiles.
                    */
                    this._tx = 0;
                    this._ty = 0;
                    /*
                    * The starting position in pixels
                    */
                    this._dx = 0;
                    this._dy = 0;
                    /*
                    * The width and height of map in tiles.
                    */
                    this.widthInTiles = 0;
                    this.heightInTiles = 0;
                    /*
                    * The width and height of the map in pixels.
                    */
                    this.widthInPixels = 0;
                    this.heightInPixels = 0;
                    /*
                    * The spacing around the edges of the image.
                    * The spacing in between each sprite.
                    */
                    this.tileMargin = 0;
                    this.tileSpacing = 0;

                    this._game = game;
                    this.tileParent = parent;

                    this.name = name;
                    this.tileWidth = tileWidth;
                    this.tileHeight = tileHeight;

                    this.mapData = [];
                    this._tempTileBlock = [];
                    this._atlas = atlas;

                    this.components = new Kiwi.ComponentManager(Kiwi.TILE_LAYER, this);
                }
                /*
                * Adds a single tile to the map within the given boundaries. This could be used to override a currently existing map tile.
                *
                * @method putTile
                * @param {number} x
                * @param {number} y
                * @param {number} tileType
                */
                TileMapLayer.prototype.putTile = function (x, y, tileType) {
                    x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
                    y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

                    if (y >= 0 && y < this.mapData.length) {
                        if (x >= 0 && x < this.mapData[y].length) {
                            this.mapData[y][x].tileUpdate(tileType);
                        }
                    }
                };

                /*
                * Replaces a section of tiles on the map with a particular tile.
                *
                * @method fillTile
                * @param {number} index
                * @param {number} x
                * @param {number} y
                * @param {number} width - In tiles
                * @param {number} height - In tiles
                */
                TileMapLayer.prototype.fillTiles = function (index, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[index]);
                    }
                };

                /*
                * Randomises a section of tiles on the map bsaed on the tiles you want there.
                *
                * @method randomiseTiles
                * @param {number[]} tiles
                * @param {number} x
                * @param {number} y
                * @param {number} width
                * @param {number} height
                */
                TileMapLayer.prototype.randomiseTiles = function (tiles, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[this._game.rnd.pick(tiles)]);
                    }
                };

                /*
                * Swaps all of the tiles of indexA with tiles of indexB and the same alternatively.
                *
                * @method swapTiles
                * @param {number} indexA
                * @param {number} indexB
                * @param {number} x
                * @param {number} y
                * @param {number} width
                * @param {number} height
                */
                TileMapLayer.prototype.swapTiles = function (indexA, indexB, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        if (this._tempTileBlock[r].tileType.index === indexA) {
                            this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[indexB]);
                        } else if (this._tempTileBlock[r].tileType.index === indexB) {
                            this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[indexA]);
                        }
                    }
                };

                /*
                * Replaces all of the tiles of indexA with the tiles of indexB.
                *
                * @method replaceTiles
                * @param {number} indexA
                * @param {number} indexB
                * @param {number} x
                * @param {number} y
                * @param {number} width
                * @param {number} height
                */
                TileMapLayer.prototype.replaceTiles = function (indexA, indexB, x, y, width, height) {
                    if (typeof x === "undefined") { x = 0; }
                    if (typeof y === "undefined") { y = 0; }
                    if (typeof width === "undefined") { width = this.widthInTiles; }
                    if (typeof height === "undefined") { height = this.heightInTiles; }
                    this.getTempBlock(x, y, width, height);

                    for (var r = 0; r < this._tempTileBlock.length; r++) {
                        if (this._tempTileBlock[r].tileType.index === indexA) {
                            this.mapData[this._tempTileBlock[r].ty][this._tempTileBlock[r].tx].tileUpdate(this.tileParent.tiles[indexB]);
                        }
                    }
                };

                /*
                * Gets a single tile from the x and y provided.
                *
                * @method getTileFromWorldXY
                * @param {number} x
                * @param {number} y
                * @return {number}
                */
                TileMapLayer.prototype.getTileFromWorldXY = function (x, y) {
                    x = Kiwi.Utils.GameMath.snapToFloor(x, this.tileWidth) / this.tileWidth;
                    y = Kiwi.Utils.GameMath.snapToFloor(y, this.tileHeight) / this.tileHeight;

                    return this.getTile(x, y);
                };

                /*
                * Gets all of the tiles by the index number you pass.
                *
                * @method getTilesByIndex
                * @param {number} index
                * @returns {Array}
                */
                TileMapLayer.prototype.getTilesByIndex = function (index) {
                    var tiles = [];
                    for (var ty = 0; ty < this.mapData.length; ty++) {
                        for (var tx = 0; tx < this.mapData[ty].length; tx++) {
                            if (this.mapData[ty][tx].tileType.index === index) {
                                tiles.push(this.mapData[ty][tx]);
                            }
                        }
                    }
                    return tiles;
                };

                /*
                * Creates a set of temporary tile blocks based on the current map data.
                * Perhaps add another param which is by a certain tile index?
                *
                * @method getTempBlock
                * @param {number} x
                * @param {number} y
                * @param {number} width - In Tiles.
                * @param {number} height - In Tiles.
                * @param {bool} collisionOnly - Get only the tiles that can have collisions.
                */
                TileMapLayer.prototype.getTempBlock = function (x, y, width, height, collisionOnly) {
                    if (typeof collisionOnly === "undefined") { collisionOnly = false; }
                    if (x < 0)
                        x = 0;
                    if (y < 0)
                        y = 0;

                    if (x + width > this.widthInTiles)
                        width = this.widthInTiles - x + 1;
                    if (y + height > this.heightInTiles)
                        height = this.heightInTiles - y + 1;

                    this._tempTileBlock = [];

                    for (var ty = y; ty < y + height; ty++) {
                        for (var tx = x; tx < x + width; tx++) {
                            if (collisionOnly) {
                                if (this.mapData[ty] && this.mapData[ty][tx] && this.mapData[ty][tx].tileType.allowCollisions != Kiwi.Components.ArcadePhysics.NONE) {
                                    this._tempTileBlock.push(this.mapData[ty][tx]);
                                }
                            } else {
                                if (this.mapData[ty] && this.mapData[ty][tx]) {
                                    this._tempTileBlock.push(this.mapData[ty][tx]);
                                }
                            }
                        }
                    }
                };

                /*
                * Returns all of the tiles that overlap a given entity.
                * Returns an array with each index containing the tiles
                *
                * @method getTileOverlaps
                * @param {Kiwi.Entity} object
                * @return {Array}
                */
                TileMapLayer.prototype.getTileOverlaps = function (object) {
                    //if the object is within the bounds at all.?
                    var objPos = object.transform;

                    if (objPos.x > this.transform.x + this.widthInPixels || objPos.x + object.width < this.transform.x || objPos.y > this.transform.y + this.heightInPixels || objPos.y + object.height < this.transform.y) {
                        return;
                    }

                    this._tempTileX = Kiwi.Utils.GameMath.snapToFloor(objPos.x - this.transform.x, this.tileWidth) / this.tileWidth;
                    this._tempTileY = Kiwi.Utils.GameMath.snapToFloor(objPos.y - this.transform.y, this.tileHeight) / this.tileHeight;

                    this._tempTileW = Kiwi.Utils.GameMath.snapToCeil(object.width, this.tileWidth) / this.tileWidth;
                    this._tempTileH = Kiwi.Utils.GameMath.snapToCeil(object.height, this.tileHeight) / this.tileHeight;

                    this.getTempBlock(this._tempTileX, this._tempTileY, this._tempTileW + 1, this._tempTileH + 1, true);

                    return this._tempTileBlock;
                };

                /*
                * Gets a tile's index based on the indexs provided
                *
                * @method getTileIndex
                * @param {number} x
                * @param {number} y
                * @return {number}
                */
                TileMapLayer.prototype.getTileIndex = function (x, y) {
                    if (y >= 0 && y < this.mapData.length) {
                        if (x >= 0 && x < this.mapData[y].length) {
                            return this.mapData[y][x].tileType.index;
                        }
                    }

                    return null;
                };

                /*
                * Gets a tile based on the given positions.
                *
                * @method getTileIndex
                * @param {number} x
                * @param {number} y
                * @return {number}
                */
                TileMapLayer.prototype.getTile = function (x, y) {
                    if (y >= 0 && y < this.mapData.length) {
                        if (x >= 0 && x < this.mapData[y].length) {
                            return this.mapData[y][x];
                        }
                    }

                    return null;
                };

                /*
                * Adds a row of tiles to the tilemap
                *
                * @method addRow
                * @param {Array} row
                */
                TileMapLayer.prototype.addRow = function (row) {
                    var data = [];

                    for (var c = 0; c < row.length; c++) {
                        data[c] = new Kiwi.GameObjects.Tilemap.Tile(this.state, this, row[c], this.tileWidth, this.tileHeight, c * this.tileWidth + this.transform.x, this.heightInPixels + this.transform.y);
                        data[c].ty = this.heightInTiles;
                        data[c].tx = c;
                    }

                    if (this.widthInTiles == 0) {
                        this.widthInTiles = data.length;
                        this.widthInPixels = this.widthInTiles * this.tileWidth;
                    }

                    this.mapData.push(data);

                    this.heightInTiles++;
                    this.heightInPixels += this.tileHeight;
                };

                /*
                * Loops through the texture that was given and assign's each sprite inside of it to the _tileOffset, with its coordinates.
                *
                * @method parseTileOffsets
                * @return {number}
                */
                TileMapLayer.prototype.parseTileOffsets = function () {
                    this._tileOffsets = [];

                    var i = 0;

                    if (this.tileParent.mapFormat == Tilemap.TileMap.FORMAT_TILED_JSON) {
                        //  For some reason Tiled counts from 1 not 0 - perhaps 0 means no tile but exists?
                        this._tileOffsets[0] = null;
                        i = 1;
                    }

                    var height = this._atlas.rows * (this.tileHeight + this.tileSpacing) + this.tileMargin;
                    var width = this._atlas.cols * (this.tileWidth + this.tileSpacing) + this.tileMargin;

                    for (var ty = this.tileMargin; ty < height; ty += (this.tileHeight + this.tileSpacing)) {
                        for (var tx = this.tileMargin; tx < width; tx += (this.tileWidth + this.tileSpacing)) {
                            this._tileOffsets[i] = { x: tx, y: ty };
                            i++;
                        }
                    }

                    return this._tileOffsets.length;
                };

                /*
                * Renders the tileMap to the stage. It also updates the position component of all of the tiles that appear.
                *
                * @method render
                * @param {Kiwi.Camera}
                */
                TileMapLayer.prototype.render = function (camera) {
                    if (this.visiblity === false || this.alpha < 0.1 || this.exists === false) {
                        return;
                    }

                    var ctx = this.game.stage.ctx;
                    ctx.save();

                    if (this.alpha > 0 && this.alpha <= 1) {
                        ctx.globalAlpha = this.alpha;
                    }

                    //  Work out how many tiles we can fit into our camera and round it up for the edges
                    this._maxX = Math.min(Math.ceil(camera.width / this.tileWidth) + 1, this.widthInTiles);
                    this._maxY = Math.min(Math.ceil(camera.height / this.tileHeight) + 1, this.heightInTiles);

                    //  And now work out where in the tilemap the camera actually is
                    this._startX = Math.floor((camera.transform.x - this.transform.x) / this.tileWidth);
                    this._startY = Math.floor((camera.transform.y - this.transform.y) / this.tileHeight);

                    if (this._startX < 0) {
                        this._maxX = this._maxX + this._startX;
                        this._startX = 0;
                    }
                    if (this._startY < 0) {
                        this._maxY = this._maxY + this._startX;
                        this._startY = 0;
                    }

                    if (this._maxX > this.widthInTiles)
                        this._maxX = this.widthInTiles;
                    if (this._maxY > this.heightInTiles)
                        this._maxY = this.heightInTiles;

                    if (this._startX + this._maxX > this.widthInTiles) {
                        this._maxX = this.widthInTiles - this._startX;
                    }
                    if (this._startY + this._maxY > this.heightInTiles) {
                        this._maxY = this.heightInTiles - this._startY;
                    }

                    this._dx = 0;
                    this._dy = 0;

                    this._dx += -(camera.transform.x - (this._startX * this.tileWidth)) + this.transform.x;
                    this._dy += -(camera.transform.y - (this._startY * this.tileHeight)) + this.transform.y;

                    this._tx = this._dx;
                    this._ty = this._dy;

                    for (var column = this._startY; column < this._startY + this._maxY; column++) {
                        this._columnData = this.mapData[column];

                        for (var tile = this._startX; tile < this._startX + this._maxX; tile++) {
                            if (this._tileOffsets[this._columnData[tile].tileType.index]) {
                                ctx.drawImage(this._atlas.image, this._tileOffsets[this._columnData[tile].tileType.index].x, this._tileOffsets[this._columnData[tile].tileType.index].y, this.tileWidth, this.tileHeight, this._tx, this._ty, this.tileWidth, this.tileHeight);
                            }

                            this._columnData[tile].physics.update();
                            this._columnData[tile].transform.x = this._tx;
                            this._columnData[tile].transform.y = this._ty;
                            this._tx += this.tileWidth;
                        }

                        this._tx = this._dx;
                        this._ty += this.tileHeight;
                    }

                    ctx.restore();
                    return true;
                };
                return TileMapLayer;
            })(Kiwi.Entity);
            Tilemap.TileMapLayer = TileMapLayer;
        })(GameObjects.Tilemap || (GameObjects.Tilemap = {}));
        var Tilemap = GameObjects.Tilemap;
    })(Kiwi.GameObjects || (Kiwi.GameObjects = {}));
    var GameObjects = Kiwi.GameObjects;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        *
        *
        * @class AABB
        *
        */
        var AABB = (function () {
            /**
            *
            * @constructor
            * @param {Number} cx
            * @param {Number} cy
            * @param {Number} width
            * @param {Number} height
            * @return {Kiwi.Geom.AABB}
            **/
            function AABB(cx, cy, width, height) {
                /**
                *
                * @property cx
                * @type Number
                */
                this.cx = 0;
                /**
                *
                * @property cy
                * @type Number
                */
                this.cy = 0;
                /**
                *
                * @property halfWidth
                * @type Number
                */
                this.halfWidth = 0;
                /**
                *
                * @property halfHeight
                * @type Number
                */
                this.halfHeight = 0;
                this.cx = cx || 0;
                this.cy = cy || 0;
                this.halfWidth = width / 2 || 0;
                this.halfHeight = height / 2 || 0;
            }
            AABB.prototype.objType = function () {
                return "AABB";
            };

            Object.defineProperty(AABB.prototype, "height", {
                get: /**
                *
                * @method height
                * @return {Number}
                */
                function () {
                    return this.halfHeight * 2;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AABB.prototype, "width", {
                get: /**
                *
                * @method width
                * @return {Number}
                */
                function () {
                    return this.halfWidth * 2;
                },
                enumerable: true,
                configurable: true
            });

            /**
            *
            * @method draw
            * @param {CanvasRenderingContext2D} ctx
            * @return {AABB}
            */
            AABB.prototype.draw = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(this.cx - this.halfWidth, this.cy);
                ctx.lineTo(this.cx + this.halfWidth, this.cy);
                ctx.moveTo(this.cx, this.cy - this.halfHeight);
                ctx.lineTo(this.cx, this.cy + this.halfHeight);
                ctx.stroke();
                return this;
            };

            /**
            *
            * @method setPosition
            * @param {Number} cx
            * @param {Number} cy
            * @return {AABB}
            */
            AABB.prototype.setPosition = function (cx, cy) {
                this.cx = cx;
                this.cy = cy;
                return this;
            };

            /**
            *
            * @method setPositionPoint
            * @param {Point} pos
            * @return {AABB}
            */
            AABB.prototype.setPositionPoint = function (pos) {
                this.cx = pos.x;
                this.cy = pos.y;
                return this;
            };

            /**
            *
            * @method toRect
            * @return {Rectangle}
            */
            AABB.prototype.toRect = function () {
                return new Geom.Rectangle(this.cx - this.halfWidth, this.cy - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
            };

            /**
            *
            * @method fromRect
            * @param {Rectangle} rect
            * @return {AABB}
            */
            AABB.prototype.fromRect = function (rect) {
                this.halfWidth = rect.width / 2;
                this.halfHeight = rect.height / 2;
                this.cx = rect.x + this.halfWidth;
                this.cy = rect.y + this.halfHeight;
                return this;
            };
            return AABB;
        })();
        Geom.AABB = AABB;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * A Circle object is an area defined by its position, as indicated by its center point (x,y) and diameter.
        *
        * @class Circle
        *
        */
        var Circle = (function () {
            /**
            * Creates a new Circle object with the center coordinate specified by the x and y parameters and the diameter specified by the diameter parameter. If you call this function without parameters, a circle with x, y, diameter and radius properties set to 0 is created.
            * @class Circle
            * @constructor
            * @param {Number} x The x coordinate of the center of the circle.
            * @param {Number} y The y coordinate of the center of the circle.
            * @return {Circle} This circle object
            **/
            function Circle(x, y, diameter) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof diameter === "undefined") { diameter = 0; }
                /**
                * The diameter of the circle
                * @property _diameter
                * @type Number
                **/
                this._diameter = 0;
                /**
                * The radius of the circle
                * @property _radius
                * @type Number
                **/
                this._radius = 0;
                /**
                * The x coordinate of the center of the circle
                * @property x
                * @type Number
                **/
                this.x = 0;
                /**
                * The y coordinate of the center of the circle
                * @property y
                * @type Number
                **/
                this.y = 0;
                this.setTo(x, y, diameter);
            }
            Circle.prototype.objType = function () {
                return "Circle";
            };


            Object.defineProperty(Circle.prototype, "diameter", {
                get: function () {
                    return this._diameter;
                },
                set: /**
                * The diameter of the circle. The largest distance between any two points on the circle. The same as the radius * 2.
                * @method diameter
                * @param {Number} The diameter of the circle.
                * @return {Number}
                **/
                function (value) {
                    if (value > 0) {
                        this._diameter = value;
                        this._radius = value * 0.5;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "radius", {
                get: function () {
                    return this._radius;
                },
                set: /**
                * The radius of the circle. The length of a line extending from the center of the circle to any point on the circle itself. The same as half the diameter.
                * @method radius
                * @param {Number} The radius of the circle.
                **/
                function (value) {
                    if (value > 0) {
                        this._radius = value;
                        this._diameter = value * 2;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Circle.prototype, "circumference", {
                get: /**
                * The circumference of the circle.
                * @method circumference
                * @return {Number}
                **/
                function () {
                    return 2 * (Math.PI * this._radius);
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "bottom", {
                get: function () {
                    return this.y + this._radius;
                },
                set: /**
                * The sum of the y and radius properties. Changing the bottom property of a Circle object has no effect on the x and y properties, but does change the diameter.
                * @method bottom
                * @param {Number} The value to adjust the height of the circle by.
                **/
                function (value) {
                    if (!isNaN(value)) {
                        if (value < this.y) {
                            this._radius = 0;
                            this._diameter = 0;
                        } else {
                            this.radius = value - this.y;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "left", {
                get: function () {
                    return this.x - this._radius;
                },
                set: /**
                * The x coordinate of the leftmost point of the circle. Changing the left property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
                * @method left
                * @param {Number} The value to adjust the position of the leftmost point of the circle by.
                **/
                function (value) {
                    if (!isNaN(value)) {
                        if (value < this.x) {
                            this.radius = this.x - value;
                        } else {
                            this._radius = 0;
                            this._diameter = 0;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "right", {
                get: function () {
                    return this.x + this._radius;
                },
                set: /**
                * The x coordinate of the rightmost point of the circle. Changing the right property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
                * @method right
                * @param {Number} The amount to adjust the diameter of the circle by.
                **/
                function (value) {
                    if (value && !isNaN(value)) {
                        if (value > this.x) {
                            this.radius = value - this.x;
                        } else {
                            this._radius = 0;
                            this._diameter = 0;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Circle.prototype, "top", {
                get: function () {
                    return this.y - this._radius;
                },
                set: /**
                * The sum of the y minus the radius property. Changing the top property of a Circle object has no effect on the x and y properties, but does change the diameter.
                * @method bottom
                * @param {Number} The amount to adjust the height of the circle by.
                **/
                function (value) {
                    if (value && !isNaN(value)) {
                        if (value > this.y) {
                            this._radius = 0;
                            this._diameter = 0;
                        } else {
                            this.radius = this.y - value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Circle.prototype, "area", {
                get: /**
                * Gets the area of this Circle.
                * @method area
                * @return {Number} This area of this circle.
                **/
                function () {
                    if (this._radius > 0) {
                        return Math.PI * this._radius * this._radius;
                    } else {
                        return 0;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Circle.prototype, "isEmpty", {
                get: /**
                * Determines whether or not this Circle object is empty.
                * @method isEmpty
                * @return {Boolean} A value of true if the Circle objects diameter is less than or equal to 0; otherwise false.
                **/
                function () {
                    if (this._diameter <= 0) {
                        return true;
                    }

                    return false;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Whether the circle intersects with a line. Checks against infinite line defined by the two points on the line, not the line segment.
            * If you need details about the intersection then use Kiwi.Geom.Intersect.lineToCircle instead.
            * @method intersectCircleLine
            * @param {Object} the line object to check.
            * @return {Boolean}
            **/
            /*
            public intersectCircleLine(line: Line): boolean {
            
            return Intersect.lineToCircle(line, this).result;
            
            }
            */
            /**
            * Returns a new Circle object with the same values for the x, y, width, and height properties as the original Circle object.
            * @method clone
            * @param {Circle} output Optional Circle object. If given the values will be set into the object, otherwise a brand new Circle object will be created and returned.
            * @return {Kiwi.Geom.Circle}
            **/
            Circle.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Circle(); }
                return output.setTo(this.x, this.y, this._diameter);
            };

            /**
            * Return true if the given x/y coordinates are within this Circle object.
            * If you need details about the intersection then use Kiwi.Geom.Intersect.circleContainsPoint instead.
            * @method contains
            * @param {Number} The X value of the coordinate to test.
            * @param {Number} The Y value of the coordinate to test.
            * @return {Boolean} True if the coordinates are within this circle, otherwise false.
            **/
            /*
            public contains(x: number, y: number): boolean {
            
            return Intersect.circleContainsPoint(this, <Point> { x: x, y: y }).result;
            
            }
            */
            /**
            * Return true if the coordinates of the given Point object are within this Circle object.
            * If you need details about the intersection then use Kiwi.Geom.Intersect.circleContainsPoint instead.
            * @method containsPoint
            * @param {Kiwi.Geom.Point} The Point object to test.
            * @return {Boolean} True if the coordinates are within this circle, otherwise false.
            **/
            /*
            public containsPoint(point:Point): boolean {
            
            return Intersect.circleContainsPoint(this, point).result;
            
            }
            */
            /**
            * Return true if the given Circle is contained entirely within this Circle object.
            * If you need details about the intersection then use Kiwi.Geom.Intersect.circleToCircle instead.
            * @method containsCircle
            * @param {Kiwi.Geom.Circle} The Circle object to test.
            * @return {Boolean} True if the coordinates are within this circle, otherwise false.
            **/
            /*
            public containsCircle(circle:Circle): boolean {
            
            return Intersect.circleToCircle(this, circle).result;
            
            }
            */
            /**
            * Copies all of circle data from the source Circle object into the calling Circle object.
            * @method copyFrom
            * @param {Circle} rect The source circle object to copy from
            * @return {Circle} This circle object
            **/
            Circle.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y, source.diameter);
            };

            /**
            * Copies all of circle data from this Circle object into the destination Circle object.
            * @method copyTo
            * @param {Circle} circle The destination circle object to copy in to
            * @return {Circle} The destination circle object
            **/
            Circle.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            /**
            * Returns the distance from the center of this Circle object to the given object (can be Circle, Point or anything with x/y values)
            * @method distanceFrom
            * @param {Circle/Point} target - The destination Point object.
            * @param {Boolean} round - Round the distance to the nearest integer (default false)
            * @return {Number} The distance between this Point object and the destination Point object.
            **/
            Circle.prototype.distanceTo = function (target, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = this.x - target.x;
                var dy = this.y - target.y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            /**
            * Determines whether the object specified in the toCompare parameter is equal to this Circle object. This method compares the x, y and diameter properties of an object against the same properties of this Circle object.
            * @method equals
            * @param {Circle} toCompare The circle to compare to this Circle object.
            * @return {Boolean} A value of true if the object has exactly the same values for the x, y and diameter properties as this Circle object; otherwise false.
            **/
            Circle.prototype.equals = function (toCompare) {
                if (this.x === toCompare.x && this.y === toCompare.y && this.diameter === toCompare.diameter) {
                    return true;
                }

                return false;
            };

            /**
            * Determines whether the Circle object specified in the toIntersect parameter intersects with this Circle object. This method checks the radius distances between the two Circle objects to see if they intersect.
            * @method intersects
            * @param {Circle} toIntersect The Circle object to compare against to see if it intersects with this Circle object.
            * @return {Boolean} A value of true if the specified object intersects with this Circle object; otherwise false.
            **/
            Circle.prototype.intersects = function (toIntersect) {
                if (this.distanceTo(toIntersect, false) < (this._radius + toIntersect._radius)) {
                    return true;
                }

                return false;
            };

            /**
            * Returns a Point object containing the coordinates of a point on the circumference of this Circle based on the given angle.
            * @method circumferencePoint
            * @param {Number} The angle in radians (unless asDegrees is true) to return the point from.
            * @param {Boolean} Is the given angle in radians (false) or degrees (true)?
            * @param {Kiwi.Geom.Point} An optional Point object to put the result in to. If none specified a new Point object will be created.
            * @return {Kiwi.Geom.Point} The Point object holding the result.
            **/
            Circle.prototype.circumferencePoint = function (angle, asDegrees, output) {
                if (typeof asDegrees === "undefined") { asDegrees = false; }
                if (typeof output === "undefined") { output = new Geom.Point(); }
                if (asDegrees === true) {
                    angle = angle * (Math.PI / 180);
                    //angle = angle * (180 / Math.PI); // Degrees to Radians
                }

                output.x = this.x + this._radius * Math.cos(angle);
                output.y = this.y + this._radius * Math.sin(angle);

                return output;
            };

            /**
            * Adjusts the location of the Circle object, as determined by its center coordinate, by the specified amounts.
            * @method offset
            * @param {Number} dx Moves the x value of the Circle object by this amount.
            * @param {Number} dy Moves the y value of the Circle object by this amount.
            * @return {Circle} This Circle object.
            **/
            Circle.prototype.offset = function (dx, dy) {
                if (!isNaN(dx) && !isNaN(dy)) {
                    this.x += dx;
                    this.y += dy;
                }

                return this;
            };

            /**
            * Adjusts the location of the Circle object using a Point object as a parameter. This method is similar to the Circle.offset() method, except that it takes a Point object as a parameter.
            * @method offsetPoint
            * @param {Point} point A Point object to use to offset this Circle object.
            * @return {Circle} This Circle object.
            **/
            Circle.prototype.offsetPoint = function (point) {
                return this.offset(point.x, point.y);
            };

            /**
            * Sets the members of Circle to the specified values.
            * @method setTo
            * @param {Number} x The x coordinate of the center of the circle.
            * @param {Number} y The y coordinate of the center of the circle.
            * @param {Number} diameter The diameter of the circle in pixels.
            * @return {Circle} This circle object
            **/
            Circle.prototype.setTo = function (x, y, diameter) {
                this.x = x;
                this.y = y;
                this._diameter = diameter;
                this._radius = diameter * 0.5;

                return this;
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            Circle.prototype.toString = function () {
                return "[{Circle (x=" + this.x + " y=" + this.y + " diameter=" + this.diameter + " radius=" + this.radius + ")}]";
            };
            return Circle;
        })();
        Geom.Circle = Circle;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * Represents a halfline. The ray starts at the first point and extends infinitely in the direction of the second.
        *
        * @class Ray
        *
        */
        var Ray = (function () {
            /**
            *
            * @constructor
            * @param {Number} x1
            * @param {Number} y1
            * @param {Number} x2
            * @param {Number} y2
            * @return {Kiwi.Geom.Ray} This Object
            */
            function Ray(x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                /**
                * The x component of the initial point of the ray
                * @property x1
                * @type Number
                */
                this.x1 = 0;
                /**
                * The y component of the initial point of the ray
                * @property y1
                * @type Number
                */
                this.y1 = 0;
                /**
                * The x component of the direction point of the ray
                * @property x2
                * @type Number
                */
                this.x2 = 0;
                /**
                * The y component of the direction point of the ray
                * @property y2
                * @type Number
                */
                this.y2 = 0;
                this.setTo(x1, y1, x2, y2);
            }
            Ray.prototype.objType = function () {
                return "Ray";
            };

            /**
            *
            * @method clone
            * @param {Kiwi.Geom.Ray} [output]
            * @return {Kiwi.Geom.Ray}
            */
            Ray.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Ray(); }
                return output.setTo(this.x1, this.y1, this.x2, this.y2);
            };

            /**
            *
            * @method copyFrom
            * @param {Kiwi.Geom.Line} source
            * @return {Kiwi.Geom.Line}
            */
            Ray.prototype.copyFrom = function (source) {
                return this.setTo(source.x1, source.y1, source.x2, source.y2);
            };

            /**
            *
            * @method copyTo
            * @param {Kiwi.Geom.Line} target
            * @return {Kiwi.Geom.Line}
            */
            Ray.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            /**
            *
            * @method setTo
            * @param {Number} x1
            * @param {Number} y1
            * @param {Number} x2
            * @param {Number} y2
            * @return {Kiwi.Geom.Line}
            */
            Ray.prototype.setTo = function (x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;

                return this;
            };

            Object.defineProperty(Ray.prototype, "angle", {
                get: /**
                * Get the angle of the ray.
                * @method angle
                * @return {Number}
                */
                function () {
                    return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Ray.prototype, "slope", {
                get: /**
                * Get the slope of the ray.
                * @method slope
                * @return {Number}
                */
                function () {
                    return (this.y2 - this.y1) / (this.x2 - this.x1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Ray.prototype, "yIntercept", {
                get: /**
                *
                * @method yIntercept
                * @return {Number}
                */
                function () {
                    return (this.y1 - this.slope * this.x1);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Check if a the ray passes through a point.
            * @method isPointOnRay
            * @param {Number} x
            * @param {Number} y
            * @return {Boolean}
            */
            Ray.prototype.isPointOnRay = function (x, y) {
                if ((x - this.x1) * (this.y2 - this.y1) === (this.x2 - this.x1) * (y - this.y1)) {
                    if (Math.atan2(y - this.y1, x - this.x1) == Math.atan2(this.y2 - this.y1, this.x2 - this.x1)) {
                        return true;
                    }
                    //  return true;
                }

                return false;
            };

            /**
            * Get a string representation of the ray.
            * @method toString
            * @return {String}
            */
            Ray.prototype.toString = function () {
                return "[{Ray (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";
            };
            return Ray;
        })();
        Geom.Ray = Ray;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * A collection of methods to help determine and return intersection between geometric objects.
        *
        * @class Intersect
        *
        */
        var Intersect = (function () {
            function Intersect() {
            }
            Intersect.prototype.objType = function () {
                return "Intersect";
            };

            Intersect.distance = /**
            * -------------------------------------------------------------------------------------------
            * Distance
            * -------------------------------------------------------------------------------------------
            **/
            /**
            *
            * @method distance
            * @param {Number} x1
            * @param {Number} y1
            * @param {Number} x2
            * @param {Number} y2
            * @return {Number}
            **/
            function (x1, y1, x2, y2) {
                return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            };

            Intersect.distanceSquared = /**
            *
            * @method distanceSquared
            * @param {Number} x1
            * @param {Number} y1
            * @param {Number} x2
            * @param {Number} y2
            * @return {Number}
            **/
            function (x1, y1, x2, y2) {
                return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
            };

            Intersect.lineToLine = /**
            * -------------------------------------------------------------------------------------------
            * Lines
            * -------------------------------------------------------------------------------------------
            **/
            /**
            * Check if the two given Line objects intersect
            * @method lineToLine
            * @param {Kiwi.Geom.Line} The first line object to check
            * @param {Kiwi.Geom.Line} The second line object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (line1, line2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line1.x1 - line1.x2) * (line2.y1 - line2.y2) - (line1.y1 - line1.y2) * (line2.x1 - line2.x2);

                if (denom !== 0) {
                    output.result = true;
                    output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (line2.x1 - line2.x2) - (line1.x1 - line1.x2) * (line2.x1 * line2.y2 - line2.y1 * line2.x2)) / denom;
                    output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (line2.y1 - line2.y2) - (line1.y1 - line1.y2) * (line2.x1 * line2.y2 - line2.y1 * line2.x2)) / denom;
                }

                return output;
            };

            Intersect.lineToLineSegment = /**
            * Check if the Line and Line Segment intersects
            * @method lineToLineSegment
            * @param {Kiwi.Geom.Line} The line object to check
            * @param {Kiwi.Geom.Line} The line segment object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (line1, seg, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line1.x1 - line1.x2) * (seg.y1 - seg.y2) - (line1.y1 - line1.y2) * (seg.x1 - seg.x2);

                if (denom !== 0) {
                    output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (seg.x1 - seg.x2) - (line1.x1 - line1.x2) * (seg.x1 * seg.y2 - seg.y1 * seg.x2)) / denom;
                    output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (seg.y1 - seg.y2) - (line1.y1 - line1.y2) * (seg.x1 * seg.y2 - seg.y1 * seg.x2)) / denom;

                    var maxX = Math.max(seg.x1, seg.x2);
                    var minX = Math.min(seg.x1, seg.x2);
                    var maxY = Math.max(seg.y1, seg.y2);
                    var minY = Math.min(seg.y1, seg.y2);

                    if ((output.x <= maxX && output.x >= minX) === true || (output.y <= maxY && output.y >= minY) === true) {
                        output.result = true;
                    }
                }

                return output;
            };

            Intersect.lineToRawSegment = /**
            * Check if the Line and Line Segment intersects
            * @method lineToLineSegment
            * @param {Kiwi.Geom.Line} The line object to check
            * @param {number} The x1 value
            * @param {number} The y1 value
            * @param {number} The x2 value
            * @param {number} The y2 value
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (line, x1, y1, x2, y2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line.x1 - line.x2) * (y1 - y2) - (line.y1 - line.y2) * (x1 - x2);

                if (denom !== 0) {
                    output.x = ((line.x1 * line.y2 - line.y1 * line.x2) * (x1 - x2) - (line.x1 - line.x2) * (x1 * y2 - y1 * x2)) / denom;
                    output.y = ((line.x1 * line.y2 - line.y1 * line.x2) * (y1 - y2) - (line.y1 - line.y2) * (x1 * y2 - y1 * x2)) / denom;

                    var maxX = Math.max(x1, x2);
                    var minX = Math.min(x1, x2);
                    var maxY = Math.max(y1, y2);
                    var minY = Math.min(y1, y2);

                    if ((output.x <= maxX && output.x >= minX) === true || (output.y <= maxY && output.y >= minY) === true) {
                        output.result = true;
                    }
                }

                return output;
            };

            Intersect.lineToRay = /**
            * Check if the Line and Ray intersects
            * @method lineToRay
            * @param {Kiwi.Geom.Line} The Line object to check
            * @param {Kiwi.Geom.Line} The Ray object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (line1, ray, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var denom = (line1.x1 - line1.x2) * (ray.y1 - ray.y2) - (line1.y1 - line1.y2) * (ray.x1 - ray.x2);

                if (denom !== 0) {
                    output.x = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (ray.x1 - ray.x2) - (line1.x1 - line1.x2) * (ray.x1 * ray.y2 - ray.y1 * ray.x2)) / denom;
                    output.y = ((line1.x1 * line1.y2 - line1.y1 * line1.x2) * (ray.y1 - ray.y2) - (line1.y1 - line1.y2) * (ray.x1 * ray.y2 - ray.y1 * ray.x2)) / denom;
                    output.result = true;

                    if (!(ray.x1 >= ray.x2) && output.x < ray.x1) {
                        output.result = false;
                    }

                    if (!(ray.y1 >= ray.y2) && output.y < ray.y1) {
                        output.result = false;
                    }
                }

                return output;
            };

            Intersect.lineToCircle = /**
            * Check if the Line and Circle intersects
            * @method lineToCircle
            * @param {Kiwi.Geom.Line} The Line object to check
            * @param {Kiwi.Geom.Circle} The Circle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
            **/
            function (line, circle, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                if (line.perp(circle.x, circle.y).length <= circle.radius) {
                    output.result = true;
                }

                return output;
            };

            Intersect.lineToRectangle = /**
            * Check if the Line intersects each side of the Rectangle
            * @method lineToRectangle
            * @param {Kiwi.Geom.Line} The Line object to check
            * @param {Kiwi.Geom.Rectangle} The Rectangle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
            **/
            function (line, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                //  Top of the Rectangle vs the Line
                Intersect.lineToRawSegment(line, rect.x, rect.y, rect.right, rect.y, output);

                if (output.result === true) {
                    return output;
                }

                //  Left of the Rectangle vs the Line
                Intersect.lineToRawSegment(line, rect.x, rect.y, rect.x, rect.bottom, output);

                if (output.result === true) {
                    return output;
                }

                //  Bottom of the Rectangle vs the Line
                Intersect.lineToRawSegment(line, rect.x, rect.bottom, rect.right, rect.bottom, output);

                if (output.result === true) {
                    return output;
                }

                //  Right of the Rectangle vs the Line
                Intersect.lineToRawSegment(line, rect.right, rect.y, rect.right, rect.bottom, output);

                return output;
            };

            Intersect.lineSegmentToLineSegment = /**
            * -------------------------------------------------------------------------------------------
            * Line Segment
            * -------------------------------------------------------------------------------------------
            **/
            /**
            * Check if Line1 intersects with Line2
            * @method lineSegmentToLineSegment
            * @param {Kiwi.Geom.Line} The first line object to check
            * @param {Kiwi.Geom.Line} The second line object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (line1, line2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToLineSegment(line1, line2, output);

                if (output.result === true) {
                    if (!(output.x >= Math.min(line1.x1, line1.x2) && output.x <= Math.max(line1.x1, line1.x2) && output.y >= Math.min(line1.y1, line1.y2) && output.y <= Math.max(line1.y1, line1.y2))) {
                        output.result = false;
                    }
                }

                return output;
            };

            Intersect.lineSegmentToRay = /**
            * Check if the Line Segment intersects with the Ray
            * @method lineSegmentToRay
            * @param {Kiwi.Geom.Line} The Line object to check
            * @param {Kiwi.Geom.Line} The Line Ray object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (line1, ray, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                Intersect.lineToRay(line1, ray, output);

                if (output.result === true) {
                    if (!(output.x >= Math.min(line1.x1, line1.x2) && output.x <= Math.max(line1.x1, line1.x2) && output.y >= Math.min(line1.y1, line1.y2) && output.y <= Math.max(line1.y1, line1.y2))) {
                        output.result = false;
                    }
                }

                return output;
            };

            Intersect.lineSegmentToCircle = /**
            * Check if the Line Segment intersects with the Circle
            * @method lineSegmentToCircle
            * @param {Kiwi.Geom.Line} The Line object to check
            * @param {Kiwi.Geom.Circle} The Circle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (seg, circle, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var perp = seg.perp(circle.x, circle.y);

                if (perp.length <= circle.radius) {
                    //  Line intersects circle - check if segment does
                    var maxX = Math.max(seg.x1, seg.x2);
                    var minX = Math.min(seg.x1, seg.x2);
                    var maxY = Math.max(seg.y1, seg.y2);
                    var minY = Math.min(seg.y1, seg.y2);

                    if ((perp.x2 <= maxX && perp.x2 >= minX) && (perp.y2 <= maxY && perp.y2 >= minY)) {
                        output.result = true;
                    } else {
                        if (Intersect.circleContainsPoint(circle, { x: seg.x1, y: seg.y1 }) || Intersect.circleContainsPoint(circle, { x: seg.x2, y: seg.y2 })) {
                            output.result = true;
                        }
                    }
                }

                return output;
            };

            Intersect.lineSegmentToRectangle = /**
            * Check if the Line Segment intersects with the Rectangle
            * @method lineSegmentToCircle
            * @param {Kiwi.Geom.Line} The Line object to check
            * @param {Kiwi.Geom.Circle} The Circle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y
            **/
            function (seg, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                if (rect.contains(seg.x1, seg.y1) && rect.contains(seg.x2, seg.y2)) {
                    output.result = true;
                } else {
                    //  Top of the Rectangle vs the Line
                    Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.right, rect.bottom, output);

                    if (output.result === true) {
                        return output;
                    }

                    //  Left of the Rectangle vs the Line
                    Intersect.lineToRawSegment(seg, rect.x, rect.y, rect.x, rect.bottom, output);

                    if (output.result === true) {
                        return output;
                    }

                    //  Bottom of the Rectangle vs the Line
                    Intersect.lineToRawSegment(seg, rect.x, rect.bottom, rect.right, rect.bottom, output);

                    if (output.result === true) {
                        return output;
                    }

                    //  Right of the Rectangle vs the Line
                    Intersect.lineToRawSegment(seg, rect.right, rect.y, rect.right, rect.bottom, output);

                    return output;
                }

                return output;
            };

            Intersect.rayToRectangle = /**
            * -------------------------------------------------------------------------------------------
            * Ray
            * -------------------------------------------------------------------------------------------
            **/
            /**
            * Check if the two given Circle objects intersect
            * @method circleToCircle
            * @param {Kiwi.Geom.Circle} The first circle object to check
            * @param {Kiwi.Geom.Circle} The second circle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
            **/
            function (ray, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                //  Currently just finds first intersection - might not be closest to ray pt1
                Intersect.lineToRectangle(ray, rect, output);

                return output;
            };

            Intersect.rayToLineSegment = /**
            * Check whether a ray intersects a line segment, returns the parametric value where the intersection occurs.
            * @method rayToLineSegment
            * @static
            * @param {Number} rayx1. The origin x of the ray.
            * @param {Number} rayy1. The origin y of the ray.
            * @param {Number} rayx2. The direction x of the ray.
            * @param {Number} rayy2. The direction y of the ray.
            * @param {Number} linex1. The x of the first point of the line segment.
            * @param {Number} liney1. The y of the first point of the line segment.
            * @param {Number} linex2. The x of the second point of the line segment.
            * @param {Number} liney2. The y of the second point of the line segment.
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection stored in x
            **/
            function (rayx1, rayy1, rayx2, rayy2, linex1, liney1, linex2, liney2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var r, s, d;

                if ((rayy2 - rayy1) / (rayx2 - rayx1) != (liney2 - liney1) / (linex2 - linex1)) {
                    d = (((rayx2 - rayx1) * (liney2 - liney1)) - (rayy2 - rayy1) * (linex2 - linex1));

                    if (d != 0) {
                        r = (((rayy1 - liney1) * (linex2 - linex1)) - (rayx1 - linex1) * (liney2 - liney1)) / d;
                        s = (((rayy1 - liney1) * (rayx2 - rayx1)) - (rayx1 - linex1) * (rayy2 - rayy1)) / d;

                        if (r >= 0) {
                            if (s >= 0 && s <= 1) {
                                output.result = true;
                                output.x = rayx1 + r * (rayx2 - rayx1), rayy1 + r * (rayy2 - rayy1);
                            }
                        }
                    }
                }

                return output;
            };

            Intersect.circleToCircle = /**
            * -------------------------------------------------------------------------------------------
            * Circle
            * -------------------------------------------------------------------------------------------
            **/
            /**
            * Check if the two given Circle objects intersect
            * @method circleToCircle
            * @param {Kiwi.Geom.Circle} The first circle object to check
            * @param {Kiwi.Geom.Circle} The second circle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
            **/
            function (circle1, circle2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.result = ((circle1.radius + circle2.radius) * (circle1.radius + circle2.radius)) >= Intersect.distanceSquared(circle1.x, circle1.y, circle2.x, circle2.y);

                return output;
            };

            Intersect.circleToRectangle = /**
            * Check if the given Rectangle intersects with the given Circle
            * @method circleToRectangle
            * @param {Kiwi.Geom.Circle} The circle object to check
            * @param {Kiwi.Geom.Rectangle} The Rectangle object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
            **/
            function (circle, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var inflatedRect = rect.clone();

                inflatedRect.inflate(circle.radius, circle.radius);

                output.result = inflatedRect.contains(circle.x, circle.y);

                return output;
            };

            Intersect.circleContainsPoint = /**
            * Check if the given Point is found within the given Circle
            * @method circleContainsPoint
            * @param {Kiwi.Geom.Circle} The circle object to check
            * @param {Kiwi.Geom.Point} The point object to check
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection
            **/
            function (circle, point, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.result = circle.radius * circle.radius >= Intersect.distanceSquared(circle.x, circle.y, point.x, point.y);

                return output;
            };

            Intersect.pointToRectangle = /**
            * -------------------------------------------------------------------------------------------
            * Rectangles
            * -------------------------------------------------------------------------------------------
            **/
            /**
            * Determines whether the specified point is contained within the rectangular region defined the Rectangle object.
            * @method pointToRectangle
            * @param {Point} point The point object being checked.
            * @param {Rectangle} rect The rectangle object being checked.
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y/result
            **/
            function (point, rect, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                output.setTo(point.x, point.y);

                output.result = rect.containsPoint(point);

                return output;
            };

            Intersect.rectangleToRectangle = /**
            * Check whether two axis aligned rectangles intersect. Return the intersecting rectangle dimensions if they do.
            * @method rectangleToRectangle
            * @param {Kiwi.Geom.Rectangle} The first Rectangle object
            * @param {Kiwi.Geom.Rectangle} The second Rectangle object
            * @param {Kiwi.Geom.IntersectResult} An optional IntersectResult object to store the intersection values in (one is created if none given)
            * @return {Kiwi.Geom.IntersectResult} An IntersectResult object containing the results of this intersection in x/y/width/height
            **/
            function (rect1, rect2, output) {
                if (typeof output === "undefined") { output = new Geom.IntersectResult(); }
                var leftX = Math.max(rect1.x, rect2.x);
                var rightX = Math.min(rect1.right, rect2.right);
                var topY = Math.max(rect1.y, rect2.y);
                var bottomY = Math.min(rect1.bottom, rect2.bottom);

                output.setTo(leftX, topY, rightX - leftX, bottomY - topY, rightX - leftX, bottomY - topY);

                var cx = output.x + output.width * .5;
                var cy = output.y + output.height * .5;

                if ((cx > rect1.x && cx < rect1.right) && (cy > rect1.y && cy < rect1.bottom)) {
                    output.result = true;
                }

                return output;
            };
            return Intersect;
        })();
        Geom.Intersect = Intersect;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * A light result object to hold the results of an intersection
        *
        * @class IntersectResult
        *
        */
        var IntersectResult = (function () {
            function IntersectResult() {
                /**
                * @property result
                * @type Boolean
                */
                this.result = false;
            }
            IntersectResult.prototype.objType = function () {
                return "IntersectResult";
            };

            /**
            *
            * @method setTo
            * @param {Number} x1
            * @param {Number} y1
            * @param {Number} [x2]
            * @param {Number} [y2]
            * @param {Number} [width]
            * @param {Number} [height]
            */
            IntersectResult.prototype.setTo = function (x1, y1, x2, y2, width, height) {
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this.x = x1;
                this.y = y1;

                this.x1 = x1;
                this.y1 = y1;

                this.x2 = x2;
                this.y2 = y2;

                this.width = width;
                this.height = height;
            };
            return IntersectResult;
        })();
        Geom.IntersectResult = IntersectResult;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * A line object is an infinte line through space. The two sets of x/y coordinates define the Line Segment.
        *
        * @class Line
        *
        */
        var Line = (function () {
            /**
            * Creates an line defined by two points. Can be treated as either a Line or Line Segment depending on context.
            * @constructor
            * @param {Number} x1 x component of first point.
            * @param {Number} y1 y component of first point.
            * @param {Number} x2 x component of second point.
            * @param {Number} y2 y component of second point.
            * @return {Kiwi.Geom.Line} This Object
            */
            function Line(x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                /**
                * x component of first point.
                * @property x1
                * @type Number
                */
                this.x1 = 0;
                /**
                * y component of first point.
                * @property y1
                * @type Number
                */
                this.y1 = 0;
                /**
                * x component of second point.
                * @property x2
                * @type Number
                */
                this.x2 = 0;
                /**
                * y component of second point.
                * @property y2
                * @type Number
                */
                this.y2 = 0;
                this.setTo(x1, y1, x2, y2);
            }
            Line.prototype.objType = function () {
                return "Line";
            };

            /**
            * Return a clone of the line.
            * @method clone
            * @param {Kiwi.Geom.Line} [output]
            * @return {Kiwi.Geom.Line}
            */
            Line.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Line(); }
                return output.setTo(this.x1, this.y1, this.x2, this.y2);
            };

            /**
            * Copy the line from another existing line.
            * @method copyFrom
            * @param {Kiwi.Geom.Line} source
            * @return {Kiwi.Geom.Line}
            */
            Line.prototype.copyFrom = function (source) {
                return this.setTo(source.x1, source.y1, source.x2, source.y2);
            };

            /**
            * Copy the line to another existing line.
            * @method copyTo
            * @param {Kiwi.Geom.Line} target
            * @return {Kiwi.Geom.Line}
            */
            Line.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            /**
            * Set all components on the line.
            * @method setTo
            * @param {Number} x1 x component of first point.
            * @param {Number} y1 y component of first point.
            * @param {Number} x2 x component of second point.
            * @param {Number} y2 y component of second point.
            * @return {Kiwi.Geom.Line}
            */
            Line.prototype.setTo = function (x1, y1, x2, y2) {
                if (typeof x1 === "undefined") { x1 = 0; }
                if (typeof y1 === "undefined") { y1 = 0; }
                if (typeof x2 === "undefined") { x2 = 0; }
                if (typeof y2 === "undefined") { y2 = 0; }
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;

                return this;
            };

            Object.defineProperty(Line.prototype, "length", {
                get: /**
                * Get the length of the line as a line segement.
                * @method length
                * @return {Number}
                */
                function () {
                    return Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1));
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Get the y of a point on the line for a given x.
            * @method getY
            * @param {Number} x
            * @return {Number}
            */
            Line.prototype.getY = function (x) {
                return this.slope * x + this.yIntercept;
            };

            Object.defineProperty(Line.prototype, "angle", {
                get: /**
                * Get the angle of the line.
                * @method angle
                * @return {Number}
                */
                function () {
                    return Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line.prototype, "slope", {
                get: /**
                * Get the slope of the line (y/x).
                * @method slope
                * @return {Number}
                */
                function () {
                    return (this.y2 - this.y1) / (this.x2 - this.x1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line.prototype, "perpSlope", {
                get: /**
                * Get the perpendicular slope of the line (x/y).
                * @method perpSlope
                * @return {Number}
                */
                function () {
                    return -((this.x2 - this.x1) / (this.y2 - this.y1));
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line.prototype, "yIntercept", {
                get: /**
                * Get the y intercept for the line.
                * @method yIntercept
                * @return {Number}
                */
                function () {
                    return (this.y1 - this.slope * this.x1);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Check if a point is on the line.
            * @method isPointOnLine
            * @param {Number} x
            * @param {Number} y
            * @return {Boolean}
            */
            Line.prototype.isPointOnLine = function (x, y) {
                if ((x - this.x1) * (this.y2 - this.y1) === (this.x2 - this.x1) * (y - this.y1)) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Check if the point is both on the line and within the line segment.
            * @method isPointOnLineSegment
            * @param {Number} x
            * @param {Number} y
            * @return {Boolean}
            */
            Line.prototype.isPointOnLineSegment = function (x, y) {
                var xMin = Math.min(this.x1, this.x2);
                var xMax = Math.max(this.x1, this.x2);
                var yMin = Math.min(this.y1, this.y2);
                var yMax = Math.max(this.y1, this.y2);

                if (this.isPointOnLine(x, y) && (x >= xMin && x <= xMax) && (y >= yMin && y <= yMax)) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            *
            * @method intersectLineLine
            * @param {Any} line
            * @return {Any}
            */
            Line.prototype.intersectLineLine = function (line) {
                //return Kiwi.Geom.intersectLineLine(this,line);
            };

            /**
            * Get a line perpendicular to the line passing through a given point.
            * @method perp
            * @param {Number} x
            * @param {Number} y
            * @param {Kiwi.Geom.Line} [output]
            * @return {Kiwi.Geom.Line}
            */
            Line.prototype.perp = function (x, y, output) {
                if (this.y1 === this.y2) {
                    if (output) {
                        output.setTo(x, y, x, this.y1);
                    } else {
                        return new Line(x, y, x, this.y1);
                    }
                }

                var yInt = (y - this.perpSlope * x);

                var pt = this.intersectLineLine({ x1: x, y1: y, x2: 0, y2: yInt });

                if (output) {
                    output.setTo(x, y, pt.x, pt.y);
                } else {
                    return new Line(x, y, pt.x, pt.y);
                }
            };

            /**
            * Get a string representation of the line.
            * @method toString
            * @return {String}
            */
            Line.prototype.toString = function () {
                return "[{Line (x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " y2=" + this.y2 + ")}]";
            };
            return Line;
        })();
        Geom.Line = Line;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * Represents a 2d transformation matrix. This can be used to map points between different coordinate spaces. Matrices are used
        * by Transform objects to represent translation, scale and rotation transformations, and to determine where objects are in world space or camera space.
        * Objects such as entities and groups may be nested, and their associated transforms may represent how they are scaled, translated and rotated relative to a parent
        * transform.
        * By concatenating an object's transformatkion matrix with it's ancestors matrices, it is possible to determine the absolute position of the object in world space.
        * See http://en.wikipedia.org/wiki/Transformation_matrix#Examples_in_2D_graphics for an in depth discussion of 2d tranformation matrices.
        *
        * @class Matrix
        *
        */
        var Matrix = (function () {
            /**
            * Matrix class used for mapping points between coordinate spaces.
            * @class Matrix
            * @constructor
            * @param {Number} a position 0,0 of the matrix, affects scaling and rotation.
            * @param {Number} b position 0,1 of the matrix, affects scaling and rotation.
            * @param {Number} c position 1,0 of the matrix, affects scaling and rotation.
            * @param {Number} d position 1,1 of the matrix, affects scaling and rotation.
            * @param {Number} tx position 2,0 of the matrix, affects translation on x axis.
            * @param {Number} ty position 2,1 of the matrix, affects translation on y axis.
            * @return (Object) This object.
            **/
            function Matrix(a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0;
                this.setTo(a, b, c, d, tx, ty);
            }
            Matrix.prototype.objType = function () {
                return "Matrix";
            };

            /**
            * Set all matrix values
            * @method setTo
            * @param {Number} a position 0,0 of the matrix, affects scaling and rotation.
            * @param {Number} b position 0,1 of the matrix, affects scaling and rotation.
            * @param {Number} c position 1,0 of the matrix, affects scaling and rotation.
            * @param {Number} d position 1,1 of the matrix, affects scaling and rotation.
            * @param {Number} tx position 2,0 of the matrix, affects translation on x axis.
            * @param {Number} ty position 2,1 of the matrix, affects translation on y axis.
            * @return (Object) This object.
            */
            Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;

                return this;
            };

            /**
            * Set matrix values from transform values
            * @method setFromTransform
            * @Param {Number} tx. Translation on x axis.
            * @Param {Number} ty. Translation on y axis.
            * @Param {Number} scaleX. Scale on x axis.
            * @Param {Number} scaleY. Scale on y axis.
            * @Param {Number} rotation.
            * @return (Object) This object.
            */
            Matrix.prototype.setFromTransform = function (tx, ty, scaleX, scaleY, rotation) {
                this.identity();
                var cos = Math.cos(rotation);
                var sin = Math.sin(rotation);

                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, tx, ty);

                return this;
            };

            /**
            * Prepend values to this matrix, paramters supplied individually.
            * @method prepend
            * @param {Number} a position 0,0 of the matrix, affects scaling and rotation.
            * @param {Number} b position 0,1 of the matrix, affects scaling and rotation.
            * @param {Number} c position 1,0 of the matrix, affects scaling and rotation.
            * @param {Number} d position 1,1 of the matrix, affects scaling and rotation.
            * @param {Number} tx position 2,0 of the matrix, affects translation on x axis.
            * @param {Number} ty position 2,1 of the matrix, affects translation on y axis.
            * @return (Object) This object.
            */
            Matrix.prototype.prepend = function (a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                var tx1 = this.tx;
                var a1 = this.a;
                var c1 = this.c;

                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;

                this.tx = tx1 * a + this.ty * c + tx;
                this.ty = tx1 * b + this.ty * d + ty;
                return this;
            };

            /**
            * Prepend a matrix to this matrix.
            * @method prependMatrix
            * @param {Object} m. The matrix to prepend.
            * @return (Object) This object.
            */
            Matrix.prototype.prependMatrix = function (m) {
                var tx1 = this.tx;
                var a1 = this.a;
                var c1 = this.c;

                this.a = a1 * m.a + this.b * m.c;
                this.b = a1 * m.b + this.b * m.d;
                this.c = c1 * m.a + this.d * m.c;
                this.d = c1 * m.b + this.d * m.d;

                this.tx = tx1 * m.a + this.ty * m.c + m.tx;
                this.ty = tx1 * m.b + this.ty * m.d + m.ty;
                return this;
            };

            /**
            * Append values to this matrix, paramters supplied individually.
            * @method append
            * @param {Number} a position 0,0 of the matrix, affects scaling and rotation.
            * @param {Number} b position 0,1 of the matrix, affects scaling and rotation.
            * @param {Number} c position 1,0 of the matrix, affects scaling and rotation.
            * @param {Number} d position 1,1 of the matrix, affects scaling and rotation.
            * @param {Number} tx position 2,0 of the matrix, affects translation on x axis.
            * @param {Number} ty position 2,1 of the matrix, affects translation on y axis.
            * @return (Object) This object.
            */
            Matrix.prototype.append = function (a, b, c, d, tx, ty) {
                if (typeof a === "undefined") { a = 1; }
                if (typeof b === "undefined") { b = 0; }
                if (typeof c === "undefined") { c = 0; }
                if (typeof d === "undefined") { d = 1; }
                if (typeof tx === "undefined") { tx = 0; }
                if (typeof ty === "undefined") { ty = 0; }
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;

                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
                this.tx = tx * a1 + ty * c1 + this.tx;
                this.ty = tx * b1 + ty * d1 + this.ty;
                return this;
            };

            /**
            * Append a matrix to this matrix.
            * @method appendMatrix
            * @param {Object} m. The matrix to append.
            * @return (Object) This object.
            */
            Matrix.prototype.appendMatrix = function (m) {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;

                this.a = m.a * a1 + m.b * c1;
                this.b = m.a * b1 + m.b * d1;
                this.c = m.c * a1 + m.d * c1;
                this.d = m.c * b1 + m.d * d1;
                this.tx = m.tx * a1 + m.ty * c1 + this.tx;
                this.ty = m.tx * b1 + m.ty * d1 + this.ty;
                return this;
            };

            /**
            * Set the tx and ty elements of the matrix
            * @method setPosition
            * @Param {Number} x. Translation on x axis.
            * @Param {Number} y. Translation on y axis.
            * @return (Object) This object.
            */
            Matrix.prototype.setPosition = function (x, y) {
                this.tx = x;
                this.ty = y;
                return this;
            };

            /**
            * Set the tx and ty elements of the matrix from an object with x and y properties.
            * @method setPositionVector
            * @Param {Number} v. The object from which to copy the x and y properties from.
            * @return (Object) This object.
            */
            Matrix.prototype.setPositionPoint = function (p) {
                this.tx = p.x;
                this.ty = p.y;
                return this;
            };

            /**
            * Get the x and y position of the matrix as an object with x and y properties
            * @method setPositionVector
            * @return (Object) An object constructed from a literal with x and y properties.
            */
            Matrix.prototype.getPosition = function (output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                return output.setTo(this.tx, this.ty);
            };

            /**
            * Set the matrix to the identity matrix - when appending or prepending this matrix to another there will be no change in the resulting matrix
            * @method identity
            * @return (Object) This object.
            */
            Matrix.prototype.identity = function () {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0;
                return this;
            };

            /**
            * Rotate the matrix by "radians" degrees
            * @method rotate
            * @Param {Number} radians.
            * @return (Object) This object.
            */
            Matrix.prototype.rotate = function (radians) {
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);

                var a1 = this.a;
                var c1 = this.c;
                var tx1 = this.tx;

                this.a = a1 * cos - this.b * sin;
                this.b = a1 * sin + this.b * cos;
                this.c = c1 * cos - this.d * sin;
                this.d = c1 * sin + this.d * cos;
                this.tx = tx1 * cos - this.ty * sin;
                this.ty = tx1 * sin + this.ty * cos;
                return this;
            };

            /**
            * Translate the matrix
            * @method transalte
            * @Param {Number} tx. The amount to translate on the x axis.
            * @Param {Number} ty. The amount to translate on the y axis.
            * @return (Object) This object.
            */
            Matrix.prototype.translate = function (tx, ty) {
                this.tx += tx;
                this.ty += ty;
                return this;
            };

            /**
            * Scale the matrix
            * @method scale
            * @Param {Number} scaleX. The amount to scale on the x axis.
            * @Param {Number} scaleY. The amount to scale on the y axis.
            * @return (Object) This object.
            */
            Matrix.prototype.scale = function (scaleX, scaleY) {
                this.a *= scaleX;
                this.d *= scaleY;
                return this;
            };

            /**
            * Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
            * @method transformPoint
            * @Param {Object} pt. The point to be translated.
            * @return (Object) The translated point.
            */
            Matrix.prototype.transformPoint = function (pt) {
                var x = pt.x;
                var y = pt.y;
                pt.x = this.a * x + this.c * y + this.tx;
                pt.y = this.b * x + this.d * y + this.ty;
                return pt;
            };

            /**
            * Invert this matrix so that it represents the opposite of it's orginal tranformaation.
            * @method transformPoint
            * @return (Object) This object.
            */
            Matrix.prototype.invert = function () {
                var a1 = this.a;
                var b1 = this.b;
                var c1 = this.c;
                var d1 = this.d;
                var tx1 = this.tx;
                var n = a1 * d1 - b1 * c1;

                this.a = d1 / n;
                this.b = -b1 / n;
                this.c = -c1 / n;
                this.d = a1 / n;
                this.tx = (c1 * this.ty - d1 * tx1) / n;
                this.ty = -(a1 * this.ty - b1 * tx1) / n;
                return this;
            };

            /**
            * Copy another matrix to this matrix.
            * @method copyFrom
            * @Param {Object} m. The matrixto be copied from.
            * @return (Object) This object.
            */
            Matrix.prototype.copyFrom = function (m) {
                this.a = m.a;
                this.b = m.b;
                this.c = m.c;
                this.d = m.d;
                this.tx = m.tx;
                this.ty = m.ty;

                return this;
            };

            /**
            * Copy this matrix to another matrix.
            * @method copyTo
            * @Param {Object} m. The matrix to copy to.
            * @return (Object) This object.
            */
            Matrix.prototype.copyTo = function (m) {
                m.a = this.a;
                m.b = this.b;
                m.c = this.c;
                m.d = this.d;
                m.tx = this.tx;
                m.ty = this.ty;
                return this;
            };

            /**
            * Clone this matrix
            * @method clone
            * @return (Object) The new clone of this matrix.
            */
            Matrix.prototype.clone = function () {
                return new Kiwi.Geom.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
            };

            Object.defineProperty(Matrix.prototype, "toString", {
                get: /**
                * Returns a string representation of this object.
                * @method toString
                * @return {string} a string representation of the instance.
                **/
                function () {
                    return "[{Matrix (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")}]";
                },
                enumerable: true,
                configurable: true
            });
            return Matrix;
        })();
        Geom.Matrix = Matrix;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * Represetns a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
        *
        * @class Point
        *
        */
        var Point = (function () {
            /**
            * Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
            * @class Point
            * @constructor
            * @param {Number} x One-liner. Default is ?.
            * @param {Number} y One-liner. Default is ?.
            **/
            function Point(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.setTo(x, y);
            }
            Point.prototype.objType = function () {
                return "Point";
            };

            /**
            * Converts a pair of polar coordinates to a Cartesian point coordinate and sets them on the point instance.
            * @method polar
            * @param {Number} length - The length coordinate of the polar pair.
            * @param {Number} angle - The angle, in radians, of the polar pair.
            * @return {Point} The new Cartesian Point object.
            **/
            Point.prototype.polar = function (distance, angle) {
                this.x = distance * Math.cos(angle * Math.PI / 180);
                this.y = distance * Math.sin(angle * Math.PI / 180);
                return this;
            };

            /**
            * Adds the coordinates of another point to the coordinates of this point to create a new point.
            * @method add
            * @param {Point} point - The point to be added.
            * @return {Point} The new Point object.
            **/
            Point.prototype.add = function (toAdd, output) {
                if (typeof output === "undefined") { output = new Point(); }
                return output.setTo(this.x + toAdd.x, this.y + toAdd.y);
            };

            /**
            * Adds the given values to the coordinates of this point and returns it
            * @method addTo
            * @param {Number} x - The amount to add to the x value of the point
            * @param {Number} y - The amount to add to the x value of the point
            * @return {Point} This Point object.
            **/
            Point.prototype.addTo = function (x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                return this.setTo(this.x + x, this.y + y);
            };

            /**
            * Adds the given values to the coordinates of this point and returns it
            * @method addTo
            * @param {Number} x - The amount to add to the x value of the point
            * @param {Number} y - The amount to add to the x value of the point
            * @return {Point} This Point object.
            **/
            Point.prototype.subtractFrom = function (x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                return this.setTo(this.x - x, this.y - y);
            };

            /**
            * Inverts the x and y values of this point
            * @method invert
            * @return {Point} This Point object.
            **/
            Point.prototype.invert = function () {
                return this.setTo(this.y, this.x);
            };

            /**
            * Clamps this Point object to be between the given min and max
            * @method clamp
            * @param {number} The minimum value to clamp this Point to
            * @param {number} The maximum value to clamp this Point to
            * @return {Point} This Point object.
            **/
            Point.prototype.clamp = function (min, max) {
                this.clampX(min, max);
                this.clampY(min, max);
                return this;
            };

            /**
            * Clamps the x value of this Point object to be between the given min and max
            * @method clampX
            * @param {number} The minimum value to clamp this Point to
            * @param {number} The maximum value to clamp this Point to
            * @return {Point} This Point object.
            **/
            Point.prototype.clampX = function (min, max) {
                this.x = Math.max(Math.min(this.x, max), min);

                return this;
            };

            /**
            * Clamps the y value of this Point object to be between the given min and max
            * @method clampY
            * @param {number} The minimum value to clamp this Point to
            * @param {number} The maximum value to clamp this Point to
            * @return {Point} This Point object.
            **/
            Point.prototype.clampY = function (min, max) {
                this.x = Math.max(Math.min(this.x, max), min);
                this.y = Math.max(Math.min(this.y, max), min);

                return this;
            };

            /**
            * Creates a copy of this Point.
            * @method clone
            * @param {Point} output Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
            * @return {Point} The new Point object.
            **/
            Point.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Point(); }
                return output.setTo(this.x, this.y);
            };

            /**
            * Copies the point data from the source Point object into this Point object.
            * @method copyFrom
            * @param {Point} source - The point to copy from.
            * @return {Point} This Point object. Useful for chaining method calls.
            **/
            Point.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y);
            };

            /**
            * Copies the point data from this Point object to the given target Point object.
            * @method copyTo
            * @param {Point} target - The point to copy to.
            * @return {Point} The target Point object.
            **/
            Point.prototype.copyTo = function (target) {
                return target.setTo(this.x, this.y);
            };

            /**
            * Returns the distance from this Point object to the given Point object.
            * @method distanceFrom
            * @param {Point} target - The destination Point object.
            * @param {Boolean} round - Round the distance to the nearest integer (default false)
            * @return {Number} The distance between this Point object and the destination Point object.
            **/
            Point.prototype.distanceTo = function (target, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = this.x - target.x;
                var dy = this.y - target.y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            /**
            * Returns the distance from this Point object to the given Point object.
            * @method distanceToXY
            * @param {Number} x - The x value.
            * @param {Number} y - The y value.
            * @param {Boolean} round - Round the distance to the nearest integer (default false)
            * @return {Number} The distance between this Point object and the x/y values.
            **/
            Point.prototype.distanceToXY = function (x, y, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = this.x - x;
                var dy = this.y - y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            Point.distanceBetween = /**
            * Returns the distance between the two Point objects.
            * @method distanceBetween
            * @param {Point} pointA - The first Point object.
            * @param {Point} pointB - The second Point object.
            * @param {Boolean} round - Round the distance to the nearest integer (default false)
            * @return {Number} The distance between the two Point objects.
            **/
            function (pointA, pointB, round) {
                if (typeof round === "undefined") { round = false; }
                var dx = pointA.x - pointB.x;
                var dy = pointA.y - pointB.y;

                if (round === true) {
                    return Math.round(Math.sqrt(dx * dx + dy * dy));
                } else {
                    return Math.sqrt(dx * dx + dy * dy);
                }
            };

            Point.polar = /**
            * Creates a new point with cartesian coordinates from a pair of polar coordinates
            * @method polar
            * @param {Number} length - The length coordinate of the polar pair.
            * @param {Number} angle - The angle, in radians, of the polar pair.
            * @return {Point} The new Cartesian Point object.
            **/
            function (length, angle) {
                return new Point(length * Math.cos(angle * Math.PI / 180), length * Math.sin(angle * Math.PI / 180));
            };

            /**
            * Returns true if the distance between this point and a target point is greater than or equal a specified distance.
            * This avoids using a costly square root operation
            * @method distanceCompare
            * @param {Point} target - The Point object to use for comparison.
            * @param {Number} distance - The distance to use for comparison.
            * @return {Boolena} True if distance is >= specified distance.
            **/
            Point.prototype.distanceCompare = function (target, distance) {
                if (this.distanceTo(target) >= distance) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Determines whether this Point object and the given point object are equal. They are equal if they have the same x and y values.
            * @method equals
            * @param {Point} point - The point to compare against.
            * @return {Boolean} A value of true if the object is equal to this Point object; false if it is not equal.
            **/
            Point.prototype.equals = function (toCompare) {
                if (this.x === toCompare.x && this.y === toCompare.y) {
                    return true;
                } else {
                    return false;
                }
            };

            Point.interpolate = /**
            * Determines a point between two specified points. The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2.
            * The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter pt1). The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
            * @method interpolate
            * @param {Point} pointA - The first Point object.
            * @param {Point} pointB - The second Point object.
            * @param {Number} f - The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
            * @return {Point} The new interpolated Point object.
            **/
            function (pointA, pointB, f) {
                var xDiff = pointB.x - pointA.x;
                var yDiff = pointB.y - pointA.y;
                return new Point(pointB.x - xDiff * f, pointB.y - yDiff * f);
            };

            /**
            * Offsets the Point object by the specified amount. The value of dx is added to the original value of x to create the new x value.
            * The value of dy is added to the original value of y to create the new y value.
            * @method offset
            * @param {Number} dx - The amount by which to offset the horizontal coordinate, x.
            * @param {Number} dy - The amount by which to offset the vertical coordinate, y.
            * @return {Point} This Point object. Useful for chaining method calls.
            **/
            Point.prototype.offset = function (dx, dy) {
                this.x += dx;
                this.y += dy;

                return this;
            };

            /**
            * Sets the x and y values of this Point object to the given coordinates.
            * @method set
            * @param {Number} x - The horizontal position of this point.
            * @param {Number} y - The vertical position of this point.
            * @return {Point} This Point object. Useful for chaining method calls.
            **/
            Point.prototype.setTo = function (x, y) {
                this.x = x;
                this.y = y;

                return this;
            };

            /**
            * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
            * @method subtract
            * @param {Point} point - The point to be subtracted.
            * @param {Point} output Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
            * @return {Point} The new Point object.
            **/
            Point.prototype.subtract = function (point, output) {
                if (typeof output === "undefined") { output = new Point(); }
                return output.setTo(this.x - point.x, this.y - point.y);
            };

            Point.prototype.getCSS = function () {
                return this.x + 'px ' + this.y + 'px';
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            Point.prototype.toString = function () {
                return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';
            };
            return Point;
        })();
        Geom.Point = Point;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * An area defined by its position, as indicated by its top-left corner (x,y) and width and height
        *
        * @class Rectangle
        *
        */
        var Rectangle = (function () {
            /**
            * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified width and height parameters. If you call this function without parameters, a rectangle with x, y, width, and height properties set to 0 is created.
            * @class Rectangle
            * @constructor
            * @param {Number} x The x coordinate of the top-left corner of the rectangle.
            * @param {Number} y The y coordinate of the top-left corner of the rectangle.
            * @param {Number} width The width of the rectangle in pixels.
            * @param {Number} height The height of the rectangle in pixels.
            * @return {Rectangle} This rectangle object
            **/
            function Rectangle(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                /**
                * The x coordinate of the top-left corner of the rectangle
                * @property x
                * @type Number
                **/
                this.x = 0;
                /**
                * The y coordinate of the top-left corner of the rectangle
                * @property y
                * @type Number
                **/
                this.y = 0;
                /**
                * The width of the rectangle in pixels
                * @property width
                * @type Number
                **/
                this.width = 0;
                /**
                * The height of the rectangle in pixels
                * @property height
                * @type Number
                **/
                this.height = 0;
                this.setTo(x, y, width, height);
            }
            Rectangle.prototype.objType = function () {
                return "Rectangle";
            };


            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this.y + this.height;
                },
                set: /**
                * The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
                * @method bottom
                * @return {Number}
                **/
                function (value) {
                    if (value) {
                        if (value < this.y) {
                            this.height = 0;
                        } else {
                            this.height = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "center", {
                get: /**
                * Returns a Point containing the location of the center of the Rectangle, relative to the top left edge
                * @method center
                * @return {Point}
                **/
                function () {
                    var output = new Geom.Point();
                    return output.setTo(Math.round(this.width / 2), Math.round(this.height / 2));
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "bottomRight", {
                get: function () {
                    var output = new Geom.Point();
                    return output.setTo(this.right, this.bottom);
                },
                set: /**
                * Returns a Point containing the location of the Rectangle's bottom-right corner, determined by the values of the right and bottom properties.
                * @method bottomRight
                * @return {Point}
                **/
                function (value) {
                    if (value) {
                        this.right = value.x;
                        this.bottom = value.y;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this.x;
                },
                set: /**
                * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
                * @method left
                * @param {Number} value
                * @ return {number}
                **/
                function (value) {
                    if (value) {
                        var diff = this.x - value;

                        if (this.width + diff < 0) {
                            this.width = 0;

                            this.x = value;
                        } else {
                            this.width += diff;

                            this.x = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width;
                },
                set: /**
                * The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties. However it does affect the width property.
                * @method right
                * @return {Number}
                **/
                function (value) {
                    if (value) {
                        if (value < this.x) {
                            this.width = 0;
                        } else {
                            this.width = value - this.x;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "size", {
                get: /**
                * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
                * @method size
                * @param {Point} output Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
                * @return {Kiwi.Geom.Point} The size of the Rectangle object
                **/
                function () {
                    var output = new Geom.Point();
                    return output.setTo(this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "volume", {
                get: /**
                * The volume of the Rectangle object in pixels, derived from width * height
                * @method volume
                * @return {Number}
                **/
                function () {
                    return this.width * this.height;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Rectangle.prototype, "perimeter", {
                get: /**
                * The perimeter size of the Rectangle object in pixels. This is the sum of all 4 sides.
                * @method perimeter
                * @return {Number}
                **/
                function () {
                    return (this.width * 2) + (this.height * 2);
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this.y;
                },
                set: /**
                * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties. However it does affect the height property, whereas changing the y value does not affect the height property.
                * @method top
                * @return {Number}
                **/
                function (value) {
                    if (value) {
                        var diff = this.y - value;

                        if (this.height + diff < 0) {
                            this.height = 0;

                            this.y = value;
                        } else {
                            this.height += diff;

                            this.y = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Rectangle.prototype, "topLeft", {
                get: function () {
                    var output = new Geom.Point();
                    return output.setTo(this.x, this.y);
                },
                set: /**
                * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
                * @method topLeft
                * @param {Point} value
                * @return {Point}
                **/
                function (value) {
                    if (value) {
                        this.x = value.x;
                        this.y = value.y;
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
            * @method clone
            * @param {Rectangle} output Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
            * @return {Kiwi.Geom.Rectangle}
            **/
            Rectangle.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                return output.setTo(this.x, this.y, this.width, this.height);
            };

            /**
            * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
            * @method contains
            * @param {Number} x The x coordinate of the point to test.
            * @param {Number} y The y coordinate of the point to test.
            * @return {Boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
            **/
            Rectangle.prototype.contains = function (x, y) {
                if (x >= this.x && x <= this.right && y >= this.y && y <= this.bottom) {
                    return true;
                }

                return false;
            };

            /**
            * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
            * @method containsPoint
            * @param {Point} point The point object being checked. Can be Kiwi.Geom.Point or any object with .x and .y values.
            * @return {Boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
            **/
            Rectangle.prototype.containsPoint = function (point) {
                return this.contains(point.x, point.y);
            };

            /**
            * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object. A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
            * @method containsRect
            * @param {Rectangle} rect The rectangle object being checked.
            * @return {Boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
            **/
            Rectangle.prototype.containsRect = function (rect) {
                if (rect.volume > this.volume) {
                    return false;
                }

                if (rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom) {
                    return true;
                }

                return false;
            };

            /**
            * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
            * @method copyFrom
            * @param {Rectangle} rect The source rectangle object to copy from
            * @return {Rectangle} This rectangle object
            **/
            Rectangle.prototype.copyFrom = function (source) {
                return this.setTo(source.x, source.y, source.width, source.height);
            };

            /**
            * Copies all the rectangle data from this Rectangle object into the destination Rectangle object.
            * @method copyTo
            * @param {Rectangle} rect The destination rectangle object to copy in to
            * @return {Rectangle} The destination rectangle object
            **/
            Rectangle.prototype.copyTo = function (target) {
                return target.copyFrom(this);
            };

            /**
            * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object. This method compares the x, y, width, and height properties of an object against the same properties of this Rectangle object.
            * @method equals
            * @param {Rectangle} toCompare The rectangle to compare to this Rectangle object.
            * @return {Boolean} A value of true if the object has exactly the same values for the x, y, width, and height properties as this Rectangle object; otherwise false.
            **/
            Rectangle.prototype.equals = function (toCompare) {
                if (this.x === toCompare.x && this.y === toCompare.y && this.width === toCompare.width && this.height === toCompare.height) {
                    return true;
                }

                return false;
            };

            /**
            * Increases the size of the Rectangle object by the specified amounts, in pixels. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
            * @method inflate
            * @param {Number} dx The amount to be added to the left side of this Rectangle.
            * @param {Number} dy The amount to be added to the bottom side of this Rectangle.
            * @return {Rectangle} This Rectangle object.
            **/
            Rectangle.prototype.inflate = function (dx, dy) {
                if (!isNaN(dx) && !isNaN(dy)) {
                    this.x -= dx;
                    this.width += 2 * dx;

                    this.y -= dy;
                    this.height += 2 * dy;
                }

                return this;
            };

            /**
            * Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
            * @method inflatePoint
            * @param {Point} point The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
            * @return {Rectangle} This Rectangle object.
            **/
            Rectangle.prototype.inflatePoint = function (point) {
                return this.inflate(point.x, point.y);
            };

            /**
            * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
            * @method intersection
            * @param {Rectangle} toIntersect The Rectangle object to compare against to see if it intersects with this Rectangle object.
            * @param {Rectangle} output Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
            * @return {Rectangle} A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
            **/
            Rectangle.prototype.intersection = function (toIntersect, output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                if (this.intersects(toIntersect) === true) {
                    output.x = Math.max(toIntersect.x, this.x);
                    output.y = Math.max(toIntersect.y, this.y);
                    output.width = Math.min(toIntersect.right, this.right) - output.x;
                    output.height = Math.min(toIntersect.bottom, this.bottom) - output.y;
                }

                return output;
            };

            /**
            * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. This method checks the x, y, width, and height properties of the specified Rectangle object to see if it intersects with this Rectangle object.
            * @method intersects
            * @param {Rectangle} toIntersect The Rectangle object to compare against to see if it intersects with this Rectangle object.
            * @return {Boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
            **/
            Rectangle.prototype.intersects = function (toIntersect) {
                if (toIntersect.x > this.right - 1) {
                    return false;
                }

                if (toIntersect.right - 1 < this.x) {
                    return false;
                }

                if (toIntersect.bottom - 1 < this.y) {
                    return false;
                }

                if (toIntersect.y > this.bottom - 1) {
                    return false;
                }

                return true;
            };

            /**
            * Checks for overlaps between this Rectangle and the given Rectangle. Returns an object with boolean values for each check.
            * @method overlap
            * @return {Object} An object containing the overlapping details between the two Rectangles
            * @todo Move to an IntersectResult? Do not want to be generating all of these values each time this is called
            **/
            Rectangle.prototype.overlap = function (rect) {
                var result = { top: false, bottom: false, left: false, right: false, contains: false, contained: false };
                var interRect = this.intersection(rect);

                if (interRect.isEmpty)
                    return result;
                if (this.containsRect(rect))
                    result.contains = true;
                if (rect.containsRect(this))
                    result.contained = true;
                if (this.top < rect.top)
                    result.top = true;
                if (this.bottom > rect.bottom)
                    result.bottom = true;
                if (this.left < rect.left)
                    result.left = true;
                if (this.right > rect.right)
                    result.right = true;

                return result;
            };

            /**
            * Determines whether or not this Rectangle object is empty.
            * @method isEmpty
            * @return {Boolean} A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
            **/
            Rectangle.prototype.isEmpty = function () {
                if (this.width < 1 || this.height < 1) {
                    return true;
                }

                return false;
            };

            /**
            * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
            * @method offset
            * @param {Number} dx Moves the x value of the Rectangle object by this amount.
            * @param {Number} dy Moves the y value of the Rectangle object by this amount.
            * @return {Rectangle} This Rectangle object.
            **/
            Rectangle.prototype.offset = function (dx, dy) {
                if (!isNaN(dx) && !isNaN(dy)) {
                    this.x += dx;
                    this.y += dy;
                }

                return this;
            };

            /**
            * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
            * @method offsetPoint
            * @param {Point} point A Point object to use to offset this Rectangle object.
            * @return {Rectangle} This Rectangle object.
            **/
            Rectangle.prototype.offsetPoint = function (point) {
                return this.offset(point.x, point.y);
            };

            /**
            * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
            * @method setEmpty
            * @return {Rectangle} This rectangle object
            **/
            Rectangle.prototype.setEmpty = function () {
                return this.setTo(0, 0, 0, 0);
            };

            /**
            * Sets the members of Rectangle to the specified values.
            * @method setTo
            * @param {Number} x The x coordinate of the top-left corner of the rectangle.
            * @param {Number} y The y coordinate of the top-left corner of the rectangle.
            * @param {Number} width The width of the rectangle in pixels.
            * @param {Number} height The height of the rectangle in pixels.
            * @return {Rectangle} This rectangle object
            **/
            Rectangle.prototype.setTo = function (x, y, width, height) {
                if (!isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height)) {
                    this.x = x;
                    this.y = y;

                    if (width >= 0) {
                        this.width = width;
                    }

                    if (height >= 0) {
                        this.height = height;
                    }
                }

                return this;
            };

            /**
            * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
            * @method union
            * @param {Rectangle} toUnion A Rectangle object to add to this Rectangle object.
            * @param {Rectangle} output Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
            * @return {Rectangle} A Rectangle object that is the union of the two rectangles.
            **/
            Rectangle.prototype.union = function (toUnion, output) {
                if (typeof output === "undefined") { output = new Rectangle(); }
                return output.setTo(Math.min(toUnion.x, this.x), Math.min(toUnion.y, this.y), Math.max(toUnion.right, this.right), Math.max(toUnion.bottom, this.bottom));
            };

            Rectangle.prototype.scale = function (x, y, translation) {
                var trans = new Kiwi.Geom.Transform();
                trans.scaleX = x;
                trans.scaleY = y;
                trans.x = translation.x;
                trans.y = translation.y;

                var tl = this.topLeft;
                trans.transformPoint(tl);
                this.topLeft = tl;

                this.width *= x;
                this.height *= y;

                return this;
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            Rectangle.prototype.toString = function () {
                return "[{Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " isEmpty=" + this.isEmpty() + ")}]";
            };
            return Rectangle;
        })();
        Geom.Rectangle = Rectangle;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * Represents position, scale, rotation and rotationPoint of an Entity.
        * - Values can be transformed with a 3x3 affine transformation matrix, which each transform is assigned.
        * - A tranform can be assigned a parent, which may in turn have it's own parent, thereby creating a tranform inheritence heirarchy
        * - A concatenated transformation matrix, representing the combined matrices of the transform and its ancestors.
        *
        * @class Transform
        *
        */
        var Transform = (function () {
            /**
            * Constructor
            * @param {Number} x. X position of the transform.
            * @param {Number} y. Y position of the transform.
            * @param {Number} scaleX. X scaling of the transform.
            * @param {Number} scaleY. Y scaling of the transform.
            * @param {Number} rotation. Rotation of the transform in radians.
            * @param {Number} rotX. rotationPoint offset on X axis.
            * @param {Number} rotY. rotationPoint offset on Y axis.
            * @return {Kiwi.Geom.Transform} This object.
            */
            function Transform(x, y, scaleX, scaleY, rotation, rotPointX, rotPointY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof scaleX === "undefined") { scaleX = 1; }
                if (typeof scaleY === "undefined") { scaleY = 1; }
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof rotPointX === "undefined") { rotPointX = 0; }
                if (typeof rotPointY === "undefined") { rotPointY = 0; }
                /**
                * X position of the transform
                * @property _x
                * @type Number
                * @private
                **/
                this._x = 0;
                /**
                * Y position of the transform
                * @property _y
                * @type Number
                * @private
                **/
                this._y = 0;
                /**
                * X scaleof the transform
                * @property _scaleX
                * @type Number
                * @private
                **/
                this._scaleX = 1;
                /**
                * Y scale of the transform
                * @property _scaleY
                * @type Number
                * @private
                **/
                this._scaleY = 1;
                /**
                * Rotation of the transform in radians.
                * @property _rotation
                * @type Number
                * @private
                **/
                this._rotation = 0;
                /**
                * Rotation offset on X axis.
                * @property _rotPointX
                * @type Number
                * @private
                **/
                this._rotPointX = 0;
                /**
                * Rotation offset on Y axis.
                * @property _rotY
                * @type Number
                * @private
                **/
                this._rotPointY = 0;
                this.setTransform(x, y, scaleX, scaleY, rotation, rotPointX, rotPointY);

                this._matrix = new Geom.Matrix();

                this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

                this._cachedConcatenatedMatrix = this.getConcatenatedMatrix();
            }
            Transform.prototype.objType = function () {
                return "Transform";
            };


            Object.defineProperty(Transform.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: /**
                * Return the X value of the transform.
                * @method x
                * @return {Number} The X value of the transform.
                */
                function (value) {
                    this._x = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: /**
                * Return the Y value of the transform.
                * @method y
                * @return {Number} The Y value of the transform.
                */
                function (value) {
                    this._y = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "scaleX", {
                get: function () {
                    return this._scaleX;
                },
                set: /**
                * Return the X scale value of the transform.
                * @method scaleX
                * @return {Number} The X value of the transform.
                */
                function (value) {
                    this._scaleX = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "scaleY", {
                get: function () {
                    return this._scaleY;
                },
                set: /**
                * Return the Y scale value of the transform.
                * @method scaleY
                * @return {Number} The Y value of the transform.
                */
                function (value) {
                    this._scaleY = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "rotation", {
                get: function () {
                    return this._rotation;
                },
                set: /**
                * Return the rotation value of the transform in radians.
                * @method rotation
                * @return {Number} The rotation value of the transform.
                */
                function (value) {
                    this._rotation = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "rotPointX", {
                get: function () {
                    return this._rotPointX;
                },
                set: /**
                * Return the Rotation value from the x axis.
                * @method rotPointX
                * @return {Number} The registration value from the x axis.
                */
                function (value) {
                    this._rotPointX = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "rotPointY", {
                get: function () {
                    return this._rotPointY;
                },
                set: /**
                * Return the rotation value from the y axis.
                * @method rotY
                * @return {Number} The rotation value from the y axis.
                */
                function (value) {
                    this._rotPointY = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Transform.prototype, "matrix", {
                get: /**
                * Return the Matrix being used by this Transform
                * @method matrix
                * @return {Kiwi.Geom.Matrix} The Matrix being used by this Transform
                */
                function () {
                    return this._matrix;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Transform.prototype, "worldX", {
                get: /**
                * Return the x of this transform translated to world space.
                * @method worldX
                * @return {Number} x coordinate in world space
                */
                function () {
                    return this.getConcatenatedMatrix().tx;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Transform.prototype, "worldY", {
                get: /**
                * Return the y of this transform translated to world space.
                * @method worldY
                * @return {Number} y coordinate in world space
                */
                function () {
                    return this.getConcatenatedMatrix().ty;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Transform.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: /**
                * Return the parent Transform, if any.
                * @method parent
                * @return {Kiwi.Geom.Transform} The parent Transform, or null.
                */
                function (value) {
                    if (!this.checkAncestor(value)) {
                        this._parent = value;
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Set the X and Y values of the transform.
            * @method setPosition
            * @param {Number} x.
            * @param {Number} y.
            * @return {Kiwi.Geom.Transform} This object.
            */
            Transform.prototype.setPosition = function (x, y) {
                this._x = x;
                this._y = y;

                //this.owner.dirty = true;
                return this;
            };

            /**
            * Set the X and Y values of the transform from a point.
            * @method setPositionPoint
            * @param {Kiwi.Geom.Point} point.
            * @return {Kiwi.Geom.Transform} This object.
            */
            Transform.prototype.setPositionFromPoint = function (point) {
                this._x = point.x;
                this._y = point.y;

                //this.owner.dirty = true;
                return this;
            };

            /**
            * Translate the X and Y value of the transform by point components.
            * @method translatePositionFromPoint
            * @param {Kiwi.Geom.Point} point.
            * @return {Kiwi.Geom.Transform} This object.
            */
            Transform.prototype.translatePositionFromPoint = function (point) {
                this._x += point.x;
                this._y += point.y;

                //this.owner.dirty = true;
                return this;
            };

            /**
            * Return a Point representing the X and Y values of the transform. If none is given a new Point objected will be created.
            * @method getPostionPoint
            * @return {Kiwi.Geom.Point} A point representing the X and Y values of the transform.
            */
            Transform.prototype.getPositionPoint = function (output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                return output.setTo(this._x, this._y);
            };

            Object.defineProperty(Transform.prototype, "scale", {
                set: /**
                * Set the X and Y scale value of the transform.
                * @method scale
                * @param {Number} scaleX.
                * @param {Number} scaleY.
                * @return {Kiwi.Geom.Transform} This object.
                */
                function (value) {
                    this._scaleX = value;
                    this._scaleY = value;
                    //this.owner.dirty = true;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Set the core properties of the transform
            * @method setTransform
            * @param {Number} x. X position of the transform.
            * @param {Number} y. Y position of the transform.
            * @param {Number} scaleX. X scaling of the transform.
            * @param {Number} scaleY. Y scaling of the transform.
            * @param {Number} rotation. Rotation of the transform in radians.
            * @param {Number} rotX. Rotation offset on X axis.
            * @param {Number} rotY. Rotation offset on Y axis.
            * @return {Kiwi.Geom.Transform} This object.
            */
            Transform.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, rotPointX, rotPointY) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof scaleX === "undefined") { scaleX = 1; }
                if (typeof scaleY === "undefined") { scaleY = 1; }
                if (typeof rotation === "undefined") { rotation = 0; }
                if (typeof rotPointX === "undefined") { rotPointX = 0; }
                if (typeof rotPointY === "undefined") { rotPointY = 0; }
                this._x = x;
                this._y = y;
                this._scaleX = scaleX;
                this._scaleY = scaleY;
                this._rotation = rotation;
                this._rotPointX = rotPointX;
                this._rotPointY = rotPointY;

                //if (this.owner)
                //{
                //    this.owner.dirty = true;
                //}
                return this;
            };

            /**
            * Return the parent matrix of the transform. If there is no parent then null is returned.
            * @method getParentMatrix
            * @return {Kiwi.Geom.Matrix} The parent transform matrix.
            */
            Transform.prototype.getParentMatrix = function () {
                if (this._parent) {
                    return this._parent.getConcatenatedMatrix();
                }

                return null;
            };

            /**
            * Return the transformation matrix that concatenates this transform with all ancestor transforms.
            * If there is no parent then this will return a matrix the same as this transforms matrix.
            * @method getConcatenatedMatrix
            * @return {Kiwi.Geom.Matrix} The concatenated matrix.
            */
            Transform.prototype.getConcatenatedMatrix = function () {
                this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

                var parentMatrix = this.getParentMatrix();

                if (parentMatrix) {
                    var matrix = this._matrix.clone();
                    matrix.prependMatrix(parentMatrix);
                    this._cachedConcatenatedMatrix.copyFrom(matrix);
                    return matrix;
                }

                return this._matrix;
            };

            /**
            * Return the x of this transform translated to a camera space
            * @method getCameraX
            * @param {Object} the camera
            * @return (Number) x coordinate in the camera space
            
            public getCameraX ( camera:Camera ):number
            {
            var mat = this.getConcatenatedMatrix();
            mat.prependMatrix(camera.transform.getConcatenatedMatrix());
            return mat.tx;
            }
            
            /**
            * Return the y of this transform translated to a camera space
            * @method getCameraY
            * @param {Object} the camera
            * @return (Number) y coordinate in the camera space
            
            public getCameraY ( camera:Camera ):number
            {
            var mat = this.getConcatenatedMatrix();
            mat.prependMatrix(camera.transform.getConcatenatedMatrix());
            return mat.ty;
            }
            */
            /**
            *
            * @method transformPoint
            * @param {Kiwi.Geom.Point} point
            * @return {Kiwi.Geom.Point}
            **/
            Transform.prototype.transformPoint = function (point) {
                var mat = this.getConcatenatedMatrix();

                return mat.transformPoint(point);
            };

            /**
            * Copy another transforms data to this transform. A clone of the source matrix is created for the matrix property.
            * @method copyFrom
            * @param {Kiwi.Geom.Transform} transform. The tranform to be copied from.
            * @return {Kiwi.Geom.Transform} This object.
            */
            Transform.prototype.copyFrom = function (source) {
                this.setTransform(source.x, source.y, source.scaleX, source.scaleY, source.rotation, source.rotPointX, source.rotPointY);

                this.parent = source.parent;

                //this.owner = source.owner;
                this._matrix = source.matrix.clone();

                return this;
            };

            /**
            * Copy this transforms data to the destination Transform. A clone of this transforms matrix is created in the destination Transform Matrix.
            * @method copyTo
            * @param {Kiwi.Geom.Transform} transform. The tranform to copy to.
            * @return {Kiwi.Geom.Transform} This object.
            */
            Transform.prototype.copyTo = function (destination) {
                destination.copyFrom(this);

                return this;
            };

            /**
            * Return a clone of this transform.
            * @method clone
            * @param {Kiwi.Geom.Transform} A Transform to copy the clone in to. If none is given a new Transform object will be made.
            * @return {Kiwi.Geom.Transform} A clone of this object.
            */
            Transform.prototype.clone = function (output) {
                if (typeof output === "undefined") { output = new Transform(); }
                output.copyFrom(this);

                return output;
            };

            /**
            * Recursively check that a transform does not appear as its own ancestor
            * @method checkAncestor
            * @param {Kiwi.Geom.Transform} The Transform to check.
            * @return {Boolean} Returns true if the given transform is the same as this or an ancestor, otherwise false.
            */
            Transform.prototype.checkAncestor = function (transform) {
                /*if (transform === this)
                {
                return true
                }
                
                if (transform.parent !== null)
                {
                return (this.checkAncestor(transform._parent))
                }*/
                return false;
            };

            Object.defineProperty(Transform.prototype, "toString", {
                get: /**
                * Return a string represention of this object.
                * @method toString
                * @return (string) A string represention of this object.
                */
                function () {
                    return "[{Transform (x=" + this._x + " y=" + this._y + " scaleX=" + this._scaleX + " scaleY=" + this._scaleY + " rotation=" + this._rotation + " regX=" + this._rotPointX + " regY=" + this.rotPointY + " matrix=" + this._matrix + ")}]";
                },
                enumerable: true,
                configurable: true
            });
            return Transform;
        })();
        Geom.Transform = Transform;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Geom
    * @module Kiwi
    * @submodule Geom
    */
    (function (Geom) {
        /**
        * A two dimensional vector object for storing and manipulating x and y vector components.
        *
        * @class Vector2
        *
        */
        var Vector2 = (function () {
            /**
            * Creates a new Vector2 Object
            * @class Vector2
            * @constructor
            * @param {Number} x The x component of the vector.
            * @param {Number} y The y component of the vector.
            **/
            function Vector2(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.setTo(x, y);
            }
            Vector2.prototype.objType = function () {
                return "Vector2";
            };

            Vector2.fromAngle = /**
            * Generate a Vector2 from an angle
            * @method fromAngle
            * @param {Number} angle. The angle to generate the Vector2 from.
            * @static
            * @return {Vector2} A new Vector2.
            */
            function (angle) {
                return new Vector2(Math.cos(angle), Math.sin(angle));
            };

            Vector2.randomRadius = /**
            * Generate a random Vector2 within a given radius.
            * @method randomRadius
            * @param {Number} radius. The size of the radius to use.
            * @static
            * @return {Vector2} A new Vector2.
            */
            function (radius) {
                return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(radius);
            };

            Vector2.fromPoint = /**
            * Generate a Vector2 from a point.
            * @method fromPoint
            * @param {Point} point.
            * @static
            * @return {Vector2} A new Vector2.
            */
            function (point) {
                return new Vector2(point.x, point.y);
            };

            /**
            * Add each component of another Vector2 to this vectors components.
            * @method add
            * @param {Vector2} Vector2 to add.
            * @return {Vector2} A new Vector2 containing the product.
            */
            Vector2.prototype.add = function (vector2) {
                return new Vector2(this.x + vector2.x, this.y + vector2.y);
            };

            /**
            * Add only the x component of another Vector2 to this vector.
            * @method addX
            * @param {Vector2} Vector2 to add.
            * @return {Vector2} A new Vector2 containing the result.
            */
            Vector2.prototype.addX = function (vector2) {
                return new Vector2(this.x + vector2.x, this.y);
            };

            /**
            * Add only the y component of another Vector2 to this vector.
            * @method addY
            * @param {Vector2} Vector2 to add.
            * @return {Vector2} A new Vector2 containing the result.
            */
            Vector2.prototype.addY = function (vector2) {
                return new Vector2(this.x, this.y + vector2.y);
            };

            /**
            * Subtract each component of another Vector2 from this vectors components.
            * @method subtract
            * @param {Vector2} Vector2 to subtract.
            * @return {Vector2} A new Vector2 containing the result.
            */
            Vector2.prototype.subtract = function (vector2) {
                return new Kiwi.Geom.Vector2(this.x - vector2.x, this.y - vector2.y);
            };

            /**
            * Multiply each component of another Vector2 with this vectors components.
            * @method multiply
            * @param {Vector2} Vector2 to multiply.
            * @return {Vector2} A new Vector2 containing the result.
            */
            Vector2.prototype.multiply = function (vector2) {
                return new Kiwi.Geom.Vector2(this.x * vector2.x, this.y * vector2.y);
            };

            /**
            * Multiply each component of this vector with a scalar number.
            * @method multiplyScalar
            * @param {Number} Scalar to multiply.
            * @return {Vector2} A new Vector2 containing the result.
            */
            Vector2.prototype.multiplyScalar = function (scalar) {
                return new Kiwi.Geom.Vector2(this.x * scalar, this.y * scalar);
            };

            /**
            * Calculate the dot product if a Vector2 with this Vector2.
            * @method dot
            * @param {Vector2} Vector2 to dot with this Vector2.
            * @return {Number} Result of dot product.
            */
            Vector2.prototype.dot = function (vector2) {
                return this.x * vector2.x + this.y * vector2.y;
            };

            /**
            * Calculate the square length of this Vector2 (Distance from the origin).
            * @method lenSqr
            * @return {Number} The square length.
            */
            Vector2.prototype.lenSqr = function () {
                return this.x * this.x + this.y * this.y;
            };

            /**
            * Calculate the length of this Vector2 (Distance from the origin).
            * @method len
            * @return {Number} The length.
            */
            Vector2.prototype.len = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };

            /**
            * Calculate a normalised unit Vector2 from this Vector2.
            * @method unit
            * @return {Vector2} a new Unit Length Vector2.
            */
            Vector2.prototype.unit = function () {
                var invLen = 1.0 / this.len();
                return this.multiplyScalar(invLen);
            };

            /**
            * Reduce each component of the Vector to the closest lower round value.
            * @method floor
            * @return {Vector2} a rounded down Vector2.
            */
            Vector2.prototype.floor = function () {
                return new Vector2(Math.floor(this.x), Math.floor(this.y));
            };

            /**
            * Increase each component of the Vector to the closest upper round value.
            * @method ceil
            * @return {Vector2} a rounded up Vector2.
            */
            Vector2.prototype.ceil = function () {
                return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
            };

            /**
            * Round each component of the Vector to the closest round value.
            * @method round
            * @return {Vector2} a rounded Vector2.
            */
            Vector2.prototype.round = function () {
                return new Vector2(Math.round(this.x), Math.round(this.y));
            };

            /**
            * Clamp the vector between a maximum and minimum Vector2 range component-wise.
            * @method clamp
            * @param {Vector2} min. Minimum values for Vector2.
            * @param {Vector2} max. Maximum values for Vector2.
            * @return {Vector2} a clamped Vector2.
            */
            Vector2.prototype.clamp = function (min, max) {
                return new Vector2(Math.max(Math.min(this.x, max.x), min.x), Math.max(Math.min(this.y, max.y), min.y));
            };

            /**
            * Calculate a Vector2 perpendicular to this Vector2.
            * @method perp
            * @return {Vector2} the perpendicular Vector2.
            */
            Vector2.prototype.perp = function () {
                return new Vector2(-this.y, this.x);
            };

            /**
            * Calculate a Vector2 opposite to this Vector2.
            * @method neg
            * @return {Vector2} the opposite Vector2.
            */
            Vector2.prototype.neg = function () {
                return new Vector2(-this.x, -this.y);
            };

            /**
            * Check if two Vector2s from equal components.
            * @method equal
            * @param {Vector2} vector2. Vector2 to check against.
            * @return {Boolean} returns true if equal.
            */
            Vector2.prototype.equal = function (vector2) {
                return this.x === vector2.x && this.y === vector2.y;
            };

            /**
            * Get a Point object with the same components as this Vector2.
            * @method point
            * @return {Point} A new Point.
            */
            Vector2.prototype.point = function () {
                return new Geom.Point(this.x, this.y);
            };

            /**
            * Set both components to zero.
            * @method clear
            * @return {Vector2} This object.
            */
            Vector2.prototype.clear = function () {
                this.x = 0;
                this.y = 0;
                return this;
            };

            /**
            * Get a clone of this Vector2.
            * @method clone
            * @param {Vector2} vector2. A vector2 that will be cloned to. Optional.
            * @return {Vector2} Either a new cloned Vector2 or the output vector with cloned components.
            */
            Vector2.prototype.clone = function (output) {
                if (output) {
                    return output.setTo(this.x, this.y);
                } else {
                    return new Vector2(this.x, this.y);
                }
            };

            /**
            * Copy components from another Vector2.
            * @method copyFrom
            * @param {Vector2} source. A Vector2 to copy from.
            * @return {Vector2} This object.
            */
            Vector2.prototype.copyFrom = function (source) {
                this.x = source.x;
                this.y = source.y;
                return this;
            };

            /**
            * Copy components to another Vector2.
            * @method copyTo
            * @param {Vector2} source. A Vector2 to copy to.
            * @return {Vector2} The supplied Vector2.
            */
            Vector2.prototype.copyTo = function (target) {
                target.x = this.x;
                target.y = this.y;
                return target;
            };

            /**
            * Set components on this Vector2.
            * @method setTo
            * @param {Number} x. x component to set.
            * @param {Number} y. y component to set.
            * @return {Vector2} This object.
            */
            Vector2.prototype.setTo = function (x, y) {
                this.x = x;
                this.y = y;
                return this;
            };

            /**
            * Get a string representation of this object.
            * @method toString
            * @return {string} This object as a string.
            */
            Vector2.prototype.toString = function () {
                return '[{Vector2 (x=' + this.x + ' y=' + this.y + ')}]';
            };
            return Vector2;
        })();
        Geom.Vector2 = Vector2;
    })(Kiwi.Geom || (Kiwi.Geom = {}));
    var Geom = Kiwi.Geom;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var HUDDisplay = (function () {
            /**
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @param {string} name
            **/
            function HUDDisplay(game, name) {
                this._game = game;
                this.name = name;
                this.container = document.createElement("div");
                this.container.id = "HUD-layer-" + game.rnd.uuid();
                this.container.style.width = "100%";
                this.container.style.height = "100%";
                this.container.style.position = "absolute";

                //this.container.innerText = this.container.id;
                this._widgets = new Array();
            }
            /**
            * Adds a widget to the HUDDisplay.
            *
            * @method addWidget
            * @param {Kiwi.HUD.HUDWidget} widget - The widget to be added to the Display
            **/
            HUDDisplay.prototype.addWidget = function (widget) {
                widget.container.id = 'HUD-widget-' + this._game.rnd.uuid();
                this._widgets.push(widget);
                this.container.appendChild(widget.container);
            };

            /*
            * Removes a singular widget from the display
            *
            * @method removeWidget
            * @param {Kiwi.HUD.HUDWidget} widget - The widget to be removed.
            * @return {boolean}
            */
            HUDDisplay.prototype.removeWidget = function (widget) {
                if (this.destroyWidget(widget)) {
                    var i = this._widgets.indexOf(widget);

                    if (i !== -1) {
                        this._widgets.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };

            /*
            * Removes all of the widgets on this display.
            *
            * @method removeAllWidgets
            */
            HUDDisplay.prototype.removeAllWidgets = function () {
                for (var i = 0; i < this._widgets.length; i++) {
                    this.destroyWidget(this._widgets[i]);
                }

                this._widgets = [];
            };

            /**
            * Removes a widget from being on the HUDDisplay.
            *
            * @method destroyWidget
            * @param {Kiwi.HUD.HUDWidget} widget - The Widget to be removed.
            * @returns {boolean}
            **/
            HUDDisplay.prototype.destroyWidget = function (widget) {
                if (this.container.contains(widget.container)) {
                    this.container.removeChild(widget.container);
                    return true;
                }
                return false;
            };

            /**
            * Update loop
            **/
            HUDDisplay.prototype.update = function () {
                for (var i = 0; i < this._widgets.length; i++) {
                    this._widgets[i].update();
                }
            };

            /**
            * Render
            **/
            HUDDisplay.prototype.render = function () {
            };
            return HUDDisplay;
        })();
        HUD.HUDDisplay = HUDDisplay;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        var HUDManager = (function () {
            /**
            *
            * @constructor
            * @param {Kiwi.Game} game
            **/
            function HUDManager(game) {
                this._game = game;
            }
            /**
            * The DOM is ready, so if the current state is pending we can boot up the HUD now.
            * @method boot
            **/
            HUDManager.prototype.boot = function () {
                this._hudContainer = document.createElement("div");
                this._hudContainer.id = "HUDContainer";
                this._hudContainer.style.position = "absolute";
                this._hudContainer.style.width = "100%";
                this._hudContainer.style.height = "100%";

                this._game.stage.container.appendChild(this._hudContainer);

                this._huds = new Array();

                this._defaultHUD = this.createHUD("defaultHUD");

                this._currentHUD = this._defaultHUD;

                this.setHUD(this._defaultHUD);
            };

            /**
            * Returns the type of object this is.
            * @method objType
            **/
            HUDManager.prototype.objType = function () {
                return "HUDManager";
            };


            Object.defineProperty(HUDManager.prototype, "defaultHUD", {
                get: function () {
                    return this._defaultHUD;
                },
                set: /**
                * Allows you get the defaultHUD that is being used, or set the defaultHUD.
                *
                * @method defaultHUD
                * @param {Kiwi.HUD.HUDDisplay} val - The new defaultHUD.
                * @return {Kiwi.HUD.HUDDisplay}
                **/
                function (value) {
                    if (this._currentHUD === this._defaultHUD) {
                        this._currentHUD = value;
                        this.setHUD(this._currentHUD);
                    }
                    this._defaultHUD = value;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Swaps to the current displayed HUD.
            *
            * @method setHUD
            * @param {Kiwi.HUD.HUDDisplay} hud - Reference to the HUD you want to display.
            **/
            HUDManager.prototype.setHUD = function (hud) {
                this.hideHUD();
                this._currentHUD = hud;
                this.showHUD();
            };

            /**
            * Displays the currently active HUD.
            * @method showHUD
            **/
            HUDManager.prototype.showHUD = function () {
                this._currentHUD.container.style.display = 'block';
            };

            /**
            * Hides the active HUDDisplay
            * @method hideHUD
            **/
            HUDManager.prototype.hideHUD = function () {
                this._currentHUD.container.style.display = 'none';
            };

            /**
            * Creates a new HUDDisplay.
            *
            * @method createHUD
            * @param {string} name - Name of the new HUD.
            * @return {Kiwi.HUD.HUDDisplay}
            **/
            HUDManager.prototype.createHUD = function (name) {
                var hud = new Kiwi.HUD.HUDDisplay(this._game, name);
                hud.container.style.display = 'none';
                this._huds.push(hud);
                this._hudContainer.appendChild(hud.container);
                return hud;
            };

            /**
            * Removes a HUD from the game.
            *
            * @method removeHUD
            * @param {Kiwi.HUD.HUDDisplay} hud - The hud you want to remove.
            * @returns {boolean}
            **/
            HUDManager.prototype.removeHUD = function (hud) {
                if (hud === this._defaultHUD) {
                    return false;
                }

                if (this._currentHUD === hud) {
                    this.setHUD(this._defaultHUD);
                }

                this.destroyHUD(hud);

                var i = this._huds.indexOf(hud);

                if (i !== -1) {
                    this._huds.splice(i, 1);
                }

                return true;
            };

            /**
            * Removes the HUD from the screen
            *
            * @method destroyHUD
            * @param {Kiwi.HUD.HUDDisplay} hud - The hud to be removed
            **/
            HUDManager.prototype.destroyHUD = function (hud) {
                if (this._hudContainer.contains(hud.container)) {
                    this._hudContainer.removeChild(hud.container);
                }

                hud = null;
            };

            /**
            * Game loop
            **/
            HUDManager.prototype.update = function () {
                for (var i = 0; i < this._huds.length; i++) {
                    this._huds[i].update();
                }
            };

            /**
            * Render
            **/
            HUDManager.prototype.render = function () {
                this._currentHUD.render();
            };
            return HUDManager;
        })();
        HUD.HUDManager = HUDManager;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    ///<reference path="../kiwi.ts" />
    /*
    *	Kiwi - HUD - HUDWidget
    *
    *	@desc		The HUDWidget is an abstract class containing all of the fundamentals that every HUDWidget will need to have.
    *
    *	@version	1.0 - 26th July 2013
    *
    *  @author     Ross Kettle
    *	@author 	Ben Harding
    *
    *	@url		http://www.kiwijs.org
    *
    */
    (function (HUD) {
        var HUDWidget = (function () {
            /**
            *
            * @constructor
            * @param {string} name - Name of the type of HUDWidget.
            * @param {number} x
            * @param {number} y
            * @return {Kiwi.HUD.HUDWidget}
            **/
            function HUDWidget(name, x, y) {
                this.name = name;
                this.container = document.createElement("div");
                this.container.style.position = "absolute";
                this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, this);
                this.onCoordsUpdate = new Kiwi.Signal();
                this.x = x;
                this.y = y;
            }
            Object.defineProperty(HUDWidget.prototype, "x", {
                get: /*
                * Get the x coordinate of the widget
                * @type number
                */
                function () {
                    return this._x;
                },
                set: /*
                * Set the x coordinate of the widget
                * @type number
                */
                function (value) {
                    this._x = value;
                    this.container.style.left = this.x + "px";
                    this.onCoordsUpdate.dispatch(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(HUDWidget.prototype, "y", {
                get: /*
                * Get the y coordinate of the widget
                * @type number
                */
                function () {
                    return this._y;
                },
                set: /*
                * Set the y coordinate of the widget
                * @type number
                */
                function (value) {
                    this._y = value;
                    this.container.style.top = this.y + "px";
                    this.onCoordsUpdate.dispatch(this.x, this.y);
                },
                enumerable: true,
                configurable: true
            });


            /**
            * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
            * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
            *
            * Can be used by itself but maybe more useful if you customise it to suit your own needs.
            *
            * @method setTemplate
            * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
            * @param {string} element - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
            **/
            HUDWidget.prototype.setTemplate = function (main, element) {
                var paramsArr = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    paramsArr[_i] = arguments[_i + 2];
                }
                var containerElement = document.getElementById(main);
                if (containerElement === undefined) {
                    return;
                }

                if (element === undefined) {
                    var fieldElement = containerElement;
                } else {
                    var fieldElement = document.getElementById(element);
                    if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                        return;
                    }
                }

                this.tempElement = fieldElement;
                this._tempContainer = containerElement;
                this._tempParent = containerElement.parentElement;
                this._tempParent.removeChild(containerElement);
                this.container.appendChild(containerElement);
            };

            /**
            * Used to remove any the template HTML from this HUDWidget.
            *
            * @method removeTemplate
            **/
            HUDWidget.prototype.removeTemplate = function () {
                if (this.tempElement !== undefined) {
                    this.container.removeChild(this._tempContainer);
                    this._tempParent.appendChild(this._tempContainer);
                    this.tempElement = null;
                    this._tempParent = null;
                    this._tempContainer = null;
                }
            };

            /**
            * Give the container element a class so that you can make it look beautiful using CSS.
            *
            * @method setStyle
            * @param {String} cssClass
            **/
            HUDWidget.prototype.setStyle = function (cssClass) {
                this.container.className = cssClass;
            };

            /**
            *
            * @method update
            **/
            HUDWidget.prototype.update = function () {
                this.components.update();
            };
            return HUDWidget;
        })();
        HUD.HUDWidget = HUDWidget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /*
        *	Kiwi - HUD - Textfield
        *
        *	@desc		Used for the display of simple text.
        *
        *	@version	1.0 - 26th July 2013
        *
        *  @author     Ross Kettle
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Widget) {
            // Class
            var TextField = (function (_super) {
                __extends(TextField, _super);
                /**
                *
                * @constructor
                * @param {string} text
                * @param {number} x
                * @param {number} y
                **/
                function TextField(text, x, y) {
                    _super.call(this, "textField", x, y);

                    this._text = text;

                    this._textField = this.container;
                    this._textField.innerText = text;
                }
                /**
                * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
                * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
                *
                * @method setTemplate
                * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
                * @param {string} icon - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
                **/
                TextField.prototype.setTemplate = function (main, field) {
                    this._textField.innerText = '';
                    _super.prototype.setTemplate.call(this, main, field);

                    if (this.tempElement !== undefined) {
                        this._textField = this.tempElement;
                    }
                    this._textField.innerText = this._text;
                };

                /**
                * Used to remove any the template HTML from this HUDWidget.
                *
                * @method removeTemplate
                **/
                TextField.prototype.removeTemplate = function () {
                    _super.prototype.removeTemplate.call(this);

                    this._textField = this.container;
                    this._textField.innerText = this._text;
                };

                /**
                * Change the text that is currently being displayed.
                * @param {string} val
                * @return {string}
                **/
                TextField.prototype.text = function (val) {
                    if (val !== undefined) {
                        this._text = val;
                        this._textField.innerText = this._text;
                    }
                    return this._text;
                };
                return TextField;
            })(Kiwi.HUD.HUDWidget);
            Widget.TextField = TextField;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /// <reference path="..\..\Kiwi.ts" />
        /*
        *	Kiwi - HUD - Bar
        *
        *	@desc		An abstract class that contains all of the fundametals for the control of a bar widget.
        *
        *	@version	1.0 - 26th July 2013
        *
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Widget) {
            var Bar = (function (_super) {
                __extends(Bar, _super);
                /**
                *
                * @constructor
                * @param {number} current - The current value.
                * @param {number} max - The maximum value.
                * @param {number} x
                * @param {number} y
                **/
                function Bar(current, max, x, y, width, height) {
                    if (typeof width === "undefined") { width = 120; }
                    if (typeof height === "undefined") { height = 20; }
                    _super.call(this, "bar", x, y);

                    this._horizontal = true;
                    this._bar = document.createElement('div');
                    this._bar.className = 'innerBar';

                    this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));
                    this.range.updated.add(this.updateCSS, this);

                    this.bar = this._bar;
                    this.container.appendChild(this.bar);

                    this.width = width;
                    this.height = height;

                    this._bar.style.height = '100%';
                    this._bar.style.width = '100%';

                    this.updateCSS();
                }
                Object.defineProperty(Bar.prototype, "width", {
                    get: /*
                    * The width of the container
                    * @type number
                    */
                    function () {
                        return this._width;
                    },
                    set: /*
                    * Set the width of the container
                    * @type number
                    */
                    function (value) {
                        this.container.style.width = value + "px";
                        this._width = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Bar.prototype, "height", {
                    get: /*
                    * The height of the container
                    * @type number
                    */
                    function () {
                        return this._height;
                    },
                    set: /*
                    * Set the height of the container
                    * @type number
                    */
                    function (value) {
                        this.container.style.height = value + "px";
                        this._height = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Bar.prototype, "horizontal", {
                    get: /**
                    * Used to set the bar to be horizontal or vertical by passing a boolean.
                    * @param {boolean} val
                    * @public
                    **/
                    function () {
                        return this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = val;
                        this.updateCSS();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Bar.prototype, "vertical", {
                    get: /**
                    * Used to set the bar to be horizontal or vertical by passing a boolean.
                    * @param {boolean} val
                    * @public
                    **/
                    function () {
                        return !this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = !val;
                        this.updateCSS();
                    },
                    enumerable: true,
                    configurable: true
                });


                /**
                * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
                * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
                *
                * @method setTemplate
                * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
                * @param {string} innerbar - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
                **/
                Bar.prototype.setTemplate = function (main, innerbar) {
                    _super.prototype.setTemplate.call(this, main, innerbar);

                    if (this.tempElement !== undefined) {
                        this.bar = this.tempElement;
                    }
                };

                /**
                * Used to remove any the template HTML from this HUDWidget.
                *
                * @method removeTemplate
                **/
                Bar.prototype.removeTemplate = function () {
                    _super.prototype.removeTemplate.call(this);

                    this.bar = this._bar;
                    this.container.appendChild(this.bar);
                    this.updateCSS();
                };

                /**
                * Will be called when the range has been updated and thus you will want to preform the render of the bar here.
                * This should be overriden by subclasses so that you have your own custom bars.
                * @public
                **/
                Bar.prototype.updateCSS = function () {
                    if (this.horizontal === true) {
                        this.bar.style.width = String(this.range.currentPercent()) + '%';
                        this.bar.style.height = '100%';
                    } else {
                        this.bar.style.height = String(this.range.currentPercent()) + '%';
                        this.bar.style.width = '100%';
                    }
                };
                return Bar;
            })(Kiwi.HUD.HUDWidget);
            Widget.Bar = Bar;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /*
        *	Kiwi - HUD - Icon
        *
        *	@desc		A HUDWidget for displaying a image, such as a portrait of you character in the HUD.
        *
        *	@version	1.0 - 26th July 2013
        *
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Widget) {
            var Icon = (function (_super) {
                __extends(Icon, _super);
                /**
                *
                * @constructor
                
                
                * @param {number} x
                * @param {number y
                * @return {Kiwi.HUD.Icon}
                **/
                function Icon(atlas, x, y) {
                    _super.call(this, 'Icon', x, y);
                    /*
                    * The cell inside the texture atlas that this icon is using
                    * @property _cellIndex
                    * @type number
                    */
                    this._cellIndex = 0;

                    this.atlas = atlas;

                    this.icon = this.container;
                    this._applyCSS();
                }
                Object.defineProperty(Icon.prototype, "cellIndex", {
                    get: /*
                    * Gets the cell index that is being used.
                    * @type number
                    */
                    function () {
                        return this._cellIndex;
                    },
                    set: /*
                    * Sets the cell index that is to be used.
                    * @type number
                    */
                    function (value) {
                        this._cellIndex = value;
                        this.width = this.atlas.cells[this.cellIndex].w;
                        this.height = this.atlas.cells[this.cellIndex].h;
                        this._applyCSS();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Icon.prototype, "width", {
                    get: /*
                    * Returns the width of the cell that is being used.
                    * @type number
                    */
                    function () {
                        return this.atlas.cells[this.cellIndex].w;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Icon.prototype, "height", {
                    get: /*
                    * Returns the height of the cell that is being used.
                    * @type number
                    */
                    function () {
                        return this.atlas.cells[this.cellIndex].h;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Removes the CSS from the Icon.
                * This can happen when setting/removing a template and is public to allow for overriding from subclasses.
                * @public
                **/
                Icon.prototype._removeCSS = function () {
                    this.icon.style.width = '';
                    this.icon.style.height = '';
                    this.icon.style.backgroundImage = '';
                    this.icon.style.backgroundRepeat = '';
                    this.icon.style.backgroundSize = '';
                };

                /*
                * Updates/Applys the css that is to be applyed.
                *
                */
                Icon.prototype._applyCSS = function () {
                    this.icon.style.width = this.width + "px";
                    this.icon.style.height = this.height + "px";
                    this.icon.style.backgroundSize = "100%";
                    this.icon.style.backgroundPositionX = -this.atlas.cells[this.cellIndex].x + "px";
                    this.icon.style.backgroundPositionY = -this.atlas.cells[this.cellIndex].y + "px";
                    this.icon.style.backgroundImage = this.atlas.image.src;
                };

                /**
                * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
                * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
                *
                * @method setTemplate
                * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
                * @param {string} icon - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
                **/
                Icon.prototype.setTemplate = function (main, icon) {
                    this._removeCSS();

                    _super.prototype.setTemplate.call(this, main, icon);

                    if (this.tempElement !== undefined) {
                        this.icon = this.tempElement;
                    }

                    this._applyCSS();
                };

                /**
                * Used to remove any the template HTML from this HUDWidget.
                *
                * @method removeTemplate
                **/
                Icon.prototype.removeTemplate = function () {
                    _super.prototype.removeTemplate.call(this);

                    this._removeCSS();
                    this.icon = this.container;
                    this._applyCSS();
                };
                return Icon;
            })(Kiwi.HUD.HUDWidget);
            Widget.Icon = Icon;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /*
        *	Kiwi - HUD - IconCounter
        *
        *	@desc		A HUDWidget used for displaying a sigular image multiple times.
        *              The amount is based of a range components current value, so you can set a maximum and minimum number of images to be dispalyed.
        *              Mainly used for Health Bars, where each 'life' would have its own image.
        *
        *	@version	1.0 - 26th July 2013
        *
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Widget) {
            var IconCounter = (function (_super) {
                __extends(IconCounter, _super);
                /**
                *
                * @constructor
                * @param {string} key
                
                * @param {number} current
                * @param {number} max
                * @param {number} x
                * @param {number} y
                **/
                function IconCounter(atlas, current, max, x, y) {
                    _super.call(this, atlas, x, y);

                    this._horizontal = true;

                    this.range = this.components.add(new Kiwi.HUD.Components.Range(current, max, 0));
                    this.range.updated.add(this._changeSize, this);

                    this._changeSize();
                    this._applyCSS();
                }
                Object.defineProperty(IconCounter.prototype, "repeat", {
                    get: function () {
                        return this._repeat;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Gets called when the range has updated and then it updates the size of the bar.
                * @private
                **/
                IconCounter.prototype._changeSize = function () {
                    if (this._horizontal) {
                        this._repeat = 'repeat-x';
                        this.width = this.atlas.cells[this.cellIndex].w * this.range.current;
                        this.height = this.atlas.cells[this.cellIndex].h;
                    } else {
                        this._repeat = 'repeat-y';
                        this.width = this.atlas.cells[this.cellIndex].w;
                        this.height = this.atlas.cells[this.cellIndex].h * this.range.current;
                    }
                };

                /**
                * Applys the background image CSS.
                * @public
                **/
                IconCounter.prototype._applyCSS = function () {
                    _super.prototype._applyCSS.call(this);
                    this.icon.style.backgroundRepeat = this.repeat;
                };

                Object.defineProperty(IconCounter.prototype, "horizontal", {
                    get: /**
                    * Used to set the bar to be horizontal or vertical by passing a boolean.
                    * @param {boolean} val
                    * @public
                    **/
                    function () {
                        return this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = val;
                        this._changeSize();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(IconCounter.prototype, "vertical", {
                    get: /**
                    * Used to set the bar to be horizontal or vertical by passing a boolean.
                    * @param {boolean} val
                    * @public
                    **/
                    function () {
                        return !this._horizontal;
                    },
                    set: function (val) {
                        this._horizontal = !val;
                        this._changeSize();
                    },
                    enumerable: true,
                    configurable: true
                });

                return IconCounter;
            })(Kiwi.HUD.Widget.Icon);
            Widget.IconCounter = IconCounter;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /// <reference path="Textfield.ts" />
        /*
        *	Kiwi - HUD - BasicScore
        *
        *	@desc		A HUDWidget that controls and displays a score.
        *
        *	@version	1.0 - 26th July 2013
        *
        *  @author     Ross Kettle
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Widget) {
            var BasicScore = (function (_super) {
                __extends(BasicScore, _super);
                /**
                *
                * @constructor
                * @param {number} x
                * @param {number} y
                **/
                function BasicScore(x, y) {
                    _super.call(this, "basicScore", x, y);
                    this.counter = this.components.add(new Kiwi.HUD.Components.Counter(0, 1));
                    this.counter.updated.add(this._updateText, this);
                }
                /**
                * Updates the text when someone modifies the counter.
                * @private
                **/
                BasicScore.prototype._updateText = function () {
                    this.text(String(this.counter.value));
                };
                return BasicScore;
            })(Kiwi.HUD.Widget.TextField);
            Widget.BasicScore = BasicScore;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /// <reference path="TextField.ts" />
        /// <reference path="../../core/game.ts" />
        (function (Widget) {
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button(game, width, height, x, y) {
                    _super.call(this, 'button', x, y);

                    this.game = game;

                    this.width = width;
                    this.height = height;

                    //this.bounds = this.components.add(new Kiwi.Components.Bounds(this.x, this.y, this.width, this.height)); //create custom bounds for HUD
                    //this.input = this.components.add(new Kiwi.HUD.Components.WidgetInput(this.game, this.bounds));
                    this.onCoordsUpdate.add(this._changed, this);
                }
                Object.defineProperty(Button.prototype, "width", {
                    get: /*
                    * The width of the container
                    * @type number
                    */
                    function () {
                        return this._width;
                    },
                    set: /*
                    * Set the width of the container
                    * @type number
                    */
                    function (value) {
                        this.container.style.width = value + "px";
                        this._width = value;
                        this._changed();
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Button.prototype, "height", {
                    get: /*
                    * The height of the container
                    * @type number
                    */
                    function () {
                        return this._height;
                    },
                    set: /*
                    * Set the height of the container
                    * @type number
                    */
                    function (value) {
                        this.container.style.height = value + "px";
                        this._height = value;
                        this._changed();
                    },
                    enumerable: true,
                    configurable: true
                });


                //public bounds: Kiwi.Components.Bounds;
                Button.prototype._changed = function () {
                    //this.bounds.setTo(this.position.x(), this.position.y(), this.size.width(), this.size.height());
                };
                return Button;
            })(Kiwi.HUD.Widget.TextField);
            Widget.Button = Button;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /// <reference path="../../Kiwi.ts" />
        /*
        *	Kiwi - HUD - Time
        *
        *	@desc		A widget for the management / displaying of a time in the HUD.
        *
        *	@version	1.0 - 26th July 2013
        *
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        *  @todo       Replace with the time / clock manager
        */
        (function (Widget) {
            var Time = (function (_super) {
                __extends(Time, _super);
                /**
                *
                * @constructor
                * @param {string} format - The format that you want the time to be in.
                * @param {number} x
                * @param {number} y
                **/
                function Time(format, x, y) {
                    _super.call(this, 'time', x, y);

                    this.time = this.components.add(new Kiwi.HUD.Components.Time(0));
                    this.time.updated.add(this.updateTime, this);

                    this.format(format);
                    this.updateTime();
                }
                /**
                * Allows you to set the time based on the parameter's passed.
                *
                * @method setTime
                * @param {number} milliseconds
                * @param {number} seconds
                * @param {number} minutes
                * @param {number} hours
                * @return {number}
                **/
                Time.prototype.setTime = function (milliseconds, seconds, minutes, hours) {
                    this.time.setTime(milliseconds, seconds, minutes, hours);

                    this.updateTime();
                    return this.time.milliseconds;
                };

                /**
                * The format that you want the text to be in.
                * @method format
                * @param {string} val
                * @return {string}
                **/
                Time.prototype.format = function (val) {
                    if (val !== undefined) {
                        this._format = val;
                    }
                    return this._format;
                };

                /**
                * Updates the time that is being displayed in the text field.
                *
                * To Do: remove the use of regexp. RegExp are slow.
                *
                * @method updateTime
                **/
                Time.prototype.updateTime = function () {
                    var ms = String(this.time.milliseconds);
                    var s = String(this.time.seconds);
                    var m = String(this.time.minutes);
                    var h = String(this.time.hours);

                    if (s.length < 2)
                        var ss = '0' + s;
else
                        var ss = s;
                    if (m.length < 2)
                        var mm = '0' + m;
else
                        var mm = m;
                    if (h.length < 2)
                        var hh = '0' + h;
else
                        var hh = h;

                    var time = this._format;
                    time = time.replace('ms', ms);

                    time = time.replace('ss', ss);
                    time = time.replace('mm', mm);
                    time = time.replace('hh', hh);
                    time = time.replace('s', s);
                    time = time.replace('m', m);
                    time = time.replace('h', h);

                    this.text(time);
                };
                return Time;
            })(Kiwi.HUD.Widget.TextField);
            Widget.Time = Time;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /// <reference path="../../Kiwi.ts" />
        (function (Widget) {
            var Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu(game, x, y) {
                    _super.call(this, 'menu', x, y);

                    this.game = game;
                    this._menuItems = [];
                }
                Menu.prototype.addMenuItem = function (item) {
                    this._menuItems.push(item);

                    //this.container.appendChild(item.container);
                    item.addedToStage(this.game, this);

                    return item;
                };

                //add multiple menu items
                Menu.prototype.addMenuItems = function (items) {
                    for (var i = 0; i < items.length; i++) {
                        this.addMenuItem(items[i]);
                    }
                };

                //get a menu item - need to test
                Menu.prototype.getMenuItem = function (val) {
                    if (typeof val === 'string') {
                        var menuItem;
                        for (var i = 0; i < this._menuItems.length; i++) {
                            if (this._menuItems[i].name == val) {
                                menuItem = this._menuItems[i];
                            }
                        }
                        return menuItem;
                    }
                    if (typeof val === 'number') {
                        return this._menuItems[val];
                    }
                };

                //does nothing just yet
                Menu.prototype.setTemplate = function (main, sub) {
                    var mainElement = document.getElementById(main);
                    if (mainElement === undefined) {
                        return;
                    }

                    var subElements = mainElement.getElementsByTagName(sub);
                    if (subElements === undefined) {
                        return;
                    }

                    _super.prototype.setTemplate.call(this, main);
                    //do something with each item
                };

                //again nothing just yet.
                Menu.prototype.removeTemplate = function () {
                };

                Menu.prototype.update = function () {
                    for (var i = 0; i < this._menuItems.length; i++) {
                        this._menuItems[i].update();
                    }
                    _super.prototype.update.call(this);
                };
                return Menu;
            })(Kiwi.HUD.HUDWidget);
            Widget.Menu = Menu;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /// <reference path="../../Kiwi.ts" />
        (function (Widget) {
            var MenuItem = (function (_super) {
                __extends(MenuItem, _super);
                function MenuItem(name, width, height, x, y) {
                    _super.call(this, name, x, y);

                    /*
                    this.size = this.components.add(new Kiwi.Components.Size(width, height));
                    this.bounds = this.components.add(new Kiwi.Components.Bounds(this.position.x(), this.position.y(), this.size.width(), this.size.height()));
                    
                    this.size.updated.add(this._applyCSS);
                    */
                    this.container.innerText = name;
                    this._applyCSS();
                }
                //when the menu item is added to the stag
                MenuItem.prototype.addedToStage = function (game, menu) {
                    this.game = game;
                    this.menu = menu;
                    this._applyCSS();
                    //this.input = this.components.add(new Kiwi.HUD.Components.WidgetInput(this.game, this.bounds));
                };

                //apply the css
                MenuItem.prototype._applyCSS = function () {
                    // this.size.setCSS(this.container);
                    var addX = 0;
                    var addY = 0;
                    if (this.menu !== undefined) {
                        //addX += this.menu.position.x();
                        //addY += this.menu.position.y();
                    }
                    //this.bounds.setTo(this.position.x() + addX, this.position.y() + addY, this.size.width(), this.size.height());
                };
                return MenuItem;
            })(Kiwi.HUD.HUDWidget);
            Widget.MenuItem = MenuItem;
        })(HUD.Widget || (HUD.Widget = {}));
        var Widget = HUD.Widget;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /*
        *	Kiwi - Components - Counter
        *
        *	@desc		Contains way's to control the counting of a singular number.
        *
        *	@version	1.0 - 26th July 2013
        *
        *  @author     Ross Kettle
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Components) {
            var Counter = (function (_super) {
                __extends(Counter, _super);
                /**
                *
                * @constructor
                * @param {number} initial - Counters initial value
                * @param {number} step - How much the counter should increment/decrement by
                * @return {Kiwi.Components.Counter}
                **/
                function Counter(initial, step) {
                    if (typeof step === "undefined") { step = 1; }
                    _super.call(this, null, "counter");
                    /**
                    * The current value of the counter
                    * @private
                    **/
                    this._value = 0;
                    this._value = initial;
                    this.step = step;

                    this.updated = new Kiwi.Signal();
                }

                Object.defineProperty(Counter.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: /**
                    * Set allows you to get the current value of the counter
                    * Get allows you to change the current value if you pass a value.
                    *
                    * @method value
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._value = val;
                            this.updated.dispatch(this._value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Increments the current value by the value passed.
                * If no value was passed increments it by the step property.
                * Returns the new value.
                *
                * @method increment
                * @param {number} val
                * @return {number}
                **/
                Counter.prototype.increment = function (val) {
                    if (val !== undefined) {
                        this._value += val;
                    } else {
                        this._value += this.step;
                    }
                    this.updated.dispatch(this._value);
                    return this._value;
                };

                /**
                * Decrements the current value by the value passed.
                * If no value was passed decrements it by the step property.
                * Returns the new value.
                *
                * @method increment
                * @param {number} val
                * @return {number}
                **/
                Counter.prototype.decrement = function (val) {
                    if (val !== undefined) {
                        this._value -= val;
                    } else {
                        this._value -= this.step;
                    }
                    this.updated.dispatch(this._value);
                    return this._value;
                };
                return Counter;
            })(Kiwi.Component);
            Components.Counter = Counter;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        (function (Components) {
            var WidgetInput = (function (_super) {
                __extends(WidgetInput, _super);
                /**
                *
                * @constructor
                * @param {Kiwi.Game} game
                * @param {Kiwi.Components.Bounds} bounds
                **/
                function WidgetInput(game/*, bounds: Kiwi.Components.Bounds*/ ) {
                    _super.call(this, null, 'WidgetInput');

                    this.game = game;

                    //  Signals
                    this.inputEntered = new Kiwi.Signal();
                    this.inputLeft = new Kiwi.Signal();
                    this.inputOnDown = new Kiwi.Signal();
                    this.inputOnRelease = new Kiwi.Signal();

                    //  Properties
                    //this._bounds = bounds;
                    this.pointDown = new Kiwi.Geom.Point();

                    this.distance = new Kiwi.Geom.Point();
                    this.withinBounds = false;
                    this.outsideBounds = true;
                    this.isUp = true;
                    this.isDown = false;
                }
                /**
                * reutrns the object type
                * @method objType
                **/
                WidgetInput.prototype.objType = function () {
                    return "Input";
                };

                //private _bounds: Kiwi.Components.Bounds;
                //  Need to add a click timer?
                WidgetInput.prototype.update = function () {
                    /*
                    //  Is the input within the bounds now?
                    if (this._bounds.pointWithin(this.game.input.position))
                    {
                    this.distance.x = this.game.input.position.x - this._bounds.getRect().left;
                    this.distance.y = this.game.input.position.y - this._bounds.getRect().top;
                    
                    //  Has it just moved inside?
                    if (this.withinBounds === false)
                    {
                    this.withinBounds = true;
                    this.outsideBounds = false;
                    this.inputEntered.dispatch( this.distance.x, this.distance.y);
                    }
                    }
                    else
                    {
                    //  It's outside the bounds now, was it previously in?
                    if (this.withinBounds === true)
                    {
                    this.withinBounds = false;
                    this.outsideBounds = true;
                    this.inputLeft.dispatch();
                    }
                    }
                    
                    //  Input is down (click/touch)
                    if (this.game.input.isDown === true)
                    {
                    //  Within bounds?
                    if (this.withinBounds === true && this.isDown === false)
                    {
                    this.isDown = true;
                    this.isUp = false;
                    this.pointDown.copyFrom(this.distance);
                    this.inputOnDown.dispatch(this.pointDown.x, this.pointDown.y);
                    }
                    
                    }
                    else
                    {
                    if (this.isDown === true)
                    {
                    this.isDown = false;
                    this.isUp = true;
                    this.inputOnRelease.dispatch();
                    }
                    }*/
                };

                Object.defineProperty(WidgetInput.prototype, "toString", {
                    get: /**
                    * Returns a string representation of this object.
                    * @method toString
                    * @return {string} A string representation of this object.
                    **/
                    function () {
                        return '[{WidgetInput (x=' + this.withinBounds + ')}]';
                    },
                    enumerable: true,
                    configurable: true
                });
                return WidgetInput;
            })(Kiwi.Component);
            Components.WidgetInput = WidgetInput;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /*
        *	Kiwi - Components - Range
        *
        *	@desc		Contains methods for making a singular value stay between a minimun/maximum boundaries.
        *
        *	@version	1.0 - 26th July 2013
        *
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        */
        (function (Components) {
            var Range = (function (_super) {
                __extends(Range, _super);
                /**
                *
                * @constructor
                * @param {number} current - The current value.
                * @param {number} max - The maximum value it can be.
                * @param {number} min - The minimum value that the current can be.
                * @return {number}
                **/
                function Range(current, max, min) {
                    _super.call(this, null, "counter");

                    this._current = current;

                    this._max = max;

                    this._min = min;

                    this.updated = new Kiwi.Signal();
                }

                Object.defineProperty(Range.prototype, "max", {
                    get: function () {
                        return this._max;
                    },
                    set: /**
                    * Set allows setting of the maximum value that the range can be in.
                    * Get returns the maximum value.
                    *
                    * @method max
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._max = val;
                            this.updated.dispatch(this._current, this._max, this._min);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Range.prototype, "min", {
                    get: function () {
                        return this._min;
                    },
                    set: /**
                    * Set allows setting of the minimum value that the range can be in.
                    * Get returns the minimum value.
                    *
                    * @method min
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._min = val;
                            this.updated.dispatch(this._current, this._max, this._min);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Range.prototype, "current", {
                    get: function () {
                        return this._current;
                    },
                    set: /**
                    * Set allows setting of the current value that the range can be in.
                    * The current value will only change if it is within the maximum/minimum values.
                    * Get returns the current value.
                    *
                    * @method current
                    * @param {number } val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            if (this._current > this._max) {
                                this._current = this._max;
                            } else if (this._current < this._min) {
                                this._current = this._min;
                            } else {
                                this._current = val;
                            }
                            this.updated.dispatch(this._current, this._max, this._min);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Decreases the current value by the amount past.
                * If the new amount would be less than the minimun it goes to the min instead.
                *
                * @method decrease
                * @param {number} val
                * @return {number}
                **/
                Range.prototype.decrease = function (val) {
                    if (typeof val === "undefined") { val = 1; }
                    if (this._current > this._min) {
                        if (this._current - val < this._min) {
                            this._current = this._min;
                        } else {
                            this._current -= val;
                        }
                        this.updated.dispatch(this._current, this._max, this._min);
                    }
                    return this._current;
                };

                /**
                * Increases the current value by the amount past.
                * If the new amount would be greater than the maximum it goes to the max instead.
                *
                * @method increase
                * @param {number} val
                * @return {number}
                **/
                Range.prototype.increase = function (val) {
                    if (typeof val === "undefined") { val = 1; }
                    if (this._current < this._max) {
                        if (this._current + val > this._max) {
                            this._current = this._max;
                        } else {
                            this._current += val;
                        }
                        this.updated.dispatch(this._current, this._max, this._min);
                    }
                    return this._current;
                };

                /**
                *
                *
                * @method currentPercent
                * @return {number}
                **/
                Range.prototype.currentPercent = function () {
                    return ((this.current) / (this.max)) * 100;
                };
                return Range;
            })(Kiwi.Component);
            Components.Range = Range;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (HUD) {
        /*
        *	Kiwi - Components - Time
        *
        *	@desc		Contains methods for control time individual.
        *
        *	@version	1.0 - 26th July 2013
        *
        *	@author 	Ben Harding
        *
        *	@url		http://www.kiwijs.org
        *
        *
        *  TO DO:      Add/Remove time methods.
        *              Have the hours/minutes methods control only themselves.
        *              Create a signal.
        *
        */
        (function (Components) {
            var Time = (function (_super) {
                __extends(Time, _super);
                /**
                *
                * @constructor
                * @param {number} milliseconds
                * @param {number} seconds
                * @param {number} minutes
                * @param {number} hours
                **/
                function Time(milliseconds, seconds, minutes, hours) {
                    _super.call(this, null, "time");

                    this.paused = true;
                    this._countDown = true;
                    this.updated = new Kiwi.Signal();
                    this._lastTime = Date.now();
                    this.setTime(milliseconds, seconds, minutes, hours);
                }

                Object.defineProperty(Time.prototype, "countingDown", {
                    get: function () {
                        return this._countDown;
                    },
                    set: /**
                    * Used to set/tell if the timer should count down or not
                    *
                    * @method countingDown
                    * @param {boolean} val
                    * @return {boolean}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            if (val == true)
                                this.paused = false;

                            this._countDown = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "countingUp", {
                    get: function () {
                        return !this._countDown;
                    },
                    set: /**
                    * Used to set/tell if the timer should count up or not
                    *
                    * @method countingDown
                    * @param {boolean} val
                    * @return {boolean}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            if (val == true)
                                this.paused = false;

                            this._countDown = !val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Sets the time to be at a certain point.
                *
                * @method setTime
                * @param {number} milliseconds
                * @param {number} seconds
                * @param {number} minutes
                * @param {number} hours
                * @return {number}
                **/
                Time.prototype.setTime = function (milliseconds, seconds, minutes, hours) {
                    if (seconds !== undefined)
                        milliseconds += this.convertToMilli(seconds, 's');
                    if (minutes !== undefined)
                        milliseconds += this.convertToMilli(minutes, 'm');
                    if (hours !== undefined)
                        milliseconds += this.convertToMilli(hours, 'h');

                    this._milliseconds = milliseconds;
                    this.updated.dispatch();

                    return this._milliseconds;
                };

                /**
                * Add's more time to the component.
                *
                * @method addTime
                * @param {number} milliseconds
                * @param {number} seconds
                * @param {number} minutes
                * @param {number} hours
                * @return {number}
                **/
                Time.prototype.increaseTime = function (milliseconds, seconds, minutes, hours) {
                    if (seconds !== undefined)
                        milliseconds += this.convertToMilli(seconds, 's');
                    if (minutes !== undefined)
                        milliseconds += this.convertToMilli(minutes, 'm');
                    if (hours !== undefined)
                        milliseconds += this.convertToMilli(hours, 'h');

                    this._milliseconds += milliseconds;
                    this.updated.dispatch();

                    return this._milliseconds;
                };

                /**
                * Removes some time from the component.
                *
                * @method removeTime
                * @param {number} milliseconds
                * @param {number} seconds
                * @param {number} minutes
                * @param {number} hours
                * @return {number}
                **/
                Time.prototype.decreaseTime = function (milliseconds, seconds, minutes, hours) {
                    if (seconds !== undefined)
                        milliseconds += this.convertToMilli(seconds, 's');
                    if (minutes !== undefined)
                        milliseconds += this.convertToMilli(minutes, 'm');
                    if (hours !== undefined)
                        milliseconds += this.convertToMilli(hours, 'h');

                    this._milliseconds += milliseconds;
                    this.updated.dispatch();

                    return this._milliseconds;
                };

                /**
                * A method to convert a number / unit into milliseconds.
                *
                * @method convertToMilli
                * @param {number} val - The number that you want converted.
                * @param {number} unit - Units that the number is in. 's' => seconds, 'm' => minutes, 'h' => hours
                * @return {number}
                **/
                Time.prototype.convertToMilli = function (val, unit) {
                    var num = 0;
                    if (unit === 'milli' || unit === 'milliseconds' || unit === 'ms') {
                        num = val;
                    } else if (unit === 'seconds' || unit === 's') {
                        num = val * 1000;
                    } else if (unit === 'minutes' || unit === 'm') {
                        num = val * 1000 * 60;
                    } else if (unit === 'hours' || unit === 'h') {
                        num = val * 1000 * 60 * 60;
                    }

                    return num;
                };


                Object.defineProperty(Time.prototype, "milliseconds", {
                    get: function () {
                        return this._milliseconds % 1000;
                    },
                    set: /**
                    * Gives you the number of milliseconds. Alternatively can also set the number of milliseconds
                    *
                    * @method milliseconds
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._milliseconds = val;
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "seconds", {
                    get: function () {
                        return Math.floor(this._milliseconds / 1000) % 60;
                    },
                    set: /**
                    * Gives you the number of seconds. Alternatively can also set the time.
                    *
                    * @method seconds
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._milliseconds = this.convertToMilli(val, 's');
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "minutes", {
                    get: function () {
                        return Math.floor(this._milliseconds / 1000 / 60) % 60;
                    },
                    set: /**
                    * Gives you the number of minutes. Alternatively can also set the number of minutes
                    *
                    * @method minutes
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._milliseconds = this.convertToMilli(val, 'm');
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(Time.prototype, "hours", {
                    get: function () {
                        return Math.floor(this._milliseconds / 1000 / 60 / 60);
                    },
                    set: /**
                    * Gives you the number of hours Alternatively can also set the number of hours
                    *
                    * @method hours
                    * @param {number} val
                    * @return {number}
                    **/
                    function (val) {
                        if (val !== undefined) {
                            this._milliseconds = this.convertToMilli(val, 'h');
                            this.updated.dispatch();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Update loop.
                * @public
                **/
                Time.prototype.update = function () {
                    if (!this.paused) {
                        var newTime = Date.now();
                        var difference = newTime - this._lastTime;
                        this._lastTime = newTime;

                        if (this._countDown) {
                            this.milliseconds = this._milliseconds - difference;
                        } else {
                            this.milliseconds = this._milliseconds + difference;
                        }
                        this.updated.dispatch();
                    }

                    _super.prototype.update.call(this);
                };
                return Time;
            })(Kiwi.Component);
            Components.Time = Time;
        })(HUD.Components || (HUD.Components = {}));
        var Components = HUD.Components;
    })(Kiwi.HUD || (Kiwi.HUD = {}));
    var HUD = Kiwi.HUD;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Sound
    * @module Kiwi
    * @submodule Sound
    * @main Sound
    */
    (function (Sound) {
        /**
        *
        *
        * @class AudioManager
        *
        */
        var AudioManager = (function () {
            /*
            *
            * @constructor
            * @param {Kiwi.Game} game
            */
            function AudioManager(game) {
                /*
                * If the current game has audio support or not.
                * @property noAudio
                */
                this.noAudio = false;
                /*
                * If the game is currently using the Web Audio API for the sound.
                * @property usingWebAudio
                */
                this.usingWebAudio = false;
                /*
                * If the game is using audio tags for the sound. This is the fallback if the web audio api is not supported.
                * @property usingAudioTag
                */
                this.usingAudioTag = false;
                /*
                * Web Audio API ONLY - The audio context that is used for decoding audio, e.t.c.
                * @property context
                */
                this.context = null;
                /*
                * Web Audio API ONLY - The master gain node through which all sounds play.
                * @property masterGain
                */
                this.masterGain = null;
                this._game = game;
            }
            AudioManager.prototype.objType = function () {
                return "AudioManager";
            };

            /*
            * The boot manager.
            *
            * @method boot
            */
            AudioManager.prototype.boot = function () {
                this._volume = 1;
                this._muted = false;
                this._sounds = [];

                if (Kiwi.DEVICE.iOS && Kiwi.DEVICE.webaudio == false) {
                    this.channels = 1;
                }

                //check to see if the device is locked here...
                this.usingWebAudio = true;
                this.usingAudioTag = false;

                if (!!window['AudioContext']) {
                    this.context = new window['AudioContext']();
                } else if (!!window['webkitAudioContext']) {
                    this.context = new window['webkitAudioContext']();
                } else if (!!window['Audio']) {
                    this.usingWebAudio = false;
                    this.usingAudioTag = true;
                } else {
                    this.usingWebAudio = false;
                    this.noAudio = true;
                }

                if (this.context !== null) {
                    if (this.context.createGain === undefined) {
                        this.masterGain = this.context.createGainNode();
                    } else {
                        this.masterGain = this.context.createGain();
                    }

                    this.masterGain.gain.value = 1;
                    this.masterGain.connect(this.context.destination);
                }
            };


            Object.defineProperty(AudioManager.prototype, "mute", {
                get: function () {
                    return this._muted;
                },
                set: /*
                * Used to mute the audio on the device, or to check to see if the device is muted.
                *
                * @method mute
                * @param {bool} value
                * @return {bool}
                */
                function (value) {
                    if (value === true) {
                        if (this._muted)
                            return;
                        this._muted = true;

                        if (this.usingWebAudio) {
                            this._muteVolume = this.masterGain.gain.value;
                            this.masterGain.gain.value = 0;
                        } else if (this.usingAudioTag) {
                            for (var i = 0; i < this._sounds.length; i++) {
                                this._sounds[i].mute(true);
                            }
                        }
                    } else {
                        if (this._muted == false)
                            return;
                        this._muted = false;

                        if (this.usingWebAudio) {
                            this.masterGain.gain.value = this._muteVolume;
                        } else if (this.usingAudioTag) {
                            for (var i = 0; i < this._sounds.length; i++) {
                                this._sounds[i].mute(false);
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AudioManager.prototype, "volume", {
                get: function () {
                    return this._volume;
                },
                set: /*
                * Global setting and getting of the volume. A number between 0 (silence) and 1 (full volume)
                *
                * @method volume
                * @param {number} value
                * @return {number}
                */
                function (value) {
                    if (value !== undefined) {
                        value = Kiwi.Utils.GameMath.clamp(value, 1, 0);
                        this._volume = value;

                        if (this._muted) {
                            this._muteVolume = this._volume;
                        }

                        if (this.usingWebAudio) {
                            this.masterGain.gain.value = value;
                        } else if (this.usingAudioTag) {
                            for (var i = 0; i < this._sounds.length; i++) {
                                //for each sound tag to update.
                                this._sounds[i].volume(this._sounds[i].volume());
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            /*
            * Used to create a new sound on the audio manager. Returns the newly created sound.
            *
            * @method add
            * @param {string} key
            * @param {number} volume
            * @param {bool} loop
            * @return {Kiwi.Sound.Audio}
            */
            AudioManager.prototype.add = function (key, volume, loop) {
                if (typeof volume === "undefined") { volume = 1; }
                if (typeof loop === "undefined") { loop = false; }
                if (this.noAudio)
                    return;

                var sound = new Kiwi.Sound.Audio(this._game, key, volume, loop);
                this._sounds.push(sound);
                return sound;

                return null;
            };

            /*
            * Removes the passed sound from the audio manager. Needs testing.
            *
            * @method remove
            * @param { Kiwi.Sound.Audio} sound
            */
            AudioManager.prototype.remove = function (sound) {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (sound == this._sounds[i]) {
                        this._sounds[i].gainNode.disconnect();
                        this._sounds.splice(i, 1, 0);
                        i--;
                    }
                }
            };

            /*
            * Plays all of the sounds listed in the audio manager.
            *
            * @method playAll
            */
            AudioManager.prototype.playAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].play();
                    }
                }
            };

            /*
            * Stops all of the sounds that are listed in the audio manager from playing.
            *
            * @method playAll
            */
            AudioManager.prototype.stopAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].stop();
                    }
                }
            };

            /*
            * Pauses all of the sounds listed in the audio manager.
            *
            * @method playAll
            */
            AudioManager.prototype.pauseAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].pause();
                    }
                }
            };

            /*
            * Resumes all of the sounds listed in the audio manager.
            *
            * @method playAll
            */
            AudioManager.prototype.resumeAll = function () {
                for (var i = 0; i < this._sounds.length; i++) {
                    if (this._sounds[i]) {
                        this._sounds[i].resume();
                    }
                }
            };

            /*
            * Update Loop
            */
            AudioManager.prototype.update = function () {
                if (!this.noAudio) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        this._sounds[i].update();
                    }
                }
            };
            return AudioManager;
        })();
        Sound.AudioManager = AudioManager;
    })(Kiwi.Sound || (Kiwi.Sound = {}));
    var Sound = Kiwi.Sound;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Sound
    * @module Kiwi
    * @submodule Sound
    *
    */
    (function (Sound) {
        /**
        *
        *
        * @class Audio
        *
        */
        var Audio = (function () {
            /*
            *
            * @constructor
            * @param {Kiwi.Game}
            * @param {string} key
            * @param {number} volume - A number between 0 (silence) and 1 (loud).
            * @param {bool} loop
            */
            function Audio(game, key, volume, loop) {
                /*
                * A private indicator of weither this audio is currently muted or not.
                * @private
                */
                this._muted = false;
                /*
                * The total duration of the audio in seconds
                * @public
                */
                this.totalDuration = 0;
                /*
                * Web Audio API ONLY - The audio buffer that is to be used when playing audio segments.
                * @private
                */
                this._buffer = null;
                /*
                * Web Audio API ONLY - A boolean to indicate if the audio has been decoded or not yet. If not you will need to run the decode() method.
                * @private
                */
                this._decoded = false;
                /*
                * An array of all of the markers that are on this piece of audio.
                * @private
                */
                this._markers = [];
                /*
                * The current marker that is being used.
                * @private
                */
                this._currentMarker = 'default';
                this._game = game;

                this._usingAudioTag = this._game.audio.usingAudioTag;
                this._usingWebAudio = this._game.audio.usingWebAudio;

                if (this._game.audio.noAudio)
                    return;

                if (!this._setAudio(key))
                    return;

                if (this._usingWebAudio) {
                    this.context = this._game.audio.context;
                    this.masterGainNode = this._game.audio.masterGain;

                    if (this.context.createGain === 'undefined') {
                        this.gainNode = this.context.createGainNode();
                    } else {
                        this.gainNode = this.context.createGain();
                    }

                    //make sure the audio is decoded.
                    this._decode();

                    this.gainNode.gain.value = volume * this._game.audio.volume;
                    this.gainNode.connect(this.masterGainNode);
                } else if (this._usingAudioTag) {
                    this.totalDuration = this._sound.duration;
                    this._sound.volume = volume * this._game.audio.volume;

                    if (isNaN(this.totalDuration))
                        this._pending = true;
                }

                this.duration = 0;
                this.volume = volume;
                this._muteVolume = volume;
                this._loop = loop;

                //add the default marker
                this.addMarker('default', 0, this.totalDuration, this._loop);
                this._currentMarker = 'default';

                //tonnes of signals to go here.
                this.onPlay = new Kiwi.Signal();
                this.onStop = new Kiwi.Signal();
                this.onPause = new Kiwi.Signal();
                this.onResume = new Kiwi.Signal();
                this.onLoop = new Kiwi.Signal();
                this.onMute = new Kiwi.Signal();
            }
            Audio.prototype.objType = function () {
                return "Audio";
            };

            /*
            * Retrieves the audio data from the file store.
            *
            * @method _setAudio
            * @param {string} key
            * @return {boolean}
            */
            Audio.prototype._setAudio = function (key) {
                if (key == '' || this._game.fileStore.exists(key) === false) {
                    this.ready = false;
                    return;
                }

                this.key = key;
                this._file = this._game.fileStore.getFile(key);
                this._sound = this._file.data;
                this.ready = true;

                return true;
            };

            /*
            * Decodes the audio data to make it playable. By default the audio should already have been decoded when it was loaded.
            *
            * @method _decode
            */
            Audio.prototype._decode = function () {
                if (this._usingAudioTag || this._file.data.decode == false)
                    return;

                if (this._file.data.decoded === true && this._file.data.buffer !== null) {
                    this._buffer = this._file.data.buffer;
                    this._decoded = true;
                    return;
                }

                var that = this;
                this.context.decodeAudioData(this._file.data.raw, function (buffer) {
                    that._buffer = buffer;
                    that._decoded = true;
                });
            };


            Object.defineProperty(Audio.prototype, "volume", {
                get: function () {
                    return this._volume;
                },
                set: /*
                * Used to set the current volume for this sound if a parameter has been passed. Otherwise returns the volume.
                *
                * @method volume
                * @param {number} val
                * @return {number}
                */
                function (val) {
                    if (this._game.audio.noAudio)
                        return;

                    if (val !== undefined) {
                        val = Kiwi.Utils.GameMath.clamp(val, 1, 0);

                        this._volume = val;

                        if (this._muted) {
                            this._muteVolume = this._volume;
                        }

                        if (this._usingWebAudio) {
                            this.gainNode.gain.value = this._volume * this._game.audio.volume;
                        } else if (this._usingAudioTag) {
                            this._sound.volume = this._volume * this._game.audio.volume;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Audio.prototype, "mute", {
                get: function () {
                    return this._muted;
                },
                set: /*
                * Allows you to mute the sound.
                *
                * @method muted
                * @param {bool} val
                * @return {bool}
                */
                function (val) {
                    if (this._game.audio.noAudio)
                        return;

                    if (val !== undefined && this._muted !== val) {
                        if (val === true) {
                            this._muteVolume = this._volume;
                            this.volume = 0;
                            this._muted = true;
                        } else {
                            this._muted = false;
                            this.volume = this._muteVolume;
                        }
                        this.onMute.dispatch(this._muted);
                    }
                },
                enumerable: true,
                configurable: true
            });

            /*
            * Adds a new marker to the audio which will then allow for that section of audio to be played.
            *
            * @method addMarker
            * @param {string} name
            * @param {number} start - The starting point of the audio. In seconds.
            * @param {number} stop - The stopping point of the audio. In seconds.
            * @param {bool} loop
            */
            Audio.prototype.addMarker = function (name, start, stop, loop) {
                if (typeof loop === "undefined") { loop = false; }
                this._markers[name] = { start: start, stop: stop, duration: stop - start, loop: loop };
            };

            /*
            * Removes a currently existing marker from this audio.
            *
            * @method removeMarker
            */
            Audio.prototype.removeMarker = function (name) {
                if (name === 'default')
                    return;

                if (this.isPlaying && this._currentMarker == name) {
                    this.stop();
                    this._currentMarker = 'default';
                }
                delete this._markers[name];
            };

            /*
            * Plays the current sound/audio from the start.
            *
            * @method play
            * @param {string} marker - the marker that is to be played.
            * @param {bool} forceRestart - force the audio to stop and start again.
            */
            Audio.prototype.play = function (marker, forceRestart) {
                if (typeof marker === "undefined") { marker = this._currentMarker; }
                if (typeof forceRestart === "undefined") { forceRestart = false; }
                if (this.isPlaying && forceRestart == false || this._game.audio.noAudio)
                    return;

                if (forceRestart)
                    this.stop();

                this.paused = false;

                if (this._markers[marker] == undefined)
                    return;

                if (this._currentMarker === marker && this.isPlaying)
                    return;

                this._currentMarker = marker;
                this.duration = this._markers[this._currentMarker].duration * 1000;
                this._loop = this._markers[this._currentMarker].loop;

                if (this._usingWebAudio) {
                    if (this._decoded === true) {
                        if (this._buffer == null)
                            this._buffer = this._file.data.buffer;

                        this._sound = this.context.createBufferSource();
                        this._sound.buffer = this._buffer;
                        this._sound.connect(this.gainNode);
                        this.totalDuration = this._sound.buffer.duration;

                        if (this.duration == 0)
                            this.duration = this.totalDuration * 1000;

                        if (this._loop)
                            this._sound.loop = true;

                        if (this._sound.start === undefined) {
                            this._sound.noteGrainOn(0, this._markers[this._currentMarker].start, this.duration / 1000);
                        } else {
                            this._sound.start(0, this._markers[this._currentMarker].start, this.duration / 1000);
                        }

                        this.isPlaying = true;
                        this._startTime = this._game.time.now();
                        this._currentTime = 0;
                        this._stopTime = this._startTime + this.duration;
                        this.onPlay.dispatch();
                    } else {
                        this._pending = true;
                        this._decode();
                    }
                } else if (this._usingAudioTag) {
                    if (this.duration == 0 || isNaN(this.duration))
                        this.duration = this.totalDuration * 1000;

                    if (this._muted)
                        this._sound.volume = 0;
else
                        this._sound.volume = this._volume;

                    this._sound.currentTime = this._markers[this._currentMarker].start;
                    this._sound.play();
                    this.isPlaying = true;
                    this._startTime = this._game.time.now();
                    this._currentTime = 0;
                    this._stopTime = this._startTime + this.duration;

                    if (!this.paused)
                        this.onPlay.dispatch();
                }
            };

            /*
            * Stop the sound from playing.
            *
            * @method stop
            */
            Audio.prototype.stop = function () {
                if (this.isPlaying && this._sound) {
                    if (this._usingWebAudio) {
                        if (this._sound.stop === undefined) {
                            this._sound.noteOff(0);
                        } else {
                            this._sound.stop(0);
                        }
                    } else if (this._usingAudioTag) {
                        this._sound.pause();
                        this._sound.currentTime = 0;
                    }

                    if (this.paused == false)
                        this.onStop.dispatch();
                }

                this.isPlaying = false;
            };

            /*
            * Pauses the sound so that you can resume it from at point to paused it at.
            *
            * @method pause
            */
            Audio.prototype.pause = function () {
                if (this.isPlaying) {
                    this.paused = true;
                    this.stop();
                    this.onPause.dispatch();
                }
            };

            /*
            * Plays the sound from when you paused the sound.
            *
            * @method resume
            */
            Audio.prototype.resume = function () {
                if (this.paused && this.isPlaying == false) {
                    if (this._usingWebAudio) {
                        if (this._buffer == null)
                            this._buffer = this._file.data.buffer;

                        this._sound = this.context.createBufferSource();
                        this._sound.buffer = this._buffer;
                        this._sound.connect(this.gainNode);

                        if (this._sound.start === undefined) {
                            this._sound.noteGrainOn(0, this._markers[this._currentMarker].start + (this._currentTime / 1000), this.duration / 1000);
                        } else {
                            this._sound.start(0, this._markers[this._currentMarker].start + (this._currentTime / 1000), this.duration / 1000);
                        }
                    } else {
                        this._sound.currentTime = this._markers[this._currentMarker].start + this._currentTime / 1000;
                        this._sound.play();
                    }

                    this.paused = false;
                    this.isPlaying = true;
                    this.onResume.dispatch();
                }
            };

            /*
            * Le Update Loop
            */
            Audio.prototype.update = function () {
                if (!this.ready)
                    return;

                if (this._pending) {
                    if (this._decoded === true || this._file.data.decoded) {
                        this._pending = false;
                        this.play();
                    } else if (this._usingAudioTag && !isNaN(this._sound.duration)) {
                        this.totalDuration = this._sound.duration;
                        this._markers['default'].duration = this.totalDuration;
                        this._pending = false;

                        if (this.isPlaying && this._currentMarker == 'default')
                            this.duration = this.totalDuration;
                    }
                }

                if (this.isPlaying) {
                    this._currentTime = this._game.time.now() - this._startTime;

                    if (this._currentTime >= this.duration) {
                        if (this._usingWebAudio) {
                            if (this._loop) {
                                if (this._currentMarker == 'default') {
                                    this._currentTime = 0;
                                    this._startTime = this._game.time.now();
                                } else {
                                    this.play(this._currentMarker, true);
                                }

                                this.onLoop.dispatch();
                            } else {
                                this.stop();
                            }
                        } else if (this._usingAudioTag) {
                            if (this._loop) {
                                this.play(this._currentMarker, true);
                                this.onLoop.dispatch();
                            } else {
                                this.stop();
                            }
                        }
                    }
                }
            };

            /*
            * This method handles the destruction of all of the properties when the audio is no longer needed.
            *
            * @method destroy
            */
            Audio.prototype.destroy = function () {
                delete this._sound;
                delete this._currentTime;
                delete this._startTime;
                delete this._stopTime;
                delete this._pending;
                delete this.masterGainNode;
                delete this.gainNode;
                delete this.totalDuration;
                delete this.duration;
                delete this._file;
                delete this._buffer;
                delete this._decoded;
            };
            return Audio;
        })();
        Sound.Audio = Audio;
    })(Kiwi.Sound || (Kiwi.Sound = {}));
    var Sound = Kiwi.Sound;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Sound) {
        // Class
        var AudioLibrary = (function () {
            /*
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @return {Kiwi.AudioLibrary}
            */
            function AudioLibrary(game) {
                this._game = game;
                this.audio = {};
            }
            AudioLibrary.prototype.objType = function () {
                return "AudioLibrary";
            };

            /*
            * Resets the audio library.
            * @method clear
            */
            AudioLibrary.prototype.clear = function () {
                for (var prop in this.audio) {
                    delete this.audio[prop];
                }
            };

            /*
            * Adds a new audio file to the audio library.
            * @method add
            * @param {Kiwi.File} imageFile
            */
            AudioLibrary.prototype.add = function (audioFile) {
                switch (audioFile.dataType) {
                    case Kiwi.Files.File.AUDIO:
                        this.audio[audioFile.key] = audioFile;
                        break;

                    default:
                        break;
                }
            };
            return AudioLibrary;
        })();
        Sound.AudioLibrary = AudioLibrary;
    })(Kiwi.Sound || (Kiwi.Sound = {}));
    var Sound = Kiwi.Sound;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Animation
    * @module Kiwi
    * @submodule Animation
    * @main Animation
    */
    (function (Animation) {
        /**
        *
        * @class Anim
        *
        */
        var Anim = (function () {
            /**
            *
            * @constructor
            * @param {string} name - The name of this anim.
            * @param {Sequences} sequences - The sequence that this anim will be using to animate.
            * @param {Kiwi.Time.Clock} clock - A game clock that this anim will be using to keep record of the time between frames.
            * @return {Kiwi.Animation.Anim}
            */
            function Anim(name, sequence, clock) {
                /**
                * The current frame index that the animation is upto.
                * @property _frameIndex
                * @type number
                * @private
                */
                this._frameIndex = 0;
                /**
                * The starting time of the animation from when it was played. Internal use only.
                * @property _startTime
                * @type number
                * @private
                */
                this._startTime = null;
                /**
                * Indicates weither the animation is playing in reverse or not.
                * @property _reverse
                * @type boolean
                * @private
                */
                this._reverse = false;
                this.name = name;
                this._sequence = sequence;
                this._speed = sequence.speed;
                this._loop = sequence.loop;
                this._clock = clock;

                //Signals
                this.onUpdate = new Kiwi.Signal();
                this.onPlay = new Kiwi.Signal();
                this.onStop = new Kiwi.Signal();
                this.onLoop = new Kiwi.Signal();
            }
            Object.defineProperty(Anim.prototype, "loop", {
                get: /**
                * Get if this animation is to loop or not.
                * @type bool
                * @public
                */
                function () {
                    return this._loop;
                },
                set: /**
                * Set if this animation should loop or not
                * @type bool
                * @public
                */
                function (value) {
                    this._loop = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Anim.prototype, "frameIndex", {
                get: /**
                * Returns the current frame index that the animation is up to.
                * @type number
                * @public
                */
                function () {
                    return this._frameIndex;
                },
                set: /**
                * Sets the current frame index that the animation is sitting at.
                * @type number
                * @public
                */
                function (val) {
                    if (this._validateFrame(val)) {
                        this._frameIndex = val;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Anim.prototype, "currentCell", {
                get: /**
                * Returns the current cell that the animation is up to.
                * @type number
                * @public
                */
                function () {
                    return this._sequence.cells[this.frameIndex];
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Anim.prototype, "speed", {
                get: /**
                * Get how fast the transition is between cells.
                * @type number
                * @public
                */
                function () {
                    return this._speed;
                },
                set: /**
                * Set how fast the transition is between cells.
                * @type number
                * @public
                */
                function (value) {
                    this._speed = value;
                },
                enumerable: true,
                configurable: true
            });



            Object.defineProperty(Anim.prototype, "reverse", {
                get: /**
                * Returns a boolean indicating if the animation is playing in reverse or not
                * @type boolean
                * @public
                */
                function () {
                    return this._reverse;
                },
                set: /**
                * Set's weither or not the animation is playing in reverse or not.
                * @type boolean
                * @public
                */
                function (value) {
                    this._reverse = value;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * An Internal method used to start the animation.
            * @method _start
            * @param {number} index
            * @private
            */
            Anim.prototype._start = function (index) {
                if (typeof index === "undefined") { index = null; }
                if (index !== null) {
                    this.frameIndex = index;
                }
                this._isPlaying = true;
                this._startTime = this._clock.elapsed();
                this._tick = this._startTime + this._speed;
                this.onPlay.dispatch();
            };

            /**
            * Plays the animation.
            * @method play
            * @public
            */
            Anim.prototype.play = function () {
                if (this._frameIndex === this.length - 1)
                    this.frameIndex = 0;

                this.playAt(this._frameIndex);
            };

            /**
            * Plays the animation at a particular frame
            * @method playAt
            * @param {number} index
            * @public
            */
            Anim.prototype.playAt = function (index) {
                this._start(index);
            };

            /**
            * Pauses the current animation.
            * @method pause
            * @public
            */
            Anim.prototype.pause = function () {
                this.stop();
            };

            /**
            * Resumes the current animation after stopping.
            * @method resume
            * @public
            */
            Anim.prototype.resume = function () {
                if (this._startTime !== null) {
                    this._isPlaying = true;
                }
            };

            /**
            * Stops the current animation from playing.
            * @method stop
            * @public
            */
            Anim.prototype.stop = function () {
                if (this._isPlaying) {
                    this._isPlaying = false;
                    this.onStop.dispatch();
                }
            };

            /**
            * Makes the animation go to the next frame. If the animation is at the end it goes back to the start.
            * @method nextFrame
            * @public
            */
            Anim.prototype.nextFrame = function () {
                this._frameIndex++;
                if (this._frameIndex >= this.length)
                    this.frameIndex = 0;
            };

            /**
            * Makes the animation go to the previous frame. If the animation is at the first frame it goes to the end.
            * @method prevFrame
            * @public
            */
            Anim.prototype.prevFrame = function () {
                this._frameIndex--;
                if (this._frameIndex < 0)
                    this.frameIndex = this.length - 1;
            };

            /**
            * The update loop. Returns a boolean indicating weither the animation has gone to a new frame or not.
            * @method update
            * @return {bool}
            * @public
            */
            Anim.prototype.update = function () {
                if (this._isPlaying) {
                    if (this._clock.elapsed() >= this._tick) {
                        this._tick = this._clock.elapsed() + this._speed;

                        if (this._reverse)
                            this._frameIndex--;
else
                            this._frameIndex++;

                        this.onUpdate.dispatch();
                        if (!this._validateFrame(this._frameIndex)) {
                            if (this._loop) {
                                if (this._reverse) {
                                    this._frameIndex = this.length - 1;
                                    this.onLoop.dispatch();
                                } else {
                                    this._frameIndex = 0;
                                    this.onLoop.dispatch();
                                }
                            } else {
                                this._frameIndex--;
                                this.stop();
                            }
                        }

                        return true;
                    }
                }
                return false;
            };

            /**
            * An internal method used to check to see if frame passed is valid or not
            * @method _validateFrame
            * @param {number} frame
            * @private
            */
            Anim.prototype._validateFrame = function (frame) {
                return (frame < this.length && frame >= 0);
            };

            Object.defineProperty(Anim.prototype, "length", {
                get: /**
                * Returns the number of frames that in the animation. Thus the animations 'length'.
                * @type number
                * @public
                */
                function () {
                    return this._sequence.cells.length;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Destroys the anim.
            * @method destroy
            * @public
            */
            Anim.prototype.destroy = function () {
                this._isPlaying = false;
                delete this._clock;
                delete this._sequence;
                if (this.onLoop)
                    this.onLoop.dispose();
                if (this.onStop)
                    this.onStop.dispose();
                if (this.onPlay)
                    this.onPlay.dispose();
                if (this.onUpdate)
                    this.onUpdate.dispose();
                delete this.onLoop;
                delete this.onStop;
                delete this.onPlay;
                delete this.onUpdate;
                delete this.frameIndex;
                delete this.loop;
                delete this._reverse;
                delete this._tick;
            };
            return Anim;
        })();
        Animation.Anim = Anim;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Animation
    * @module Kiwi
    * @submodule Animation
    *
    */
    (function (Animation) {
        /**
        *
        *
        * @class Sequence
        *
        */
        var Sequence = (function () {
            /**
            *
            * @constructor
            * @param {String} name - The name of this sequence. This is not unique.
            * @param {Number[]} cells - The cells that are in this animation.
            * @param {Number} speed - The time an animation should spend on each frame.
            * @param {Boolean} loop - If the sequence should play again if it was animating and the animation reaches the last frame.
            * @return {Kiwi.Animation.Sequence}
            */
            function Sequence(name, cells, speed, loop) {
                if (typeof speed === "undefined") { speed = 0.1; }
                if (typeof loop === "undefined") { loop = true; }
                this.name = name;
                this.cells = cells;
                this.speed = speed;
                this.loop = loop;
            }
            return Sequence;
        })();
        Animation.Sequence = Sequence;
    })(Kiwi.Animation || (Kiwi.Animation = {}));
    var Animation = Kiwi.Animation;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        * A compact object that holds the most important details about a Keyboard Event response
        *
        * @class Key
        *
        */
        var Key = (function () {
            /**
            * Constructor
            * @param {Kiwi.Input.Keyboard} manager.
            * @param {Number} keycode.
            * @param {KeyboardEvent} [event].
            * @return {Kiwi.Input.Key} This object.
            */
            function Key(manager, keycode, event) {
                /**
                *
                * @property isDown
                * @type Boolean
                **/
                this.isDown = false;
                /**
                *
                * @property isUp
                * @type Boolean
                **/
                this.isUp = false;
                /**
                *
                * @property altKey
                * @type Boolean
                **/
                this.altKey = false;
                /**
                *
                * @property ctrlKey
                * @type Boolean
                **/
                this.ctrlKey = false;
                /**
                *
                * @property shiftKey
                * @type Boolean
                **/
                this.shiftKey = false;
                /**
                *
                * @property timeDown
                * @type Number
                **/
                this.timeDown = 0;
                /**
                *
                * @property duration
                * @type Number
                **/
                this.duration = 0;
                /**
                *
                * @property timeUp
                * @type Number
                **/
                this.timeUp = 0;
                /**
                *
                * @property repeats
                * @type Number
                **/
                this.repeats = 0;
                this._manager = manager;
                this.keyCode = keycode;

                if (event) {
                    this.update(event);
                }
            }
            Key.prototype.objType = function () {
                return "Key";
            };

            /**
            *
            * @method update
            * @param {KeyboardEvent} event.
            * @return {}
            */
            Key.prototype.update = function (event) {
                this.keyCode = event.keyCode;

                if (event.type === 'keydown') {
                    this.altKey = event.altKey;
                    this.ctrlKey = event.ctrlKey;
                    this.shiftKey = event.shiftKey;

                    if (this.isDown === true) {
                        //  Key was already held down, this must be a repeat rate based event
                        this.repeats++;
                    } else {
                        this.isDown = true;
                        this.isUp = false;
                        this.timeDown = event.timeStamp;
                        this.duration = 0;
                    }
                } else if (event.type === 'keyup') {
                    this.isDown = false;
                    this.isUp = true;
                    this.timeUp = event.timeStamp;
                }
            };

            /**
            *
            * @method justPressed
            * @param {Number} [duration].
            * @return {Boolean}
            */
            Key.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this._manager.justPressedRate; }
                if (this.isDown === true && (this.timeDown + duration) < this._manager.game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            *
            * @method justReleased
            * @param {Number} [duration].
            * @return {Boolean}
            */
            Key.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this._manager.justReleasedRate; }
                if (this.isUp === true && (this.timeUp + duration) < this._manager.game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };
            return Key;
        })();
        Input.Key = Key;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        *
        * @class Keyboard
        *
        */
        var Keyboard = (function () {
            /**
            * Constructor
            * @param {Kiwi.Game} game.
            * @return {Kiwi.Input.Keyboard} This object.
            */
            function Keyboard(game) {
                /**
                *
                * @property _domElement
                * @type HTMLElement
                * @private
                **/
                this._domElement = null;
                /**
                *
                * @property _keys
                * @type Array
                * @private
                **/
                this._keys = [];
                /**
                *
                * @property justPressedRate
                * @type Number
                **/
                this.justPressedRate = 200;
                /**
                *
                * @property justReleasedRate
                * @type Number
                **/
                this.justReleasedRate = 200;
                this.game = game;
            }
            Keyboard.prototype.objType = function () {
                return "Keyboard";
            };

            /**
            * The DOM is ready, so we can start listening now
            * @method boot
            */
            Keyboard.prototype.boot = function () {
                //this._domElement = this.game.settings.container;
                this.start();
            };

            /**
            *
            * @method update
            */
            Keyboard.prototype.update = function () {
                //  Loop through all 'down' keys and update the timers on those still pressed
            };

            /**
            *
            * @method start
            */
            Keyboard.prototype.start = function () {
                var _this = this;
                if (this.game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    //this._domElement.addEventListener('keydown', (event:KeyboardEvent) => this.onKeyDown(event), false);
                    //this._domElement.addEventListener('keyup', (event:KeyboardEvent) => this.onKeyUp(event), false);
                    document.body.addEventListener('keydown', function (event) {
                        return _this.onKeyDown(event);
                    }, false);
                    document.body.addEventListener('keyup', function (event) {
                        return _this.onKeyUp(event);
                    }, false);
                }
            };

            /**
            *
            * @method stop
            */
            Keyboard.prototype.stop = function () {
                var _this = this;
                if (this.game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    //this._domElement.removeEventListener('keydown', (event:KeyboardEvent) => this.onKeyDown(event), false);
                    //this._domElement.removeEventListener('keyup', (event:KeyboardEvent) => this.onKeyUp(event), false);
                    this._domElement.removeEventListener('keydown', function (event) {
                        return _this.onKeyDown(event);
                    }, false);
                    this._domElement.removeEventListener('keyup', function (event) {
                        return _this.onKeyUp(event);
                    }, false);
                }
            };

            /**
            *
            * @method onKeyDown
            * @param {KeyboardEvent} event.
            */
            Keyboard.prototype.onKeyDown = function (event) {
                if (this._keys[event.keyCode]) {
                    this._keys[event.keyCode].update(event);
                } else {
                    //  TODO - This could create loads of objects we could safely ignore (one for each key)
                    this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
                }
            };

            /**
            *
            * @method onKeyUp
            * @param {Any} event.
            */
            Keyboard.prototype.onKeyUp = function (event) {
                if (this._keys[event.keyCode]) {
                    this._keys[event.keyCode].update(event);
                } else {
                    //  TODO - This could create loads of objects we could safely ignore (one for each key)
                    this._keys[event.keyCode] = new Kiwi.Input.Key(this, event.keyCode, event);
                }
            };

            /**
            *
            * @method addKey
            * @param {Number} keycode.
            * @return {Kiwi.Input.Key}
            */
            Keyboard.prototype.addKey = function (keycode) {
                return this._keys[keycode] = new Kiwi.Input.Key(this, keycode);
            };

            /**
            *
            * @method justPressed
            * @param {Any} key
            */
            Keyboard.prototype.justPressed = function (key) {
            };

            /**
            *
            * @method justReleased
            * @param {Any} key
            */
            Keyboard.prototype.justReleased = function (key) {
            };

            /**
            *
            * @method isDown
            * @param {Number} keycode
            * @return {Boolean}
            */
            Keyboard.prototype.isDown = function (keycode) {
                if (this._keys[keycode]) {
                    return this._keys[keycode].isDown;
                } else {
                    return false;
                }
            };

            /**
            *
            * @method isUp
            * @param {Number} keycode
            * @return {Boolean}
            */
            Keyboard.prototype.isUp = function (keycode) {
                if (this._keys[keycode]) {
                    return this._keys[keycode].isUp;
                } else {
                    return false;
                }
            };

            Keyboard.prototype.reset = function () {
            };
            return Keyboard;
        })();
        Input.Keyboard = Keyboard;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        *
        * @class Keycodes
        *
        */
        var Keycodes = (function () {
            function Keycodes() {
            }
            Keycodes.prototype.objType = function () {
                return "Keycodes";
            };

            Keycodes.A = "A".charCodeAt(0);
            Keycodes.B = "B".charCodeAt(0);
            Keycodes.C = "C".charCodeAt(0);
            Keycodes.D = "D".charCodeAt(0);
            Keycodes.E = "E".charCodeAt(0);
            Keycodes.F = "F".charCodeAt(0);
            Keycodes.G = "G".charCodeAt(0);
            Keycodes.H = "H".charCodeAt(0);
            Keycodes.I = "I".charCodeAt(0);
            Keycodes.J = "J".charCodeAt(0);
            Keycodes.K = "K".charCodeAt(0);
            Keycodes.L = "L".charCodeAt(0);
            Keycodes.M = "M".charCodeAt(0);
            Keycodes.N = "N".charCodeAt(0);
            Keycodes.O = "O".charCodeAt(0);
            Keycodes.P = "P".charCodeAt(0);
            Keycodes.Q = "Q".charCodeAt(0);
            Keycodes.R = "R".charCodeAt(0);
            Keycodes.S = "S".charCodeAt(0);
            Keycodes.T = "T".charCodeAt(0);
            Keycodes.U = "U".charCodeAt(0);
            Keycodes.V = "V".charCodeAt(0);
            Keycodes.W = "W".charCodeAt(0);
            Keycodes.X = "X".charCodeAt(0);
            Keycodes.Y = "Y".charCodeAt(0);
            Keycodes.Z = "Z".charCodeAt(0);

            Keycodes.ZERO = "0".charCodeAt(0);
            Keycodes.ONE = "1".charCodeAt(0);
            Keycodes.TWO = "2".charCodeAt(0);
            Keycodes.THREE = "3".charCodeAt(0);
            Keycodes.FOUR = "4".charCodeAt(0);
            Keycodes.FIVE = "5".charCodeAt(0);
            Keycodes.SIX = "6".charCodeAt(0);
            Keycodes.SEVEN = "7".charCodeAt(0);
            Keycodes.EIGHT = "8".charCodeAt(0);
            Keycodes.NINE = "9".charCodeAt(0);

            Keycodes.NUMPAD_0 = 96;
            Keycodes.NUMPAD_1 = 97;
            Keycodes.NUMPAD_2 = 98;
            Keycodes.NUMPAD_3 = 99;
            Keycodes.NUMPAD_4 = 100;
            Keycodes.NUMPAD_5 = 101;
            Keycodes.NUMPAD_6 = 102;
            Keycodes.NUMPAD_7 = 103;
            Keycodes.NUMPAD_8 = 104;
            Keycodes.NUMPAD_9 = 105;
            Keycodes.NUMPAD_MULTIPLY = 106;
            Keycodes.NUMPAD_ADD = 107;
            Keycodes.NUMPAD_ENTER = 108;
            Keycodes.NUMPAD_SUBTRACT = 109;
            Keycodes.NUMPAD_DECIMAL = 110;
            Keycodes.NUMPAD_DIVIDE = 111;

            Keycodes.F1 = 112;
            Keycodes.F2 = 113;
            Keycodes.F3 = 114;
            Keycodes.F4 = 115;
            Keycodes.F5 = 116;
            Keycodes.F6 = 117;
            Keycodes.F7 = 118;
            Keycodes.F8 = 119;
            Keycodes.F9 = 120;
            Keycodes.F10 = 121;
            Keycodes.F11 = 122;
            Keycodes.F12 = 123;
            Keycodes.F13 = 124;
            Keycodes.F14 = 125;
            Keycodes.F15 = 126;

            Keycodes.COLON = 186;
            Keycodes.EQUALS = 187;
            Keycodes.UNDERSCORE = 189;
            Keycodes.QUESTION_MARK = 191;
            Keycodes.TILDE = 192;
            Keycodes.OPEN_BRACKET = 219;
            Keycodes.BACKWARD_SLASH = 220;
            Keycodes.CLOSED_BRACKET = 221;
            Keycodes.QUOTES = 222;

            Keycodes.BACKSPACE = 8;
            Keycodes.TAB = 9;
            Keycodes.CLEAR = 12;
            Keycodes.ENTER = 13;
            Keycodes.SHIFT = 16;
            Keycodes.CONTROL = 17;
            Keycodes.ALT = 18;
            Keycodes.CAPS_LOCK = 20;
            Keycodes.ESC = 27;
            Keycodes.SPACEBAR = 32;
            Keycodes.PAGE_UP = 33;
            Keycodes.PAGE_DOWN = 34;
            Keycodes.END = 35;
            Keycodes.HOME = 36;
            Keycodes.LEFT = 37;
            Keycodes.UP = 38;
            Keycodes.RIGHT = 39;
            Keycodes.DOWN = 40;
            Keycodes.INSERT = 45;
            Keycodes.DELETE = 46;
            Keycodes.HELP = 47;
            Keycodes.NUM_LOCK = 144;
            return Keycodes;
        })();
        Input.Keycodes = Keycodes;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        * @class Manager
        *
        */
        var Manager = (function () {
            /**
            * Constructor
            * @param {Kiwi.Game} game.
            * @return {Kiwi.Input.Manager} This object.
            */
            function Manager(game) {
                this.game = game;
            }
            /**
            * The type of object this is.
            * @method objType
            */
            Manager.prototype.objType = function () {
                return "Manager";
            };

            Object.defineProperty(Manager.prototype, "pointers", {
                get: function () {
                    return this._pointers;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * The DOM is ready, so we can start the managers listening now
            * @method boot
            */
            Manager.prototype.boot = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch = new Kiwi.Input.Touch(this.game);
                    this.touch.boot();
                    this.touch.touchDown.add(this._onDownEvent, this);
                    this.touch.touchUp.add(this._onUpEvent, this);
                    this._pointers = this.touch.fingers;
                } else {
                    this.mouse = new Kiwi.Input.Mouse(this.game);
                    this.mouse.boot();
                    this.mouse.mouseDown.add(this._onDownEvent, this);
                    this.mouse.mouseUp.add(this._onUpEvent, this);
                    this._pointers = [this.mouse.cursor];
                    this.keyboard = new Kiwi.Input.Keyboard(this.game);
                    this.keyboard.boot();
                }

                this.isDown = false;
                this.position = new Kiwi.Geom.Point();

                this.onDown = new Kiwi.Signal();
                this.onUp = new Kiwi.Signal();
            };

            /**
            * A private method that gets dispatched when either the mouse or touch manager dispatches a down event
            * @method _onDownEvent
            * @param {Number} x
            * @param {Number} y
            * @param {Number} timeDown
            * @param {Number} timeUp
            * @param {Number} duration
            * @param {Kiwi.Input.Pointer} pointer
            */
            Manager.prototype._onDownEvent = function (x, y, timeDown, timeUp, duration, pointer) {
                this.onDown.dispatch(x, y, timeDown, timeUp, duration, pointer);
            };

            /**
            * A private method that gets dispatched when either the mouse or touch manager dispatches a up event
            * @method _onUpEvent
            * @param {Number} x
            * @param {Number} y
            * @param {Number} timeDown
            * @param {Number} timeUp
            * @param {Number} duration
            * @param {Kiwi.Input.Pointer} pointer
            */
            Manager.prototype._onUpEvent = function (x, y, timeDown, timeUp, duration, pointer) {
                this.onUp.dispatch(x, y, timeDown, timeUp, duration, pointer);
            };

            Object.defineProperty(Manager.prototype, "onPressed", {
                get: /*
                * An alias for the onPress signal that goes straight to the onDown.
                */
                function () {
                    return this.onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Manager.prototype, "onReleased", {
                get: /**
                * An alias for the onRelease signal that goes straight to the onUp
                */
                function () {
                    return this.onUp;
                },
                enumerable: true,
                configurable: true
            });

            /**
            *
            * @method update
            */
            Manager.prototype.update = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch.update();
                    this.position.setTo(this.touch.x, this.touch.y);
                    this.isDown = this.touch.isDown;
                } else {
                    this.keyboard.update();
                    this.mouse.update();
                    this.position.setTo(this.mouse.x, this.mouse.y);
                    this.isDown = this.mouse.isDown;
                }
            };

            /**
            *
            * @method reset
            */
            Manager.prototype.reset = function () {
                if (Kiwi.DEVICE.touch === true) {
                    this.touch.reset();
                } else {
                    this.mouse.reset();
                    this.keyboard.reset();
                }
            };

            Object.defineProperty(Manager.prototype, "x", {
                get: /**
                * Populated x coordinate based on the most recent click/touch event
                * @property x
                * @type Number
                */
                function () {
                    return this.position.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Manager.prototype, "y", {
                get: /**
                * Populated y coordinate based on the most recent click/touch event
                * @property y
                * @type Number
                */
                function () {
                    return this.position.y;
                },
                enumerable: true,
                configurable: true
            });
            return Manager;
        })();
        Input.Manager = Manager;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        *
        * @class Mouse
        *
        */
        var Mouse = (function () {
            function Mouse(game) {
                this._domElement = null;
                this._game = game;
            }
            Mouse.prototype.objType = function () {
                return "Mouse";
            };

            Object.defineProperty(Mouse.prototype, "cursor", {
                get: function () {
                    return this._cursor;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * The DOM is ready, so we can start listening now
            * @method boot
            */
            Mouse.prototype.boot = function () {
                this._domElement = this._game.stage.container;

                this._cursor = new Kiwi.Input.MouseCursor(this._game);
                this._cursor.active = true;
                this._cursor.id = 1;

                this.mouseDown = new Kiwi.Signal();
                this.mouseUp = new Kiwi.Signal();
                this.mouseWheel = new Kiwi.Signal();

                this.start();
            };

            Object.defineProperty(Mouse.prototype, "isDown", {
                get: /*
                * The massive amount of atlases.
                */
                function () {
                    return this._cursor.isDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "isUp", {
                get: function () {
                    return this._cursor.isUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "duration", {
                get: function () {
                    return this._cursor.duration;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "x", {
                get: function () {
                    return this._cursor.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "y", {
                get: function () {
                    return this._cursor.y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "wheelDeltaX", {
                get: function () {
                    return this._cursor.wheelDeltaX;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "wheelDeltaY", {
                get: function () {
                    return this._cursor.wheelDeltaY;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "ctrlKey", {
                get: function () {
                    return this._cursor.ctrlKey;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "shiftKey", {
                get: function () {
                    return this._cursor.shiftKey;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "altKey", {
                get: function () {
                    return this._cursor.altKey;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Mouse.prototype, "button", {
                get: function () {
                    return this._cursor.button;
                },
                enumerable: true,
                configurable: true
            });

            Mouse.prototype.update = function () {
                this._cursor.update();
            };

            /**
            * @method start
            */
            Mouse.prototype.start = function () {
                var _this = this;
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    if (Kiwi.DEVICE.ie && Kiwi.DEVICE.ieVersion < 9) {
                        this._domElement.attachEvent('onmousedown', function (event) {
                            return _this.onMouseDown(event);
                        });
                        this._domElement.attachEvent('onmousemove', function (event) {
                            return _this.onMouseMove(event);
                        });
                        this._domElement.attachEvent('onmouseup', function (event) {
                            return _this.onMouseUp(event);
                        });
                        this._domElement.attachEvent('onmousewheel', function (event) {
                            return _this.onMouseWheel(event);
                        });
                    } else {
                        this._domElement.addEventListener('mousedown', function (event) {
                            return _this.onMouseDown(event);
                        }, true);
                        this._domElement.addEventListener('mousemove', function (event) {
                            return _this.onMouseMove(event);
                        }, true);
                        this._domElement.addEventListener('mouseup', function (event) {
                            return _this.onMouseUp(event);
                        }, true);
                        this._domElement.addEventListener('mousewheel', function (event) {
                            return _this.onMouseWheel(event);
                        }, true);
                        this._domElement.addEventListener('DOMMouseScroll', function (event) {
                            return _this.onMouseWheel(event);
                        }, true);
                    }
                }
            };

            /**
            * @method stop
            */
            Mouse.prototype.stop = function () {
                var _this = this;
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this._domElement.removeEventListener('mousedown', function (event) {
                        return _this.onMouseDown(event);
                    }, false);
                    this._domElement.removeEventListener('mousedown', this.onMouseDown, false);
                    this._domElement.removeEventListener('mousemove', this.onMouseMove, false);
                    this._domElement.removeEventListener('mouseup', this.onMouseUp, false);
                    this._domElement.removeEventListener('mousewheel', this.onMouseWheel, false);
                    this._domElement.removeEventListener('DOMMouseScroll', this.onMouseWheel, false);
                }
            };

            /**
            * @method onMouseDown
            * @param {MouseEvent} event.
            */
            Mouse.prototype.onMouseDown = function (event) {
                this._cursor.start(event);
                this.mouseDown.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor);
            };

            /**
            * @method onMouseMove
            * @param {MouseEvent} event.
            */
            Mouse.prototype.onMouseMove = function (event) {
                this._cursor.move(event);
            };

            /**
            * @method onMouseUp
            * @param {MouseEvent} event.
            */
            Mouse.prototype.onMouseUp = function (event) {
                this._cursor.stop(event);
                this.mouseUp.dispatch(this._cursor.x, this._cursor.y, this._cursor.timeDown, this._cursor.timeUp, this.duration, this._cursor);
            };

            /**
            * @method onMouseWheel
            * @param {MouseEvent} event.
            */
            Mouse.prototype.onMouseWheel = function (event) {
                this._cursor.wheel(event);
                this.mouseWheel.dispatch(this._cursor.wheelDeltaX, this._cursor.wheelDeltaY, this._cursor);
            };

            /**
            * @method justPressed
            * @param {Number} [duration].
            * @return {Boolean}
            */
            Mouse.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this._cursor.justPressedRate; }
                return this._cursor.justPressed(duration);
            };

            /**
            * @method justReleased
            * @param {Number} [duration].
            * @return {Boolean}
            */
            Mouse.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this._cursor.justReleasedRate; }
                return this._cursor.justReleased(duration);
            };

            /**
            * @method reset
            */
            Mouse.prototype.reset = function () {
                this._cursor.reset();
            };
            Mouse.LEFT_BUTTON = 0;

            Mouse.MIDDLE_BUTTON = 1;

            Mouse.RIGHT_BUTTON = 2;
            return Mouse;
        })();
        Input.Mouse = Mouse;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        * @class Touch
        *
        */
        var Touch = (function () {
            /**
            * Constructor
            * @param {Kiwi.Game} game.
            * @return {Kiwi.Input.Touch} This object.
            */
            function Touch(game) {
                /**
                * The dom element that these touch events are to take place on. This is usally set to be the stage/game container.
                * @property _domElement
                * @type HTMLElement
                * @default null
                * @private
                **/
                this._domElement = null;
                /**
                * A boolean that will roughly indicate if any finger is currently down.
                * @property isDown
                * @type Boolean
                * @default false
                * @public
                */
                this.isDown = false;
                /**
                * If all the fingers are up.
                * @property isUp
                * @type Boolean
                * @default true
                * @public
                */
                this.isUp = true;
                /**
                * The developer defined maximum number of touch events. By default this is set to 10 but this can be set to be lower.
                * @property _maxTouchEvents
                * @type number
                * @default 10
                * @private
                */
                this._maxPointers = 10;
                this._game = game;
            }
            /**
            * The type of object that this is.
            * @method objType
            * @return String
            * @public
            */
            Touch.prototype.objType = function () {
                return 'TouchManager';
            };

            Object.defineProperty(Touch.prototype, "fingers", {
                get: /**
                * Get the fingers that are being used.
                * @type Kiwi.Input.Finger[]
                * @public
                */
                function () {
                    return this._fingers;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * An internal Kiwi method that runs when the DOM is loaded and the touch manager can now 'boot' up.
            * @method boot
            * @public
            */
            Touch.prototype.boot = function () {
                this._domElement = this._game.stage.container;

                this.finger1 = new Kiwi.Input.Finger(this._game);
                this.finger2 = new Kiwi.Input.Finger(this._game);
                this.finger3 = new Kiwi.Input.Finger(this._game);
                this.finger4 = new Kiwi.Input.Finger(this._game);
                this.finger5 = new Kiwi.Input.Finger(this._game);
                this.finger6 = new Kiwi.Input.Finger(this._game);
                this.finger7 = new Kiwi.Input.Finger(this._game);
                this.finger8 = new Kiwi.Input.Finger(this._game);
                this.finger9 = new Kiwi.Input.Finger(this._game);
                this.finger10 = new Kiwi.Input.Finger(this._game);

                this._fingers = [this.finger1, this.finger2, this.finger3, this.finger4, this.finger5, this.finger6, this.finger7, this.finger8, this.finger9, this.finger10];
                this.latestFinger = this.finger1;

                this.touchDown = new Kiwi.Signal();
                this.touchUp = new Kiwi.Signal();
                this.touchCancel = new Kiwi.Signal();

                this.start();
            };

            /**
            * Starts up the event listeners that are being used on the touch manager.
            * @method start
            * @public
            */
            Touch.prototype.start = function () {
                var _this = this;
                if (this._game.deviceTargetOption === Kiwi.TARGET_BROWSER) {
                    this._domElement.addEventListener('touchstart', function (event) {
                        return _this.onTouchStart(event);
                    }, false);
                    this._domElement.addEventListener('touchmove', function (event) {
                        return _this.onTouchMove(event);
                    }, false);
                    this._domElement.addEventListener('touchend', function (event) {
                        return _this.onTouchEnd(event);
                    }, false);
                    this._domElement.addEventListener('touchenter', function (event) {
                        return _this.onTouchEnter(event);
                    }, false);
                    this._domElement.addEventListener('touchleave', function (event) {
                        return _this.onTouchLeave(event);
                    }, false);
                    this._domElement.addEventListener('touchcancel', function (event) {
                        return _this.onTouchCancel(event);
                    }, false);

                    document.addEventListener('touchmove', function (event) {
                        return _this.consumeTouchMove(event);
                    }, false);
                }
                //cocoon events need to be added here... These should hopefully just be through the window
            };

            /**
            * Prevent iOS bounce-back (doesn't work?)
            * @method consumeTouchMove
            * @param {Any} event
            * @public
            */
            Touch.prototype.consumeTouchMove = function (event) {
                event.preventDefault();
            };

            Object.defineProperty(Touch.prototype, "x", {
                get: /**
                * Gets the position of the latest finger on the x axis.
                * @type number
                * @public
                */
                function () {
                    return this.latestFinger.x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Touch.prototype, "y", {
                get: /**
                * Gets the position of the latest finger on the y axis.
                * @type number
                * @public
                */
                function () {
                    return this.latestFinger.y;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Touch.prototype, "maximumPointers", {
                get: /**
                * Gets the maximum number of points of contact that are allowed on the game stage at one point.
                * @type number
                * @public
                */
                function () {
                    return this._maxPointers;
                },
                set: /**
                * Sets the maximum number of point of contact that are allowed on the game stage at one point.
                * The maximum number of points that are allowed is 10, and the minimum is 0.
                * @type number
                * @public
                */
                function (val) {
                    if (val < 0)
                        val = 1;
                    if (val > this._fingers.length)
                        val = this._fingers.length;

                    this._maxPointers = val;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * This method runs when the a touch start event is fired by the browser and then assigns the event to a pointer that is currently not active.
            * @method onTouchStart
            * @param {Any} event
            * @private
            */
            Touch.prototype.onTouchStart = function (event) {
                event.preventDefault();

                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._maxPointers; f++) {
                        if (this._fingers[f].active === false) {
                            this._fingers[f].start(event.changedTouches[i]);
                            this.latestFinger = this._fingers[f];

                            this.touchDown.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);

                            this.isDown = true;
                            this.isUp = false;
                            break;
                        }
                    }
                }
            };

            /**
            * Doesn't appear to be supported by most browsers yet but if it was it would fire events when a touch is canceled.
            * @method onTouchCancel
            * @param {Any} event
            * @private
            */
            Touch.prototype.onTouchCancel = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].stop(event.changedTouches[i]);
                            this.touchCancel.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);
                            break;
                        }
                    }
                }
            };

            /**
            * Doesn't appear to be supported by most browsers yet. But if it was would fire events when touch events enter an element.
            * @method onTouchEnter
            * @param {Any} event
            * @private
            */
            Touch.prototype.onTouchEnter = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._maxPointers; f++) {
                        if (this._fingers[f].active === false) {
                            this._fingers[f].start(event.changedTouches[i]);
                            break;
                        }
                    }
                }
            };

            /**
            * Doesn't appear to be supported by most browsers yet. Would fire events when a 'finger' leaves an element.
            * Would be handly for when an finger 'leaves' the stage.
            * @method onTouchLeave
            * @param {Any} event
            * @private
            */
            Touch.prototype.onTouchLeave = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].leave(event.changedTouches[i]);
                            break;
                        }
                    }
                }
            };

            /**
            * When a touch pointer moves. This method updates the appropriate pointer.
            * @method onTouchMove
            * @param {Any} event
            * @private
            */
            Touch.prototype.onTouchMove = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].move(event.changedTouches[i]);
                            this.latestFinger = this._fingers[f];
                            break;
                        }
                    }
                }
            };

            /**
            * When a touch event gets released.
            * @method onTouchEnd
            * @param {Any} event
            * @private
            */
            Touch.prototype.onTouchEnd = function (event) {
                for (var i = 0; i < event.changedTouches.length; i++) {
                    for (var f = 0; f < this._fingers.length; f++) {
                        if (this._fingers[f].id === event.changedTouches[i].identifier) {
                            this._fingers[f].stop(event.changedTouches[i]);
                            this.latestFinger = this._fingers[f];

                            this.touchUp.dispatch(this._fingers[f].x, this._fingers[f].y, this._fingers[f].timeDown, this._fingers[f].timeUp, this._fingers[f].duration, this._fingers[f]);

                            this.isDown = false;
                            this.isUp = true;
                            break;
                        }
                    }
                }

                for (var i = 0; i < this._fingers.length; i++) {
                    if (this._fingers[i].active) {
                        this.isDown = true;
                        this.isUp = false;
                    }
                }
            };

            /**
            * The update loop fro the touch manager.
            * @method update
            * @public
            */
            Touch.prototype.update = function () {
                if (this.isDown) {
                    for (var i = 0; i < this._fingers.length; i++) {
                        if (this._fingers[i].active) {
                            this._fingers[i].update();
                        }
                    }
                }
            };

            /**
            * This method removes all of the event listeners and thus 'stops' the touch manager.
            * @method stop
            * @public
            */
            Touch.prototype.stop = function () {
                var _this = this;
                this._domElement.removeEventListener('touchstart', function (event) {
                    return _this.onTouchStart(event);
                }, false);
                this._domElement.removeEventListener('touchmove', function (event) {
                    return _this.onTouchMove(event);
                }, false);
                this._domElement.removeEventListener('touchend', function (event) {
                    return _this.onTouchEnd(event);
                }, false);
                this._domElement.removeEventListener('touchenter', function (event) {
                    return _this.onTouchEnter(event);
                }, false);
                this._domElement.removeEventListener('touchleave', function (event) {
                    return _this.onTouchLeave(event);
                }, false);
                this._domElement.removeEventListener('touchcancel', function (event) {
                    return _this.onTouchCancel(event);
                }, false);
            };

            /**
            * Resets all of the fingers/pointers to their default states.
            * @method reset
            * @public
            */
            Touch.prototype.reset = function () {
                for (var i = 0; i < this._fingers.length; i++) {
                    this._fingers[i].reset();
                }
            };
            return Touch;
        })();
        Input.Touch = Touch;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        *
        * @class Pointer
        *
        */
        var Pointer = (function () {
            /**
            *
            * @method constructor
            * @param {Kiwi.Game} game
            * @return Kiwi.Input.Pointer
            */
            function Pointer(game) {
                /**
                * The horizontal coordinate of point relative to the game element
                * @property x
                * @type Number
                * @default -1
                * @public
                */
                this.x = -1;
                /**
                * The vertical coordinate of point relative to the game element
                * @property y
                * @type Number
                * @default -1
                * @public
                */
                this.y = -1;
                /**
                * The horizontal coordinate of point relative to the viewport in pixels, excluding any scroll offset
                * @property clientX
                * @type Number
                * @default -1
                * @public
                */
                this.clientX = -1;
                /**
                * The vertical coordinate of point relative to the viewport in pixels, excluding any scroll offset
                * @property clientY
                * @type Number
                * @default -1
                * @public
                */
                this.clientY = -1;
                /**
                * The horizontal coordinate of point relative to the viewport in pixels, including any scroll offset
                * @property pageX
                * @type Number
                * @default -1
                * @public
                */
                this.pageX = -1;
                /**
                * The vertical coordinate of point relative to the viewport in pixels, including any scroll offset
                * @property pageY
                * @type Number
                * @default -1
                * @public
                */
                this.pageY = -1;
                /**
                * The horizontal coordinate of point relative to the screen in pixels
                * @property screenX
                * @type Number
                * @default -1
                * @public
                */
                this.screenX = -1;
                /**
                * The vertical coordinate of point relative to the screen in pixels
                * @property screenY
                * @type Number
                * @default -1
                * @public
                */
                this.screenY = -1;
                /**
                * Indicates if this pointer is currently down.
                * @property isDown
                * @type boolean
                * @default false
                * @public
                */
                this.isDown = false;
                /**
                * Indicates if this pointer is currently up.
                * @property isUp
                * @default true
                * @type boolean
                * @public
                */
                this.isUp = true;
                /**
                * Indicates if this pointer is currently within the game.
                * @property withinGame
                * @type boolean
                * @default false
                * @public
                */
                this.withinGame = false;
                /**
                * Indicates if this pointer is active. Note a mouse is always 'active' where as a finger is only active when it is down.
                * @property active
                * @type boolean
                * @default false
                * @public
                */
                this.active = false;
                /**
                * Indicates the time that the pointer was pressed initially.
                * @property timeDown
                * @type number
                * @default 0
                * @public
                */
                this.timeDown = 0;
                /**
                * Indicates the time that the pointer was released initially.
                * @property timeUp
                * @type number
                * @default 0
                * @public
                */
                this.timeUp = 0;
                /**
                * The duration that the pointer has been down for in milliseconds.
                * @property duration
                * @type number
                * @default 0
                * @public
                */
                this.duration = 0;
                /**
                * The duration that the pointer has been down for in frames.
                * @property frameDuration
                * @type number
                * @default 0
                * @public
                */
                this.frameDuration = 0;
                /**
                * A time that is used to calculate if someone justPressed the pointer.
                * @property justPressedRate
                * @type number
                * @defeault 200
                * @public
                */
                this.justPressedRate = 200;
                /**
                * A time that is used to calculate if someone justReleased the pointer.
                * @property justReleasedRate
                * @type number
                * @default 200
                * @public
                */
                this.justReleasedRate = 200;
                this._game = game;
                this.point = new Kiwi.Geom.Point();
                this.circle = new Kiwi.Geom.Circle(0, 0, 1);
                this.startPoint = new Kiwi.Geom.Point();
                this.endPoint = new Kiwi.Geom.Point();
            }
            /**
            * The type of object this class is.
            * @method objType
            * @return {string}
            * @public
            */
            Pointer.prototype.objType = function () {
                return 'Pointer';
            };

            Object.defineProperty(Pointer.prototype, "game", {
                get: /**
                * Get the game that this pointer belongs to.
                * @type Kiwi.Game
                * @public
                */
                function () {
                    return this._game;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * The method that gets executed when the pointer presses/initially goes down on the screen.
            * From the event passed the coordinates are calculated.
            * @method start
            * @param {event} event
            * @public
            */
            Pointer.prototype.start = function (event) {
                this.move(event);
                this.startPoint.setTo(this.x, this.y);
                this.frameDuration = 0;
                this.withinGame = true;
                this.isDown = true;
                this.isUp = false;
                this.timeDown = this.game.time.now();
            };

            /**
            * The stop method is to be called when the pointer gets released initially.
            * @method stop
            * @param {event} event
            * @public
            */
            Pointer.prototype.stop = function (event) {
                this.withinGame = false;
                this.endPoint.setTo(this.x, this.y);
                this.isDown = false;
                this.isUp = true;

                this.timeUp = this.game.time.now();
                this.duration = this.timeUp - this.timeDown;
            };

            /**
            * Used to get the cooridnates of a pointer and inputs them to the correct properties.
            * @method move
            * @param {event} event
            * @public
            */
            Pointer.prototype.move = function (event) {
                this.clientX = event.clientX;
                this.clientY = event.clientY;

                this.pageX = event.pageX;
                this.pageY = event.pageY;

                this.screenX = event.screenX;
                this.screenY = event.screenY;

                this.x = this.pageX - this.game.stage.offset.x;
                this.y = this.pageY - this.game.stage.offset.y;

                this.point.setTo(this.x, this.y);
                this.circle.x = this.x;
                this.circle.y = this.y;

                this.duration = this.game.time.now() - this.timeDown;
            };

            /**
            * Indicates if the pointer was just pressed. This is based of the justPressedRate unless otherwise specifieds.
            * @method justPressed
            * @param {number} duration
            * @return bool
            * @public
            */
            Pointer.prototype.justPressed = function (duration) {
                if (typeof duration === "undefined") { duration = this.justPressedRate; }
                if (this.isDown === true && (this.timeDown + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Indicates if the pointer was just released. This is based of the justReleasedRate unless otherwise specified.
            * @method justReleased
            * @param {number} duration
            * @return bool
            * @public
            */
            Pointer.prototype.justReleased = function (duration) {
                if (typeof duration === "undefined") { duration = this.justReleasedRate; }
                if (this.isUp === true && (this.timeUp + duration) > this._game.time.now()) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Resets the pointer properties to the default ones. Assumes that the pointer is no longer down.
            * @method reset
            * @public
            */
            Pointer.prototype.reset = function () {
                this.isDown = false;
                this.isUp = true;
                this.timeDown = 0;
                this.timeUp = 0;
                this.duration = 0;
                this.frameDuration = 0;
            };

            /**
            * The update loop for the pointer. Used only if down to update the duration.
            * @method update.
            * @public
            */
            Pointer.prototype.update = function () {
                if (this.isDown === true) {
                    this.frameDuration++;
                    this.duration = this._game.time.now() - this.timeDown;
                }
            };
            return Pointer;
        })();
        Input.Pointer = Pointer;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        *
        * @class MouseCursor
        * @extends Pointer
        */
        var MouseCursor = (function (_super) {
            __extends(MouseCursor, _super);
            function MouseCursor() {
                _super.apply(this, arguments);
                /**
                * The offset of the mouse wheel on the X axis.
                * @property wheelDeltaX
                * @type number
                * @default 0
                * @public
                */
                this.wheelDeltaX = 0;
                /**
                * The offset of the mouse wheel on the Y axis.
                * @property wheelDeltaY
                * @type number
                * @default 0
                * @public
                */
                this.wheelDeltaY = 0;
            }
            /**
            * The type of object this class is.
            * @method objType
            * @return string
            * @public
            */
            MouseCursor.prototype.objType = function () {
                return 'MouseCursor';
            };

            /**
            * Gets executed when the mouse cursor gets initally pressed.
            * @method start
            * @param {event} event
            * @public
            */
            MouseCursor.prototype.start = function (event) {
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;
                this.altKey = event.altKey;
                this.button - event.button;

                _super.prototype.start.call(this, event);
            };

            /**
            * Gets executed when the mouse cursor gets initally released.
            * @method stop
            * @param {event} event
            * @public
            */
            MouseCursor.prototype.stop = function (event) {
                this.move(event);
                _super.prototype.stop.call(this, event);
            };

            /**
            * When the mouse wheel event fires and the mouse's delta changes.
            * @method wheel
            * @param {event} event
            * @public
            */
            MouseCursor.prototype.wheel = function (event) {
                if (event['wheelDeltaX']) {
                    this.wheelDeltaX = event['wheelDeltaX'];
                } else {
                    this.wheelDeltaX = event.deltaX;
                }

                if (event['wheelDeltaY']) {
                    this.wheelDeltaY = event['wheelDeltaY'];
                } else {
                    this.wheelDeltaY = event.deltaY;
                }
            };
            return MouseCursor;
        })(Input.Pointer);
        Input.MouseCursor = MouseCursor;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Input
    * @module Kiwi
    * @submodule Input
    *
    */
    (function (Input) {
        /**
        *
        * @class Finger
        * @extends Pointer
        */
        var Finger = (function (_super) {
            __extends(Finger, _super);
            /**
            *
            * @method constructor
            * @param {Kiwi.Game}
            * @return Kiwi.Input.Finger
            */
            function Finger(game) {
                _super.call(this, game);
                this.circle.diameter = 44;
            }
            /**
            * The type of object this is.
            * @method objType
            * @return string
            * @public
            */
            Finger.prototype.objType = function () {
                return 'Finger';
            };

            /**
            * @method start
            * @param {Any} event
            * @public
            */
            Finger.prototype.start = function (event) {
                this.id = event.identifier;
                this.active = true;
                _super.prototype.start.call(this, event);
            };

            /**
            * @method stop
            * @param {Any} event
            * @public
            */
            Finger.prototype.stop = function (event) {
                this.active = false;
                _super.prototype.stop.call(this, event);
            };

            /**
            * @method leave
            * @param {Any} event
            * @public
            */
            Finger.prototype.leave = function (event) {
                this.withinGame = false;
                this.move(event);
            };

            /**
            * @method reset
            * @public
            */
            Finger.prototype.reset = function () {
                this.active = false;
                _super.prototype.reset.call(this);
            };
            return Finger;
        })(Input.Pointer);
        Input.Finger = Finger;
    })(Kiwi.Input || (Kiwi.Input = {}));
    var Input = Kiwi.Input;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Plugins) {
        (function (Gamefroot) {
            var TileMapConverter = (function () {
                function TileMapConverter(jsonData, imageData) {
                    this._gfData = JSON.parse(jsonData);
                    this._gfImg = imageData;
                    this.kiwiData = {
                        "version": 1,
                        "height": 0,
                        "width": 0,
                        "tileheight": TileMapConverter.GF_TILE_WIDTH,
                        "tilewidth": TileMapConverter.GF_TILE_HEIGHT,
                        "orientation": "orthogonal",
                        "layers": [],
                        "tilesets": [],
                        "properties": {}
                    };
                }
                TileMapConverter.prototype.convert = function () {
                    this._convertWidthHeight();
                    this._convertTilesets();
                    this._convertLayers();
                };

                TileMapConverter.prototype._convertWidthHeight = function () {
                    var terrain = this._gfData.map.terrain;

                    for (var i = 0; i < terrain.length; i++) {
                        if (parseInt(terrain[i].xpos) > this.kiwiData.width)
                            this.kiwiData.width = parseInt(terrain[i].xpos) + 1;
                        if (parseInt(terrain[i].ypos) > this.kiwiData.height)
                            this.kiwiData.height = parseInt(terrain[i].ypos) + 1;
                    }
                };

                TileMapConverter.prototype._convertTilesets = function () {
                    var tileset = {
                        "firstgid": 1,
                        "image": "",
                        "imageheight": 0,
                        "imagewidth": 0,
                        "margin": 0,
                        "name": "",
                        "properties": {},
                        "spacing": 0,
                        "tileheight": 48,
                        "tilewidth": 48
                    };
                    tileset.image = this._gfImg.src;
                    tileset.imagewidth = this._gfImg.width;
                    tileset.imageheight = this._gfImg.height;
                    tileset.name = "gf_tileset";
                    this.kiwiData.tilesets.push(tileset);
                };

                TileMapConverter.prototype._convertLayers = function () {
                    //var terrain = this._gfData.map.terrain;
                    //get background
                    //this.kiwiData.layers.push(this._convertLayer(0));
                    //get terrain
                    this.kiwiData.layers.push(this._convertLayer(1));
                    //get foreground
                    //this.kiwiData.layers.push(this._convertLayer(2));
                };
                TileMapConverter.prototype._convertLayer = function (layerNumber) {
                    var layer = {
                        "name": "gf_layer_" + layerNumber,
                        "data": [],
                        "height": this.kiwiData.height,
                        "width": this.kiwiData.width,
                        "opacity": 1,
                        "type": "tilelayer",
                        "visible": true,
                        "x": 0,
                        "y": 0
                    };

                    //fill empty
                    var totalTiles = layer.width * layer.height;
                    for (var i = 0; i < totalTiles; i++) {
                        layer.data.push(0);
                    }
                    var tilesPerRow = this.kiwiData.tilesets[0].imagewidth / TileMapConverter.GF_TILE_WIDTH;
                    var tilesPerColumn = this.kiwiData.tilesets[0].imageheight / TileMapConverter.GF_TILE_HEIGHT;

                    var terrain = this._gfData.map.terrain;

                    var count = 0;
                    for (var i = 0; i < terrain.length; i++) {
                        if (terrain[i].zpos === String(layerNumber)) {
                            count++;

                            //get gf xy coords of tile;
                            var x = terrain[i].xpos;
                            var y = terrain[i].ypos;

                            //calculate kiwi data index
                            var dataIndex = y * this.kiwiData.width + x;

                            //get gf sprite id position
                            var gfpos = this._getSpritePosition(terrain[i].animation_id);

                            layer.data[dataIndex] = gfpos + 1;
                            //if (layer.data[dataIndex] == null)
                        }
                    }
                    return layer;
                };

                TileMapConverter.prototype._getSpritePosition = function (id) {
                    var sprites = this._gfData.sprites.animations;
                    var result = -1;
                    for (var i = 0; i < sprites.length; i++) {
                        if (sprites[i].id === String(id)) {
                            return sprites[i].sprite_id;
                        }
                    }

                    return result;
                };
                TileMapConverter.GF_TILE_WIDTH = 48;
                TileMapConverter.GF_TILE_HEIGHT = 48;
                return TileMapConverter;
            })();
            Gamefroot.TileMapConverter = TileMapConverter;
        })(Plugins.Gamefroot || (Plugins.Gamefroot = {}));
        var Gamefroot = Plugins.Gamefroot;
    })(Kiwi.Plugins || (Kiwi.Plugins = {}));
    var Plugins = Kiwi.Plugins;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        // Class
        var CanvasRenderer = (function () {
            function CanvasRenderer(game) {
                this._game = game;
            }
            CanvasRenderer.prototype.boot = function () {
            };

            CanvasRenderer.prototype.objType = function () {
                return "CanvasRenderer";
            };

            CanvasRenderer.prototype._recurse = function (child) {
                if (!child.willRender)
                    return;

                if (child.childType() === Kiwi.GROUP) {
                    for (var i = 0; i < (child).members.length; i++) {
                        this._recurse((child).members[i]);
                    }
                } else {
                    child.render(this._currentCamera);
                }
            };

            CanvasRenderer.prototype.render = function (camera) {
                this._currentCamera = camera;
                var root = this._game.states.current.members;

                //clear
                this._game.stage.ctx.fillStyle = this._game.stage.color;

                this._game.stage.ctx.fillRect(0, 0, this._game.stage.canvas.width, this._game.stage.canvas.height);

                for (var i = 0; i < root.length; i++) {
                    this._recurse(root[i]);
                }
                /*
                
                */
            };
            return CanvasRenderer;
        })();
        Renderers.CanvasRenderer = CanvasRenderer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        // Class
        var GLRenderer = (function () {
            function GLRenderer(game) {
                this._entityCount = 0;
                this._maxItems = 1000;
                this._texApplied = false;
                this._firstPass = true;
                this._currentTextureAtlas = null;
                this._game = game;
            }
            GLRenderer.prototype.boot = function () {
                this._initState();
            };

            GLRenderer.prototype.objType = function () {
                return "GLRenderer";
            };

            /*
            public mvPush() {
            var copy = mat4.create();
            mat4.set(this.mvMatrix, copy);
            this.mvMatrixStack.push(copy);
            }
            
            public mvPop() {
            if (this.mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
            }
            this.mvMatrix = this.mvMatrixStack.pop();
            } */
            GLRenderer.prototype._initState = function () {
                var gl = this._game.stage.gl;
                this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);

                this._shaders = new Renderers.GLShaders(gl);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                this.mvMatrix = mat4.create();
                mat2d.identity(this.mvMatrix);

                //create buffers
                //dynamic
                this._vertBuffer = new Renderers.GLArrayBuffer(gl, 2);
                this._uvBuffer = new Renderers.GLArrayBuffer(gl, 2, Renderers.GLArrayBuffer.squareUVs);

                //static
                this._indexBuffer = new Renderers.GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems));
                this._colorBuffer = new Renderers.GLArrayBuffer(gl, 1, this._generateColors(this._maxItems));

                //use shaders
                this._shaders.use(gl, this._shaders.shaderProgram);

                var prog = this._shaders.texture2DProg;

                gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexColorAttribute, this._colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                //Static Uniforms
                gl.uniform1i(prog.samplerUniform, 0);

                gl.uniform2fv(prog.resolutionUniform, this._stageResolution);
            };

            GLRenderer.prototype.render = function (camera) {
                this._currentCamera = camera;
                var root = this._game.states.current.members;
                var gl = this._game.stage.gl;

                this._entityCount = 0;
                this._vertBuffer.clear();
                this._uvBuffer.clear();

                //clear
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                //set cam matrix uniform
                var prog = this._shaders.texture2DProg;

                var cm = camera.transform.getConcatenatedMatrix();
                var ct = camera.transform;
                this.mvMatrix = new Float32Array([
                    cm.a,
                    cm.b,
                    0,
                    0,
                    cm.c,
                    cm.d,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    cm.tx + ct.rotPointX,
                    cm.ty + ct.rotPointY,
                    0,
                    1
                ]);

                gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);
                gl.uniform2fv(prog.cameraOffsetUniform, new Float32Array([ct.rotPointX, ct.rotPointY]));

                for (var i = 0; i < root.length; i++) {
                    this._recurse(gl, root[i], camera);
                }

                this._flush(gl);

                this._firstPass = false;
            };

            GLRenderer.prototype._recurse = function (gl, child, camera) {
                if (!child.willRender)
                    return;

                if (child.childType() === Kiwi.GROUP) {
                    for (var i = 0; i < (child).members.length; i++) {
                        this._recurse(gl, (child).members[i], camera);
                    }
                } else {
                    if (!this._texApplied) {
                        this._applyTexture(gl, (child).atlas.image);
                        this._texApplied = true;
                        this._currentTextureAtlas = (child).atlas;
                    }

                    if ((child).atlas !== this._currentTextureAtlas) {
                        this._flush(gl);
                        this._entityCount = 0;
                        this._vertBuffer.clear();
                        this._uvBuffer.clear();
                        this._changeTexture(gl, (child).atlas.image);
                        this._currentTextureAtlas = (child).atlas;
                    }
                    this._compileVertices(gl, child, camera);
                    this._compileUVs(gl, child);
                    this._entityCount++;
                }
            };

            GLRenderer.prototype._flush = function (gl) {
                this._vertBuffer.refresh(gl, this._vertBuffer.items);
                this._uvBuffer.refresh(gl, this._uvBuffer.items);
                this._draw(gl);
            };

            GLRenderer.prototype._compileVertices = function (gl, entity, camera) {
                var t = entity.transform;
                var m = t.getConcatenatedMatrix();
                var ct = camera.transform;
                var cm = ct.getConcatenatedMatrix();

                var cell = entity.atlas.cells[entity.cellIndex];

                var pt1 = new Kiwi.Geom.Point(0 - t.rotPointX, 0 - t.rotPointY);
                var pt2 = new Kiwi.Geom.Point(cell.w - t.rotPointX, 0 - t.rotPointY);
                var pt3 = new Kiwi.Geom.Point(cell.w - t.rotPointX, cell.h - t.rotPointY);
                var pt4 = new Kiwi.Geom.Point(0 - t.rotPointX, cell.h - t.rotPointY);

                pt1 = m.transformPoint(pt1);
                pt2 = m.transformPoint(pt2);
                pt3 = m.transformPoint(pt3);
                pt4 = m.transformPoint(pt4);

                /*this._vertBuffer.items.push(t.x, t.y,
                t.x + cell.w, t.y,
                t.x + cell.w, t.y + cell.h,
                t.x, t.y + cell.h);
                */
                this._vertBuffer.items.push(pt1.x + t.rotPointX, pt1.y + t.rotPointY, pt2.x + t.rotPointX, pt2.y + t.rotPointY, pt3.x + t.rotPointX, pt3.y + t.rotPointY, pt4.x + t.rotPointX, pt4.y + t.rotPointY);
            };

            GLRenderer.prototype._compileUVs = function (gl, entity) {
                var t = entity.transform;
                var c = entity.atlas.cells[entity.cellIndex];

                this._uvBuffer.items.push(c.x, c.y, c.x + c.w, c.y, c.x + c.w, c.y + c.h, c.x, c.y + c.h);
            };

            GLRenderer.prototype._applyTexture = function (gl, image) {
                this._texture = new Renderers.GLTexture(gl, image);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
                var prog = this._shaders.texture2DProg;
                gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
            };

            GLRenderer.prototype._changeTexture = function (gl, image) {
                this._texture.refresh(gl, image);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
                var prog = this._shaders.texture2DProg;
                gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
            };

            GLRenderer.prototype._draw = function (gl) {
                gl.drawElements(gl.TRIANGLES, this._entityCount * 6, gl.UNSIGNED_SHORT, 0);
            };

            GLRenderer.prototype._generateIndices = function (numQuads) {
                var quads = new Array();
                for (var i = 0; i < numQuads; i++) {
                    quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
                }
                return quads;
            };

            GLRenderer.prototype._generateColors = function (numVerts) {
                var cols = new Array();
                for (var i = 0; i < numVerts; i++) {
                    cols.push(1);
                }
                return cols;
            };
            return GLRenderer;
        })();
        Renderers.GLRenderer = GLRenderer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLShaders = (function () {
            function GLShaders(gl) {
                this.ready = false;
                this.texture2DProg = {
                    vertexPositionAttribute: null,
                    vertexTexCoordAttribute: null,
                    vertexColorAttribute: null,
                    mvMatrixUniform: null,
                    samplerUniform: null,
                    resolutionUniform: null,
                    textureSizeUniform: null,
                    cameraOffsetUniform: null
                };
                this.texture2DFrag = [
                    "precision mediump float;",
                    "varying vec2 vTextureCoord;",
                    "varying float vColor;",
                    "uniform sampler2D uSampler;",
                    "void main(void) {",
                    "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
                    "gl_FragColor = gl_FragColor * vColor;",
                    "}"
                ];
                this.texture2DVert = [
                    "attribute vec2 aVertexPosition;",
                    "attribute vec2 aTextureCoord;",
                    "attribute float aColor;",
                    "uniform mat4 uMVMatrix;",
                    "uniform vec2 uResolution;",
                    "uniform vec2 uTextureSize;",
                    "uniform vec2 uCameraOffset;",
                    "varying vec2 vTextureCoord;",
                    "varying float vColor;",
                    "void main(void) {",
                    "vec4 transpos = vec4(aVertexPosition - uCameraOffset,0,1); ",
                    "transpos =  uMVMatrix * transpos;",
                    "vec2 zeroToOne = transpos.xy / uResolution;",
                    "vec2 zeroToTwo = zeroToOne * 2.0;",
                    "vec2 clipSpace = zeroToTwo - 1.0;",
                    "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
                    "vTextureCoord = aTextureCoord / uTextureSize;",
                    "vColor = aColor;",
                    "}"
                ];
                this.vertShader = this.compile(gl, this.texture2DVert.join("\n"), gl.VERTEX_SHADER);
                this.fragShader = this.compile(gl, this.texture2DFrag.join("\n"), gl.FRAGMENT_SHADER);
                this.shaderProgram = this.attach(gl, this.vertShader, this.fragShader);
                this.use(gl, this.shaderProgram);
                this.ready = true;
            }
            GLShaders.prototype.attach = function (gl, vertShader, fragShader) {
                var shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, fragShader);
                gl.attachShader(shaderProgram, vertShader);
                gl.linkProgram(shaderProgram);
                return shaderProgram;
            };

            GLShaders.prototype.compile = function (gl, src, shaderType) {
                var shader = gl.createShader(shaderType);
                gl.shaderSource(shader, src);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    return null;
                }
                return shader;
            };

            GLShaders.prototype.use = function (gl, shaderProgram) {
                gl.useProgram(this.shaderProgram);

                //attributes
                this.texture2DProg.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                gl.enableVertexAttribArray(this.texture2DProg.vertexPositionAttribute);
                this.texture2DProg.vertexTexCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
                gl.enableVertexAttribArray(this.texture2DProg.vertexTexCoordAttribute);
                this.texture2DProg.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
                gl.enableVertexAttribArray(this.texture2DProg.vertexColorAttribute);

                //uniforms
                this.texture2DProg.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                this.texture2DProg.resolutionUniform = gl.getUniformLocation(shaderProgram, "uResolution");
                this.texture2DProg.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
                this.texture2DProg.textureSizeUniform = gl.getUniformLocation(shaderProgram, "uTextureSize");
                this.texture2DProg.cameraOffsetUniform = gl.getUniformLocation(shaderProgram, "uCameraOffset");
            };
            return GLShaders;
        })();
        Renderers.GLShaders = GLShaders;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLTexture = (function () {
            function GLTexture(gl, _image) {
                this.texture = gl.createTexture();

                this.image = _image;
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            GLTexture.prototype.refresh = function (gl, _image) {
                this.image = _image;
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.bindTexture(gl.TEXTURE_2D, null);
            };
            return GLTexture;
        })();
        Renderers.GLTexture = GLTexture;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLArrayBuffer = (function () {
            function GLArrayBuffer(gl, _itemSize, items, init) {
                if (typeof init === "undefined") { init = true; }
                this.items = items || GLArrayBuffer.squareVertices;
                this.itemSize = _itemSize || 2;
                this.numItems = this.items.length / this.itemSize;
                if (init) {
                    this.buffer = this.init(gl);
                }
            }
            GLArrayBuffer.prototype.clear = function () {
                this.items = new Array();
            };

            GLArrayBuffer.prototype.init = function (gl) {
                var buffer = gl.createBuffer();
                var f32 = new Float32Array(this.items);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);

                return buffer;
            };

            GLArrayBuffer.prototype.refresh = function (gl, items) {
                this.items = items;
                this.numItems = this.items.length / this.itemSize;
                var f32 = new Float32Array(this.items);

                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);
                return this.buffer;
            };

            GLArrayBuffer.squareVertices = [
                0,
                0,
                100,
                0,
                100,
                100,
                0,
                100
            ];

            GLArrayBuffer.squareUVs = [
                0,
                0,
                .1,
                0,
                .1,
                .1,
                0,
                .1
            ];

            GLArrayBuffer.squareCols = [
                1,
                1,
                1,
                1
            ];
            return GLArrayBuffer;
        })();
        Renderers.GLArrayBuffer = GLArrayBuffer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    (function (Renderers) {
        var GLElementArrayBuffer = (function () {
            function GLElementArrayBuffer(gl, _itemSize, _indices, init) {
                if (typeof init === "undefined") { init = true; }
                this.indices = _indices || GLElementArrayBuffer.square;
                this.itemSize = _itemSize || 1;
                this.numItems = this.indices.length / this.itemSize;
                if (init) {
                    this.buffer = this.init(gl);
                }
            }
            GLElementArrayBuffer.prototype.clear = function () {
                this.indices = new Array();
            };

            GLElementArrayBuffer.prototype.init = function (gl) {
                var buffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

                return buffer;
            };

            GLElementArrayBuffer.prototype.refresh = function (gl, indices) {
                this.numItems = this.indices.length / this.itemSize;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

                return this.buffer;
            };

            GLElementArrayBuffer.square = [
                0,
                1,
                2,
                0,
                2,
                3
            ];
            return GLElementArrayBuffer;
        })();
        Renderers.GLElementArrayBuffer = GLElementArrayBuffer;
    })(Kiwi.Renderers || (Kiwi.Renderers = {}));
    var Renderers = Kiwi.Renderers;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - System
    * @module Kiwi
    * @submodule System
    * @main System
    */
    (function (System) {
        /**
        * DOM Boot and Ready functions (based on those used by jQuery)
        *
        * @class Bootstrap
        *
        */
        var Bootstrap = (function () {
            function Bootstrap() {
                /**
                *
                * @property isReady
                * @type Boolean
                */
                this.isReady = false;
                /**
                * The parent div in which the layers and input live
                * @property container
                * @type HTMLDivElement
                */
                this.container = null;
                /**
                * This div sits on-top of all layers and captures user input
                * @property input
                * @type HTMLDivElement
                */
                this.input = null;
            }
            Bootstrap.prototype.objType = function () {
                return "Bootstrap";
            };

            /**
            * Called at the start of the game to check to see if the DOM is ready before we do anything requiring it
            * @method boot
            * @param {String} domParent
            * @param {Any} [callback]
            * @param {Boolean} [createContainer]
            */
            Bootstrap.prototype.boot = function (domParent, callback, createContainer) {
                if (typeof callback === "undefined") { callback = null; }
                if (typeof createContainer === "undefined") { createContainer = true; }
                var _this = this;
                this._callback = callback;
                this._domParent = domParent;

                // if this is true a div will be created in browser
                this._createContainer = createContainer;

                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                    this.ready();
                } else {
                    document.addEventListener('DOMContentLoaded', function () {
                        return _this.ready();
                    }, false);
                    window.addEventListener('load', function () {
                        return _this.ready();
                    }, false);
                }
            };

            /**
            *  If the DOM is ready it fires our callback, otherwise sets a short timeout to try again
            * @method ready
            */
            Bootstrap.prototype.ready = function () {
                var _this = this;
                if (this.isReady === true) {
                    return;
                }

                if (!document.body) {
                    window.setTimeout(function () {
                        return _this.ready();
                    }, 13);
                } else {
                    //document.removeEventListener('DOMContentLoaded', () => this.ready(), false);
                    this.isReady = true;

                    if (this._createContainer === true) {
                        if (this._domParent === '') {
                            this.container = document.createElement('div');
                            this._setupContainer('KiwiGame' + Date.now().toString());
                            document.body.appendChild(this.container);
                        } else {
                            if (document.getElementById(this._domParent)) {
                                this.container = document.getElementById(this._domParent);
                                this._setupContainer();
                            } else {
                                this.container = document.createElement('div');
                                this._setupContainer(this._domParent);
                                document.body.appendChild(this.container);
                            }
                        }
                    }

                    if (this._callback !== null) {
                        this._callback();
                    }
                }
            };

            /**
            *
            * @method _setupContainer
            * @param {String} id
            * @private
            **/
            Bootstrap.prototype._setupContainer = function (id) {
                if (typeof id === "undefined") { id = ''; }
                if (id) {
                    this.container.id = id;
                }

                this.container.style.width = '800px';
                this.container.style.height = '600px';
                this.container.style.position = 'relative';
                this.container.style.overflow = 'hidden';
            };
            return Bootstrap;
        })();
        System.Bootstrap = Bootstrap;
    })(Kiwi.System || (Kiwi.System = {}));
    var System = Kiwi.System;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - System
    * @module Kiwi
    * @submodule System
    *
    */
    (function (System) {
        /**
        * Gets the x/y coordinate offset of any given valid DOM Element from the top/left position of the browser
        * Based on jQuery offset https://github.com/jquery/jquery/blob/master/src/offset.js
        *
        * @class Browser
        *
        */
        var Browser = (function () {
            /**
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @return {StateMananger} This Object
            */
            function Browser(game) {
                this._game = game;
            }
            Browser.prototype.objType = function () {
                return "Browser";
            };

            /**
            * The DOM is ready, so if we have a current state pending we can init it now
            * @method boot
            */
            Browser.prototype.boot = function () {
                //this._game.stage.offset = this.getOffsetPoint(this._game.stage.container);
            };

            /**
            *
            * @method getOffsetPoint
            * @param {Any} element
            * @param {Kiwi.Geom.Point} output
            * @return {Kiwi.Geom.Point}
            **/
            Browser.prototype.getOffsetPoint = function (element, output) {
                if (typeof output === "undefined") { output = new Kiwi.Geom.Point(); }
                var box = element.getBoundingClientRect();

                var clientTop = element.clientTop || document.body.clientTop || 0;
                var clientLeft = element.clientLeft || document.body.clientLeft || 0;
                var scrollTop = window.pageYOffset || element.scrollTop || document.body.scrollTop;
                var scrollLeft = window.pageXOffset || element.scrollLeft || document.body.scrollLeft;

                return output.setTo(box.left + scrollLeft - clientLeft, box.top + scrollTop - clientTop);
            };
            return Browser;
        })();
        System.Browser = Browser;
    })(Kiwi.System || (Kiwi.System = {}));
    var System = Kiwi.System;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - System
    * @module Kiwi
    * @submodule System
    */
    (function (System) {
        /**
        * Detects device support capabilities. Using some elements from System.js by MrDoob and Modernizr
        * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
        *
        * @class Device
        *
        * @author mrdoob
        * @author Modernizr team
        *
        */
        var Device = (function () {
            /**
            *
            * @constructor
            * @return {Device} This Object
            */
            function Device() {
                //  Operating System
                /**
                *
                * @property iOS
                * @type Boolean
                */
                this.iOS = false;
                /**
                *
                * @property android
                * @type Boolean
                */
                this.android = false;
                /**
                *
                * @property chromeOS
                * @type Boolean
                */
                this.chromeOS = false;
                /**
                *
                * @property linux
                * @type Boolean
                */
                this.linux = false;
                /**
                *
                * @property maxOS
                * @type Boolean
                */
                this.macOS = false;
                /**
                *
                * @property windows
                * @type Boolean
                */
                this.windows = false;
                //  Features
                /**
                *
                * @property canvas
                * @type Boolean
                */
                this.canvas = false;
                /**
                *
                * @property file
                * @type Boolean
                */
                this.file = false;
                /**
                *
                * @property fileSystem
                * @type Boolean
                */
                this.fileSystem = false;
                /**
                *
                * @property localStorage
                * @type Boolean
                */
                this.localStorage = false;
                /**
                *
                * @property webGL
                * @type Boolean
                */
                this.webGL = false;
                /**
                *
                * @property worker
                * @type Boolean
                */
                this.worker = false;
                /**
                *
                * @property blob
                * @type Boolean
                */
                this.blob = false;
                /**
                *
                * @property touch
                * @type Boolean
                */
                this.touch = false;
                /**
                *
                * @property css3D
                * @type Boolean
                */
                this.css3D = false;
                //  Browser
                /**
                *
                * @property arora
                * @type Boolean
                */
                this.arora = false;
                /**
                *
                * @property chrome
                * @type Boolean
                */
                this.chrome = false;
                /**
                *
                * @property epiphany
                * @type Boolean
                */
                this.epiphany = false;
                /**
                *
                * @property firefox
                * @type Boolean
                */
                this.firefox = false;
                /**
                *
                * @property ie
                * @type Boolean
                */
                this.ie = false;
                /**
                *
                * @property ieVersion
                * @type Number
                */
                this.ieVersion = 0;
                /**
                *
                * @property mobileSafari
                * @type Boolean
                */
                this.mobileSafari = false;
                /**
                *
                * @property midori
                * @type Boolean
                */
                this.midori = false;
                /**
                *
                * @property opera
                * @type Boolean
                */
                this.opera = false;
                /**
                *
                * @property safari
                * @type Boolean
                */
                this.safari = false;
                this.webApp = false;
                //  Audio
                /**
                *
                * @property audioData
                * @type Boolean
                */
                this.audioData = false;
                /**
                *
                * @property webaudio
                * @type Boolean
                */
                this.webaudio = false;
                /**
                *
                * @property ogg
                * @type Boolean
                */
                this.ogg = false;
                /**
                *
                * @property mp3
                * @type Boolean
                */
                this.mp3 = false;
                /**
                *
                * @property wav
                * @type Boolean
                */
                this.wav = false;
                /**
                *
                * @property m4a
                * @type Boolean
                */
                this.m4a = false;
                //  Device
                /**
                *
                * @property iPhone
                * @type Boolean
                */
                this.iPhone = false;
                /**
                *
                * @property iPhone4
                * @type Boolean
                */
                this.iPhone4 = false;
                /**
                *
                * @property iPad
                * @type Boolean
                */
                this.iPad = false;
                /**
                *
                * @property pixelRatio
                * @type Number
                */
                this.pixelRatio = 0;
                this._checkAudio();
                this._checkBrowser();
                this._checkCSS3D();
                this._checkDevice();
                this._checkFeatures();
                this._checkOS();
            }
            Device.prototype.objType = function () {
                return "Device";
            };

            /**
            *
            * @method _checkOS
            * @private
            */
            Device.prototype._checkOS = function () {
                var ua = navigator.userAgent;

                if (/Android/.test(ua)) {
                    this.android = true;
                } else if (/CrOS/.test(ua)) {
                    this.chromeOS = true;
                } else if (/iP[ao]d|iPhone/i.test(ua)) {
                    this.iOS = true;
                } else if (/Linux/.test(ua)) {
                    this.linux = true;
                } else if (/Mac OS/.test(ua)) {
                    this.macOS = true;
                } else if (/Windows/.test(ua)) {
                    this.windows = true;
                }
            };

            /**
            *
            * @method _checkFeatures
            * @private
            */
            Device.prototype._checkFeatures = function () {
                if (typeof window['Blob'] !== 'undefined')
                    this.blob = true;

                this.canvas = !!window['CanvasRenderingContext2D'];

                try  {
                    this.localStorage = !!localStorage.getItem;
                } catch (error) {
                    this.localStorage = false;
                }

                this.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
                this.fileSystem = !!window['requestFileSystem'];
                this.webGL = !!window['WebGLRenderingContext'];
                this.worker = !!window['Worker'];

                if ('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled) {
                    this.touch = true;
                }
            };

            /**
            *
            * @method _checkBrowser
            * @private
            */
            Device.prototype._checkBrowser = function () {
                var ua = navigator.userAgent;

                if (/Arora/.test(ua)) {
                    this.arora = true;
                } else if (/Chrome/.test(ua)) {
                    this.chrome = true;
                } else if (/Epiphany/.test(ua)) {
                    this.epiphany = true;
                } else if (/Firefox/.test(ua)) {
                    this.firefox = true;
                } else if (/Mobile Safari/.test(ua)) {
                    this.mobileSafari = true;
                } else if (/MSIE (\d+\.\d+);/.test(ua)) {
                    this.ie = true;
                    this.ieVersion = parseInt(RegExp.$1);
                } else if (/Midori/.test(ua)) {
                    this.midori = true;
                } else if (/Opera/.test(ua)) {
                    this.opera = true;
                } else if (/Safari/.test(ua)) {
                    this.safari = true;
                }

                if (navigator['standalone']) {
                    this.webApp = true;
                }
            };

            /**
            *
            * @method _checkAudio
            * @private
            */
            Device.prototype._checkAudio = function () {
                this.audioData = !!(window['Audio']);
                this.webaudio = !!(window['webkitAudioContext'] || window['AudioContext']);

                var audioElement = document.createElement('audio');
                var result = false;

                try  {
                    if (result = !!audioElement.canPlayType) {
                        if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
                            this.ogg = true;
                        }

                        if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
                            this.mp3 = true;
                        }

                        if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
                            this.wav = true;
                        }

                        if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
                            this.m4a = true;
                        }
                    }
                } catch (e) {
                }
            };

            /**
            *
            * @method _checkDevice
            * @private
            */
            Device.prototype._checkDevice = function () {
                this.pixelRatio = window['devicePixelRatio'] || 1;
                this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
                this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
                this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;
            };

            /**
            *
            * @method _checkCSS3D
            * @private
            */
            Device.prototype._checkCSS3D = function () {
                var el = document.createElement('p');
                var has3d;
                var transforms = {
                    'webkitTransform': '-webkit-transform',
                    'OTransform': '-o-transform',
                    'msTransform': '-ms-transform',
                    'MozTransform': '-moz-transform',
                    'transform': 'transform'
                };

                // Add it to the body to get the computed style.
                document.body.insertBefore(el, null);

                for (var t in transforms) {
                    if (el.style[t] !== undefined) {
                        el.style[t] = "translate3d(1px,1px,1px)";
                        has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                    }
                }

                document.body.removeChild(el);

                this.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
            };

            /**
            *
            * @method getAll
            * @return {String}
            */
            Device.prototype.getAll = function () {
                var output = '';

                output = output.concat('Device\n');
                output = output.concat('iPhone : ' + this.iPhone + '\n');
                output = output.concat('iPhone4 : ' + this.iPhone4 + '\n');
                output = output.concat('iPad : ' + this.iPad + '\n');

                output = output.concat('\n');
                output = output.concat('Operating System\n');
                output = output.concat('iOS: ' + this.iOS + '\n');
                output = output.concat('Android: ' + this.android + '\n');
                output = output.concat('ChromeOS: ' + this.chromeOS + '\n');
                output = output.concat('Linux: ' + this.linux + '\n');
                output = output.concat('MacOS: ' + this.macOS + '\n');
                output = output.concat('Windows: ' + this.windows + '\n');

                output = output.concat('\n');
                output = output.concat('Browser\n');
                output = output.concat('Arora: ' + this.arora + '\n');
                output = output.concat('Chrome: ' + this.chrome + '\n');
                output = output.concat('Epiphany: ' + this.epiphany + '\n');
                output = output.concat('Firefox: ' + this.firefox + '\n');
                output = output.concat('Internet Explorer: ' + this.ie + ' (' + this.ieVersion + ')\n');
                output = output.concat('Mobile Safari: ' + this.mobileSafari + '\n');
                output = output.concat('Midori: ' + this.midori + '\n');
                output = output.concat('Opera: ' + this.opera + '\n');
                output = output.concat('Safari: ' + this.safari + '\n');

                output = output.concat('\n');
                output = output.concat('Features\n');
                output = output.concat('Blob: ' + this.blob + '\n');
                output = output.concat('Canvas: ' + this.canvas + '\n');
                output = output.concat('File: ' + this.file + '\n');
                output = output.concat('FileSystem: ' + this.fileSystem + '\n');
                output = output.concat('LocalStorage: ' + this.localStorage + '\n');
                output = output.concat('WebGL: ' + this.webGL + '\n');
                output = output.concat('Worker: ' + this.worker + '\n');
                output = output.concat('Touch: ' + this.touch + '\n');
                output = output.concat('CSS 3D: ' + this.css3D + '\n');

                output = output.concat('\n');
                output = output.concat('Audio\n');
                output = output.concat('Audio Data: ' + this.canvas + '\n');
                output = output.concat('Web Audio: ' + this.canvas + '\n');
                output = output.concat('Can play OGG: ' + this.canvas + '\n');
                output = output.concat('Can play MP3: ' + this.canvas + '\n');
                output = output.concat('Can play M4A: ' + this.canvas + '\n');
                output = output.concat('Can play WAV: ' + this.canvas + '\n');

                return output;
            };
            return Device;
        })();
        System.Device = Device;
    })(Kiwi.System || (Kiwi.System = {}));
    var System = Kiwi.System;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Textures
    * @module Kiwi
    * @submodule Textures
    *
    */
    (function (Textures) {
        /**
        *
        *
        * @class TextureAtlas
        *
        */
        var TextureAtlas = (function () {
            /**
            *
            * @constructor
            * @param {string} name - Name of the texture atlas. This is usually defined by the developer when loading the assets.
            * @param {number} type - The type of texture atlas that this is. There are currently only three types.
            * @param {any} cells - The cells that are within this image..
            * @param {HTMLImageElement} image - The image that the texture atlas is using.
            * @param {Sequence[]} sequences - Any sequences of cells for this texture atlas. Used for animation.
            * @return {Kiwi.Textures.TextureAtlas}
            */
            function TextureAtlas(name, type, cells, image, sequences) {
                /**
                * The cell that is to be render at the start.
                * @property cellIndex
                * @type number
                * @default 0
                * @public
                */
                this.cellIndex = 0;
                this.name = name;
                this.cells = cells || new Array();
                this.sequences = sequences || new Array();
                this.image = image;
                this._type = type;
            }
            /**
            * The type of object that this texture atlas is.
            * @method objType
            * @return string
            * @public
            */
            TextureAtlas.prototype.objType = function () {
                return "TextureAtlas";
            };

            Object.defineProperty(TextureAtlas.prototype, "type", {
                get: /**
                * Will return to you this type of texture atlas. This is READ ONLY.
                * @type number
                * @public
                */
                function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Will populate this texture atlas with information based on a JSON file that was passed.
            *
            * @method readJSON
            * @param {any} atlasJSON
            * @public
            */
            TextureAtlas.prototype.readJSON = function (atlasJSON) {
                //populate from json
                var obj = JSON.parse(atlasJSON);
                this.name = obj.name;

                for (var i = 0; i < obj.cells.length; i++) {
                    this.cells.push(obj.cells[i]);

                    if (obj.cells[i].hitboxes === undefined) {
                        this.cells[i].hitboxes = new Array();
                        this.cells[i].hitboxes.push({ x: 0, y: 0, w: this.cells[i].w, h: this.cells[i].h });
                    }
                }

                if (obj.sequences) {
                    for (var i = 0; i < obj.sequences.length; i++) {
                        var seq = new Kiwi.Animation.Sequence(obj.sequences[i].name, obj.sequences[i].cells);

                        if (obj.sequences[i].speed !== undefined)
                            seq.speed = obj.sequences[i].speed;
                        if (obj.sequences[i].loop !== undefined)
                            seq.loop = obj.sequences[i].loop;

                        this.sequences.push(seq);
                    }
                }
            };
            TextureAtlas.SINGLE_IMAGE = 0;

            TextureAtlas.SPRITE_SHEET = 1;

            TextureAtlas.TEXTURE_ATLAS = 2;
            return TextureAtlas;
        })();
        Textures.TextureAtlas = TextureAtlas;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Textures
    * @module Kiwi
    * @submodule Textures
    * @main Textures
    *
    */
    (function (Textures) {
        /**
        *
        *
        * @class TextureLibrary
        *
        */
        var TextureLibrary = (function () {
            /*
            *
            * @constructor
            * @param {Kiwi.Game} game
            * @return {Kiwi.Textures.TextureLibrary}
            */
            function TextureLibrary(game) {
                this._base2Sizes = [2, 4, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
                this._game = game;
                this.textures = new Object();
            }
            TextureLibrary.prototype.objType = function () {
                return "TextureLibrary";
            };

            /*
            * Resets the texture library
            * @method clear
            */
            TextureLibrary.prototype.clear = function () {
                for (var prop in this.textures) {
                    delete this.textures[prop];
                }
            };

            /*
            * Adds a new image file to the texture library.
            * @method add
            * @param {Kiwi.File} imageFile
            */
            TextureLibrary.prototype.add = function (imageFile) {
                if (this._game.renderOption === Kiwi.RENDERER_WEBGL) {
                    imageFile = this._rebuildImage(imageFile);
                }

                switch (imageFile.dataType) {
                    case Kiwi.Files.File.SPRITE_SHEET:
                        this.textures[imageFile.key] = this._buildSpriteSheet(imageFile);
                        break;
                    case Kiwi.Files.File.IMAGE:
                        this.textures[imageFile.key] = this._buildImage(imageFile);
                        break;
                    case Kiwi.Files.File.TEXTURE_ATLAS:
                        this.textures[imageFile.key] = this._buildTextureAtlas(imageFile);
                        break;
                    default:
                        break;
                }
            };

            TextureLibrary.prototype._rebuildImage = function (imageFile) {
                var width = imageFile.data.width;
                var height = imageFile.data.height;

                if (this._base2Sizes.indexOf(width) == -1) {
                    var i = 0;
                    while (width > this._base2Sizes[i])
                        i++;
                    width = this._base2Sizes[i];
                }

                if (this._base2Sizes.indexOf(height) == -1) {
                    var i = 0;
                    while (height > this._base2Sizes[i])
                        i++;
                    height = this._base2Sizes[i];
                }

                if (imageFile.data.width !== width || imageFile.data.height !== height) {
                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext("2d").drawImage(imageFile.data, 0, 0);

                    var image = new Image(width, height);
                    image.src = canvas.toDataURL("image/png");

                    if (imageFile.dataType === Kiwi.Files.File.SPRITE_SHEET) {
                        if (!imageFile.metadata.rows)
                            imageFile.metadata.rows = imageFile.data.height / imageFile.metadata.frameHeight;

                        if (!imageFile.metadata.cols)
                            imageFile.metadata.cols = imageFile.data.width / imageFile.metadata.frameWidth;
                    }

                    imageFile.data = image;
                    canvas = null;
                    width = null;
                    height = null;
                }

                return imageFile;
            };

            /*
            * Used to build a new texture atlas based on the image file provided. Internal use only.
            * @method _buildTextureAtlas
            * @param {Kiwi.File} imageFile
            */
            TextureLibrary.prototype._buildTextureAtlas = function (imageFile) {
                var atlas = new Kiwi.Textures.TextureAtlas(imageFile.key, Kiwi.Textures.TextureAtlas.TEXTURE_ATLAS, null, imageFile.data);
                var m = imageFile.metadata;

                var json = this._game.fileStore.getFile(m.jsonID).data;
                json.trim();

                atlas.readJSON(json);

                return atlas;
            };

            /*
            * Builds a spritesheet atlas from the an image file that is provided.
            * @method _buildSpriteSheet
            * @param {Kiwi.File} imageFile
            */
            TextureLibrary.prototype._buildSpriteSheet = function (imageFile) {
                var m = imageFile.metadata;

                //BEWARE THE SWITCH TO CELLWIDTH AND FRAMEWIDTH
                var spriteSheet = new Kiwi.Textures.SpriteSheet(imageFile.key, imageFile.data, m.frameWidth, m.frameHeight, m.numCells, m.rows, m.cols, m.sheetOffsetX, m.sheetOffsetY, m.cellOffsetX, m.cellOffsetY);
                return spriteSheet;
            };

            /*
            * Builds a single image atlas from a image file that is provided.
            * @method _buildImage
            * @param {Kiwi.File} imageFile
            */
            TextureLibrary.prototype._buildImage = function (imageFile) {
                var m = imageFile.metadata;
                return new Kiwi.Textures.SingleImage(imageFile.key, imageFile.data, m.width, m.height, m.offsetX, m.offsetY);
            };
            return TextureLibrary;
        })();
        Textures.TextureLibrary = TextureLibrary;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Textures
    * @module Kiwi
    * @submodule Textures
    *
    */
    (function (Textures) {
        /**
        *
        *
        * @class SpriteSheet
        * @extends TextureAtlas
        */
        var SpriteSheet = (function (_super) {
            __extends(SpriteSheet, _super);
            /**
            *
            * @constructor
            * @param {string} name - The name of the spritesheet.
            * @param {HTMLImageElement} texture - The image that is being used for the spritesheet.
            * @param {number} cellWidth - The width of a single cell.
            * @param {number} cellHeight - The height of a single cell.
            * @param {number} numCells - The number of cells in total.
            * @param {number} rows - The number of cells that make up a row.
            * @param {number} cols - The number of cells that make up a column.
            * @param {number} sheetOffsetX - The offset of the whole sheet on the x axis. Useful if the image has a border you don't want to show.
            * @param {number} sheetOffsetY - The offset of the whole sheet on the y axis. Useful if the image has a border you don't want to show.
            * @param {number} cellOffsetX - An offset between cells on the x axis. Useful if there is a border between cells which is not to be shown.
            * @param {number} cellOffsetY - An offset between cells on the y axis. Useful if there is a border between cells which is not to be shown.
            * @return {Kiwi.Textures.SpriteSheet}
            */
            function SpriteSheet(name, texture, cellWidth, cellHeight, numCells, rows, cols, sheetOffsetX, sheetOffsetY, cellOffsetX, cellOffsetY) {
                this.cellWidth = cellWidth;
                this.cellHeight = cellHeight;

                this._cols = cols || texture.width / cellWidth;
                this._rows = rows || texture.height / cellHeight;
                this.numCells = numCells || this.cols * this.rows;

                this.sheetOffsetX = sheetOffsetX || 0;
                this.sheetOffsetY = sheetOffsetY || 0;

                this.cellOffsetX = cellOffsetX || 0;
                this.cellOffsetY = cellOffsetY || 0;

                _super.call(this, name, Kiwi.Textures.TextureAtlas.SPRITE_SHEET, this.generateAtlasCells(), texture, this.sequences);
            }
            /**
            * The type of object that this is.
            * @method objType
            * @return string
            * @public
            */
            SpriteSheet.prototype.objType = function () {
                return "SpriteSheet";
            };

            Object.defineProperty(SpriteSheet.prototype, "rows", {
                get: /**
                * Get the number of rows.
                * @type number
                * @public
                */
                function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SpriteSheet.prototype, "cols", {
                get: /**
                * Get the number of columns.
                * @type number
                * @public
                */
                function () {
                    return this._cols;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Generates the atlas cells based on the information that was provided.
            *
            * @method generateAtlasCells
            * @return {Array}
            * @public
            */
            SpriteSheet.prototype.generateAtlasCells = function () {
                var cells = new Array();
                var cellNumeric = new Array();

                var dx = this.sheetOffsetX;
                var dy = this.sheetOffsetY;
                var i = 0;

                for (var y = 0; y < this.rows; y++) {
                    for (var x = 0; x < this.cols; x++) {
                        cells.push({
                            x: dx,
                            y: dy,
                            w: this.cellWidth,
                            h: this.cellHeight,
                            hitboxes: [
                                {
                                    x: 0,
                                    y: 0,
                                    w: this.cellWidth,
                                    h: this.cellHeight
                                }
                            ]
                        });

                        cellNumeric.push(i++);

                        dx += this.cellOffsetX + this.cellWidth;
                    }
                    dx = this.sheetOffsetX;
                    dy += this.cellOffsetY + this.cellHeight;
                }

                //generate default sequence
                this.sequences = new Array();
                this.sequences.push(new Kiwi.Animation.Sequence('default', cellNumeric));

                return cells;
            };
            return SpriteSheet;
        })(Textures.TextureAtlas);
        Textures.SpriteSheet = SpriteSheet;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Textures
    * @module Kiwi
    * @submodule Textures
    *
    */
    (function (Textures) {
        /**
        *
        * @class SingleImage
        * @extends TextureAtlas
        */
        var SingleImage = (function (_super) {
            __extends(SingleImage, _super);
            /**
            *
            * @constructor
            * @param {string} name - The name of the single image
            * @param {HTMLImageElement} image - the image that is being used.
            * @param {number} width - the width of the image
            * @param {number} height - the height of the image
            * @param {number} offsetX - the offset of the image on the x axis. Useful if the image has a border that you don't want to show.
            * @param {number} offsetY - the offset of the image of the y axis. Useful if the image has a border that you don't want to show.
            * @return {Kiwi.Textures.SingleImage}
            */
            function SingleImage(name, image, width, height, offsetX, offsetY) {
                this.width = width || image.width;
                this.height = height || image.height;
                this.offsetX = offsetX || 0;
                this.offsetY = offsetY || 0;

                _super.call(this, name, Kiwi.Textures.TextureAtlas.SINGLE_IMAGE, this.generateAtlasCells(), image);
            }
            /**
            * The type of object that this is.
            * @method objType
            * @return string
            * @public
            */
            SingleImage.prototype.objType = function () {
                return "SingleImage";
            };

            /**
            * This method generates the single image cell based off the information that was passed during instantion.
            * @method generateAtlasCells
            * @returns{ Array }
            * @public
            */
            SingleImage.prototype.generateAtlasCells = function () {
                return [{ x: this.offsetX, y: this.offsetY, w: this.width, h: this.height, hitboxes: [{ x: 0, y: 0, w: this.width, h: this.height }] }];
            };
            return SingleImage;
        })(Textures.TextureAtlas);
        Textures.SingleImage = SingleImage;
    })(Kiwi.Textures || (Kiwi.Textures = {}));
    var Textures = Kiwi.Textures;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Time
    * @module Kiwi
    * @submodule Time
    *
    */
    (function (Time) {
        /**
        * The Clock class offers a way of tracking time within a game.
        * - The MasterClock is a property of the Kiwi.Time.Manager class and tracks real world time in milliseconds elapsed since the application started.
        * This happens automatically and there is no need to do anything to set this up.
        * - An instance of a clock is used to track time in arbitrary units (milliseconds by default)
        * - A clock can be started, paused, unpaused and stopped. Once stopped, re-starting the clock again will reset it.
        * - Any number of timers can be attached to a clock. See the Kiwi.Time.Timer class for timer details.
        * - If the clock is paused, any timers attached to the clock will take this into account and not continue to fire events until the clock is unpaused.
        * (Note that this is not the same as pausing timers, which can be done manually and needs to be undone manually.)
        *
        * @class Clock
        *
        */
        var Clock = (function () {
            /**
            * A clock class for keeping time.
            * @class Clock
            * @constructor
            * @param {string} name. The name of the clock.
            * @param {Number} units. The number of milliseconds that make up one unit of time on this clock.
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            function Clock(manager, master, name, units) {
                if (typeof units === "undefined") { units = 1000; }
                /**
                * The time the clock was first started relative to the master clock.
                * @property _timeFirstStarted
                * @private
                * @type Number
                **/
                this._timeFirstStarted = null;
                /**
                * The time the clock was most recently started relative to the master clock.
                * @property _timeLastStarted
                * @private
                * @type Number
                **/
                this._timeLastStarted = null;
                /**
                * The time the clock was most recently stopped relative to the master clock.
                * @property _timeLastStopped
                * @private
                * @type Number
                **/
                this._timeLastStopped = null;
                /**
                * The time the clock was most receently paused relative to the master clock.
                * @property _timeLastPaused
                * @private
                * @type Number
                **/
                this._timeLastPaused = null;
                /**
                * The time the clock was most recently unpaused relative to the master clock.
                * @property _timeLastUnpaused
                * @private
                * @type Number
                **/
                this._timeLastUnpaused = null;
                /**
                * THe total number of milliseconds the clock has been paused since it was last started.
                * @property _totalPaused
                * @private
                * @type Number
                **/
                this._totalPaused = 0;
                /**
                * Whether the clock is in a running state.
                * @property _isRunning
                * @private
                * @type Boolean
                **/
                this._isRunning = false;
                /**
                * Whether the clock is in a stopped state.
                * @property _isStopped
                * @private
                * @type Boolean
                **/
                this._isStopped = true;
                /**
                * Whether the clock is in a paused state.
                * @property _isPaused
                * @private
                * @type Boolean
                **/
                this._isPaused = false;
                /**
                * An internal reference to the state of the elapsed timer
                * @property _elapsedState
                * @private
                * @type Number
                **/
                this._elapsedState = 0;
                /**
                *
                * @property manager
                * @type Kiwi.Time.Manager
                */
                this.manager = null;
                /**
                *
                * @property master
                * @type Kiwi.Time.MasterClock
                */
                this.master = null;
                /**
                * Name of the clock
                * @property name
                * @type string
                **/
                this.name = null;
                /**
                * The number of milliseconds counted as one unit of time by the clock.
                * @property units
                * @type Number
                **/
                this.units = 0;
                this.manager = manager;
                this.master = master;
                this.name = name;
                this.units = units;
                this.timers = [];

                if (this.units < 1) {
                    this.units = 1;
                }
            }
            Clock.prototype.objType = function () {
                return "Clock";
            };

            /**
            * The number of clock units elapsed since the clock was first started.
            * @method elapsedSinceFirstStarted.
            * @return {Number} number of clock units.
            **/
            Clock.prototype.elapsedSinceFirstStarted = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeFirstStarted) / this.units : null;
            };

            /**
            * Get the most recent time the clock was started relative to the master clock.
            * @method started
            * @return {Number} milliseconds.
            **/
            Clock.prototype.started = function () {
                return this._timeLastStarted;
            };

            /**
            * The number of clock units elapsed since the clock was most recently started (not including time spent paused)
            * @method elapsed
            * @return {Number} number of clock units.
            **/
            Clock.prototype.elapsed = function () {
                if (this._elapsedState === 0) {
                    return (this._timeLastStarted) ? ((this.master.elapsed() - this._timeLastStarted) - this._totalPaused) / this.units : null;
                } else if (this._elapsedState === 1) {
                    return (this._timeLastPaused - this._timeLastStarted - this._totalPaused) / this.units;
                } else if (this._elapsedState === 2) {
                    //  Same as zero!
                    return (this._timeLastStarted) ? ((this.master.elapsed() - this._timeLastStarted) - this._totalPaused) / this.units : null;
                } else if (this._elapsedState === 3) {
                    return (this._timeLastStopped - this._timeLastStarted - this._totalPaused) / this.units;
                }
            };

            /**
            * The number of clock units elapsed since the clock was most recently stopped.
            * @method elapsedSinceLastStopped.
            * @return {Number} number of clock units.
            **/
            Clock.prototype.elapsedSinceLastStopped = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastStopped) / this.units : null;
            };

            /**
            * The number of clock units elapsed since the clock was most recently paused.
            * @method elapsedSinceLastPaused.
            * @return {Number} number of clock units.
            **/
            Clock.prototype.elapsedSinceLastPaused = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastPaused) / this.units : null;
            };

            /**
            * The number of clock units elapsed since the clock was most recently unpaused.
            * @method elapsedSinceLastUnpaused.
            * @return {Number} number of clock units.
            **/
            Clock.prototype.elapsedSinceLastUnpaused = function () {
                return (this._timeLastStarted) ? (this.master.elapsed() - this._timeLastUnpaused) / this.units : null;
            };

            /**
            * Check if the clock is in the running state.
            * @method isRunning
            * @return {Boolean} true if running.
            **/
            Clock.prototype.isRunning = function () {
                return this._isRunning;
            };

            /**
            * Check if the clock is in the stopped state.
            * @method isStopped
            * @return {Boolean} true if stopped.
            **/
            Clock.prototype.isStopped = function () {
                return this._isStopped;
            };

            /**
            * Check if the clock is in the paused state.
            * @method isPaused
            * @return {Boolean} true if paused.
            **/
            Clock.prototype.isPaused = function () {
                return this._isPaused;
            };

            /**
            * Add an existing Timer to the Clock.
            * @method addTimer
            * @param {Kiwi.Time.Timer} The Timer object instance to be added to ths Clock.
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            Clock.prototype.addTimer = function (timer) {
                this.timers.push(timer);

                return this;
            };

            /**
            * Creates a new Timer and adds it to this Clock.
            * @method createTimer
            * @param {string} name. The name of the Timer (must be unique on this Clock).
            * @param {Number} delay. The number of clock units to wait between firing events (default 1)
            * @param {Number} repeatCount. The number of times to repeat this Timer (default 0)
            * @return {Kiwi.Time.Timer} The newly created Timer.
            **/
            Clock.prototype.createTimer = function (name, delay, repeatCount, start) {
                if (typeof delay === "undefined") { delay = 1; }
                if (typeof repeatCount === "undefined") { repeatCount = 0; }
                if (typeof start === "undefined") { start = true; }
                this.timers.push(new Time.Timer(name, this, delay, repeatCount));

                if (start === true) {
                    this.timers[this.timers.length - 1].start();
                }

                return this.timers[this.timers.length - 1];
            };

            /**
            * Remove a Timer from this Clock based on either the Timer object or its name.
            * @method removeTimer
            * @param {Kiwi.Time.Timer} The Timer object you wish to remove. If you wish to delete by Timer Name set this to null.
            * @param {string} The name of the Timer object to remove.
            * @return {Boolean} True if the Timer was successfully removed, false if not.
            **/
            Clock.prototype.removeTimer = function (timer, timerName) {
                if (typeof timer === "undefined") { timer = null; }
                if (typeof timerName === "undefined") { timerName = ''; }
                if (timer !== null) {
                    if (this.timers[timer.name]) {
                        delete this.timers[timer.name];

                        return true;
                    } else {
                        return false;
                    }
                }

                if (timerName !== '') {
                    if (this.timers[timerName]) {
                        delete this.timers[timerName];

                        return true;
                    } else {
                        return false;
                    }
                }

                return false;
            };

            /**
            * Check if the Timer already exists on this Clock
            * @method checkExists
            * @param {string} name. The name of the Timer.
            * @return {Boolean} true if the Timer exists, false if not.
            **/
            Clock.prototype.checkExists = function (name) {
                if (this.timers[name]) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Stop all timers attached to the clock.
            * @method stopAllTimers
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            Clock.prototype.stopAllTimers = function () {
                for (var i = 0; i < this.timers.length; i++) {
                    this.timers[i].stop();
                }

                return this;
            };

            /**
            * Convert a number to milliseconds based on clock units.
            * @method toMilliseconds.
            * @return {Number} milliseconds.
            **/
            Clock.prototype.convertToMilliseconds = function (time) {
                return time * this.units;
            };

            /**
            * Updates all Timers linked to this Clock.
            * @method update
            **/
            Clock.prototype.update = function () {
                for (var i = 0; i < this.timers.length; i++) {
                    this.timers[i].update();
                }
            };

            /**
            * Start the clock. This resets the clock and starts it running.
            * @method start
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            Clock.prototype.start = function () {
                this._timeLastStarted = this.master.elapsed();
                this._totalPaused = 0;

                if (!this._timeFirstStarted) {
                    this._timeFirstStarted = this._timeLastStarted;
                }

                this._isRunning = true;
                this._isPaused = false;
                this._isStopped = false;

                this._elapsedState = 0;

                return this;
            };

            /**
            * Pause the clock. THe clock can only be paused if it is already running.
            * @method pause
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            Clock.prototype.pause = function () {
                if (this._isRunning === true) {
                    this._timeLastPaused = this.master.elapsed();
                    this._isRunning = false;
                    this._isPaused = true;
                    this._isStopped = false;

                    this._elapsedState = 1;
                }

                return this;
            };

            /**
            * Resume the clock. The clock can only be resumed if it is already paused.
            * @method resume
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            Clock.prototype.resume = function () {
                if (this._isPaused === true) {
                    this._timeLastUnpaused = this.master.elapsed();
                    this._totalPaused += this._timeLastUnpaused - this._timeLastPaused;
                    this._isRunning = true;
                    this._isPaused = false;
                    this._isStopped = false;

                    this._elapsedState = 2;
                }

                return this;
            };

            /**
            * Stop the clock. Clock can only be stopped if it is already running or is paused.
            * @method stop
            * @return {Kiwi.Time.Clock} This Clock object.
            **/
            Clock.prototype.stop = function () {
                if (this._isStopped === false) {
                    this._timeLastStopped = this.master.elapsed();

                    if (this._isPaused === true) {
                        this._totalPaused += this._timeLastStopped - this._timeLastPaused;
                    }

                    this._isRunning = false;
                    this._isPaused = false;
                    this._isStopped = true;

                    this._elapsedState = 3;
                }

                return this;
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            Clock.prototype.toString = function () {
                return "[{Clock (name=" + this.name + " units=" + this.units + " running=" + this._isRunning + ")}]";
            };
            return Clock;
        })();
        Time.Clock = Clock;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Time
    * @module Kiwi
    * @submodule Time
    * @main Time
    */
    (function (Time) {
        /**
        * A Proxy to the Clock and Time related classes. Access this via Kiwi.Game.Clock
        *
        * @class Manager
        *
        */
        var Manager = (function () {
            /**
            *
            * @constructor
            * @param {Kiwi.Game} game.
            * @return {Kiwi.Time.Manager} This Object.
            */
            function Manager(game) {
                /**
                *
                * @property _clocks
                * @type Array
                * @private
                */
                this._clocks = [];
                this._game = game;
            }
            Manager.prototype.objType = function () {
                return "Manager";
            };

            /**
            * The DOM is ready, so let's start the clocks running
            * @method boot
            */
            Manager.prototype.boot = function () {
                this.master = new Kiwi.Time.MasterClock();

                this.clock = new Time.Clock(this, this.master, 'default', 1000);
                this.clock.start();
            };

            /**
            * Creates a Kiwi.Time.Clock class for keeping time relative to the MasterClock.
            * @method addClock
            * @param {string} name. The name of the Clock.
            * @param {Number} units. The number of milliseconds that make up one unit of time on this clock. Default 1000.
            * @return {Kiwi.Time.Clock} A reference to the newly created Clock object.
            **/
            Manager.prototype.addClock = function (name, units) {
                if (typeof units === "undefined") { units = 1000; }
                this._clocks.push(new Time.Clock(this, this.master, name, units));

                return this._clocks[this._clocks.length - 1];
            };

            /**
            * Returns the Clock with the matching name. Throws and error if no Clock with that name exists
            * @method getClock
            * @param {string} name. The name of the Clock to be returned.
            * @return {Kiwi.Time.Clock} The clock which matches the name given.
            **/
            Manager.prototype.getClock = function (name) {
                for (var i = 0; i < this._clocks.length; i++) {
                    if (this._clocks[i].name === name) {
                        return this._clocks[i];
                    }
                }
            };

            /**
            *
            * @method update
            */
            Manager.prototype.update = function () {
                this.master.update();
                this.clock.update();

                for (var i = 0; i < this._clocks.length; i++) {
                    this._clocks[i].update();
                }
            };

            /**
            *
            * @method now
            * @return {Number}
            */
            Manager.prototype.now = function () {
                return this.master.now;
            };

            /**
            *
            * @method delta
            * @return {Number}
            */
            Manager.prototype.delta = function () {
                return this.master.delta;
            };
            return Manager;
        })();
        Time.Manager = Manager;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Time
    * @module Kiwi
    * @submodule Time
    *
    */
    (function (Time) {
        /**
        * The masterclock tracks time elapsed since the application started.
        * You should not access it directly, use the Clock and Timer classes instead.
        *
        * @class MasterClock
        *
        */
        var MasterClock = (function () {
            /**
            *
            * @constructor
            * @return {Kiwi.Time.MasterClock} This Object.
            */
            function MasterClock() {
                /**
                *
                * @property time
                * @type Number
                */
                this.time = 0;
                /**
                *
                * @property now
                * @type Number
                */
                this.now = 0;
                /**
                *
                * @property delta
                * @type Number
                */
                this.delta = 0;
                this._started = Date.now();
                this.time = this._started;
            }
            MasterClock.prototype.objType = function () {
                return "MasterClock";
            };

            /**
            *
            * @method elapsed
            * @return {Number}
            */
            MasterClock.prototype.elapsed = function () {
                return this.now - this._started;
            };

            /**
            *
            * @method totalElapsedSeconds
            * @return {Number}
            */
            MasterClock.prototype.totalElapsedSeconds = function () {
                return (this.now - this._started) * 0.001;
            };

            /**
            *
            * @method update
            */
            MasterClock.prototype.update = function () {
                //  Not in < IE8 (fixed via polyfill)
                this.now = Date.now();

                this.delta = this.now - this.time;

                this.time = this.now;

                if (this.delta > 0.1) {
                    this.delta = 0.1;
                }
                //  Apply time scaling
            };

            /**
            *
            * @method elapsedSince
            * @param {Number} since
            * @return {Number}
            */
            MasterClock.prototype.elapsedSince = function (since) {
                return this.now - since;
            };

            /**
            *
            * @method elapsedSecondsSince
            * @param {Number} since
            * @return {Number}
            */
            MasterClock.prototype.elapsedSecondsSince = function (since) {
                return (this.now - since) * 0.001;
            };

            /**
            *
            * @method reset
            */
            MasterClock.prototype.reset = function () {
                this._started = this.now;
            };
            return MasterClock;
        })();
        Time.MasterClock = MasterClock;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Time
    * @module Kiwi
    * @submodule Time
    *
    */
    (function (Time) {
        /**
        * The Timer class hooks into a game clock and allows you run code at a specified point in game time.
        * Use the start() method to start a timer. Add TimerEvents to set-up code to be run on the timer interval.
        * Timer objects can run once or repeat at specified intervals to execute code on a schedule.
        *
        * @class Timer
        *
        */
        var Timer = (function () {
            /**
            * Constructor
            * @param {string} The name of the timer.
            * @param {Kiwi.Time.Clock} The game clock instance this Timer is based on.
            * @param {Number} delay - The number of clock units to wait between firing events.
            * @param {Number} repeatCount - The number of times to repeat the timer before it is expired. If you don't want it to ever expire, set a value of -1.
            * @protected
            * @return (Object) This object.
            */
            function Timer(name, clock, delay, repeatCount) {
                if (typeof repeatCount === "undefined") { repeatCount = 0; }
                /**
                * The number of times the timer has repeated so far.
                * @property _currentCount
                * @type Number
                **/
                this._currentCount = 0;
                /**
                * A collection of the TimerEvents associated with TimerEvent.TIMER_START
                * @property _startEvents
                * @private
                * @type Array
                **/
                this._startEvents = null;
                /**
                * A collection of the TimerEvents associated with TimerEvent.TIMER_COUNT
                * @property _countEvents
                * @private
                * @type Array
                **/
                this._countEvents = null;
                /**
                * A collection of the TimerEvents associated with TimerEvent.TIMER_STOP
                * @property _stopEvents
                * @private
                * @type Array
                **/
                this._stopEvents = null;
                /**
                * The clock which this timer bases its timing on.
                * @property _clock
                * @type Object
                **/
                this._clock = null;
                /**
                * The time the last repeat occurred in clock units.
                * @property _timeLastCount
                * @type Number
                **/
                this._timeLastCount = null;
                /**
                * Whether the timer is in a running state.
                * @property _isRunning
                * @type Boolean
                **/
                this._isRunning = false;
                /**
                * Whether the timer is in a stopped state.
                * @property _isStopped
                * @type Boolean
                **/
                this._isStopped = true;
                /**
                * Whether the timer is in a paused state.
                * @property _isPaused
                * @type Boolean
                **/
                this._isPaused = false;
                /**
                * The name of the timer.
                * @property name
                * @type Number
                **/
                this.name = null;
                /**
                * The delay, in game clock units, that the timer will wait before firing the event
                * @property delay
                * @type Number
                **/
                this.delay = 0;
                /**
                * The number of times the timer will repeat before stopping.
                * @property repeatCount
                * @type Number
                **/
                this.repeatCount = 0;
                this._clock = clock;

                this._startEvents = [];
                this._countEvents = [];
                this._stopEvents = [];

                this.name = name;
                this.delay = delay;
                this.repeatCount = repeatCount;
            }
            Timer.prototype.objType = function () {
                return "Timer";
            };

            /**
            * Get the number of times the timer has repeated.
            * @method getCurrentCount
            * @protected
            * @return (Number)
            **/
            Timer.prototype.currentCount = function () {
                return this._currentCount;
            };

            /**
            * The Timers current state. True if the Timer is running, otherwise false.
            * @method running
            * @return (Boolean)
            **/
            Timer.prototype.isRunning = function () {
                return this._isRunning;
            };

            /**
            * Whether the timer is in a stopped state.
            * @method stopped
            * @return (Boolean)
            **/
            Timer.prototype.isStopped = function () {
                return this._isStopped;
            };

            /**
            * Whether the timer is in a paused state.
            * @method paused
            * @return (Boolean)
            **/
            Timer.prototype.isPaused = function () {
                return this._isPaused;
            };

            /**
            * Checks the list of TimerEvents added and processes them based on their type.
            * @method dispatchEvents
            * @private
            * @param {Number} The type of events to dispatch
            **/
            Timer.prototype.processEvents = function (type) {
                if (type === Time.TimerEvent.TIMER_START) {
                    for (var i = 0; i < this._startEvents.length; i++) {
                        this._startEvents[i].run();
                    }
                } else if (type === Time.TimerEvent.TIMER_COUNT) {
                    for (var i = 0; i < this._countEvents.length; i++) {
                        this._countEvents[i].run();
                    }
                } else if (type === Time.TimerEvent.TIMER_STOP) {
                    for (var i = 0; i < this._stopEvents.length; i++) {
                        this._stopEvents[i].run();
                    }
                }
            };

            /**
            * Internal update loop called by the CLock that this Timer belongs to.
            * @method update
            **/
            Timer.prototype.update = function () {
                if (this._isRunning && this._clock.elapsed() - this._timeLastCount >= this.delay && this._isPaused === false) {
                    this._currentCount++;

                    this.processEvents(Time.TimerEvent.TIMER_COUNT);

                    this._timeLastCount = this._clock.elapsed() || 0;

                    if (this.repeatCount !== -1 && this._currentCount >= this.repeatCount) {
                        this.stop();
                    }
                }
            };

            /**
            * Start the Timer. This will reset the timer and start it. The timer can only be started if it is in a stopped state.
            * @method start
            * @return (Object) this object.
            **/
            Timer.prototype.start = function () {
                if (this._isStopped === true) {
                    this._isRunning = true;
                    this._isPaused = false;
                    this._isStopped = false;

                    this._currentCount = 0;
                    this._timeLastCount = this._clock.elapsed() || 0;

                    this.processEvents(Time.TimerEvent.TIMER_START);
                }

                return this;
            };

            /**
            * Stop the Timer. Only possible when the timer is running or paused.
            * @method stop
            * @return (Object) this object.
            **/
            Timer.prototype.stop = function () {
                if (this._isRunning === true || this._isPaused === true) {
                    this._isRunning = false;
                    this._isPaused = false;
                    this._isStopped = true;

                    this.processEvents(Time.TimerEvent.TIMER_STOP);
                }

                return this;
            };

            /**
            * Pause the Timer. Only possible when the timer is running.
            * @method pause
            * @return (Object) this object.
            **/
            Timer.prototype.pause = function () {
                if (this._isRunning === true) {
                    this._isRunning = false;
                    this._isPaused = true;
                }

                return this;
            };

            /**
            * Resume the Timer. Only possible if the timer has been paused.
            * @method resume
            * @return (Object) this object.
            **/
            Timer.prototype.resume = function () {
                if (this._isPaused === true) {
                    this._isRunning = true;
                    this._isPaused = false;
                }

                return this;
            };

            /**
            * Adds an existing TimerEvent object to this Timer.
            * @method addTimerEvent
            * @param {Kiwi.Time.TimerEvent} A TimerEvent object
            * @return {Kiwi.Time.TimerEvent} The TimerEvent object
            **/
            Timer.prototype.addTimerEvent = function (event) {
                if (event.type === Time.TimerEvent.TIMER_START) {
                    this._startEvents.push(event);
                } else if (event.type === Time.TimerEvent.TIMER_COUNT) {
                    this._countEvents.push(event);
                } else if (event.type === Time.TimerEvent.TIMER_STOP) {
                    this._stopEvents.push(event);
                }

                return event;
            };

            /**
            * Creates a new TimerEvent and adds it to this Timer
            * @method createTimerEvent
            * @param {Number} The type of TimerEvent to create (TIMER_START, TIMER_COUNT or TIMER_STOP).
            * @param {Function} The function to call when the TimerEvent fires.
            * @param {Function} The context in which the given function will run (usually 'this')
            * @return {Kiwi.Time.TimerEvent} The newly created TimerEvent.
            **/
            Timer.prototype.createTimerEvent = function (type, callback, context) {
                if (type === Time.TimerEvent.TIMER_START) {
                    this._startEvents.push(new Time.TimerEvent(type, callback, context));
                    return this._startEvents[this._startEvents.length - 1];
                } else if (type === Time.TimerEvent.TIMER_COUNT) {
                    this._countEvents.push(new Time.TimerEvent(type, callback, context));
                    return this._countEvents[this._countEvents.length - 1];
                } else if (type === Time.TimerEvent.TIMER_STOP) {
                    this._stopEvents.push(new Time.TimerEvent(type, callback, context));
                    return this._stopEvents[this._stopEvents.length - 1];
                }

                return null;
            };

            /**
            * Removes a TimerEvent object from this Timer
            * @method removeTimerEvent
            * @param {Kiwi.Time.TimerEvent} The TimerEvent to remove
            * @return {Boolean} True if the event was removed, otherwise false.
            **/
            Timer.prototype.removeTimerEvent = function (event) {
                var removed = [];

                if (event.type === Time.TimerEvent.TIMER_START) {
                    removed = this._startEvents.splice(this._startEvents.indexOf(event), 1);
                } else if (event.type === Time.TimerEvent.TIMER_COUNT) {
                    removed = this._countEvents.splice(this._countEvents.indexOf(event), 1);
                } else if (event.type === Time.TimerEvent.TIMER_STOP) {
                    removed = this._stopEvents.splice(this._stopEvents.indexOf(event), 1);
                }

                if (removed.length === 1) {
                    return true;
                } else {
                    return false;
                }
            };

            /**
            * Removes all TimerEvent objects from this Timer
            * @method clear
            * @param {Number} The type of TimerEvents to remove. Set to zero to remove them all.
            * @return {Boolean} True if the event was removed, otherwise false.
            **/
            Timer.prototype.clear = function (type) {
                if (typeof type === "undefined") { type = 0; }
                if (type === 0) {
                    this._startEvents.length = 0;
                    this._countEvents.length = 0;
                    this._stopEvents.length = 0;
                } else if (type === Time.TimerEvent.TIMER_START) {
                    this._startEvents.length = 0;
                } else if (type === Time.TimerEvent.TIMER_COUNT) {
                    this._countEvents.length = 0;
                } else if (type === Time.TimerEvent.TIMER_STOP) {
                    this._stopEvents.length = 0;
                }
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            Timer.prototype.toString = function () {
                return "[{Timer (name=" + this.name + " delay=" + this.delay + " repeatCount=" + this.repeatCount + " running=" + this._isRunning + ")}]";
            };
            return Timer;
        })();
        Time.Timer = Timer;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Time
    * @module Kiwi
    * @submodule Time
    *
    */
    (function (Time) {
        /**
        *
        *
        * @
        *
        */
        var TimerEvent = (function () {
            /**
            * @constructor
            * @param {Number} type
            * @param {Any} callback
            * @return {Kiwi.Time.TimerEvent} This Object.
            */
            function TimerEvent(type, callback, context) {
                /**
                * The callback to be called when this TimerEvent triggers
                * @property _callback
                * @private
                * @type Function
                **/
                this._callback = null;
                /**
                * The type of TimerEvent
                * @property type
                * @type Funcation
                **/
                this.type = 0;
                this.type = type;
                this._callback = callback;
                this._callbackContext = context;
            }
            TimerEvent.prototype.objType = function () {
                return "TimerEvent";
            };

            /**
            * Fires the callback associated with this TimerEvent
            * @method run
            **/
            TimerEvent.prototype.run = function () {
                if (this._callback) {
                    this._callback.apply(this._callbackContext);
                }
            };
            TimerEvent.TIMER_START = 1;

            TimerEvent.TIMER_COUNT = 2;

            TimerEvent.TIMER_STOP = 3;
            return TimerEvent;
        })();
        Time.TimerEvent = TimerEvent;
    })(Kiwi.Time || (Kiwi.Time = {}));
    var Time = Kiwi.Time;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Utils
    * @module Kiwi
    * @submodule Utils
    */
    (function (Utils) {
        /**
        * Creates a canvas DOM element and adds it to a layer.
        *
        * @class Canvas
        *
        */
        var Canvas = (function () {
            /**
            *
            * @constructor
            * @param {Kiwi.Layer} layer
            * @param {Number} width
            * @param {Number} height
            * @param {Boolean} visible
            * @param {Boolean} offScreen
            * @return {Kiwi.Utils.Canvas}
            **/
            function Canvas(width, height, visible, offScreen) {
                if (typeof visible === "undefined") { visible = true; }
                if (typeof offScreen === "undefined") { offScreen = false; }
                /**
                * @property domElement
                * @type HTMLCanvasElement
                */
                this.domElement = null;
                /**
                * @property _context
                * @type CanvasRenderingContext2D
                */
                this.context = null;
                /**
                * @property _visible
                * @type Boolean
                * @private
                */
                this._visible = true;
                /**
                * @property _offScreen
                * @type Boolean
                * @private
                */
                this._offScreen = false;
                /**
                * @property _clearMode
                * @type Number
                * @private
                */
                this._clearMode = 1;
                /**
                * @property bgColor
                * @type String
                */
                //  swap for color component?
                this.bgColor = 'rgb(0, 0, 0)';
                this.domElement = document.createElement('canvas');
                this.domElement.width = width;
                this.domElement.height = height;

                this._width = width;
                this._height = height;

                this.context = this.domElement.getContext('2d');

                this._offScreen = offScreen;
                this._visible = visible;

                if (visible === false) {
                    this.domElement.style.display = 'none';
                }
            }

            Object.defineProperty(Canvas.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this._updatedSize();
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Canvas.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._updatedSize();
                },
                enumerable: true,
                configurable: true
            });

            Canvas.prototype.objType = function () {
                return "Canvas";
            };

            /**
            * @method _updatedSize
            * @param {Number} width
            * @param {Number} height
            * @private
            */
            Canvas.prototype._updatedSize = function () {
                this.domElement.width = this._width;
                this.domElement.height = this._height;
            };

            /**
            * @method destroy
            */
            Canvas.prototype.destroy = function () {
                if (this._offScreen === false) {
                    this.domElement.style.display = 'none';
                }
            };


            Object.defineProperty(Canvas.prototype, "visible", {
                get: function () {
                    return this._visible;
                },
                set: /**
                * @method visible
                * @param {Boolean} value
                * @return {Boolean}
                */
                function (value) {
                    if (value !== null && value !== this._visible) {
                        this._visible = value;

                        if (value === true) {
                            this.domElement.style.display = 'block';
                        } else {
                            this.domElement.style.display = 'none';
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Canvas.prototype, "clearMode", {
                get: function () {
                    return this._clearMode;
                },
                set: /**
                * Gets
                * @method clearMode
                * @return {Number}
                */
                function (value) {
                    if (value !== null && value !== this._clearMode && value >= Kiwi.Utils.Canvas.CLEARMODE_NONE && value <= Kiwi.Utils.Canvas.CLEARMODE_FILLRECT_ALPHA) {
                        this._clearMode = value;
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * @method clear
            */
            Canvas.prototype.clear = function () {
                if (this._clearMode === Canvas.CLEARMODE_NONE) {
                    //  Do nothing
                } else if (this._clearMode === Canvas.CLEARMODE_CLEARRECT) {
                    //  Clear Rect
                    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
                } else if (this._clearMode === Canvas.CLEARMODE_FILLRECT) {
                    //  Fill Rect Solid
                    this.context.fillStyle = this.bgColor;
                    this.context.fillRect(0, 0, this.domElement.width, this.domElement.height);
                } else if (this._clearMode === Canvas.CLEARMODE_FILLRECT_ALPHA) {
                    //  Clear Rect + Fill Rect (only use if bgColor contains alpha < 255)
                    this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
                    this.context.fillStyle = this.bgColor;
                    this.context.fillRect(0, 0, this.domElement.width, this.domElement.height);
                }
            };

            /**
            * @method saveAsPNG
            * @return String
            */
            Canvas.prototype.saveAsPNG = function () {
                return this.domElement.toDataURL();
            };

            /**
            * Returns a string representation of this object.
            * @method toString
            * @return {string} a string representation of the instance.
            **/
            Canvas.prototype.toString = function () {
                return '[{Canvas (width=' + this.width + ' height=' + this.height + ' visible=' + this.visible + ' offScreen=' + this._offScreen + ' clearMode=' + this.clearMode + ')}]';
            };
            Canvas.CLEARMODE_NONE = 0;

            Canvas.CLEARMODE_CLEARRECT = 1;

            Canvas.CLEARMODE_FILLRECT = 2;

            Canvas.CLEARMODE_FILLRECT_ALPHA = 3;
            return Canvas;
        })();
        Utils.Canvas = Canvas;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Utils
    * @module Kiwi
    * @submodule Utils
    * @main Utils
    */
    (function (Utils) {
        /**
        * Methods to assist in working with Structs.
        * A lot of the functions in this class are Copyright 2012 Mauricio Santos and used with permission.
        * His work is licensed under the Apache License, Version 2.0 (the "License")
        *
        * @class Common
        *
        * @author Mauricio Santos
        */
        var Common = (function () {
            function Common() {
            }
            Common.defaultCompare = /**
            * Default function to compare element order.
            * @method defaultCompare
            * @param {Any} a.
            * @param {Any} b.
            * @return {Number}
            * @static
            */
            function (a, b) {
                if (a < b) {
                    return -1;
                } else if (a === b) {
                    return 0;
                } else {
                    return 1;
                }
            };

            Common.prototype.objType = function () {
                return "Common";
            };

            Common.defaultEquals = /**
            * Default function to test equality.
            * @method defaultEquals
            * @param {Any} a.
            * @param {Any} b.
            * @return {Boolean}
            * @static
            */
            function (a, b) {
                return a === b;
            };

            Common.defaultTostring = /**
            * Default function to convert an object to a string.
            * @method defaultTostring
            * @param {Any} item.
            * @return {Any}
            * @static
            */
            function (item) {
                if (item === null) {
                    return 'KIWI_NULL';
                } else if (Kiwi.Utils.Common.isUndefined(item)) {
                    return 'KIWI_UNDEFINED';
                } else if (Kiwi.Utils.Common.isString(item)) {
                    return item;
                } else {
                    return item.toString();
                }
            };

            Common.isFunction = /**
            * Checks if the given argument is a function.
            * @method isFunction
            * @param {Any} func.
            * @return {Boolean}
            * @static
            */
            function (func) {
                return (typeof func) === 'function';
            };

            Common.isNumeric = /**
            * Checks if the given value is numeric.
            */
            function (value) {
                return !isNaN(value);
            };

            Common.isUndefined = /**
            * Checks if the given argument is undefined.
            * @method isUndefined
            * @param {Any} obj.
            * @return {Boolean}
            * @static
            */
            function (obj) {
                return (typeof obj) === 'undefined';
            };

            Common.isString = /**
            * Checks if the given argument is a string.
            * @method isString
            * @param {Any} obj.
            * @return {Boolean}
            * @static
            */
            function (obj) {
                return Object.prototype.toString.call(obj) === '[object string]';
            };

            Common.reverseCompareFunction = /**
            * Reverses a compare function.
            * @method reverseCompareFunction
            * @param {Any} compareFunction.
            * @return {Number}
            * @static
            */
            function (compareFunction) {
                if (!Kiwi.Utils.Common.isFunction(compareFunction)) {
                    return function (a, b) {
                        if (a < b) {
                            return 1;
                        } else if (a === b) {
                            return 0;
                        } else {
                            return -1;
                        }
                    };
                } else {
                    return function (d, v) {
                        return compareFunction(d, v) * -1;
                    };
                }
            };

            Common.compareToEquals = /**
            * Returns an equal function given a compare function.
            * @method compareToEquals
            * @param {Any} compareFunction.
            * @return {Boolean}
            * @static
            */
            function (compareFunction) {
                return function (a, b) {
                    return compareFunction(a, b) === 0;
                };
            };

            Common.shuffleArray = function (array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }

                return array;
            };
            return Common;
        })();
        Utils.Common = Common;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Utils
    * @module Kiwi
    * @submodule Utils
    */
    (function (Utils) {
        /**
        * Adds a set of extra Math functions and extends a few commonly used ones.
        * Includes some methods written by Dylan Engelman.
        *
        * @class GameMath
        *
        * @author Richard Davey
        * @author Dylan Engelman
        */
        var GameMath = (function () {
            function GameMath() {
            }
            GameMath.prototype.objType = function () {
                return "GameMath";
            };

            GameMath.computeMachineEpsilon = function () {
                // Machine epsilon ala Eispack
                var fourThirds = 4.0 / 3.0;
                var third = fourThirds - 1.0;
                var one = third + third + third;
                return Math.abs(1.0 - one);
            };

            GameMath.fuzzyEqual = function (a, b, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return Math.abs(a - b) < epsilon;
            };

            GameMath.fuzzyLessThan = function (a, b, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return a < b + epsilon;
            };

            GameMath.fuzzyGreaterThan = function (a, b, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return a > b - epsilon;
            };

            GameMath.fuzzyCeil = function (val, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return Math.ceil(val - epsilon);
            };

            GameMath.fuzzyFloor = function (val, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return Math.floor(val + epsilon);
            };

            GameMath.average = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                var avg = 0;

                for (var i = 0; i < args.length; i++) {
                    avg += args[i];
                }

                return avg / args.length;
            };

            GameMath.slam = function (value, target, epsilon) {
                if (typeof epsilon === "undefined") { epsilon = 0.0001; }
                return (Math.abs(value - target) < epsilon) ? target : value;
            };

            GameMath.percentageMinMax = /**
            * ratio of value to a range
            */
            function (val, max, min) {
                if (typeof min === "undefined") { min = 0; }
                val -= min;
                max -= min;

                if (!max)
                    return 0;
else
                    return val / max;
            };

            GameMath.sign = /**
            * a value representing the sign of the value.
            * -1 for negative, +1 for positive, 0 if value is 0
            */
            function (n) {
                if (n)
                    return n / Math.abs(n);
else
                    return 0;
            };

            GameMath.truncate = function (n) {
                return (n > 0) ? Math.floor(n) : Math.ceil(n);
            };

            GameMath.shear = function (n) {
                return n % 1;
            };

            GameMath.wrap = /**
            * wrap a value around a range, similar to modulus with a floating minimum
            */
            function (val, max, min) {
                if (typeof min === "undefined") { min = 0; }
                val -= min;
                max -= min;
                if (max == 0)
                    return min;
                val %= max;
                val += min;
                while (val < min)
                    val += max;

                return val;
            };

            GameMath.arithWrap = /**
            * arithmetic version of wrap... need to decide which is more efficient
            */
            function (value, max, min) {
                if (typeof min === "undefined") { min = 0; }
                max -= min;
                if (max == 0)
                    return min;
                return value - max * Math.floor((value - min) / max);
            };

            GameMath.clamp = /**
            * force a value within the boundaries of two values
            *
            * if max < min, min is returned
            */
            function (input, max, min) {
                if (typeof min === "undefined") { min = 0; }
                return Math.max(min, Math.min(max, input));
            };

            GameMath.snapTo = /**
            * Snap a value to nearest grid slice, using rounding.
            *
            * example if you have an interval gap of 5 and a position of 12... you will snap to 10. Where as 14 will snap to 15
            *
            * @param input - the value to snap
            * @param gap - the interval gap of the grid
            * @param start - optional starting offset for gap
            */
            function (input, gap, start) {
                if (typeof start === "undefined") { start = 0; }
                if (gap == 0)
                    return input;

                input -= start;
                input = gap * Math.round(input / gap);
                return start + input;
            };

            GameMath.snapToFloor = /**
            * Snap a value to nearest grid slice, using floor.
            *
            * example if you have an interval gap of 5 and a position of 12... you will snap to 10. As will 14 snap to 10... but 16 will snap to 15
            *
            * @param input - the value to snap
            * @param gap - the interval gap of the grid
            * @param start - optional starting offset for gap
            */
            function (input, gap, start) {
                if (typeof start === "undefined") { start = 0; }
                if (gap == 0)
                    return input;

                input -= start;
                input = gap * Math.floor(input / gap);
                return start + input;
            };

            GameMath.snapToCeil = /**
            * Snap a value to nearest grid slice, using ceil.
            *
            * example if you have an interval gap of 5 and a position of 12... you will snap to 15. As will 14 will snap to 15... but 16 will snap to 20
            *
            * @param input - the value to snap
            * @param gap - the interval gap of the grid
            * @param start - optional starting offset for gap
            */
            function (input, gap, start) {
                if (typeof start === "undefined") { start = 0; }
                if (gap == 0)
                    return input;

                input -= start;
                input = gap * Math.ceil(input / gap);
                return start + input;
            };

            GameMath.snapToInArray = /**
            * Snaps a value to the nearest value in an array.
            */
            function (input, arr, sort) {
                if (typeof sort === "undefined") { sort = true; }
                if (sort)
                    arr.sort();
                if (input < arr[0])
                    return arr[0];

                var i = 1;

                while (arr[i] < input)
                    i++;

                var low = arr[i - 1];
                var high = (i < arr.length) ? arr[i] : Number.POSITIVE_INFINITY;

                return ((high - input) <= (input - low)) ? high : low;
            };

            GameMath.roundTo = /**
            * roundTo some place comparative to a 'base', default is 10 for decimal place
            *
            * 'place' is represented by the power applied to 'base' to get that place
            *
            * @param value - the value to round
            * @param place - the place to round to
            * @param base - the base to round in... default is 10 for decimal
            *
            * e.g.
            *
            * 2000/7 ~= 285.714285714285714285714 ~= (bin)100011101.1011011011011011
            *
            * roundTo(2000/7,3) == 0
            * roundTo(2000/7,2) == 300
            * roundTo(2000/7,1) == 290
            * roundTo(2000/7,0) == 286
            * roundTo(2000/7,-1) == 285.7
            * roundTo(2000/7,-2) == 285.71
            * roundTo(2000/7,-3) == 285.714
            * roundTo(2000/7,-4) == 285.7143
            * roundTo(2000/7,-5) == 285.71429
            *
            * roundTo(2000/7,3,2)  == 288       -- 100100000
            * roundTo(2000/7,2,2)  == 284       -- 100011100
            * roundTo(2000/7,1,2)  == 286       -- 100011110
            * roundTo(2000/7,0,2)  == 286       -- 100011110
            * roundTo(2000/7,-1,2) == 285.5     -- 100011101.1
            * roundTo(2000/7,-2,2) == 285.75    -- 100011101.11
            * roundTo(2000/7,-3,2) == 285.75    -- 100011101.11
            * roundTo(2000/7,-4,2) == 285.6875  -- 100011101.1011
            * roundTo(2000/7,-5,2) == 285.71875 -- 100011101.10111
            *
            * note what occurs when we round to the 3rd space (8ths place), 100100000, this is to be assumed
            * because we are rounding 100011.1011011011011011 which rounds up.
            */
            function (value, place, base) {
                if (typeof place === "undefined") { place = 0; }
                if (typeof base === "undefined") { base = 10; }
                var p = Math.pow(base, -place);
                return Math.round(value * p) / p;
            };

            GameMath.floorTo = function (value, place, base) {
                if (typeof place === "undefined") { place = 0; }
                if (typeof base === "undefined") { base = 10; }
                var p = Math.pow(base, -place);
                return Math.floor(value * p) / p;
            };

            GameMath.ceilTo = function (value, place, base) {
                if (typeof place === "undefined") { place = 0; }
                if (typeof base === "undefined") { base = 10; }
                var p = Math.pow(base, -place);
                return Math.ceil(value * p) / p;
            };

            GameMath.interpolateFloat = /**
            * a one dimensional linear interpolation of a value.
            */
            function (a, b, weight) {
                return (b - a) * weight + a;
            };

            GameMath.radiansToDegrees = /**
            * convert radians to degrees
            */
            function (angle) {
                return angle * GameMath.RAD_TO_DEG;
            };

            GameMath.degreesToRadians = /**
            * convert degrees to radians
            */
            function (angle) {
                return angle * GameMath.DEG_TO_RAD;
            };

            GameMath.angleBetween = /**
            * Find the angle of a segment from (x1, y1) -> (x2, y2 )
            */
            function (x1, y1, x2, y2) {
                return Math.atan2(y2 - y1, x2 - x1);
            };

            GameMath.normalizeAngle = /**
            * set an angle with in the bounds of -PI to PI
            */
            function (angle, radians) {
                if (typeof radians === "undefined") { radians = true; }
                var rd = (radians) ? GameMath.PI : 180;
                return GameMath.wrap(angle, rd, -rd);
            };

            GameMath.nearestAngleBetween = /**
            * closest angle between two angles from a1 to a2
            * absolute value the return for exact angle
            */
            function (a1, a2, radians) {
                if (typeof radians === "undefined") { radians = true; }
                var rd = (radians) ? GameMath.PI : 180;

                a1 = GameMath.normalizeAngle(a1, radians);
                a2 = GameMath.normalizeAngle(a2, radians);

                if (a1 < -rd / 2 && a2 > rd / 2)
                    a1 += rd * 2;
                if (a2 < -rd / 2 && a1 > rd / 2)
                    a2 += rd * 2;

                return a2 - a1;
            };

            GameMath.normalizeAngleToAnother = /**
            * normalizes independent and then sets dep to the nearest value respective to independent
            *
            * for instance if dep=-170 and ind=170 then 190 will be returned as an alternative to -170
            */
            function (dep, ind, radians) {
                if (typeof radians === "undefined") { radians = true; }
                return ind + Kiwi.Utils.GameMath.nearestAngleBetween(ind, dep, radians);
            };

            GameMath.normalizeAngleAfterAnother = /**
            * normalize independent and dependent and then set dependent to an angle relative to 'after/clockwise' independent
            *
            * for instance dep=-170 and ind=170, then 190 will be reutrned as alternative to -170
            */
            function (dep, ind, radians) {
                if (typeof radians === "undefined") { radians = true; }
                dep = Kiwi.Utils.GameMath.normalizeAngle(dep - ind, radians);
                return ind + dep;
            };

            GameMath.normalizeAngleBeforeAnother = /**
            * normalizes indendent and dependent and then sets dependent to an angle relative to 'before/counterclockwise' independent
            *
            * for instance dep = 190 and ind = 170, then -170 will be returned as an alternative to 190
            */
            function (dep, ind, radians) {
                if (typeof radians === "undefined") { radians = true; }
                dep = Kiwi.Utils.GameMath.normalizeAngle(ind - dep, radians);
                return ind - dep;
            };

            GameMath.interpolateAngles = /**
            * interpolate across the shortest arc between two angles
            */
            function (a1, a2, weight, radians, ease) {
                if (typeof radians === "undefined") { radians = true; }
                if (typeof ease === "undefined") { ease = null; }
                a1 = Kiwi.Utils.GameMath.normalizeAngle(a1, radians);
                a2 = Kiwi.Utils.GameMath.normalizeAngleToAnother(a2, a1, radians);

                return (typeof ease === 'function') ? ease(weight, a1, a2 - a1, 1) : Kiwi.Utils.GameMath.interpolateFloat(a1, a2, weight);
            };

            GameMath.logBaseOf = /**
            * Compute the logarithm of any value of any base
            *
            * a logarithm is the exponent that some constant (base) would have to be raised to
            * to be equal to value.
            *
            * i.e.
            * 4 ^ x = 16
            * can be rewritten as to solve for x
            * logB4(16) = x
            * which with this function would be
            * LoDMath.logBaseOf(16,4)
            *
            * which would return 2, because 4^2 = 16
            */
            function (value, base) {
                return Math.log(value) / Math.log(base);
            };

            GameMath.GCD = /**
            * Greatest Common Denominator using Euclid's algorithm
            */
            function (m, n) {
                var r;

                //make sure positive, GCD is always positive
                m = Math.abs(m);
                n = Math.abs(n);

                if (m < n) {
                    r = m;
                    m = n;
                    n = r;
                }

                while (true) {
                    r = m % n;
                    if (!r)
                        return n;
                    m = n;
                    n = r;
                }

                return 1;
            };

            GameMath.LCM = /**
            * Lowest Common Multiple
            */
            function (m, n) {
                return (m * n) / Kiwi.Utils.GameMath.GCD(m, n);
            };

            GameMath.factorial = /**
            * Factorial - N!
            *
            * simple product series
            *
            * by definition:
            * 0! == 1
            */
            function (value) {
                if (value == 0)
                    return 1;

                var res = value;

                while (--value) {
                    res *= value;
                }

                return res;
            };

            GameMath.gammaFunction = /**
            * gamma function
            *
            * defined: gamma(N) == (N - 1)!
            */
            function (value) {
                return Kiwi.Utils.GameMath.factorial(value - 1);
            };

            GameMath.fallingFactorial = /**
            * falling factorial
            *
            * defined: (N)! / (N - x)!
            *
            * written subscript: (N)x OR (base)exp
            */
            function (base, exp) {
                return Kiwi.Utils.GameMath.factorial(base) / Kiwi.Utils.GameMath.factorial(base - exp);
            };

            GameMath.risingFactorial = /**
            * rising factorial
            *
            * defined: (N + x - 1)! / (N - 1)!
            *
            * written superscript N^(x) OR base^(exp)
            */
            function (base, exp) {
                //expanded from gammaFunction for speed
                return Kiwi.Utils.GameMath.factorial(base + exp - 1) / Kiwi.Utils.GameMath.factorial(base - 1);
            };

            GameMath.binCoef = /**
            * binomial coefficient
            *
            * defined: N! / (k!(N-k)!)
            * reduced: N! / (N-k)! == (N)k (fallingfactorial)
            * reduced: (N)k / k!
            */
            function (n, k) {
                return Kiwi.Utils.GameMath.fallingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
            };

            GameMath.risingBinCoef = /**
            * rising binomial coefficient
            *
            * as one can notice in the analysis of binCoef(...) that
            * binCoef is the (N)k divided by k!. Similarly rising binCoef
            * is merely N^(k) / k!
            */
            function (n, k) {
                return Kiwi.Utils.GameMath.risingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
            };

            GameMath.chanceRoll = /**
            * Generate a random boolean result based on the chance value
            * <p>
            * Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance
            * of getting a bonus, call chanceRoll(30) - true means the chance passed, false means it failed.
            * </p>
            * @param chance The chance of receiving the value. A number between 0 and 100 (effectively 0% to 100%)
            * @return true if the roll passed, or false
            */
            function (chance) {
                if (typeof chance === "undefined") { chance = 50; }
                if (chance <= 0) {
                    return false;
                } else if (chance >= 100) {
                    return true;
                } else {
                    if (Math.random() * 100 >= chance) {
                        return false;
                    } else {
                        return true;
                    }
                }
            };

            GameMath.maxAdd = /**
            * Adds the given amount to the value, but never lets the value go over the specified maximum
            *
            * @param value The value to add the amount to
            * @param amount The amount to add to the value
            * @param max The maximum the value is allowed to be
            * @return The new value
            */
            function (value, amount, max) {
                value += amount;

                if (value > max) {
                    value = max;
                }

                return value;
            };

            GameMath.minSub = /**
            * Subtracts the given amount from the value, but never lets the value go below the specified minimum
            *
            * @param value The base value
            * @param amount The amount to subtract from the base value
            * @param min The minimum the value is allowed to be
            * @return The new value
            */
            function (value, amount, min) {
                value -= amount;

                if (value < min) {
                    value = min;
                }

                return value;
            };

            GameMath.wrapValue = /**
            * Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
            * <p>Values must be positive integers, and are passed through Math.abs</p>
            *
            * @param value The value to add the amount to
            * @param amount The amount to add to the value
            * @param max The maximum the value is allowed to be
            * @return The wrapped value
            */
            function (value, amount, max) {
                var diff;

                value = Math.abs(value);
                amount = Math.abs(amount);
                max = Math.abs(max);

                diff = (value + amount) % max;

                return diff;
            };

            GameMath.randomSign = /**
            * Randomly returns either a 1 or -1
            *
            * @return	1 or -1
            */
            function () {
                return (Math.random() > 0.5) ? 1 : -1;
            };

            GameMath.isOdd = /**
            * Returns true if the number given is odd.
            *
            * @param	n	The number to check
            *
            * @return	True if the given number is odd. False if the given number is even.
            */
            function (n) {
                if (n & 1) {
                    return true;
                } else {
                    return false;
                }
            };

            GameMath.isEven = /**
            * Returns true if the number given is even.
            *
            * @param	n	The number to check
            *
            * @return	True if the given number is even. False if the given number is odd.
            */
            function (n) {
                if (n & 1) {
                    return false;
                } else {
                    return true;
                }
            };

            GameMath.wrapAngle = /**
            * Keeps an angle value between -180 and +180<br>
            * Should be called whenever the angle is updated on the Sprite to stop it from going insane.
            *
            * @param	angle	The angle value to check
            *
            * @return	The new angle value, returns the same as the input angle if it was within bounds
            */
            function (angle) {
                var result = angle;

                if (angle >= -180 && angle <= 180) {
                    return angle;
                }

                //  Else normalise it to -180, 180
                result = (angle + 180) % 360;

                if (result < 0) {
                    result += 360;
                }

                return result - 180;
            };

            GameMath.angleLimit = /**
            * Keeps an angle value between the given min and max values
            *
            * @param	angle	The angle value to check. Must be between -180 and +180
            * @param	min		The minimum angle that is allowed (must be -180 or greater)
            * @param	max		The maximum angle that is allowed (must be 180 or less)
            *
            * @return	The new angle value, returns the same as the input angle if it was within bounds
            */
            function (angle, min, max) {
                var result = angle;

                if (angle > max) {
                    result = max;
                } else if (angle < min) {
                    result = min;
                }

                return result;
            };

            GameMath.linearInterpolation = /**
            * @method linear
            * @param {Any} v
            * @param {Any} k
            * @static
            */
            function (v, k) {
                var m = v.length - 1;
                var f = m * k;
                var i = Math.floor(f);

                if (k < 0)
                    return Kiwi.Utils.GameMath.linear(v[0], v[1], f);
                if (k > 1)
                    return Kiwi.Utils.GameMath.linear(v[m], v[m - 1], m - f);

                return Kiwi.Utils.GameMath.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
            };

            GameMath.bezierInterpolation = /**
            * @method Bezier
            * @param {Any} v
            * @param {Any} k
            * @static
            */
            function (v, k) {
                var b = 0;
                var n = v.length - 1;

                for (var i = 0; i <= n; i++) {
                    b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Kiwi.Utils.GameMath.bernstein(n, i);
                }

                return b;
            };

            GameMath.catmullRomInterpolation = /**
            * @method CatmullRom
            * @param {Any} v
            * @param {Any} k
            * @static
            */
            function (v, k) {
                var m = v.length - 1;
                var f = m * k;
                var i = Math.floor(f);

                if (v[0] === v[m]) {
                    if (k < 0)
                        i = Math.floor(f = m * (1 + k));

                    return Kiwi.Utils.GameMath.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
                } else {
                    if (k < 0)
                        return v[0] - (Kiwi.Utils.GameMath.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);

                    if (k > 1)
                        return v[m] - (Kiwi.Utils.GameMath.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

                    return Kiwi.Utils.GameMath.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
                }
            };

            GameMath.linear = /**
            * @method Linear
            * @param {Any} p0
            * @param {Any} p1
            * @param {Any} t
            * @static
            */
            function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            };

            GameMath.bernstein = /**
            * @method Bernstein
            * @param {Any} n
            * @param {Any} i
            * @static
            */
            function (n, i) {
                return Kiwi.Utils.GameMath.factorial(n) / Kiwi.Utils.GameMath.factorial(i) / Kiwi.Utils.GameMath.factorial(n - i);
            };

            GameMath.catmullRom = /**
            * @method CatmullRom
            * @param {Any} p0
            * @param {Any} p1
            * @param {Any} p2
            * @param {Any} p3
            * @param {Any} t
            * @static
            */
            function (p0, p1, p2, p3, t) {
                var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            };

            GameMath.difference = function (a, b) {
                return Math.abs(a - b);
            };
            GameMath.PI = 3.141592653589793;
            GameMath.PI_2 = 1.5707963267948965;
            GameMath.PI_4 = 0.7853981633974483;
            GameMath.PI_8 = 0.39269908169872413;
            GameMath.PI_16 = 0.19634954084936206;
            GameMath.TWO_PI = 6.283185307179586;
            GameMath.THREE_PI_2 = 4.7123889803846895;
            GameMath.E = 2.71828182845905;
            GameMath.LN10 = 2.302585092994046;
            GameMath.LN2 = 0.6931471805599453;
            GameMath.LOG10E = 0.4342944819032518;
            GameMath.LOG2E = 1.442695040888963387;
            GameMath.SQRT1_2 = 0.7071067811865476;
            GameMath.SQRT2 = 1.4142135623730951;
            GameMath.DEG_TO_RAD = 0.017453292519943294444444444444444;
            GameMath.RAD_TO_DEG = 57.295779513082325225835265587527;

            GameMath.B_16 = 65536;
            GameMath.B_31 = 2147483648;
            GameMath.B_32 = 4294967296;
            GameMath.B_48 = 281474976710656;
            GameMath.B_53 = 9007199254740992;
            GameMath.B_64 = 18446744073709551616;

            GameMath.ONE_THIRD = 0.333333333333333333333333333333333;
            GameMath.TWO_THIRDS = 0.666666666666666666666666666666666;
            GameMath.ONE_SIXTH = 0.166666666666666666666666666666666;

            GameMath.COS_PI_3 = 0.86602540378443864676372317075294;
            GameMath.SIN_2PI_3 = 0.03654595;

            GameMath.CIRCLE_ALPHA = 0.5522847498307933984022516322796;

            GameMath.ON = true;
            GameMath.OFF = false;

            GameMath.SHORT_EPSILON = 0.1;
            GameMath.PERC_EPSILON = 0.001;
            GameMath.EPSILON = 0.0001;
            GameMath.LONG_EPSILON = 0.00000001;
            return GameMath;
        })();
        Utils.GameMath = GameMath;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Utils
    * @module Kiwi
    * @submodule Utils
    */
    (function (Utils) {
        /**
        * Manages the creation of unique internal game IDs.
        * Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense
        * Random number generator from http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
        *
        * @class RandomDataGenerator
        *
        * @author Josh Faul
        */
        var RandomDataGenerator = (function () {
            /**
            * @constructor
            * @param {Array} seeds
            * @return {Kiwi.Utils.RandomDataGenerator}
            */
            function RandomDataGenerator(seeds) {
                if (typeof seeds === "undefined") { seeds = []; }
                /**
                * @property c
                * @type Number
                * @private
                */
                this.c = 1;
                /**
                * @property _data
                * @private
                */
                this._data = {
                    lipsum: [
                        "lorem",
                        "ipsum",
                        "dolor",
                        "sit",
                        "amet",
                        "consectetur",
                        "adipiscing",
                        "elit",
                        "nunc",
                        "sagittis",
                        "tortor",
                        "ac",
                        "mi",
                        "pretium",
                        "sed",
                        "convallis",
                        "massa",
                        "pulvinar",
                        "curabitur",
                        "non",
                        "turpis",
                        "velit",
                        "vitae",
                        "rutrum",
                        "odio",
                        "aliquam",
                        "sapien",
                        "orci",
                        "tempor",
                        "sed",
                        "elementum",
                        "sit",
                        "amet",
                        "tincidunt",
                        "sed",
                        "risus",
                        "etiam",
                        "nec",
                        "lacus",
                        "id",
                        "ante",
                        "hendrerit",
                        "malesuada",
                        "donec",
                        "porttitor",
                        "magna",
                        "eget",
                        "libero",
                        "pharetra",
                        "sollicitudin",
                        "aliquam",
                        "mattis",
                        "mattis",
                        "massa",
                        "et",
                        "porta",
                        "morbi",
                        "vitae",
                        "magna",
                        "augue",
                        "vestibulum",
                        "at",
                        "lectus",
                        "sed",
                        "tellus",
                        "facilisis",
                        "tincidunt",
                        "suspendisse",
                        "eros",
                        "magna",
                        "consequat",
                        "at",
                        "sollicitudin",
                        "ac",
                        "vestibulum",
                        "vel",
                        "dolor",
                        "in",
                        "egestas",
                        "lacus",
                        "quis",
                        "lacus",
                        "placerat",
                        "et",
                        "molestie",
                        "ipsum",
                        "scelerisque",
                        "nullam",
                        "sit",
                        "amet",
                        "tortor",
                        "dui",
                        "aenean",
                        "pulvinar",
                        "odio",
                        "nec",
                        "placerat",
                        "fringilla",
                        "neque",
                        "dolor"
                    ]
                };
                this.sow(seeds);
            }
            RandomDataGenerator.prototype.objType = function () {
                return "RandomDataGenerator";
            };

            /**
            * @method uint32
            * @private
            */
            RandomDataGenerator.prototype.uint32 = function () {
                return this.rnd.apply(this) * 0x100000000;
            };

            /**
            * @method fract32
            * @private
            */
            RandomDataGenerator.prototype.fract32 = function () {
                return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16;
            };

            // private random helper
            /**
            * @method rnd
            * @private
            */
            RandomDataGenerator.prototype.rnd = function () {
                var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10;

                this.c = t | 0;
                this.s0 = this.s1;
                this.s1 = this.s2;
                this.s2 = t - this.c;

                return this.s2;
            };

            /**
            * @method hash
            * @param {Any} data
            * @private
            */
            RandomDataGenerator.prototype.hash = function (data) {
                var h, i, n;

                n = 0xefc8249d;

                data = data.toString();

                for (i = 0; i < data.length; i++) {
                    n += data.charCodeAt(i);
                    h = 0.02519603282416938 * n;
                    n = h >>> 0;
                    h -= n;
                    h *= n;
                    n = h >>> 0;
                    h -= n;
                    n += h * 0x100000000;
                }

                return (n >>> 0) * 2.3283064365386963e-10;
            };

            /**
            * Reset the seed of the random data generator
            * @method sow
            * @param {Array} seeds
            */
            RandomDataGenerator.prototype.sow = function (seeds) {
                if (typeof seeds === "undefined") { seeds = []; }
                this.s0 = this.hash(' ');
                this.s1 = this.hash(this.s0);
                this.s2 = this.hash(this.s1);

                var seed;

                for (var i = 0; seed = seeds[i++];) {
                    this.s0 -= this.hash(seed);
                    this.s0 += ~~(this.s0 < 0);

                    this.s1 -= this.hash(seed);
                    this.s1 += ~~(this.s1 < 0);

                    this.s2 -= this.hash(seed);
                    this.s2 += ~~(this.s2 < 0);
                }
            };

            /**
            * returns a random integer between 0 and 2^32
            * @method integer
            * @return {Number}
            */
            RandomDataGenerator.prototype.integer = function () {
                return this.uint32();
            };

            /**
            *  returns a random real number between 0 and 1
            * @method frac
            * @return {Number}
            */
            RandomDataGenerator.prototype.frac = function () {
                return this.fract32();
            };

            /**
            *  returns a random real number between 0 and 2^32
            * @method real
            * @return {Number}
            */
            RandomDataGenerator.prototype.real = function () {
                return this.uint32() + this.fract32();
            };

            /**
            * returns a random integer between min and max
            * @method integerInRange
            * @param {Number} min
            * @param {Number} max
            * @return {Number}
            */
            RandomDataGenerator.prototype.integerInRange = function (min, max) {
                return Math.floor(this.realInRange(min, max));
            };

            /**
            * returns a random real number between min and max
            * @method realInRange
            * @param {Number} min
            * @param {Number} max
            * @return {Number}
            */
            RandomDataGenerator.prototype.realInRange = function (min, max) {
                min = min || 0;
                max = max || 0;

                return this.frac() * (max - min) + min;
            };

            /**
            * returns a random real number between -1 and 1
            * @method normal
            * @return {Number}
            */
            RandomDataGenerator.prototype.normal = function () {
                return 1 - 2 * this.frac();
            };

            /**
            * returns a valid v4 UUID hex string (from https://gist.github.com/1308368)
            * @method uuid
            * @return {String}
            */
            RandomDataGenerator.prototype.uuid = function () {
                var a, b;

                for (b = a = ''; a++ < 36; b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ this.frac() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-')
                    ;

                return b;
            };

            /**
            * returns a random member of `array`
            * @method pick
            * @param {Any} array
            */
            RandomDataGenerator.prototype.pick = function (array) {
                return array[this.integerInRange(0, array.length)];
            };

            /**
            * returns a random member of `array`, favoring the earlier entries
            * @method weightedPick
            * @param {Any} array
            */
            RandomDataGenerator.prototype.weightedPick = function (array) {
                return array[~~(Math.pow(this.frac(), 2) * array.length)];
            };

            /**
            * returns a random word of lipsum
            * @method word
            */
            RandomDataGenerator.prototype.word = function () {
                return this.pick(this._data.lipsum);
            };

            /**
            * returns `n` random words of lipsum, 3 if not specified
            * @method words
            * @param {Number} quantity
            */
            RandomDataGenerator.prototype.words = function (quantity) {
                if (typeof quantity === "undefined") { quantity = 3; }
                var ret = [];

                for (var i = 0; i < quantity; i++) {
                    ret.push(this.pick(this._data.lipsum));
                }

                return ret.join(' ');
            };

            /**
            * returns a random lipsum sentence
            * @method sentence
            */
            RandomDataGenerator.prototype.sentence = function () {
                var ret;

                ret = this.words(this.integerInRange(2, 16)).replace(/[a-z]/, function (m) {
                    return m.toUpperCase();
                });

                return ret + '.';
            };

            /**
            * returns `n` random lipsum sentences, 3 if not specified
            * @method sentences
            * @param {Number} quantity
            */
            RandomDataGenerator.prototype.sentences = function (quantity) {
                if (typeof quantity === "undefined") { quantity = 3; }
                var ret = [];

                for (var i = 0; i < quantity; i++) {
                    ret.push(this.sentence());
                }

                return ret.join(' ');
            };

            /**
            * `returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified
            * @method timestamp
            * @param {Number} min
            * @param {Number} max
            */
            RandomDataGenerator.prototype.timestamp = function (min, max) {
                if (typeof min === "undefined") { min = 946684800000; }
                if (typeof max === "undefined") { max = 1577862000000; }
                return this.realInRange(min, max);
            };

            /**
            * returns a random angle between -180 and 180
            * @method angle
            */
            RandomDataGenerator.prototype.angle = function () {
                return this.integerInRange(-180, 180);
            };
            return RandomDataGenerator;
        })();
        Utils.RandomDataGenerator = RandomDataGenerator;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
var Kiwi;
(function (Kiwi) {
    /**
    * Kiwi - Utils
    * @module Kiwi
    * @submodule Utils
    */
    (function (Utils) {
        /**
        * Abstracts away the use of RAF or setTimeout for the core game update loop. The callback can be re-mapped on the fly.
        *
        * @class RequestAnimationFrame
        *
        */
        var RequestAnimationFrame = (function () {
            /**
            * Constructor
            * @param {Any} callback
            * @return {Kiwi.Utils.RequestAnimationFrame} This object.
            */
            function RequestAnimationFrame(callback) {
                /**
                *
                * @property _isSetTimeOut
                * @type Boolean
                * @private
                **/
                this._isSetTimeOut = false;
                /**
                *
                * @property lastTime
                * @type Number
                **/
                this.lastTime = 0;
                /**
                *
                * @property currentTime
                * @type Number
                **/
                this.currentTime = 0;
                /**
                *
                * @property isRunning
                * @type Boolean
                **/
                this.isRunning = false;
                this._callback = callback;

                var vendors = ['ms', 'moz', 'webkit', 'o'];

                for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
                    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'];
                }
            }
            RequestAnimationFrame.prototype.objType = function () {
                return "RequestAnimationFrame";
            };

            /**
            *
            * @method callback
            * @param {Any} callback
            **/
            RequestAnimationFrame.prototype.setCallback = function (callback) {
                this._callback = callback;
            };

            /**
            *
            * @method usingSetTimeOut
            * @return Boolean
            **/
            RequestAnimationFrame.prototype.isUsingSetTimeOut = function () {
                return this._isSetTimeOut;
            };

            /**
            *
            * @method usingRAF
            * @return Boolean
            **/
            RequestAnimationFrame.prototype.isUsingRAF = function () {
                if (this._isSetTimeOut === true) {
                    return false;
                } else {
                    return true;
                }
            };

            /**
            *
            * @method start
            * @param {Any} [callback]
            **/
            RequestAnimationFrame.prototype.start = function (callback) {
                if (typeof callback === "undefined") { callback = null; }
                var _this = this;
                if (callback) {
                    this._callback = callback;
                }

                if (!window.requestAnimationFrame) {
                    this._isSetTimeOut = true;
                    this._timeOutID = window.setTimeout(function () {
                        return _this.SetTimeoutUpdate();
                    }, 0);
                } else {
                    this._isSetTimeOut = false;
                    window.requestAnimationFrame(function () {
                        return _this.RAFUpdate();
                    });
                }

                this.isRunning = true;
            };

            /**
            *
            * @method stop
            **/
            RequestAnimationFrame.prototype.stop = function () {
                if (this._isSetTimeOut) {
                    clearTimeout(this._timeOutID);
                } else {
                    window.cancelAnimationFrame;
                }

                this.isRunning = false;
            };

            /**
            *
            * @method RAFUpdate
            **/
            RequestAnimationFrame.prototype.RAFUpdate = function () {
                var _this = this;
                //  Not in IE8 (but neither is RAF) also doesn't use a high performance timer (window.performance.now)
                this.currentTime = Date.now();

                if (this._callback) {
                    this._callback();
                }

                var timeToCall = Math.max(0, 16 - (this.currentTime - this.lastTime));

                window.requestAnimationFrame(function () {
                    return _this.RAFUpdate();
                });

                this.lastTime = this.currentTime + timeToCall;
            };

            /**
            *
            * @method SetTimeoutUpdate
            **/
            RequestAnimationFrame.prototype.SetTimeoutUpdate = function () {
                var _this = this;
                //  Not in IE8
                this.currentTime = Date.now();

                if (this._callback) {
                    this._callback();
                }

                var timeToCall = Math.max(0, 16 - (this.currentTime - this.lastTime));

                this._timeOutID = window.setTimeout(function () {
                    return _this.SetTimeoutUpdate();
                }, timeToCall);

                this.lastTime = this.currentTime + timeToCall;
            };
            return RequestAnimationFrame;
        })();
        Utils.RequestAnimationFrame = RequestAnimationFrame;
    })(Kiwi.Utils || (Kiwi.Utils = {}));
    var Utils = Kiwi.Utils;
})(Kiwi || (Kiwi = {}));
/// <reference path="animation/tweens/easing/Back.ts" />
/// <reference path="animation/tweens/easing/Bounce.ts" />
/// <reference path="animation/tweens/easing/Circular.ts" />
/// <reference path="animation/tweens/easing/Cubic.ts" />
/// <reference path="animation/tweens/easing/Elastic.ts" />
/// <reference path="animation/tweens/easing/Exponential.ts" />
/// <reference path="animation/tweens/easing/Linear.ts" />
/// <reference path="animation/tweens/easing/Quadratic.ts" />
/// <reference path="animation/tweens/easing/Quartic.ts" />
/// <reference path="animation/tweens/easing/Quintic.ts" />
/// <reference path="animation/tweens/easing/Sinusoidal.ts" />
/// <reference path="animation/tweens/Manager.ts" />
/// <reference path="animation/tweens/Tween.ts" />
/// <reference path="core/Camera.ts" />
/// <reference path="core/CameraManager.ts" />
/// <reference path="core/Component.ts" />
/// <reference path="core/ComponentManager.ts" />
/// <reference path="core/Entity.ts" />
/// <reference path="core/Game.ts" />
/// <reference path="core/Group.ts" />
/// <reference path="core/State.ts" /> //must be initialised AFTER group - typescript issue #599
/// <reference path="core/IChild.ts" />
/// <reference path="core/Signal.ts" />
/// <reference path="core/SignalBinding.ts" />
/// <reference path="core/Stage.ts" />
/// <reference path="components/Animation.ts" />
/// <reference path="components/Box.ts" />
/// <reference path="components/Input.ts" />
/// <reference path="components/Sound.ts" />
/// <reference path="components/ArcadePhysics.ts" />
/// <reference path="file/Loader.ts" />
/// <reference path="file/DataLibrary.ts" />
/// <reference path="file/File.ts" />
/// <reference path="file/FileStore.ts" />
/// <reference path="core/StateConfig.ts" />
/// <reference path="core/StateManager.ts" />
/// <reference path="gameobjects/Sprite.ts" />
/// <reference path="gameobjects/StaticImage.ts" />
/// <reference path="gameobjects/Textfield.ts" />
/// <reference path="gameobjects/tilemap/Tile.ts" />
/// <reference path="gameobjects/tilemap/TileType.ts" />
/// <reference path="gameobjects/tilemap/TileMap.ts" />
/// <reference path="gameobjects/tilemap/TileMapLayer.ts" />
/// <reference path="geom/AABB.ts" />
/// <reference path="geom/Circle.ts" />
/// <reference path="geom/Ray.ts" />
/// <reference path="geom/Intersect.ts" />
/// <reference path="geom/IntersectResult.ts" />
/// <reference path="geom/Line.ts" />
/// <reference path="geom/Matrix.ts" />
/// <reference path="geom/Point.ts" />
/// <reference path="geom/Rectangle.ts" />
/// <reference path="geom/Transform.ts" />
/// <reference path="geom/Vector2.ts" />
/// <reference path="hud/HUDDisplay.ts" />
/// <reference path="hud/HUDManager.ts" />
/// <reference path="hud/HUDWidget.ts" />
/// <reference path="hud/widgets/TextField.ts" />
/// <reference path="hud/widgets/Bar.ts" />
/// <reference path="hud/widgets/Icon.ts" />
/// <reference path="hud/widgets/IconCounter.ts" />
/// <reference path="hud/widgets/BasicScore.ts" />
/// <reference path="hud/widgets/Button.ts" />
/// <reference path="hud/widgets/Time.ts" />
/// <reference path="hud/widgets/Menu.ts" />
/// <reference path="hud/widgets/MenuItem.ts" />
/// <reference path="hud/components/Counter.ts" />
/// <reference path="hud/components/WidgetInput.ts" />
/// <reference path="hud/components/Range.ts" />
/// <reference path="hud/components/Time.ts" />
/// <reference path="sound/AudioManager.ts" />
/// <reference path="sound/Audio.ts" />
/// <reference path="sound/AudioLibrary.ts" />
/// <reference path="animation/Anim.ts" />
/// <reference path="animation/Sequence.ts" />
/// <reference path="input/Key.ts" />
/// <reference path="input/Keyboard.ts" />
/// <reference path="input/Keycodes.ts" />
/// <reference path="input/Manager.ts" />
/// <reference path="input/Mouse.ts" />
/// <reference path="input/Touch.ts" />
/// <reference path="input/Pointer.ts" />
/// <reference path="input/MouseCursor.ts" />
/// <reference path="input/Finger.ts" />
/// <reference path="plugins/gamefroot/TileMapConverter.ts" />
/// <reference path="renderers/CanvasRenderer.ts" />
/// <reference path="renderers/GLRenderer.ts" />
/// <reference path="renderers/GLShaders.ts" />
/// <reference path="renderers/GLTexture.ts" />
/// <reference path="renderers/GLArrayBuffer.ts" />
/// <reference path="renderers/GLElementArrayBuffer.ts" />
/// <reference path="renderers/WebGL.d.ts"/>
/// <reference path="system/Bootstrap.ts" />
/// <reference path="system/Browser.ts" />
/// <reference path="system/Device.ts" />
/// <reference path="textures/TextureAtlas.ts" />
/// <reference path="textures/TextureLibrary.ts" />
/// <reference path="textures/SpriteSheet.ts" />
/// <reference path="textures/SingleImage.ts" />
/// <reference path="time/Clock.ts" />
/// <reference path="time/Manager.ts" />
/// <reference path="time/MasterClock.ts" />
/// <reference path="time/Timer.ts" />
/// <reference path="time/TimerEvent.ts" />
/// <reference path="utils/Canvas.ts" />
/// <reference path="utils/Common.ts" />
/// <reference path="utils/GameMath.ts" />
/// <reference path="utils/RandomDataGenerator.ts" />
/// <reference path="utils/RequestAnimationFrame.ts" />
/**
* Module - Kiwi (Core)
* The top level namespace in which all core classes and modules are defined.
* @module Kiwi
* @main Kiwi
*/
var Kiwi;
(function (Kiwi) {
    Kiwi.VERSION = "1.0";

    Kiwi.RENDERER_CANVAS = 0;
    Kiwi.RENDERER_WEBGL = 1;

    Kiwi.TARGET_BROWSER = 0;
    Kiwi.TARGET_COCOON = 1;

    Kiwi.DEBUG_ON = 0;
    Kiwi.DEBUG_OFF = 1;

    Kiwi.DEVICE = null;

    Kiwi.ADDED_TO_STATE = 0;
    Kiwi.ADDED_TO_LAYER = 1;
    Kiwi.ADDED_TO_GROUP = 2;
    Kiwi.ADDED_TO_ENTITY = 3;
    Kiwi.REMOVED_FROM_STATE = 4;
    Kiwi.REMOVED_FROM_LAYER = 5;
    Kiwi.REMOVED_FROM_GROUP = 6;
    Kiwi.REMOVED_FROM_ENTITY = 7;

    Kiwi.STATE = 0;
    Kiwi.LAYER = 1;
    Kiwi.GROUP = 2;
    Kiwi.ENTITY = 3;
    Kiwi.CAMERA = 4;
    Kiwi.HUD_WIDGET = 5;
    Kiwi.TILE_LAYER = 6;

    /**
    * The GameManager maintains a list an array of all instances of Kiwi games within a single document.
    *
    * @class GameManager
    *
    */
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.prototype.objType = function () {
            return "GameManager";
        };

        GameManager.register = function (game) {
            return Kiwi.GameManager._games.push(game);
        };

        GameManager.total = function () {
            return Kiwi.GameManager._games.length;
        };
        GameManager._games = [];
        return GameManager;
    })();
    Kiwi.GameManager = GameManager;
})(Kiwi || (Kiwi = {}));
