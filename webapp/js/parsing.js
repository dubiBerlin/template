$(document).ready(function(){
	
    // Füge de
	//$("#txtArea").val( $("#preValue").text());
	var _preValues = "";
	var _btnHasBeenClicked = false;
	var _labelsArray = [];
	var _comments = "";
	
	/*
	 * The green template button
	 * */
	$("#templBtn1").click(function(e){
		var textAreaContent = $("#txtArea").val();
	    if(textAreaContent!==""){
		  
	    }
			//savePrevValues();	
			parseTemplate1();
			_btnHasBeenClicked = true;
	});
	
	$.getJSON('TemplateServlet', { purpose: "getAllTemplates"}, function(data){
		for(var i = 0; i < data.templates.length; i++){
			console.log(data.templates[i].Templatename+"\n"+data.templates[i].Templatecontent);
			_loadedTemplates.push(createTemplateObject(data.templates[i].Templatename, data.templates[i].Templatecontent));
			
			$("#tmplDropDown").append("<li id='"+i+"'><a data-value='"+i+"'>"+data.templates[i].Templatename+"</a></li>")
		}
		printArray();
		$.getScript('js/parsing2.js');
	});
	
	function printArray(){
		console.log("_printArray_____")
		for(var i = 0; i < _loadedTemplates.length;i++){
			console.log(_loadedTemplates[i].Templatename+"\n"+_loadedTemplates[i].Templatecontent);
		}
	}
	
	/**
	 * param1: Name of the template
	 * param2: Template content
	 * purpose: creates and returns a template object
	 */
	function createTemplateObject(strTemplatename, strTemplate){
		var template = {
			Templatename: strTemplatename,
			Templatecontent: strTemplate
		}
		return template;
	}
	
	
	function parseTemplate1(){
		
//        var sourceTxt = $("#template").text();
//		
//		$("#txtArea").val( sourceTxt+" \n "+_preValues);
		
		takeTemplateOutOfTextArea1();
		createTemplate();
		
//		printLblArray();
	}
	
	
	function createElement( label, sectionLabel, id, required, userInput){
		
		var newElement = {};

		if(label!=="" || label!==null){
			newElement.label = label;
		}else{
			newElement.label = "";
		}
		if(sectionLabel!=="" || sectionLabel!==null){
			newElement.sectionLabel = sectionLabel;
		}else{
			newElement.sectionLabel = "";
		}
		if(id!=="" || id!==null){
			newElement.id = id;
		}
		if(required!==null){
			newElement.required = required;
		}
		if(userInput!=="" || userInput!==null){
			newElement.userInput = userInput;
		}else{
			newElement.userInput = "";
		}
		return newElement;
	}
	
	
	function takeTemplateOutOfTextArea1(){
		
		var txtAreaVal =  $("#txtArea").val();
//        alert("text val area: "+txtAreaVal);
		// Regex: Finde alle ===Bla bla bla===
		var regex = /===.*===/;
		
		
//		var rows = txtAreaVal.split(regex);
		
		var rows = txtAreaVal.split("\n");
		
		var i = 0;
		
		
		while(i < rows.length){
			
			if(rows[i].match(regex) && rows[i]!=="===General Information===" && rows[i].trim()!=="===Comments==="){
				

				console.log("==== "+rows[i]+" ====");
				var sectionLabel = rows[i].replace(/=/g,"");
				console.log(""+sectionLabel);
				
				_labelsArray.push(createElement("",sectionLabel, 0, false, ""));
				
				var u = i+1;
				
				// we walk through the labels of the === === section
				while(!rows[u].match(regex) && u < rows.length-1){
					
					console.log(u+" "+rows[u]);
					
					var lbl = rows[u];//.replace(/\.|:/g,"");
					
					var required = "";
					
					if(rows[u].includes("*")){
						required = true;
					}else{
						required = false;
					}
					
					_labelsArray.push(createElement(lbl,"", u, required, ""));
					
					u++;
				}
				
				i = u;
				
			}else{
				if(rows[i].trim()==="===Comments==="){
					
					console.log(rows[i]);
					
					_comments = _comments +"\n"+rows[i];
					
					var u = i+1;
					
					while( u < rows.length-1){
						_comments = _comments+"\n"+rows[u];
						u++;
					}
					break;
					
				}else{
					i++;
				}	
			}
		}
	}
	
		
	function createTemplate(){
		
		var overlay = $("#modalContent");
		
		
		var table = "";
		var i = 0;
		while(i < _labelsArray.length){
//			alert("i "+i);
			if(_labelsArray[i].sectionLabel!==""){
				table = table+"<div class='row' >" +
				                "<div class='col-md-4'><h4>"+_labelsArray[i].sectionLabel+"</h4></div>"+	
				                "<div class='col-md-8'></div>"+
				              "</div>";
			}else{
				if(_labelsArray[i].label!=="" ){
					
					var label = _labelsArray[i].label.replace(/\.|:/g,"");
					
					table = table+"<div class='row' >" +
				                    "<div class='col-md-4'>"+label+"</div>";	
				                    if(_labelsArray[i].required===true){
				                    	table = table+"<div class='col-md-8'><input type='text' id='"+_labelsArray[i].id+"' style='width: 70%;' required>"+"</div>";
				                    }else{
				                    	table = table+"<div class='col-md-8'><input type='text' id='"+_labelsArray[i].id+"' style='width: 70%;'>"+"</div>";
				                    }
				                    
				                    table = table+"</div>";
				}
			}
			i++;
			  
		}
		
		overlay.html(table);
		overlay.show();
	}
	
	
	
	
	function savePrevValues(){
		_preValues = $("#txtArea").val();
	}
	
	
	
	function getPrevValues(){
		return _preValues;
	}
	
	function printLblArray(){
		
		console.log("\nprintLBLARRAY")

		for(var i = 0; i < _labelsArray.length; i++){
			if(_labelsArray[i].label!==""){
				console.log(i+"_: "+_labelsArray[i].label);
			}else{
				console.log(i+"_: ======"+_labelsArray[i].sectionLabel+"======");
			}
			
		}
	}
	
	$("#saveTmplBtn").click(function(){
		saveTemplateContent();
	} );
	
	
	function saveTemplateContent(){
		
		var newTxtAreaContent = "";
		
		for(var i = 0; i < _labelsArray.length-1; i++){
			
			var requiredFieldNotFilled = false;
			
			var id = _labelsArray[i].id;
			
			console.log("id: "+id);
			
			if(id > 0){
				var txt = $("#"+id).val();
				newTxtAreaContent = newTxtAreaContent + _labelsArray[i].label+"\n"+txt+"\n";
			}
		}
		
		newTxtAreaContent = newTxtAreaContent+"\n"+_comments;
		$("#txtArea").val("");
		$("#txtArea").val(newTxtAreaContent);
	}
	

	function takeTemplateOutOfTextArea2(){
		
		var txtAreaVal =  $("#txtArea").val();
		
		var rows = txtAreaVal.split("\n");
		
		/*
		 *  ^  Ausdruck muss am Anfang stehen
		 *  d eine einzelne Dezimalzahl
		 *  * eine beliebig lange Reihenfolge von Dezimalzahlen
		 *  - Das Minuszeichen muss hinten dran sein
		 *  s gefolt von einem Leerzeichen
		 *  s gefolt von einem Leerzeichen
		 */
		var regex = /^\d*-\s\s/g;
		
		for(var i = 0; i < rows.length; i++){
			if(rows[i].match(regex)){
				
			    var searched = regex.exec(rows[i]);
				var label = rows[i].replace(searched, "");
				
				var newElement = {};
				newElement.id = "win_"+i;
				newElement.label = label;
				
				_labelsArray.push(newElement);
			}
		}		
	}
});