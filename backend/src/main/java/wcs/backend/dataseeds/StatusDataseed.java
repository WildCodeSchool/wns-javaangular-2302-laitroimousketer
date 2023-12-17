package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.dtos.StatusDto; // Importez votre DTO ici
import wcs.backend.services.StatusService;

@Component
public class StatusDataseed {

  @Autowired
  private StatusService statusService;

  public void resetData() {
    if (statusService.getAllStatus().isEmpty()) {
      loadData();
    }
  }

  private void loadData() {
    StatusDto statusTodo = new StatusDto();
    statusTodo.setStatusTitle("TODO");
    statusService.createStatus(statusTodo);

    StatusDto statusDoing = new StatusDto();
    statusDoing.setStatusTitle("DOING");
    statusService.createStatus(statusDoing);

    StatusDto statusDone = new StatusDto();
    statusDone.setStatusTitle("DONE");
    statusService.createStatus(statusDone);
}

}
