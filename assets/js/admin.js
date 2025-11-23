// publish()
async function publish(){
  const title = document.getElementById('title').value.trim();
  const desc  = document.getElementById('desc').value.trim();
  const category = document.getElementById('category').value;
  const file = document.getElementById('image').files[0];

  if(!title || !desc) return alert('Title and description required');
  try{
    let imageUrl = '';
    if(file){
      const path = `news/${Date.now()}_${file.name}`;
      const ref = storage.ref(path);
      await ref.put(file);
      imageUrl = await ref.getDownloadURL();
    }
    await db.collection('news').add({
      title, desc, category, image: imageUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: firebase.auth().currentUser?.email || 'admin',
      published: true
    });
    alert('Published');
    location.reload();
  }catch(e){ alert(e.message) }
}

// manage list
function loadManage(){
  const el = document.getElementById('manage-list');
  db.collection('news').orderBy('createdAt','desc').get().then(snap=>{
    el.innerHTML = '';
    snap.forEach(doc=>{
      const d = doc.data();
      el.innerHTML += `<div class="card">
        <strong>${d.title}</strong><br><small>${d.category} • ${d.author||''}</small>
        <div style="margin-top:6px">
          <button onclick="edit('${doc.id}')">Edit</button>
          <button onclick="removeNews('${doc.id}')">Delete</button>
        </div>
      </div>`;
    });
  });
}
function removeNews(id){
  if(!confirm('Delete this news?')) return;
  db.collection('news').doc(id).delete().then(()=>alert('Deleted')).then(()=>loadManage());
}
function edit(id){
  // simple edit flow: fetch, prompt, update
  db.collection('news').doc(id).get().then(doc=>{
    const d = doc.data();
    const ntitle = prompt('Title', d.title);
    const ndesc = prompt('Desc', d.desc);
    if(ntitle!=null && ndesc!=null){
      db.collection('news').doc(id).update({title:ntitle, desc:ndesc}).then(()=>alert('Updated')).then(()=>loadManage());
    }
  });
}

// call on dashboard load
if(document.getElementById('manage-list')) loadManage();
