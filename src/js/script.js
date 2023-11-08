{'use strict';

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };
  const booksList = document.querySelector('.books-list');

  function render(){
    for(let book of dataSource.books){
      const element = templates.bookTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(element);
      booksList.appendChild(generatedDOM);
    }
  }
  render();
  
  const favoriteBooks = [];

  function initAction(){
    const bookImages = document.querySelectorAll('.books-list .book__image');

    for(const bookImage of bookImages){
      bookImage.addEventListener('dblclick', function(event){

        event.preventDefault();
        const clickedElement = event.target;
        const clickBookImage = clickedElement.offsetParent.classList.contains('book__image');
        if(clickBookImage){
          const bookId = bookImage.getAttribute('data-id');

          if(favoriteBooks.includes(bookId)){
            const BookIndex = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(BookIndex, 1);
            bookImage.classList.remove('favorite');
          }else{
            bookImage.classList.add('favorite');
            favoriteBooks.push(bookId);
          }
        }
      });
    }
  }
  initAction();






























































































































}