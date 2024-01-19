// package wcs.backend.services;

// import org.modelmapper.ModelMapper;
// import org.springframework.stereotype.Service;

// import lombok.NoArgsConstructor;
// import wcs.backend.dtos.GlobalHistoricalDto;
// import wcs.backend.entities.GlobalHistorical;
// import wcs.backend.repositories.GlobalHistoricalRepository;

// @Service
// @NoArgsConstructor
// public class GlobalHistoricalService {

//     private GlobalHistoricalRepository globalHistoricalRepository;
//     private ModelMapper modelMapper;

//     public GlobalHistoricalService(GlobalHistoricalRepository globalHistoricalRepository, ModelMapper modelMapper) {
//         this.globalHistoricalRepository = globalHistoricalRepository;
//         this.modelMapper = modelMapper;
//     }

//     public void addEntry(GlobalHistoricalDto globalHistoricalDto) {
//         GlobalHistorical globalHistorical = modelMapper.map(globalHistoricalDto, GlobalHistorical.class);
//         globalHistoricalRepository.save(globalHistorical);
//     }

//     // Ajoutez d'autres méthodes nécessaires selon vos besoins

// }
