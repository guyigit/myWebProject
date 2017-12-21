(function() {
    DialogBox = {
        ENUM: {
            IS_PREVIEWED_BY_ID: {
                YES: 1,
                NO: 0
            }
        }
    };
    $.extend(DialogBox, {
        pop: function(b) {
            var a = {
                target: null,
                shade: null,
                defaultHeight: null,
                noEffect: !1,
                opacity: 1
            },
            c;
            for (c in b) a[c] = b[c];
            b = $(window).height();
            c = $(window).width();
            var d = a.defaultHeight || a.target.height(),
            e = a.target.width();
            b = (b - d) / 2;
            e = (c - e) / 2;
            10 > b && (b = 10);
            10 > e && (e = 10);
            d = c = 0;
            "fixed" == a.target.css("position") ? (c = b, d = e) : (c = $(document).scrollTop(), d = $(document).scrollLeft(), c += b, d += e);
            a.shade && (b = a.shade.css("z-index"), e = a.target.css("z-index"), !b && (b = 1E3) && a.shade.css("z-index", b), !e && (e = 1E3), b = parseInt(b), e = parseInt(e), b >= e && (e = b + 1), a.target.css({
                "z-index": e
            }));
            a.shade && a.shade.show();
            a.noEffect ? a.target.show().css({
                opacity: a.opacity,
                filter: "alpha(opacity=" + 100 * a.opacity + ")",
                top: c + "px",
                left: d + "px"
            }) : a.target.css({
                opacity: "0",
                filter: "alpha(opacity=0)",
                top: c + "px",
                left: d + "px"
            }).show().animate({
                opacity: a.opacity,
                filter: "alpha(opacity=" + 100 * a.opacity + ")"
            })
        },
        popup: function(b) {
            var a = {
                box: null,
                defaultHeight: null,
                shade: "default",
                dragArea: null,
                okBtn: null,
                okFn: null,
                closeBtn: null,
                closeFn: null,
                noEffect: !1
            },
            c;
            for (c in b) a[c] = b[c];
            "default" != a.shade || $("#cover_popup_div_default")[0] ? "default" == a.shade ? a.shade = $("#cover_popup_div_default") : a.shade && "string" == typeof a.shade && ($("#dialogbox_shade_" + a.shade)[0] ? a.shade = $("#dialogbox_shade_" + a.shade) : (a.shade = $('<div id="dialogbox_shade_' + a.shade + '" class="ui-mask" style="z-index:1050;"></div>'), $(document.body).append(a.shade))) : (a.shade = $('<div id="cover_popup_div_default" class="ui-mask" style="z-index:1000;"></div>'), $(document.body).append(a.shade));
            var d = function(b) {
                if (!b || b()) a.shade && a.shade.hide(),
                a.box.hide()
            };
            b = function(a, b) {
                if (a instanceof Array) for (var c = 0,
                h = a.length; c < h; c++) a[c].unbind("click").click(function(a) {
                    d(b)
                }).mousedown(function(a) {
                    a.stopPropagation()
                });
                else a.unbind("click").click(function() {
                    d(b)
                })
            };
            a.closeBtn && b(a.closeBtn, a.closeFn);
            a.okBtn && b(a.okBtn, a.okFn);
            this.pop({
                target: a.box,
                defaultHeight: a.defaultHeight,
                shade: a.shade,
                noEffect: a.noEffect
            });
            k.init({
                targetDom: a.box[0],
                barDom: a.dragArea ? a.dragArea[0] : ""
            })
        },
        close: function(b) {
            b instanceof Array || (b = [b]);
            for (var a in b)"default" == b[a] ? $("#cover_popup_div_default").hide() : "string" == typeof b[a] ? $("#dialogbox_shade_" + b[a]).hide() : b[a].hide()
        },
        closeLoading: function(b) {
            $("#dialog_box_frame").remove();
            $("#dialogbox_shade_Loading").remove();
        },
        alert: function(b) {
            if (b.content) {
                var a = {
                    title: "",
                    okStr: "\u786e\u5b9a",
                    okFn: null,
                    content: "",
                    icon: ""
                },
                c;
                for (c in b) a[c] = b[c];
                this.box(a)
            } else this.box({
                okStr: "\u786e\u5b9a",
                content: b,
                position: "fixed",
                shadeId: "alert"
            })
        },
        alertUUID: function(b, a) {
            var c = {
                title: "",
                okStr: "\u786e\u5b9a",
                okFn: null,
                content: "",
                uuid: "",
                detail: "",
                icon: "warning"
            };
            if ("string" == typeof a && "string" == typeof b) c.content = b,
            c.uuid = a;
            else for (var d in b) c[d] = b[d];
            d = '\u9519\u8bef\u8bc6\u522b\u7801\uff1a<span style="color:#F00;font-weight:700;line-height:24px;word-wrap:break-word;break-word:break-all;">' + c.uuid + "</span><div>\u8bf7\u5c06\u8be5\u9519\u8bef\u8bc6\u522b\u7801\u53d1\u9001\u7ed9\u5de5\u4f5c\u4eba\u5458\uff0c<br/> \u4ee5\u4fbf\u6211\u4eec\u66f4\u5feb\u4e3a\u60a8\u5b9a\u4f4d\u9519\u8bef\u539f\u56e0\uff01</div>";
            c.detail && (d = c.detail);
            this.box({
                title: c.title,
                okStr: c.okStr,
                okFn: c.okFn,
                position: "fixed",
                content: c.content,
                html: '<a id="dialog_box_alert_uuid_show_detail" href="javascript:;">\u67e5\u770b\u8be6\u60c5</a><div style="font-size:14px;padding:0 10px;display:none;">' + d + "</div>",
                shadeId: "alertUUID",
                icon: c.icon
            });
            $("#dialog_box_alert_uuid_show_detail").unbind("click").click(function() {
                $(this).next().toggle()
            })
        },
        alert3000: function(b, a) {
            var c = {
                content: "",
                icon: "correct"
            };
            if ("string" == typeof b) c.content = b,
            a && (c.icon = a);
            else for (var d in b) c[d] = b[d];
            this.box({
                shadeId: "alert3000",
                content: c.content,
                icon: c.icon
            });
            var e = this;
            setTimeout(function() {
                e.close([$("#dialog_box_frame"), "alert3000"])
            },
            3E3)
        },
        alertLoading: function(b, a) {
            var c = {
                content: "系统处理中,请稍后...",
                icon: "loading"
            };
            if ("string" == typeof b) c.content = b,
            a && (c.icon = a);
            else for (var d in b) c[d] = b[d];
            this.box({
                shadeId: "Loading",
                content: c.content,
                icon: c.icon
            });
        },
        confirm: function(b, a) {
            var c = {
                title: "",
                okStr: "\u786e\u5b9a",
                okFn: null,
                closeStr: "\u53d6\u6d88",
                closeFn: null,
                content: "",
                icon: "question"
            };
            if ("string" == typeof b && "function" == typeof a) c.content = b,
            c.okFn = a;
            else for (var d in b) c[d] = b[d];
            c.shadeId = "confirm";
            c.position = "fixed";
            this.box(c)
        },
        box: function(b) {
            var a = {
                title: "",
                okStr: "",
                okFn: null,
                closeStr: "",
                closeFn: null,
                position: "absolute",
                shadeId: "",
                icon: "",
                content: "",
                width: 0,
                html: "",
                htmlComplete: null
            },
            c;
            for (c in b) a[c] = b[c];
            b = "";
            a.title && (b = '<div class="mod-dialog__hd">' + a.title + '<i id="dialog_box_close" class="mod-dialog__x"></i></div>');
            var d = "";
            a.okStr && (d = '<a id="dialog_box_ok" href="javascript:;" class="mod-button mod-button_primary ui-mr-large">' + a.okStr + "</a>");
            var e = "";
            a.closeStr && (e = '<a id="dialog_box_cancel" href="javascript:;" class="mod-button">' + a.closeStr + "</a>");
            var f = "";
            if (a.okStr || a.closeStr) f = '<div class="mod-dialog__footer">' + d + e + "</div>";
            d = "";
            if (a.icon) d = '<div class="mod-dialog__bd mod-dialog__bd_icon"><div class="lay-bfc"><div class="lay-bfc__left"><i class="mod-dialog__icon mod-dialog__icon_' + {
                warning: "attention",
                question: "warn",
                correct: "confirm",
                loading:"loading"
            } [a.icon] + '"></i></div><div id="dialog_box_content" class="lay-bfc__content ui-ta-l mod-dialog__bd-single-text">' + a.content + "</div></div></div>";
            else if ("object" == typeof a.content) {
                d = "";
                for (c in a.content) d += '<tr><td class="ui-ta-r">' + c + "\uff1a</td><td>" + a.content[c] + "</td></tr>";
                d = '<div class="mod-dialog__bd"><table style="margin:0 auto;"><colgroup><col style="width:100px;"><col></colgroup><tbody>' + d + "</tbody></table></div>"
            } else f || b ? (c = "", !a.content && (c = 'style="padding:10px 0;"'), d = '<div class="mod-dialog__bd mod-dialog__bd_text" ' + c + ">" + a.content + "</div>") : (c = "", !a.content && (c = 'style="padding:10px 0;"'), d = '<div class="mod-dialog__bd" ' + c + ">" + a.content + "</div>");
            c = "";
            a.html && (c = '<div class="mod-dialog__bd_icon" style="padding:0 0 20px 0;">' + a.html + "</div>");
            e = $("#dialog_box_frame");
            b = b + d + c + f;
            "absolute" != a.position && "fixed" != a.position && (a.position = "absolute");
            e[0] ? e.css({
                position: a.position,
                width: a.width ? a.width: 360
            }).html(b) : (b = '<div id="dialog_box_frame" class="mod-dialog" style="position:' + a.position + ";width:" + (a.width ? a.width: 360) + 'px;z-index:10001;display:none;">' + b + "</div>", $(document.body).append(b));
            c && a.htmlComplete && a.htmlComplete();
            this.popup({
                box: $("#dialog_box_frame"),
                okBtn: $("#dialog_box_ok"),
                shade: a.shadeId ? a.shadeId: "default",
                okFn: function() {
                    var b = !0;
                    a.okFn && (b = a.okFn());
                    return "boolean" == typeof b ? b: !0
                },
                closeBtn: [$("#dialog_box_close"), $("#dialog_box_cancel")],
                closeFn: a.closeFn
            });
            b = $("#dialog_box_content");
            b[0] && 80 < b.height() && (b[0].className = "lay-bfc__content ui-ta-l")
        },
        tips: function(b, a) {
            var c = {
                target: null,
                content: "",
                dir: "up",
                autoDisappear: !0
            };
            if ("string" == typeof b) c.content = b,
            c.dir = "middle";
            else if ("string" == typeof a) c.target = b,
            c.content = a;
            else for (var d in b) c[d] = b[d];
            d = {
                up: "ui-tip_up",
                down: "ui-tip_down",
                middle: ""
            };
            var e = $("#dialog_box_tips");
            e[0] ? e.prop("class", "ui-tip " + d[c.dir]) : ($(document.head).append('<style type="text/css">.ui-tip{width:200px;position:absolute;top:70px;left:20px;background-color:#ffe690;border:1px solid #e7b75b;border-radius:3px;padding:10px 15px;font-weight:700;color:#b46e00}.ui-tip_normal{position:relative;width:auto;top:auto;left:auto}.ui-tip_up:before,.ui-tip_up:after,.ui-tip_down:before,.ui-tip_down:after{border-width:9px;content:"";position:absolute;left:50%;margin-left:-10px;width:0;height:0;overflow:hidden;font-size:0;display:inline-block}.ui-tip_up:before,.ui-tip_up:after{top:-18px;border-color:transparent transparent #ffe690;border-style:dashed dashed solid}.ui-tip_up:before{border-color:transparent transparent #e7b75b;top:-19px}.ui-tip_down:before,.ui-tip_down:after{bottom:-18px;border-color:#ffe690 transparent transparent;border-style:solid dashed dashed}.ui-tip_down:before{bottom:-19px;border-color:#e7b75b transparent transparent}.</style>'), e = $('<div id="dialog_box_tips" class="ui-tip ' + d[c.dir] + '" style="z-index:10500;break-word:break-all;word-wrap:break-word;"></div>'), $(document.body).append(e));
            e.text(c.content).show();
            if (c.target) {
                d = c.target.offset();
                var f = 0,
                g = $(document).scrollLeft() + d.left,
                g = g + (c.target.width() / 2 - e.width() / 2 - 16);
                "up" == c.dir ? f = $(document).scrollTop() + c.target[0].getBoundingClientRect().bottom + 10 : "down" == c.dir && (f = d.top - e[0].offsetHeight - 10);
                clearTimeout(this.tipsClearTimeout);
                e.css({
                    top: f + "px",
                    left: g + "px"
                }).animate({
                    opacity: "0.9",
                    filter: "alpha(opacity=80)"
                })
            } else this.pop({
                target: e,
                opacity: .8
            });
            c.target && c.target.focus();
            c.autoDisappear && (this.tipsClearTimeout = setTimeout(function() {
                e.animate({
                    opacity: "0",
                    filter: "alpha(opacity=0)"
                },
                {
                    complete: function() {
                        $(this).hide()
                    }
                })
            },
            3E3))
        },
        preview: function(b) {
            var a = {
                previewUrl: "",
                codeUrl: "",
                clickable: !1,
                downloadFn: null
            },
            c;
            for (c in b) a[c] = b[c];
            b = "";
            c = a.codeUrl || a.previewUrl; ! a.clickable && (b = '<div style="width:308px;height:468px;position:absolute;z-index:10;top:0;left:0;"></div>');
            var d = _basePath+"/modulepage/qrcode.do?size=300&content=" + encodeURIComponent(c);
            $("#dialog_box_preview")[0] ? ($("#dialog_box_preview_iframe").prop("src", a.previewUrl), $("#dialog_box_preview_qrcode").prop("src", d)) : (b = '<div id="dialog_box_preview" class="mod-dialog" style="position:absolute;width:840px;display:none;">\t\t\t\t    <div id="dialog_box_preview_title" class="mod-dialog__hd">\u9884\u89c8<i id="dialog_box_preview_close" class="mod-dialog__x"></i></div>\t\t\t\t    <div class="mod-dialog__bd">\t\t\t\t        <div class="ui-clearfix">\t\t\t\t            <div class="mod-weixin-frame ui-fl-l ui-ml-large">\t\t\t\t                <div class="mod-weixin-frame__head"></div>\t\t\t\t                <div class="mod-weixin-frame__main" style="position:relative;">\t\t\t\t                    <iframe id="dialog_box_preview_iframe" src="' + a.previewUrl + '" frameborder="0" style="width:100%;height:480px;"></iframe>' + b + '\t\t\t\t                </div>\t\t\t\t            </div>\t\t\t\t            <div class="mod-qrcode-preview ui-fl-r ui-mr-large">\t\t\t\t                <div class="mod-qrcode-preview__title ui-mt-medium">\u626b\u63cf\u4e8c\u7ef4\u7801\u9884\u89c8</div>\t\t\t\t                <div class="mod-qrcode-preview__img" style="height:320px;padding:7px 0;margin-bottom:0;">\t\t\t\t                    <img id="dialog_box_preview_qrcode" src="' + d + '" alt="" width="300" height="300"/>\t\t\t\t                </div>\t\t\t\t                <div style="margin-bottom:30px;text-align:center;"><a id="dialog_box_preview_copy_url" href="javascript:;" data-clipboard-text="' + c + '" title="' + c + '">\u590d\u5236\u94fe\u63a5</a></div>\t\t\t\t                <div id="dialog_box_preview_download_wrapper" class="ui-ta-c ui-mt-large" style="display:none;">\t\t\t\t                    <a id="dialog_box_preview_download" href="javascript:;" class="mod-button mod-button_primary">\u5bfc\u51fa\u4e8c\u7ef4\u7801</a>\t\t\t\t                </div>\t\t\t\t            </div>\t\t\t\t        </div>\t\t\t\t    </div>\t\t\t\t</div>', $(document.body).append(b));
            "function" == typeof a.downloadFn && $("#dialog_box_preview_download").unbind("click").click(function() {
                a.downloadFn()
            }).parent().show();
            this.popup({
                box: $("#dialog_box_preview"),
                dragArea: $("#dialog_box_preview_title"),
                closeBtn: $("#dialog_box_preview_close")
            });
            if (window.ZeroClipboard) {
                var e = this,
                f = function(a) { (new ZeroClipboard(a, {
                        moviePath: _basePath+"/resources/widget/jquery.zclip/ZeroClipboard.swf"
                    })).on("complete",
                    function(a, b) {
                        b.text ? e.tips($(this), "\u9875\u9762\u5730\u5740\u5df2\u7ecf\u590d\u5236\u5230\u526a\u5207\u677f: " + b.text) : e.tips($(this), "\u8981\u590d\u5236\u7684\u5185\u5bb9\u4e0d\u5b58\u5728")
                    })
                }; (function() {
                    $("#dialog_box_preview_copy_url").each(function() {
                        f(this)
                    })
                })()
            } else {
                var e = this;
                Utils.loadJsFile(_basePath+"/resources/widget/jquery.zclip/ZeroClipboard.min.js", "utf-8",
                function() {
                    var a = function(a) { (new ZeroClipboard(a, {
                            moviePath: _basePath+"/resources/widget/jquery.zclip/ZeroClipboard.swf"
                        })).on("complete",
                        function(a, b) {
                            b.text ? e.tips($(this), "\u9875\u9762\u5730\u5740\u5df2\u7ecf\u590d\u5236\u5230\u526a\u5207\u677f: " + b.text) : e.tips($(this), "\u8981\u590d\u5236\u7684\u5185\u5bb9\u4e0d\u5b58\u5728")
                        })
                    }; (function() {
                        $("#dialog_box_preview_copy_url").each(function() {
                            a(this)
                        })
                    })()
                })
            }
        }
    });
    var k = {};
    $.extend(k, {
        init: function(b) {
            var a = {
                barDom: "",
                targetDom: ""
            },
            c;
            for (c in b) a[c] = b[c];
            if (a.barDom) {
                var d = arguments.callee,
                e = this;
                d.option ? "": d.option = {};
                a.barDom.style.cursor = "move";
                a.targetDom.style.position = "absolute";
                a.barDom.onmousedown = function(b) {
                    b = window.event || b;
                    d.option.barDom = this;
                    d.option.targetDom = a.targetDom;
                    var c = [parseInt(a.targetDom.style.left) ? parseInt(a.targetDom.style.left) : 0, parseInt(a.targetDom.style.top) ? parseInt(a.targetDom.style.top) : 0];
                    d.option.diffPostion = [e.getMousePosition({
                        evt: b
                    })[0] - c[0], e.getMousePosition({
                        evt: b
                    })[1] - c[1]];
                    document.onselectstart = function() {
                        return ! 1
                    };
                    window.onblur = window.onfocus = function() {
                        document.onmouseup()
                    };
                    return ! 1
                };
                a.targetDom.onmouseup = document.onmouseup = function() {
                    d.option.barDom && (d.option = {},
                    document.onselectstart = window.onblur = window.onfocus = null)
                };
                a.targetDom.onmousemove = document.onmousemove = function(a) {
                    try {
                        a = window.event || a,
                        d.option.barDom && d.option.targetDom && (d.option.targetDom.style.left = e.getMousePosition({
                            evt: a
                        })[0] - d.option.diffPostion[0] + "px", d.option.targetDom.style.top = e.getMousePosition({
                            evt: a
                        })[1] - d.option.diffPostion[1] + "px")
                    } catch(b) {}
                }
            }
        },
        getMousePosition: function(b) {
            b = window.event ? window.event: b;
            b.evt && (b = b.evt);
            var a = [];
            "undefined" != typeof b.pageX ? a = [b.pageX, b.pageY] : "undefined" != typeof b.clientX && (a = [b.clientX + this.getScrollPosition()[0], b.clientY + this.getScrollPosition()[1]]);
            return a
        },
        getScrollPosition: function() {
            var b = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset,
            a = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            return [b ? b: 0, a ? a: 0]
        }
    });
    window.define && define(function(b, a) {
        a.dialogBox = DialogBox
    })
})();
/*  |xGv00|667d30232887f7161668693305d262c5 */
