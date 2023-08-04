package com.SpringServer.model.dto;


import com.SpringServer.model.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String password;
    private String name;
}
