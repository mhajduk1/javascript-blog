'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector ='.post-tags .list',
  optArticleAuthorsSelector ='.post-author',
  optTagsListSelector ='.tags.list',
  optCloudClassCount = 5,
  optAuthorsListSelector = '.authors',
  optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault();

  //this.event.preventDefault();

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){

    activeLink.classList.remove('active');

  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

  /* get the title from the title element */

  /* insert link into titleList */

}

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* create HTML of the link */
    html = html + linkHTML;
  }

  /* insert link into titleList */
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();
function calculateTagsParams(tags){
  
  const params = {max: 0, min: 999999};
  
  for(let tag in tags){

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }

  }
  return {
    min: params.min,
    max: params.max
  };
}

function calculateAuthorsParams(authors) {
  const params = {max: 0, min: 999999}
  
  for (let author in authors) {
    
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }

  }
  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function calculateAuthorClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}
function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles =  document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* make html variable with empty string */
    let html = '';

    /* find tags wrapper */
    const wrapperTag = article.querySelector (optArticleTagsSelector);

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTMLData = {id: tag, title: tag};
      const linkHtml = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHtml;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tags to allTags object */
        allTags[tag] = 1;

      } else {
        allTags[tag]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      wrapperTag.innerHTML = html;

    /* END LOOP: for each tag */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    
    /* [NEW] create variable for all links HTML code*/
    const allTagsData = {tags: []};

    /*[NEW] START LOOP: for each tag in allTags*/
    for(let tag in allTags) {

      const tagsParams = calculateTagsParams(allTags);
  

      const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams) + '" href=#tag-"' + tag + '">'+ tag + '(' + allTags[tag] + ')' +'</a></li>';
 
      /* [NEW] generate code of a link and add it to allTagsHTML*/
      
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      /*[NEW] END LOOP: for each tag in allTags*/
    }
    /*[NEW] add html from allTagsHTML to tagList*/
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  /* END LOOP: for every article: */
}
generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active');

  /* START LOOP: for each active tag link */
  for( let activeTag of activeTags) {

    /* remove class active */
    activeTag.classlist.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const links = document.querySelectorAll('.post-tags a, .tags a');

  /* find all links to tags */
  const tag_links =  document.querySelectorAll('a.active[href^="#tag-"]', 'a[href="' + links + '"]');

  /* START LOOP: for each link */
  for( let link of tag_links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
/*********************************************************************************/
function generateAuthors(){

  let allAuthors = {};

  /* find all articles */
  const articles =  document.querySelectorAll(optArticleSelector);

  const author_right_menu = document.querySelector(optAuthorsListSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles) {
    
    /* find author wrapper */
    let authorList = article.querySelector(optArticleAuthorsSelector);

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* make html variable with empty string */
    let html = '';
  
    /* [NEW] generate code of a link and add it to authorLinkHTML*/
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const authorLinkHTML = templates.authorLink(linkHTMLData);

    /* [NEW] add authorLinkHTML string to html_*/
    html = html + authorLinkHTML;

    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* [NEW] add generated code to allAuthors array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    
    /* [NEW] generate html code on the page*/
    authorList.innerHTML = html;

    author_right_menu.innerHTML += html; 

  }
  /* [NEW] find list of authors in right column */
  const authorCloudList = document.querySelector('.authors');

  const authorParams = calculateAuthorsParams(allAuthors);

  let allAuthorsHTML = ' ';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let articleAuthor in allAuthors) {

    /*[NEW] generate code of a link and add it to allTagsHTML */
    const authorLinkHTML = '<li><a class ="tag-size-' + calculateAuthorClass(allAuthors[articleAuthor], authorParams) +'" href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
    
    allAuthorsHTML += authorLinkHTML;
    /* [NEW] END LOOP: for each author in allAuthors: */
  }

  /* [NEW] add html from allAuthors to authorList */
  authorCloudList.innerHTML = allAuthorsHTML;
}
 
  


generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for( let activeAuthor of activeAuthors) {

    activeAuthor.classlist.remove('active');

  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorLinks) {

    authorLink.classList.add('active');

  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

  const author_links = document.querySelectorAll(optArticleAuthorsSelector+' a');

  /* START LOOP: for each link */
  for( let author of author_links){

    /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();