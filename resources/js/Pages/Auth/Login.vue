<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center mb-4">NAV Admin Login</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" required />
              </div>
              
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control" required />
              </div>
              
              <div class="mb-3 form-check">
                <input v-model="form.remember" type="checkbox" class="form-check-input" id="remember" />
                <label class="form-check-label" for="remember">Remember me</label>
              </div>
              
              <button type="submit" class="btn btn-primary w-100" :disabled="processing">
                {{ processing ? 'Signing In...' : 'Sign In' }}
              </button>
            </form>
            
            <hr class="my-4" />
            
            <button @click="handleGoogleLogin" class="btn btn-outline-secondary w-100">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

const form = ref({ email: '', password: '', remember: false });
const processing = ref(false);
const errorMessage = ref('');

const handleLogin = () => {
  processing.value = true;
  errorMessage.value = '';
  router.post('/login', form.value, {
    onSuccess: () => processing.value = false,
    onError: (errors) => {
      processing.value = false;
      errorMessage.value = errors.email || errors.password || 'Invalid credentials';
    }
  });
};

const handleGoogleLogin = () => window.location.href = '/auth/google';
</script>
