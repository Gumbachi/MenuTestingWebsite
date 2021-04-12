
function createSurveyCookie() {
    let age = document.getElementById("age");
    let gender = document.getElementById("gender");
    let controlDevice = document.getElementById("control_device");
    let computerExperience = document.getElementById("computer_experience");

    var surveyArray = [];

    surveyArray.push(age.value);
    surveyArray.push(gender.value);
    surveyArray.push(controlDevice.value);
    surveyArray.push(computerExperience.value);

    document.cookie = "surveyData=" + surveyArray;
    window.location.href = "instructions.html";
}  