import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.help.HelperAndResource;
import com.pojos.Template;

public class DatastoreOperations {
	
	
	
	public static boolean saveTemplate(Template template){
       
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		
		Key key = KeyFactory.createKey(HelperAndResource.getTemplatename(), template.getTemplatename());
		
		boolean result = false;
		
		// Lets see if such a template exists
		try{
            Entity e5 = ds.get(key);
            
			result = false;
		}catch(EntityNotFoundException ex){
			
		    Entity tmpl= new Entity(HelperAndResource.getTemplatename(), template.getTemplatename());
			tmpl.setProperty(HelperAndResource.getTemplatename(), template.getTemplatename());
			tmpl.setProperty(HelperAndResource.getTemplatecontent(), template.getTemplate());
				
			ds.put(tmpl);
			result = true;
		}
	    return result;
	}
	
	
	public static List<Template> getAllTemplates(){
		
		List<Template> templatesList = new ArrayList<Template>();
		
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		
		Query q = new Query(HelperAndResource.getTemplatename());
		PreparedQuery pq = ds.prepare(q);
		
		for (Entity result : pq.asIterable()) {
			  String templatename = (String) result.getProperty(HelperAndResource.getTemplatename());
			  String template = (String) result.getProperty(HelperAndResource.getTemplatecontent());
              
			  Template templ = new Template();
			  templ.setTemplatename(templatename);
			  templ.setTemplate(template);
			  
			  templatesList.add(templ);
		}
		
		
		return templatesList;
	}
}
