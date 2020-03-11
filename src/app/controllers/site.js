const Recipe = require("../models/Recipe")


exports.index = function(req, res) {
  Recipe.index(function(recipes) {
    return res.render('site/index', { recipes })
  })
},
exports.about = function(req, res) {
  return res.render('site/about')
},
exports.show = function(req, res) {
  Recipe.find(req.params.id, function(recipe) {
    if (!recipe) return res.send("Receita não encontrada")
    return res.render('site/show', {recipe})
  })
},
exports.showAll = function(req, res) {
  Recipe.index(function(recipes) {
    return res.render('site/recipes', { recipes })
  })
}