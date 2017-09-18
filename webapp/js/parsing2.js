$(document).ready(function(){
	

	/*
	 * 
	 * */
//	$("#tmplDropDown a li").click(function(e){
//		var selectedTemplate = $(this).text();
//		$('#selected').text(selectedTemplate);
//	});
	
	$("li").click(function(e){
		var pos = this.id;
		
		var templateName = _loadedTemplates[pos].Templatename;
		var template = _loadedTemplates[pos].Templatecontent;
		$("#txtArea").val("");
		$("#txtArea").val(template);
		$("#displayTitle").text(templateName);
		$('#selected').text($(this).text());
//		var selectedTemplate = $(this).text();
//		$('#selected').text(selectedTemplate);
	});
	
});