<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'NAV Admin') }}</title>

        <!-- Template Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

        <!-- Template Icons -->
        <link rel="stylesheet" href="/assets/vendor/fontawesome/css/all.css">
        <link rel="stylesheet" href="/assets/vendor/tabler-icons/tabler-icons.css">
        <link rel="stylesheet" href="/assets/vendor/phosphor/phosphor-bold.css">

        <!-- Template Bootstrap CSS -->
        <link rel="stylesheet" href="/assets/vendor/bootstrap/bootstrap.min.css">

        <!-- Template Main CSS -->
        <link rel="stylesheet" href="/assets/css/style.css">
        <link rel="stylesheet" href="/assets/css/responsive.css">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.js'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased sign-in-bg">
        @inertia

        <!-- Template JavaScript -->
        <script src="/assets/js/jquery-3.6.3.min.js"></script>
        <script src="/assets/vendor/bootstrap/bootstrap.bundle.min.js"></script>
    </body>
</html>
