const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {
    Chef.index(function(chefs) {
      return res.render('admin/chefs/index', {chefs})
    })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  show(req, res) {
    Chef.find(req.params.id, function(chef) {
      if (!chef) return res.send("Chefe não encontrado")
      Chef.findChefRecipes(chef.id, function(recipes) {
        return res.render('admin/chefs/show', {chef, recipes})
      })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!')
    }

    Chef.create(req.body, function(chefs) {
      return res.redirect(`/admin/chefs/${chefs.id}`)
    })
  },
  edit(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chefe não encontrado")
      return res.render('admin/chefs/edit', {chef})
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!')
    }

    Chef.update(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete(req, res) {
    Chef.delete(req.body.id, function() {
      return res.redirect("/admin/chefs")
    })
  }
  





}