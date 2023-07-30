const loadPhone=(searchText)=>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
}

const displayPhone=phones=>{
    // Phone slice 
    phones=phones.slice(0,25);

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
        // console.log(phone)
        const creatDiv=document.createElement('div');
        creatDiv.classList.add('col');
        creatDiv.innerHTML=`
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.slug}</p>
        </div>
        <button onClick="phoneDetails('${phone.slug}')" class="btn btn-primary w-25 m-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
        `;
        phoneContainer.appendChild(creatDiv);
        
    })
    toggleSpinner(false)
}

const phoneDetails=id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails=phone=>{
    console.log(phone)
    const detailsTitle=document.getElementById('exampleModalLabel');
    detailsTitle.innerText=`${phone.name}`;
    const moreDetails=document.getElementById('details-body');
    moreDetails.innerHTML=`
    <h4>Release Date : ${phone.releaseDate}</h4>
    <h4>Storage: ${phone.mainFeatures.memory}</h4>
    <h5>Display: ${phone.mainFeatures.displaySize}</h5>
    `;
}

document.getElementById('search-btn').addEventListener('click', function(){
    toggleSpinner(true)
    const searchInput=document.getElementById('search-input');
    const searchValue=searchInput.value;
    loadPhone(searchValue);
})

// Enter key element 
document.getElementById('search-input').addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        const searchInput=document.getElementById('search-input');
        const searchValue=searchInput.value;
        loadPhone(searchValue);
    }
})

// Add spinner 
const toggleSpinner = isLoading=>{
    const spineer=document.getElementById('spinner');
    if(isLoading){
        spineer.classList.remove('d-none')
    }
    else{
        spineer.classList.add('d-none')
    }
}

loadPhone('iphone')