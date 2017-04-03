		var jsonFile;
		var students;
		/**
				Our previous AJAX function. Decided to move with new one named
				doOtherAjax()
		*/
		function doAjax(){
			var xhttp = new XMLHttpRequest();
			var url = "http://www.html1.com/students.json";
			var awef;
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					students = JSON.parse(this.responseText);
					console.log(students);
					localStorage.setItem("students",JSON.stringify(students));
				}
			};
			xhttp.open("GET",url,true);
			xhttp.send();
 		}



 		/**
 				Does an AJAX request for the JSON script in the server containing
 				all the information about the classes that the teacher will be handling
 		*/	
 		function doOtherAjax(){
 			var xhttp = new XMLHttpRequest();
 			var url = "http://www.html1.com/checklist.json";
 			var awef;
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					students = JSON.parse(this.responseText);
					console.log(students);
					localStorage.setItem("checklist",JSON.stringify(students));
				}
			};
			xhttp.open("GET",url,true);
			xhttp.send(); 			
 		}

 		/**
 				Parses the checklist into a desired format then stores it in 
 				localStorage whilst adding their details into the dropbox
 		*/
 		function parseCheckList(){
 			var checklist = JSON.parse(localStorage.getItem("checklist"));
 			courses = [];
 			console.log(checklist);
 			for(var count = 0; count < checklist.Classes.length; count++){
 				var CourseCode = checklist.Classes[count].CourseCode;
 				var CourseStart = checklist.Classes[count].CourseStart;
 				var CourseNumber = checklist.Classes[count].CourseNumber;
 				key = CourseNumber + "-" + CourseCode + "-" + CourseStart;
 				var arr = checklist.Classes[count].Students;
 				var jsonObj = {"courseNum":CourseNumber,"classCode":CourseCode,"CourseStart":CourseStart,"Student":arr};
 				console.log(jsonObj);
 				localStorage.setItem(key,JSON.stringify(jsonObj));
 				courses.push({"CourseKey":key});
				var opt = document.createElement("option");
				document.getElementById("classSelect").append(opt);
				document.getElementById("classSelect").lastChild.innerHTML = key;
				var attendanceStorage = "attendance-" + key;
				console.log(attendanceStorage);
 				var emptyArray = [];
 				localStorage.setItem(attendanceStorage,JSON.stringify(emptyArray));
 			}
 			localStorage.setItem("Courses",JSON.stringify(courses));		

 		}


 		//Just some unnecessary ccode
 		students = JSON.parse(localStorage.getItem(students));
 		console.log(students);


 		/**
 				Appends the values entered in the "class creation" form into the drop down list
 		*/
		function appendList(){
			var classNem = JSON.parse(localStorage.getItem("classNames")).classNames;
			for(var count = 0; count < classNem.length; count++){
				var opt = document.createElement("option");
				document.getElementById("classSelect").append(opt);
				document.getElementById("classSelect").lastChild.innerHTML = classNem[count].className;			
			}
		}
		appendList();


		/**
				getVal()
						-Gets the object related to the value highlighted in the drop down list
		*/

 		function getVal(){
 			var awef = document.getElementById("classSelect");
 			var index = awef.options[awef.selectedIndex].value;
 			var myObj = JSON.parse(localStorage.getItem(index));
 			document.getElementById("classTitle").innerHTML = "<h2> Classcode: " + myObj.classCode + "(" + myObj.CourseStart + ")";
 			var butt = "<input type='button' name='Add Student' value='Add Student!' onclick='addStud()'>";
 				butt = butt.replace(/'/g,"\"");
 			document.getElementById("classTitle").lastChild.innerHTML += butt;
 			displayStud();
 			
 		}

 		/**
 				-Gets the value entered in the respective text boxes, creating a JSON object out of them
 				and storing it into the localstorage for future retrieval. Has some unecessary code 
 		*/
 		function setVal(){
 			var classCode = document.getElementById("ClassDet").matamis.value;
 			var classStartT = document.getElementById("ClassDet").maasim.value;
 			var classNumber = document.getElementById("ClassDet").maalat.value;

 			var classDetails = "{'courseNum':'"+classNumber+"', 'classCode':'"+classCode+"','classStartT':'"+classStartT+"','Student':[]}";
 				classDetails = classDetails.replace(/'/g,"\"");
 				
 			localStorage.setItem(classNumber+"-"+classCode+"-"+classStartT,classDetails);
 			var name = classNumber+"-"+classCode+"-"+classStartT;
 			var pushName = {"className":name} ;
 				//pushName = pushName.replace(/'/g,"\"");

 			//var finalPushName = JSON.parse()
 			console.log(pushName);

 			if (localStorage.getItem("classNames") === null)  {
 			var classs = "{'classNames':[]}";
 				classs = classs.replace(/'/g,"\"");
 			localStorage.setItem("classNames",classs);
 			}

 			var classes = JSON.parse(localStorage.getItem("classNames"));
 				classes.classNames.push(pushName);
 			var stringedClass = JSON.stringify(classes);

 			
 			localStorage.setItem("classNames",stringedClass);

 			//var trial = JSON.parse(localStorage.getItem("classNames"));
 			//console.log(trial.classNames[0]);

 			/**for(var count = 0; count < students.length; count++){
 				localStorage.setItem("9355B-10:30",students)
 			}**/
 			appendList();




 		}


 		function addStud(){

 		}
 		/**
 			Function to print out the students that are in their respective classes


		*/
		/**
				Displays the students that are in the class
		*/
 		function displayStud(){
 			var listInfo = document.getElementById("classSelect");
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var studList = JSON.parse(localStorage.getItem(index)).Student;
 			var jsonObj = studList.sort(predicateBy("Name"));
 			console.log(jsonObj); 
 			//var toPrintTo = document.getElementById("seatPlan");
 			//var courseNum = jsonObj.courseNum;
 			//var classCode = jsonObj.classCode;
 			//var startTime = jsonObj.CourseStart;
 			//var studentKey = courseNum + "-" + classCode + "-" + startTime;
 			//console.log(studentKey);
 			//var classStudents = JSON.parse(localStorage.getItem(studentKey));
 			//console.log(classStudents);
 			//console.log(classStudents.Students);
 			for(var count = 0; count < jsonObj.length; count++){
 				if(count == 0){
 					document.getElementById("seatPlan").innerHTML = "<input name='student' type='checkbox' value=" + jsonObj[count].ID +" />" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "<br />";
 				}else{
 					document.getElementById("seatPlan").innerHTML += "<input name='student' type='checkbox' value=" + jsonObj[count].ID +" />" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "<br />";
 				}
 			}
 		}

		function displayClasses(){
 		//read from local storage
 		var classes = JSON.parse(localStorage.getItem("Courses"));
 		for(var count = 0; count < classes.length; count++){
 			var opt = document.createElement("option");
 			document.getElementById("classSelect1").append(opt);
 			document.getElementById("classSelect1").lastChild.innerHTML += classes[count].CourseKey;
 		}		
 	}

 	function randomize(){
  			var listInfo = document.getElementById("classSelect")
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var jsonObj = JSON.parse(localStorage.getItem(index));
 			console.log(jsonObj);
 			var randNum = Math.ceil((Math.random()*(jsonObj.Student.length - 1)));
 			console.log(Math.ceil((Math.random()*(jsonObj.Student.length - 1))));
 			var luckyStud = jsonObj.Student[randNum];
 			console.log(luckyStud);
 			document.getElementById("luckyStudent").innerHTML = "<h4> " + "The lucky student is " + "</h4>";
 			document.getElementById("luckyStudent").innerHTML = "<h5> " + luckyStud.Name;
 	}


 	function groupRandomize(){
 			//Add more functinoality to this. Group by male/female or by student.
 			//By student number
 			//Display groups by ascending/descending order
  			var listInfo = document.getElementById("classSelect");
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var jsonObj = JSON.parse(localStorage.getItem(index));
 			var numOfGroup = document.getElementById("actRand").numOfGroups.value;
 			numberOfMembers = Math.ceil(jsonObj.Student.length/numOfGroup);
 			groupNum = 1;
 			groups = [];
 			tempGroups = [];
 			students = jsonObj.Student
 			numOfStudents = jsonObj.Student.length
 			for(var count = 0; count < numOfStudents; count++){
 				randNumber = Math.ceil(Math.random()*(students.length-1));

 				tempGroups.push(students[randNumber]);
 				if(tempGroups.length == numberOfMembers){
 					groups.push(tempGroups);
 					tempGroups = []
 					groupNum++;
 				}
 				students.splice(randNumber,1)
 			}
 			console.log(groups);
 			if(tempGroups.length < numOfMembers -1){
 				//for(var count2 = 0; count < tempGroups.length;)
 			}

 	}

 	function displayGroups(){

 	}

	function getDateToday(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		if(dd < 10){
			dd = '0' + dd;
		}

		switch(mm){
			case 1:
				mm = "Jan";
				break;
			case 2:
				mm = "Feb";
				break;
			case 3:
				mm = "Mar";
				break;
			case 4:
				mm = "Apr";
				break;
			case 5:
				mm = "May";
				break;
			case 6:
				mm = "Jun";
				break;
			case 7:
				mm = "Jul";
				break;
			case 8:
				mm = "Aug";
				break;
			case 9:
				mm = "Sep";
				break;
			case 10:
				mm = "Oct";
				break;
			case 11:
				mm = "Nov";
				break;
			case 12:
				mm = "Dec";
				break;
		}
		today = mm+"-"+dd+"-"+yyyy;
		return today;
	}

	function markAbsent(){
		//insert array of absent students
		//Work on this
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var highlightedStudents = getHighlightedStudents();
		console.log(highlightedStudents);
		var attendanceKey = "attendance-" + index;
		attendance = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(attendance[0].Absent);
		//Try to improve this one. Quadratic is not good enough.
		for(var count = 0; count < highlightedStudents.length; count++){
			var id = highlightedStudents[count];
			console.log(id);
			for(var count1 = 0; count1 < myObj.Student.length; count1++){
				if(id == myObj.Student[count1].ID){
					console.log(myObj.Student[count1]);
					attendance[attendance.length - 1].Absent.push(myObj.Student[count1]);
				}
			}
		}

		localStorage.setItem(attendanceKey,JSON.stringify(attendance));
		console.log("Success");
	}

	function markTardy(){
		//insert array of absent students
		//Work on this
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var highlightedStudents = getHighlightedStudents();
		console.log(highlightedStudents);
		var attendanceKey = "attendance-" + index;
		attendance = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(attendance[0].Absent);
		//Try to improve this one. Quadratic is not good enough.
		for(var count = 0; count < highlightedStudents.length; count++){
			var id = highlightedStudents[count];
			console.log(id);
			for(var count1 = 0; count1 < myObj.Student.length; count1++){
				if(id == myObj.Student[count1].ID){
					console.log(myObj.Student[count1]);
					attendance[attendance.length - 1].Tardy.push(myObj.Student[count1]);
				}
			}
		}

		localStorage.setItem(attendanceKey,JSON.stringify(attendance));
		console.log("Success");
	}


	function createAttentionLog(){
		var course = document.getElementById("classSelect");
		console.log(course);
		var index = course.options[course.selectedIndex].value;
		console.log(index);
		var myObj = JSON.parse(localStorage.getItem(index));

		var attendanceKey = "attendance-"+index;
		var attendanceObj = JSON.parse(localStorage.getItem(attendanceKey));
		var date = getDateToday();
		var attendanceLog = {"Date":date,"Absent":[],"Tardy":[]};
		attendanceObj.push(attendanceLog);
		localStorage.setItem(attendanceKey,JSON.stringify(attendanceObj));
	}



	function showAttendance(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));

		var attendanceKey = "attendance-" + index;
		var attendanceStorage = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(attendanceStorage);
	}

	function getHighlightedStudents(){
		var checkboxes = document.getElementsByName("student");
		var checkBoxesChecked = [];

		for(var count = 0; count < checkboxes.length; count++){
			if(checkboxes[count].checked){
				checkBoxesChecked.push(checkboxes[count].value);
			}
		}

		return checkBoxesChecked.length > 0 ? checkBoxesChecked : null;
	}


	function notesForTheThingy(){
		//Add more functionality for the notes part 
		//Add more stuff for the notes 
	}



	function predicateBy(prop){
		return function(a,b){
			if(a[prop] > b[prop]){
				return 1;
			}else if(a[prop] < b[prop]){
				return -1;
			}
			return 0;
		}
	}

	function uncheckHighlightedStudents(){
		var checkboxes = document.getElementsByName("student");

		for(var count = 0; count < checkboxes.length; count++){
			//if(checkboxes[count].checked)
		}
	}

	function displayAttendance(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var attendanceKey = "attendance-" + index;
		var attBody = document.getElementById("AttBody");
		//Try showing the attendance for today
		//Create a drop down that lists the attendance or that day
		//Display absentees and the guys who are tardy.
		var date = document.getElementById("DateSelect");
		var dateVal = date.options[date.selectedIndex].value;
		var attObj = JSON.parse(localStorage.getItem(attendanceKey))
		for(var count = 0; count < attObj.length; count++){
			if(dateVal == attObj[count].Date){
				for(var count2 = 0; count2++ < attObj[count].Absent.length; count2++){
					
				}
			}
		}

	}

	//Fail safe
	function readFromLocalStorage(){
		//Read The Courses Log
		//If there's stuff there then display
		//If there's nothing there then say. You have no classes yet!

		if(!checkLocalStorage){
			document.getElementById("classTitle")
		}
		var courses = JSON.parse(localStorage.getItem("Courses"));
		if(courses.length != 0){
			for(var count = 0; count < courses.length; count++){
				var courseObj = courses[count];
				var courseKey = courseObj.CourseKey;
				var opt = document.createElement("option");
					document.getElementById("classSelect").append(opt);
					document.getElementById("classSelect").lastChild.innerHTML = courseKey;

			}
		}
	}
	//Fail safe
	function checkLocalStorage(){
		var courses = JSON.parse(localStorage.getItem("Courses"));
		if(courses.length == undefined || courses.length == 0){
			return false
		}else{
			return true;
		}
	}

	function fillDateDrop(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var attendanceKey = "attendance-" + index;
		var arr = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(arr[0]);
		for(var count = 0; count < arr.length; count++){
			var date = arr[count].Date;
			var list = document.getElementById("DateSelect");
			list.innerHTML += "<option> " + date;
		}		
	}