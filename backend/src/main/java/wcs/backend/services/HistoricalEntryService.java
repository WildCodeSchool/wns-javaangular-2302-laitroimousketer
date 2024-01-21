package wcs.backend.services;

import java.time.LocalDateTime;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.GlobalHistoricalDto;
import wcs.backend.dtos.TicketDto;
import wcs.backend.dtos.TicketHistoricalDto;
import wcs.backend.dtos.UserHistoricalDto;
import wcs.backend.dtos.UserReadDto;

@Service
@AllArgsConstructor
public class HistoricalEntryService {

  private GlobalHistoricalService globalHistoricalService;
  private UserHistoricalService userHistoricalService;
  private TicketHistoricalService ticketHistoricalService;
  private AuthService authService;

  @Transactional
  public void createTicketHistoricalEntries(TicketDto ticketDto, String action, Long ticketId) {
      // Création de l'entrée GlobalHistorical
      GlobalHistoricalDto globalHistoricalDto = createGlobalHistoricalDto(ticketDto, action, ticketId);
      globalHistoricalService.addEntry(globalHistoricalDto);
  
      // Création de l'entrée UserHistorical
      UserHistoricalDto userHistoricalDto = createUserHistoricalDto(ticketDto, action, ticketId);
      userHistoricalService.addEntry(userHistoricalDto);
  
      // Création de l'entrée TicketHistorical
      TicketHistoricalDto ticketHistoricalDto = createTicketHistoricalDto(ticketDto, action, ticketId);
      ticketHistoricalService.addEntry(ticketHistoricalDto);
  }
  
  private GlobalHistoricalDto createGlobalHistoricalDto(TicketDto ticketDto, String action, Long ticketId) {
      GlobalHistoricalDto globalHistoricalDto = new GlobalHistoricalDto();
      // Logique de création pour GlobalHistoricalDto
      globalHistoricalDto.setTicketId(ticketId);
      globalHistoricalDto.setTicketTitle(ticketDto.getTicketTitle());
      globalHistoricalDto.setAction(action);
      globalHistoricalDto.setTimestamp(LocalDateTime.now());
      globalHistoricalDto.setRead(false);
  
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication != null && authentication.isAuthenticated()) {
          // Create historical entries with the logged-in user
          UserReadDto loggedInUser = authService.getLoggedInUser();
          globalHistoricalDto.setUserId(loggedInUser.getId());
          globalHistoricalDto.setUserName(loggedInUser.getFirstname() + " " + loggedInUser.getLastname());
      } else {
          // Use the author of the ticket as a fallback or a default user
          globalHistoricalDto.setUserId(ticketDto.getAuthor().getId());
          globalHistoricalDto.setUserName(ticketDto.getAuthor().getFirstname() + " " + ticketDto.getAuthor().getLastname());
      }
  
      return globalHistoricalDto;
  }
  
  private UserHistoricalDto createUserHistoricalDto(TicketDto ticketDto, String action, Long ticketId) {
      UserHistoricalDto userHistoricalDto = new UserHistoricalDto();
      // Logique de création pour UserHistoricalDto
      userHistoricalDto.setTicketId(ticketId);
      userHistoricalDto.setTicketTitle(ticketDto.getTicketTitle());
      userHistoricalDto.setAction(action);
      userHistoricalDto.setTimestamp(LocalDateTime.now());
      userHistoricalDto.setRead(false);
  
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication != null && authentication.isAuthenticated()) {
          // Create historical entries with the logged-in user
          UserReadDto loggedInUser = authService.getLoggedInUser();
          userHistoricalDto.setUserId(loggedInUser.getId());
          userHistoricalDto.setUserName(loggedInUser.getFirstname() + " " + loggedInUser.getLastname());
      } else {
          // Use the author of the ticket as a fallback or a default user
          userHistoricalDto.setUserId(ticketDto.getAuthor().getId());
          userHistoricalDto.setUserName(ticketDto.getAuthor().getFirstname() + " " + ticketDto.getAuthor().getLastname());
      }
  
      return userHistoricalDto;
  }
  
  private TicketHistoricalDto createTicketHistoricalDto(TicketDto ticketDto, String action, Long ticketId) {
      TicketHistoricalDto ticketHistoricalDto = new TicketHistoricalDto();
      // Logique de création pour TicketHistoricalDto
      ticketHistoricalDto.setTicketId(ticketId);
      ticketHistoricalDto.setTicketTitle(ticketDto.getTicketTitle());
      ticketHistoricalDto.setAction(action);
      ticketHistoricalDto.setTimestamp(LocalDateTime.now());
      ticketHistoricalDto.setRead(false);
  
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication != null && authentication.isAuthenticated()) {
          // Create historical entries with the logged-in user
          UserReadDto loggedInUser = authService.getLoggedInUser();
          ticketHistoricalDto.setUserId(loggedInUser.getId());
          ticketHistoricalDto.setUserName(loggedInUser.getFirstname() + " " + loggedInUser.getLastname());
      } else {
          // Use the author of the ticket as a fallback or a default user
          ticketHistoricalDto.setUserId(ticketDto.getAuthor().getId());
          ticketHistoricalDto.setUserName(ticketDto.getAuthor().getFirstname() + " " + ticketDto.getAuthor().getLastname());
      }
  
      return ticketHistoricalDto;
  }
  

}
