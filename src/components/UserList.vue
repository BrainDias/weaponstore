<!-- src/components/UserList.vue -->

<template>
    <div>
        <h1>User List</h1>
        <div v-if="loading">Loading...</div>
        <div v-if="!loading && users.length === 0">No users found.</div>
        <ul v-if="!loading && users.length > 0">
            <li v-for="user in users" :key="user.id" class="user-item">
                <img :src="user.avatar" alt="Avatar" class="avatar" />
                <span class="username">{{ user.username }}</span>
                <button @click="showUserProducts(user.id)">Show Products</button>
            </li>
        </ul>
        <button @click="fetchUsers">Refresh</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [], // Список пользователей
            loading: false, // Состояние загрузки
        };
    },
    methods: {
        async fetchUsers() {
            this.loading = true;
            try {
                //TODO: отправлять номер и размер страницы
                const response = await fetch('/api/users'); // Обновите путь к вашему API
                const data = await response.json();
                this.users = data.content.map(user => {
                    return {
                        ...user,
                        avatar: this.byteArrayToImage(user.avatar) // Преобразование byte[] в изображение
                    };
                });
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.loading = false;
            }
        },
        async showUserProducts(userId) {
            try {
                //TODO: сделать чтобы загружались продукты другого пользователя нормально
                const response = await fetch(`/products/${userId}`);
                const data = await response.json();
                this.products = data;
                this.activeComponent = 'products';
            } catch (error) {
                console.error('Error fetching user products:', error);
            }
        },
    },
    created() {
        this.fetchUsers(); // Загрузка данных при создании компонента
    },
};
</script>

<style>
.user-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.username {
    font-size: 16px;
}

button {
    margin-left: 10px;
}
</style>

