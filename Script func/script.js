		/**
			Warning there currently is no structue to the way these methods are layed out.
			All of the different functionalities are scattered through out so be sure 
			to read the minisucle documentation that were given to them. If you have any suggestions
			and things you want to do to the code just feel free.
		*/



		var jsonFile;
		var students;
		/**
			These methods check if there are entries in local storage related to the app.
			If there are, then use them.
		*/
		readFromLocalStorage();
		getVal();
		selectSortingType();




		/***
			doOtherAjax()
				-Function that does an AJAX request to the JSON file in the server
				that contains all of the information that the user will need and stores
				it in local storage. If connection to the server can't be established, 
				then it will respond with a "Server Connection Failed" message.			
		*/
 		function doOtherAjax(){
 			try{
 			var xhttp = new XMLHttpRequest();
 			var url = "http://www.html1.com/checklist.json";
 			var awef;

 			//If server gives go signal, parse responseText and store it to local storage
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					students = JSON.parse(this.responseText);
					console.log(students);
					localStorage.setItem("checklist",JSON.stringify(students));
				}
			};
			xhttp.open("GET",url,true);
			xhttp.send();
			}catch(ex){
				alert("Server Connection Failed! Cannot Synchronize");
			} 			
 		}





 		/***
			synchTest()
				-Function that does an AJAX request to the server for the JSON file
				that contains all of the information that the user will need. Used for
				checking whether or not there were any updates to the JSON file in said
				server.
 		*/
 		function synchTest(){
 			try{
 			var xhttp = new XMLHttpRequest();
 			var url = "http://www.html1.com/checklist.json";
 			var awef;
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					students = JSON.parse(this.responseText);
					localStorage.setItem("checking",JSON.stringify(students));
				}
			};
			xhttp.open("GET",url,true);
			xhttp.send();
			return students;
			}catch(ex){
				alert("Server Connection Failed! Cannot Synchronize");
			} 			
 		}



 		/***
 			ParseCheckList()
 				-Parses the data gathered from the JSON file in the server and
 				stored into the local storage into a it's different parts and stores does parts in local storage.
 		*/
 		function parseCheckList(){
 			var checklist = JSON.parse(localStorage.getItem("checklist"));
 			courses = [];
 			console.log(checklist);
 			for(var count = 0; count < checklist.Classes.length; count++){
 				var CourseCode = checklist.Classes[count].CourseCode;
 				var CourseStart = checklist.Classes[count].CourseStart;
 				var CourseNumber = checklist.Classes[count].CourseNumber;
 				var CourseStartT = checklist.Classes[count].CourseStartT;
 				var DescriptiveTitle = checklist.Classes[count].DescriptiveTitle;
 				var days = checklist.Classes[count].Days;
 				var room = checklist.Classes[count].Room;
 				key = CourseNumber + "-" + CourseCode + "-" + CourseStart;
 				var arr = checklist.Classes[count].Students;
 				var jsonObj = {"courseNum":CourseNumber,"classCode":CourseCode,"CourseStart":CourseStart,"CourseStartT":CourseStartT,"Student":arr,"Days":days,"Room":room};
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
 				var studLog = [];
 				newKey = "studLog-"+key;

 				for(var count2 = 0; count2 < arr.length; count2++){
 					var studName = arr[count2].Name;
 					var studId = arr[count2].ID;
 					var obj = {"Name":studName,"ID":studId,"Absents":[],"Tardy":[]};
 					studLog.push(obj);
 				}
 				localStorage.setItem(newKey, JSON.stringify(studLog));

 			}
 			localStorage.setItem("Courses",JSON.stringify(courses));		
 		}





 		/***
			Do this documentation thingy 
 		*/
 		function failSafeForSynchronize(){
 			synchTest();
 			var check = JSON.parse(localStorage.getItem("checking"));
 			var existingCheckList = JSON.parse(localStorage.getItem("checklist"));
 			localStorage.removeItem("checking");
 		}


 		//Just some unnecessary ccode
 		students = JSON.parse(localStorage.getItem(students));
 		console.log(students);





 		/**
 			appendList()
 				-Appends the values entered in the "class creation" form into the drop down list
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
 			document.getElementById("classTitle").innerHTML = "<h2> Classcode: " + myObj.classCode + "(" + myObj.CourseStartT + ")";
 			var butt = "<input type='button' name='Add Student' value='Add Student!' onclick='addStud()'>";
 				butt = butt.replace(/'/g,"\"");
 			document.getElementById("classTitle").lastChild.innerHTML += butt;
 			displayStud();
 			
 		}





 		/**
 			setVal()
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
 			appendList();




 		}




 		/***
			displayStud()
				-Displays the list of students in the selected class and prints
				it into the appropriate <div>
 		*/
 		function displayStud(){
 			var listInfo = document.getElementById("classSelect");
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var studList = JSON.parse(localStorage.getItem(index)).Student;
 			var jsonObj = studList.sort(predicateBy("Name"));
 			console.log(jsonObj);
 			for(var count = 0; count < jsonObj.length; count++){
 				//Do the labels
 				if(count == 0){
 					document.getElementById("seatPlan").innerHTML = "<input name='student' type='checkbox' id=" + jsonObj[count].ID  + " value=" + jsonObj[count].ID +" />" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "<br />";
 				}else{
 					document.getElementById("seatPlan").innerHTML += "<input name='student' type='checkbox'  id=" + jsonObj[count].ID + " value=" + jsonObj[count].ID +" />" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "<br />";
 				}
 			}
 		}



 		/***
 			displayClasses()
 				-Displays all of the classes currently assigned to the teacher.
 				Parses the checkist stored in local storage and 
 		*/
		function displayClasses(){
 			var classes = JSON.parse(localStorage.getItem("Courses"));
	 		for(var count = 0; count < classes.length; count++){
	 			var opt = document.createElement("option");
	 			document.getElementById("classSelect1").append(opt);
	 			document.getElementById("classSelect1").lastChild.innerHTML += classes[count].CourseKey;
	 		}		
 		}

 		/***
 			randomize()
 				-Picks a random student from the selected class.
 		*/
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





 	/***
 		displayGroups()
 			-Displays the array of students separated into groups 
 		@param {array}
 	*/
	function displayGroups(awef){
		for(var count = 0; count < awef.length; count++){
			groupNum = count+1;
			console.log(groupNum);
			group = awef[count];
			if(count == 0)
				document.getElementById("Groups").innerHTML = "<h5> Group #" + (count+1) + " </h5>";
			else
				document.getElementById("Groups").innerHTML += "<h5> Group #" + (count+1) + " </h5>";
			for(var count2 = 0; count2 < awef[count].length; count2++){
				document.getElementById("Groups").innerHTML += "<p> " + group[count2].Name + " </p>";
			}
		}
	}




	/***
		groupRandomize()
			-From the list of students in the classes, creates random groups based on the probable 
			number of members the user wants per group and then displays them.
	*/
 	function groupRandomize(){
  			var listInfo = document.getElementById("classSelect");
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var jsonObj = JSON.parse(localStorage.getItem(index));
 			var numberOfMembers = document.getElementById("actRand").numOfGroups.value;
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
 					tempGroups = [];
 					groupNum++;
 				}
 				students.splice(randNumber,1);

 			}

 			var test = false;
 			if(tempGroups.length < numberOfMembers - 1){
 				for(var count2 = 0; count2 < groups.length && !test; count2++){
 					if(tempGroups[0] == undefined)
 						break;
 					var prelimMember = tempGroups[0];
 					groups[count2].push(prelimMember);
					tempGroups.splice(0,1);


 	
 					if(count2 == groups.length - 1){
 						count2 == 0;
 					}
 				}
 			}
 			console.log(groups);
 			displayGroups(groups);
 	}




 	/***
 		getDateToday()
 			-Returns the date today in mm-dd-yyyy format
 	*/
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





	/***
		markAbsent()
			-Marks the highlighted students in the class as absent and
			prints the date in which they were absent in the date dropbox
			whils storing that information in local storage.
	*/
	function markAbsent(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var highlightedStudents = getHighlightedStudents();
		var attendanceKey = "attendance-" + index;
		attendance = JSON.parse(localStorage.getItem(attendanceKey));
		var test = false;
		var dit = getDateToday();
		for(var count2 = 0; count2 < attendance.length; count2++){
			if(attendance[count2].Date == getDateToday()){
				test = true;
				break;
			}
		}

		if(!test){
			createAttentionLog();
			attendance = JSON.parse(localStorage.getItem(attendanceKey));
		}


		try{
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
		}catch(awef){
			alert("You have not selected a student!");
			return;
		}
		console.log("Ano daw?");
		var studLogKey = "studLog-" + index;
		studLogArr = JSON.parse(localStorage.getItem(studLogKey));
		console.log(studLogArr.length);
		console.log(highlightedStudents.length);

		for(var count3 =0; count3 < highlightedStudents.length; count3++){
			var idNumOfStudent = highlightedStudents[count3];
			console.log(idNumOfStudent);

			for(var count4 = 0; count4 < studLogArr.length; count4++){
				if(idNumOfStudent == studLogArr[count4].ID){
					studLogArr[count4].Absents.push(getDateToday());
				}
			}
		}

		localStorage.setItem(studLogKey,JSON.stringify(studLogArr));
		localStorage.setItem(attendanceKey,JSON.stringify(attendance));
		fillDateDrop(); //Remember to change this in implementation
		uncheckHighlightedStudents();
		console.log("Success");
	}




	/***
		markTardy()
			-Marks the selected students as tardy and stores that information in 
			local storage
	*/
	function markTardy(){

		//Gets the current entry of the class in local storeage
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));

		//Retrieves the array of highlighted students
		var highlightedStudents = getHighlightedStudents();


		var attendanceKey = "attendance-" + index;
		var test = false;
		attendance = JSON.parse(localStorage.getItem(attendanceKey));
		for(var count2 = 0; count2 < attendance.length; count2++){
			if(attendance[count2].Date == getDateToday()){
				test = true;
				break;
			}
		}

		if(!test){
			createAttentionLog();
			attendance = JSON.parse(localStorage.getItem(attendanceKey));
		}

		try{
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
		}catch(efw){
			alert("You have not selected a student");
			return;
		}

		var studLogKey = "studLog" + index;
		studLogArr = JSON.parse(localStorage.getItem(studLogKey));

		for(var count3 =0; count3 < highlightedStudents; count3){
			var idNumOfStudent = highlightedStudents[count3]
			for(var count4 = 0; count4 < studLogArr; count4++){
				if(idNumOfStudent == studLogArr[count4].ID){
					studLogArr[count4].Tardy.push(getDateToday());
				}
			}
		}

		localStorage.setItem(studLogKey,JSON.stringify(studLogArr));
		localStorage.setItem(attendanceKey,JSON.stringify(attendance));
		fillDateDrop(); //Remember to fix this during implementation
		uncheckHighlightedStudents();
		console.log("Success");
	}


	/**
		createAttentionLog()
			-Creates an attendance log for the current date, allowing tracking
			of people per class who are either absent or tardy.
	*/
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
		getHighlightedStudents()
			-Returns an array of checked checkboxes with the name "student".
			If none are selected then the function will return null.

	*/
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


	/**
		predicateBy()
			-Method used in order to sort JSON objects based on a specified
			attribute.

		@param {string} prop- the attribute to be used for comparison
	*/
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




	/**
		CONTINUE THIS
		uncheckHighlightedStudents()
			-Method used to uncheck all of the currently checked checkboxes.
	*/
	function uncheckHighlightedStudents(){
		var checkboxes = getHighlightedStudents();

		for(var count = 0; count < checkboxes.length; count++){
			document.getElementById(checkboxes[count]).checked = false;
			console.log("Deleted");
		}
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
		for(var count = 0; count < attObj.length; count++){
			if(dateVal == attObj[count].Date){
				console.log(attObj[count].Absent.length);
				document.getElementById("AttBody").innerHTML = "<h4> " + "Absentees"
				for(var count2 = 0; count2 < attObj[count].Absent.length; count2++){
					var attbod = document.getElementById("AttBody");
					console.log(attbod);
					console.log(attObj[count].Absent[count2].Name);
					if(count2 == 0)
						document.getElementById("AttBody").innerHTML =  "<p> " + attObj[count].Absent[count2].Name + " </p>";
					else
						document.getElementById("AttBody").innerHTML +=  "<p> " + attObj[count].Absent[count2].Name + " </p>";
					
 				}
				
				var attbod = document.getElementById("AttBody");
				attbod.innerHTML += "<h4> Tardy";
 				for(var count3 = 0; count3 < attObj[count].Tardy.length; count3++){
 					if(attObj[count].Tardy.length == 0){
 						attbod.innerHTML += "<h5> There are no tardy people for today";
 					}else{
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

	//Fail safe
	function readFromLocalStorage(){

		if(!checkLocalStorage){
			document.getElementById("classTitle");
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
		console.log(studObj);
		for(var count = 0; count < studObj.length; count++){
			var studName = studObj[count].Name;
			var studId = studObj[count].ID;
			var opt = studName + "-" + studId; 
			if(studObj[count].Absents.length != 0 || studObj[count].Tardy.length != 0){
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
		groupAlphabetically()
			-Groups the students in the selected class alphabetically based on the
			probable number of members the user wants per group. If it is not possible
			to evenly distribute the students, then those who weren't part of the preliminary
			distribution of members will be distributed among them. 
	*/
	function groupAlphabetically(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		var students = jsonObj.Student;
		students.sort(predicateBy("Name"));		
		console.log(students);
		var numberOfMembers = document.getElementById("actRand").numOfGroups.value;
		groupNum = 1;
		groups = [];
		tempGroups = [];
		numOfStudents = jsonObj.Student.length
		for(var count = 0; count < numOfStudents; count++){

			tempGroups.push(students[0]);
			if(tempGroups.length == numberOfMembers){
				groups.push(tempGroups);
				tempGroups = [];
				groupNum++;
			}
			students.splice(0,1);
		}

		console.log(groups);
		console.log(tempGroups);
		var test = false;
		if(tempGroups.length < numberOfMembers - 1){
			for(var count2 = 0; count2 < groups.length && !test; count2++){
				if(tempGroups[0] == undefined)
					break;
				var prelimMember = tempGroups[0];
				groups[count2].push(prelimMember);
				tempGroups.splice(0,1);



				if(count2 == groups.length - 1){
					count2 == 0;
				}
			}
		}

		console.log(groups);
		displayGroups(groups);

	}




	/**
		groupByGender()
			-TO BE CONTINUED
	*/
	function groupByGender(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		var students = jsonObj.Student;
		var males = [];
		var females = []; 
	}




	/**
		followTheLeader()
			-function that changes the onclick attribute of the button
	*/
	function followTheLeader(){
		document.getElementById("studsPerClass").innerHTML += "<p> Choose your leaders! </p>";
		displayStud2();
		document.getElementById("YerMom").setAttribute("onclick","doThisShit()");

		
	}




	/**
		doThisShit() (Remember to change this name as soon as possible. I might go buy some McDonalds Later huehu)
			-Retrieves the highlighted students and sets them as the predefined leaders of their
			respective groups. After that, the remaining students are randomly put into the
			previosuly defined groups.
	*/
	function doThisShit(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		var students = jsonObj.Student;
		var highlightedStuds = getHighlightedStude();
		var group = [];
		var tempGroup = [];
		numOfStudents = jsonObj.Student.length;

		//insert the highlighted people in the group
		for(var x = 0; x < highlightedStuds.length; x++){

			//If actualStud != null then push
			actualStud = findStudent(highlightedStuds[x]);
			console.log(actualStud);
			tempGroup.push(actualStud);
			for(var y =0; y < numOfStudents; y++){
				if(actualStud.Name == students[y].Name){
					console.log(students.length);
					students.splice(y,1);
					break;
				}
			}
			group.push(tempGroup);
			tempGroup = [];
		}
		console.log(group);
		//now insert the rest of the students there
		console.log(students); 
		numOfStudents = jsonObj.Student.length;
		for(var count = 0,count2 = 0; count < numOfStudents; count++,count2++){
 				randNumber = Math.ceil(Math.random()*(students.length-1));
 				group[count2].push(students[randNumber]);
 				if(count2 == group.length - 1){
 					count2 = -1;
 				}

 				students.splice(randNumber,1);

		}
		console.log(students);
		console.log(group);

		document.getElementById("YerMom").setAttribute("onclick","chooseRandomizer()");

	}




	/***
		findStudent()
			-Function used to find the student in the class given his/her ID number.
			If the student does not exist, return null.
		@param {string} idNum- The students ID number
	*/
	function findStudent(idNum){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		var students = jsonObj.Student;

		for(var count = 0; count < students.length; count++){
			if(idNum == students[count].ID){
				return students[count];
			}
		}

		return null;		
	}




	/**
		displayStud2()
			-Creates the checkboxes of the students in the group Randomizer part
	*/
	function displayStud2(){
		var listInfo = document.getElementById("classSelect");
		var index = listInfo.options[listInfo.selectedIndex].value;
		var studList = JSON.parse(localStorage.getItem(index)).Student;
		var jsonObj = studList.sort(predicateBy("Name"));
		console.log(jsonObj);
		for(var count = 0; count < jsonObj.length; count++){
			if(count == 0){
				document.getElementById("studsPerClass").innerHTML = "<input name='stud' type='checkbox' value=" + jsonObj[count].ID +" />" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "<br />";
			}else{
				document.getElementById("studsPerClass").innerHTML += "<input name='stud' type='checkbox' value=" + jsonObj[count].ID +" />" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "<br />";
			}
		}
	}





	/**
		getHighlightedStude()
			-Returns an array of checked checkboxes with the name "student".
			If none are selected then the function will return null.

	*/
	function getHighlightedStude(){
		var checkboxes = document.getElementsByName("stud");
		var checkBoxesChecked = [];

		for(var count = 0; count < checkboxes.length; count++){
			if(checkboxes[count].checked){
				checkBoxesChecked.push(checkboxes[count].value);
			}
		}

		return checkBoxesChecked.length > 0 ? checkBoxesChecked : null;
	}







	/**
		groupByGender()
			-HAVE YET TO COMPLETE THIS METHOD
	*/
	function groupByGender(){
		var listInfo = document.getElementById("classSelect");
		var index = listInfo.options[listInfo.selectedIndex].value;
		var studList = JSON.parse(localStorage.getItem(index)).Student;		
		var males =[];
		var females = [];

		for(var count = 0; count < studList.length; count++){
			console.log(studList[count].Name + " " + studList[count].Gender);

			if(studList[count].Gender == "Female"){
				females.push(studList[count]);
			}
			if(studList[count].Gender == "Male"){
				males.push(studList[count]);
			}
		}

		console.log(females);
		console.log(males);

		var group = [];
		var tempGroup = [];

		for(var count2 = 0; count2 < studList.length; count2++){

		}
	}




	/**
		chooseRandomizer()
	*/
	function chooseRandomizer(){
		var awef = document.getElementById("FeatureSelect");
		var value = awef.options[awef.selectedIndex].id;
		console.log(value);
		if(value == "Random"){
			groupRandomize();
		}else if(value == "Alpha"){
			groupAlphabetically();
		}else if(value == "Gender"){
			return;
		}else if(value == "Lead"){
			followTheLeader();
			return;
		}else{
			alert("Something happened");
		}

	}

	/**
		selectSortingType()
			- used to blah blah blah blah
	*/
	function selectSortingType(){
		var date = document.getElementById("dateSort");
		var stud = document.getElementById("studSort");

		if(date.checked == true){
			fillDateDrop();
			document.getElementById("DateSelect").setAttribute("onchange","displayAttendance()");
			displayAttendance();
		}

		if(stud.checked == true){
			//Remember to change the value of the onchange() attribute for the drop down
			fillStudDrop();
			document.getElementById("DateSelect").setAttribute("onchange","displayStudAttendance()")
			displayStudAttendance();
		}
	}