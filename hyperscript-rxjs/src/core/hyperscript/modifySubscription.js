export const modifySubscription = (elem, subscription) => {
    if (!elem.subscription) {
        elem.subscription = subscription
    } else {
        elem.subscription.add(subscription)
    }
}
