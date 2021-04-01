var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import bcrypt from 'bcrypt';
import express from 'express';
import { UserModel } from '../models/user.model.js';
var router = express.Router();
router.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, password, email, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, password = _a.password, email = _a.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, UserModel.create({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        role: 'user',
                    })];
            case 3:
                user = _b.sent();
                req.session.user = { userId: user.id, userName: user.name, role: user.role };
                res.json({ userId: user.id, userName: user.name, role: user.role });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.json({ message: "что то пошло не так", error: error_1.message })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, password, user, isValidPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, UserModel.findOne({ name: name }).exec()];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ message: 'Имени нет в базе, пожалуйста, пройдите регистрацию' })];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                isValidPassword = _b.sent();
                if (!isValidPassword) {
                    return [2 /*return*/, res.json({ message: 'не тот пароль' })];
                }
                req.session.user = { userId: user.id, userName: user.name, role: user.role };
                res.json({ userId: user.id, userName: user.name, role: user.role });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, res.json({ message: "что то пошло не так", error: error_2.message })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/signout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            return next(err);
        res.clearCookie('sid');
        return res.redirect('/');
    });
});
router.get('/check', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.session.user) return [3 /*break*/, 2];
                return [4 /*yield*/, UserModel.findOne({ _id: req.session.user.userId }).lean()];
            case 1:
                role = (_a.sent()).role;
                res.json(__assign(__assign({}, req.session.user), { role: role }));
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
router.post('/get/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                return [4 /*yield*/, UserModel.findOne({ _id: userId }).lean()];
            case 1:
                role = (_a.sent()).role;
                res.json({ role: role });
                return [2 /*return*/];
        }
    });
}); });
router.post('/change/role', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, roleChange, role;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, roleChange = _a.roleChange;
                return [4 /*yield*/, UserModel.findByIdAndUpdate({ _id: userId }, { role: roleChange })];
            case 1:
                _b.sent();
                return [4 /*yield*/, UserModel.findOne({ _id: userId }).lean()];
            case 2:
                role = (_b.sent()).role;
                res.json({ role: role });
                return [2 /*return*/];
        }
    });
}); });
export default router;
