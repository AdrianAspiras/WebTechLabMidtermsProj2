
var modal = document.getElementById("disPopUp");
var span = document.getElementById("close");
var indx;


function remindNow(){
		var lcl = localStorage.getItem("Notes")
		var note = JSON.parse(lcl);
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		var hr = today.getHours();
		var min = today.getMinutes();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		if(min<10){
		    min='0'+min;
		} 
		var today = "'"+yyyy+"-"+mm+"-"+dd+"T"+hr+":"+min+"'";
			today = today.replace(/'/g,"\"");
		console.log(JSON.stringify(note.notes));
		console.log(today);
		for (var i = note.notes.length - 1; i >= 0; i--) {
			if(note.notes[i].rem.alert == "true" && JSON.stringify(note.notes[i].rem.dateT) == today){
					let tit = note.notes[i].descTitle;
					let clss = note.notes[i].class;
					let desc = note.notes[i].description;
					hotmail =  "<h3>Title"+tit+"</h3><h4>Class"+clss+"</h4><p>Description:"+desc+"</p>";
					hotmail = hotmail.replace(/'/g,"\"");
					document.getElementById("remCont").innerHTML = hotmail;
					modal.style = 'display:block';
					indx = i;
			}
		}
		
	}
	
remindNow();

	span.onclick = function() {
		var lcl = localStorage.getItem("Notes")
		var note = JSON.parse(lcl);
	    modal.style.display = "none";
	    note.notes[indx].rem.alert = false;
		console.log(note.notes[indx].rem)
		note = JSON.stringify(note);
		localStorage.setItem("Notes",note);
	}
