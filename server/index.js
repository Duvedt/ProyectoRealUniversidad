// get obtener, post crear, put actualizar, delete eliminar
const express = require('express');
const cors = require('cors');
const db = require("./db");

const app = express();

app.use(cors());

app.use(express.json());


app.get('/docentes', (req, res) => {
    const sql= 'SELECT * FROM universidad.docentes;'
    db.query(sql, (err, results) => {
        if(err) {
            console.error("MIRA ESTE ERROR EN TU TERMINAL:", err);
            return res.status(500).json({error: 'Error al obtener los docentes'});
        }
        res.json(results);
    });
});


app.post('/docentes', (req, res) => {

    const {nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia} = req.body;

    if(!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim()) {

        return res.status(400).json({error: 'Todos los campos son requeridos'});
    };

    const anios = Number(anios_experiencia);

    if(Number.isNaN(anios) || anios < 0)
        return res.status(400).json({error: 'anios de experiencia invalidos'});


    const sql= 'INSERT INTO universidad.docentes (nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia) VALUES(?, ?, ?, ?, ?, ?, ?);';
    db.query(sql, [nombre.trim(), correo.trim(), telefono.trim(), titulo.trim(), area_academica.trim(), dedicacion.trim(), anios],(err, result) => {
        if(err) {
            return res.status(500).json({error: 'Error al guardar al docente'});
        }
        res.json({
            id: result.insertId,
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            titulo: titulo.trim(),
            area_academica: area_academica.trim(),
            dedicacion: dedicacion.trim(),
            anios_experiencia: anios
        });
    });
});


app.put('/docentes/:id', (req, res) => {

    const { id } = req.params;
    const {nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia} = req.body;

    if(!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim()) {

        return res.status(400).json({error: 'Todos los campos son requeridos'});
    };

    const anios = Number(anios_experiencia);

    if(Number.isNaN(anios) || anios < 0)
        return res.status(400).json({error: 'anios de experiencia invalidos'});


    const sql = 'UPDATE universidad.docentes SET nombre=?, correo=?, telefono=?, titulo=?, area_academica=?, dedicacion=?, anios_experiencia=? WHERE id = ?;';
    db.query(sql, [nombre.trim(), correo.trim(), telefono.trim(), titulo.trim(), area_academica.trim(), dedicacion.trim(), anios, id],(err) => {
    if(err) {
        console.log(err)
        return res.status(500).json({error: 'Error al actualizar al docente'});
    }
    res.json({message: 'Docente actualizado'});
    });
});


app.delete ('/docentes/:id', (req, res) => {

    const {id} = req.params;

    const sql= 'DELETE FROM universidad.docentes WHERE id = ?;';
    db.query(sql, [id],(err) => {
    if(err) {
        return res.status(500).json({error: 'Error al eliminar al docente'});
    }
    res.json({message: 'Docente eliminado'});
    });
});


app.listen(3001, () => {
console.log('Servidor corriendo desde el puesto 3001')
}) 
