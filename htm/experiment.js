let menuOneItems = ["Option1a", "Option2c", "Option4d", "Option5e", "Option1e", "Option3c", "Option4a", "Option2a", "Option2b", "Option3b"];
let menuTwoItems = [];
let menuThreeItems = [];
var taskNumber = 0;
var currentMenu = 1;
var startTime;
var endTime;
var finalTime;
var menuOneTimes = [];
var menuTwoTimes = [];
var menuThreeTimes = [];

function getStartTimeSeconds() {
    var date = new Date();
    var time = date.getTime();
    startTime = time / 1000; // convert milliseconds to seconds
    document.getElementById("start_response").innerHTML = "Experiment Started"
}

function checkMenuItem(id, menu) {
    if(menu[taskNumber] == document.getElementById(id).innerHTML) {
        document.getElementById("start_response").innerHTML = "Correct"
        nextTask(menu);
    } else {
        document.getElementById("start_response").innerHTML = "Wrong"
    }
}

function getEndTimeSeconds() {
    var date = new Date();
    var time = date.getTime();
    endTime = time / 1000; // convert milliseconds to seconds
}

function getFinalTime() {
   finalTime = endTime - startTime;
   if (currentMenu == 1) {
        menuOneTimes.push(finalTime);
   } else if (currentMenu == 2) {
        menuTwoTimes.push(finalTime);
   } else {
       menuThreeTimes.push(finalTime);
   }
}

function nextTask(menu) {
    getEndTimeSeconds();
    if (taskNumber < 9) {
        getFinalTime();
        window.alert(finalTime);
        taskNumber++;
        document.getElementById("task").innerHTML = "Task " + menu[taskNumber];
    } else {
        getFinalTime();
        window.alert(finalTime);6
        if (currentMenu == 1) {
            currentMenu++;
            window.location.href = "menu2.html";
        } else {
            currentMenu++;
            window.location.href = "menu3.html";
        }
    }
}

