	readFromLocalStorage();
	chooseRandomizer();

	function readFromLocalStorage(){
		if(!checkLocalStorage){
			document.getElementById("rrg").innerHTML = "<h1> " + "YOU CURRENTLY HAVE NO CLASSES. SYNCHRONIZE WITH THE SERVER" + " <h1>" ;
		}
		var courses = JSON.parse(localStorage.getItem("Courses"));
		console.log(courses);
		if(courses.length != 0){
			for(var count = 0; count < courses.length; count++){
				var courseObj = courses[count];
				var courseKey = courseObj.CourseKey;
				var opt = document.createElement("option");
				console.log(opt);
				console.log(document.getElementById("classSelect"));
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
		
}	}

	function groupingType(){
		var byMember = document.getElementById("ByMember");
		var byGroup = document.getElementById("ByGroup");
		console.log(byGroup);
		const group = 1;
		const memb = 0;
		if(byMember.checked){
			document.getElementById("Moder").innerHTML  = "Enter proposed number of members per group here"
			return memb;
		}

		if(byGroup.checked){
			document.getElementById("Moder").innerHTML  = "Enter proposed number of groups here "
			return group;
		}
	}

	function clearGroups(){
		var docBody = document.getElementById("Groups");
		docBody.innerHTML = "";
		console.log("Deleted!");
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
 			students = jsonObj.Student;
 			numOfStudents = jsonObj.Student.length;
 			console.log(typeof numberOfMembers);
 			if(FailSafeForGrouping(numberOfMembers,numOfStudents)){
 					return;
			}
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

 			//Try putting this in a separate method
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
 			document.getElementById("YerMom").setAttribute("onclick","groupRandomize()");
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
		if(FailSafeForGrouping(numberOfMembers, numOfStudents))
			return;
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
		document.getElementById("YerMom").setAttribute("onclick","groupAlphabetically()");

	}

	/**
		followTheLeader()
			-function that changes the onclick attribute of the button
	*/
	function followTheLeader(){
		document.getElementById("studsPerClass").innerHTML += "<p> Choose your leaders! </p>";
		hideForm();
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
		displayGroups(group);
		clearStudList();
		uncheckHighlightedStudents();
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
				document.getElementById("studsPerClass").innerHTML = "<input name='stud' type='checkbox'  id=" + jsonObj[count].ID + " value=" + jsonObj[count].ID +" />" + "<label for= " + jsonObj[count].ID +">" + jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "</label> " + "<br />";
			}else{
				document.getElementById("studsPerClass").innerHTML += "<input name='stud' type='checkbox'  id=" + jsonObj[count].ID + " value=" + jsonObj[count].ID +" />" + "<label for= " + jsonObj[count].ID +">" + jsonObj[count].Name +" " + "-" + jsonObj[count].ID + "</label> " + "<br />";
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
		chooseRandomizer()
	*/
	function chooseRandomizer(){
		var awef = document.getElementById("FeatureSelect");
		var value = awef.options[awef.selectedIndex].id;
		var type = groupingType(); 
		console.log(value);
		console.log(type);
		switch(type){
			case 0:
				if(value == "Random"){
					showForm();
					console.log("this is it");
					clearGroups();
					clearStudList();
					document.getElementById("YerMom").setAttribute("onclick","groupRandomize()");
				}else if(value == "Alpha"){
					showForm();
					clearGroups();
					clearStudList();
					document.getElementById("YerMom").setAttribute("onclick","groupAlphabetically()");
				}else if(value == "Lead"){
					clearGroups();
					followTheLeader();
					document.getElementById("YerMom").setAttribute("onclick","doThisShit()");
					return;
				}else{
					alert("Something happened");
					break;
				}
				break;
			case 1:
				if(value == "Random"){
					showForm();
					clearGroups();
					clearStudList();
					document.getElementById("YerMom").setAttribute("onclick","byGroupRandomize()");
					return;
				}else if(value == "Alpha"){
					showForm();
					clearGroups();
					clearStudList();
					document.getElementById("YerMom").setAttribute("onclick","byGroupAlphabetical()");
					return;
				}else if(value == "Lead"){
					clearGroups();
					followTheLeader();
					document.getElementById("YerMom").setAttribute("onclick","doThisShit()");
					return;
				}else{
					alert("Something happened");
					break;
				}
		}

	}

	function FailSafeForGrouping(numberOfMembers,studLength){
			console.log(!isNaN(parseFloat(numberOfMembers)) && isFinite(numberOfMembers));
			test = !isNaN(parseFloat(numberOfMembers)) && isFinite(numberOfMembers);
			console.log(test);
			console.log(!isInt(numberOfMembers));
			if(!test){
				alert("Please enter a number!");
				return true;
			}else{		
				if(numberOfMembers <= 0){
					alert("Please enter a valid number");
					return true;
				}
				
				if(numberOfMembers >= studLength ){
					alert("The number you entered is greater than the number of students in class");
					return true;
				}

				if(numberOfMembers == 1){
					alert("Please enter a number greater than 1");
					return true;
				}

				if(isFloat(numberOfMembers)){
					alert("Please enter a whole number");
					return true;
				}
			}

			return false;
	}

	function isInt(n){
		return Number(n) == n && n % 1 == 0;
	}

	function isFloat(n){
		return Number(n) == n && n % 1 !== 0;
	}

	//DOCUMENT EVERYTHING BELOW HERE
	function clearStudList(){
			var docBody = document.getElementById("studsPerClass");
			docBody.innerHTML = "";
			console.log(docBody);
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

	function hideForm(){
		document.getElementById("actRand").style.display = "none";
	}

	function showForm(){
		document.getElementById("actRand").style.display = "block";
	}


	

	function resetRandomize(){
		document.getElementById("luckyStudent").lastChild.innerHTML = "";
		document.getElementById("luckyStudent").firstChild.innerHTML = "";
	}

	function reset(){
		resetRandomize();
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