	//notes = "{'notes':[{'descTitle':'Missed Topics','description':'- Farleigh is gay','class':'IT322-MWF(10:30-11:30)-9351B','rem':{'alert':'false','dateT':'2017-04-11T18:45'}},{'descTitle':'Missed Topics','description':'- Farleigh is still gay', 'class':'IT321-MWF(11:30-12:30)-9351A','rem':{'alert':'false','dateT':'2017-04-11T18:45'}}]}";
	//notes = notes.replace(/'/g,"\"");
	//notesJ = JSON.parse(notes);
	//localStorage.setItem("Notes",notes);
	var modal = document.getElementById('popUp');
	var span = document.getElementById('close');
	var locl = "{'classNames':[{'className':'IT321-9351A-11:00'},{'className':'IT321-9351A-11:00'},{'className':'IT322-9351B-10:30'}]}"
	locl = locl.replace(/'/g, "\"");
	localStorage.setItem("classNames", locl);
	document.getElementById("dtSect").style = "display:none";

var removeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';


	function appendList() {
	    //var classes = "{'classNames':[{'cName':'geishit'},{'cName':'izreligei'}]}";
	    //classes = classes.replace(/'/g,"\""); 
	    //var classNem = JSON.parse(classes);
	    var classNem = JSON.parse(localStorage.getItem("classNames"));
	    console.log(classNem.classNames.length)
	    for (var count = 0; count < classNem.classNames.length; count++) {
	        var opt = document.createElement("option");
	        document.getElementById("classSelect").append(opt);
	        document.getElementById("classSelect").lastChild.innerHTML += classNem.classNames[count].className;
	    }
	}

	appendList();

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
	        hotmail = "<div class='note'><h3>" + tit + "</h3><h4>" + clss + "</h4><div id='remSect'><p><span>Reminder: </span><span>" + rem + "</span></p></div><p>" + desc + "</p><button name='Delet' value='Delete' onclick='deletNote(" + i + ")'>"+ removeIcon +"</button></div>";
	        hotmail = hotmail.replace(/'/g, "\"");
	        document.getElementById("disNotes").innerHTML += hotmail;
	    }
	    var len = document.getElementsByClassName("note").length;
	    /*for (var i = len- 1; i >= 0; i--) {

	    		document.getElementsByClassName("note")[i].style = 'color:red;background-color:yellow';
	    }
	    document.getElementById("disNotes").style.backgroundColor = "black";
	    document.getElementById("disNotes").style.color = "white";
	    */
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
	        desc = desc.replace(/\n/g, ' &#13;&#10; ');
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
	        dispNotes();

	    }
	}

	function showDaTi() {
	    var spanWhen = document.getElementById("dtSect");
	    if (document.getElementById("noteDet").yes.checked == false) {
	        spanWhen.style = 'display:none';
	    } else {
	        spanWhen.style = 'display:block';
	    }
	}

	span.onclick = function () {
	    modal.style.display = "none";
	    note.notes[indx].rem.alert = false;
	    console.log(note.notes[indx].rem)
	    localStorage.setItem("Notes", note);
	}
