package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.dtos.StatusDto; // Importez votre DTO ici
import wcs.backend.entities.Status.Title;
import wcs.backend.services.StatusService;

@Component
public class StatusDataseed {

  @Autowired
  private StatusService statusService;

  public void resetData() {

    cleanData();
    if (statusService.getAllStatus().isEmpty()) {
      loadData();
    }
  }

  private void cleanData() {
    List<StatusDto> statusDtos = statusService.getAllStatus();
    for (StatusDto statusDto : statusDtos) {
      statusService.deleteStatus(statusDto.getId());
    }
  }

  private void loadData() {
    StatusDto statusTodoCreated = new StatusDto();
    statusTodoCreated.setStatusTitle(Title.TO_DO);
    statusService.createStatus(statusTodoCreated);

    StatusDto statusDoingCreated = new StatusDto();
    statusDoingCreated.setStatusTitle(Title.DOING);
    statusService.createStatus(statusDoingCreated);

    StatusDto statusDoneCreated = new StatusDto();
    statusDoneCreated.setStatusTitle(Title.DONE);
    statusService.createStatus(statusDoneCreated);
  }
}
