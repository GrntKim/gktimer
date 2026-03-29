export default {
    base: '/gktimer/',
    build: {
        modulePreload: false,
    },
    optimizeDeps: {
        exclude: ['cubing']
    }
}