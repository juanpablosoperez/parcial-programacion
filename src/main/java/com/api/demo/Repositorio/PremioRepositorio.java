package com.api.demo.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.demo.Modelo.Premio;

@Repository
// Repositorio JPA para la entidad Premio
public interface PremioRepositorio extends JpaRepository<Premio, Long> {
}


