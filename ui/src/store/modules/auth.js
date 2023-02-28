export default {
    state: {
        authRequirePaths: ['HomePage', 'ChatRooms', 'ActiveRooms'],
        notAfterAuthPaths: ['LoginPage', 'RegisterPage']
    },
    getters: {
        authRequirePaths: state => state.authRequirePaths,
        notAfterAuthPaths: state => state.notAfterAuthPaths,
    }
}