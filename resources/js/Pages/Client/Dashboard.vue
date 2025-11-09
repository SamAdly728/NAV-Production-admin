<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <h1>Client Dashboard</h1>
                <p>Welcome, {{ $page.props.auth.user.name }}!</p>
                <p>Role: {{ $page.props.auth.user.role }}</p>
                
                <div class="alert alert-info">
                    <strong>Template Integration in Progress</strong>
                    <p>The full template design from <code>template/index.html</code> will be integrated here.</p>
                </div>
                
                <form @submit.prevent="logout" method="POST">
                    <button type="submit" class="btn btn-danger">Logout</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { router } from '@inertiajs/vue3';

const logout = () => {
    router.post('/logout');
};
</script>
