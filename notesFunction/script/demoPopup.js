
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
		if(hr<10){
		    hr='0'+hr;
		}
		var today = "'"+yyyy+"-"+mm+"-"+dd+"T"+hr+":"+min+"'";
			today = today.replace(/'/g,"\"");
		console.log(today);
		for (var i = note.notes.length - 1; i >= 0; i--) {
			console.log(note.notes[i].rem.dateT);
			if(note.notes[i].rem.alert == "true" && JSON.stringify(note.notes[i].rem.dateT) == today){
					var tit = notesJ.notes[i].descTitle;
					var clss = notesJ.notes[i].class;
					if(notesJ.notes[i].description == ""){
						desc = "No description" ;
					} else {
						desc = notesJ.notes[i].description;
					}
					/*desc = {
						body: desc,
						tag:'notification'
					}*/ 
					var rem;
					if(notesJ.notes[i].rem.alert == "true"){
						rem = notesJ.notes[i].rem.dateT.replace("T", " ");
					} else {
						rem = 'None';
					}
					Notify(tit, desc);
					//var notif = new notification(tit, options);
					hotmail =  "<h3>"+tit+"</h3><h4>"+clss+"</h4><div id='remSect'><p><span>Reminder: </span><span>"+rem+"</span></p></div><p>"+desc+"</p>";
					hotmail = hotmail.replace(/'/g,"\"");
					document.getElementById("remCont").innerHTML = hotmail;
					modal.style = 'display:block';
					indx = i;	  
					console.log(i);
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
		console.log(note.notes[indx].rem)
		note = JSON.stringify(note);
		localStorage.setItem("Notes",note);
	}

	
 var noty;
 var notification = window.Notification || window.mozNotification || window.webkitNotification;

	if ('undefined' === typeof notification)
	    alert('Web notification not supported');
	else
	    notification.requestPermission(function(permission){});

	function Notify(titleText, bodyText)
	{
	    if ('undefined' === typeof notification)
	        return false;
	    noty = new notification( titleText, {
	            body: bodyText,
	            tag: 'notificationPopup',
	            vibrate: [100, 300, 100, 100, 100]
	        }
	    );
	    noty.onclick = function () {
	        console.log('notification.Click');
	    };
	    noty.onclose = function () {
	        console.log('notification.Close');
	        var lcl = localStorage.getItem("Notes")
			var note = JSON.parse(lcl);
		    modal.style.display = "none";
		    note.notes[indx].rem.alert = false;
			console.log(note.notes[indx].rem)
			note = JSON.stringify(note);
			localStorage.setItem("Notes",note);
	    };
	    return true; 
	}