export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function uniqueId () {
    return `id-${Math.random()
        .toString(36)
        .substr(2, 16)}`;
}
