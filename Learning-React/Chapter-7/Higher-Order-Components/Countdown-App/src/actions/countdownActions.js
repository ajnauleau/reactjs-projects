
const countdownActions = dispatcher => ({

    tick(currentCount) {
        dispatcher.handleAction({
            type: 'TICK',
            count: currentCount - 1
        })
    },

    reset(count) {
        dispatcher.handleAction({
            type: 'RESET',
            count,
        })
    }
})

export default countdownActions;
