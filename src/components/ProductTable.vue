<!-- src/components/ProductTable.vue -->

<template>
    <div>
        <table>
            <!-- TODO: добавить другие поля -->
            <thead>
            <tr>
                <th>Price</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>For Sale</th>
                <th>Hidden</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product, index) in products" :key="index">
                <td>{{ product.price }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.qty }}</td>
                <td>{{ product.forSale ? 'Yes' : 'No' }}</td>
                <td>{{ product.hidden ? 'Yes' : 'No' }}</td>
                <td>
                    <button @click="deleteProduct(index)">Delete</button>
                    <button @click="editProduct(index)">Update</button>
                </td>
            </tr>
            </tbody>
        </table>
        <!-- Add Product button -->
        <button @click="showAddProductForm = true">Add Product</button>
        <!-- Форма для добавления нового продукта -->
        <!-- TODO: добавить другие поля для заполнения продукта -->
        <div v-if="showAddProductForm">
            <h2>Add New Product</h2>
            <form @submit.prevent="isUpdating ? updateProduct() : addProduct()">
                <label>
                    Name:
                    <input v-model="currentProduct.name" type="text" required />
                </label>
                <br />
                <label>
                    Price:
                    <input v-model="currentProduct.price" type="number" step="0.01" required />
                </label>
                <br />
                <label>
                    Description:
                    <input v-model="currentProduct.description" type="text" />
                </label>
                <br />
                <button type="submit">{{ isUpdating ? 'Update' : 'Add' }} Product</button>
                <button type="button" @click="cancel">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            showAddProductForm: false,
            isUpdating: false,
            currentProduct: {
                name: '',
                price: '',
                description: ''
            },
            productIndex: null
        };
    },
    created() {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                this.products = data;
            })
            .catch(error => console.error('Error fetching products:', error));
    },
    methods: {
        async addProduct() {
            try {
                const response = await fetch('/products', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.currentProduct)
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                this.cancel();

                // Обновите список продуктов, возможно, сделав запрос на получение обновленных данных
                this.created();
            } catch (error) {
                console.error('Error adding product:', error);
            }
        },

        async deleteProduct(index) {
            try {
                const response = await fetch(`/products/${index}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                // Обновите список продуктов, возможно, сделав запрос на получение обновленных данных
                this.created();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },

        async updateProduct() {
            try {
                const response = await fetch(`/products/${this.productIndex}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.currentProduct)
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                this.cancel();

                // Обновите список продуктов, возможно, сделав запрос на получение обновленных данных
                this.created();
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },

        submitProduct() {
            this.addProduct(this.newProduct);
            this.newProduct = { name: '', price: 0 }; // Сброс формы
            this.showAddProductForm = false; // Скрыть форму после отправки
        },

        editProduct(index) {
            this.currentProduct = { ...this.products[index] };
            this.productIndex = index;
            this.showAddProductForm = true;
            this.isUpdating = true;
        },
        cancel() {
            this.showAddProductForm = false;
            this.isUpdating = false;
            this.currentProduct = {
                name: '',
                price: '',
                description: ''
            };
            this.productIndex = null;
        }
    }
};
</script>

<style scoped>
/* Добавьте свои стили */
</style>

