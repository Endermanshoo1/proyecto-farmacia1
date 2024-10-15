const Pago = require('../models/pagos');  

exports.crearPago = async (req, res) => {  
    const { usuarioId, monto, tipoPago, referencia } = req.body;  

    // Verifica que todos los campos requeridos están presentes  
    if (!usuarioId || !monto || !tipoPago) {  
        return res.status(400).json({ error: 'Faltan datos requeridos.' });  
    }  

    try {  
        const nuevoPago = new Pago({ usuarioId, monto, tipoPago, referencia });  
        await nuevoPago.save();  
        res.status(201).json(nuevoPago);  
    } catch (error) {  
        res.status(400).json({ error: 'Error al crear el pago.' });  
    }  
}; 

exports.obtenerPagos = async (req, res) => {  
    try {  
        const pagos = await Pago.find();  
        res.status(200).json(pagos);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al obtener los pagos.' });  
    }  
};  

exports.aprobarPago = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const pago = await Pago.findById(id);  
        if (!pago) return res.status(404).json({ error: 'Pago no encontrado.' });  

        pago.estado = 'aprobado';  
        await pago.save();  
        res.status(200).json(pago);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al aprobar el pago.' });  
    }  
};  

exports.cancelarPago = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const pago = await Pago.findById(id);  
        if (!pago) return res.status(404).json({ error: 'Pago no encontrado.' });  

        // Cambiar el estado a "cancelado"  
        pago.estado = 'cancelado';  
        await pago.save();  
        res.status(200).json(pago);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al cancelar el pago.' });  
    }  
};  

// Si quieres manejar un estado de rechazo, puedes incluirlo aquí:  
exports.rechazarPago = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const pago = await Pago.findById(id);  
        if (!pago) return res.status(404).json({ error: 'Pago no encontrado.' });  

        // Cambiar el estado a "rechazado"  
        pago.estado = 'rechazado';  
        await pago.save();  
        res.status(200).json(pago);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al rechazar el pago.' });  
    }  
};  

exports.obtenerPagoPorId = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const pago = await Pago.findById(id);  
        if (!pago) return res.status(404).json({ error: 'Pago no encontrado.' });  

        res.status(200).json(pago);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al obtener el pago.', details: error.message });  
    }  
}; 