package com.proyecto.pp1.foodify.dao;

import com.proyecto.pp1.foodify.models.Usuario;

public interface IUsuarioDao {
    String getUsuarioPorEmail(String email);

    void eliminar(Long id);

    void registrar(Usuario nuevoUsuario);

    void editar(Usuario usuarioEditado);

    Usuario loginUsuario(Usuario usuario);
}
