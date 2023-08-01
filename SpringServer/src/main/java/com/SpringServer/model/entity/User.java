package com.SpringServer.model.entity;

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
    private String id;
    private String password;
    private String name;

    public User(String id, String password, String name){
        this.id = id;
        this.password = password;
        this.name = name;
    }
}
