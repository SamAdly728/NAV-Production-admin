<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@nav-productions.com',
            'role' => 'admin',
            'password' => Hash::make('StrongAdmin!234'),
            'avatar' => '/assets/images/avatar/woman.jpg',
        ]);

        // Client users
        User::create([
            'name' => 'Alice Smith',
            'email' => 'alice@example.com',
            'role' => 'client',
            'password' => Hash::make('alicepass'),
            'avatar' => '/assets/images/avatar/woman.jpg',
        ]);

        User::create([
            'name' => 'Bob Johnson',
            'email' => 'bob@example.com',
            'role' => 'client',
            'password' => Hash::make('bobpass'),
            'avatar' => '/assets/images/avatar/man.jpg',
        ]);
    }
}
