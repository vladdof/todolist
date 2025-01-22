export const formatDate = (date) => {
    const value = new Date(date);
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(value);
};
