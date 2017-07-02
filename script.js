/**
 * Created by Gerwa on 2017/7/1.
 */

function answer_problems() {

    const answer_str = `n+e和他的小伙伴 v2.0

Unit 1
1. ADBDB
2. BBBBBBB
3. ADCDBA
4. BACCAC
5. AABBC CCDAA BBCCD DAABB BD
6. ABCB
7. ACBDA DBDAB
8. DCABC ABCDA C
9. ABDAB CDA


Unit 2
1. BABAB
2. BACD
3. DADADB
4. BABBDDC
5. ABBCC ABBDB CABCA BDC
6. ABCDDAB
7. ABDCA BBC
8. BCADB DBCAB ABD
9. BACACAD

Unit 3
1. BAAADCB
2. DAACA
3. ABCDA
4. ABCDA
5. ABCDA BACDA BCDAB CDA
6. ABCDA
7. BBDAB CDABC CDC
8. ABCBABA
9. CBADBCD

Unit 4
1. ABAA
2. ACABCA
3. BAAC
4. ABCDCBBA
5. ABBCD ABBBB EACCA CACAB CABDA
6. ABCDA
7. ADBDAB
8. ABCDB DABAA D
9. ABCCABA


Unit 5
1. ABCDA D
2. BBACA BABAC
3. ABCDA
4. AADCA
5. BAABC BCABB CD
6. DACAC
7. DADGA D
8. CAABA DBDA
9. ABCDA DAD

Unit 6
1. ADD
2. ABCD
3. CBDAB A
4. ADBAC
5. ADCAB CABCD ADBBC D
6. CBDA
7. EBAAD
8. AABCD AD
9. ABDDA BAC

Unit 7
1. ABCADA
2. ABCCDA
3. ABD
4. ACCBCD
5. ABCD ABCD ABCD B
6. CBDCBA
7. ABCDA
8. ABCAD CAB
9. ABCD ABCA

Unit 8
1. ABCDB
2. ADABBD
3. ABDACAC
4. ABCCDA
5. BABCD ABCAB BADBA
6. ADCCBDE
7. EDEBA
8. ABDAE ACBD
9. ABCDB ACA
`;

    var currentUnit = null;
    {
        var opened_chapter = document.getElementsByClassName("chapter is-open")[0];
        var ul = opened_chapter.getElementsByTagName("ul")[0];
        var list = ul.getElementsByTagName("li");
        var active_li = ul.getElementsByClassName("active graded")[0];

        var index = 0;
        while (list[index] !== active_li) {
            index++;
        }
        currentUnit = index + 1;
    }

    var currentChapter = null;
    {
        var navs = document.getElementsByTagName("nav");
        var nav = null;
        for (var i = 0; i < navs.length; i++) {
            if (navs[i].getAttribute("aria-label") === "课程导航") {
                nav = navs[i];
                break;
            }
        }
        var divs = nav.getElementsByTagName("div");

        var index = 0;
        while (divs[index].getAttribute("class") !== "chapter is-open") {
            index++;
        }
        currentChapter = index; //有个线下课程一章
    }
    console.log("now we are at Chapter " + currentChapter + ", Unit " + currentUnit);

    var problem = document.getElementsByClassName("problem")[0];
    if (!problem) {
        return; // in case there is no problem
    }
    var choicegroup = problem.getElementsByClassName("choicegroup capa_inputtype");

    var ChapterStart = answer_str.indexOf("Unit " + currentChapter);
    var UnitStart = answer_str.indexOf(currentUnit + ".", ChapterStart);
    var curPos = UnitStart;

    for (var i = 0; i < choicegroup.length; i++) {
        var current_problem = choicegroup[i];
        var inputs = current_problem.getElementsByTagName("input");
        while (true) {
            curPos++;
            var ch = answer_str.charCodeAt(curPos);
            if (ch >= 65 && ch <= 65 + 7) {// there is a choice 'G'
                inputs[ch - 65].checked = true;
                console.log("Problem " + (i + 1) + ": " + String.fromCharCode(ch));
                break;
            }
        }
    }
    var submit_btn = document.getElementsByClassName("check 提交")[0];
    submit_btn.click();
}


function open_next() {
    var opened_chapter = document.getElementsByClassName("chapter is-open")[0];
    var ul = opened_chapter.getElementsByTagName("ul")[0];
    var list = ul.getElementsByTagName("li");
    var active_li = ul.getElementsByClassName("active graded")[0];

    var index = 0;
    while (list[index] !== active_li) {
        index++;
    }

    if (index === list.length - 1) {
        console.log("this is the last unit!");
        open_nextChapter();
    } else {
        var next = list[index + 1];
        console.log(typeof active_li);
        console.log(typeof next);
        var nextA = next.getElementsByTagName("a")[0];
        nextA.click();
    }
}

function open_nextChapter() {
    var navs = document.getElementsByTagName("nav");
    var nav = null;
    for (var i = 0; i < navs.length; i++) {
        if (navs[i].getAttribute("aria-label") === "课程导航") {
            nav = navs[i];
            break;
        }
    }
    var divs = nav.getElementsByTagName("div");

    var index = 0;
    while (divs[index].getAttribute("class") !== "chapter is-open") {
        index++;
    }

    if (index === divs.length) {
        console.log("This is the last chapter!");
    } else {
        var nextChapter = divs[index + 1];
        var nextChapterh3 = nextChapter.getElementsByTagName("h3")[0];
        var nextChapterA = nextChapterh3.getElementsByTagName("a")[0];
        nextChapterA.click();


        var ul = nextChapter.getElementsByTagName("ul")[0];
        var firstLi = ul.getElementsByTagName("li")[0];
        var nextA = firstLi.getElementsByTagName("a")[0];
        nextA.click();
    }
}

function play_video() {
    var video = document.getElementsByTagName("video")[0];
    if (!video || video.readyState !== 4) {
        setTimeout(play_video, 1000);
        return;
    }
    video.play();
    console.log("video is playing");
    video.onended = function (s) {
        console.log("video ended");
        answer_problems();
        open_next();
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

console.log("script started");
play_video();