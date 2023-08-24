package com.SpringServer.service.button;

import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.model.entity.User;
import org.reflections.Reflections;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class DBResetService {

    @PersistenceContext
    private EntityManager entityManager;

    private static final List<Class<?>> EXCLUDED_ENTITY_CLASSES = Arrays.asList(OperationStop.class, User.class);

    @Transactional
    public void resetExceptSpecificTable() {
        try {
            for (Class<?> entityClass : getAllEntityClasses()) {
                String entityClassName = entityClass.getSimpleName();

                if (EXCLUDED_ENTITY_CLASSES.contains(entityClass)) continue;

                String deleteQuery = "DELETE FROM " + entityClassName;
                entityManager.createQuery(deleteQuery).executeUpdate();
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("DB reset 에러");
        }
    }

    private List<Class<?>> getAllEntityClasses() {
        Reflections reflections = new Reflections("com.SpringServer");
        Set<Class<?>> entities = reflections.getTypesAnnotatedWith(Entity.class);

        return new ArrayList<>(entities);
    }
}