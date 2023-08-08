package com.SpringServer.model.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;



@AllArgsConstructor
@Data
@NoArgsConstructor
public class ProductsId implements Serializable {

    private String machineNumber;

    private Timestamp times;

}