document.addEventListener('DOMContentLoaded', ()=>{
  const list = document.getElementById('category-list');
  const category = list.dataset.category;
  db.collection('news')
    .where('category','==', category)
    .orderBy('createdAt','desc')
    .get()
    .then(snap=>{
      list.innerHTML = '';
      snap.forEach(doc=>{
        const d = doc.data();
        list.innerHTML += `
          <article class="card">
            <img src="${d.image||'../assets/images/placeholder.jpg'}" style="height:160px;object-fit:cover" />
            <h3>${d.title}</h3>
            <p>${d.desc}</p>
            <small>${new Date(d.createdAt?.toDate?.() || Date.now()).toLocaleString()}</small>
          </article>`;
      });
    });
});
