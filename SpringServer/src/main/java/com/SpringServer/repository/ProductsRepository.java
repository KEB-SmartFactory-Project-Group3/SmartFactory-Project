package com.SpringServer.repository;

//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.entity.Products;
import com.SpringServer.model.entity.ProductsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, ProductsId> {

//    Products findFirstByOrderByTimesAsc();
//
//    Products findFirstByOrderByTimesDesc();

    Products findFirstByMachineNumberOrderByTimesAsc(String machineNumber);

    Products findFirstByMachineNumberOrderByTimesDesc(String machineNumber);

}
