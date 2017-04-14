	/***
		randomize()
			-Picks a random student from the selected class.
	*/
	readFromLocalStorage()
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
		document.getElementById("luckyStudent").innerHTML += "<h5> " + luckyStud.Name;
	}

 	//Fail safe
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