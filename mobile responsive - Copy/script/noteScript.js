var modal = document.getElementById('popUp');
var span = document.getElementById('close');
//var locl = "{'classNames':[{'className':'IT321-9351A-11:00'},{'className':'IT321-9351A-11:00'},{'className':'IT322-9351B-10:30'}]}"
//locl = locl.replace(/'/g,"\"");
//localStorage.setItem("classNames",locl);
function readFromLocalStorage2(){

		if(!checkLocalStorage){
			document.getElementById("classTitle");
		}
		var courses = JSON.parse(localStorage.getItem("Courses"));
		console.log(courses);
		if(courses.length != 0){
			for(var count = 0; count < courses.length; count++){
				var courseObj = courses[count];
				var courseKey = courseObj.CourseKey;
				var opt = document.createElement("option");
				document.getElementById("classDisSelect").append(opt);
				console.log(opt);
				console.log(document.getElementById("rrg"));
				document.getElementById("classDisSelect").append(opt);
				document.getElementById("classDisSelect").lastChild.innerHTML = courseKey;
			}
		}
	}
	readFromLocalStorage2();
	

 	//Fail safe
	function readFromLocalStorage(){

		if(!checkLocalStorage){
			document.getElementById("classTitle");
		}
		var courses = JSON.parse(localStorage.getItem("Courses"));
		console.log(courses);
		if(courses.length != 0){
			for(var count = 0; count < courses.length; count++){
				var courseObj = courses[count];
				var courseKey = courseObj.CourseKey;
				var opt = document.createElement("option");
				console.log(opt);
				console.log(document.getElementById("rrg"));
				document.getElementById("classSelect").append(opt);
				document.getElementById("classSelect").lastChild.innerHTML = courseKey;
			}
		}
	}
	readFromLocalStorage();

	/**
		checkLocalStorage()
			-Checks if there are current entries inthe local storage realted to the different
			classes. If there are return true, if there are none return false.
	*/
	function checkLocalStorage(){
		var courses = JSON.parse(localStorage.getItem("Courses"));
		if(courses.length == undefined || courses.length == 0){
			return false;
		}else{
			return true;
		}
	}	

function dispNotes() {
    if (localStorage.getItem("Notes") === null) {
        document.getElementById("disNotes").innerHTML = "<h2>There are no posted notes</h2>"
    }
    var lclStrg = localStorage.getItem("Notes");
    notesJ = JSON.parse(lclStrg);

    if (notesJ.notes.length === 0) {
        document.getElementById("disNotes").innerHTML = "<h2>There are no posted notes</h2>"
    }
    notesJ = JSON.parse(lclStrg);

    for (var i = notesJ.notes.length - 1; i >= 0; i--) {
        let tit = notesJ.notes[i].descTitle;
        let clss = notesJ.notes[i].class;
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
        hotmail = "<div class='note'><h3>" + tit + "</h3><h4>" + clss + "</h4><div id='remSect'><p><span>Reminder: </span><span>" + rem + "</span></p></div><p>" + desc + "</p><input type='button' name='Delet' value='Delete' onclick='deletNote(" + i + ")'></div>";
        hotmail = hotmail.replace(/'/g, "\"");
        document.getElementById("disNotes").innerHTML += hotmail;
    }
    var len = document.getElementsByClassName("note").length;
}
dispNotes();


function deletNote(indx) {
    var strg = localStorage.getItem("Notes");
    strg = JSON.parse(strg);
    strg.notes.splice(indx, 1);
    strgS = JSON.stringify(strg);
    console.log(strgS);
    localStorage.setItem("Notes", strgS);
    while (document.getElementById("disNotes").firstChild) {
        document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
    }

    dispNotes();
}

function showDaTi() {
    var spanWhen = document.getElementById("dtSect");
    if (document.getElementById("noteDet").yes.checked == false) {
        spanWhen.style = 'display:none';
    } else {
        spanWhen.style = 'display:block';
    }
}

showDaTi();

function addNotes() {
    if (document.getElementById("noteDet").yes.checked == true && document.getElementById("noteDet").dateTime.value == "") {
        document.getElementById("disNotes").innerHTML = "You have to enter date and time!";
    } else {

        if (localStorage.getItem("Notes") === null) {
            var nNote = "{'notes':[]}";
            nNote = nNote.replace(/'/g, "\"");
            localStorage.setItem("Notes", nNote);
        }

        var title = document.getElementById("noteDet").tit.value;
        if (document.getElementById("noteDet").tit.value == "") {
            title = "None";
        }
        var watClass = document.getElementById("classSelect").options[document.getElementById("classSelect").selectedIndex].value;
        var desc = document.getElementById("tArea").value;
        desc = desc.replace(/\n/g, ' &#10; &#13; ');
        var remBool;
        if (document.getElementById("noteDet").yes.checked == true) {
            remBool = true;
        } else {
            remBool = false;
        }
        var remDate = document.getElementById("noteDet").dateTime.value;
        console.log(remDate);
        var newNote = "{'descTitle':'" + title + "','description':'" + desc + "','class':'" + watClass + "','rem':{'alert':'" + remBool + "','dateT':'" + remDate + "'}}";
        newNote = newNote.replace(/'/g, "\"");
        console.log(newNote);
        newNoteJ = JSON.parse(newNote);
        var savedNote = JSON.parse(localStorage.getItem("Notes"));
        savedNote.notes.push(newNoteJ);
        savedNote = JSON.stringify(savedNote);
        localStorage.setItem("Notes", savedNote);
        while (document.getElementById("disNotes").firstChild) {
            document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
        }

        document.getElementById("noteDet").reset();
        document.getElementById("alertLine").innerHTML = "";
        showDaTi();
        dispNotes();

    }
}

function showDaTi() {
    var spanWhen = document.getElementById("dtSect");
    if (document.getElementById("noteDet").checkboxTwoInput.checked == false) {
        spanWhen.style = 'display:none';
    } else {
        spanWhen.style = 'display:block';
    }
}

showDaTi();

span.onclick = function() {
    modal.style.display = "none";
    note.notes[indx].rem.alert = false;
    console.log(note.notes[indx].rem)
    localStorage.setItem("Notes", note);
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

function displayByClass(){
	 while (document.getElementById("disNotes").firstChild) {
            document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
        }
  
	var choice = document.getElementById("classDisSelect").options[document.getElementById("classDisSelect").selectedIndex].value;
	console.log(choice);
    var lclStrg = localStorage.getItem("Notes");
    notesJ = JSON.parse(lclStrg);
    var count=0;

    for (var i = notesJ.notes.length - 1; i >= 0; i--) {
    	if(notesJ.notes[i].class == choice){
	        var tit = notesJ.notes[i].descTitle;
	        var clss = notesJ.notes[i].class;
	        if(notesJ.notes[i].description == "") {
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
	        hotmail = "<div class='note'><h3>" + tit + "</h3><h4>" + clss + "</h4><div id='remSect'><p><span>Reminder: </span><span>" + rem + "</span></p></div><p>" + desc + "</p><input type='button' name='Delet' value='Delete' onclick='deletNote(" + i + ")'></div>";
	        hotmail = hotmail.replace(/'/g, "\"");
	        document.getElementById("disNotes").innerHTML += hotmail;
	        count++;
   	 	}
    }
    if(count == 0){
    	document.getElementById("disNotes").innerHTML = "<h2>There are no posted notes for this class</h2>";
    }
    if(choice == "None"){
    	while (document.getElementById("disNotes").firstChild) {
            document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
        }
    	dispNotes();
    }
}

