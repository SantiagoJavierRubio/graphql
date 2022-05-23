import { Router } from "express";
import { returnTestProducts } from "../controladores/products.js";

const router = Router()

router.get('/productos-test', returnTestProducts)

export default router