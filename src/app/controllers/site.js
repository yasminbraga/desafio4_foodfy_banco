const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {

  index(req, res) {
    let {filter } = req.query

    if ( filter ) {
      Recipe.findBy(filter, function(recipes) {
        return res.render('site/recipes', { recipes })
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
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render('site/recipes', { recipes, pagination, filter })

      }
    }
    Recipe.paginate(params)
  },
  showAllChefs(req, res) {
    Chef.all(function(chefs) {
      return res.render('site/chefs', {chefs})
    })
  }
 
  




}