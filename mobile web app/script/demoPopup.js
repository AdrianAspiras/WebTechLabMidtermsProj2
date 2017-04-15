var modal = document.getElementById("disPopUp");
var span = document.getElementById("close");
var indx;


function remindNow() {

    var lcl = localStorage.getItem("Notes");
    var note = JSON.parse(lcl);
    var today = getDateToday();

    for (var i = note.notes.length - 1; i >= 0; i--) {
        if (note.notes[i].rem.alert == "true" && JSON.stringify(note.notes[i].rem.dateT) == today) {
            var tit = notesJ.notes[i].descTitle;
            var clss = notesJ.notes[i].class;
            if (notesJ.notes[i].description == "") {
                desc = "No description";
            } else {
                desc = notesJ.notes[i].description;
            }
            /*desc = {
						body: desc,
						tag:'notification'
					}*/
            var rem;
            if (notesJ.notes[i].rem.alert == "true") {
                rem = notesJ.notes[i].rem.dateT.replace("T", " ");
            } else {
                rem = 'None';
            }
            Notify(tit, desc);
            //var notif = new notification(tit, options);
            hotmail = "<h3>" + tit + "</h3><h4>" + clss + "</h4><div id='remSect'><p><span>Reminder: </span><span>" + rem + "</span></p></div><p>" + desc + "</p>";
            hotmail = hotmail.replace(/'/g, "\"");
            document.getElementById("remCont").innerHTML = hotmail;
            modal.style = 'display:block';
            indx = i;
        }
    }
    setTimeout(remindNow, 2000);
}

remindNow();

span.onclick = function() {
    var lcl = localStorage.getItem("Notes")
    var note = JSON.parse(lcl);
    modal.style.display = "none";
    note.notes[indx].rem.alert = false;
    note = JSON.stringify(note);
    localStorage.setItem("Notes", note);
}


var noty;
var notification = window.Notification || window.mozNotification || window.webkitNotification;

if ('undefined' === typeof notification)
    alert('Web notification not supported');
else
    notification.requestPermission(function(permission) {});

function Notify(titleText, bodyText) {
    if ('undefined' === typeof notification)
        return false;
    noty = new notification(titleText, {
        body: bodyText,
        tag: 'notificationPopup',
        vibrate: [100, 300, 100, 100, 100]
    });
    noty.onclick = function() {
        console.log('notification.Click');
    };
    noty.onclose = function() {
        console.log('notification.Close');
        var lcl = localStorage.getItem("Notes")
        var note = JSON.parse(lcl);
        modal.style.display = "none";
        note.notes[indx].rem.alert = false;
        note = JSON.stringify(note);
        localStorage.setItem("Notes", note);
    };
    return true;
}

function getDateToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    var hr = today.getHours();
    var min = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (hr < 10) {
        hr = '0' + hr;
    }
    var today = "'" + yyyy + "-" + mm + "-" + dd + "T" + hr + ":" + min + "'";
    today = today.replace(/'/g, "\"");

    return today;
}

function disRemNotes() {
    if (localStorage.getItem("Notes") === null) {
        document.getElementById("dispRemNotes").innerHTML = "<h2>There are no reminders</h2>"
    }
    var lclStrg = localStorage.getItem("Notes");
    notesJ = JSON.parse(lclStrg);

    if (notesJ.notes.length === 0) {
        document.getElementById("dispRemNotes").innerHTML = "<h2>There are no reminders</h2>"
    }

    
    notesJ = JSON.parse(lclStrg);
    var count = 0;
    var today = getDateToday();
        today = today.split(" ");
    for (var i = 0; i <= notesJ.notes.length - 1; i++) {
        
        var noteDet = notesJ.notes[i].rem.dateT.split(" ");
        if (today[0] <= noteDet[0] && notesJ.notes[i].rem.alert == "true") {
            var tit = notesJ.notes[i].descTitle;
            var clss = notesJ.notes[i].class;
            if (notesJ.notes[i].description == "") {
                desc = "No Description";
            } else {
                desc = notesJ.notes[i].description;
            }

            var rem;
            if (notesJ.notes[i].rem.alert == "true") {
                rem = notesJ.notes[i].rem.dateT.replace("T", " ");
            } else {
                rem = 'None';
            }
            hotmail = "<div class='note'><h3>" + tit + "</h3><h4>" + clss + "</h4><div id='remSect'><p><span>Reminder: </span><span>" + rem + "</span></p></div><p>" + desc + "</p><input type='button' name='Delet' value='Delete' onclick='deletRemNote(" + i + ")'></div>";
            hotmail = hotmail.replace(/'/g, "\"");
            document.getElementById("dispRemNotes").innerHTML += hotmail;
            count++;
        }

        if (count == 0) {
        document.getElementById("dispRemNotes").innerHTML = "<h2>There are no reminders posted</h2>"
    }

        }
    }

disRemNotes();

function deletRemNote(indx) {
    var strg = localStorage.getItem("Notes");
    strg = JSON.parse(strg);
    strg.notes.splice(indx, 1);
    strgS = JSON.stringify(strg);
    console.log(strgS);
    localStorage.setItem("Notes", strgS);
    while (document.getElementById("dispRemNotes").firstChild) {
        document.getElementById("dispRemNotes").removeChild(document.getElementById("dispRemNotes").firstChild);
    }

    disRemNotes();
}