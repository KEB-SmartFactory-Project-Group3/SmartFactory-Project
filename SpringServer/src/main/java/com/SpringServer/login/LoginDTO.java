package com.SpringServer.login;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Data
public class LoginDTO {
    private Integer id;
    private String name;

    public LoginDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
    }
}