/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = window.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    if (template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define) define(function() {
        return template;
    }); else if ("undefined" != typeof exports) module.exports = template; else {
        for (var namespaceArray = "QQSwitcherTmpl".split("."), global = window, i = 0; i < namespaceArray.length; i++) {
            var item = namespaceArray[i];
            global[item] = global[item] || {}, global = global[item];
        }
        global.template = template;
    }
    /*v:44*/
    template("about", '<div class="aboutcontent mt30"> <svg version="1.1" baseProfile="basic" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="251px" height="34px" viewBox="0 0 251 34" xml:space="preserve"> <image title="QQSwitcher" alt="QQSwitcher" src="data:image/png;base64,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"/> <g> <g> <path d="M15.082,27.312l6.641,6.131L21.308,34l-7.057-6.549c-0.369,0-0.783,0-1.245,0C5.073,26.8,0.738,22.295,0,13.935 C0.738,5.482,5.073,0.836,13.006,0c7.933,0.836,12.269,5.482,13.006,13.935C25.551,21.368,21.908,25.826,15.082,27.312z M0.692,13.935c0.738,7.99,4.843,12.31,12.314,12.959c7.472-0.649,11.577-4.969,12.315-12.959 C24.583,5.853,20.478,1.442,13.006,0.697C5.535,1.442,1.43,5.853,0.692,13.935z"/> <path d="M46.905,27.312l6.642,6.131L53.131,34l-7.056-6.549c-0.369,0-0.784,0-1.245,0c-7.933-0.65-12.268-5.156-13.006-13.516 C32.562,5.482,36.896,0.836,44.83,0c7.933,0.836,12.268,5.482,13.005,13.935C57.374,21.368,53.73,25.826,46.905,27.312z M32.516,13.935c0.738,7.99,4.842,12.31,12.314,12.959c7.472-0.649,11.576-4.969,12.314-12.959 C56.405,5.853,52.301,1.442,44.83,0.697C37.357,1.442,33.253,5.853,32.516,13.935z"/> <path d="M84.401,6.688l-0.692,0.278c-1.661-3.993-4.75-6.082-9.27-6.27c-5.443,0.188-8.348,2.229-8.717,6.131 c-0.276,3.065,2.721,5.203,8.993,6.41C81.911,14.54,85.323,17,84.954,20.623c0,4.646-3.367,6.968-10.101,6.968 c-5.811,0-9.454-2.648-10.93-7.943l0.553-0.14c1.292,4.925,4.751,7.386,10.377,7.386c6.365,0,9.501-2.091,9.409-6.271 c0.368-3.251-2.86-5.48-9.685-6.688c-6.642-1.301-9.824-3.669-9.548-7.106c0.462-4.366,3.598-6.64,9.409-6.828 C79.236,0.188,82.557,2.417,84.401,6.688z"/> <path d="M108.476,26.336l6.227-18.812l0.692,0.139l-6.503,19.648h-0.692l-6.227-18.532l-6.364,18.532h-0.553L88.552,7.664 l0.553-0.139l6.226,18.812l6.366-18.812h0.553L108.476,26.336z"/> <path d="M117.746,0.418L118.299,0l2.076,3.065l-0.554,0.418L117.746,0.418z M118.715,7.525h0.692v19.787h-0.692V7.525z"/> <path d="M132.412,25.918l0.415,0.557c-1.106,0.649-2.259,0.976-3.458,0.976c-1.661,0-2.491-1.161-2.491-3.484V8.36h-3.459V7.664 h3.459V0.976h0.553v6.688h5.257V8.36h-5.257v15.606c0,1.951,0.646,2.878,1.938,2.788C130.476,26.754,131.49,26.475,132.412,25.918 z"/> <path d="M152.613,12.959l-0.692,0.279c-1.291-3.344-3.781-5.108-7.471-5.295c-4.889,0.466-7.518,3.671-7.887,9.615 c0.184,5.853,2.812,8.964,7.887,9.336c4.335,0.091,7.01-1.858,8.024-5.853l0.555,0.278c-1.108,4.273-3.967,6.362-8.579,6.271 c-5.535-0.466-8.395-3.809-8.578-10.033c0.461-6.317,3.32-9.754,8.578-10.312C148.417,7.433,151.137,9.336,152.613,12.959z"/> <path d="M173.783,15.606v11.705h-0.692V15.606c0-5.108-2.122-7.664-6.364-7.664c-4.797,0.466-7.38,3.855-7.749,10.172v9.197 h-0.691V0.279h0.691v13.377c1.476-4.087,4.059-6.223,7.749-6.41C171.431,7.339,173.783,10.126,173.783,15.606z"/> <path d="M197.996,17.836h-17.434c0.461,5.761,3.274,8.778,8.44,9.057c4.335-0.093,7.01-1.812,8.024-5.156l0.692,0.278 c-1.199,3.532-4.104,5.342-8.717,5.435c-5.812-0.372-8.856-3.714-9.132-10.033c0.368-6.317,3.367-9.706,8.993-10.172 C194.859,7.525,197.903,11.056,197.996,17.836z M180.562,17.14h16.741c-0.276-6.039-3.09-9.104-8.439-9.197 C183.791,8.314,181.023,11.38,180.562,17.14z"/> <path d="M214.6,9.197l-0.554,0.557c-0.923-1.207-2.121-1.764-3.598-1.672c-3.505,0.929-5.396,4.785-5.673,11.565v7.803h-0.691 V7.525h0.691v6.828c1.292-4.366,3.183-6.689,5.673-6.967C212.201,7.294,213.585,7.896,214.6,9.197z"/> </g> <g> <path d="M233.963,19.349l-2.444,6.844h-1.37l-2.383-6.844h1.543l1.111,3.639c0.186,0.596,0.333,1.167,0.457,1.739h0.037 c0.123-0.571,0.283-1.13,0.456-1.726l1.099-3.652H233.963z"/> <path d="M237.244,26.192v-8.036h-0.025l-1.567,0.87l-0.321-1.056l2.099-1.13h1.21v9.353H237.244z"/> <path d="M241.759,25.348c0-0.571,0.396-0.994,0.926-0.994c0.543,0,0.914,0.41,0.914,0.994c0,0.571-0.358,0.981-0.926,0.981 C242.104,26.329,241.759,25.895,241.759,25.348z"/> <path d="M244.522,21.535c0-3.056,1.147-4.844,3.073-4.844c1.963,0,2.95,1.913,2.95,4.745c0,3.167-1.136,4.894-3.049,4.894 C245.56,26.329,244.522,24.404,244.522,21.535z M249.102,21.485c0-2.223-0.469-3.651-1.555-3.651c-0.938,0-1.58,1.316-1.58,3.651 c0,2.323,0.567,3.689,1.555,3.689C248.731,25.174,249.102,23.422,249.102,21.485z"/> </g> </g> </svg> <p class="mt40 paragraph"><b>提高效率，点滴做起；高效工作，早点下班</b><br><br> 我们旨在为我厂员工提供便捷的一键切换已登录QQ的方式。从此，再也不用担心记不住大把的测试账号，再也不用来回复制粘贴账号密码，一切交给QQSwitcher。QQSwitcher提供的账号保存、一键登录功能，让你秒级完成账号切换。且账户密码安全的存储在浏览器本地，无须担心泄露。 <br><br>尤其适用于<span class="box">产品经理</span>，<span class="box">研发</span>，<span class="box">测试同学</span>。</p> <p class="signature"> idea from tysonpan <br> create by <a href="mailto:skateryang@tencent.com" title="发邮件反馈意见">skateryang</a> & <a href="mailto:ggddll123@qq.com" title="发邮件反馈意见">alandlguo</a> </p> </div> '), 
    /*v:8*/
    template("edit", '<p class="precautions"><b>格式：</b>uin,密码，描述(可选)，多个号码输入多行即可。 <br><b>示例：</b>12345678,qcloudv5,白名单外号码 </p> <textarea class="editarea"></textarea>'), 
    /*v:10*/
    template("emptylist", '<div class="emptyicon" title="点击任意处添加号码"><a href="#/edit"><i class="iconfont">&#xe604;</i></a></div>'), 
    /*v:82*/
    template("frame", function($data) {
        "use strict";
        var $utils = this, page = ($utils.$helpers, $data.page), $string = $utils.$string, content = $data.content, $out = "";
        return $out += '<div class="dialogwrapper"> <div class="dialog" style="left:50%;top:50%;width:388px;height:486px;margin-left: -194px;margin-top:-243px"> <div class="topbar clearfix"> <span class="title"> <a href="#" title="QQSwicher created by skateryang and alandlguo"> <svg version="1.1" baseProfile="basic" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="98.23px" height="16.298px" viewBox="-0.1 -0.146 98.23 16.298" xml:space="preserve"> <image alt="QQSwitcher" title="QQSwitcher" style="border:none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAARCAYAAAAmE3lhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBJREFUeNrsWIGN6zAITao/gEfwCB4hI2SEjNARMkJG8AgeISNkhI6Qm6DfrqBCHNi4/Xf6/+uQrF7wYbCBZ/B4v98HTuM4TuU3z+1DB2U5n3/KuGXZW6dMoSPLncOblNd0YP+fWCvkdY7hi+lCDySPWAYcDH5vcFg1Y5c8Uv5zAdbju/BrGwSZax4OdG6gz725r7JWZLrCi2ttw3cQZMQMhrvyTQdsqmRG4HMwXwydlbniiE3gO1hT0he0uZ5BbcpUMnx6cZ39HTs69DwOJTX+STy4TGtrg+DkVXDQXJGZuMybm/wnHFEi2hs3c2XOiUYliX1fDQ706GxlPir8FTOVOD3CKIGzsGzfYC7Bb+COwL2S/4kSQhBITGTdRUGKQNZbhlY2aJuHSJ+NcguDCsww3ytLNnwI/IDBQiNZyggCuU6wKzBHcJ6ryPoWPIOTnvJwlp8x3BLZEF3OKOcFeHIkutQMkTIPdAeBv5FMajlCuxMdC7i7EtUzC66oBRafy3Ryey7AtNKNXfRW2VMoEs48ygYXjDis2rB8rujQSkpvLZu1tdEuwvrI31HZU2Cymu4IwfCU5a3BL76YoSx8LlYOzNhrBO5EtoEDoAZ7gEfJTA5gz98l+hKUoXuD3x1UFbL2EKXcX5U5x4LxpnnLGeEl8ovOerew1Jw7YfAJFwx+RL4RmtZ3qiZe2VkLF033hVQTlsZmZWnoDM2eFyBj6ux1Tgl+NL6RQsXmdegnVzuD1jldAFoKzFwbhiVho0UmakqAv2FVQChBB197ouD4vaMdCn/vPKiD3kXM5lc6+1Q5w80Sbby7xho3kBp8bjR7G4wJIGsiPFdp9BL8epLuC/C9oOcuNJXI9xqk4PsX6FoYZGIF5ohu1wtNpJrDi9nRM21B08gf/eDSw+FYBdF6aAuIx6BsN8hMBCZOePjbtQyT4Ed6mOO8cqljBlFIg/3O5NExWR79wHbH7YGMCuSp5tNDplTkjNLrK33Mg0tu6clRMDJBc/XlL5f/A1Ud8eOMv8gRmNY8ZTuc4X8c0abfAgwAhiStZR/++zkAAAAASUVORK5CYII="/> <g> <g> <path d="M6.437,12.99l-0.498,0.027c-3.671-0.31-5.7-2.48-6.039-6.452C0.239,2.535,2.268,0.299,5.928-0.1 c3.682,0.398,5.709,2.635,6.048,6.648c-0.207,3.476-1.851,5.609-4.887,6.359l2.963,2.815l-0.308,0.428L6.437,12.99z M5.94,0.429 C2.558,0.78,0.75,2.788,0.415,6.566c0.332,3.671,2.193,5.693,5.534,5.991c3.324-0.299,5.185-2.32,5.515-6.008 C11.134,2.841,9.276,0.776,5.94,0.429z"/> </g> <g> <path d="M20.972,12.99l-0.5,0.027c-3.672-0.31-5.701-2.48-6.039-6.452c0.338-4.03,2.366-6.267,6.028-6.665 c3.68,0.398,5.708,2.635,6.049,6.648c-0.208,3.476-1.853,5.609-4.888,6.359l2.961,2.815l-0.307,0.429L20.972,12.99z M20.472,0.429 c-3.336,0.347-5.194,2.412-5.523,6.137c0.33,3.67,2.191,5.692,5.532,5.991c3.323-0.299,5.185-2.32,5.515-6.008 C25.666,2.841,23.808,0.776,20.472,0.429z"/> </g> <g> <path d="M34.182,13.084c-2.691,0-4.403-1.282-5.088-3.812l-0.026-0.098l0.447-0.117l0.024,0.098 c0.583,2.288,2.102,3.401,4.643,3.401c1.697,0,2.893-0.343,3.555-1.019c0.442-0.452,0.658-1.067,0.642-1.831 c0.161-1.474-1.299-2.497-4.34-3.052c-3.078-0.62-4.573-1.78-4.444-3.449C29.814,1.102,31.293-0.01,33.99-0.1 c2.23,0.09,3.79,1.17,4.645,3.208l0.039,0.092l-0.5,0.209l-0.038-0.094C37.395,1.486,36,0.515,33.988,0.428 c-2.441,0.086-3.712,1-3.876,2.794c-0.12,1.377,1.236,2.356,4.028,2.909c3.33,0.621,4.93,1.827,4.754,3.584 C38.894,11.947,37.309,13.084,34.182,13.084z"/> </g> <g> <polygon points="49.339,12.953 46.568,4.45 43.734,12.953 43.337,12.953 40.312,3.536 40.758,3.42 43.536,12.07 46.37,3.441 46.767,3.441 49.538,12.067 52.313,3.425 52.827,3.53 49.802,12.953 "/> </g> <g> <path d="M54.112,12.953V3.441h0.515v9.512H54.112z M53.638,0.175l0.407-0.321l1.061,1.611l-0.412,0.319L53.638,0.175z"/> </g> <g> <path d="M59.078,13.018c-0.822,0-1.238-0.585-1.238-1.74V4.035h-1.58V3.506h1.58V0.359h0.451v3.147h2.401v0.528h-2.401v7.243 c0,1.215,0.535,1.215,0.711,1.215c0.561-0.002,1.01-0.13,1.413-0.382l0.079-0.05l0.309,0.428l-0.093,0.057 C60.188,12.858,59.64,13.018,59.078,13.018z"/> </g> <g> <path d="M65.964,13.082c-2.582-0.223-3.931-1.844-4.016-4.817c0.212-3.024,1.56-4.688,4.007-4.956 c1.86,0.091,3.144,1.017,3.829,2.752l0.036,0.091l-0.5,0.208l-0.036-0.097c-0.572-1.524-1.69-2.341-3.323-2.427 c-2.183,0.216-3.332,1.666-3.5,4.431c0.083,2.71,1.232,4.116,3.513,4.288l0.124,0.001c1.866,0,2.99-0.876,3.436-2.679l0.03-0.122 l0.435,0.224l-0.02,0.077c-0.503,2.009-1.809,3.027-3.882,3.027L65.964,13.082z"/> </g> <g> <path d="M78.945,12.953V7.344c0-2.359-0.918-3.506-2.807-3.506c-2.145,0.216-3.273,1.751-3.439,4.693v4.422h-0.516V0.032h0.516 v5.864c0.711-1.634,1.864-2.503,3.435-2.586c2.209,0.044,3.325,1.401,3.325,4.034v5.609H78.945z"/> </g> <g> <path d="M86.304,13.018c-2.7-0.178-4.134-1.798-4.263-4.816c0.17-3.026,1.583-4.668,4.198-4.891 c2.8,0.133,4.235,1.843,4.278,5.082l0.002,0.102h-7.954c0.231,2.605,1.459,3.935,3.751,4.062c1.915-0.042,3.116-0.834,3.564-2.354 l0.031-0.106l0.503,0.209l-0.029,0.088c-0.559,1.698-1.929,2.582-4.073,2.625h-0.004H86.304z M89.996,7.966 c-0.148-2.732-1.375-4.083-3.745-4.128c-2.248,0.171-3.454,1.521-3.686,4.128H89.996z"/> </g> <g> <path d="M93.099,13.017V3.441h0.515v2.667c0.593-1.692,1.426-2.611,2.479-2.732l0.164-0.005c0.76,0,1.373,0.302,1.824,0.896 l0.051,0.068l-0.393,0.408l-0.07-0.095c-0.371-0.499-0.851-0.751-1.425-0.751L96.11,3.902c-1.525,0.42-2.372,2.22-2.497,5.347 v3.768H93.099z"/> </g> </g> </svg> </a> </span> <span class="buttons"> <a class="close" title="关闭" href="javascript:window.top.postMessage(JSON.stringify({message:\'close\'}),\'*\');"></a> </span> </div> <div class="content"> <div class="error none mb10" id="error">您输入的帐号或密码不正确，请重新输入。</div> ', 
        "list" == page && ($out += ' <div class="scrollbar" id="scrollbar"> <div class="handle"></div> </div> '), 
        $out += " ", $out += $string(content), $out += " ", "list" == page ? $out += ' <span class="toolbar">  <a href="#/edit" title="编辑"><i class="iconfont">&#xe604;</i></a> </span> ' : "about" == page ? $out += ' <span class="toolbar"> <a href="#/list" title="返回列表页"><i class="iconfont">&#xe605;</i></a> </span> ' : "edit" == page && ($out += ' <span class="toolbar alignright"> <a href="#/list" data-click-event="confirm" title="返回列表页"><i class="iconfont">&#xe606;</i></a> </span> '), 
        $out += " ", "list" == page && ($out += ' <span class="sign"><a href="#/about" title="前往介绍页">created by skateryang & alandlguo</a></span> '), 
        $out += " </div> </div> </div>", new String($out);
    }), /*v:53*/
    template("list", '<ul id="contentlist"> </ul>'), /*v:19*/
    template("listitem", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), data = $data.data, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $each(data, function($value) {
            $out += ' <li data-click-event="select"> <span class="number">', $out += $escape($value.uin), 
            $out += '</span> <span class="markup mr5">', $out += $escape($value.comment), $out += '</span> <span class="pwd none">', 
            $out += $escape($value.password), $out += '</span> <span class="vercodewrapper none"> <input class="vercode" id="vercode"> <img class="verifyimg" class="看不清，换一张" src=""> </span> </li> ';
        }), new String($out);
    });
}();