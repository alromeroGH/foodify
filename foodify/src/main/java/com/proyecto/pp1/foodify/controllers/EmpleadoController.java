package com.proyecto.pp1.foodify.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.pp1.foodify.dao.IUsuarioDao;
import com.proyecto.pp1.foodify.models.Usuario;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permitir solicitudes desde Live Server
public class EmpleadoController {
    @Autowired
    public IUsuarioDao usuarioDao;

    @PostMapping("/api/login")
    public String loguearEmpleado(@RequestBody Usuario usuario) {
        // verifica si el usuario enviado es administrador
        if (usuarioDao.getUsuarioPorEmail(usuario.getEmail()) == "ADMINISTRADOR") {
            return "ADMINISTRADOR";
        } else if (usuarioDao.loginUsuario(usuario) != null) {
            return "EMPLEADO";
        } else {
            return "FAIL";
        }
    }

    @PostMapping("/api/empleado")
    public String registrarEmpleado(@RequestBody Usuario usuario) {
        if (usuarioDao.getUsuarioPorEmail(usuario.getEmail()) == "EMPLEADO") {
            usuarioDao.registrar(usuario);
            return "OK";
        } else {
            return "FAIL";
        }
    }
}
