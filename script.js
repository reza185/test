const textarea = document.querySelector('.form__textarea');
const MAX_CHAR = 150;
const cunter = document.querySelector('.counter ');
const form = document.querySelector('.form');
const inputbox = document.querySelector('.form__valid');
const timeout = 2000;
const labelel = document.querySelector('.form__label');
const spiner = document.querySelector('.spinner');
const ol = document.querySelector('.feedbacks');
const dark = document.querySelector('.light');
const body = document.querySelector('.body');
const feedback = document.querySelector('.feedback');
const upvote = document.querySelector('.upvote');
const hashtag = document.querySelector('.hashtags');
const supabaseUrl='https://mqkkngbrnwkbdzxxqcsy.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xa2tuZ2JybndrYmR6eHhxY3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNzg5NDMsImV4cCI6MjA3MDg1NDk0M30.OIwYuvJlq6TJlXRSoYNgohGcnkJhsDeR3O_YRu_qbDc';
const tableName = 'rezasara';
const supabaseClient  = supabase.createClient(supabaseUrl, supabaseKey) // اگر از ماژول‌ها استفاده می‌کنید

const YOUR_PASSWORD='Reza13811381+';

async function loadFeedbacks() {
    try {
      const { data, error } = await supabaseClient
        .from('rezasara')
        .select('*');
  
      if (error) throw error;
  
      data.forEach(feed => {
        url(feed);
      });
      
      spiner.classList.remove('spinner');
    } catch (error) {
      console.error('Error:', error);
      spiner.classList.remove('spinner');
    }
  }
  
  // فراخوانی تابع هنگام بارگذاری صفحه
  document.addEventListener('DOMContentLoaded', loadFeedbacks);



url = feed => {
    const feedback = ol.insertAdjacentHTML('beforeend', `
   <li class="feedback"><button class="upvote">
       <i class="fa-solid fa-caret-up upvote__icon"></i>
       <span class="upvote__count">${feed.upvoteCount}</span>
   </button>
   <section class="feedback__badge">
       <p class="feedback__letter">${feed.badgeLetter}</p>
   </section>
   <div class="feedback__content">
       <p class="feedback__company">${feed.company}</p>
       <p class="feedback__text">${feed.text}</p>
   </div>
   <p class="feedback__date">${feed.daysAgo}</p></li>
   

` );
    spiner.classList.remove('spinner');
}
const textlenth = () => {
    const textarealenth = textarea.value.length;
    cunter.textContent = MAX_CHAR - textarealenth;
};
submitcheker = () => {
    if (textarea.value.includes('#')) {
        boxchecker(form);
        textarea.textContent = ' ';


    }
    else {
        textarea.focus();
        boxchecker(form);

    }
}
boxchecker = valid => {
    if (textarea.value.includes('#')) {
        valid.classList.add('form--valid');
        setTimeout(() => {
            valid.classList.remove('form--valid');

        }, timeout);

        cunter.textContent = 150;
        const hashtag = textarea.value.split(' ').find(word => word.includes('#'));
        const text = textarea.value;
        const company = hashtag.substring(1);
        const badgeLetter = hashtag.substring(1, 2);

        const upvoteCount = 0;
        const daysAgo = new Date().toISOString();
        const insert = { upvoteCount: upvoteCount, company: company, text: text, badgeLetter: badgeLetter, daysAgo: daysAgo, created_at: new Date().toISOString()  };

        url(insert);

        fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
            method: 'POST',
            body: JSON.stringify(insert),
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            }
          })
          .then(response => {
            console.log('Status:', response.status); // ✅ وضعیت را لاگ کنید
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(JSON.stringify(err));
              });
            }
            return response.json();
          })
          .then(data => console.log('Success:', data))
          .catch(error => {
            console.error('Full Error:', error); // ✅ خطای کامل را ببینید
          });

        textarea.value = '';
    }
    else {
        valid.classList.add('form--invalid');
        setTimeout(() => {
            valid.classList.remove('form--invalid');

        }, timeout);
    }

}

clickhandler = click => {
    const target = click.target;
    const upvote = target.className.includes('upvote');

    if (upvote) {

        const disabled = target.closest('.upvote');
        disabled.disabled = true;

        const count = disabled.querySelector('.upvote__count');
        const countn = count.textContent;
        const countfi = +countn;
        count.textContent = countfi + 1;
    }
    else {
        target.closest('.feedback').classList.toggle('feedback--expand');
    }
}
hashtaghandler = val => {
    const hashname = val.target.textContent.substring(1).toLowerCase().trim();
    const click = val.target;
    if (click.className === 'hashtags') return;
    ol.childNodes.forEach(element => {
        if (element.nodeType == 3) return;

        const companyname = element.querySelector('.feedback__company');
        if(companyname === null)return;
        const namefinall=companyname.textContent.toLowerCase().trim();
        console.log(namefinall);
      if (hashname!==namefinall) element.classList.toggle('classhidden');
        
    });
}
textarea.addEventListener('input', textlenth);
form.addEventListener('submit', submitcheker);
dark.addEventListener('click', reza = () => {
    dark.classList.toggle('dark');
    body.classList.toggle('bodydark')
});
ol.addEventListener('click', clickhandler);
hashtag.addEventListener('click', hashtaghandler)
