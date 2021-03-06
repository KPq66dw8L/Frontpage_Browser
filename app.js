// select search bar automatically when entering page
let input = document.getElementById('input');
input.focus();
input.select();

window.onload = function() {
    document.body.addEventListener("click", function() {
        document.querySelector("#input").focus();
    });

    document.getElementById("searchForm").addEventListener("submit", function(e) {
        e.preventDefault();
        let search = document.getElementById("input").value.trim();
        search = search.split(" ");
        search = search.filter(function(e) { return e !== "" })
        // remove possible backslash, because common fat finger mistake
        search = search.map(function(e) { return e.replace(/\\/g, "") });
        
        // check if we are using a macro/CMD
        if (CMDS.hasOwnProperty(search[0].toLowerCase())) {
            // if so, which one ?
            switch (search[0].toLowerCase()) {
                case 'help':
                    CMDS.help(search.slice(1));
                    break;
                case 'g':
                    CMDS.g(search.slice(1));
                    break;
                case 'yt':
                    CMDS.yt(search.slice(1));
                    break;
                case 'w':
                    CMDS.w(search.slice(1));
                    break;
                case 'r':
                    CMDS.r(search.slice(1));
                    break;
                case 'gh':
                    CMDS.gh(search.slice(1));
                    break;
                case 'gi':
                    CMDS.gi(search.slice(1));
                    break;
                case 'a':
                    CMDS.a(search.slice(1));
                    break;
                case 'img':
                    CMDS.img(search.slice(1));
                    break;
                case 'c':
                    CMDS.c(search.slice(1));
                    break;
                case 'gd':
                    CMDS.gd(search.slice(1));
                    break;
                case 'p':
                    CMDS.p(search.slice(1));
                    break;
                case 'w3':
                    CMDS.w3(search.slice(1));
                    break;
                case 'tw':
                    CMDS.tw(search.slice(1));
                    break;
                case 't':
                    CMDS.t(search.slice(1));
                    break;
                case 'in':
                    CMDS.in(search.slice(1));
                    break;
                case 'ugg':
                    CMDS.ugg(search.slice(1));
                    break;
            }
        }
        else if (search.length > 0) {
            CMDS.g(search);
        }
    })
};

function goTo(site, params, paramsValue) {
    if (paramsValue === "") { // si on utilise une macro/CMD mais sans details
        window.location.href = site;
    }
    else if (params == void 0 && paramsValue == void 0) { // si seul un parametre nous est donn??
        window.location.href = site;
    }
    else { // si on utilise une macro avec des details
        window.location.href = site + params + paramsValue;
    }
}

function encodeArgs(args) {
    if (args.length === 0) {
        return "";
    } else {
        let params = "";
        for (let i = 0; i < args.length; i++) {
            params = params + "+" + encodeURIComponent(args[i].trim());
        }
        return params;
    }
}

// Commands
let CMDS = {
    help(e) {
        console.dir(CMDS);
    },
    _help: "help",
    g(e) { // google
        goTo("https://www.google.com", "/search?q=", encodeArgs(e));
    },
    _g: "google",
    yt(e) { // youtube
        let secondCMD = e[0];
        switch (secondCMD) {
            case 'c':
                goTo("https://www.youtube.com/signin?action_handle_signin=true&authuser=3&next=https%3A%2F%2Fwww.youtube.com%2F&feature=masthead_switcher&skip_identity_prompt=true");
                break;
            case 'a':
                goTo("https://www.youtube.com/signin?action_handle_signin=true&authuser=0&pageid=108914003580281702713&next=https%3A%2F%2Fwww.youtube.com%2F&feature=masthead_switcher&skip_identity_prompt=true");
                break;
            case 'r':
                goTo("https://www.youtube.com/signin?action_handle_signin=true&authuser=0&next=https%3A%2F%2Fwww.youtube.com%2F&feature=masthead_switcher&skip_identity_prompt=true");
                break;
            case 'rr':
                goTo("https://www.youtube.com/signin?action_handle_signin=true&authuser=1&next=https%3A%2F%2Fwww.youtube.com%2F&feature=masthead_switcher&skip_identity_prompt=true");
                break;
            default:
                goTo("https://www.youtube.com", "/results?search_query=", encodeArgs(e));
                break;
        }
    },
    _yt: "youtube",
    w(e) { // wikipedia
        let secondCMD = e[0];
        switch (secondCMD) {
            case 'j':
                goTo("https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8");
                break;
            default:
                goTo("https://www.wikipedia.org", "/w/index.php?search=", encodeArgs(e));
                break;
        }
    },
    _w: "wikipedia & japanese wikipedia",
    r(e) { // reddit
        let secondCMD = e[0];
        switch (secondCMD) {
            case "":
                goTo("https://www.reddit.com");
                break;
            case "u":
                goTo("https://www.reddit.com/r/unixporn/");
                break;
            default:
                goTo("https://www.reddit.com", "/search/?q=", encodeArgs(e));
                break;
        }
    },
    _r: "reddit",
    gh(e) { // github
        let secondCMD = e[0];
        switch (secondCMD) {
            case "":
                goTo("https://github.com");
                break;
            default:
                goTo("https://github.com", "/?q=", encodeArgs(e));
                break;
        }
    },
    _gh: "github",
    gi(e) { // gist 
        goTo("https://gist.github.com");
    },
    _gi: "gist github",
    a(e) { // amazon
        goTo("https://www.amazon.fr", "/s?k=", encodeArgs(e));
    },
    _a: "amazon",
    img(e) { // google image 
        goTo("https://www.google.com", "/search?tbm=isch&q=", encodeArgs(e));
    },
    _img: "google image",
    c(e) { // cambridge dictionary 
        goTo("https://dictionary.cambridge.org/dictionary/english/", "", encodeArgs(e));
    },
    _c: "cambridge dictionnary",
    gd(e) { // google docs
        goTo("https://docs.google.com/document/u/0/");
    },
    _gd: "google docs",
    p(e) { // pinterest
        let secondCMD = e[0];
        switch (secondCMD) {
            case "":
                goTo("https://www.pinterest.fr/");
                break;
            case 't':
                goTo("https://www.pinterest.fr/kezhkia/_saved/");
                break;
            default:
                goTo("https://www.pinterest.fr", "/search/pins/?q=", encodeArgs(e));
        }
    },
    _p: "pinterest",
    w3(e) { // filmlicious 
        let secondCMD = e[0];
        switch (secondCMD) {
            case "":
                goTo("https://www3.filmlicious.net");
                break;
            default:
                let params = "";
                for (let i = 0; i < e.length; i++) {
                    params = params + "-" + encodeURIComponent(e[i].trim());
                }
                goTo("https://www3.filmlicious.net", "/search/", params);
                break;
        }
    },
    _w3: "filmlicious",
    tw(e) { // twitch
        goTo("https://www.twitch.tv", "/", e);
    },
    _tw: "twitch",
    t(e) { // twitter
        goTo("https://twitter.com");
    },
    _t: "twitter",
    in(e) { // instagram
        goTo("https://www.instagram.com/direct/inbox/");
    },
    _in: "instagram inbox",
    ugg(e) { // ugg
        let secondCMD = e[0];
        switch (secondCMD) {
            case void 0:
                goTo("https://u.gg/lol/champions/");
                break;
            default:
                window.location.href = "https://u.gg/lol/champions/" + secondCMD;
                break;
        }
    },
    _ugg: "ugg",
}

// var COMMANDS = {
//     g: function(e) {
//         redirect("google.com", "/search?q=", void 0, encodeArgs(e));
//     },
//     r: function(e) {
//         var t = "https://reddit.com",
//             o = e.length > 0 ? e[0] : "",
//             r = function(e) {
//                 return [
//                     "hot",
//                     "new",
//                     "rising",
//                     "controversial",
//                     "top",
//                     "gilded",
//                     "wiki",
//                     "promoted",
//                 ].includes(e);
//             };
//         switch (e.length) {
//             case 0:
//                 redirect(t);
//                 break;
//             case 1:
//                 redirect(t, "/r/", void 0, e);
//                 break;
//             case 2:
//                 o += r(e[1]) ? "/" + e[1] : "";
//                 break;
//             case 3:
//                 ["top", "controversial"].includes(e[1]) ?
//                     (o += (function(e) {
//                             return ["day", "week", "month", "year", "all"].includes(e);
//                         })(e[2]) ?
//                         "/" + e[1] + "?t=" + e[2] :
//                         "") :
//                     (o += r(e[1]) ? "/" + e[1] : "");
//         }
//         redirect(t, "/r/", o, void 0);
//     },
//     dg: function(e) {
//         redirect("https://duckduckgo.com", "/?q=", void 0, encodeArgs(e));
//     },
//     y: function(e) {
//         var t = "https://youtube.com";
//         switch ((e = encodeArgs(e)).length) {
//             case 0:
//                 redirect(t);
//                 break;
//             case 1:
//                 "subs" == e[0] || "s" == e[0] ?
//                     redirect(t, "", "/feed/subscriptions", void 0) :
//                     redirect(t, "/results?search_query=", void 0, e);
//         }
//     },
//     a: function(e) {
//         redirect(
//             "https://smile.amazon.com",
//             "/s/?field-keywords=",
//             void 0,
//             encodeArgs(e)
//         );
//     },
//     w: function(e) {
//         redirect(
//             "https://wikipedia.org",
//             "/w/index.php?title=Special:Search&search=",
//             void 0,
//             encodeArgs(e, true)
//         );
//     },
//     gh: function(e) {
//         redirect("https://github.com", "/", void 0, e);
//     },
//     gist: function(e) {
//         redirect("https://gist.github.com", "/", void 0, encodeArgs(e));
//     },
//     wa: function(e) {
//         redirect("wolframalpha.com", "/input/?i=", void 0, encodeArgs(e));
//     },
//     n: function(e) {
//         redirect("https://netflix.com", "/search?q=", void 0, encodeArgs(e));
//     },
//     imdb: function(e) {
//         redirect("x", "/find?s=all&q=", void 0, encodeArgs(e));
//     },
//     gm: function(e) {
//         redirect("https://maps.google.com", "/maps?q=", void 0, encodeArgs(e));
//     },
//     gd: function(e) {
//         redirect(
//             "https://drive.google.com",
//             "/drive/search?q=",
//             void 0,
//             encodeArgs(e)
//         );
//     },
//     gc: function(e) {
//         redirect("https://calendar.google.com", "", "", void 0);
//     },
//     img: function(e) {
//         redirect(
//             "https://google.com",
//             "/search?tbm=isch&q=",
//             void 0,
//             encodeArgs(e)
//         );
//     },
//     i: function(e) {
//         var t = "https://inbox.google.com";
//         switch ((e = encodeArgs(e)).length) {
//             case 0:
//                 redirect(t);
//                 break;
//             case 1:
//                 "snoozed" == e[0] ?
//                     redirect(t + "/snoozed") :
//                     "done" == e[0] ?
//                     redirect(t + "/done") :
//                     redirect(t, "/search/", void 0, e);
//         }
//     },
//     k: function(e) {
//         redirect(
//             "https://keep.google.com",
//             "/#search/text=",
//             void 0,
//             encodeArgs(e)
//         );
//     },
//     tr: function(e) {
//         redirect("https://trello.com", "/search?q=", void 0, encodeArgs(e));
//     },
//     dict: function(e) {
//         redirect("dictionary.com", "/browse/", void 0, encodeArgs(e));
//     },
//     thes: function(e) {
//         redirect("thesaurus.com", "/browse/", void 0, encodeArgs(e));
//     },
//     help: function(e) {
//         redirect(
//             "https://github.com/koryschneider/mintab/blob/master/doc/commands.md",
//             void 0,
//             void 0,
//             void 0, !0
//         );
//     },
//     set: function(e) {},
// };