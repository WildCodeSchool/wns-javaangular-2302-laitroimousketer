package wcs.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.GlobalHistoricalDto;
import wcs.backend.services.GlobalHistoricalService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/historical/")
@Tag(name = "Historical", description = "Historical Management Controller")
public class GlobalHistoricalController {
  private final GlobalHistoricalService globalHistoricalService;

    // Endpoint pour récupérer tous les GlobalHistoricals
    @GetMapping
    public ResponseEntity<List<GlobalHistoricalDto>> getAllGlobalHistoricals() {
        List<GlobalHistoricalDto> globalHistoricals = globalHistoricalService.getAllGlobalHistoricals();
        return new ResponseEntity<>(globalHistoricals, HttpStatus.OK);
    }

    // Endpoint pour récupérer un GlobalHistorical par son ID
    @GetMapping("{id}")
    public ResponseEntity<GlobalHistoricalDto> getGlobalHistoricalById(@PathVariable Long id) {
        GlobalHistoricalDto globalHistorical = globalHistoricalService.getGlobalHistoricalById(id);
        return new ResponseEntity<>(globalHistorical, HttpStatus.OK);
    }

    // Endpoint pour mettre à jour le statut isRead d'un GlobalHistorical
    @PutMapping("{id}")
    public ResponseEntity<Void> updateIsReadStatus(@PathVariable Long id, @RequestParam boolean isRead) {
        globalHistoricalService.updateIsReadStatus(id, isRead);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
