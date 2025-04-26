const apiUrl = "http://173.249.8.175:8082/api/brand";
const itemsPerPage = 10;
let currentPage = 1;
let idBrand = null;
let rating = 0;
let currentRating = -1;
let brand_image;
let countries;
let country_id;
let isEditMode = false;
let brandToEdit = null;

// getallbrands
async function getBrands() {
  try {
    const response = await fetch(`${apiUrl}/getallbrands`);
    const data = await response.json();
    return data?.data?.list_brands;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCountries() {
  try {
    const response = await fetch(`${apiUrl}/getallcountries`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function populateCountries() {
  const selectElement = document.getElementById("countries");
  selectElement.innerHTML = '<option value="">Sélectionnez un pays</option>';
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.id;
    option.textContent = country.country_name;
    selectElement.appendChild(option);
  });
}

document.getElementById("countries").addEventListener("change", function () {
  country_id = this.value;
});

// store brand

async function storeBrand(event) {
  event.preventDefault();
  hideCreateModal();

  try {
    const brand_name = document.getElementById("brand_name").value;
    const description = document.getElementById("description").value;
    const brandData = new FormData();
    brandData.append("brand_image", brand_image);
    brandData.append("brand_name", brand_name);
    brandData.append("description", description);
    brandData.append("rating", rating);
    brandData.append("country_id", country_id);

    let url = `${apiUrl}/storebrand`;


    if (isEditMode && brandToEdit && brandToEdit.id) {
      url = `${apiUrl}/updatebrand`;
      brandData.id = brandToEdit.id;
    }

    response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: brandData,
    });

    const data = await response.json();
    if (data.success) {
      hideModal();
      window.location.reload();
    } else {
      console.error("Echec de la suppression");
    }
  } catch (error) {
    console.error(error);
  }
}

// update brand

async function deleteBrand() {
  if (idBrand) {
    hideDeleteModal();
    try {
      const response = await fetch(`${apiUrl}/destroybrand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idBrand }),
      });
      const data = await response.json();
      if (data.success) {
        window.location.reload();
      } else {
        console.error("Echec de la suppression");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

//filtrer les marques par nom
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchQuery = document
      .getElementById("simple-search")
      .value.toLowerCase();
    try {
      const brands = await getBrands();
      const filteredBrands = brands.filter((brand) =>
        brand.brand_name.toLowerCase().includes(searchQuery)
      );
      if (filteredBrands.length > 0) {
        displayBrands(filteredBrands);
      } else {
        document.getElementById("brandsTableBody").innerHTML =
          "<tr><td colspan='6'>Aucune marque trouvée.</td></tr>";
      }
      document.getElementById("simple-search").value = "";
    } catch (error) {
      console.error(error);
    }
  });

//pagination
function Paginate(brands) {
  const paginationList = document.getElementById("pageNumber");

  paginationList.innerHTML = "";
  const pageCount = Math.ceil(brands.length / itemsPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const pageItem = document.createElement("li");
    const linkItem = document.createElement("a");
    linkItem.href = "#";
    linkItem.textContent = i;
    linkItem.className = `flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
      currentPage === i
        ? "text-blue-600 bg-blue-50 border-blue-300"
        : "text-gray-500 bg-white"
    }`;

    paginationList.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      displayBrands(brands);
      Paginate(brands);
    });

    pageItem.appendChild(linkItem);
    paginationList.appendChild(pageItem);
  }

  document.getElementById("prevPage").onclick = function (event) {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayBrands(brands);
      Paginate(brands);
    }
  };

  document.getElementById("nextPage").onclick = function (event) {
    event.preventDefault();
    if (currentPage < pageCount) {
      currentPage++;
      displayBrands(brands);
      Paginate(brands);
    }
  };
}

// afficher le nombre d'entrées
function updatePaginationNav(startIndex, endIndex, totalItems) {
  const paginationNav = document.getElementById("paginationNav");
  paginationNav.innerHTML = `
            Affichage 
            <span class="font-semibold text-gray-900 dark:text-white">${
              startIndex + 1
            }-${endIndex}</span>
            of 
            <span class="font-semibold text-gray-900 dark:text-white">${totalItems}</span>
        `;
}
// afficher les marques dans le tableau
function displayBrands(brands) {
  const tableBody = document.getElementById("brandsTableBody");
  tableBody.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, brands.length);
  const currentBrands = brands.slice(startIndex, endIndex);
  let rowIndex = startIndex + 1;

  currentBrands.forEach((brand, index) => {
    const row = document.createElement("tr");
    row.className = `border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`;
    row.innerHTML = `<td class="p-4 w-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                onclick="event.stopPropagation()"
                class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <td class="px-4 py-3">
            <span
              class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
              >${rowIndex++}</span
            >
          </td>
          <th
            scope="row"
            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div class="flex items-center mr-3">
              <img
                src=${brand.brand_image}
                alt=${brand.brand_image}
                class="h-8 w-auto mr-3"
              />
              ${brand.brand_name}
            </div>
          </th>
          <td class="px-4 py-3">
            <span
              class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
              >${brand.description}</span
            >
          </td>

          <td
            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div class="flex items-center">
            ${createstarsRating(brand.rating)}
            </div>
          </td>

          <td class="px-4 py-3">${brand.created_at}</td>
          <td
            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div class="flex items-center space-x-4">
              
              <button
                type="button"
                onclick="populateModal({ id: ${brand.id}, brand_name: '${
      brand.brand_name
    }', brand_image: '${brand.brand_image}', description: '${
      brand.description
    }', rating: ${brand.rating} })"
                data-drawer-target="drawer-read-product-advanced"
                data-drawer-show="drawer-read-product-advanced"
                aria-controls="drawer-read-product-advanced"
                class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
              <i class="fa-solid fa-pen-to-square mr-2"></i>
                Modifier
              </button>
              <button
                type="button"
                data-modal-target="delete-modal"
                data-modal-toggle="delete-modal"
                class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onclick="showDeleteModal(${brand.id})">
                <i class="fa-solid fa-trash mr-2" style="color: #e40c22;"></i>
                Supprimer
              </button>
            </div>
          </td>`;

    tableBody.appendChild(row);
  });

  updatePaginationNav(startIndex, endIndex, brands.length);
}

function showDeleteModal(brandId) {
  idBrand = brandId;
  const modal = document.getElementById("delete-modal");
  modal.classList.remove("hidden");
}

function hideDeleteModal() {
  const modal = document.getElementById("delete-modal");
  modal.classList.add("hidden");
}

function hideupdateModal() {
  const modal = document.getElementById("updateBrandModal");
  modal.classList.add("hidden");
}

function hideCreateModal() {
  const modal = document.getElementById("createBrandModal");
  modal.classList.add("hidden");
}

// create rating stars
function createstarsRating(rating) {
  const stars = [];
  const totalStars = 5;
  for (let i = 1; i <= totalStars; i++) {
    const starClass = i <= rating ? "text-yellow-400" : "text-gray-300";
    stars.push(`
                <i class="fa-solid fa-star ${starClass}"></i>
                </svg>
            `);
  }
  return stars.join("");
}

function updateRating(value) {
  rating = parseInt(value);

  if (currentRating == rating) {
    currentRating = -1;
  } else {
    currentRating = rating;
  }

  const ratings = document.querySelectorAll(".star");
  ratings.forEach((star) => {
    const starValue = parseInt(star.value);
    const starLabel = star.nextElementSibling;
    const starShape = starLabel?.querySelector(".star-shape");
    if (starShape) {
      starShape.style.backgroundColor =
        starValue <= currentRating ? "gold" : "lightgray";
    } else {
      console.log("error");
    }
  });
}

// Display image
function displayImage(event,mode) {
  brand_image = event.target.files[0];
  let imagePreview;
  let Defaultdisplay
  if (mode == "update") {
    imagePreview = document.getElementById("imagePreview_update");
  } else if (mode == "create") {
    imagePreview = document.getElementById("imagePreview");
    Defaultdisplay = document.getElementById("Defaultdisplay");
  }


  if (brand_image) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove("hidden");
      Defaultdisplay.classList.add("hidden");
    };

    reader.readAsDataURL(brand_image);
  } else {
    imagePreview.classList.add("hidden");
    Defaultdisplay.classList.remove("hidden");
  }
}

function populateModal(brand) {
  console.log(brand);
  isEditMode = true;
  brandToEdit = brand;
  document.getElementById("brand_name_update").value = brand.brand_name;
  document.getElementById("description_update").value = brand.description;

  const ratingInputs = document.getElementsByName("star-radio_update");
  ratingInputs.forEach((input) => {
    if (input.value == brand.rating) {
      input.checked = true;
    }
  });
  const imagePreview = document.getElementById("imagePreview_update");
  imagePreview.src = brand.brand_image;
  const modal = document.getElementById("updateBrandModal");
  modal.classList.remove("hidden");
}

window.onload = async function () {
  const brands = await getBrands();
  countries = await getCountries();
  populateCountries();
  displayBrands(brands);
  Paginate(brands);
  console.log(brands);
};
