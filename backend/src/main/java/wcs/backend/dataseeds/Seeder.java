package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Seeder implements CommandLineRunner {
    // inject below the dependencies needed, i.e. class containing seed datas and
    // then add each corresponding resetData() method in run ();
    @Autowired
    private RoleDataseed roleDataseed;
    @Autowired
    private UserDataseed userDataseed;
    @Autowired
    private CategoryDataseed categoryDataseed;
    @Autowired
    private StatusDataseed statusDataseed;
    @Autowired
    private PriorityDataseed priorityDataseed;
    @Autowired
    private AddressDataseed addressDataseed;
    @Autowired
    private TicketDataSeed ticketDataseed;


    public void run(String... args) throws Exception {
        // The order of the entities seeded is IMPORTANT !
        roleDataseed.resetData();
        addressDataseed.resetData();
        userDataseed.resetData();
        statusDataseed.resetData();
        categoryDataseed.resetData();
        priorityDataseed.resetData();
        ticketDataseed.resetData();
    }
}
