package com.proyecto.pp1.foodify.models;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.proyecto.pp1.foodify.models.modelsEnum.SemanaEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "menu")
public class Menu {
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING) // Almacenar el valor del enum como cadena
    @Column(name = "semana")
    private SemanaEnum semana;

    @Getter
    @Setter
    @Column(name = "fecha_baja")
    private LocalDate fechaBaja;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_administrador")
    private Administrador administrador;

    @OneToMany(mappedBy = "menu")
    private Set<MenuItemMenu> menus = new HashSet<>();
}
