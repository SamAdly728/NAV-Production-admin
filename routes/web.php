<?php

use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return redirect('/login');
    });
    
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
    
    // Email/Password Login
    Route::post('/login', [GoogleController::class, 'login']);
    
    // Google OAuth Routes
    Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
    Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            if (auth()->user()->role !== 'admin') {
                return redirect('/client/dashboard');
            }
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');
    });
    
    // Client routes
    Route::prefix('client')->group(function () {
        Route::get('/dashboard', function () {
            if (auth()->user()->role !== 'client') {
                return redirect('/admin/dashboard');
            }
            return Inertia::render('Client/Dashboard');
        })->name('client.dashboard');
    });
    
    // Legacy dashboard redirect (backward compatibility)
    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect('/admin/dashboard');
        }
        return redirect('/client/dashboard');
    })->name('dashboard');
    
    Route::get('/profile', function () {
        return Inertia::render('Profile/Index');
    })->name('profile');
    
    // Add more routes for your pages
    Route::get('/products', function () {
        return Inertia::render('Products/Index');
    })->name('products');
    
    Route::get('/orders', function () {
        return Inertia::render('Orders/Index');
    })->name('orders');
    
    Route::get('/blog', function () {
        return Inertia::render('Blog/Index');
    })->name('blog');
    
    Route::get('/settings', function () {
        return Inertia::render('Settings/Index');
    })->name('settings');
    
    // Logout
    Route::post('/logout', [GoogleController::class, 'logout'])->name('logout');
});
