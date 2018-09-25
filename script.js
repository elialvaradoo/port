(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else if (typeof exports === 'object') {
        factory(require('jquery'))
    } else {
        factory(jQuery)
    }
}(function($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s)
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s)
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value))
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setTime(+t + days * 864e+5)
            }
            return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                result = read(cookie, value);
                break
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie
            }
        }
        return result
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) === undefined) {
            return !1
        }
        $.cookie(key, '', $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key)
    }
}));
! function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o],
                    s = n && n[r];
                s && (this.off(e, r), delete n[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        if (Array.isArray(e)) return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }

    function o(e, t, r) {
        if (!(this instanceof o)) return new o(e, t, r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var h = e.jQuery,
        a = e.console,
        d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
            }
    }, o.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function(e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function() {
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function(e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function() {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function(e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
}); {
    setTimeout(() => document.body.classList.add('render'), 60);
    const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
    const total = navdemos.length;
    const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
    const navigate = (linkEl) => {
        document.body.classList.remove('render');
        document.body.addEventListener('transitionend', () => window.location = linkEl.href)
    };
    navdemos.forEach(link => link.addEventListener('click', (ev) => {
        ev.preventDefault();
        navigate(ev.target)
    }))
} {
    class Slide {
        constructor(el) {
            this.DOM = {
                el: el
            };
            this.DOM.slideImg = this.DOM.el.querySelector('.slide__img');
            this.bgImage = this.DOM.slideImg.style.backgroundImage;
            this.layout()
        }
        layout() {
            this.DOM.slideImg.innerHTML = `<div class='glitch__img' style='background-image: ${this.DOM.slideImg.style.backgroundImage};'></div>`.repeat(5);
            this.DOM.glitchImgs = Array.from(this.DOM.slideImg.querySelectorAll('.glitch__img'))
        }
        changeBGImage(bgimage, pos = 0, delay = 0) {
            setTimeout(() => this.DOM.glitchImgs[pos].style.backgroundImage = bgimage, delay)
        }
    }
    class GlitchSlideshow {
        constructor(el) {
            this.DOM = {
                el: el
            };
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.slides = [];
            this.DOM.slides.forEach(slide => this.slides.push(new Slide(slide)));
            this.current = 0;
            this.glitchTime = 750;
            this.totalGlitchSlices = 5
        }
        glitch(slideFrom, slideTo) {
            return new Promise((resolve, reject) => {
                slideFrom.DOM.slideImg.classList.add('glitch--animate');
                const slideFromBGImage = slideFrom.bgImage;
                const slideToBGImage = slideTo.bgImage;
                for (let i = this.totalGlitchSlices - 1; i >= 0; --i) {
                    slideFrom.changeBGImage(slideToBGImage, i, this.glitchTime / (this.totalGlitchSlices + 1) * (this.totalGlitchSlices - i - 1) + this.glitchTime / (this.totalGlitchSlices + 1))
                }
                setTimeout(() => {
                    slideFrom.DOM.slideImg.classList.remove('glitch--animate');
                    for (let i = this.totalGlitchSlices - 1; i >= 0; --i) {
                        slideFrom.changeBGImage(slideFromBGImage, i, 0)
                    }
                    resolve()
                }, this.glitchTime)
            })
        }
        navigate(dir) {
            if (this.isAnimating) return;
            this.isAnimating = !0;
            const newCurrent = dir === 'next' ? this.current < this.slidesTotal - 1 ? this.current + 1 : 0 : this.current > 0 ? this.current - 1 : this.slidesTotal - 1;
            this.glitch(this.slides[this.current], this.slides[newCurrent]).then(() => {
                this.DOM.slides[this.current].classList.remove('slide--current');
                this.current = newCurrent;
                this.DOM.slides[this.current].classList.add('slide--current');
                this.isAnimating = !1
            })
        }
    }
    imagesLoaded(document.querySelectorAll('.slide__img'), {
        background: !0
    }, () => {
        document.body.classList.remove('loading');
        const slideshow = new GlitchSlideshow(document.querySelector('.slides'));
        const nav = Array.from(document.querySelectorAll('.slide-nav__button'))
    })
}
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? !0 : !1;
if (!isMobile) {
    $("body").append("<div id='cursor'></div>")
}
var bsDiv = document.getElementById("cursor");
var x, y;
window.addEventListener('mousemove', function(event) {
    $('#cursor').fadeIn(1000);
    x = event.clientX;
    y = event.clientY;
    if (typeof x !== 'undefined') {
        bsDiv.style.left = x + "px";
        bsDiv.style.top = y + "px"
    }
}, !1);
$.fn.attachDragger = function() {
    var attachment = !1,
        lastPosition, position, difference;
    $($(this).selector).on("mousedown mouseup mousemove", function(e) {
        if (e.type == "mousedown") attachment = !0, lastPosition = [e.clientX, e.clientY];
        if (e.type == "mouseup") attachment = !1;
        if (e.type == "mousemove" && attachment == !0) {
            position = [e.clientX, e.clientY];
            difference = [(position[0] - lastPosition[0]), (position[1] - lastPosition[1])];
            $(this).scrollLeft($(this).scrollLeft() - difference[0]);
            $(this).scrollTop($(this).scrollTop() - difference[1]);
            lastPosition = [e.clientX, e.clientY]
        }
    });
    $(window).on("mouseup", function() {
        attachment = !1
    })
}
$(document).ready(function() {
    $("#projectList").attachDragger();

    function randomGlitch() {
        var min = 1000,
            max = 8000;
        var randomNumber = Math.random() * (max - min) + min;
        var delay = Math.floor(randomNumber);
        setTimeout(function() {
            $("#glitchGif").fadeIn(0);
            var randomHackSounds = document.createElement('audio');
            randomHackSounds.setAttribute('src', 'audio/randomglitch.ogg');
            randomHackSounds.setAttribute('src', 'audio/randomglitch.mp3');
            randomHackSounds.volume = 0.75;
            randomHackSounds.play();
            setTimeout(function() {
                $("#glitchGif").fadeOut(0);
                randomGlitch()
            }, 350)
        }, delay)
    }
    if (typeof $.cookie('hackerman') === 'undefined') {
        var introHackSounds = document.createElement('audio');
        introHackSounds.setAttribute('src', 'audio/bigglitch.ogg');
        introHackSounds.setAttribute('src', 'audio/bigglitch.mp3');
        introHackSounds.volume = 0.75;
        introHackSounds.play();
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        var e = 0;
        var f = 0;
        var g = 0;
        var h = 0;
        var i = 0;
        var j = 0;
        var firsttxt = 'Looking for subject: Eli Alvarado';
        var secondtxt = 'Eli found!';
        var thirdtxt = 'Age: 21';
        var fourthtxt = 'Country: United States';
        var fifthtxt = 'Gender: Male';
        var sixthtxt = 'Loading some of Eli\'s projects';
        var seventhtxt = 'Amount of projects found: 3... 4 more in progress';
        var eighttxt = 'Preparing to launch website..';
        var ninthtxt = 'Enjoy the experience, stranger';

        function typeWriter() {
            if (a < firsttxt.length) {
                document.getElementById("first-type").innerHTML += firsttxt.charAt(a);
                a++;
                setTimeout(typeWriter, 10)
            }
        }

        function typeWriterTwo() {
            if (b < secondtxt.length) {
                document.getElementById("second-type").innerHTML += secondtxt.charAt(b);
                b++;
                setTimeout(typeWriterTwo, 10)
            }
        }

        function typeWriterThree() {
            if (c < thirdtxt.length) {
                document.getElementById("third-type").innerHTML += thirdtxt.charAt(c);
                c++;
                setTimeout(typeWriterThree, 10)
            }
        }

        function typeWriterFour() {
            if (d < fourthtxt.length) {
                document.getElementById("fourth-type").innerHTML += fourthtxt.charAt(d);
                d++;
                setTimeout(typeWriterFour, 10)
            }
        }

        function typeWriterFive() {
            if (e < fifthtxt.length) {
                document.getElementById("fifth-type").innerHTML += fifthtxt.charAt(e);
                e++;
                setTimeout(typeWriterFive, 10)
            }
        }

        function typeWriterSix() {
            if (f < sixthtxt.length) {
                document.getElementById("sixth-type").innerHTML += sixthtxt.charAt(f);
                f++;
                setTimeout(typeWriterSix, 40)
            }
        }

        function typeWriterSeven() {
            if (g < seventhtxt.length) {
                document.getElementById("seventh-type").innerHTML += seventhtxt.charAt(g);
                g++;
                setTimeout(typeWriterSeven, 10)
            }
        }

        function typeWriterEight() {
            if (h < eighttxt.length) {
                document.getElementById("eight-type").innerHTML += eighttxt.charAt(h);
                h++;
                setTimeout(typeWriterEight, 10)
            }
        }

        function typeWriterNinth() {
            if (i < ninthtxt.length) {
                document.getElementById("ninth-type").innerHTML += ninthtxt.charAt(i);
                i++;
                setTimeout(typeWriterNinth, 10)
            }
        }
        setTimeout(function() {
            typeWriter()
        }, 1000);
        setTimeout(function() {
            typeWriterTwo()
        }, 3500);
        setTimeout(function() {
            typeWriterThree()
        }, 3750);
        setTimeout(function() {
            typeWriterFour()
        }, 3900);
        setTimeout(function() {
            typeWriterFive()
        }, 4300);
        setTimeout(function() {
            typeWriterSix()
        }, 8000);
        setTimeout(function() {
            typeWriterSeven()
        }, 9500);
        setTimeout(function() {
            typeWriterEight()
        }, 10500);
        setTimeout(function() {
            typeWriterNinth()
        }, 11500);
        setTimeout(function() {
            $("body").append("<div id='glitchGif'></div>")
        }, 12000);
        setTimeout(function() {
            $("#intro").fadeOut(0)
        }, 14000);
        setTimeout(function() {
            $("#glitchGif").fadeOut(0)
        }, 15250);
        setTimeout(function() {
            $("#av-1").fadeIn(0)
        }, 15250);
        setTimeout(function() {
            randomGlitch()
        }, 17000);
        setTimeout(function() {
            $("#av-1").fadeOut(0)
        }, 17750);
        $.cookie("hackerman", 1, {
            expires: 1
        })
    } else {
        $("body").append("<div id='glitchGif'></div>");
        setTimeout(function() {
            $("#intro").fadeOut(0)
        }, 1000);
        setTimeout(function() {
            $("#glitchGif").fadeOut(0)
        }, 1100);
        setTimeout(function() {
            randomGlitch()
        }, 2000);
        setTimeout(function() {
            $("#av-1").fadeIn(0)
        }, 1100);
        setTimeout(function() {
            $("#av-1").fadeOut(0)
        }, 3500);
        var introHackSounds = document.createElement('audio');
        introHackSounds.setAttribute('src', 'audio/smallglitch.ogg');
        introHackSounds.setAttribute('src', 'audio/smallglitch.mp3');
        introHackSounds.volume = 0.75;
        introHackSounds.play()
    }
    var mainTheme = document.createElement('audio');
    mainTheme.setAttribute('src', 'audio/maintheme2.ogg');
    mainTheme.setAttribute('src', 'audio/maintheme2.mp3');
    mainTheme.volume = 1.0;
    mainTheme.play();
    mainTheme.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play()
    }, !1)
});
$('#projectGrid li a').mouseenter(function() {
    $("#projectGrid li a").not(this).addClass('projectOut');
    $(this).find('div').animate({
        bottom: "0"
    }, 300, function() {})
});
$('#projectGrid li a').mouseleave(function() {
    $("#projectGrid li a").not(this).removeClass('projectOut');
    $(this).find('div').animate({
        bottom: "-200px"
    }, 300, function() {})
});
$("#hamburger").click(function() {
    var introHackSounds = document.createElement('audio');
    introHackSounds.setAttribute('src', 'audio/smallglitch.ogg');
    introHackSounds.setAttribute('src', 'audio/smallglitch.mp3');
    introHackSounds.volume = 0.75;
    introHackSounds.play();
    $("#menu").addClass('menuOpen');
    setTimeout(function() {
        $("#menuContainer").fadeIn(0);
        $("#mailTo-Tv").fadeIn(0);
        $("#screen").fadeIn(0)
    }, 1000);
    setTimeout(function() {
        $("#av-1").fadeOut(0)
    }, 0);
    setTimeout(function() {
        $("#av-2").fadeIn(0)
    }, 1000);
    setTimeout(function() {
        $("#av-2").fadeOut(0)
    }, 3500)
});
$("#close").click(function() {
    var introHackSounds = document.createElement('audio');
    introHackSounds.setAttribute('src', 'audio/smallglitch.ogg');
    introHackSounds.setAttribute('src', 'audio/smallglitch.mp3');
    introHackSounds.volume = 0.75;
    introHackSounds.play();
    $("#menuContainer").fadeOut(0);
    $("#mailTo-Tv").fadeOut(0);
    $("#screen").fadeOut(0);
    setTimeout(function() {
        $("#menu").removeClass('menuOpen')
    }, 1000);
    setTimeout(function() {
        $("#av-2").fadeOut(0)
    }, 0);
    setTimeout(function() {
        $("#av-1").fadeIn(0)
    }, 1000);
    setTimeout(function() {
        $("#av-1").fadeOut(0)
    }, 3500)
});
var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = window.innerWidth / 3;
var chinese = "01";
chinese = chinese.split("");
var font_size = 15;
var columns = c.width / font_size;
var drops = [];
for (var x = 0; x < columns; x++)
    drops[x] = 1;

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#135AD6";
    ctx.font = font_size + "px courier";
    for (var i = 0; i < drops.length; i++) {
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++
    }
}
setInterval(draw, 33);
var animateProjects = !1;
$('#projectList li').on('mousedown', function(event) {
    $(this).data("initcoords", {
        x: event.clientX,
        y: event.clientY
    })
}).on('click', function(event) {
    var initCoords = $(this).data("initcoords") || {
        x: 0,
        y: 0
    };
    if (event.clientX === initCoords.x && event.clientY === initCoords.y) {
        if (!$(this).hasClass("active")) {
            if (animateProjects) return;
            animateProjects = !0;
            $(".active").removeClass("active");
            $(this).addClass("active");
            var indexOfLi = $(this).index();
            var className = "slide--current";
            $(".slide--current .slide__img").addClass("glitch--animate");
            var introHackSounds = document.createElement('audio');
            introHackSounds.setAttribute('src', 'audio/smallglitch.ogg');
            introHackSounds.setAttribute('src', 'audio/smallglitch.mp3');
            introHackSounds.volume = 0.75;
            introHackSounds.play();
            setTimeout(function() {
                $(".slide--current .slide__img").removeClass("glitch--animate");
                $(".slide").removeClass(className);
                $('.slide').eq(indexOfLi).addClass(className);
                $('#projectList').animate({
                    scrollLeft: $('.active').position().left
                }, 750)
            }, 750);
            setTimeout(function() {
                animateProjects = !1
            }, 1500)
        }
    }
});
$("#nextBtn").click(function() {
    if (animateProjects) return;
    animateProjects = !0;
    var $navlis = $('#projectList li')
    var $next = $navlis.filter('.active').removeClass('active').next();
    if (!$next.length) {
        $next = $navlis.first()
    }
    $next.addClass('active');
    var indexOfLi = $('.active').index();
    var className = "slide--current";
    $(".slide--current .slide__img").addClass("glitch--animate");
    var introHackSounds = document.createElement('audio');
    introHackSounds.setAttribute('src', 'audio/smallglitch.ogg');
    introHackSounds.setAttribute('src', 'audio/smallglitch.mp3');
    introHackSounds.volume = 0.75;
    introHackSounds.play();
    setTimeout(function() {
        $(".slide--current .slide__img").removeClass("glitch--animate");
        $(".slide").removeClass(className);
        $('.slide').eq(indexOfLi).addClass(className);
        $('#projectList').animate({
            scrollLeft: $('.active').position().left
        }, 750)
    }, 750);
    setTimeout(function() {
        animateProjects = !1
    }, 1500)
});
$("#previousBtn").click(function() {
    if (animateProjects) return;
    animateProjects = !0;
    var $navlis = $('#projectList li')
    var $prev = $navlis.filter('.active').removeClass('active').prev();
    if (!$prev.length) {
        $prev = $navlis.last()
    }
    $prev.addClass('active');
    var indexOfLi = $('.active').index();
    var className = "slide--current";
    $(".slide--current .slide__img").addClass("glitch--animate");
    var introHackSounds = document.createElement('audio');
    introHackSounds.setAttribute('src', 'audio/smallglitch.ogg');
    introHackSounds.setAttribute('src', 'audio/smallglitch.mp3');
    introHackSounds.volume = 0.75;
    introHackSounds.play();
    setTimeout(function() {
        $(".slide--current .slide__img").removeClass("glitch--animate");
        $(".slide").removeClass(className);
        $('.slide').eq(indexOfLi).addClass(className);
        $('#projectList').animate({
            scrollLeft: $('.active').position().left
        }, 750)
    }, 750);
    setTimeout(function() {
        animateProjects = !1
    }, 1500)
})