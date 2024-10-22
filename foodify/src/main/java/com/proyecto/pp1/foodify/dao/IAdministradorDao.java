package com.proyecto.pp1.foodify.dao;

import java.util.List;

import com.proyecto.pp1.foodify.models.ItemMenu;
import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;
import com.proyecto.pp1.foodify.request.MenuRequest;

public interface IAdministradorDao {
    void agregarMenu(ItemMenu menuNuevo, List<DiaEnum> diasMenuNuevo);

    void modificarMenu(ItemMenu menuModificar, List<DiaEnum> diasMenuModificar);

    void eliminarMenu(int id);

    List<MenuRequest> getMenu();
}
