package wcs.backend.dataseeds;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Status;
import wcs.backend.services.StatusService;

@Component
public class StatusDataseed {

    @Autowired
    private StatusService statusService;
    final int STATUS_NB = 3;

    public void resetData(){
        cleanData();
        loadData();
    }

    private void loadData() {
        
        for (int i = 0; i < this.STATUS_NB; i++) {
            Status statusCreated = new Status();
            statusCreated.setTitle("status_title_" + i);
            this.statusService.createStatus(statusCreated);
        }
     }

    private void cleanData(){
        List<Status> statuss = statusService.getAllStatus();
        for (Status status : statuss) {
            statusService.deleteStatus(status.getId());
        }
    }

}
