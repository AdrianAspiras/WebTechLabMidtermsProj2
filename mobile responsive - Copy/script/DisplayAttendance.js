 	//Fail safe
 	readFromLocalStorage();
 	displayAttendance();
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







	/**
		showAttendance()
			-Displays the current log of attendances in the class in the console
	*/
	function showAttendance(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));

		var attendanceKey = "attendance-" + index;
		var attendanceStorage = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(attendanceStorage);
	}


	/**
		displayAttendance()
			-Displays those who are absent and/or tardy during the selected date.
	*/
	function displayAttendance(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var attendanceKey = "attendance-" + index;
		var date = document.getElementById("DateSelect");
		var dateVal = date.options[date.selectedIndex].value;
		var attObj = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(attObj[0].Absent);
		for(var count = 0; count < attObj.length; count++){
			if(dateVal == attObj[count].Date){
				console.log(attObj[count].Absent.length);
				document.getElementById("AttBody").innerHTML = "<h4> " + "Absentees";
				for(var count2 = 0; count2 < attObj[count].Absent.length; count2++){
					var attbod = document.getElementById("AttBody");
					console.log(attbod);
					console.log(attObj[count].Absent[count2].Name);
					if(count2 == 0)
						document.getElementById("AttBody").innerHTML +=  "<p> " + attObj[count].Absent[count2].Name + " </p>";
					else
						document.getElementById("AttBody").innerHTML +=  "<p> " + attObj[count].Absent[count2].Name + " </p>";
 				}
				
				var attbod = document.getElementById("AttBody");
				attbod.innerHTML += "<h4> Tardy";
				if(attObj[count].Tardy.length == 0){
 						attbod.innerHTML += "<h5> There are no tardy people for today";
 				}else{
	 				for(var count3 = 0; count3 < attObj[count].Tardy.length; count3++){
	 						attbod.innerHTML += "<h5> " + attObj[count].Tardy[count3].Name;
	 				}
	 			}

 				break;
			}
		}
	}

	/**
		displayStudAttendance()
			-Displays the dates in which the student was absent.
	*/
	function displayStudAttendance(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var studLogKey = "studLog-" + index;
		//get the value highlighted in the box
		var student = document.getElementById("DateSelect");
		var studVal = student.options[student.selectedIndex].value;
		var studIdNum = studVal.substr(studVal.indexOf('-')+1,studVal.length)
		var logObj = JSON.parse(localStorage.getItem(studLogKey));
		for(var count = 0; count < logObj.length; count++){
			var docBody = document.getElementById("AttBody");
			if(logObj[count].ID == studIdNum){

				docBody.innerHTML = "<h3> Absences";
				var absences = logObj[count].Absents;
				var tardy = logObj[count].Tardy;
				console.log(absences.length);
				console.log(tardy.length);
				for(var count2 = 0; count2 < absences.length; count2++){
					var absentDate = logObj[count].Absents[count2];
					docBody.innerHTML += "<h5> " + absentDate;
				}

				docBody.innerHTML += "<h3> Tardy ";
				for(var count3 = 0; count3 < tardy.length; count3++){
					var tardyDate = logObj[count].Absents[count3];
					docBody.innerHTML += "<h5> " + tardyDate;
				}
			
				break;
			}

		}

	}


/**
		selectSortingType()
			- used to blah blah blah blah
	*/
	function selectSortingType(){
		var date = document.getElementById("dateSort");
		var stud = document.getElementById("studSort");
		console.log("Dito dapat palagi dadaan");
		if(date.checked == true){
			clearDateDrop();
			fillDateDrop();
			document.getElementById("DateSelect").setAttribute("onchange","displayAttendance()");
			displayAttendance();
		}

		if(stud.checked == true){
			//Remember to change the value of the onchange() attribute for the drop down
			clearDateDrop();
			fillStudDrop();
			document.getElementById("DateSelect").setAttribute("onchange","displayStudAttendance()")
			displayStudAttendance();
		}
	}

	/**
		fillStudDrop()
			-CONTINUE THIS DEFINITION
	*/
	function fillStudDrop(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var studLog = "studLog-" + index;
		var studObj = JSON.parse(localStorage.getItem(studLog));
		console.log(studObj[0].Absents.length);
		console.log(studObj);
		console.log("Dito Ba Dadaan?")
		for(var count = 0; count < studObj.length; count++){
			var studName = studObj[count].Name;
			var studId = studObj[count].ID;
			var opt = studName + "-" + studId; 
			if(studObj[count].Absents.length != 0 || studObj[count].Tardy.length != 0){
				console.log("Dadaan ba dito?");
				if(count == 0){
					document.getElementById("DateSelect").innerHTML = "<option> " + opt;
				}
				else{
				  document.getElementById("DateSelect").innerHTML += "<option> " + opt;
				}
			}
		}
	

	}


		/**
		fillDateDrop()
			-Populates the date drop down box with the dates by which there were absentees and/or people
			who were tardy.
	*/
	function fillDateDrop(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var attendanceKey = "attendance-" + index;
		var arr = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(arr[0]);
		if(arr.length == 0){
			clearDateDrop();
			clearAttBody();
		}
		for(var count = 0; count < arr.length; count++){
			var date = arr[count].Date;
			var list = document.getElementById("DateSelect");
			console.log("This should appear");
			if(count == 0){
				list.innerHTML = "<option> " + date;
			}
			else{
				list.innerHTML += "<option> " + date;
			}
		}

	}

	function clearDateDrop(){
		document.getElementById("DateSelect").innerHTML = "";
	}

	function clearAttBody(){
		document.getElementById("AttBody").innerHTML = "";
	}