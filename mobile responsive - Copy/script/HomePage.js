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
