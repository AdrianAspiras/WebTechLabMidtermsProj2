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


 			//FOR ADDING STUDENTS
 			var nCStart = classStartT.replace(/:/g,"");
 			var cName = classNumber+classCode+nCStart;
 			console.log("The key in cName at the current moment is: " + cName);
 			var listOfStudents = students;
 			console.log(listOfStudents);
 			var lenOfClss =  eval("listOfStudents."+cName+".length");
 			var clss = JSON.parse(localStorage.getItem(name));
 			/**	
 			for (var i = lenOfClss - 1; i >= 0; i--) {
 				var n = eval("listOfStudents."+cName+"["+i+"].Name");
 				var id = eval("listOfStudents."+cName+"["+i+"].ID");

 				var pushing = "{'Name':'"+n+"', 'ID':'"+id+"'}";
 					pushing = pushing.replace(/'/g,"\"");
 				var jPush = JSON.parse(pushing);
 				clss.Student.push(jPush);
 			}
 			*/
 			var wStudClss = JSON.stringify(clss);
 			localStorage.setItem(name,wStudClss);
 			//console.log(eval("listOfStudents.'IT322-9351B-10'"));


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
 			var listInfo = document.getElementById("classSelect")
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var jsonObj = JSON.parse(localStorage.getItem(index));
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
 			for(var count = 0; count < jsonObj.Student.length; count++){
 				if(count == 0){
 					document.getElementById("seatPlan").innerHTML = "<h3> " + "Name: " + 
 																				jsonObj.Student[count].Name +
 																					" " + "ID Number: " + 
 																						jsonObj.Student[count].ID;
 				}else{
 					document.getElementById("seatPlan").innerHTML += "<h3> " + "Name: " + 
 																				jsonObj.Student[count].Name +
 																					" " + "ID Number: " + 
 																						jsonObj.Student[count].ID;
 				}
 			}
 		}
 		



	function markAbsent(student){
		//Should probably put this in another function for reusing purposes
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		temp = 0;
		for(var count = 0; count < myObj.Student.length; count++){
			if(myObj.Student[count].Name == student){
				temp = myObj.Student[count];
				break;
			}
		}
		console.log(temp);
		//INSERT SOMETHING HERE TO MAKE ABSENCES AND TARDINESS GOOD
		var attendanceKey = "attendance-" + index;
		actDate = Date();
		actualAttendance = JSON.parse(localStorage.getItem(attendanceKey));
		attendanceObj = {actDate:temp};
		actualAttendance.push(attendanceObj);
		localStorage.setItem(attendanceKey,JSON.stringify(actualAttendance));
	}


	function markTardy(student){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		temp = 0;
				//INSERT SOMETHING HERE TO MAKE ABSENCES AND TARDINESS GOOD
		for(var count = 0; count < myObj.Student.length; count++){
			if(myObj.Student[count].Name == student){
				temp = myObj.Student[count];
				break;
			}
		}
		console.log(temp);
		var attendanceKey = "attendance-" + index;
		actDate = Date();
		actualAttendance = JSON.parse(localStorage.getItem(attendanceKey));
		attendanceObj = {actDate:temp};
		actualAttendance.push(attendanceObj);
		localStorage.setItem(attendanceKey,JSON.stringify(actualAttendance));		
	}


	function imWorthless(){
		
	}
