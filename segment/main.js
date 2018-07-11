var newTemp = document.getElementById('new-temp')
var tmpl = '<p>val is : <%= val %></p>'

setInterval(function () {
    var val = document.getElementById('new-temp-val').value || null
    newTemp.innerHTML = ejs.render(tmpl, {val: val})
}, 2000)