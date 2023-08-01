package com.SpringServer.model.dto;

import com.SpringServer.model.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Data
public class LoginDTO {
    private String id;
    private String name;

    public LoginDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
    }
}