// requires firebase.js to be loaded first
const newsContainer = document.getElementById('latest');
const ticker = document.getElementById('breaking-ticker');

function renderCard(doc){
  const data = doc.data();
  return `
    <article class="card">
      <img src="${data.image || 'assets/images/placeholder.jpg'}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:6px" />
      <h3>${data.title}</h3>
      <p>${data.desc}</p>
      <small>${data.category} • ${new Date(data.createdAt?.toDate?.() || data.date || Date.now()).toLocaleString()}</small>
    </article>`;
}

// load latest 12
db.collection('news').orderBy('createdAt','desc').limit(12).onSnapshot(snap=>{
  newsContainer.innerHTML = '';
  snap.forEach(doc => newsContainer.innerHTML += renderCard(doc));
});

// breaking ticker (latest 5 breaking)
db.collection('news').where('category','==','Breaking').orderBy('createdAt','desc').limit(5).get()
  .then(snap=>{
    const items = [];
    snap.forEach(d=> items.push(d.data().title));
    ticker.textContent = items.join('  •  ');
  });
