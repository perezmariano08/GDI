import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// Manejar el GET para obtener todos los jugadores
export async function GET(req) {
    try {
        const [jugadores] = await pool.query('SELECT * FROM jugadores');
        return NextResponse.json(jugadores);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener los jugadores' }, { status: 500 });
    }
}

// Manejar el POST para crear un nuevo jugador
export async function POST(req) {
    try {
        const { nombre, edad, equipo } = await req.json();

        if (!nombre || !edad || !equipo) {
            return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
        }

        const [result] = await pool.query(
            'INSERT INTO jugadores (nombre, edad, equipo) VALUES (?, ?, ?)',
            [nombre, edad, equipo]
        );

        return NextResponse.json({ message: 'Jugador creado', id: result.insertId }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al crear el jugador' }, { status: 500 });
    }
}

// Manejar el PUT para actualizar un jugador existente
export async function PUT(req) {
    try {
        const { id, nombre, edad, equipo } = await req.json();

        if (!id || !nombre || !edad || !equipo) {
            return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
        }

        const [result] = await pool.query(
            'UPDATE jugadores SET nombre = ?, edad = ?, equipo = ? WHERE id = ?',
            [nombre, edad, equipo, id]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: 'Jugador actualizado' });
        } else {
            return NextResponse.json({ error: 'Jugador no encontrado' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al actualizar el jugador' }, { status: 500 });
    }
}

// Manejar el DELETE para eliminar un jugador
export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
        }

        const [result] = await pool.query('DELETE FROM jugadores WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: 'Jugador eliminado' });
        } else {
            return NextResponse.json({ error: 'Jugador no encontrado' }, { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al eliminar el jugador' }, { status: 500 });
    }
}
