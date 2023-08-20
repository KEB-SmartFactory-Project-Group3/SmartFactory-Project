package com.SpringServer.controller.data;

import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.dto.data.CurrentProductsDTO;
import com.SpringServer.model.entity.Products;
import com.SpringServer.service.data.ProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;

    @PostMapping("/save")
    public ResponseEntity<StringResultResponse> receiveData(@RequestBody Products products) {
        return ResponseEntity.ok(productsService.saveProducts(products));
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentProductsDTO> displayMachineInfo(){
        return ResponseEntity.ok(productsService.getProductsCount());
    }

    @GetMapping("/totallist")
    public ResponseEntity<List<Products>> getAllProducts() {
        return ResponseEntity.ok(productsService.findAllProducts());
    }
}
