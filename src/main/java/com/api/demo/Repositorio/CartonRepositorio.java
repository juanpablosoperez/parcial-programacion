package com.api.demo.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.demo.Modelo.Carton;

@Repository
public interface CartonRepositorio extends JpaRepository<Carton, Long> {

    Carton findByNroserie(String nroserie);

    List<Carton> findAllByNroserie(String nroserie);

    long deleteByNroserie(String nroserie);
}


