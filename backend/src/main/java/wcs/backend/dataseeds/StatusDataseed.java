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
    statusTodo.setStatusTitle("À faire");
    statusService.createStatus(statusTodo);

    StatusDto statusDoing = new StatusDto();
    statusDoing.setStatusTitle("En cours");
    statusService.createStatus(statusDoing);

    StatusDto statusDone = new StatusDto();
    statusDone.setStatusTitle("Terminé");
    statusService.createStatus(statusDone);
}

}
