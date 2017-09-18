$(document).ready(function(){
	
	window._labels = ["===Customer Information===","User ID......:","Name.........:","Site.........:","Location.....:","Phone........:","Issue Type...:"];
	var buttonID = "";
	
	$("#listOfLabels").append(appendLabels());
	
	
	$("button").click(function(e){
		   
//        buttonID = e.target.id;
//		
//		var pos = "";
//		
//		if(buttonID.includes("edit")){
//			
//			pos = buttonID.replace("edit", "");
//			$("#headerTitle").text("Edit");
//			$("#posLabelInArray").text(pos);
//		}
//		else{
//			if(buttonID.includes("del")){
//				pos = buttonID.replace("del", "");
//				alert("delete:\n"+pos+": "+_labels[pos]);
//				_labels.slice(pos, 1);
//				$("#listOfLabels").empty();
//				$("#listOfLabels").append(appendLabels()); 
//				$.getScript('js/createtemplate2.js');
//			}
//		}
			
		
	});
	
	// The button which saves the created template
	$("#saveTmplBtn").click(function(){
		var tmplName = $("#templateName").val();
		if(tmplName!==""){
			saveTemplateIntoDB(tmplName);
		}else{
			alert("PLEASE ENTER A TEMPLATE NAME");
		}
	});
	
	$("#newSectionBtn").click(function(){
		$("#headerTitle").text("Section label");
	});
	
	
	$("#newLabelBtn").click(function(){
		$("#headerTitle").text("Label");
	});
	
	$("#saveLabelModalBtn").click(function(e){
		
		saveNewLabelIntoTextArea();
	});
	
	
	function saveNewLabelIntoTextArea(){
	  
	  // Take the new label name out of textfield in modal 
      var newLabel =  $("#newLabelNameTxtArea").val().trim();
		
      // check if something was entered
	  if(newLabel!==""){
		  
		var headerTitle = $("#headerTitle").text();
	    
		if(newLabel.includes("=")){
			alert("Remove the = sign");
			return;
		}
		
		
		if(headerTitle==="Section label"){
		  newLabel = "==="+newLabel+"===";
		  _labels.push(newLabel);
		}
		if(headerTitle==="Label"){
			newLabel = newLabel+".......:";
			_labels.push(newLabel);
		}
		if(headerTitle==="Edit"){
			
			// We take out the position of the label in the array
			// which is saved in the hidden div put by createtemplate2.js edit button 
			// click event
			var position = $("#posLabelInArray").text();
			edit(newLabel, position);
		}
		//var preValuesTextArea = $("#txtArea").val();
		
		
		
		// first remove all rows whose are childs
		$("#listOfLabels").empty();
		$("#listOfLabels").append(appendLabels());
		
		$.getScript('js/createtemplate2.js');
	  }
	}
	
	// sets all the labels into the div
	function appendLabels(){
      
	  var row = "";
	  console.log("\nappendLabels");
	  
	  for(var i = 0; i < _labels.length;i++){
		  
	    if(i>6){
	      row = row+'<div class="row" style="margin-top:5px; ">'+
                       '<div class="col-lg-4 text-left" >'+
                         _labels[i]+
                       '</div>'+
                       '<div class="col-lg-4 text-left" >'+
                       "<button type='button' class='btn btn-default'   data-toggle='modal' data-target='#overlay' id='edit"+i+"' '>Edit</button>"+
                       '</div>'+
                       '<div class="col-lg-4 text-left" >'+
                       "<button type='button' class='btn btn-danger' id='del"+i+"'>Delete</button>"+
                       '</div>'+
                   '</div>';     	
	    }
	    else{
	      row = row+'<div class="row" >'+
                      '<div class="col-lg-12 text-left" >'+
                        _labels[i]+
                      '</div>'+
                    '</div>'; 
	    }
	    }
	  return row;
	}
	
	function printLabels(){
		console.log("printLabels");
		for(var i = 0; i < _labels.length;i++){
			console.log(""+_labels[i]);
		}
	}
	
	/*
	 * This function can be called only after the createtemplate2.js has
	 * been loaded. The user enters a label and the label has an Edit button. The edit button
	 * just puts the String EDIT in the Modal widget and saves the position of the array in the hidden div.
	 * */
	function edit(newLabel, pos){
		
		var oldLabel = _labels[pos];
		
		// We check if its a section label or not
		var regex = /===.*===/;
		
		if(oldLabel.match(regex)){
			newLabel = "==="+newLabel+"===";
		}else{
			newLabel = newLabel+".......:";
		}
		_labels[pos] = newLabel;
	}
	
	
	/*
	 * Saves the template content into the DB
	 * */
	function saveTemplateIntoDB(tmplName){
		
		var strTemplateContent = createTemplatetoString();
		
		var saveNewTemplate = "saveNewTemplate";
		
		/*
		 * param 1: name of the template
		 * param 2: the template content
		 * param 3: purpose of the request. In TemplateServlet we know what to do through the purpose param.
		 */
		$.getJSON('TemplateServlet', { templateName: tmplName, template: strTemplateContent, purpose: saveNewTemplate  }, function(data) {
		    
		    if(data.templateSaved==="success"){
		    	$("#serverResponse").empty();
		    	$("#serverResponse").addClass('col-lg-12 text-center text-primary ').removeClass('col-lg-12 text-danger ');
		    	$("#serverResponse").append(data.resultText).hide().fadeIn(1000);
		    }else{
		    	$("#serverResponse").empty();
		    	$("#serverResponse").addClass("col-lg-12 text-danger text-center");
		    	$("#serverResponse").append(data.resultText).hide().fadeIn(1000);
		    }
		    
		    
		});
	}
	
	function createTemplatetoString(){
		
		var strTempl = "";
		
		for(var i = 0; i < _labels.length; i++){
			strTempl = strTempl+"\n"+_labels[i];
		}
		strTempl = strTempl+"\n"+"===Comments===";
		return strTempl;
	}
	
	
});