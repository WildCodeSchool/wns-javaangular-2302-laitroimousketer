package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wcs.backend.dtos.PriorityDto;
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

    PriorityDto priorityLow = new PriorityDto();
    priorityLow.setPriorityTitle("LOW");
    priorityService.createPriority(priorityLow);

    PriorityDto priorityMedium = new PriorityDto();
    priorityMedium.setPriorityTitle("MEDIUM");
    priorityService.createPriority(priorityMedium);

    PriorityDto priorityHigh = new PriorityDto();
    priorityHigh.setPriorityTitle("HIGH");
    priorityService.createPriority(priorityHigh);
  }
}
