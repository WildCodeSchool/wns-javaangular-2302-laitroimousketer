package wcs.backend.services;

import org.springframework.stereotype.Service;
import wcs.backend.entities.Address;
import wcs.backend.repositories.AddressRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Optional<Address> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    public Address createAddress(Address address) {
        // Ajoutez ici la logique de validation ou de traitement avant la sauvegarde
        return addressRepository.save(address);
    }

    public Address updateAddress(Address address) {
        // Ajoutez ici la logique de validation ou de traitement avant la mise à jour
        return addressRepository.save(address);
    }

    public void deleteAddressById(Long id) {
        addressRepository.deleteById(id);
    }
}