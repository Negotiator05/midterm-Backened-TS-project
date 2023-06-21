"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const petController_1 = require("./controllers/petController");
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Setting our view engine as Handlebars
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, "../src/views"));
app.set('view options', { layout: 'layout' });
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
app.use('/pets', petRoutes_1.default);
app.use('/', petController_1.defaultPets);
// TODO: Add routing middleware here
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
});
models_1.db.sync().then(() => {
    console.info("connected to the database! Hack away!  ^ O ^");
});
app.listen(3000);
