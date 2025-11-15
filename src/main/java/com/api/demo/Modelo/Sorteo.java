package com.api.demo.Modelo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity

@Table(name = "sorteo")
// Esta clase representa un Sorteo. Guarda cuándo y dónde se hace, y su estado.
public class Sorteo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_sorteo")
	// Identificador del sorteo
	private long id;
	
	@Column(name = "fecha")
    @Temporal(TemporalType.TIMESTAMP)
    // Fecha del sorteo (con día/mes/año)
    private Date fecha;
	
	@Column(name = "hora")
    @Temporal(TemporalType.TIME)
    // Hora del sorteo
    private  Date hora;
	
	@Column(name = "estado", length = 15)
	// Estado actual (ej: programado, realizado, cancelado)
	private String estado;
	
	@Column(name = "lugar", length = 100)
	// Lugar donde se hace el sorteo
	private String lugar;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Date getHora() {
		return hora;
	}

	public void setHora(Date hora) {
		this.hora = hora;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getLugar() {
		return lugar;
	}

	public void setLugar(String lugar) {
		this.lugar = lugar;
	}

	
}