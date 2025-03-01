document.addEventListener('click', async ({target}) => {
    const id = target.dataset.id;
    const type =  target.dataset.type;

    if (type === 'remove') {
        await remove(id).then(()=>{
            target.closest('.list-group-item').remove()
        })
    }
    if (type === 'edit') {
        const newTitle = prompt(`New title`)
        if(!newTitle.trim()) return
        await editing(id,newTitle).then(()=> { window.location.reload()})
    }
});

async function remove(id) {
   await fetch(`/${id}`, {method: 'DELETE'});
}

async function editing(id,newTitle){
    await fetch(`/${id}`, {
        method:'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title: newTitle})
    })
}