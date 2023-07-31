package com.SpringServer.login;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name="user")
public class User {
    @Id
    private Integer id;
    private String password;
    private String name;

    public User(int id, String password, String name){
        this.id = id;
        this.password = password;
        this.name = name;
    }
}
