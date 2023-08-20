package com.SpringServer.controller;

import com.SpringServer.model.dto.CurrentCountDTO;
import com.SpringServer.model.entity.Products;
import com.SpringServer.service.ProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductsSaveController {

    private final ProductsService productsService;

    @PostMapping("/save")
    public ResponseEntity<String> receiveData(@RequestBody Products products) {
        return ResponseEntity.ok(productsService.saveProducts(products));
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentCountDTO> displayMachineInfo(){
        return ResponseEntity.ok(productsService.getProductsCount());
    }

    @GetMapping("/totallist")
    public ResponseEntity<List<Products>> getAllProducts() {
        return ResponseEntity.ok(productsService.findAllProducts());
    }
}
