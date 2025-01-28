"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userValidation_1 = require("../middleware/userValidation");
const router = express_1.default.Router();
router.get('/', userController_1.default.getAllUsers);
router.post('/', userValidation_1.validateUser, userController_1.default.createUser);
router.get('/:id', userController_1.default.getUserById);
router.put('/:id', userValidation_1.validateUser, userController_1.default.updateUser);
router.delete('/:id', userController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map