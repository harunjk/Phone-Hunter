const loadPhone=(searchText)=>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
}

const displayPhone=phones=>{
    // Phone slice 
    phones=phones.slice(0,10);
    
    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.textContent='';

    // Not found Msg 
    const notFound=document.getElementById('notFund');
    if(phones.length === 0){
        notFound.classList.remove('d-none')
    }
    else{
        notFound.classList.add('d-none')
    }

    phones.forEach(phone => {

        const creatDiv=document.createElement('div');
        creatDiv.classList.add('col');
        creatDiv.innerHTML=`
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.slug}</p>
        </div>
        </div>
        `;
        phoneContainer.appendChild(creatDiv);
    })
}

document.getElementById('search-btn').addEventListener('click', function(){
    const searchInput=document.getElementById('search-input');
    const searchValue=searchInput.value;
    loadPhone(searchValue);
})

loadPhone()