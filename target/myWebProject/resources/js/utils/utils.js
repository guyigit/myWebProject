(function() {
    Utils = {};
    $.extend(Utils, {
        formatMoney: function(a, b) {
            return a.toFixed(b)
        },
        formatDate: function(a, b) {
            "number" == typeof a && (a = new Date(a));
            return Legos.$formatDate(a, b)
        },
        getFormatTime: function(a) {
            var b = Math.floor(a / 60) + ":";
            a %= 60;
            return b + (10 > a ? "0" + a: a)
        },
        getScrollTop: function(a) {
            a = a ? document: parent.document;
            return a.body.scrollTop || a.documentElement.scrollTop
        },
        getScrollLeft: function(a) {
            a = a ? document: parent.document;
            return a.body.scrollLeft || a.documentElement.scrollLeft
        },
        isHide: function(a) {
            return "none" == a.style.display ? !0 : !1
        },
        getStrLength: function(a) {
            for (var b = 0,
            c = 0,
            e = a.length; c < e; c++) 0 != (a.charCodeAt(c) & 65280) && b++,
            b++;
            return b = Math.ceil(b / 2)
        },
        decodeParam:function(a){
        	return (a ? decodeURIComponent(a):'');
        },
        countLetters: function(a, b, c, e) {
            var d = 0;
            e && 0 < e && (d = e);
            c || (c = 140);
            a = this.getStrLength(a) + d;
            a <= c ? b.html("<span>" + a + "</span>/" + c) : b.html('<span style="color:#F00;">' + a + "</span>/" + c)
        },
        bindCharCounter: function(a, b, c, e) {
            this.countLetters(a.value, b, c, e);
            a.onkeyup = function() {
                this.countLetters(a.value, b, c, e)
            };
            a.onpaste = a.onfocus = function() {
                setTimeout(function() {
                    this.countLetters(a.value, b, c, e)
                },
                50)
            }
        },
        setTextareaValue: function(a, b) {
            var c = a[0];
            if (document.selection) c.focus(),
            sel = document.selection.createRange(),
            sel.text = b,
            sel.select();
            else if (c.selectionStart || "0" == c.selectionStart) {
                var e = c.selectionStart,
                d = c.selectionEnd,
                f = c.scrollTop;
                c.value = c.value.substring(0, e) + b + c.value.substring(d, c.value.length);
                0 < f && (c.scrollTop = f);
                c.focus();
                c.selectionStart = e + b.length;
                c.selectionEnd = e + b.length
            } else c.value += b,
            c.focus()
        },
        findParentByAttr: function(a, b, c, e) {
            if (a === e && a.getAttribute(b) != c) return null;
            a = a.parentNode;
            e || (e = document.body);
            do {
                if (a.getAttribute(b) == c) return a;
                if (a === e) return null;
                a = a.parentNode
            } while ( null !== a )
        },
        loadJsFile: function(a, b, c) {
            var e = document.createElement("script");
            e.setAttribute("type", "text/javascript");
            e.setAttribute("charset", b ? b: "utf-8");
            e.setAttribute("src", a);
            document.getElementsByTagName("head")[0].appendChild(e);
            c && (e.onload = function() {
                c()
            })
        },
        loadCssFile: function(a, b) {
            if (a) {
                var c;
                if (!window._loadCss || 0 > window._loadCss.indexOf(a)) c = document.createElement("link"),
                c.setAttribute("type", "text/css"),
                c.setAttribute("rel", "stylesheet"),
                c.setAttribute("href", a),
                c.setAttribute("id", "loadCss" + Math.random()),
                document.getElementsByTagName("head")[0].appendChild(c),
                window._loadCss ? window._loadCss += "|" + a: window._loadCss = "|" + a;
                c && "function" == typeof b && (c.onload = b);
                return ! 0
            }
        },
        addCalendar: function(a) {
            var b = {
                inputDom: null,
                iconDom: null,
                unit: "day",
                fn: null
            },
            c;
            for (c in a) b[c] = a[c];
            b.inputDom[0] && (b.inputDom.unbind("click").click(function(a) {
                var c = this;
                Legos.$calendars({
                    el: this,
                    callback: function(a) {
                        c.value = a;
                        b.fn && b.fn()
                    },
                    unit: b.unit,
                    nowDate: this.value,
                    e: a
                });
                $("#frmCalendar").css("height", "200px");
                $("#elCalendarWrap").css("z-index", "100000")
            }), b.iconDom && b.iconDom[0] && (b.iconDom[0].onclick = function(a) {
                Legos.$stopBubble(a);
                $(b.inputDom).trigger("click")
            }))
        },
        getImgUrlBySize: function(a, b) {
            return a ? -1 == a.indexOf("http://") ? "http://img1.paipaiimg.com/" + a.replace(/(.+)(\.[\w]+)$/g, "$1." + b + "x" + b + "$2") : a.replace(/(.+)(\/\d+)$/g, "$1/" + b) : ""
        },
        setAnchor: function(a) {
            var b = window.location.href; - 1 != b.indexOf("#") ? window.location = b.replace(/#.+/g, "#" + a) : window.location = b + "#" + a
        },
        encodeHtml: function(a) {
            return "string" != typeof a ? "": a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;").replace(/ /g, "&nbsp;")
        },
        decodeHtml: function(a) {
            return "string" != typeof a ? "": a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&#92;/g, "\\").replace(/&amp;/g, "&").replace(/&apos;/g, "'")
        },
        getFileSize: function(a) {
            return "number" != typeof a ? a: 1048576 < a ? (a / 1048576).toFixed(1) + "MB": 1024 < a ? (a / 1024).toFixed(1) + "KB": 0 < a ? a + "B": a
        },
        setPageHeight: function(a) {
            window.parent != window && (h = document.body.clientHeight, h = 900 > h ? 900 : h, window.parent.postMessage('{"height":' + h + "}", "http://piao.qq.com"))
        },
        isEmbeddedIframe: function() {
            return window.self != window.parent
        },
        isColorValue: function(a) {
            return /^#[A-Fa-f0-9]{0,6}$/.test(a)
        },
        object: function(a) {
            var b = function() {};
            b.prototype = a;
            return new b
        },
        extend: function(a, b) {
            var c = Utils.object(b.prototype);
            c.constructor = a;
            a.prototype = c
        },
        isEmpty: function(a) {
            for (var b in a) return ! 1;
            return ! 0
        },
        parseTmple: function(a) {
            a = a.split("</template>");
            var b = {};
            $.each(a,
            function(a, e) {
                var d = e.indexOf('id="'),
                f = e.indexOf('">');
                0 < d && 0 < f && (d = e.substring(d + 4, f), f = e.substr(f + 2), b[d] = f)
            });
            return b
        },
        getUrlParam: function(a, b) { (new RegExp("[\\?&]" + a + "=([^&^#]+)", "g")).test(b || window.location.search);
            return RegExp.$1
        },
        ajax: function(a) {
            var b = {
                method: void 0,
                url: "",
                data: null,
                contentType: null,
                loadingDom: null,
                type: "json",
                onSuccess: function() {},
                onError: null
            },
            c;
            for (c in a) b[c] = a[c];
            b.method || (b.method = b.data ? "POST": "GET");
            b.url = Legos.$addToken(b.url, "ajax");
            b.contentType ? "json" == b.contentType && (b.contentType = "application/json; charset=UTF-8") : delete b.contentType;
            b.data && "object" == typeof b.data && b.contentType && (/.*json$/.test(b.contentType) || /.*json;.*$/.test(b.contentType)) && (b.data = JSON.stringify(b.data));
            var e = function() {
                b.loadingDom && ($("#commit_loading_temp").remove(), b.loadingDom.show())
            }; (function() {
                if (b.loadingDom) {
                    var a = (b.loadingDom[0].clientWidth - 24) / 2;
                    b.loadingDom.after('<span id="commit_loading_temp" style="padding:0 ' + (0 < a ? a: 0) + 'px;"><img src="http://static.gtimg.com/img/common/loading_24.gif"/></span>');
                    b.loadingDom.hide()
                }
            })();
            $.ajax({
                type: b.method,
                url: b.url,
                data: b.data,
                contentType: b.contentType,
                dataType: b.type,
                success: function(a, c, k) {
                    e();
                    b.onSuccess(a);
                },
                error: function(a, c, k) {
                    a = a.status;
                    e();
                    if ("number" == typeof a) {
                        if (0 < a && 200 != a) if (b.onError) b.onError(a);
                        else DialogBox.alert("\u9519\u8bef\u7801\uff1a" + a + "\uff0c\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u91cd\u65b0\u5237\u65b0\u9875\u9762")
                    } else if (b.onError) b.onError(a);
                    else DialogBox.alert(a ? a + "": "\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u91cd\u65b0\u5237\u65b0\u9875\u9762")
                }
            })
        },
        bindAjaxUpload: function(a, b, c) {
            var e = "_jquery_form_js_" + (new Date).getTime() + "_file",
            d = $('<label for="' + e + '"></label>');
            a.wrap(d);
            var f = $('<input id="' + e + '" type="file" name="data"/>'),
            d = a.position(),
            k = $('<form action="" method="post" enctype="multipart/form-data" style="filter:alpha(opacity=0);position:absolute;top:' + d.top + "px;left:" + d.left + 'px;z-index:-1;opacity:0;padding:0;margin:0;height:0;width:0;"></form>');
            k.append(f);
            a.after(k);
            b = Legos.$addToken(b, "ajax");
            setTimeout(function() {
                k.bind("submit",
                function() {
                    k.ajaxSubmit({
                        url: b,
                        success: function(a, b, d, e) {
                            "[object Object]" != Object.prototype.toString.call(a) && (a = $.parseJSON(a));
                            c.apply(window, arguments)
                        },
                        error: function(a, b, c) {
                            dialog.alert("\u7cfb\u7edf\u9519\u8bef", "error")
                        },
                        complete: function(a) {
                            $("#" + e).replaceWith(f.clone())
                        }
                    });
                    return ! 1
                });
                k.on("change", "#" + e,
                function() {
                    k.trigger("submit")
                })
            },
            0)
        }
    });
    Legos = {};
    $.extend(Legos, {
        $addToken: function(a, b) {
            var c = this.$getToken();
            if ("" == a || 0 != (0 > a.indexOf("://") ? location.href: a).indexOf("http")) return a;
            if ( - 1 != a.indexOf("#")) {
                var e = a.match(/\?.+\#/);
                if (e) {
                    var d = e[0].split("#"),
                    c = [d[0], "&g_tk=", c, "&g_ty=", b, "#", d[1]].join("");
                    return a.replace(e[0], c)
                }
                d = a.split("#");
                return [d[0], "?g_tk=", c, "&g_ty=", b, "#", d[1]].join("")
            }
            return "" == c ? a + ( - 1 != a.indexOf("?") ? "&": "?") + "g_ty=" + b: a + ( - 1 != a.indexOf("?") ? "&": "?") + "g_tk=" + c + "&g_ty=" + b
        },
        $getToken: function() {
            var a = this.$getCookie("skey");
            return null == a ? "": this.$time33(a)
        },
        $getCookie: function(a) {
            return (a = document.cookie.match(new RegExp("(^| )" + a + "(?:=([^;]*))?(;|$)"))) ? a[2] ? unescape(a[2]) : "": null
        },
        $time33: function(a) {
            for (var b = 0,
            c = a.length,
            e = 5381; b < c; ++b) e += (e << 5) + a.charAt(b).charCodeAt();
            return e & 2147483647
        },
        $formatDate: function(a, b) {
            return b.replace(/yyyy|YYYY/, a.getFullYear()).replace(/yy|YY/, this.$addZero(a.getFullYear() % 100, 2)).replace(/mm|MM/, this.$addZero(a.getMonth() + 1, 2)).replace(/m|M/g, a.getMonth() + 1).replace(/dd|DD/, this.$addZero(a.getDate(), 2)).replace(/d|D/g, a.getDate()).replace(/hh|HH/, this.$addZero(a.getHours(), 2)).replace(/h|H/g, a.getHours()).replace(/ii|II/, this.$addZero(a.getMinutes(), 2)).replace(/i|I/g, a.getMinutes()).replace(/ss|SS/, this.$addZero(a.getSeconds(), 2)).replace(/s|S/g, a.getSeconds()).replace(/w/g, a.getDay()).replace(/W/g, "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split("")[a.getDay()])
        },
        $addZero: function(a, b) {
            for (var c = 0,
            e = b - (a + "").length; c < e; c++) a = "0" + a;
            return a + ""
        },
        $id: function(a) {
            return "string" == typeof a ? document.getElementById(a) : a
        },
        $stopBubble: function(a) {
            a = a || window.event;
            window.event ? a.cancelBubble = !0 : a.stopPropagation()
        },
        $getPageScrollWidth: function() {
            var a = document.body,
            b = "BackCompat" == document.compatMode ? a: document.documentElement,
            c = navigator.userAgent.toLowerCase();
            return window.MessageEvent && -1 == c.indexOf("firefox") && -1 == c.indexOf("opera") ? a.scrollLeft: b.scrollLeft
        },
        $getPageScrollHeight: function() {
            var a = document.body,
            b = "BackCompat" == document.compatMode ? a: document.documentElement,
            c = navigator.userAgent.toLowerCase();
            return window.MessageEvent && -1 == c.indexOf("firefox") && -1 == c.indexOf("opera") && -1 == c.indexOf("msie") ? a.scrollTop: b.scrollTop
        },
        $calendars: function(a) {
            var b = this,
            c = {
                el: null,
                callback: null,
                unit: "",
                nowDate: "",
                pos: "",
                e: null,
                zIndex: null
            },
            e;
            for (e in a) c[e] = a[e];
            Utils.loadCssFile("http://static.gtimg.com/css/core/calendars.css");
            var d = "",
            d = d + '<div id="winCalendar" class="winCalendar">',
            d = d + '<div class="close_win"><span id="btnCloseCalendar">\u5173\u95ed</span></div>',
            d = d + '<div id="currentTime" class="currentTime">',
            d = d + '<strong id="currentYear"></strong> - <strong id="currentMonth"></strong>',
            d = d + '<span id="yearMinus" class="arrow leftA" title="\u51cf\u5c11\u5e74\u4efd">&laquo;</span>',
            d = d + '<span id="monthMinus" class="arrow leftB" title="\u51cf\u5c11\u6708\u4efd">&lt;</span>',
            d = d + '<span id="monthPlus" class="arrow rightB" title="\u589e\u52a0\u6708\u4efd">&gt;</span>',
            d = d + '<span id="yearPlus" class="arrow rightA" title="\u589e\u52a0\u5e74\u4efd">&raquo;</span>',
            d = d + "</div>",
            d = d + '<ul class="week">',
            d = d + "<li>\u4e00</li><li>\u4e8c</li><li>\u4e09</li><li>\u56db</li><li>\u4e94</li><li>\u516d</li><li>\u65e5</li>",
            d = d + "</ul>",
            d = d + '<div id="days" class="days"></div>',
            d = d + '<div id="time" class="time">',
            d = d + '<input type="number" id="hours" value="00" maxlength="2" min="0" max="23" autocomplete="off"/><span id="minutesWrap"><span class="interval">:</span><input type="number" maxlength="2" id="minutes" value="00" min="0" max="59" autocomplete="off"/></span><span id="secondWrap"><span class="interval">:</span><input type="number" maxlength="2" id="seconds" value="00" min="0" max="59" autocomplete="off"/></span>',
            d = d + '<span id="btnOk" class="btnOk">\u786e\u5b9a</span>',
            d = d + "</div>",
            d = d + "</div>",
            d = d + '<iframe class="frm_calendar" id="frmCalendar" src="about:blank" scrolling="no" frameborder="0"></iframe>',
            f = function() {
                if (!b.$id("elCalendarWrap")) {
                    var a = document.createElement("div");
                    a.innerHTML = d;
                    a.setAttribute("id", "elCalendarWrap");
                    document.body.appendChild(a)
                }
            },
            k = function(a) {
                for (var b in a) this[b] = a[b]
            };
            k.prototype = {
                finalDate: "",
                getFinalDate: function() {
                    return this.finalDate
                },
                display: function(a) {
                    a = a || new Date;
                    var b = a.getFullYear(),
                    c = 10 > a.getMonth() + 1 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1;
                    a = a.getDate();
                    var d, e;
                    this.finalDate = b + "-" + c + "-" + (10 > a ? "0" + a: a);
                    this.el.year.innerHTML = b;
                    this.el.month.innerHTML = c;
                    d = (new Date(b, c - 1, 1)).getDay() - 1;
                    d = -1 == d ? 6 : d;
                    e = (new Date(b, c, 0)).getDate() + d;
                    for (var f = this.createDayDom(), g = this, k = 0, l = 0, n; n = f[l]; l++) {
                        var p;
                        l < d || l >= e ? (p = " ", n.className = "no_data") : (p = l + 1 - d, n.onclick = function(a, d) {
                            return function() {
                                f[k].className = "";
                                this.className = "selected";
                                k = d;
                                g.finalDate = b + "-" + c + "-" + (10 > a ? "0" + a: a);
                                "day" == g.el.unit && g.callback && g.callback(g.finalDate)
                            }
                        } (p, l));
                        n.innerHTML = p;
                        p == a && (n.id = this.el.today)
                    }
                },
                createDayDom: function() {
                    var a = this.el.days.getElementsByTagName("a");
                    if (0 >= a.length) for (var c = 0; 42 > c; c++) a = document.createElement("a"),
                    a.setAttribute("href", "javascript:void(0);"),
                    this.el.days.appendChild(a);
                    else for (var c = 0,
                    d; d = a[c]; c++) d.className = "";
                    b.$id(this.el.today) && (b.$id(this.el.today).id = "");
                    return this.el.days.getElementsByTagName("a")
                },
                change: function(a) {
                    var c = b.$id(this.el.today),
                    d = Number(this.el.year.firstChild.nodeValue),
                    e = Number(this.el.month.firstChild.nodeValue) - 1,
                    c = Number(c.firstChild.nodeValue);
                    switch (a) {
                    case "yearPlus":
                        d++;
                        break;
                    case "yearMinus":
                        d--;
                        break;
                    case "monthPlus":
                        31 == c && 6 != e && (c = 1);
                        e++;
                        11 < e && (d++, e = 0);
                        break;
                    case "monthMinus":
                        e--,
                        0 > e && (d--, e = 11)
                    }
                    this.display(new Date(d, e, c))
                },
                custom: function(a) {
                    this.display(a || new Date);
                    a = this.el.currentTime.getElementsByTagName("span");
                    for (var b = this,
                    c = 0,
                    d; d = a[c]; c++) d.onclick = function() {
                        b.change(this.id)
                    }
                }
            }; (function(a, d, e, m, q, r) {
                f();
                e = e || "day";
                var g = b.$id("elCalendarWrap");
                b.$id("winCalendar");
                var s = {
                    el: {
                        year: b.$id("currentYear"),
                        month: b.$id("currentMonth"),
                        currentTime: b.$id("currentTime"),
                        days: b.$id("days"),
                        today: "today",
                        unit: e
                    },
                    callback: function(a) {
                        d(a);
                        g.style.display = "none"
                    }
                },
                l = new k(s);
                showDate = m.substring(0, 10);
                /\d{4}-\d{2}-\d{2}/.test(showDate) ? (showDate = showDate.match(/(\d{4})-(\d{2})-(\d{2})/), l.custom(new Date(showDate[1], showDate[2] - 1, showDate[3]))) : l.custom();
                "hou" == e || "min" == e || "sec" == e ? (m && (m = m.match(/(\d{2}):(\d{2}):(\d{2})/)) && (b.$id("hours").value = m[1], b.$id("minutes").value = m[2], b.$id("seconds").value = m[3]), b.$id("time").style.display = "block", b.$id("minutesWrap").style.display = "min" == e || "sec" == e ? "inline": "none", b.$id("secondWrap").style.display = "sec" == e ? "inline": "none", b.$id("btnOk").onclick = function() {
                    var a = b.$id("hours").value,
                    c = b.$id("minutes").value,
                    f = b.$id("seconds").value;
                    if (0 > a || 23 < a) return alert("\u5c0f\u65f6\u53ef\u4ee5\u662f0\u81f323\u7684\u6570"),
                    !1;
                    if (("min" == e || "sec" == e) && (0 > c || 59 < c)) return alert("\u5206\u949f\u53ef\u4ee5\u662f0\u81f359\u7684\u6570"),
                    !1;
                    if ("sec" == e && (0 > f || 59 < f)) return alert("\u79d2\u6570\u53ef\u4ee5\u662f0\u81f359\u7684\u6570"),
                    !1;
                    a = 2 > a.length ? "0" + a: a;
                    a = "min" == e || "sec" == e ? a + (":" + (2 > c.length ? "0" + c: c)) : a + ":00";
                    a = "sec" == e ? a + (":" + (2 > f.length ? "0" + f: f)) : a + ":00";
                    c = l.getFinalDate() + " " + a;
                    d && d(c);
                    g.style.display = "none"
                }) : b.$id("time").style.display = "none";
                q = q || [0, 0];
                c.zIndex = parseInt(c.zIndex, 10);
                isNaN(c.zIndex) || null == c.zIndex || (g.style.zIndex = c.zIndex);
                g.style.display = "block";
                g.style.position = "absolute";
                g.style.left = a.getBoundingClientRect().left + b.$getPageScrollWidth() + q[0] + "px";
                g.style.top = a.getBoundingClientRect().top + b.$getPageScrollHeight() + q[0] + a.offsetHeight + "px";
                g.onclick = function(a) {
                    a = a || window.event;
                    b.$stopBubble(a);
                    a.stopPropagation()
                };
                b.$stopBubble(r);
                r.stopPropagation();
                $(document.body).click(function() {
                    g.style.display = "none"
                });
                b.$id("btnCloseCalendar").onclick = function() {
                    g.style.display = "none"
                }
            })(c.el, c.callback, c.unit, c.nowDate, c.pos, c.e)
        }
    })
})();
window.define && define(function(a, b) {
    b.legos = window.Legos;
    b.utils = window.Utils
});
/*  |xGv00|18bc927f209fc2a7a77e39d6fe1b87e4 */
