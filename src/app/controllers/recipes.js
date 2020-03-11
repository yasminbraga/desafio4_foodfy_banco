const Recipe = require("../models/Recipe")

module.exports = {
  index(req, res) {
    Recipe.index(function(recipes) {
    return res.render('admin/recipes/index', { recipes })
  })
  },
  create(req, res) {
    return res.render("admin/recipes/create")
  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send("Receita não encontrada")
      return res.render('admin/recipes/show', {recipe})
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    Recipe.create(req.body, function(recipes) {
      return res.redirect(`/admin/recipes/${recipes.id}`)
    })
    
  },
  edit(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send("Receita não encontrada")
      return res.render('admin/recipes/edit', {recipe})
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    Recipe.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
    
  },
  delete(req, res) {
    Recipe.delete(req.body.id, function() {
      return res.redirect("/admin/recipes")
    })
  }
}