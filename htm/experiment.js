let menuOneItems = ["Option1a", "Option2c", "Option4d", "Option5e", "Option1e", "Option3c", "Option4a", "Option2a", "Option2b", "Option3b"];
let menuTwoItems = [];
let menuThreeItems = ["Option 2d", "Option 1e", "Option 2c", "Option 5a", "Option 4e", "Option 3b", "Option 5a", "Option 1d", "Option 4c", "Option 4a"];
var taskNumber = 0;
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
        taskNumber++;
        document.getElementById("task").innerHTML = "Task: " + menu[taskNumber];
        createStartDialog();
        document.getElementById("task2").innerHTML = "Task: " + menu[taskNumber];
    } else {
        getFinalTime();
        if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=1'))) {
            document.cookie = "menuOneTimes=" + menuTimes;
            window.location.href = "menu2.html";
        } else if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=2'))) {
            document.cookie = "menuTwoTimes=" + menuTimes;
            window.location.href = "menu3.html";
        } else if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=3'))) {
            document.cookie = "menuThreeTimes=" + menuTimes;
            createEndDialog();
            // send data to mongo db here 
        }
    }
}

function setMenuCookie(currentMenu) {
    document.cookie = "currentMenuCookie=" + currentMenu;
}

// create dialog box for starting the experiment
//https://metroui.org.ua/dialog.html 
function createStartDialog(task) {
    Metro.dialog.create({
        title: "Start Experiment",
        content: "<h3 id=\"task2\">Find:" + task + "</h3>",
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
