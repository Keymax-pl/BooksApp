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
  const filters =  [];

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
            const bookIndex = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(bookIndex, 1);
            bookImage.classList.remove('favorite');
          }else{
            bookImage.classList.add('favorite');
            favoriteBooks.push(bookId);
          }
        }
      });
    }
    const filtersForm = document.querySelector('.filters');
    filtersForm.addEventListener('click', function(event){
      const clicktElem = event.target;

      if(clicktElem.tagName === 'INPUT'){
        const filterName = clicktElem.value;

        if(filters.includes(filterName)){
          const fiterIndex = filters.indexOf(filterName);
          filters.splice(fiterIndex, 1);
        }else{
          filters.push(filterName);
        }
        filterBooks();
      }

    });
  }
  initAction();

  function filterBooks (){

    for(const book of dataSource.books){
      let showBook = true;
      for(const filter of filters){
        if(!book.details[filter]){
          showBook = false;
          break;
        }
      }
      const bookElem = document.querySelector('[data-id="' + book.id + '"]');
      if(showBook){
        bookElem.classList.remove('hidden');
      }else{
        bookElem.classList.add('hidden');
      } 
    }   
  }



































































































































}