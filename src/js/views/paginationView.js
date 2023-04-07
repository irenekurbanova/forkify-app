import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto; //convert to number
      handler(goToPage);
    });
  }

  _markupBtnNext(currentPage) {
    return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
      `;
  }

  _markupBtnPrevious(currentPage) {
    return `
     <button data-goto="${
       currentPage - 1
     }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currentPage - 1}</span>
     </button>
      `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._markupBtnNext(currentPage);
      // return `
      //   <button data-goto="${
      //     currentPage + 1
      //   }" class="btn--inline pagination__btn--next">
      //     <span>Page ${currentPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._markupBtnPrevious(currentPage);
      // return `
      //   <button data-goto="${
      //     currentPage - 1
      //   }" class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${currentPage - 1}</span>
      //   </button>
      // `;
    }
    // Any other page
    if (currentPage < numPages) {
      return (
        this._markupBtnPrevious(currentPage) + this._markupBtnNext(currentPage)
      );
      // return `
      //   <button data-goto="${
      //     currentPage - 1
      //   }" class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //     <span>Page ${currentPage - 1}</span>
      //   </button>
      //   <button data-goto="${
      //     currentPage + 1
      //   }"class="btn--inline pagination__btn--next">
      //     <span>Page ${currentPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;
    }
    // Page 1 and NO other pages
    return '';
  }
}

export default new PaginationView();
