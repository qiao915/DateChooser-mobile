;(function() {
    $.fn.timeSelect = function(prams, opt) {
        function cPlugin(o, emlnum) {
            var sjObj = o;
            sjObj.defaults = {
                Format: "yyyy-mm-dd", //显示日期格式//yyyy表示年份 ，mm月份 ，dd天数
                timeFormat: "h:m:s", //显示时间格式//h小时，m分 s秒
                width: 60, //
                height: 32,
                Year: prams.Year, //是否显示年//
                Month: prams.Month, //是否显示月//
                Day: prams.Day, //是否显示日//
                Hour: prams.Hour, //是否显示小时//
                Minute: prams.Minute, //是否显示分钟//
                Seconds: prams.Seconds, //是否显示秒//
                yyyy: prams.yyyy, //当前显示年
                mm: prams.mm, //当前显示月
                dd: prams.dd, //当前显示日
                h: prams.h, //当前显示小时
                m: prams.m, //当前显示分
                s: prams.s, //当前显示秒
                yyArr: [], //年份数组
                mmArr: [], //月份数组
                ddArr: [], //天数数组
                hArr: [], //小时数组
                mArr: [], //分钟数组
                sArr: [], //分钟数组
                val: null, //最终显示时间
                yearText: "年", //顶部时间 年单位 文字
                monthText: "月", //顶部时间 月单位 文字
                dayText: '日', //顶部时间 日单位 文字
                hourText: '时', //顶部时间 时单位 文字
                minuteText: '分', //顶部时间 分单位 文字
                secondsText: '秒', //顶部时间 秒单位 文字
                okText: "确认", //按钮确认键文字
                cancelText: "取消", //按钮取消键文字
                title: prams.title,
                thisElm: null, //当前控制的dom
                showNowTime: false, //是否默认显示当前时间
                alwaysShow: false, //是否默认直接显示插件
                timeElm: null, //放时间插件的box
                isparseInt: false, //单独显示一个时间是否为正整数
                finalshow: true,
                boxClassName: "",
                onfun: function(sjObj,parse) { //取消改变时间时候执行事件

                },
                okfun: function(sjObj) { //确认时间时候执行事件

                },
                t_box: null, //保存生产元素盒子
                df_persp: function() {
                    console.log("%c开发者邮箱  %cqiao_915@yeah.net%c  欢迎技术交流探讨","text-shadow:none"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3em","text-shadow:none");
                    return $("<div class='df-persp'><div class='persp-bg'></div>");
                },
                df_box: function() {return $("</div><div class='df-box " + (sjObj.opt.alwaysShow ? "alwaysShow" : "") + " " + sjObj.opt.boxClassName + "' style='line-height:" + sjObj.opt.height + "px;'></div>");},
                df_main: function() {return $("<div class='df-main'>");},
                df_btn: function() {
                	if(sjObj.opt.alwaysShow) return;
                    return $("<div class='df-btn' style='height:" + sjObj.opt.height + "px'><div class='df-no'>" + sjObj.opt.cancelText + "</div><div class='df-tip'>" + sjObj.opt.title + "</div><div class='df-ok'>" + sjObj.opt.okText + "</div></div>");
                },
                df_wrap: function() {return $("<div class='df-wrap'><table><tbody><tr></tr></tbody></table></div>");},
                df_final: function() {return $("<div class='df-final'></div>");},
                getArr: function() {
                    //按时间生成分钟，小时，月天数，月份
                    for(var i = 0; i < 61; i++) {
                        if(i < 12) this.mmArr[i] = (i + 1);
                        if(i < 31) this.ddArr[i] = (i + 1);
                        if(i < 24) this.hArr[i] = i;
                        if(i < 60) {
                            this.mArr[i] = i;
                            this.sArr[i] = i;
                        }
                        if(i < 61 && !sjObj.opt.Year && !sjObj.opt.Month && !sjObj.opt.Day && !sjObj.opt.Hour) this.mArr[i] = i;
                    }
                },
                y: 10,
                nowTime: new Date(),
                startYear: prams.startYear || null, //自定义开始年份
                endYear: prams.endYear || null, //自定义结束年份
                ampmText: null, //上午下午
                //结构字符串生成
                dataNum: 0,
                strStart: function(text, c) {
                    var df = this;
                    var str;
                    var text = text || "";
                    if(df.width) {
                        str = '<div class="df-class">' + text + '</div><div class="df-item " style="height:' + (df.height * 5 - 1) + 'px;"><ul class="df-ul" data-class=' + c + '>';
                    } else {
                        str = '<div class="df-class">' + text + '</div><div class="df-item " style="height:' + (df.height * 5 - 1) + 'px"><ul class="df-ul" data-class=' + c + '>';
                    }
                    sjObj.opt.dataNum++;
                    return str;
                },
                //拼接字符串结尾
                strEnd: function() {
                    var df = this;
                    return "</ul><div class='G-bg'><div class='G-top' style='height:" + (df.height * 2) + "px'></div><div class='G-mid' style='height:" + df.height + "px'></div><div class='G-btm' style='height:" + (df.height * 2) + "px'></div></div></div>"
                },
                //数字小于10 就在字前面+一个0
                fillZero: function(x) {
                    if(x < 10) {
                        return x = "0" + x;
                    } else {
                        return "" + x;
                    }
                },
                //获取年份
                getYear: function() {
                    if(!this.startYear) {
                        var y = sjObj.opt.y || 10;
                        var nowTime = new Date();
                        for(var x = this.y, i = 0; x != 0; y > 0 ? x-- : x++, i++) {
                            if(y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x + 1;
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i;
                            }
                        }
                        sjObj.opt.getArr();
                    } else {
                        if(sjObj.opt.yyArr.length > 1) {
                            return;
                        }
                        var endYear = this.endYear || parseInt(sjObj.opt.y) + parseInt(this.startYear);
                        var y = -(endYear - parseInt(this.startYear));
                        var nowTime = new Date(endYear + "/01/01");
                        for(var x = y, i = 0; y > 0 ? x != 0 : x < 1; y > 0 ? x-- : x++, i++) {
                            if(y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x;
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i;
                            }
                        }
                        sjObj.opt.getArr();
                    }
                },
                //核心内容居中
                setCenter: function() {
                    var wid = $(window).width();
                    var tabWid = null;
                    var mWid = 0;
                    $(".df-wrap table").each(function() {
                        tabWid += parseFloat($(this).width());
                    })
                    if(tabWid > wid) {
                        $(".df-wrap table").each(function() {
                            mWid = parseFloat($(this).width()) > mWid ? parseFloat($(this).width()) : mWid;
                        })
                        $('.df-box').width(mWid);
                    } else {
                        $('.df-box').width(tabWid + 10);
                    }
                },
                //返回数组组成的html字符串
                buildArrStr: function(Arr, txt, c, f) {
                    var str = this.strStart(txt, c);
                    $.each(Arr, function() {
                        str += '<li class="df-li df-show"  data-val=' + sjObj.opt.fillZero(this) + ' style="line-height:' + sjObj.opt.height + 'px;height:' + sjObj.opt.height + 'px">' + (sjObj.opt.fillZero(this) + f) + '</li>'
                    })
                    str += sjObj.opt.strEnd();
                    return str;
                },
                //创建html
                buildHTml: function() {
                    var wrap = sjObj.opt.df_wrap();
                    sjObj.opt.t_box = sjObj.opt.df_box();
                    var main = sjObj.opt.df_main();
                    sjObj.opt.df_persp();
                    if(sjObj.opt.alwaysShow) {
                        sjObj.opt.timeElm = eval(sjObj.opt.timeElm);
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(main.append(wrap)));
                    } else {
                        sjObj.opt.timeElm = $("<div class='df-persp'><div class='persp-bg'></div>");
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(sjObj.opt.finalshow ? sjObj.opt.df_final : "").append(sjObj.opt.df_btn).append(main.append(wrap)));
                        $('body').append(sjObj.opt.timeElm);
                    }
                    if(sjObj.opt.ampmText) {
                        main.append("<div class='df-wrap'><table><tbody><tr><td>" + sjObj.opt.buildAmPmStr() + "</tr></tbody></table></div>");
                    }
                        if(sjObj.opt.Year) $(sjObj.opt.timeElm.find('.df-wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy", "年") + "</td>");
                        if(sjObj.opt.Month) {
                            var eml = sjObj.opt.df_wrap();
                            $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm", "月") + "</td>");
                            main.append(eml);
                        }
                        if(sjObj.opt.Day) {
                            var eml = sjObj.opt.df_wrap();
                            $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd", "日") + "</td>");
                            main.append(eml);
                        }
                    if(sjObj.opt.Hour) {
                        var eml = sjObj.opt.df_wrap();
                        $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.hArr, sjObj.opt.hourText, "h", "时") + "</td>");
                        main.append(eml);
                    };
                    if(sjObj.opt.Minute) {
                        var eml = sjObj.opt.df_wrap();
                        $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mArr, sjObj.opt.minuteText, "m", "分") + "</td>");
                        main.append(eml);
                    };
                    if(sjObj.opt.Seconds) {
                        var eml = sjObj.opt.df_wrap();
                        $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.sArr, sjObj.opt.secondsText, "s", "秒") + "</td>");
                        main.append(eml);
                    }

                    //默认显示时间设置
                    if(sjObj.opt.showNowTime) {
                        if(emlnum) {
                            var val = sjObj.value,
                                sjeml = sjObj;
                        } else {
                            var val = sjObj[0].value,
                                sjeml = sjObj[0];
                        }
                        if(val) {
                            if(val.indexOf("/") != -1) {
                                val = val.replace(/\//g, "-");
                            }
                            if(val.indexOf(" ") != -1) {
                                var valarr = val.split(" ");
                            } else {
                                var valarr = [val];
                            }
                            var nyr, sfm;
                            var str = "";
                            if(valarr.length == 2) {
                                nyr = valarr[0];
                                sfm = valarr[1];
                                str += getnyrstr(nyr) + " " + getsfmstr(sfm);
                            } else if(valarr.length == 1 && (valarr.indexOf("-") != -1 || valarr.indexOf("/") != -1)) {
                                str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                            } else {
                                if(sjObj.opt.Year || sjObj.opt.Month || sjObj.opt.Day) {
                                    str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                } else {
                                    str += getnyrstr("") + " " + getsfmstr(valarr[0])
                                }
                            }
                            data = new Date(str.replace(/-/g, "/"));
                        } else {
                            var data = new Date();
                        }
                        var year = data.getFullYear();
                        var month = data.getMonth() + 1;
                        var day = data.getDate();
                        var hours = data.getHours();
                        var Minutes = data.getMinutes();
                        var Seconds = data.getSeconds();
                        sjObj.opt.yyyy = fillZero(year);
                        sjObj.opt.mm = fillZero(month);
                        sjObj.opt.dd = fillZero(day);
                        sjObj.opt.h = fillZero(hours);
                        sjObj.opt.m = fillZero(Minutes);
                        sjObj.opt.s = fillZero(Seconds);

                        if(sjObj.opt.Year) sjObj.opt.timeElm.find("[data-class='yyyy'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(year)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Month) sjObj.opt.timeElm.find("[data-class='mm'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(month)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Day) sjObj.opt.timeElm.find("[data-class='dd'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(day)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Hour) sjObj.opt.timeElm.find("[data-class='h'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(hours)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Minute) sjObj.opt.timeElm.find("[data-class='m'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(Minutes)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Seconds) sjObj.opt.timeElm.find("[data-class='s'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(Seconds)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                    } else {
                        if(sjObj.opt.Year) sjObj.opt.timeElm.find("[data-class='yyyy'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.yyyy)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Month) sjObj.opt.timeElm.find("[data-class='mm'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.mm)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Day) sjObj.opt.timeElm.find("[data-class='dd'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.dd)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Hour) sjObj.opt.timeElm.find("[data-class='h'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.h)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Minute) sjObj.opt.timeElm.find("[data-class='m'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.m)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        if(sjObj.opt.Seconds) sjObj.opt.timeElm.find("[data-class='s'] .df-li").each(function() {
                            if(parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.s)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                    }
                    sjObj.opt.fillData();
                    sjObj.opt.setCenter();
                    sjObj.opt.bindFun();
                },
                //绑定事件
                bindFun: function() {
                    //关闭事件
                    sjObj.opt.timeElm.find(".df-no").on("click", function() {
                        $(this).parent().parent().parent().remove();
                        sjObj.opt.onfun(sjObj);
                        $("html").removeClass("ov_hi");
                    })
                    sjObj.opt.timeElm.find(".df-ok").on("click", function() {
                        sjObj.opt.val = sjObj.opt.isparseInt ? parseInt(sjObj.opt.datePss()) : sjObj.opt.datePss();
                        $(sjObj.opt.thisElm).val(sjObj.opt.val);
                        $(this).parent().parent().parent().remove();
                        sjObj.opt.okfun(sjObj.opt.datePss(), Date.parse(sjObj.opt.datePss()));
                        $("html").removeClass("ov_hi");
                    })
                    //滚动事件
                    sjObj.opt.moveElm(sjObj.opt.timeElm.find(".G-bg"))
                },
                //将时间放入dom中
                fillData: function() {
                    if(!sjObj.opt.alwaysShow) {
                        if(sjObj.opt.isparseInt) {
                            sjObj.opt.timeElm.find(".df-final").html(parseInt(sjObj.opt.datePss()));
                        } else {
                            sjObj.opt.timeElm.find(".df-final").html(sjObj.opt.datePss());
                        }
                    } else {
                        $(sjObj.opt.thisElm).html(sjObj.opt.datePss()).val(sjObj.opt.datePss());
                    }
                },
				datePss:function(){
                    var str = "";
                    if(sjObj.opt.Year) str += sjObj.opt.yyyy + '-';
                    if(sjObj.opt.Month) str += sjObj.opt.mm + '-';
                    if(sjObj.opt.Day) str += sjObj.opt.dd + " ";
                    if(sjObj.opt.Hour) str += sjObj.opt.h + ":";
                    if(sjObj.opt.Minute) str += sjObj.opt.m + ":";
                    if(sjObj.opt.Seconds) str += sjObj.opt.s;
                    return str
				},
                //变量赋值监听
                vardata: function(name, val) {
                    if(!val) {
                        return;
                    }
                    if(sjObj.opt[name] != val) {
                        sjObj.opt[name] = val;
                        sjObj.opt.fillData();
                    }
                },
                //获取当前日期
                getFinal: function() {
                    var currentY = 0;
                    var str = "";
                    if(sjObj.opt.showNowTime) {
                        sjObj.opt.timeElm.find(".df-ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                                currentY = getTranslateY(this);
                                var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                dataClass = $(this).attr("data-class");
                                sjObj.opt.vardata(dataClass, val);
                                sjObj.opt.daysJudge(dataClass);
                            })
                        })
                    } else {
                        sjObj.opt.timeElm.find(".df-ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd", function() {
                                currentY = getTranslateY(this);
                                var val = $($(this).find(".df-li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                dataClass = $(this).attr("data-class");
                                sjObj.opt.vardata(dataClass, val);
                                sjObj.opt.daysJudge(dataClass);
                            })
                        })
                    }
                },
                //根据时间判断当月天数
                daysJudge: function(name) {
                    if(name == 'mm' || name == "yyyy") { //在选择年份获取天数时
                        var day = new Date(sjObj.opt.yyyy, sjObj.opt.mm, 0).getDate();
                        var l = sjObj.opt.timeElm.find('[data-class="dd"]').find(".df-show").length
                        var mubiao = day - l;
                        if(mubiao > 0) {
                            for(var i = 0; i < mubiao; i++) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".df-li")[l + i]).removeClass("df-hide").addClass("df-show")
                            }
                        } else {
                            var naomovey = getTranslateY(sjObj.opt.timeElm.find('[data-class="dd"]'))
                            for(var i = 0; i > mubiao; i--) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".df-li")[l - 1 + i]).removeClass("df-show").addClass("df-hide")
                            }
                            if(naomovey > (day - 1 - 2) * sjObj.opt.height) {
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transition": "all .5s"
                                })
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transform": "translate(0," + -(day - 1 - 2) * sjObj.opt.height + "px)"
                                })
                            }
                        }
                    };
                },
                //滚动事件绑定
                moveElm: function(eml) {
                    return $(eml).each(function() {
                        //移动事件变量
                        var sX = null,
                            sY = null,
                            mX = null,
                            mY = null,
                            eX = null,
                            eY = null,
                            sTime = null,
                            eTime = null,
                            mTime = null,
                            nTime = null, //开始时间，结束时间，移动时的时间，开始到现在花费的时间
                            nY = 0,
                            drt = null,
                            nowElm = null, //现在的Y位置。方向，当前元素
                            canStart = true,
                            canMove = false,
                            canEnd = false, //移动事件条件。。
                            emlLang = null, //子元素长度
                            maxY = null,
                            minY = null, //最大距离和最小距离
                            lastY = null,
                            nowY = null,
                            moveY = null,
                            stopInertiaMove = false, //是否停止惯性滚
                            SE = null,
                            ME = null,
                            EE = null,
                            moveCy = 0;
                        var stop = function(e) {
                            //Opera/Chrome/FF
                            if(e.preventDefault)
                                e.preventDefault();
                            //IE
                            e.returnValue = false;
                        }
                        //移动事件开始
                        var moveStart = function(e) {
                            stop(e);
                            if(!canStart) {
                                return
                            }
                            if(e.originalEvent.touches) {
                                SE = e.originalEvent.targetTouches[0]
                            } else {
                                SE = e;
                            }
                            sX = SE.pageX;
                            sY = SE.pageY;
                            nowElm = $(this).prev(".df-ul");
                            emlLang = nowElm.find(".df-show").length;
                            lastY = sY;
                            nY = getTranslateY(nowElm);
                            sTime = new Date().getTime();
                            if(!canMove && canEnd) {
                                return false
                            }
                            canStart = false
                            canMove = false;
                            stopInertiaMove = true;
                            $(window).on("touchmove", function(e) {
                                if(stopInertiaMove) {
                                    e.preventDefault();
                                }
                            })

                        };
                        var moveing = function(e) {
                            stop(e);
                            if(e.originalEvent.touches) {
                                ME = e.originalEvent.targetTouches[0]
                            } else {
                                ME = e;
                            }
                            mTime = new Date().getTime();
                            mX = ME.pageX;
                            mY = ME.pageY;
                            drt = GetSlideDirection(sX, sY, mX, mY);
                            if((drt == 1 || drt == 2) && !canStart) {
                                canMove = true;
                                canEnd = true;
                                stopInertiaMove = true;
                            }
                            if(canMove) {
                                nowElm.css({
                                    "transition": "none"
                                })
                                nowElm.css({
                                    "transform": "translate(0," + -(nY - (mY - sY)) + "px)"
                                })
                                sjObj.opt.getFinal(); //获取当前值
                            }
                            if(mTime - sTime > 300) {
                                sTime = mTime;
                                lastY = mY;
                            }
                        };

                        var moveEnd = function(e) {
                            stop(e);
                            if(e.originalEvent.touches) {
                                EE = e.originalEvent.changedTouches[0]
                            } else {
                                EE = e;
                            }
                            //alert("松开鼠标")
                            eX = EE.pageX;
                            eY = EE.pageY;
                            maxY = sjObj.opt.height * 2;
                            minY = -(emlLang - 3) * sjObj.opt.height;
                            if(canEnd) {
                                canMove = false;
                                canEnd = false;
                                canStart = true;
                                nY = -(nY - (mY - sY));
                                nowY = eY;
                                if(nY > maxY) {
                                    nowElm.css({
                                        "transition": "all .5s"
                                    })
                                    nowElm.css({
                                        "transform": "translate(0," + maxY + "px)"
                                    })
                                } else if(nY < minY) {
                                    nowElm.css({
                                        "transition": "all .5s"
                                    })
                                    nowElm.css({
                                        "transform": "translate(0," + minY + "px)"
                                    })
                                } else {
                                    eTime = new Date().getTime();
                                    var speed = ((nowY - lastY) / (eTime - sTime));
                                    stopInertiaMove = false;
                                    //惯性滚动函数
                                    (function(v, startTime, contentY) {
                                        var dir = v > 0 ? -1 : 1;
                                        //加速度方向
                                        var deceleration = dir * 0.001; //0.001 为减速时间
                                        function inertiaMove() {
                                            if(stopInertiaMove)
                                                return;
                                            var nowTime = new Date().getTime();
                                            var t = nowTime - startTime;
                                            var nowV = v + t * deceleration;
                                            var moveY = (v + nowV) / 2 * t;
                                            if(dir * nowV > 0) { //大于0是减速停止
                                                if(moveCy > sjObj.opt.maxY) {
                                                    nowElm.css({
                                                        "transition": "all .5s"
                                                    })
                                                    sjObj.opt.nowElm.css({
                                                        "transform": "translate(0," + sjObj.opt.maxY + "px)"
                                                    })
                                                } else if(moveCy < sjObj.opt.minY) {
                                                    nowElm.css({
                                                        "transition": "all .5s"
                                                    })
                                                    nowElm.css({
                                                        "transform": "translate(0," + sjObj.opt.minY + "px)"
                                                    })
                                                } else {
                                                    var MC = Math.round(moveCy / sjObj.opt.height);
                                                    if(MC > 2) {
                                                        MC = 2
                                                    } else if(MC < -(emlLang - 1) + 2) {
                                                        MC = -(emlLang - 1) + 2
                                                    }
                                                    nowElm.css({
                                                        "transition": "all .4s"
                                                    });
                                                    nowElm.css({
                                                        "transform": "translate(0," + sjObj.opt.height * MC + "px)"
                                                    })
                                                }
                                                sjObj.opt.getFinal();
                                                return
                                            }
                                            moveCy = (contentY + moveY)
                                            if(moveCy > (maxY + (sjObj.opt.height * 2))) {
                                                nowElm.css({
                                                    "transition": "all .5s"
                                                })
                                                nowElm.css({
                                                    "transform": "translate(0," + maxY + "px)"
                                                })
                                                return
                                            } else if(moveCy < (minY - (sjObj.opt.height * 2))) {
                                                nowElm.css({
                                                    "transition": "all .5s"
                                                })
                                                nowElm.css({
                                                    "transform": "translate(0," + minY + "px)"
                                                })
                                                return
                                            }
                                            nowElm.css({
                                                "transform": "translate(0," + moveCy + "px)"
                                            })
                                            sjObj.opt.getFinal();
                                            var timers = setTimeout(inertiaMove, 10);
                                        }
                                        inertiaMove();
                                    })(speed, eTime, nY);
                                }
                            }
                        }
                        $(this).unbind("touchstart mousedown").on("touchstart mousedown", moveStart) //触摸起始//鼠标按下
                        $(this).unbind("touchmove").on("touchmove", moveing) //触摸移动
                        $(this).unbind("touchend").on("touchend", moveEnd) //触摸结束
                        $(document).on("mousemove", moveing) //鼠标按下后移动中
                        $(document).on("mouseup", moveEnd) //鼠标松开
                    })
                },
            };
            sjObj.opt = $.extend({}, sjObj.defaults, opt);
            var GetSlideAngle = function(dx, dy) { //判断角度
                return Math.atan2(dy, dx) * 180 / Math.PI;
            };

            function getnyrstr(str) {
                var r = "yyyy-mm-dd"
                var valarr = str.split("-");
                // if(valarr.length == 3) {
                    r = r.replace("yyyy", valarr[0]);
                    r = r.replace("mm", valarr[1]);
                    r = r.replace("dd", valarr[2]);
                /*} else if(valarr.length == 2) {
                    if(sjObj.opt.Year && !sjObj.opt.Month) {
                        r = r.replace("yyyy", valarr[0]);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", valarr[1]);
                    } else if(sjObj.opt.Year && !sjObj.opt.Day) {
                        r = r.replace("yyyy", valarr[0]);
                        r = r.replace("mm", valarr[1]);
                        r = r.replace("dd", sjObj.opt.dd);
                    } else if(!sjObj.opt.Year) {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", valarr[0]);
                        r = r.replace("dd", valarr[1]);
                    }

                } else if(valarr.length == 1) {
                    if(sjObj.opt.Year) {
                        r = r.replace("yyyy", valarr[0]);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", sjObj.opt.dd);
                    } else if(sjObj.opt.Month) {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", valarr[0]);
                        r = r.replace("dd", sjObj.opt.dd);
                    } else if(sjObj.opt.Day) {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", valarr[0]);
                    } else {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", sjObj.opt.dd);
                    }
                };*/
                return r;
            }
            function getsfmstr(str) {
                var r = sjObj.opt.timeFormat; //yyyy-mm-dd;
                var valarr = str.split(":");
                if(valarr.length == 3) {
                    r = r.replace("h", valarr[0]);
                    r = r.replace("m", valarr[1]);
                    r = r.replace("s", valarr[2]);
                } else if(valarr.length == 2) {
                    if(sjObj.opt.Hour && !sjObj.opt.Minute) {
                        r = r.replace("h", valarr[0]);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", valarr[1]);
                    } else if(sjObj.opt.Hour && !sjObj.opt.Seconds) {
                        r = r.replace("h", valarr[0]);
                        r = r.replace("m", valarr[1]);
                        r = r.replace("s", sjObj.opt.s);
                    } else if(!sjObj.opt.Hour) {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", valarr[0]);
                        r = r.replace("s", valarr[1]);
                    }

                } else if(valarr.length == 1) {
                    if(sjObj.opt.Hour) {
                        r = r.replace("h", valarr[0]);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", sjObj.opt.s);
                    } else if(sjObj.opt.Minute) {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", valarr[0]);
                        r = r.replace("s", sjObj.opt.s);
                    } else if(sjObj.opt.Hour) {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", valarr[0]);
                    } else {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", sjObj.opt.s);
                    }
                };
                return r;
            }
            var GetSlideDirection = function(startX, startY, endX, endY) { //判读手指滑动方向
                var dy = startY - endY;
                var dx = endX - startX;
                var result = 0;
                //如果滑动距离太短
                if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result;
                }
                var angle = GetSlideAngle(dx, dy);
                if(angle >= -45 && angle < 45) {
                    result = 4; //右
                } else if(angle >= 45 && angle < 135) {
                    result = 1; //上
                } else if(angle >= -135 && angle < -45) {
                    result = 2; //下
                } else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    result = 3; //左
                }
                return result;
            };
            var getTranslateY = function(eml) {
                var matrix = $(eml).css("transform");
                var T;
                if(matrix == "none") {
                    T = 0;
                } else {
                    var arr = matrix.split(",");
                    T = -(arr[5].split(")")[0]);
                }
                return T
            }
            sjObj.innt = function() {
                if(!sjObj.opt.alwaysShow) {
                    $(this).on("click", function(e) {
                        e.stopPropagation();
                        sjObj.opt.thisElm = this;
						$("html").addClass("ov_hi");
						$(this).blur(); //失去焦点
						sjObj.opt.getYear(); //获取年份
						sjObj.opt.buildHTml();
						sjObj.opt.getFinal();
                    })
                } else {
                    sjObj.opt.thisElm = this;
                    sjObj.opt.getYear(); //获取年份
                    sjObj.opt.buildHTml();
                }
                $(window).on("resize", function() {
                    sjObj.opt.setCenter();
                })
            }
            sjObj.innt();
            return sjObj;
        }
        if(this.length > 1) {
            var arr = [];
            $.each(this, function() {
                arr.push(cPlugin(this, true));
            })
            return arr;
        } else {
            var obj = cPlugin(this);
            return obj;
        }
    }
})(jQuery)