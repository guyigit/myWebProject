(function() {
    Pager = function(f, a, e, h, k) {
        e = "string" == typeof e ? parseInt(e) : e;
        a = "string" == typeof a ? parseInt(a) : a;
        1 >= a && (a = 1);
        this.action = h;
        this.cp = e;
        this.tp = a;
        this.initDomArr = f instanceof Array ? f: [f];
        this.param = k;
        var b = this;
        template.openTag = "<#";
        template.closeTag = "#>";
        var l = template.compile('<#var size=5, _goPage = obj.cp+1<=obj.tp?obj.cp+1:obj.tp;#><#if(obj.cp>1){#><a t="prev" href="javascript:;" class="mod-button mod-button_small mod-pagenav__item" title="\u4e0a\u4e00\u9875"><</a><#}#><#if(obj.tp>0) {#><a t="num" class="mod-button mod-button_small mod-pagenav__item<#if(obj.cp==1){#> mod-pagenav__item_current<#}#>" href="javascript:;" title="\u7b2c1\u9875" p="1">1</a><#}#><#if(obj.cp>size-1 && obj.tp>size+1) {#><span class="mod-pagenav__item">...</span><#}#><#var begin=obj.cp-size<0?2:obj.cp-size+3;var len=obj.tp-obj.cp>3?size:obj.tp-obj.cp+2;if(len<size && obj.tp>size) {begin=obj.tp-size+1;len=size;}else if(obj.tp==5) {begin=obj.tp-size+2;len=size-1;}#><#for(var i=begin; i<begin+len; i++) {#><#if(i>=obj.tp) {break;}#><a t="num" class="mod-button mod-button_small mod-pagenav__item<#if(obj.cp == i) {#> mod-pagenav__item_current<#}#>" href="javascript:;" title="\u7b2c<#=i#>\u9875" p="<#=i#>"><#=i#></a><#}#><#if(obj.tp-obj.cp>3 && obj.tp>size+2) {#><span class="mod-pagenav__item">...</span><#}#><#if(obj.tp>1) {#><a t="num" class="mod-button mod-button_small mod-pagenav__item<#if(obj.cp==obj.tp){#> mod-pagenav__item_current<#}#>" href="javascript:;" title="\u7b2c<#=obj.tp#>\u9875" p="<#=obj.tp#>"><#=obj.tp#></a><#}#><#if(obj.tp > 1 && obj.cp != obj.tp) {#><a t="next" class="mod-button mod-button_small mod-pagenav__item" href="javascript:;" title="\u4e0b\u4e00\u9875">></a><#}#><span class="mod-pagenav__white"></span><span class="ui-mr-small ui-ml-small">\u53bb\u7b2c</span><input type="text" class="mod-input mod-input_small mod-pagenav__num-input" value="<#=_goPage#>"><span class="ui-mr-small ui-ml-small">\u9875</span><a t="jump" class="mod-button mod-pagenav__jump" href="javascript:;">\u8df3\u8f6c</a>');
        this.reset = function(c, a) {
            c = "string" == typeof c ? parseInt(c) : c;
            a = "string" == typeof a ? parseInt(a) : a;
            if (!c || 1 > c) c = 1;
            var g = "";
            a && 1 < a && (b.cp = c, b.tp = a, g = l({
                obj: {
                    cp: c,
                    tp: a
                }
            }));
            for (var d = 0,
            m = b.initDomArr.length; d < m; d++) b.initDomArr[d].html(g)
        };
        this.reset(e, a); (function() {
            for (var a = 0,
            e = b.initDomArr.length; a < e; a++) b.initDomArr[a][0].onclick = function(a) {
                a = a ? a: window.event;
                a = a.target || a.srcElement;
                if ("A" == a.tagName.toUpperCase() && -1 == a.className.indexOf("ui_btn_disable")) {
                    switch (a.getAttribute("t")) {
                    case "prev":
                        b.cp--;
                        break;
                    case "num":
                        var d = parseInt(a.getAttribute("p"));
                        if (b.cp == d) return;
                        b.cp = d;
                        break;
                    case "next":
                        b.cp++;
                        break;
                    case "jump":
                        var d = a.parentNode.getElementsByTagName("INPUT")[0],
                        c = d.value / 1;
                        if (!c || c / 1 != c || 0 >= parseInt(c) || parseInt(c) > b.tp || parseInt(c) == b.cp) {
                            d.focus();
                            return
                        }
                        b.cp = parseInt(c)
                    }
                    "function" == typeof b.action && (d = parseInt(b.cp), sessionStorage && sessionStorage.setItem("cp", d), b.action(d, a, b.param))
                }
            }
        })()
    };
    Pager.prototype.getCp = function() {
        return 1
    };
    window.define && define(function(f, a) {
        a.pager = Pager
    })
})();
