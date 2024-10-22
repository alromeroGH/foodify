package com.proyecto.pp1.foodify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.pp1.foodify.models.Dia;
import com.proyecto.pp1.foodify.models.ItemMenu;

public interface DiaRepository extends JpaRepository<Dia, Integer> {
    void deleteByItemMenu(ItemMenu itemMenu);
}
