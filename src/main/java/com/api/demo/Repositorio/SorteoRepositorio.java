package com.api.demo.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.demo.Modelo.Sorteo;

@Repository
// Repositorio JPA para la entidad Sorteo
public interface SorteoRepositorio extends JpaRepository<Sorteo, Long> {
}


