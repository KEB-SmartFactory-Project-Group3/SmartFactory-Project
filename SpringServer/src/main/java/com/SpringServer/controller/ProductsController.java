package com.SpringServer.controller;

import com.SpringServer.model.entity.Products;
import com.SpringServer.service.ProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;

    @PostMapping("/save")
    public ResponseEntity<String> receiveData(@RequestBody Products products) {
        return ResponseEntity.ok(productsService.saveProducts(products));
    }
}
