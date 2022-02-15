"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroValidator = exports.heroNameError = void 0;
const heroNameError = (name) => {
    if (!name || name.trim() === '') {
        return 'O nome do herói não deve estar vazio';
    }
};
exports.heroNameError = heroNameError;
const heroValidator = (hero) => {
    const errors = {};
    const nameError = (0, exports.heroNameError)(hero.name);
    if (nameError) {
        errors.name = nameError;
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.heroValidator = heroValidator;
//# sourceMappingURL=heroValidator.js.map