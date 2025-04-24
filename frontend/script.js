const apiUrl = 'http://localhost:8000/api/brand';

async function getBrands() {
    try {
        const response = await fetch(`${apiUrl}/getallbrands`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function storeBrand() {
    try {
        const name = document.getElementById('brand_name').value;
        const rating = document.getElementById('rating').value;
        const description = document.getElementById('description').value;
        const brand_image = document.getElementById('brand_image').value;
        const brand = { name, rating,description,brand_image };
        const response = await fetch(`${apiUrl}/storebrand`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brand),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function updateBrand(){
    
}
window.onload = async function () {
    const brands = await getBrands();
    console.log(brands);

};