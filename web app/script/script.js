		var jsonFile;
		var students;
		var xhttp = new XMLHttpRequest();
		var url = "http://www.html1.com/students.json";
		var awef;
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				students = JSON.parse(this.responseText);
				console.log(students);
			}
		};
		xhttp.open("GET",url,true);
		xhttp.send();
 		
		function appendList(){
			var classNem = JSON.parse(localStorage.getItem("classNames")).classNames;
			if(document.getElementById("classSelect").hasChildNodes()){
					while(document.getElementById("classSelect").firstChild){
						document.getElementById("classSelect").removeChild(document.getElementById("classSelect").firstChild);
					}
					document.getElementById("classSelect").innerHTML = "<option></option>";

			} 

			for(var count = 0; count < classNem.length; count++){
				var opt = document.createElement("option");
				document.getElementById("classSelect").append(opt);
				document.getElementById("classSelect").lastChild.innerHTML = classNem[count].className;
				
				
			}
		}
		appendList();
 		function getVal(){
 			var awef = document.getElementById("classSelect");
 			var index = awef.options[awef.selectedIndex].value;
 			var myObj = JSON.parse( localStorage.getItem(index));
 			document.getElementById("classTitle").innerHTML = "<h2> Classcode: " + myObj.classCode + "-" + myObj.classStartT;
 			var butt = "<input type='button' name='Add Student' value='Add Student!' onclick='addStud()'>";
 				butt = butt.replace(/'/g,"\"");
 			document.getElementById("classTitle").lastChild.innerHTML += butt; 
 			
 		}

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
 			var listOfStudents = students;
 			console.log(listOfStudents);
 			var lenOfClss =  eval("listOfStudents."+cName+".length");
 			var clss = JSON.parse(localStorage.getItem(name));

 			for (var i = lenOfClss - 1; i >= 0; i--) {
 				eval("var n = listOfStudents."+cName+"["+i+"].Name");
 				eval("var id = listOfStudents."+cName+"["+i+"].ID");

 				var pushing = "{'Name':'"+n+"', 'ID':'"+id+"'}";
 					pushing = pushing.replace(/'/g,"\"");
 				var jPush = JSON.parse(pushing);
 				clss.Student.push(jPush);
 			}
 			var wStudClss = JSON.stringify(clss);
 			localStorage.setItem(name,wStudClss);
 			//console.log(eval("listOfStudents.'IT322-9351B-10'"));


 		}


 		function addStud(){

 		}

 		function displayStud(){

 		}


 		




		/**
		9351B
		10:30
		IT322
		function readExternal(){
			request = new XMLHttpRequest();
			request.open('GET','students.json',true);

			request.onload = function(){a
				if(request.status >= 200 && request.status < 400){
					var data = JSON.parse(request.responseText);
					console.log(data);
				}else{

				}
			};

			request.onerror = function(){

			};
			request.send();
			}
		*/	
		