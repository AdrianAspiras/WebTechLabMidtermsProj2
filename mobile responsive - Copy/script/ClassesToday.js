classesToday();
function classesToday(){
	var dateToday = new Date();
	var dayToday = dateToday.getDay();
	var classes = JSON.parse(localStorage.getItem("Courses"));
	console.log(classes);
	var day = "";
	switch(dayToday){
		case 0:
			day = "Sun";
			break;
		case 1:
			day = "Mon";
			break;
		case 2:
			day = "Tue";
			break;
		case 3:
			day = "Wed";
			break;
		case 4:
			day = "Thu";
			break;
		case 5:
			day = "Fri";
			break;
		case 6:
			day = "Sat";
			break;
	}
	console.log(day);
	hasClass = false;
	document.getElementById("ClassesToday").innerHTML = "<h3> " + " Your Classes Today "; 
	for(var count = 0; count < classes.length; count++){
		var course = JSON.parse(localStorage.getItem(classes[count].CourseKey));
		console.log(course.Days.indexOf(day));
		if(course.Days.indexOf(day) != - 1){
			document.getElementById("ClassesToday").innerHTML += "<h3> " + course.classCode + " " + course.CourseStartT + " at " + course.Room;
			hasClass = true;
		}		
	}

	if(!hasClass){
		document.getElementById("ClassesToday").innerHTML = "<h3> You have no classes today!";
		}

	setInterval(classesToday,4320000000);
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
    if (localStorage.getItem("Notes") == null) {
        document.getElementById("dispRemNotes").innerHTML = "<h2>There are no reminders</h2>"
    }
    var lclStrg = localStorage.getItem("Notes");
    notesJ = JSON.parse(lclStrg);

    if (notesJ.notes.length == 0) {
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

        
        }
        if (count == 0) {
        document.getElementById("dispRemNotes").innerHTML = "<h2>There are no reminders posted</h2>"
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
