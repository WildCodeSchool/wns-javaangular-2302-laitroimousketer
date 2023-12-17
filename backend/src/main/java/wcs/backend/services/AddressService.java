package wcs.backend.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wcs.backend.dtos.AddressDto;
import wcs.backend.entities.Address;
import wcs.backend.repositories.AddressRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AddressService {
  @Autowired
  private final AddressRepository addressRepository;
  @Autowired
  private final ModelMapper modelMapper;

  public AddressService(AddressRepository addressRepository, ModelMapper modelMapper) {
    this.addressRepository = addressRepository;
    this.modelMapper = modelMapper;
  }

  public List<AddressDto> getAllAddresses() {
    List<Address> addresses = addressRepository.findAll();
    return addresses.stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
  }

  public Optional<AddressDto> getAddressById(Long id) {
    Optional<Address> address = addressRepository.findById(id);
    return address.map(this::convertToDto);
  }

  public AddressDto createAddress(AddressDto addressDto) {
    Address address = modelMapper.map(addressDto, Address.class);
    Address savedAddress = addressRepository.save(address);
    return modelMapper.map(savedAddress, AddressDto.class);
  }

  public AddressDto updateAddress(AddressDto addressDto) {
    Address address = modelMapper.map(addressDto, Address.class);
    Address updatedAddress = addressRepository.save(address);
    return modelMapper.map(updatedAddress, AddressDto.class);
  }

  public void deleteAddressById(Long id) {
    addressRepository.deleteById(id);
  }

  private AddressDto convertToDto(Address address) {
    return modelMapper.map(address, AddressDto.class);
  }
}
