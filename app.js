// select search bar automatically when entering page
let input = document.getElementById('input');
input.focus();
input.select();

window.onload = function() {
    document.body.addEventListener("click", function() {
        document.querySelector("#input").focus();
    });

    document.getElementById("input").addEventListener("submit", function(e) {
        e.preventDefault();
        console.log(e);
    })
};


function goTo(site, params, paramsValue) {
    window.location.href = site + params + paramsValue;
}

function interpret() {
    // get search bar input value 
    // trim: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    var e = document.querySelector("#input").value.trim();

    if ("" != e) {
        // if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(e) || e.includes(" ")) {
        //     for (var t = e.split(";"), o = 0; o < t.length; o++) {
        //         t[o] = t[o].trim();
        //     };
        //     for (var r = t[0].toLowerCase(),
        //             i = false,
        //             n = Object.keys(COMMANDS),
        //             c = Object.keys(ALIASES),
        //             o = 0; o < n.length; o++) {
        //         r == n[o] ? (i = !0) : r == c[o] && ((i = !0), (r = ALIASES[r]));
        //     };
        //     i ? (t.splice(0, 1), t.length > 1 && "n" === t[t.length - 1] && ((NEW_TAB = !0), t.splice(t[t.length - 1], 1)), COMMANDS[r](t)) : COMMANDS[SETTINGS.defaultCommand](t);
        // } else {
        //     redirect(e);
        // };
    }
}

function redirect(e, t, o, r, i) {
    // void 0 == void(0) == undefined
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/void
    void 0 === i && (i = false);
    var n = /(http(s)?:\/\/.)/.test(e) ? e : "http://" + e;
    return (
        o ? (n += t + o) : r && r.length > 0 && "" !== r[0] && (n += t + r[0]), i || NEW_TAB ? window.open(n).focus() : (window.location.href = n), false
    );
}

function encodeArgs(e, t) {
    if (t) {
        for (let o = 0; o < e.length; o++) {
            // remplace all " " to "+"
            e[o] = e[o].replace(/ /g, "+");
        };
    } else {
        for (let o = 0; o < e.length; o++) {
            e[o] = encodeURIComponent(e[o]);
        };
    }
    return e;
}
//   function loadSettings() {
//     if (null == localStorage.getItem("settings")) {
//       var e = { defaultCommand: "g", bgColor: "#282828", textColor: "#ebdbb2" };
//       localStorage.setItem("settings", JSON.stringify(e));
//     }
//     SETTINGS = JSON.parse(localStorage.getItem("settings"));
//   }
//   function applySettings() {
//     (document.querySelector("body").style.backgroundColor = SETTINGS.bgColor),
//       (document.querySelector("body").style.color = SETTINGS.textColor);
//   }
//   function saveSettings() {
//     localStorage.setItem("settings", JSON.stringify(SETTINGS));
//   }
//   function displayMessage(e, t) {
//     var o = document.querySelector("#message");
//     timer && ((o.innerHTML = ""), clearTimeout(timer)),
//       (o.innerHTML = e),
//       (timer = setTimeout(function () {
//         o.innerHTML = "";
//       }, t));
//   }
//   function handleKeyDown(e) {
//     13 == (e.which || e.keyCode) && interpret();
//   }
// var SETTINGS, NEW_TAB = false;

// var ALIASES = { cal: "gc", gk: "k", ddg: "dg", map: "gm" }

// Commands
let CMDS = {
    g: function(e) {
        goTo("google.com", "/search?q=", encodeURIComponent(e));
    }
}

var COMMANDS = {
    g: function(e) {
        redirect("google.com", "/search?q=", void 0, encodeArgs(e));
    },
    r: function(e) {
        var t = "https://reddit.com",
            o = e.length > 0 ? e[0] : "",
            r = function(e) {
                return [
                    "hot",
                    "new",
                    "rising",
                    "controversial",
                    "top",
                    "gilded",
                    "wiki",
                    "promoted",
                ].includes(e);
            };
        switch (e.length) {
            case 0:
                redirect(t);
                break;
            case 1:
                redirect(t, "/r/", void 0, e);
                break;
            case 2:
                o += r(e[1]) ? "/" + e[1] : "";
                break;
            case 3:
                ["top", "controversial"].includes(e[1]) ?
                    (o += (function(e) {
                            return ["day", "week", "month", "year", "all"].includes(e);
                        })(e[2]) ?
                        "/" + e[1] + "?t=" + e[2] :
                        "") :
                    (o += r(e[1]) ? "/" + e[1] : "");
        }
        redirect(t, "/r/", o, void 0);
    },
    dg: function(e) {
        redirect("https://duckduckgo.com", "/?q=", void 0, encodeArgs(e));
    },
    y: function(e) {
        var t = "https://youtube.com";
        switch ((e = encodeArgs(e)).length) {
            case 0:
                redirect(t);
                break;
            case 1:
                "subs" == e[0] || "s" == e[0] ?
                    redirect(t, "", "/feed/subscriptions", void 0) :
                    redirect(t, "/results?search_query=", void 0, e);
        }
    },
    a: function(e) {
        redirect(
            "https://smile.amazon.com",
            "/s/?field-keywords=",
            void 0,
            encodeArgs(e)
        );
    },
    w: function(e) {
        redirect(
            "https://wikipedia.org",
            "/w/index.php?title=Special:Search&search=",
            void 0,
            encodeArgs(e, true)
        );
    },
    gh: function(e) {
        redirect("https://github.com", "/", void 0, e);
    },
    gist: function(e) {
        redirect("https://gist.github.com", "/", void 0, encodeArgs(e));
    },
    wa: function(e) {
        redirect("wolframalpha.com", "/input/?i=", void 0, encodeArgs(e));
    },
    n: function(e) {
        redirect("https://netflix.com", "/search?q=", void 0, encodeArgs(e));
    },
    imdb: function(e) {
        redirect("imdb.com", "/find?s=all&q=", void 0, encodeArgs(e));
    },
    gm: function(e) {
        redirect("https://maps.google.com", "/maps?q=", void 0, encodeArgs(e));
    },
    gd: function(e) {
        redirect(
            "https://drive.google.com",
            "/drive/search?q=",
            void 0,
            encodeArgs(e)
        );
    },
    gc: function(e) {
        redirect("https://calendar.google.com", "", "", void 0);
    },
    img: function(e) {
        redirect(
            "https://google.com",
            "/search?tbm=isch&q=",
            void 0,
            encodeArgs(e)
        );
    },
    i: function(e) {
        var t = "https://inbox.google.com";
        switch ((e = encodeArgs(e)).length) {
            case 0:
                redirect(t);
                break;
            case 1:
                "snoozed" == e[0] ?
                    redirect(t + "/snoozed") :
                    "done" == e[0] ?
                    redirect(t + "/done") :
                    redirect(t, "/search/", void 0, e);
        }
    },
    k: function(e) {
        redirect(
            "https://keep.google.com",
            "/#search/text=",
            void 0,
            encodeArgs(e)
        );
    },
    tr: function(e) {
        redirect("https://trello.com", "/search?q=", void 0, encodeArgs(e));
    },
    dict: function(e) {
        redirect("dictionary.com", "/browse/", void 0, encodeArgs(e));
    },
    thes: function(e) {
        redirect("thesaurus.com", "/browse/", void 0, encodeArgs(e));
    },
    help: function(e) {
        redirect(
            "https://github.com/koryschneider/mintab/blob/master/doc/commands.md",
            void 0,
            void 0,
            void 0, !0
        );
    },
    set: function(e) {
        // var t = function (e) {
        //   return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(e);
        // };
        // if (Object.keys(SETTINGS).includes(e[0]))
        //   switch (e.length) {
        //     case 1:
        //       displayMessage(e[0] + ": " + SETTINGS[e[0]], 8e3);
        //       break;
        //     case 2:
        //       "defaultCommand" == e[0]
        //         ? Object.keys(COMMANDS).includes(e[1])
        //           ? (SETTINGS.defaultCommand = e[1])
        //           : displayMessage(
        //               'Error: command "' +
        //                 e[1] +
        //                 '" not found; default command not changed',
        //               5e3
        //             )
        //         : "bgColor" == e[0]
        //         ? t(e[1])
        //           ? (SETTINGS.bgColor = e[1])
        //           : displayMessage("Error: invalid hex value", 5e3)
        //         : "textColor" == e[0] &&
        //           (t(e[1])
        //             ? (SETTINGS.textColor = e[1])
        //             : displayMessage("Error: invalid hex value", 5e3));
        //   }
        // else
        //   "defaults" == e[0] &&
        //     (localStorage.removeItem("settings"),
        //     displayMessage("Settings reset to defaults", 5e3));
        // saveSettings(), applySettings();
    },
};