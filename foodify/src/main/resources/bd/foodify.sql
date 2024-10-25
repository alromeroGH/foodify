CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    password VARCHAR(30),
    fecha_baja DATE
);

CREATE TABLE empleado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    Foreign Key (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE administrador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    Foreign Key (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT,
    semana INT,
    fecha_pedido DATE,
    fecha_baja DATE,
    Foreign Key (id_empleado) REFERENCES empleado (id)
);

CREATE TABLE menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    semana ENUM('1', '2', '3', '4'),
    fecha_baja DATE,
    id_administrador INT,
    Foreign Key (id_administrador) REFERENCES administrador (id)
);

CREATE TABLE item_menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    stock INT,
    descripcion VARCHAR(100),
    categoria ENUM(
        'PRINCIPAL',
        'EMPANADA',
        'TARTA',
        'BEBIDA'
    )
);

CREATE TABLE dia (
    dia ENUM(
        'LUNES',
        'MARTES',
        'MIERCOLES',
        'JUEVES',
        'VIERNES'
    ) PRIMARY KEY,
    id_itemMenu INT,
    Foreign Key (id_itemMenu) REFERENCES item_menu (id)
);

ALTER TABLE dia DROP PRIMARY KEY;

ALTER TABLE dia ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE dia CHANGE id_itemMenu id_item_menu INT;

CREATE TABLE menu_itemMenu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_menu INT,
    id_itemMenu INT,
    Foreign Key (id_menu) REFERENCES menu (id),
    Foreign Key (id_itemMenu) REFERENCES item_menu (id)
);

CREATE TABLE pedido_itemMenu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dia ENUM(
        'LUNES',
        'MARTES',
        'MIERCOLES',
        'JUEVES',
        'VIERNES'
    ),
    cantidad INT,
    id_pedido INT,
    id_itemMenu INT,
    Foreign Key (id_pedido) REFERENCES pedido (id),
    Foreign Key (id_itemMenu) REFERENCES item_menu (id)
);

ALTER TABLE pedido_itemMenu RENAME TO pedido_item_menu;

ALTER TABLE pedido_item_menu CHANGE id_itemMenu id_item_menu INT;

ALTER TABLE pedido_item_menu
ADD CONSTRAINT fk_menu_item FOREIGN KEY (id_item_menu) REFERENCES item_menu (id);

SELECT * FROM usuario;

SELECT * FROM empleado;

INSERT INTO
    usuario (
        email,
        nombre,
        apellido,
        password
    )
VALUES (
        'admin@gmail.com',
        'Juan',
        'Perez',
        '1234'
    );

INSERT INTO administrador (id_usuario) VALUES (3);

SELECT *
FROM item_menu im
    INNER JOIN dia d ON d.id_item_menu = im.id;