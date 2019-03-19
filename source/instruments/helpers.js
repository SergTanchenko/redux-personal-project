export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

const compareObjectsByProperty = (a, b, propertyName) => {
    if (a.get(propertyName) && !b.get(propertyName)) {
        return -1;
    } else if (!a.get(propertyName) && b.get(propertyName)) {
        return 1;
    }

    return 0;
};

export const sortTasks = (tasks) => {
    const favoriteUnaccomplished = tasks.filter(
        (task) => task.get("favorite") && !task.get("completed")
    );
    const unaccomplished = tasks.filter(
        (task) => !task.get("favorite") && !task.get("completed")
    );

    const completed = tasks.filter((task) => task.get("completed"));

    const sortedCompleted = completed.sort((t1, t2) =>
        compareObjectsByProperty(t1, t2, "favorite")
    );

    return [...favoriteUnaccomplished, ...unaccomplished, ...sortedCompleted];
};
