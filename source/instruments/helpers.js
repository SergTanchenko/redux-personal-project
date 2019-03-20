export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

const booleanPropertyComparator = (a, b, propertyName) => {
    if (a.get(propertyName) && !b.get(propertyName)) {
        return -1;
    } else if (!a.get(propertyName) && b.get(propertyName)) {
        return 1;
    }

    return 0;
};

const datePropertyComparator = (a, b, propertyName) => {
    let date1 = a.get(propertyName);
    let date2 = b.get(propertyName);

    if (!(date1 instanceof Date)) {
        date1 = new Date(date1);
    }

    if (!(date2 instanceof Date)) {
        date2 = new Date(date2);
    }

    return date1.getTime() - date2.getTime();
};

export const sortTasks = (tasks) => {
    const sortByCreationDate = (t1, t2) =>
        datePropertyComparator(t1, t2, "created");

    const favoriteUnaccomplished = tasks
        .filter((task) => task.get("favorite") && !task.get("completed"))
        .sort(sortByCreationDate);

    const unaccomplished = tasks
        .filter((task) => !task.get("favorite") && !task.get("completed"))
        .sort(sortByCreationDate);

    const completed = tasks
        .filter((task) => task.get("completed"))
        .sort(sortByCreationDate);

    const sortedCompleted = completed.sort((t1, t2) =>
        booleanPropertyComparator(t1, t2, "favorite")
    );

    return [...favoriteUnaccomplished, ...unaccomplished, ...sortedCompleted];
};
