import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

public class HelloAppEngine extends HttpServlet {

  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

public void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws IOException {
      
	  String templatename = request.getParameter("templateName");
	  String templ  = request.getParameter("template");
      
	  System.out.println("tmplNAme: "+templatename);
	  System.out.println("templ: "+templ);
	  JSONObject json = new JSONObject();
		json.put("templateSaved", "success");
		json.put("resultText", "Template was saved successfully");
		
		response.getWriter().write(json.toString());
	  
	  
  }
}