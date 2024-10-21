// Récurpération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json")
const pieces = await reponse.json()

// Création des articles de pieces
for (let article of pieces) {
    const imageElement = document.createElement("img")
    imageElement.src = article.image
    const nomElement = document.createElement("h2")
    nomElement.innerText = article.nom
    const prixElement = document.createElement("p")
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`
    const categorieElement = document.createElement("p")
    categorieElement.innerText = article.categorie ?? "* Pas de catégorie"
    const descriptionElement = document.createElement("p")
    descriptionElement.innerText = `${article.description ?? "*Pas de description pour le moment"}`
    const stockElement = document.createElement("p")
    stockElement.innerText = article.disponibilite ? "En stock" : "En rupture de stock"

    // Rattachement des balises au DOM
    const sectionFiches = document.querySelector(".fiches")
    const articleElement = document.createElement("article")
    articleElement.appendChild(imageElement)
    articleElement.appendChild(nomElement)
    articleElement.appendChild(prixElement)
    articleElement.appendChild(categorieElement)
    articleElement.appendChild(descriptionElement)
    articleElement.appendChild(stockElement)

    sectionFiches.appendChild(articleElement)
}

// Gestion des boutons
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant")

boutonTrierCroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix
    })
    console.log(piecesOrdonnees)
})

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant")

boutonTrierDecroissant.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix
    })
    console.log(piecesOrdonnees)
})

const boutonFiltrerCheap = document.querySelector(".btn-filtrer-cheap")
boutonFiltrerCheap.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter (function (piece) {
        return piece.prix <= 35
    })
    console.log(piecesFiltrees)
})

const boutonNoDescription = document.querySelector(".btn-filtrer-nodesc")
boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    })
    console.log(piecesFiltrees)
})