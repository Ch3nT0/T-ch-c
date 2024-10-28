document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các checkbox
    const productCheckboxes = document.querySelectorAll('.product-checkbox');
    const priceCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([value])');
    const naturalCheckbox = document.querySelector('input[type="checkbox"][value="Tự nhiên"]');
    const noSugarCheckbox = document.querySelector('input[type="checkbox"][value="Không đường"]');
    const veganCheckbox = document.querySelector('input[type="checkbox"][value="Thuần chay"]');

    // Thêm sự kiện lắng nghe cho tất cả checkbox
    [...productCheckboxes, ...priceCheckboxes, naturalCheckbox, noSugarCheckbox, veganCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    function filterProducts() {
        // Lấy các loại bánh đã chọn
        const selectedProducts = Array.from(productCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Lấy giá trị của checkbox giá tiền đã chọn
        const selectedPrices = Array.from(priceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.nextSibling.textContent.trim());

        // Lấy các phân loại đặc biệt
        const selectedNatural = naturalCheckbox.checked;
        const selectedNoSugar = noSugarCheckbox.checked;
        const selectedVegan = veganCheckbox.checked;

        // Lấy tất cả các sản phẩm
        const cakes = document.querySelectorAll('.cake');

        cakes.forEach(cake => {
            const productName = cake.querySelector('.txC').textContent;
            const costText = cake.querySelector('.cost').textContent.trim();
            const costValue = parseInt(costText.replace(/\D/g, ''));
            const hasNatural = cake.querySelector('.ic img[src*="tuNhien"]');
            const hasNoSugar = cake.querySelector('.ic img[src*="koDuong"]');
            const hasVegan = cake.querySelector('.ic img[src*="thuanChay"]');

            // Kiểm tra loại bánh
            const showByType = selectedProducts.length === 0 || selectedProducts.includes(productName);

            // Kiểm tra giá
            let showByPrice = selectedPrices.length === 0;
            selectedPrices.forEach(priceRange => {
                if (priceRange.includes('Dưới') && costValue < 30000) {
                    showByPrice = true;
                } else if (priceRange.includes('30.000đ - 100.000đ') && costValue >= 30000 && costValue <= 100000) {
                    showByPrice = true;
                } else if (priceRange.includes('100.000đ - 200.000đ') && costValue > 100000 && costValue <= 200000) {
                    showByPrice = true;
                } else if (priceRange.includes('200.000đ - 500.000đ') && costValue > 200000 && costValue <= 500000) {
                    showByPrice = true;
                } else if (priceRange.includes('Trên') && costValue > 500000) {
                    showByPrice = true;
                }
            });

            // Kiểm tra phân loại đặc biệt
            const showByCategory = (selectedNatural ? hasNatural : true) &&
                                   (selectedNoSugar ? hasNoSugar : true) &&
                                   (selectedVegan ? hasVegan : true);

            // Hiển thị sản phẩm nếu nó thỏa mãn tất cả các điều kiện
            cake.style.display = (showByType && showByPrice && showByCategory) ? 'block' : 'none';
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.querySelector(".sx select");
    const cakeContainer = document.querySelector(".cake").parentNode;
    const cakes = Array.from(document.querySelectorAll(".cake"));
    const originalOrder = [...cakes]; // Lưu thứ tự ban đầu của các phần tử

    selectElement.addEventListener("change", function () {
        let sortedCakes;

        if (this.value === "Giá tăng dần") {
            sortedCakes = cakes.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (this.value === "Giá giảm dần") {
            sortedCakes = cakes.sort((a, b) => getPrice(b) - getPrice(a));
        } else {
            sortedCakes = originalOrder; // Trả về thứ tự ban đầu khi chọn "Mới nhất"
        }
        
        // Làm trống container và thêm các cake đã sắp xếp
        cakeContainer.innerHTML = "";
        sortedCakes.forEach(cake => cakeContainer.appendChild(cake));
    });

    function getPrice(cakeElement) {
        const priceText = cakeElement.querySelector(".cost").innerText;
        return parseInt(priceText.replace(" vnđ", "").replace(".", ""));
    }
});
