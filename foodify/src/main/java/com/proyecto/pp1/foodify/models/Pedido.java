package com.proyecto.pp1.foodify.models;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Getter
    @Setter
    @Column(name = "semana")
    private int semana;

    @Getter
    @Setter
    @Column(name = "fecha_pedido")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaPedido;

    @Getter
    @Setter
    @Column(name = "fecha_baja")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaBaja;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_empleado")
    private Empleado empleado;

    @OneToMany(mappedBy = "pedido")
    private Set<PedidoItemMenu> items = new HashSet<>();
}
