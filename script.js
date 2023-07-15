window.addEventListener('load', () => {
 getPosts()

})

async function getPosts() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
  const response = await posts.json()
  const main = document.getElementById('main');
  
  if (posts.ok) {
    document.getElementsByClassName('loader_container')[0].remove()
  }
  const container = document.getElementById('titleContainer')
  const h1 = document.createElement('h1')
  h1.innerText = 'Posts'
  container.appendChild(h1)
  

  const input = document.createElement('input')
  input.className = 'input_search'
  input.setAttribute('type', 'number')
  input.setAttribute('placeholder', 'Búsqueda por Id')
  input.onkeyup = function () {
    const id = this.value
    searchPost(response, id)
  }

  main.append(input)
  
  const orderElements = response.reverse()

  renderCards(orderElements)
  

}
function renderCards(posts) {
  posts.forEach(element => {
    const cardContainer =   createCard(element)

    main.append(cardContainer)
  });
}

function searchPost(response, id) {
  const searchResult = response.filter( post => post.id === parseInt(id))
  main.innerHTML = ''

  if (searchResult.length > 0 ) {
    renderCards(searchResult)
  } else {
    main.innerHTML = '<p>No se encontraron resultados</p>'
  }

}

function createCard(element) {

  const cardContainer = document.createElement('div')
  cardContainer.className = 'card_container'

  const headerUser = document.createElement('p')
  headerUser.className = 'userId'
  headerUser.innerText = 'User Id: ' + element.userId

  const headerId = document.createElement('p')
  headerId.className = 'id'
  headerId.innerText = 'Id: ' +  element.id

  const headerTitle = document.createElement('p')
  headerTitle.className = 'title'
  headerTitle.innerText = 'Title: ' +  element.title

  const btnDetails = document.createElement('button')
  btnDetails.className = 'btn_details'
  btnDetails.setAttribute('id', 'btnDetailsId')
  btnDetails.innerText = 'Show more'
  btnDetails.setAttribute('value', element.id)
  btnDetails.addEventListener('click', function () {
    getPost(this.value )
  })

  cardContainer.append(headerTitle, headerUser, headerId, btnDetails)

  return cardContainer
}

async function getPost(id) {
  const post = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
  const response = await post.json()

  renderPosts(response.body)

}

function renderPosts(body) {
  const main = document.getElementById('main');
  main.innerHTML = `
    <div>
      <img class='btn_arrow' src='https://admin.diseno.keobra.com/site_assets/52959/icnFlechaA.svg' onClick={reload()} >
      <p class='body_text' >${body}</p>
    </div>
  `
}

function reload() {
  window.location.reload()
}
