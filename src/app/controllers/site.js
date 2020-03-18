const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {

  index(req, res) {
    const { filter } = req.query

    if ( filter ) {
      Recipe.findBy(filter, function(recipes) {
        return res.render('site/index', { recipes })
      })
    } else {
        Recipe.all(function(recipes) {
          return res.render('site/index', { recipes })
        })
    }
  },
  about(req, res) {
    return res.render('site/about')
  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send("Receita não encontrada")
      return res.render('site/show', {recipe})
    })
  },
  showAllRecipes(req, res) {
    const { filter } = req.query

    if ( filter ) {
      Recipe.findBy(filter, function(recipes) {
        return res.render('site/recipes', { recipes })
      })
    } else {
        Recipe.all(function(recipes) {
          return res.render('site/recipes', { recipes })
        })
    }
  },
  showAllChefs(req, res) {
    Chef.all(function(chefs) {
      return res.render('site/chefs', {chefs})
    })
  }
 
  




}