let menuOneItems = ["Sandwiches", "Ice Cream", "Milkshakes", "Contact", "Pie", "Pork", "Sides", "Locations", "Alcohol", "Other"];
let menuTwoItems = [];
let menuThreeItems = ["Option 2d", "Option 1e", "Option 2c", "Option 5a", "Option 4e", "Option 3b", "Option 5a", "Option 1d", "Option 4c", "Option 4a"];
let menuFourItems = ["Shirts", "Music", "Tvs", "Novels", "Shorts", "Online Books", "Computer Accessories", "Textbooks", "Cameras", "Games"];
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
        createStartDialog(menu[taskNumber]);
    } else {
        getFinalTime();
        if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=1'))) {
            document.cookie = "menuOneTimes=" + menuTimes;
            endOrNextMenu()
        } else if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=2'))) {
            document.cookie = "menuTwoTimes=" + menuTimes;
            endOrNextMenu()
        } else if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=3'))) {
            document.cookie = "menuThreeTimes=" + menuTimes;
            endOrNextMenu()
        } else if (document.cookie.split(';').some((item) => item.includes('currentMenuCookie=4'))) {
            document.cookie = "menuFourTimes=" + menuTimes;
            endOrNextMenu()
        }
    }
}

function readCookieArray(cookieName) {
    let arraystr = document.cookie.split('; ').find(row => row.startsWith(cookieName)).split('=')[1]; // get cookie value
    return arraystr.split(","); // to convert back into array
}

function endOrNextMenu() {
    menuPaths = document.cookie.split('; ').find(row => row.startsWith('menuPaths=')).split('=')[1];
    if (menuPaths.length === 0) {
        createEndDialog();
        sendData();
    } else {
        nextPage();
    }
}

function sendData() {
    // send data to mongo db here

    // read survey cookie
    let surveyData = readCookieArray("surveyData"); // to convert back into array

    // read 
    let times = ["menuOneTimes", "menuTwoTimes", "menuThreeTimes", "menuFourTimes"];
    times.map(name => readCookieArray(name));

    //Document for DB
    const userData = {
        age: surveryData[0],
        gender: surveryData[1],
        input_device: surveryData[2],
        experience: surveryData[3],
        m1_times: times[0],
        m2_times: times[1],
        m3_times: times[2],
        m4_times: times[3]
    };

    // MongoDB stuff
    import { MongoClient } from "mongodb";
    const uri = "mongodb+srv://edit_priveleges:ZoCqMsZBTZID1Zq6@hci-research-cluster.ym5a0.mongodb.net/UserDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    client.connect((err) => {
        const coll = client.db("UserDB").collection("Users");
        coll.insertOne(userData) // Insert Document hopefully
        client.close();
    });

}

function setMenuCookie(currentMenu) {
    document.cookie = "currentMenuCookie=" + currentMenu;
}

// create dialog box for starting the experiment
//https://metroui.org.ua/dialog.html 
function createStartDialog(task) {
    Metro.dialog.create({
        title: "Start Experiment",
        content: "<h3 id=\"task2\">Find: " + task + "</h3>",
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

// https://stackoverflow.com/questions/60662796/shuffle-array-in-js
function shuffle(arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function nextPage() {
    var menuPaths = document.cookie.split('; ').find(row => row.startsWith('menuPaths=')).split('=')[1];

    var splitMenuPaths = menuPaths.split(",");
    
    shuffledMenuPaths = shuffle(splitMenuPaths);

    nextMenu = shuffledMenuPaths.pop();

    document.cookie = "menuPaths=" + shuffledMenuPaths;

    window.location.href = nextMenu;
  }
