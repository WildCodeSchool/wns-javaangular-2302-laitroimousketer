package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Status.Title;
import wcs.backend.services.StatusService;
import wcs.backend.entities.Status;

@Component
public class StatusDataseed {

  @Autowired
  private StatusService statusService;

  public void resetData() {
    cleanData();
    loadData();
  }
  
  private void cleanData() {
    List<Status> statuss = statusService.getAllStatus();
    for (Status status : statuss) {
      statusService.deleteStatus(status.getId());
    }
  }

  private void loadData() {
        Status statusTodoCreated = new Status();
        statusTodoCreated.setTitle(Title.TO_DO);
        statusService.createStatus(statusTodoCreated);

        Status statusDoingCreated = new Status();
        statusDoingCreated.setTitle(Title.DOING);
        statusService.createStatus(statusDoingCreated);

        Status statusDoneCreated = new Status();
        statusDoneCreated.setTitle(Title.DONE);
        statusService.createStatus(statusDoneCreated);

      }
}
