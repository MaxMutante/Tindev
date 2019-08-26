const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {
        console.log(require.io, request.connectedUsers)

        const { user } = request.headers;
        const { devId } = request.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return response.status(400).json({ error: 'Dev não existe.' });
        };

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log("Deu Match!!!!!!");
            const loggedSocket = require.connectedUsers[user];
            const targetSocket = require.connectedUsers[devId];

            if (loggedSocket) {
                require.ui.to(loggedSocket).emit('matck', targetDev);
            }

            if (targetSocket) {
                require.ui.to(targetSocket).emit('matck', loggedDev);
            }

        };

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return response.json(loggedDev);
    }
}