const idToProfile = (id) => {
    if (id === 1) return "Administrador"
    if (id === 2) return "Vendedor"
    if (id === 3) return "Validador"

    return "Não listado"
}

module.exports = {
    idToProfile
}