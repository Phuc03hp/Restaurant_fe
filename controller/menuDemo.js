document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let menuList = document.getElementById('menu-list');
    let categoryFilter = document.getElementById('category-filter');

    let menuData = [];


    fetch('http://124.158.5.70:8081/restaurant/menu')
        .then(response => response.json())
        .then(data => {
            menuData = data;
            displayMenu(data);


            const categories = [...new Set(data.map(food => food.category.name))];
            categories.forEach(categoryName => {
                let option = document.createElement('option');
                option.value = categoryName; 
                option.textContent = categoryName; 
                categoryFilter.appendChild(option); 
            });
        })
        .catch(error => console.error('Error fetching menu data:', error));


    const displayMenu = (filteredData) => {
        menuList.innerHTML = ''; 
        filteredData.forEach(food => {
            let foodItem = `
                <div class="food-item">
                    <img src="${food.description}" alt="${food.name}">
                    <h3>${food.name}</h3>
                    <p>Loại: ${food.category.name}</p>
                    <p>Giá: ${food.price} VNĐ</p>
                    <button class="order-button" data-food-id="${food.id}" data-food-name="${food.name}" data-food-price="${food.price}" data-food-image="${food.description}">Thêm vào giỏ hàng</button>
                </div>
            `;
            menuList.innerHTML += foodItem;
        });
    };
});
    