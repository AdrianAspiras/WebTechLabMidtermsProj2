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
  			var listInfo = document.getElementById("classSelect1")
 			var index = listInfo.options[listInfo.selectedIndex].value;
 			var jsonObj = JSON.parse(localStorage.getItem(index));
 			console.log(jsonObj);
 			var randNum = (Math.random()*(jsonObj.Student.length - 1));
 			console.log(randNum);
 			var luckyStud;
 			console.log(luckyStud);
 	}

 	displayClasses();