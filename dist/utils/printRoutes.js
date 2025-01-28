"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printRoutes() {
    const routes = [];
    function print(path, layer) {
        var _a;
        if ((_a = layer.route) === null || _a === void 0 ? void 0 : _a.methods) {
            const methods = Object.keys(layer.route.methods)
                .filter(method => { var _a; return (_a = layer === null || layer === void 0 ? void 0 : layer.route) === null || _a === void 0 ? void 0 : _a.methods[method]; })
                .map(method => method.toUpperCase());
            routes.push({
                path: path + layer.route.path,
                methods: methods.join(', ')
            });
        }
        else if (layer.name === 'router' && 'stack' in layer.handle) {
            layer.handle.stack.forEach((stackItem) => {
                print(path + (layer.regexp.source === "^\\/?(?=\\/|$)" ? '' : layer.regexp.source.replace(/\\\//g, '/').replace(/\^|\$/g, '')), stackItem);
            });
        }
    }
    const app = require('../app').default;
    app._router.stack.forEach((layer) => {
        print('', layer);
    });
    console.log('\nApplication Routes:');
    console.log('==================\n');
    routes.forEach(route => {
        console.log(`${route.methods.padEnd(8)} ${route.path}`);
    });
    console.log('\nTotal routes:', routes.length);
}
if (require.main === module) {
    printRoutes();
}
exports.default = printRoutes;
//# sourceMappingURL=printRoutes.js.map