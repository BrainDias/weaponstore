<!-- src/App.vue -->

<template>
    <div id="app">
        <header>
            <div class="user-info">
                <span v-if="username">
                    <button @click="toggleMenu" class="user-button">
                        <img v-if="avatar" :src="avatar" alt="User Avatar" class="avatar"/>
                        {{ username }}
                    </button>
                    <UserMenu v-if="menuVisible" />
                </span>
                <span v-else>Loading...</span>
            </div>
            <button @click="showProducts">My Products</button>
            <button @click="showUsers">Users</button>
        </header>
        <div>
            <ProductTable v-if="activeComponent === 'products'" />
            <UserList v-if="activeComponent === 'users'" />
        </div>
    </div>
</template>

<script>
import ProductTable from './components/ProductTable.vue';
import UserMenu from './components/UserMenu.vue';
import {byteArrayToImage} from "@/utils/imageUtils";
import UserList from "@/components/UserList.vue"; // Импортируйте компонент UserMenu

export default {
    name: 'App',
    components: {
        ProductTable,
        UserMenu,
        UserList
    },
    data() {
        return {
            username: null,
            avatar: null, // Добавьте поле для аватара
            menuVisible: false, // Управление видимостью меню
            activeComponent: 'products'
        };
    },
    methods: {
        fetchUserProfile() {
            fetch('/profile') // Настройте URL в соответствии с вашим API
                .then(response => response.json())
                .then(data => {
                    this.username = data.username; // предполагается, что объект содержит свойство username
                    // Преобразуем byte[] в base64
                    this.avatar = byteArrayToImage(data.avatar);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        },
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        },
        showProducts() {
            this.activeComponent = 'products';
        },
        showUsers() {
            this.activeComponent = 'users';
        },
    },
    created(){
        this.fetchUserProfile();
    }
};
</script>

<style>
.user-info {
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

.menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
}

button {
    margin: 5px;
}
</style>
