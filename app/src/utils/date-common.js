export default {
    formatDate(date) {
        const dat = new Date(date)
        return dat.toLocaleDateString('de-DE');
    }
}