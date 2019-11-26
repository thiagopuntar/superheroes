function addHour(date, hours) {
    
    date.setHours(date.getHours + hours);
    return date;
}

export { addHour };