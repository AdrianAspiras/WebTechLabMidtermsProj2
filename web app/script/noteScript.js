notes = "{'notes':[{'descTitle':'Missed Topics','description':'- Farleigh is gay','class':'IT322-MWF(10:30-11:30)-9351B'},{'descTitle':'Missed Topics','description':'- Farleigh is still gay', 'class':'IT321-MWF(11:30-12:30)-9351A'}]}";
	notes = notes.replace(/'/g,"\"");
	notesJ = JSON.parse(notes);
	localStorage.setItem("Notes",notes);

	function dispNotes(){
	notesJ = JSON.parse(localStorage.getItem("Notes"));
	console.log(notesJ.notes[0].descTitle);

	for (var i = notesJ.notes.length - 1; i >= 0; i--) {
		let tit = notesJ.notes[i].descTitle;
		let clss = notesJ.notes[i].class;
		let desc = notesJ.notes[i].description;
		hotmail =  "<div class='note'><h3>Title: "+tit+"</h3><h4>Class: "+clss+"</h4><p>Description: "+desc+"</p><div class='submitbut'><input type='button' class='button' name='Delet' value='Delete Note' onclick='deletNote("+i+")'></div></div>";
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

	
	function appendList(){
			var classes = "{'classNames':[{'cName':'geishit'},{'cName':'izreligei'}]}";
			    classes = classes.replace(/'/g,"\""); 
			var classNem = JSON.parse(classes);
			console.log(classNem.classNames.length)
			for(var count = 0; count < classNem.classNames.length; count++){
				var opt = document.createElement("option");
				document.getElementById("classSelect").append(opt);
				document.getElementById("classSelect").lastChild.innerHTML += classNem.classNames[count].cName;			
			}
	}
	appendList();
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
		if (localStorage.getItem("Notes") === null)  {
 			var nNote = "{'notes':[]}";
 				nNote = nNote.replace(/'/g,"\"");
 			localStorage.setItem("Notes",nNote);
 		}
		var title = document.getElementById("noteDet").tit.value;
		var watClass = document.getElementById("classSelect").options[document.getElementById("classSelect").selectedIndex].value;
		var desc = document.getElementById("tArea").value;
		var newNote = "{'descTitle':'"+title+"','description':'"+desc+"','class':'"+watClass+"'}";
			newNote = newNote.replace(/'/g,"\"");
		newNoteJ = JSON.parse(newNote);
		var savedNote = JSON.parse(localStorage.getItem("Notes"));
		savedNote.notes.push(newNoteJ);
		savedNote = JSON.stringify(savedNote);
		localStorage.setItem("Notes",savedNote);
		while(document.getElementById("disNotes").firstChild){
			document.getElementById("disNotes").removeChild(document.getElementById("disNotes").firstChild);
		}
		dispNotes();
	}

	function hsnote() {
	    let x = document.getElementById('addNoots');
	    if (x.style.display === 'none') {
	        x.style.display = 'block';
	    } else {
	        x.style.display = 'none';
	    }
	}