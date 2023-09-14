package wcs.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Status;
import wcs.backend.repositories.StatusRepository;

@Service
@AllArgsConstructor
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    public Status createStatus(Status status){
        return statusRepository.save(status);
    }

    public List<Status> getAllStatus(){
        return statusRepository.findAll();
    }
 
    public Status getStatusById(Long statusId){
        Optional<Status> status = statusRepository.findById(statusId);
        return status.get();
    }

    public Status updateStatus(Status status){
        Status existingStatus = statusRepository.findById(status.getId()).get();
        existingStatus.setTitle(status.getTitle());
        Status updatedStatus = statusRepository.save(existingStatus);
        return updatedStatus;
    }

    public void deleteStatus(Long statusId){
        statusRepository.deleteById(statusId);
    }



    
}
