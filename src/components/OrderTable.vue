<template>
    <div>
        <h1>Orders</h1>
        <table v-if="orders.length">
            <thead>
            <tr>
                <th>Price</th>
                <th>Delivered</th>
                <th>Products</th>
                <th>Created At</th>
                <th v-if="!buying && !externalOrders">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" :key="order.id">
                <td>{{ order.price.toFixed(2) }}</td>
                <td>{{ order.delivered ? 'Yes' : 'No' }}</td>
                <td>
                    <ul>
                        <!-- TODO: добавить еще свойства продуктов-->
                        <li v-for="product in order.products" :key="product.id">
                            {{ product.name }} ({{ product.quantity }})
                        </li>
                    </ul>
                </td>
                <td>{{ new Date(order.createdAt).toLocaleString() }}</td>
                <td v-if="!buying && !externalOrders">
                    <button @click="markAsDelivered(order.id)" :disabled="order.delivered">
                        Delivered
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
        <p v-else>No orders found.</p>
    </div>
</template>

<script>
export default {
    name: 'OrderTable',
    props: {
        buying: {
            type: Boolean,
            required: false,
            default: null
        },
        externalOrders: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data() {
        return {
            orders: []
        };
    },
    methods: {
        async fetchOrders() {
            try {
                const url = this.buying ? '/buying' : '/selling';
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.orders = await response.json();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async markAsDelivered(orderId) {
            try {
                const response = await fetch(`/orders/${orderId}`, {
                    method: 'PATCH'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error marking order as delivered:', error);
            }
        }
    },
    mounted() {
        if (this.externalOrders.length > 0) {
            this.orders = this.externalOrders;
        } else {
            this.fetchOrders();
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

button:disabled {
    background-color: gray;
    cursor: not-allowed;
}
</style>


