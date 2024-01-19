package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Component
public class Seeder implements CommandLineRunner {
  // inject below the dependencies needed, i.e. class containing seed datas and
  // then add each corresponding resetData() method in run ();
  @PersistenceContext
  private EntityManager entityManager;

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

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    // Chargez toutes les entités avant de les utiliser
    loadEntities();

    // Le reste du code
    roleDataseed.resetData();
    addressDataseed.resetData();
    userDataseed.resetData();
    statusDataseed.resetData();
    categoryDataseed.resetData();
    priorityDataseed.resetData();
    ticketDataseed.resetData();
  }

  private void loadEntities() {
    // Chargez chaque entité une par une, par exemple :
    entityManager.createQuery("SELECT r FROM Role r").getResultList();
    entityManager.createQuery("SELECT a FROM Address a").getResultList();
    entityManager.createQuery("SELECT u FROM User u").getResultList();
    entityManager.createQuery("SELECT s FROM Status s").getResultList();
    entityManager.createQuery("SELECT c FROM Category c").getResultList();
    entityManager.createQuery("SELECT p FROM Priority p").getResultList();
    entityManager.createQuery("SELECT t FROM Ticket t").getResultList();
    // ... Ajoutez d'autres entités au besoin
  }
}
