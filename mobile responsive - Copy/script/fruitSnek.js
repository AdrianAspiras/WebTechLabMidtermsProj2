

		/***
			doOtherAjax()
				-Function that does an AJAX request to the JSON file in the server
				that contains all of the information that the user will need and stores
				it in local storage. If connection to the server can't be established, 
				then it will respond with a "Server Connection Failed" message.			
		*/

	readFromLocalStorage();
	getVal();

	function doOtherAjax(){
			try{
 			var xhttp = new XMLHttpRequest();
 			var name = document.getElementById("key").value;
 			var url = "http://www.html1.com/" + name + ".json";
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
		doOtherAjax();
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

	function appendList(){
		var classNem = JSON.parse(localStorage.getItem("classNames")).classNames;
		for(var count = 0; count < classNem.length; count++){
			var opt = document.createElement("option");
			document.getElementById("classSelect").append(opt);
			document.getElementById("classSelect").lastChild.innerHTML = classNem[count].className;			
		}
	}

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
		
		for(var count = 0; count < jsonObj.length; count++){
			//Do the labels
			if(count == 0){
				document.getElementById("seatPlan").innerHTML = "<input name='student' type='checkbox' id=" + jsonObj[count].ID  + " value=" + jsonObj[count].ID +" />" + " <label for= " + jsonObj[count].ID +">" +  jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "</label> " + "<br />";
			}else{
				document.getElementById("seatPlan").innerHTML += "<input name='student' type='checkbox'  id=" + jsonObj[count].ID + " value=" + jsonObj[count].ID +" />" + "<label for= " + jsonObj[count].ID +">" + jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "</label> " + "<br />";
			}
		}
	}


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

	function byGroupRandomize(){
		var listInfo = document.getElementById("classSelect");
		var index = listInfo.options[listInfo.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		students = jsonObj.Student;
		numOfStudents = jsonObj.Student.length;
		actVal = document.getElementById("actRand").numOfGroups.value;
		var numberOfMembers = Math.ceil(students.length / document.getElementById("actRand").numOfGroups.value) ;
		console.log(numberOfMembers)
		if(FailSafeForGrouping(numberOfMembers,numOfStudents))
			return;
		if(FailSafeForGrouping(actVal,numOfStudents))
			return;

		groupNum = 1;
		groups = [];
		tempGroups = [];
		numOfStudents = jsonObj.Student.length
		if(FailSafeForGrouping(numberOfMembers,numOfStudents))
			return;
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
		document.getElementById("YerMom").setAttribute("onclick","byGroupRandomize()");						
	}


	function byGroupAlphabetical(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		var students = jsonObj.Student;
		students.sort(predicateBy("Name"));
		numOfStudents = jsonObj.Student.length;		
		console.log(students);
		var numberOfMembers = Math.ceil(students.length / document.getElementById("actRand").numOfGroups.value);
		console.log(numberOfMembers);
		if(FailSafeForGrouping(numberOfMembers,numOfStudents))
			return;
		var numberOfMembers = Math.ceil(students.length / document.getElementById("actRand").numOfGroups.value);
		groupNum = 1;
		groups = [];
		tempGroups = [];
		

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
		document.getElementById("YerMom").setAttribute("onclick","byGroupAlphabetical()");	
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

	function hideForm(){
		document.getElementById("actRand").style.display = "none";
	}

	function showForm(){
		document.getElementById("actRand").style.display = "block";
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
		if(highlightedStudents.length == null || highlightedStudents.length == 0){
			alert("You have not highlighted a student");
			return;
		}
		var numOfHighlightedStudents = highlightedStudents.length;
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
			//I think we should just do a while here 
			for(var count = 0; count < numOfHighlightedStudents; count++){
				var id = highlightedStudents[count];
				if(FailSafeForAttendance(id)){
					for(var count1 = 0; count1 < myObj.Student.length; count1++){
						if(id == myObj.Student[count1].ID){
							console.log(myObj.Student[count1]);
							attendance[attendance.length - 1].Absent.push(myObj.Student[count1]);
						}
					}
				}else{
					console.log("That ID number has already been included");
					highlightedStudents.splice(count,1);
				}
			}
		}catch(awef){
			alert("You have not selected a student!");
			return;
		}
		var studLogKey = "studLog-" + index;
		studLogArr = JSON.parse(localStorage.getItem(studLogKey));
		console.log(studLogArr.length);
		console.log(highlightedStudents.length);

		for(var count3 =0; count3 < highlightedStudents.length; count3++){
			console.log("Kung pumunta dito tumirik siya") //just irrelevant comments
			var idNumOfStudent = highlightedStudents[count3];
			console.log(idNumOfStudent);

			for(var count4 = 0; count4 < studLogArr.length; count4++){
				if(idNumOfStudent == studLogArr[count4].ID){
					studLogArr[count4].Absents.push(getDateToday());
				}
			}
		}
		console.log(studLogArr);
		localStorage.setItem(studLogKey,JSON.stringify(studLogArr));
		localStorage.setItem(attendanceKey,JSON.stringify(attendance));
		uncheckHighlightedStudents();
		console.log("Success");
	}



	/***
		markTardy()
			-Marks the selected students as tardy and stores that information in 
			local storage
	*/
	function markTardy(){

		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var highlightedStudents = getHighlightedStudents();
		console.log(highlightedStudents);
		console.log(myObj);
		if(highlightedStudents.length == null || highlightedStudents.length == 0){
			alert("You have not highlighted a student");
			return;
		}
		var numOfHighlightedStudents = highlightedStudents.length;
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
			//I think we should just do a while here 
			for(var count = 0; count < numOfHighlightedStudents; count++){
				var id = highlightedStudents[count];
				if(FailSafeForAttendance(id)){
					for(var count1 = 0; count1 < myObj.Student.length; count1++){
						if(id == myObj.Student[count1].ID){
							console.log(myObj.Student[count1]);
							attendance[attendance.length - 1].Tardy.push(myObj.Student[count1]);
						}
					}
				}else{
					console.log("That ID number has already been included");
					highlightedStudents.splice(count,1);
				}
			}
		}catch(awef){
			alert("You have not selected a student!");
			return;
		}
		var studLogKey = "studLog-" + index;
		studLogArr = JSON.parse(localStorage.getItem(studLogKey));
		console.log(studLogArr.length);
		console.log(highlightedStudents.length);

		for(var count3 =0; count3 < highlightedStudents.length; count3++){
			console.log("Kung pumunta dito tumirik siya") //just irrelevant comments
			var idNumOfStudent = highlightedStudents[count3];
			console.log(idNumOfStudent);

			for(var count4 = 0; count4 < studLogArr.length; count4++){
				if(idNumOfStudent == studLogArr[count4].ID){
					studLogArr[count4].Tardy.push(getDateToday());
				}
			}
		}

		localStorage.setItem(studLogKey,JSON.stringify(studLogArr));
		localStorage.setItem(attendanceKey,JSON.stringify(attendance));
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

	//Problem of reassigning the actual student;
	function FailSafeForAttendance(studentIdNum){
		var date = getDateToday();
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var myObj = JSON.parse(localStorage.getItem(index));
		var attendanceKey = "attendance-" + index;
		var arr = JSON.parse(localStorage.getItem(attendanceKey));
		console.log(arr);
		var realDateAbsent = arr[arr.length-1].Absent;
		var realDateTardy = arr[arr.length-1].Tardy;
		console.log(realDateTardy);
		for(var count = 0; count < realDateAbsent.length; count++){
			if(realDateAbsent[count].ID == studentIdNum){
				console.log("This student has already been marked absent!");
				return false;
			}
		}

		for(var count2 = 0; count2 < realDateTardy.length; count2++){
			console.log(realDateTardy[count2].ID)
			if(realDateTardy[count2].ID == studentIdNum){
				console.log("This student has already been marked tardy!");
				return false;
			}
		}

		return true;		
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


	function generateStringSched(){
		var course = document.getElementById("classSelect");
		var index = course.options[course.selectedIndex].value;
		var jsonObj = JSON.parse(localStorage.getItem(index));
		var courseDays = jsonObj.Days;
		console.log(courseDays);
		stringSched = ""
		for(var count= 0; count < courseDays.length; count++){
			var day = courseDays[count];
			console.log(day);
			switch(day){
				case 'Mon':
					stringSched += "M"; //Should use concat here
					break;
				case "Tue":
					stringSched += "T";
					break;
				case "Wed":
					stringSched += "W";
					break;
				case "Thu":
					stringSched += "Th";
					break;
				case "Fri":
					stringSched += "F";
					break;
				case "Sat":
					stringSched += "S";
					break;
				case "Sun":
					stringSched += "U";
					break;
			}
		}

		return stringSched;

	}