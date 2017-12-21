
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/ 
Date.prototype.format =function(fmt) {         
	var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	};         
	var week = {         
	    "0" : "\u65e5",         
	    "1" : "\u4e00",         
	    "2" : "\u4e8c",         
	    "3" : "\u4e09",         
	    "4" : "\u56db",         
	    "5" : "\u4e94",         
	    "6" : "\u516d"        
	};         
	if(/(y+)/.test(fmt)){         
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	}         
	if(/(E+)/.test(fmt)){         
	    fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
	}         
	for(var k in o){         
	    if(new RegExp("("+ k +")").test(fmt)){         
	        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	    }         
	}         
	return fmt;         
};

Date.prototype.addDays = function(d){
	this.setDate(this.getDate() + d);
	return this;
};

Date.prototype.addWeeks = function(w){
	return this.addDays(w * 7);
};

Date.prototype.addMonths= function(m){
	var d = this.getDate();
	this.setMonth(this.getMonth() + m);
	
	if (this.getDate() < d)
	    this.setDate(0);
	return this;
};


function $addToken(a, b) {
    var c = $getToken();
    if ("" == a || 0 != (a.indexOf("://") < 0 ? location.href: a).indexOf("http")) return a;
    if ( - 1 != a.indexOf("#")) {
        var d = a.match(/\?.+\#/);
        if (d) {
            var e = d[0].split("#"),
            f = [e[0], "&g_tk=", c, "&g_ty=", b, "#", e[1]].join("");
            return a.replace(d[0], f)
        }
        var e = a.split("#");
        return [e[0], "?g_tk=", c, "&g_ty=", b, "#", e[1]].join("")
    }
    return "" == c ? a + ( - 1 != a.indexOf("?") ? "&": "?") + "g_ty=" + b: a + ( - 1 != a.indexOf("?") ? "&": "?") + "g_tk=" + c + "&g_ty=" + b
}
function $getToken() {
    var a = $getCookie("skey"),
    b = null == a ? "": $time33(a);
    return b
}
function $time33(a) {
    for (var b = 0,c = a.length,d = 5381; c > b; ++b) 
    d += (d << 5) + a.charAt(b).charCodeAt();
    return 2147483647 & d
}
function $getCookie(a) {
    var b = new RegExp("(^| )" + a + "(?:=([^;]*))?(;|$)"),
    c = document.cookie.match(b);
    return c ? c[2] ? unescape(c[2]) : "": null
}
function $getScrollPosition() {
    var a = top.document.documentElement.scrollLeft || top.document.body.scrollLeft || top.pageXOffset,
    b = top.document.documentElement.scrollTop || top.document.body.scrollTop || top.pageYOffset;
    return [a ? a: 0, b ? b: 0]
}
//分页栏动态创建
function $page(a) {
    function b(a) {
        for (var c = [], d = 0; d < a.length; d++) a[d].length > 0 ? c = c.concat(b(a[d])) : c.push(a[d]);
        return c
    }
    var c = {
        keyId: Math.random(),
        pageCount: 0,
        currentPage: 0,
        itemCount: 0,
        more: !1,
        domList: [],
        type: "full",
        action: "func",
        url: "http://www.paipai.com/?pid={#pageId#}",
        func: function() {
            return ! 0
        },
        onInit: function() {
            return ! 0
        }
    };
    for (var d in a) c[d] = a[d];
    var e = ["", '{#goTo#}<span class="mod-button mod-button_small mod-pagenav__item" pageTag="go" pageId="{#pageId#}">{#pageId#}</span>{#goTo/#} {#current#}<span class="mod-button mod-button_small mod-pagenav__item mod-pagenav__item_current">{#pageId#}</span>{#current/#}{#hide#}<span class="mod-button mod-button_small mod-pagenav__item">...</span>{#hide/#}{#next#}<span class="mod-button mod-button_small mod-pagenav__item" pageTag="go" pageId="{#pageId#}">></span>{#next/#}{#_next#}<span class="mod-button mod-button_small mod-pagenav__item mod-button_disable">></span>{#_next/#}{#previou#}<span pageTag="go" pageId="{#pageId#}" class="mod-button mod-button_small mod-pagenav__item"><</span>{#previou/#}{#_previou#}<span class="mod-button mod-button_small mod-pagenav__item mod-button_disable"><</span>{#_previou/#}{#first#}{#first/#}{#_first#}{#_first/#}{#last#}{#last/#}{#_last#}{#_last/#}{#more#}<span class="mod-button mod-button_small mod-pagenav__item">...</span>{#more/#}{#_more#}{#_more/#}'],
    f = [e[0], e[1], '<div class="mod-pagenav ui-m-large">{#previousPage#}{#pageList#}{#morePage#}{#nextPage#}<span class="mod-pagenav__white"></span><span class="ui-mr-small ui-ml-small">到第</span><input type="text" class="mod-input mod-input_small mod-pagenav__num-input" name="inputItem" pageTag="input" value="{#currentPageId#}"><span class="ui-mr-small ui-ml-small">页</span><button class="mod-button mod-pagenav__jump" pageTag="jumper">跳转</button>'],
    g = f[0] + f[1] + f[2],
    h = parseInt(c.pageCount),
    i = parseInt(c.currentPage),
    j = parseInt(c.itemCount);
    i = i > h ? h: i;
    var k = {
        next: "",
        _next: "",
        previou: "",
        _previou: "",
        first: "",
        _first: "",
        last: "",
        _last: "",
        more: "",
        _more: "",
        goTo: "",
        current: "",
        hide: ""
    };
    for (var d in k) {
        var l = new RegExp("{#" + d + "#}(.*){#" + d + "/#}", "ig").exec(g);
        k[d] = l ? RegExp.$1: ""
    }
    if (k.nextPageHtml = h > i ? k.next.replace(/{#pageId#}/g, i + 1) : k._next, k.previousPageHtml = i > 1 ? k.previou.replace(/{#pageId#}/g, i - 1) : k._previou, k.firstPageHtml = i > 1 ? k.first.replace(/{#pageId#}/g, 1) : k._first, k.lastPageHtml = h > i ? k.last.replace(/{#pageId#}/g, h) : k._last, k.morePageHtml = c.more ? k.more.replace(/{#pageId#}/g, h + 1) : k._more, k.pagelistHtml = "", k.shortPageListHtml = "", k.noLastTmplHtml = "", k.miniPageListHtml = "<span>" + i + "/" + h + "</span>", 10 >= h) for (var d = 1; h >= d; d++) k.pagelistHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
    else {
        var m = i - 3,
        n = i + 3;
        for (m = 3 >= m ? 1 : m, n = n > h - 3 ? h: n, 6 >= i && (n = 8), k.pagelistHtml += i > 6 ? k.goTo.replace(/{#pageId#}/g, 1) + k.hide: "", d = m; n >= d; d++) k.pagelistHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
        k.pagelistHtml += h - 6 >= i ? k.hide + k.goTo.replace(/{#pageId#}/g, h) : ""
    }
    if (8 >= h) for (var d = 1; h >= d; d++) k.shortPageListHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
    else {
        var m = i - 2,
        n = i + 2;
        for (m = 2 >= m ? 1 : m, n = n > h - 2 ? h: n, 4 >= i && (n = 6), k.shortPageListHtml += i > 4 ? k.goTo.replace(/{#pageId#}/g, 1) + k.hide: "", d = m; n >= d; d++) k.shortPageListHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
        k.shortPageListHtml += h - 4 >= i ? k.hide + k.goTo.replace(/{#pageId#}/g, h) : ""
    }
    if (6 >= h) for (var d = 1; h >= d; d++) k.noLastTmplHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
    else {
        var m = i - 2,
        n = i + 1;
        for (m = 3 >= m ? 1 : m, n = n > h - 1 ? h: n, k.noLastTmplHtml += i > 5 ? k.goTo.replace(/{#pageId#}/g, 1) + k.goTo.replace(/{#pageId#}/g, 2) + k.hide: "", d = m; n >= d; d++) k.noLastTmplHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
        k.noLastTmplHtml += h - 2 >= i ? k.hide: ""
    }
    if (c.more) {
        k.pagelistHtml = "";
        for (var d = 1; h >= d; d++) k.pagelistHtml += d == i ? k.current.replace(/{#pageId#}/g, d) : k.goTo.replace(/{#pageId#}/g, d);
        k.shortPageListHtml = k.pagelistHtml
    }
    g = f[2].replace(/{#currentPageId#}/g, i).replace(/{#pageCountNum#}/g, h).replace(/{#itemCountNum#}/g, j).replace(/{#firstPage#}/g, k.firstPageHtml).replace(/{#previousPage#}/g, k.previousPageHtml).replace(/{#nextPage#}/g, k.nextPageHtml).replace(/{#lastPage#}/g, k.lastPageHtml).replace(/{#pageList#}/g, k.pagelistHtml).replace(/{#shortPageList#}/g, k.shortPageListHtml).replace(/{#morePage#}/g, k.morePageHtml).replace(/{#miniPageList#}/g, k.miniPageListHtml).replace(/{#noLastTmpl#}/g, k.noLastTmplHtml).replace(/{#maxlength#}/g, h.toString().length);
    var o = [],
    p = [],
    q = [],
    r = [];
    o = o.concat(b(c.domList)),
    o.length;
    for (var d = 0; d < o.length; d++) try {
        o[d].innerHTML = g.replace(/{#debugtag#}/g, d);
        for (var s = o[d].getElementsByTagName("input"), t = 0; t < s.length; t++)"input" == s[t].getAttribute("pageTag") && p.push(s[t]);
        for (var s = o[d].getElementsByTagName("button"), t = 0; t < s.length; t++)"jumper" == s[t].getAttribute("pageTag") && q.push(s[t]);
        for (var s = o[d].getElementsByTagName("span"), t = 0; t < s.length; t++)"go" == s[t].getAttribute("pageTag") && r.push(s[t])
    } catch(u) {}
    for (var d = 0; d < p.length; d++) p[d].onblur = function() {
        this.value = this.value.replace(/[^0-9]/g, ""),
        (this.value > h || this.value < 1) && (this.value = "");
        for (var a = 0; a < p.length; a++) p[a].value = this.value
    },
    p[d].onfocus = function() {
        this.select()
    },
    p[d].onkeydown = function(a) {
        var a = window.event || a;
        return 13 != a.keyCode ? !0 : (this.onblur(), q[0].onclick(), !1)
    };
    for (var d = 0; d < q.length; d++) q[d].onclick = function() {
        var a = (this.parentElement || this.parentNode).getElementsByTagName("input")[0],
        b = parseInt(a.value, 10);
        return a.onblur(),
        1 > b || !b ? (a.focus(), void 0) : (v(b, c), void 0)
    };
    for (var d = 0; d < r.length; d++)"url" == c.action ? r[d].href = c.url.replace("{#pageId#}", r[d].getAttribute("pageId")) : r[d].onclick = function() {
        v(this.getAttribute("pageId"), c)
    };
    var v = function(a, b) {
        return "url" == b.action && (location.href = b.url.replace("{#pageId#}", a)),
        "func" == b.action ? b.func(a, b) : !1
    };
    c.onInit()
}
function $getPageScrollWidth() {
    var a = document.body,
    b = "BackCompat" == document.compatMode ? a: document.documentElement;
    return window.MessageEvent && -1 == navigator.userAgent.toLowerCase().indexOf("firefox") ? a.scrollLeft: b.scrollLeft
}
function $getPageScrollHeight() {
    var a = document.body,
    b = "BackCompat" == document.compatMode ? a: document.documentElement,
    c = navigator.userAgent.toLowerCase();
    return window.MessageEvent && -1 == c.indexOf("firefox") && -1 == c.indexOf("opera") && -1 == c.indexOf("msie") ? a.scrollTop: b.scrollTop
}
function $loadCss(a, b) {
    if (a) {
        var c;
        return (!window._loadCss || window._loadCss.indexOf(a) < 0) && (c = document.createElement("link"), c.setAttribute("type", "text/css"), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", a), c.setAttribute("id", "loadCss" + Math.random()), document.getElementsByTagName("head")[0].appendChild(c), window._loadCss ? window._loadCss += "|" + a: window._loadCss = "|" + a),
        c && "function" == typeof b && (c.onload = b),
        !0
    }
}
function $calendars(a) {
    var b = {
        el: null,
        callback: function() {
            return ! 0
        },
        unit: "",
        nowDate: "",
        pos: "",
        e: null,
        zIndex: null
    };
    for (var c in a) b[c] = a[c];
    $loadCss("http://static.gtimg.com/css/core/calendars.css");
    var d = "";
    d += '<div id="winCalendar" class="winCalendar">',
    d += '<div class="close_win"><span id="btnCloseCalendar">关闭</span></div>',
    d += '<div id="currentTime" class="currentTime">',
    d += '<strong id="currentYear"></strong> - <strong id="currentMonth"></strong>',
    d += '<span id="yearMinus" class="arrow leftA" title="减少年份">«</span>',
    d += '<span id="monthMinus" class="arrow leftB" title="减少月份"><</span>',
    d += '<span id="monthPlus" class="arrow rightB" title="增加月份">></span>',
    d += '<span id="yearPlus" class="arrow rightA" title="增加年份">»</span>',
    d += "</div>",
    d += '<ul class="week">',
    d += "<li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>",
    d += "</ul>",
    d += '<div id="days" class="days"></div>',
    d += '<div id="time" class="time">',
    d += '<input type="number" id="hours" value="00" maxlength="2" min="0" max="23" autocomplete="off"/><span id="minutesWrap"><span class="interval">:</span><input type="number" maxlength="2" id="minutes" value="00" min="0" max="59" autocomplete="off"/></span><span id="secondWrap"><span class="interval">:</span><input type="number" maxlength="2" id="seconds" value="00" min="0" max="59" autocomplete="off"/></span>',
    d += '<span id="btnOk" class="btnOk">确定</span>',
    d += "</div>",
    d += "</div>",
    d += '<iframe class="frm_calendar" id="frmCalendar" src="about:blank" scrolling="no" frameborder="0"></iframe>';
    var e = function() {
        if (!$id("elCalendarWrap")) {
            var a = document.createElement("div");
            a.innerHTML = d,
            a.setAttribute("id", "elCalendarWrap"),
            document.body.appendChild(a)
        }
    },
    f = function() {
        for (var a in arguments[0]) this[a] = arguments[0][a]
    };
    f.prototype = {
        finalDate: "",
        getFinalDate: function() {
            return this.finalDate
        },
        display: function(a) {
            var a = a || new Date,
            b = {
                year: a.getFullYear(),
                month: a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1,
                date: a.getDate(),
                hour: a.getHours() < 10 ? "0" + a.getHours() : a.getHours(),
                minute: a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes(),
                second: a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds()
            };
            this.finalDate = b.year + "-" + b.month + "-" + (b.date < 10 ? "0" + b.date: b.date),
            this.el.year.innerHTML = b.year,
            this.el.month.innerHTML = b.month,
            this.el.hours.value = b.hour,
            this.el.minutes.value = b.minute,
            this.el.seconds.value = b.second,
            b.firstdayPos = new Date(b.year, b.month - 1, 1).getDay() - 1,
            b.firstdayPos = -1 == b.firstdayPos ? 6 : b.firstdayPos,
            b.maxDayPos = new Date(b.year, b.month, 0).getDate() + b.firstdayPos;
            for (var c, d = this.createDayDom(), e = this, f = 0, g = 0; c = d[g]; g++) {
                var h;
                g < b.firstdayPos || g >= b.maxDayPos ? (h = " ", c.className = "no_data") : (h = g + 1 - b.firstdayPos, c.onclick = function(a, c) {
                    return function() {
                        d[f].className = "",
                        this.className = "selected",
                        f = c,
                        e.finalDate = b.year + "-" + b.month + "-" + (10 > a ? "0" + a: a),
                        "day" == e.el.unit && e.callback && e.callback(e.finalDate)
                    }
                } (h, g)),
                c.innerHTML = h,
                h == b.date && (c.id = this.el.today)
            }
        },
        createDayDom: function() {
            var a = this.el.days.getElementsByTagName("a");
            if (a.length <= 0) for (var b = 0; 42 > b; b++) {
                var c = document.createElement("a");
                c.setAttribute("href", "javascript:void(0);"),
                this.el.days.appendChild(c)
            } else for (var d, b = 0; d = a[b]; b++) d.className = "";
            return $id(this.el.today) && ($id(this.el.today).id = ""),
            this.el.days.getElementsByTagName("a")
        },
        change: function(a) {
            var b = $id(this.el.today),
            c = {
                year: Number(this.el.year.firstChild.nodeValue),
                month: Number(this.el.month.firstChild.nodeValue) - 1,
                day: Number(b.firstChild.nodeValue)
            };
            switch (a) {
            case "yearPlus":
                c.year++;
                break;
            case "yearMinus":
                c.year--;
                break;
            case "monthPlus":
                31 == c.day && 6 != c.month && (c.day = 1),
                c.month++,
                c.month > 11 && (c.year++, c.month = 0);
                break;
            case "monthMinus":
                c.month--,
                c.month < 0 && (c.year--, c.month = 11)
            }
            this.display(new Date(c.year, c.month, c.day))
        },
        custom: function() {
            this.display(arguments[0] || new Date);
            for (var a, b = this.el.currentTime.getElementsByTagName("span"), c = this, d = 0; a = b[d]; d++) a.onclick = function() {
                c.change(this.id)
            }
        }
    };
    var g = function(a, c, d, g, h, i) {
        e(),
        d = d || "day";
        var j = $id("elCalendarWrap");
        $id("winCalendar"),
        new Date;
        var k = {
            el: {
                year: $id("currentYear"),
                month: $id("currentMonth"),
                currentTime: $id("currentTime"),
                days: $id("days"),
                today: "today",
                hours: $id("hours"),
                minutes: $id("minutes"),
                seconds: $id("seconds"),
                unit: d
            },
            callback: function(a) {
                c(a),
                j.style.display = "none"
            }
        },
        l = new f(k);
        g.substring(0, 10),
        g ? l.custom(new Date(g)) : l.custom(),
        "hou" == d || "min" == d || "sec" == d ? ($id("time").style.display = "block", $id("minutesWrap").style.display = "min" == d || "sec" == d ? "inline": "none", $id("secondWrap").style.display = "sec" == d ? "inline": "none", $id("btnOk").onclick = function() {
            var a = $id("hours").value,
            b = $id("minutes").value,
            e = $id("seconds").value;
            if (0 > a || a > 23) return alert("小时可以是0至23的数"),
            !1;
            if (("min" == d || "sec" == d) && (0 > b || b > 59)) return alert("分钟可以是0至59的数"),
            !1;
            if ("sec" == d && (0 > e || e > 59)) return alert("秒数可以是0至59的数"),
            !1;
            var f = a.length < 2 ? "0" + a: a;
            f += "min" == d || "sec" == d ? ":" + (b.length < 2 ? "0" + b: b) : ":00",
            f += "sec" == d ? ":" + (e.length < 2 ? "0" + e: e) : ":00";
            var g = l.getFinalDate() + " " + f;
            c && c(g),
            j.style.display = "none"
        }) : $id("time").style.display = "none",
        h = h || [0, 0],
        b.zIndex = parseInt(b.zIndex, 10),
        isNaN(b.zIndex) || null == b.zIndex || (j.style.zIndex = b.zIndex),
        j.style.display = "block",
        j.style.position = "absolute",
        j.style.left = a.getBoundingClientRect().left + $getPageScrollWidth() + h[0] + "px",
        j.style.top = a.getBoundingClientRect().top + $getPageScrollHeight() + h[0] + a.offsetHeight + "px",
        j.onclick = function(a) {
            a = a || window.event,
            $stopBubble(a)
        },
        $stopBubble(i),
        $addEvent(document, "click",
        function() {
            j.style.display = "none"
        }),
        $id("btnCloseCalendar").onclick = function() {
            j.style.display = "none"
        }
    };
    g(b.el, b.callback, b.unit, b.nowDate, b.pos, b.e)
}
function $addEvent(a, b, c) {
    function d(a, b, c, d) {
        a.__hids = a.__hids || [];
        var e = "h" + window.__Hcounter++;
        a.__hids.push(e),
        window.__allHandlers[e] = {
            type: b,
            handler: c,
            wrapper: d
        }
    }
    function e(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }
    if (a && b && c) if (a instanceof Array) for (var f = 0,
    g = a.length; g > f; f++) $addEvent(a[f], b, c);
    else if (b instanceof Array) for (var f = 0,
    g = b.length; g > f; f++) $addEvent(a, b[f], c);
    else if (window.__allHandlers = window.__allHandlers || {},
    window.__Hcounter = window.__Hcounter || 1, window.addEventListener) {
        var h = e(c, a);
        d(a, b, c, h),
        a.addEventListener(b, h, !1)
    } else if (window.attachEvent) {
        var h = e(c, a);
        d(a, b, c, h),
        a.attachEvent("on" + b, h)
    } else a["on" + b] = c
}
function $id(a) {
    return "string" == typeof a ? document.getElementById(a) : a
}
function $stopBubble(a) {
    var b = a || window.event;
    window.event ? b.cancelBubble = !0 : b.stopPropagation()
}
function $getTimeInterval(a, b) {
    var c = [0, 0, 0, 0],
    d = "",
    e = b > a ? parseInt((b - a) / 1e3) : 0;
    return c[0] = e > 86400 ? parseInt(e / 86400) : 0,
    e -= 86400 * c[0],
    c[1] = e > 3600 ? parseInt(e / 3600) : 0,
    e -= 3600 * c[1],
    c[2] = e > 60 ? parseInt(e / 60) : 0,
    c[3] = e - 60 * c[2],
    d = c[0] > 0 ? c[0] + "天": "",
    d += c[0] <= 0 && c[1] <= 0 ? "": c[1] + "小时",
    d += c[0] <= 0 && c[1] <= 0 && c[2] <= 0 ? "": c[2] + "分钟",
    d += c[0] <= 0 && c[1] <= 0 && c[2] <= 0 && c[3] <= 0 ? "": c[3] + "秒"
}
function $regionGetPathByStr(a, b) {
    var c = ["", "", "", "", "", "", !1, ""];
    if (a) { - 1 != a.indexOf("省", 0) && (a = a.replace("省", ""));
        for (var d = [[0, "北京北京市", 4e4, "北京", "北京市"], [1, "天津天津市", 100, "天津", "天津市"], [2, "上海上海市", 200, "上海", "上海市"], [3, "重庆重庆市", 300, "重庆", "重庆市"]], e = 0; e < d.length; e++) {
            var f = d[e];
            if (b[f[0]][0] == a.substring(0, 2)) {
                a = a.replace(f[1], "");
                for (var g in b[f[0]][2][f[2]][2]) if (b[f[0]][2][f[2]][2][g] == a) return [f[0], f[3], f[2], f[4], g, a, !0, g]
            }
        }
        b[42245][0] == a.substring(0, 2) && (c = [42245, "海外", 42246, "海外", "", "", !0, 42246]),
        d = [[32, "香港"], [33, "澳门"], [31, "台湾"]];
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            if (b[f[0]][0] == a.substring(0, 2)) {
                a = a.replace(f[1], "");
                for (var g in b[f[0]][2]) if (b[f[0]][2][g][0] == a) return c = [f[0], f[1], g, a, "", "", !0, g]
            }
        }
        if (a.substring(0, 3) === b[10][0] || a.substring(0, 3) === b[6][0]) {
            c[0] = index = "黑龙江" === a.substring(0, 3) ? 6 : 10,
            c[1] = "黑龙江" === a.substring(0, 3) ? b[6][0] : b[10][0],
            a = a.replace(a.substring(0, 3), "");
            for (var g in b[index][2]) if (a.substring(0, 2) === b[index][2][g][0].substring(0, 2)) {
                c[2] = g,
                c[3] = b[index][2][g][0],
                a = a.replace(b[index][2][g][0], "");
                for (var h in b[index][2][g][2]) b[index][2][g][2][h][0] === a && (c[4] = h, c[5] = b[index][2][g][2][h][0], c[6] = !0, c[7] = h)
            }
        }
        for (var e in b) if (b[e][0].substring(0, 2) === a.substring(0, 2)) {
            c[0] = e,
            c[1] = b[e][0],
            a = a.replace(a.substring(0, 2), "");
            for (var i in b[e][2]) if (a.substring(0, 2) === b[e][2][i][0].substring(0, 2)) {
                c[2] = i,
                c[3] = b[e][2][i][0],
                a = a.replace(b[e][2][i][0], "");
                for (var h in b[e][2][i][2]) if (b[e][2][i][2][h][0] === a) return c[4] = h,
                c[5] = a,
                c[6] = !0,
                c[7] = h,
                c
            }
        }
        return c
    }
}
function $loadScript(a) {
    var b = document.createElement("script");
    b.type = "text/javascript",
    $("head")[0].appendChild(b),
    b.src = a
}
function $getQuery(a) {
    var b = arguments[1] || window.location.search,
    c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"),
    d = b.substr(b.indexOf("?") + 1).match(c);
    return null != d ? d[2] : ""
}


function anonymous(it) {
	var out = ' ';
	var arr1 = it.DealList;
	if (arr1) {
		var deal, index = -1, l1 = arr1.length - 1;
		while (index < l1) {
			deal = arr1[index += 1];
			out += ' <table id="table_'
					+ (deal.ID)
					+ '" class="mod-components__table mod-components__table_layout mod-components__table_nest ui-mb-large"> <tbody> <tr> <td colspan="9" class="no-padding"> <table> <colgroup> <!--总宽 775--> <col style="width: 100px;"> <col style="width: 140px;"> <col style="width: 80px;"> <col style="width: 120px;"> <col style="width: 100px;"> <col style="width: 100px;"> <col style="width: 153px;"> </colgroup> <tbody> <tr> <td colspan="4" class="title-box no-padding no-border ui-ta-l">订单编号：'
					+ (deal.ID)
					+ '</td> <td colspan="5" class="title-box no-padding no-border ui-ta-r"> 下单时间：'
					+ (deal.dealTime) + ' <span dealId="' + (deal.ID)
					+ '" et="click:addMark" class="icon_flag_'
					+ (deal.Note.Type * 1 + 1)
					+ '" title="点击可添加备注"></span> </td> </tr> ';
			var arr2 = deal.tradeList;
			if (arr2) {
				var trade, seq = -1, l2 = arr2.length - 1;
				while (seq < l2) {
					trade = arr2[seq += 1];
					out += ' <tr> <td class="mod-components__table-p_small"> <a target="_blank" href="http://weigou.qq.com/o2ov1/cn/item/preview.xhtml?ic='
							+ (trade.Item.ID)
							+ '"><img src="'
							+ (trade.Item.Image)
							+ '" width="69" height="69"/></a> </td> <td> <a target="_blank" href="http://weigou.qq.com/o2ov1/cn/item/preview.xhtml?ic='
							+ (trade.Item.ID) + '"> ';
					if (deal.activeShopDeal && !deal.activeDeal) {
						out += ' 【<span style="color:red;">门店取货</span>】 ';
					} else {
						out += ' ';
						if (deal.businessSence == 1) {
							out += '【<span style="color:red;">扫码购</span>】';
						}
						out += ' ';
						if (deal.businessSence == 2) {
							out += '【<span style="color:red;">店员app分享</span>】';
						}
						out += ' ';
						if (deal.businessSence == 3) {
							out += '【<span style="color:red;">线上商城</span>】';
						}
						out += ' ';
						if (deal.businessSence == 4) {
							out += '【<span style="color:red;">附近门店</span>】';
						}
						out += ' ';
						if (deal.businessSence == 5) {
							out += '【<span style="color:red;">关联导购</span>】';
						}
						out += ' ';
						if (deal.businessSence == 6) {
							out += '【<span style="color:red;">用户App</span>】';
						}
						out += ' ';
						if (deal.businessSence == 7) {
							out += '【<span style="color:red;">大账号</span>】';
						}
						out += ' ';
						if (deal.businessSence == 8) {
							out += '【<span style="color:red;">门店Pad</span>】';
						}
						if (deal.businessSence == 9) {
							out += '【<span style="color:red;">企业号应用</span>】';
						}
						out += ' ';
						if (deal.activeDeal) {
							out += ' 【<span style="color:red;">活动订单</span>】 ';
						}
						out += ' ';
						if (deal.freeDeal) {
							out += ' 【<span style="color:red;">免单</span>】 ';
						}
						out += ' ';
					}
					out += ' ' + (trade.Item.Name) + ' </a> <br/> '
							+ (trade.Item.Properties)
							+ ' </td> <td class="ui-ta-c">&yen;'
							+ (trade.Item.Price) + '<br/>(' + (trade.ItemCount)
							+ '件)</td> ';
					if (deal.tradeList.length > 1) {
						out += ' ';
						if (seq == 0) {
							out += ' <td class="ui-ta-c" rowspan="'
									+ (deal.tradeList.length)
									+ '"> &yen;'
									+ (deal.TotalPrice)
									+ '<br/> '
									+ (deal.shipDesc)
									+ ' </td> <td class="ui-ta-c" rowspan="'
									+ (deal.tradeList.length)
									+ '"> <!-- <a href="victor://message/?fromid='
									+ (deal.SellerUin)
									+ '&toid='
									+ (deal.Buyer.OpenId)
									+ '&toid_type=wx" class="mod-icon mod-icon_msg"></a> --><a target="_blank" href="http://crm2.paipai.com/cgi-bin/crmctrlmsg/CreateSession?bizid='
									+ (deal.SellerUin)
									+ '&visitaccount='
									+ (deal.Buyer.OpenId)
									+ '&channelaccount='
									+ (deal.appId)
									+ '&channeltype=1&robtype=1&callback=creatS" class="mod-icon mod-icon_msg"></a> <span class="mod-icon mod-icon_profile user_profile" dealId="'
									+ (deal.ID)
									+ '"></span> </td> <td class="ui-ta-c mod-components__table-p_small" rowspan="'
									+ (deal.tradeList.length)
									+ '"> <a href="http://wkd.qq.com/mgmtV2/deal/detail.xhtml?deal_id='
									+ (deal.ID) + '&deal_state=' + (deal.State);
							if (deal.activeDeal) {
								out += '&temp=1';
							}
							out += '">订单详情</a> <br> <span class="ui-c-strong">'
									+ (deal.statusDesc)
									+ '</span> </td> <td class="ui-ta-c mod-components__table-p_small" rowspan="'
									+ (deal.tradeList.length) + '"> '
									+ (deal.dealAction) + ' </td> ';
						}
						out += ' ';
					} else {
						out += ' <td class="ui-ta-c"> &yen;'
								+ (deal.TotalPrice)
								+ '<br/> '
								+ (deal.shipDesc)
								+ ' </td> <td class="ui-ta-c"> <!-- <a href="victor://message/?fromid='
								+ (deal.SellerUin)
								+ '&toid='
								+ (deal.Buyer.OpenId)
								+ '&toid_type=wx" class="mod-icon mod-icon_msg"></a> --><a target="_blank" href="http://crm2.paipai.com/cgi-bin/crmctrlmsg/CreateSession?bizid='
								+ (deal.SellerUin)
								+ '&visitaccount='
								+ (deal.Buyer.OpenId)
								+ '&channelaccount='
								+ (deal.appId)
								+ '&channeltype=1&robtype=1&callback=creatS" class="mod-icon mod-icon_msg"></a> <span class="mod-icon mod-icon_profile user_profile" dealId="'
								+ (deal.ID)
								+ '"></span> </td> <td class="ui-ta-c mod-components__table-p_small"> <a href="http://wkd.qq.com/mgmtV2/deal/detail.xhtml?deal_id='
								+ (deal.ID) + '&deal_state=' + (deal.State);
						if (deal.activeDeal) {
							out += '&temp=1';
						}
						out += '">订单详情</a> <br> <span class="ui-c-strong">'
								+ (deal.statusDesc)
								+ '</span> </td> <td class="ui-ta-c mod-components__table-p_small"> '
								+ (deal.dealAction) + ' </td> ';
					}
					out += ' </tr> ';
				}
			}
			out += ' ';
			if (deal.isRefundDeal || deal.Note.Content.length > 0) {
				out += ' <tr> <td colspan="7" class="mod-components__table-p_warn"> ';
				if (deal.isRefundDeal) {
					out += ' <p>买家退货原因：' + (deal.refundReason)
							+ '</p> <p>买家退货联系电话：' + (deal.refundPhone)
							+ '</p> ';
					if (deal.refundShipNo && deal.refundShipCompany) {
						out += ' <p>运单号码：' + (deal.refundShipNo)
								+ '</p> <p>物流公司：' + (deal.refundShipCompany)
								+ '</p> ';
					}
					out += ' ';
				}
				out += ' ';
				if (deal.Note.Content.length > 0) {
					out += ' <p>卖家备注：' + (deal.Note.Content) + '</p> ';
				}
				out += ' </td> </tr> ';
			}
			out += ' </tbody> </table> </td> </tr> </tbody> </table> ';
		}
	}
	return out;
}
/**通用方法**/

var defaults = {
	type : "POST",
	cache : false,
	async : false,
	// dataType: "json",
	beforeSend : function(req) {
		req.setRequestHeader("X-Ajax-call", "true");
	},
	success : function(data) {
		// $.mobile.changePage(basePath + data.targetUrl,{reloadPage:true});
	}
};

function doAjax(url, options) {
	/****
	var basePath = $('#basePath', window.top.document).val();
	var defaults = {
		url : basePath + url,
		type : "POST",
		cache : false,
		async : false,
		// dataType: "json",
		beforeSend : function(req) {
			req.setRequestHeader("X-Ajax-call", "true");
		},
		success : function(data) {
			// $.mobile.changePage(basePath + data.targetUrl,{reloadPage:true});
		}
	};
	$.ajax($.extend({}, defaults, options || {}));
	****/
	$.ajax($.extend({url : _basePath + url}, defaults, options || {}));
}

function doAjaxSubmit(fm, options) {
	$(fm).ajaxSubmit($.extend({}, defaults, options || {}));
}

function formatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

/**
 * 格式化返回一个 格式为 '2014-05-06 12:31:39' 的字符串
 * 
 * @param date
 *            事件对象
 * @returns dateString
 */
function dateTimeFormater(date) {
	var dateString = formatter(date);
	var hour = date.getHours(); // 时
	var min = date.getMinutes(); // 分
	var sec = date.getSeconds(); // 秒
	hour = (hour < 10) ? ('0' + hour) : hour;
	min = (min < 10) ? ('0' + min) : min;
	sec = (sec < 10) ? ('0' + sec) : sec;
	dateString = dateString + "  " + hour + ":" + min + ":" + sec;
	return dateString;
}

function parser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function setCookie(c_name, value, days) {
	if (null == days || '' == days) {
		days = 30;
	}
	var exp = new Date();
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = c_name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}

function delCookie(c_name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var value = getCookie(c_name);
	if (value != null)
		document.cookie = c_name + "=" + value + ";expires="
				+ exp.toGMTString();
}

var LocalData = {
	set : function(k, v) {
		window.localStorage.setItem(k, v);
	},
	get : function(k) {
		return window.localStorage.getItem(k);
	},
	remove : function(k) {
		window.localStorage.removeItem(k);
	}
};

var Browser = {
	versions : function() {
		var u = navigator.userAgent;
		return {//移动终端浏览器版本信息
			mobile : !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android : u.indexOf('Android') > -1, //android终端
			iPhone : u.indexOf('iPhone') > -1, //是否为iPhone
			iPad : u.indexOf('iPad') > -1 //是否iPad
		};
	}(),
	language : (navigator.browserLanguage || navigator.language).toLowerCase()
};

var Url = {
	params : function() {
		var href = window.document.location.href;
		return href.substr(href.indexOf("?") + 1).split("&");
	},
	paramJ : function() {
		var param;
		var paramObj = {};
		var params = this.params();
		for ( var i = 0; i < params.length; i++) {
			param = params[i].split("=");
			paramObj[param[0]] = param[1];
		}
		return paramObj;
	},
	paramV : function(name) {
		var param;
		var params = this.params();
		for ( var i = 0; i < params.length; i++) {
			param = params[i].split("=");
			if (param[0].toUpperCase() == name.toUpperCase()) {
				return param[1];
			}
		}
		return "";
	}
};

function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var matchs = window.location.search.substr(1).match(reg);
	return matchs && matchs[2] ? unescape(matchs[2]) : "";
}

function wxApiConfig(config){
	$.ajax({
		url : window.location.origin+"/wfx/dc/wx/getWxSDKConfig.do",
		type : "post",
		dataType : "json",
		data : {"url" : window.location.href},
		success : function(data) {
			wx.config($.extend({},{
			      debug: false,
			      jsApiList: [
			        'checkJsApi',
			        'onMenuShareTimeline',
			        'onMenuShareAppMessage']
			},data,config||{}));
			wx.ready(config.call);
		},
		error : function(msg) {
	//		alert("系统异常");
		}
	});
}


var commonUtils ={
		aCity : {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},
		isCardID : function (sId){ 
		    var iSum=0 ;
		    if(/^\d{15}$/i.test(sId))return true;
		    if(!/^\d{17}(\d|x)$/i.test(sId)) return false; 
		    sId=sId.replace(/x$/i,"a"); 
		    if(this.aCity[parseInt(sId.substr(0,2))]==null) return false; 
		    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2)); 
		    var d=new Date(sBirthday.replace(/-/g,"/")) ;
		    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false; 
		    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		    if(iSum%11!=1) return false; 
		    return true;
		},

	    //Description:  银行卡号Luhm校验
	    //Luhm校验规则：16位银行卡号（19位通用）:
	    
	    // 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
	    // 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
	    // 3.将加法和加上校验位能被 10 整除。
		luhmCheck : function(bankno) {
			var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

			var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
			var newArr = new Array();
			for ( var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
				newArr.push(first15Num.substr(i, 1));
			}
			var arrJiShu = new Array(); //奇数位*2的积 <9
			var arrJiShu2 = new Array(); //奇数位*2的积 >9

			var arrOuShu = new Array(); //偶数位数组
			for ( var j = 0; j < newArr.length; j++) {
				if ((j + 1) % 2 == 1) {//奇数位
					if (parseInt(newArr[j]) * 2 < 9)
						arrJiShu.push(parseInt(newArr[j]) * 2);
					else
						arrJiShu2.push(parseInt(newArr[j]) * 2);
				} else
					//偶数位
					arrOuShu.push(newArr[j]);
			}

			var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
			var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
			for ( var h = 0; h < arrJiShu2.length; h++) {
				jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
				jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
			}

			var sumJiShu = 0; //奇数位*2 < 9 的数组之和
			var sumOuShu = 0; //偶数位数组之和
			var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
			var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
			var sumTotal = 0;
			for ( var m = 0; m < arrJiShu.length; m++) {
				sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
			}

			for ( var n = 0; n < arrOuShu.length; n++) {
				sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
			}

			for ( var p = 0; p < jishu_child1.length; p++) {
				sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
				sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
			}
			//计算总和
			sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu)
					+ parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

			//计算Luhm值
			var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
			var luhm = 10 - k;

			if (lastNum == luhm) {
				//Luhm验证通过");
				return true;
			} else {
				//银行卡号必须符合Luhm校验");
				return false;
			}
		}
		
};

var ResUtil = {
		hasRes : function(resNo){
			var has = false;
			doAjax("/authority/hasRes.json",
					{	data : {resNo : resNo},
						success : function(rs) {
							if(rs){has = true;}
						}
					});
			return has;
		}
};

var ZoneUtil = {
		config:function(params){		 
			if(!params)return;
			var provinceInfo = params.provinceInfo,province = provinceInfo.province;
			var cityInfo  = params.cityInfo,city = cityInfo.city;
			var areaInfo = params.areaInfo,area = areaInfo.area;	
			if(!province||!city ||!area) return;		 
			//获取省份数据
			$.ajax({
				url:_basePath+'/zone/getProvinces.json',
				cache: false,
				dataType: 'json',
				success: function(rs) {				 
					ZoneUtil.loadZone(province, rs.data,params.callback)
					/*if(params.callback && typeof params.callback=="function"){
						params.callback();
					}*/
				}
			}); 
			province.on("change",function(){ 
				 city.find("option").remove();
				 city.prepend("<option value=''>请选择</option>");
				 area.find("option").remove();
				 area.prepend("<option value=''>请选择</option>");
				 if(province.val()!=''){
					   var parentId =  province.val();
					   $.ajax({
							  type: 'POST',
							  url:_basePath+'/zone/getZoneInfos.json',	
							  data: {
									parentId: parentId
							  },
							  dataType: 'json',
							  context: $('body'),
							  success: function(rs){ 
								  if (rs.success) {
										var cityList = rs.data;
										ZoneUtil.loadZone(city, cityList,provinceInfo.callback);
										/*if(provinceInfo.callback && typeof provinceInfo.callback=="function"){
											provinceInfo.callback();
										}*/
									} else {
										 Mask.showMsg("加载数据失败");
									}
							  },
							  error: function(xhr, type){
								  Mask.showMsg("请求超时");
							  }
						 })
			      }
		    });
			//市选择
			city.on("change", function() {
				area.find("option").remove();//删除区
				if (city.val() != '') {
					var parentId = city.val();
					 $.ajax({
						  type: 'POST',
						  url:_basePath+'/zone/getZoneInfos.json',	
						  data: {
								parentId: parentId
						  },
						  dataType: 'json',
						  context: $('body'),
						  success: function(rs){ 
							  if (rs.success) {
								  	ZoneUtil.loadZone(area, rs.data,cityInfo.callback);
									/*if(cityInfo.callback && typeof cityInfo.callback=="function"){
										cityInfo.callback();
									}*/
								} else {
									 Mask.showMsg("加载数据失败");
								}
						  },
						  error: function(xhr, type){
							  Mask.showMsg("请求超时");
						  }
					 })
				}
			});
			area.on("change", function() {
				if(areaInfo.callback && typeof areaInfo.callback=="function"){
					areaInfo.callback();
				}
				
			}) 
			
		},
		loadZone:function(zone,zoneList,callback){
			zone.find("option").remove(); 
			zone.prepend("<option value=''>请选择</option>");
			for(var i in zoneList){
			    var zo   = zoneList[i];
			    zone.append("<option parentId ="+zo.parentId+" value="+zo.zoneId+">"+zo.zoneName+"</option>"); 
			}  
			
			if(callback && typeof callback=="function"){
				callback();
			}
		}
}