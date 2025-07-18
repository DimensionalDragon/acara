import express from "express";

import authController from "../controllers/auth.controller";
import categoryController from "../controllers/category.controller";
import mediaController from "../controllers/media.controller";

import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import mediaMiddleware from "../middlewares/media.middleware";

import { ROLES } from "../utils/constants";

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
    categoryController.create
);
router.get(
    '/category',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    categoryController.findAll
);
router.get(
    '/category/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
    categoryController.findOne
);
router.put(
    '/category/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    categoryController.update
);
router.delete(
    '/category/:id',
    [authMiddleware, aclMiddleware([ROLES.ADMIN])],
    categoryController.remove
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
);
router.post(
    '/media/upload-multiple',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
        mediaMiddleware.multiple('files')
    ],
    mediaController.multiple,
);
router.delete(
    '/media/remove',
    [
        authMiddleware,
        aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])
    ],
    mediaController.remove,
);


export default router;