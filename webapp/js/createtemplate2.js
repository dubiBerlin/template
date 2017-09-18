$(document).ready( function(){
	
	var buttonID = "";
	
	$("button").click(function(e){
		
		buttonID = e.target.id;
		
		var pos = "";
		
		if(buttonID.includes("edit")){
			
			pos = buttonID.replace("edit", "");
			$("#headerTitle").text("Edit");
			$("#posLabelInArray").text(pos);
		}
		else{
			if(buttonID.includes("del")){
				pos = buttonID.replace("del", "");
				var sliced = _labels.splice(pos, 1);
				
				$("#listOfLabels").empty();
				$("#listOfLabels").append(appendLabels()); 
				$.getScript('js/createtemplate2.js');
			}
		}
		
	
     });
	
	// We have to create this function again because its not recognized out of createtemplate.js
	function appendLabels(){
      
	  var row = "";
	  
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
	
	function delLabel(btnID){
		alert("delLabel");
	}
	
});