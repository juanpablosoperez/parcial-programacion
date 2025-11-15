package com.api.demo.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.demo.Modelo.Ganador;

@Repository
// Repositorio JPA para la entidad Ganador
public interface GanadorRepositorio extends JpaRepository<Ganador, Long> {
}


