export function isDescriptor(desc) {
    if (!desc || !desc.hasOwnProperty) {
        return false;
    }

    const keys = ['value', 'initializer', 'get', 'set'];

    for (let i = 0, l = keys.length; i < l; i++) {
        const currentProperty = keys[i];
        if (Object.prototype.hasOwnProperty.call(desc, currentProperty)) {
            return true;
        }
    }

    return false;
}

export function decorate(handleDescriptor, entryArgs) {
    if (isDescriptor(entryArgs[entryArgs.length - 1])) {
        return handleDescriptor(...entryArgs, []);
    } else {
        return function (...args) {
            return handleDescriptor(...Array.prototype.slice.call(args), entryArgs);
        };
    }
}
