package wcs.backend.dataseeds;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wcs.backend.dtos.AddressDto;
import wcs.backend.services.AddressService;

import java.util.Locale;

@Component
public class AddressDataseed {

    @Autowired
    private AddressService addressService;
    public void resetData() {
      if (addressService.getAllAddresses().isEmpty()) {
        generateAddresses(50); // Appel direct à generateUsers() s'il n'y a pas d'utilisateurs
      }
    }
    public void generateAddresses(int numberOfAddresses) {
        Faker faker = new Faker(new Locale("fr"));

        for (int i = 0; i < numberOfAddresses; i++) {
            AddressDto addressDto = new AddressDto();
            addressDto.setCity(faker.address().city());
            addressDto.setCountry(faker.address().country());
            
            // Convertir les valeurs String en double pour latitude et longitude
            double latitude = Double.parseDouble(faker.address().latitude().replace(',', '.'));
            double longitude = Double.parseDouble(faker.address().longitude().replace(',', '.'));
            
            addressDto.setLatitude(latitude);
            addressDto.setLongitude(longitude);
            
            
            addressDto.setPostcode(faker.address().zipCode());
            addressDto.setStreet_l1(faker.address().streetAddress());
            addressDto.setStreet_l2(faker.address().secondaryAddress());

            addressService.createAddress(addressDto); // Utilisez votre méthode de création d'adresse
        }
    }
    
}
