package com.proyecto.pp1.foodify.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.proyecto.pp1.foodify.models.Empleado;
import com.proyecto.pp1.foodify.models.Usuario;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class UsuarioDaoImpl implements IUsuarioDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public String getUsuarioPorEmail(String email) {
        String query = "FROM Usuario WHERE email = :email";
        List<Usuario> usuarios = entityManager.createQuery(query)
                .setParameter("email", email)
                .getResultList();

        if (!usuarios.isEmpty()) {
            // Verificar si el primer usuario es administrador
            if (usuarios.get(0).getEmail().equals("admin@gmail.com")) {
                return "ADMINISTRADOR";
            }
            return "EMPLEADO";
        } else {
            return "FAIL";
        }
    }

    @Override
    public void eliminar(Long id) {
        String query = "ALTER TABLE usuario u MODIFY COLUMN fecha_baja DATE DEFAULT CURRENT_DATE" +
                " WHERE u.id = :id";
        entityManager.createQuery(query);
    }

    @Override
    public void registrar(Usuario nuevoUsuario) {
        entityManager.persist(nuevoUsuario);

        Empleado nuevoEmpleado = new Empleado();
        nuevoEmpleado.setUsuario(nuevoUsuario); // relaciona la columna id_usuario con el usuario creado
                                                // y en la columna se muestra el id del usuario

        entityManager.persist(nuevoEmpleado);
    }

    @Override
    public void editar(Usuario usuarioEditado) {
        // editar usuario
    }

    @Override
    public Usuario loginUsuario(Usuario usuario) {
        String query = "FROM Usuario WHERE email = :email AND password = :password";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .setParameter("password", usuario.getPassword())
                .getResultList();

        if (!lista.isEmpty()) {
            return lista.get(0);
        }

        return null;
    }

}
