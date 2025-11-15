package com.api.demo.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.demo.Modelo.Carton;

@Repository
// Repositorio JPA para Carton: consultas a la tabla de cartones
public interface CartonRepositorio extends JpaRepository<Carton, Long> {

    // Busca un cartón por número de serie (uno solo)
    Carton findByNroserie(String nroserie);

    // Busca todos los cartones con ese número de serie (por si hay más de uno)
    List<Carton> findAllByNroserie(String nroserie);

    // Elimina cartones por número de serie y devuelve cuántos borró
    long deleteByNroserie(String nroserie);
}


