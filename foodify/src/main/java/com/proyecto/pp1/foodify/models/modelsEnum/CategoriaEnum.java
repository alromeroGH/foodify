package com.proyecto.pp1.foodify.models.modelsEnum;

public enum CategoriaEnum {
    PRINCIPAL("PRINCIPAL"),
    EMPANADA("EMPANADA"),
    TARTA("TARTA"),
    BEBIDA("BEBIDA");

    private final String valor;

    CategoriaEnum(String valor) {
        this.valor = valor;
    }

    public String getValor(){
        return valor;
    }
}
