package wcs.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Status;
import wcs.backend.services.StatusService;

@AllArgsConstructor
@RestController
@RequestMapping("api/status")
@CrossOrigin(origins = "*")
public class StatusController {

    private StatusService statusService;

    // build create status REST API
    @PostMapping
    public ResponseEntity<Status> createstatus(@RequestBody Status status){
        Status savedstatus = statusService.createStatus(status);
        return new ResponseEntity<>(savedstatus, HttpStatus.CREATED);
    }

    // build get status by id REST API
    // http://localhost:8080/api/status/1
    @GetMapping("{id}")
    public ResponseEntity<Status> getstatusById(@PathVariable("id") Long statusId){
        Status status = statusService.getStatusById(statusId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

    // Build Get All statuss REST API
    // http://localhost:8080/api/status
    @GetMapping
    public ResponseEntity<List<Status>> getAllstatuss(){
        List<Status> status = statusService.getAllStatus();
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
    // Build Update status REST API
    @PutMapping("{id}")
    // http://localhost:8080/api/status/1
    public ResponseEntity<Status> updatestatus(@PathVariable("id") Long statusId,
                                           @RequestBody Status status){
        status.setId(statusId);
        Status updatedStatus = statusService.updateStatus(status);
        return new ResponseEntity<>(updatedStatus, HttpStatus.OK);
    }

    // Build Delete status REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletestatus(@PathVariable("id") Long statusId){
        statusService.deleteStatus(statusId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
