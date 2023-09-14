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
  private TicketDataseed ticketDataseed;

  @Autowired
  private CategoryDataseed categoryDataseed;

  @Autowired
  private StatusDataseed statusDataseed;

  public void run(String... args) throws Exception {
    // The order of the entities seeded is IMPORTANT !
    roleDataseed.resetData();
    userDataseed.resetData();
    categoryDataseed.resetData();
    statusDataseed.resetData();
    ticketDataseed.resetData();
  }
}
