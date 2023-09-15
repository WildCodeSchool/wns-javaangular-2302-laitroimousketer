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

    Priority priorityTodoCreated = new Priority();
    priorityTodoCreated.setTitle(Priority.Title.LOW);
    priorityService.createPriority(priorityTodoCreated);

    Priority priorityTodoCreated2 = new Priority();
    priorityTodoCreated2.setTitle(Priority.Title.MEDIUM);
    priorityService.createPriority(priorityTodoCreated2);

    Priority priorityTodoCreated3 = new Priority();
    priorityTodoCreated3.setTitle(Priority.Title.HIGH);
    priorityService.createPriority(priorityTodoCreated3);
  }

  private void cleanData() {
    List<Priority> prioritys = priorityService.getAllPriority();
    for (Priority priority : prioritys) {
      priorityService.deletePriority(priority.getId());
    }
  }

}
