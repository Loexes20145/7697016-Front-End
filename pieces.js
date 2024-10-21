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

// Récupération des noms des pieces
const noms = pieces.map(piece => piece.nom)
for (let i = pieces.length-1 ; i >= 0 ; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}

// Création et affichage de la liste des pieces abordables
const abordablesElements = document.createElement('ul')

for (let i=0 ; i < noms.length ; i++) {
    const nomElement = document.createElement('li')
    nomElement.innerText = noms[i]
    abordablesElements.appendChild(nomElement)
}

document.querySelector(".abordables").appendChild(abordablesElements)

// Création et affichage de la liste des pièces disponibles
const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)

for (let i = nomsDisponibles.length-1 ; i >= 0 ; i--) {
    if (!pieces[i].disponibilite) {
        nomsDisponibles.splice(i, 1)
        prixDisponibles.splice(i, 1)
    }
}

const disponiblesElement = document.createElement('ul')

for (let i=0 ; i < nomsDisponibles.length ; i++) {
    const nomElement = document.createElement('li')
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElement.appendChild(nomElement)
}

document.querySelector('.disponibles').appendChild(disponiblesElement)