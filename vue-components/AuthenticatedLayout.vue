<script setup>
import { ref } from 'vue';
import { Link, router, usePage } from '@inertiajs/vue3';

const page = usePage();
const showingNavigationDropdown = ref(false);
const showSidebar = ref(true);

const logout = () => {
    router.post(route('logout'));
};

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};
</script>

<template>
    <div class="app-wrapper">
        <!-- Sidebar -->
        <nav class="app-sidebar" :class="{ 'collapsed': !showSidebar }">
            <div class="app-logo">
                <Link class="logo d-inline-block" :href="route('dashboard')">
                    <img alt="Logo" src="/assets/images/logo/1.png">
                </Link>
            </div>

            <div class="d-flex align-items-center nav-profile p-3">
                <span class="h-45 w-45 d-flex-center b-r-10 position-relative bg-danger m-auto">
                    <img 
                        :alt="$page.props.auth.user.name" 
                        class="img-fluid b-r-10 rounded-circle" 
                        :src="$page.props.auth.user.avatar || '/assets/images/avatar/default.jpg'"
                    >
                    <span class="position-absolute top-0 end-0 p-1 bg-success border border-light rounded-circle"></span>
                </span>
                <div class="flex-grow-1 ps-2">
                    <h6 class="text-primary mb-0">{{ $page.props.auth.user.name }}</h6>
                    <p class="text-muted f-s-12 mb-0">{{ $page.props.auth.user.email }}</p>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <div class="sidebar-menu">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <Link 
                            :href="route('dashboard')" 
                            class="nav-link"
                            :class="{ 'active': $page.component === 'Dashboard' }"
                        >
                            <i class="ti ti-layout-dashboard"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link 
                            :href="route('products')" 
                            class="nav-link"
                            :class="{ 'active': $page.component.startsWith('Products') }"
                        >
                            <i class="ti ti-package"></i>
                            <span>Products</span>
                        </Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link 
                            :href="route('orders')" 
                            class="nav-link"
                            :class="{ 'active': $page.component.startsWith('Orders') }"
                        >
                            <i class="ti ti-shopping-cart"></i>
                            <span>Orders</span>
                        </Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link 
                            :href="route('blog')" 
                            class="nav-link"
                            :class="{ 'active': $page.component.startsWith('Blog') }"
                        >
                            <i class="ti ti-news"></i>
                            <span>Blog</span>
                        </Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link 
                            :href="route('profile')" 
                            class="nav-link"
                            :class="{ 'active': $page.component.startsWith('Profile') }"
                        >
                            <i class="ti ti-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link 
                            :href="route('settings')" 
                            class="nav-link"
                            :class="{ 'active': $page.component.startsWith('Settings') }"
                        >
                            <i class="ti ti-settings"></i>
                            <span>Settings</span>
                        </Link>
                    </li>
                    
                    <li class="nav-item mt-3">
                        <button 
                            @click="logout" 
                            class="nav-link btn btn-link text-start w-100"
                        >
                            <i class="ti ti-logout"></i>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="app-content" :class="{ 'expanded': !showSidebar }">
            <!-- Header -->
            <header class="app-header sticky-top bg-white shadow-sm">
                <div class="container-fluid">
                    <div class="d-flex justify-content-between align-items-center py-3">
                        <button 
                            @click="toggleSidebar" 
                            class="btn btn-link text-dark"
                        >
                            <i class="ti ti-menu-2 fs-4"></i>
                        </button>

                        <div class="d-flex align-items-center gap-3">
                            <!-- Search -->
                            <div class="search-box d-none d-md-block">
                                <div class="input-group">
                                    <span class="input-group-text bg-transparent border-end-0">
                                        <i class="ti ti-search"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        class="form-control border-start-0" 
                                        placeholder="Search..."
                                    >
                                </div>
                            </div>

                            <!-- Notifications -->
                            <div class="dropdown">
                                <button 
                                    class="btn btn-link text-dark position-relative" 
                                    data-bs-toggle="dropdown"
                                >
                                    <i class="ti ti-bell fs-5"></i>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        3
                                    </span>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li class="dropdown-item">New order received</li>
                                    <li class="dropdown-item">Customer registered</li>
                                    <li class="dropdown-item">Product shipped</li>
                                </ul>
                            </div>

                            <!-- User Profile Dropdown -->
                            <div class="dropdown">
                                <button 
                                    class="btn btn-link text-dark d-flex align-items-center gap-2" 
                                    data-bs-toggle="dropdown"
                                >
                                    <img 
                                        :src="$page.props.auth.user.avatar || '/assets/images/avatar/default.jpg'" 
                                        :alt="$page.props.auth.user.name"
                                        class="rounded-circle"
                                        style="width: 35px; height: 35px; object-fit: cover;"
                                    >
                                    <span class="d-none d-md-inline">{{ $page.props.auth.user.name }}</span>
                                    <i class="ti ti-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link :href="route('profile')" class="dropdown-item">
                                            <i class="ti ti-user me-2"></i>My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link :href="route('settings')" class="dropdown-item">
                                            <i class="ti ti-settings me-2"></i>Settings
                                        </Link>
                                    </li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <button @click="logout" class="dropdown-item">
                                            <i class="ti ti-logout me-2"></i>Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="app-main p-4">
                <slot />
            </main>

            <!-- Footer -->
            <footer class="app-footer bg-white border-top py-3">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <p class="mb-0 text-muted">
                                © {{ new Date().getFullYear() }} Ki-Admin. All rights reserved.
                            </p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p class="mb-0 text-muted">
                                Version 1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.app-wrapper {
    display: flex;
    min-height: 100vh;
}

.app-sidebar {
    width: 260px;
    background: #fff;
    border-right: 1px solid #e5e7eb;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    overflow-y: auto;
    transition: all 0.3s ease;
    z-index: 1000;
}

.app-sidebar.collapsed {
    width: 80px;
}

.app-sidebar.collapsed .nav-link span {
    display: none;
}

.app-content {
    flex: 1;
    margin-left: 260px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.app-content.expanded {
    margin-left: 80px;
}

.sidebar-menu {
    padding: 1rem 0;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    color: #6b7280;
    text-decoration: none;
    transition: all 0.2s;
}

.nav-link:hover,
.nav-link.active {
    color: #3b82f6;
    background: #eff6ff;
}

.nav-link i {
    font-size: 1.25rem;
}

.search-box {
    width: 300px;
}

.app-main {
    flex: 1;
}

@media (max-width: 768px) {
    .app-sidebar {
        transform: translateX(-100%);
    }
    
    .app-sidebar.show {
        transform: translateX(0);
    }
    
    .app-content {
        margin-left: 0;
    }
}
</style>
