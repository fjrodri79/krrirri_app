"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/categories', (req, res) => {
    const query = `call obtiene_Categoria()`;
    mysql_1.default.ejecutarQuery(query, (err, categories) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                categories
            });
        }
    });
});
router.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    const escapedId = mysql_1.default.instance.cnn.escape(id);
    const query = `SELECT CATEGORY_ID,
    CATEGORY_LEVEL,
    CATEGORY_PARENT_ID,
    CATEGORY_NAME
    FROM KRRI.KRC_CATEGORY
    WHERE STATUS_ID = ${escapedId}`;
    mysql_1.default.ejecutarQuery(query, (err, categories) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                categories
            });
        }
    });
});
exports.default = router;
