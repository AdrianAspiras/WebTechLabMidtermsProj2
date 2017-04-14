

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
