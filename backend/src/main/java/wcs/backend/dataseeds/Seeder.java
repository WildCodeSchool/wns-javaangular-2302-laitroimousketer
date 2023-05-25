package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Seeder implements CommandLineRunner{

    // inject below the dependencies needed, i.e. class containing seed datas and then add each corresponding resetData() method in run (); 
    @Autowired
    private TicketDataseed ticketDataseed;
    
    @Autowired
    private CategoryDataseed categoryDataseed;

    // The order of the entities seeded is IMPORTANT !
    public void run(String...args)  throws Exception {
        categoryDataseed.resetData();
        ticketDataseed.resetData();
     }    
}
