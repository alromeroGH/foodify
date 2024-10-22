package com.proyecto.pp1.foodify.models.modelsEnum;

public enum SemanaEnum {
    UNO("1"),
    DOS("2"),
    TRES("3"),
    CUATRO("4");
    
    private final String valor;
    
    SemanaEnum(String valor) {
        this.valor = valor;
    }
    
    public String getValor() {
        return valor;
    }    
}
