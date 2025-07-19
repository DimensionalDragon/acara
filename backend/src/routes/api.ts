import express from "express";

import { ROLES } from "../utils/constants";

import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import mediaMiddleware from "../middlewares/media.middleware";

import authController from "../controllers/auth.controller";
import categoryController from "../controllers/category.controller";
import mediaController from "../controllers/media.controller";
import regionController from "../controllers/region.controller";
import eventController from "../controllers/event.controller";

const router = express.Router();

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.me);
router.post('/auth/activation', authController.activation);

// Category management
router.post(
    '/category',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    categoryController.create,
    /*
    #swagger.tags = ['Category']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/CreateCategoryRequest"
        }
    }
    */
);
router.get(
    '/category',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    categoryController.findAll,
    /*
    #swagger.tags = ['Category']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);
router.get(
    '/category/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    categoryController.findOne,
    /*
    #swagger.tags = ['Category']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);
router.put(
    '/category/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    categoryController.update,
    /*
    #swagger.tags = ['Category']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/CreateCategoryRequest"
        }
    }
    */
);
router.delete(
    '/category/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    categoryController.remove,
    /*
    #swagger.tags = ['Category']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);

// Events management
router.post(
    '/events',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    eventController.create,
    /*
    #swagger.tags = ['Events']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/CreateEventRequest"
        }
    }
    */
);
router.get(
    '/events',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    eventController.findAll,
    /*
    #swagger.tags = ['Events']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);
router.get(
    '/events/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    eventController.findOne,
    /*
    #swagger.tags = ['Events']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);
router.put(
    '/events/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    eventController.update,
    /*
    #swagger.tags = ['Events']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/CreateEventRequest"
        }
    }
    */
);
router.delete(
    '/events/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    eventController.remove,
    /*
    #swagger.tags = ['Events']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);
router.get(
    '/events/slug/:slug',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    eventController.findOneBySlug,
    /*
    #swagger.tags = ['Events']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    */
);

// Location finder
router.get(
    '/regions',
    regionController.getAllProvinces,
    /*
    #swagger.tags = ['Regions']
    */
);
router.get(
    '/regions/province/:id',
    regionController.getProvince,
    /*
    #swagger.tags = ['Regions']
    */
);
router.get(
    '/regions/regency/:id',
    regionController.getRegency,
    /*
    #swagger.tags = ['Regions']
    */
);
router.get(
    '/regions/district/:id',
    regionController.getDistrict,
    /*
    #swagger.tags = ['Regions']
    */
);
router.get(
    '/regions/village/:id',
    regionController.getVillage,
    /*
    #swagger.tags = ['Regions']
    */
);
router.get(
    '/regions-search',
    regionController.findByCity,
    /*
    #swagger.tags = ['Regions']
    */
);

// Media upload and handling
router.post(
    '/media/upload-single',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
        mediaMiddleware.single('file')
    ],
    mediaController.single,
    /*
    #swagger.tags = ['Media']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        file: {
                            type: "string",
                            format: "binary"
                        }
                    }
                }
            }
        }
    }
    */
);
router.post(
    '/media/upload-multiple',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
        mediaMiddleware.multiple('files')
    ],
    mediaController.multiple,
    /*
    #swagger.tags = ['Media']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        files: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "binary"
                            }
                        }
                    }
                }
            }
        }
    }
    */
);
router.delete(
    '/media/remove',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])
    ],
    mediaController.remove,
    /*
    #swagger.tags = ['Media']
    #swagger.security = [{
        "bearerAuth": {}
    }]
    #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/RemoveMediaRequest"
        }
    }
    */
);


export default router;