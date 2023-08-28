const cardContainer = document.getElementById('card-container');
const searchBox = document.getElementById('search-box');
const showAllBtn = document.getElementById('show-all-btn');
const loadingSpinnerBox = document.getElementById('loading-spinner');

const loadPhone = async (searchText) => {
    const apiUrl = '';
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();

    cardContainer.textContent = '';

    if (data.data.length > 9) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }

    data.data = data.data.slice(0, 9);

    data.data.forEach(phone => {
        // console.log(phone);
        const card = document.createElement('div');
        card.classList = `w-80 p-5 border-2 border-slate-200 rounded-lg`;
        card.innerHTML = `
        <div class="bg-slate-200 w-full h-60 rounded-lg phone-div">
            <img src="${phone.image}" alt="" class="phone-img h-48">
        </div>

        <div class="text-center">
            <h2 class="my-5 font-semibold text-3xl">
                ${phone.phone_name}
            </h2>

            <p class="text-[#706F6F] text-lg mb-7">
                There are many variations of passages of available, but the majority have suffered
            </p>

            <p class="text-[#403F3F] text-3xl font-bold mb-4">
                $999
            </p>

            <button class="bg-[#0D6EFD] py-3 px-8 font-medium text-white text-xl rounded-lg"
                onclick="showDetailsPhone('${phone.slug}');">
                Show Details
            </button>
        </div>
        `

        cardContainer.appendChild(card)
    })

    loadingSpinner(false);
}

const showDetailsPhone = async (id) => {
    // console.log('clicked', id);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    // console.log(data);
    phoneDetails(data);
}

const phoneDetails = (phone) => {
    // console.log(phone);
    const phoneDetailsInfo = document.getElementById('phone-details');
    phoneDetailsInfo.innerHTML = `
    <div class="bg-slate-200 w-full h-60 rounded-lg phone-div">
        <img src="${phone.data.image}" alt="" class="phone-img h-56">
    </div>

    <div class="text-left">
        <h2 class="my-5 font-semibold text-3xl" id="mobile-name">
            ${phone.data.name}
        </h2>

        <p class="text-[#706F6F] text-base mb-5">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Storage :</span>
            <span>
                ${phone.data.mainFeatures.storage}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Display Size :</span>
            <span>
            ${phone.data.mainFeatures.displaySize}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Chipset :</span>
            <span>
            ${phone.data.mainFeatures.chipSet}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Memory :</span>
            <span>
            ${phone.data.mainFeatures.memory}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Slug :</span>
            <span>
            ${phone.data.slug}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Release data :</span>
            <span>
            ${phone.data.releaseDate}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">Brand :</span>
            <span>
            ${phone.data.brand}
            </span>
        </p>

        <p class="mb-4 text-lg">
            <span class="font-semibold">GPS :</span>
            <span>
                AYes, with A-GPS, GLONASS, GALILEO, BDS, QZSS
            </span>
        </p>
    </div>
    `
    my_modal_1.showModal();
}


const loadingSpinner = (isLoading) => {
    if (isLoading) {
        loadingSpinnerBox.classList.remove('hidden')
    } else {
        loadingSpinnerBox.classList.add('hidden')
    }
}

const searchPhone = () => {
    loadingSpinner(true)
    loadPhone(searchBox.value.trim());
}