{'use strict';

  const select = {
    listOfBooks: '.books-list',
    form: '.filters',
    bookTemplate: '#template-book',
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.bookTemplate).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters =  [];

      
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initAction();
    }

    
    initData() {
      this.data = dataSource.books;
    }


    render(){
      const thisBooksList = this;
      for(let book of thisBooksList.data){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const element = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(element);
        thisBooksList.dom.booksList.appendChild(generatedDOM);
      }
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.dom = {};
      thisBooksList.dom.booksList = document.querySelector(select.listOfBooks);
      thisBooksList.dom.form = document.querySelector(select.form);
    }
  

    initAction() {
      const thisBooksList = this;
      const bookImages = document.querySelectorAll('.books-list .book__image');
  
      for (const bookImage of bookImages) {
        bookImage.addEventListener('dblclick', function (event) {
          event.preventDefault();
          const clickedElement = event.target;
          const clickBookImage = clickedElement.closest('.book__image');
  
          if (clickBookImage) {
            const bookId = clickBookImage.getAttribute('data-id');
  
            if (!thisBooksList.favoriteBooks.includes(bookId)) {
              thisBooksList.favoriteBooks.push(bookId);
              clickBookImage.classList.add('favorite');
            } else {
              const bookIndex = thisBooksList.favoriteBooks.indexOf(bookId);
              thisBooksList.favoriteBooks.splice(bookIndex, 1);
              clickBookImage.classList.remove('favorite');
            }
  
            thisBooksList.filterBooks();
          }
        });
      }
      const filtersForm = document.querySelector('.filters');
      filtersForm.addEventListener('click', function(event){
        const clicktElem = event.target;

        if(clicktElem.tagName === 'INPUT'){
          const filterName = clicktElem.value;

          if(thisBooksList.filters.includes(filterName)){
            const filterIndex = thisBooksList.filters.indexOf(filterName);
            thisBooksList.filters.splice(filterIndex, 1);
          }else{
            thisBooksList.filters.push(filterName);
          }
          thisBooksList.filterBooks();
        }

      });
    }

    filterBooks (){
      const thisBooksList = this;
      for(const book of dataSource.books){
        let showBook = true;
        for(const filter of thisBooksList.filters){
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

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
    }
  }
  const app = new BooksList();

  console.log(app);






}