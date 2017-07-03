/**
 * Created by Gerwa on 2017/7/1.
 */

const answer_str = `n+e和他的小伙伴 v3.0

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

Final Test

Part 1
CBAAC BCCBD ABAAD BAADA CDACB
BDACD ACADB ADBAD CCBAC BDBCD

Part 2,3
BCABD DBCCA DCCAA DABDB CCBAC
BADBC DCDAB
`;

function getCurrentUnitandChapter() {
    let index;
    let currentUnit;
    {
        const opened_chapter = document.getElementsByClassName("chapter is-open")[0];
        const ul = opened_chapter.getElementsByTagName("ul")[0];
        const list = ul.getElementsByTagName("li");
        const active_li = ul.getElementsByClassName("active graded")[0];

        index = 0;
        while (list[index] !== active_li) {
            index++;
        }
        currentUnit = index + 1;
    }

    let currentChapter;
    {
        const navs = document.getElementsByTagName("nav");
        let nav = null;
        for (let i = 0; i < navs.length; i++) {
            if (navs[i].getAttribute("aria-label") === "课程导航") {
                nav = navs[i];
                break;
            }
        }
        const divs = nav.getElementsByTagName("div");

        index = 0;
        while (divs[index].getAttribute("class") !== "chapter is-open") {
            index++;
        }
        currentChapter = index; //有个线下课程一章
    }
    return [currentUnit, currentChapter];
}

function answer_problems() {

    let currentUnit, currentChapter;
    [currentUnit, currentChapter] = getCurrentUnitandChapter();

    console.log("now we are at Chapter " + currentChapter + ", Unit " + currentUnit);

    let problem = document.getElementsByClassName("problem")[0];
    if (!problem) {
        return; // in case there is no problem
    }
    const choicegroup = problem.getElementsByClassName("choicegroup capa_inputtype");

    const ChapterStart = answer_str.indexOf("Unit " + currentChapter);
    let curPos = answer_str.indexOf(currentUnit + ".", ChapterStart);

    for (let i = 0; i < choicegroup.length; i++) {
        const current_problem = choicegroup[i];
        const inputs = current_problem.getElementsByTagName("input");
        while (true) {
            curPos++;
            const ch = answer_str.charCodeAt(curPos);
            if (ch >= 65 && ch <= 65 + 7) {// there is a choice 'G'
                inputs[ch - 65].checked = true;
                console.log("Problem " + (i + 1) + ": " + String.fromCharCode(ch));
                break;
            }
        }
    }
    const submit_btn = document.getElementsByClassName("check 提交")[0];
    submit_btn.click();
}


function open_next() {
    const opened_chapter = document.getElementsByClassName("chapter is-open")[0];
    const ul = opened_chapter.getElementsByTagName("ul")[0];
    const list = ul.getElementsByTagName("li");
    let active_li = ul.getElementsByClassName("active graded")[0];

    let index = 0;
    while (list[index] !== active_li) {
        index++;
    }

    if (index === list.length - 1) {
        console.log("this is the last unit!");
        open_nextChapter();
    } else {
        let next = list[index + 1];
        console.log(typeof active_li);
        console.log(typeof next);
        const nextA = next.getElementsByTagName("a")[0];
        nextA.click();
    }
}

function open_nextChapter() {
    const Navs = document.getElementsByTagName("nav");
    let nav = null;
    for (let i = 0; i < Navs.length; i++) {
        if (Navs[i].getAttribute("aria-label") === "课程导航") {
            nav = Navs[i];
            break;
        }
    }
    const divs = nav.getElementsByTagName("div");

    let index = 0;
    while (divs[index].getAttribute("class") !== "chapter is-open") {
        index++;
    }

    if (index === divs.length) {
        console.log("This is the last chapter!");
    } else {
        const nextChapter = divs[index + 1];
        const nextChapterh3 = nextChapter.getElementsByTagName("h3")[0];
        const nextChapterA = nextChapterh3.getElementsByTagName("a")[0];
        nextChapterA.click();


        const ul = nextChapter.getElementsByTagName("ul")[0];
        const firstLi = ul.getElementsByTagName("li")[0];
        const nextA = firstLi.getElementsByTagName("a")[0];
        nextA.click();
    }
}

let curPos;

function completeFinalTest() {
    console.log("now we are at final test!");
    curPos = answer_str.indexOf("Final Test");
    completePage();
}

function addClickEvent(btn, func) {
    const oldonload = btn.onclick;
    if (typeof btn.onclick !== 'function') {
        btn.onclick = func;
    } else {
        btn.onclick = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

function completePage() {
    const problem = document.getElementsByClassName("problem")[0];
    const choicegroup = problem.getElementsByClassName("choicegroup capa_inputtype");

    for (let i = 0; i < choicegroup.length; i++) {
        const current_problem = choicegroup[i];
        const inputs = current_problem.getElementsByTagName("input");
        while (true) {
            curPos++;
            const ch = answer_str.charCodeAt(curPos);
            if (ch >= 65 && ch <= 65 + 7) {// there is a choice 'G'
                inputs[ch - 65].checked = true;
                console.log("Problem " + (i + 1) + ": " + String.fromCharCode(ch));
                break;
            }
        }
    }
    const submit_btn = document.getElementsByClassName("check 最终提交")[0];
    alert("Final test 只能提交一次！请确认无误后手动点击最终提交");
    addClickEvent(submit_btn, openNextTab);
    //submit_btn.click();
}

function openNextTab() {
    const orderlist = document.getElementById("sequence-list");
    const arr_li = orderlist.getElementsByTagName("li");
    let index = 0;
    while (true) {
        const link = arr_li[index].getElementsByTagName("a")[0];
        if (link.getAttribute("aria-selected")) {
            break;
        }
        index++;
    }
    if (index === arr_li.length - 1) {
        console.log("Final test complete!");
    } else {
        const next_link = arr_li[index + 1].getElementsByTagName("a")[0];
        next_link.click();
        setTimeout(completePage, 500);
    }
}

let failure = 0;

function play_video() {
    let video = document.getElementsByTagName("video")[0];
    if (!video || video.readyState !== 4) {
        if (++failure > 10) {
            let currentUnit, currentChapter;
            [currentUnit, currentChapter] = getCurrentUnitandChapter();
            if (currentChapter === 9) {
                completeFinalTest();
                return;
            }
        }
        setTimeout(play_video, 100);
        return;
    }
    video.play();
    console.log("video is playing");
    video.onended = function () {
        console.log("video ended");
        const orderlist = document.getElementById("sequence-list");
        const arr_li = orderlist.getElementsByTagName("li");
        let index = 0;
        while (true) {
            const link = arr_li[index].getElementsByTagName("a")[0];
            if (link.getAttribute("aria-selected")) {
                break;
            }
            index++;
        }
        if (index === arr_li.length - 1) {
            answer_problems();
            open_next();
        } else {
            const next_link = arr_li[index + 1].getElementsByTagName("a")[0];
            next_link.click();
            setTimeout(play_video, 500);
        }
    }
}

console.log("script started");
play_video();