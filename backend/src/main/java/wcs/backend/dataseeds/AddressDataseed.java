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

        switch (i % 41) {  // Utilisez 41 car vous avez 41 villes
        case 0:
          // Paris
          addressDto.setCity("Paris");
          addressDto.setLatitude(48.8566);
          addressDto.setLongitude(2.3522);
          addressDto.setPostcode("75000");
          break;
        case 1:
          // Marseille
          addressDto.setCity("Marseille");
          addressDto.setLatitude(43.2965);
          addressDto.setLongitude(5.3698);
          addressDto.setPostcode("13000");
          break;
        case 2:
          // Lyon
          addressDto.setCity("Lyon");
          addressDto.setLatitude(45.7578);
          addressDto.setLongitude(4.8320);
          addressDto.setPostcode("69000");
          break;
        case 3:
          // Toulouse
          addressDto.setCity("Toulouse");
          addressDto.setLatitude(43.6047);
          addressDto.setLongitude(1.4442);
          addressDto.setPostcode("31000");
          break;
        case 4:
          // Nice
          addressDto.setCity("Nice");
          addressDto.setLatitude(43.7102);
          addressDto.setLongitude(7.2620);
          addressDto.setPostcode("06000");
          break;
        case 5:
          // Nantes
          addressDto.setCity("Nantes");
          addressDto.setLatitude(47.2184);
          addressDto.setLongitude(-1.5536);
          addressDto.setPostcode("44000");
          break;
        case 6:
          // Strasbourg
          addressDto.setCity("Strasbourg");
          addressDto.setLatitude(48.5734);
          addressDto.setLongitude(7.7521);
          addressDto.setPostcode("67000");
          break;
        case 7:
          // Montpellier
          addressDto.setCity("Montpellier");
          addressDto.setLatitude(43.6110);
          addressDto.setLongitude(3.8767);
          addressDto.setPostcode("34000");
          break;
        case 8:
          // Bordeaux
          addressDto.setCity("Bordeaux");
          addressDto.setLatitude(44.8378);
          addressDto.setLongitude(-0.5792);
          addressDto.setPostcode("33000");
          break;
        case 9:
          // Lille
          addressDto.setCity("Lille");
          addressDto.setLatitude(50.6292);
          addressDto.setLongitude(3.0573);
          addressDto.setPostcode("59000");
          break;
        case 10:
          // Rennes
          addressDto.setCity("Rennes");
          addressDto.setLatitude(48.1173);
          addressDto.setLongitude(-1.6778);
          addressDto.setPostcode("35000");
          break;
        case 11:
          // Le Havre
          addressDto.setCity("Le Havre");
          addressDto.setLatitude(49.4944);
          addressDto.setLongitude(0.1070);
          addressDto.setPostcode("76600");
          break;
        case 12:
          // Reims
          addressDto.setCity("Reims");
          addressDto.setLatitude(49.2583);
          addressDto.setLongitude(4.0317);
          addressDto.setPostcode("51100");
          break;
        case 13:
          // Saint-Étienne
          addressDto.setCity("Saint-Étienne");
          addressDto.setLatitude(45.4397);
          addressDto.setLongitude(4.3872);
          addressDto.setPostcode("42000");
          break;
        case 14:
          // Toulon
          addressDto.setCity("Toulon");
          addressDto.setLatitude(43.1242);
          addressDto.setLongitude(5.9280);
          addressDto.setPostcode("83000");
          break;
        case 15:
          // Grenoble
          addressDto.setCity("Grenoble");
          addressDto.setLatitude(45.1885);
          addressDto.setLongitude(5.7245);
          addressDto.setPostcode("38000");
          break;
        case 16:
          // Dijon
          addressDto.setCity("Dijon");
          addressDto.setLatitude(47.3216);
          addressDto.setLongitude(5.0415);
          addressDto.setPostcode("21000");
          break;
        case 17:
          // Angers
          addressDto.setCity("Angers");
          addressDto.setLatitude(47.4784);
          addressDto.setLongitude(-0.5632);
          addressDto.setPostcode("49000");
          break;
        case 18:
          // Nîmes
          addressDto.setCity("Nîmes");
          addressDto.setLatitude(43.8367);
          addressDto.setLongitude(4.3601);
          addressDto.setPostcode("30000");
          break;
        case 19:
          // Villeurbanne
          addressDto.setCity("Villeurbanne");
          addressDto.setLatitude(45.7719);
          addressDto.setLongitude(4.8900);
          addressDto.setPostcode("69100");
          break;

        case 20:
          // Lorient
          addressDto.setCity("Lorient");
          addressDto.setLatitude(47.7489);
          addressDto.setLongitude(-3.3700);
          addressDto.setPostcode("56100");
          break;
        case 21:
          // Amiens
          addressDto.setCity("Amiens");
          addressDto.setLatitude(49.8941);
          addressDto.setLongitude(2.3024);
          addressDto.setPostcode("80000");
          break;
        case 22:
          // Limoges
          addressDto.setCity("Limoges");
          addressDto.setLatitude(45.8336);
          addressDto.setLongitude(1.2611);
          addressDto.setPostcode("87000");
          break;
        case 23:
          // Clermont-Ferrand
          addressDto.setCity("Clermont-Ferrand");
          addressDto.setLatitude(45.7772);
          addressDto.setLongitude(3.0870);
          addressDto.setPostcode("63000");
          break;
        case 24:
          // Besançon
          addressDto.setCity("Besançon");
          addressDto.setLatitude(47.2378);
          addressDto.setLongitude(6.0241);
          addressDto.setPostcode("25000");
          break;
        case 25:
          // Le Mans
          addressDto.setCity("Le Mans");
          addressDto.setLatitude(48.0061);
          addressDto.setLongitude(0.1996);
          addressDto.setPostcode("72000");
          break;
        case 26:
          // Brest
          addressDto.setCity("Brest");
          addressDto.setLatitude(48.3904);
          addressDto.setLongitude(-4.4864);
          addressDto.setPostcode("29200");
          break;
        case 27:
          // Perpignan
          addressDto.setCity("Perpignan");
          addressDto.setLatitude(42.6986);
          addressDto.setLongitude(2.8954);
          addressDto.setPostcode("66000");
          break;
        case 28:
          // Nancy
          addressDto.setCity("Nancy");
          addressDto.setLatitude(48.6921);
          addressDto.setLongitude(6.1844);
          addressDto.setPostcode("54000");
          break;
        case 29:
          // Rouen
          addressDto.setCity("Rouen");
          addressDto.setLatitude(49.4431);
          addressDto.setLongitude(1.0993);
          addressDto.setPostcode("76000");
          break;
        case 30:
          // Avignon
          addressDto.setCity("Avignon");
          addressDto.setLatitude(43.9493);
          addressDto.setLongitude(4.8055);
          addressDto.setPostcode("84000");
          break;
        case 31:
          // La Rochelle
          addressDto.setCity("La Rochelle");
          addressDto.setLatitude(46.1591);
          addressDto.setLongitude(-1.1520);
          addressDto.setPostcode("17000");
          break;
        case 32:
          // Annecy
          addressDto.setCity("Annecy");
          addressDto.setLatitude(45.8992);
          addressDto.setLongitude(6.1294);
          addressDto.setPostcode("74000");
          break;
        case 33:
          // Poitiers
          addressDto.setCity("Poitiers");
          addressDto.setLatitude(46.5802);
          addressDto.setLongitude(0.3404);
          addressDto.setPostcode("86000");
          break;
        case 34:
          // Dunkerque
          addressDto.setCity("Dunkerque");
          addressDto.setLatitude(51.0345);
          addressDto.setLongitude(2.3776);
          addressDto.setPostcode("59140");
          break;
        case 35:
          // Pau
          addressDto.setCity("Pau");
          addressDto.setLatitude(43.2965);
          addressDto.setLongitude(-0.3700);
          addressDto.setPostcode("64000");
          break;
        case 36:
          // Saint-Nazaire
          addressDto.setCity("Saint-Nazaire");
          addressDto.setLatitude(47.2700);
          addressDto.setLongitude(-2.2100);
          addressDto.setPostcode("44600");
          break;
        case 37:
          // Cholet
          addressDto.setCity("Cholet");
          addressDto.setLatitude(47.0602);
          addressDto.setLongitude(-0.8790);
          addressDto.setPostcode("49300");
          break;
        case 38:
          // Auxerre
          addressDto.setCity("Auxerre");
          addressDto.setLatitude(47.7994);
          addressDto.setLongitude(3.5666);
          addressDto.setPostcode("89000");
          break;
        case 39:
          // Troyes
          addressDto.setCity("Troyes");
          addressDto.setLatitude(48.2970);
          addressDto.setLongitude(4.0743);
          addressDto.setPostcode("10000");
          break;
        case 40:
          addressDto.setCity("Saint-Malo");
          addressDto.setLatitude(48.6481);
          addressDto.setLongitude(-2.0076);
          addressDto.setPostcode("35400");
          break;

      }

      addressDto.setCountry("France");
      addressDto.setStreet_l1(faker.address().streetAddress());
      addressDto.setStreet_l2(faker.address().secondaryAddress());

      addressService.createAddress(addressDto);
    }
  }

}
