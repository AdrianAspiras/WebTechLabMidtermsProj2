	//notes = "{'notes':[{'descTitle':'Missed Topics','description':'- Farleigh is gay','class':'IT322-MWF(10:30-11:30)-9351B','rem':{'alert':'false','dateT':'2017-04-11T18:45'}},{'descTitle':'Missed Topics','description':'- Farleigh is still gay', 'class':'IT321-MWF(11:30-12:30)-9351A','rem':{'alert':'false','dateT':'2017-04-11T18:45'}}]}";
	//notes = notes.replace(/'/g,"\"");
	//notesJ = JSON.parse(notes);
	//localStorage.setItem("Notes",notes);
	var modal = document.getElementById('popUp');
	var span = document.getElementById('close');
	var locl = "{'classNames':[{'className':'IT321-9351A-11:00'},{'className':'IT321-9351A-11:00'},{'className':'IT322-9351B-10:30'}]}"
		locl = locl.replace(/'/g,"\"");
	localStorage.setItem("classNames",locl);
	 document.getElementById("dtSect").style = "display:none";

	function appendList(){
			//var classes = "{'classNames':[{'cName':'geishit'},{'cName':'izreligei'}]}";
			    //classes = classes.replace(/'/g,"\""); 
			//var classNem = JSON.parse(classes);
			var classNem = JSON.parse(localStorage.getItem("classNames"));
			console.log(classNem.classNames.length)
			for(var count = 0; count < classNem.classNames.length; count++){
				var opt = document.createElement("option");
				document.getElementById("classSelect").append(opt);
				document.getElementById("classSelect").lastChild.innerHTML += classNem.classNames[count].className;			
			}
	}

	appendList();

	function dispNotes(){
		if (localStorage.getItem("Notes") === null)  {
 			document.getElementById("disNotes").innerHTML = "<h2>There are no posted notes</h2>"
 		}
 		var lclStrg = localStorage.getItem("Notes");
 		notesJ = JSON.parse(lclStrg);

 		if (notesJ.notes.length === 0)  {
 			document.getElementById("disNotes").innerHTML = "<h2>There are no posted notes</h2>"
 		}
		notesJ = JSON.parse(lclStrg);

	for (var i = notesJ.notes.length - 1; i >= 0; i--) {
		let tit = notesJ.notes[i].descTitle;
		let clss = notesJ.notes[i].class;
		if(notesJ.notes[i].description == ""){
			desc = "No Description";
		} else {
			desc = notesJ.notes[i].description;
		}
		
		var rem;
		if(notesJ.notes[i].rem.alert == "true"){
			rem = notesJ.notes[i].rem.dateT.replace("T", " ");
		} else {
			rem = 'None';
		}
		hotmail =  "<div class='note'><h3>"+tit+"</h3><h4>"+clss+"</h4><div id='remSect'><p><span>Reminder: </span><span>"+rem+"</span></p></div><p>"+desc+"</p><input type='button' name='Delet' value='Delete' onclick='deletNote("+i+")'></div>";
		hotmail = hotmail.replace(/'/g,"\"");
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


	function deletNote(indx){
		var strg = localStorage.getItem("Notes");
		strg = JSON.parse(strg);
		strg.notes.splice(indx,1);
		strgS = JSON.stringify(strg);
		console.log(strgS);
		localStorage.setItem("Notes",strgS);
		while(document.getElementById("disNotes").firstChild){
			document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
		}

		dispNotes();
	}


	function addNotes(){
		if(document.getElementById("noteDet").yes.checked == true && document.getElementById("noteDet").dateTime.value == ""){
			document.getElementById("alertLine").innerHTML = "You have to enter date and time!";
			document.getElementById("addNoots").style = "display:none";
		}else {
			
			if (localStorage.getItem("Notes") === null)  {
	 			var nNote = "{'notes':[]}";
	 				nNote = nNote.replace(/'/g,"\"");
	 			localStorage.setItem("Notes",nNote);
	 			}
	 		
			var title = document.getElementById("noteDet").tit.value;
				if(document.getElementById("noteDet").tit.value == ""){
					title = "None";
				}
			var watClass = document.getElementById("classSelect").options[document.getElementById("classSelect").selectedIndex].value;
			var desc = document.getElementById("tArea").value;
				desc = desc.replace(/\n/g,' &#13;&#10; ');
			var remBool;
				if(document.getElementById("noteDet").yes.checked == true){
					remBool = true;
				} else {
					remBool = false;
				}
			var remDate = document.getElementById("noteDet").dateTime.value;
			console.log(remDate);
			var newNote = "{'descTitle':'"+title+"','description':'"+desc+"','class':'"+watClass+"','rem':{'alert':'"+remBool+"','dateT':'"+remDate+"'}}";
				newNote = newNote.replace(/'/g,"\"");
			console.log(newNote);
			newNoteJ = JSON.parse(newNote);
			var savedNote = JSON.parse(localStorage.getItem("Notes"));
			savedNote.notes.push(newNoteJ);
			savedNote = JSON.stringify(savedNote);
			localStorage.setItem("Notes",savedNote);
			while(document.getElementById("disNotes").firstChild){
				document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
			}

			document.getElementById("noteDet").reset();
			document.getElementById("alertLine").innerHTML = "";
			showDaTi();
			dispNotes();

		}
	}

	function showDaTi(){
		var spanWhen = document.getElementById("dtSect"); 
		if(document.getElementById("noteDet").yes.checked == false){
			spanWhen.style ='display:none';
		} else {
			spanWhen.style ='display:block';
		}
	}

	span.onclick = function() {
	    modal.style.display = "none";
	    note.notes[indx].rem.alert = false;
		console.log(note.notes[indx].rem)
		localStorage.setItem("Notes",note);
	}


