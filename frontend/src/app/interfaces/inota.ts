export interface INota {
    _id?:string,
    titulo: string,
    descripcion: string,
    idUsuario: string,
    enlace: string,
    precio?: number,
    puntuacion?: number
}
