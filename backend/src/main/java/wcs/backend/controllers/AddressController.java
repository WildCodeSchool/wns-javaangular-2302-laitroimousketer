package wcs.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import wcs.backend.dtos.AddressDto;
import wcs.backend.services.AddressService;

import java.util.List;

@RestController
@RequestMapping("api/address")
@Tag(name = "Address", description = "Address Controller")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    @Operation (summary = "Get All Addresses", description = "Get details of all available addresses.")
    public ResponseEntity<List<AddressDto>> getAllAddresses() {
        List<AddressDto> addresses = addressService.getAllAddresses();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation (summary = "Get Address by ID", description = "Get details of an address by its ID.")
    public ResponseEntity<AddressDto> getAddressById(@PathVariable Long id) {
        return addressService.getAddressById(id)
                .map(address -> new ResponseEntity<>(address, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @Operation (summary = "Create Address", description = "Create a new address.")
    public ResponseEntity<AddressDto> createAddress(@RequestBody AddressDto addressDto) {
        AddressDto createdAddress = addressService.createAddress(addressDto);
        return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation (summary = "Update Address", description = "Update an existing address.")
    public ResponseEntity<AddressDto> updateAddress(@PathVariable Long id, @RequestBody AddressDto addressDto) {
        addressDto.setId(id); // Assurez-vous que l'ID correspond à celui de l'adresse à mettre à jour
        AddressDto updatedAddress = addressService.updateAddress(addressDto);
        return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation (summary = "Delete Address", description = "Delete an existing address.")
    public ResponseEntity<Void> deleteAddressById(@PathVariable Long id) {
        addressService.deleteAddressById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
