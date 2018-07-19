var a = 0.9
function aF (amount) {
    console.log("af")
    return Math.round(amount * 100) / 100
}
exports.US = function (canadian) {
    return aF(canadian * a)
}
exports.Canadian = function (us) {
    return aF(us / a)
}
