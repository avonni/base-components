/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint-disable no-shadow */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
// canvas-confetti v0.2.1 built on 2019-04-28T18:34:51.101Z
!(function (window, module) {
    // source content
    (function () {
        var frame = (function () {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (cb) {
                    window.setTimeout(cb, 1000 / 60);
                }
            );
        })();

        var defaults = {
            particleCount: 50,
            angle: 90,
            spread: 45,
            startVelocity: 45,
            decay: 0.9,
            ticks: 200,
            x: 0.5,
            y: 0.5,
            zIndex: 100,
            colors: [
                '#26ccff',
                '#a25afd',
                '#ff5e7e',
                '#88ff5a',
                '#fcff42',
                '#ffa62d',
                '#ff36ff'
            ]
        };

        function noop() {}

        // create a promise if it exists, otherwise, just
        // call the function directly
        function promise(func) {
            if (module.exports.Promise) {
                return new module.exports.Promise(func);
            }

            func(noop, noop);

            return null;
        }

        function convert(val, transform) {
            return transform ? transform(val) : val;
        }

        function isOk(val) {
            return !(val === null || val === undefined);
        }

        function prop(options, name, transform) {
            return convert(
                options && isOk(options[name]) ? options[name] : defaults[name],
                transform
            );
        }

        function toDecimal(str) {
            return parseInt(str, 16);
        }

        function hexToRgb(str) {
            var val = String(str).replace(/[^0-9a-f]/gi, '');

            if (val.length < 6) {
                val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
            }

            return {
                r: toDecimal(val.substring(0, 2)),
                g: toDecimal(val.substring(2, 4)),
                b: toDecimal(val.substring(4, 6))
            };
        }

        function getOrigin(options) {
            var origin = prop(options, 'origin', Object);
            origin.x = prop(origin, 'x', Number);
            origin.y = prop(origin, 'y', Number);

            return origin;
        }

        function setCanvasWindowSize(canvas) {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
        }

        function setCanvasRectSize(canvas) {
            var rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }

        function getCanvas(zIndex) {
            var canvas = document.createElement('canvas');

            setCanvasWindowSize(canvas);

            canvas.style.position = 'fixed';
            canvas.style.top = '0px';
            canvas.style.left = '0px';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = zIndex;

            return canvas;
        }

        function randomPhysics(opts) {
            var radAngle = opts.angle * (Math.PI / 180);
            var radSpread = opts.spread * (Math.PI / 180);

            return {
                x: opts.x,
                y: opts.y,
                wobble: Math.random() * 10,
                velocity:
                    opts.startVelocity * 0.5 +
                    Math.random() * opts.startVelocity,
                angle2D:
                    -radAngle + (0.5 * radSpread - Math.random() * radSpread),
                tiltAngle: Math.random() * Math.PI,
                color: hexToRgb(opts.color),
                tick: 0,
                totalTicks: opts.ticks,
                decay: opts.decay,
                random: Math.random() + 5,
                tiltSin: 0,
                tiltCos: 0,
                wobbleX: 0,
                wobbleY: 0
            };
        }

        function updateFetti(context, fetti) {
            fetti.x += Math.cos(fetti.angle2D) * fetti.velocity;
            fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + 3; // + gravity
            fetti.wobble += 0.1;
            fetti.velocity *= fetti.decay;
            fetti.tiltAngle += 0.1;
            fetti.tiltSin = Math.sin(fetti.tiltAngle);
            fetti.tiltCos = Math.cos(fetti.tiltAngle);
            fetti.random = Math.random() + 5;
            fetti.wobbleX = fetti.x + 10 * Math.cos(fetti.wobble);
            fetti.wobbleY = fetti.y + 10 * Math.sin(fetti.wobble);

            var progress = fetti.tick++ / fetti.totalTicks;

            var x1 = fetti.x + fetti.random * fetti.tiltCos;
            var y1 = fetti.y + fetti.random * fetti.tiltSin;
            var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
            var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;

            context.fillStyle =
                'rgba(' +
                fetti.color.r +
                ', ' +
                fetti.color.g +
                ', ' +
                fetti.color.b +
                ', ' +
                (1 - progress) +
                ')';
            context.beginPath();

            context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
            context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
            context.lineTo(Math.floor(x2), Math.floor(y2));
            context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));

            context.closePath();
            context.fill();

            return fetti.tick < fetti.totalTicks;
        }

        function animate(canvas, fettis, isLibCanvas, allowResize, done) {
            var animatingFettis = fettis.slice();
            var context = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;

            function onResize() {
                // don't actually query the size here, since this
                // can execute frequently and rapidly
                width = height = null;
            }

            var prom = promise(function (resolve) {
                function onDone() {
                    if (allowResize) {
                        window.removeEventListener('resize', onResize);
                    }

                    done();
                    resolve();
                }

                function update() {
                    if (!width && !height) {
                        resizer(canvas);
                        width = canvas.width;
                        height = canvas.height;
                    }

                    context.clearRect(0, 0, width, height);

                    animatingFettis = animatingFettis.filter(function (fetti) {
                        return updateFetti(context, fetti);
                    });

                    if (animatingFettis.length) {
                        frame(update);
                    } else {
                        onDone();
                    }
                }

                frame(update);
            });

            if (allowResize) {
                window.addEventListener('resize', onResize, false);
            }

            return {
                addFettis: function (fettis) {
                    animatingFettis = animatingFettis.concat(fettis);

                    return prom;
                },
                canvas: canvas,
                promise: prom
            };
        }

        function confettiCannon(canvas, globalOpts) {
            var isLibCanvas = !canvas;
            var allowResize = !!prop(globalOpts || {}, 'resize');
            var resized = false;
            var animationObj;

            return function fire(options) {
                var particleCount = prop(options, 'particleCount', Math.floor);
                var angle = prop(options, 'angle', Number);
                var spread = prop(options, 'spread', Number);
                var startVelocity = prop(options, 'startVelocity', Number);
                var decay = prop(options, 'decay', Number);
                var colors = prop(options, 'colors');
                var ticks = prop(options, 'ticks', Number);
                var zIndex = prop(options, 'zIndex', Number);
                var origin = getOrigin(options);

                var temp = particleCount;
                var fettis = [];

                if (isLibCanvas) {
                    canvas = animationObj
                        ? animationObj.canvas
                        : getCanvas(zIndex);
                } else if (allowResize && !resized) {
                    // initialize the size of a user-supplied canvas
                    setCanvasRectSize(canvas);
                    resized = true;
                }

                var startX = canvas.width * origin.x;
                var startY = canvas.height * origin.y;

                while (temp--) {
                    fettis.push(
                        randomPhysics({
                            x: startX,
                            y: startY,
                            angle: angle,
                            spread: spread,
                            startVelocity: startVelocity,
                            color: colors[temp % colors.length],
                            ticks: ticks,
                            decay: decay
                        })
                    );
                }

                // if we have a previous canvas already animating,
                // add to it
                if (animationObj) {
                    return animationObj.addFettis(fettis);
                }

                if (isLibCanvas) {
                    document.body.appendChild(canvas);
                }

                animationObj = animate(
                    canvas,
                    fettis,
                    isLibCanvas,
                    isLibCanvas || allowResize,
                    function () {
                        animationObj = null;

                        if (isLibCanvas) {
                            document.body.removeChild(canvas);
                        }
                    }
                );

                return animationObj.promise;
            };
        }

        module.exports = confettiCannon();
        module.exports.create = confettiCannon;
        module.exports.Promise = window.Promise || null;
    })();

    // end source content

    window.confetti = module.exports;
})(window, {});
