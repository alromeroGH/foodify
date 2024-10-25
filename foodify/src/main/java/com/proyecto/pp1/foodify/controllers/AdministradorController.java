package com.proyecto.pp1.foodify.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.pp1.foodify.dao.IAdministradorDao;
import com.proyecto.pp1.foodify.models.ItemMenu;
import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;
import com.proyecto.pp1.foodify.request.MenuRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permitir solicitudes desde Live Server
public class AdministradorController {
    @Autowired
    public IAdministradorDao administradorDao;

    @PostMapping("/agregar")
    public String agegarMenuNuevo(@RequestBody MenuRequest menuRequest) {
        ItemMenu itemMenu = menuRequest.getItemMenuNuevo();
        List<DiaEnum> diasMenu = menuRequest.getDiasMenuNuevo();

        administradorDao.agregarMenu(itemMenu, diasMenu);

        return "OK";
    }

    @GetMapping("/obtener")
    public List<MenuRequest> getMenu() {
        return administradorDao.getMenu();
    }

    @PostMapping("/eliminar")
    public String eliminarMenu(@RequestBody int id) {
        administradorDao.eliminarMenu(id);

        return "OK";
    }

    @PostMapping("/modificar")
    public String modificarMenu(@RequestBody MenuRequest menuRequest) {
        ItemMenu itemMenu = menuRequest.getItemMenuNuevo();
        List<DiaEnum> diasMenu = menuRequest.getDiasMenuNuevo();

        administradorDao.modificarMenu(itemMenu, diasMenu);

        return "OK";
    }
}
