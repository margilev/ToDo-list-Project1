
var arr = []

//canvas clock begin//
var canvas = document.getElementById("Clock");
var ctx = canvas.getContext("2d");

var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
drawClock();
setInterval(drawClock, 1000);

function drawClock() {
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#652001');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#652001');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#652001';
    ctx.fill();
}
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}
function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
  //canvas clock end//

function backUp() {

    var backup = JSON.parse(localStorage.getItem("arr"));

    if (backup.length > 0) {
        arr = backup;
    }

    for (var i = 0; i < backup.length; i++) {
        var container = document.getElementById("taskcontainer");
        var card = document.createElement("div");

        card.className = "taskcard";
        card.innerHTML = "<span class='taskstyle'>" + backup[i].task + "</span>" + "<span class='datestyle'>" + backup[i].date + "</span>" + "<span class='hourstyle'>" + backup[i].hour + "</span>" + "<i class='fas fa-times iconstyle' onclick='this.parentElement.remove();deletenote(" + backup[i].id + ")'>" + "</i>";

        container.append(card);
    }

}
backUp();

function creatList(task, date, hour) {
    var obj = {
        task: task,
        date: date,
        hour: hour
    }
    return obj;
}

function mandatoryCheck(task, date) {
    //checking date-validation//
    var GivenDate = document.forms["main-list"]["main_input_date"].value;
    var CurrentDate = new Date();
    GivenDate = new Date(GivenDate);

    if (task == "") {
        alert("Please enter your task");
        return false;
    }
    else if (date == "") {
        alert("please fill in the date");
        return false;
    }
    //checking date-validation//
    else if (GivenDate < CurrentDate) {
        alert("The date has passed");
    } else {
        return true;
    }
}

function addToArr() {
    var task = document.forms["main-list"]["main_input_task"].value;
    var date = document.forms["main-list"]["main_input_date"].value;
    var hour = document.forms["main-list"]["main_input_hour"].value;
    var id = Math.floor(Math.random() * 1000000);

    if (mandatoryCheck(task, date) == true) {
        arr.push(creatList(task, date, hour));
        localStorage.setItem("arr", JSON.stringify(arr));
        var taskIndex = arr.length - 1;

        var card = document.createElement("div");
        var container = document.getElementById("taskcontainer");

        card.className = "taskcard";
        card.innerHTML = "<span class='taskstyle'>" + arr[taskIndex].task + "</span>" + "<span class='datestyle'>" + arr[taskIndex].date + "</span>" + "<span class='hourstyle'>" + arr[taskIndex].hour + "</span>" + "<i class='fas fa-times iconstyle' onclick='this.parentElement.remove();deletenote(" + id + ")'>" + "</i>";

        container.append(card);
        var task = document.forms["main-list"]["main_input_task"].value = "";
        var date = document.forms["main-list"]["main_input_date"].value = "";
        var hour = document.forms["main-list"]["main_input_hour"].value = "";
    }

}

function clearList() {

    document.forms["main-list"]["main_input_task"].value = "";
    document.forms["main-list"]["main_input_date"].value = "";
    document.forms["main-list"]["main_input_hour"].value = "";

}


function deletenote(id) {

    var x = arr.findIndex(function(task) {
        return task.id == id
    })

    if (x !== -1) {
        arr.splice(x, 1);
        localStorage.setItem("arr", JSON.stringify(arr));
    }
}
