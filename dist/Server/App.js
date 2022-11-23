"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Enum_1 = require("../Utils/Enum");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Libs_1 = require("../Libs");
const Routes_1 = require("../Routes");
const prisma_1 = require("../prisma");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.enable('trust proxy');
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect the client
        try {
            yield prisma_1.Prisma.$connect();
            //await RedisClient.connect();
            Libs_1.Logger.info('Database Connected!!!');
            app.use('/api/v1/users', Routes_1.User);
            app.use('/api/v1/roles', Routes_1.Role);
            app.use('/api/v1/auth', Routes_1.Auth);
        }
        catch (e) {
            yield prisma_1.Prisma.$disconnect();
            Libs_1.Logger.error(`Error Connecting to Database: ${e}`);
            process.exit(1);
        }
        //routes
    });
}
connectDb();
app.get('/', (req, res) => {
    try {
        res.status(Enum_1.HTTP_CODES.OK).json('Welcome to A-hub API!!!');
    }
    catch (error) {
        const message = process.env.NODE_ENV === 'production'
            ? Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR
            : error.toString();
        res.status(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json(message);
    }
});
app.get('*', (req, res) => {
    try {
        res
            .status(Enum_1.HTTP_CODES.RESOURCE_NOT_FOUND)
            .json('Requested resource not found');
    }
    catch (error) {
        const message = process.env.NODE_ENV === 'production'
            ? Enum_1.ResponseMessage.INTERNAL_SERVER_ERROR
            : error.toString();
        res.status(Enum_1.HTTP_CODES.INTERNAL_SERVER_ERROR).json(message);
    }
});
exports.default = app;
//# sourceMappingURL=App.js.map