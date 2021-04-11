let menuOneItems = ["Option1a", "Option2c", "Option4d", "Option5e", "Option1e", "Option3c", "Option4a", "Option2a", "Option2b", "Option3b"];
let menuTwoItems = [];
let menuThreeItems = [];
var taskNumber = 0;
var currentMenu = 1;
var startTime;
var endTime;
var finalTime;
var menuTimes = [];

// get current time when clicking start button
function getStartTimeSeconds() {
    var date = new Date();
    var time = date.getTime();
    startTime = time / 1000; // convert milliseconds to seconds
}

// check if the menu item is the current task
// got to next task
function checkMenuItem(id, menu) {
    if(menu[taskNumber] == document.getElementById(id).innerHTML) {
        nextTask(menu);
    } 
}

// get the current time when correct menu item is clicked
function getEndTimeSeconds() {
    var date = new Date();
    var time = date.getTime();
    endTime = time / 1000; // convert milliseconds to seconds
}

// calculate final time
// add to menuTimes array
function getFinalTime() {
   finalTime = endTime - startTime;
   menuTimes.push(finalTime);
}

// go to next task
// send data to a cookie
// after all menus send cookies to db
function nextTask(menu) {
    getEndTimeSeconds();
    if (taskNumber < 9) {
        getFinalTime();
        window.alert(finalTime);
        taskNumber++;
        document.getElementById("task").innerHTML = "Task: " + menu[taskNumber];
        createStartDialog();
        document.getElementById("task2").innerHTML = "Task: " + menu[taskNumber];
    } else {
        getFinalTime();
        window.alert(finalTime);
        if (getCookie(currentMenuCookie) == ""){
            setCookie(currentMenuCookie, currentMenu, 1);
        }

        if (getCookie(currentMenuCookie) == 1) {
            setCookie(menuOneTimes, menuTimes, 1);
            currentMenu++;
            setCookie(currentMenuCookie, currentMenu, 1);
            window.location.href = "menu2.html";
        } else if (getCookie(currentMenuCookie) == 2) {
            setCookie(menuTwoTimes, menuTimes, 1);
            currentMenu++;
            setCookie(currentMenuCookie, currentMenu, 1);
            window.location.href = "menu3.html";
        } else {
            setCookie(menuThreeTimes, menuTimes, 1);
            createEndDialog();
            // send data to mongo db here 
        }
    }
}

// create dialog box for starting the experiment
//https://metroui.org.ua/dialog.html 
function createStartDialog() {
    Metro.dialog.create({
        title: "Start Experiment",
        content: "<h3 id=\"task2\">Find: Option1a</h3>",
        actions: [
            {
                caption: "Start",
                cls: "button primary large js-dialog-close",
                onclick: function() {
                    getStartTimeSeconds();
                }
            }
        ]
    });
}

// create dialog box after finishing the last menu
function createEndDialog() {
    Metro.dialog.create({
        title: "End of Experiment",
        content: "<h3>Thank You for participating</h3>",
        closeButton: true
    });
}

// functions to get and set cookies
//https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}