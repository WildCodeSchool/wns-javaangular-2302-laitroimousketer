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
    if (priorityService.getAllPriority().isEmpty()) {
      loadData();
    }
  }

  private void loadData() {

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
}
