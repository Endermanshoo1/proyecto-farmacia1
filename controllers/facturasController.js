const Factura = require('../models/facturas'); 

exports.crearFactura = async (req, res) => {  
    const { email, monto, tipoPago, referencia, productos } = req.body;  

    if (!email || !monto || !tipoPago || !productos) {  
        return res.status(400).json({ error: 'Faltan datos requeridos para la factura.' });  
    }  

    try {  
        const nuevaFactura = new Factura({ email, monto, tipoPago, referencia, productos });  
        await nuevaFactura.save();  
        res.status(201).json(nuevaFactura);  
    } catch (error) {  
        res.status(400).json({ error: 'Error al crear la factura.', details: error.message });  
    }  
};  

exports.obtenerFacturas = async (req, res) => {  
    try {  
        const facturas = await Factura.find();  
        res.json(facturas);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al obtener las facturas.', details: error.message });  
    }  
};  

exports.obtenerFacturasPorEmail = async (req, res) => {  
    const { email } = req.query; // O se puede obtener de req.params según cómo quieras implementarlo  
    try {  
        const facturas = await Factura.find({ email });  
        res.json(facturas);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al obtener las facturas por email.', details: error.message });  
    }  
};  

exports.obtenerFacturaPorId = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const factura = await Factura.findById(id);  
        if (!factura) return res.status(404).json({ error: 'Factura no encontrada.' });  
        res.json(factura);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al obtener la factura por ID.', details: error.message });  
    }  
};

exports.aprobarFactura = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const factura = await Factura.findById(id);  
        if (!factura) return res.status(404).json({ error: 'Factura no encontrada.' });  

        // Actualizar el estado de la factura a 'aprobado'  
        factura.estado = 'aprobado'; // Cambiado aquí  
        await factura.save();  

        res.json(factura);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al aprobar la factura.', details: error.message });  
    }  
};  

exports.rechazarFactura = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const factura = await Factura.findById(id);  
        if (!factura) return res.status(404).json({ error: 'Factura no encontrada.' });  

        // Actualizar el estado de la factura a 'rechazada'  
        factura.estado = 'rechazada'; // permaneció igual  
        await factura.save();  

        res.json(factura);  
    } catch (error) {  
        res.status(500).json({ error: 'Error al rechazar la factura.', details: error.message });  
    }  
};  