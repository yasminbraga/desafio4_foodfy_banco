const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .site-links a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    ingredients.appendChild(newField)
}

const addIngredientField = document.querySelector(".add-ingredient")
    if (addIngredientField) {
        addIngredientField.addEventListener("click", addIngredient)
    }


function addPreparation() {
    const preparations = document.querySelector("#preparations")
    const fieldContainer = document.querySelectorAll(".preparation")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    preparations.appendChild(newField)
}

const addPreparationField = document.querySelector(".add-ingredient")
    if (addPreparationField) {
        addPreparationField.addEventListener("click", addIngredient)
    }



function paginate(selectedPage, totalPages) {

    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span>${page}</span>`
            console.log(elements)
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            } 
        }
    }
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}