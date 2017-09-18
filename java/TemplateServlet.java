

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.help.HelperAndResource;
import com.pojos.Template;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class TemplateServlet
 */
public class TemplateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TemplateServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Lets see whats the purpose for the request is
		String purpose = request.getParameter("purpose");
		
		switch(purpose){
		  case "saveNewTemplate": // createTemplate.js
			  saveNewTemplateIntoDB(request, response);
			  break;
		  case "getAllTemplates": // called in parsing.js in order to receive all templates to fill the dropdpwn
			  getAllTemplates(request, response);
			  break;
		} 
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * 
	 * Returns a list of all created templates
	 */
	private void getAllTemplates(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		List<Template> templates = DatastoreOperations.getAllTemplates();
		
		JSONArray jsonArray = new JSONArray();
		
		
		for(int i = 0; i < templates.size(); i++){
			JSONObject jsonObj = new JSONObject();
			jsonObj.put(HelperAndResource.getTemplatename(), templates.get(i).getTemplatename());
			jsonObj.put(HelperAndResource.getTemplatecontent(), templates.get(i).getTemplate());
			
			jsonArray.add(jsonObj);
		}
		
		JSONObject returnObj = new JSONObject();
		
		returnObj.put("templates", jsonArray);
		
		
		response.setContentType("application/json");
		response.getWriter().write(returnObj.toString());
		
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * Saves a new created template into googles datastore DB
	 * The New template was created on tmplcreation.html and createtemplate.js
	 */
	private void saveNewTemplateIntoDB(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String templatename = request.getParameter("templateName");
		String templ  = request.getParameter("template");
	      
		System.out.println("tmplNAme: "+templatename);
		System.out.println("templ: "+templ);
		
		Template template = new Template();
		template.setTemplatename(templatename);
		template.setTemplate(templ);
		
		JSONObject json = new JSONObject();
		 
		if(DatastoreOperations.saveTemplate(template)){
		  
		    json.put("templateSaved", "success");
			json.put("resultText", "Template was saved successfully");
		}else{
		
			json.put("templateSaved", "failed");
			json.put("resultText", "Templatename already exists");
		}
		response.getWriter().write(json.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
