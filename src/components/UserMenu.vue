<template>
    <div class="user-menu">
        <ul>
            <li @click="handleLogout">Logout</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'UserMenu',
    methods: {
        handleLogout() {
            fetch('/logout', { method: 'POST' })
                .then(() => {
                    // Redirect to login page or show message
                    window.location.href = '/login';
                })
                .catch(error => {
                    console.error('Error logging out:', error);
                });
        }
    }
};
</script>

<style scoped>
.user-menu {
    position: absolute;
    top: 100%;
    right: 0;
    border: 1px solid #ccc;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
.user-menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.user-menu li {
    padding: 10px;
    cursor: pointer;
}
.user-menu li:hover {
    background-color: #f5f5f5;
}
</style>
