package wcs.backend.dataseeds;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Priority;
import wcs.backend.services.PriorityService;

@Component
public class PriorityDataseed {

  @Autowired
  private PriorityService priorityService;

  public void resetData() {
    cleanData();
    loadData();
  }

  private void loadData() {
    Priority priorityDefaultCreated = new Priority();
    priorityDefaultCreated.setPriorityTitle(Priority.Title.DEFAULT);
    priorityService.createPriority(priorityDefaultCreated);

    Priority priorityLowCreated = new Priority();
    priorityLowCreated.setPriorityTitle(Priority.Title.LOW);
    priorityService.createPriority(priorityLowCreated);

    Priority priorityMediumCreated = new Priority();
    priorityMediumCreated.setPriorityTitle(Priority.Title.MEDIUM);
    priorityService.createPriority(priorityMediumCreated);

    Priority priorityHighCreated = new Priority();
    priorityHighCreated.setPriorityTitle(Priority.Title.HIGH);
    priorityService.createPriority(priorityHighCreated);
  }

  private void cleanData() {
    List<Priority> prioritys = priorityService.getAllPriority();
    for (Priority priority : prioritys) {
      priorityService.deletePriority(priority.getId());
    }
  }

}
